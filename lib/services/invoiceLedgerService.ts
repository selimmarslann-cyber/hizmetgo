/**
 * Invoice ve Ledger Entry Oluşturma Servisi
 * 
 * Sipariş tamamlandığında invoice, ledger entry ve wallet transaction
 * kayıtlarını oluşturan servis.
 */

import { prisma } from "@/lib/db/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { calculateFeeBreakdown } from "@/lib/fees/calculator";
import { getUserReferralRate } from "@/lib/fees/referralEngine";
import { createInvoice } from "@/lib/invoice/invoiceService";
import { LedgerEntryType, WalletTransactionType } from "@prisma/client";

/**
 * Sipariş tamamlandığında invoice ve ledger entry'leri oluştur
 * 
 * @param orderId Sipariş ID
 * @param partnerId Partner ID (business owner userId)
 * @param orderAmount Sipariş toplam tutarı
 * @param commissionGross KDV dahil komisyon
 */
export async function createInvoiceAndLedgerEntries(
  orderId: string,
  partnerId: string,
  orderAmount: Decimal | number,
  commissionGross: Decimal | number,
): Promise<void> {
  // Referral rate'i hesapla
  const referralRate = await getUserReferralRate(partnerId);

  // Fee breakdown hesapla
  const breakdown = calculateFeeBreakdown(
    orderAmount,
    commissionGross,
    referralRate,
  );

  // Transaction içinde invoice ve ledger entry'leri oluştur
  await prisma.$transaction(async (tx) => {
    // 1) Invoice oluştur
    const invoice = await tx.invoice.create({
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

    // 2) Ledger Entry kayıtları oluştur
    // Platform net geliri
    await tx.ledgerEntry.create({
      data: {
        invoiceId: invoice.id,
        orderId,
        type: LedgerEntryType.PLATFORM_NET_REVENUE,
        description: `Platform net gelir - Sipariş #${orderId.slice(0, 8)}`,
        amount: breakdown.platformNet,
        currency: "TRY",
      },
    });

    // Referans fee gideri
    await tx.ledgerEntry.create({
      data: {
        invoiceId: invoice.id,
        orderId,
        type: LedgerEntryType.REFERRAL_FEE_EXPENSE,
        description: `Referans fee gideri - Sipariş #${orderId.slice(0, 8)}`,
        amount: breakdown.referralFee,
        currency: "TRY",
      },
    });

    // Ödeme sistemi fee gideri
    await tx.ledgerEntry.create({
      data: {
        invoiceId: invoice.id,
        orderId,
        type: LedgerEntryType.PAYMENT_FEE_EXPENSE,
        description: `Ödeme sistemi fee gideri - Sipariş #${orderId.slice(0, 8)}`,
        amount: breakdown.paymentFee,
        currency: "TRY",
      },
    });

    // KDV yükümlülüğü
    await tx.ledgerEntry.create({
      data: {
        invoiceId: invoice.id,
        orderId,
        type: LedgerEntryType.VAT_LIABILITY,
        description: `KDV yükümlülüğü - Sipariş #${orderId.slice(0, 8)}`,
        amount: breakdown.vatOnPlatformNet,
        currency: "TRY",
      },
    });

    // 3) Wallet Transaction kayıtları
    // Referral fee'yi L1-L5 zincirine böl
    if (breakdown.referralFee.greaterThan(0)) {
      // Order'ı çek (customerId için)
      const order = await tx.order.findUnique({
        where: { id: orderId },
        select: { customerId: true },
      });

      if (order) {
        // Referral chain'i bul (L1-L5)
        // ReferralRelation modelinden referral zincirini çek
        const referralRelations = await tx.referralRelation.findMany({
          where: {
            referredUserId: order.customerId,
          },
          orderBy: {
            level: "asc",
          },
          take: 5, // L1-L5
        });

        // Referral fee'yi L1-L5'e dağıt
        // referralService'deki LEVEL_1_SHARE_RATE (%20) ve LEVEL_2_SHARE_RATE (%10) kullan
        // Ancak burada referralFee zaten net komisyonun %25'i, bu yüzden L1-L5'e dağıtırken
        // referralFee'nin kendisini kullan, referralService'deki grossCommission değil
        // L1: %10, L2: %6, L3: %5, L4: %3, L5: %1 (toplam %25)
        const levelRates: Record<number, number> = {
          1: 0.10, // %10 of referralFee
          2: 0.06, // %6 of referralFee
          3: 0.05, // %5 of referralFee
          4: 0.03, // %3 of referralFee
          5: 0.01, // %1 of referralFee
        };

        let distributedAmount = new Decimal(0);
        if (referralRelations.length > 0) {
          for (const relation of referralRelations) {
            const levelRate = levelRates[relation.level] || 0;
            const levelAmount = breakdown.referralFee.mul(levelRate);

            if (levelAmount.greaterThan(0)) {
              await tx.walletTransaction.create({
                data: {
                  userId: relation.referrerUserId,
                  orderId,
                  type: WalletTransactionType.REFERRAL_INCOME,
                  amount: levelAmount,
                  currency: "TRY",
                  description: `Referans fee L${relation.level} - Sipariş #${orderId.slice(0, 8)}`,
                },
              });

              distributedAmount = distributedAmount.add(levelAmount);
            }
          }
        }

        // Kalan tutar varsa (toplam %25'ten az dağıtıldıysa) partner'a ekle
        // Veya referral relation yoksa tüm referralFee'yi partner'a ekle
        const remaining = breakdown.referralFee.sub(distributedAmount);
        if (remaining.greaterThan(0)) {
          await tx.walletTransaction.create({
            data: {
              userId: partnerId,
              orderId,
              type: WalletTransactionType.REFERRAL_INCOME,
              amount: remaining,
              currency: "TRY",
              description: referralRelations.length > 0
                ? `Referans fee kalan - Sipariş #${orderId.slice(0, 8)}`
                : `Referans fee (referral yok) - Sipariş #${orderId.slice(0, 8)}`,
            },
          });
        }
      }
    }

    // Partner net kazancı (orderAmount - commissionGross - paymentFee)
    const orderAmountDecimal =
      orderAmount instanceof Decimal ? orderAmount : new Decimal(orderAmount);
    const partnerNetIncome = orderAmountDecimal
      .sub(breakdown.commissionGross)
      .sub(breakdown.paymentFee);

    if (partnerNetIncome.greaterThan(0)) {
      await tx.walletTransaction.create({
        data: {
          userId: partnerId,
          orderId,
          type: WalletTransactionType.PARTNER_INCOME,
          amount: partnerNetIncome,
          currency: "TRY",
          description: `Partner net kazancı - Sipariş #${orderId.slice(0, 8)}`,
        },
      });
    }
  });

  // Muhasebe entegrasyonu (async - transaction dışında)
  Promise.resolve().then(async () => {
    try {
      const { getMockAccountingProvider } = await import(
        "@/lib/accounting/mockProvider"
      );
      const accountingProvider = getMockAccountingProvider();

      const invoice = await prisma.invoice.findUnique({
        where: { orderId },
        include: {
          partner: {
            select: {
              name: true,
            },
          },
        },
      });

      if (invoice) {
        // Billing profile'ı çek
        const { getUserBillingProfile } = await import(
          "@/lib/billing/billingService"
        );
        const billingProfile = await getUserBillingProfile(partnerId);

        // Eğer invoiceDeliveryMethod E_ARCHIVE ise muhasebe sistemine gönder
        if (billingProfile?.invoiceDeliveryMethod === "E_ARCHIVE") {
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

          // External accounting ID'yi güncelle
          await prisma.invoice.update({
            where: { id: invoice.id },
            data: { externalAccountingId: result.externalId },
          });
        } else if (billingProfile?.invoiceDeliveryMethod === "PDF_ONLY") {
          // PDF_ONLY: Sadece sistemde PDF üret
          console.log(
            `Invoice ${invoice.id} için PDF_ONLY yöntemi seçilmiş, PDF oluşturulacak.`,
          );
        } else if (billingProfile?.invoiceDeliveryMethod === "MANUAL_UPLOAD") {
          // MANUAL_UPLOAD: Kullanıcı kendi faturasını yükleyecek
          // TODO: İleride kullanıcıya fatura yükleme sayfası eklenecek
          console.log(
            `Invoice ${invoice.id} için MANUAL_UPLOAD yöntemi seçilmiş, kullanıcı kendi faturasını yükleyecek.`,
          );
        }

        // External accounting ID'yi güncelle
        await prisma.invoice.update({
          where: { id: invoice.id },
          data: { externalAccountingId: result.externalId },
        });
      }
    } catch (error) {
      console.error("Muhasebe entegrasyonu hatası:", error);
      // Hata durumunda invoice oluşturulmuş olarak kalır
    }
  });
}

