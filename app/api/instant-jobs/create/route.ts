import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { haversineDistanceKm } from "@/lib/utils/matching";

const createInstantJobSchema = z.object({
  description: z.string().min(10, "Açıklama en az 10 karakter olmalı"),
  locationLat: z.number(),
  locationLng: z.number(),
  city: z.string().optional(),
  district: z.string().optional(),
  requiresSkills: z.boolean().optional().default(false),
  estimatedBudget: z.number().positive().optional(),
  scheduledAt: z.string().datetime().optional(),
});

const NOTIFICATION_RADIUS_KM = 20; // 20 km çevre - anlık işler için


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validated = createInstantJobSchema.parse(body);

    // Kullanıcı bilgisini al
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { city: true },
    });

    const city = validated.city || user?.city || "İstanbul";

    // Anlık iş oluştur
    const instantJob = await prisma.instantJob.create({
      data: {
        customerId: userId,
        description: validated.description.trim(),
        locationLat: validated.locationLat,
        locationLng: validated.locationLng,
        city,
        district: validated.district || null,
        requiresSkills: validated.requiresSkills || false,
        estimatedBudget: validated.estimatedBudget
          ? validated.estimatedBudget
          : null,
        scheduledAt: validated.scheduledAt
          ? new Date(validated.scheduledAt)
          : null,
        status: "OPEN",
      },
    });

    // FAZ 1: İlgili bölgede online/uygun hizmet veren işletmelere bildirim gönder
    // Instant job'lar için kategori bilgisi olmadığından, yakındaki tüm aktif işletmelere bildirim gönderiyoruz
    // Not: lat/lng null kontrolü JavaScript tarafında yapılıyor (satır 82)
    const allBusinesses = await prisma.business.findMany({
      where: {
        isActive: true,
        onlineStatus: { in: ["ONLINE", "AUTO_OFFLINE"] }, // Sadece online veya auto-offline işletmeler
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            emailMarketing: true,
            whatsappNotifications: true,
            smsNotifications: true,
          },
        },
      },
      take: 200, // Max 200 işletme - performans optimizasyonu
    });

    // Mesafe hesapla ve filtrele (lat/lng null olanlar zaten burada filtreleniyor)
    const businessesToNotify = allBusinesses
      .map((business) => {
        if (!business.lat || !business.lng) return null;
        const distance = haversineDistanceKm(
          { lat: validated.locationLat, lng: validated.locationLng },
          { lat: business.lat, lng: business.lng },
        );
        if (distance <= NOTIFICATION_RADIUS_KM) {
          return { ...business, distanceKm: distance };
        }
        return null;
      })
      .filter((b): b is NonNullable<typeof b> => b !== null);

    // Bildirim gönderme sistemi
    const notificationPromises: Promise<void>[] = [];
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://mahallem.app";
    const customerUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    for (const business of businessesToNotify) {
      if (!business.owner) continue;

      // Database notification oluştur
      notificationPromises.push(
        (async () => {
          try {
            const { createNotification } =
              await import("@/lib/notifications/createNotification");
            await createNotification({
              userId: business.owner.id,
              type: "JOB_CREATED",
              title: "Yakınında yeni bir anlık iş var!",
              body: `${customerUser?.name || "Bir kullanıcı"} yakınında (${business.distanceKm.toFixed(1)} km) yeni bir anlık iş oluşturdu: ${validated.description.substring(0, 50)}...`,
              data: {
                instantJobId: instantJob.id,
                businessId: business.id,
                distanceKm: business.distanceKm,
                type: "instant",
              },
            });

            // Email bildirimi (işletme sahibi tercih etmişse)
            if (business.owner.email && business.owner.emailMarketing) {
              try {
                const { sendMail } = await import("@/lib/mail");
                const jobLink = `${APP_URL}/jobs/instant/${instantJob.id}`;
                const emailSubject = `Yakınında yeni bir anlık iş var! (${business.distanceKm.toFixed(1)} km)`;
                const emailHtml = `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Yakınında Yeni İş</title>
                  </head>
                  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #FF6000 0%, #FF5500 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                      <h1 style="color: white; margin: 0; font-size: 28px;">HİZMETGO</h1>
                    </div>
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
                      <h2 style="color: #FF6000; margin-top: 0;">Yakınında Yeni Bir İş Fırsatı! 🎯</h2>
                      <p>Merhaba ${business.owner.name},</p>
                      <p>İşletmenize yaklaşık <strong>${business.distanceKm.toFixed(1)} km</strong> uzaklıkta yeni bir anlık iş oluşturuldu:</p>
                      <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #FF6000;">
                        <p style="margin: 0; font-size: 16px; line-height: 1.8;">${validated.description}</p>
                      </div>
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${jobLink}" style="display: inline-block; background: #FF6000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">İşi Gör ve Teklif Ver</a>
                      </div>
                      <p style="color: #666; font-size: 14px;">Bu bildirimleri ${APP_URL}/account/settings adresinden kapatabilirsiniz.</p>
                      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                      <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                        Bu otomatik bir e-postadır. Lütfen yanıtlamayın.
                      </p>
                    </div>
                  </body>
                  </html>
                `;
                await sendMail(business.owner.email, emailSubject, emailHtml);
              } catch (mailError) {
                console.error(
                  `Email gönderme hatası (businessId: ${business.id}):`,
                  mailError,
                );
                // Email hatası bildirim akışını durdurmamalı
              }
            }

            // WhatsApp/SMS bildirimi (tercih edilmişse) - stub
            if (
              business.owner.whatsappNotifications ||
              business.owner.smsNotifications
            ) {
              try {
                const { scheduleExternalNotification } =
                  await import("@/lib/notifications/scheduleExternalNotification");
                if (business.owner.whatsappNotifications) {
                  await scheduleExternalNotification("whatsapp", {
                    userId: business.owner.id,
                    phone: business.owner.email, // TODO: phone field'ı eklenmeli
                    message: `Yakınında yeni bir anlık iş var! (${business.distanceKm.toFixed(1)} km) - ${validated.description.substring(0, 100)}...`,
                    data: { instantJobId: instantJob.id },
                  });
                }
                if (business.owner.smsNotifications) {
                  await scheduleExternalNotification("sms", {
                    userId: business.owner.id,
                    phone: business.owner.email, // TODO: phone field'ı eklenmeli
                    message: `Yakınında yeni bir anlık iş var! (${business.distanceKm.toFixed(1)} km)`,
                    data: { instantJobId: instantJob.id },
                  });
                }
              } catch (externalError) {
                console.error(
                  `External notification hatası (businessId: ${business.id}):`,
                  externalError,
                );
                // External notification hatası bildirim akışını durdurmamalı
              }
            }
          } catch (error) {
            console.error(
              `Bildirim gönderme hatası (businessId: ${business.id}):`,
              error,
            );
            // Hata olsa bile diğer işletmelere bildirim göndermeye devam et
          }
        })(),
      );
    }

    // Tüm bildirimleri paralel gönder (await yapmıyoruz - job oluşturma hızını etkilemesin)
    Promise.all(notificationPromises).catch((error) => {
      console.error("Anlık iş bildirimleri genel hatası:", error);
    });

    console.log(
      `Anlık iş oluşturuldu: ${instantJob.id}, ${businessesToNotify.length} işletmeye bildirim gönderildi`,
    );

    return NextResponse.json(
      {
        instantJob,
        notificationCount: businessesToNotify.length,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Instant job creation error:", error);
    return NextResponse.json(
      { error: error.message || "Anlık iş oluşturulamadı" },
      { status: 500 },
    );
  }
}
