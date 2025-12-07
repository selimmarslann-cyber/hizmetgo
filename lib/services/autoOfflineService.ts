import { prisma } from "@/lib/db/prisma";
import { isWorkingHoursEnded } from "@/lib/utils/working-hours";

/**
 * Mesai saati dışındaki ONLINE işletmeleri AUTO_OFFLINE yap
 */
export async function markAutoOfflineIfOutOfWorkingHours() {
  const businesses = await prisma.business.findMany({
    where: {
      onlineStatus: "ONLINE",
      isActive: true,
    },
  });

  const updated: string[] = [];

  for (const business of businesses) {
    const workingHours = business.workingHoursJson as any;
    if (isWorkingHoursEnded(workingHours)) {
      await prisma.business.update({
        where: { id: business.id },
        data: { onlineStatus: "AUTO_OFFLINE" },
      });
      updated.push(business.id);
    }
  }

  return { updated: updated.length, businessIds: updated };
}

/**
 * 2 saatten uzun süredir cevaplanmamış PENDING_CONFIRMATION siparişleri için
 * ilgili işletmeleri AUTO_OFFLINE yap
 */
export async function markAutoOfflineIfOrderUnanswered() {
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  const unansweredOrders = await prisma.order.findMany({
    where: {
      status: "PENDING_CONFIRMATION",
      createdAt: {
        lte: twoHoursAgo,
      },
    },
    include: {
      business: true,
    },
  });

  const businessIds = new Set<string>();

  for (const order of unansweredOrders) {
    if (order.business.onlineStatus === "ONLINE") {
      await prisma.business.update({
        where: { id: order.businessId },
        data: { onlineStatus: "AUTO_OFFLINE" },
      });
      businessIds.add(order.businessId);

      // Siparişe not ekle (internal_note field'ı yoksa comment olarak eklenebilir)
      // TODO: Prisma schema'ya internal_note field'ı eklenebilir
    }
  }

  return {
    updated: businessIds.size,
    businessIds: Array.from(businessIds),
    orderCount: unansweredOrders.length,
  };
}

/**
 * Tüm AUTO_OFFLINE kontrollerini çalıştır
 * Bu fonksiyon cron job veya scheduled task tarafından periyodik olarak çağrılacak
 */
export async function runAutoOfflineChecks() {
  const [workingHoursResult, unansweredResult] = await Promise.all([
    markAutoOfflineIfOutOfWorkingHours(),
    markAutoOfflineIfOrderUnanswered(),
  ]);

  return {
    workingHours: workingHoursResult,
    unanswered: unansweredResult,
    totalUpdated: workingHoursResult.updated + unansweredResult.updated,
  };
}
