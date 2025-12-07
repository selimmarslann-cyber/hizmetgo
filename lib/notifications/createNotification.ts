/**
 * Notification Service - FAZ 3
 *
 * Bildirim oluşturma helper'ı
 */

import { prisma } from "@/lib/db/prisma";
import { NotificationType } from "@prisma/client";

/**
 * Bildirim oluştur
 */
export async function createNotification(data: {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: any; // Json data
}) {
  return prisma.notification.create({
    data: {
      userId: data.userId,
      type: data.type,
      title: data.title,
      body: data.body,
      data: data.data ? JSON.parse(JSON.stringify(data.data)) : null,
      isRead: false,
    },
  });
}

/**
 * Birden fazla kullanıcıya bildirim gönder
 */
export async function createNotificationsForUsers(
  userIds: string[],
  type: NotificationType,
  title: string,
  body: string,
  data?: any,
) {
  const notifications = userIds.map((userId) => ({
    userId,
    type,
    title,
    body,
    data: data ? JSON.parse(JSON.stringify(data)) : null,
    isRead: false,
  }));

  return prisma.notification.createMany({
    data: notifications,
  });
}
