/**
 * Mock Muhasebe Provider
 * 
 * Gerçek muhasebe entegrasyonu yapılmadan önce test ve geliştirme
 * için kullanılan mock implementasyon.
 * 
 * İleride Paraşüt, Logo, Mikro, KolayBi gibi gerçek provider'lar
 * eklendiğinde bu interface'i implement edecekler.
 */

import {
  AccountingProvider,
  SalesInvoiceData,
} from "./accountingProvider";

/**
 * Mock muhasebe provider implementasyonu
 */
export class MockAccountingProvider implements AccountingProvider {
  /**
   * Satış faturası oluştur (mock)
   * 
   * Gerçek implementasyonda:
   * - Paraşüt API'sine POST isteği atılır
   * - e-Fatura / e-Arşiv faturası oluşturulur
   * - Dönen fatura numarası externalId olarak kaydedilir
   */
  async createSalesInvoice(
    invoice: SalesInvoiceData,
  ): Promise<{ externalId: string }> {
    // Mock: Console'a log yaz ve sahte bir ID döndür
    console.log("[MockAccountingProvider] Satış faturası oluşturuluyor:", {
      invoiceId: invoice.id,
      partnerName: invoice.partnerName,
      partnerTaxNumber: invoice.partnerTaxNumber,
      billingType: invoice.billingType,
      taxOffice: invoice.taxOffice,
      address: invoice.address,
      totalAmount: invoice.totalAmount,
      issuedAt: invoice.issuedAt,
    });

    // Sahte external ID oluştur (format: MOCK-{timestamp}-{random})
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const externalId = `MOCK-${timestamp}-${random}`;

    // Gerçek implementasyonda burada API çağrısı yapılacak:
    // const response = await fetch('https://api.parasut.com/v4/sales_invoices', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${token}` },
    //   body: JSON.stringify({ ... })
    // });
    // return { externalId: response.data.id };

    return { externalId };
  }

  /**
   * Muhasebe kayıtlarını export et (mock)
   * 
   * Gerçek implementasyonda:
   * - Database'den ledger entries çekilir
   * - CSV veya Excel formatında formatlanır
   * - Buffer olarak döndürülür
   */
  async exportLedger(from: Date, to: Date): Promise<Buffer> {
    // Mock: Basit bir CSV header'ı oluştur
    const csvHeader = "Tarih,Tip,Açıklama,Tutar\n";
    const csvRow = `${from.toISOString()},PLATFORM_NET_REVENUE,Mock Export,1000.00\n`;
    const csvContent = csvHeader + csvRow;

    console.log("[MockAccountingProvider] Muhasebe kayıtları export ediliyor:", {
      from: from.toISOString(),
      to: to.toISOString(),
    });

    // Gerçek implementasyonda burada database'den veri çekilip CSV oluşturulacak:
    // const entries = await prisma.ledgerEntry.findMany({ where: { ... } });
    // const csv = convertToCSV(entries);
    // return Buffer.from(csv, 'utf-8');

    return Buffer.from(csvContent, "utf-8");
  }
}

/**
 * Mock provider instance'ını döndür
 * 
 * İleride environment variable'a göre gerçek provider seçilebilir:
 * - process.env.ACCOUNTING_PROVIDER === 'parasut' → ParasutProvider
 * - process.env.ACCOUNTING_PROVIDER === 'logo' → LogoProvider
 * - default → MockAccountingProvider
 */
export function getMockAccountingProvider(): AccountingProvider {
  return new MockAccountingProvider();
}

