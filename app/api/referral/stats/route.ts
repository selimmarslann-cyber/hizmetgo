import { NextRequest, NextResponse } from "next/server";
import { getReferralOverview } from "@/lib/services/referralService";
import { getUserId } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Referral istatistikleri endpoint
 * Şimdilik overview ile benzer, ileride daha detaylı istatistikler eklenebilir
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const overview = await getReferralOverview(userId);

    return NextResponse.json({
      ...overview,
      // Decimal'ları number'a çevir
      totalEarnings: overview.totalEarnings.toNumber(),
      monthlyEarnings: overview.monthlyEarnings.toNumber(),
      level1Earnings: overview.level1Earnings.toNumber(),
      level2Earnings: overview.level2Earnings.toNumber(),
      currentBalance: overview.currentBalance.toNumber(),
    });
  } catch (error: any) {
    console.error("Referral stats error:", error);
    return NextResponse.json(
      { error: error.message || "Referral istatistikleri yüklenemedi" },
      { status: 500 },
    );
  }
}
