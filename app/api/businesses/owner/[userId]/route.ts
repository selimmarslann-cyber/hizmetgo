import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const business = await prisma.business.findFirst({
      where: { ownerUserId: params.userId },
      include: {
        products: {
          where: { active: true },
        },
        _count: {
          select: {
            reviews: true,
            orders: true,
          },
        },
      },
    });

    if (!business) {
      return NextResponse.json(null);
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error("Business fetch error:", error);
    return NextResponse.json({ error: "İşletme yüklenemedi" }, { status: 500 });
  }
}
