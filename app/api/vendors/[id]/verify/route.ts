/**
 * Vendor Verification API
 *
 * POST /api/vendors/[id]/verify - Usta doğrulama belgesi yükle
 * GET /api/vendors/[id]/verify - Usta doğrulama durumunu getir
 * POST /api/vendors/[id]/verify/approve - Doğrulamayı onayla (admin)
 * POST /api/vendors/[id]/verify/reject - Doğrulamayı reddet (admin)
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireVendor, requireAdmin } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const uploadVerificationSchema = z.object({
  verificationType: z.enum([
    "identity",
    "certificate",
    "license",
    "insurance",
    "background_check",
  ]),
  documentUrl: z.string().url("Geçersiz belge URL"),
  documentType: z.string().optional(),
  expiryDate: z.string().datetime().optional(), // ISO string
});

/**
 * POST /api/vendors/[id]/verify - Doğrulama belgesi yükle
 */

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

    const vendorId = params.id;

    // Usta kendi doğrulamasını yapabilir veya admin yapabilir
    if (vendorId !== userId) {
      await requireAdmin(userId);
    } else {
      await requireVendor(userId);
    }

    const body = await request.json();
    const { verificationType, documentUrl, documentType, expiryDate } =
      uploadVerificationSchema.parse(body);

    // Doğrulama kaydı oluştur veya güncelle
    const { data: verification, error: verificationError } = await supabaseAdmin
      .from("vendor_verifications")
      .upsert(
        {
          vendor_id: vendorId,
          verification_type: verificationType,
          document_url: documentUrl,
          document_type: documentType || null,
          expiry_date: expiryDate ? new Date(expiryDate).toISOString() : null,
          status: "pending",
          notes: null,
        },
        {
          onConflict: "vendor_id,verification_type",
        },
      )
      .select()
      .single();

    if (verificationError || !verification) {
      console.error("Verification creation error:", verificationError);
      return NextResponse.json(
        { error: "Doğrulama kaydı oluşturulamadı" },
        { status: 500 },
      );
    }

    // Business verification_status'u güncelle
    const { data: business } = await supabaseAdmin
      .from("businesses")
      .select("id")
      .eq("owner_user_id", vendorId)
      .single();

    if (business) {
      await supabaseAdmin
        .from("businesses")
        .update({ verification_status: "pending" })
        .eq("id", business.id);
    }

    return NextResponse.json(
      {
        success: true,
        verification: {
          id: verification.id,
          type: verification.verification_type,
          status: verification.status,
          createdAt: verification.created_at,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Verification upload error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Doğrulama belgesi yüklenemedi" },
      { status: 400 },
    );
  }
}

/**
 * GET /api/vendors/[id]/verify - Doğrulama durumunu getir
 */
export async function GET(
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

    const vendorId = params.id;

    // Usta kendi doğrulamalarını görebilir veya admin görebilir
    if (vendorId !== userId) {
      await requireAdmin(userId);
    }

    const { data: verifications, error } = await supabaseAdmin
      .from("vendor_verifications")
      .select("*")
      .eq("vendor_id", vendorId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Verifications fetch error:", error);
      return NextResponse.json(
        { error: "Doğrulama durumu yüklenemedi" },
        { status: 500 },
      );
    }

    // Quality score'u da getir
    const { data: qualityScore } = await supabaseAdmin
      .from("vendor_quality_scores")
      .select("*")
      .eq("vendor_id", vendorId)
      .single();

    return NextResponse.json(
      {
        verifications: verifications || [],
        qualityScore: qualityScore || null,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Verification fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Doğrulama durumu yüklenemedi" },
      { status: 500 },
    );
  }
}
