/**
 * Shared OTP Store
 *
 * OTP kodlarını saklamak için paylaşılan store.
 * Production'da Redis veya database kullanılmalı.
 */

interface OtpData {
  code: string;
  expiresAt: number;
}

// In-memory OTP store (production'da Redis kullanılmalı)
const otpStore = new Map<string, OtpData>();

/**
 * OTP kaydet
 */
export function setOtp(
  phone: string,
  code: string,
  expiresInMs: number = 5 * 60 * 1000,
): void {
  const expiresAt = Date.now() + expiresInMs;
  otpStore.set(phone, { code, expiresAt });
}

/**
 * OTP al
 */
export function getOtp(phone: string): OtpData | undefined {
  return otpStore.get(phone);
}

/**
 * OTP sil
 */
export function deleteOtp(phone: string): void {
  otpStore.delete(phone);
}

/**
 * Süresi dolmuş OTP'leri temizle
 */
export function cleanupExpiredOtps(): void {
  const now = Date.now();
  Array.from(otpStore.entries()).forEach(([phone, data]) => {
    if (data.expiresAt < now) {
      otpStore.delete(phone);
    }
  });
}

// Her dakika süresi dolmuş OTP'leri temizle
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    cleanupExpiredOtps();
  }, 60000); // Her dakika temizle
}
