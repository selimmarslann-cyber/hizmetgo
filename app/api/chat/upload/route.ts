/**
 * Chat File Upload API
 *
 * POST /api/chat/upload
 * Upload file for chat messages
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds for file uploads

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_IMAGE_DIMENSION = 4096; // Max width or height in pixels
const MAX_FILES_PER_CHAT = 5;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const orderId = formData.get("orderId") as string;

    if (!file) {
      return NextResponse.json({ error: "Dosya gereklidir" }, { status: 400 });
    }

    if (!orderId) {
      return NextResponse.json(
        { error: "Sipariş ID gereklidir" },
        { status: 400 },
      );
    }

    // Verify user has access to this order
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        OR: [{ customerId: userId }, { business: { ownerUserId: userId } }],
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Bu siparişe erişim yetkiniz yok" },
        { status: 403 },
      );
    }

    // Check file count in this chat (existing files with fileUrl)
    const existingFileCount = await prisma.message.count({
      where: {
        orderId,
        fileUrl: { not: null },
      },
    });

    if (existingFileCount >= MAX_FILES_PER_CHAT) {
      return NextResponse.json(
        {
          error: `Bir chat'te maksimum ${MAX_FILES_PER_CHAT} dosya gönderebilirsiniz.`,
        },
        { status: 400 },
      );
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
        { error: "Bu dosya türü desteklenmiyor" },
        { status: 400 },
      );
    }

    // Generate unique file name
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${orderId}/${timestamp}-${randomString}.${fileExt}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from("chat-messages")
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
      .from("chat-messages")
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      return NextResponse.json(
        { error: "Public URL alınamadı" },
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
    console.error("File upload API error:", error);
    return NextResponse.json(
      { error: error.message || "Dosya yüklenirken bir hata oluştu" },
      { status: 500 },
    );
  }
}
