/**
 * Toast Hook - Alert() yerine kullanılacak
 *
 * @radix-ui/react-toast kullanarak toast notification sistemi
 */

"use client";

import { useState, useCallback } from "react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  title?: string;
  description: string;
  variant: ToastVariant;
  duration?: number;
}

let toastIdCounter = 0;
const toastListeners: Set<(toast: Toast) => void> = new Set();

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${++toastIdCounter}`;
    const newToast: Toast = { ...toast, id, duration: toast.duration || 5000 };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    const duration = newToast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (
      description: string,
      variant: ToastVariant = "default",
      title?: string,
    ) => {
      return addToast({ description, variant, title });
    },
    [addToast],
  );

  const success = useCallback(
    (description: string, title?: string) => {
      return addToast({
        description,
        variant: "success",
        title: title || "Başarılı",
      });
    },
    [addToast],
  );

  const error = useCallback(
    (description: string, title?: string) => {
      return addToast({
        description,
        variant: "error",
        title: title || "Hata",
      });
    },
    [addToast],
  );

  const warning = useCallback(
    (description: string, title?: string) => {
      return addToast({
        description,
        variant: "warning",
        title: title || "Uyarı",
      });
    },
    [addToast],
  );

  const info = useCallback(
    (description: string, title?: string) => {
      return addToast({
        description,
        variant: "info",
        title: title || "Bilgi",
      });
    },
    [addToast],
  );

  return {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    removeToast,
  };
}

// Global toast function (alert() yerine kullanılacak)
let globalToastHandler:
  | ((description: string, variant?: ToastVariant, title?: string) => void)
  | null = null;

export function setGlobalToastHandler(handler: typeof globalToastHandler) {
  globalToastHandler = handler;
}

export function showToast(
  description: string,
  variant: ToastVariant = "default",
  title?: string,
) {
  if (globalToastHandler) {
    globalToastHandler(description, variant, title);
  } else {
    // Fallback to alert if toast not initialized
    alert(description);
  }
}

export function showSuccess(description: string, title?: string) {
  showToast(description, "success", title);
}

export function showError(description: string, title?: string) {
  showToast(description, "error", title);
}

export function showWarning(description: string, title?: string) {
  showToast(description, "warning", title);
}

export function showInfo(description: string, title?: string) {
  showToast(description, "info", title);
}
