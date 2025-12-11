/**
 * Fee Hesaplama Motoru
 * 
 * Komisyon, KDV, ödeme sistemi fee, referans fee ve platform net gelir
 * hesaplamalarını yapan merkezi hesaplama motoru.
 */

import { Decimal } from "@prisma/client/runtime/library";
import { FeeConfig, getValidatedFeeConfig } from "./config";

/**
 * Fee breakdown sonuç tipi
 */
export interface FeeBreakdown {
  /** KDV dahil komisyon (girdi) */
  commissionGross: Decimal;
  /** KDV hariç net komisyon */
  netCommission: Decimal;
  /** Komisyon içindeki KDV */
  vatFromCommission: Decimal;
  /** Referans fee (TL) */
  referralFee: Decimal;
  /** Ödeme sistemi fee (TL) - sipariş toplamı üzerinden */
  paymentFee: Decimal;
  /** Platform net gelir (KDV hariç) */
  platformNet: Decimal;
  /** Platform net üzerinden KDV */
  vatOnPlatformNet: Decimal;
  /** Fatura toplam tutarı (platformNet + vatOnPlatformNet) */
  invoiceTotal: Decimal;
}

/**
 * Fee breakdown hesaplama fonksiyonu
 * 
 * @param orderAmount Sipariş toplam tutarı (KDV dahil)
 * @param commissionGross Partner'a gösterilen komisyon (KDV dahil)
 * @param userReferralRate Kullanıcıya özel referans fee oranı (default: baseReferralRate)
 * @param config Fee konfigürasyonu (opsiyonel, default kullanılır)
 * @returns Fee breakdown sonuçları
 */
export function calculateFeeBreakdown(
  orderAmount: Decimal | number,
  commissionGross: Decimal | number,
  userReferralRate?: number,
  config?: FeeConfig,
): FeeBreakdown {
  // Decimal'e çevir
  const orderAmountDecimal =
    orderAmount instanceof Decimal ? orderAmount : new Decimal(orderAmount);
  const commissionGrossDecimal =
    commissionGross instanceof Decimal
      ? commissionGross
      : new Decimal(commissionGross);

  // Konfigürasyonu al
  const feeConfig = config || getValidatedFeeConfig();
  const taxRate = new Decimal(feeConfig.taxRate);
  const paymentRate = new Decimal(feeConfig.paymentFeeRate);
  const referralRate = new Decimal(
    userReferralRate ?? feeConfig.baseReferralRate,
  );

  // 1) Komisyonu KDV'den arındır
  // commissionGross = netCommission * (1 + taxRate)
  // netCommission = commissionGross / (1 + taxRate)
  const onePlusTax = new Decimal(1).add(taxRate);
  const netCommission = commissionGrossDecimal.div(onePlusTax);
  const vatFromCommission = commissionGrossDecimal.sub(netCommission);

  // 2) Referans fee (net komisyon üzerinden)
  const referralFee = netCommission.mul(referralRate);

  // 3) Ödeme sistemi fee (sipariş toplamı üzerinden)
  const paymentFee = orderAmountDecimal.mul(paymentRate);

  // 4) Platform net gelir
  // Platform net = netCommission - referralFee - paymentFee
  const platformNet = netCommission.sub(referralFee).sub(paymentFee);

  // 5) Platform net üzerinden KDV
  const vatOnPlatformNet = platformNet.mul(taxRate);

  // 6) Fatura toplam tutarı
  const invoiceTotal = platformNet.add(vatOnPlatformNet);

  return {
    commissionGross: commissionGrossDecimal,
    netCommission,
    vatFromCommission,
    referralFee,
    paymentFee,
    platformNet,
    vatOnPlatformNet,
    invoiceTotal,
  };
}

/**
 * Fee breakdown'ı doğrula
 * 
 * Hesaplanan değerlerin matematiksel olarak tutarlı olduğunu kontrol eder.
 * 
 * @param breakdown Fee breakdown sonuçları
 * @param orderAmount Sipariş toplam tutarı (doğrulama için)
 * @param config Fee konfigürasyonu
 * @returns Doğrulama sonucu
 */
export function validateFeeBreakdown(
  breakdown: FeeBreakdown,
  orderAmount: Decimal | number,
  config?: FeeConfig,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const feeConfig = config || getValidatedFeeConfig();

  const orderAmountDecimal =
    orderAmount instanceof Decimal ? orderAmount : new Decimal(orderAmount);
  const taxRate = new Decimal(feeConfig.taxRate);
  const paymentRate = new Decimal(feeConfig.paymentFeeRate);

  // 1) commissionGross = netCommission + vatFromCommission kontrolü
  const calculatedGross = breakdown.netCommission.add(
    breakdown.vatFromCommission,
  );
  const grossDiff = calculatedGross.sub(breakdown.commissionGross).abs();
  if (grossDiff.greaterThan(new Decimal(0.01))) {
    errors.push(
      `Komisyon toplamı tutarsız: ${calculatedGross.toFixed(2)} ≠ ${breakdown.commissionGross.toFixed(2)}`,
    );
  }

  // 2) paymentFee = orderAmount * paymentRate kontrolü
  const calculatedPaymentFee = orderAmountDecimal.mul(paymentRate);
  const paymentFeeDiff = calculatedPaymentFee
    .sub(breakdown.paymentFee)
    .abs();
  if (paymentFeeDiff.greaterThan(new Decimal(0.01))) {
    errors.push(
      `Ödeme fee tutarsız: ${calculatedPaymentFee.toFixed(2)} ≠ ${breakdown.paymentFee.toFixed(2)}`,
    );
  }

  // 3) platformNet = netCommission - referralFee - paymentFee kontrolü
  const calculatedPlatformNet = breakdown.netCommission
    .sub(breakdown.referralFee)
    .sub(breakdown.paymentFee);
  const platformNetDiff = calculatedPlatformNet
    .sub(breakdown.platformNet)
    .abs();
  if (platformNetDiff.greaterThan(new Decimal(0.01))) {
    errors.push(
      `Platform net tutarsız: ${calculatedPlatformNet.toFixed(2)} ≠ ${breakdown.platformNet.toFixed(2)}`,
    );
  }

  // 4) vatOnPlatformNet = platformNet * taxRate kontrolü
  const calculatedVat = breakdown.platformNet.mul(taxRate);
  const vatDiff = calculatedVat.sub(breakdown.vatOnPlatformNet).abs();
  if (vatDiff.greaterThan(new Decimal(0.01))) {
    errors.push(
      `KDV tutarsız: ${calculatedVat.toFixed(2)} ≠ ${breakdown.vatOnPlatformNet.toFixed(2)}`,
    );
  }

  // 5) invoiceTotal = platformNet + vatOnPlatformNet kontrolü
  const calculatedTotal = breakdown.platformNet.add(
    breakdown.vatOnPlatformNet,
  );
  const totalDiff = calculatedTotal.sub(breakdown.invoiceTotal).abs();
  if (totalDiff.greaterThan(new Decimal(0.01))) {
    errors.push(
      `Fatura toplamı tutarsız: ${calculatedTotal.toFixed(2)} ≠ ${breakdown.invoiceTotal.toFixed(2)}`,
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

