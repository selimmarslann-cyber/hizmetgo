import { prisma } from "@/lib/db/prisma";

/**
 * Review oluşturma ve işletme rating güncelleme
 */
export async function createReview(data: {
  orderId: string;
  businessId: string;
  reviewerId: string;
  rating: number;
  comment?: string;
}) {
  // Sipariş kontrolü
  const order = await prisma.order.findUnique({
    where: { id: data.orderId },
  });

  if (!order) {
    throw new Error("Sipariş bulunamadı");
  }

  if (order.status !== "COMPLETED") {
    throw new Error("Sadece tamamlanmış siparişler değerlendirilebilir");
  }

  if (order.customerId !== data.reviewerId) {
    throw new Error("Sadece sipariş sahibi değerlendirme yapabilir");
  }

  // Daha önce review var mı?
  const existingReview = await prisma.review.findUnique({
    where: { orderId: data.orderId },
  });

  if (existingReview) {
    throw new Error("Bu sipariş için zaten değerlendirme yapılmış");
  }

  // Transaction ile review oluştur ve rating güncelle
  return prisma.$transaction(async (tx) => {
    // Review oluştur - 1 saat sonra otomatik onaylanacak
    const approvedAt = new Date();
    approvedAt.setHours(approvedAt.getHours() + 1);

    const review = await tx.review.create({
      data: {
        ...data,
        moderationStatus: "PENDING",
        approvedAt,
      },
    });

    // İşletme rating'ini güncelle - sadece onaylanmış review'lar sayılır
    // Not: Yeni review henüz PENDING olduğu için rating'e dahil edilmez
    // 1 saat sonra otomatik onaylandığında rating güncellenecek
    const business = await tx.business.findUnique({
      where: { id: data.businessId },
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
        where: { id: data.businessId },
        data: {
          avgRating,
          reviewCount: allRatings.length,
        },
      });
    }

    // FAZ 3: Review oluşturulduğunda business owner'a bildirim gönder
    Promise.resolve().then(async () => {
      try {
        const { createNotification } =
          await import("@/lib/notifications/createNotification");
        const business = await prisma.business.findUnique({
          where: { id: data.businessId },
          select: { ownerUserId: true, name: true },
        });

        if (business) {
          await createNotification({
            userId: business.ownerUserId,
            type: "REVIEW_RECEIVED",
            title: "Yeni Değerlendirme",
            body: `${data.rating} yıldız değerlendirme aldınız.`,
            data: {
              orderId: data.orderId,
              businessId: data.businessId,
              rating: data.rating,
            },
          });
        }
      } catch (notifError) {
        console.error("Review notification hatası:", notifError);
      }
    });

    return review;
  });
}

/**
 * İşletme review'larını getir - sadece onaylanmış review'lar
 */
export async function getBusinessReviews(businessId: string, limit = 20) {
  return prisma.review.findMany({
    where: {
      businessId,
      moderationStatus: "APPROVED", // Sadece onaylanmış review'lar gösterilir
    },
    include: {
      reviewer: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      order: {
        select: {
          id: true,
          createdAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * Başarılı iş tamamlandığında consecutive_cancellations sıfırla
 */
export async function resetCancellationCounter(businessId: string) {
  return prisma.business.update({
    where: { id: businessId },
    data: {
      consecutiveCancellations: 0,
    },
  });
}
