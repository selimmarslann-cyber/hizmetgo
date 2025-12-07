"use client";

import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface LocalWarningProps {
  message: string;
  type?: "warning" | "error" | "info";
}

export default function LocalWarning({
  message,
  type = "warning",
}: LocalWarningProps) {
  const bgColor =
    type === "error"
      ? "bg-red-50 border-red-200"
      : type === "info"
        ? "bg-blue-50 border-blue-200"
        : "bg-yellow-50 border-yellow-200";

  const textColor =
    type === "error"
      ? "text-red-800"
      : type === "info"
        ? "text-blue-800"
        : "text-yellow-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-lg border-2 p-4 ${bgColor} ${textColor}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * İlk uyarı mesajı
 */
export const INITIAL_WARNING = `Bu alan sohbet alanı değildir.

Lütfen soruları kısa ve anlaşılır şekilde cevaplayınız.

Sistem yalnızca hizmet talebi oluşturmak için kullanılmaktadır.`;
