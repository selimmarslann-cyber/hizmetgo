/**
 * Lead Cancellation API (Vendor)
 *
 * POST /api/leads/[id]/cancel
 *
 * Usta lead'i iptal eder, otomatik iade talebi oluşturulur
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireVendor } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const cancelLeadSchema = z.object({
  reason: z.string().min(10, "İptal nedeni en az 10 karakter olmalı"),
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Sadece vendor (usta) lead'i iptal edebilir
    await requireVendor(userId);

    const leadPurchaseId = params.id;
    const body = await request.json();
    const { reason } = cancelLeadSchema.parse(body);

    // Lead purchase'ı kontrol et
    const { data: leadPurchase, error: purchaseError } = await supabaseAdmin
      .from("lead_purchases")
      .select(
        "id, listing_id, vendor_id, lead_fee_tl, refund_requested, refund_processed, job_status",
      )
      .eq("id", leadPurchaseId)
      .eq("vendor_id", userId)
      .single();

    if (purchaseError || !leadPurchase) {
      return NextResponse.json(
        { error: "Lead purchase bulunamadı veya yetkiniz yok" },
        { status: 404 },
      );
    }

    // Zaten iptal edilmiş mi?
    if (leadPurchase.job_status === "cancelled") {
      return NextResponse.json(
        { error: "Bu lead zaten iptal edilmiş" },
        { status: 400 },
      );
    }

    // Zaten iade işlendi mi?
    if (leadPurchase.refund_processed) {
      return NextResponse.json(
        { error: "Bu lead için iade zaten işlendi" },
        { status: 400 },
      );
    }

    // Lead'i iptal et
    const { error: cancelError } = await supabaseAdmin
      .from("lead_purchases")
      .update({
        job_status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancelled_by: "vendor",
      })
      .eq("id", leadPurchaseId);

    if (cancelError) {
      console.error("Lead cancellation error:", cancelError);
      return NextResponse.json(
        { error: "Lead iptal edilemedi" },
        { status: 500 },
      );
    }

    // Otomatik iade talebi oluştur (usta iptal etti)
    // Zaten iade talebi var mı?
    const { data: existingRefund } = await supabaseAdmin
      .from("lead_refunds")
      .select("id")
      .eq("lead_purchase_id", leadPurchaseId)
      .in("refund_status", ["pending", "approved"])
      .single();

    if (!existingRefund) {
      const { data: refund, error: refundError } = await supabaseAdmin
        .from("lead_refunds")
        .insert({
          lead_purchase_id: leadPurchaseId,
          listing_id: leadPurchase.listing_id,
          vendor_id: userId,
          refund_reason: "vendor_cancelled",
          refund_amount_tl: leadPurchase.lead_fee_tl,
          refund_status: "pending", // Admin onayı gerekli (usta iptal etti)
          notes: `Usta lead'i iptal etti: ${reason}`,
        })
        .select()
        .single();

      if (!refundError && refund) {
        // lead_purchases'ı güncelle
        await supabaseAdmin
          .from("lead_purchases")
          .update({ refund_requested: true })
          .eq("id", leadPurchaseId);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Lead başarıyla iptal edildi. İade talebi oluşturuldu ve admin onayı bekleniyor.",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Lead cancellation error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Lead iptal edilemedi" },
      { status: 400 },
    );
  }
}
