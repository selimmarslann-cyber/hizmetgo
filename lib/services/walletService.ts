/**
 * Wallet Service - FAZ 3
 *
 * Cüzdan işlemleri: bakiye yönetimi, payout request'ler
 */

import { prisma } from "@/lib/db/prisma";
import { Decimal } from "@prisma/client/runtime/library";

/**
 * Kullanıcının cüzdanını getir veya oluştur
 */
export async function getOrCreateWallet(userId: string) {
  let wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: {
        userId,
        balance: new Decimal(0),
        pendingBalance: new Decimal(0),
        currency: "TRY",
      },
    });
  }

  return wallet;
}

/**
 * Vendor'a ödeme ekle (order tamamlandığında)
 */
export async function addVendorPayment(
  vendorUserId: string,
  amount: Decimal,
  orderId: string,
) {
  const wallet = await getOrCreateWallet(vendorUserId);

  // pendingBalance'e ekle (iş tamamlanmış, ödeme yapılabilir)
  return prisma.wallet.update({
    where: { id: wallet.id },
    data: {
      pendingBalance: {
        increment: amount,
      },
    },
  });
}

/**
 * Pending balance'i balance'e aktar (çekilebilir hale getir)
 * Not: Bu fonksiyon admin tarafından manuel olarak veya otomatik bir süreçle çağrılabilir
 */
export async function movePendingToBalance(walletId: string) {
  const wallet = await prisma.wallet.findUnique({
    where: { id: walletId },
  });

  if (!wallet) {
    throw new Error("Cüzdan bulunamadı");
  }

  if (wallet.pendingBalance.equals(0)) {
    return wallet; // Zaten aktarılacak bir şey yok
  }

  return prisma.wallet.update({
    where: { id: walletId },
    data: {
      balance: {
        increment: wallet.pendingBalance,
      },
      pendingBalance: new Decimal(0),
    },
  });
}

/**
 * Çekim talebi oluştur
 */
export async function createPayoutRequest(data: {
  userId: string;
  amount: Decimal;
  iban?: string;
  notes?: string;
}) {
  const wallet = await getOrCreateWallet(data.userId);

  // Bakiye kontrolü
  if (wallet.balance.lessThan(data.amount)) {
    throw new Error("Yetersiz bakiye");
  }

  // Çekim talebi oluştur
  const payoutRequest = await prisma.payoutRequest.create({
    data: {
      walletId: wallet.id,
      userId: data.userId,
      amount: data.amount,
      iban: data.iban,
      notes: data.notes,
      status: "PENDING",
    },
  });

  // Bakiye'den düş (pending'e ekle, admin onayladığında tamamen çıkarılır)
  // Şimdilik balance'den düşüyoruz, admin onayladığında tamamen çıkarılır
  await prisma.wallet.update({
    where: { id: wallet.id },
    data: {
      balance: {
        decrement: data.amount,
      },
    },
  });

  return payoutRequest;
}

/**
 * Kullanıcının payout request'lerini getir
 */
export async function getUserPayoutRequests(userId: string) {
  return prisma.payoutRequest.findMany({
    where: { userId },
    orderBy: { requestedAt: "desc" },
  });
}

/**
 * Admin: Payout request durumunu güncelle
 */
export async function updatePayoutRequestStatus(
  payoutRequestId: string,
  status: "APPROVED" | "REJECTED" | "PAID",
  adminUserId: string,
) {
  const payoutRequest = await prisma.payoutRequest.findUnique({
    where: { id: payoutRequestId },
    include: { wallet: true },
  });

  if (!payoutRequest) {
    throw new Error("Çekim talebi bulunamadı");
  }

  // Status güncelleme
  const updated = await prisma.payoutRequest.update({
    where: { id: payoutRequestId },
    data: {
      status,
      processedAt: new Date(),
    },
  });

  // REJECTED ise, balance'e geri ekle
  if (status === "REJECTED") {
    await prisma.wallet.update({
      where: { id: payoutRequest.walletId },
      data: {
        balance: {
          increment: payoutRequest.amount,
        },
      },
    });
  }

  return updated;
}
