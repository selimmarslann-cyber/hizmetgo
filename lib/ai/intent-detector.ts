/**
 * Intent Detector
 * Kullanıcı mesajlarını analiz eder ve hizmet talebi olup olmadığını belirler
 */

import { getAllKeywords } from "../utils/keywords";

// SERVICE_CATEGORIES'den tüm anahtar kelimeleri al
let SERVICE_KEYWORDS_CACHE: string[] | null = null;

function getServiceKeywords(): string[] {
  if (SERVICE_KEYWORDS_CACHE) {
    return SERVICE_KEYWORDS_CACHE;
  }

  // SERVICE_CATEGORIES'den tüm anahtar kelimeleri al
  const keywords = getAllKeywords();

  // Ek resmi meslek/hizmet anahtar kelimeleri (SGK/TÜİK kaynaklı)
  const additionalKeywords = [
    // Genel hizmet terimleri
    "usta",
    "tamir",
    "onarım",
    "bakım",
    "montaj",
    "demontaj",
    "kurulum",
    "yükleme",
    "boşaltma",
    "taşıma",
    "nakliye",
    "nakliyat",
    "taşımacılık",

    // İnşaat ve Yapı
    "inşaat",
    "yapı",
    "tadilat",
    "renovasyon",
    "restorasyon",
    "yıkım",
    "hafriyat",
    "kazı",
    "beton",
    "şap",
    "sıva",
    "alçı",
    "duvar",
    "perde",
    "pencere",
    "kapı",
    "merdiven",
    "balkon",
    "teras",
    "veranda",
    "asansör",
    "izolasyon",
    "yalıtım",
    "mantolama",
    "çatı",
    "çatı kaplama",
    "kiremit",
    "membran",
    "oluk",
    "parapet",
    "cumba",
    "köşk",
    "bahçe duvarı",
    "havuz",

    // Elektrik ve Elektronik
    "elektrik",
    "elektrikçi",
    "elektronik",
    "elektronikçi",
    "priz",
    "anahtar",
    "sigorta",
    "kablo",
    "tesisat",
    "avize",
    "lamba",
    "aydınlatma",
    "ışık",
    "sensör",
    "kamera",
    "güvenlik kamerası",
    "alarm",
    "interkom",
    "kapı telefonu",
    "anten",
    "uydu",
    "saat",
    "zil",
    "klima",
    "vantilatör",
    "aspiratör",
    "elektrik panosu",
    "güneş paneli",
    "elektrik sayacı",

    // Su, Tesisat, Doğalgaz
    "su",
    "tesisatçı",
    "tesisat",
    "musluk",
    "batarya",
    "lavabo",
    "klozet",
    "tuvalet",
    "banyo",
    "duş",
    "küvet",
    "jakuzi",
    "su arıtma",
    "filtre",
    "pompa",
    "hidrofor",
    "kalorifer",
    "kombi",
    "doğalgaz",
    "petek",
    "radyatör",
    "şofben",
    "termosifon",
    "sıcak su",
    "soğuk su",
    "su kaçağı",
    "tıkanıklık",
    "gider",
    "baca",
    "havalandırma",

    // Temizlik ve Bakım
    "temizlik",
    "temizlikçi",
    "ev temizliği",
    "ofis temizliği",
    "iş yeri temizliği",
    "cam temizliği",
    "pencere temizliği",
    "halı yıkama",
    "kilim yıkama",
    "koltuk yıkama",
    "perde yıkama",
    "battaniye yıkama",
    "bebek beşiği",
    "bulaşık",
    "bulaşıkçı",
    "büyük temizlik",
    "derin temizlik",
    "kış temizliği",
    "yaz temizliği",
    "dış cephe temizliği",
    "bina temizliği",
    "site temizliği",
    "okul temizliği",
    "hastane temizliği",
    "otel temizliği",
    "restoran temizliği",
    "cafe temizliği",

    // Boya ve Badana
    "boya",
    "badana",
    "boyacı",
    "duvar boyası",
    "tavan boyası",
    "kapı boyası",
    "pencere boyası",
    "dış cephe boyası",
    "iç cephe boyası",
    "badana",
    "kireç",
    "plastik boya",
    "su bazlı boya",
    "yağlı boya",
    "vernik",
    "cila",
    "astar",
    "macun",
    "alçı macunu",
    "boya sökme",
    "boya kazıma",

    // Marangozluk ve Mobilya
    "marangoz",
    "mobilya",
    "dolap",
    "masa",
    "sandalye",
    "koltuk",
    "yatak",
    "karyola",
    "komodin",
    "mutfak dolabı",
    "banyo dolabı",
    "gardırop",
    "vitrin",
    "kitaplık",
    "sehpa",
    "tv ünitesi",
    "kapı yapımı",
    "pencere yapımı",
    "merdiven yapımı",
    "raf",
    "raflama",
    "duvar rafı",
    "ahşap işleri",
    "parke",
    "laminat",
    "laminat döşeme",
    "parke cilalama",
    "parke tamiri",
    "kapı tamiri",
    "pencere tamiri",
    "mobilya tamiri",
    "mobilya montajı",
    "ikea montajı",
    "ikea kurulum",

    // Çilingir ve Güvenlik
    "çilingir",
    "kilit",
    "anahtar",
    "kapı kilidi",
    "pencere kilidi",
    "kasa",
    "güvenlik",
    "güvenlikçi",
    "koruma",
    "bekçi",
    "alarm",
    "kamera sistemi",
    "güvenlik kamerası",
    "yangın alarmı",
    "hırsız alarmı",
    "paspas",
    "giriş kapısı",
    "çelik kapı",
    "kepenk",
    "panjur",
    "jaluzi",
    "store",
    "tente",
    "şemsiye",

    // Bahçıvanlık ve Peyzaj
    "bahçıvan",
    "bahçe",
    "peyzaj",
    "peyzaj mimarı",
    "çim",
    "çim ekimi",
    "ağaç",
    "fidan",
    "bitki",
    "çiçek",
    "sulama",
    "sulama sistemi",
    "damlama",
    "yağmurlama",
    "havuz",
    "havuz yapımı",
    "havuz temizliği",
    "havuz bakımı",
    "çit",
    "bahçe çiti",
    "tel örgü",
    "çardak",
    "pergola",
    "kamelya",
    "budama",
    "ağaç budama",
    "ağaç kesimi",
    "odun kesme",
    "bahçe temizliği",
    "yaprak toplama",
    "çöp toplama",
    "gübreleme",
    "ilaçlama",

    // Nakliyat ve Taşımacılık
    "nakliyat",
    "nakliye",
    "taşıma",
    "eşya taşıma",
    "ev eşyası taşıma",
    "taşınma",
    "nakliyatçı",
    "taşıyıcı",
    "kamyon",
    "kamyonet",
    "şoför",
    "taşıyıcı şoför",
    "evden eve",
    "paketleme",
    "ambalaj",
    "taşınma organizasyonu",

    // Beyaz Eşya ve Elektronik
    "beyaz eşya",
    "buzdolabı",
    "derin dondurucu",
    "çamaşır makinesi",
    "bulaşık makinesi",
    "fırın",
    "ocak",
    "davlumbaz",
    "aspiratör",
    "mikrodalga",
    "klima",
    "kombi",
    "şofben",
    "termosifon",
    "elektrikli süpürge",
    "robot süpürge",
    "üütü",
    "televizyon",
    "tv",
    "montaj",
    "kurulum",
    "tamir",
    "bakım",
    "temizlik",
    "servis",
    "beyaz eşya servisi",

    // Otomotiv
    "oto tamir",
    "oto bakım",
    "lastik",
    "jant",
    "cam",
    "cam tamiri",
    "boyama",
    "kaportacı",
    "usta",
    "oto elektrik",
    "oto klima",
    "radyatör",
    "fren",
    "fren tamiri",
    "fren balata",
    "amortisör",
    "egzoz",
    "akü",
    "yıkama",
    "oto yıkama",
    "detaylı temizlik",
    "polislaj",
    "cila",

    // Güzellik ve Bakım
    "berber",
    "kuaför",
    "saç kesimi",
    "saç boyama",
    "fön",
    "düzleştirme",
    "perma",
    "makyaj",
    "makyajcı",
    "güzellik uzmanı",
    "estetisyen",
    "cilt bakımı",
    "masaj",
    "masajcı",
    "spor masajı",
    "refleksoloji",
    "epilasyon",
    "lazer epilasyon",
    "kaş",
    "bıyık",
    "sakal düzeltme",
    "manikür",
    "pedikür",
    "ojeli",
    "nail art",

    // Sağlık ve Terapi
    "fizyoterapist",
    "fizyoterapi",
    "rehabilitasyon",
    "masaj terapisi",
    "spor antrenörü",
    "personal trainer",
    "yoga",
    "pilates",
    "meditasyon",
    "diyetisyen",
    "beslenme uzmanı",
    "psikolog",
    "psikolojik danışman",
    "hemşire",
    "evde bakım",
    "yaşlı bakımı",
    "hasta bakımı",
    "refakatçi",

    // Eğitim ve Özel Ders
    "özel ders",
    "matematik",
    "fizik",
    "kimya",
    "biyoloji",
    "türkçe",
    "ingilizce",
    "almanca",
    "fransızca",
    "tarih",
    "coğrafya",
    "edebiyat",
    "müzik",
    "piyano",
    "gitar",
    "keman",
    "bağlama",
    "resim",
    "görsel sanatlar",
    "dans",
    "bale",
    "latin dansı",
    "salsa",
    "bachata",
    "hip hop",
    "break dance",
    "spor",
    "futbol",
    "basketbol",
    "voleybol",
    "tenis",
    "yüzme",
    "jimnastik",
    "satranç",
    "robotik",
    "kodlama",
    "yazılım",
    "web tasarım",
    "grafik tasarım",

    // Teknoloji ve Yazılım
    "bilgisayar",
    "laptop",
    "tablet",
    "telefon",
    "akıllı telefon",
    "iphone",
    "android",
    "format",
    "format atma",
    "virüs temizleme",
    "yazılım yükleme",
    "yazılım geliştirme",
    "web sitesi",
    "e-ticaret",
    "seo",
    "sosyal medya",
    "grafik tasarım",
    "logo tasarımı",
    "web tasarım",
    "uygulama geliştirme",

    // Fotoğrafçılık ve Video
    "fotoğrafçı",
    "fotoğraf",
    "video",
    "videograf",
    "düğün fotoğrafçısı",
    "düğün videosu",
    "nişan",
    "kına",
    "sünnet",
    "doğum günü",
    "mevlüt",
    "fotoğraf çekimi",
    "video çekimi",
    "drone çekimi",
    "hava çekimi",
    "ürün fotoğrafı",
    "iç mekan fotoğrafı",
    "dış mekan fotoğrafı",

    // Organizasyon ve Etkinlik
    "organizatör",
    "etkinlik",
    "düğün organizasyonu",
    "nişan organizasyonu",
    "toplantı organizasyonu",
    "konferans",
    "seminer",
    "workshop",
    "eğitim",
    "sunucu",
    "dj",
    "müzisyen",
    "orkestra",
    "sahne",
    "ses sistemi",
    "ışık sistemi",
    "ses ve ışık",
    "dekorasyon",
    "çiçekçi",
    "balon",
    "mobilya kiralama",
    "masa kiralama",
    "sandalye kiralama",
    "çadır",

    // Gıda ve Catering
    "aşçı",
    "yemek",
    "catering",
    "düğün yemeği",
    "toplantı yemeği",
    "kahvaltı",
    "brunch",
    "öğle yemeği",
    "akşam yemeği",
    "kokteyl",
    "pasta",
    "pasta ustası",
    "pasta şefi",
    "doğum günü pastası",
    "düğün pastası",
    "nişan pastası",
    "kurabiye",
    "börek",
    "çörek",
    "ekmek",
    "simit",
    "poğaça",
    "su böreği",
    "börekçi",

    // Hayvan Bakımı
    "veteriner",
    "hayvan bakımı",
    "köpek bakıcısı",
    "kedi bakıcısı",
    "köpek gezdirme",
    "hayvan pansiyonu",
    "pet shop",
    "hayvan kuaförü",
    "köpek tıraşı",
    "kedi tıraşı",
    "hayvan eğitimi",
    "köpek eğitimi",
    "köpek eğitmeni",
    "hayvan oteli",

    // Çocuk Bakımı
    "bebek bakıcısı",
    "çocuk bakıcısı",
    "dadı",
    "oyun ablası",
    "oyun abisi",
    "okul sonrası bakım",
    "ev ödevi yardımı",

    // Yaşlı Bakımı
    "yaşlı bakımı",
    "hasta bakımı",
    "refakatçi",
    "hemşire",
    "evde bakım",
    "yaşlı refakatçisi",

    // Ev İşleri
    "ütücü",
    "ütü",
    "çamaşır",
    "çamaşır yıkama",
    "çamaşır katlama",
    "dikiş",
    "terzi",
    "kıyafet tamiri",
    "kıyafet daraltma",
    "kıyafet genişletme",
    "fermuar tamiri",
    "düğme dikme",
    "ceket tamiri",
    "pantolon tamiri",

    // Özel Hizmetler
    "araç yıkama",
    "motor yıkama",
    "deterjanlı yıkama",
    "kuru temizleme",
    "perde yıkama",
    "halı yıkama",
    "koltuk yıkama",
    "yatak yıkama",
    "yorgan yıkama",
    "battaniye yıkama",

    // Diğer Meslekler
    "çevirmen",
    "tercüman",
    "noter",
    "avukat",
    "muhasebeci",
    "mali müşavir",
    "danışman",
    "koç",
    "mentor",
    "rehber",
    "tur rehberi",
    "turist rehberi",
    "hostes",
    "steward",
    "pilot",
    "kaptan",
    "gemi kaptanı",
    "şoför",
    "taksici",
    "uber",
    "bi taksi",
    "özel şoför",
    "araç kiralama",
    "mimar",
    "inşaat mühendisi",
    "makine mühendisi",
    "elektrik mühendisi",
    "endüstri mühendisi",
    "yazılım mühendisi",
    "bilişim uzmanı",

    // Sanat ve El Sanatları
    "heykeltıraş",
    "resim",
    "tablo",
    "duvar resmi",
    "fresko",
    "mozaik",
    "seramik",
    "çömlek",
    "el sanatları",
    "takı tasarımı",
    "mücevher",
    "kuyumcu",
    "saatçi",
    "gözlükçü",
    "optisyen",

    // Spor ve Fitness
    "antrenör",
    "spor hocası",
    "fitness",
    "gym",
    "spor salonu",
    "pilates",
    "yoga",
    "crossfit",
    "koşu antrenörü",
    "yüzme hocası",
    "dans hocası",
    "bale hocası",
    "jimnastik hocası",

    // Medya ve İletişim
    "gazeteci",
    "muhabir",
    "sunucu",
    "spiker",
    "radyo programcısı",
    "tv programcısı",
    "youtuber",
    "blogger",
    "influencer",
    "sosyal medya uzmanı",
    "içerik üreticisi",
    "editör",
    "redaktör",
    "çevirmen",
    "tasarımcı",

    // Güvenlik ve Koruma
    "güvenlik görevlisi",
    "özel güvenlik",
    "koruma",
    "bodyguard",
    "bekçi",
    "kapıcı",
    "kapı görevlisi",
    "otopark görevlisi",

    // Çevre ve Temizlik
    "çevre mühendisi",
    "atık yönetimi",
    "geri dönüşüm",
    "temizlik",
    "sanitasyon",
    "dezenfeksiyon",
    "ilaçlama",
    "haşere ilaçlama",
    "böcek ilaçlama",
    "fare ilaçlama",
    "sivrisinek ilaçlama",

    // Finans ve Muhasebe
    "muhasebeci",
    "mali müşavir",
    "vergi danışmanı",
    "denetçi",
    "yeminli mali müşavir",
    "iş kurma",
    "şirket kurma",

    // Hukuk
    "avukat",
    "hukuk danışmanı",
    "noter",
    "icra müdürü",
    "hukuk bürosu",
    "hukuk danışmanlığı",

    // Pazarlama ve Reklam
    "pazarlama uzmanı",
    "reklamcı",
    "grafiker",
    "tasarımcı",
    "sosyal medya yöneticisi",
    "dijital pazarlama",
    "seo uzmanı",
    "google ads",
    "facebook ads",
    "instagram reklam",

    // Perakende ve Ticaret
    "mağaza",
    "dükkan",
    "satış",
    "satış temsilcisi",
    "kasiyer",
    "depo görevlisi",
    "stok",
    "envanter",
    "lojistik",

    // Turizm ve Konaklama
    "otel",
    "pansiyon",
    "butik otel",
    "rezervasyon",
    "turizm",
    "seyahat acentesi",
    "paket tur",
    "bireysel tur",

    // Tarım ve Hayvancılık
    "çiftçi",
    "ziraat mühendisi",
    "tarım",
    "hasat",
    "ekim",
    "dikim",
    "sulama",
    "gübreleme",
    "ilaçlama",
    "hayvancılık",
    "sütçü",
    "peynirci",
    "yumurta",
    "tavukçuluk",

    // Maden ve Enerji
    "maden mühendisi",
    "jeoloji mühendisi",
    "petrol mühendisi",
    "enerji",
    "güneş enerjisi",
    "rüzgar enerjisi",

    // Gemi ve Denizcilik
    "gemi",
    "tekne",
    "yacht",
    "kaptan",
    "tayfa",
    "gemi tamiri",
    "tekne bakımı",
    "deniz taşımacılığı",

    // Havacılık
    "pilot",
    "uçak",
    "helikopter",
    "havaalanı",
    "hava taşımacılığı",

    // Tekstil ve Moda
    "terzi",
    "dikiş",
    "konfeksiyon",
    "moda tasarımcısı",
    "stilist",
    "model",
    "manken",
    "foto model",

    // Yiyecek ve İçecek
    "garson",
    "servis",
    "barmen",
    "barista",
    "kahve",
    "çay",
    "restoran",
    "cafe",
    "kafe",
    "pastane",
    "fırın",
    "ekmek",
    "simit",
    "poğaça",
    "börek",
    "çörek",
    "tatlı",
    "dondurma",
    "ice cream",
    "meyve suyu",
    "smoothie",

    // Eğlence ve Sanat
    "sanatçı",
    "müzisyen",
    "şarkıcı",
    "oyuncu",
    "tiyatro",
    "sinema",
    "film",
    "dizi",
    "komedyen",
    "sihirbaz",
    "palyaço",
    "animatör",
    "sahne",
    "performans",

    // Toplum Hizmetleri
    "sosyal hizmet uzmanı",
    "psikolog",
    "sosyolog",
    "pdr",
    "rehberlik",
    "danışmanlık",
    "terapi",
    "psikoterapi",

    // Bilim ve Araştırma
    "araştırmacı",
    "bilim insanı",
    "laboratuvar",
    "test",
    "analiz",
    "kalite kontrol",
    "kalite mühendisi",

    // Endüstri ve Üretim
    "üretim",
    "fabrika",
    "imalat",
    "kalıp",
    "makine",
    "makine operatörü",
    "kaynakçı",
    "torna",
    "frez",
    "tesviyeci",
    "pres",
    "baskı",
    "matbaa",

    // İnşaat ve Yapı (ek detaylar)
    "demirci",
    "demir işleri",
    "betoncu",
    "kalıpçı",
    "fayans",
    "seramik",
    "granit",
    "mermer",
    "mozaik",
    "doğal taş",
    "peyzaj taşı",
    "bordür",
    "kaldırım",
    "asfalt",
    "yol",
    "parke taşı",
    "granit",
    "traverten",

    // Dekorasyon ve Tasarım
    "dekoratör",
    "iç mimar",
    "mobilya tasarımcısı",
    "dekorasyon",
    "iç tasarım",
    "mimari tasarım",
    "peyzaj mimarı",
    "peyzaj tasarımı",

    // Teknik Servis
    "teknik servis",
    "servis",
    "bakım onarım",
    "tamirci",
    "teknisyen",
    "teknik eleman",

    // Özel Ekipman
    "vinç",
    "forklift",
    "ekskavatör",
    "buldozer",
    "beton pompası",
    "jeneratör",
    "kompresör",

    // Diğer
    "petshop",
    "hayvan bakımı",
    "akvaryum",
    "balık",
    "kuş",
    "evcil hayvan",
    "pet",
    "köpek",
    "kedi",
  ];

  // SERVICE_CATEGORIES'den gelen kelimeler + ek meslekler
  SERVICE_KEYWORDS_CACHE = [...keywords, ...additionalKeywords];

  // Duplikatları kaldır ve sırala
  SERVICE_KEYWORDS_CACHE = Array.from(new Set(SERVICE_KEYWORDS_CACHE)).sort();

  return SERVICE_KEYWORDS_CACHE;
}

// Hizmet kelimeleri - Bu kelimelerden biri varsa AI açılır
const SERVICE_KEYWORDS = getServiceKeywords();

// Gereksiz sohbet kelimeleri - Bu kelimeler varsa ban
const CHAT_KEYWORDS = [
  "sence",
  "nasıl yapayım",
  "böyle böyle oldu",
  "şunu nasıl çözeyim",
  "genel sohbet",
  "projeyi şöyle düşünüyorum",
  "uzun paragraf",
  "ne dersin",
  "fikir ver",
  "öner",
  "danışmanlık",
  "mühendis",
  "mimarlık",
  "tasarım",
  "nasıl olur",
  "ne yapmalıyım",
  "önerin var mı",
  "nasıl çalışır",
  "bana yardım et",
  "sohbet edelim",
  "konuşalım",
];

export interface IntentResult {
  isServiceRequest: boolean;
  isChatIntent: boolean;
  intentScore: number;
  detectedKeywords: string[];
}

/**
 * Kullanıcı mesajını analiz eder
 */
export function detectIntent(message: string): IntentResult {
  const lowerMessage = message.toLowerCase().trim();

  // Çok kısa mesajlar (2 kelimeden az) → hizmet talebi olabilir
  const wordCount = lowerMessage
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  if (wordCount < 2) {
    return {
      isServiceRequest: true,
      isChatIntent: false,
      intentScore: 0.5,
      detectedKeywords: [],
    };
  }

  // Uzun mesajlar (50 kelimeden fazla) → muhtemelen sohbet
  if (wordCount > 50) {
    return {
      isServiceRequest: false,
      isChatIntent: true,
      intentScore: 0.1,
      detectedKeywords: ["uzun paragraf"],
    };
  }

  // Hizmet kelimelerini kontrol et
  const detectedServiceKeywords: string[] = [];
  for (const keyword of SERVICE_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      detectedServiceKeywords.push(keyword);
    }
  }

  // Sohbet kelimelerini kontrol et
  const detectedChatKeywords: string[] = [];
  for (const keyword of CHAT_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      detectedChatKeywords.push(keyword);
    }
  }

  // Intent score hesapla
  let intentScore = 0.5; // Başlangıç değeri

  // Hizmet kelimeleri varsa score artar
  if (detectedServiceKeywords.length > 0) {
    intentScore = Math.min(0.9, 0.5 + detectedServiceKeywords.length * 0.2);
  }

  // Sohbet kelimeleri varsa score düşer
  if (detectedChatKeywords.length > 0) {
    intentScore = Math.max(
      0.1,
      intentScore - detectedChatKeywords.length * 0.3,
    );
  }

  // Eğer hem hizmet hem sohbet kelimeleri varsa, sohbet öncelikli
  const isChatIntent =
    detectedChatKeywords.length > 0 &&
    detectedChatKeywords.length >= detectedServiceKeywords.length;
  const isServiceRequest = detectedServiceKeywords.length > 0 && !isChatIntent;

  return {
    isServiceRequest,
    isChatIntent,
    intentScore,
    detectedKeywords: isChatIntent
      ? detectedChatKeywords
      : detectedServiceKeywords,
  };
}

/**
 * Mesajın uzunluğunu kontrol et (sohbet tespiti için)
 */
export function isLongMessage(message: string): boolean {
  const wordCount = message.split(/\s+/).filter((w) => w.length > 0).length;
  return wordCount > 30; // 30 kelimeden fazla → uzun mesaj
}
