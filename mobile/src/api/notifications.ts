/**
 * Notifications API Client - Mobile
 *
 * FAZ 3: Backend API'lerine bağlandı.
 */

import { request } from "./client";
import type { Notification } from "../types/domain";

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface UpdateNotificationRequest {
  id: string;
  isRead: boolean;
}

export interface UpdateNotificationResponse {
  notification: {
    id: string;
    isRead: boolean;
  };
}

/**
 * Kullanıcının bildirimlerini getir
 */
export async function fetchNotifications(
  authToken: string,
  options?: {
    limit?: number;
    isRead?: boolean;
  },
): Promise<NotificationsResponse> {
  const params: Record<string, string> = {};
  if (options?.limit) {
    params.limit = String(options.limit);
  }
  if (options?.isRead !== undefined) {
    params.isRead = String(options.isRead);
  }

  return request<NotificationsResponse>("/api/notifications", {
    method: "GET",
    authToken,
    params,
  });
}

/**
 * Bildirimi okundu olarak işaretle
 */
export async function markNotificationAsRead(
  notificationId: string,
  isRead: boolean,
  authToken: string,
): Promise<UpdateNotificationResponse> {
  return request<UpdateNotificationResponse>("/api/notifications", {
    method: "PATCH",
    authToken,
    body: JSON.stringify({
      id: notificationId,
      isRead,
    }),
  });
}
