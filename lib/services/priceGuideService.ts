import { prisma } from "@/lib/db/prisma";

interface PriceGuide {
  min: number;
  max: number;
  average: number;
  count: number;
}

/**
 * Fiyat Rehberi Servisi
 *
 * Tamamlanmış işlerden fiyat bilgisi çekerek kategori bazlı fiyat rehberi oluşturur.
 * Armut tarzı fiyat rehberi için.
 */

/**
 * Kategori için fiyat rehberi getir
 *
 * @param categoryId - Ana kategori ID (örn: "electricity", "plumbing")
 * @param subServiceId - Alt servis ID (opsiyonel)
 * @param monthsBack - Kaç ay geriye bakılacak (varsayılan: 6)
 * @returns Fiyat rehberi veya null (yeterli veri yoksa)
 */
export async function getPriceGuideForCategory(
  categoryId: string,
  subServiceId?: string | null,
  monthsBack: number = 6,
): Promise<PriceGuide | null> {
  try {
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - monthsBack);

    // Tamamlanmış işleri çek
    const where: any = {
      status: "COMPLETED",
      mainCategoryId: categoryId,
      createdAt: {
        gte: monthsAgo,
      },
    };

    if (subServiceId) {
      where.subServiceId = subServiceId;
    }

    // JobOffer'lar üzerinden fiyat bilgisi al
    // Tamamlanmış işlerin kabul edilmiş tekliflerinden fiyat çek
    const completedJobs = await prisma.job.findMany({
      where,
      include: {
        offers: {
          where: {
            status: "ACCEPTED",
          },
          take: 1, // Her iş için sadece kabul edilmiş teklif
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    // Fiyat bilgisi olan işleri filtrele
    const jobsWithPrice = completedJobs.filter(
      (job) => job.offers && job.offers.length > 0 && job.offers[0].amount,
    );

    if (jobsWithPrice.length === 0) {
      return null;
    }

    // Fiyatları çıkar
    const prices = jobsWithPrice.map((job) => {
      const offer = job.offers[0];
      return Number(offer.amount);
    });

    // Min, max, average hesapla
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const sum = prices.reduce((acc, price) => acc + price, 0);
    const average = sum / prices.length;

    return {
      min,
      max,
      average: Math.round(average * 100) / 100, // 2 ondalık basamak
      count: prices.length,
    };
  } catch (error) {
    console.error("Price guide service error:", error);
    return null;
  }
}

/**
 * Tüm kategoriler için fiyat rehberi özeti
 */
export async function getPriceGuideSummary(monthsBack: number = 6) {
  const categories = [
    "electricity",
    "plumbing",
    "cleaning",
    "painting",
    "carpentry",
    "garden",
    "other",
  ];

  const summary: Record<string, PriceGuide | null> = {};

  for (const categoryId of categories) {
    summary[categoryId] = await getPriceGuideForCategory(
      categoryId,
      null,
      monthsBack,
    );
  }

  return summary;
}
