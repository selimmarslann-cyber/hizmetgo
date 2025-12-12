import { prisma } from "@/lib/db/prisma";
import { calculateFeeBreakdown } from "@/lib/fees/calculator";
import { getUserReferralRate } from "@/lib/fees/referralEngine";

/**
 * Invoice ve Ledger Entry oluştur
 * 
 * @param orderId Sipariş ID
 * @param partnerId İşletme sahibi kullanıcı ID
 * @param orderAmount Sipariş tutarı
 * @param commissionGross Komisyon tutarı (KDV dahil)
 */
export async function createInvoiceAndLedgerEntries(
  orderId: string,
  partnerId: string,
  orderAmount: number,
  commissionGross: number,
): Promise<void> {
  // Referral rate'i hesapla
  const referralRate = await getUserReferralRate(partnerId);

  // Fee breakdown hesapla
  const breakdown = calculateFeeBreakdown(
    orderAmount,
    commissionGross,
    referralRate,
  );

  // Invoice oluştur
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
    include: {
      partner: {
        select: {
          name: true,
        },
      },
    },
  });

  // Muhasebe entegrasyonu (async - transaction dışında)
  void (async () => {
    try {
      const { getMockAccountingProvider } = await import(
        "@/lib/accounting/mockProvider"
      );
      const accountingProvider = getMockAccountingProvider();

      // Billing profile'ı çek
      const { getUserBillingProfile } = await import(
        "@/lib/billing/billingService"
      );
      const billingProfile = await getUserBillingProfile(partnerId);

      // E_ARCHIVE değilse bir şey yapma (PDF_ONLY / MANUAL_UPLOAD sadece log)
      if (billingProfile?.invoiceDeliveryMethod === "PDF_ONLY") {
        console.log(
          `Invoice ${invoice.id} için PDF_ONLY yöntemi seçilmiş, PDF oluşturulacak.`,
        );
        return;
      }

      if (billingProfile?.invoiceDeliveryMethod === "MANUAL_UPLOAD") {
        console.log(
          `Invoice ${invoice.id} için MANUAL_UPLOAD yöntemi seçilmiş, kullanıcı kendi faturasını yükleyecek.`,
        );
        return;
      }

      if (billingProfile?.invoiceDeliveryMethod !== "E_ARCHIVE") {
        return;
      }

      const partnerName =
        billingProfile.billingType === "PERSONAL"
          ? billingProfile.fullName || invoice.partner.name
          : billingProfile.companyName || invoice.partner.name;

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

      // External accounting ID güncelle (result burada var)
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: { externalAccountingId: result.externalId },
      });
    } catch (error) {
      console.error("Muhasebe entegrasyonu hatası:", error);
    }
  })();
}
