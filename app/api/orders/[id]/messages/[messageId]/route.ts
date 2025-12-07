/**
 * GET /api/orders/[id]/messages/[messageId]
 * Get a single message by ID (for real-time updates)
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; messageId: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const orderId = params.id;
    const messageId = params.messageId;

    // Get message with full relations
    const message = await prisma.message.findUnique({
      where: { id: messageId },
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
        order: {
          select: {
            id: true,
            customerId: true,
            business: {
              select: {
                ownerUserId: true,
              },
            },
          },
        },
      },
    });

    if (!message) {
      return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });
    }

    // Verify order matches and user has access
    if (message.orderId !== orderId) {
      return NextResponse.json(
        { error: "Mesaj bu siparişe ait değil" },
        { status: 400 },
      );
    }

    // Check permissions
    const isCustomer = message.order.customerId === userId;
    const isBusinessOwner = message.order.business.ownerUserId === userId;

    if (!isCustomer && !isBusinessOwner) {
      return NextResponse.json(
        { error: "Bu mesajı görüntüleme yetkiniz yok" },
        { status: 403 },
      );
    }

    // Format response
    const { order, ...messageData } = message;

    return NextResponse.json(messageData);
  } catch (error: any) {
    console.error("Message fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Mesaj yüklenemedi" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/orders/[id]/messages/[messageId]
 * Mark message as read
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; messageId: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const orderId = params.id;
    const messageId = params.messageId;

    // Get message and verify ownership
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        order: {
          select: {
            id: true,
            customerId: true,
            business: {
              select: {
                ownerUserId: true,
              },
            },
          },
        },
      },
    });

    if (!message) {
      return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });
    }

    if (message.orderId !== orderId) {
      return NextResponse.json(
        { error: "Mesaj bu siparişe ait değil" },
        { status: 400 },
      );
    }

    // Only receiver can mark as read
    if (message.receiverId !== userId) {
      return NextResponse.json(
        { error: "Bu mesajı okundu olarak işaretleme yetkiniz yok" },
        { status: 403 },
      );
    }

    // Mark as read
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return NextResponse.json({ message: updatedMessage });
  } catch (error: any) {
    console.error("Message mark as read error:", error);
    return NextResponse.json(
      { error: error.message || "Mesaj okundu olarak işaretlenemedi" },
      { status: 500 },
    );
  }
}
