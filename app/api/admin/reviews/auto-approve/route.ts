import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * 1 saat sonra otomatik onaylanacak review'ları kontrol et ve onayla
 * Bu endpoint bir cron job veya scheduled task tarafından çağrılmalı
 */
export async function POST(req: NextRequest) {
  try {
    // Authorization header kontrolü (cron job için secret key)
    const authHeader = req.headers.get("authorization");
    const expectedSecret = process.env.CRON_SECRET || "your-secret-key";

    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();

    // 1 saat önce oluşturulmuş ve henüz onaylanmamış review'ları bul
    const pendingReviews = await prisma.review.findMany({
      where: {
        moderationStatus: "PENDING",
        approvedAt: {
          lte: now, // approvedAt zamanı geçmiş
        },
      },
      include: {
        business: true,
      },
    });

    let approvedCount = 0;

    // Her review'ı onayla ve business rating'ini güncelle
    for (const review of pendingReviews) {
      await prisma.$transaction(async (tx) => {
        // Review'ı onayla
        await tx.review.update({
          where: { id: review.id },
          data: {
            moderationStatus: "APPROVED",
            approvedAt: now,
          },
        });

        // Business rating'ini güncelle
        const business = await tx.business.findUnique({
          where: { id: review.businessId },
          include: {
            reviews: {
              where: {
                moderationStatus: "APPROVED",
              },
            },
          },
        });

        if (business) {
          const allRatings = business.reviews.map((r) => r.rating);
          const avgRating =
            allRatings.length > 0
              ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
              : 0;

          await tx.business.update({
            where: { id: review.businessId },
            data: {
              avgRating,
              reviewCount: allRatings.length,
            },
          });
        }
      });

      approvedCount++;
    }

    return NextResponse.json({
      success: true,
      approvedCount,
      message: `${approvedCount} yorum otomatik olarak onaylandı`,
    });
  } catch (error: any) {
    console.error("Auto-approve reviews error:", error);
    return NextResponse.json(
      { error: "Failed to auto-approve reviews", details: error.message },
      { status: 500 },
    );
  }
}

