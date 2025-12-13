import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { logger } from "@/lib/utils/logger";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorCodeFromStatus,
  getStatusFromErrorCode,
} from "@/lib/utils/apiError";

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

    // Toplam kullanıcı sayısı
    const totalUsers = await prisma.user.count();

    // Toplam işletme sayısı
    const totalBusinesses = await prisma.business.count();

    // Toplam sipariş sayısı
    const totalOrders = await prisma.order.count();

    // Açık destek talepleri
    const openTickets = await prisma.supportTicket.count({
      where: {
        status: {
          in: ["OPEN", "ADMIN_OPEN", "ADMIN_REPLIED"],
        },
      },
    });

    // Destek merkezi istatistikleri
    const totalTickets = await prisma.supportTicket.count();
    const resolvedTickets = await prisma.supportTicket.count({
      where: {
        status: {
          in: ["RESOLVED", "CLOSED", "BOT_RESOLVED"],
        },
      },
    });

    // Son 24 saat içinde oluşturulan ticket'lar
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);
    const ticketsLast24Hours = await prisma.supportTicket.count({
      where: {
        createdAt: {
          gte: last24Hours,
        },
      },
    });

    // Yüksek öncelikli açık ticket'lar
    const highPriorityTickets = await prisma.supportTicket.count({
      where: {
        status: {
          in: ["OPEN", "ADMIN_OPEN", "ADMIN_REPLIED"],
        },
        priority: {
          lte: 2, // 1 veya 2 (yüksek/orta)
        },
      },
    });

    // Ortalama yanıt süresi (dakika)
    const ticketsWithResponse = await prisma.supportTicket.findMany({
      where: {
        status: {
          in: ["RESOLVED", "CLOSED", "BOT_RESOLVED", "ADMIN_REPLIED"],
        },
        messages: {
          some: {},
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
        },
      },
      take: 100, // Son 100 ticket için hesapla
    });

    let totalResponseTime = 0;
    let countWithResponseTime = 0;

    for (const ticket of ticketsWithResponse) {
      if (ticket.messages.length > 0 && ticket.updatedAt) {
        const firstMessage = ticket.messages[0];
        const responseTime = ticket.updatedAt.getTime() - firstMessage.createdAt.getTime();
        if (responseTime > 0) {
          totalResponseTime += responseTime;
          countWithResponseTime++;
        }
      }
    }

    const avgResponseTimeMinutes = countWithResponseTime > 0
      ? Math.round(totalResponseTime / countWithResponseTime / 1000 / 60)
      : 0;

    // Toplam gelir (tamamlanmış siparişlerden platform fee)
    const revenueResult = await prisma.payment.aggregate({
      where: {
        status: "CAPTURED",
      },
      _sum: {
        platformFee: true,
      },
    });
    const totalRevenue = Number(revenueResult._sum.platformFee || 0);

    // Bu ayın geliri
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenueResult = await prisma.payment.aggregate({
      where: {
        status: "CAPTURED",
        createdAt: {
          gte: startOfMonth,
        },
      },
      _sum: {
        platformFee: true,
      },
    });
    const monthlyRevenue = Number(monthlyRevenueResult._sum.platformFee || 0);

    const successResponse = createSuccessResponse({
      totalUsers,
      totalBusinesses,
      totalOrders,
      openTickets,
      totalRevenue,
      monthlyRevenue,
      // Destek merkezi istatistikleri
      supportStats: {
        totalTickets,
        resolvedTickets,
        ticketsLast24Hours,
        highPriorityTickets,
        avgResponseTimeMinutes,
        satisfactionRate: totalTickets > 0
          ? Math.round((resolvedTickets / totalTickets) * 100)
          : 0,
      },
    });

    return NextResponse.json(successResponse);
  } catch (error: any) {
    logger.error("Dashboard stats error", error);

    const errorResponse = createErrorResponse(
      getErrorCodeFromStatus(500),
      "Failed to load stats",
      { details: error.message },
    );

    return NextResponse.json(errorResponse, {
      status: getStatusFromErrorCode(getErrorCodeFromStatus(500)),
    });
  }
}
