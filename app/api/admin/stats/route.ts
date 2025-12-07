import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Kullanıcıyı veritabanından çek ve role kontrolü yap
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Bu ayın başlangıcı
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Yeni kullanıcılar (bu ay)
    const newUsersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Yeni işletmeler (bu ay)
    const newBusinessesThisMonth = await prisma.business.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Tamamlanan siparişler
    const completedOrders = await prisma.order.count({
      where: {
        status: "COMPLETED",
      },
    });

    // Toplam gelir
    const revenueResult = await prisma.payment.aggregate({
      where: {
        status: "CAPTURED",
      },
      _sum: {
        platformFee: true,
      },
    });
    const totalRevenue = Number(revenueResult._sum.platformFee || 0);

    return NextResponse.json({
      newUsersThisMonth,
      newBusinessesThisMonth,
      completedOrders,
      totalRevenue,
    });
  } catch (error: any) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to load stats", details: error.message },
      { status: 500 },
    );
  }
}
