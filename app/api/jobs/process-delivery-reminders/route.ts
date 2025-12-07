import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { sendMail } from "@/lib/mail";
import { buildDeliverySoonEmail } from "@/lib/mailTemplates";

/**
 * Process Delivery Reminders Job
 *
 * Bu endpoint cron job olarak çalışır (her 1 dakikada bir).
 * Teslime 5 dakika kala hatırlatma maili gönderir.
 *
 * Akış:
 * 1. Şu anki zamandan önceki ama processed = false olan DeliveryReminder kayıtlarını çeker
 * 2. Her bir kayıt için:
 *    - İlgili order + müşteri bilgilerini alır
 *    - buildDeliverySoonEmail() ile mail oluşturur
 *    - sendMail() ile gönderir
 *    - processed = true yapar
 */

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    // API key kontrolü (cron job güvenliği için - opsiyonel)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();

    // İşlenmemiş ve zamanı gelmiş hatırlatmaları bul
    const reminders = await prisma.deliveryReminder.findMany({
      where: {
        processed: false,
        remindAt: {
          lte: now, // remindAt <= now (zamanı geldi)
        },
      },
      include: {
        order: {
          include: {
            customer: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      take: 100, // Her seferinde maksimum 100 tane işle (performans için)
    });

    if (reminders.length === 0) {
      return NextResponse.json({
        success: true,
        processed: 0,
        message: "İşlenecek hatırlatma yok",
      });
    }

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Her hatırlatmayı işle
    for (const reminder of reminders) {
      try {
        // Order'ın hala aktif olup olmadığını kontrol et
        if (
          !reminder.order.expectedDeliveryAt ||
          reminder.order.status === "CANCELLED_BY_CUSTOMER" ||
          reminder.order.status === "CANCELLED_BY_PROVIDER"
        ) {
          // Sipariş iptal edilmiş veya expectedDeliveryAt yok, hatırlatmayı işaretle
          await prisma.deliveryReminder.update({
            where: { id: reminder.id },
            data: { processed: true },
          });
          continue;
        }

        // ETA hesapla (expectedDeliveryAt - now, dakika cinsinden)
        const etaMs =
          reminder.order.expectedDeliveryAt.getTime() - now.getTime();
        const etaMinutes = Math.max(1, Math.round(etaMs / (1000 * 60))); // En az 1 dakika

        // Mail oluştur ve gönder
        const { subject, html } = buildDeliverySoonEmail({
          customerName: reminder.order.customer.name,
          orderId: reminder.order.id,
          etaMinutes,
        });

        await sendMail(reminder.order.customer.email, subject, html);

        // Hatırlatmayı işaretle
        await prisma.deliveryReminder.update({
          where: { id: reminder.id },
          data: { processed: true },
        });

        successCount++;
        console.log("Delivery reminder maili gönderildi", {
          reminderId: reminder.id,
          orderId: reminder.order.id,
          customerEmail: reminder.order.customer.email,
        });
      } catch (error: any) {
        errorCount++;
        const errorMsg = `Reminder ${reminder.id}: ${error.message}`;
        errors.push(errorMsg);
        console.error("Delivery reminder işleme hatası", {
          reminderId: reminder.id,
          orderId: reminder.order.id,
          error: error.message,
        });

        // Hata olsa bile processed = true yap (sonsuz döngüye girmemesi için)
        // Ama bir retry mekanizması da eklenebilir (retryCount field)
        await prisma.deliveryReminder.update({
          where: { id: reminder.id },
          data: { processed: true },
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed: reminders.length,
      successCount,
      errorCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Process delivery reminders job hatası", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
