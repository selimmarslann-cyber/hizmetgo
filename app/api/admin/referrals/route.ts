import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getUserId } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Admin referral istatistikleri
 * TODO: Admin yetki kontrolü ekle
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Admin kontrolü
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    // Toplam dağıtılan referral kazancı
    const totalDistributedResult = await prisma.referralReward.aggregate({
      _sum: { amount: true },
    });
    const totalDistributed = totalDistributedResult._sum.amount || 0;

    // Toplam referrer sayısı
    const totalReferrers = await prisma.referralRelation.groupBy({
      by: ["referrerUserId"],
    });

    // Toplam referral sayısı
    const totalReferrals = await prisma.referralRelation.count();

    // Top 20 referrer
    const topReferrersRaw = await prisma.referralReward.groupBy({
      by: ["userId"],
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: "desc",
        },
      },
      take: 20,
    });

    // Detaylı bilgileri getir
    const topReferrers = await Promise.all(
      topReferrersRaw.map(async (item) => {
        const user = await prisma.user.findUnique({
          where: { id: item.userId },
          select: {
            id: true,
            name: true,
            email: true,
            referralBalance: true,
          },
        });

        const referralCode = await prisma.referralCode.findUnique({
          where: { userId: item.userId },
          select: { code: true },
        });

        const level1Count = await prisma.referralRelation.count({
          where: {
            referrerUserId: item.userId,
            level: 1,
          },
        });

        const level2Count = await prisma.referralRelation.count({
          where: {
            referrerUserId: item.userId,
            level: 2,
          },
        });

        return {
          userId: item.userId,
          userName: user?.name || "Bilinmeyen",
          userEmail: user?.email,
          referralCode: referralCode?.code || "-",
          totalEarnings: item._sum.amount?.toNumber() || 0,
          level1Count,
          level2Count,
          balance: user?.referralBalance.toNumber() || 0,
        };
      }),
    );

    return NextResponse.json({
      stats: {
        totalDistributed:
          typeof totalDistributed === "number"
            ? totalDistributed
            : totalDistributed.toNumber(),
        totalReferrers: totalReferrers.length,
        totalReferrals,
      },
      topReferrers,
    });
  } catch (error: any) {
    console.error("Admin referrals error:", error);
    return NextResponse.json(
      { error: error.message || "Admin referral verileri yüklenemedi" },
      { status: 500 },
    );
  }
}
