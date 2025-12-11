/**
 * Profile Billing API Route
 * 
 * Kullanıcının fatura profili işlemleri için API endpoint.
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import {
  getUserBillingProfile,
  upsertUserBillingProfile,
} from "@/lib/billing/billingService";
import { BillingFormSchema } from "@/lib/billing/billingSchema";

export const dynamic = "force-dynamic";

/**
 * GET - Kullanıcının mevcut fatura profilini getir
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

    const billingProfile = await getUserBillingProfile(userId);

    return NextResponse.json({
      billingProfile: billingProfile || null,
    });
  } catch (error: any) {
    console.error("Billing profile get error:", error);
    return NextResponse.json(
      { error: error.message || "Fatura profili yüklenemedi" },
      { status: 500 },
    );
  }
}

/**
 * POST - Fatura profilini oluştur veya güncelle
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const body = await request.json();

    // Zod schema ile validate et
    const validationResult = BillingFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Form validasyonu başarısız",
          details: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    // Fatura profilini oluştur/güncelle
    const billingProfile = await upsertUserBillingProfile(
      userId,
      validationResult.data,
    );

    return NextResponse.json({
      success: true,
      billingProfile,
    });
  } catch (error: any) {
    console.error("Billing profile upsert error:", error);
    return NextResponse.json(
      { error: error.message || "Fatura profili kaydedilemedi" },
      { status: 500 },
    );
  }
}

