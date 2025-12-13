import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    // Çözülen sorun sayısı (RESOLVED veya CLOSED durumundaki ticket'lar)
    const resolvedCount = await prisma.supportTicket.count({
      where: {
        status: {
          in: ["RESOLVED", "CLOSED", "BOT_RESOLVED"],
        },
      },
    });

    // Son 24 saat içinde yanıt verilen ticket sayısı
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    const respondedLast24Hours = await prisma.supportTicket.count({
      where: {
        updatedAt: {
          gte: last24Hours,
        },
        status: {
          not: "OPEN",
        },
      },
    });

    // Ortalama yanıt süresi (dakika cinsinden)
    // İlk mesajdan son mesaja kadar geçen süre
    const ticketsWithMessages = await prisma.supportTicket.findMany({
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
    });

    let totalResponseTime = 0;
    let countWithResponseTime = 0;

    for (const ticket of ticketsWithMessages) {
      if (ticket.messages.length > 0) {
        const firstMessage = ticket.messages[0];
        const responseTime = ticket.updatedAt.getTime() - firstMessage.createdAt.getTime();
        totalResponseTime += responseTime;
        countWithResponseTime++;
      }
    }

    const avgResponseTimeMinutes = countWithResponseTime > 0
      ? Math.round(totalResponseTime / countWithResponseTime / 1000 / 60)
      : 0;

    // Memnuniyet oranı (basit bir hesaplama - çözülen ticket'ların toplam ticket'lara oranı)
    const totalTickets = await prisma.supportTicket.count();
    const satisfactionRate = totalTickets > 0
      ? Math.round((resolvedCount / totalTickets) * 100)
      : 0;

    return NextResponse.json({
      resolvedCount,
      respondedLast24Hours,
      avgResponseTimeMinutes,
      satisfactionRate,
      totalTickets,
    });
  } catch (error: any) {
    console.error("Support stats error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

