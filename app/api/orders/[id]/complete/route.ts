/**
 * Order Complete Endpoint - FAZ 3
 *
 * Vendor tarafından iş tamamlandığında çağrılır
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireVendor } from "@/lib/auth/roleCheck";
import { updateOrderStatus } from "@/lib/services/orderService";
import { prisma } from "@/lib/db/prisma";


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

    // FAZ 3: Sadece vendor sipariş tamamlayabilir
    await requireVendor(userId);

    const orderId = params.id;

    // Order'ı getir
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
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

    // Sadece vendor (business owner) tamamlayabilir
    if (order.business.ownerUserId !== userId) {
      return NextResponse.json(
        { error: "Bu siparişi tamamlama yetkiniz yok" },
        { status: 403 },
      );
    }

    // Order status kontrolü
    if (!["ACCEPTED", "IN_PROGRESS"].includes(order.status)) {
      return NextResponse.json(
        { error: "Bu durumdaki sipariş tamamlanamaz" },
        { status: 400 },
      );
    }

    // Order'ı tamamla
    const completedOrder = await updateOrderStatus(
      orderId,
      "COMPLETED",
      userId,
      "business",
    );

    return NextResponse.json({
      order: {
        id: completedOrder.id,
        status: completedOrder.status,
        completedAt: completedOrder.completedAt,
      },
    });
  } catch (error: any) {
    console.error("Order complete error:", error);
    return NextResponse.json(
      { error: error.message || "Sipariş tamamlanamadı" },
      { status: 500 },
    );
  }
}
