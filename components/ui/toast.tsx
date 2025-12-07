"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  title,
  description,
  variant = "default",
  onClose,
}: ToastProps) {
  const variantStyles = {
    default: "bg-white border-slate-200 text-slate-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    error: "bg-red-50 border-red-200 text-red-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
  };

  const iconColors = {
    default: "text-slate-600",
    success: "text-emerald-600",
    error: "text-red-600",
    warning: "text-amber-600",
    info: "text-blue-600",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 min-w-[320px] max-w-md",
        variantStyles[variant],
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              "p-1 rounded-lg hover:bg-black/5 transition-colors",
              iconColors[variant],
            )}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 max-w-md">
      {children}
    </div>
  );
}
