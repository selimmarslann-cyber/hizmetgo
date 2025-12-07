/**
 * Listing Image Upload API
 *
 * POST /api/listings/[id]/image
 * Upload a single image for a listing
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_IMAGE_DIMENSION = 4096; // Max width or height in pixels
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

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

    const listingId = params.id;

    // Verify listing exists and user owns it
    const { data: listing, error: listingError } = await supabaseAdmin
      .from("listings")
      .select("id, user_id, image_url")
      .eq("id", listingId)
      .single();

    if (listingError || !listing) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    if (String(listing.user_id) !== String(userId)) {
      return NextResponse.json(
        { error: "Bu ilanı güncelleme yetkiniz yok" },
        { status: 403 },
      );
    }

    // Check if listing already has an image
    if (listing.image_url) {
      return NextResponse.json(
        { error: "İlan zaten bir resme sahip. Önce mevcut resmi silin." },
        { status: 400 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Dosya gereklidir" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `Dosya boyutu çok büyük. Maksimum ${Math.round(MAX_FILE_SIZE / 1024 / 1024)} MB olmalı.`,
        },
        { status: 400 },
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Sadece resim dosyaları destekleniyor (JPEG, PNG, GIF, WebP)",
        },
        { status: 400 },
      );
    }

    // Generate unique file name
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `listings/${listingId}/${timestamp}-${randomString}.${fileExt}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from("listings")
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json(
        { error: `Dosya yükleme hatası: ${error.message}` },
        { status: 500 },
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("listings")
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      return NextResponse.json(
        { error: "Public URL alınamadı" },
        { status: 500 },
      );
    }

    // Update listing with image URL
    const { error: updateError } = await supabaseAdmin
      .from("listings")
      .update({ image_url: urlData.publicUrl })
      .eq("id", listingId);

    if (updateError) {
      console.error("Listing update error:", updateError);
      // Try to delete uploaded file
      await supabaseAdmin.storage.from("listings").remove([fileName]);
      return NextResponse.json(
        { error: "İlan güncellenemedi" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      url: urlData.publicUrl,
      path: fileName,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (error: any) {
    console.error("Listing image upload error:", error);
    return NextResponse.json(
      { error: error.message || "Resim yüklenirken bir hata oluştu" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/listings/[id]/image
 * Delete listing image
 */
export async function DELETE(
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

    const listingId = params.id;

    // Verify listing exists and user owns it
    const { data: listing, error: listingError } = await supabaseAdmin
      .from("listings")
      .select("id, user_id, image_url")
      .eq("id", listingId)
      .single();

    if (listingError || !listing) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    if (String(listing.user_id) !== String(userId)) {
      return NextResponse.json(
        { error: "Bu ilanı güncelleme yetkiniz yok" },
        { status: 403 },
      );
    }

    if (!listing.image_url) {
      return NextResponse.json(
        { error: "İlan resmi bulunamadı" },
        { status: 404 },
      );
    }

    // Extract file path from URL
    const url = new URL(listing.image_url);
    const pathParts = url.pathname.split("/");
    const fileName = pathParts.slice(pathParts.indexOf("listings")).join("/");

    // Delete from storage
    const { error: deleteError } = await supabaseAdmin.storage
      .from("listings")
      .remove([fileName]);

    if (deleteError) {
      console.error("File delete error:", deleteError);
      // Continue with database update even if file delete fails
    }

    // Update listing to remove image URL
    const { error: updateError } = await supabaseAdmin
      .from("listings")
      .update({ image_url: null })
      .eq("id", listingId);

    if (updateError) {
      console.error("Listing update error:", updateError);
      return NextResponse.json(
        { error: "İlan güncellenemedi" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Listing image delete error:", error);
    return NextResponse.json(
      { error: error.message || "Resim silinirken bir hata oluştu" },
      { status: 500 },
    );
  }
}
