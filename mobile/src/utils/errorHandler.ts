/**
 * Error Handler
 *
 * Global error handling, network error detection, user-friendly messages
 */

import { sentry } from "./sentry";
import { trackError, Events } from "./analytics";

export interface ErrorContext {
  screen?: string;
  action?: string;
  userId?: string;
  [key: string]: any;
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: any): string {
  // Network errors
  if (
    error?.message?.includes("Network request failed") ||
    error?.code === "NETWORK_ERROR"
  ) {
    return "Bağlantı sorunu oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.";
  }

  // Timeout errors
  if (error?.message?.includes("timeout") || error?.code === "TIMEOUT") {
    return "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.";
  }

  // Auth errors
  if (error?.status === 401 || error?.message?.includes("Unauthorized")) {
    return "Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.";
  }

  // Forbidden errors
  if (error?.status === 403) {
    return "Bu işlem için yetkiniz bulunmamaktadır.";
  }

  // Not found errors
  if (error?.status === 404) {
    return "Aradığınız içerik bulunamadı.";
  }

  // Server errors
  if (error?.status >= 500) {
    return "Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.";
  }

  // Validation errors
  if (error?.status === 400) {
    return (
      error?.message || "Geçersiz veri. Lütfen bilgilerinizi kontrol edin."
    );
  }

  // Generic error
  return error?.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
}

/**
 * Handle error with tracking and user-friendly message
 */
export function handleError(error: any, context?: ErrorContext): string {
  const message = getErrorMessage(error);

  // Track error
  trackError(error instanceof Error ? error : new Error(message), {
    ...context,
    originalError: error,
  });

  // Send to Sentry
  sentry.captureException(
    error instanceof Error ? error : new Error(message),
    context,
  );

  return message;
}

/**
 * Check if device is offline
 */
export function isOffline(error: any): boolean {
  return (
    error?.message?.includes("Network request failed") ||
    error?.code === "NETWORK_ERROR" ||
    error?.message?.includes("offline")
  );
}

/**
 * Check if error is auth-related
 */
export function isAuthError(error: any): boolean {
  return error?.status === 401 || error?.message?.includes("Unauthorized");
}
