/**
 * Wallet API - FAZ 3
 *
 * GET: Kullanıcının cüzdan bilgilerini getir
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { getOrCreateWallet } from "@/lib/services/walletService";

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

    const wallet = await getOrCreateWallet(userId);

    return NextResponse.json({
      wallet: {
        id: wallet.id,
        userId: wallet.userId,
        balance:
          typeof wallet.balance === "number"
            ? wallet.balance
            : wallet.balance.toNumber(),
        pendingBalance:
          typeof wallet.pendingBalance === "number"
            ? wallet.pendingBalance
            : wallet.pendingBalance.toNumber(),
        currency: wallet.currency,
        createdAt: wallet.createdAt.toISOString(),
        updatedAt: wallet.updatedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Wallet fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Cüzdan bilgileri yüklenemedi" },
      { status: 500 },
    );
  }
}
