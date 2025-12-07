/**
 * Unified Payment Init Endpoint
 * POST /api/payments/init
 *
 * Supports multiple payment providers (PayTR, iyzico, etc.)
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { paymentService } from "@/lib/payments/paymentService";
import { z } from "zod";
import type { PaymentProvider } from "@/lib/payments/types";
import { logError } from "@/lib/utils/logger";

const initPaymentSchema = z.object({
  orderId: z.string().uuid(),
  provider: z.enum(["paytr", "iyzico"]).optional(), // Preferred provider
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validated = initPaymentSchema.parse(body);

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: validated.orderId },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        payment: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı" },
        { status: 404 },
      );
    }

    // Verify user is the customer
    if (order.customerId !== userId) {
      return NextResponse.json(
        { error: "Bu siparişin ödemesini yapma yetkiniz yok" },
        { status: 403 },
      );
    }

    // Check if payment already initiated
    const existingPayment = order.payment;
    if (existingPayment && existingPayment.status !== "INITIATED") {
      return NextResponse.json(
        { error: "Bu sipariş için ödeme zaten işlenmiş" },
        { status: 400 },
      );
    }

    // Get app URL for return URLs
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const returnUrl = `${appUrl}/orders/${validated.orderId}/payment/callback`;
    const cancelUrl = `${appUrl}/orders/${validated.orderId}/payment/cancel`;

    // Initialize payment
    const customer = order.customer;
    const paymentInit = await paymentService.initPayment(
      {
        orderId: validated.orderId,
        amount: parseFloat(order.totalAmount.toString()),
        customerId: order.customerId,
        customerEmail: customer.email,
        customerName: customer.name,
        // Phone field does not exist in User model
        customerPhone: undefined,
        returnUrl,
        cancelUrl,
        description: `Sipariş #${validated.orderId.slice(0, 8)}`,
        currency: "TRY",
      },
      validated.provider as PaymentProvider,
    );

    if (!paymentInit.success) {
      return NextResponse.json(
        { error: paymentInit.error || "Ödeme başlatılamadı" },
        { status: 400 },
      );
    }

    // Update payment record with provider info
    if (existingPayment) {
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          provider: paymentInit.provider,
          externalId: paymentInit.paymentId || undefined,
          rawResponse: paymentInit.metadata || undefined,
        },
      });
    }

    return NextResponse.json({
      success: true,
      paymentUrl: paymentInit.paymentUrl,
      provider: paymentInit.provider,
      metadata: paymentInit.metadata,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    logError("Payment init error:", error);
    return NextResponse.json(
      { error: error.message || "Ödeme başlatılamadı" },
      { status: 500 },
    );
  }
}
