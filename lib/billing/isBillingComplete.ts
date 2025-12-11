/**
 * Billing Complete Helper
 * 
 * Kullanıcının fatura bilgilerinin tamamlanıp tamamlanmadığını kontrol eden helper.
 */

import { getUserBillingProfile } from "./billingService";

/**
 * Kullanıcının fatura bilgileri tamamlanmış mı?
 * 
 * @param userId Kullanıcı ID
 * @returns true ise fatura bilgileri tamamlanmış, false ise eksik
 */
export async function isUserBillingComplete(
  userId: string,
): Promise<boolean> {
  const profile = await getUserBillingProfile(userId);

  if (!profile) {
    return false;
  }

  return profile.isComplete;
}

