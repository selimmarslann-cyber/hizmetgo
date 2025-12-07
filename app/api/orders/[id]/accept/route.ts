import { NextRequest, NextResponse } from "next/server";
import { acceptOrder } from "@/lib/services/orderService";
import { getUserId } from "@/lib/auth/session";
import { requireVendor } from "@/lib/auth/roleCheck";
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

    // FAZ 3: Sadece vendor sipariş kabul edebilir
    await requireVendor(userId);

    // Order'dan businessId al ve kullanıcının işletmesi olduğunu kontrol et
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { business: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı" },
        { status: 404 },
      );
    }

    if (order.business.ownerUserId !== userId) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const acceptedOrder = await acceptOrder(params.id, order.businessId);

    return NextResponse.json({ order: acceptedOrder });
  } catch (error: any) {
    console.error("Order accept error:", error);
    return NextResponse.json(
      { error: error.message || "Sipariş kabul edilemedi" },
      { status: 400 },
    );
  }
}
