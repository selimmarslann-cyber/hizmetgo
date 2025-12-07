/**
 * Smart Matching Service
 *
 * Multi-factor scoring algoritması:
 * - Rating (0-5) × 0.3
 * - Distance (0-10km, normalized) × 0.3
 * - Response Time (0-24h, normalized) × 0.2
 * - Completion Rate (0-100%) × 0.2
 *
 * Toplam skor: 0-1 arası (1 = mükemmel eşleşme)
 */

import { haversineDistanceKm } from "@/lib/utils/matching";

export interface VendorScore {
  vendorId: string;
  score: number;
  factors: {
    rating: number;
    distance: number;
    responseTime: number;
    completionRate: number;
  };
}

export interface JobMatchContext {
  jobLocation: { lat: number; lng: number };
  jobCity: string;
  maxDistance?: number; // km (default: 10)
  // AI destekli eşleştirme (opsiyonel)
  aiContext?: {
    suggestedCategoryIds?: string[]; // AI'ın önerdiği kategori ID'leri
    suggestedSubServiceIds?: string[]; // AI'ın önerdiği alt hizmet ID'leri
    estimatedBudget?: number; // AI'ın tahmin ettiği bütçe
    jobDescription?: string; // İş açıklaması (kategori eşleştirmesi için)
  };
}

export interface VendorProfile {
  id: string;
  businessId: string;
  avgRating: number;
  reviewCount: number;
  location?: { lat: number; lng: number } | null;
  city?: string | null;
  avgResponseTime?: number | null; // hours
  completionRate?: number | null; // 0-100
  onlineStatus: "ONLINE" | "OFFLINE" | "AUTO_OFFLINE";
  // Kategori bilgisi (AI eşleştirmesi için)
  mainCategories?: string[]; // Business'ın ana kategorileri
  subServices?: string[]; // Business'ın alt hizmetleri
}

/**
 * Calculate smart match score for a vendor
 */
export function calculateVendorScore(
  vendor: VendorProfile,
  context: JobMatchContext,
): VendorScore {
  // Factor 1: Rating (0-5 → 0-1)
  const ratingScore = Math.min(vendor.avgRating / 5, 1);
  const ratingWeight = 0.3;

  // Factor 2: Distance (0-10km → 1-0, normalized)
  let distanceScore = 1;
  if (vendor.location && context.jobLocation) {
    const distance = haversineDistanceKm(context.jobLocation, vendor.location);
    const maxDist = context.maxDistance || 10;
    distanceScore = Math.max(0, 1 - distance / maxDist);
  } else if (vendor.city && context.jobCity) {
    // Fallback: Same city = 0.8, different city = 0
    distanceScore =
      vendor.city.toLowerCase() === context.jobCity.toLowerCase() ? 0.8 : 0;
  }
  const distanceWeight = 0.3;

  // Factor 3: Response Time (0-24h → 1-0, normalized)
  // Faster response = higher score
  let responseTimeScore = 0.5; // Default if unknown
  if (vendor.avgResponseTime !== null && vendor.avgResponseTime !== undefined) {
    // 0 hours = 1.0, 24 hours = 0.0
    responseTimeScore = Math.max(0, 1 - vendor.avgResponseTime / 24);
  }
  const responseTimeWeight = 0.2;

  // Factor 4: Completion Rate (0-100% → 0-1)
  let completionRateScore = 0.5; // Default if unknown
  if (vendor.completionRate !== null && vendor.completionRate !== undefined) {
    completionRateScore = vendor.completionRate / 100;
  }
  const completionRateWeight = 0.2;

  // Online status bonus
  const onlineBonus = vendor.onlineStatus === "ONLINE" ? 0.1 : 0;

  // AI destekli kategori eşleştirme bonusu/cezası (opsiyonel)
  let aiCategoryBonus = 0;
  if (context.aiContext) {
    const { suggestedCategoryIds, suggestedSubServiceIds } = context.aiContext;

    // Kategori eşleştirmesi kontrolü
    if (
      suggestedCategoryIds &&
      suggestedCategoryIds.length > 0 &&
      vendor.mainCategories
    ) {
      const hasMatchingCategory = vendor.mainCategories.some((catId) =>
        suggestedCategoryIds.includes(catId),
      );
      if (hasMatchingCategory) {
        aiCategoryBonus += 0.15; // Doğru kategoride +15% bonus
      } else {
        aiCategoryBonus -= 0.1; // Yanlış kategoride -10% ceza
      }
    }

    // Alt hizmet eşleştirmesi kontrolü
    if (
      suggestedSubServiceIds &&
      suggestedSubServiceIds.length > 0 &&
      vendor.subServices
    ) {
      const hasMatchingSubService = vendor.subServices.some((subId) =>
        suggestedSubServiceIds.includes(subId),
      );
      if (hasMatchingSubService) {
        aiCategoryBonus += 0.1; // Doğru alt hizmette +10% bonus
      }
    }
  }

  // Calculate total score
  const totalScore = Math.max(
    0, // Negatif skor olmasın
    Math.min(
      1,
      ratingScore * ratingWeight +
        distanceScore * distanceWeight +
        responseTimeScore * responseTimeWeight +
        completionRateScore * completionRateWeight +
        onlineBonus +
        aiCategoryBonus,
    ),
  );

  return {
    vendorId: vendor.id,
    score: totalScore,
    factors: {
      rating: ratingScore,
      distance: distanceScore,
      responseTime: responseTimeScore,
      completionRate: completionRateScore,
    },
  };
}

/**
 * Sort vendors by smart match score
 */
export function sortVendorsByScore(
  vendors: VendorProfile[],
  context: JobMatchContext,
): VendorScore[] {
  const scores = vendors.map((vendor) => calculateVendorScore(vendor, context));
  return scores.sort((a, b) => b.score - a.score);
}

/**
 * Filter and rank vendors for a job
 */
export function getBestMatchingVendors(
  vendors: VendorProfile[],
  context: JobMatchContext,
  limit: number = 10,
): VendorScore[] {
  // Filter: Only online vendors, same city or within maxDistance
  const filtered = vendors.filter((vendor) => {
    if (vendor.onlineStatus === "OFFLINE") return false;

    if (vendor.location && context.jobLocation) {
      const distance = haversineDistanceKm(
        context.jobLocation,
        vendor.location,
      );
      return distance <= (context.maxDistance || 10);
    }

    if (vendor.city && context.jobCity) {
      return vendor.city.toLowerCase() === context.jobCity.toLowerCase();
    }

    return false;
  });

  // Calculate scores and sort
  const scored = sortVendorsByScore(filtered, context);

  // Return top N
  return scored.slice(0, limit);
}
