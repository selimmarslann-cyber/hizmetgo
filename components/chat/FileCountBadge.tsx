"use client";

import { useEffect, useState, useCallback } from "react";
import { File, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileCountBadgeProps {
  orderId: string;
  maxFiles: number;
  messages?: Array<{ fileUrl?: string | null }>;
}

export default function FileCountBadge({
  orderId,
  maxFiles,
  messages,
}: FileCountBadgeProps) {
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchFileCount = useCallback(async () => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}/messages`, {
        credentials: "include",
      });

      if (!res.ok) {
        setFileCount(0);
        return;
      }

      const data = await res.json();
      const files = (data?.messages || []).filter(
        (m: any) => m?.fileUrl !== null && m?.fileUrl !== undefined,
      );
      setFileCount(files.length);
    } catch (err) {
      console.error("Failed to fetch file count:", err);
      setFileCount(0);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  // Real-time: messages varsa count'u oradan hesapla
  useEffect(() => {
    if (!messages) return;

    const files = messages.filter(
      (m) => m.fileUrl !== null && m.fileUrl !== undefined,
    );
    setFileCount(files.length);
    setLoading(false);
    return; // TS7030 safe
  }, [messages]);

  // messages yoksa API'den çek + interval
  useEffect(() => {
    if (!orderId || messages) return;

    void fetchFileCount();

    const interval = setInterval(() => {
      void fetchFileCount();
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, messages, fetchFileCount]);

  if (loading || fileCount === 0) return null;

  const remaining = maxFiles - fileCount;

  if (remaining <= 0) {
    return (
      <div className="flex items-center gap-2 text-red-600 text-xs">
        <AlertCircle className="w-4 h-4" />
        <span>
          Maksimum dosya limitine ulaşıldı ({maxFiles}/{maxFiles})
        </span>
      </div>
    );
  }

  return (
    <Badge variant="secondary" className="text-xs">
      <File className="w-3 h-3 mr-1" />
      {fileCount}/{maxFiles} dosya gönderildi ({remaining} kaldı)
    </Badge>
  );
}
