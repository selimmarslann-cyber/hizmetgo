/**
 * Approve Vendor Verification API (Admin Only)
 *
 * POST /api/vendors/[id]/verify/approve
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireAdmin } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const approveVerificationSchema = z.object({
  verificationId: z.string().uuid("Geçersiz verification ID"),
  notes: z.string().optional(),
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

    // Sadece admin onaylayabilir
    await requireAdmin(userId);

    const vendorId = params.id;
    const body = await request.json();
    const { verificationId, notes } = approveVerificationSchema.parse(body);

    // Doğrulama kaydını onayla
    const { error: updateError } = await supabaseAdmin
      .from("vendor_verifications")
      .update({
        status: "approved",
        verified_by: userId,
        verified_at: new Date().toISOString(),
        notes: notes || null,
      })
      .eq("id", verificationId)
      .eq("vendor_id", vendorId);

    if (updateError) {
      console.error("Verification approval error:", updateError);
      return NextResponse.json(
        { error: "Doğrulama onaylanamadı" },
        { status: 500 },
      );
    }

    // Tüm doğrulamaları kontrol et
    const { data: allVerifications } = await supabaseAdmin
      .from("vendor_verifications")
      .select("status")
      .eq("vendor_id", vendorId);

    const approvedCount =
      allVerifications?.filter((v) => v.status === "approved").length || 0;

    // Eğer en az 2 doğrulama onaylandıysa, business'i verified yap
    if (approvedCount >= 2) {
      const { data: business } = await supabaseAdmin
        .from("businesses")
        .select("id")
        .eq("owner_user_id", vendorId)
        .single();

      if (business) {
        await supabaseAdmin
          .from("businesses")
          .update({
            verification_status: "verified",
            verified_at: new Date().toISOString(),
          })
          .eq("id", business.id);
      }
    }

    // Quality score'u güncelle
    try {
      await supabaseAdmin.rpc("update_vendor_quality_score", {
        p_vendor_id: vendorId,
      });
    } catch (scoreError) {
      console.error("Quality score update error:", scoreError);
      // Hata olsa bile devam et
    }

    return NextResponse.json(
      {
        success: true,
        message: "Doğrulama başarıyla onaylandı",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Verification approval error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Doğrulama onaylanamadı" },
      { status: 400 },
    );
  }
}
