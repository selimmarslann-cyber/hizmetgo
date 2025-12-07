/**
 * Wallet API Client - Mobile
 *
 * FAZ 3: Backend API'lerine bağlandı.
 */

import { request } from "./client";
import type { Wallet, PayoutRequest } from "../types/domain";

export interface WalletResponse {
  wallet: Wallet;
}

export interface PayoutRequestsResponse {
  requests: PayoutRequest[];
}

export interface CreatePayoutRequestRequest {
  amount: number;
  iban?: string;
  notes?: string;
}

export interface CreatePayoutRequestResponse {
  payoutRequest: PayoutRequest;
}

/**
 * Kullanıcının cüzdan bilgilerini getir
 */
export async function fetchWallet(authToken: string): Promise<WalletResponse> {
  return request<WalletResponse>("/api/wallet", {
    method: "GET",
    authToken,
  });
}

/**
 * Çekim talebi oluştur
 */
export async function createPayoutRequest(
  data: CreatePayoutRequestRequest,
  authToken: string,
): Promise<CreatePayoutRequestResponse> {
  return request<CreatePayoutRequestResponse>("/api/wallet/payout-requests", {
    method: "POST",
    authToken,
    body: JSON.stringify(data),
  });
}

/**
 * Kullanıcının çekim taleplerini listele
 */
export async function fetchMyPayoutRequests(
  authToken: string,
): Promise<PayoutRequestsResponse> {
  return request<PayoutRequestsResponse>("/api/wallet/payout-requests", {
    method: "GET",
    authToken,
  });
}
