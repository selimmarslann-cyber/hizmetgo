import { prisma } from "@/lib/db/prisma";
import { OnlineStatus } from "@prisma/client";
import { updateOnlineStatus } from "./businessService";

/**
 * Online/Offline toggle servisi
 * Ban kontrolü yapar
 */
export async function toggleOnlineStatus(businessId: string, userId: string) {
  const business = await prisma.business.findUnique({
    where: { id: businessId },
  });

  if (!business) {
    throw new Error("İşletme bulunamadı");
  }

  if (business.ownerUserId !== userId) {
    throw new Error("Yetkisiz erişim");
  }

  // Ban kontrolü
  if (business.bannedUntil && business.bannedUntil > new Date()) {
    throw new Error(
      `Bu işletme ${business.bannedUntil.toLocaleDateString("tr-TR")} tarihine kadar banlı`,
    );
  }

  // Toggle
  const newStatus: OnlineStatus =
    business.onlineStatus === "ONLINE" ? "OFFLINE" : "ONLINE";

  return updateOnlineStatus(businessId, newStatus);
}
