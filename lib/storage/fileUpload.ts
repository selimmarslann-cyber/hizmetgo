/**
 * File Upload Service
 *
 * Supabase Storage ile dosya yükleme servisi
 */

import { supabase } from "@/lib/supabaseClient";

export interface FileUploadResult {
  url: string;
  path: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface FileUploadOptions {
  bucket: string;
  folder?: string;
  maxSize?: number; // bytes
  allowedTypes?: string[]; // MIME types
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const DEFAULT_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

/**
 * Validate file before upload
 */
export function validateFile(
  file: File,
  options: FileUploadOptions,
): { valid: boolean; error?: string } {
  // Check file size
  const maxSize = options.maxSize || DEFAULT_MAX_SIZE;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Dosya boyutu çok büyük. Maksimum ${Math.round(maxSize / 1024 / 1024)} MB olmalı.`,
    };
  }

  // Check file type
  const allowedTypes = options.allowedTypes || DEFAULT_ALLOWED_TYPES;
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Bu dosya türü desteklenmiyor. İzin verilen türler: ${allowedTypes.join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(
  file: File,
  options: FileUploadOptions,
): Promise<FileUploadResult> {
  // Validate file
  const validation = validateFile(file, options);
  if (!validation.valid) {
    throw new Error(validation.error || "Dosya geçersiz");
  }

  // Generate unique file name
  const fileExt = file.name.split(".").pop();
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileName = `${timestamp}-${randomString}.${fileExt}`;

  // Construct file path
  const folder = options.folder || "";
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  try {
    // Upload file
    const { data, error } = await supabase.storage
      .from(options.bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(`Dosya yükleme hatası: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(options.bucket)
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      throw new Error("Public URL alınamadı");
    }

    return {
      url: urlData.publicUrl,
      path: filePath,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    };
  } catch (error: any) {
    console.error("File upload error:", error);
    throw new Error(error.message || "Dosya yüklenirken bir hata oluştu");
  }
}

/**
 * Upload image with compression (client-side)
 */
export async function uploadImage(
  file: File,
  options: FileUploadOptions & { maxWidth?: number; quality?: number },
): Promise<FileUploadResult> {
  // Check if it's an image
  if (!file.type.startsWith("image/")) {
    return uploadFile(file, options);
  }

  // Compress image if needed
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.src = e.target?.result as string;

        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Canvas context alınamadı"));
            return;
          }

          // Calculate dimensions
          const maxWidth = options.maxWidth || 1920;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob
          const quality = options.quality || 0.85;
          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                reject(new Error("Image blob oluşturulamadı"));
                return;
              }

              // Create File from blob
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });

              // Upload compressed file
              try {
                const result = await uploadFile(compressedFile, options);
                resolve(result);
              } catch (error: any) {
                reject(error);
              }
            },
            file.type,
            quality,
          );
        };

        img.onerror = () => {
          reject(new Error("Resim yüklenemedi"));
        };
      } catch (error: any) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Dosya okunamadı"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`Dosya silme hatası: ${error.message}`);
  }
}
