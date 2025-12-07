/**
 * Reviews API Client - Mobile
 *
 * FAZ 3: Backend API'lerine bağlandı.
 */

import { request } from "./client";
import type { Review } from "../types/domain";

export interface CreateReviewRequest {
  orderId: string;
  rating: number; // 1-5
  comment?: string;
}

export interface CreateReviewResponse {
  review: Review;
}

export interface BusinessReviewsResponse {
  reviews: Review[];
}

/**
 * Review oluştur
 */
export async function createReview(
  data: CreateReviewRequest,
  authToken: string,
): Promise<CreateReviewResponse> {
  return request<CreateReviewResponse>("/api/reviews", {
    method: "POST",
    authToken,
    body: JSON.stringify(data),
  });
}

/**
 * İşletme review'larını getir
 */
export async function fetchBusinessReviews(
  businessId: string,
  authToken?: string,
  limit?: number,
): Promise<BusinessReviewsResponse> {
  const params: Record<string, string> = {};
  if (limit) {
    params.limit = String(limit);
  }

  return request<BusinessReviewsResponse>(
    `/api/businesses/${businessId}/reviews`,
    {
      method: "GET",
      authToken,
      params,
    },
  );
}
