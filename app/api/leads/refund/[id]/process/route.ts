/**
 * Process Lead Refund API (Admin Only)
 *
 * POST /api/leads/refund/[id]/process
 *
 * Admin tarafından iade talebini onaylayıp işleme alır
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireAdmin } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const processRefundSchema = z.object({
  action: z.enum(["approve", "reject"]),
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

    // Sadece admin işleyebilir
    await requireAdmin(userId);

    const refundId = params.id;
    const body = await request.json();
    const { action, notes } = processRefundSchema.parse(body);

    // İade kaydını al
    const { data: refund, error: refundError } = await supabaseAdmin
      .from("lead_refunds")
      .select("*")
      .eq("id", refundId)
      .single();

    if (refundError || !refund) {
      return NextResponse.json(
        { error: "İade talebi bulunamadı" },
        { status: 404 },
      );
    }

    if (refund.refund_status !== "pending") {
      return NextResponse.json(
        { error: "Bu iade talebi zaten işlenmiş" },
        { status: 400 },
      );
    }

    if (action === "reject") {
      // İade talebini reddet
      const { error: updateError } = await supabaseAdmin
        .from("lead_refunds")
        .update({
          refund_status: "rejected",
          processed_at: new Date().toISOString(),
          processed_by: userId,
          notes: notes || null,
        })
        .eq("id", refundId);

      if (updateError) {
        console.error("Refund rejection error:", updateError);
        return NextResponse.json(
          { error: "İade talebi reddedilemedi" },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "İade talebi reddedildi",
        },
        { status: 200 },
      );
    }

    // İade talebini onayla ve işle
    // Önce durumu 'approved' yap
    const { error: approveError } = await supabaseAdmin
      .from("lead_refunds")
      .update({
        refund_status: "approved",
        processed_by: userId,
        notes: notes || null,
      })
      .eq("id", refundId);

    if (approveError) {
      console.error("Refund approval error:", approveError);
      return NextResponse.json(
        { error: "İade talebi onaylanamadı" },
        { status: 500 },
      );
    }

    // Supabase function'ı çağır (iade işle)
    const { data: processResult, error: processError } =
      await supabaseAdmin.rpc("process_lead_refund", {
        p_refund_id: refundId,
        p_admin_user_id: userId,
      });

    if (processError) {
      console.error("Refund processing error:", processError);
      return NextResponse.json(
        { error: "İade işlenemedi: " + processError.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "İade başarıyla işlendi",
        refund: {
          id: refundId,
          status: "processed",
          amount: refund.refund_amount_tl,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Process refund error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error.message || "İade işlenemedi" },
      { status: 400 },
    );
  }
}
