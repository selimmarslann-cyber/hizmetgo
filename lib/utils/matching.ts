/**
 * Hizmetgo - Job Matching Utilities
 *
 * Keyword-based matching and distance calculations
 */

import type { Job, UserProfile } from "../types/mahallem";

const EARTH_RADIUS_KM = 6371;

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function haversineDistanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/**
 * Get matching vendors for a job based on keywords and location
 * Returns vendors with distance calculated for instant jobs
 */
export function getMatchingVendors(
  job: Job,
  vendors: UserProfile[],
): (UserProfile & { distanceKm?: number })[] {
  const jobKeywordIds = job.keywords.map((k) => k.id);
  const candidates = vendors.filter((v) => v.role === "vendor");

  return candidates
    .filter((v) => {
      // Check keyword match
      const vendorKeywordIds = v.skills.map((k) => k.id);
      const hasKeywordMatch = vendorKeywordIds.some((id) =>
        jobKeywordIds.includes(id),
      );

      if (!hasKeywordMatch) return false;

      // For normal jobs: match by city
      if (job.type === "normal") {
        if (!job.city || !v.city) return false;
        return job.city.toLowerCase() === v.city.toLowerCase();
      }

      // For instant jobs: match by distance (≤ 10 km)
      if (job.type === "instant") {
        if (!job.location || !v.location) return false;
        const dist = haversineDistanceKm(job.location, v.location);
        return dist <= 10;
      }

      return false;
    })
    .map((v) => {
      const result: UserProfile & { distanceKm?: number } = { ...v };
      if (job.type === "instant" && job.location && v.location) {
        result.distanceKm = haversineDistanceKm(job.location, v.location);
      }
      return result;
    });
}

/**
 * Extract keywords from search query
 * Simple matching: check if keyword label appears in query
 */
export function extractKeywordsFromQuery(
  query: string,
  availableKeywords: { id: string; label: string; sector: string }[],
): { id: string; label: string; sector: string }[] {
  const lowerQuery = query.toLowerCase();
  return availableKeywords.filter(
    (kw) =>
      kw.label.toLowerCase().includes(lowerQuery) ||
      lowerQuery.includes(kw.label.toLowerCase()),
  );
}
