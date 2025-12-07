/**
 * Lead Contact API
 *
 * POST /api/leads/[id]/contact
 *
 * Usta iletişime geçtiğini bildirir (24 saat kuralı için)
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireVendor } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


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

    // Sadece vendor (usta) iletişim bildirebilir
    await requireVendor(userId);

    const leadPurchaseId = params.id;

    // Lead purchase'ı kontrol et
    const { data: leadPurchase, error: purchaseError } = await supabaseAdmin
      .from("lead_purchases")
      .select("id, vendor_id, contact_made_at, job_status")
      .eq("id", leadPurchaseId)
      .eq("vendor_id", userId)
      .single();

    if (purchaseError || !leadPurchase) {
      return NextResponse.json(
        { error: "Lead purchase bulunamadı veya yetkiniz yok" },
        { status: 404 },
      );
    }

    // Zaten iletişim kurulmuş mu?
    if (leadPurchase.contact_made_at) {
      return NextResponse.json(
        {
          success: true,
          message: "İletişim zaten kaydedilmiş",
          contactMadeAt: leadPurchase.contact_made_at,
        },
        { status: 200 },
      );
    }

    // İletişim tarihini kaydet
    const { error: updateError } = await supabaseAdmin
      .from("lead_purchases")
      .update({
        contact_made_at: new Date().toISOString(),
        job_status: "contacted",
      })
      .eq("id", leadPurchaseId);

    if (updateError) {
      console.error("Contact update error:", updateError);
      return NextResponse.json(
        { error: "İletişim kaydedilemedi" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "İletişim başarıyla kaydedildi",
        contactMadeAt: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Contact update error:", error);
    return NextResponse.json(
      { error: error.message || "İletişim kaydedilemedi" },
      { status: 400 },
    );
  }
}
