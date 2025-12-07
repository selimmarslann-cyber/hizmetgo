"use client";

import { useState, useRef } from "react";
import { Paperclip, X, File, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";

interface FileUploadButtonProps {
  orderId: string;
  onFileSelect: (file: {
    url: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }) => void;
  disabled?: boolean;
}

export default function FileUploadButton({
  orderId,
  onFileSelect,
  disabled = false,
}: FileUploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<{
    url: string;
    fileName: string;
    fileType: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { error, success } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      error(
        `Dosya boyutu çok büyük. Maksimum ${Math.round(maxSize / 1024 / 1024)} MB olmalı.`,
      );
      return;
    }

    // Validate image dimensions if it's an image
    if (file.type.startsWith("image/")) {
      try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            const maxDimension = 4096; // Max width or height

            if (img.width > maxDimension || img.height > maxDimension) {
              error(
                `Resim boyutu çok büyük. Maksimum ${maxDimension}x${maxDimension} piksel olmalı.`,
              );
              reject(new Error("Image too large"));
              return;
            }
            resolve();
          };

          img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Invalid image"));
          };

          img.src = objectUrl;
        });
      } catch (err: any) {
        if (err.message === "Image too large") {
          return; // Error already shown
        }
        error("Resim yüklenemedi. Lütfen geçerli bir resim seçin.");
        return;
      }
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      error("Bu dosya türü desteklenmiyor");
      return;
    }

    // Show preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview({
          url: e.target?.result as string,
          fileName: file.name,
          fileType: file.type,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreview({
        url: "",
        fileName: file.name,
        fileType: file.type,
      });
    }

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId);

      const res = await fetch("/api/chat/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Dosya yüklenemedi");
      }

      const data = await res.json();
      onFileSelect({
        url: data.url,
        fileName: data.fileName,
        fileType: data.fileType,
        fileSize: data.fileSize,
      });
      success("Dosya yüklendi");

      // Clear preview and input
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error("File upload error:", err);
      error(err.message || "Dosya yüklenirken bir hata oluştu");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf,.doc,.docx,.txt"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || uploading}
        className="p-2"
      >
        {uploading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Paperclip className="w-5 h-5" />
        )}
      </Button>

      {/* Preview */}
      {preview && (
        <div className="absolute bottom-full left-0 mb-2 p-3 bg-white border rounded-lg shadow-lg max-w-xs z-10">
          <div className="flex items-center gap-2">
            {preview.url ? (
              <img
                src={preview.url}
                alt={preview.fileName}
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                <File className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{preview.fileName}</p>
              <p className="text-xs text-gray-500">
                {preview.fileType.startsWith("image/") ? "Resim" : "Dosya"}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemovePreview}
              className="p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
