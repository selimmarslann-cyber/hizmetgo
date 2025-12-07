/**
 * Available Jobs API
 *
 * GET /api/jobs/available - Vendor'a uygun işleri listele
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/roleCheck";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Sadece VENDOR görebilir
    try {
      await requireRole(userId, ["VENDOR"]);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Bu işlem için yetkiniz yok" },
        { status: 403 },
      );
    }

    // Kullanıcının işletmesini bul
    const business = await prisma.business.findFirst({
      where: { ownerUserId: userId },
    });

    if (!business) {
      return NextResponse.json(
        { error: "İşletme kaydınız bulunamadı" },
        { status: 400 },
      );
    }

    // Eşleşen işleri bul
    // Mantık: mainCategoryId ve (isOther veya subServiceId) eşleşen işler
    const matchingJobs = await prisma.job.findMany({
      where: {
        status: "PENDING",
        OR: [
          // "Diğer" seçeneği için: sadece ana kategori eşleşmesi yeterli
          {
            isOther: true,
            mainCategoryId: { in: business.mainCategories },
          },
          // Özel alt hizmet için: hem ana kategori hem alt hizmet eşleşmeli
          {
            isOther: false,
            mainCategoryId: { in: business.mainCategories },
            subServiceId:
              business.subServices.length > 0
                ? { in: business.subServices }
                : undefined,
          },
        ],
        // Aynı şehirde olmalı
        city: business.addressText?.includes("İstanbul")
          ? "İstanbul"
          : undefined,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        offers: {
          select: {
            id: true,
            businessId: true,
            amount: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 50, // En fazla 50 iş
    });

    // Teklif sayısını ekle
    const jobsWithOfferCount = matchingJobs.map((job) => ({
      ...job,
      offerCount: job.offers.length,
      // Business'ın kendi teklifini de göster
      userOffer: job.offers.find((o) => o.businessId === business.id),
    }));

    return NextResponse.json({ jobs: jobsWithOfferCount });
  } catch (error: any) {
    console.error("Available jobs fetch error:", error);
    return NextResponse.json(
      { error: error.message || "İşler yüklenemedi" },
      { status: 500 },
    );
  }
}
