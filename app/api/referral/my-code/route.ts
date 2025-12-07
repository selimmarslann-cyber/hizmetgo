
import { NextRequest, NextResponse } from "next/server";
import { getOrCreateReferralCodeForUser } from "@/lib/services/referralService";
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

    const code = await getOrCreateReferralCodeForUser(userId);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const referralLink = `${appUrl}/auth/register?ref=${code}`;

    return NextResponse.json({
      code,
      referralLink,
    });
  } catch (error: any) {
    console.error("Referral code error:", error);
    return NextResponse.json(
      { error: error.message || "Referral kodu alınamadı" },
      { status: 500 },
    );
  }
}
