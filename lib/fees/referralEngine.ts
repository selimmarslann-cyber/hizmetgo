/**
 * Referans Rate Hesaplama Motoru
 * 
 * Kullanıcının level, rank ve custom rate'ine göre dinamik
 * referans fee oranını hesaplayan motor.
 */

import { prisma } from "@/lib/db/prisma";
import { getFeeConfig } from "./config";

/**
 * Kullanıcı referral profili
 */
export interface UserReferralProfile {
  userId: string;
  level: number; // L1, L2, L3, L4, L5
  rank: number; // Rank 0..4
  customRate?: number | null; // Kullanıcıya özel oran (opsiyonel)
}

/**
 * Level bonus oranları
 * Her level için base rate'e eklenecek bonus
 */
const LEVEL_BONUSES: Record<number, number> = {
  1: 0.10, // +%10
  2: 0.06, // +%6
  3: 0.05, // +%5
  4: 0.03, // +%3
  5: 0.01, // +%1
};

/**
 * Rank bonus oranı (rank * 0.02 = %2 per rank)
 */
const RANK_BONUS_RATE = 0.02;

/**
 * Kullanıcının referral rate'ini hesapla
 * 
 * @param userId Kullanıcı ID
 * @returns Referral rate (0.0 - 1.0 arası)
 */
export async function getUserReferralRate(
  userId: string,
): Promise<number> {
  // UserReferralProfile'ı database'den çek
  const profile = await prisma.userReferralProfile.findUnique({
    where: { userId },
  });

  // Eğer customRate varsa, onu kullan
  if (profile?.customRate !== null && profile?.customRate !== undefined) {
    return Number(profile.customRate);
  }

  // Base rate'i al
  const config = getFeeConfig();
  let rate = config.baseReferralRate;

  // Level bonusunu ekle
  const level = profile?.level ?? 0;
  if (level > 0 && level <= 5) {
    rate += LEVEL_BONUSES[level] ?? 0;
  }

  // Rank bonusunu ekle
  const rank = profile?.rank ?? 0;
  if (rank > 0) {
    rate += rank * RANK_BONUS_RATE;
  }

  // Rate'i 0.0 - 1.0 arasında sınırla
  return Math.max(0, Math.min(1, rate));
}

/**
 * Kullanıcı referral profilini getir veya oluştur
 * 
 * @param userId Kullanıcı ID
 * @returns UserReferralProfile
 */
export async function getOrCreateUserReferralProfile(
  userId: string,
): Promise<UserReferralProfile> {
  const profile = await prisma.userReferralProfile.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      level: 0,
      rank: 0,
    },
  });

  return {
    userId: profile.userId,
    level: profile.level,
    rank: profile.rank,
    customRate: profile.customRate ? Number(profile.customRate) : null,
  };
}

/**
 * Kullanıcı referral profilini güncelle
 * 
 * @param userId Kullanıcı ID
 * @param updates Güncellenecek alanlar
 */
export async function updateUserReferralProfile(
  userId: string,
  updates: {
    level?: number;
    rank?: number;
    customRate?: number | null;
  },
): Promise<UserReferralProfile> {
  const profile = await prisma.userReferralProfile.update({
    where: { userId },
    data: {
      ...(updates.level !== undefined && { level: updates.level }),
      ...(updates.rank !== undefined && { rank: updates.rank }),
      ...(updates.customRate !== undefined && {
        customRate: updates.customRate,
      }),
    },
  });

  return {
    userId: profile.userId,
    level: profile.level,
    rank: profile.rank,
    customRate: profile.customRate ? Number(profile.customRate) : null,
  };
}

