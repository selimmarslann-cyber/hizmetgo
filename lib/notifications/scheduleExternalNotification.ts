/**
 * External Notification Scheduler - FAZ 1
 *
 * WhatsApp ve SMS bildirimleri için stub fonksiyonlar
 * Gerçek entegrasyon FAZ 2'de yapılacak
 */

import { logInfo, logError } from "@/lib/utils/logger";

export interface ExternalNotificationPayload {
  userId: string;
  phone: string; // Telefon numarası
  message: string; // Mesaj içeriği
  data?: any; // Ek veri
}

/**
 * WhatsApp veya SMS bildirimi planla
 *
 * FAZ 1: Sadece stub - console.log ile payload'ı yazdırır
 * FAZ 2: Gerçek WhatsApp/SMS provider entegrasyonu (Twilio, Netgsm, vb.)
 */
export async function scheduleExternalNotification(
  channel: "whatsapp" | "sms",
  payload: ExternalNotificationPayload,
): Promise<{ success: boolean; error?: string }> {
  try {
    // FAZ 1: Stub implementation
    logInfo(`[${channel.toUpperCase()} Notification Stub]`, {
      userId: payload.userId,
      phone: payload.phone,
      message: payload.message.substring(0, 100), // İlk 100 karakter
      data: payload.data,
      timestamp: new Date().toISOString(),
    });

    // TODO: FAZ 2'de gerçek entegrasyon
    // - WhatsApp: Twilio WhatsApp Business API veya benzeri
    // - SMS: Twilio SMS API, Netgsm, vb.
    // - Rate limiting ve retry logic
    // - Delivery status tracking

    return { success: true };
  } catch (error: any) {
    logError(`External notification error (${channel}):`, error);
    return {
      success: false,
      error: error.message || "External notification failed",
    };
  }
}
