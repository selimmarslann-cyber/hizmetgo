import { NextRequest, NextResponse } from "next/server";
import { getReferralRewards } from "@/lib/services/referralService";
import { getUserId } from "@/lib/auth/session";

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

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const level = searchParams.get("level")
      ? parseInt(searchParams.get("level")!)
      : undefined;
    const dateFrom = searchParams.get("dateFrom")
      ? new Date(searchParams.get("dateFrom")!)
      : undefined;
    const dateTo = searchParams.get("dateTo")
      ? new Date(searchParams.get("dateTo")!)
      : undefined;

    const result = await getReferralRewards(userId, {
      page,
      pageSize,
      level,
      dateFrom,
      dateTo,
    });

    // Decimal'ları number'a çevir
    const rewards = result.rewards.map((reward) => ({
      ...reward,
      grossCommission: reward.grossCommission.toNumber(),
      shareRate: reward.shareRate.toNumber(),
      amount: reward.amount.toNumber(),
      order: {
        ...reward.order,
        totalAmount: reward.order.totalAmount.toNumber(),
      },
    }));

    return NextResponse.json({
      rewards,
      pagination: result.pagination,
    });
  } catch (error: any) {
    console.error("Referral rewards error:", error);
    return NextResponse.json(
      { error: error.message || "Referral kazançları yüklenemedi" },
      { status: 500 },
    );
  }
}
