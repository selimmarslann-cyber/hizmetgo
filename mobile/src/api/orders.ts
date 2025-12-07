/**
 * Orders API Client - Mobile
 *
 * FAZ 3: Backend API'lerine bağlandı.
 */

import { request } from "./client";
import type { Order } from "../types/domain";

export interface OrdersResponse {
  orders: Order[];
}

export interface CompleteOrderResponse {
  order: {
    id: string;
    status: string;
    completedAt: string | null;
  };
}

/**
 * Müşteri siparişlerini getir
 */
export async function fetchCustomerOrders(
  customerId: string,
  authToken: string,
): Promise<OrdersResponse> {
  return request<OrdersResponse>(`/api/orders/customer/${customerId}`, {
    method: "GET",
    authToken,
  });
}

/**
 * İşletme siparişlerini getir
 */
export async function fetchBusinessOrders(
  businessId: string,
  authToken: string,
  status?: string,
): Promise<OrdersResponse> {
  const params: Record<string, string> = {};
  if (status) {
    params.status = status;
  }

  return request<OrdersResponse>(`/api/orders/business/${businessId}`, {
    method: "GET",
    authToken,
    params,
  });
}

/**
 * Siparişi tamamla (vendor)
 */
export async function completeOrder(
  orderId: string,
  authToken: string,
): Promise<CompleteOrderResponse> {
  return request<CompleteOrderResponse>(`/api/orders/${orderId}/complete`, {
    method: "POST",
    authToken,
  });
}

/**
 * Siparişi kabul et (vendor)
 */
export async function acceptOrder(
  orderId: string,
  authToken: string,
): Promise<{ order: Order }> {
  return request<{ order: Order }>(`/api/orders/${orderId}/accept`, {
    method: "POST",
    authToken,
  });
}

/**
 * Siparişi reddet (vendor)
 */
export async function rejectOrder(
  orderId: string,
  authToken: string,
): Promise<{ order: Order }> {
  return request<{ order: Order }>(`/api/orders/${orderId}/reject`, {
    method: "POST",
    authToken,
  });
}
