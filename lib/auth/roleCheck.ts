/**
 * Role Check Helper - FAZ 3
 *
 * API route'larında role kontrolü için helper fonksiyonlar
 */

import { prisma } from "@/lib/db/prisma";
import { UserRole } from "@prisma/client";

/**
 * Kullanıcının belirli rollere sahip olup olmadığını kontrol et
 * Eğer yoksa hata fırlatır
 */
export async function requireRole(
  userId: string,
  allowedRoles: UserRole[],
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }

  if (!allowedRoles.includes(user.role)) {
    throw new Error("Bu işlem için yetkiniz yok");
  }
}

/**
 * Kullanıcının belirli rollere sahip olup olmadığını kontrol et
 * Boolean döndürür (hata fırlatmaz)
 */
export async function hasRole(
  userId: string,
  allowedRoles: UserRole[],
): Promise<boolean> {
  try {
    await requireRole(userId, allowedRoles);
    return true;
  } catch {
    return false;
  }
}

/**
 * Kullanıcının admin olup olmadığını kontrol et
 */
export async function requireAdmin(userId: string): Promise<void> {
  await requireRole(userId, ["ADMIN"]);
}

/**
 * Kullanıcının vendor olup olmadığını kontrol et
 */
export async function requireVendor(userId: string): Promise<void> {
  await requireRole(userId, ["VENDOR"]);
}

/**
 * Kullanıcının customer olup olmadığını kontrol et
 */
export async function requireCustomer(userId: string): Promise<void> {
  await requireRole(userId, ["CUSTOMER"]);
}
