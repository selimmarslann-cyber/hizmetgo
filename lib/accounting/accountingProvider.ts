/**
 * Muhasebe Sistemi Provider Interface
 * 
 * Paraşüt, Logo, Mikro, KolayBi gibi muhasebe sistemleriyle
 * entegrasyon için arayüz tanımı.
 */

/**
 * Sales Invoice (Satış Faturası) verisi
 */
export interface SalesInvoiceData {
  id: string;
  partnerTaxNumber?: string; // Vergi numarası (TCKN veya Vergi No)
  partnerName: string; // Ad Soyad veya Firma Ünvanı
  billingType?: "PERSONAL" | "COMPANY"; // Fatura tipi
  taxOffice?: string; // Vergi Dairesi
  address?: string; // Adres
  commissionGross: number; // KDV dahil komisyon
  referralFee: number; // Referans fee
  paymentFee: number; // Ödeme sistemi fee
  platformNet: number; // KDV hariç net platform geliri
  vatAmount: number; // KDV
  totalAmount: number; // Toplam fatura tutarı
  issuedAt: Date;
}

/**
 * Muhasebe sistemi entegrasyonu için provider interface
 */
export interface AccountingProvider {
  /**
   * Satış faturası oluştur (e-Fatura / e-Arşiv)
   * 
   * @param invoice Fatura verisi
   * @returns External accounting ID (Paraşüt/Logo/Mikro referans numarası)
   */
  createSalesInvoice(
    invoice: SalesInvoiceData,
  ): Promise<{ externalId: string }>;

  /**
   * Muhasebe kayıtlarını export et (CSV, Excel, vb.)
   * 
   * @param from Başlangıç tarihi
   * @param to Bitiş tarihi
   * @returns Export edilmiş dosya buffer'ı
   */
  exportLedger(from: Date, to: Date): Promise<Buffer>;
}

