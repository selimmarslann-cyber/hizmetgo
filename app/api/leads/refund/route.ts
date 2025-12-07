/**
 * Lead Refund API
 *
 * POST /api/leads/refund - Lead iade talebi oluştur
 * GET /api/leads/refund/[id] - İade durumu kontrol et
 * POST /api/leads/refund/[id]/process - İade işle (admin)
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireVendor, requireAdmin } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const createRefundRequestSchema = z.object({
  leadPurchaseId: z.string().uuid("Geçersiz lead purchase ID"),
  reason: z.enum([
    "no_contact",
    "customer_cancelled",
    "vendor_cancelled",
    "duplicate_lead",
    "job_not_completed",
    "quality_issue",
    "other",
  ]),
  notes: z.string().optional(),
});

/**
 * POST /api/leads/refund - Lead iade talebi oluştur
 */

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Sadece vendor (usta) iade talebi oluşturabilir
    await requireVendor(userId);

    const body = await request.json();
    const { leadPurchaseId, reason, notes } =
      createRefundRequestSchema.parse(body);

    // Lead purchase'ı kontrol et
    const { data: leadPurchase, error: purchaseError } = await supabaseAdmin
      .from("lead_purchases")
      .select(
        "id, listing_id, vendor_id, lead_fee_tl, refund_requested, refund_processed",
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

    // Zaten iade işlendi mi?
    if (leadPurchase.refund_processed) {
      return NextResponse.json(
        { error: "Bu lead için iade zaten işlendi" },
        { status: 400 },
      );
    }

    // Zaten iade talebi var mı?
    if (leadPurchase.refund_requested) {
      const { data: existingRefund } = await supabaseAdmin
        .from("lead_refunds")
        .select("id, refund_status")
        .eq("lead_purchase_id", leadPurchaseId)
        .in("refund_status", ["pending", "approved"])
        .single();

      if (existingRefund) {
        return NextResponse.json(
          {
            error: "Bu lead için zaten bir iade talebi mevcut",
            refundId: existingRefund.id,
            status: existingRefund.refund_status,
          },
          { status: 400 },
        );
      }
    }

    // İade talebi oluştur
    const { data: refund, error: refundError } = await supabaseAdmin
      .from("lead_refunds")
      .insert({
        lead_purchase_id: leadPurchaseId,
        listing_id: leadPurchase.listing_id,
        vendor_id: userId,
        refund_reason: reason,
        refund_amount_tl: leadPurchase.lead_fee_tl,
        refund_status: reason === "no_contact" ? "approved" : "pending", // 24 saat kuralı otomatik onay
        notes: notes || null,
      })
      .select()
      .single();

    if (refundError || !refund) {
      console.error("Refund creation error:", refundError);
      return NextResponse.json(
        { error: "İade talebi oluşturulamadı" },
        { status: 500 },
      );
    }

    // lead_purchases'ı güncelle
    await supabaseAdmin
      .from("lead_purchases")
      .update({ refund_requested: true })
      .eq("id", leadPurchaseId);

    // Eğer otomatik onay ise (no_contact), hemen işle
    if (reason === "no_contact" && refund.refund_status === "approved") {
      try {
        // Supabase function'ı çağır
        const { data: processResult, error: processError } =
          await supabaseAdmin.rpc("process_lead_refund", {
            p_refund_id: refund.id,
            p_admin_user_id: null, // Otomatik işlem
          });

        if (processError) {
          console.error("Auto-refund processing error:", processError);
          // Hata olsa bile refund talebi oluşturuldu, admin manuel işleyebilir
        }
      } catch (processErr) {
        console.error("Auto-refund processing exception:", processErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        refund: {
          id: refund.id,
          status: refund.refund_status,
          amount: refund.refund_amount_tl,
          reason: refund.refund_reason,
          createdAt: refund.created_at,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Refund request error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error.message || "İade talebi oluşturulamadı" },
      { status: 400 },
    );
  }
}

/**
 * GET /api/leads/refund - Kullanıcının iade taleplerini listele
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

    const { data: refunds, error } = await supabaseAdmin
      .from("lead_refunds")
      .select("*")
      .eq("vendor_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Refunds fetch error:", error);
      return NextResponse.json(
        { error: "İade talepleri yüklenemedi" },
        { status: 500 },
      );
    }

    return NextResponse.json({ refunds: refunds || [] }, { status: 200 });
  } catch (error: any) {
    console.error("Refunds fetch error:", error);
    return NextResponse.json(
      { error: error.message || "İade talepleri yüklenemedi" },
      { status: 500 },
    );
  }
}
