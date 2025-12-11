/**
 * Fee & Vergi Konfigürasyonu
 * 
 * HizmetGo komisyon, KDV, ödeme sistemi fee ve referans fee oranlarını
 * merkezi bir yerden yönetmek için konfigürasyon dosyası.
 */

export interface FeeConfig {
  /** KDV oranı (örn: 0.20 = %20) */
  taxRate: number;
  /** Ödeme sistemi fee oranı - sipariş toplamı üzerinden (örn: 0.04 = %4) */
  paymentFeeRate: number;
  /** Base referans fee oranı - komisyon üzerinden (örn: 0.25 = %25) */
  baseReferralRate: number;
  /** Komisyon dağılım oranları (toplam 1.0 olmalı) */
  commissionDistribution: {
    /** KDV payı */
    vat: number;
    /** Ödeme sistemi fee payı */
    paymentFee: number;
    /** Referans fee payı */
    referral: number;
    /** Platform net gelir payı */
    platformNet: number;
  };
}

/**
 * Varsayılan fee konfigürasyonu
 * 
 * Örnek: 100 TL komisyon (KDV dahil)
 * - KDV: %20
 * - Ödeme sistemi fee: %4 (sipariş toplamı üzerinden)
 * - Referans fee: %25 (komisyon üzerinden)
 * - Platform net gelir: %51
 */
export const DEFAULT_FEE_CONFIG: FeeConfig = {
  taxRate: 0.20, // %20 KDV
  paymentFeeRate: 0.04, // %4 ödeme sistemi fee (sipariş toplamı üzerinden)
  baseReferralRate: 0.25, // %25 base referans fee (komisyon üzerinden)
  commissionDistribution: {
    vat: 0.20, // %20 KDV
    paymentFee: 0.04, // %4 ödeme sistemi fee
    referral: 0.25, // %25 referans fee
    platformNet: 0.51, // %51 platform net gelir
  },
};

/**
 * Fee konfigürasyonunu döndürür
 * 
 * İleride environment variable'lardan veya database'den
 * dinamik olarak yüklenebilir.
 */
export function getFeeConfig(): FeeConfig {
  // Şimdilik varsayılan konfigürasyonu döndür
  // İleride: process.env.FEE_CONFIG veya database'den yükle
  return DEFAULT_FEE_CONFIG;
}

/**
 * Komisyon dağılım oranlarının toplamının 1.0 olduğunu doğrular
 * 
 * @param config Fee konfigürasyonu
 * @throws Error Eğer dağılım toplamı 1.0 değilse
 */
export function validateDistribution(config: FeeConfig): void {
  const { vat, paymentFee, referral, platformNet } =
    config.commissionDistribution;
  const total = vat + paymentFee + referral + platformNet;

  // Küçük bir tolerans payı ile kontrol et (floating point hataları için)
  if (Math.abs(total - 1.0) > 0.0001) {
    throw new Error(
      `Komisyon dağılım oranları toplamı 1.0 olmalı, şu an: ${total}`,
    );
  }
}

/**
 * Konfigürasyonu doğrula ve döndür
 * 
 * @returns Doğrulanmış fee konfigürasyonu
 */
export function getValidatedFeeConfig(): FeeConfig {
  const config = getFeeConfig();
  validateDistribution(config);
  return config;
}

