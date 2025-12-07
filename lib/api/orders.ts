/**
 * Orders API Client
 *
 * Siparişler (orders) ile ilgili tüm API çağrıları bu dosyada toplanmıştır.
 */

import { fetchJson } from "./client";
import type { Order, OrderStatus } from "../types/domain";

export interface CreateOrderRequest {
  businessId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  addressText: string;
  locationLat?: number;
  locationLng?: number;
  scheduledAt?: string;
}

export interface CreateOrderResponse {
  order: Order;
}

/**
 * Yeni sipariş oluştur
 */
export async function createOrder(
  payload: CreateOrderRequest,
): Promise<CreateOrderResponse> {
  return fetchJson<CreateOrderResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Sipariş detayını al
 */
export async function getOrderDetail(
  orderId: string,
): Promise<{ order: Order }> {
  return fetchJson<{ order: Order }>(`/orders/${orderId}`);
}

/**
 * Müşterinin siparişlerini listele
 */
export async function listCustomerOrders(customerId: string): Promise<Order[]> {
  return fetchJson<Order[]>(`/orders/customer/${customerId}`);
}

/**
 * İşletmenin siparişlerini listele
 */
export async function listBusinessOrders(
  businessId: string,
  status?: OrderStatus,
): Promise<Order[]> {
  const params: Record<string, string> = {};
  if (status) params.status = status;

  return fetchJson<Order[]>(`/orders/business/${businessId}`, {
    params,
  });
}

/**
 * Siparişi kabul et
 */
export async function acceptOrder(orderId: string): Promise<{ order: Order }> {
  return fetchJson<{ order: Order }>(`/orders/${orderId}/accept`, {
    method: "POST",
  });
}

/**
 * Siparişi reddet
 */
export async function rejectOrder(orderId: string): Promise<{ order: Order }> {
  return fetchJson<{ order: Order }>(`/orders/${orderId}/reject`, {
    method: "POST",
  });
}
