/**
 * Comprehensive Notification Service
 * Multi-channel notification dispatcher (Push, Email, SMS)
 */

import { prisma } from "@/lib/db/prisma";
import { createNotification } from "./createNotification";
import { sendExpoPushNotification } from "./push/expoPush";
import { sendMail } from "@/lib/mail";
import type { NotificationType } from "@prisma/client";
import { logError, logInfo } from "@/lib/utils/logger";

export interface NotificationOptions {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: any;

  // Channel options
  channels?: ("push" | "email" | "sms" | "whatsapp")[];
  emailSubject?: string;
  emailHtml?: string;
  smsMessage?: string;

  // User preferences check
  respectPreferences?: boolean;
}

/**
 * Send notification through multiple channels
 */
export async function sendNotification(options: NotificationOptions) {
  const {
    userId,
    type,
    title,
    body,
    data,
    channels = ["push", "email"],
    emailSubject,
    emailHtml,
    respectPreferences = true,
  } = options;

  // Get user preferences
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      // TS2353 fix: phone field does not exist in User model
      emailMarketing: true,
      smsNotifications: true,
      instantJobNotifications: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Create in-app notification (always)
  const notification = await createNotification({
    userId,
    type,
    title,
    body,
    data,
  });

  const results: Array<{ channel: string; success: boolean; error?: string }> =
    [];

  // Push Notification
  if (channels.includes("push")) {
    try {
      const pushTokens = await prisma.pushToken.findMany({
        where: { userId },
      });

      if (pushTokens.length > 0) {
        for (const token of pushTokens) {
          const result = await sendExpoPushNotification({
            to: token.expoPushToken,
            title,
            body,
            data,
            sound: "default",
            priority: "high",
          });

          results.push({
            channel: "push",
            success: result.success,
            error: result.error,
          });
        }
      }
    } catch (error: any) {
      console.error("Push notification error:", error);
      results.push({
        channel: "push",
        success: false,
        error: error.message,
      });
    }
  }

  // Email Notification
  if (channels.includes("email") && user.email) {
    // Check preferences if required
    if (
      respectPreferences &&
      !user.emailMarketing &&
      type !== "ORDER_COMPLETED" &&
      type !== "PAYOUT_APPROVED"
    ) {
      // Skip email for marketing notifications if user opted out
      // But always send critical notifications
      results.push({
        channel: "email",
        success: false,
        error: "User opted out of email marketing",
      });
    } else {
      try {
        const emailSubjectFinal = emailSubject || title;
        const emailHtmlFinal =
          emailHtml ||
          `
          <h2>${title}</h2>
          <p>${body}</p>
        `;

        await sendMail(user.email, emailSubjectFinal, emailHtmlFinal);

        results.push({
          channel: "email",
          success: true,
        });
      } catch (error: any) {
        console.error("Email notification error:", error);
        results.push({
          channel: "email",
          success: false,
          error: error.message,
        });
      }
    }
  }

  // SMS Notification - FAZ 1: Stub implementation
  // TS2339 fix: phone field does not exist in User model, skipping SMS for now
  if (channels.includes("sms") && user.smsNotifications) {
    try {
      const { scheduleExternalNotification } =
        await import("./scheduleExternalNotification");
      const result = await scheduleExternalNotification("sms", {
        userId,
        phone: "", // TS2353 fix: ExternalNotificationPayload expects 'phone', not 'to'
        message: options.smsMessage || body,
        data,
      });
      results.push({
        channel: "sms",
        success: result.success,
        error: result.error,
      });
    } catch (error: any) {
      console.error("SMS notification error:", error);
      results.push({
        channel: "sms",
        success: false,
        error: error.message,
      });
    }
  }

  // WhatsApp Notification - FAZ 1: Stub implementation
  // TS2339 fix: phone field does not exist in User model, checking whatsappNotifications only
  if (channels.includes("whatsapp")) {
    // WhatsApp tercihi kontrolü (whatsappNotifications field'ı varsa)
    const userWithWhatsApp = await prisma.user.findUnique({
      where: { id: userId },
      select: { whatsappNotifications: true },
    });

    if (userWithWhatsApp?.whatsappNotifications) {
      try {
        const { scheduleExternalNotification } =
          await import("./scheduleExternalNotification");
        const result = await scheduleExternalNotification("whatsapp", {
          userId,
          phone: "", // TS2353 fix: ExternalNotificationPayload expects 'phone', not 'to'
          message: options.smsMessage || body, // WhatsApp için de message kullan
          data,
        });
        results.push({
          channel: "whatsapp",
          success: result.success,
          error: result.error,
        });
      } catch (error: any) {
        console.error("WhatsApp notification error:", error);
        results.push({
          channel: "whatsapp",
          success: false,
          error: error.message,
        });
      }
    }
  }

  return {
    notification,
    results,
  };
}

/**
 * Send notifications to multiple users
 */
export async function sendBulkNotifications(
  userIds: string[],
  type: NotificationType,
  title: string,
  body: string,
  data?: any,
  options?: {
    channels?: ("push" | "email" | "sms" | "whatsapp")[];
    emailSubject?: string;
    emailHtml?: string;
  },
) {
  const results = await Promise.allSettled(
    userIds.map((userId) =>
      sendNotification({
        userId,
        type,
        title,
        body,
        data,
        ...options,
      }),
    ),
  );

  return results.map((result, index) => ({
    userId: userIds[index],
    success: result.status === "fulfilled",
    error: result.status === "rejected" ? result.reason?.message : undefined,
  }));
}
