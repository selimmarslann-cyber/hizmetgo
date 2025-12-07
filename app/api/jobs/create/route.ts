import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireCustomer } from "@/lib/auth/roleCheck";
import { prisma } from "@/lib/db/prisma";
import { createNotification } from "@/lib/notifications/createNotification";
import { getBestMatchingVendors } from "@/lib/services/smartMatchingService";
import { haversineDistanceKm } from "@/lib/utils/matching";
import { sendMail } from "@/lib/mail";
import { buildNearbyJobEmail } from "@/lib/mailTemplates";
import { withRateLimit } from "@/lib/middleware/rateLimit";
import { logger } from "@/lib/utils/logger";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorCodeFromStatus,
  getStatusFromErrorCode,
} from "@/lib/utils/apiError";
import { z } from "zod";

async function createJobHandler(request: NextRequest) {
  let userId: string | null = null;
  try {
    userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // FAZ 3: Sadece customer iş talebi oluşturabilir
    await requireCustomer(userId);

    const body = await request.json();
    const {
      mainCategoryId,
      subServiceId,
      isOther,
      description,
      urgency,
      desiredDate,
      locationLat,
      locationLng,
      addressText,
      city,
      district,
    } = body;

    // Validasyon
    if (!mainCategoryId || !description) {
      return NextResponse.json(
        { error: "Kategori ve açıklama zorunludur" },
        { status: 400 },
      );
    }

    if (description.trim().length < 100) {
      return NextResponse.json(
        { error: "Açıklama en az 100 karakter olmalıdır" },
        { status: 400 },
      );
    }

    // Tarih hesaplama
    let scheduledAt: Date | null = null;
    if (urgency && desiredDate) {
      scheduledAt = new Date(desiredDate);
    } else if (urgency === "acil" || urgency === "simdi") {
      // Acil veya şimdi için bugün
      scheduledAt = new Date();
      scheduledAt.setHours(14, 0, 0, 0); // Bugün 14:00
    } else if (urgency === "bugun") {
      // Bugün için bugün
      scheduledAt = new Date();
      scheduledAt.setHours(18, 0, 0, 0); // Bugün 18:00
    } else if (urgency === "yarin") {
      // Yarın için yarın
      scheduledAt = new Date();
      scheduledAt.setDate(scheduledAt.getDate() + 1);
      scheduledAt.setHours(14, 0, 0, 0); // Yarın 14:00
    } else if (urgency === "hafta") {
      // Bu hafta için 3 gün sonra
      scheduledAt = new Date();
      scheduledAt.setDate(scheduledAt.getDate() + 3);
      scheduledAt.setHours(14, 0, 0, 0);
    }

    // Şehir ve ilçe bilgisi body'den alınmalı, default değer yok
    if (!city) {
      return NextResponse.json(
        { error: "Şehir bilgisi gereklidir" },
        { status: 400 },
      );
    }
    if (!district) {
      return NextResponse.json(
        { error: "İlçe bilgisi gereklidir" },
        { status: 400 },
      );
    }
    const jobCity = city;
    const jobDistrict = district;

    // Job oluştur
    const job = await prisma.job.create({
      data: {
        customerId: userId,
        mainCategoryId,
        subServiceId: subServiceId || null,
        isOther: isOther || false,
        description: description.trim(),
        city: jobCity,
        district: jobDistrict,
        locationLat: locationLat || null,
        locationLng: locationLng || null,
        addressText: addressText || null,
        scheduledAt,
        status: "PENDING",
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
    });

    // FAZ 4: Akıllı eşleştirme ile vendor'lara bildirim gönder
    // Eşleşme mantığı: mainCategoryId ve (isOther veya subServiceId) eşleşen işletmeler
    // Limit: Max 100 business - performans optimizasyonu
    const allMatchingBusinesses = await prisma.business.findMany({
      where: {
        isActive: true,
        OR: [
          // "Diğer" seçeneği için: sadece ana kategori eşleşmesi yeterli
          isOther
            ? {
                mainCategories: { has: mainCategoryId },
              }
            : {
                // Özel alt hizmet için: hem ana kategori hem alt hizmet eşleşmeli
                mainCategories: { has: mainCategoryId },
                subServices: subServiceId ? { has: subServiceId } : undefined,
              },
        ],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        orders: {
          where: {
            status: { in: ["ACCEPTED", "IN_PROGRESS", "COMPLETED"] },
          },
          select: {
            id: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            completedAt: true,
          },
          take: 50, // Son 50 order - performans için limit
        },
        reviews: {
          select: {
            rating: true,
          },
          take: 100, // Son 100 review - performans için limit
        },
        jobOffers: {
          where: {
            status: { in: ["PENDING", "ACCEPTED"] }, // Sadece geçerli teklifler
          },
          select: {
            id: true,
            createdAt: true,
            job: {
              select: {
                id: true,
                createdAt: true,
              },
            },
          },
          take: 50, // Son 50 teklif - performans için limit
        },
      },
      take: 100, // Max 100 business - performans optimizasyonu
    });

    // Convert to VendorProfile format for smart matching
    const vendorProfiles = allMatchingBusinesses.map((business) => {
      // Calculate completion rate
      const completedOrders = business.orders.filter(
        (o) => o.status === "COMPLETED",
      ).length;
      const totalOrders = business.orders.length;
      const completionRate =
        totalOrders > 0 ? (completedOrders / totalOrders) * 100 : null;

      // FAZ 1: Calculate avg response time from job_offers (job created -> first offer created)
      // Bu metrik, işletmenin yeni işlere ne kadar hızlı teklif verdiğini gösterir
      let avgResponseTime: number | null = null;

      if (business.jobOffers && business.jobOffers.length > 0) {
        const responseTimes: number[] = [];
        for (const offer of business.jobOffers) {
          if (offer.job) {
            // Job oluşturulduktan teklif verilene kadar geçen süre
            const jobCreatedTime = new Date(offer.job.createdAt).getTime();
            const offerCreatedTime = new Date(offer.createdAt).getTime();
            const diffMs = offerCreatedTime - jobCreatedTime;
            const diffHours = diffMs / (1000 * 60 * 60); // milliseconds to hours

            // Makul bir süre (0-72 saat arası) - 3 gün içinde teklif vermiş olmalı
            if (diffHours >= 0 && diffHours <= 72) {
              responseTimes.push(diffHours);
            }
          }
        }

        if (responseTimes.length > 0) {
          avgResponseTime =
            responseTimes.reduce((sum, time) => sum + time, 0) /
            responseTimes.length;
        }
      }

      return {
        id: business.ownerUserId,
        businessId: business.id,
        avgRating: business.avgRating,
        reviewCount: business.reviewCount,
        location:
          business.lat && business.lng
            ? { lat: business.lat, lng: business.lng }
            : null,
        city: business.addressText?.includes("İstanbul") ? "İstanbul" : null,
        avgResponseTime,
        completionRate,
        onlineStatus: business.onlineStatus,
        mainCategories: business.mainCategories || [],
        subServices: business.subServices || [],
      };
    });

    // AI ile kategori tespiti (opsiyonel - job description varsa)
    let aiContext: any = undefined;
    if (description && description.length > 10) {
      try {
        const { classifyServiceCategory } =
          await import("@/lib/ai/classifyServiceCategory");
        const classification = await classifyServiceCategory(description);
        if (classification.category) {
          aiContext = {
            suggestedCategoryIds: [classification.category.categoryId],
            suggestedSubServiceIds: subServiceId ? [subServiceId] : undefined,
            jobDescription: description,
          };
        }
      } catch (aiError) {
        logger.warn("AI kategori tespiti başarısız, devam ediliyor", {
          error: aiError,
        });
        // AI hatası durumunda sessizce devam et
      }
    }

    // Smart matching: Get best vendors
    const jobContext = {
      jobLocation:
        job.locationLat && job.locationLng
          ? { lat: job.locationLat, lng: job.locationLng }
          : { lat: 0, lng: 0 }, // Fallback
      jobCity: jobCity,
      maxDistance: 10, // 10km radius
      aiContext, // AI destekli eşleştirme
    };

    const bestVendors = getBestMatchingVendors(vendorProfiles, jobContext, 20); // Top 20

    // Send notifications to best matching vendors
    const notificationPromises = bestVendors.map((vendorScore) => {
      const business = allMatchingBusinesses.find(
        (b) => b.ownerUserId === vendorScore.vendorId,
      );
      if (!business) return null;

      return createNotification({
        userId: business.ownerUserId,
        type: "JOB_CREATED",
        title: "Yeni İş Talebi",
        body: `${job.customer.name} size uygun bir iş talebi oluşturdu. Teklif vermek için tıklayın.`,
        data: {
          jobId: job.id,
          mainCategoryId,
          city: jobCity,
          matchScore: vendorScore.score,
        },
      });
    });

    await Promise.all(notificationPromises.filter(Boolean));

    // Yakın provider'lara email gönder (10 km içindeki)
    if (job.locationLat && job.locationLng) {
      const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://mahallem.app";
      const jobLocation = { lat: job.locationLat, lng: job.locationLng };

      // Kategori adını almak için basit mapping (gerçek uygulamada serviceSearchService kullanılabilir)
      const categoryNames: Record<string, string> = {
        electricity: "Elektrik",
        plumbing: "Tesisat",
        cleaning: "Temizlik",
        painting: "Boya",
        carpentry: "Marangoz",
        other: "Diğer",
      };
      const categoryName = categoryNames[mainCategoryId] || mainCategoryId;

      // 10 km içindeki provider'ları bul ve mail gönder
      const emailPromises: Promise<void>[] = [];

      for (const business of allMatchingBusinesses) {
        if (!business.lat || !business.lng) continue;
        if (!business.owner) continue;

        // Mesafe hesapla
        const distanceKm = haversineDistanceKm(jobLocation, {
          lat: business.lat,
          lng: business.lng,
        });

        // 10 km içindeyse
        if (distanceKm <= 10) {
          // Aynı provider'a aynı job için daha önce mail gönderilmiş mi kontrol et
          const existingNotification = await prisma.jobNotification.findUnique({
            where: {
              jobId_businessId: {
                jobId: job.id,
                businessId: business.id,
              },
            },
          });

          if (existingNotification) {
            // Zaten mail gönderilmiş, atla
            continue;
          }

          // Provider'ın email adresini al (owner user'dan)
          const ownerUser = await prisma.user.findUnique({
            where: { id: business.owner.id },
            select: { email: true },
          });

          if (!ownerUser?.email) {
            continue;
          }

          // JobNotification kaydı oluştur (mail göndermeden önce - duplicate mail'i önlemek için)
          await prisma.jobNotification.create({
            data: {
              jobId: job.id,
              businessId: business.id,
            },
          });

          // Mail gönder (async - hata olsa bile job oluşturma akışını etkilemesin)
          emailPromises.push(
            (async () => {
              try {
                const jobLink = `${APP_URL}/jobs/${job.id}`;
                const { subject, html } = buildNearbyJobEmail({
                  providerName: business.owner.name,
                  jobId: job.id,
                  distanceKm,
                  category: categoryName,
                  neighborhood: jobDistrict,
                  jobLink,
                });

                await sendMail(ownerUser.email, subject, html);
                console.log("Yakın iş fırsatı maili gönderildi", {
                  jobId: job.id,
                  businessId: business.id,
                  email: ownerUser.email,
                  distanceKm,
                });
              } catch (mailError: any) {
                // Mail hatası job oluşturma akışını etkilemesin, sadece log'a yaz
                console.error("Yakın iş fırsatı maili gönderme hatası", {
                  jobId: job.id,
                  businessId: business.id,
                  error: mailError.message,
                });
              }
            })(),
          );
        }
      }

      // Tüm mailleri paralel gönder (await yapmıyoruz - job oluşturma hızını etkilemesin)
      Promise.all(emailPromises).catch((error) => {
        console.error("Yakın provider mail gönderme genel hatası", error);
      });
    }

    const successResponse = createSuccessResponse({
      job,
      notificationCount: allMatchingBusinesses.length,
    });

    return NextResponse.json(successResponse, { status: 201 });
  } catch (error: any) {
    logger.error("Job creation error", error, { userId });

    const errorCode =
      error instanceof z.ZodError
        ? "VALIDATION_ERROR"
        : getErrorCodeFromStatus(500);

    const errorResponse = createErrorResponse(
      errorCode,
      error instanceof z.ZodError
        ? error.errors[0].message
        : error.message || "İş oluşturulamadı",
      error instanceof z.ZodError ? { errors: error.errors } : undefined,
    );

    return NextResponse.json(errorResponse, {
      status: getStatusFromErrorCode(errorCode),
    });
  }
}

// Export with rate limiting (20 requests per 15 minutes for job creation)

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export const POST = withRateLimit(createJobHandler, {
  maxRequests: 20,
  windowMs: 15 * 60 * 1000,
  getIdentifier: async (req) => {
    const userId = await getUserId(req);
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : req.headers.get("x-real-ip") || "unknown";
    return userId ? `user:${userId}` : `ip:${ip}`;
  },
});
