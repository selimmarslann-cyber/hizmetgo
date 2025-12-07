/**
 * Hizmetgo - İş Eşleştirme Servisi
 *
 * Bu dosya, yeni oluşturulan işleri (jobs) uygun ustalara (providers)
 * eşleştiren fonksiyonları içerir.
 *
 * Mantık:
 * - Eğer iş "Diğer" (isOther = true) ise:
 *   → main_category_id'si ustanın main_categories içinde olan HERKESE iş gitsin
 * - Eğer iş özel alt hizmet seçiliyse:
 *   → hem main_category_id hem subservice_id uyan ustalara gitsin
 */

import {
  JobFormData,
  ProviderServicePreferences,
} from "../types/service-categories";

/**
 * İş ve usta eşleşmesi kontrolü
 *
 * @param job İş verisi
 * @param providerPreferences Ustanın kategori ve alt hizmet tercihleri
 * @returns Eşleşiyorsa true, değilse false
 */
export function matchesJob(
  job: JobFormData,
  providerPreferences: ProviderServicePreferences,
): boolean {
  // Ustanın ana kategori listesinde bu kategori var mı?
  const hasMainCategory = providerPreferences.mainCategories.includes(
    job.mainCategoryId,
  );

  if (!hasMainCategory) {
    return false; // Ana kategori eşleşmiyorsa, eşleşme yok
  }

  // Eğer "Diğer" seçeneği seçilmişse
  if (job.isOther || !job.subServiceId) {
    // Ana kategori eşleşiyorsa, tüm bu kategorideki ustalara gitsin
    return true;
  }

  // Özel alt hizmet seçilmişse
  // Hem ana kategori hem alt hizmet eşleşmeli
  const hasSubService = providerPreferences.subServices.includes(
    job.subServiceId,
  );

  return hasSubService;
}

/**
 * Birden fazla iş için eşleşme kontrolü (batch)
 *
 * @param jobs İş listesi
 * @param providerPreferences Ustanın tercihleri
 * @returns Eşleşen işlerin listesi
 */
export function filterMatchingJobs(
  jobs: JobFormData[],
  providerPreferences: ProviderServicePreferences,
): JobFormData[] {
  return jobs.filter((job) => matchesJob(job, providerPreferences));
}

/**
 * Usta için eşleşen işleri bulur (Supabase query mantığı)
 *
 * Bu fonksiyon, Supabase'de çalışacak SQL query mantığını gösterir.
 * Gerçek implementasyon Supabase client veya Prisma ile yapılacak.
 *
 * SQL Örneği:
 *
 * ```sql
 * SELECT j.*
 * FROM jobs j
 * WHERE j.status = 'PENDING'
 *   AND (
 *     -- "Diğer" seçeneği için: sadece ana kategori eşleşmesi yeterli
 *     (j.is_other = true AND j.main_category_id = ANY(provider.main_categories))
 *     OR
 *     -- Özel alt hizmet için: hem ana kategori hem alt hizmet eşleşmeli
 *     (
 *       j.is_other = false
 *       AND j.main_category_id = ANY(provider.main_categories)
 *       AND j.subservice_id = ANY(provider.subservices)
 *     )
 *   )
 * ORDER BY j.created_at DESC;
 * ```
 *
 * Prisma Örneği:
 *
 * ```typescript
 * const matchingJobs = await prisma.job.findMany({
 *   where: {
 *     status: 'PENDING',
 *     OR: [
 *       {
 *         isOther: true,
 *         mainCategoryId: { in: provider.mainCategories }
 *       },
 *       {
 *         isOther: false,
 *         mainCategoryId: { in: provider.mainCategories },
 *         subServiceId: { in: provider.subServices }
 *       }
 *     ]
 *   },
 *   orderBy: { createdAt: 'desc' }
 * });
 * ```
 */
export function getMatchingJobsForProvider(
  providerPreferences: ProviderServicePreferences,
): string {
  // Bu fonksiyon sadece dokümantasyon amaçlı
  // Gerçek implementasyon Supabase/Prisma ile yapılacak
  return `
    SELECT j.*
    FROM jobs j
    WHERE j.status = 'PENDING'
      AND (
        (j.is_other = true AND j.main_category_id = ANY($1))
        OR
        (
          j.is_other = false
          AND j.main_category_id = ANY($1)
          AND j.subservice_id = ANY($2)
        )
      )
    ORDER BY j.created_at DESC;
  `;
}
