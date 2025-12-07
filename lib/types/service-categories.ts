/**
 * Hizmetgo - Hizmet Kategorileri Tip Tanımları
 *
 * Bu dosya, platformdaki tüm hizmet kategorileri, alt hizmetler
 * ve anahtar kelimeler için TypeScript tip tanımlarını içerir.
 */

export type SubService = {
  id: string; // "home-repair", "full-flat-installation" vb.
  name: string; // "Ev içi küçük tamir / arıza"
  isOther?: boolean; // Diğer seçeneği ise true
  keywords: string[]; // Türkçe arama kelimeleri (min 20)
};

export type ServiceCategory = {
  id: string; // "electricity"
  name: string; // "Elektrik"
  keywords: string[]; // kategori genelinde arama kelimeleri
  subServices: SubService[];
};

/**
 * Kullanıcı arama sonucu
 */
export type SearchResult = {
  category: ServiceCategory;
  matchScore: number;
  matchedKeywords: string[];
};

/**
 * İş (Job) oluşturma için form verisi
 */
export type JobFormData = {
  mainCategoryId: string;
  subServiceId: string | null; // null ise "Diğer" seçilmiş
  isOther: boolean;
  description: string;
  city: string;
  district: string;
  addressText?: string;
  locationLat?: number;
  locationLng?: number;
  scheduledAt?: Date;
};

/**
 * Usta (Provider) kategori ve alt hizmet tercihleri
 */
export type ProviderServicePreferences = {
  mainCategories: string[]; // ["electricity", "plumbing"]
  subServices: string[]; // ["home-repair", "full-installation"]
};
