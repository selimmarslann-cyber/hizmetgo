/**
 * Anlık İşler için Anahtar Kelimeler
 * Kısa süreli, özel beceri gerektirmeyen veya minimal beceri gerektiren işler
 */

export const INSTANT_JOB_KEYWORDS = [
  // Hayvan Bakımı
  "köpek bakıcısı",
  "köpek gezdirme",
  "köpek bakımı",
  "köpek gezdirme hizmeti",
  "kedi bakıcısı",
  "kedi bakımı",
  "evcil hayvan bakıcısı",
  "hayvan bakıcısı",
  "pet bakıcısı",
  "pet sitter",
  "köpek oteli",
  "kedi oteli",

  // Taşıma ve Nakliye
  "yük taşıma",
  "eşya taşıma",
  "nakliye",
  "küçük nakliye",
  "eşya taşıma hizmeti",
  "ev eşyası taşıma",
  "ofis eşyası taşıma",
  "koli taşıma",
  "paket taşıma",
  "kargo taşıma",
  "taşıma işçisi",
  "hamal",
  "yük kaldırma",

  // Şoförlük
  "şoför",
  "özel şoför",
  "saatlik şoför",
  "günlük şoför",
  "geçici şoför",
  "yedek şoför",
  "şoför arıyorum",
  "araç kullanma",
  "sürücü",
  "chauffeur",

  // Alışveriş ve Teslimat
  "alışveriş",
  "market alışverişi",
  "alışveriş yapma",
  "alışveriş taşıma",
  "market taşıma",
  "teslimat",
  "kurye",
  "paket teslimat",
  "yemek teslimat",
  "evrak teslimat",
  "kargo teslimat",
  "hızlı teslimat",

  // Temizlik
  "ev temizliği",
  "ofis temizliği",
  "kısa süreli temizlik",
  "günlük temizlik",
  "haftalık temizlik",
  "temizlik yardımcısı",
  "temizlik işçisi",
  "bulaşık yıkama",
  "çamaşır yıkama",
  "ütü yapma",

  // Bahçe İşleri
  "bahçe işleri",
  "çim biçme",
  "bahçe temizliği",
  "yaprak toplama",
  "bitki sulama",
  "bahçe bakımı",
  "çiçek bakımı",
  "ağaç budama",
  "bahçıvan yardımcısı",

  // Bekçilik ve Güvenlik
  "bekçi",
  "güvenlik",
  "gece bekçisi",
  "gündüz bekçisi",
  "site bekçisi",
  "evin bekçisi",
  "kısa süreli bekçilik",
  "güvenlik görevlisi",

  // Paketleme ve Dağıtım
  "paketleme",
  "ambalajlama",
  "koli paketleme",
  "dağıtım",
  "broşür dağıtımı",
  "el ilanı dağıtımı",
  "gazete dağıtımı",
  "poster yapıştırma",
  "afiş asma",

  // Sıraya Girme ve Randevu
  "sıraya girme",
  "kuyruk bekleme",
  "randevu alma",
  "randevu bekleme",
  "sıra tutma",
  "yer tutma",

  // Etkinlik Yardımcılığı
  "etkinlik yardımcısı",
  "düğün yardımcısı",
  "parti yardımcısı",
  "organizasyon yardımcısı",
  "etkinlik işçisi",
  "servis elemanı",
  "garson yardımcısı",
  "mutfak yardımcısı",

  // Yemek ve Mutfak
  "yemek yapma",
  "yemek servisi",
  "mutfak yardımcısı",
  "bulaşıkçı",
  "aşçı yardımcısı",
  "yemek hazırlama",
  "yemek paketleme",

  // Çocuk ve Bebek Bakımı
  "çocuk bakıcısı",
  "bebek bakıcısı",
  "geçici bakıcı",
  "saatlik bakıcı",
  "günlük bakıcı",
  "çocuk bakımı",
  "bebek bakımı",

  // Yaşlı ve Hasta Bakımı
  "yaşlı bakımı",
  "hasta bakımı",
  "hasta refakatçisi",
  "yaşlı refakatçisi",
  "geçici bakım",
  "saatlik bakım",

  // Eğitim ve Ödev Yardımı
  "ödev yardımı",
  "ders yardımı",
  "öğretmen yardımcısı",
  "eğitim asistanı",
  "özel ders asistanı",

  // Fotoğraf ve Video
  "fotoğraf çekimi",
  "video çekimi",
  "etkinlik fotoğrafçısı",
  "düğün fotoğrafçısı",
  "amateur fotoğrafçı",

  // Organizasyon ve Planlama
  "organizasyon",
  "etkinlik organizasyonu",
  "düğün organizasyonu",
  "parti organizasyonu",
  "planlama yardımcısı",

  // Diğer Kısa Süreli İşler
  "yardımcı",
  "genel yardımcı",
  "ofis yardımcısı",
  "ev yardımcısı",
  "günlük işçi",
  "saatlik işçi",
  "geçici işçi",
  "part time işçi",
  "freelance işçi",
  "gündelikçi",
  "günlükçü",
  "saatlik iş",
  "günlük iş",
  "kısa süreli iş",
  "anlık iş",
  "hızlı iş",
  "acil iş",
];

/**
 * Anlık iş anahtar kelimelerini kontrol et
 */
export function isInstantJobKeyword(query: string): boolean {
  const lowerQuery = query.trim().toLowerCase();
  return INSTANT_JOB_KEYWORDS.some((keyword) =>
    lowerQuery.includes(keyword) || keyword.includes(lowerQuery),
  );
}

/**
 * Anlık iş için öneriler getir
 */
export function getInstantJobSuggestions(
  query: string,
  limit: number = 10,
): string[] {
  if (!query || query.trim().length < 2) {
    return INSTANT_JOB_KEYWORDS.slice(0, limit);
  }

  const lowerQuery = query.trim().toLowerCase();

  // Tam eşleşme öncelikli
  const exactMatches = INSTANT_JOB_KEYWORDS.filter(
    (kw) => kw === lowerQuery,
  );

  // Başlangıç eşleşmesi
  const startsWith = INSTANT_JOB_KEYWORDS.filter(
    (kw) => kw.startsWith(lowerQuery) && kw !== lowerQuery,
  );

  // İçinde geçen
  const contains = INSTANT_JOB_KEYWORDS.filter(
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

