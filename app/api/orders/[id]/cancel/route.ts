/**
 * Order Cancellation API (Customer)
 * 
 * POST /api/orders/[id]/cancel
 * 
 * Müşteri siparişi iptal eder
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireCustomer } from "@/lib/auth/roleCheck";
import { cancelOrderByCustomer } from "@/lib/services/orderService";
import { z } from "zod";

const cancelOrderSchema = z.object({
  reason: z.string().min(5, "İptal nedeni en az 5 karakter olmalı").optional(),
});

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Sadece customer siparişi iptal edebilir
    await requireCustomer(userId);

    const orderId = params.id;
    const body = await request.json();
    const validated = cancelOrderSchema.parse(body);

    // Siparişi iptal et
    const cancelledOrder = await cancelOrderByCustomer(
      orderId,
      userId,
    );

    return NextResponse.json({
      success: true,
      order: cancelledOrder,
      message: "Sipariş başarıyla iptal edildi",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Order cancellation error:", error);
    return NextResponse.json(
      { error: error.message || "Sipariş iptal edilemedi" },
      { status: 400 },
    );
  }
}

