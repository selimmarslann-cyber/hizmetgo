/**
 * Publish Listing API Route
 * İlanı yayınla (status: 'open' yap)
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireCustomer } from "@/lib/auth/roleCheck";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);


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

    await requireCustomer(userId);

    const listingId = params.id;
    const body = await request.json();
    const { additionalDetails, images } = body;

    // İlanın kullanıcıya ait olduğunu kontrol et
    const { data: listing, error: fetchError } = await supabaseAdmin
      .from("listings")
      .select("user_id, description, status")
      .eq("id", listingId)
      .single();

    if (fetchError || !listing) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    if (listing.user_id !== userId) {
      return NextResponse.json(
        { error: "Bu ilan size ait değil" },
        { status: 403 },
      );
    }

    // İlanı güncelle: status'u 'open' yap ve ek detayları ekle
    const updateData: any = {
      status: "open",
    };

    // Ek detaylar varsa açıklamaya ekle
    if (additionalDetails?.trim()) {
      updateData.description = `${listing.description}\n\n${additionalDetails.trim()}`;
    }

    // Resimler (şimdilik sadece placeholder - gerçek implementasyon için storage gerekir)
    // if (images && images.length > 0) {
    //   updateData.images = images
    // }

    const { data: updatedListing, error: updateError } = await supabaseAdmin
      .from("listings")
      .update(updateData)
      .eq("id", listingId)
      .select()
      .single();

    if (updateError) {
      console.error("İlan güncelleme hatası:", updateError);
      return NextResponse.json(
        { error: "İlan yayınlanamadı" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      listing: updatedListing,
    });
  } catch (error: any) {
    console.error("Publish listing error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message || "İlan yayınlanırken hata oluştu",
      },
      { status: 500 },
    );
  }
}
