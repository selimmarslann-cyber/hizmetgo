/**
 * Tüm anahtar kelimeleri tek bir listede topla
 * SERVICE_CATEGORIES'den tüm keywords'leri çıkarır
 * Anlık iş anahtar kelimelerini de dahil eder
 */

import { SERVICE_CATEGORIES } from "../data/service-categories";
import { INSTANT_JOB_KEYWORDS } from "./instant-job-keywords";

let cachedKeywords: string[] | null = null;

export function getAllKeywords(): string[] {
  if (cachedKeywords) {
    return cachedKeywords;
  }

  const keywords = new Set<string>();

  SERVICE_CATEGORIES.forEach((category) => {
    // Ana kategori ismi
    if (category.name && category.name.trim()) {
      keywords.add(category.name.trim().toLowerCase());
    }

    // Ana kategori keywords
    category.keywords.forEach((kw) => {
      if (kw && kw.trim()) {
        keywords.add(kw.trim().toLowerCase());
      }
    });

    // Alt hizmet isimleri
    category.subServices?.forEach((subService) => {
      if (subService.name && subService.name.trim() && !subService.isOther) {
        keywords.add(subService.name.trim().toLowerCase());
      }

      // Alt hizmet keywords
      subService.keywords.forEach((kw) => {
        if (kw && kw.trim()) {
          keywords.add(kw.trim().toLowerCase());
        }
      });
    });
  });

  // Anlık iş anahtar kelimelerini ekle
  INSTANT_JOB_KEYWORDS.forEach((kw) => {
    keywords.add(kw.toLowerCase());
  });

  cachedKeywords = Array.from(keywords).sort();
  return cachedKeywords;
}

/**
 * Arama sorgusuna göre anahtar kelime önerileri
 */
export function getKeywordSuggestions(
  query: string,
  limit: number = 10,
): string[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const allKeywords = getAllKeywords();
  const lowerQuery = query.trim().toLowerCase();

  // Tam eşleşme öncelikli
  const exactMatches = allKeywords.filter((kw) => kw === lowerQuery);

  // Başlangıç eşleşmesi
  const startsWith = allKeywords.filter(
    (kw) => kw.startsWith(lowerQuery) && kw !== lowerQuery,
  );

  // İçinde geçen
  const contains = allKeywords.filter(
    (kw) =>
      kw.includes(lowerQuery) &&
      !kw.startsWith(lowerQuery) &&
      kw !== lowerQuery,
  );

  // Öncelik sırası: tam eşleşme > başlangıç > içinde geçen
  const suggestions = [
    ...exactMatches,
    ...startsWith.slice(0, limit),
    ...contains.slice(0, limit - exactMatches.length - startsWith.length),
  ];

  return suggestions.slice(0, limit);
}
