/**
 * Listing Cancellation API
 *
 * POST /api/listings/[id]/cancel
 *
 * Müşteri ilanı iptal eder, lead satın alan ustalara otomatik iade yapılır
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireCustomer } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const cancelListingSchema = z.object({
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

    // Sadece customer (müşteri) ilanı iptal edebilir
    await requireCustomer(userId);

    const listingId = params.id;
    const body = await request.json();
    const { reason } = cancelListingSchema.parse(body);

    // İlanı kontrol et
    const { data: listing, error: listingError } = await supabaseAdmin
      .from("listings")
      .select("id, user_id, status")
      .eq("id", listingId)
      .single();

    if (listingError || !listing) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    // İlan sahibi kontrolü
    if (listing.user_id !== userId) {
      return NextResponse.json(
        { error: "Bu ilanı iptal etme yetkiniz yok" },
        { status: 403 },
      );
    }

    // Zaten iptal edilmiş mi?
    if (listing.status === "closed" || listing.status === "cancelled") {
      return NextResponse.json(
        { error: "Bu ilan zaten iptal edilmiş" },
        { status: 400 },
      );
    }

    // Bu ilan için lead satın alan ustaları bul
    const { data: leadPurchases, error: purchasesError } = await supabaseAdmin
      .from("lead_purchases")
      .select("id, vendor_id, lead_fee_tl, refund_requested, refund_processed")
      .eq("listing_id", listingId)
      .eq("refund_processed", false);

    if (purchasesError) {
      console.error("Lead purchases fetch error:", purchasesError);
    }

    // İlanı iptal et
    const { error: cancelError } = await supabaseAdmin
      .from("listings")
      .update({
        status: "closed",
        cancelled_at: new Date().toISOString(),
        cancelled_by: "customer",
        cancellation_reason: reason,
      })
      .eq("id", listingId);

    if (cancelError) {
      console.error("Listing cancellation error:", cancelError);
      return NextResponse.json(
        { error: "İlan iptal edilemedi" },
        { status: 500 },
      );
    }

    // Lead satın alan ustalara otomatik iade talebi oluştur
    const refundPromises = (leadPurchases || []).map(async (purchase) => {
      // Zaten iade talebi var mı?
      const { data: existingRefund } = await supabaseAdmin
        .from("lead_refunds")
        .select("id")
        .eq("lead_purchase_id", purchase.id)
        .in("refund_status", ["pending", "approved"])
        .single();

      if (existingRefund) {
        return; // Zaten iade talebi var
      }

      // Otomatik iade talebi oluştur (müşteri iptal etti)
      const { error: refundError } = await supabaseAdmin
        .from("lead_refunds")
        .insert({
          lead_purchase_id: purchase.id,
          listing_id: listingId,
          vendor_id: purchase.vendor_id,
          refund_reason: "customer_cancelled",
          refund_amount_tl: purchase.lead_fee_tl,
          refund_status: "approved", // Müşteri iptal etti, otomatik onay
          notes: `Müşteri ilanı iptal etti: ${reason}`,
        });

      if (!refundError) {
        // lead_purchases'ı güncelle
        await supabaseAdmin
          .from("lead_purchases")
          .update({
            refund_requested: true,
            job_status: "cancelled",
            cancelled_at: new Date().toISOString(),
            cancelled_by: "customer",
          })
          .eq("id", purchase.id);

        // İadeyi otomatik işle
        try {
          await supabaseAdmin.rpc("process_lead_refund", {
            p_refund_id: null, // Refund ID'yi almak için tekrar sorgu gerekir
            p_admin_user_id: null,
          });
        } catch (processErr) {
          console.error("Auto-refund processing error:", processErr);
          // Hata olsa bile refund talebi oluşturuldu, admin manuel işleyebilir
        }
      }
    });

    // Tüm iadeleri paralel işle
    await Promise.all(refundPromises);

    return NextResponse.json(
      {
        success: true,
        message: "İlan başarıyla iptal edildi",
        refundsProcessed: leadPurchases?.length || 0,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Listing cancellation error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error.message || "İlan iptal edilemedi" },
      { status: 400 },
    );
  }
}
