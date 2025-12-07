import { prisma } from "@/lib/db/prisma";
import { Decimal } from "@prisma/client/runtime/library";

/**
 * Referral Service
 * Binance/Borsa tarzı fee sharing sistemi
 */

// Referral pay oranları
const LEVEL_1_SHARE_RATE = 0.2; // %20
const LEVEL_2_SHARE_RATE = 0.1; // %10

/**
 * Kullanıcı için referral kodu oluştur veya mevcut olanı döndür
 */
export async function getOrCreateReferralCodeForUser(
  userId: string,
): Promise<string> {
  // Mevcut kodu kontrol et
  const existing = await prisma.referralCode.findUnique({
    where: { userId },
  });

  if (existing) {
    return existing.code;
  }

  // Kullanıcı bilgisini al
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }

  // Benzersiz kod oluştur
  const baseCode = user.name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .substring(0, 10); // İlk 10 karakter

  let code = baseCode;
  let counter = 1;

  // Benzersizlik kontrolü
  while (await prisma.referralCode.findUnique({ where: { code } })) {
    code = `${baseCode}${counter}`;
    counter++;
  }

  // Eğer hala çok kısa ise random ekle
  if (code.length < 6) {
    code = `${code}${Math.floor(Math.random() * 10000)}`;
  }

  // Kayıt oluştur
  await prisma.referralCode.create({
    data: {
      userId,
      code,
    },
  });

  return code;
}

/**
 * Yeni kullanıcı kayıt olduğunda referral chain oluştur
 *
 * @param newUserId Yeni kayıt olan kullanıcı ID'si
 * @param optionalRefCode Opsiyonel referral kodu (query param'dan gelir)
 */
export async function buildReferralChainOnRegister(
  newUserId: string,
  optionalRefCode?: string,
): Promise<void> {
  if (!optionalRefCode) {
    // Referral kodu yok, sadece kendi kodunu oluştur
    await getOrCreateReferralCodeForUser(newUserId);
    return;
  }

  // Referral kodunu bul
  const referrerCode = await prisma.referralCode.findUnique({
    where: { code: optionalRefCode },
    include: { user: true },
  });

  if (!referrerCode) {
    // Geçersiz kod, sadece kendi kodunu oluştur
    await getOrCreateReferralCodeForUser(newUserId);
    return;
  }

  const referrerUserId = referrerCode.userId;

  // Kendi kendini refer edemez
  if (referrerUserId === newUserId) {
    await getOrCreateReferralCodeForUser(newUserId);
    return;
  }

  // Transaction ile referral chain oluştur
  await prisma.$transaction(async (tx) => {
    // 1. Yeni kullanıcı için referral kodu oluştur
    // Transaction içinde referral code oluşturma
    const existingCode = await tx.referralCode.findUnique({
      where: { userId: newUserId },
    });

    if (!existingCode) {
      const user = await tx.user.findUnique({
        where: { id: newUserId },
        select: { name: true },
      });

      if (user) {
        const baseCode = user.name
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .substring(0, 10);

        let code = baseCode;
        let counter = 1;

        while (await tx.referralCode.findUnique({ where: { code } })) {
          code = `${baseCode}${counter}`;
          counter++;
        }

        if (code.length < 6) {
          code = `${code}${Math.floor(Math.random() * 10000)}`;
        }

        await tx.referralCode.create({
          data: {
            userId: newUserId,
            code,
          },
        });
      }
    }

    // 2. Level 1 ilişki oluştur (referrer -> newUser)
    await tx.referralRelation.create({
      data: {
        referrerUserId,
        referredUserId: newUserId,
        level: 1,
      },
    });

    // 3. Level 2 ilişki kontrolü
    // Eğer referrer'ın kendisinin de bir referrer'ı varsa (level 1)
    const referrerLevel1 = await tx.referralRelation.findFirst({
      where: {
        referredUserId: referrerUserId,
        level: 1,
      },
    });

    if (referrerLevel1) {
      // Level 2 ilişki oluştur (grandparent -> newUser)
      await tx.referralRelation.create({
        data: {
          referrerUserId: referrerLevel1.referrerUserId,
          referredUserId: newUserId,
          level: 2,
        },
      });
    }
  });
}

/**
 * Sipariş tamamlandığında referral ödüllerini dağıt
 *
 * Bu fonksiyon order COMPLETED olduğunda çağrılmalı
 *
 * @param orderId Tamamlanan sipariş ID'si
 */
export async function distributeReferralRewards(
  orderId: string,
): Promise<void> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
    },
  });

  if (!order) {
    throw new Error("Sipariş bulunamadı");
  }

  // Sipariş COMPLETED değilse veya commission_fee yoksa işlem yapma
  if (order.status !== "COMPLETED" || order.commissionFee.toNumber() <= 0) {
    return;
  }

  const customerId = order.customerId;
  const grossCommission = order.commissionFee;

  // Müşterinin referral ilişkilerini bul
  const referralRelations = await prisma.referralRelation.findMany({
    where: {
      referredUserId: customerId,
    },
    orderBy: {
      level: "asc",
    },
  });

  if (referralRelations.length === 0) {
    // Referral ilişkisi yok, ödül dağıtma
    return;
  }

  // Transaction ile ödül dağıtımı
  await prisma.$transaction(async (tx) => {
    for (const relation of referralRelations) {
      const shareRate =
        relation.level === 1 ? LEVEL_1_SHARE_RATE : LEVEL_2_SHARE_RATE;
      const amount = grossCommission.mul(shareRate);

      // Referral reward kaydı oluştur
      await tx.referralReward.create({
        data: {
          userId: relation.referrerUserId,
          orderId: order.id,
          level: relation.level,
          grossCommission,
          shareRate: new Decimal(shareRate),
          amount,
        },
      });

      // Kullanıcının referral balance'ını artır
      await tx.user.update({
        where: { id: relation.referrerUserId },
        data: {
          referralBalance: {
            increment: amount,
          },
        },
      });
    }
  });
}

/**
 * Kullanıcının referral overview bilgilerini getir
 */
export async function getReferralOverview(userId: string) {
  // Referral kodu
  const referralCode = await getOrCreateReferralCodeForUser(userId);

  // Toplam kazanç (referral_rewards toplamı)
  const totalEarningsResult = await prisma.referralReward.aggregate({
    where: { userId },
    _sum: { amount: true },
  });
  const totalEarnings = totalEarningsResult._sum.amount || new Decimal(0);

  // Bu ayki kazanç
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyEarningsResult = await prisma.referralReward.aggregate({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth,
      },
    },
    _sum: { amount: true },
  });
  const monthlyEarnings = monthlyEarningsResult._sum.amount || new Decimal(0);

  // Level 1 ve Level 2 sayıları
  const level1Count = await prisma.referralRelation.count({
    where: {
      referrerUserId: userId,
      level: 1,
    },
  });

  const level2Count = await prisma.referralRelation.count({
    where: {
      referrerUserId: userId,
      level: 2,
    },
  });

  // Level 1 ve Level 2 kazançları
  const level1EarningsResult = await prisma.referralReward.aggregate({
    where: {
      userId,
      level: 1,
    },
    _sum: { amount: true },
  });
  const level1Earnings = level1EarningsResult._sum.amount || new Decimal(0);

  const level2EarningsResult = await prisma.referralReward.aggregate({
    where: {
      userId,
      level: 2,
    },
    _sum: { amount: true },
  });
  const level2Earnings = level2EarningsResult._sum.amount || new Decimal(0);

  // Referral link
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const referralLink = `${appUrl}/auth/register?ref=${referralCode}`;

  return {
    currentReferralCode: referralCode,
    referralLink,
    totalEarnings,
    monthlyEarnings,
    level1Count,
    level2Count,
    level1Earnings,
    level2Earnings,
    currentBalance:
      (
        await prisma.user.findUnique({
          where: { id: userId },
          select: { referralBalance: true },
        })
      )?.referralBalance || new Decimal(0),
  };
}

/**
 * Kullanıcının referral reward geçmişini getir
 */
export async function getReferralRewards(
  userId: string,
  filters?: {
    page?: number;
    pageSize?: number;
    level?: number;
    dateFrom?: Date;
    dateTo?: Date;
  },
) {
  const page = filters?.page || 1;
  const pageSize = filters?.pageSize || 20;
  const skip = (page - 1) * pageSize;

  const where: any = {
    userId,
  };

  if (filters?.level) {
    where.level = filters.level;
  }

  if (filters?.dateFrom || filters?.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) {
      where.createdAt.gte = filters.dateFrom;
    }
    if (filters.dateTo) {
      where.createdAt.lte = filters.dateTo;
    }
  }

  const [rewards, total] = await Promise.all([
    prisma.referralReward.findMany({
      where,
      include: {
        order: {
          select: {
            id: true,
            totalAmount: true,
            createdAt: true,
            business: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    }),
    prisma.referralReward.count({ where }),
  ]);

  return {
    rewards,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}
