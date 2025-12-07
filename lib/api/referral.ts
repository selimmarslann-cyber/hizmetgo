/**
 * Referral API Client
 *
 * Referral/partner sistemi ile ilgili tüm API çağrıları bu dosyada toplanmıştır.
 */

import { fetchJson } from "./client";
import type {
  ReferralOverview,
  ReferralStats,
  ReferralRewardsResponse,
  ReferralCode,
} from "../types/domain";

/**
 * Referral özet bilgilerini al
 */
export async function getReferralOverview(): Promise<ReferralOverview> {
  return fetchJson<ReferralOverview>("/referral/overview");
}

/**
 * Referral istatistiklerini al
 */
export async function getReferralStats(): Promise<ReferralStats> {
  return fetchJson<ReferralStats>("/referral/stats");
}

/**
 * Referral kazançlarını al (pagination destekli)
 */
export async function getReferralRewards(options?: {
  page?: number;
  pageSize?: number;
  level?: number;
  dateFrom?: Date;
  dateTo?: Date;
}): Promise<ReferralRewardsResponse> {
  const params: Record<string, string> = {};
  if (options?.page) params.page = String(options.page);
  if (options?.pageSize) params.pageSize = String(options.pageSize);
  if (options?.level) params.level = String(options.level);
  if (options?.dateFrom) params.dateFrom = options.dateFrom.toISOString();
  if (options?.dateTo) params.dateTo = options.dateTo.toISOString();

  return fetchJson<ReferralRewardsResponse>("/referral/rewards", {
    params,
  });
}

/**
 * Referral kodunu al
 */
export async function getMyCode(): Promise<ReferralCode> {
  return fetchJson<ReferralCode>("/referral/my-code");
}
