import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/services/orderService";
import { createOrderSchema } from "@/lib/validations/order";
import { getUserId } from "@/lib/auth/session";
import { requireCustomer } from "@/lib/auth/roleCheck";
import { withRateLimit } from "@/lib/middleware/rateLimit";
import { logger } from "@/lib/utils/logger";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorCodeFromStatus,
  getStatusFromErrorCode,
} from "@/lib/utils/apiError";
import { z } from "zod";

async function createOrderHandler(request: NextRequest) {
  let userId: string | null = null; // TS18004 fix: userId must be in scope for catch block
  try {
    userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // FAZ 3: Sadece customer sipariş oluşturabilir
    await requireCustomer(userId);

    const body = await request.json();
    const validated = createOrderSchema.parse(body);

    const order = await createOrder({
      customerId: userId,
      businessId: validated.businessId,
      items: validated.items,
      addressText: validated.addressText,
      locationLat: validated.locationLat,
      locationLng: validated.locationLng,
      scheduledAt: validated.scheduledAt
        ? new Date(validated.scheduledAt)
        : undefined,
    });

    const successResponse = createSuccessResponse({ order });
    return NextResponse.json(successResponse, { status: 201 });
  } catch (error: any) {
    logger.error("Order creation error", error, { userId });

    const errorCode =
      error instanceof z.ZodError
        ? "VALIDATION_ERROR"
        : getErrorCodeFromStatus(400);

    const errorResponse = createErrorResponse(
      errorCode,
      error instanceof z.ZodError
        ? error.errors[0].message
        : error.message || "Sipariş oluşturulamadı",
      error instanceof z.ZodError ? { errors: error.errors } : undefined,
    );

    return NextResponse.json(errorResponse, {
      status: getStatusFromErrorCode(errorCode),
    });
  }
}

// Export with rate limiting (30 requests per 15 minutes for order creation)

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export const POST = withRateLimit(createOrderHandler, {
  maxRequests: 30,
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
