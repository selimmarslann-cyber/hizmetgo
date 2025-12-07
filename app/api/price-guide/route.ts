import { NextRequest, NextResponse } from "next/server";
import { getPriceGuideForCategory } from "@/lib/services/priceGuideService";
import { withCache, createCacheKey } from "@/lib/utils/apiCache";

export const dynamic = "force-dynamic";
export const revalidate = 60; // 60 seconds revalidation

/**
 * GET /api/price-guide
 *
 * Kategori için fiyat rehberi getirir
 *
 * Query params:
 * - categoryId: Ana kategori ID (örn: "electricity", "plumbing")
 * - subServiceId: Alt servis ID (opsiyonel)
 * - monthsBack: Kaç ay geriye bakılacak (varsayılan: 6)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    const subServiceId = searchParams.get("subServiceId");
    const monthsBack = parseInt(searchParams.get("monthsBack") || "6");

    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId parametresi gerekli" },
        { status: 400 },
      );
    }

    // Cache key oluştur
    const cacheKey = createCacheKey("price-guide", {
      categoryId,
      subServiceId: subServiceId || "",
      monthsBack,
    });

    // Cache ile fiyat rehberini getir (5 dakika cache)
    const priceGuide = await withCache(
      cacheKey,
      async () => {
        return await getPriceGuideForCategory(
          categoryId,
          subServiceId || null,
          monthsBack,
        );
      },
      { ttl: 300 }, // 5 dakika cache
    );

    if (!priceGuide) {
      return NextResponse.json({
        priceGuide: null,
        message: "Bu kategori için yeterli veri yok",
      });
    }

    return NextResponse.json({
      priceGuide,
    });
  } catch (error: any) {
    console.error("Price guide API error:", error);
    return NextResponse.json(
      { error: error.message || "Fiyat rehberi yüklenemedi" },
      { status: 500 },
    );
  }
}
