/**
 * Billing Service
 * 
 * Kullanıcı fatura profili işlemlerini yöneten servis katmanı.
 */

import { prisma } from "@/lib/db/prisma";
import { BillingFormValues } from "./billingSchema";

/**
 * Kullanıcının fatura profilini getir
 * 
 * @param userId Kullanıcı ID
 * @returns UserBillingProfile veya null
 */
export async function getUserBillingProfile(userId: string) {
  const profile = await prisma.userBillingProfile.findUnique({
    where: { userId },
  });

  return profile;
}

/**
 * Kullanıcının fatura profilini oluştur veya güncelle
 * 
 * @param userId Kullanıcı ID
 * @param data Fatura profili verileri
 * @returns Oluşturulan/güncellenen UserBillingProfile
 */
export async function upsertUserBillingProfile(
  userId: string,
  data: BillingFormValues,
) {
  // Kullanıcının var olduğunu kontrol et
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }

  // isComplete hesaplama
  let isComplete = false;

  if (data.billingType === "PERSONAL") {
    // Şahıs için: fullName + tckn + taxOffice + city + addressLine + iban doluysa true
    isComplete =
      !!data.fullName &&
      !!data.tckn &&
      !!data.taxOffice &&
      !!data.city &&
      !!data.addressLine &&
      !!data.iban;
  } else if (data.billingType === "COMPANY") {
    // Şirket için: companyName + taxNumber + taxOffice + city + addressLine + iban doluysa true
    isComplete =
      !!data.companyName &&
      !!data.taxNumber &&
      !!data.taxOffice &&
      !!data.city &&
      !!data.addressLine &&
      !!data.iban;
  }

  // Upsert işlemi
  const profile = await prisma.userBillingProfile.upsert({
    where: { userId },
    update: {
      billingType: data.billingType,
      fullName: data.fullName || null,
      tckn: data.tckn || null,
      companyName: data.companyName || null,
      taxNumber: data.taxNumber || null,
      taxOffice: data.taxOffice,
      country: data.country || "Türkiye",
      city: data.city,
      district: data.district || null,
      addressLine: data.addressLine,
      iban: data.iban,
      invoiceDeliveryMethod: data.invoiceDeliveryMethod,
      isComplete,
    },
    create: {
      userId,
      billingType: data.billingType,
      fullName: data.fullName || null,
      tckn: data.tckn || null,
      companyName: data.companyName || null,
      taxNumber: data.taxNumber || null,
      taxOffice: data.taxOffice,
      country: data.country || "Türkiye",
      city: data.city,
      district: data.district || null,
      addressLine: data.addressLine,
      iban: data.iban,
      invoiceDeliveryMethod: data.invoiceDeliveryMethod,
      isComplete,
    },
  });

  return profile;
}

