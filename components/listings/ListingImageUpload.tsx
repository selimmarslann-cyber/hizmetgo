"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";

interface ListingImageUploadProps {
  listingId: string;
  currentImageUrl?: string | null;
  onImageUploaded: (url: string) => void;
  onImageRemoved: () => void;
}

export default function ListingImageUpload({
  listingId,
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
}: ListingImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    currentImageUrl || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentImageUrl changes
  useEffect(() => {
    setPreview(currentImageUrl || null);
  }, [currentImageUrl]);
  const { error, success } = useToast();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const MAX_IMAGE_DIMENSION = 4096; // Max width or height in pixels

  const validateImage = async (file: File): Promise<boolean> => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      error(
        `Resim boyutu çok büyük. Maksimum ${Math.round(MAX_FILE_SIZE / 1024 / 1024)} MB olmalı.`,
      );
      return false;
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      error("Sadece resim dosyaları destekleniyor (JPEG, PNG, GIF, WebP)");
      return false;
    }

    // Check image dimensions
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        if (
          img.width > MAX_IMAGE_DIMENSION ||
          img.height > MAX_IMAGE_DIMENSION
        ) {
          error(
            `Resim boyutu çok büyük. Maksimum ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION} piksel olmalı.`,
          );
          resolve(false);
          return;
        }

        resolve(true);
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        error("Geçersiz resim dosyası");
        resolve(false);
      };

      img.src = objectUrl;
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image
    const isValid = await validateImage(file);
    if (!isValid) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/listings/${listingId}/image`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Resim yüklenemedi");
      }

      const data = await res.json();
      setPreview(data.url);
      onImageUploaded(data.url);
      success("Resim yüklendi");

      // Clear input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error("Image upload error:", err);
      error(err.message || "Resim yüklenirken bir hata oluştu");
      setPreview(currentImageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!preview) return;

    try {
      const res = await fetch(`/api/listings/${listingId}/image`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Resim silinemedi");
      }

      setPreview(null);
      onImageRemoved();
      success("Resim silindi");
    } catch (err: any) {
      console.error("Image delete error:", err);
      error(err.message || "Resim silinirken bir hata oluştu");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        İlan Resmi (Opsiyonel - Tek Resim)
      </label>

      {preview ? (
        <div className="relative">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-slate-200">
            <img
              src={preview}
              alt="İlan resmi"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="mt-2"
            disabled={uploading}
          >
            <X className="w-4 h-4 mr-2" />
            Resmi Kaldır
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <div className="space-y-2">
              <Loader2 className="w-8 h-8 text-slate-400 mx-auto animate-spin" />
              <p className="text-sm text-slate-600">Resim yükleniyor...</p>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 mb-2">
                Resim yüklemek için tıklayın
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Resim Seç
              </Button>
              <p className="text-xs text-slate-500 mt-2">
                Maksimum 5 MB, {MAX_IMAGE_DIMENSION}x{MAX_IMAGE_DIMENSION}{" "}
                piksel
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
