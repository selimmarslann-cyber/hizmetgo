"use client";

import { useEffect, useState, useCallback } from "react"; // TS2304 fix: useCallback import missing
import { File, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileCountBadgeProps {
  orderId: string;
  maxFiles: number;
  messages?: Array<{ fileUrl?: string | null }>; // Optional messages array for real-time updates
}

export default function FileCountBadge({
  orderId,
  maxFiles,
  messages,
}: FileCountBadgeProps) {
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Calculate file count from messages if provided (real-time)
  useEffect(() => {
    if (messages) {
      const files = messages.filter(
        (m) => m.fileUrl !== null && m.fileUrl !== undefined,
      );
      setFileCount(files.length);
      setLoading(false);
      return;
    }
  }, [messages]);

  const fetchFileCount = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}/messages`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        const files = (data.messages || []).filter(
          (m: any) => m.fileUrl !== null && m.fileUrl !== undefined,
        );
        setFileCount(files.length);
      }
    } catch (err) {
      console.error("Failed to fetch file count:", err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  // Fetch file count if messages not provided
  useEffect(() => {
    if (orderId && !messages) {
      fetchFileCount();

      // Refresh file count every 5 seconds
      const interval = setInterval(fetchFileCount, 5000);
      return () => clearInterval(interval);
    }
  }, [orderId, messages, fetchFileCount]);

  if (loading || fileCount === 0) {
    return null;
  }

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
