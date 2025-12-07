/**
 * Service Category Classification
 *
 * AI (OpenAI GPT-4o-mini) kullanarak kullanıcının hizmet açıklamasından
 * en uygun service_category slug'ını seçer.
 *
 * ÖNEMLİ:
 * - AI SADECE kategori/slug seçer
 * - AI level, fiyat, süre, zorluk HESAPLAMAZ
 * - Level ve fee backend'deki service_categories ve lead_levels tablolarından gelir
 */

import { askOpenAI } from "./openai";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export interface ServiceCategory {
  categoryId: string;
  slug: string;
  name: string;
  level: number;
}

export interface ClassificationResult {
  category: ServiceCategory;
  confidence?: "high" | "medium" | "low";
}

/**
 * Aktif service kategorilerini Supabase'den çek
 */
async function getActiveCategories(): Promise<
  Array<{ id: string; name: string; slug: string }>
> {
  const { data, error } = await supabaseAdmin
    .from("service_categories")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Error fetching service categories:", error);
    throw new Error("Kategoriler yüklenemedi");
  }

  return data || [];
}

/**
 * Keyword-based fallback kategori seçimi
 * AI hata verirse veya sonuç gelmezse kullanılır
 */
function fallbackCategorySelection(
  description: string,
  categories: Array<{ id: string; name: string; slug: string }>,
): string | null {
  const lowerDesc = description.toLowerCase();

  // Basit keyword matching
  const keywordMap: Record<string, string> = {
    priz: "priz-anahtar",
    anahtar: "priz-anahtar",
    elektrik: "priz-anahtar",
    musluk: "kucuk-su-tesisat",
    su: "kucuk-su-tesisat",
    tesisat: "kucuk-su-tesisat",
    "çamaşır makinesi": "beyaz-esya",
    buzdolabı: "beyaz-esya",
    "bulaşık makinesi": "beyaz-esya",
    "beyaz eşya": "beyaz-esya",
    kombi: "kombi-bakim",
    klima: "klima-montaj",
    kaçağı: "buyuk-tesisat",
    küpeşte: "demir-dograma",
    korkuluk: "demir-dograma",
    demir: "demir-dograma",
    pvc: "pvc-kapi-pencere",
    kapı: "pvc-kapi-pencere",
    pencere: "pvc-kapi-pencere",
    tadilat: "tadilat-yenileme",
    yenileme: "tadilat-yenileme",
    çatı: "cati-izolasyon",
    izolasyon: "cati-izolasyon",
    yazılım: "yazilim-uygulama",
    uygulama: "yazilim-uygulama",
    // TS1117 fix: removed duplicate "yazılım" property
    boya: "boya-badana",
    badana: "boya-badana",
    marangoz: "marangoz",
    ahşap: "marangoz",
  };

  // Keyword'leri kontrol et
  for (const [keyword, slug] of Object.entries(keywordMap)) {
    if (lowerDesc.includes(keyword)) {
      // Slug'ın categories içinde olduğunu kontrol et
      const found = categories.find((c) => c.slug === slug);
      if (found) {
        return slug;
      }
    }
  }

  // Eşleşme bulunamazsa ilk kategoriyi döndür (fallback)
  return categories.length > 0 ? categories[0].slug : null;
}

/**
 * OpenAI ile kategori sınıflandırması yap
 *
 * @param userDescription - Kullanıcının yazdığı hizmet açıklaması
 * @returns En uygun kategori bilgisi (id, slug, name, level)
 */
export async function classifyServiceCategory(
  userDescription: string,
): Promise<ClassificationResult> {
  if (!userDescription || userDescription.trim().length === 0) {
    throw new Error("Açıklama boş olamaz");
  }

  // Aktif kategorileri çek
  const categories = await getActiveCategories();

  if (categories.length === 0) {
    throw new Error("Aktif kategori bulunamadı");
  }

  // Kategorileri formatla (AI prompt için)
  const categoriesList = categories
    .map((cat, idx) => `${idx + 1}) ${cat.name} -> ${cat.slug}`)
    .join("\n");

  // System prompt: AI'ya sadece kategori seçmesi gerektiğini söyle
  const systemPrompt = `Sen bir sınıflandırma motorusun. Görevin, verilen hizmet açıklamasını,
aşağıdaki service_categories listesinden EN UYGUN 1 (en fazla 2) kategoriye eşleştirmektir.

ÖNEMLİ KURALLAR:
- Sadece elimde verdiğim slug'lardan SEÇ
- Level, fiyat, süre, zorluk HESAPLAMA
- Sadece kategori/slug seç
- LEVEL, FİYAT, SÜRE, ZORLUK gibi kavramlara ASLA karışma
- Ben yalnızca SENİN seçtiğin kategori slug'ını kullanarak 
  sistemde kayıtlı level ve ücreti KENDİM hesaplayacağım

Cevabını JSON formatta döndür:
{ "slugs": ["slug-1", "slug-2"] }`;

  // User prompt
  const userPrompt = `Hizmet açıklaması: ${userDescription}

Kategoriler:
${categoriesList}

Cevabını JSON formatta döndür:
{ "slugs": ["slug-1", "slug-2"] }`;

  let selectedSlug: string | null = null;

  try {
    // OpenAI'ı çağır (timeout ve rate limit lib/ai/openai.ts içinde yönetiliyor)
    const enhancedUserPrompt = `${systemPrompt}\n\n${userPrompt}`;
    const response = await askOpenAI(enhancedUserPrompt, [], false);

    // JSON parse et
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const slugs = parsed.slugs || parsed.slug || [];

        if (Array.isArray(slugs) && slugs.length > 0) {
          // İlk slug'ı kullan (primary kategori)
          selectedSlug = slugs[0];
        } else if (typeof slugs === "string") {
          selectedSlug = slugs;
        }
      }
    } catch (parseError) {
      // JSON parse hatası - fallback'e geç
    }
  } catch (aiError) {
    // Error already logged
    // Fallback'e geç
  }

  // Eğer AI'dan slug gelmediyse, fallback kullan
  if (!selectedSlug) {
    selectedSlug = fallbackCategorySelection(userDescription, categories);
  }

  if (!selectedSlug) {
    throw new Error("Kategori seçilemedi");
  }

  // Seçilen slug'a göre kategori bilgisini bul
  const selectedCategory = categories.find((c) => c.slug === selectedSlug);

  if (!selectedCategory) {
    throw new Error(`Seçilen kategori bulunamadı: ${selectedSlug}`);
  }

  // Kategori detaylarını çek (level dahil)
  const { data: categoryDetail, error: detailError } = await supabaseAdmin
    .from("service_categories")
    .select("id, name, slug, level")
    .eq("id", selectedCategory.id)
    .single();

  if (detailError || !categoryDetail) {
    throw new Error("Kategori detayları yüklenemedi");
  }

  return {
    category: {
      categoryId: categoryDetail.id,
      slug: categoryDetail.slug,
      name: categoryDetail.name,
      level: categoryDetail.level,
    },
    confidence: "high", // AI kullanıldıysa high, fallback ise medium olabilir
  };
}
