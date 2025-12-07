import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
        review: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı" },
        { status: 404 },
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json({ error: "Sipariş yüklenemedi" }, { status: 500 });
  }
}
