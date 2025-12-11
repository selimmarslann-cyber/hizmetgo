/**
 * Fatura Servisi
 * 
 * Invoice oluşturma, PDF üretme ve fatura yönetimi işlemlerini
 * yöneten servis katmanı.
 */

import { prisma } from "@/lib/db/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { calculateFeeBreakdown } from "@/lib/fees/calculator";
import { getUserReferralRate } from "@/lib/fees/referralEngine";
import { AccountingProvider } from "@/lib/accounting/accountingProvider";
import { getMockAccountingProvider } from "@/lib/accounting/mockProvider";
import { getUserBillingProfile } from "@/lib/billing/billingService";

/**
 * Invoice oluşturma parametreleri
 */
export interface CreateInvoiceParams {
  orderId: string;
  partnerId: string; // Business owner userId
  orderAmount: Decimal | number;
  commissionGross: Decimal | number;
  userReferralRate?: number;
}

/**
 * Invoice oluştur
 * 
 * @param params Invoice oluşturma parametreleri
 * @returns Oluşturulan Invoice
 */
export async function createInvoice(
  params: CreateInvoiceParams,
): Promise<any> {
  const { orderId, partnerId, orderAmount, commissionGross, userReferralRate } =
    params;

  // Referral rate'i hesapla (eğer verilmemişse)
  const referralRate =
    userReferralRate ?? (await getUserReferralRate(partnerId));

  // Fee breakdown hesapla
  const breakdown = calculateFeeBreakdown(
    orderAmount,
    commissionGross,
    referralRate,
  );

  // Invoice kaydı oluştur
  const invoice = await prisma.invoice.create({
    data: {
      partnerId,
      orderId,
      commissionGross: breakdown.commissionGross,
      referralFee: breakdown.referralFee,
      paymentFee: breakdown.paymentFee,
      platformNet: breakdown.platformNet,
      vatAmount: breakdown.vatOnPlatformNet,
      totalAmount: breakdown.invoiceTotal,
      currency: "TRY",
      issuedAt: new Date(),
    },
  });

  // Muhasebe sistemine gönder (async)
  // Fatura teslimat yöntemine göre işlem yap
  Promise.resolve().then(async () => {
    try {
      // Kullanıcının fatura profilini çek
      const billingProfile = await getUserBillingProfile(partnerId);

      // Eğer invoiceDeliveryMethod E_ARCHIVE ise, muhasebe sistemine gönder
      if (billingProfile?.invoiceDeliveryMethod === "E_ARCHIVE") {
        const accountingProvider: AccountingProvider =
          getMockAccountingProvider();

        // Billing profile'dan partner bilgilerini al
        const partnerName =
          billingProfile.billingType === "PERSONAL"
            ? billingProfile.fullName || "Unknown"
            : billingProfile.companyName || "Unknown";

        const partnerTaxNumber =
          billingProfile.billingType === "PERSONAL"
            ? billingProfile.tckn
            : billingProfile.taxNumber;

        const result = await accountingProvider.createSalesInvoice({
          id: invoice.id,
          partnerName,
          partnerTaxNumber: partnerTaxNumber || undefined,
          billingType: billingProfile.billingType as "PERSONAL" | "COMPANY",
          taxOffice: billingProfile.taxOffice || undefined,
          address: billingProfile.addressLine || undefined,
          commissionGross: Number(breakdown.commissionGross),
          referralFee: Number(breakdown.referralFee),
          paymentFee: Number(breakdown.paymentFee),
          platformNet: Number(breakdown.platformNet),
          vatAmount: Number(breakdown.vatOnPlatformNet),
          totalAmount: Number(breakdown.invoiceTotal),
          issuedAt: invoice.issuedAt,
        });

        // External accounting ID'yi güncelle
        await prisma.invoice.update({
          where: { id: invoice.id },
          data: { externalAccountingId: result.externalId },
        });
      } else if (billingProfile?.invoiceDeliveryMethod === "PDF_ONLY") {
        // PDF_ONLY: Sadece sistemde PDF üret, dış entegrasyon çağırma
        // PDF oluşturma işlemi createInvoicePdf() fonksiyonu ile yapılacak
        // Şimdilik sadece log
        console.log(
          `Invoice ${invoice.id} için PDF_ONLY yöntemi seçilmiş, PDF oluşturulacak.`,
        );
      } else if (billingProfile?.invoiceDeliveryMethod === "MANUAL_UPLOAD") {
        // MANUAL_UPLOAD: Kullanıcı kendi faturasını yükleyecek
        // Sadece Invoice kaydı oluşturuldu, kullanıcıya faturasını yükleyebileceği bir akış bırak
        // TODO: İleride kullanıcıya fatura yükleme sayfası eklenecek
        console.log(
          `Invoice ${invoice.id} için MANUAL_UPLOAD yöntemi seçilmiş, kullanıcı kendi faturasını yükleyecek.`,
        );
      }
    } catch (error) {
      console.error("Muhasebe entegrasyonu hatası:", error);
      // Hata durumunda invoice oluşturulmuş olarak kalır, sadece externalAccountingId null kalır
    }
  });

  return invoice;
}

/**
 * Invoice PDF oluştur (stub - ileride puppeteer/node-canvas ile implement edilecek)
 * 
 * @param invoiceId Invoice ID
 * @returns PDF URL'i
 */
export async function createInvoicePdf(invoiceId: string): Promise<string> {
  // Invoice'ı database'den çek
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      partner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      order: {
        select: {
          id: true,
          totalAmount: true,
        },
      },
    },
  });

  if (!invoice) {
    throw new Error("Invoice bulunamadı");
  }

  // Şimdilik basit bir HTML template oluştur
  // İleride puppeteer veya node-canvas ile PDF'e çevrilecek
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Fatura #${invoice.id}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .invoice-details { margin-bottom: 20px; }
        .line-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>HizmetGo Komisyon Faturası</h1>
        <p>Fatura No: ${invoice.id}</p>
        <p>Tarih: ${invoice.issuedAt.toLocaleDateString("tr-TR")}</p>
      </div>
      
      <div class="invoice-details">
        <h2>Partner Bilgileri</h2>
        <p><strong>Ad:</strong> ${invoice.partner.name}</p>
        <p><strong>E-posta:</strong> ${invoice.partner.email}</p>
      </div>

      <div class="invoice-details">
        <h2>Fatura Kalemleri</h2>
        <div class="line-item">
          <span>Komisyon (KDV Dahil):</span>
          <span>${invoice.commissionGross.toFixed(2)} ₺</span>
        </div>
        <div class="line-item">
          <span>Referans Fee İndirimi:</span>
          <span>-${invoice.referralFee.toFixed(2)} ₺</span>
        </div>
        <div class="line-item">
          <span>Ödeme Sistemi Fee Kesintisi:</span>
          <span>-${invoice.paymentFee.toFixed(2)} ₺</span>
        </div>
        <div class="line-item">
          <span>Net Hizmet Bedeli (KDV Hariç):</span>
          <span>${invoice.platformNet.toFixed(2)} ₺</span>
        </div>
        <div class="line-item">
          <span>KDV (%20):</span>
          <span>${invoice.vatAmount.toFixed(2)} ₺</span>
        </div>
        <div class="line-item total">
          <span>Toplam Fatura Tutarı:</span>
          <span>${invoice.totalAmount.toFixed(2)} ₺</span>
        </div>
      </div>

      <div class="invoice-details">
        <p><strong>Sipariş No:</strong> ${invoice.orderId}</p>
      </div>
    </body>
    </html>
  `;

  // Şimdilik PDF URL'i olarak invoice ID'yi döndür
  // İleride Supabase Storage veya S3'e yüklenip URL döndürülecek
  const pdfUrl = `/api/invoices/${invoiceId}/pdf`;

  // Invoice'ı güncelle
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { pdfUrl },
  });

  return pdfUrl;
}

/**
 * Partner'ın faturalarını listele
 * 
 * @param partnerId Partner ID (userId)
 * @param limit Limit
 * @param offset Offset
 * @returns Invoice listesi
 */
export async function getPartnerInvoices(
  partnerId: string,
  limit: number = 50,
  offset: number = 0,
) {
  return prisma.invoice.findMany({
    where: { partnerId },
    include: {
      order: {
        select: {
          id: true,
          totalAmount: true,
          status: true,
        },
      },
    },
    orderBy: { issuedAt: "desc" },
    take: limit,
    skip: offset,
  });
}

/**
 * Invoice detayını getir
 * 
 * @param invoiceId Invoice ID
 * @param partnerId Partner ID (yetki kontrolü için)
 * @returns Invoice detayı
 */
export async function getInvoiceDetail(
  invoiceId: string,
  partnerId?: string,
) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      partner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      order: {
        select: {
          id: true,
          totalAmount: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  if (!invoice) {
    throw new Error("Invoice bulunamadı");
  }

  // Yetki kontrolü
  if (partnerId && invoice.partnerId !== partnerId) {
    throw new Error("Bu faturaya erişim yetkiniz yok");
  }

  return invoice;
}

