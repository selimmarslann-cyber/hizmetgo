/**
 * Expo Push Notification Service
 * Mobile app push notifications via Expo Push Notification Service
 */

import { Expo } from "expo-server-sdk";

// Create a new Expo SDK client
const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN, // Optional: for higher rate limits
});

export interface ExpoPushMessage {
  to: string; // Expo push token
  sound?: "default" | null;
  title?: string;
  body?: string;
  data?: any;
  badge?: number;
  priority?: "default" | "normal" | "high";
  channelId?: string;
}

/**
 * Send push notification to Expo device
 */
export async function sendExpoPushNotification(
  message: ExpoPushMessage,
): Promise<{
  success: boolean;
  receiptId?: string;
  error?: string;
}> {
  try {
    // Validate token format
    if (!Expo.isExpoPushToken(message.to)) {
      return {
        success: false,
        error: "Invalid Expo push token format",
      };
    }

    // Create message chunks (Expo allows up to 100 messages per request)
    const chunks = expo.chunkPushNotifications([message]);
    const tickets = [];

    // Send all chunks
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error: any) {
        console.error("Error sending Expo push notification chunk:", error);
        return {
          success: false,
          error: error.message || "Failed to send push notification",
        };
      }
    }

    // Check ticket results
    if (tickets.length > 0) {
      const ticket = tickets[0];

      // If there's an error, return it
      if (ticket.status === "error") {
        return {
          success: false,
          error: ticket.message || "Push notification error",
        };
      }

      // If successful, return receipt ID for tracking
      if (ticket.status === "ok" && ticket.id) {
        return {
          success: true,
          receiptId: ticket.id,
        };
      }
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Expo push notification error:", error);
    return {
      success: false,
      error: error.message || "Failed to send push notification",
    };
  }
}

/**
 * Send push notifications to multiple devices
 */
export async function sendBulkExpoPushNotifications(
  messages: ExpoPushMessage[],
): Promise<Array<{ success: boolean; receiptId?: string; error?: string }>> {
  const results: Array<{
    success: boolean;
    receiptId?: string;
    error?: string;
  }> = [];

  // Filter valid tokens
  const validMessages = messages.filter((msg) => Expo.isExpoPushToken(msg.to));
  const invalidCount = messages.length - validMessages.length;

  if (invalidCount > 0) {
    console.warn(`${invalidCount} invalid Expo push tokens filtered out`);
  }

  if (validMessages.length === 0) {
    return messages.map(() => ({
      success: false,
      error: "No valid push tokens",
    }));
  }

  // Create chunks
  const chunks = expo.chunkPushNotifications(validMessages);

  try {
    // Send all chunks
    for (const chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);

      // Map tickets to results
      for (let i = 0; i < ticketChunk.length; i++) {
        const ticket = ticketChunk[i];
        const originalIndex = validMessages.findIndex(
          (msg) => msg.to === chunk[i].to,
        );

        if (ticket.status === "error") {
          results[originalIndex] = {
            success: false,
            error: ticket.message || "Push notification error",
          };
        } else {
          results[originalIndex] = {
            success: true,
            receiptId: ticket.id,
          };
        }
      }
    }

    // Add error results for invalid tokens
    for (let i = 0; i < messages.length; i++) {
      if (!Expo.isExpoPushToken(messages[i].to)) {
        results[i] = {
          success: false,
          error: "Invalid push token format",
        };
      }
    }

    return results;
  } catch (error: any) {
    console.error("Bulk Expo push notification error:", error);
    return messages.map(() => ({
      success: false,
      error: error.message || "Failed to send push notifications",
    }));
  }
}
