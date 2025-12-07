/**
 * Job Detail API
 *
 * GET /api/jobs/[id] - Job detayını getir + smart matching vendors
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getBestMatchingVendors } from "@/lib/services/smartMatchingService";
import { haversineDistanceKm } from "@/lib/utils/matching";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        acceptedBy: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        offers: {
          include: {
            business: {
              include: {
                owner: {
                  select: {
                    id: true,
                    name: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "İş bulunamadı" }, { status: 404 });
    }

    // Sadece iş sahibi görebilir (matched vendors için)
    const isOwner = job.customerId === userId;

    if (!isOwner) {
      // Teklif veren işletmeler de görebilir
      const userBusiness = await prisma.business.findFirst({
        where: { ownerUserId: userId },
      });
      const hasOffer = userBusiness
        ? job.offers.some((o) => o.businessId === userBusiness.id)
        : false;

      if (!hasOffer) {
        return NextResponse.json(
          { error: "Bu işi görme yetkiniz yok" },
          { status: 403 },
        );
      }

      // Teklif veren işletme ise sadece job ve offers bilgisini döndür
      return NextResponse.json({ job });
    }

    // İş sahibi ise: smart matching vendors ekle
    let matchedVendors: any[] = [];

    if (job.status === "PENDING") {
      // Eşleşen işletmeleri bul
      const matchingBusinesses = await prisma.business.findMany({
        where: {
          isActive: true,
          OR: [
            // "Diğer" seçeneği için: sadece ana kategori eşleşmesi yeterli
            job.isOther
              ? {
                  mainCategories: { has: job.mainCategoryId },
                }
              : {
                  // Özel alt hizmet için: hem ana kategori hem alt hizmet eşleşmeli
                  mainCategories: { has: job.mainCategoryId },
                  subServices: job.subServiceId
                    ? { has: job.subServiceId }
                    : undefined,
                },
          ],
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
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
            },
            take: 50, // Son 50 sipariş
          },
          jobOffers: {
            where: {
              status: { in: ["PENDING", "ACCEPTED"] }, // Pending ve accepted teklifler
            },
            select: {
              id: true,
              createdAt: true,
              job: {
                select: {
                  createdAt: true,
                },
              },
            },
            take: 20, // Son 20 teklif
          },
          reviews: {
            select: {
              rating: true,
            },
            take: 100, // Son 100 review
          },
        },
      });

      // VendorProfile formatına çevir
      const vendorProfiles = matchingBusinesses.map((business) => {
        // Completion rate hesapla
        const completedOrders = business.orders.filter(
          (o) => o.status === "COMPLETED",
        ).length;
        const totalOrders = business.orders.length;
        const completionRate =
          totalOrders > 0 ? (completedOrders / totalOrders) * 100 : null;

        // Avg response time hesapla (job offer response time - iş oluşturulduktan teklif verilene kadar)
        let avgResponseTime: number | null = null;
        if (business.jobOffers && business.jobOffers.length > 0) {
          const responseTimes: number[] = [];
          for (const offer of business.jobOffers) {
            if (offer.job) {
              const jobCreatedTime = new Date(offer.job.createdAt).getTime();
              const offerCreatedTime = new Date(offer.createdAt).getTime();
              const diffMs = offerCreatedTime - jobCreatedTime;
              const diffHours = diffMs / (1000 * 60 * 60); // milliseconds to hours

              // Makul bir süre (0-72 saat arası)
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
          businessName: business.name,
          businessDescription: business.description,
          businessCoverImageUrl: business.coverImageUrl,
          owner: business.owner,
          avgRating: business.avgRating,
          reviewCount: business.reviewCount,
          location:
            business.lat && business.lng
              ? { lat: business.lat, lng: business.lng }
              : null,
          city: job.city || null,
          avgResponseTime,
          completionRate,
          onlineStatus: business.onlineStatus,
        };
      });

      // Smart matching context
      const jobContext = {
        jobLocation:
          job.locationLat && job.locationLng
            ? { lat: job.locationLat, lng: job.locationLng }
            : { lat: 0, lng: 0 }, // Fallback
        jobCity: job.city,
        maxDistance: 10, // 10km radius
      };

      // Smart matching ile en iyi vendorları getir
      const scoredVendors = getBestMatchingVendors(
        vendorProfiles,
        jobContext,
        10,
      );

      // Vendor bilgilerini detaylandır
      matchedVendors = scoredVendors
        .map((scored) => {
          const vendor = vendorProfiles.find((v) => v.id === scored.vendorId);
          if (!vendor) return null;

          // Distance hesapla
          let distanceKm: number | null = null;
          if (vendor.location && job.locationLat && job.locationLng) {
            distanceKm = haversineDistanceKm(vendor.location, {
              lat: job.locationLat,
              lng: job.locationLng,
            });
          }

          return {
            ...vendor,
            matchScore: scored.score,
            distanceKm,
            factors: scored.factors,
          };
        })
        .filter(Boolean);
    }

    return NextResponse.json({
      job,
      matchedVendors: isOwner ? matchedVendors : [], // Sadece iş sahibi görsün
    });
  } catch (error: any) {
    console.error("Job fetch error:", error);
    return NextResponse.json(
      { error: error.message || "İş yüklenemedi" },
      { status: 500 },
    );
  }
}
