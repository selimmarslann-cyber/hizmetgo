/**
 * Referral API Client - Mobile
 *
 * FAZ 2: Backend API'lerine bağlandı.
 */

import { request } from "./client";
import type {
  ReferralOverview,
  ReferralStats,
  ReferralRewardsResponse,
  ReferralCode,
} from "../types/domain";

/**
 * Referral özet bilgilerini al
 */
export async function fetchReferralOverview(
  authToken: string,
): Promise<ReferralOverview> {
  return request<ReferralOverview>("/api/referral/overview", {
    method: "GET",
    authToken,
  });
}

/**
 * Referral istatistiklerini al
 */
export async function fetchReferralStats(
  authToken: string,
): Promise<ReferralStats> {
  return request<ReferralStats>("/api/referral/stats", {
    method: "GET",
    authToken,
  });
}

/**
 * Referral kazançlarını al (pagination destekli)
 */
export async function fetchReferralRewards(
  authToken: string,
  options?: {
    page?: number;
    pageSize?: number;
    level?: number;
    dateFrom?: Date;
    dateTo?: Date;
  },
): Promise<ReferralRewardsResponse> {
  const params: Record<string, string> = {};
  if (options?.page !== undefined) params.page = String(options.page);
  if (options?.pageSize !== undefined)
    params.pageSize = String(options.pageSize);
  if (options?.level !== undefined) params.level = String(options.level);
  if (options?.dateFrom) params.dateFrom = options.dateFrom.toISOString();
  if (options?.dateTo) params.dateTo = options.dateTo.toISOString();

  return request<ReferralRewardsResponse>("/api/referral/rewards", {
    method: "GET",
    authToken,
    params,
  });
}

/**
 * Referral kodunu al
 */
export async function fetchMyCode(authToken: string): Promise<ReferralCode> {
  return request<ReferralCode>("/api/referral/my-code", {
    method: "GET",
    authToken,
  });
}
