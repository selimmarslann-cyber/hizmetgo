import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { createNotification } from "@/lib/notifications/createNotification";
import { withRateLimit } from "@/lib/middleware/rateLimit";
import { logger } from "@/lib/utils/logger";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorCodeFromStatus,
  getStatusFromErrorCode,
} from "@/lib/utils/apiError";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sendMessageSchema = z
  .object({
    content: z.string().max(1000, "Mesaj çok uzun").optional(),
    fileUrl: z.string().url().optional(),
    fileType: z.string().optional(),
    fileName: z.string().optional(),
    fileSize: z.number().optional(),
  })
  .refine((data) => data.content || data.fileUrl, {
    message: "Mesaj içeriği veya dosya gereklidir",
  });

/**
 * GET /api/orders/[id]/messages
 * Sipariş mesajlarını getir
 */
async function getOrderMessagesHandler(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  let userId: string | null = null;
  const orderId = params.id;
  try {
    userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Order'ı bul ve yetki kontrolü yap
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        business: {
          select: {
            ownerUserId: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı" },
        { status: 404 },
      );
    }

    // Yetki kontrolü: Sadece müşteri veya işletme sahibi mesajları görebilir
    const isCustomer = order.customerId === userId;
    const isBusinessOwner = order.business.ownerUserId === userId;

    if (!isCustomer && !isBusinessOwner) {
      return NextResponse.json(
        { error: "Bu siparişin mesajlarını görüntüleme yetkiniz yok" },
        { status: 403 },
      );
    }

    // Mesajları getir (son 500 mesaj - performans için limit)
    const messages = await prisma.message.findMany({
      where: { orderId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // En yeni mesajlar üstte
      },
      take: 500, // Max 500 mesaj - performans optimizasyonu
    });

    // Mesajları ters çevir (en eski üstte, en yeni altta - chat UI için)
    messages.reverse();

    // Order bilgisini de döndür (sistem mesajları için)
    return NextResponse.json({
      messages,
      order: {
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error: any) {
    logger.error("Messages fetch error", error, { orderId, userId });

    const errorResponse = createErrorResponse(
      getErrorCodeFromStatus(500),
      error.message || "Mesajlar yüklenemedi",
    );

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * POST /api/orders/[id]/messages
 * Yeni mesaj gönder
 */
async function sendMessageHandler(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  let userId: string | null = null;
  const orderId = params.id;
  try {
    userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Order'ı bul ve yetki kontrolü yap
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        business: {
          select: {
            ownerUserId: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı" },
        { status: 404 },
      );
    }

    // Yetki kontrolü
    const isCustomer = order.customerId === userId;
    const isBusinessOwner = order.business.ownerUserId === userId;

    if (!isCustomer && !isBusinessOwner) {
      return NextResponse.json(
        { error: "Bu siparişe mesaj gönderme yetkiniz yok" },
        { status: 403 },
      );
    }

    // Body'yi parse et
    const body = await request.json();
    const validated = sendMessageSchema.parse(body);

    // Alıcıyı belirle
    const receiverId = isCustomer
      ? order.business.ownerUserId
      : order.customerId;

    // Mesaj oluştur
    const message = await prisma.message.create({
      data: {
        orderId,
        senderId: userId,
        receiverId,
        content: validated.content?.trim() || "",
        fileUrl: validated.fileUrl,
        fileType: validated.fileType,
        fileName: validated.fileName,
        fileSize: validated.fileSize,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Alıcıya bildirim gönder
    try {
      const messagePreview = validated.content
        ? `${validated.content.substring(0, 50)}${validated.content.length > 50 ? "..." : ""}`
        : "Dosya gönderildi";

      await createNotification({
        userId: receiverId,
        type: "GENERAL",
        title: "Yeni Mesaj",
        body: `${message.sender.name}: ${messagePreview}`,
        data: {
          orderId,
          messageId: message.id,
          senderId: userId,
          type: "order_message",
        },
      });
    } catch (notifError) {
      logger.warn("Mesaj bildirimi gönderme hatası", {
        orderId,
        messageId: message.id,
        error: notifError,
      });
      // Bildirim hatası mesaj göndermeyi engellememeli
    }

    const successResponse = createSuccessResponse({ message });
    return NextResponse.json(successResponse, { status: 201 });
  } catch (error: any) {
    logger.error("Message send error", error, { orderId, userId });

    const errorCode =
      error instanceof z.ZodError
        ? "VALIDATION_ERROR"
        : getErrorCodeFromStatus(500);

    const errorResponse = createErrorResponse(
      errorCode,
      error instanceof z.ZodError
        ? error.errors[0].message
        : error.message || "Mesaj gönderilemedi",
      error instanceof z.ZodError ? { errors: error.errors } : undefined,
    );

    return NextResponse.json(errorResponse, {
      status: getStatusFromErrorCode(errorCode),
    });
  }
}

// TS2345 fix: withRateLimit expects (req) => Promise<NextResponse>, but route handlers have params
// Wrap handlers to match the expected signature by extracting orderId from URL
async function wrappedSendMessageHandler(
  req: NextRequest,
): Promise<NextResponse> {
  // Extract orderId from URL path: /api/orders/[id]/messages
  const url = new URL(req.url);
  const pathMatch = url.pathname.match(/\/api\/orders\/([^/]+)\/messages/);
  const orderId = pathMatch?.[1] || "";

  return sendMessageHandler(req, { params: { id: orderId } });
}

async function wrappedGetOrderMessagesHandler(
  req: NextRequest,
): Promise<NextResponse> {
  // Extract orderId from URL path: /api/orders/[id]/messages
  const url = new URL(req.url);
  const pathMatch = url.pathname.match(/\/api\/orders\/([^/]+)\/messages/);
  const orderId = pathMatch?.[1] || "";

  return getOrderMessagesHandler(req, { params: { id: orderId } });
}

// Export POST with rate limiting (50 messages per 15 minutes)
export const POST = withRateLimit(wrappedSendMessageHandler, {
  maxRequests: 50,
  windowMs: 15 * 60 * 1000,
  getIdentifier: async (req) => {
    const userId = await getUserId(req);
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : req.headers.get("x-real-ip") || "unknown";
    return userId ? `user:${userId}` : `ip:${ip}`;
  },
});

// GET endpoint with rate limiting
export const GET = withRateLimit(wrappedGetOrderMessagesHandler, {
  maxRequests: 100,
  windowMs: 15 * 60 * 1000,
  getIdentifier: async (req) => {
    const userId = await getUserId(req);
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : req.headers.get("x-real-ip") || "unknown";
    return userId ? `user:${userId}` : `ip:${ip}`;
  },
});
