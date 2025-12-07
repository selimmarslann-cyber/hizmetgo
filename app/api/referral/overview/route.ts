
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getOrCreateReferralCodeForUser } from "@/lib/services/referralService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Kullanıcı bilgilerini al
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        referralCode: {
          select: {
            code: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 },
      );
    }

    // Referral kodu - yoksa oluştur
    let referralCode = user.referralCode?.code;
    if (!referralCode) {
      referralCode = await getOrCreateReferralCodeForUser(userId);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const referralLink = `${appUrl}/auth/register?ref=${referralCode}`;

    // Toplam referral kazancı (wallet_transactions'tan)
    const referralEarningsResult = await prisma.$queryRaw<
      Array<{ total: any }>
    >`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM wallet_transactions
      WHERE user_id = ${userId}::uuid
        AND source_type = 'referral'
    `;
    const totalReferralEarnings = parseFloat(
      referralEarningsResult[0]?.total || "0",
    );

    // Toplam bölge kazancı
    const regionEarningsResult = await prisma.$queryRaw<Array<{ total: any }>>`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM wallet_transactions
      WHERE user_id = ${userId}::uuid
        AND source_type = 'region'
    `;
    const totalRegionEarnings = parseFloat(
      regionEarningsResult[0]?.total || "0",
    );

    // Bu ayki kazanç
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyReferralResult = await prisma.$queryRaw<Array<{ total: any }>>`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM wallet_transactions
      WHERE user_id = ${userId}::uuid
        AND source_type = 'referral'
        AND created_at >= ${startOfMonth}::timestamp
    `;
    const monthlyReferralEarnings = parseFloat(
      monthlyReferralResult[0]?.total || "0",
    );

    const monthlyRegionResult = await prisma.$queryRaw<Array<{ total: any }>>`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM wallet_transactions
      WHERE user_id = ${userId}::uuid
        AND source_type = 'region'
        AND created_at >= ${startOfMonth}::timestamp
    `;
    const monthlyRegionEarnings = parseFloat(
      monthlyRegionResult[0]?.total || "0",
    );

    // Level bazlı sayılar (L1-L5) - ReferralRelation üzerinden
    const levelCounts = await prisma.$queryRaw<
      Array<{ level: number; count: bigint }>
    >`
      SELECT level, COUNT(DISTINCT referred_user_id) as count
      FROM referral_relations
      WHERE referrer_user_id = ${userId}::uuid
        AND level <= 5
      GROUP BY level
      ORDER BY level
    `;

    const levelCountsMap: Record<number, number> = {};
    levelCounts.forEach((item) => {
      levelCountsMap[item.level] = Number(item.count);
    });

    // Level bazlı kazançlar
    const levelEarnings = await prisma.$queryRaw<
      Array<{ level: number; total: any }>
    >`
      SELECT level, COALESCE(SUM(amount), 0) as total
      FROM wallet_transactions
      WHERE user_id = ${userId}::uuid
        AND source_type = 'referral'
        AND level IS NOT NULL
      GROUP BY level
      ORDER BY level
    `;

    const levelEarningsMap: Record<number, number> = {};
    levelEarnings.forEach((item) => {
      levelEarningsMap[item.level] = parseFloat(item.total || "0");
    });

    // Cüzdan bakiyesi
    const walletResult = await prisma.$queryRaw<Array<{ balance: any }>>`
      SELECT COALESCE(balance, 0) as balance
      FROM wallets
      WHERE user_id = ${userId}::uuid
    `;
    const currentBalance = parseFloat(walletResult[0]?.balance || "0");

    // Rank bilgisi ve bir sonraki level için kalan
    // Not: referral_rank ve network_cumulative_gmv schema'da yok, şimdilik 0 olarak ayarlıyoruz
    const currentRank = 0;
    const currentGMV = 0;

    let nextRankThreshold = 0;
    let nextRankName = "";
    let remainingForNext = 0;

    if (currentRank < 4) {
      switch (currentRank as number) {
        case 0:
          nextRankThreshold = 1000000;
          nextRankName = "Mahalle Lideri";
          break;
        case 1:
          nextRankThreshold = 10000000;
          nextRankName = "İlçe Yöneticisi";
          break;
        case 2:
          nextRankThreshold = 100000000;
          nextRankName = "İl Yöneticisi";
          break;
        case 3:
          nextRankThreshold = 500000000;
          nextRankName = "Ülke Yöneticisi";
          break;
      }
      remainingForNext = Math.max(0, nextRankThreshold - currentGMV);
    }

    return NextResponse.json({
      currentReferralCode: referralCode,
      referralLink,
      totalReferralEarnings,
      totalRegionEarnings,
      totalEarnings: totalReferralEarnings + totalRegionEarnings,
      monthlyReferralEarnings,
      monthlyRegionEarnings,
      monthlyEarnings: monthlyReferralEarnings + monthlyRegionEarnings,
      level1Count: levelCountsMap[1] || 0,
      level2Count: levelCountsMap[2] || 0,
      level3Count: levelCountsMap[3] || 0,
      level4Count: levelCountsMap[4] || 0,
      level5Count: levelCountsMap[5] || 0,
      level1Earnings: levelEarningsMap[1] || 0,
      level2Earnings: levelEarningsMap[2] || 0,
      level3Earnings: levelEarningsMap[3] || 0,
      level4Earnings: levelEarningsMap[4] || 0,
      level5Earnings: levelEarningsMap[5] || 0,
      currentBalance,
      currentRank,
      currentGMV,
      nextRankThreshold,
      nextRankName,
      remainingForNext,
    });
  } catch (error: any) {
    console.error("Referral overview error:", error);
    return NextResponse.json(
      { error: error.message || "Referral bilgileri yüklenemedi" },
      { status: 500 },
    );
  }
}
