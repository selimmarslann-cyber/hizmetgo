"use client";

import { useState } from "react";
import {
  File,
  Image as ImageIcon,
  ExternalLink,
  Download,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FilePreviewProps {
  url: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
  className?: string;
}

export default function FilePreview({
  url,
  fileName,
  fileType,
  fileSize,
  className = "",
}: FilePreviewProps) {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const isImage = fileType.startsWith("image/");
  const isPDF = fileType === "application/pdf";

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isImage) {
    return (
      <>
        <div
          className={`relative cursor-pointer group ${className}`}
          onClick={() => setImageViewerOpen(true)}
        >
          <img
            src={url}
            alt={fileName}
            className="max-w-[200px] max-h-[200px] rounded-lg object-cover border border-gray-200"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors" />
        </div>

        {/* Image Viewer Modal */}
        {imageViewerOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setImageViewerOpen(false)}
          >
            <div className="relative max-w-7xl max-h-[90vh]">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                onClick={() => setImageViewerOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              <img
                src={url}
                alt={fileName}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg">
                <p className="text-sm font-medium">{fileName}</p>
                {fileSize && (
                  <p className="text-xs text-gray-300">
                    {formatFileSize(fileSize)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (isPDF) {
    return (
      <div
        className={`flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}
      >
        <File className="w-8 h-8 text-red-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {fileName}
          </p>
          {fileSize && (
            <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(url, "_blank")}
            className="p-2"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const link = document.createElement("a");
              link.href = url;
              link.download = fileName;
              link.click();
            }}
            className="p-2"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Generic file
  return (
    <div
      className={`flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg ${className}`}
    >
      <File className="w-8 h-8 text-gray-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
        {fileSize && (
          <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.open(url, "_blank")}
        className="p-2"
      >
        <ExternalLink className="w-4 h-4" />
      </Button>
    </div>
  );
}
