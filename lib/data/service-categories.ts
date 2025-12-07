/**
 * Hizmetgo - Hizmet Kategorileri Veri Seti
 *
 * Armut.com tarzında basit ve pratik kategori yapısı
 *
 * - Popüler kategoriler: 7-10 alt hizmet
 * - Az popüler: 5-7 alt hizmet
 * - Daha az popüler: 3-5 alt hizmet
 * - Nadir: Sadece "Diğer" seçeneği
 *
 * - Her alt hizmet: 10-15 anahtar kelime (yeterli)
 */

import { ServiceCategory } from "../types/service-categories";

/**
 * Tüm hizmet kategorileri
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  // ============================================
  // POPÜLER KATEGORİLER (7-10 alt hizmet)
  // ============================================

  {
    id: "electricity",
    name: "Elektrik",
    keywords: [
      "elektrik",

      "elektrikçi",

      "elektrik usta",

      "elektrik tamiri",

      "elektrik arızası",

      "priz",

      "anahtar",

      "sigorta",

      "elektrik tesisatı",

      "avize",

      "aydınlatma",

      "elektrikçi lazım",

      "acil elektrik",

      "elektrik sorunu",

      "elektrik çalışmıyor",
    ],
    subServices: [
      {
        id: "home-repair",
        name: "Ev içi küçük tamir / arıza",
        keywords: [
          "elektrik arızası",

          "priz bozuldu",

          "priz çalışmıyor",

          "lamba yanmıyor",

          "anahtar bozuldu",

          "sigorta atıyor",

          "sigorta attı",

          "kaçak akım rölesi",

          "elektrik ustası lazım",

          "elektrikçi çağır",

          "oda ışığı yanmıyor",

          "elektrik kesik",

          "elektrik yok",

          "acil elektrikçi",

          "elektrik tamiri",
        ],
      },
      {
        id: "outlet-switch-install",
        name: "Priz / anahtar montajı",
        keywords: [
          "priz montajı",

          "priz takma",

          "yeni priz takma",

          "priz değiştirme",

          "anahtar montajı",

          "anahtar takma",

          "anahtar değiştirme",

          "ışık anahtarı",

          "elektrik prizi",

          "duvar prizi",

          "topraklı priz",

          "priz bağlama",

          "anahtar bağlama",

          "elektrik anahtarı montajı",
        ],
      },
      {
        id: "lighting-install",
        name: "Avize / aydınlatma montajı",
        keywords: [
          "avize montajı",

          "avize takma",

          "avize asma",

          "aydınlatma montajı",

          "lamba montajı",

          "lamba takma",

          "spot ışık",

          "led aydınlatma",

          "tavan lambası",

          "duvar lambası",

          "avize değiştirme",

          "lamba değiştirme",

          "ışık montajı",

          "ampul değiştirme",

          "floresan montajı",
        ],
      },
      {
        id: "panel-upgrade",
        name: "Sigorta kutusu / pano yenileme",
        keywords: [
          "sigorta kutusu",

          "elektrik panosu",

          "pano değiştirme",

          "pano yenileme",

          "sigorta kutusu değiştirme",

          "elektrik panosu montajı",

          "pano montajı",

          "pano kurulumu",

          "eski pano değiştirme",

          "yeni pano takma",

          "pano bakımı",

          "pano tamiri",

          "elektrik panosu tamiri",
        ],
      },
      {
        id: "full-installation",
        name: "Komple elektrik tesisatı",
        keywords: [
          "komple elektrik tesisatı",

          "sıfır elektrik tesisatı",

          "yeni elektrik tesisatı",

          "daire elektrik tesisatı",

          "ev elektrik tesisatı",

          "elektrik tesisatı yapımı",

          "elektrik tesisatı kurulumu",

          "elektrik çekimi",

          "elektrik hattı çekme",

          "komple elektrik",

          "sıfırdan elektrik",

          "yeni bina elektrik",
        ],
      },
      {
        id: "renovation-electrical",
        name: "Tadilat sonrası elektrik yenileme",
        keywords: [
          "tadilat elektrik",

          "tadilat sonrası elektrik",

          "elektrik yenileme",

          "elektrik tesisatı yenileme",

          "eski elektrik değiştirme",

          "elektrik güncelleme",

          "elektrik modernizasyonu",

          "elektrik tesisatı değiştirme",

          "elektrik kablosu değiştirme",
        ],
      },
      {
        id: "security-camera-electrical",
        name: "Kamera / güvenlik sistemi kurulumu",
        keywords: [
          "kamera kurulumu",

          "güvenlik kamerası",

          "kamera montajı",

          "kamera takma",

          "güvenlik sistemi kurulumu",

          "güvenlik kamerası montajı",

          "kamera bağlantısı",

          "kamera kablosu çekme",

          "güvenlik sistemi montajı",

          "kamera sistemi kurulumu",
        ],
      },
      {
        id: "internet-data-wiring",
        name: "İnternet / data hattı çekimi",
        keywords: [
          "internet hattı",

          "data hattı",

          "internet kablosu",

          "data kablosu",

          "internet hattı çekme",

          "data hattı çekme",

          "ethernet kablosu",

          "internet bağlantısı",

          "internet kurulumu",

          "network kurulumu",
        ],
      },
      {
        id: "other-electricity",
        name: "Diğer (elektrik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "elektrik",

          "elektrikçi",

          "elektrik usta",

          "elektrik işi",

          "elektrik hizmeti",

          "elektrik sorunu",

          "elektrik arızası",

          "elektrik tamiri",

          "elektrik montajı",

          "elektrik kurulumu",

          "elektrik tesisatı",

          "elektrik bakımı",
        ],
      },
    ],
  },

  {
    id: "plumbing",
    name: "Su Tesisatı",
    keywords: [
      "su tesisatı",

      "tesisatçı",

      "tesisat usta",

      "su tesisatçısı",

      "tesisat tamiri",

      "su kaçağı",

      "tıkanıklık",

      "lavabo",

      "klozet",

      "musluk",

      "boru",

      "su arızası",

      "tesisatçı lazım",

      "acil tesisatçı",

      "su sorunu",

      "su çalışmıyor",
    ],
    subServices: [
      {
        id: "small-leak-repair",
        name: "Küçük kaçak / arıza tamiri",
        keywords: [
          "su kaçağı",

          "kaçak var",

          "su sızıntısı",

          "su damlıyor",

          "su akıyor",

          "kaçak tamiri",

          "su kaçağı tamiri",

          "kaçak onarımı",

          "su sızıntısı tamiri",

          "kaçak tespiti",

          "su kaçağı tespiti",

          "kaçak bulma",

          "kaçak onarım",

          "acil kaçak",

          "kaçak usta",

          "kaçak servis",
        ],
      },
      {
        id: "clog-removal",
        name: "Tıkanıklık açma",
        keywords: [
          "tıkanıklık",

          "tıkanıklık açma",

          "tıkanıklık giderme",

          "lavabo tıkanıklığı",

          "klozet tıkanıklığı",

          "banyo tıkanıklığı",

          "mutfak tıkanıklığı",

          "tıkanıklık açılır",

          "lavabo açma",

          "klozet açma",

          "banyo açma",

          "mutfak açma",

          "tıkanıklık sorunu",

          "tıkanıklık problemi",
        ],
      },
      {
        id: "faucet-repair",
        name: "Musluk tamiri / değiştirme",
        keywords: [
          "musluk tamiri",

          "musluk değiştirme",

          "musluk onarımı",

          "musluk düzeltme",

          "musluk bozuldu",

          "musluk çalışmıyor",

          "musluk akıyor",

          "musluk damlıyor",

          "musluk takma",

          "musluk montajı",

          "yeni musluk",

          "musluk bağlantısı",
        ],
      },
      {
        id: "toilet-repair",
        name: "Klozet tamiri / montajı",
        keywords: [
          "klozet tamiri",

          "klozet değiştirme",

          "klozet montajı",

          "klozet takma",

          "klozet onarımı",

          "klozet bozuldu",

          "klozet çalışmıyor",

          "klozet akıyor",

          "klozet kurulumu",

          "yeni klozet",

          "klozet bağlantısı",

          "klozet değişikliği",
        ],
      },
      {
        id: "bathroom-renovation",
        name: "Banyo komple yenileme",
        keywords: [
          "banyo yenileme",

          "banyo tadilat",

          "banyo komple",

          "banyo tamiri",

          "banyo tesisatı",

          "banyo montajı",

          "banyo kurulumu",

          "banyo değişikliği",

          "banyo onarımı",

          "banyo tamir",

          "banyo yenileme işi",
        ],
      },
      {
        id: "kitchen-plumbing",
        name: "Mutfak tesisatı",
        keywords: [
          "mutfak tesisatı",

          "mutfak su tesisatı",

          "mutfak tesisatçısı",

          "mutfak tamiri",

          "mutfak su kaçağı",

          "mutfak tıkanıklığı",

          "mutfak musluk",

          "mutfak lavabo",

          "mutfak tesisatı montajı",

          "mutfak tesisatı kurulumu",

          "mutfak tesisatı onarımı",
        ],
      },
      {
        id: "boiler-connection",
        name: "Kombi bağlantısı",
        keywords: [
          "kombi bağlantısı",

          "kombi tesisatı",

          "kombi montajı",

          "kombi kurulumu",

          "kombi bağlama",

          "kombi takma",

          "kombi su bağlantısı",

          "kombi doğalgaz bağlantısı",

          "kombi tesisatı montajı",

          "kombi tesisatı kurulumu",
        ],
      },
      {
        id: "full-plumbing-installation",
        name: "Komple daire su tesisatı",
        keywords: [
          "komple su tesisatı",

          "daire su tesisatı",

          "ev su tesisatı",

          "su tesisatı yapımı",

          "su tesisatı kurulumu",

          "su tesisatı montajı",

          "su çekimi",

          "su hattı çekme",

          "komple su",

          "sıfırdan su",

          "yeni bina su",

          "daire su",
        ],
      },
      {
        id: "other-plumbing",
        name: "Diğer (su tesisatı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su tesisatı",

          "tesisatçı",

          "tesisat usta",

          "su tesisatçısı",

          "tesisat tamiri",

          "su kaçağı",

          "tıkanıklık",

          "lavabo",

          "klozet",

          "musluk",

          "boru",

          "su arızası",

          "tesisatçı lazım",

          "acil tesisatçı",

          "su sorunu",

          "su çalışmıyor",

          "su tesisatı işi",
        ],
      },
    ],
  },

  {
    id: "natural-gas",
    name: "Doğalgaz",
    keywords: [
      "doğalgaz",

      "doğalgaz tesisatı",

      "doğalgaz montajı",

      "doğalgaz kurulumu",

      "doğalgaz bağlantısı",

      "doğalgaz tamiri",

      "doğalgaz onarımı",

      "doğalgaz usta",

      "doğalgaz sorunu",

      "doğalgaz arızası",

      "doğalgaz kaçağı",

      "doğalgazçı lazım",

      "acil doğalgaz",

      "doğalgaz çalışmıyor",
    ],
    subServices: [
      {
        id: "gas-leak-detection",
        name: "Doğalgaz kaçağı tespiti",
        keywords: [
          "doğalgaz kaçağı",

          "kaçak var",

          "doğalgaz sızıntısı",

          "doğalgaz kokusu",

          "kaçak tespiti",

          "doğalgaz kaçağı tespiti",

          "kaçak bulma",

          "kaçak kontrolü",

          "kaçak testi",

          "kaçak ölçümü",

          "kaçak tespit",

          "acil kaçak",
        ],
      },
      {
        id: "gas-connection",
        name: "Doğalgaz bağlantısı",
        keywords: [
          "doğalgaz bağlantısı",

          "doğalgaz bağlama",

          "doğalgaz takma",

          "doğalgaz montajı",

          "doğalgaz kurulumu",

          "yeni doğalgaz",

          "doğalgaz bağlantısı yapılır",

          "doğalgaz bağlama yapılır",

          "doğalgaz takma yapılır",
        ],
      },
      {
        id: "gas-meter-install",
        name: "Doğalgaz sayacı montajı",
        keywords: [
          "doğalgaz sayacı",

          "sayac montajı",

          "sayac takma",

          "sayac kurulumu",

          "sayac bağlantısı",

          "sayac değiştirme",

          "sayac yenileme",

          "sayac tamiri",

          "sayac onarımı",

          "sayac bakımı",
        ],
      },
      {
        id: "gas-pipe-repair",
        name: "Doğalgaz borusu tamiri / değiştirme",
        keywords: [
          "doğalgaz borusu",

          "boru tamiri",

          "boru değiştirme",

          "boru onarımı",

          "boru düzeltme",

          "boru montajı",

          "boru kurulumu",

          "boru takma",

          "boru bağlantısı",

          "boru bağlama",

          "boru değişikliği",
        ],
      },
      {
        id: "gas-appliance-connection",
        name: "Doğalgazlı cihaz bağlantısı (kombi, ocak, vb.)",
        keywords: [
          "doğalgazlı cihaz",

          "kombi bağlantısı",

          "ocak bağlantısı",

          "soba bağlantısı",

          "doğalgazlı cihaz bağlantısı",

          "kombi bağlama",

          "ocak bağlama",

          "soba bağlama",

          "kombi takma",

          "ocak takma",

          "soba takma",

          "doğalgazlı cihaz takma",
        ],
      },
      {
        id: "gas-system-upgrade",
        name: "Doğalgaz tesisatı yenileme / güncelleme",
        keywords: [
          "doğalgaz tesisatı yenileme",

          "doğalgaz tesisatı güncelleme",

          "doğalgaz tesisatı değiştirme",

          "doğalgaz tesisatı onarımı",

          "doğalgaz tesisatı düzeltme",

          "doğalgaz tesisatı bakımı",

          "doğalgaz tesisatı tamiri",

          "doğalgaz tesisatı modernizasyonu",

          "eski doğalgaz tesisatı",
        ],
      },
      {
        id: "gas-safety-check",
        name: "Doğalgaz güvenlik kontrolü",
        keywords: [
          "doğalgaz güvenlik",

          "güvenlik kontrolü",

          "doğalgaz kontrolü",

          "güvenlik testi",

          "doğalgaz testi",

          "güvenlik ölçümü",

          "doğalgaz ölçümü",

          "güvenlik bakımı",

          "doğalgaz bakımı",

          "doğalgaz güvenlik kontrolü",
        ],
      },
      {
        id: "gas-emergency-repair",
        name: "Acil doğalgaz tamiri",
        keywords: [
          "acil doğalgaz",

          "acil tamir",

          "doğalgaz acil",

          "acil doğalgaz tamiri",

          "acil doğalgaz onarımı",

          "acil doğalgaz servisi",

          "acil doğalgaz hizmeti",

          "acil doğalgazçı",

          "doğalgaz acil usta",

          "acil doğalgaz usta",

          "acil doğalgaz çağır",
        ],
      },
      {
        id: "gas-full-installation",
        name: "Komple doğalgaz tesisatı (sıfır)",
        keywords: [
          "komple doğalgaz",

          "sıfır doğalgaz",

          "yeni doğalgaz tesisatı",

          "doğalgaz tesisatı yapımı",

          "doğalgaz tesisatı kurulumu",

          "doğalgaz tesisatı montajı",

          "doğalgaz çekimi",

          "doğalgaz hattı çekme",

          "komple doğalgaz tesisatı",

          "sıfırdan doğalgaz",
        ],
      },
      {
        id: "other-natural-gas",
        name: "Diğer (doğalgaz ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "doğalgaz",

          "doğalgaz tesisatı",

          "doğalgaz montajı",

          "doğalgaz kurulumu",

          "doğalgaz bağlantısı",

          "doğalgaz tamiri",

          "doğalgaz onarımı",

          "doğalgaz usta",

          "doğalgaz sorunu",

          "doğalgaz arızası",

          "doğalgaz kaçağı",

          "doğalgazçı lazım",

          "acil doğalgaz",

          "doğalgaz çalışmıyor",

          "doğalgaz işi",
        ],
      },
    ],
  },

  {
    id: "boiler-radiator",
    name: "Kombi / Petek",
    keywords: [
      "kombi",

      "petek",

      "kalorifer",

      "ısıtma",

      "kombi tamiri",

      "kombi montajı",

      "kombi servisi",

      "petek tamiri",

      "petek montajı",

      "kalorifer tamiri",

      "kombi arızası",

      "petek arızası",

      "kombi çalışmıyor",

      "petek çalışmıyor",

      "kombi usta",

      "petek usta",

      "kalorifer usta",

      "acil kombi",
    ],
    subServices: [
      {
        id: "boiler-repair",
        name: "Kombi tamiri / arıza",
        keywords: [
          "kombi tamiri",

          "kombi arızası",

          "kombi çalışmıyor",

          "kombi bozuldu",

          "kombi onarımı",

          "kombi düzeltme",

          "kombi bakımı",

          "kombi servisi",

          "acil kombi",

          "kombi acil",

          "kombi usta",

          "kombi servis",

          "kombi tamiri lazım",
        ],
      },
      {
        id: "boiler-installation",
        name: "Kombi montajı / kurulumu",
        keywords: [
          "kombi montajı",

          "kombi kurulumu",

          "kombi takma",

          "kombi bağlantısı",

          "kombi bağlama",

          "yeni kombi",

          "kombi değiştirme",

          "kombi yenileme",

          "kombi montajı yapılır",

          "kombi kurulumu yapılır",

          "kombi takma yapılır",
        ],
      },
      {
        id: "radiator-repair",
        name: "Petek tamiri / değiştirme",
        keywords: [
          "petek tamiri",

          "petek değiştirme",

          "petek onarımı",

          "petek düzeltme",

          "petek montajı",

          "petek kurulumu",

          "petek takma",

          "petek bağlantısı",

          "yeni petek",

          "petek yenileme",

          "petek değişikliği",
        ],
      },
      {
        id: "radiator-installation",
        name: "Petek montajı / kurulumu",
        keywords: [
          "petek montajı",

          "petek kurulumu",

          "petek takma",

          "petek bağlantısı",

          "petek bağlama",

          "yeni petek",

          "petek değiştirme",

          "petek yenileme",

          "petek montajı yapılır",

          "petek kurulumu yapılır",

          "petek takma yapılır",
        ],
      },
      {
        id: "heating-system-maintenance",
        name: "Isıtma sistemi bakımı / temizliği",
        keywords: [
          "ısıtma sistemi bakımı",

          "kombi bakımı",

          "petek bakımı",

          "kalorifer bakımı",

          "ısıtma sistemi temizliği",

          "kombi temizliği",

          "petek temizliği",

          "kalorifer temizliği",

          "kombi servis bakımı",

          "petek servis bakımı",

          "kalorifer servis bakımı",
        ],
      },
      {
        id: "boiler-replacement",
        name: "Kombi değiştirme / yenileme",
        keywords: [
          "kombi değiştirme",

          "kombi yenileme",

          "kombi değişikliği",

          "eski kombi değiştirme",

          "yeni kombi takma",

          "kombi değiştirme montajı",

          "kombi yenileme montajı",

          "kombi değiştirme kurulumu",

          "kombi yenileme kurulumu",
        ],
      },
      {
        id: "radiator-replacement",
        name: "Petek değiştirme / yenileme",
        keywords: [
          "petek değiştirme",

          "petek yenileme",

          "petek değişikliği",

          "eski petek değiştirme",

          "yeni petek takma",

          "petek değiştirme montajı",

          "petek yenileme montajı",

          "petek değiştirme kurulumu",

          "petek yenileme kurulumu",
        ],
      },
      {
        id: "heating-pipe-repair",
        name: "Kalorifer borusu tamiri",
        keywords: [
          "kalorifer borusu",

          "ısıtma borusu",

          "kalorifer borusu tamiri",

          "ısıtma borusu tamiri",

          "kalorifer borusu onarımı",

          "kalorifer borusu düzeltme",

          "kalorifer borusu montajı",

          "kalorifer borusu kurulumu",

          "kalorifer borusu bağlantısı",

          "kalorifer borusu değiştirme",
        ],
      },
      {
        id: "heating-system-full-installation",
        name: "Komple ısıtma sistemi kurulumu",
        keywords: [
          "komple ısıtma sistemi",

          "ısıtma sistemi kurulumu",

          "kalorifer sistemi kurulumu",

          "komple kalorifer",

          "ısıtma sistemi montajı",

          "komple ısıtma",

          "sıfır ısıtma",

          "yeni ısıtma sistemi",

          "ısıtma sistemi yapımı",
        ],
      },
      {
        id: "other-boiler-radiator",
        name: "Diğer (kombi / petek ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kombi",

          "petek",

          "kalorifer",

          "ısıtma",

          "kombi tamiri",

          "kombi montajı",

          "kombi servisi",

          "petek tamiri",

          "petek montajı",

          "kalorifer tamiri",

          "kombi arızası",

          "petek arızası",

          "kombi çalışmıyor",

          "petek çalışmıyor",

          "kombi usta",

          "petek usta",

          "kalorifer usta",

          "kombi işi",
        ],
      },
    ],
  },

  {
    id: "appliance-repair",
    name: "Beyaz Eşya Tamiri",
    keywords: [
      "beyaz eşya",

      "beyaz eşya tamiri",

      "beyaz eşya servisi",

      "buzdolabı tamiri",

      "çamaşır makinesi tamiri",

      "bulaşık makinesi tamiri",

      "fırın tamiri",

      "ocak tamiri",

      "beyaz eşya usta",

      "beyaz eşya servis",

      "beyaz eşya arızası",

      "beyaz eşya çalışmıyor",

      "acil beyaz eşya",

      "beyaz eşya tamiri lazım",
    ],
    subServices: [
      {
        id: "refrigerator-repair",
        name: "Buzdolabı tamiri",
        keywords: [
          "buzdolabı tamiri",

          "buzdolabı arızası",

          "buzdolabı çalışmıyor",

          "buzdolabı bozuldu",

          "buzdolabı onarımı",

          "buzdolabı düzeltme",

          "buzdolabı bakımı",

          "buzdolabı servisi",

          "acil buzdolabı",

          "buzdolabı usta",

          "buzdolabı servis",

          "buzdolabı tamiri lazım",

          "buzdolabı soğutmuyor",
        ],
      },
      {
        id: "washing-machine-repair",
        name: "Çamaşır makinesi tamiri",
        keywords: [
          "çamaşır makinesi tamiri",

          "çamaşır makinesi arızası",

          "çamaşır makinesi çalışmıyor",

          "çamaşır makinesi bozuldu",

          "çamaşır makinesi onarımı",

          "çamaşır makinesi düzeltme",

          "çamaşır makinesi bakımı",

          "çamaşır makinesi servisi",

          "acil çamaşır makinesi",

          "çamaşır makinesi usta",

          "çamaşır makinesi servis",

          "çamaşır makinesi tamiri lazım",
        ],
      },
      {
        id: "dishwasher-repair",
        name: "Bulaşık makinesi tamiri",
        keywords: [
          "bulaşık makinesi tamiri",

          "bulaşık makinesi arızası",

          "bulaşık makinesi çalışmıyor",

          "bulaşık makinesi bozuldu",

          "bulaşık makinesi onarımı",

          "bulaşık makinesi düzeltme",

          "bulaşık makinesi bakımı",

          "bulaşık makinesi servisi",

          "acil bulaşık makinesi",

          "bulaşık makinesi usta",

          "bulaşık makinesi servis",

          "bulaşık makinesi tamiri lazım",
        ],
      },
      {
        id: "oven-repair",
        name: "Fırın tamiri",
        keywords: [
          "fırın tamiri",

          "fırın arızası",

          "fırın çalışmıyor",

          "fırın bozuldu",

          "fırın onarımı",

          "fırın düzeltme",

          "fırın bakımı",

          "fırın servisi",

          "acil fırın",

          "fırın usta",

          "fırın servis",

          "fırın tamiri lazım",

          "fırın ısıtmıyor",
        ],
      },
      {
        id: "stove-repair",
        name: "Ocak tamiri",
        keywords: [
          "ocak tamiri",

          "ocak arızası",

          "ocak çalışmıyor",

          "ocak bozuldu",

          "ocak onarımı",

          "ocak düzeltme",

          "ocak bakımı",

          "ocak servisi",

          "acil ocak",

          "ocak usta",

          "ocak servis",

          "ocak tamiri lazım",

          "ocak yanmıyor",
        ],
      },
      {
        id: "dryer-repair",
        name: "Kurutma makinesi tamiri",
        keywords: [
          "kurutma makinesi tamiri",

          "kurutma makinesi arızası",

          "kurutma makinesi çalışmıyor",

          "kurutma makinesi bozuldu",

          "kurutma makinesi onarımı",

          "kurutma makinesi düzeltme",

          "kurutma makinesi bakımı",

          "kurutma makinesi servisi",

          "acil kurutma makinesi",

          "kurutma makinesi usta",

          "kurutma makinesi servis",

          "kurutma makinesi tamiri lazım",
        ],
      },
      {
        id: "appliance-installation",
        name: "Beyaz eşya montajı / kurulumu",
        keywords: [
          "beyaz eşya montajı",

          "beyaz eşya kurulumu",

          "beyaz eşya takma",

          "beyaz eşya bağlantısı",

          "beyaz eşya bağlama",

          "yeni beyaz eşya",

          "beyaz eşya değiştirme",

          "beyaz eşya yenileme",

          "beyaz eşya montajı yapılır",

          "beyaz eşya kurulumu yapılır",
        ],
      },
      {
        id: "appliance-maintenance",
        name: "Beyaz eşya bakımı / temizliği",
        keywords: [
          "beyaz eşya bakımı",

          "beyaz eşya temizliği",

          "beyaz eşya servis bakımı",

          "buzdolabı bakımı",

          "çamaşır makinesi bakımı",

          "bulaşık makinesi bakımı",

          "fırın bakımı",

          "ocak bakımı",

          "buzdolabı temizliği",

          "çamaşır makinesi temizliği",
        ],
      },
      {
        id: "other-appliance-repair",
        name: "Diğer (beyaz eşya ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "beyaz eşya",

          "beyaz eşya tamiri",

          "beyaz eşya servisi",

          "buzdolabı tamiri",

          "çamaşır makinesi tamiri",

          "bulaşık makinesi tamiri",

          "fırın tamiri",

          "ocak tamiri",

          "beyaz eşya usta",

          "beyaz eşya servis",

          "beyaz eşya arızası",

          "beyaz eşya çalışmıyor",

          "acil beyaz eşya",

          "beyaz eşya işi",
        ],
      },
    ],
  },

  {
    id: "air-conditioning",
    name: "Klima Montaj / Servis",
    keywords: [
      "klima",

      "klima montajı",

      "klima servisi",

      "klima tamiri",

      "klima kurulumu",

      "klima bakımı",

      "klima temizliği",

      "klima usta",

      "klima arızası",

      "klima çalışmıyor",

      "split klima",

      "vrf klima",

      "merkezi klima",

      "klima gazı",

      "klima filtre",

      "acil klima",

      "klima servis lazım",
    ],
    subServices: [
      {
        id: "ac-installation",
        name: "Klima montajı / kurulumu",
        keywords: [
          "klima montajı",

          "klima kurulumu",

          "klima takma",

          "klima bağlantısı",

          "klima bağlama",

          "yeni klima",

          "kombi değiştirme",

          "klima yenileme",

          "klima montajı yapılır",

          "klima kurulumu yapılır",

          "split klima montajı",
        ],
      },
      {
        id: "ac-repair",
        name: "Klima tamiri / arıza",
        keywords: [
          "klima tamiri",

          "klima arızası",

          "klima çalışmıyor",

          "klima bozuldu",

          "klima onarımı",

          "klima düzeltme",

          "klima bakımı",

          "klima servisi",

          "acil klima",

          "klima usta",

          "klima servis",

          "klima tamiri lazım",

          "klima soğutmuyor",

          "klima ısıtmıyor",
        ],
      },
      {
        id: "ac-maintenance",
        name: "Klima bakımı / temizliği",
        keywords: [
          "klima bakımı",

          "klima temizliği",

          "klima servis bakımı",

          "klima filtre temizliği",

          "klima servis",

          "klima bakım servisi",

          "klima filtre değişimi",

          "klima gaz kontrolü",

          "klima gaz dolumu",

          "klima periyodik bakım",
        ],
      },
      {
        id: "ac-gas-refill",
        name: "Klima gazı dolumu",
        keywords: [
          "klima gazı",

          "klima gazı dolumu",

          "klima gazı ekleme",

          "klima gazı yapma",

          "klima gaz kontrolü",

          "klima gaz ölçümü",

          "klima gaz tamiri",

          "klima gazı servisi",

          "klima gazı bakımı",
        ],
      },
      {
        id: "ac-filter-cleaning",
        name: "Klima filtre temizliği / değişimi",
        keywords: [
          "klima filtre",

          "klima filtre temizliği",

          "klima filtre değişimi",

          "klima filtre bakımı",

          "klima filtre servisi",

          "klima filtre tamiri",

          "klima filtre onarımı",

          "klima filtre değiştirme",

          "klima filtre yenileme",
        ],
      },
      {
        id: "ac-replacement",
        name: "Klima değiştirme / yenileme",
        keywords: [
          "klima değiştirme",

          "klima yenileme",

          "klima değişikliği",

          "eski klima değiştirme",

          "yeni klima takma",

          "klima değiştirme montajı",

          "klima yenileme montajı",

          "klima değiştirme kurulumu",

          "klima yenileme kurulumu",
        ],
      },
      {
        id: "ac-emergency-repair",
        name: "Acil klima tamiri",
        keywords: [
          "acil klima",

          "acil tamir",

          "klima acil",

          "acil klima tamiri",

          "acil klima onarımı",

          "acil klima servisi",

          "acil klima hizmeti",

          "acil klimacı",

          "klima acil usta",

          "acil klima usta",

          "acil klima çağır",
        ],
      },
      {
        id: "other-air-conditioning",
        name: "Diğer (klima ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "klima",

          "klima montajı",

          "klima servisi",

          "klima tamiri",

          "klima kurulumu",

          "klima bakımı",

          "klima temizliği",

          "klima usta",

          "klima arızası",

          "klima çalışmıyor",

          "split klima",

          "vrf klima",

          "merkezi klima",

          "klima gazı",

          "klima filtre",

          "acil klima",

          "klima işi",
        ],
      },
    ],
  },

  {
    id: "locksmith",
    name: "Çilingir",
    keywords: [
      "çilingir",

      "çilingir usta",

      "çilingir servisi",

      "kilit açma",

      "anahtar yapma",

      "kilit tamiri",

      "kilit değiştirme",

      "kapı kilidi",

      "kasa açma",

      "acil çilingir",

      "kilit açılır",

      "anahtar kopyası",

      "kilit montajı",

      "güvenlik kilidi",

      "çilingir lazım",
    ],
    subServices: [
      {
        id: "lock-opening",
        name: "Kilit açma (acil)",
        keywords: [
          "kilit açma",

          "kapı açma",

          "acil kilit açma",

          "acil kapı açma",

          "kilit açılır",

          "kapı açılır",

          "kilit açma servisi",

          "kapı açma servisi",

          "acil kilit açma servisi",

          "çilingir kilit açma",

          "çilingir kapı açma",

          "acil çilingir kilit açma",
        ],
      },
      {
        id: "key-duplication",
        name: "Anahtar kopyası / yapımı",
        keywords: [
          "anahtar kopyası",

          "anahtar yapma",

          "anahtar çoğaltma",

          "anahtar kopyalama",

          "anahtar kopyası servisi",

          "anahtar yapma servisi",

          "anahtar çoğaltma servisi",

          "çilingir anahtar kopyası",

          "çilingir anahtar yapma",

          "anahtar kopyası yapılır",
        ],
      },
      {
        id: "lock-repair",
        name: "Kilit tamiri",
        keywords: [
          "kilit tamiri",

          "kilit onarımı",

          "kilit düzeltme",

          "kilit bakımı",

          "kilit servisi",

          "kilit tamir",

          "kilit onarım",

          "kilit düzeltme işi",

          "kilit tamiri işi",

          "kilit onarımı işi",

          "kilit bakımı işi",
        ],
      },
      {
        id: "lock-replacement",
        name: "Kilit değiştirme",
        keywords: [
          "kilit değiştirme",

          "kilit yenileme",

          "kilit değişikliği",

          "eski kilit değiştirme",

          "yeni kilit takma",

          "kilit değiştirme montajı",

          "kilit yenileme montajı",

          "kilit değiştirme kurulumu",

          "kilit yenileme kurulumu",
        ],
      },
      {
        id: "lock-installation",
        name: "Kilit montajı / kurulumu",
        keywords: [
          "kilit montajı",

          "kilit kurulumu",

          "kilit takma",

          "kilit bağlantısı",

          "kilit bağlama",

          "yeni kilit",

          "kilit montajı yapılır",

          "kilit kurulumu yapılır",
        ],
      },
      {
        id: "safe-opening",
        name: "Kasa açma",
        keywords: [
          "kasa açma",

          "kasa açılır",

          "kasa açma servisi",

          "kasa açma hizmeti",

          "çilingir kasa açma",

          "acil kasa açma",

          "kasa açma usta",

          "kasa açma servis",
        ],
      },
      {
        id: "security-lock-installation",
        name: "Güvenlik kilidi montajı",
        keywords: [
          "güvenlik kilidi",

          "güvenlik kilidi montajı",

          "güvenlik kilidi kurulumu",

          "güvenlik kilidi takma",

          "güvenlik kilidi bağlantısı",

          "yeni güvenlik kilidi",

          "güvenlik kilidi montajı yapılır",

          "güvenlik kilidi kurulumu yapılır",
        ],
      },
      {
        id: "car-lock-opening",
        name: "Araba kilidi açma",
        keywords: [
          "araba kilidi",

          "araba kilidi açma",

          "araba kilidi açılır",

          "araba kilidi açma servisi",

          "çilingir araba kilidi",

          "acil araba kilidi",

          "araba kilidi açma usta",

          "araba kilidi açma servis",

          "araba kilidi açma lazım",
        ],
      },
      {
        id: "lock-emergency-service",
        name: "Acil çilingir hizmeti",
        keywords: [
          "acil çilingir",

          "acil kilit açma",

          "acil kapı açma",

          "acil anahtar yapma",

          "acil çilingir servisi",

          "acil kilit açma servisi",

          "acil kapı açma servisi",

          "acil çilingir usta",

          "acil kilit açma usta",

          "acil çilingir lazım",
        ],
      },
      {
        id: "other-locksmith",
        name: "Diğer (çilingir ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çilingir",

          "çilingir usta",

          "çilingir servisi",

          "kilit açma",

          "anahtar yapma",

          "kilit tamiri",

          "kilit değiştirme",

          "kapı kilidi",

          "kasa açma",

          "acil çilingir",

          "kilit açılır",

          "anahtar kopyası",

          "kilit montajı",

          "güvenlik kilidi",

          "çilingir lazım",

          "çilingir işi",
        ],
      },
    ],
  },

  {
    id: "painting",
    name: "Boya / Badana",
    keywords: [
      "boya",

      "badana",

      "boyacı",

      "boya usta",

      "boya işi",

      "badana işi",

      "duvar boyama",

      "tavan boyama",

      "kapı boyama",

      "pencere boyama",

      "iç cephe boya",

      "dış cephe boya",

      "komple boya",

      "oda boyama",

      "boya tamiri",

      "boya yenileme",

      "boya servisi",
    ],
    subServices: [
      {
        id: "interior-painting",
        name: "İç cephe boyama",
        keywords: [
          "iç cephe boya",

          "iç cephe boyama",

          "iç cephe badana",

          "iç cephe boya işi",

          "iç cephe boyama işi",

          "iç cephe badana işi",

          "boyacı iç cephe",

          "boya usta iç cephe",

          "iç cephe boyacı",

          "iç cephe boya lazım",
        ],
      },
      {
        id: "exterior-painting",
        name: "Dış cephe boyama",
        keywords: [
          "dış cephe boya",

          "dış cephe boyama",

          "dış cephe badana",

          "dış cephe boya işi",

          "dış cephe boyama işi",

          "dış cephe badana işi",

          "boyacı dış cephe",

          "boya usta dış cephe",

          "dış cephe boyacı",

          "dış cephe boya lazım",
        ],
      },
      {
        id: "room-painting",
        name: "Oda boyama (tek oda)",
        keywords: [
          "oda boyama",

          "oda boya",

          "oda badana",

          "oda boyama işi",

          "oda boya işi",

          "oda badana işi",

          "boyacı oda",

          "boya usta oda",

          "oda boyacı",

          "oda boya lazım",

          "salon boyama",

          "yatak odası boyama",
        ],
      },
      {
        id: "full-apartment-painting",
        name: "Komple daire boyama",
        keywords: [
          "komple daire boya",

          "komple daire boyama",

          "komple daire badana",

          "komple daire boya işi",

          "komple daire boyama işi",

          "boyacı komple daire",

          "boya usta komple daire",

          "komple daire boyacı",

          "komple daire boya lazım",
        ],
      },
      {
        id: "door-painting",
        name: "Kapı boyama",
        keywords: [
          "kapı boyama",

          "kapı boya",

          "kapı badana",

          "kapı boyama işi",

          "kapı boya işi",

          "kapı badana işi",

          "boyacı kapı",

          "boya usta kapı",

          "kapı boyacı",

          "kapı boya lazım",

          "ahşap kapı boyama",

          "metal kapı boyama",
        ],
      },
      {
        id: "window-painting",
        name: "Pencere boyama",
        keywords: [
          "pencere boyama",

          "pencere boya",

          "pencere badana",

          "pencere boyama işi",

          "pencere boya işi",

          "pencere badana işi",

          "boyacı pencere",

          "boya usta pencere",

          "pencere boyacı",

          "pencere boya lazım",

          "ahşap pencere boyama",
        ],
      },
      {
        id: "ceiling-painting",
        name: "Tavan boyama",
        keywords: [
          "tavan boyama",

          "tavan boya",

          "tavan badana",

          "tavan boyama işi",

          "tavan boya işi",

          "tavan badana işi",

          "boyacı tavan",

          "boya usta tavan",

          "tavan boyacı",

          "tavan boya lazım",

          "tavan asma tavan boyama",
        ],
      },
      {
        id: "pattern-painting",
        name: "Desenli / özel boyama",
        keywords: [
          "desenli boya",

          "desenli boyama",

          "özel boya",

          "özel boyama",

          "dekoratif boya",

          "dekoratif boyama",

          "desenli boya işi",

          "desenli boyama işi",

          "özel boya işi",

          "dekoratif boya işi",
        ],
      },
      {
        id: "paint-repair",
        name: "Boya tamiri / düzeltme",
        keywords: [
          "boya tamiri",

          "boya onarımı",

          "boya düzeltme",

          "boya bakımı",

          "boya servisi",

          "boya tamir",

          "boya onarım",

          "boya düzeltme işi",

          "boya tamiri işi",
        ],
      },
      {
        id: "other-painting",
        name: "Diğer (boya / badana ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "boya",

          "badana",

          "boyacı",

          "boya usta",

          "boya işi",

          "badana işi",

          "duvar boyama",

          "tavan boyama",

          "kapı boyama",

          "pencere boyama",

          "iç cephe boya",

          "dış cephe boya",

          "komple boya",

          "oda boyama",

          "boya tamiri",

          "boya yenileme",

          "boya servisi",

          "boya hizmeti",
        ],
      },
    ],
  },

  // ============================================
  // AZ POPÜLER KATEGORİLER (5-7 alt hizmet)
  // ============================================

  {
    id: "plaster-drywall",
    name: "Alçı / Sıva / Alçıpan",
    keywords: [
      "alçı",

      "sıva",

      "alçıpan",

      "alçı usta",

      "sıva usta",

      "alçıpan usta",

      "alçı işi",

      "sıva işi",

      "alçıpan işi",

      "alçı tamiri",

      "sıva tamiri",

      "alçıpan montajı",

      "alçı sıva",

      "alçıpan kurulumu",

      "alçı servisi",
    ],
    subServices: [
      {
        id: "plaster-application",
        name: "Alçı uygulama",
        keywords: [
          "alçı uygulama",

          "alçı yapma",

          "alçı işi",

          "alçı uygulama işi",

          "alçı yapma işi",

          "alçı usta",

          "alçı usta işi",

          "alçı lazım",
        ],
      },
      {
        id: "plaster-repair",
        name: "Alçı tamiri / düzeltme",
        keywords: [
          "alçı tamiri",

          "alçı onarımı",

          "alçı düzeltme",

          "alçı bakımı",

          "alçı servisi",

          "alçı tamir",

          "alçı onarım",

          "alçı düzeltme işi",

          "alçı tamiri işi",
        ],
      },
      {
        id: "drywall-installation",
        name: "Alçıpan montajı / kurulumu",
        keywords: [
          "alçıpan montajı",

          "alçıpan kurulumu",

          "alçıpan takma",

          "alçıpan bağlantısı",

          "yeni alçıpan",

          "alçıpan değiştirme",

          "alçıpan montajı yapılır",
        ],
      },
      {
        id: "plaster-sand",
        name: "Sıva uygulama",
        keywords: [
          "sıva uygulama",

          "sıva yapma",

          "sıva işi",

          "sıva uygulama işi",

          "sıva yapma işi",

          "sıva usta",

          "sıva usta işi",

          "sıva lazım",
        ],
      },
      {
        id: "plaster-sand-repair",
        name: "Sıva tamiri",
        keywords: [
          "sıva tamiri",

          "sıva onarımı",

          "sıva düzeltme",

          "sıva bakımı",

          "sıva servisi",

          "sıva tamir",

          "sıva onarım",

          "sıva düzeltme işi",

          "sıva tamiri işi",
        ],
      },
      {
        id: "drywall-ceiling",
        name: "Alçıpan asma tavan",
        keywords: [
          "alçıpan asma tavan",

          "asma tavan alçıpan",

          "alçıpan asma tavan işi",

          "asma tavan alçıpan işi",

          "alçıpan usta asma tavan",

          "alçıpan asma tavan lazım",
        ],
      },
      {
        id: "other-plaster-drywall",
        name: "Diğer (alçı / sıva / alçıpan ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "alçı",

          "sıva",

          "alçıpan",

          "alçı usta",

          "sıva usta",

          "alçıpan usta",

          "alçı işi",

          "sıva işi",

          "alçıpan işi",

          "alçı tamiri",

          "sıva tamiri",

          "alçıpan montajı",

          "alçı sıva",

          "alçıpan kurulumu",

          "alçı servisi",

          "alçı hizmeti",
        ],
      },
    ],
  },

  {
    id: "tile-ceramic",
    name: "Fayans / Seramik",
    keywords: [
      "fayans",

      "seramik",

      "fayans usta",

      "seramik usta",

      "fayans döşeme",

      "seramik döşeme",

      "fayans işi",

      "seramik işi",

      "fayans tamiri",

      "seramik tamiri",

      "fayans montajı",

      "seramik montajı",

      "fayans servisi",
    ],
    subServices: [
      {
        id: "tile-installation",
        name: "Fayans / seramik döşeme",
        keywords: [
          "fayans döşeme",

          "seramik döşeme",

          "fayans montajı",

          "seramik montajı",

          "fayans döşeme işi",

          "seramik döşeme işi",

          "fayans usta",

          "seramik usta",

          "fayans döşeme lazım",

          "seramik döşeme lazım",
        ],
      },
      {
        id: "tile-repair",
        name: "Fayans / seramik tamiri",
        keywords: [
          "fayans tamiri",

          "seramik tamiri",

          "fayans onarımı",

          "seramik onarımı",

          "fayans düzeltme",

          "seramik düzeltme",

          "fayans bakımı",

          "seramik bakımı",

          "fayans tamir",

          "seramik tamir",

          "fayans onarım",

          "seramik onarım",
        ],
      },
      {
        id: "tile-replacement",
        name: "Fayans / seramik değiştirme",
        keywords: [
          "fayans değiştirme",

          "seramik değiştirme",

          "fayans yenileme",

          "seramik yenileme",

          "fayans değişikliği",

          "seramik değişikliği",

          "eski fayans değiştirme",

          "yeni fayans takma",

          "yeni seramik takma",
        ],
      },
      {
        id: "bathroom-tile",
        name: "Banyo fayans döşeme",
        keywords: [
          "banyo fayans",

          "banyo seramik",

          "banyo fayans döşeme",

          "banyo seramik döşeme",

          "banyo fayans montajı",

          "banyo seramik montajı",

          "banyo fayans işi",

          "banyo seramik işi",

          "banyo fayans lazım",

          "banyo seramik lazım",
        ],
      },
      {
        id: "kitchen-tile",
        name: "Mutfak fayans döşeme",
        keywords: [
          "mutfak fayans",

          "mutfak seramik",

          "mutfak fayans döşeme",

          "mutfak seramik döşeme",

          "mutfak fayans montajı",

          "mutfak seramik montajı",

          "mutfak fayans işi",

          "mutfak seramik işi",

          "mutfak fayans lazım",

          "mutfak seramik lazım",
        ],
      },
      {
        id: "tile-removal",
        name: "Eski fayans sökme",
        keywords: [
          "eski fayans sökme",

          "eski seramik sökme",

          "fayans sökme",

          "seramik sökme",

          "eski fayans kazıma",

          "eski seramik kazıma",

          "fayans kazıma",

          "seramik kazıma",

          "eski fayans sökme işi",

          "fayans sökme işi",
        ],
      },
      {
        id: "other-tile-ceramic",
        name: "Diğer (fayans / seramik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fayans",

          "seramik",

          "fayans usta",

          "seramik usta",

          "fayans döşeme",

          "seramik döşeme",

          "fayans işi",

          "seramik işi",

          "fayans tamiri",

          "seramik tamiri",

          "fayans montajı",

          "seramik montajı",

          "fayans servisi",

          "fayans hizmeti",
        ],
      },
    ],
  },

  {
    id: "flooring",
    name: "Parke / Laminat / Zemin",
    keywords: [
      "parke",

      "laminat",

      "zemin",

      "parke döşeme",

      "laminat döşeme",

      "zemin kaplama",

      "parke usta",

      "laminat usta",

      "parke işi",

      "laminat işi",

      "parke tamiri",

      "laminat tamiri",

      "parke montajı",

      "laminat montajı",

      "parke servisi",
    ],
    subServices: [
      {
        id: "flooring-installation",
        name: "Parke / laminat döşeme",
        keywords: [
          "parke döşeme",

          "laminat döşeme",

          "parke montajı",

          "laminat montajı",

          "parke döşeme işi",

          "laminat döşeme işi",

          "parke usta",

          "laminat usta",

          "parke döşeme lazım",

          "laminat döşeme lazım",
        ],
      },
      {
        id: "flooring-repair",
        name: "Parke / laminat tamiri",
        keywords: [
          "parke tamiri",

          "laminat tamiri",

          "parke onarımı",

          "laminat onarımı",

          "parke düzeltme",

          "laminat düzeltme",

          "parke bakımı",

          "laminat bakımı",

          "parke tamir",

          "laminat tamir",

          "parke onarım",

          "laminat onarım",
        ],
      },
      {
        id: "flooring-replacement",
        name: "Parke / laminat değiştirme",
        keywords: [
          "parke değiştirme",

          "laminat değiştirme",

          "parke yenileme",

          "laminat yenileme",

          "eski parke değiştirme",

          "eski laminat değiştirme",

          "yeni parke takma",

          "yeni laminat takma",
        ],
      },
      {
        id: "flooring-removal",
        name: "Eski parke / laminat sökme",
        keywords: [
          "eski parke sökme",

          "eski laminat sökme",

          "parke sökme",

          "laminat sökme",

          "eski parke kazıma",

          "eski laminat kazıma",

          "parke kazıma",

          "laminat kazıma",
        ],
      },
      {
        id: "flooring-sanding",
        name: "Parke zımparalama / cilalama",
        keywords: [
          "parke zımparalama",

          "parke cilalama",

          "parke zımpara",

          "parke cila",

          "parke zımparalama işi",

          "parke cilalama işi",

          "parke zımpara işi",

          "parke cila işi",

          "parke zımparalama lazım",

          "parke cilalama lazım",
        ],
      },
      {
        id: "other-flooring",
        name: "Diğer (parke / laminat / zemin ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "parke",

          "laminat",

          "zemin",

          "parke döşeme",

          "laminat döşeme",

          "zemin kaplama",

          "parke usta",

          "laminat usta",

          "parke işi",

          "laminat işi",

          "parke tamiri",

          "laminat tamiri",

          "parke montajı",

          "laminat montajı",

          "parke servisi",

          "parke hizmeti",
        ],
      },
    ],
  },

  {
    id: "carpentry",
    name: "Marangoz / Mobilya",
    keywords: [
      "marangoz",

      "mobilya",

      "marangoz usta",

      "mobilya usta",

      "ahşap işleri",

      "mobilya yapımı",

      "mobilya tamiri",

      "dolap yapımı",

      "masa yapımı",

      "marangoz işi",

      "mobilya işi",

      "marangoz servisi",

      "mobilya servisi",
    ],
    subServices: [
      {
        id: "furniture-making",
        name: "Mobilya yapımı",
        keywords: [
          "mobilya yapımı",

          "mobilya üretimi",

          "mobilya imalatı",

          "mobilya yapma",

          "dolap yapımı",

          "masa yapımı",

          "koltuk yapımı",

          "yatak yapımı",

          "mobilya yapımı işi",

          "mobilya usta",

          "mobilya yapımı lazım",
        ],
      },
      {
        id: "furniture-repair",
        name: "Mobilya tamiri",
        keywords: [
          "mobilya tamiri",

          "mobilya onarımı",

          "mobilya düzeltme",

          "mobilya bakımı",

          "dolap tamiri",

          "masa tamiri",

          "koltuk tamiri",

          "yatak tamiri",

          "mobilya tamir",

          "mobilya onarım",

          "mobilya tamiri işi",
        ],
      },
      {
        id: "cabinet-making",
        name: "Dolap yapımı / montajı",
        keywords: [
          "dolap yapımı",

          "dolap montajı",

          "dolap kurulumu",

          "dolap takma",

          "mutfak dolabı",

          "banyo dolabı",

          "gardırop yapımı",

          "kitaplık yapımı",

          "dolap yapımı işi",

          "dolap montajı işi",

          "dolap usta",

          "dolap yapımı lazım",
        ],
      },
      {
        id: "custom-furniture",
        name: "Özel mobilya tasarımı",
        keywords: [
          "özel mobilya",

          "özel tasarım mobilya",

          "mobilya tasarımı",

          "mobilya projesi",

          "özel dolap",

          "özel masa",

          "özel koltuk",

          "mobilya tasarımı işi",

          "özel mobilya işi",

          "mobilya tasarımcısı",

          "özel mobilya lazım",
        ],
      },
      {
        id: "furniture-assembly",
        name: "Mobilya montajı / kurulumu",
        keywords: [
          "mobilya montajı",

          "mobilya kurulumu",

          "mobilya takma",

          "mobilya birleştirme",

          "dolap montajı",

          "masa montajı",

          "koltuk montajı",

          "yatak montajı",

          "mobilya montajı işi",

          "mobilya kurulumu işi",

          "mobilya montajı lazım",
        ],
      },
      {
        id: "furniture-refinishing",
        name: "Mobilya yenileme / restorasyon",
        keywords: [
          "mobilya yenileme",

          "mobilya restorasyon",

          "mobilya bakımı",

          "mobilya cilalama",

          "eski mobilya yenileme",

          "antika mobilya restorasyon",

          "mobilya boyama",

          "mobilya yenileme işi",

          "mobilya restorasyon işi",

          "mobilya yenileme lazım",
        ],
      },
      {
        id: "other-carpentry",
        name: "Diğer (marangoz / mobilya ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "marangoz",

          "mobilya",

          "marangoz usta",

          "mobilya usta",

          "ahşap işleri",

          "mobilya yapımı",

          "mobilya tamiri",

          "dolap yapımı",

          "masa yapımı",

          "marangoz işi",

          "mobilya işi",

          "marangoz servisi",

          "mobilya servisi",

          "mobilya hizmeti",
        ],
      },
    ],
  },

  {
    id: "door-window",
    name: "Kapı / Pencere / Doğrama",
    keywords: [
      "kapı",

      "pencere",

      "doğrama",

      "kapı montajı",

      "pencere montajı",

      "doğrama montajı",

      "kapı usta",

      "pencere usta",

      "doğrama usta",

      "kapı tamiri",

      "pencere tamiri",

      "kapı değiştirme",

      "pencere değiştirme",

      "kapı servisi",

      "pencere servisi",
    ],
    subServices: [
      {
        id: "door-installation",
        name: "Kapı montajı / kurulumu",
        keywords: [
          "kapı montajı",

          "kapı kurulumu",

          "kapı takma",

          "kapı bağlantısı",

          "yeni kapı",

          "kapı değiştirme",

          "kapı montajı işi",

          "kapı kurulumu işi",

          "kapı usta",

          "kapı montajı lazım",
        ],
      },
      {
        id: "window-installation",
        name: "Pencere montajı / kurulumu",
        keywords: [
          "pencere montajı",

          "pencere kurulumu",

          "pencere takma",

          "pencere bağlantısı",

          "yeni pencere",

          "pencere değiştirme",

          "pencere montajı işi",

          "pencere kurulumu işi",

          "pencere usta",

          "pencere montajı lazım",
        ],
      },
      {
        id: "door-window-repair",
        name: "Kapı / pencere tamiri",
        keywords: [
          "kapı tamiri",

          "pencere tamiri",

          "kapı onarımı",

          "pencere onarımı",

          "kapı düzeltme",

          "pencere düzeltme",

          "kapı bakımı",

          "pencere bakımı",

          "kapı tamir",

          "pencere tamir",

          "kapı onarım",

          "pencere onarım",
        ],
      },
      {
        id: "door-window-replacement",
        name: "Kapı / pencere değiştirme",
        keywords: [
          "kapı değiştirme",

          "pencere değiştirme",

          "kapı yenileme",

          "pencere yenileme",

          "eski kapı değiştirme",

          "eski pencere değiştirme",

          "yeni kapı takma",

          "yeni pencere takma",
        ],
      },
      {
        id: "pvc-window",
        name: "PVC pencere montajı",
        keywords: [
          "pvc pencere",

          "pvc pencere montajı",

          "pvc pencere kurulumu",

          "pvc pencere takma",

          "pvc pencere değiştirme",

          "pvc pencere işi",

          "pvc pencere usta",

          "pvc pencere montajı lazım",
        ],
      },
      {
        id: "other-door-window",
        name: "Diğer (kapı / pencere / doğrama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kapı",

          "pencere",

          "doğrama",

          "kapı montajı",

          "pencere montajı",

          "doğrama montajı",

          "kapı usta",

          "pencere usta",

          "doğrama usta",

          "kapı tamiri",

          "pencere tamiri",

          "kapı değiştirme",

          "pencere değiştirme",

          "kapı servisi",

          "pencere servisi",

          "kapı hizmeti",
        ],
      },
    ],
  },

  {
    id: "cleaning",
    name: "Ev Temizliği",
    keywords: [
      "ev temizliği",

      "temizlik",

      "temizlikçi",

      "temizlik hizmeti",

      "ev temizlik",

      "ev temizliği işi",

      "temizlik işi",

      "temizlikçi lazım",

      "ev temizliği lazım",

      "günlük temizlik",

      "haftalık temizlik",

      "derin temizlik",

      "temizlik servisi",
    ],
    subServices: [
      {
        id: "regular-cleaning",
        name: "Düzenli ev temizliği",
        keywords: [
          "düzenli temizlik",

          "haftalık temizlik",

          "günlük temizlik",

          "düzenli ev temizliği",

          "haftalık ev temizliği",

          "günlük ev temizliği",

          "temizlikçi düzenli",

          "temizlikçi haftalık",

          "düzenli temizlik lazım",
        ],
      },
      {
        id: "deep-cleaning",
        name: "Derin temizlik",
        keywords: [
          "derin temizlik",

          "komple temizlik",

          "detaylı temizlik",

          "derin ev temizliği",

          "komple ev temizliği",

          "detaylı ev temizliği",

          "temizlikçi derin",

          "temizlikçi komple",

          "derin temizlik lazım",
        ],
      },
      {
        id: "move-in-cleaning",
        name: "Taşınma temizliği",
        keywords: [
          "taşınma temizliği",

          "taşınma sonrası temizlik",

          "yeni ev temizliği",

          "taşınma temizliği işi",

          "taşınma sonrası temizlik işi",

          "yeni ev temizliği işi",

          "temizlikçi taşınma",

          "taşınma temizliği lazım",
        ],
      },
      {
        id: "post-construction-cleaning",
        name: "İnşaat sonrası temizlik",
        keywords: [
          "inşaat sonrası temizlik",

          "tadilat sonrası temizlik",

          "şantiye temizliği",

          "inşaat sonrası temizlik işi",

          "tadilat sonrası temizlik işi",

          "şantiye temizliği işi",

          "temizlikçi inşaat",

          "inşaat sonrası temizlik lazım",
        ],
      },
      {
        id: "window-cleaning",
        name: "Pencere temizliği",
        keywords: [
          "pencere temizliği",

          "cam temizliği",

          "pencere yıkama",

          "cam yıkama",

          "pencere temizliği işi",

          "cam temizliği işi",

          "pencere yıkama işi",

          "temizlikçi pencere",

          "pencere temizliği lazım",
        ],
      },
      {
        id: "other-cleaning",
        name: "Diğer (ev temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ev temizliği",

          "temizlik",

          "temizlikçi",

          "temizlik hizmeti",

          "ev temizlik",

          "ev temizliği işi",

          "temizlik işi",

          "temizlikçi lazım",

          "ev temizliği lazım",

          "günlük temizlik",

          "haftalık temizlik",

          "derin temizlik",

          "temizlik servisi",
        ],
      },
    ],
  },

  {
    id: "moving",
    name: "Nakliye / Ev Taşıma",
    keywords: [
      "nakliye",

      "ev taşıma",

      "taşınma",

      "nakliyat",

      "ev nakliye",

      "taşınma hizmeti",

      "nakliye işi",

      "ev taşıma işi",

      "taşınma işi",

      "nakliyat işi",

      "nakliye lazım",

      "ev taşıma lazım",

      "taşınma lazım",

      "nakliyat lazım",

      "nakliye servisi",
    ],
    subServices: [
      {
        id: "local-moving",
        name: "Şehir içi taşınma",
        keywords: [
          "şehir içi taşınma",

          "şehir içi nakliye",

          "şehir içi ev taşıma",

          "şehir içi taşınma işi",

          "şehir içi nakliye işi",

          "şehir içi ev taşıma işi",

          "nakliye şehir içi",

          "şehir içi taşınma lazım",
        ],
      },
      {
        id: "intercity-moving",
        name: "Şehirler arası taşınma",
        keywords: [
          "şehirler arası taşınma",

          "şehirler arası nakliye",

          "şehirler arası ev taşıma",

          "şehirler arası taşınma işi",

          "şehirler arası nakliye işi",

          "şehirler arası ev taşıma işi",

          "nakliye şehirler arası",

          "şehirler arası taşınma lazım",
        ],
      },
      {
        id: "packing-service",
        name: "Paketleme hizmeti",
        keywords: [
          "paketleme",

          "eşya paketleme",

          "taşınma paketleme",

          "paketleme hizmeti",

          "paketleme işi",

          "eşya paketleme işi",

          "taşınma paketleme işi",

          "nakliye paketleme",

          "paketleme lazım",
        ],
      },
      {
        id: "partial-moving",
        name: "Parça eşya taşıma",
        keywords: [
          "parça eşya",

          "parça eşya taşıma",

          "parça eşya nakliye",

          "küçük eşya taşıma",

          "parça eşya işi",

          "parça eşya taşıma işi",

          "parça eşya nakliye işi",

          "nakliye parça eşya",

          "parça eşya taşıma lazım",
        ],
      },
      {
        id: "office-moving",
        name: "Ofis taşıma",
        keywords: [
          "ofis taşıma",

          "ofis nakliye",

          "iş yeri taşıma",

          "ofis taşınma",

          "ofis taşıma işi",

          "ofis nakliye işi",

          "iş yeri taşıma işi",

          "nakliye ofis",

          "ofis taşıma lazım",
        ],
      },
      {
        id: "other-moving",
        name: "Diğer (nakliye / ev taşıma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "nakliye",

          "ev taşıma",

          "taşınma",

          "nakliyat",

          "ev nakliye",

          "taşınma hizmeti",

          "nakliye işi",

          "ev taşıma işi",

          "taşınma işi",

          "nakliyat işi",

          "nakliye lazım",

          "ev taşıma lazım",

          "taşınma lazım",

          "nakliyat lazım",

          "nakliye servisi",

          "nakliye hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-repair",
    name: "Araba Mekanik / Usta",
    keywords: [
      "araba tamiri",

      "oto tamiri",

      "araba usta",

      "oto usta",

      "mekanik",

      "araba servisi",

      "oto servisi",

      "araba tamiri lazım",

      "oto tamiri lazım",

      "araba arızası",

      "oto arızası",

      "araba çalışmıyor",

      "oto çalışmıyor",
    ],
    subServices: [
      {
        id: "car-mechanical-repair",
        name: "Mekanik tamir",
        keywords: [
          "mekanik tamir",

          "motor tamiri",

          "araba motor tamiri",

          "oto motor tamiri",

          "mekanik arıza",

          "motor arızası",

          "mekanik usta",

          "motor usta",

          "mekanik tamir lazım",

          "motor tamiri lazım",
        ],
      },
      {
        id: "car-electrical-repair",
        name: "Oto elektrik tamiri",
        keywords: [
          "oto elektrik",

          "araba elektrik",

          "oto elektrik tamiri",

          "araba elektrik tamiri",

          "oto elektrik arızası",

          "araba elektrik arızası",

          "oto elektrik usta",

          "araba elektrik usta",

          "oto elektrik tamiri lazım",
        ],
      },
      {
        id: "car-bodywork",
        name: "Oto kaporta / boya",
        keywords: [
          "oto kaporta",

          "araba kaporta",

          "oto boya",

          "araba boya",

          "kaporta tamiri",

          "kaporta düzeltme",

          "oto boya işi",

          "araba boya işi",

          "kaporta usta",

          "oto boya usta",

          "kaporta tamiri lazım",
        ],
      },
      {
        id: "car-tire-service",
        name: "Lastik / jant işleri",
        keywords: [
          "lastik",

          "jant",

          "lastik değiştirme",

          "jant değiştirme",

          "lastik tamiri",

          "lastik montajı",

          "jant montajı",

          "lastik usta",

          "jant usta",

          "lastik değiştirme lazım",
        ],
      },
      {
        id: "car-maintenance",
        name: "Araba bakımı / servis",
        keywords: [
          "araba bakımı",

          "oto bakımı",

          "araba servis",

          "oto servis",

          "periyodik bakım",

          "araba bakımı işi",

          "oto bakımı işi",

          "araba bakımı lazım",

          "oto bakımı lazım",
        ],
      },
      {
        id: "other-car-repair",
        name: "Diğer (araba tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araba tamiri",

          "oto tamiri",

          "araba usta",

          "oto usta",

          "mekanik",

          "araba servisi",

          "oto servisi",

          "araba tamiri lazım",

          "oto tamiri lazım",

          "araba arızası",

          "oto arızası",

          "araba çalışmıyor",

          "oto çalışmıyor",

          "araba işi",
        ],
      },
    ],
  },

  {
    id: "computer-repair",
    name: "Bilgisayar Tamiri",
    keywords: [
      "bilgisayar tamiri",

      "pc tamiri",

      "laptop tamiri",

      "bilgisayar usta",

      "pc usta",

      "laptop usta",

      "bilgisayar servisi",

      "pc servisi",

      "bilgisayar tamiri lazım",

      "pc tamiri lazım",

      "laptop tamiri lazım",
    ],
    subServices: [
      {
        id: "computer-hardware-repair",
        name: "Donanım tamiri",
        keywords: [
          "donanım tamiri",

          "bilgisayar donanım",

          "pc donanım",

          "laptop donanım",

          "donanım arızası",

          "donanım usta",

          "donanım tamiri lazım",
        ],
      },
      {
        id: "computer-software-repair",
        name: "Yazılım / format",
        keywords: [
          "format",

          "format atma",

          "windows kurulumu",

          "yazılım kurulumu",

          "format işi",

          "windows kurulumu işi",

          "format lazım",
        ],
      },
      {
        id: "laptop-screen-repair",
        name: "Laptop ekran tamiri",
        keywords: [
          "laptop ekran",

          "laptop ekran tamiri",

          "laptop ekran değiştirme",

          "laptop ekran kırık",

          "laptop ekran usta",

          "laptop ekran tamiri lazım",
        ],
      },
      {
        id: "computer-virus-removal",
        name: "Virüs temizleme",
        keywords: [
          "virüs temizleme",

          "virüs silme",

          "bilgisayar virüs",

          "pc virüs",

          "virüs temizleme işi",

          "virüs silme işi",

          "virüs temizleme lazım",
        ],
      },
      {
        id: "other-computer-repair",
        name: "Diğer (bilgisayar tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bilgisayar tamiri",

          "pc tamiri",

          "laptop tamiri",

          "bilgisayar usta",

          "pc usta",

          "laptop usta",

          "bilgisayar servisi",

          "pc servisi",

          "bilgisayar tamiri lazım",

          "pc tamiri lazım",

          "laptop tamiri lazım",

          "bilgisayar işi",
        ],
      },
    ],
  },

  {
    id: "phone-repair",
    name: "Telefon / Tablet Tamiri",
    keywords: [
      "telefon tamiri",

      "tablet tamiri",

      "telefon usta",

      "tablet usta",

      "telefon servisi",

      "tablet servisi",

      "telefon tamiri lazım",

      "tablet tamiri lazım",

      "telefon arızası",

      "tablet arızası",

      "telefon çalışmıyor",

      "tablet çalışmıyor",
    ],
    subServices: [
      {
        id: "phone-screen-repair",
        name: "Ekran tamiri / değiştirme",
        keywords: [
          "telefon ekran",

          "tablet ekran",

          "ekran tamiri",

          "ekran değiştirme",

          "ekran kırık",

          "ekran usta",

          "ekran tamiri lazım",
        ],
      },
      {
        id: "phone-battery-replacement",
        name: "Batarya değiştirme",
        keywords: [
          "batarya değiştirme",

          "pil değiştirme",

          "telefon batarya",

          "tablet batarya",

          "batarya usta",

          "batarya değiştirme lazım",
        ],
      },
      {
        id: "phone-software-repair",
        name: "Yazılım / format",
        keywords: [
          "telefon format",

          "tablet format",

          "telefon yazılım",

          "tablet yazılım",

          "format işi",

          "yazılım işi",

          "format lazım",
        ],
      },
      {
        id: "phone-water-damage",
        name: "Su hasarı tamiri",
        keywords: [
          "su hasarı",

          "su kaçtı",

          "su tamiri",

          "su hasarı tamiri",

          "su kaçtı tamiri",

          "su hasarı usta",

          "su hasarı tamiri lazım",
        ],
      },
      {
        id: "other-phone-repair",
        name: "Diğer (telefon / tablet tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "telefon tamiri",

          "tablet tamiri",

          "telefon usta",

          "tablet usta",

          "telefon servisi",

          "tablet servisi",

          "telefon tamiri lazım",

          "tablet tamiri lazım",

          "telefon arızası",

          "tablet arızası",

          "telefon çalışmıyor",

          "tablet çalışmıyor",

          "telefon işi",
        ],
      },
    ],
  },

  {
    id: "security-camera",
    name: "Güvenlik Kamerası",
    keywords: [
      "güvenlik kamerası",

      "kamera kurulumu",

      "kamera montajı",

      "kamera takma",

      "güvenlik sistemi",

      "kamera sistemi",

      "kamera usta",

      "güvenlik kamerası lazım",

      "kamera kurulumu lazım",

      "kamera montajı lazım",

      "güvenlik kamerası işi",
    ],
    subServices: [
      {
        id: "camera-installation",
        name: "Kamera kurulumu / montajı",
        keywords: [
          "kamera kurulumu",

          "kamera montajı",

          "kamera takma",

          "güvenlik kamerası kurulumu",

          "kamera bağlantısı",

          "kamera usta",

          "kamera kurulumu lazım",
        ],
      },
      {
        id: "camera-repair",
        name: "Kamera tamiri",
        keywords: [
          "kamera tamiri",

          "kamera onarımı",

          "kamera arızası",

          "kamera çalışmıyor",

          "kamera tamir",

          "kamera onarım",

          "kamera tamiri lazım",
        ],
      },
      {
        id: "cctv-system",
        name: "CCTV sistemi kurulumu",
        keywords: [
          "cctv",

          "cctv sistemi",

          "cctv kurulumu",

          "cctv montajı",

          "cctv işi",

          "cctv usta",

          "cctv kurulumu lazım",
        ],
      },
      {
        id: "other-security-camera",
        name: "Diğer (güvenlik kamerası ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "güvenlik kamerası",

          "kamera kurulumu",

          "kamera montajı",

          "kamera takma",

          "güvenlik sistemi",

          "kamera sistemi",

          "kamera usta",

          "güvenlik kamerası lazım",

          "kamera kurulumu lazım",

          "kamera montajı lazım",

          "güvenlik kamerası işi",

          "kamera hizmeti",
        ],
      },
    ],
  },

  {
    id: "alarm-system",
    name: "Alarm Sistemleri",
    keywords: [
      "alarm sistemi",

      "alarm kurulumu",

      "alarm montajı",

      "alarm takma",

      "güvenlik alarmı",

      "hırsız alarmı",

      "yangın alarmı",

      "alarm usta",

      "alarm kurulumu lazım",

      "alarm montajı lazım",

      "alarm sistemi işi",
    ],
    subServices: [
      {
        id: "alarm-installation",
        name: "Alarm kurulumu / montajı",
        keywords: [
          "alarm kurulumu",

          "alarm montajı",

          "alarm takma",

          "güvenlik alarmı kurulumu",

          "alarm bağlantısı",

          "alarm usta",

          "alarm kurulumu lazım",
        ],
      },
      {
        id: "alarm-repair",
        name: "Alarm tamiri",
        keywords: [
          "alarm tamiri",

          "alarm onarımı",

          "alarm arızası",

          "alarm çalışmıyor",

          "alarm tamir",

          "alarm onarım",

          "alarm tamiri lazım",
        ],
      },
      {
        id: "other-alarm-system",
        name: "Diğer (alarm sistemleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "alarm sistemi",

          "alarm kurulumu",

          "alarm montajı",

          "alarm takma",

          "güvenlik alarmı",

          "hırsız alarmı",

          "yangın alarmı",

          "alarm usta",

          "alarm kurulumu lazım",

          "alarm montajı lazım",

          "alarm sistemi işi",

          "alarm hizmeti",
        ],
      },
    ],
  },

  {
    id: "internet-network",
    name: "İnternet / Network Kurulumu",
    keywords: [
      "internet kurulumu",

      "network kurulumu",

      "internet bağlantısı",

      "network bağlantısı",

      "internet usta",

      "network usta",

      "internet kurulumu lazım",

      "network kurulumu lazım",

      "internet işi",

      "network işi",

      "internet servisi",
    ],
    subServices: [
      {
        id: "internet-installation",
        name: "İnternet kurulumu",
        keywords: [
          "internet kurulumu",

          "internet bağlantısı",

          "internet takma",

          "internet montajı",

          "internet usta",

          "internet kurulumu lazım",

          "internet bağlantısı lazım",
        ],
      },
      {
        id: "network-setup",
        name: "Network / ağ kurulumu",
        keywords: [
          "network kurulumu",

          "ağ kurulumu",

          "network bağlantısı",

          "ağ bağlantısı",

          "network usta",

          "ağ usta",

          "network kurulumu lazım",
        ],
      },
      {
        id: "wifi-setup",
        name: "WiFi kurulumu",
        keywords: [
          "wifi kurulumu",

          "wifi bağlantısı",

          "wifi takma",

          "wifi montajı",

          "wifi usta",

          "wifi kurulumu lazım",

          "wifi bağlantısı lazım",
        ],
      },
      {
        id: "other-internet-network",
        name: "Diğer (internet / network ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "internet kurulumu",

          "network kurulumu",

          "internet bağlantısı",

          "network bağlantısı",

          "internet usta",

          "network usta",

          "internet kurulumu lazım",

          "network kurulumu lazım",

          "internet işi",

          "network işi",

          "internet servisi",

          "internet hizmeti",
        ],
      },
    ],
  },

  {
    id: "interior-design",
    name: "İç Mimarlık / Dekorasyon",
    keywords: [
      "iç mimar",

      "dekorasyon",

      "iç mimarlık",

      "dekoratör",

      "iç mimar lazım",

      "dekorasyon lazım",

      "iç mimarlık işi",

      "dekorasyon işi",

      "iç mimar hizmeti",
    ],
    subServices: [
      {
        id: "interior-design-consultation",
        name: "İç mimar danışmanlığı",
        keywords: [
          "iç mimar danışmanlık",

          "iç mimar proje",

          "iç mimar tasarım",

          "iç mimar danışmanlık işi",

          "iç mimar proje işi",

          "iç mimar danışmanlık lazım",
        ],
      },
      {
        id: "interior-decoration",
        name: "Dekorasyon hizmeti",
        keywords: [
          "dekorasyon",

          "dekorasyon hizmeti",

          "dekorasyon işi",

          "dekoratör",

          "dekorasyon lazım",

          "dekorasyon hizmeti lazım",
        ],
      },
      {
        id: "other-interior-design",
        name: "Diğer (iç mimarlık / dekorasyon ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "iç mimar",

          "dekorasyon",

          "iç mimarlık",

          "dekoratör",

          "iç mimar lazım",

          "dekorasyon lazım",

          "iç mimarlık işi",

          "dekorasyon işi",

          "iç mimar hizmeti",

          "dekorasyon hizmeti",
        ],
      },
    ],
  },

  {
    id: "full-renovation",
    name: "Komple Tadilat",
    keywords: [
      "komple tadilat",

      "tadilat",

      "renovasyon",

      "tadilat işi",

      "renovasyon işi",

      "komple tadilat işi",

      "tadilat lazım",

      "renovasyon lazım",

      "tadilat usta",
    ],
    subServices: [
      {
        id: "full-apartment-renovation",
        name: "Komple daire tadilatı",
        keywords: [
          "komple daire tadilat",

          "daire tadilat",

          "komple daire renovasyon",

          "komple daire tadilat işi",

          "daire tadilat işi",

          "komple daire tadilat lazım",
        ],
      },
      {
        id: "bathroom-renovation",
        name: "Banyo tadilatı",
        keywords: [
          "banyo tadilat",

          "banyo renovasyon",

          "banyo tadilat işi",

          "banyo renovasyon işi",

          "banyo tadilat lazım",
        ],
      },
      {
        id: "kitchen-renovation",
        name: "Mutfak tadilatı",
        keywords: [
          "mutfak tadilat",

          "mutfak renovasyon",

          "mutfak tadilat işi",

          "mutfak renovasyon işi",

          "mutfak tadilat lazım",
        ],
      },
      {
        id: "other-full-renovation",
        name: "Diğer (komple tadilat ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "komple tadilat",

          "tadilat",

          "renovasyon",

          "tadilat işi",

          "renovasyon işi",

          "komple tadilat işi",

          "tadilat lazım",

          "renovasyon lazım",

          "tadilat usta",

          "tadilat hizmeti",
        ],
      },
    ],
  },

  {
    id: "ironwork-welding",
    name: "Demir Doğrama / Ferforje / Kaynak",
    keywords: [
      "demir doğrama",

      "ferforje",

      "kaynak",

      "demirci",

      "kaynakçı",

      "ferforje usta",

      "demir doğrama işi",

      "ferforje işi",

      "kaynak işi",

      "demirci lazım",

      "kaynakçı lazım",
    ],
    subServices: [
      {
        id: "ironwork-installation",
        name: "Demir doğrama montajı",
        keywords: [
          "demir doğrama montajı",

          "demir doğrama kurulumu",

          "demir doğrama takma",

          "demir doğrama işi",

          "demirci montajı",

          "demir doğrama lazım",
        ],
      },
      {
        id: "ferforje-installation",
        name: "Ferforje montajı",
        keywords: [
          "ferforje montajı",

          "ferforje kurulumu",

          "ferforje takma",

          "ferforje işi",

          "ferforje usta",

          "ferforje montajı lazım",
        ],
      },
      {
        id: "welding-service",
        name: "Kaynak işleri",
        keywords: [
          "kaynak",

          "kaynak işi",

          "kaynakçı",

          "kaynak yapma",

          "kaynak tamiri",

          "kaynak usta",

          "kaynak lazım",

          "kaynak işi lazım",
        ],
      },
      {
        id: "ironwork-repair",
        name: "Demir doğrama tamiri",
        keywords: [
          "demir doğrama tamiri",

          "demir doğrama onarımı",

          "demir doğrama düzeltme",

          "demir doğrama tamir",

          "demir doğrama onarım",

          "demir doğrama tamiri lazım",
        ],
      },
      {
        id: "other-ironwork-welding",
        name: "Diğer (demir doğrama / ferforje / kaynak ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "demir doğrama",

          "ferforje",

          "kaynak",

          "demirci",

          "kaynakçı",

          "ferforje usta",

          "demir doğrama işi",

          "ferforje işi",

          "kaynak işi",

          "demirci lazım",

          "kaynakçı lazım",

          "demir doğrama hizmeti",
        ],
      },
    ],
  },

  {
    id: "roof-insulation",
    name: "Çatı / İzolasyon",
    keywords: [
      "çatı",

      "izolasyon",

      "çatı tamiri",

      "izolasyon işi",

      "çatı usta",

      "izolasyon usta",

      "çatı aktarma",

      "çatı yapımı",

      "izolasyon yapımı",

      "çatı lazım",

      "izolasyon lazım",
    ],
    subServices: [
      {
        id: "roof-repair",
        name: "Çatı tamiri",
        keywords: [
          "çatı tamiri",

          "çatı onarımı",

          "çatı düzeltme",

          "çatı bakımı",

          "çatı tamir",

          "çatı onarım",

          "çatı tamiri lazım",
        ],
      },
      {
        id: "roof-replacement",
        name: "Çatı aktarma / yenileme",
        keywords: [
          "çatı aktarma",

          "çatı yenileme",

          "çatı değiştirme",

          "çatı aktarma işi",

          "çatı yenileme işi",

          "çatı aktarma lazım",
        ],
      },
      {
        id: "roof-installation",
        name: "Çatı yapımı / montajı",
        keywords: [
          "çatı yapımı",

          "çatı montajı",

          "yeni çatı",

          "çatı yapımı işi",

          "çatı montajı işi",

          "çatı yapımı lazım",
        ],
      },
      {
        id: "insulation-installation",
        name: "İzolasyon yapımı",
        keywords: [
          "izolasyon yapımı",

          "izolasyon montajı",

          "izolasyon işi",

          "izolasyon usta",

          "izolasyon yapımı lazım",

          "izolasyon montajı lazım",
        ],
      },
      {
        id: "other-roof-insulation",
        name: "Diğer (çatı / izolasyon ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çatı",

          "izolasyon",

          "çatı tamiri",

          "izolasyon işi",

          "çatı usta",

          "izolasyon usta",

          "çatı aktarma",

          "çatı yapımı",

          "izolasyon yapımı",

          "çatı lazım",

          "izolasyon lazım",

          "çatı hizmeti",
        ],
      },
    ],
  },

  {
    id: "insulation",
    name: "Mantolama / Isı Yalıtım",
    keywords: [
      "mantolama",

      "ısı yalıtım",

      "mantolama işi",

      "ısı yalıtım işi",

      "mantolama usta",

      "ısı yalıtım usta",

      "mantolama lazım",

      "ısı yalıtım lazım",

      "dış cephe mantolama",
    ],
    subServices: [
      {
        id: "insulation-installation",
        name: "Mantolama yapımı",
        keywords: [
          "mantolama yapımı",

          "mantolama montajı",

          "dış cephe mantolama",

          "mantolama işi",

          "mantolama usta",

          "mantolama yapımı lazım",
        ],
      },
      {
        id: "heat-insulation",
        name: "Isı yalıtımı",
        keywords: [
          "ısı yalıtımı",

          "ısı yalıtım işi",

          "ısı yalıtım usta",

          "ısı yalıtımı lazım",

          "ısı yalıtım montajı",

          "ısı yalıtım yapımı",
        ],
      },
      {
        id: "insulation-repair",
        name: "Mantolama / izolasyon tamiri",
        keywords: [
          "mantolama tamiri",

          "izolasyon tamiri",

          "mantolama onarımı",

          "izolasyon onarımı",

          "mantolama tamir",

          "izolasyon tamir",

          "mantolama tamiri lazım",
        ],
      },
      {
        id: "other-insulation",
        name: "Diğer (mantolama / ısı yalıtım ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "mantolama",

          "ısı yalıtım",

          "mantolama işi",

          "ısı yalıtım işi",

          "mantolama usta",

          "ısı yalıtım usta",

          "mantolama lazım",

          "ısı yalıtım lazım",

          "dış cephe mantolama",

          "mantolama hizmeti",
        ],
      },
    ],
  },

  {
    id: "glass-mirror",
    name: "Cam / Ayna",
    keywords: [
      "cam",

      "ayna",

      "cam tamiri",

      "ayna tamiri",

      "cam usta",

      "ayna usta",

      "cam değiştirme",

      "ayna değiştirme",

      "cam montajı",

      "ayna montajı",

      "cam lazım",

      "ayna lazım",

      "cam işi",

      "ayna işi",
    ],
    subServices: [
      {
        id: "glass-replacement",
        name: "Cam değiştirme",
        keywords: [
          "cam değiştirme",

          "cam takma",

          "cam montajı",

          "cam değiştirme işi",

          "cam usta",

          "cam değiştirme lazım",
        ],
      },
      {
        id: "mirror-installation",
        name: "Ayna montajı",
        keywords: [
          "ayna montajı",

          "ayna takma",

          "ayna kurulumu",

          "ayna montajı işi",

          "ayna usta",

          "ayna montajı lazım",
        ],
      },
      {
        id: "glass-repair",
        name: "Cam tamiri",
        keywords: [
          "cam tamiri",

          "cam onarımı",

          "cam düzeltme",

          "cam tamir",

          "cam onarım",

          "cam tamiri lazım",
        ],
      },
      {
        id: "other-glass-mirror",
        name: "Diğer (cam / ayna ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "cam",

          "ayna",

          "cam tamiri",

          "ayna tamiri",

          "cam usta",

          "ayna usta",

          "cam değiştirme",

          "ayna değiştirme",

          "cam montajı",

          "ayna montajı",

          "cam lazım",

          "ayna lazım",

          "cam işi",

          "ayna işi",

          "cam hizmeti",
        ],
      },
    ],
  },

  {
    id: "office-cleaning",
    name: "Ofis / İş Yeri Temizliği",
    keywords: [
      "ofis temizliği",

      "iş yeri temizliği",

      "ofis temizlik",

      "iş yeri temizlik",

      "ofis temizliği işi",

      "iş yeri temizliği işi",

      "ofis temizlikçi",

      "iş yeri temizlikçi",

      "ofis temizliği lazım",

      "iş yeri temizliği lazım",
    ],
    subServices: [
      {
        id: "regular-office-cleaning",
        name: "Düzenli ofis temizliği",
        keywords: [
          "düzenli ofis temizliği",

          "haftalık ofis temizliği",

          "günlük ofis temizliği",

          "düzenli iş yeri temizliği",

          "ofis temizlikçi düzenli",

          "düzenli ofis temizliği lazım",
        ],
      },
      {
        id: "deep-office-cleaning",
        name: "Derin ofis temizliği",
        keywords: [
          "derin ofis temizliği",

          "komple ofis temizliği",

          "detaylı ofis temizliği",

          "derin iş yeri temizliği",

          "ofis temizlikçi derin",

          "derin ofis temizliği lazım",
        ],
      },
      {
        id: "other-office-cleaning",
        name: "Diğer (ofis / iş yeri temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ofis temizliği",

          "iş yeri temizliği",

          "ofis temizlik",

          "iş yeri temizlik",

          "ofis temizliği işi",

          "iş yeri temizliği işi",

          "ofis temizlikçi",

          "iş yeri temizlikçi",

          "ofis temizliği lazım",

          "iş yeri temizliği lazım",

          "ofis temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "carpet-cleaning",
    name: "Halı / Koltuk Yıkama",
    keywords: [
      "halı yıkama",

      "koltuk yıkama",

      "halı temizleme",

      "koltuk temizleme",

      "halı yıkama işi",

      "koltuk yıkama işi",

      "halı yıkama lazım",

      "koltuk yıkama lazım",

      "halı yıkama servisi",

      "koltuk yıkama servisi",
    ],
    subServices: [
      {
        id: "carpet-washing",
        name: "Halı yıkama",
        keywords: [
          "halı yıkama",

          "halı temizleme",

          "halı yıkama işi",

          "halı temizleme işi",

          "halı yıkama servisi",

          "halı yıkama lazım",

          "halı yıkama usta",
        ],
      },
      {
        id: "sofa-washing",
        name: "Koltuk yıkama",
        keywords: [
          "koltuk yıkama",

          "koltuk temizleme",

          "koltuk yıkama işi",

          "koltuk temizleme işi",

          "koltuk yıkama servisi",

          "koltuk yıkama lazım",

          "koltuk yıkama usta",
        ],
      },
      {
        id: "upholstery-cleaning",
        name: "Döşeme temizliği",
        keywords: [
          "döşeme temizliği",

          "döşeme yıkama",

          "döşeme temizleme",

          "döşeme temizliği işi",

          "döşeme yıkama işi",

          "döşeme temizliği lazım",
        ],
      },
      {
        id: "other-carpet-cleaning",
        name: "Diğer (halı / koltuk yıkama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "halı yıkama",

          "koltuk yıkama",

          "halı temizleme",

          "koltuk temizleme",

          "halı yıkama işi",

          "koltuk yıkama işi",

          "halı yıkama lazım",

          "koltuk yıkama lazım",

          "halı yıkama servisi",

          "koltuk yıkama servisi",

          "halı yıkama hizmeti",
        ],
      },
    ],
  },

  {
    id: "garden-maintenance",
    name: "Bahçe Bakımı / Peyzaj",
    keywords: [
      "bahçe bakımı",

      "peyzaj",

      "bahçıvan",

      "bahçe işleri",

      "peyzaj işi",

      "bahçe bakımı işi",

      "bahçıvan lazım",

      "peyzaj lazım",

      "bahçe bakımı lazım",
    ],
    subServices: [
      {
        id: "garden-maintenance-regular",
        name: "Düzenli bahçe bakımı",
        keywords: [
          "düzenli bahçe bakımı",

          "haftalık bahçe bakımı",

          "bahçe bakımı düzenli",

          "düzenli bahçe bakımı işi",

          "bahçıvan düzenli",

          "düzenli bahçe bakımı lazım",
        ],
      },
      {
        id: "landscaping",
        name: "Peyzaj tasarımı",
        keywords: [
          "peyzaj tasarımı",

          "peyzaj projesi",

          "peyzaj işi",

          "peyzaj usta",

          "peyzaj tasarımı lazım",

          "peyzaj projesi lazım",
        ],
      },
      {
        id: "lawn-care",
        name: "Çim bakımı",
        keywords: [
          "çim bakımı",

          "çim biçme",

          "çim döşeme",

          "çim bakımı işi",

          "çim biçme işi",

          "çim bakımı lazım",

          "çim biçme lazım",
        ],
      },
      {
        id: "tree-care",
        name: "Ağaç bakımı / kesimi",
        keywords: [
          "ağaç bakımı",

          "ağaç kesimi",

          "ağaç budama",

          "ağaç bakımı işi",

          "ağaç kesimi işi",

          "ağaç bakımı lazım",

          "ağaç kesimi lazım",
        ],
      },
      {
        id: "other-garden-maintenance",
        name: "Diğer (bahçe bakımı / peyzaj ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bahçe bakımı",

          "peyzaj",

          "bahçıvan",

          "bahçe işleri",

          "peyzaj işi",

          "bahçe bakımı işi",

          "bahçıvan lazım",

          "peyzaj lazım",

          "bahçe bakımı lazım",

          "bahçe bakımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "pool-maintenance",
    name: "Havuz Bakımı",
    keywords: [
      "havuz bakımı",

      "havuz temizliği",

      "havuz servisi",

      "havuz işi",

      "havuz bakımı işi",

      "havuz temizliği işi",

      "havuz bakımı lazım",

      "havuz temizliği lazım",
    ],
    subServices: [
      {
        id: "pool-cleaning",
        name: "Havuz temizliği",
        keywords: [
          "havuz temizliği",

          "havuz yıkama",

          "havuz temizleme",

          "havuz temizliği işi",

          "havuz yıkama işi",

          "havuz temizliği lazım",

          "havuz temizliği servisi",
        ],
      },
      {
        id: "pool-maintenance-regular",
        name: "Düzenli havuz bakımı",
        keywords: [
          "düzenli havuz bakımı",

          "haftalık havuz bakımı",

          "havuz bakımı düzenli",

          "düzenli havuz bakımı işi",

          "havuz bakımı düzenli lazım",
        ],
      },
      {
        id: "pool-repair",
        name: "Havuz tamiri",
        keywords: [
          "havuz tamiri",

          "havuz onarımı",

          "havuz düzeltme",

          "havuz tamir",

          "havuz onarım",

          "havuz tamiri lazım",
        ],
      },
      {
        id: "other-pool-maintenance",
        name: "Diğer (havuz bakımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "havuz bakımı",

          "havuz temizliği",

          "havuz servisi",

          "havuz işi",

          "havuz bakımı işi",

          "havuz temizliği işi",

          "havuz bakımı lazım",

          "havuz temizliği lazım",

          "havuz bakımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "hairdresser",
    name: "Kuaför / Güzellik",
    keywords: [
      "kuaför",

      "berber",

      "saç kesimi",

      "saç boyama",

      "güzellik",

      "kuaför lazım",

      "berber lazım",

      "saç kesimi lazım",

      "saç boyama lazım",

      "güzellik lazım",

      "kuaför işi",

      "berber işi",

      "güzellik işi",
    ],
    subServices: [
      {
        id: "haircut",
        name: "Saç kesimi",
        keywords: [
          "saç kesimi",

          "saç kestirme",

          "saç kesimi işi",

          "saç kestirme işi",

          "kuaför saç kesimi",

          "berber saç kesimi",

          "saç kesimi lazım",
        ],
      },
      {
        id: "hair-coloring",
        name: "Saç boyama",
        keywords: [
          "saç boyama",

          "saç boyatma",

          "saç boyama işi",

          "saç boyatma işi",

          "kuaför saç boyama",

          "saç boyama lazım",
        ],
      },
      {
        id: "hair-styling",
        name: "Saç şekillendirme",
        keywords: [
          "saç şekillendirme",

          "saç yapma",

          "saç şekillendirme işi",

          "saç yapma işi",

          "kuaför saç şekillendirme",

          "saç şekillendirme lazım",
        ],
      },
      {
        id: "beauty-services",
        name: "Güzellik hizmetleri",
        keywords: [
          "güzellik",

          "güzellik hizmeti",

          "güzellik işi",

          "güzellik usta",

          "güzellik lazım",

          "güzellik hizmeti lazım",
        ],
      },
      {
        id: "other-hairdresser",
        name: "Diğer (kuaför / güzellik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kuaför",

          "berber",

          "saç kesimi",

          "saç boyama",

          "güzellik",

          "kuaför lazım",

          "berber lazım",

          "saç kesimi lazım",

          "saç boyama lazım",

          "güzellik lazım",

          "kuaför işi",

          "berber işi",

          "güzellik işi",

          "kuaför hizmeti",
        ],
      },
    ],
  },

  {
    id: "catering",
    name: "Aşçı / Yemek Hizmeti",
    keywords: [
      "aşçı",

      "yemek",

      "yemek hizmeti",

      "catering",

      "aşçı lazım",

      "yemek lazım",

      "yemek hizmeti lazım",

      "catering lazım",

      "aşçı işi",
    ],
    subServices: [
      {
        id: "catering-service",
        name: "Catering hizmeti",
        keywords: [
          "catering",

          "catering hizmeti",

          "catering işi",

          "catering usta",

          "catering lazım",

          "catering hizmeti lazım",
        ],
      },
      {
        id: "private-chef",
        name: "Özel aşçı",
        keywords: [
          "özel aşçı",

          "ev aşçısı",

          "özel aşçı işi",

          "ev aşçısı işi",

          "özel aşçı lazım",

          "ev aşçısı lazım",
        ],
      },
      {
        id: "other-catering",
        name: "Diğer (aşçı / yemek hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "aşçı",

          "yemek",

          "yemek hizmeti",

          "catering",

          "aşçı lazım",

          "yemek lazım",

          "yemek hizmeti lazım",

          "catering lazım",

          "aşçı işi",

          "aşçı hizmeti",
        ],
      },
    ],
  },

  {
    id: "photography",
    name: "Fotoğrafçılık",
    keywords: [
      "fotoğrafçı",

      "fotoğraf",

      "fotoğraf çekimi",

      "fotoğrafçı lazım",

      "fotoğraf lazım",

      "fotoğraf çekimi lazım",

      "fotoğrafçı işi",
    ],
    subServices: [
      {
        id: "wedding-photography",
        name: "Düğün fotoğrafçılığı",
        keywords: [
          "düğün fotoğrafçı",

          "düğün fotoğraf",

          "düğün fotoğraf çekimi",

          "düğün fotoğrafçı işi",

          "düğün fotoğrafçı lazım",
        ],
      },
      {
        id: "event-photography",
        name: "Etkinlik fotoğrafçılığı",
        keywords: [
          "etkinlik fotoğrafçı",

          "etkinlik fotoğraf",

          "etkinlik fotoğraf çekimi",

          "etkinlik fotoğrafçı işi",

          "etkinlik fotoğrafçı lazım",
        ],
      },
      {
        id: "portrait-photography",
        name: "Portre fotoğrafçılığı",
        keywords: [
          "portre fotoğraf",

          "portre çekimi",

          "portre fotoğraf işi",

          "portre çekimi işi",

          "portre fotoğraf lazım",
        ],
      },
      {
        id: "other-photography",
        name: "Diğer (fotoğrafçılık ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fotoğrafçı",

          "fotoğraf",

          "fotoğraf çekimi",

          "fotoğrafçı lazım",

          "fotoğraf lazım",

          "fotoğraf çekimi lazım",

          "fotoğrafçı işi",

          "fotoğrafçı hizmeti",
        ],
      },
    ],
  },

  {
    id: "video-production",
    name: "Video Çekimi",
    keywords: [
      "video çekimi",

      "video",

      "video çekme",

      "video çekimi lazım",

      "video lazım",

      "video çekme lazım",

      "video işi",

      "video çekimi işi",
    ],
    subServices: [
      {
        id: "wedding-video",
        name: "Düğün videosu",
        keywords: [
          "düğün videosu",

          "düğün video çekimi",

          "düğün video",

          "düğün videosu işi",

          "düğün video çekimi lazım",
        ],
      },
      {
        id: "event-video",
        name: "Etkinlik videosu",
        keywords: [
          "etkinlik videosu",

          "etkinlik video çekimi",

          "etkinlik video",

          "etkinlik videosu işi",

          "etkinlik video çekimi lazım",
        ],
      },
      {
        id: "other-video-production",
        name: "Diğer (video çekimi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "video çekimi",

          "video",

          "video çekme",

          "video çekimi lazım",

          "video lazım",

          "video çekme lazım",

          "video işi",

          "video çekimi işi",

          "video hizmeti",
        ],
      },
    ],
  },

  {
    id: "dj-service",
    name: "DJ Hizmeti",
    keywords: [
      "dj",

      "dj hizmeti",

      "dj lazım",

      "dj işi",

      "müzik",

      "müzik hizmeti",

      "düğün dj",

      "etkinlik dj",

      "dj servisi",
    ],
    subServices: [
      {
        id: "wedding-dj",
        name: "Düğün DJ",
        keywords: [
          "düğün dj",

          "düğün müzik",

          "düğün dj işi",

          "düğün müzik işi",

          "düğün dj lazım",

          "düğün müzik lazım",
        ],
      },
      {
        id: "event-dj",
        name: "Etkinlik DJ",
        keywords: [
          "etkinlik dj",

          "etkinlik müzik",

          "etkinlik dj işi",

          "etkinlik müzik işi",

          "etkinlik dj lazım",

          "etkinlik müzik lazım",
        ],
      },
      {
        id: "other-dj-service",
        name: "Diğer (DJ hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dj",

          "dj hizmeti",

          "dj lazım",

          "dj işi",

          "müzik",

          "müzik hizmeti",

          "düğün dj",

          "etkinlik dj",

          "dj servisi",
        ],
      },
    ],
  },

  {
    id: "sound-system",
    name: "Müzik / Ses Sistemi",
    keywords: [
      "ses sistemi",

      "müzik sistemi",

      "ses sistemi kurulumu",

      "müzik sistemi kurulumu",

      "ses sistemi lazım",

      "müzik sistemi lazım",

      "ses sistemi işi",

      "müzik sistemi işi",
    ],
    subServices: [
      {
        id: "sound-system-installation",
        name: "Ses sistemi kurulumu",
        keywords: [
          "ses sistemi kurulumu",

          "ses sistemi montajı",

          "ses sistemi takma",

          "ses sistemi kurulumu işi",

          "ses sistemi usta",

          "ses sistemi kurulumu lazım",
        ],
      },
      {
        id: "sound-system-repair",
        name: "Ses sistemi tamiri",
        keywords: [
          "ses sistemi tamiri",

          "ses sistemi onarımı",

          "ses sistemi düzeltme",

          "ses sistemi tamir",

          "ses sistemi onarım",

          "ses sistemi tamiri lazım",
        ],
      },
      {
        id: "other-sound-system",
        name: "Diğer (müzik / ses sistemi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ses sistemi",

          "müzik sistemi",

          "ses sistemi kurulumu",

          "müzik sistemi kurulumu",

          "ses sistemi lazım",

          "müzik sistemi lazım",

          "ses sistemi işi",

          "müzik sistemi işi",

          "ses sistemi hizmeti",
        ],
      },
    ],
  },

  {
    id: "translation",
    name: "Çeviri Hizmeti",
    keywords: [
      "çeviri",

      "çevirmen",

      "çeviri hizmeti",

      "çeviri lazım",

      "çevirmen lazım",

      "çeviri işi",

      "çevirmen işi",

      "çeviri hizmeti lazım",
    ],
    subServices: [
      {
        id: "written-translation",
        name: "Yazılı çeviri",
        keywords: [
          "yazılı çeviri",

          "belge çevirisi",

          "yazılı çeviri işi",

          "belge çevirisi işi",

          "yazılı çeviri lazım",
        ],
      },
      {
        id: "oral-translation",
        name: "Sözlü çeviri",
        keywords: [
          "sözlü çeviri",

          "tercüman",

          "sözlü çeviri işi",

          "tercüman işi",

          "sözlü çeviri lazım",

          "tercüman lazım",
        ],
      },
      {
        id: "other-translation",
        name: "Diğer (çeviri hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çeviri",

          "çevirmen",

          "çeviri hizmeti",

          "çeviri lazım",

          "çevirmen lazım",

          "çeviri işi",

          "çevirmen işi",

          "çeviri hizmeti lazım",
        ],
      },
    ],
  },

  {
    id: "private-tutoring",
    name: "Özel Ders",
    keywords: [
      "özel ders",

      "öğretmen",

      "özel ders öğretmeni",

      "özel ders lazım",

      "öğretmen lazım",

      "özel ders işi",

      "öğretmen işi",
    ],
    subServices: [
      {
        id: "math-tutoring",
        name: "Matematik özel ders",
        keywords: [
          "matematik özel ders",

          "matematik öğretmeni",

          "matematik dersi",

          "matematik özel ders işi",

          "matematik öğretmeni işi",

          "matematik özel ders lazım",
        ],
      },
      {
        id: "language-tutoring",
        name: "Dil özel ders",
        keywords: [
          "dil özel ders",

          "dil öğretmeni",

          "dil dersi",

          "ingilizce özel ders",

          "dil özel ders işi",

          "dil öğretmeni işi",

          "dil özel ders lazım",
        ],
      },
      {
        id: "other-tutoring",
        name: "Diğer (özel ders ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "özel ders",

          "öğretmen",

          "özel ders öğretmeni",

          "özel ders lazım",

          "öğretmen lazım",

          "özel ders işi",

          "öğretmen işi",

          "özel ders hizmeti",
        ],
      },
    ],
  },

  {
    id: "personal-trainer",
    name: "Spor Antrenörü",
    keywords: [
      "spor antrenörü",

      "personal trainer",

      "fitness antrenörü",

      "spor antrenörü lazım",

      "personal trainer lazım",

      "fitness antrenörü lazım",

      "spor antrenörü işi",
    ],
    subServices: [
      {
        id: "fitness-training",
        name: "Fitness antrenörlüğü",
        keywords: [
          "fitness antrenörü",

          "fitness eğitmeni",

          "fitness antrenörü işi",

          "fitness eğitmeni işi",

          "fitness antrenörü lazım",
        ],
      },
      {
        id: "yoga-pilates",
        name: "Yoga / Pilates eğitmeni",
        keywords: [
          "yoga eğitmeni",

          "pilates eğitmeni",

          "yoga dersi",

          "pilates dersi",

          "yoga eğitmeni işi",

          "pilates eğitmeni işi",

          "yoga eğitmeni lazım",
        ],
      },
      {
        id: "other-personal-trainer",
        name: "Diğer (spor antrenörü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "spor antrenörü",

          "personal trainer",

          "fitness antrenörü",

          "spor antrenörü lazım",

          "personal trainer lazım",

          "fitness antrenörü lazım",

          "spor antrenörü işi",

          "spor antrenörü hizmeti",
        ],
      },
    ],
  },

  {
    id: "storage",
    name: "Depolama",
    keywords: [
      "depolama",

      "depo",

      "eşya depolama",

      "depolama hizmeti",

      "depolama lazım",

      "depo lazım",

      "eşya depolama lazım",

      "depolama işi",

      "depo işi",
    ],
    subServices: [
      {
        id: "storage-service",
        name: "Eşya depolama hizmeti",
        keywords: [
          "eşya depolama",

          "depolama hizmeti",

          "eşya depolama işi",

          "depolama hizmeti işi",

          "eşya depolama lazım",
        ],
      },
      {
        id: "other-storage",
        name: "Diğer (depolama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "depolama",

          "depo",

          "eşya depolama",

          "depolama hizmeti",

          "depolama lazım",

          "depo lazım",

          "eşya depolama lazım",

          "depolama işi",

          "depo işi",
        ],
      },
    ],
  },

  {
    id: "prefab-container",
    name: "Prefabrik / Konteyner",
    keywords: [
      "prefabrik",

      "konteyner",

      "prefabrik yapımı",

      "konteyner montajı",

      "prefabrik lazım",

      "konteyner lazım",

      "prefabrik işi",

      "konteyner işi",
    ],
    subServices: [
      {
        id: "prefab-installation",
        name: "Prefabrik montajı",
        keywords: [
          "prefabrik montajı",

          "prefabrik kurulumu",

          "prefabrik yapımı",

          "prefabrik montajı işi",

          "prefabrik kurulumu işi",

          "prefabrik montajı lazım",
        ],
      },
      {
        id: "container-installation",
        name: "Konteyner montajı",
        keywords: [
          "konteyner montajı",

          "konteyner kurulumu",

          "konteyner yapımı",

          "konteyner montajı işi",

          "konteyner kurulumu işi",

          "konteyner montajı lazım",
        ],
      },
      {
        id: "other-prefab-container",
        name: "Diğer (prefabrik / konteyner ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "prefabrik",

          "konteyner",

          "prefabrik yapımı",

          "konteyner montajı",

          "prefabrik lazım",

          "konteyner lazım",

          "prefabrik işi",

          "konteyner işi",

          "prefabrik hizmeti",
        ],
      },
    ],
  },

  {
    id: "elevator-maintenance",
    name: "Asansör Bakımı",
    keywords: [
      "asansör bakımı",

      "asansör tamiri",

      "asansör servisi",

      "asansör bakımı lazım",

      "asansör tamiri lazım",

      "asansör servisi lazım",

      "asansör işi",
    ],
    subServices: [
      {
        id: "elevator-repair",
        name: "Asansör tamiri",
        keywords: [
          "asansör tamiri",

          "asansör onarımı",

          "asansör arızası",

          "asansör çalışmıyor",

          "asansör tamir",

          "asansör onarım",

          "asansör tamiri lazım",
        ],
      },
      {
        id: "elevator-maintenance-regular",
        name: "Düzenli asansör bakımı",
        keywords: [
          "düzenli asansör bakımı",

          "asansör bakımı düzenli",

          "asansör periyodik bakım",

          "düzenli asansör bakımı işi",

          "asansör bakımı düzenli lazım",
        ],
      },
      {
        id: "other-elevator-maintenance",
        name: "Diğer (asansör bakımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "asansör bakımı",

          "asansör tamiri",

          "asansör servisi",

          "asansör bakımı lazım",

          "asansör tamiri lazım",

          "asansör servisi lazım",

          "asansör işi",

          "asansör hizmeti",
        ],
      },
    ],
  },

  {
    id: "wall-construction",
    name: "Duvar Örme",
    keywords: [
      "duvar örme",

      "duvar yapımı",

      "duvar inşaatı",

      "duvar örme işi",

      "duvar yapımı işi",

      "duvar örme lazım",

      "duvar yapımı lazım",

      "duvar usta",
    ],
    subServices: [
      {
        id: "wall-building",
        name: "Duvar yapımı",
        keywords: [
          "duvar yapımı",

          "duvar örme",

          "duvar inşaatı",

          "duvar yapımı işi",

          "duvar örme işi",

          "duvar usta",

          "duvar yapımı lazım",
        ],
      },
      {
        id: "garden-wall",
        name: "Bahçe duvarı / çit",
        keywords: [
          "bahçe duvarı",

          "bahçe çit",

          "çit yapımı",

          "bahçe duvarı işi",

          "bahçe çit işi",

          "bahçe duvarı lazım",
        ],
      },
      {
        id: "other-wall-construction",
        name: "Diğer (duvar örme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "duvar örme",

          "duvar yapımı",

          "duvar inşaatı",

          "duvar örme işi",

          "duvar yapımı işi",

          "duvar örme lazım",

          "duvar yapımı lazım",

          "duvar usta",

          "duvar örme hizmeti",
        ],
      },
    ],
  },

  {
    id: "pool-construction",
    name: "Havuz Yapımı",
    keywords: [
      "havuz yapımı",

      "havuz inşaatı",

      "havuz yapımı işi",

      "havuz inşaatı işi",

      "havuz yapımı lazım",

      "havuz inşaatı lazım",

      "havuz usta",
    ],
    subServices: [
      {
        id: "pool-building",
        name: "Havuz yapımı",
        keywords: [
          "havuz yapımı",

          "havuz inşaatı",

          "havuz yapımı işi",

          "havuz inşaatı işi",

          "havuz usta",

          "havuz yapımı lazım",
        ],
      },
      {
        id: "other-pool-construction",
        name: "Diğer (havuz yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "havuz yapımı",

          "havuz inşaatı",

          "havuz yapımı işi",

          "havuz inşaatı işi",

          "havuz yapımı lazım",

          "havuz inşaatı lazım",

          "havuz usta",

          "havuz yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "drain-cleaning",
    name: "Çöp Kanalı Temizliği",
    keywords: [
      "çöp kanalı",

      "kanal temizliği",

      "çöp kanalı temizliği",

      "kanal açma",

      "çöp kanalı temizliği işi",

      "kanal temizliği işi",

      "çöp kanalı temizliği lazım",

      "kanal açma lazım",

      "kanal temizlikçi",
    ],
    subServices: [
      {
        id: "drain-cleaning-service",
        name: "Kanal temizliği",
        keywords: [
          "kanal temizliği",

          "çöp kanalı temizliği",

          "kanal açma",

          "kanal temizliği işi",

          "çöp kanalı temizliği işi",

          "kanal açma işi",

          "kanal temizliği lazım",
        ],
      },
      {
        id: "other-drain-cleaning",
        name: "Diğer (çöp kanalı temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çöp kanalı",

          "kanal temizliği",

          "çöp kanalı temizliği",

          "kanal açma",

          "çöp kanalı temizliği işi",

          "kanal temizliği işi",

          "çöp kanalı temizliği lazım",

          "kanal açma lazım",

          "kanal temizlikçi",

          "kanal temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "chimney-cleaning",
    name: "Baca Temizliği",
    keywords: [
      "baca temizliği",

      "baca temizleme",

      "baca temizliği işi",

      "baca temizleme işi",

      "baca temizliği lazım",

      "baca temizleme lazım",

      "baca temizlikçi",
    ],
    subServices: [
      {
        id: "chimney-cleaning-service",
        name: "Baca temizliği",
        keywords: [
          "baca temizliği",

          "baca temizleme",

          "baca temizliği işi",

          "baca temizleme işi",

          "baca temizlikçi",

          "baca temizliği lazım",
        ],
      },
      {
        id: "other-chimney-cleaning",
        name: "Diğer (baca temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "baca temizliği",

          "baca temizleme",

          "baca temizliği işi",

          "baca temizleme işi",

          "baca temizliği lazım",

          "baca temizleme lazım",

          "baca temizlikçi",

          "baca temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "accounting",
    name: "Muhasebe / Mali Müşavirlik",
    keywords: [
      "muhasebe",

      "mali müşavir",

      "muhasebeci",

      "muhasebe hizmeti",

      "mali müşavir lazım",

      "muhasebeci lazım",

      "muhasebe hizmeti lazım",

      "muhasebe işi",

      "mali müşavir işi",
    ],
    subServices: [
      {
        id: "accounting-service",
        name: "Muhasebe hizmeti",
        keywords: [
          "muhasebe hizmeti",

          "muhasebe işi",

          "muhasebeci",

          "muhasebe hizmeti işi",

          "muhasebeci işi",

          "muhasebe hizmeti lazım",
        ],
      },
      {
        id: "tax-consulting",
        name: "Vergi danışmanlığı",
        keywords: [
          "vergi danışmanlığı",

          "vergi danışmanı",

          "vergi danışmanlığı işi",

          "vergi danışmanı işi",

          "vergi danışmanlığı lazım",
        ],
      },
      {
        id: "other-accounting",
        name: "Diğer (muhasebe / mali müşavirlik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "muhasebe",

          "mali müşavir",

          "muhasebeci",

          "muhasebe hizmeti",

          "mali müşavir lazım",

          "muhasebeci lazım",

          "muhasebe hizmeti lazım",

          "muhasebe işi",

          "mali müşavir işi",
        ],
      },
    ],
  },

  {
    id: "legal-services",
    name: "Hukuk Hizmetleri",
    keywords: [
      "avukat",

      "hukuk",

      "hukuk hizmeti",

      "avukat lazım",

      "hukuk lazım",

      "hukuk hizmeti lazım",

      "avukat işi",

      "hukuk işi",
    ],
    subServices: [
      {
        id: "legal-consultation",
        name: "Hukuk danışmanlığı",
        keywords: [
          "hukuk danışmanlığı",

          "avukat danışmanlık",

          "hukuk danışmanlığı işi",

          "avukat danışmanlık işi",

          "hukuk danışmanlığı lazım",
        ],
      },
      {
        id: "other-legal-services",
        name: "Diğer (hukuk hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "avukat",

          "hukuk",

          "hukuk hizmeti",

          "avukat lazım",

          "hukuk lazım",

          "hukuk hizmeti lazım",

          "avukat işi",

          "hukuk işi",
        ],
      },
    ],
  },

  {
    id: "health-services",
    name: "Sağlık Hizmetleri",
    keywords: [
      "doktor",

      "sağlık",

      "sağlık hizmeti",

      "doktor lazım",

      "sağlık lazım",

      "sağlık hizmeti lazım",

      "doktor işi",

      "sağlık işi",
    ],
    subServices: [
      {
        id: "home-health-care",
        name: "Evde sağlık hizmeti",
        keywords: [
          "evde sağlık",

          "evde sağlık hizmeti",

          "evde doktor",

          "evde hemşire",

          "evde sağlık işi",

          "evde sağlık hizmeti işi",

          "evde sağlık lazım",
        ],
      },
      {
        id: "other-health-services",
        name: "Diğer (sağlık hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "doktor",

          "sağlık",

          "sağlık hizmeti",

          "doktor lazım",

          "sağlık lazım",

          "sağlık hizmeti lazım",

          "doktor işi",

          "sağlık işi",
        ],
      },
    ],
  },

  {
    id: "graphic-design",
    name: "Grafik Tasarım",
    keywords: [
      "grafik tasarım",

      "grafik tasarımcı",

      "grafik tasarım işi",

      "grafik tasarımcı işi",

      "grafik tasarım lazım",

      "grafik tasarımcı lazım",

      "logo tasarım",

      "afiş tasarım",
    ],
    subServices: [
      {
        id: "logo-design",
        name: "Logo tasarımı",
        keywords: [
          "logo tasarım",

          "logo tasarımı",

          "logo yapımı",

          "logo tasarım işi",

          "logo tasarımı işi",

          "logo tasarım lazım",
        ],
      },
      {
        id: "other-graphic-design",
        name: "Diğer (grafik tasarım ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "grafik tasarım",

          "grafik tasarımcı",

          "grafik tasarım işi",

          "grafik tasarımcı işi",

          "grafik tasarım lazım",

          "grafik tasarımcı lazım",

          "logo tasarım",

          "afiş tasarım",

          "grafik tasarım hizmeti",
        ],
      },
    ],
  },

  {
    id: "web-design",
    name: "Web Tasarım",
    keywords: [
      "web tasarım",

      "web sitesi",

      "web tasarımcı",

      "web tasarım işi",

      "web sitesi işi",

      "web tasarım lazım",

      "web sitesi lazım",
    ],
    subServices: [
      {
        id: "website-design",
        name: "Web sitesi tasarımı",
        keywords: [
          "web sitesi tasarımı",

          "web sitesi yapımı",

          "web sitesi tasarım işi",

          "web sitesi yapımı işi",

          "web sitesi tasarımı lazım",
        ],
      },
      {
        id: "other-web-design",
        name: "Diğer (web tasarım ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "web tasarım",

          "web sitesi",

          "web tasarımcı",

          "web tasarım işi",

          "web sitesi işi",

          "web tasarım lazım",

          "web sitesi lazım",

          "web tasarım hizmeti",
        ],
      },
    ],
  },

  {
    id: "software-development",
    name: "Yazılım Geliştirme",
    keywords: [
      "yazılım",

      "yazılım geliştirme",

      "yazılımcı",

      "yazılım işi",

      "yazılım geliştirme işi",

      "yazılım lazım",

      "yazılımcı lazım",
    ],
    subServices: [
      {
        id: "custom-software",
        name: "Özel yazılım geliştirme",
        keywords: [
          "özel yazılım",

          "özel yazılım geliştirme",

          "özel yazılım işi",

          "özel yazılım geliştirme işi",

          "özel yazılım lazım",
        ],
      },
      {
        id: "other-software-development",
        name: "Diğer (yazılım geliştirme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yazılım",

          "yazılım geliştirme",

          "yazılımcı",

          "yazılım işi",

          "yazılım geliştirme işi",

          "yazılım lazım",

          "yazılımcı lazım",

          "yazılım hizmeti",
        ],
      },
    ],
  },

  {
    id: "marketing",
    name: "Pazarlama / Reklam",
    keywords: [
      "pazarlama",

      "reklam",

      "pazarlama hizmeti",

      "reklam hizmeti",

      "pazarlama lazım",

      "reklam lazım",

      "pazarlama işi",

      "reklam işi",
    ],
    subServices: [
      {
        id: "digital-marketing",
        name: "Dijital pazarlama",
        keywords: [
          "dijital pazarlama",

          "sosyal medya pazarlama",

          "dijital pazarlama işi",

          "sosyal medya pazarlama işi",

          "dijital pazarlama lazım",
        ],
      },
      {
        id: "other-marketing",
        name: "Diğer (pazarlama / reklam ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "pazarlama",

          "reklam",

          "pazarlama hizmeti",

          "reklam hizmeti",

          "pazarlama lazım",

          "reklam lazım",

          "pazarlama işi",

          "reklam işi",
        ],
      },
    ],
  },

  {
    id: "notary",
    name: "Noter Hizmetleri",
    keywords: [
      "noter",

      "noter hizmeti",

      "noter lazım",

      "noter hizmeti lazım",

      "noter işi",
    ],
    subServices: [
      {
        id: "notary-service",
        name: "Noter hizmeti",
        keywords: [
          "noter hizmeti",

          "noter işi",

          "noter lazım",

          "noter hizmeti lazım",
        ],
      },
      {
        id: "other-notary",
        name: "Diğer (noter hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "noter",

          "noter hizmeti",

          "noter lazım",

          "noter hizmeti lazım",

          "noter işi",
        ],
      },
    ],
  },

  {
    id: "real-estate",
    name: "Emlak Danışmanlığı",
    keywords: [
      "emlak",

      "emlakçı",

      "emlak danışmanlığı",

      "emlak lazım",

      "emlakçı lazım",

      "emlak danışmanlığı lazım",

      "emlak işi",

      "emlakçı işi",
    ],
    subServices: [
      {
        id: "real-estate-consulting",
        name: "Emlak danışmanlığı",
        keywords: [
          "emlak danışmanlığı",

          "emlak danışmanı",

          "emlak danışmanlığı işi",

          "emlak danışmanı işi",

          "emlak danışmanlığı lazım",
        ],
      },
      {
        id: "other-real-estate",
        name: "Diğer (emlak danışmanlığı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "emlak",

          "emlakçı",

          "emlak danışmanlığı",

          "emlak lazım",

          "emlakçı lazım",

          "emlak danışmanlığı lazım",

          "emlak işi",

          "emlakçı işi",

          "emlak hizmeti",
        ],
      },
    ],
  },

  {
    id: "insurance",
    name: "Sigorta Danışmanlığı",
    keywords: [
      "sigorta",

      "sigorta danışmanlığı",

      "sigorta lazım",

      "sigorta danışmanlığı lazım",

      "sigorta işi",

      "sigorta danışmanlığı işi",
    ],
    subServices: [
      {
        id: "insurance-consulting",
        name: "Sigorta danışmanlığı",
        keywords: [
          "sigorta danışmanlığı",

          "sigorta danışmanı",

          "sigorta danışmanlığı işi",

          "sigorta danışmanı işi",

          "sigorta danışmanlığı lazım",
        ],
      },
      {
        id: "other-insurance",
        name: "Diğer (sigorta danışmanlığı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "sigorta",

          "sigorta danışmanlığı",

          "sigorta lazım",

          "sigorta danışmanlığı lazım",

          "sigorta işi",

          "sigorta danışmanlığı işi",

          "sigorta hizmeti",
        ],
      },
    ],
  },

  {
    id: "psychology",
    name: "Psikolog / Terapi",
    keywords: [
      "psikolog",

      "terapi",

      "psikolog lazım",

      "terapi lazım",

      "psikolog işi",

      "terapi işi",
    ],
    subServices: [
      {
        id: "psychology-consultation",
        name: "Psikolog danışmanlığı",
        keywords: [
          "psikolog danışmanlık",

          "psikolog danışmanlığı",

          "psikolog danışmanlık işi",

          "psikolog danışmanlığı işi",

          "psikolog danışmanlık lazım",
        ],
      },
      {
        id: "other-psychology",
        name: "Diğer (psikolog / terapi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "psikolog",

          "terapi",

          "psikolog lazım",

          "terapi lazım",

          "psikolog işi",

          "terapi işi",

          "psikolog hizmeti",
        ],
      },
    ],
  },

  {
    id: "nutrition",
    name: "Diyetisyen / Beslenme",
    keywords: [
      "diyetisyen",

      "beslenme",

      "diyet",

      "diyetisyen lazım",

      "beslenme lazım",

      "diyet lazım",

      "diyetisyen işi",

      "beslenme işi",
    ],
    subServices: [
      {
        id: "nutrition-consultation",
        name: "Beslenme danışmanlığı",
        keywords: [
          "beslenme danışmanlığı",

          "diyet danışmanlığı",

          "beslenme danışmanlığı işi",

          "diyet danışmanlığı işi",

          "beslenme danışmanlığı lazım",
        ],
      },
      {
        id: "other-nutrition",
        name: "Diğer (diyetisyen / beslenme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "diyetisyen",

          "beslenme",

          "diyet",

          "diyetisyen lazım",

          "beslenme lazım",

          "diyet lazım",

          "diyetisyen işi",

          "beslenme işi",

          "diyetisyen hizmeti",
        ],
      },
    ],
  },

  {
    id: "physiotherapy",
    name: "Fizyoterapi",
    keywords: [
      "fizyoterapi",

      "fizyoterapist",

      "fizyoterapi lazım",

      "fizyoterapist lazım",

      "fizyoterapi işi",

      "fizyoterapist işi",
    ],
    subServices: [
      {
        id: "physiotherapy-service",
        name: "Fizyoterapi hizmeti",
        keywords: [
          "fizyoterapi hizmeti",

          "fizyoterapi işi",

          "fizyoterapist",

          "fizyoterapi hizmeti işi",

          "fizyoterapist işi",

          "fizyoterapi hizmeti lazım",
        ],
      },
      {
        id: "other-physiotherapy",
        name: "Diğer (fizyoterapi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fizyoterapi",

          "fizyoterapist",

          "fizyoterapi lazım",

          "fizyoterapist lazım",

          "fizyoterapi işi",

          "fizyoterapist işi",

          "fizyoterapi hizmeti",
        ],
      },
    ],
  },

  {
    id: "veterinary",
    name: "Veteriner Hekim",
    keywords: [
      "veteriner",

      "veteriner hekim",

      "veteriner lazım",

      "veteriner hekim lazım",

      "veteriner işi",

      "veteriner hekim işi",
    ],
    subServices: [
      {
        id: "veterinary-service",
        name: "Veteriner hizmeti",
        keywords: [
          "veteriner hizmeti",

          "veteriner işi",

          "veteriner hekim",

          "veteriner hizmeti işi",

          "veteriner hekim işi",

          "veteriner hizmeti lazım",
        ],
      },
      {
        id: "other-veterinary",
        name: "Diğer (veteriner hekim ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "veteriner",

          "veteriner hekim",

          "veteriner lazım",

          "veteriner hekim lazım",

          "veteriner işi",

          "veteriner hekim işi",

          "veteriner hizmeti",
        ],
      },
    ],
  },

  {
    id: "appliance-repair",
    name: "Elektronik / Küçük Ev Aleti Tamiri",
    keywords: [
      "elektronik tamiri",

      "küçük ev aleti tamiri",

      "elektronik usta",

      "küçük ev aleti usta",

      "elektronik tamiri lazım",

      "küçük ev aleti tamiri lazım",

      "elektronik işi",
    ],
    subServices: [
      {
        id: "small-appliance-repair",
        name: "Küçük ev aleti tamiri",
        keywords: [
          "küçük ev aleti tamiri",

          "küçük ev aleti onarımı",

          "küçük ev aleti düzeltme",

          "küçük ev aleti tamir",

          "küçük ev aleti onarım",

          "küçük ev aleti tamiri lazım",
        ],
      },
      {
        id: "electronic-repair",
        name: "Elektronik cihaz tamiri",
        keywords: [
          "elektronik tamiri",

          "elektronik onarımı",

          "elektronik düzeltme",

          "elektronik tamir",

          "elektronik onarım",

          "elektronik tamiri lazım",
        ],
      },
      {
        id: "other-appliance-repair",
        name: "Diğer (elektronik / küçük ev aleti tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "elektronik tamiri",

          "küçük ev aleti tamiri",

          "elektronik usta",

          "küçük ev aleti usta",

          "elektronik tamiri lazım",

          "küçük ev aleti tamiri lazım",

          "elektronik işi",

          "elektronik hizmeti",
        ],
      },
    ],
  },

  {
    id: "carpet-installation",
    name: "Halı Döşeme",
    keywords: [
      "halı döşeme",

      "halı montajı",

      "halı döşeme işi",

      "halı montajı işi",

      "halı döşeme lazım",

      "halı montajı lazım",

      "halı döşeme usta",
    ],
    subServices: [
      {
        id: "carpet-installation-service",
        name: "Halı döşeme / montajı",
        keywords: [
          "halı döşeme",

          "halı montajı",

          "halı takma",

          "halı döşeme işi",

          "halı montajı işi",

          "halı döşeme usta",

          "halı döşeme lazım",
        ],
      },
      {
        id: "other-carpet-installation",
        name: "Diğer (halı döşeme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "halı döşeme",

          "halı montajı",

          "halı döşeme işi",

          "halı montajı işi",

          "halı döşeme lazım",

          "halı montajı lazım",

          "halı döşeme usta",

          "halı döşeme hizmeti",
        ],
      },
    ],
  },

  {
    id: "curtain-blinds",
    name: "Perde / Jaluzi",
    keywords: [
      "perde",

      "jaluzi",

      "perde montajı",

      "jaluzi montajı",

      "perde takma",

      "jaluzi takma",

      "perde işi",

      "jaluzi işi",

      "perde lazım",

      "jaluzi lazım",

      "perde usta",

      "jaluzi usta",
    ],
    subServices: [
      {
        id: "curtain-installation",
        name: "Perde montajı",
        keywords: [
          "perde montajı",

          "perde takma",

          "perde kurulumu",

          "perde montajı işi",

          "perde takma işi",

          "perde usta",

          "perde montajı lazım",
        ],
      },
      {
        id: "blinds-installation",
        name: "Jaluzi montajı",
        keywords: [
          "jaluzi montajı",

          "jaluzi takma",

          "jaluzi kurulumu",

          "jaluzi montajı işi",

          "jaluzi takma işi",

          "jaluzi usta",

          "jaluzi montajı lazım",
        ],
      },
      {
        id: "other-curtain-blinds",
        name: "Diğer (perde / jaluzi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "perde",

          "jaluzi",

          "perde montajı",

          "jaluzi montajı",

          "perde takma",

          "jaluzi takma",

          "perde işi",

          "jaluzi işi",

          "perde lazım",

          "jaluzi lazım",

          "perde usta",

          "jaluzi usta",

          "perde hizmeti",
        ],
      },
    ],
  },

  {
    id: "lighting",
    name: "Aydınlatma / Lamba",
    keywords: [
      "aydınlatma",

      "lamba",

      "aydınlatma montajı",

      "lamba montajı",

      "aydınlatma takma",

      "aydınlatma işi",

      "lamba işi",

      "aydınlatma lazım",

      "lamba lazım",

      "aydınlatma usta",
    ],
    subServices: [
      {
        id: "lighting-installation",
        name: "Aydınlatma montajı",
        keywords: [
          "aydınlatma montajı",

          "lamba montajı",

          "aydınlatma takma",

          "lamba takma",

          "aydınlatma montajı işi",

          "lamba montajı işi",

          "aydınlatma usta",

          "aydınlatma montajı lazım",
        ],
      },
      {
        id: "lighting-repair",
        name: "Aydınlatma tamiri",
        keywords: [
          "aydınlatma tamiri",

          "lamba tamiri",

          "aydınlatma onarımı",

          "lamba onarımı",

          "aydınlatma tamir",

          "lamba tamir",

          "aydınlatma tamiri lazım",
        ],
      },
      {
        id: "other-lighting",
        name: "Diğer (aydınlatma / lamba ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "aydınlatma",

          "lamba",

          "aydınlatma montajı",

          "lamba montajı",

          "aydınlatma takma",

          "aydınlatma işi",

          "lamba işi",

          "aydınlatma lazım",

          "lamba lazım",

          "aydınlatma usta",

          "aydınlatma hizmeti",
        ],
      },
    ],
  },

  {
    id: "plumbing-installation",
    name: "Tesisat Montajı",
    keywords: [
      "tesisat montajı",

      "tesisat kurulumu",

      "tesisat takma",

      "tesisat montajı işi",

      "tesisat kurulumu işi",

      "tesisat montajı lazım",

      "tesisat usta",
    ],
    subServices: [
      {
        id: "plumbing-installation-service",
        name: "Tesisat montajı / kurulumu",
        keywords: [
          "tesisat montajı",

          "tesisat kurulumu",

          "tesisat takma",

          "tesisat montajı işi",

          "tesisat kurulumu işi",

          "tesisat usta",

          "tesisat montajı lazım",
        ],
      },
      {
        id: "other-plumbing-installation",
        name: "Diğer (tesisat montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tesisat montajı",

          "tesisat kurulumu",

          "tesisat takma",

          "tesisat montajı işi",

          "tesisat kurulumu işi",

          "tesisat montajı lazım",

          "tesisat usta",

          "tesisat hizmeti",
        ],
      },
    ],
  },

  {
    id: "solar-panel",
    name: "Güneş Paneli",
    keywords: [
      "güneş paneli",

      "solar panel",

      "güneş paneli montajı",

      "solar panel montajı",

      "güneş paneli işi",

      "solar panel işi",

      "güneş paneli lazım",

      "solar panel lazım",
    ],
    subServices: [
      {
        id: "solar-panel-installation",
        name: "Güneş paneli montajı",
        keywords: [
          "güneş paneli montajı",

          "solar panel montajı",

          "güneş paneli kurulumu",

          "güneş paneli montajı işi",

          "solar panel montajı işi",

          "güneş paneli montajı lazım",
        ],
      },
      {
        id: "solar-panel-repair",
        name: "Güneş paneli tamiri",
        keywords: [
          "güneş paneli tamiri",

          "solar panel tamiri",

          "güneş paneli onarımı",

          "güneş paneli tamir",

          "solar panel tamir",

          "güneş paneli tamiri lazım",
        ],
      },
      {
        id: "other-solar-panel",
        name: "Diğer (güneş paneli ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "güneş paneli",

          "solar panel",

          "güneş paneli montajı",

          "solar panel montajı",

          "güneş paneli işi",

          "solar panel işi",

          "güneş paneli lazım",

          "solar panel lazım",

          "güneş paneli hizmeti",
        ],
      },
    ],
  },

  {
    id: "generator",
    name: "Jeneratör",
    keywords: [
      "jeneratör",

      "jeneratör montajı",

      "jeneratör kurulumu",

      "jeneratör tamiri",

      "jeneratör işi",

      "jeneratör lazım",

      "jeneratör usta",
    ],
    subServices: [
      {
        id: "generator-installation",
        name: "Jeneratör montajı / kurulumu",
        keywords: [
          "jeneratör montajı",

          "jeneratör kurulumu",

          "jeneratör takma",

          "jeneratör montajı işi",

          "jeneratör kurulumu işi",

          "jeneratör usta",

          "jeneratör montajı lazım",
        ],
      },
      {
        id: "generator-repair",
        name: "Jeneratör tamiri",
        keywords: [
          "jeneratör tamiri",

          "jeneratör onarımı",

          "jeneratör düzeltme",

          "jeneratör tamir",

          "jeneratör onarım",

          "jeneratör tamiri lazım",
        ],
      },
      {
        id: "other-generator",
        name: "Diğer (jeneratör ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "jeneratör",

          "jeneratör montajı",

          "jeneratör kurulumu",

          "jeneratör tamiri",

          "jeneratör işi",

          "jeneratör lazım",

          "jeneratör usta",

          "jeneratör hizmeti",
        ],
      },
    ],
  },

  {
    id: "water-tank",
    name: "Su Deposu / Tank",
    keywords: [
      "su deposu",

      "su tankı",

      "su deposu montajı",

      "su tankı montajı",

      "su deposu işi",

      "su tankı işi",

      "su deposu lazım",

      "su tankı lazım",
    ],
    subServices: [
      {
        id: "water-tank-installation",
        name: "Su deposu / tank montajı",
        keywords: [
          "su deposu montajı",

          "su tankı montajı",

          "su deposu kurulumu",

          "su tankı kurulumu",

          "su deposu montajı işi",

          "su tankı montajı işi",

          "su deposu montajı lazım",
        ],
      },
      {
        id: "water-tank-repair",
        name: "Su deposu / tank tamiri",
        keywords: [
          "su deposu tamiri",

          "su tankı tamiri",

          "su deposu onarımı",

          "su tankı onarımı",

          "su deposu tamir",

          "su tankı tamir",

          "su deposu tamiri lazım",
        ],
      },
      {
        id: "other-water-tank",
        name: "Diğer (su deposu / tank ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su deposu",

          "su tankı",

          "su deposu montajı",

          "su tankı montajı",

          "su deposu işi",

          "su tankı işi",

          "su deposu lazım",

          "su tankı lazım",

          "su deposu hizmeti",
        ],
      },
    ],
  },

  {
    id: "water-softener",
    name: "Su Arıtma Cihazı",
    keywords: [
      "su arıtma",

      "su arıtma cihazı",

      "su arıtma montajı",

      "su arıtma kurulumu",

      "su arıtma işi",

      "su arıtma lazım",

      "su arıtma usta",
    ],
    subServices: [
      {
        id: "water-softener-installation",
        name: "Su arıtma cihazı montajı",
        keywords: [
          "su arıtma montajı",

          "su arıtma kurulumu",

          "su arıtma takma",

          "su arıtma montajı işi",

          "su arıtma kurulumu işi",

          "su arıtma usta",

          "su arıtma montajı lazım",
        ],
      },
      {
        id: "water-softener-repair",
        name: "Su arıtma cihazı tamiri",
        keywords: [
          "su arıtma tamiri",

          "su arıtma onarımı",

          "su arıtma düzeltme",

          "su arıtma tamir",

          "su arıtma onarım",

          "su arıtma tamiri lazım",
        ],
      },
      {
        id: "other-water-softener",
        name: "Diğer (su arıtma cihazı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su arıtma",

          "su arıtma cihazı",

          "su arıtma montajı",

          "su arıtma kurulumu",

          "su arıtma işi",

          "su arıtma lazım",

          "su arıtma usta",

          "su arıtma hizmeti",
        ],
      },
    ],
  },

  {
    id: "cctv-installation",
    name: "CCTV / Güvenlik Sistemi",
    keywords: [
      "cctv",

      "güvenlik sistemi",

      "cctv montajı",

      "güvenlik sistemi montajı",

      "cctv işi",

      "güvenlik sistemi işi",

      "cctv lazım",

      "güvenlik sistemi lazım",
    ],
    subServices: [
      {
        id: "cctv-installation-service",
        name: "CCTV / güvenlik sistemi montajı",
        keywords: [
          "cctv montajı",

          "güvenlik sistemi montajı",

          "cctv kurulumu",

          "güvenlik sistemi kurulumu",

          "cctv montajı işi",

          "güvenlik sistemi montajı işi",

          "cctv montajı lazım",
        ],
      },
      {
        id: "cctv-repair",
        name: "CCTV / güvenlik sistemi tamiri",
        keywords: [
          "cctv tamiri",

          "güvenlik sistemi tamiri",

          "cctv onarımı",

          "güvenlik sistemi onarımı",

          "cctv tamir",

          "güvenlik sistemi tamir",

          "cctv tamiri lazım",
        ],
      },
      {
        id: "other-cctv-installation",
        name: "Diğer (CCTV / güvenlik sistemi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "cctv",

          "güvenlik sistemi",

          "cctv montajı",

          "güvenlik sistemi montajı",

          "cctv işi",

          "güvenlik sistemi işi",

          "cctv lazım",

          "güvenlik sistemi lazım",

          "cctv hizmeti",
        ],
      },
    ],
  },

  {
    id: "intercom",
    name: "Kapı Telefonu / İnterkom",
    keywords: [
      "kapı telefonu",

      "interkom",

      "kapı telefonu montajı",

      "interkom montajı",

      "kapı telefonu işi",

      "interkom işi",

      "kapı telefonu lazım",

      "interkom lazım",
    ],
    subServices: [
      {
        id: "intercom-installation",
        name: "Kapı telefonu / interkom montajı",
        keywords: [
          "kapı telefonu montajı",

          "interkom montajı",

          "kapı telefonu kurulumu",

          "interkom kurulumu",

          "kapı telefonu montajı işi",

          "interkom montajı işi",

          "kapı telefonu montajı lazım",
        ],
      },
      {
        id: "intercom-repair",
        name: "Kapı telefonu / interkom tamiri",
        keywords: [
          "kapı telefonu tamiri",

          "interkom tamiri",

          "kapı telefonu onarımı",

          "interkom onarımı",

          "kapı telefonu tamir",

          "interkom tamir",

          "kapı telefonu tamiri lazım",
        ],
      },
      {
        id: "other-intercom",
        name: "Diğer (kapı telefonu / interkom ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kapı telefonu",

          "interkom",

          "kapı telefonu montajı",

          "interkom montajı",

          "kapı telefonu işi",

          "interkom işi",

          "kapı telefonu lazım",

          "interkom lazım",

          "kapı telefonu hizmeti",
        ],
      },
    ],
  },

  {
    id: "satellite-tv",
    name: "Uydu / TV Kurulumu",
    keywords: [
      "uydu",

      "tv kurulumu",

      "uydu montajı",

      "tv montajı",

      "uydu işi",

      "tv kurulumu işi",

      "uydu lazım",

      "tv kurulumu lazım",

      "uydu usta",
    ],
    subServices: [
      {
        id: "satellite-installation",
        name: "Uydu montajı / kurulumu",
        keywords: [
          "uydu montajı",

          "uydu kurulumu",

          "uydu takma",

          "uydu montajı işi",

          "uydu kurulumu işi",

          "uydu usta",

          "uydu montajı lazım",
        ],
      },
      {
        id: "tv-installation",
        name: "TV montajı / kurulumu",
        keywords: [
          "tv montajı",

          "tv kurulumu",

          "tv takma",

          "tv montajı işi",

          "tv kurulumu işi",

          "tv usta",

          "tv montajı lazım",
        ],
      },
      {
        id: "satellite-repair",
        name: "Uydu / TV tamiri",
        keywords: [
          "uydu tamiri",

          "tv tamiri",

          "uydu onarımı",

          "tv onarımı",

          "uydu tamir",

          "tv tamir",

          "uydu tamiri lazım",
        ],
      },
      {
        id: "other-satellite-tv",
        name: "Diğer (uydu / TV kurulumu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "uydu",

          "tv kurulumu",

          "uydu montajı",

          "tv montajı",

          "uydu işi",

          "tv kurulumu işi",

          "uydu lazım",

          "tv kurulumu lazım",

          "uydu usta",

          "uydu hizmeti",
        ],
      },
    ],
  },

  {
    id: "home-automation",
    name: "Akıllı Ev Sistemleri",
    keywords: [
      "akıllı ev",

      "akıllı ev sistemi",

      "akıllı ev montajı",

      "akıllı ev kurulumu",

      "akıllı ev işi",

      "akıllı ev lazım",

      "akıllı ev usta",
    ],
    subServices: [
      {
        id: "home-automation-installation",
        name: "Akıllı ev sistemi montajı",
        keywords: [
          "akıllı ev montajı",

          "akıllı ev kurulumu",

          "akıllı ev takma",

          "akıllı ev montajı işi",

          "akıllı ev kurulumu işi",

          "akıllı ev usta",

          "akıllı ev montajı lazım",
        ],
      },
      {
        id: "home-automation-repair",
        name: "Akıllı ev sistemi tamiri",
        keywords: [
          "akıllı ev tamiri",

          "akıllı ev onarımı",

          "akıllı ev düzeltme",

          "akıllı ev tamir",

          "akıllı ev onarım",

          "akıllı ev tamiri lazım",
        ],
      },
      {
        id: "other-home-automation",
        name: "Diğer (akıllı ev sistemleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "akıllı ev",

          "akıllı ev sistemi",

          "akıllı ev montajı",

          "akıllı ev kurulumu",

          "akıllı ev işi",

          "akıllı ev lazım",

          "akıllı ev usta",

          "akıllı ev hizmeti",
        ],
      },
    ],
  },

  {
    id: "furniture-assembly",
    name: "Mobilya Montajı / Kurulumu",
    keywords: [
      "mobilya montajı",

      "mobilya kurulumu",

      "mobilya birleştirme",

      "mobilya montajı işi",

      "mobilya kurulumu işi",

      "mobilya montajı lazım",

      "mobilya montajı usta",
    ],
    subServices: [
      {
        id: "furniture-assembly-service",
        name: "Mobilya montajı / birleştirme",
        keywords: [
          "mobilya montajı",

          "mobilya kurulumu",

          "mobilya birleştirme",

          "mobilya montajı işi",

          "mobilya kurulumu işi",

          "mobilya montajı usta",

          "mobilya montajı lazım",
        ],
      },
      {
        id: "ikea-assembly",
        name: "IKEA mobilya montajı",
        keywords: [
          "ikea montajı",

          "ikea mobilya montajı",

          "ikea kurulumu",

          "ikea montajı işi",

          "ikea mobilya montajı işi",

          "ikea montajı lazım",
        ],
      },
      {
        id: "other-furniture-assembly",
        name: "Diğer (mobilya montajı / kurulumu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "mobilya montajı",

          "mobilya kurulumu",

          "mobilya birleştirme",

          "mobilya montajı işi",

          "mobilya kurulumu işi",

          "mobilya montajı lazım",

          "mobilya montajı usta",

          "mobilya montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "pest-control",
    name: "Haşere İlaçlama",
    keywords: [
      "haşere ilaçlama",

      "böcek ilaçlama",

      "haşere ilaçlama işi",

      "böcek ilaçlama işi",

      "haşere ilaçlama lazım",

      "böcek ilaçlama lazım",

      "ilaçlama servisi",
    ],
    subServices: [
      {
        id: "pest-control-service",
        name: "Haşere / böcek ilaçlama",
        keywords: [
          "haşere ilaçlama",

          "böcek ilaçlama",

          "ilaçlama",

          "haşere ilaçlama işi",

          "böcek ilaçlama işi",

          "ilaçlama işi",

          "haşere ilaçlama lazım",
        ],
      },
      {
        id: "other-pest-control",
        name: "Diğer (haşere ilaçlama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "haşere ilaçlama",

          "böcek ilaçlama",

          "haşere ilaçlama işi",

          "böcek ilaçlama işi",

          "haşere ilaçlama lazım",

          "böcek ilaçlama lazım",

          "ilaçlama servisi",

          "haşere ilaçlama hizmeti",
        ],
      },
    ],
  },

  {
    id: "disinfection",
    name: "Dezenfeksiyon",
    keywords: [
      "dezenfeksiyon",

      "dezenfeksiyon işi",

      "dezenfeksiyon lazım",

      "dezenfeksiyon servisi",
    ],
    subServices: [
      {
        id: "disinfection-service",
        name: "Dezenfeksiyon hizmeti",
        keywords: [
          "dezenfeksiyon",

          "dezenfeksiyon işi",

          "dezenfeksiyon lazım",

          "dezenfeksiyon servisi",
        ],
      },
      {
        id: "other-disinfection",
        name: "Diğer (dezenfeksiyon ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dezenfeksiyon",

          "dezenfeksiyon işi",

          "dezenfeksiyon lazım",

          "dezenfeksiyon servisi",

          "dezenfeksiyon hizmeti",
        ],
      },
    ],
  },

  {
    id: "laundry-service",
    name: "Çamaşır Yıkama / Ütü",
    keywords: [
      "çamaşır yıkama",

      "ütü",

      "çamaşır yıkama işi",

      "ütü işi",

      "çamaşır yıkama lazım",

      "ütü lazım",

      "çamaşır yıkama servisi",
    ],
    subServices: [
      {
        id: "laundry-washing",
        name: "Çamaşır yıkama",
        keywords: [
          "çamaşır yıkama",

          "çamaşır yıkama işi",

          "çamaşır yıkama servisi",

          "çamaşır yıkama lazım",

          "çamaşır yıkama usta",
        ],
      },
      {
        id: "ironing-service",
        name: "Ütü hizmeti",
        keywords: ["ütü", "ütü işi", "ütü hizmeti", "ütü lazım", "ütü usta"],
      },
      {
        id: "other-laundry-service",
        name: "Diğer (çamaşır yıkama / ütü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çamaşır yıkama",

          "ütü",

          "çamaşır yıkama işi",

          "ütü işi",

          "çamaşır yıkama lazım",

          "ütü lazım",

          "çamaşır yıkama servisi",

          "çamaşır yıkama hizmeti",
        ],
      },
    ],
  },

  {
    id: "event-planning",
    name: "Etkinlik Organizasyonu",
    keywords: [
      "etkinlik organizasyonu",

      "etkinlik planlama",

      "etkinlik organizasyonu işi",

      "etkinlik planlama işi",

      "etkinlik organizasyonu lazım",

      "etkinlik planlama lazım",
    ],
    subServices: [
      {
        id: "event-planning-service",
        name: "Etkinlik organizasyonu / planlama",
        keywords: [
          "etkinlik organizasyonu",

          "etkinlik planlama",

          "etkinlik organizasyonu işi",

          "etkinlik planlama işi",

          "etkinlik organizasyonu lazım",
        ],
      },
      {
        id: "wedding-planning",
        name: "Düğün organizasyonu",
        keywords: [
          "düğün organizasyonu",

          "düğün planlama",

          "düğün organizasyonu işi",

          "düğün planlama işi",

          "düğün organizasyonu lazım",
        ],
      },
      {
        id: "other-event-planning",
        name: "Diğer (etkinlik organizasyonu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "etkinlik organizasyonu",

          "etkinlik planlama",

          "etkinlik organizasyonu işi",

          "etkinlik planlama işi",

          "etkinlik organizasyonu lazım",

          "etkinlik planlama lazım",

          "etkinlik organizasyonu hizmeti",
        ],
      },
    ],
  },

  {
    id: "makeup-artist",
    name: "Makyaj / Gelin Makyajı",
    keywords: [
      "makyaj",

      "gelin makyajı",

      "makyaj işi",

      "gelin makyajı işi",

      "makyaj lazım",

      "gelin makyajı lazım",

      "makyaj sanatçısı",
    ],
    subServices: [
      {
        id: "bridal-makeup",
        name: "Gelin makyajı",
        keywords: [
          "gelin makyajı",

          "gelin makyajı işi",

          "gelin makyajı lazım",

          "gelin makyajı sanatçısı",
        ],
      },
      {
        id: "makeup-service",
        name: "Makyaj hizmeti",
        keywords: ["makyaj", "makyaj işi", "makyaj lazım", "makyaj sanatçısı"],
      },
      {
        id: "other-makeup-artist",
        name: "Diğer (makyaj / gelin makyajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "makyaj",

          "gelin makyajı",

          "makyaj işi",

          "gelin makyajı işi",

          "makyaj lazım",

          "gelin makyajı lazım",

          "makyaj sanatçısı",

          "makyaj hizmeti",
        ],
      },
    ],
  },

  {
    id: "florist",
    name: "Çiçekçi / Düğün Çiçeği",
    keywords: [
      "çiçekçi",

      "düğün çiçeği",

      "çiçek düzenleme",

      "çiçekçi işi",

      "düğün çiçeği işi",

      "çiçekçi lazım",

      "düğün çiçeği lazım",
    ],
    subServices: [
      {
        id: "wedding-flowers",
        name: "Düğün çiçeği",
        keywords: [
          "düğün çiçeği",

          "düğün çiçek düzenleme",

          "düğün çiçeği işi",

          "düğün çiçek düzenleme işi",

          "düğün çiçeği lazım",
        ],
      },
      {
        id: "flower-arrangement",
        name: "Çiçek düzenleme",
        keywords: [
          "çiçek düzenleme",

          "çiçek düzenleme işi",

          "çiçek düzenleme lazım",

          "çiçekçi",
        ],
      },
      {
        id: "other-florist",
        name: "Diğer (çiçekçi / düğün çiçeği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çiçekçi",

          "düğün çiçeği",

          "çiçek düzenleme",

          "çiçekçi işi",

          "düğün çiçeği işi",

          "çiçekçi lazım",

          "düğün çiçeği lazım",

          "çiçekçi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-wash",
    name: "Araba Yıkama",
    keywords: [
      "araba yıkama",

      "oto yıkama",

      "araba yıkama işi",

      "oto yıkama işi",

      "araba yıkama lazım",

      "oto yıkama lazım",

      "araba yıkama servisi",
    ],
    subServices: [
      {
        id: "car-wash-service",
        name: "Araba yıkama hizmeti",
        keywords: [
          "araba yıkama",

          "oto yıkama",

          "araba yıkama işi",

          "oto yıkama işi",

          "araba yıkama lazım",

          "oto yıkama lazım",

          "araba yıkama servisi",
        ],
      },
      {
        id: "car-detailing",
        name: "Araba detay temizlik",
        keywords: [
          "araba detay",

          "oto detay",

          "araba detay temizlik",

          "oto detay temizlik",

          "araba detay işi",

          "oto detay işi",

          "araba detay lazım",
        ],
      },
      {
        id: "other-car-wash",
        name: "Diğer (araba yıkama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araba yıkama",

          "oto yıkama",

          "araba yıkama işi",

          "oto yıkama işi",

          "araba yıkama lazım",

          "oto yıkama lazım",

          "araba yıkama servisi",

          "araba yıkama hizmeti",
        ],
      },
    ],
  },

  {
    id: "pet-grooming",
    name: "Pet Bakımı / Kuaför",
    keywords: [
      "pet bakımı",

      "pet kuaför",

      "hayvan bakımı",

      "pet bakımı işi",

      "pet kuaför işi",

      "pet bakımı lazım",

      "pet kuaför lazım",
    ],
    subServices: [
      {
        id: "pet-grooming-service",
        name: "Pet bakımı / kuaför",
        keywords: [
          "pet bakımı",

          "pet kuaför",

          "hayvan bakımı",

          "pet bakımı işi",

          "pet kuaför işi",

          "pet bakımı lazım",

          "pet kuaför lazım",
        ],
      },
      {
        id: "other-pet-grooming",
        name: "Diğer (pet bakımı / kuaför ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "pet bakımı",

          "pet kuaför",

          "hayvan bakımı",

          "pet bakımı işi",

          "pet kuaför işi",

          "pet bakımı lazım",

          "pet kuaför lazım",

          "pet bakımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "pet-sitting",
    name: "Pet Bakıcılığı",
    keywords: [
      "pet bakıcı",

      "hayvan bakıcı",

      "pet bakıcılığı",

      "pet bakıcı işi",

      "hayvan bakıcı işi",

      "pet bakıcı lazım",

      "hayvan bakıcı lazım",
    ],
    subServices: [
      {
        id: "pet-sitting-service",
        name: "Pet bakıcılığı hizmeti",
        keywords: [
          "pet bakıcı",

          "hayvan bakıcı",

          "pet bakıcılığı",

          "pet bakıcı işi",

          "hayvan bakıcı işi",

          "pet bakıcı lazım",

          "hayvan bakıcı lazım",
        ],
      },
      {
        id: "other-pet-sitting",
        name: "Diğer (pet bakıcılığı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "pet bakıcı",

          "hayvan bakıcı",

          "pet bakıcılığı",

          "pet bakıcı işi",

          "hayvan bakıcı işi",

          "pet bakıcı lazım",

          "hayvan bakıcı lazım",

          "pet bakıcılığı hizmeti",
        ],
      },
    ],
  },

  {
    id: "elderly-care",
    name: "Yaşlı Bakımı",
    keywords: [
      "yaşlı bakımı",

      "yaşlı bakıcı",

      "yaşlı bakımı işi",

      "yaşlı bakıcı işi",

      "yaşlı bakımı lazım",

      "yaşlı bakıcı lazım",
    ],
    subServices: [
      {
        id: "elderly-care-service",
        name: "Yaşlı bakımı hizmeti",
        keywords: [
          "yaşlı bakımı",

          "yaşlı bakıcı",

          "yaşlı bakımı işi",

          "yaşlı bakıcı işi",

          "yaşlı bakımı lazım",

          "yaşlı bakıcı lazım",
        ],
      },
      {
        id: "other-elderly-care",
        name: "Diğer (yaşlı bakımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yaşlı bakımı",

          "yaşlı bakıcı",

          "yaşlı bakımı işi",

          "yaşlı bakıcı işi",

          "yaşlı bakımı lazım",

          "yaşlı bakıcı lazım",

          "yaşlı bakımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "child-care",
    name: "Çocuk Bakıcılığı",
    keywords: [
      "çocuk bakıcı",

      "bebek bakıcı",

      "çocuk bakıcılığı",

      "çocuk bakıcı işi",

      "bebek bakıcı işi",

      "çocuk bakıcı lazım",

      "bebek bakıcı lazım",
    ],
    subServices: [
      {
        id: "child-care-service",
        name: "Çocuk bakıcılığı hizmeti",
        keywords: [
          "çocuk bakıcı",

          "bebek bakıcı",

          "çocuk bakıcılığı",

          "çocuk bakıcı işi",

          "bebek bakıcı işi",

          "çocuk bakıcı lazım",

          "bebek bakıcı lazım",
        ],
      },
      {
        id: "other-child-care",
        name: "Diğer (çocuk bakıcılığı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çocuk bakıcı",

          "bebek bakıcı",

          "çocuk bakıcılığı",

          "çocuk bakıcı işi",

          "bebek bakıcı işi",

          "çocuk bakıcı lazım",

          "bebek bakıcı lazım",

          "çocuk bakıcılığı hizmeti",
        ],
      },
    ],
  },

  {
    id: "massage",
    name: "Masaj",
    keywords: [
      "masaj",

      "masaj hizmeti",

      "masaj işi",

      "masaj lazım",

      "masaj terapisti",
    ],
    subServices: [
      {
        id: "massage-service",
        name: "Masaj hizmeti",
        keywords: [
          "masaj",

          "masaj hizmeti",

          "masaj işi",

          "masaj lazım",

          "masaj terapisti",
        ],
      },
      {
        id: "other-massage",
        name: "Diğer (masaj ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "masaj",

          "masaj hizmeti",

          "masaj işi",

          "masaj lazım",

          "masaj terapisti",
        ],
      },
    ],
  },

  {
    id: "manicure-pedicure",
    name: "Manikür / Pedikür",
    keywords: [
      "manikür",

      "pedikür",

      "manikür pedikür",

      "manikür işi",

      "pedikür işi",

      "manikür lazım",

      "pedikür lazım",
    ],
    subServices: [
      {
        id: "manicure-pedicure-service",
        name: "Manikür / pedikür hizmeti",
        keywords: [
          "manikür",

          "pedikür",

          "manikür pedikür",

          "manikür işi",

          "pedikür işi",

          "manikür lazım",

          "pedikür lazım",
        ],
      },
      {
        id: "other-manicure-pedicure",
        name: "Diğer (manikür / pedikür ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "manikür",

          "pedikür",

          "manikür pedikür",

          "manikür işi",

          "pedikür işi",

          "manikür lazım",

          "pedikür lazım",

          "manikür hizmeti",
        ],
      },
    ],
  },

  {
    id: "tattoo",
    name: "Dövme",
    keywords: [
      "dövme",

      "dövme yapımı",

      "dövme işi",

      "dövme lazım",

      "dövme sanatçısı",
    ],
    subServices: [
      {
        id: "tattoo-service",
        name: "Dövme yapımı",
        keywords: [
          "dövme",

          "dövme yapımı",

          "dövme işi",

          "dövme lazım",

          "dövme sanatçısı",
        ],
      },
      {
        id: "tattoo-removal",
        name: "Dövme silme",
        keywords: [
          "dövme silme",

          "dövme kaldırma",

          "dövme silme işi",

          "dövme kaldırma işi",

          "dövme silme lazım",

          "dövme kaldırma lazım",
        ],
      },
      {
        id: "other-tattoo",
        name: "Diğer (dövme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dövme",

          "dövme yapımı",

          "dövme işi",

          "dövme lazım",

          "dövme sanatçısı",

          "dövme hizmeti",
        ],
      },
    ],
  },

  {
    id: "piercing",
    name: "Piercing",
    keywords: [
      "piercing",

      "piercing yapımı",

      "piercing işi",

      "piercing lazım",

      "piercing sanatçısı",
    ],
    subServices: [
      {
        id: "piercing-service",
        name: "Piercing yapımı",
        keywords: [
          "piercing",

          "piercing yapımı",

          "piercing işi",

          "piercing lazım",

          "piercing sanatçısı",
        ],
      },
      {
        id: "other-piercing",
        name: "Diğer (piercing ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "piercing",

          "piercing yapımı",

          "piercing işi",

          "piercing lazım",

          "piercing sanatçısı",

          "piercing hizmeti",
        ],
      },
    ],
  },

  {
    id: "barber",
    name: "Berber / Erkek Kuaförü",
    keywords: [
      "berber",

      "erkek kuaförü",

      "berber işi",

      "erkek kuaförü işi",

      "berber lazım",

      "erkek kuaförü lazım",
    ],
    subServices: [
      {
        id: "barber-service",
        name: "Berber hizmeti",
        keywords: [
          "berber",

          "erkek kuaförü",

          "berber işi",

          "erkek kuaförü işi",

          "berber lazım",

          "erkek kuaförü lazım",
        ],
      },
      {
        id: "other-barber",
        name: "Diğer (berber / erkek kuaförü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "berber",

          "erkek kuaförü",

          "berber işi",

          "erkek kuaförü işi",

          "berber lazım",

          "erkek kuaförü lazım",

          "berber hizmeti",
        ],
      },
    ],
  },

  {
    id: "nail-art",
    name: "Tırnak Sanatı",
    keywords: [
      "tırnak sanatı",

      "nail art",

      "tırnak sanatı işi",

      "nail art işi",

      "tırnak sanatı lazım",

      "nail art lazım",

      "protez tırnak",

      "protez tırnak yapımı",

      "tırnak protezi",

      "nail extension",

      "akrilik tırnak",

      "jel tırnak",

      "gel nail",

      "tırnak uzatma",

      "tırnak kaplama",

      "tırnak bakımı",

      "manikür",

      "pedikür",

      "nail salon",

      "tırnak salonu",

      "nail technician",

      "tırnak teknisyeni",
    ],
    subServices: [
      {
        id: "nail-art-service",
        name: "Tırnak sanatı hizmeti",
        keywords: [
          "tırnak sanatı",

          "nail art",

          "tırnak sanatı işi",

          "nail art işi",

          "tırnak sanatı lazım",

          "nail art lazım",

          "protez tırnak",

          "protez tırnak yapımı",

          "tırnak protezi",

          "nail extension",

          "akrilik tırnak",

          "jel tırnak",

          "gel nail",

          "tırnak uzatma",

          "tırnak kaplama",

          "tırnak bakımı",

          "manikür",

          "pedikür",

          "nail salon",

          "tırnak salonu",

          "nail technician",

          "tırnak teknisyeni",

          "tırnak tasarımı",

          "nail design",

          "french manicure",

          "fransız manikür",
        ],
      },
      {
        id: "other-nail-art",
        name: "Diğer (tırnak sanatı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tırnak sanatı",

          "nail art",

          "tırnak sanatı işi",

          "nail art işi",

          "tırnak sanatı lazım",

          "nail art lazım",

          "tırnak sanatı hizmeti",

          "protez tırnak",

          "protez tırnak yapımı",

          "tırnak protezi",

          "nail extension",

          "akrilik tırnak",

          "jel tırnak",

          "gel nail",

          "tırnak uzatma",

          "tırnak kaplama",

          "tırnak bakımı",

          "manikür",

          "pedikür",
        ],
      },
    ],
  },

  {
    id: "eyebrow-threading",
    name: "Kaş / Kirpik",
    keywords: [
      "kaş",

      "kirpik",

      "kaş alma",

      "kirpik perma",

      "kaş işi",

      "kirpik işi",

      "kaş lazım",

      "kirpik lazım",
    ],
    subServices: [
      {
        id: "eyebrow-threading-service",
        name: "Kaş / kirpik hizmeti",
        keywords: [
          "kaş",

          "kirpik",

          "kaş alma",

          "kirpik perma",

          "kaş işi",

          "kirpik işi",

          "kaş lazım",

          "kirpik lazım",
        ],
      },
      {
        id: "other-eyebrow-threading",
        name: "Diğer (kaş / kirpik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kaş",

          "kirpik",

          "kaş alma",

          "kirpik perma",

          "kaş işi",

          "kirpik işi",

          "kaş lazım",

          "kirpik lazım",

          "kaş hizmeti",
        ],
      },
    ],
  },

  {
    id: "hair-removal",
    name: "Epilasyon / Ağda",
    keywords: [
      "epilasyon",

      "ağda",

      "epilasyon işi",

      "ağda işi",

      "epilasyon lazım",

      "ağda lazım",
    ],
    subServices: [
      {
        id: "hair-removal-service",
        name: "Epilasyon / ağda hizmeti",
        keywords: [
          "epilasyon",

          "ağda",

          "epilasyon işi",

          "ağda işi",

          "epilasyon lazım",

          "ağda lazım",
        ],
      },
      {
        id: "other-hair-removal",
        name: "Diğer (epilasyon / ağda ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "epilasyon",

          "ağda",

          "epilasyon işi",

          "ağda işi",

          "epilasyon lazım",

          "ağda lazım",

          "epilasyon hizmeti",
        ],
      },
    ],
  },

  {
    id: "tanning",
    name: "Bronzlaştırma / Solaryum",
    keywords: [
      "bronzlaştırma",

      "solaryum",

      "bronzlaştırma işi",

      "solaryum işi",

      "bronzlaştırma lazım",

      "solaryum lazım",
    ],
    subServices: [
      {
        id: "tanning-service",
        name: "Bronzlaştırma / solaryum hizmeti",
        keywords: [
          "bronzlaştırma",

          "solaryum",

          "bronzlaştırma işi",

          "solaryum işi",

          "bronzlaştırma lazım",

          "solaryum lazım",
        ],
      },
      {
        id: "other-tanning",
        name: "Diğer (bronzlaştırma / solaryum ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bronzlaştırma",

          "solaryum",

          "bronzlaştırma işi",

          "solaryum işi",

          "bronzlaştırma lazım",

          "solaryum lazım",

          "bronzlaştırma hizmeti",
        ],
      },
    ],
  },

  {
    id: "fitness-equipment",
    name: "Fitness Ekipmanı Montajı",
    keywords: [
      "fitness ekipmanı",

      "spor ekipmanı",

      "fitness ekipmanı montajı",

      "spor ekipmanı montajı",

      "fitness ekipmanı işi",

      "spor ekipmanı işi",

      "fitness ekipmanı lazım",
    ],
    subServices: [
      {
        id: "fitness-equipment-installation",
        name: "Fitness ekipmanı montajı",
        keywords: [
          "fitness ekipmanı montajı",

          "spor ekipmanı montajı",

          "fitness ekipmanı kurulumu",

          "fitness ekipmanı montajı işi",

          "spor ekipmanı montajı işi",

          "fitness ekipmanı montajı lazım",
        ],
      },
      {
        id: "other-fitness-equipment",
        name: "Diğer (fitness ekipmanı montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fitness ekipmanı",

          "spor ekipmanı",

          "fitness ekipmanı montajı",

          "spor ekipmanı montajı",

          "fitness ekipmanı işi",

          "spor ekipmanı işi",

          "fitness ekipmanı lazım",

          "fitness ekipmanı hizmeti",
        ],
      },
    ],
  },

  {
    id: "bicycle-repair",
    name: "Bisiklet Tamiri",
    keywords: [
      "bisiklet tamiri",

      "bisiklet onarımı",

      "bisiklet tamiri işi",

      "bisiklet onarımı işi",

      "bisiklet tamiri lazım",

      "bisiklet onarımı lazım",

      "bisiklet usta",
    ],
    subServices: [
      {
        id: "bicycle-repair-service",
        name: "Bisiklet tamiri",
        keywords: [
          "bisiklet tamiri",

          "bisiklet onarımı",

          "bisiklet tamiri işi",

          "bisiklet onarımı işi",

          "bisiklet usta",

          "bisiklet tamiri lazım",
        ],
      },
      {
        id: "other-bicycle-repair",
        name: "Diğer (bisiklet tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bisiklet tamiri",

          "bisiklet onarımı",

          "bisiklet tamiri işi",

          "bisiklet onarımı işi",

          "bisiklet tamiri lazım",

          "bisiklet onarımı lazım",

          "bisiklet usta",

          "bisiklet tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "motorcycle-repair",
    name: "Motosiklet Tamiri",
    keywords: [
      "motosiklet tamiri",

      "motor tamiri",

      "motosiklet tamiri işi",

      "motor tamiri işi",

      "motosiklet tamiri lazım",

      "motor tamiri lazım",

      "motosiklet usta",
    ],
    subServices: [
      {
        id: "motorcycle-repair-service",
        name: "Motosiklet tamiri",
        keywords: [
          "motosiklet tamiri",

          "motor tamiri",

          "motosiklet tamiri işi",

          "motor tamiri işi",

          "motosiklet usta",

          "motosiklet tamiri lazım",
        ],
      },
      {
        id: "other-motorcycle-repair",
        name: "Diğer (motosiklet tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "motosiklet tamiri",

          "motor tamiri",

          "motosiklet tamiri işi",

          "motor tamiri işi",

          "motosiklet tamiri lazım",

          "motor tamiri lazım",

          "motosiklet usta",

          "motosiklet tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "watch-repair",
    name: "Saat Tamiri",
    keywords: [
      "saat tamiri",

      "saat onarımı",

      "saat tamiri işi",

      "saat onarımı işi",

      "saat tamiri lazım",

      "saat onarımı lazım",

      "saat usta",
    ],
    subServices: [
      {
        id: "watch-repair-service",
        name: "Saat tamiri",
        keywords: [
          "saat tamiri",

          "saat onarımı",

          "saat tamiri işi",

          "saat onarımı işi",

          "saat usta",

          "saat tamiri lazım",
        ],
      },
      {
        id: "other-watch-repair",
        name: "Diğer (saat tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "saat tamiri",

          "saat onarımı",

          "saat tamiri işi",

          "saat onarımı işi",

          "saat tamiri lazım",

          "saat onarımı lazım",

          "saat usta",

          "saat tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "key-cutting",
    name: "Anahtar Yapımı / Kopyalama",
    keywords: [
      "anahtar yapımı",

      "anahtar kopyalama",

      "anahtar yapımı işi",

      "anahtar kopyalama işi",

      "anahtar yapımı lazım",

      "anahtar kopyalama lazım",

      "anahtar usta",
    ],
    subServices: [
      {
        id: "key-cutting-service",
        name: "Anahtar yapımı / kopyalama",
        keywords: [
          "anahtar yapımı",

          "anahtar kopyalama",

          "anahtar yapımı işi",

          "anahtar kopyalama işi",

          "anahtar usta",

          "anahtar yapımı lazım",
        ],
      },
      {
        id: "other-key-cutting",
        name: "Diğer (anahtar yapımı / kopyalama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "anahtar yapımı",

          "anahtar kopyalama",

          "anahtar yapımı işi",

          "anahtar kopyalama işi",

          "anahtar yapımı lazım",

          "anahtar kopyalama lazım",

          "anahtar usta",

          "anahtar yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "shoe-repair",
    name: "Ayakkabı Tamiri",
    keywords: [
      "ayakkabı tamiri",

      "ayakkabı onarımı",

      "ayakkabı tamiri işi",

      "ayakkabı onarımı işi",

      "ayakkabı tamiri lazım",

      "ayakkabı onarımı lazım",

      "ayakkabı usta",
    ],
    subServices: [
      {
        id: "shoe-repair-service",
        name: "Ayakkabı tamiri",
        keywords: [
          "ayakkabı tamiri",

          "ayakkabı onarımı",

          "ayakkabı tamiri işi",

          "ayakkabı onarımı işi",

          "ayakkabı usta",

          "ayakkabı tamiri lazım",
        ],
      },
      {
        id: "other-shoe-repair",
        name: "Diğer (ayakkabı tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ayakkabı tamiri",

          "ayakkabı onarımı",

          "ayakkabı tamiri işi",

          "ayakkabı onarımı işi",

          "ayakkabı tamiri lazım",

          "ayakkabı onarımı lazım",

          "ayakkabı usta",

          "ayakkabı tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "umbrella-repair",
    name: "Şemsiye Tamiri",
    keywords: [
      "şemsiye tamiri",

      "şemsiye onarımı",

      "şemsiye tamiri işi",

      "şemsiye onarımı işi",

      "şemsiye tamiri lazım",

      "şemsiye onarımı lazım",

      "şemsiye usta",
    ],
    subServices: [
      {
        id: "umbrella-repair-service",
        name: "Şemsiye tamiri",
        keywords: [
          "şemsiye tamiri",

          "şemsiye onarımı",

          "şemsiye tamiri işi",

          "şemsiye onarımı işi",

          "şemsiye usta",

          "şemsiye tamiri lazım",
        ],
      },
      {
        id: "other-umbrella-repair",
        name: "Diğer (şemsiye tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "şemsiye tamiri",

          "şemsiye onarımı",

          "şemsiye tamiri işi",

          "şemsiye onarımı işi",

          "şemsiye tamiri lazım",

          "şemsiye onarımı lazım",

          "şemsiye usta",

          "şemsiye tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "bag-repair",
    name: "Çanta Tamiri",
    keywords: [
      "çanta tamiri",

      "çanta onarımı",

      "çanta tamiri işi",

      "çanta onarımı işi",

      "çanta tamiri lazım",

      "çanta onarımı lazım",

      "çanta usta",
    ],
    subServices: [
      {
        id: "bag-repair-service",
        name: "Çanta tamiri",
        keywords: [
          "çanta tamiri",

          "çanta onarımı",

          "çanta tamiri işi",

          "çanta onarımı işi",

          "çanta usta",

          "çanta tamiri lazım",
        ],
      },
      {
        id: "other-bag-repair",
        name: "Diğer (çanta tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çanta tamiri",

          "çanta onarımı",

          "çanta tamiri işi",

          "çanta onarımı işi",

          "çanta tamiri lazım",

          "çanta onarımı lazım",

          "çanta usta",

          "çanta tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "jewelry-repair",
    name: "Takı Tamiri",
    keywords: [
      "takı tamiri",

      "mücevher tamiri",

      "takı tamiri işi",

      "mücevher tamiri işi",

      "takı tamiri lazım",

      "mücevher tamiri lazım",

      "takı usta",
    ],
    subServices: [
      {
        id: "jewelry-repair-service",
        name: "Takı tamiri",
        keywords: [
          "takı tamiri",

          "mücevher tamiri",

          "takı tamiri işi",

          "mücevher tamiri işi",

          "takı usta",

          "takı tamiri lazım",
        ],
      },
      {
        id: "other-jewelry-repair",
        name: "Diğer (takı tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "takı tamiri",

          "mücevher tamiri",

          "takı tamiri işi",

          "mücevher tamiri işi",

          "takı tamiri lazım",

          "mücevher tamiri lazım",

          "takı usta",

          "takı tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "glasses-repair",
    name: "Gözlük Tamiri",
    keywords: [
      "gözlük tamiri",

      "gözlük onarımı",

      "gözlük tamiri işi",

      "gözlük onarımı işi",

      "gözlük tamiri lazım",

      "gözlük onarımı lazım",

      "gözlük usta",
    ],
    subServices: [
      {
        id: "glasses-repair-service",
        name: "Gözlük tamiri",
        keywords: [
          "gözlük tamiri",

          "gözlük onarımı",

          "gözlük tamiri işi",

          "gözlük onarımı işi",

          "gözlük usta",

          "gözlük tamiri lazım",
        ],
      },
      {
        id: "other-glasses-repair",
        name: "Diğer (gözlük tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "gözlük tamiri",

          "gözlük onarımı",

          "gözlük tamiri işi",

          "gözlük onarımı işi",

          "gözlük tamiri lazım",

          "gözlük onarımı lazım",

          "gözlük usta",

          "gözlük tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "printing",
    name: "Baskı / Matbaa",
    keywords: [
      "baskı",

      "matbaa",

      "baskı işi",

      "matbaa işi",

      "baskı lazım",

      "matbaa lazım",
    ],
    subServices: [
      {
        id: "printing-service",
        name: "Baskı / matbaa hizmeti",
        keywords: [
          "baskı",

          "matbaa",

          "baskı işi",

          "matbaa işi",

          "baskı lazım",

          "matbaa lazım",
        ],
      },
      {
        id: "other-printing",
        name: "Diğer (baskı / matbaa ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "baskı",

          "matbaa",

          "baskı işi",

          "matbaa işi",

          "baskı lazım",

          "matbaa lazım",

          "baskı hizmeti",
        ],
      },
    ],
  },

  {
    id: "signage",
    name: "Tabela / Reklam Panosu",
    keywords: [
      "tabela",

      "reklam panosu",

      "tabela yapımı",

      "reklam panosu yapımı",

      "tabela işi",

      "reklam panosu işi",

      "tabela lazım",

      "reklam panosu lazım",
    ],
    subServices: [
      {
        id: "signage-making",
        name: "Tabela / reklam panosu yapımı",
        keywords: [
          "tabela yapımı",

          "reklam panosu yapımı",

          "tabela montajı",

          "reklam panosu montajı",

          "tabela yapımı işi",

          "reklam panosu yapımı işi",

          "tabela yapımı lazım",
        ],
      },
      {
        id: "other-signage",
        name: "Diğer (tabela / reklam panosu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tabela",

          "reklam panosu",

          "tabela yapımı",

          "reklam panosu yapımı",

          "tabela işi",

          "reklam panosu işi",

          "tabela lazım",

          "reklam panosu lazım",

          "tabela hizmeti",
        ],
      },
    ],
  },

  {
    id: "engraving",
    name: "Oymacılık / Gravür",
    keywords: [
      "oymacılık",

      "gravür",

      "oymacılık işi",

      "gravür işi",

      "oymacılık lazım",

      "gravür lazım",
    ],
    subServices: [
      {
        id: "engraving-service",
        name: "Oymacılık / gravür hizmeti",
        keywords: [
          "oymacılık",

          "gravür",

          "oymacılık işi",

          "gravür işi",

          "oymacılık lazım",

          "gravür lazım",
        ],
      },
      {
        id: "other-engraving",
        name: "Diğer (oymacılık / gravür ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "oymacılık",

          "gravür",

          "oymacılık işi",

          "gravür işi",

          "oymacılık lazım",

          "gravür lazım",

          "oymacılık hizmeti",
        ],
      },
    ],
  },

  {
    id: "frame-making",
    name: "Çerçeve Yapımı",
    keywords: [
      "çerçeve yapımı",

      "çerçeve montajı",

      "çerçeve yapımı işi",

      "çerçeve montajı işi",

      "çerçeve yapımı lazım",

      "çerçeve montajı lazım",

      "çerçeve usta",
    ],
    subServices: [
      {
        id: "frame-making-service",
        name: "Çerçeve yapımı / montajı",
        keywords: [
          "çerçeve yapımı",

          "çerçeve montajı",

          "çerçeve yapımı işi",

          "çerçeve montajı işi",

          "çerçeve usta",

          "çerçeve yapımı lazım",
        ],
      },
      {
        id: "other-frame-making",
        name: "Diğer (çerçeve yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çerçeve yapımı",

          "çerçeve montajı",

          "çerçeve yapımı işi",

          "çerçeve montajı işi",

          "çerçeve yapımı lazım",

          "çerçeve montajı lazım",

          "çerçeve usta",

          "çerçeve hizmeti",
        ],
      },
    ],
  },

  {
    id: "upholstery",
    name: "Döşeme / Koltuk Tamiri",
    keywords: [
      "döşeme",

      "koltuk tamiri",

      "döşeme işi",

      "koltuk tamiri işi",

      "döşeme lazım",

      "koltuk tamiri lazım",

      "döşeme usta",
    ],
    subServices: [
      {
        id: "upholstery-service",
        name: "Döşeme / koltuk tamiri",
        keywords: [
          "döşeme",

          "koltuk tamiri",

          "döşeme işi",

          "koltuk tamiri işi",

          "döşeme usta",

          "döşeme lazım",
        ],
      },
      {
        id: "other-upholstery",
        name: "Diğer (döşeme / koltuk tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "döşeme",

          "koltuk tamiri",

          "döşeme işi",

          "koltuk tamiri işi",

          "döşeme lazım",

          "koltuk tamiri lazım",

          "döşeme usta",

          "döşeme hizmeti",
        ],
      },
    ],
  },

  {
    id: "blind-repair",
    name: "Jaluzi Tamiri",
    keywords: [
      "jaluzi tamiri",

      "jaluzi onarımı",

      "jaluzi tamiri işi",

      "jaluzi onarımı işi",

      "jaluzi tamiri lazım",

      "jaluzi onarımı lazım",

      "jaluzi usta",
    ],
    subServices: [
      {
        id: "blind-repair-service",
        name: "Jaluzi tamiri",
        keywords: [
          "jaluzi tamiri",

          "jaluzi onarımı",

          "jaluzi tamiri işi",

          "jaluzi onarımı işi",

          "jaluzi usta",

          "jaluzi tamiri lazım",
        ],
      },
      {
        id: "other-blind-repair",
        name: "Diğer (jaluzi tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "jaluzi tamiri",

          "jaluzi onarımı",

          "jaluzi tamiri işi",

          "jaluzi onarımı işi",

          "jaluzi tamiri lazım",

          "jaluzi onarımı lazım",

          "jaluzi usta",

          "jaluzi tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "curtain-repair",
    name: "Perde Tamiri",
    keywords: [
      "perde tamiri",

      "perde onarımı",

      "perde tamiri işi",

      "perde onarımı işi",

      "perde tamiri lazım",

      "perde onarımı lazım",

      "perde usta",
    ],
    subServices: [
      {
        id: "curtain-repair-service",
        name: "Perde tamiri",
        keywords: [
          "perde tamiri",

          "perde onarımı",

          "perde tamiri işi",

          "perde onarımı işi",

          "perde usta",

          "perde tamiri lazım",
        ],
      },
      {
        id: "other-curtain-repair",
        name: "Diğer (perde tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "perde tamiri",

          "perde onarımı",

          "perde tamiri işi",

          "perde onarımı işi",

          "perde tamiri lazım",

          "perde onarımı lazım",

          "perde usta",

          "perde tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "awning",
    name: "Tente / Gölgelik",
    keywords: [
      "tente",

      "gölgelik",

      "tente montajı",

      "gölgelik montajı",

      "tente işi",

      "gölgelik işi",

      "tente lazım",

      "gölgelik lazım",

      "tente usta",
    ],
    subServices: [
      {
        id: "awning-installation",
        name: "Tente / gölgelik montajı",
        keywords: [
          "tente montajı",

          "gölgelik montajı",

          "tente kurulumu",

          "gölgelik kurulumu",

          "tente montajı işi",

          "gölgelik montajı işi",

          "tente usta",

          "tente montajı lazım",
        ],
      },
      {
        id: "awning-repair",
        name: "Tente / gölgelik tamiri",
        keywords: [
          "tente tamiri",

          "gölgelik tamiri",

          "tente onarımı",

          "gölgelik onarımı",

          "tente tamir",

          "gölgelik tamir",

          "tente tamiri lazım",
        ],
      },
      {
        id: "other-awning",
        name: "Diğer (tente / gölgelik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tente",

          "gölgelik",

          "tente montajı",

          "gölgelik montajı",

          "tente işi",

          "gölgelik işi",

          "tente lazım",

          "gölgelik lazım",

          "tente usta",

          "tente hizmeti",
        ],
      },
    ],
  },

  {
    id: "garage-door",
    name: "Garaj Kapısı",
    keywords: [
      "garaj kapısı",

      "garaj kapısı montajı",

      "garaj kapısı tamiri",

      "garaj kapısı işi",

      "garaj kapısı lazım",

      "garaj kapısı usta",
    ],
    subServices: [
      {
        id: "garage-door-installation",
        name: "Garaj kapısı montajı",
        keywords: [
          "garaj kapısı montajı",

          "garaj kapısı kurulumu",

          "garaj kapısı takma",

          "garaj kapısı montajı işi",

          "garaj kapısı kurulumu işi",

          "garaj kapısı usta",

          "garaj kapısı montajı lazım",
        ],
      },
      {
        id: "garage-door-repair",
        name: "Garaj kapısı tamiri",
        keywords: [
          "garaj kapısı tamiri",

          "garaj kapısı onarımı",

          "garaj kapısı düzeltme",

          "garaj kapısı tamir",

          "garaj kapısı onarım",

          "garaj kapısı tamiri lazım",
        ],
      },
      {
        id: "other-garage-door",
        name: "Diğer (garaj kapısı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "garaj kapısı",

          "garaj kapısı montajı",

          "garaj kapısı tamiri",

          "garaj kapısı işi",

          "garaj kapısı lazım",

          "garaj kapısı usta",

          "garaj kapısı hizmeti",
        ],
      },
    ],
  },

  {
    id: "gate",
    name: "Bahçe Kapısı",
    keywords: [
      "bahçe kapısı",

      "bahçe kapısı montajı",

      "bahçe kapısı tamiri",

      "bahçe kapısı işi",

      "bahçe kapısı lazım",

      "bahçe kapısı usta",
    ],
    subServices: [
      {
        id: "gate-installation",
        name: "Bahçe kapısı montajı",
        keywords: [
          "bahçe kapısı montajı",

          "bahçe kapısı kurulumu",

          "bahçe kapısı takma",

          "bahçe kapısı montajı işi",

          "bahçe kapısı kurulumu işi",

          "bahçe kapısı usta",

          "bahçe kapısı montajı lazım",
        ],
      },
      {
        id: "gate-repair",
        name: "Bahçe kapısı tamiri",
        keywords: [
          "bahçe kapısı tamiri",

          "bahçe kapısı onarımı",

          "bahçe kapısı düzeltme",

          "bahçe kapısı tamir",

          "bahçe kapısı onarım",

          "bahçe kapısı tamiri lazım",
        ],
      },
      {
        id: "other-gate",
        name: "Diğer (bahçe kapısı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bahçe kapısı",

          "bahçe kapısı montajı",

          "bahçe kapısı tamiri",

          "bahçe kapısı işi",

          "bahçe kapısı lazım",

          "bahçe kapısı usta",

          "bahçe kapısı hizmeti",
        ],
      },
    ],
  },

  {
    id: "fence",
    name: "Çit / Parmaklık",
    keywords: [
      "çit",

      "parmaklık",

      "çit montajı",

      "parmaklık montajı",

      "çit işi",

      "parmaklık işi",

      "çit lazım",

      "parmaklık lazım",

      "çit usta",
    ],
    subServices: [
      {
        id: "fence-installation",
        name: "Çit / parmaklık montajı",
        keywords: [
          "çit montajı",

          "parmaklık montajı",

          "çit kurulumu",

          "parmaklık kurulumu",

          "çit montajı işi",

          "parmaklık montajı işi",

          "çit usta",

          "çit montajı lazım",
        ],
      },
      {
        id: "fence-repair",
        name: "Çit / parmaklık tamiri",
        keywords: [
          "çit tamiri",

          "parmaklık tamiri",

          "çit onarımı",

          "parmaklık onarımı",

          "çit tamir",

          "parmaklık tamir",

          "çit tamiri lazım",
        ],
      },
      {
        id: "other-fence",
        name: "Diğer (çit / parmaklık ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çit",

          "parmaklık",

          "çit montajı",

          "parmaklık montajı",

          "çit işi",

          "parmaklık işi",

          "çit lazım",

          "parmaklık lazım",

          "çit usta",

          "çit hizmeti",
        ],
      },
    ],
  },

  {
    id: "driveway",
    name: "Yol / Kaldırım",
    keywords: [
      "yol yapımı",

      "kaldırım yapımı",

      "yol işi",

      "kaldırım işi",

      "yol lazım",

      "kaldırım lazım",

      "yol usta",
    ],
    subServices: [
      {
        id: "driveway-construction",
        name: "Yol / kaldırım yapımı",
        keywords: [
          "yol yapımı",

          "kaldırım yapımı",

          "yol inşaatı",

          "kaldırım inşaatı",

          "yol yapımı işi",

          "kaldırım yapımı işi",

          "yol usta",

          "yol yapımı lazım",
        ],
      },
      {
        id: "driveway-repair",
        name: "Yol / kaldırım tamiri",
        keywords: [
          "yol tamiri",

          "kaldırım tamiri",

          "yol onarımı",

          "kaldırım onarımı",

          "yol tamir",

          "kaldırım tamir",

          "yol tamiri lazım",
        ],
      },
      {
        id: "other-driveway",
        name: "Diğer (yol / kaldırım ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yol yapımı",

          "kaldırım yapımı",

          "yol işi",

          "kaldırım işi",

          "yol lazım",

          "kaldırım lazım",

          "yol usta",

          "yol hizmeti",
        ],
      },
    ],
  },

  {
    id: "paving",
    name: "Parke Taşı / Kaldırım",
    keywords: [
      "parke taşı",

      "kaldırım taşı",

      "parke taşı döşeme",

      "kaldırım taşı döşeme",

      "parke taşı işi",

      "kaldırım taşı işi",

      "parke taşı lazım",

      "kaldırım taşı lazım",
    ],
    subServices: [
      {
        id: "paving-installation",
        name: "Parke taşı / kaldırım döşeme",
        keywords: [
          "parke taşı döşeme",

          "kaldırım taşı döşeme",

          "parke taşı montajı",

          "parke taşı döşeme işi",

          "kaldırım taşı döşeme işi",

          "parke taşı döşeme lazım",
        ],
      },
      {
        id: "paving-repair",
        name: "Parke taşı / kaldırım tamiri",
        keywords: [
          "parke taşı tamiri",

          "kaldırım taşı tamiri",

          "parke taşı onarımı",

          "parke taşı tamir",

          "kaldırım taşı tamir",

          "parke taşı tamiri lazım",
        ],
      },
      {
        id: "other-paving",
        name: "Diğer (parke taşı / kaldırım ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "parke taşı",

          "kaldırım taşı",

          "parke taşı döşeme",

          "kaldırım taşı döşeme",

          "parke taşı işi",

          "kaldırım taşı işi",

          "parke taşı lazım",

          "kaldırım taşı lazım",

          "parke taşı hizmeti",
        ],
      },
    ],
  },

  {
    id: "retaining-wall",
    name: "İstinat Duvarı",
    keywords: [
      "istinat duvarı",

      "istinat duvarı yapımı",

      "istinat duvarı işi",

      "istinat duvarı lazım",

      "istinat duvarı usta",
    ],
    subServices: [
      {
        id: "retaining-wall-construction",
        name: "İstinat duvarı yapımı",
        keywords: [
          "istinat duvarı yapımı",

          "istinat duvarı inşaatı",

          "istinat duvarı yapımı işi",

          "istinat duvarı inşaatı işi",

          "istinat duvarı usta",

          "istinat duvarı yapımı lazım",
        ],
      },
      {
        id: "retaining-wall-repair",
        name: "İstinat duvarı tamiri",
        keywords: [
          "istinat duvarı tamiri",

          "istinat duvarı onarımı",

          "istinat duvarı düzeltme",

          "istinat duvarı tamir",

          "istinat duvarı onarım",

          "istinat duvarı tamiri lazım",
        ],
      },
      {
        id: "other-retaining-wall",
        name: "Diğer (istinat duvarı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "istinat duvarı",

          "istinat duvarı yapımı",

          "istinat duvarı işi",

          "istinat duvarı lazım",

          "istinat duvarı usta",

          "istinat duvarı hizmeti",
        ],
      },
    ],
  },

  {
    id: "septic-tank",
    name: "Foseptik / Kanalizasyon",
    keywords: [
      "foseptik",

      "kanalizasyon",

      "foseptik yapımı",

      "kanalizasyon yapımı",

      "foseptik işi",

      "kanalizasyon işi",

      "foseptik lazım",

      "kanalizasyon lazım",
    ],
    subServices: [
      {
        id: "septic-tank-construction",
        name: "Foseptik / kanalizasyon yapımı",
        keywords: [
          "foseptik yapımı",

          "kanalizasyon yapımı",

          "foseptik inşaatı",

          "kanalizasyon inşaatı",

          "foseptik yapımı işi",

          "kanalizasyon yapımı işi",

          "foseptik yapımı lazım",
        ],
      },
      {
        id: "septic-tank-cleaning",
        name: "Foseptik / kanalizasyon temizliği",
        keywords: [
          "foseptik temizliği",

          "kanalizasyon temizliği",

          "foseptik boşaltma",

          "foseptik temizliği işi",

          "kanalizasyon temizliği işi",

          "foseptik temizliği lazım",
        ],
      },
      {
        id: "other-septic-tank",
        name: "Diğer (foseptik / kanalizasyon ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "foseptik",

          "kanalizasyon",

          "foseptik yapımı",

          "kanalizasyon yapımı",

          "foseptik işi",

          "kanalizasyon işi",

          "foseptik lazım",

          "kanalizasyon lazım",

          "foseptik hizmeti",
        ],
      },
    ],
  },

  {
    id: "well-drilling",
    name: "Kuyu Açma",
    keywords: [
      "kuyu açma",

      "kuyu kazma",

      "kuyu açma işi",

      "kuyu kazma işi",

      "kuyu açma lazım",

      "kuyu kazma lazım",

      "kuyu usta",
    ],
    subServices: [
      {
        id: "well-drilling-service",
        name: "Kuyu açma / kazma",
        keywords: [
          "kuyu açma",

          "kuyu kazma",

          "kuyu açma işi",

          "kuyu kazma işi",

          "kuyu usta",

          "kuyu açma lazım",
        ],
      },
      {
        id: "other-well-drilling",
        name: "Diğer (kuyu açma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kuyu açma",

          "kuyu kazma",

          "kuyu açma işi",

          "kuyu kazma işi",

          "kuyu açma lazım",

          "kuyu kazma lazım",

          "kuyu usta",

          "kuyu açma hizmeti",
        ],
      },
    ],
  },

  {
    id: "water-well",
    name: "Su Kuyusu",
    keywords: [
      "su kuyusu",

      "su kuyusu açma",

      "su kuyusu işi",

      "su kuyusu açma işi",

      "su kuyusu lazım",

      "su kuyusu açma lazım",

      "su kuyusu usta",
    ],
    subServices: [
      {
        id: "water-well-service",
        name: "Su kuyusu açma",
        keywords: [
          "su kuyusu açma",

          "su kuyusu kazma",

          "su kuyusu açma işi",

          "su kuyusu kazma işi",

          "su kuyusu usta",

          "su kuyusu açma lazım",
        ],
      },
      {
        id: "other-water-well",
        name: "Diğer (su kuyusu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su kuyusu",

          "su kuyusu açma",

          "su kuyusu işi",

          "su kuyusu açma işi",

          "su kuyusu lazım",

          "su kuyusu açma lazım",

          "su kuyusu usta",

          "su kuyusu hizmeti",
        ],
      },
    ],
  },

  {
    id: "music-lessons",
    name: "Müzik Dersi",
    keywords: [
      "müzik dersi",

      "müzik öğretmeni",

      "müzik dersi işi",

      "müzik öğretmeni işi",

      "müzik dersi lazım",

      "müzik öğretmeni lazım",
    ],
    subServices: [
      {
        id: "music-lessons-service",
        name: "Müzik dersi hizmeti",
        keywords: [
          "müzik dersi",

          "müzik öğretmeni",

          "müzik dersi işi",

          "müzik öğretmeni işi",

          "müzik dersi lazım",

          "müzik öğretmeni lazım",
        ],
      },
      {
        id: "other-music-lessons",
        name: "Diğer (müzik dersi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "müzik dersi",

          "müzik öğretmeni",

          "müzik dersi işi",

          "müzik öğretmeni işi",

          "müzik dersi lazım",

          "müzik öğretmeni lazım",

          "müzik dersi hizmeti",
        ],
      },
    ],
  },

  {
    id: "dance-lessons",
    name: "Dans Dersi",
    keywords: [
      "dans dersi",

      "dans öğretmeni",

      "dans dersi işi",

      "dans öğretmeni işi",

      "dans dersi lazım",

      "dans öğretmeni lazım",
    ],
    subServices: [
      {
        id: "dance-lessons-service",
        name: "Dans dersi hizmeti",
        keywords: [
          "dans dersi",

          "dans öğretmeni",

          "dans dersi işi",

          "dans öğretmeni işi",

          "dans dersi lazım",

          "dans öğretmeni lazım",
        ],
      },
      {
        id: "other-dance-lessons",
        name: "Diğer (dans dersi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dans dersi",

          "dans öğretmeni",

          "dans dersi işi",

          "dans öğretmeni işi",

          "dans dersi lazım",

          "dans öğretmeni lazım",

          "dans dersi hizmeti",
        ],
      },
    ],
  },

  {
    id: "driving-lessons",
    name: "Sürücü Kursu / Direksiyon",
    keywords: [
      "sürücü kursu",

      "direksiyon",

      "sürücü kursu işi",

      "direksiyon işi",

      "sürücü kursu lazım",

      "direksiyon lazım",

      "direksiyon öğretmeni",
    ],
    subServices: [
      {
        id: "driving-lessons-service",
        name: "Sürücü kursu / direksiyon hizmeti",
        keywords: [
          "sürücü kursu",

          "direksiyon",

          "sürücü kursu işi",

          "direksiyon işi",

          "direksiyon öğretmeni",

          "sürücü kursu lazım",
        ],
      },
      {
        id: "other-driving-lessons",
        name: "Diğer (sürücü kursu / direksiyon ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "sürücü kursu",

          "direksiyon",

          "sürücü kursu işi",

          "direksiyon işi",

          "sürücü kursu lazım",

          "direksiyon lazım",

          "direksiyon öğretmeni",

          "sürücü kursu hizmeti",
        ],
      },
    ],
  },

  {
    id: "language-lessons",
    name: "Dil Kursu",
    keywords: [
      "dil kursu",

      "yabancı dil",

      "dil kursu işi",

      "yabancı dil işi",

      "dil kursu lazım",

      "yabancı dil lazım",

      "dil öğretmeni",
    ],
    subServices: [
      {
        id: "language-lessons-service",
        name: "Dil kursu hizmeti",
        keywords: [
          "dil kursu",

          "yabancı dil",

          "dil kursu işi",

          "yabancı dil işi",

          "dil öğretmeni",

          "dil kursu lazım",
        ],
      },
      {
        id: "other-language-lessons",
        name: "Diğer (dil kursu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dil kursu",

          "yabancı dil",

          "dil kursu işi",

          "yabancı dil işi",

          "dil kursu lazım",

          "yabancı dil lazım",

          "dil öğretmeni",

          "dil kursu hizmeti",
        ],
      },
    ],
  },

  {
    id: "cooking-lessons",
    name: "Yemek Kursu / Aşçılık",
    keywords: [
      "yemek kursu",

      "aşçılık kursu",

      "yemek kursu işi",

      "aşçılık kursu işi",

      "yemek kursu lazım",

      "aşçılık kursu lazım",

      "yemek öğretmeni",
    ],
    subServices: [
      {
        id: "cooking-lessons-service",
        name: "Yemek kursu / aşçılık hizmeti",
        keywords: [
          "yemek kursu",

          "aşçılık kursu",

          "yemek kursu işi",

          "aşçılık kursu işi",

          "yemek öğretmeni",

          "yemek kursu lazım",
        ],
      },
      {
        id: "other-cooking-lessons",
        name: "Diğer (yemek kursu / aşçılık ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yemek kursu",

          "aşçılık kursu",

          "yemek kursu işi",

          "aşçılık kursu işi",

          "yemek kursu lazım",

          "aşçılık kursu lazım",

          "yemek öğretmeni",

          "yemek kursu hizmeti",
        ],
      },
    ],
  },

  {
    id: "sewing",
    name: "Dikiş / Terzi",
    keywords: [
      "dikiş",

      "terzi",

      "dikiş işi",

      "terzi işi",

      "dikiş lazım",

      "terzi lazım",
    ],
    subServices: [
      {
        id: "sewing-service",
        name: "Dikiş / terzi hizmeti",
        keywords: [
          "dikiş",

          "terzi",

          "dikiş işi",

          "terzi işi",

          "dikiş lazım",

          "terzi lazım",
        ],
      },
      {
        id: "other-sewing",
        name: "Diğer (dikiş / terzi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dikiş",

          "terzi",

          "dikiş işi",

          "terzi işi",

          "dikiş lazım",

          "terzi lazım",

          "dikiş hizmeti",
        ],
      },
    ],
  },

  {
    id: "tailoring",
    name: "Elbise Dikimi / Terzilik",
    keywords: [
      "elbise dikimi",

      "terzilik",

      "elbise dikimi işi",

      "terzilik işi",

      "elbise dikimi lazım",

      "terzilik lazım",

      "terzi",
    ],
    subServices: [
      {
        id: "tailoring-service",
        name: "Elbise dikimi / terzilik hizmeti",
        keywords: [
          "elbise dikimi",

          "terzilik",

          "elbise dikimi işi",

          "terzilik işi",

          "terzi",

          "elbise dikimi lazım",
        ],
      },
      {
        id: "other-tailoring",
        name: "Diğer (elbise dikimi / terzilik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "elbise dikimi",

          "terzilik",

          "elbise dikimi işi",

          "terzilik işi",

          "elbise dikimi lazım",

          "terzilik lazım",

          "terzi",

          "elbise dikimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "alteration",
    name: "Kıyafet Düzeltme / Daraltma",
    keywords: [
      "kıyafet düzeltme",

      "daraltma",

      "kıyafet düzeltme işi",

      "daraltma işi",

      "kıyafet düzeltme lazım",

      "daraltma lazım",

      "terzi",
    ],
    subServices: [
      {
        id: "alteration-service",
        name: "Kıyafet düzeltme / daraltma hizmeti",
        keywords: [
          "kıyafet düzeltme",

          "daraltma",

          "kıyafet düzeltme işi",

          "daraltma işi",

          "terzi",

          "kıyafet düzeltme lazım",
        ],
      },
      {
        id: "other-alteration",
        name: "Diğer (kıyafet düzeltme / daraltma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kıyafet düzeltme",

          "daraltma",

          "kıyafet düzeltme işi",

          "daraltma işi",

          "kıyafet düzeltme lazım",

          "daraltma lazım",

          "terzi",

          "kıyafet düzeltme hizmeti",
        ],
      },
    ],
  },

  {
    id: "dry-cleaning",
    name: "Kuru Temizleme",
    keywords: [
      "kuru temizleme",

      "kuru temizleme işi",

      "kuru temizleme lazım",

      "kuru temizleme servisi",
    ],
    subServices: [
      {
        id: "dry-cleaning-service",
        name: "Kuru temizleme hizmeti",
        keywords: [
          "kuru temizleme",

          "kuru temizleme işi",

          "kuru temizleme lazım",

          "kuru temizleme servisi",
        ],
      },
      {
        id: "other-dry-cleaning",
        name: "Diğer (kuru temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kuru temizleme",

          "kuru temizleme işi",

          "kuru temizleme lazım",

          "kuru temizleme servisi",

          "kuru temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "shoe-shine",
    name: "Ayakkabı Boyama",
    keywords: [
      "ayakkabı boyama",

      "ayakkabı boyama işi",

      "ayakkabı boyama lazım",

      "ayakkabı boyacı",
    ],
    subServices: [
      {
        id: "shoe-shine-service",
        name: "Ayakkabı boyama hizmeti",
        keywords: [
          "ayakkabı boyama",

          "ayakkabı boyama işi",

          "ayakkabı boyama lazım",

          "ayakkabı boyacı",
        ],
      },
      {
        id: "other-shoe-shine",
        name: "Diğer (ayakkabı boyama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ayakkabı boyama",

          "ayakkabı boyama işi",

          "ayakkabı boyama lazım",

          "ayakkabı boyacı",

          "ayakkabı boyama hizmeti",
        ],
      },
    ],
  },

  {
    id: "keyboard-repair",
    name: "Klavye / Piyano Tamiri",
    keywords: [
      "klavye tamiri",

      "piyano tamiri",

      "klavye tamiri işi",

      "piyano tamiri işi",

      "klavye tamiri lazım",

      "piyano tamiri lazım",

      "klavye usta",
    ],
    subServices: [
      {
        id: "keyboard-repair-service",
        name: "Klavye / piyano tamiri",
        keywords: [
          "klavye tamiri",

          "piyano tamiri",

          "klavye tamiri işi",

          "piyano tamiri işi",

          "klavye usta",

          "klavye tamiri lazım",
        ],
      },
      {
        id: "other-keyboard-repair",
        name: "Diğer (klavye / piyano tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "klavye tamiri",

          "piyano tamiri",

          "klavye tamiri işi",

          "piyano tamiri işi",

          "klavye tamiri lazım",

          "piyano tamiri lazım",

          "klavye usta",

          "klavye tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "instrument-repair",
    name: "Müzik Aleti Tamiri",
    keywords: [
      "müzik aleti tamiri",

      "müzik aleti onarımı",

      "müzik aleti tamiri işi",

      "müzik aleti onarımı işi",

      "müzik aleti tamiri lazım",

      "müzik aleti usta",
    ],
    subServices: [
      {
        id: "instrument-repair-service",
        name: "Müzik aleti tamiri",
        keywords: [
          "müzik aleti tamiri",

          "müzik aleti onarımı",

          "müzik aleti tamiri işi",

          "müzik aleti onarımı işi",

          "müzik aleti usta",

          "müzik aleti tamiri lazım",
        ],
      },
      {
        id: "other-instrument-repair",
        name: "Diğer (müzik aleti tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "müzik aleti tamiri",

          "müzik aleti onarımı",

          "müzik aleti tamiri işi",

          "müzik aleti onarımı işi",

          "müzik aleti tamiri lazım",

          "müzik aleti usta",

          "müzik aleti tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "bookbinding",
    name: "Ciltleme / Kitap Tamiri",
    keywords: [
      "ciltleme",

      "kitap tamiri",

      "ciltleme işi",

      "kitap tamiri işi",

      "ciltleme lazım",

      "kitap tamiri lazım",

      "ciltleme usta",
    ],
    subServices: [
      {
        id: "bookbinding-service",
        name: "Ciltleme / kitap tamiri hizmeti",
        keywords: [
          "ciltleme",

          "kitap tamiri",

          "ciltleme işi",

          "kitap tamiri işi",

          "ciltleme usta",

          "ciltleme lazım",
        ],
      },
      {
        id: "other-bookbinding",
        name: "Diğer (ciltleme / kitap tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ciltleme",

          "kitap tamiri",

          "ciltleme işi",

          "kitap tamiri işi",

          "ciltleme lazım",

          "kitap tamiri lazım",

          "ciltleme usta",

          "ciltleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "frame-repair",
    name: "Çerçeve Tamiri",
    keywords: [
      "çerçeve tamiri",

      "çerçeve onarımı",

      "çerçeve tamiri işi",

      "çerçeve onarımı işi",

      "çerçeve tamiri lazım",

      "çerçeve onarımı lazım",

      "çerçeve usta",
    ],
    subServices: [
      {
        id: "frame-repair-service",
        name: "Çerçeve tamiri",
        keywords: [
          "çerçeve tamiri",

          "çerçeve onarımı",

          "çerçeve tamiri işi",

          "çerçeve onarımı işi",

          "çerçeve usta",

          "çerçeve tamiri lazım",
        ],
      },
      {
        id: "other-frame-repair",
        name: "Diğer (çerçeve tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çerçeve tamiri",

          "çerçeve onarımı",

          "çerçeve tamiri işi",

          "çerçeve onarımı işi",

          "çerçeve tamiri lazım",

          "çerçeve onarımı lazım",

          "çerçeve usta",

          "çerçeve tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "appliance-installation",
    name: "Beyaz Eşya Montajı",
    keywords: [
      "beyaz eşya montajı",

      "beyaz eşya kurulumu",

      "beyaz eşya montajı işi",

      "beyaz eşya kurulumu işi",

      "beyaz eşya montajı lazım",

      "beyaz eşya usta",
    ],
    subServices: [
      {
        id: "appliance-installation-service",
        name: "Beyaz eşya montajı / kurulumu",
        keywords: [
          "beyaz eşya montajı",

          "beyaz eşya kurulumu",

          "beyaz eşya takma",

          "beyaz eşya montajı işi",

          "beyaz eşya kurulumu işi",

          "beyaz eşya usta",

          "beyaz eşya montajı lazım",
        ],
      },
      {
        id: "other-appliance-installation",
        name: "Diğer (beyaz eşya montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "beyaz eşya montajı",

          "beyaz eşya kurulumu",

          "beyaz eşya montajı işi",

          "beyaz eşya kurulumu işi",

          "beyaz eşya montajı lazım",

          "beyaz eşya usta",

          "beyaz eşya montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "tv-mounting",
    name: "TV Montajı / Duvara Asma",
    keywords: [
      "tv montajı",

      "tv duvara asma",

      "tv montajı işi",

      "tv duvara asma işi",

      "tv montajı lazım",

      "tv duvara asma lazım",

      "tv montajı usta",
    ],
    subServices: [
      {
        id: "tv-mounting-service",
        name: "TV montajı / duvara asma",
        keywords: [
          "tv montajı",

          "tv duvara asma",

          "tv takma",

          "tv montajı işi",

          "tv duvara asma işi",

          "tv montajı usta",

          "tv montajı lazım",
        ],
      },
      {
        id: "other-tv-mounting",
        name: "Diğer (TV montajı / duvara asma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tv montajı",

          "tv duvara asma",

          "tv montajı işi",

          "tv duvara asma işi",

          "tv montajı lazım",

          "tv duvara asma lazım",

          "tv montajı usta",

          "tv montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "shelving",
    name: "Raf / Askılık Montajı",
    keywords: [
      "raf montajı",

      "askılık montajı",

      "raf montajı işi",

      "askılık montajı işi",

      "raf montajı lazım",

      "askılık montajı lazım",

      "raf usta",
    ],
    subServices: [
      {
        id: "shelving-service",
        name: "Raf / askılık montajı",
        keywords: [
          "raf montajı",

          "askılık montajı",

          "raf takma",

          "askılık takma",

          "raf montajı işi",

          "askılık montajı işi",

          "raf usta",

          "raf montajı lazım",
        ],
      },
      {
        id: "other-shelving",
        name: "Diğer (raf / askılık montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "raf montajı",

          "askılık montajı",

          "raf montajı işi",

          "askılık montajı işi",

          "raf montajı lazım",

          "askılık montajı lazım",

          "raf usta",

          "raf montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "mirror-installation",
    name: "Ayna Montajı",
    keywords: [
      "ayna montajı",

      "ayna takma",

      "ayna montajı işi",

      "ayna takma işi",

      "ayna montajı lazım",

      "ayna takma lazım",

      "ayna usta",
    ],
    subServices: [
      {
        id: "mirror-installation-service",
        name: "Ayna montajı / takma",
        keywords: [
          "ayna montajı",

          "ayna takma",

          "ayna kurulumu",

          "ayna montajı işi",

          "ayna takma işi",

          "ayna usta",

          "ayna montajı lazım",
        ],
      },
      {
        id: "other-mirror-installation",
        name: "Diğer (ayna montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ayna montajı",

          "ayna takma",

          "ayna montajı işi",

          "ayna takma işi",

          "ayna montajı lazım",

          "ayna takma lazım",

          "ayna usta",

          "ayna montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "picture-hanging",
    name: "Tablo / Resim Asma",
    keywords: [
      "tablo asma",

      "resim asma",

      "tablo asma işi",

      "resim asma işi",

      "tablo asma lazım",

      "resim asma lazım",

      "tablo usta",
    ],
    subServices: [
      {
        id: "picture-hanging-service",
        name: "Tablo / resim asma hizmeti",
        keywords: [
          "tablo asma",

          "resim asma",

          "tablo asma işi",

          "resim asma işi",

          "tablo usta",

          "tablo asma lazım",
        ],
      },
      {
        id: "other-picture-hanging",
        name: "Diğer (tablo / resim asma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tablo asma",

          "resim asma",

          "tablo asma işi",

          "resim asma işi",

          "tablo asma lazım",

          "resim asma lazım",

          "tablo usta",

          "tablo asma hizmeti",
        ],
      },
    ],
  },

  {
    id: "furniture-moving",
    name: "Eşya Taşıma / Yerleştirme",
    keywords: [
      "eşya taşıma",

      "eşya yerleştirme",

      "eşya taşıma işi",

      "eşya yerleştirme işi",

      "eşya taşıma lazım",

      "eşya yerleştirme lazım",

      "eşya taşıma usta",
    ],
    subServices: [
      {
        id: "furniture-moving-service",
        name: "Eşya taşıma / yerleştirme hizmeti",
        keywords: [
          "eşya taşıma",

          "eşya yerleştirme",

          "eşya taşıma işi",

          "eşya yerleştirme işi",

          "eşya taşıma usta",

          "eşya taşıma lazım",
        ],
      },
      {
        id: "other-furniture-moving",
        name: "Diğer (eşya taşıma / yerleştirme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "eşya taşıma",

          "eşya yerleştirme",

          "eşya taşıma işi",

          "eşya yerleştirme işi",

          "eşya taşıma lazım",

          "eşya yerleştirme lazım",

          "eşya taşıma usta",

          "eşya taşıma hizmeti",
        ],
      },
    ],
  },

  {
    id: "assembly-service",
    name: "Montaj Hizmeti (Genel)",
    keywords: [
      "montaj hizmeti",

      "montaj işi",

      "montaj lazım",

      "montaj usta",

      "kurulum hizmeti",
    ],
    subServices: [
      {
        id: "assembly-service-general",
        name: "Genel montaj hizmeti",
        keywords: [
          "montaj hizmeti",

          "montaj işi",

          "montaj lazım",

          "montaj usta",

          "kurulum hizmeti",
        ],
      },
      {
        id: "other-assembly-service",
        name: "Diğer (montaj hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "montaj hizmeti",

          "montaj işi",

          "montaj lazım",

          "montaj usta",

          "kurulum hizmeti",
        ],
      },
    ],
  },

  {
    id: "plumbing-emergency",
    name: "Acil Tesisatçı",
    keywords: [
      "acil tesisatçı",

      "acil su tesisatçı",

      "acil tesisat",

      "acil tesisatçı lazım",

      "acil su tesisatçı lazım",

      "acil tesisat lazım",

      "acil tesisatçı usta",
    ],
    subServices: [
      {
        id: "plumbing-emergency-service",
        name: "Acil tesisatçı hizmeti",
        keywords: [
          "acil tesisatçı",

          "acil su tesisatçı",

          "acil tesisat",

          "acil tesisatçı işi",

          "acil su tesisatçı işi",

          "acil tesisatçı usta",

          "acil tesisatçı lazım",
        ],
      },
      {
        id: "other-plumbing-emergency",
        name: "Diğer (acil tesisatçı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "acil tesisatçı",

          "acil su tesisatçı",

          "acil tesisat",

          "acil tesisatçı lazım",

          "acil su tesisatçı lazım",

          "acil tesisat lazım",

          "acil tesisatçı usta",

          "acil tesisatçı hizmeti",
        ],
      },
    ],
  },

  {
    id: "electrician-emergency",
    name: "Acil Elektrikçi",
    keywords: [
      "acil elektrikçi",

      "acil elektrik",

      "acil elektrikçi lazım",

      "acil elektrik lazım",

      "acil elektrikçi usta",

      "acil elektrik işi",
    ],
    subServices: [
      {
        id: "electrician-emergency-service",
        name: "Acil elektrikçi hizmeti",
        keywords: [
          "acil elektrikçi",

          "acil elektrik",

          "acil elektrikçi işi",

          "acil elektrik işi",

          "acil elektrikçi usta",

          "acil elektrikçi lazım",
        ],
      },
      {
        id: "other-electrician-emergency",
        name: "Diğer (acil elektrikçi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "acil elektrikçi",

          "acil elektrik",

          "acil elektrikçi lazım",

          "acil elektrik lazım",

          "acil elektrikçi usta",

          "acil elektrik işi",

          "acil elektrikçi hizmeti",
        ],
      },
    ],
  },

  {
    id: "handyman",
    name: "Tamirci / Usta (Genel)",
    keywords: [
      "tamirci",

      "usta",

      "tamirci lazım",

      "usta lazım",

      "tamirci işi",

      "usta işi",

      "her işi yapan usta",

      "çok iş yapan usta",
    ],
    subServices: [
      {
        id: "handyman-service",
        name: "Genel tamirci / usta hizmeti",
        keywords: [
          "tamirci",

          "usta",

          "tamirci lazım",

          "usta lazım",

          "tamirci işi",

          "usta işi",

          "her işi yapan usta",

          "çok iş yapan usta",
        ],
      },
      {
        id: "other-handyman",
        name: "Diğer (tamirci / usta ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tamirci",

          "usta",

          "tamirci lazım",

          "usta lazım",

          "tamirci işi",

          "usta işi",

          "her işi yapan usta",

          "çok iş yapan usta",

          "tamirci hizmeti",
        ],
      },
    ],
  },

  {
    id: "home-inspection",
    name: "Ev Muayenesi / Kontrol",
    keywords: [
      "ev muayenesi",

      "ev kontrolü",

      "ev muayenesi işi",

      "ev kontrolü işi",

      "ev muayenesi lazım",

      "ev kontrolü lazım",

      "ev muayenesi uzmanı",
    ],
    subServices: [
      {
        id: "home-inspection-service",
        name: "Ev muayenesi / kontrol hizmeti",
        keywords: [
          "ev muayenesi",

          "ev kontrolü",

          "ev muayenesi işi",

          "ev kontrolü işi",

          "ev muayenesi uzmanı",

          "ev muayenesi lazım",
        ],
      },
      {
        id: "other-home-inspection",
        name: "Diğer (ev muayenesi / kontrol ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ev muayenesi",

          "ev kontrolü",

          "ev muayenesi işi",

          "ev kontrolü işi",

          "ev muayenesi lazım",

          "ev kontrolü lazım",

          "ev muayenesi uzmanı",

          "ev muayenesi hizmeti",
        ],
      },
    ],
  },

  {
    id: "energy-audit",
    name: "Enerji Verimliliği / İzolasyon Kontrolü",
    keywords: [
      "enerji verimliliği",

      "izolasyon kontrolü",

      "enerji verimliliği işi",

      "izolasyon kontrolü işi",

      "enerji verimliliği lazım",

      "izolasyon kontrolü lazım",
    ],
    subServices: [
      {
        id: "energy-audit-service",
        name: "Enerji verimliliği / izolasyon kontrolü hizmeti",
        keywords: [
          "enerji verimliliği",

          "izolasyon kontrolü",

          "enerji verimliliği işi",

          "izolasyon kontrolü işi",

          "enerji verimliliği lazım",
        ],
      },
      {
        id: "other-energy-audit",
        name: "Diğer (enerji verimliliği / izolasyon kontrolü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "enerji verimliliği",

          "izolasyon kontrolü",

          "enerji verimliliği işi",

          "izolasyon kontrolü işi",

          "enerji verimliliği lazım",

          "izolasyon kontrolü lazım",

          "enerji verimliliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "pest-inspection",
    name: "Haşere Kontrolü / İnceleme",
    keywords: [
      "haşere kontrolü",

      "haşere inceleme",

      "haşere kontrolü işi",

      "haşere inceleme işi",

      "haşere kontrolü lazım",

      "haşere inceleme lazım",

      "haşere kontrolü uzmanı",
    ],
    subServices: [
      {
        id: "pest-inspection-service",
        name: "Haşere kontrolü / inceleme hizmeti",
        keywords: [
          "haşere kontrolü",

          "haşere inceleme",

          "haşere kontrolü işi",

          "haşere inceleme işi",

          "haşere kontrolü uzmanı",

          "haşere kontrolü lazım",
        ],
      },
      {
        id: "other-pest-inspection",
        name: "Diğer (haşere kontrolü / inceleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "haşere kontrolü",

          "haşere inceleme",

          "haşere kontrolü işi",

          "haşere inceleme işi",

          "haşere kontrolü lazım",

          "haşere inceleme lazım",

          "haşere kontrolü uzmanı",

          "haşere kontrolü hizmeti",
        ],
      },
    ],
  },

  {
    id: "roof-inspection",
    name: "Çatı Kontrolü / İnceleme",
    keywords: [
      "çatı kontrolü",

      "çatı inceleme",

      "çatı kontrolü işi",

      "çatı inceleme işi",

      "çatı kontrolü lazım",

      "çatı inceleme lazım",

      "çatı kontrolü uzmanı",
    ],
    subServices: [
      {
        id: "roof-inspection-service",
        name: "Çatı kontrolü / inceleme hizmeti",
        keywords: [
          "çatı kontrolü",

          "çatı inceleme",

          "çatı kontrolü işi",

          "çatı inceleme işi",

          "çatı kontrolü uzmanı",

          "çatı kontrolü lazım",
        ],
      },
      {
        id: "other-roof-inspection",
        name: "Diğer (çatı kontrolü / inceleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çatı kontrolü",

          "çatı inceleme",

          "çatı kontrolü işi",

          "çatı inceleme işi",

          "çatı kontrolü lazım",

          "çatı inceleme lazım",

          "çatı kontrolü uzmanı",

          "çatı kontrolü hizmeti",
        ],
      },
    ],
  },

  {
    id: "mold-removal",
    name: "Küf Temizleme",
    keywords: [
      "küf temizleme",

      "küf temizliği",

      "küf temizleme işi",

      "küf temizliği işi",

      "küf temizleme lazım",

      "küf temizliği lazım",

      "küf temizleme usta",
    ],
    subServices: [
      {
        id: "mold-removal-service",
        name: "Küf temizleme hizmeti",
        keywords: [
          "küf temizleme",

          "küf temizliği",

          "küf temizleme işi",

          "küf temizliği işi",

          "küf temizleme usta",

          "küf temizleme lazım",
        ],
      },
      {
        id: "other-mold-removal",
        name: "Diğer (küf temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "küf temizleme",

          "küf temizliği",

          "küf temizleme işi",

          "küf temizliği işi",

          "küf temizleme lazım",

          "küf temizliği lazım",

          "küf temizleme usta",

          "küf temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "water-damage",
    name: "Su Hasarı Temizliği",
    keywords: [
      "su hasarı",

      "su hasarı temizliği",

      "su hasarı işi",

      "su hasarı temizliği işi",

      "su hasarı lazım",

      "su hasarı temizliği lazım",

      "su hasarı usta",
    ],
    subServices: [
      {
        id: "water-damage-service",
        name: "Su hasarı temizliği hizmeti",
        keywords: [
          "su hasarı",

          "su hasarı temizliği",

          "su hasarı işi",

          "su hasarı temizliği işi",

          "su hasarı usta",

          "su hasarı lazım",
        ],
      },
      {
        id: "other-water-damage",
        name: "Diğer (su hasarı temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su hasarı",

          "su hasarı temizliği",

          "su hasarı işi",

          "su hasarı temizliği işi",

          "su hasarı lazım",

          "su hasarı temizliği lazım",

          "su hasarı usta",

          "su hasarı hizmeti",
        ],
      },
    ],
  },

  {
    id: "fire-damage",
    name: "Yangın Hasarı Temizliği",
    keywords: [
      "yangın hasarı",

      "yangın hasarı temizliği",

      "yangın hasarı işi",

      "yangın hasarı temizliği işi",

      "yangın hasarı lazım",

      "yangın hasarı temizliği lazım",
    ],
    subServices: [
      {
        id: "fire-damage-service",
        name: "Yangın hasarı temizliği hizmeti",
        keywords: [
          "yangın hasarı",

          "yangın hasarı temizliği",

          "yangın hasarı işi",

          "yangın hasarı temizliği işi",

          "yangın hasarı lazım",
        ],
      },
      {
        id: "other-fire-damage",
        name: "Diğer (yangın hasarı temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yangın hasarı",

          "yangın hasarı temizliği",

          "yangın hasarı işi",

          "yangın hasarı temizliği işi",

          "yangın hasarı lazım",

          "yangın hasarı temizliği lazım",

          "yangın hasarı hizmeti",
        ],
      },
    ],
  },

  {
    id: "smoke-damage",
    name: "Duman Hasarı Temizliği",
    keywords: [
      "duman hasarı",

      "duman hasarı temizliği",

      "duman hasarı işi",

      "duman hasarı temizliği işi",

      "duman hasarı lazım",

      "duman hasarı temizliği lazım",
    ],
    subServices: [
      {
        id: "smoke-damage-service",
        name: "Duman hasarı temizliği hizmeti",
        keywords: [
          "duman hasarı",

          "duman hasarı temizliği",

          "duman hasarı işi",

          "duman hasarı temizliği işi",

          "duman hasarı lazım",
        ],
      },
      {
        id: "other-smoke-damage",
        name: "Diğer (duman hasarı temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "duman hasarı",

          "duman hasarı temizliği",

          "duman hasarı işi",

          "duman hasarı temizliği işi",

          "duman hasarı lazım",

          "duman hasarı temizliği lazım",

          "duman hasarı hizmeti",
        ],
      },
    ],
  },

  {
    id: "odor-removal",
    name: "Koku Giderme",
    keywords: [
      "koku giderme",

      "koku temizleme",

      "koku giderme işi",

      "koku temizleme işi",

      "koku giderme lazım",

      "koku temizleme lazım",

      "koku giderme usta",
    ],
    subServices: [
      {
        id: "odor-removal-service",
        name: "Koku giderme hizmeti",
        keywords: [
          "koku giderme",

          "koku temizleme",

          "koku giderme işi",

          "koku temizleme işi",

          "koku giderme usta",

          "koku giderme lazım",
        ],
      },
      {
        id: "other-odor-removal",
        name: "Diğer (koku giderme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "koku giderme",

          "koku temizleme",

          "koku giderme işi",

          "koku temizleme işi",

          "koku giderme lazım",

          "koku temizleme lazım",

          "koku giderme usta",

          "koku giderme hizmeti",
        ],
      },
    ],
  },

  {
    id: "carpet-stretching",
    name: "Halı Germe",
    keywords: [
      "halı germe",

      "halı germe işi",

      "halı germe lazım",

      "halı germe usta",
    ],
    subServices: [
      {
        id: "carpet-stretching-service",
        name: "Halı germe hizmeti",
        keywords: [
          "halı germe",

          "halı germe işi",

          "halı germe usta",

          "halı germe lazım",
        ],
      },
      {
        id: "other-carpet-stretching",
        name: "Diğer (halı germe ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "halı germe",

          "halı germe işi",

          "halı germe lazım",

          "halı germe usta",

          "halı germe hizmeti",
        ],
      },
    ],
  },

  {
    id: "upholstery-cleaning",
    name: "Döşeme Temizliği",
    keywords: [
      "döşeme temizliği",

      "döşeme yıkama",

      "döşeme temizliği işi",

      "döşeme yıkama işi",

      "döşeme temizliği lazım",

      "döşeme yıkama lazım",

      "döşeme temizlikçi",
    ],
    subServices: [
      {
        id: "upholstery-cleaning-service",
        name: "Döşeme temizliği hizmeti",
        keywords: [
          "döşeme temizliği",

          "döşeme yıkama",

          "döşeme temizliği işi",

          "döşeme yıkama işi",

          "döşeme temizlikçi",

          "döşeme temizliği lazım",
        ],
      },
      {
        id: "other-upholstery-cleaning",
        name: "Diğer (döşeme temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "döşeme temizliği",

          "döşeme yıkama",

          "döşeme temizliği işi",

          "döşeme yıkama işi",

          "döşeme temizliği lazım",

          "döşeme yıkama lazım",

          "döşeme temizlikçi",

          "döşeme temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "duct-cleaning",
    name: "Havalandırma Temizliği",
    keywords: [
      "havalandırma temizliği",

      "klima kanalı temizliği",

      "havalandırma temizliği işi",

      "klima kanalı temizliği işi",

      "havalandırma temizliği lazım",

      "klima kanalı temizliği lazım",
    ],
    subServices: [
      {
        id: "duct-cleaning-service",
        name: "Havalandırma temizliği hizmeti",
        keywords: [
          "havalandırma temizliği",

          "klima kanalı temizliği",

          "havalandırma temizliği işi",

          "klima kanalı temizliği işi",

          "havalandırma temizliği lazım",
        ],
      },
      {
        id: "other-duct-cleaning",
        name: "Diğer (havalandırma temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "havalandırma temizliği",

          "klima kanalı temizliği",

          "havalandırma temizliği işi",

          "klima kanalı temizliği işi",

          "havalandırma temizliği lazım",

          "klima kanalı temizliği lazım",

          "havalandırma temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "gutter-cleaning",
    name: "Oluk Temizliği",
    keywords: [
      "oluk temizliği",

      "çatı oluk temizliği",

      "oluk temizliği işi",

      "çatı oluk temizliği işi",

      "oluk temizliği lazım",

      "çatı oluk temizliği lazım",
    ],
    subServices: [
      {
        id: "gutter-cleaning-service",
        name: "Oluk temizliği hizmeti",
        keywords: [
          "oluk temizliği",

          "çatı oluk temizliği",

          "oluk temizliği işi",

          "çatı oluk temizliği işi",

          "oluk temizliği lazım",
        ],
      },
      {
        id: "other-gutter-cleaning",
        name: "Diğer (oluk temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "oluk temizliği",

          "çatı oluk temizliği",

          "oluk temizliği işi",

          "çatı oluk temizliği işi",

          "oluk temizliği lazım",

          "çatı oluk temizliği lazım",

          "oluk temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "power-washing",
    name: "Basınçlı Yıkama",
    keywords: [
      "basınçlı yıkama",

      "yüksek basınçlı yıkama",

      "basınçlı yıkama işi",

      "yüksek basınçlı yıkama işi",

      "basınçlı yıkama lazım",

      "yüksek basınçlı yıkama lazım",
    ],
    subServices: [
      {
        id: "power-washing-service",
        name: "Basınçlı yıkama hizmeti",
        keywords: [
          "basınçlı yıkama",

          "yüksek basınçlı yıkama",

          "basınçlı yıkama işi",

          "yüksek basınçlı yıkama işi",

          "basınçlı yıkama lazım",
        ],
      },
      {
        id: "other-power-washing",
        name: "Diğer (basınçlı yıkama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "basınçlı yıkama",

          "yüksek basınçlı yıkama",

          "basınçlı yıkama işi",

          "yüksek basınçlı yıkama işi",

          "basınçlı yıkama lazım",

          "yüksek basınçlı yıkama lazım",

          "basınçlı yıkama hizmeti",
        ],
      },
    ],
  },

  {
    id: "snow-removal",
    name: "Kar Temizleme",
    keywords: [
      "kar temizleme",

      "kar kaldırma",

      "kar temizleme işi",

      "kar kaldırma işi",

      "kar temizleme lazım",

      "kar kaldırma lazım",

      "kar temizleme usta",
    ],
    subServices: [
      {
        id: "snow-removal-service",
        name: "Kar temizleme hizmeti",
        keywords: [
          "kar temizleme",

          "kar kaldırma",

          "kar temizleme işi",

          "kar kaldırma işi",

          "kar temizleme usta",

          "kar temizleme lazım",
        ],
      },
      {
        id: "other-snow-removal",
        name: "Diğer (kar temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kar temizleme",

          "kar kaldırma",

          "kar temizleme işi",

          "kar kaldırma işi",

          "kar temizleme lazım",

          "kar kaldırma lazım",

          "kar temizleme usta",

          "kar temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "leaf-removal",
    name: "Yaprak Temizleme",
    keywords: [
      "yaprak temizleme",

      "yaprak toplama",

      "yaprak temizleme işi",

      "yaprak toplama işi",

      "yaprak temizleme lazım",

      "yaprak toplama lazım",

      "yaprak temizleme usta",
    ],
    subServices: [
      {
        id: "leaf-removal-service",
        name: "Yaprak temizleme hizmeti",
        keywords: [
          "yaprak temizleme",

          "yaprak toplama",

          "yaprak temizleme işi",

          "yaprak toplama işi",

          "yaprak temizleme usta",

          "yaprak temizleme lazım",
        ],
      },
      {
        id: "other-leaf-removal",
        name: "Diğer (yaprak temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yaprak temizleme",

          "yaprak toplama",

          "yaprak temizleme işi",

          "yaprak toplama işi",

          "yaprak temizleme lazım",

          "yaprak toplama lazım",

          "yaprak temizleme usta",

          "yaprak temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "tree-removal",
    name: "Ağaç Kesimi / Sökümü",
    keywords: [
      "ağaç kesimi",

      "ağaç sökümü",

      "ağaç kesimi işi",

      "ağaç sökümü işi",

      "ağaç kesimi lazım",

      "ağaç sökümü lazım",

      "ağaç kesimi usta",
    ],
    subServices: [
      {
        id: "tree-removal-service",
        name: "Ağaç kesimi / sökümü hizmeti",
        keywords: [
          "ağaç kesimi",

          "ağaç sökümü",

          "ağaç kesimi işi",

          "ağaç sökümü işi",

          "ağaç kesimi usta",

          "ağaç kesimi lazım",
        ],
      },
      {
        id: "other-tree-removal",
        name: "Diğer (ağaç kesimi / sökümü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ağaç kesimi",

          "ağaç sökümü",

          "ağaç kesimi işi",

          "ağaç sökümü işi",

          "ağaç kesimi lazım",

          "ağaç sökümü lazım",

          "ağaç kesimi usta",

          "ağaç kesimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "stump-removal",
    name: "Kütük Sökümü",
    keywords: [
      "kütük sökümü",

      "kütük kaldırma",

      "kütük sökümü işi",

      "kütük kaldırma işi",

      "kütük sökümü lazım",

      "kütük kaldırma lazım",

      "kütük sökümü usta",
    ],
    subServices: [
      {
        id: "stump-removal-service",
        name: "Kütük sökümü hizmeti",
        keywords: [
          "kütük sökümü",

          "kütük kaldırma",

          "kütük sökümü işi",

          "kütük kaldırma işi",

          "kütük sökümü usta",

          "kütük sökümü lazım",
        ],
      },
      {
        id: "other-stump-removal",
        name: "Diğer (kütük sökümü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kütük sökümü",

          "kütük kaldırma",

          "kütük sökümü işi",

          "kütük kaldırma işi",

          "kütük sökümü lazım",

          "kütük kaldırma lazım",

          "kütük sökümü usta",

          "kütük sökümü hizmeti",
        ],
      },
    ],
  },

  {
    id: "hedge-trimming",
    name: "Çit Budama",
    keywords: [
      "çit budama",

      "çit kesme",

      "çit budama işi",

      "çit kesme işi",

      "çit budama lazım",

      "çit kesme lazım",

      "çit budama usta",
    ],
    subServices: [
      {
        id: "hedge-trimming-service",
        name: "Çit budama hizmeti",
        keywords: [
          "çit budama",

          "çit kesme",

          "çit budama işi",

          "çit kesme işi",

          "çit budama usta",

          "çit budama lazım",
        ],
      },
      {
        id: "other-hedge-trimming",
        name: "Diğer (çit budama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çit budama",

          "çit kesme",

          "çit budama işi",

          "çit kesme işi",

          "çit budama lazım",

          "çit kesme lazım",

          "çit budama usta",

          "çit budama hizmeti",
        ],
      },
    ],
  },

  {
    id: "mulching",
    name: "Malçlama / Toprak Örtme",
    keywords: [
      "malçlama",

      "toprak örtme",

      "malçlama işi",

      "toprak örtme işi",

      "malçlama lazım",

      "toprak örtme lazım",

      "malçlama usta",
    ],
    subServices: [
      {
        id: "mulching-service",
        name: "Malçlama / toprak örtme hizmeti",
        keywords: [
          "malçlama",

          "toprak örtme",

          "malçlama işi",

          "toprak örtme işi",

          "malçlama usta",

          "malçlama lazım",
        ],
      },
      {
        id: "other-mulching",
        name: "Diğer (malçlama / toprak örtme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "malçlama",

          "toprak örtme",

          "malçlama işi",

          "toprak örtme işi",

          "malçlama lazım",

          "toprak örtme lazım",

          "malçlama usta",

          "malçlama hizmeti",
        ],
      },
    ],
  },

  {
    id: "irrigation",
    name: "Sulama Sistemi",
    keywords: [
      "sulama sistemi",

      "sulama montajı",

      "sulama sistemi işi",

      "sulama montajı işi",

      "sulama sistemi lazım",

      "sulama montajı lazım",

      "sulama usta",
    ],
    subServices: [
      {
        id: "irrigation-installation",
        name: "Sulama sistemi montajı",
        keywords: [
          "sulama sistemi montajı",

          "sulama kurulumu",

          "sulama sistemi takma",

          "sulama sistemi montajı işi",

          "sulama kurulumu işi",

          "sulama usta",

          "sulama sistemi montajı lazım",
        ],
      },
      {
        id: "irrigation-repair",
        name: "Sulama sistemi tamiri",
        keywords: [
          "sulama sistemi tamiri",

          "sulama sistemi onarımı",

          "sulama sistemi düzeltme",

          "sulama sistemi tamir",

          "sulama sistemi onarım",

          "sulama sistemi tamiri lazım",
        ],
      },
      {
        id: "other-irrigation",
        name: "Diğer (sulama sistemi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "sulama sistemi",

          "sulama montajı",

          "sulama sistemi işi",

          "sulama montajı işi",

          "sulama sistemi lazım",

          "sulama montajı lazım",

          "sulama usta",

          "sulama sistemi hizmeti",
        ],
      },
    ],
  },

  {
    id: "sprinkler-system",
    name: "Fıskiye Sistemi",
    keywords: [
      "fıskiye sistemi",

      "fıskiye montajı",

      "fıskiye sistemi işi",

      "fıskiye montajı işi",

      "fıskiye sistemi lazım",

      "fıskiye montajı lazım",

      "fıskiye usta",
    ],
    subServices: [
      {
        id: "sprinkler-installation",
        name: "Fıskiye sistemi montajı",
        keywords: [
          "fıskiye sistemi montajı",

          "fıskiye kurulumu",

          "fıskiye sistemi takma",

          "fıskiye sistemi montajı işi",

          "fıskiye kurulumu işi",

          "fıskiye usta",

          "fıskiye sistemi montajı lazım",
        ],
      },
      {
        id: "sprinkler-repair",
        name: "Fıskiye sistemi tamiri",
        keywords: [
          "fıskiye sistemi tamiri",

          "fıskiye sistemi onarımı",

          "fıskiye sistemi düzeltme",

          "fıskiye sistemi tamir",

          "fıskiye sistemi onarım",

          "fıskiye sistemi tamiri lazım",
        ],
      },
      {
        id: "other-sprinkler-system",
        name: "Diğer (fıskiye sistemi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fıskiye sistemi",

          "fıskiye montajı",

          "fıskiye sistemi işi",

          "fıskiye montajı işi",

          "fıskiye sistemi lazım",

          "fıskiye montajı lazım",

          "fıskiye usta",

          "fıskiye sistemi hizmeti",
        ],
      },
    ],
  },

  {
    id: "fence-repair",
    name: "Çit Tamiri",
    keywords: [
      "çit tamiri",

      "çit onarımı",

      "çit tamiri işi",

      "çit onarımı işi",

      "çit tamiri lazım",

      "çit onarımı lazım",

      "çit usta",
    ],
    subServices: [
      {
        id: "fence-repair-service",
        name: "Çit tamiri hizmeti",
        keywords: [
          "çit tamiri",

          "çit onarımı",

          "çit tamiri işi",

          "çit onarımı işi",

          "çit usta",

          "çit tamiri lazım",
        ],
      },
      {
        id: "other-fence-repair",
        name: "Diğer (çit tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çit tamiri",

          "çit onarımı",

          "çit tamiri işi",

          "çit onarımı işi",

          "çit tamiri lazım",

          "çit onarımı lazım",

          "çit usta",

          "çit tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "deck-building",
    name: "Teras / Deck Yapımı",
    keywords: [
      "teras yapımı",

      "deck yapımı",

      "teras işi",

      "deck işi",

      "teras lazım",

      "deck lazım",

      "teras usta",
    ],
    subServices: [
      {
        id: "deck-building-service",
        name: "Teras / deck yapımı hizmeti",
        keywords: [
          "teras yapımı",

          "deck yapımı",

          "teras inşaatı",

          "deck inşaatı",

          "teras yapımı işi",

          "deck yapımı işi",

          "teras usta",

          "teras yapımı lazım",
        ],
      },
      {
        id: "deck-repair",
        name: "Teras / deck tamiri",
        keywords: [
          "teras tamiri",

          "deck tamiri",

          "teras onarımı",

          "deck onarımı",

          "teras tamir",

          "deck tamir",

          "teras tamiri lazım",
        ],
      },
      {
        id: "other-deck-building",
        name: "Diğer (teras / deck yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "teras yapımı",

          "deck yapımı",

          "teras işi",

          "deck işi",

          "teras lazım",

          "deck lazım",

          "teras usta",

          "teras hizmeti",
        ],
      },
    ],
  },

  {
    id: "patio-building",
    name: "Patio / Avlu Yapımı",
    keywords: [
      "patio yapımı",

      "avlu yapımı",

      "patio işi",

      "avlu işi",

      "patio lazım",

      "avlu lazım",

      "patio usta",
    ],
    subServices: [
      {
        id: "patio-building-service",
        name: "Patio / avlu yapımı hizmeti",
        keywords: [
          "patio yapımı",

          "avlu yapımı",

          "patio inşaatı",

          "avlu inşaatı",

          "patio yapımı işi",

          "avlu yapımı işi",

          "patio usta",

          "patio yapımı lazım",
        ],
      },
      {
        id: "other-patio-building",
        name: "Diğer (patio / avlu yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "patio yapımı",

          "avlu yapımı",

          "patio işi",

          "avlu işi",

          "patio lazım",

          "avlu lazım",

          "patio usta",

          "patio hizmeti",
        ],
      },
    ],
  },

  {
    id: "outdoor-kitchen",
    name: "Dış Mekan Mutfağı",
    keywords: [
      "dış mekan mutfağı",

      "bahçe mutfağı",

      "dış mekan mutfağı işi",

      "bahçe mutfağı işi",

      "dış mekan mutfağı lazım",

      "bahçe mutfağı lazım",

      "dış mekan mutfağı usta",
    ],
    subServices: [
      {
        id: "outdoor-kitchen-service",
        name: "Dış mekan mutfağı yapımı",
        keywords: [
          "dış mekan mutfağı yapımı",

          "bahçe mutfağı yapımı",

          "dış mekan mutfağı inşaatı",

          "dış mekan mutfağı yapımı işi",

          "bahçe mutfağı yapımı işi",

          "dış mekan mutfağı usta",

          "dış mekan mutfağı yapımı lazım",
        ],
      },
      {
        id: "other-outdoor-kitchen",
        name: "Diğer (dış mekan mutfağı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dış mekan mutfağı",

          "bahçe mutfağı",

          "dış mekan mutfağı işi",

          "bahçe mutfağı işi",

          "dış mekan mutfağı lazım",

          "bahçe mutfağı lazım",

          "dış mekan mutfağı usta",

          "dış mekan mutfağı hizmeti",
        ],
      },
    ],
  },

  {
    id: "fireplace",
    name: "Şömine / Ocak",
    keywords: [
      "şömine",

      "ocak",

      "şömine yapımı",

      "ocak yapımı",

      "şömine işi",

      "ocak işi",

      "şömine lazım",

      "ocak lazım",

      "şömine usta",
    ],
    subServices: [
      {
        id: "fireplace-installation",
        name: "Şömine / ocak montajı",
        keywords: [
          "şömine montajı",

          "ocak montajı",

          "şömine kurulumu",

          "ocak kurulumu",

          "şömine montajı işi",

          "ocak montajı işi",

          "şömine usta",

          "şömine montajı lazım",
        ],
      },
      {
        id: "fireplace-repair",
        name: "Şömine / ocak tamiri",
        keywords: [
          "şömine tamiri",

          "ocak tamiri",

          "şömine onarımı",

          "ocak onarımı",

          "şömine tamir",

          "ocak tamir",

          "şömine tamiri lazım",
        ],
      },
      {
        id: "other-fireplace",
        name: "Diğer (şömine / ocak ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "şömine",

          "ocak",

          "şömine yapımı",

          "ocak yapımı",

          "şömine işi",

          "ocak işi",

          "şömine lazım",

          "ocak lazım",

          "şömine usta",

          "şömine hizmeti",
        ],
      },
    ],
  },

  {
    id: "barbecue",
    name: "Barbekü / Mangal",
    keywords: [
      "barbekü",

      "mangal",

      "barbekü montajı",

      "mangal montajı",

      "barbekü işi",

      "mangal işi",

      "barbekü lazım",

      "mangal lazım",

      "barbekü usta",
    ],
    subServices: [
      {
        id: "barbecue-installation",
        name: "Barbekü / mangal montajı",
        keywords: [
          "barbekü montajı",

          "mangal montajı",

          "barbekü kurulumu",

          "mangal kurulumu",

          "barbekü montajı işi",

          "mangal montajı işi",

          "barbekü usta",

          "barbekü montajı lazım",
        ],
      },
      {
        id: "barbecue-repair",
        name: "Barbekü / mangal tamiri",
        keywords: [
          "barbekü tamiri",

          "mangal tamiri",

          "barbekü onarımı",

          "mangal onarımı",

          "barbekü tamir",

          "mangal tamir",

          "barbekü tamiri lazım",
        ],
      },
      {
        id: "other-barbecue",
        name: "Diğer (barbekü / mangal ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "barbekü",

          "mangal",

          "barbekü montajı",

          "mangal montajı",

          "barbekü işi",

          "mangal işi",

          "barbekü lazım",

          "mangal lazım",

          "barbekü usta",

          "barbekü hizmeti",
        ],
      },
    ],
  },

  {
    id: "gazebo",
    name: "Çardak / Pergola",
    keywords: [
      "çardak",

      "pergola",

      "çardak yapımı",

      "pergola yapımı",

      "çardak işi",

      "pergola işi",

      "çardak lazım",

      "pergola lazım",

      "çardak usta",
    ],
    subServices: [
      {
        id: "gazebo-building",
        name: "Çardak / pergola yapımı",
        keywords: [
          "çardak yapımı",

          "pergola yapımı",

          "çardak inşaatı",

          "pergola inşaatı",

          "çardak yapımı işi",

          "pergola yapımı işi",

          "çardak usta",

          "çardak yapımı lazım",
        ],
      },
      {
        id: "gazebo-repair",
        name: "Çardak / pergola tamiri",
        keywords: [
          "çardak tamiri",

          "pergola tamiri",

          "çardak onarımı",

          "pergola onarımı",

          "çardak tamir",

          "pergola tamir",

          "çardak tamiri lazım",
        ],
      },
      {
        id: "other-gazebo",
        name: "Diğer (çardak / pergola ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çardak",

          "pergola",

          "çardak yapımı",

          "pergola yapımı",

          "çardak işi",

          "pergola işi",

          "çardak lazım",

          "pergola lazım",

          "çardak usta",

          "çardak hizmeti",
        ],
      },
    ],
  },

  {
    id: "shed-building",
    name: "Kulübe / Depo Yapımı",
    keywords: [
      "kulübe yapımı",

      "depo yapımı",

      "kulübe işi",

      "depo işi",

      "kulübe lazım",

      "depo lazım",

      "kulübe usta",
    ],
    subServices: [
      {
        id: "shed-building-service",
        name: "Kulübe / depo yapımı hizmeti",
        keywords: [
          "kulübe yapımı",

          "depo yapımı",

          "kulübe inşaatı",

          "depo inşaatı",

          "kulübe yapımı işi",

          "depo yapımı işi",

          "kulübe usta",

          "kulübe yapımı lazım",
        ],
      },
      {
        id: "shed-repair",
        name: "Kulübe / depo tamiri",
        keywords: [
          "kulübe tamiri",

          "depo tamiri",

          "kulübe onarımı",

          "depo onarımı",

          "kulübe tamir",

          "depo tamir",

          "kulübe tamiri lazım",
        ],
      },
      {
        id: "other-shed-building",
        name: "Diğer (kulübe / depo yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kulübe yapımı",

          "depo yapımı",

          "kulübe işi",

          "depo işi",

          "kulübe lazım",

          "depo lazım",

          "kulübe usta",

          "kulübe hizmeti",
        ],
      },
    ],
  },

  {
    id: "playground-equipment",
    name: "Oyun Parkı Ekipmanı",
    keywords: [
      "oyun parkı ekipmanı",

      "oyun parkı montajı",

      "oyun parkı ekipmanı işi",

      "oyun parkı montajı işi",

      "oyun parkı ekipmanı lazım",

      "oyun parkı montajı lazım",
    ],
    subServices: [
      {
        id: "playground-installation",
        name: "Oyun parkı ekipmanı montajı",
        keywords: [
          "oyun parkı ekipmanı montajı",

          "oyun parkı kurulumu",

          "oyun parkı ekipmanı takma",

          "oyun parkı ekipmanı montajı işi",

          "oyun parkı kurulumu işi",

          "oyun parkı ekipmanı montajı lazım",
        ],
      },
      {
        id: "playground-repair",
        name: "Oyun parkı ekipmanı tamiri",
        keywords: [
          "oyun parkı ekipmanı tamiri",

          "oyun parkı ekipmanı onarımı",

          "oyun parkı ekipmanı düzeltme",

          "oyun parkı ekipmanı tamir",

          "oyun parkı ekipmanı onarım",

          "oyun parkı ekipmanı tamiri lazım",
        ],
      },
      {
        id: "other-playground-equipment",
        name: "Diğer (oyun parkı ekipmanı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "oyun parkı ekipmanı",

          "oyun parkı montajı",

          "oyun parkı ekipmanı işi",

          "oyun parkı montajı işi",

          "oyun parkı ekipmanı lazım",

          "oyun parkı montajı lazım",

          "oyun parkı ekipmanı hizmeti",
        ],
      },
    ],
  },

  {
    id: "fountain-installation",
    name: "Çeşme / Fıskiye Yapımı",
    keywords: [
      "çeşme yapımı",

      "fıskiye yapımı",

      "çeşme işi",

      "fıskiye işi",

      "çeşme lazım",

      "fıskiye lazım",

      "çeşme usta",
    ],
    subServices: [
      {
        id: "fountain-building",
        name: "Çeşme / fıskiye yapımı",
        keywords: [
          "çeşme yapımı",

          "fıskiye yapımı",

          "çeşme inşaatı",

          "fıskiye inşaatı",

          "çeşme yapımı işi",

          "fıskiye yapımı işi",

          "çeşme usta",

          "çeşme yapımı lazım",
        ],
      },
      {
        id: "fountain-repair",
        name: "Çeşme / fıskiye tamiri",
        keywords: [
          "çeşme tamiri",

          "fıskiye tamiri",

          "çeşme onarımı",

          "fıskiye onarımı",

          "çeşme tamir",

          "fıskiye tamir",

          "çeşme tamiri lazım",
        ],
      },
      {
        id: "other-fountain-installation",
        name: "Diğer (çeşme / fıskiye yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çeşme yapımı",

          "fıskiye yapımı",

          "çeşme işi",

          "fıskiye işi",

          "çeşme lazım",

          "fıskiye lazım",

          "çeşme usta",

          "çeşme hizmeti",
        ],
      },
    ],
  },

  {
    id: "statue-installation",
    name: "Heykel / Heykel Montajı",
    keywords: [
      "heykel montajı",

      "heykel kurulumu",

      "heykel montajı işi",

      "heykel kurulumu işi",

      "heykel montajı lazım",

      "heykel kurulumu lazım",

      "heykel usta",
    ],
    subServices: [
      {
        id: "statue-installation-service",
        name: "Heykel montajı / kurulumu",
        keywords: [
          "heykel montajı",

          "heykel kurulumu",

          "heykel takma",

          "heykel montajı işi",

          "heykel kurulumu işi",

          "heykel usta",

          "heykel montajı lazım",
        ],
      },
      {
        id: "other-statue-installation",
        name: "Diğer (heykel / heykel montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "heykel montajı",

          "heykel kurulumu",

          "heykel montajı işi",

          "heykel kurulumu işi",

          "heykel montajı lazım",

          "heykel kurulumu lazım",

          "heykel usta",

          "heykel hizmeti",
        ],
      },
    ],
  },

  {
    id: "outdoor-lighting",
    name: "Dış Mekan Aydınlatması",
    keywords: [
      "dış mekan aydınlatması",

      "bahçe aydınlatması",

      "dış mekan aydınlatması işi",

      "bahçe aydınlatması işi",

      "dış mekan aydınlatması lazım",

      "bahçe aydınlatması lazım",
    ],
    subServices: [
      {
        id: "outdoor-lighting-installation",
        name: "Dış mekan aydınlatması montajı",
        keywords: [
          "dış mekan aydınlatması montajı",

          "bahçe aydınlatması montajı",

          "dış mekan aydınlatması kurulumu",

          "dış mekan aydınlatması montajı işi",

          "bahçe aydınlatması montajı işi",

          "dış mekan aydınlatması montajı lazım",
        ],
      },
      {
        id: "outdoor-lighting-repair",
        name: "Dış mekan aydınlatması tamiri",
        keywords: [
          "dış mekan aydınlatması tamiri",

          "bahçe aydınlatması tamiri",

          "dış mekan aydınlatması onarımı",

          "dış mekan aydınlatması tamir",

          "bahçe aydınlatması tamir",

          "dış mekan aydınlatması tamiri lazım",
        ],
      },
      {
        id: "other-outdoor-lighting",
        name: "Diğer (dış mekan aydınlatması ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dış mekan aydınlatması",

          "bahçe aydınlatması",

          "dış mekan aydınlatması işi",

          "bahçe aydınlatması işi",

          "dış mekan aydınlatması lazım",

          "bahçe aydınlatması lazım",

          "dış mekan aydınlatması hizmeti",
        ],
      },
    ],
  },

  {
    id: "chimney-sweep",
    name: "Baca Temizleme",
    keywords: [
      "baca temizleme",

      "baca temizliği",

      "baca temizleme işi",

      "baca temizliği işi",

      "baca temizleme lazım",

      "baca temizliği lazım",

      "baca temizleme usta",
    ],
    subServices: [
      {
        id: "chimney-sweep-service",
        name: "Baca temizleme hizmeti",
        keywords: [
          "baca temizleme",

          "baca temizliği",

          "baca temizleme işi",

          "baca temizliği işi",

          "baca temizleme usta",

          "baca temizleme lazım",
        ],
      },
      {
        id: "other-chimney-sweep",
        name: "Diğer (baca temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "baca temizleme",

          "baca temizliği",

          "baca temizleme işi",

          "baca temizliği işi",

          "baca temizleme lazım",

          "baca temizliği lazım",

          "baca temizleme usta",

          "baca temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "dryer-vent-cleaning",
    name: "Kurutucu Hava Kanalı Temizliği",
    keywords: [
      "kurutucu hava kanalı",

      "kurutucu temizliği",

      "kurutucu hava kanalı işi",

      "kurutucu temizliği işi",

      "kurutucu hava kanalı lazım",

      "kurutucu temizliği lazım",
    ],
    subServices: [
      {
        id: "dryer-vent-cleaning-service",
        name: "Kurutucu hava kanalı temizliği hizmeti",
        keywords: [
          "kurutucu hava kanalı temizliği",

          "kurutucu temizliği",

          "kurutucu hava kanalı işi",

          "kurutucu temizliği işi",

          "kurutucu hava kanalı temizliği lazım",
        ],
      },
      {
        id: "other-dryer-vent-cleaning",
        name: "Diğer (kurutucu hava kanalı temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kurutucu hava kanalı",

          "kurutucu temizliği",

          "kurutucu hava kanalı işi",

          "kurutucu temizliği işi",

          "kurutucu hava kanalı lazım",

          "kurutucu temizliği lazım",

          "kurutucu hava kanalı hizmeti",
        ],
      },
    ],
  },

  {
    id: "appliance-removal",
    name: "Eşya Sökümü / Kaldırma",
    keywords: [
      "eşya sökümü",

      "eşya kaldırma",

      "eşya sökümü işi",

      "eşya kaldırma işi",

      "eşya sökümü lazım",

      "eşya kaldırma lazım",

      "eşya sökümü usta",
    ],
    subServices: [
      {
        id: "appliance-removal-service",
        name: "Eşya sökümü / kaldırma hizmeti",
        keywords: [
          "eşya sökümü",

          "eşya kaldırma",

          "eşya sökümü işi",

          "eşya kaldırma işi",

          "eşya sökümü usta",

          "eşya sökümü lazım",
        ],
      },
      {
        id: "other-appliance-removal",
        name: "Diğer (eşya sökümü / kaldırma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "eşya sökümü",

          "eşya kaldırma",

          "eşya sökümü işi",

          "eşya kaldırma işi",

          "eşya sökümü lazım",

          "eşya kaldırma lazım",

          "eşya sökümü usta",

          "eşya sökümü hizmeti",
        ],
      },
    ],
  },

  {
    id: "junk-removal",
    name: "Hurda / Eski Eşya Kaldırma",
    keywords: [
      "hurda kaldırma",

      "eski eşya kaldırma",

      "hurda kaldırma işi",

      "eski eşya kaldırma işi",

      "hurda kaldırma lazım",

      "eski eşya kaldırma lazım",

      "hurda kaldırma usta",
    ],
    subServices: [
      {
        id: "junk-removal-service",
        name: "Hurda / eski eşya kaldırma hizmeti",
        keywords: [
          "hurda kaldırma",

          "eski eşya kaldırma",

          "hurda kaldırma işi",

          "eski eşya kaldırma işi",

          "hurda kaldırma usta",

          "hurda kaldırma lazım",
        ],
      },
      {
        id: "other-junk-removal",
        name: "Diğer (hurda / eski eşya kaldırma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "hurda kaldırma",

          "eski eşya kaldırma",

          "hurda kaldırma işi",

          "eski eşya kaldırma işi",

          "hurda kaldırma lazım",

          "eski eşya kaldırma lazım",

          "hurda kaldırma usta",

          "hurda kaldırma hizmeti",
        ],
      },
    ],
  },

  {
    id: "demolition",
    name: "Yıkım / Söküm",
    keywords: [
      "yıkım",

      "söküm",

      "yıkım işi",

      "söküm işi",

      "yıkım lazım",

      "söküm lazım",

      "yıkım usta",
    ],
    subServices: [
      {
        id: "demolition-service",
        name: "Yıkım / söküm hizmeti",
        keywords: [
          "yıkım",

          "söküm",

          "yıkım işi",

          "söküm işi",

          "yıkım usta",

          "yıkım lazım",
        ],
      },
      {
        id: "other-demolition",
        name: "Diğer (yıkım / söküm ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yıkım",

          "söküm",

          "yıkım işi",

          "söküm işi",

          "yıkım lazım",

          "söküm lazım",

          "yıkım usta",

          "yıkım hizmeti",
        ],
      },
    ],
  },

  {
    id: "concrete-work",
    name: "Beton İşleri",
    keywords: [
      "beton işleri",

      "beton dökümü",

      "beton işleri işi",

      "beton dökümü işi",

      "beton işleri lazım",

      "beton dökümü lazım",

      "beton usta",
    ],
    subServices: [
      {
        id: "concrete-pouring",
        name: "Beton dökümü",
        keywords: [
          "beton dökümü",

          "beton dökme",

          "beton dökümü işi",

          "beton dökme işi",

          "beton usta",

          "beton dökümü lazım",
        ],
      },
      {
        id: "concrete-repair",
        name: "Beton tamiri",
        keywords: [
          "beton tamiri",

          "beton onarımı",

          "beton düzeltme",

          "beton tamir",

          "beton onarım",

          "beton tamiri lazım",
        ],
      },
      {
        id: "concrete-stamping",
        name: "Beton baskı / desen",
        keywords: [
          "beton baskı",

          "beton desen",

          "beton baskı işi",

          "beton desen işi",

          "beton baskı lazım",

          "beton desen lazım",
        ],
      },
      {
        id: "other-concrete-work",
        name: "Diğer (beton işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "beton işleri",

          "beton dökümü",

          "beton işleri işi",

          "beton dökümü işi",

          "beton işleri lazım",

          "beton dökümü lazım",

          "beton usta",

          "beton hizmeti",
        ],
      },
    ],
  },

  {
    id: "asphalt-work",
    name: "Asfalt İşleri",
    keywords: [
      "asfalt işleri",

      "asfalt dökümü",

      "asfalt işleri işi",

      "asfalt dökümü işi",

      "asfalt işleri lazım",

      "asfalt dökümü lazım",

      "asfalt usta",
    ],
    subServices: [
      {
        id: "asphalt-paving",
        name: "Asfalt dökümü",
        keywords: [
          "asfalt dökümü",

          "asfalt dökme",

          "asfalt dökümü işi",

          "asfalt dökme işi",

          "asfalt usta",

          "asfalt dökümü lazım",
        ],
      },
      {
        id: "asphalt-repair",
        name: "Asfalt tamiri",
        keywords: [
          "asfalt tamiri",

          "asfalt onarımı",

          "asfalt düzeltme",

          "asfalt tamir",

          "asfalt onarım",

          "asfalt tamiri lazım",
        ],
      },
      {
        id: "other-asphalt-work",
        name: "Diğer (asfalt işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "asfalt işleri",

          "asfalt dökümü",

          "asfalt işleri işi",

          "asfalt dökümü işi",

          "asfalt işleri lazım",

          "asfalt dökümü lazım",

          "asfalt usta",

          "asfalt hizmeti",
        ],
      },
    ],
  },

  {
    id: "excavation",
    name: "Kazı / Hafriyat",
    keywords: [
      "kazı",

      "hafriyat",

      "kazı işi",

      "hafriyat işi",

      "kazı lazım",

      "hafriyat lazım",

      "kazı usta",
    ],
    subServices: [
      {
        id: "excavation-service",
        name: "Kazı / hafriyat hizmeti",
        keywords: [
          "kazı",

          "hafriyat",

          "kazı işi",

          "hafriyat işi",

          "kazı usta",

          "kazı lazım",
        ],
      },
      {
        id: "other-excavation",
        name: "Diğer (kazı / hafriyat ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kazı",

          "hafriyat",

          "kazı işi",

          "hafriyat işi",

          "kazı lazım",

          "hafriyat lazım",

          "kazı usta",

          "kazı hizmeti",
        ],
      },
    ],
  },

  {
    id: "grading",
    name: "Toprak Tesviye",
    keywords: [
      "toprak tesviye",

      "toprak düzeltme",

      "toprak tesviye işi",

      "toprak düzeltme işi",

      "toprak tesviye lazım",

      "toprak düzeltme lazım",

      "toprak tesviye usta",
    ],
    subServices: [
      {
        id: "grading-service",
        name: "Toprak tesviye hizmeti",
        keywords: [
          "toprak tesviye",

          "toprak düzeltme",

          "toprak tesviye işi",

          "toprak düzeltme işi",

          "toprak tesviye usta",

          "toprak tesviye lazım",
        ],
      },
      {
        id: "other-grading",
        name: "Diğer (toprak tesviye ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "toprak tesviye",

          "toprak düzeltme",

          "toprak tesviye işi",

          "toprak düzeltme işi",

          "toprak tesviye lazım",

          "toprak düzeltme lazım",

          "toprak tesviye usta",

          "toprak tesviye hizmeti",
        ],
      },
    ],
  },

  {
    id: "landscaping-design",
    name: "Peyzaj Tasarımı",
    keywords: [
      "peyzaj tasarımı",

      "peyzaj projesi",

      "peyzaj tasarımı işi",

      "peyzaj projesi işi",

      "peyzaj tasarımı lazım",

      "peyzaj projesi lazım",

      "peyzaj tasarımcı",
    ],
    subServices: [
      {
        id: "landscaping-design-service",
        name: "Peyzaj tasarımı hizmeti",
        keywords: [
          "peyzaj tasarımı",

          "peyzaj projesi",

          "peyzaj tasarımı işi",

          "peyzaj projesi işi",

          "peyzaj tasarımcı",

          "peyzaj tasarımı lazım",
        ],
      },
      {
        id: "other-landscaping-design",
        name: "Diğer (peyzaj tasarımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "peyzaj tasarımı",

          "peyzaj projesi",

          "peyzaj tasarımı işi",

          "peyzaj projesi işi",

          "peyzaj tasarımı lazım",

          "peyzaj projesi lazım",

          "peyzaj tasarımcı",

          "peyzaj tasarımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "tree-planting",
    name: "Ağaç Dikimi",
    keywords: [
      "ağaç dikimi",

      "ağaç dikme",

      "ağaç dikimi işi",

      "ağaç dikme işi",

      "ağaç dikimi lazım",

      "ağaç dikme lazım",

      "ağaç dikimi usta",
    ],
    subServices: [
      {
        id: "tree-planting-service",
        name: "Ağaç dikimi hizmeti",
        keywords: [
          "ağaç dikimi",

          "ağaç dikme",

          "ağaç dikimi işi",

          "ağaç dikme işi",

          "ağaç dikimi usta",

          "ağaç dikimi lazım",
        ],
      },
      {
        id: "other-tree-planting",
        name: "Diğer (ağaç dikimi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ağaç dikimi",

          "ağaç dikme",

          "ağaç dikimi işi",

          "ağaç dikme işi",

          "ağaç dikimi lazım",

          "ağaç dikme lazım",

          "ağaç dikimi usta",

          "ağaç dikimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "lawn-installation",
    name: "Çim Döşeme",
    keywords: [
      "çim döşeme",

      "çim montajı",

      "çim döşeme işi",

      "çim montajı işi",

      "çim döşeme lazım",

      "çim montajı lazım",

      "çim döşeme usta",
    ],
    subServices: [
      {
        id: "lawn-installation-service",
        name: "Çim döşeme hizmeti",
        keywords: [
          "çim döşeme",

          "çim montajı",

          "çim döşeme işi",

          "çim montajı işi",

          "çim döşeme usta",

          "çim döşeme lazım",
        ],
      },
      {
        id: "other-lawn-installation",
        name: "Diğer (çim döşeme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çim döşeme",

          "çim montajı",

          "çim döşeme işi",

          "çim montajı işi",

          "çim döşeme lazım",

          "çim montajı lazım",

          "çim döşeme usta",

          "çim döşeme hizmeti",
        ],
      },
    ],
  },

  {
    id: "sod-installation",
    name: "Hazır Çim Döşeme",
    keywords: [
      "hazır çim döşeme",

      "hazır çim montajı",

      "hazır çim döşeme işi",

      "hazır çim montajı işi",

      "hazır çim döşeme lazım",

      "hazır çim montajı lazım",

      "hazır çim döşeme usta",
    ],
    subServices: [
      {
        id: "sod-installation-service",
        name: "Hazır çim döşeme hizmeti",
        keywords: [
          "hazır çim döşeme",

          "hazır çim montajı",

          "hazır çim döşeme işi",

          "hazır çim montajı işi",

          "hazır çim döşeme usta",

          "hazır çim döşeme lazım",
        ],
      },
      {
        id: "other-sod-installation",
        name: "Diğer (hazır çim döşeme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "hazır çim döşeme",

          "hazır çim montajı",

          "hazır çim döşeme işi",

          "hazır çim montajı işi",

          "hazır çim döşeme lazım",

          "hazır çim montajı lazım",

          "hazır çim döşeme usta",

          "hazır çim döşeme hizmeti",
        ],
      },
    ],
  },

  {
    id: "fertilization",
    name: "Gübreleme",
    keywords: [
      "gübreleme",

      "gübre atma",

      "gübreleme işi",

      "gübre atma işi",

      "gübreleme lazım",

      "gübre atma lazım",

      "gübreleme usta",
    ],
    subServices: [
      {
        id: "fertilization-service",
        name: "Gübreleme hizmeti",
        keywords: [
          "gübreleme",

          "gübre atma",

          "gübreleme işi",

          "gübre atma işi",

          "gübreleme usta",

          "gübreleme lazım",
        ],
      },
      {
        id: "other-fertilization",
        name: "Diğer (gübreleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "gübreleme",

          "gübre atma",

          "gübreleme işi",

          "gübre atma işi",

          "gübreleme lazım",

          "gübre atma lazım",

          "gübreleme usta",

          "gübreleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "weed-control",
    name: "Yabani Ot Temizleme",
    keywords: [
      "yabani ot temizleme",

      "ot temizleme",

      "yabani ot temizleme işi",

      "ot temizleme işi",

      "yabani ot temizleme lazım",

      "ot temizleme lazım",

      "yabani ot temizleme usta",
    ],
    subServices: [
      {
        id: "weed-control-service",
        name: "Yabani ot temizleme hizmeti",
        keywords: [
          "yabani ot temizleme",

          "ot temizleme",

          "yabani ot temizleme işi",

          "ot temizleme işi",

          "yabani ot temizleme usta",

          "yabani ot temizleme lazım",
        ],
      },
      {
        id: "other-weed-control",
        name: "Diğer (yabani ot temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yabani ot temizleme",

          "ot temizleme",

          "yabani ot temizleme işi",

          "ot temizleme işi",

          "yabani ot temizleme lazım",

          "ot temizleme lazım",

          "yabani ot temizleme usta",

          "yabani ot temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "pruning",
    name: "Budama",
    keywords: [
      "budama",

      "ağaç budama",

      "budama işi",

      "ağaç budama işi",

      "budama lazım",

      "ağaç budama lazım",

      "budama usta",
    ],
    subServices: [
      {
        id: "pruning-service",
        name: "Budama hizmeti",
        keywords: [
          "budama",

          "ağaç budama",

          "budama işi",

          "ağaç budama işi",

          "budama usta",

          "budama lazım",
        ],
      },
      {
        id: "other-pruning",
        name: "Diğer (budama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "budama",

          "ağaç budama",

          "budama işi",

          "ağaç budama işi",

          "budama lazım",

          "ağaç budama lazım",

          "budama usta",

          "budama hizmeti",
        ],
      },
    ],
  },

  {
    id: "tree-stump-grinding",
    name: "Kütük Öğütme",
    keywords: [
      "kütük öğütme",

      "kütük kırma",

      "kütük öğütme işi",

      "kütük kırma işi",

      "kütük öğütme lazım",

      "kütük kırma lazım",

      "kütük öğütme usta",
    ],
    subServices: [
      {
        id: "tree-stump-grinding-service",
        name: "Kütük öğütme hizmeti",
        keywords: [
          "kütük öğütme",

          "kütük kırma",

          "kütük öğütme işi",

          "kütük kırma işi",

          "kütük öğütme usta",

          "kütük öğütme lazım",
        ],
      },
      {
        id: "other-tree-stump-grinding",
        name: "Diğer (kütük öğütme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kütük öğütme",

          "kütük kırma",

          "kütük öğütme işi",

          "kütük kırma işi",

          "kütük öğütme lazım",

          "kütük kırma lazım",

          "kütük öğütme usta",

          "kütük öğütme hizmeti",
        ],
      },
    ],
  },

  {
    id: "snow-plowing",
    name: "Kar Kürüme",
    keywords: [
      "kar kürüme",

      "kar temizleme",

      "kar kürüme işi",

      "kar temizleme işi",

      "kar kürüme lazım",

      "kar temizleme lazım",

      "kar kürüme usta",
    ],
    subServices: [
      {
        id: "snow-plowing-service",
        name: "Kar kürüme hizmeti",
        keywords: [
          "kar kürüme",

          "kar temizleme",

          "kar kürüme işi",

          "kar temizleme işi",

          "kar kürüme usta",

          "kar kürüme lazım",
        ],
      },
      {
        id: "other-snow-plowing",
        name: "Diğer (kar kürüme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kar kürüme",

          "kar temizleme",

          "kar kürüme işi",

          "kar temizleme işi",

          "kar kürüme lazım",

          "kar temizleme lazım",

          "kar kürüme usta",

          "kar kürüme hizmeti",
        ],
      },
    ],
  },

  {
    id: "ice-removal",
    name: "Buz Temizleme",
    keywords: [
      "buz temizleme",

      "buz kaldırma",

      "buz temizleme işi",

      "buz kaldırma işi",

      "buz temizleme lazım",

      "buz kaldırma lazım",

      "buz temizleme usta",
    ],
    subServices: [
      {
        id: "ice-removal-service",
        name: "Buz temizleme hizmeti",
        keywords: [
          "buz temizleme",

          "buz kaldırma",

          "buz temizleme işi",

          "buz kaldırma işi",

          "buz temizleme usta",

          "buz temizleme lazım",
        ],
      },
      {
        id: "other-ice-removal",
        name: "Diğer (buz temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "buz temizleme",

          "buz kaldırma",

          "buz temizleme işi",

          "buz kaldırma işi",

          "buz temizleme lazım",

          "buz kaldırma lazım",

          "buz temizleme usta",

          "buz temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "taxi-service",
    name: "Taksi Hizmeti",
    keywords: [
      "taksi",

      "taksi hizmeti",

      "taksi işi",

      "taksi lazım",

      "taksi çağır",
    ],
    subServices: [
      {
        id: "taxi-service-general",
        name: "Taksi hizmeti",
        keywords: [
          "taksi",

          "taksi hizmeti",

          "taksi işi",

          "taksi lazım",

          "taksi çağır",
        ],
      },
      {
        id: "other-taxi-service",
        name: "Diğer (taksi hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "taksi",

          "taksi hizmeti",

          "taksi işi",

          "taksi lazım",

          "taksi çağır",
        ],
      },
    ],
  },

  {
    id: "delivery",
    name: "Kurye / Teslimat",
    keywords: [
      "kurye",

      "teslimat",

      "kurye işi",

      "teslimat işi",

      "kurye lazım",

      "teslimat lazım",
    ],
    subServices: [
      {
        id: "delivery-service",
        name: "Kurye / teslimat hizmeti",
        keywords: [
          "kurye",

          "teslimat",

          "kurye işi",

          "teslimat işi",

          "kurye lazım",

          "teslimat lazım",
        ],
      },
      {
        id: "other-delivery",
        name: "Diğer (kurye / teslimat ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kurye",

          "teslimat",

          "kurye işi",

          "teslimat işi",

          "kurye lazım",

          "teslimat lazım",

          "kurye hizmeti",
        ],
      },
    ],
  },

  {
    id: "errand-service",
    name: "Ayak İşleri / Getir Götür",
    keywords: [
      "ayak işleri",

      "getir götür",

      "ayak işleri işi",

      "getir götür işi",

      "ayak işleri lazım",

      "getir götür lazım",
    ],
    subServices: [
      {
        id: "errand-service-general",
        name: "Ayak işleri / getir götür hizmeti",
        keywords: [
          "ayak işleri",

          "getir götür",

          "ayak işleri işi",

          "getir götür işi",

          "ayak işleri lazım",

          "getir götür lazım",
        ],
      },
      {
        id: "other-errand-service",
        name: "Diğer (ayak işleri / getir götür ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ayak işleri",

          "getir götür",

          "ayak işleri işi",

          "getir götür işi",

          "ayak işleri lazım",

          "getir götür lazım",

          "ayak işleri hizmeti",
        ],
      },
    ],
  },

  {
    id: "waiting-service",
    name: "Bekleme Hizmeti",
    keywords: [
      "bekleme hizmeti",

      "sıra bekleme",

      "bekleme hizmeti işi",

      "sıra bekleme işi",

      "bekleme hizmeti lazım",

      "sıra bekleme lazım",
    ],
    subServices: [
      {
        id: "waiting-service-general",
        name: "Bekleme hizmeti",
        keywords: [
          "bekleme hizmeti",

          "sıra bekleme",

          "bekleme hizmeti işi",

          "sıra bekleme işi",

          "bekleme hizmeti lazım",

          "sıra bekleme lazım",
        ],
      },
      {
        id: "other-waiting-service",
        name: "Diğer (bekleme hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bekleme hizmeti",

          "sıra bekleme",

          "bekleme hizmeti işi",

          "sıra bekleme işi",

          "bekleme hizmeti lazım",

          "sıra bekleme lazım",
        ],
      },
    ],
  },

  {
    id: "shopping-service",
    name: "Alışveriş Hizmeti",
    keywords: [
      "alışveriş hizmeti",

      "alışveriş yapma",

      "alışveriş hizmeti işi",

      "alışveriş yapma işi",

      "alışveriş hizmeti lazım",

      "alışveriş yapma lazım",
    ],
    subServices: [
      {
        id: "shopping-service-general",
        name: "Alışveriş hizmeti",
        keywords: [
          "alışveriş hizmeti",

          "alışveriş yapma",

          "alışveriş hizmeti işi",

          "alışveriş yapma işi",

          "alışveriş hizmeti lazım",

          "alışveriş yapma lazım",
        ],
      },
      {
        id: "other-shopping-service",
        name: "Diğer (alışveriş hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "alışveriş hizmeti",

          "alışveriş yapma",

          "alışveriş hizmeti işi",

          "alışveriş yapma işi",

          "alışveriş hizmeti lazım",

          "alışveriş yapma lazım",
        ],
      },
    ],
  },

  {
    id: "pet-walking",
    name: "Köpek Gezdirme",
    keywords: [
      "köpek gezdirme",

      "pet gezdirme",

      "köpek gezdirme işi",

      "pet gezdirme işi",

      "köpek gezdirme lazım",

      "pet gezdirme lazım",
    ],
    subServices: [
      {
        id: "pet-walking-service",
        name: "Köpek gezdirme hizmeti",
        keywords: [
          "köpek gezdirme",

          "pet gezdirme",

          "köpek gezdirme işi",

          "pet gezdirme işi",

          "köpek gezdirme lazım",

          "pet gezdirme lazım",
        ],
      },
      {
        id: "other-pet-walking",
        name: "Diğer (köpek gezdirme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "köpek gezdirme",

          "pet gezdirme",

          "köpek gezdirme işi",

          "pet gezdirme işi",

          "köpek gezdirme lazım",

          "pet gezdirme lazım",

          "köpek gezdirme hizmeti",
        ],
      },
    ],
  },

  {
    id: "house-sitting",
    name: "Ev Bekçiliği",
    keywords: [
      "ev bekçiliği",

      "ev bakıcılığı",

      "ev bekçiliği işi",

      "ev bakıcılığı işi",

      "ev bekçiliği lazım",

      "ev bakıcılığı lazım",
    ],
    subServices: [
      {
        id: "house-sitting-service",
        name: "Ev bekçiliği hizmeti",
        keywords: [
          "ev bekçiliği",

          "ev bakıcılığı",

          "ev bekçiliği işi",

          "ev bakıcılığı işi",

          "ev bekçiliği lazım",

          "ev bakıcılığı lazım",
        ],
      },
      {
        id: "other-house-sitting",
        name: "Diğer (ev bekçiliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ev bekçiliği",

          "ev bakıcılığı",

          "ev bekçiliği işi",

          "ev bakıcılığı işi",

          "ev bekçiliği lazım",

          "ev bakıcılığı lazım",

          "ev bekçiliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "plant-care",
    name: "Bitki Bakımı",
    keywords: [
      "bitki bakımı",

      "çiçek bakımı",

      "bitki bakımı işi",

      "çiçek bakımı işi",

      "bitki bakımı lazım",

      "çiçek bakımı lazım",

      "bitki bakımı usta",
    ],
    subServices: [
      {
        id: "plant-care-service",
        name: "Bitki bakımı hizmeti",
        keywords: [
          "bitki bakımı",

          "çiçek bakımı",

          "bitki bakımı işi",

          "çiçek bakımı işi",

          "bitki bakımı usta",

          "bitki bakımı lazım",
        ],
      },
      {
        id: "other-plant-care",
        name: "Diğer (bitki bakımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bitki bakımı",

          "çiçek bakımı",

          "bitki bakımı işi",

          "çiçek bakımı işi",

          "bitki bakımı lazım",

          "çiçek bakımı lazım",

          "bitki bakımı usta",

          "bitki bakımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "mail-service",
    name: "Posta / Kargo Hizmeti",
    keywords: [
      "posta hizmeti",

      "kargo hizmeti",

      "posta hizmeti işi",

      "kargo hizmeti işi",

      "posta hizmeti lazım",

      "kargo hizmeti lazım",
    ],
    subServices: [
      {
        id: "mail-service-general",
        name: "Posta / kargo hizmeti",
        keywords: [
          "posta hizmeti",

          "kargo hizmeti",

          "posta hizmeti işi",

          "kargo hizmeti işi",

          "posta hizmeti lazım",

          "kargo hizmeti lazım",
        ],
      },
      {
        id: "other-mail-service",
        name: "Diğer (posta / kargo hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "posta hizmeti",

          "kargo hizmeti",

          "posta hizmeti işi",

          "kargo hizmeti işi",

          "posta hizmeti lazım",

          "kargo hizmeti lazım",
        ],
      },
    ],
  },

  {
    id: "organizing",
    name: "Organizasyon / Düzenleme",
    keywords: [
      "organizasyon",

      "düzenleme",

      "organizasyon işi",

      "düzenleme işi",

      "organizasyon lazım",

      "düzenleme lazım",

      "organizatör",
    ],
    subServices: [
      {
        id: "organizing-service",
        name: "Organizasyon / düzenleme hizmeti",
        keywords: [
          "organizasyon",

          "düzenleme",

          "organizasyon işi",

          "düzenleme işi",

          "organizatör",

          "organizasyon lazım",
        ],
      },
      {
        id: "other-organizing",
        name: "Diğer (organizasyon / düzenleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "organizasyon",

          "düzenleme",

          "organizasyon işi",

          "düzenleme işi",

          "organizasyon lazım",

          "düzenleme lazım",

          "organizatör",

          "organizasyon hizmeti",
        ],
      },
    ],
  },

  {
    id: "packing",
    name: "Paketleme / Ambalaj",
    keywords: [
      "paketleme",

      "ambalaj",

      "paketleme işi",

      "ambalaj işi",

      "paketleme lazım",

      "ambalaj lazım",

      "paketleme usta",
    ],
    subServices: [
      {
        id: "packing-service",
        name: "Paketleme / ambalaj hizmeti",
        keywords: [
          "paketleme",

          "ambalaj",

          "paketleme işi",

          "ambalaj işi",

          "paketleme usta",

          "paketleme lazım",
        ],
      },
      {
        id: "other-packing",
        name: "Diğer (paketleme / ambalaj ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "paketleme",

          "ambalaj",

          "paketleme işi",

          "ambalaj işi",

          "paketleme lazım",

          "ambalaj lazım",

          "paketleme usta",

          "paketleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "unpacking",
    name: "Paket Açma / Yerleştirme",
    keywords: [
      "paket açma",

      "yerleştirme",

      "paket açma işi",

      "yerleştirme işi",

      "paket açma lazım",

      "yerleştirme lazım",

      "paket açma usta",
    ],
    subServices: [
      {
        id: "unpacking-service",
        name: "Paket açma / yerleştirme hizmeti",
        keywords: [
          "paket açma",

          "yerleştirme",

          "paket açma işi",

          "yerleştirme işi",

          "paket açma usta",

          "paket açma lazım",
        ],
      },
      {
        id: "other-unpacking",
        name: "Diğer (paket açma / yerleştirme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "paket açma",

          "yerleştirme",

          "paket açma işi",

          "yerleştirme işi",

          "paket açma lazım",

          "yerleştirme lazım",

          "paket açma usta",

          "paket açma hizmeti",
        ],
      },
    ],
  },

  {
    id: "furniture-disassembly",
    name: "Mobilya Sökümü",
    keywords: [
      "mobilya sökümü",

      "mobilya sökme",

      "mobilya sökümü işi",

      "mobilya sökme işi",

      "mobilya sökümü lazım",

      "mobilya sökme lazım",

      "mobilya sökümü usta",
    ],
    subServices: [
      {
        id: "furniture-disassembly-service",
        name: "Mobilya sökümü hizmeti",
        keywords: [
          "mobilya sökümü",

          "mobilya sökme",

          "mobilya sökümü işi",

          "mobilya sökme işi",

          "mobilya sökümü usta",

          "mobilya sökümü lazım",
        ],
      },
      {
        id: "other-furniture-disassembly",
        name: "Diğer (mobilya sökümü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "mobilya sökümü",

          "mobilya sökme",

          "mobilya sökümü işi",

          "mobilya sökme işi",

          "mobilya sökümü lazım",

          "mobilya sökme lazım",

          "mobilya sökümü usta",

          "mobilya sökümü hizmeti",
        ],
      },
    ],
  },

  {
    id: "appliance-hookup",
    name: "Beyaz Eşya Bağlantısı",
    keywords: [
      "beyaz eşya bağlantısı",

      "beyaz eşya takma",

      "beyaz eşya bağlantısı işi",

      "beyaz eşya takma işi",

      "beyaz eşya bağlantısı lazım",

      "beyaz eşya takma lazım",
    ],
    subServices: [
      {
        id: "appliance-hookup-service",
        name: "Beyaz eşya bağlantısı hizmeti",
        keywords: [
          "beyaz eşya bağlantısı",

          "beyaz eşya takma",

          "beyaz eşya bağlantısı işi",

          "beyaz eşya takma işi",

          "beyaz eşya bağlantısı lazım",
        ],
      },
      {
        id: "other-appliance-hookup",
        name: "Diğer (beyaz eşya bağlantısı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "beyaz eşya bağlantısı",

          "beyaz eşya takma",

          "beyaz eşya bağlantısı işi",

          "beyaz eşya takma işi",

          "beyaz eşya bağlantısı lazım",

          "beyaz eşya takma lazım",

          "beyaz eşya bağlantısı hizmeti",
        ],
      },
    ],
  },

  {
    id: "tv-wall-mount",
    name: "TV Duvara Asma",
    keywords: [
      "tv duvara asma",

      "tv montajı",

      "tv duvara asma işi",

      "tv montajı işi",

      "tv duvara asma lazım",

      "tv montajı lazım",

      "tv duvara asma usta",
    ],
    subServices: [
      {
        id: "tv-wall-mount-service",
        name: "TV duvara asma hizmeti",
        keywords: [
          "tv duvara asma",

          "tv montajı",

          "tv takma",

          "tv duvara asma işi",

          "tv montajı işi",

          "tv duvara asma usta",

          "tv duvara asma lazım",
        ],
      },
      {
        id: "other-tv-wall-mount",
        name: "Diğer (TV duvara asma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tv duvara asma",

          "tv montajı",

          "tv duvara asma işi",

          "tv montajı işi",

          "tv duvara asma lazım",

          "tv montajı lazım",

          "tv duvara asma usta",

          "tv duvara asma hizmeti",
        ],
      },
    ],
  },

  {
    id: "cabinet-installation",
    name: "Dolap Montajı",
    keywords: [
      "dolap montajı",

      "dolap kurulumu",

      "dolap montajı işi",

      "dolap kurulumu işi",

      "dolap montajı lazım",

      "dolap kurulumu lazım",

      "dolap montajı usta",
    ],
    subServices: [
      {
        id: "cabinet-installation-service",
        name: "Dolap montajı hizmeti",
        keywords: [
          "dolap montajı",

          "dolap kurulumu",

          "dolap takma",

          "dolap montajı işi",

          "dolap kurulumu işi",

          "dolap montajı usta",

          "dolap montajı lazım",
        ],
      },
      {
        id: "other-cabinet-installation",
        name: "Diğer (dolap montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dolap montajı",

          "dolap kurulumu",

          "dolap montajı işi",

          "dolap kurulumu işi",

          "dolap montajı lazım",

          "dolap kurulumu lazım",

          "dolap montajı usta",

          "dolap montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "countertop-installation",
    name: "Tezgah Montajı",
    keywords: [
      "tezgah montajı",

      "tezgah kurulumu",

      "tezgah montajı işi",

      "tezgah kurulumu işi",

      "tezgah montajı lazım",

      "tezgah kurulumu lazım",

      "tezgah montajı usta",
    ],
    subServices: [
      {
        id: "countertop-installation-service",
        name: "Tezgah montajı hizmeti",
        keywords: [
          "tezgah montajı",

          "tezgah kurulumu",

          "tezgah takma",

          "tezgah montajı işi",

          "tezgah kurulumu işi",

          "tezgah montajı usta",

          "tezgah montajı lazım",
        ],
      },
      {
        id: "other-countertop-installation",
        name: "Diğer (tezgah montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tezgah montajı",

          "tezgah kurulumu",

          "tezgah montajı işi",

          "tezgah kurulumu işi",

          "tezgah montajı lazım",

          "tezgah kurulumu lazım",

          "tezgah montajı usta",

          "tezgah montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "backsplash-installation",
    name: "Splashback / Duvar Kaplama",
    keywords: [
      "splashback",

      "duvar kaplama",

      "splashback montajı",

      "duvar kaplama montajı",

      "splashback işi",

      "duvar kaplama işi",

      "splashback lazım",

      "duvar kaplama lazım",
    ],
    subServices: [
      {
        id: "backsplash-installation-service",
        name: "Splashback / duvar kaplama montajı",
        keywords: [
          "splashback montajı",

          "duvar kaplama montajı",

          "splashback kurulumu",

          "splashback montajı işi",

          "duvar kaplama montajı işi",

          "splashback montajı lazım",
        ],
      },
      {
        id: "other-backsplash-installation",
        name: "Diğer (splashback / duvar kaplama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "splashback",

          "duvar kaplama",

          "splashback montajı",

          "duvar kaplama montajı",

          "splashback işi",

          "duvar kaplama işi",

          "splashback lazım",

          "duvar kaplama lazım",

          "splashback hizmeti",
        ],
      },
    ],
  },

  {
    id: "shower-installation",
    name: "Duş / Küvet Montajı",
    keywords: [
      "duş montajı",

      "küvet montajı",

      "duş kurulumu",

      "küvet kurulumu",

      "duş montajı işi",

      "küvet montajı işi",

      "duş montajı lazım",

      "küvet montajı lazım",
    ],
    subServices: [
      {
        id: "shower-installation-service",
        name: "Duş / küvet montajı hizmeti",
        keywords: [
          "duş montajı",

          "küvet montajı",

          "duş kurulumu",

          "küvet kurulumu",

          "duş montajı işi",

          "küvet montajı işi",

          "duş montajı lazım",
        ],
      },
      {
        id: "shower-repair",
        name: "Duş / küvet tamiri",
        keywords: [
          "duş tamiri",

          "küvet tamiri",

          "duş onarımı",

          "küvet onarımı",

          "duş tamir",

          "küvet tamir",

          "duş tamiri lazım",
        ],
      },
      {
        id: "other-shower-installation",
        name: "Diğer (duş / küvet montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "duş montajı",

          "küvet montajı",

          "duş kurulumu",

          "küvet kurulumu",

          "duş montajı işi",

          "küvet montajı işi",

          "duş montajı lazım",

          "küvet montajı lazım",

          "duş montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "toilet-installation",
    name: "Klozet / Tuvalet Montajı",
    keywords: [
      "klozet montajı",

      "tuvalet montajı",

      "klozet kurulumu",

      "tuvalet kurulumu",

      "klozet montajı işi",

      "tuvalet montajı işi",

      "klozet montajı lazım",

      "tuvalet montajı lazım",
    ],
    subServices: [
      {
        id: "toilet-installation-service",
        name: "Klozet / tuvalet montajı hizmeti",
        keywords: [
          "klozet montajı",

          "tuvalet montajı",

          "klozet kurulumu",

          "tuvalet kurulumu",

          "klozet montajı işi",

          "tuvalet montajı işi",

          "klozet montajı lazım",
        ],
      },
      {
        id: "toilet-repair",
        name: "Klozet / tuvalet tamiri",
        keywords: [
          "klozet tamiri",

          "tuvalet tamiri",

          "klozet onarımı",

          "tuvalet onarımı",

          "klozet tamir",

          "tuvalet tamir",

          "klozet tamiri lazım",
        ],
      },
      {
        id: "other-toilet-installation",
        name: "Diğer (klozet / tuvalet montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "klozet montajı",

          "tuvalet montajı",

          "klozet kurulumu",

          "tuvalet kurulumu",

          "klozet montajı işi",

          "tuvalet montajı işi",

          "klozet montajı lazım",

          "tuvalet montajı lazım",

          "klozet montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "sink-installation",
    name: "Lavabo Montajı",
    keywords: [
      "lavabo montajı",

      "lavabo kurulumu",

      "lavabo montajı işi",

      "lavabo kurulumu işi",

      "lavabo montajı lazım",

      "lavabo kurulumu lazım",

      "lavabo montajı usta",
    ],
    subServices: [
      {
        id: "sink-installation-service",
        name: "Lavabo montajı hizmeti",
        keywords: [
          "lavabo montajı",

          "lavabo kurulumu",

          "lavabo takma",

          "lavabo montajı işi",

          "lavabo kurulumu işi",

          "lavabo montajı usta",

          "lavabo montajı lazım",
        ],
      },
      {
        id: "sink-repair",
        name: "Lavabo tamiri",
        keywords: [
          "lavabo tamiri",

          "lavabo onarımı",

          "lavabo düzeltme",

          "lavabo tamir",

          "lavabo onarım",

          "lavabo tamiri lazım",
        ],
      },
      {
        id: "other-sink-installation",
        name: "Diğer (lavabo montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "lavabo montajı",

          "lavabo kurulumu",

          "lavabo montajı işi",

          "lavabo kurulumu işi",

          "lavabo montajı lazım",

          "lavabo kurulumu lazım",

          "lavabo montajı usta",

          "lavabo montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "faucet-installation",
    name: "Musluk Montajı",
    keywords: [
      "musluk montajı",

      "musluk kurulumu",

      "musluk montajı işi",

      "musluk kurulumu işi",

      "musluk montajı lazım",

      "musluk kurulumu lazım",

      "musluk montajı usta",
    ],
    subServices: [
      {
        id: "faucet-installation-service",
        name: "Musluk montajı hizmeti",
        keywords: [
          "musluk montajı",

          "musluk kurulumu",

          "musluk takma",

          "musluk montajı işi",

          "musluk kurulumu işi",

          "musluk montajı usta",

          "musluk montajı lazım",
        ],
      },
      {
        id: "faucet-repair",
        name: "Musluk tamiri",
        keywords: [
          "musluk tamiri",

          "musluk onarımı",

          "musluk düzeltme",

          "musluk tamir",

          "musluk onarım",

          "musluk tamiri lazım",
        ],
      },
      {
        id: "other-faucet-installation",
        name: "Diğer (musluk montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "musluk montajı",

          "musluk kurulumu",

          "musluk montajı işi",

          "musluk kurulumu işi",

          "musluk montajı lazım",

          "musluk kurulumu lazım",

          "musluk montajı usta",

          "musluk montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "garbage-disposal",
    name: "Çöp Öğütücü Montajı",
    keywords: [
      "çöp öğütücü",

      "çöp öğütücü montajı",

      "çöp öğütücü kurulumu",

      "çöp öğütücü işi",

      "çöp öğütücü montajı işi",

      "çöp öğütücü lazım",
    ],
    subServices: [
      {
        id: "garbage-disposal-installation",
        name: "Çöp öğütücü montajı",
        keywords: [
          "çöp öğütücü montajı",

          "çöp öğütücü kurulumu",

          "çöp öğütücü takma",

          "çöp öğütücü montajı işi",

          "çöp öğütücü kurulumu işi",

          "çöp öğütücü montajı lazım",
        ],
      },
      {
        id: "garbage-disposal-repair",
        name: "Çöp öğütücü tamiri",
        keywords: [
          "çöp öğütücü tamiri",

          "çöp öğütücü onarımı",

          "çöp öğütücü düzeltme",

          "çöp öğütücü tamir",

          "çöp öğütücü onarım",

          "çöp öğütücü tamiri lazım",
        ],
      },
      {
        id: "other-garbage-disposal",
        name: "Diğer (çöp öğütücü montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çöp öğütücü",

          "çöp öğütücü montajı",

          "çöp öğütücü kurulumu",

          "çöp öğütücü işi",

          "çöp öğütücü montajı işi",

          "çöp öğütücü lazım",

          "çöp öğütücü hizmeti",
        ],
      },
    ],
  },

  {
    id: "dishwasher-installation",
    name: "Bulaşık Makinesi Montajı",
    keywords: [
      "bulaşık makinesi montajı",

      "bulaşık makinesi kurulumu",

      "bulaşık makinesi montajı işi",

      "bulaşık makinesi kurulumu işi",

      "bulaşık makinesi montajı lazım",

      "bulaşık makinesi kurulumu lazım",
    ],
    subServices: [
      {
        id: "dishwasher-installation-service",
        name: "Bulaşık makinesi montajı",
        keywords: [
          "bulaşık makinesi montajı",

          "bulaşık makinesi kurulumu",

          "bulaşık makinesi takma",

          "bulaşık makinesi montajı işi",

          "bulaşık makinesi kurulumu işi",

          "bulaşık makinesi montajı lazım",
        ],
      },
      {
        id: "other-dishwasher-installation",
        name: "Diğer (bulaşık makinesi montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bulaşık makinesi montajı",

          "bulaşık makinesi kurulumu",

          "bulaşık makinesi montajı işi",

          "bulaşık makinesi kurulumu işi",

          "bulaşık makinesi montajı lazım",

          "bulaşık makinesi kurulumu lazım",

          "bulaşık makinesi montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "washing-machine-installation",
    name: "Çamaşır Makinesi Montajı",
    keywords: [
      "çamaşır makinesi montajı",

      "çamaşır makinesi kurulumu",

      "çamaşır makinesi montajı işi",

      "çamaşır makinesi kurulumu işi",

      "çamaşır makinesi montajı lazım",

      "çamaşır makinesi kurulumu lazım",
    ],
    subServices: [
      {
        id: "washing-machine-installation-service",
        name: "Çamaşır makinesi montajı",
        keywords: [
          "çamaşır makinesi montajı",

          "çamaşır makinesi kurulumu",

          "çamaşır makinesi takma",

          "çamaşır makinesi montajı işi",

          "çamaşır makinesi kurulumu işi",

          "çamaşır makinesi montajı lazım",
        ],
      },
      {
        id: "other-washing-machine-installation",
        name: "Diğer (çamaşır makinesi montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çamaşır makinesi montajı",

          "çamaşır makinesi kurulumu",

          "çamaşır makinesi montajı işi",

          "çamaşır makinesi kurulumu işi",

          "çamaşır makinesi montajı lazım",

          "çamaşır makinesi kurulumu lazım",

          "çamaşır makinesi montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "dryer-installation",
    name: "Kurutucu Montajı",
    keywords: [
      "kurutucu montajı",

      "kurutucu kurulumu",

      "kurutucu montajı işi",

      "kurutucu kurulumu işi",

      "kurutucu montajı lazım",

      "kurutucu kurulumu lazım",

      "kurutucu montajı usta",
    ],
    subServices: [
      {
        id: "dryer-installation-service",
        name: "Kurutucu montajı hizmeti",
        keywords: [
          "kurutucu montajı",

          "kurutucu kurulumu",

          "kurutucu takma",

          "kurutucu montajı işi",

          "kurutucu kurulumu işi",

          "kurutucu montajı usta",

          "kurutucu montajı lazım",
        ],
      },
      {
        id: "other-dryer-installation",
        name: "Diğer (kurutucu montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kurutucu montajı",

          "kurutucu kurulumu",

          "kurutucu montajı işi",

          "kurutucu kurulumu işi",

          "kurutucu montajı lazım",

          "kurutucu kurulumu lazım",

          "kurutucu montajı usta",

          "kurutucu montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "refrigerator-installation",
    name: "Buzdolabı Montajı",
    keywords: [
      "buzdolabı montajı",

      "buzdolabı kurulumu",

      "buzdolabı montajı işi",

      "buzdolabı kurulumu işi",

      "buzdolabı montajı lazım",

      "buzdolabı kurulumu lazım",

      "buzdolabı montajı usta",
    ],
    subServices: [
      {
        id: "refrigerator-installation-service",
        name: "Buzdolabı montajı hizmeti",
        keywords: [
          "buzdolabı montajı",

          "buzdolabı kurulumu",

          "buzdolabı takma",

          "buzdolabı montajı işi",

          "buzdolabı kurulumu işi",

          "buzdolabı montajı usta",

          "buzdolabı montajı lazım",
        ],
      },
      {
        id: "other-refrigerator-installation",
        name: "Diğer (buzdolabı montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "buzdolabı montajı",

          "buzdolabı kurulumu",

          "buzdolabı montajı işi",

          "buzdolabı kurulumu işi",

          "buzdolabı montajı lazım",

          "buzdolabı kurulumu lazım",

          "buzdolabı montajı usta",

          "buzdolabı montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "oven-installation",
    name: "Fırın / Ocak Montajı",
    keywords: [
      "fırın montajı",

      "ocak montajı",

      "fırın kurulumu",

      "ocak kurulumu",

      "fırın montajı işi",

      "ocak montajı işi",

      "fırın montajı lazım",

      "ocak montajı lazım",
    ],
    subServices: [
      {
        id: "oven-installation-service",
        name: "Fırın / ocak montajı hizmeti",
        keywords: [
          "fırın montajı",

          "ocak montajı",

          "fırın kurulumu",

          "ocak kurulumu",

          "fırın montajı işi",

          "ocak montajı işi",

          "fırın montajı lazım",
        ],
      },
      {
        id: "other-oven-installation",
        name: "Diğer (fırın / ocak montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fırın montajı",

          "ocak montajı",

          "fırın kurulumu",

          "ocak kurulumu",

          "fırın montajı işi",

          "ocak montajı işi",

          "fırın montajı lazım",

          "ocak montajı lazım",

          "fırın montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "range-hood-installation",
    name: "Aspiratör / Davlumbaz Montajı",
    keywords: [
      "aspiratör montajı",

      "davlumbaz montajı",

      "aspiratör kurulumu",

      "davlumbaz kurulumu",

      "aspiratör montajı işi",

      "davlumbaz montajı işi",

      "aspiratör montajı lazım",

      "davlumbaz montajı lazım",
    ],
    subServices: [
      {
        id: "range-hood-installation-service",
        name: "Aspiratör / davlumbaz montajı hizmeti",
        keywords: [
          "aspiratör montajı",

          "davlumbaz montajı",

          "aspiratör kurulumu",

          "davlumbaz kurulumu",

          "aspiratör montajı işi",

          "davlumbaz montajı işi",

          "aspiratör montajı lazım",
        ],
      },
      {
        id: "other-range-hood-installation",
        name: "Diğer (aspiratör / davlumbaz montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "aspiratör montajı",

          "davlumbaz montajı",

          "aspiratör kurulumu",

          "davlumbaz kurulumu",

          "aspiratör montajı işi",

          "davlumbaz montajı işi",

          "aspiratör montajı lazım",

          "davlumbaz montajı lazım",

          "aspiratör montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "microwave-installation",
    name: "Mikrodalga Montajı",
    keywords: [
      "mikrodalga montajı",

      "mikrodalga kurulumu",

      "mikrodalga montajı işi",

      "mikrodalga kurulumu işi",

      "mikrodalga montajı lazım",

      "mikrodalga kurulumu lazım",

      "mikrodalga montajı usta",
    ],
    subServices: [
      {
        id: "microwave-installation-service",
        name: "Mikrodalga montajı hizmeti",
        keywords: [
          "mikrodalga montajı",

          "mikrodalga kurulumu",

          "mikrodalga takma",

          "mikrodalga montajı işi",

          "mikrodalga kurulumu işi",

          "mikrodalga montajı usta",

          "mikrodalga montajı lazım",
        ],
      },
      {
        id: "other-microwave-installation",
        name: "Diğer (mikrodalga montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "mikrodalga montajı",

          "mikrodalga kurulumu",

          "mikrodalga montajı işi",

          "mikrodalga kurulumu işi",

          "mikrodalga montajı lazım",

          "mikrodalga kurulumu lazım",

          "mikrodalga montajı usta",

          "mikrodalga montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "water-heater-installation",
    name: "Su Isıtıcı / Termosifon Montajı",
    keywords: [
      "su ısıtıcı montajı",

      "termosifon montajı",

      "su ısıtıcı kurulumu",

      "termosifon kurulumu",

      "su ısıtıcı montajı işi",

      "termosifon montajı işi",

      "su ısıtıcı montajı lazım",

      "termosifon montajı lazım",
    ],
    subServices: [
      {
        id: "water-heater-installation-service",
        name: "Su ısıtıcı / termosifon montajı",
        keywords: [
          "su ısıtıcı montajı",

          "termosifon montajı",

          "su ısıtıcı kurulumu",

          "termosifon kurulumu",

          "su ısıtıcı montajı işi",

          "termosifon montajı işi",

          "su ısıtıcı montajı lazım",
        ],
      },
      {
        id: "water-heater-repair",
        name: "Su ısıtıcı / termosifon tamiri",
        keywords: [
          "su ısıtıcı tamiri",

          "termosifon tamiri",

          "su ısıtıcı onarımı",

          "termosifon onarımı",

          "su ısıtıcı tamir",

          "termosifon tamir",

          "su ısıtıcı tamiri lazım",
        ],
      },
      {
        id: "other-water-heater-installation",
        name: "Diğer (su ısıtıcı / termosifon montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su ısıtıcı montajı",

          "termosifon montajı",

          "su ısıtıcı kurulumu",

          "termosifon kurulumu",

          "su ısıtıcı montajı işi",

          "termosifon montajı işi",

          "su ısıtıcı montajı lazım",

          "termosifon montajı lazım",

          "su ısıtıcı montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "water-softener-installation",
    name: "Su Yumuşatıcı Montajı",
    keywords: [
      "su yumuşatıcı montajı",

      "su yumuşatıcı kurulumu",

      "su yumuşatıcı montajı işi",

      "su yumuşatıcı kurulumu işi",

      "su yumuşatıcı montajı lazım",

      "su yumuşatıcı kurulumu lazım",
    ],
    subServices: [
      {
        id: "water-softener-installation-service",
        name: "Su yumuşatıcı montajı",
        keywords: [
          "su yumuşatıcı montajı",

          "su yumuşatıcı kurulumu",

          "su yumuşatıcı takma",

          "su yumuşatıcı montajı işi",

          "su yumuşatıcı kurulumu işi",

          "su yumuşatıcı montajı lazım",
        ],
      },
      {
        id: "water-softener-repair",
        name: "Su yumuşatıcı tamiri",
        keywords: [
          "su yumuşatıcı tamiri",

          "su yumuşatıcı onarımı",

          "su yumuşatıcı düzeltme",

          "su yumuşatıcı tamir",

          "su yumuşatıcı onarım",

          "su yumuşatıcı tamiri lazım",
        ],
      },
      {
        id: "other-water-softener-installation",
        name: "Diğer (su yumuşatıcı montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su yumuşatıcı montajı",

          "su yumuşatıcı kurulumu",

          "su yumuşatıcı montajı işi",

          "su yumuşatıcı kurulumu işi",

          "su yumuşatıcı montajı lazım",

          "su yumuşatıcı kurulumu lazım",

          "su yumuşatıcı montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "water-filter-installation",
    name: "Su Filtresi Montajı",
    keywords: [
      "su filtresi montajı",

      "su filtresi kurulumu",

      "su filtresi montajı işi",

      "su filtresi kurulumu işi",

      "su filtresi montajı lazım",

      "su filtresi kurulumu lazım",
    ],
    subServices: [
      {
        id: "water-filter-installation-service",
        name: "Su filtresi montajı",
        keywords: [
          "su filtresi montajı",

          "su filtresi kurulumu",

          "su filtresi takma",

          "su filtresi montajı işi",

          "su filtresi kurulumu işi",

          "su filtresi montajı lazım",
        ],
      },
      {
        id: "water-filter-repair",
        name: "Su filtresi tamiri",
        keywords: [
          "su filtresi tamiri",

          "su filtresi onarımı",

          "su filtresi düzeltme",

          "su filtresi tamir",

          "su filtresi onarım",

          "su filtresi tamiri lazım",
        ],
      },
      {
        id: "other-water-filter-installation",
        name: "Diğer (su filtresi montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su filtresi montajı",

          "su filtresi kurulumu",

          "su filtresi montajı işi",

          "su filtresi kurulumu işi",

          "su filtresi montajı lazım",

          "su filtresi kurulumu lazım",

          "su filtresi montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "water-pump-installation",
    name: "Su Pompası Montajı",
    keywords: [
      "su pompası montajı",

      "su pompası kurulumu",

      "su pompası montajı işi",

      "su pompası kurulumu işi",

      "su pompası montajı lazım",

      "su pompası kurulumu lazım",
    ],
    subServices: [
      {
        id: "water-pump-installation-service",
        name: "Su pompası montajı",
        keywords: [
          "su pompası montajı",

          "su pompası kurulumu",

          "su pompası takma",

          "su pompası montajı işi",

          "su pompası kurulumu işi",

          "su pompası montajı lazım",
        ],
      },
      {
        id: "water-pump-repair",
        name: "Su pompası tamiri",
        keywords: [
          "su pompası tamiri",

          "su pompası onarımı",

          "su pompası düzeltme",

          "su pompası tamir",

          "su pompası onarım",

          "su pompası tamiri lazım",
        ],
      },
      {
        id: "other-water-pump-installation",
        name: "Diğer (su pompası montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "su pompası montajı",

          "su pompası kurulumu",

          "su pompası montajı işi",

          "su pompası kurulumu işi",

          "su pompası montajı lazım",

          "su pompası kurulumu lazım",

          "su pompası montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "solar-panel-installation",
    name: "Güneş Paneli Montajı",
    keywords: [
      "güneş paneli montajı",

      "güneş paneli kurulumu",

      "güneş paneli montajı işi",

      "güneş paneli kurulumu işi",

      "güneş paneli montajı lazım",

      "güneş paneli kurulumu lazım",
    ],
    subServices: [
      {
        id: "solar-panel-installation-service",
        name: "Güneş paneli montajı",
        keywords: [
          "güneş paneli montajı",

          "güneş paneli kurulumu",

          "güneş paneli takma",

          "güneş paneli montajı işi",

          "güneş paneli kurulumu işi",

          "güneş paneli montajı lazım",
        ],
      },
      {
        id: "solar-panel-repair",
        name: "Güneş paneli tamiri",
        keywords: [
          "güneş paneli tamiri",

          "güneş paneli onarımı",

          "güneş paneli düzeltme",

          "güneş paneli tamir",

          "güneş paneli onarım",

          "güneş paneli tamiri lazım",
        ],
      },
      {
        id: "other-solar-panel-installation",
        name: "Diğer (güneş paneli montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "güneş paneli montajı",

          "güneş paneli kurulumu",

          "güneş paneli montajı işi",

          "güneş paneli kurulumu işi",

          "güneş paneli montajı lazım",

          "güneş paneli kurulumu lazım",

          "güneş paneli montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "generator-installation",
    name: "Jeneratör Montajı",
    keywords: [
      "jeneratör montajı",

      "jeneratör kurulumu",

      "jeneratör montajı işi",

      "jeneratör kurulumu işi",

      "jeneratör montajı lazım",

      "jeneratör kurulumu lazım",
    ],
    subServices: [
      {
        id: "generator-installation-service",
        name: "Jeneratör montajı",
        keywords: [
          "jeneratör montajı",

          "jeneratör kurulumu",

          "jeneratör takma",

          "jeneratör montajı işi",

          "jeneratör kurulumu işi",

          "jeneratör montajı lazım",
        ],
      },
      {
        id: "generator-repair",
        name: "Jeneratör tamiri",
        keywords: [
          "jeneratör tamiri",

          "jeneratör onarımı",

          "jeneratör düzeltme",

          "jeneratör tamir",

          "jeneratör onarım",

          "jeneratör tamiri lazım",
        ],
      },
      {
        id: "other-generator-installation",
        name: "Diğer (jeneratör montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "jeneratör montajı",

          "jeneratör kurulumu",

          "jeneratör montajı işi",

          "jeneratör kurulumu işi",

          "jeneratör montajı lazım",

          "jeneratör kurulumu lazım",

          "jeneratör montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "battery-installation",
    name: "Akü / Batarya Montajı",
    keywords: [
      "akü montajı",

      "batarya montajı",

      "akü kurulumu",

      "batarya kurulumu",

      "akü montajı işi",

      "batarya montajı işi",

      "akü montajı lazım",

      "batarya montajı lazım",
    ],
    subServices: [
      {
        id: "battery-installation-service",
        name: "Akü / batarya montajı",
        keywords: [
          "akü montajı",

          "batarya montajı",

          "akü kurulumu",

          "batarya kurulumu",

          "akü montajı işi",

          "batarya montajı işi",

          "akü montajı lazım",
        ],
      },
      {
        id: "battery-repair",
        name: "Akü / batarya tamiri",
        keywords: [
          "akü tamiri",

          "batarya tamiri",

          "akü onarımı",

          "batarya onarımı",

          "akü tamir",

          "batarya tamir",

          "akü tamiri lazım",
        ],
      },
      {
        id: "other-battery-installation",
        name: "Diğer (akü / batarya montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "akü montajı",

          "batarya montajı",

          "akü kurulumu",

          "batarya kurulumu",

          "akü montajı işi",

          "batarya montajı işi",

          "akü montajı lazım",

          "batarya montajı lazım",

          "akü montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "inverter-installation",
    name: "İnvertör Montajı",
    keywords: [
      "invertör montajı",

      "invertör kurulumu",

      "invertör montajı işi",

      "invertör kurulumu işi",

      "invertör montajı lazım",

      "invertör kurulumu lazım",
    ],
    subServices: [
      {
        id: "inverter-installation-service",
        name: "İnvertör montajı",
        keywords: [
          "invertör montajı",

          "invertör kurulumu",

          "invertör takma",

          "invertör montajı işi",

          "invertör kurulumu işi",

          "invertör montajı lazım",
        ],
      },
      {
        id: "inverter-repair",
        name: "İnvertör tamiri",
        keywords: [
          "invertör tamiri",

          "invertör onarımı",

          "invertör düzeltme",

          "invertör tamir",

          "invertör onarım",

          "invertör tamiri lazım",
        ],
      },
      {
        id: "other-inverter-installation",
        name: "Diğer (invertör montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "invertör montajı",

          "invertör kurulumu",

          "invertör montajı işi",

          "invertör kurulumu işi",

          "invertör montajı lazım",

          "invertör kurulumu lazım",

          "invertör montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "smart-home-installation",
    name: "Akıllı Ev Sistemleri",
    keywords: [
      "akıllı ev sistemleri",

      "smart home",

      "akıllı ev kurulumu",

      "smart home kurulumu",

      "akıllı ev sistemleri işi",

      "smart home işi",

      "akıllı ev sistemleri lazım",

      "smart home lazım",
    ],
    subServices: [
      {
        id: "smart-home-installation-service",
        name: "Akıllı ev sistemleri kurulumu",
        keywords: [
          "akıllı ev sistemleri",

          "smart home",

          "akıllı ev kurulumu",

          "smart home kurulumu",

          "akıllı ev sistemleri işi",

          "smart home işi",

          "akıllı ev sistemleri lazım",
        ],
      },
      {
        id: "smart-home-repair",
        name: "Akıllı ev sistemleri tamiri",
        keywords: [
          "akıllı ev sistemleri tamiri",

          "smart home tamiri",

          "akıllı ev onarımı",

          "akıllı ev sistemleri tamir",

          "smart home tamir",

          "akıllı ev sistemleri tamiri lazım",
        ],
      },
      {
        id: "other-smart-home-installation",
        name: "Diğer (akıllı ev sistemleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "akıllı ev sistemleri",

          "smart home",

          "akıllı ev kurulumu",

          "smart home kurulumu",

          "akıllı ev sistemleri işi",

          "smart home işi",

          "akıllı ev sistemleri lazım",

          "smart home lazım",

          "akıllı ev sistemleri hizmeti",
        ],
      },
    ],
  },

  {
    id: "home-automation",
    name: "Ev Otomasyonu",
    keywords: [
      "ev otomasyonu",

      "home automation",

      "ev otomasyonu kurulumu",

      "home automation kurulumu",

      "ev otomasyonu işi",

      "home automation işi",

      "ev otomasyonu lazım",

      "home automation lazım",
    ],
    subServices: [
      {
        id: "home-automation-service",
        name: "Ev otomasyonu kurulumu",
        keywords: [
          "ev otomasyonu",

          "home automation",

          "ev otomasyonu kurulumu",

          "home automation kurulumu",

          "ev otomasyonu işi",

          "home automation işi",

          "ev otomasyonu lazım",
        ],
      },
      {
        id: "home-automation-repair",
        name: "Ev otomasyonu tamiri",
        keywords: [
          "ev otomasyonu tamiri",

          "home automation tamiri",

          "ev otomasyonu onarımı",

          "ev otomasyonu tamir",

          "home automation tamir",

          "ev otomasyonu tamiri lazım",
        ],
      },
      {
        id: "other-home-automation",
        name: "Diğer (ev otomasyonu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ev otomasyonu",

          "home automation",

          "ev otomasyonu kurulumu",

          "home automation kurulumu",

          "ev otomasyonu işi",

          "home automation işi",

          "ev otomasyonu lazım",

          "home automation lazım",

          "ev otomasyonu hizmeti",
        ],
      },
    ],
  },

  {
    id: "intercom-installation",
    name: "İnterkom / Kapı Telefonu Montajı",
    keywords: [
      "interkom montajı",

      "kapı telefonu montajı",

      "interkom kurulumu",

      "kapı telefonu kurulumu",

      "interkom montajı işi",

      "kapı telefonu montajı işi",

      "interkom montajı lazım",

      "kapı telefonu montajı lazım",
    ],
    subServices: [
      {
        id: "intercom-installation-service",
        name: "İnterkom / kapı telefonu montajı",
        keywords: [
          "interkom montajı",

          "kapı telefonu montajı",

          "interkom kurulumu",

          "kapı telefonu kurulumu",

          "interkom montajı işi",

          "kapı telefonu montajı işi",

          "interkom montajı lazım",
        ],
      },
      {
        id: "intercom-repair",
        name: "İnterkom / kapı telefonu tamiri",
        keywords: [
          "interkom tamiri",

          "kapı telefonu tamiri",

          "interkom onarımı",

          "kapı telefonu onarımı",

          "interkom tamir",

          "kapı telefonu tamir",

          "interkom tamiri lazım",
        ],
      },
      {
        id: "other-intercom-installation",
        name: "Diğer (interkom / kapı telefonu montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "interkom montajı",

          "kapı telefonu montajı",

          "interkom kurulumu",

          "kapı telefonu kurulumu",

          "interkom montajı işi",

          "kapı telefonu montajı işi",

          "interkom montajı lazım",

          "kapı telefonu montajı lazım",

          "interkom montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "doorbell-installation",
    name: "Kapı Zili Montajı",
    keywords: [
      "kapı zili montajı",

      "kapı zili kurulumu",

      "kapı zili montajı işi",

      "kapı zili kurulumu işi",

      "kapı zili montajı lazım",

      "kapı zili kurulumu lazım",
    ],
    subServices: [
      {
        id: "doorbell-installation-service",
        name: "Kapı zili montajı",
        keywords: [
          "kapı zili montajı",

          "kapı zili kurulumu",

          "kapı zili takma",

          "kapı zili montajı işi",

          "kapı zili kurulumu işi",

          "kapı zili montajı lazım",
        ],
      },
      {
        id: "doorbell-repair",
        name: "Kapı zili tamiri",
        keywords: [
          "kapı zili tamiri",

          "kapı zili onarımı",

          "kapı zili düzeltme",

          "kapı zili tamir",

          "kapı zili onarım",

          "kapı zili tamiri lazım",
        ],
      },
      {
        id: "other-doorbell-installation",
        name: "Diğer (kapı zili montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kapı zili montajı",

          "kapı zili kurulumu",

          "kapı zili montajı işi",

          "kapı zili kurulumu işi",

          "kapı zili montajı lazım",

          "kapı zili kurulumu lazım",

          "kapı zili montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "gate-installation",
    name: "Kapı / Bahçe Kapısı Montajı",
    keywords: [
      "kapı montajı",

      "bahçe kapısı montajı",

      "kapı kurulumu",

      "bahçe kapısı kurulumu",

      "kapı montajı işi",

      "bahçe kapısı montajı işi",

      "kapı montajı lazım",

      "bahçe kapısı montajı lazım",
    ],
    subServices: [
      {
        id: "gate-installation-service",
        name: "Kapı / bahçe kapısı montajı",
        keywords: [
          "kapı montajı",

          "bahçe kapısı montajı",

          "kapı kurulumu",

          "bahçe kapısı kurulumu",

          "kapı montajı işi",

          "bahçe kapısı montajı işi",

          "kapı montajı lazım",
        ],
      },
      {
        id: "gate-repair",
        name: "Kapı / bahçe kapısı tamiri",
        keywords: [
          "kapı tamiri",

          "bahçe kapısı tamiri",

          "kapı onarımı",

          "bahçe kapısı onarımı",

          "kapı tamir",

          "bahçe kapısı tamir",

          "kapı tamiri lazım",
        ],
      },
      {
        id: "other-gate-installation",
        name: "Diğer (kapı / bahçe kapısı montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kapı montajı",

          "bahçe kapısı montajı",

          "kapı kurulumu",

          "bahçe kapısı kurulumu",

          "kapı montajı işi",

          "bahçe kapısı montajı işi",

          "kapı montajı lazım",

          "bahçe kapısı montajı lazım",

          "kapı montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "garage-door-installation",
    name: "Garaj Kapısı Montajı",
    keywords: [
      "garaj kapısı montajı",

      "garaj kapısı kurulumu",

      "garaj kapısı montajı işi",

      "garaj kapısı kurulumu işi",

      "garaj kapısı montajı lazım",

      "garaj kapısı kurulumu lazım",
    ],
    subServices: [
      {
        id: "garage-door-installation-service",
        name: "Garaj kapısı montajı",
        keywords: [
          "garaj kapısı montajı",

          "garaj kapısı kurulumu",

          "garaj kapısı takma",

          "garaj kapısı montajı işi",

          "garaj kapısı kurulumu işi",

          "garaj kapısı montajı lazım",
        ],
      },
      {
        id: "garage-door-repair",
        name: "Garaj kapısı tamiri",
        keywords: [
          "garaj kapısı tamiri",

          "garaj kapısı onarımı",

          "garaj kapısı düzeltme",

          "garaj kapısı tamir",

          "garaj kapısı onarım",

          "garaj kapısı tamiri lazım",
        ],
      },
      {
        id: "other-garage-door-installation",
        name: "Diğer (garaj kapısı montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "garaj kapısı montajı",

          "garaj kapısı kurulumu",

          "garaj kapısı montajı işi",

          "garaj kapısı kurulumu işi",

          "garaj kapısı montajı lazım",

          "garaj kapısı kurulumu lazım",

          "garaj kapısı montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "window-repair",
    name: "Pencere Tamiri",
    keywords: [
      "pencere tamiri",

      "pencere onarımı",

      "pencere tamir",

      "pencere onarım",

      "pencere tamiri işi",

      "pencere onarımı işi",

      "pencere tamiri lazım",

      "pencere onarımı lazım",
    ],
    subServices: [
      {
        id: "window-repair-service",
        name: "Pencere tamiri",
        keywords: [
          "pencere tamiri",

          "pencere onarımı",

          "pencere tamir",

          "pencere onarım",

          "pencere tamiri işi",

          "pencere onarımı işi",

          "pencere tamiri lazım",
        ],
      },
      {
        id: "window-replacement",
        name: "Pencere değişimi",
        keywords: [
          "pencere değişimi",

          "pencere değiştirme",

          "pencere yenileme",

          "pencere değişimi işi",

          "pencere değiştirme işi",

          "pencere değişimi lazım",
        ],
      },
      {
        id: "other-window-repair",
        name: "Diğer (pencere tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "pencere tamiri",

          "pencere onarımı",

          "pencere tamir",

          "pencere onarım",

          "pencere tamiri işi",

          "pencere onarımı işi",

          "pencere tamiri lazım",

          "pencere onarımı lazım",

          "pencere tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "door-repair",
    name: "Kapı Tamiri",
    keywords: [
      "kapı tamiri",

      "kapı onarımı",

      "kapı tamir",

      "kapı onarım",

      "kapı tamiri işi",

      "kapı onarımı işi",

      "kapı tamiri lazım",

      "kapı onarımı lazım",
    ],
    subServices: [
      {
        id: "door-repair-service",
        name: "Kapı tamiri",
        keywords: [
          "kapı tamiri",

          "kapı onarımı",

          "kapı tamir",

          "kapı onarım",

          "kapı tamiri işi",

          "kapı onarımı işi",

          "kapı tamiri lazım",
        ],
      },
      {
        id: "door-replacement",
        name: "Kapı değişimi",
        keywords: [
          "kapı değişimi",

          "kapı değiştirme",

          "kapı yenileme",

          "kapı değişimi işi",

          "kapı değiştirme işi",

          "kapı değişimi lazım",
        ],
      },
      {
        id: "other-door-repair",
        name: "Diğer (kapı tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kapı tamiri",

          "kapı onarımı",

          "kapı tamir",

          "kapı onarım",

          "kapı tamiri işi",

          "kapı onarımı işi",

          "kapı tamiri lazım",

          "kapı onarımı lazım",

          "kapı tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "lock-installation",
    name: "Kilit Montajı / Tamiri",
    keywords: [
      "kilit montajı",

      "kilit tamiri",

      "kilit kurulumu",

      "kilit onarımı",

      "kilit montajı işi",

      "kilit tamiri işi",

      "kilit montajı lazım",

      "kilit tamiri lazım",
    ],
    subServices: [
      {
        id: "lock-installation-service",
        name: "Kilit montajı",
        keywords: [
          "kilit montajı",

          "kilit kurulumu",

          "kilit takma",

          "kilit montajı işi",

          "kilit kurulumu işi",

          "kilit montajı lazım",
        ],
      },
      {
        id: "lock-repair",
        name: "Kilit tamiri",
        keywords: [
          "kilit tamiri",

          "kilit onarımı",

          "kilit düzeltme",

          "kilit tamir",

          "kilit onarım",

          "kilit tamiri lazım",
        ],
      },
      {
        id: "other-lock-installation",
        name: "Diğer (kilit montajı / tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kilit montajı",

          "kilit tamiri",

          "kilit kurulumu",

          "kilit onarımı",

          "kilit montajı işi",

          "kilit tamiri işi",

          "kilit montajı lazım",

          "kilit tamiri lazım",

          "kilit montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "blinds-installation",
    name: "Jaluzi / Stor Montajı",
    keywords: [
      "jaluzi montajı",

      "stor montajı",

      "jaluzi kurulumu",

      "stor kurulumu",

      "jaluzi montajı işi",

      "stor montajı işi",

      "jaluzi montajı lazım",

      "stor montajı lazım",
    ],
    subServices: [
      {
        id: "blinds-installation-service",
        name: "Jaluzi / stor montajı",
        keywords: [
          "jaluzi montajı",

          "stor montajı",

          "jaluzi kurulumu",

          "stor kurulumu",

          "jaluzi montajı işi",

          "stor montajı işi",

          "jaluzi montajı lazım",
        ],
      },
      {
        id: "blinds-repair",
        name: "Jaluzi / stor tamiri",
        keywords: [
          "jaluzi tamiri",

          "stor tamiri",

          "jaluzi onarımı",

          "stor onarımı",

          "jaluzi tamir",

          "stor tamir",

          "jaluzi tamiri lazım",
        ],
      },
      {
        id: "other-blinds-installation",
        name: "Diğer (jaluzi / stor montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "jaluzi montajı",

          "stor montajı",

          "jaluzi kurulumu",

          "stor kurulumu",

          "jaluzi montajı işi",

          "stor montajı işi",

          "jaluzi montajı lazım",

          "stor montajı lazım",

          "jaluzi montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "curtain-installation",
    name: "Perde Montajı",
    keywords: [
      "perde montajı",

      "perde kurulumu",

      "perde montajı işi",

      "perde kurulumu işi",

      "perde montajı lazım",

      "perde kurulumu lazım",
    ],
    subServices: [
      {
        id: "curtain-installation-service",
        name: "Perde montajı",
        keywords: [
          "perde montajı",

          "perde kurulumu",

          "perde takma",

          "perde montajı işi",

          "perde kurulumu işi",

          "perde montajı lazım",
        ],
      },
      {
        id: "curtain-repair",
        name: "Perde tamiri",
        keywords: [
          "perde tamiri",

          "perde onarımı",

          "perde düzeltme",

          "perde tamir",

          "perde onarım",

          "perde tamiri lazım",
        ],
      },
      {
        id: "other-curtain-installation",
        name: "Diğer (perde montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "perde montajı",

          "perde kurulumu",

          "perde montajı işi",

          "perde kurulumu işi",

          "perde montajı lazım",

          "perde kurulumu lazım",

          "perde montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "awning-installation",
    name: "Tente / Gölgelik Montajı",
    keywords: [
      "tente montajı",

      "gölgelik montajı",

      "tente kurulumu",

      "gölgelik kurulumu",

      "tente montajı işi",

      "gölgelik montajı işi",

      "tente montajı lazım",

      "gölgelik montajı lazım",
    ],
    subServices: [
      {
        id: "awning-installation-service",
        name: "Tente / gölgelik montajı",
        keywords: [
          "tente montajı",

          "gölgelik montajı",

          "tente kurulumu",

          "gölgelik kurulumu",

          "tente montajı işi",

          "gölgelik montajı işi",

          "tente montajı lazım",
        ],
      },
      {
        id: "awning-repair",
        name: "Tente / gölgelik tamiri",
        keywords: [
          "tente tamiri",

          "gölgelik tamiri",

          "tente onarımı",

          "gölgelik onarımı",

          "tente tamir",

          "gölgelik tamir",

          "tente tamiri lazım",
        ],
      },
      {
        id: "other-awning-installation",
        name: "Diğer (tente / gölgelik montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tente montajı",

          "gölgelik montajı",

          "tente kurulumu",

          "gölgelik kurulumu",

          "tente montajı işi",

          "gölgelik montajı işi",

          "tente montajı lazım",

          "gölgelik montajı lazım",

          "tente montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "chimney-cleaning",
    name: "Baca Temizliği",
    keywords: [
      "baca temizliği",

      "baca temizleme",

      "baca temizliği işi",

      "baca temizleme işi",

      "baca temizliği lazım",

      "baca temizleme lazım",

      "baca temizliği usta",
    ],
    subServices: [
      {
        id: "chimney-cleaning-service",
        name: "Baca temizliği hizmeti",
        keywords: [
          "baca temizliği",

          "baca temizleme",

          "baca temizliği işi",

          "baca temizleme işi",

          "baca temizliği usta",

          "baca temizliği lazım",
        ],
      },
      {
        id: "other-chimney-cleaning",
        name: "Diğer (baca temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "baca temizliği",

          "baca temizleme",

          "baca temizliği işi",

          "baca temizleme işi",

          "baca temizliği lazım",

          "baca temizleme lazım",

          "baca temizliği usta",

          "baca temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "septic-tank-cleaning",
    name: "Foseptik / Kanalizasyon Temizliği",
    keywords: [
      "foseptik temizliği",

      "kanalizasyon temizliği",

      "foseptik temizleme",

      "kanalizasyon temizleme",

      "foseptik temizliği işi",

      "kanalizasyon temizliği işi",

      "foseptik temizliği lazım",
    ],
    subServices: [
      {
        id: "septic-tank-cleaning-service",
        name: "Foseptik / kanalizasyon temizliği",
        keywords: [
          "foseptik temizliği",

          "kanalizasyon temizliği",

          "foseptik temizleme",

          "kanalizasyon temizleme",

          "foseptik temizliği işi",

          "kanalizasyon temizliği işi",

          "foseptik temizliği lazım",
        ],
      },
      {
        id: "other-septic-tank-cleaning",
        name: "Diğer (foseptik / kanalizasyon temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "foseptik temizliği",

          "kanalizasyon temizliği",

          "foseptik temizleme",

          "kanalizasyon temizleme",

          "foseptik temizliği işi",

          "kanalizasyon temizliği işi",

          "foseptik temizliği lazım",

          "foseptik temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "gutter-cleaning",
    name: "Oluk Temizliği",
    keywords: [
      "oluk temizliği",

      "oluk temizleme",

      "oluk temizliği işi",

      "oluk temizleme işi",

      "oluk temizliği lazım",

      "oluk temizleme lazım",

      "oluk temizliği usta",
    ],
    subServices: [
      {
        id: "gutter-cleaning-service",
        name: "Oluk temizliği hizmeti",
        keywords: [
          "oluk temizliği",

          "oluk temizleme",

          "oluk temizliği işi",

          "oluk temizleme işi",

          "oluk temizliği usta",

          "oluk temizliği lazım",
        ],
      },
      {
        id: "other-gutter-cleaning",
        name: "Diğer (oluk temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "oluk temizliği",

          "oluk temizleme",

          "oluk temizliği işi",

          "oluk temizleme işi",

          "oluk temizliği lazım",

          "oluk temizleme lazım",

          "oluk temizliği usta",

          "oluk temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "vent-duct-cleaning",
    name: "Havalandırma Kanalı Temizliği",
    keywords: [
      "havalandırma kanalı temizliği",

      "hava kanalı temizliği",

      "havalandırma temizliği",

      "havalandırma kanalı temizliği işi",

      "hava kanalı temizliği işi",

      "havalandırma temizliği lazım",
    ],
    subServices: [
      {
        id: "vent-duct-cleaning-service",
        name: "Havalandırma kanalı temizliği",
        keywords: [
          "havalandırma kanalı temizliği",

          "hava kanalı temizliği",

          "havalandırma temizliği",

          "havalandırma kanalı temizliği işi",

          "hava kanalı temizliği işi",

          "havalandırma temizliği lazım",
        ],
      },
      {
        id: "other-vent-duct-cleaning",
        name: "Diğer (havalandırma kanalı temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "havalandırma kanalı temizliği",

          "hava kanalı temizliği",

          "havalandırma temizliği",

          "havalandırma kanalı temizliği işi",

          "hava kanalı temizliği işi",

          "havalandırma temizliği lazım",

          "havalandırma kanalı temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "pressure-washing",
    name: "Basınçlı Yıkama",
    keywords: [
      "basınçlı yıkama",

      "basınçlı yıkama işi",

      "basınçlı yıkama lazım",

      "basınçlı yıkama usta",

      "basınçlı yıkama hizmeti",
    ],
    subServices: [
      {
        id: "pressure-washing-service",
        name: "Basınçlı yıkama hizmeti",
        keywords: [
          "basınçlı yıkama",

          "basınçlı yıkama işi",

          "basınçlı yıkama lazım",

          "basınçlı yıkama usta",

          "basınçlı yıkama hizmeti",
        ],
      },
      {
        id: "other-pressure-washing",
        name: "Diğer (basınçlı yıkama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "basınçlı yıkama",

          "basınçlı yıkama işi",

          "basınçlı yıkama lazım",

          "basınçlı yıkama usta",

          "basınçlı yıkama hizmeti",
        ],
      },
    ],
  },

  {
    id: "snow-removal",
    name: "Kar Temizleme",
    keywords: [
      "kar temizleme",

      "kar kürüme",

      "kar temizleme işi",

      "kar kürüme işi",

      "kar temizleme lazım",

      "kar kürüme lazım",

      "kar temizleme usta",
    ],
    subServices: [
      {
        id: "snow-removal-service",
        name: "Kar temizleme hizmeti",
        keywords: [
          "kar temizleme",

          "kar kürüme",

          "kar temizleme işi",

          "kar kürüme işi",

          "kar temizleme usta",

          "kar temizleme lazım",
        ],
      },
      {
        id: "other-snow-removal",
        name: "Diğer (kar temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kar temizleme",

          "kar kürüme",

          "kar temizleme işi",

          "kar kürüme işi",

          "kar temizleme lazım",

          "kar kürüme lazım",

          "kar temizleme usta",

          "kar temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "ice-removal",
    name: "Buz Temizleme",
    keywords: [
      "buz temizleme",

      "buz kırma",

      "buz temizleme işi",

      "buz kırma işi",

      "buz temizleme lazım",

      "buz kırma lazım",

      "buz temizleme usta",
    ],
    subServices: [
      {
        id: "ice-removal-service",
        name: "Buz temizleme hizmeti",
        keywords: [
          "buz temizleme",

          "buz kırma",

          "buz temizleme işi",

          "buz kırma işi",

          "buz temizleme usta",

          "buz temizleme lazım",
        ],
      },
      {
        id: "other-ice-removal",
        name: "Diğer (buz temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "buz temizleme",

          "buz kırma",

          "buz temizleme işi",

          "buz kırma işi",

          "buz temizleme lazım",

          "buz kırma lazım",

          "buz temizleme usta",

          "buz temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "leaf-removal",
    name: "Yaprak Temizleme",
    keywords: [
      "yaprak temizleme",

      "yaprak toplama",

      "yaprak temizleme işi",

      "yaprak toplama işi",

      "yaprak temizleme lazım",

      "yaprak toplama lazım",

      "yaprak temizleme usta",
    ],
    subServices: [
      {
        id: "leaf-removal-service",
        name: "Yaprak temizleme hizmeti",
        keywords: [
          "yaprak temizleme",

          "yaprak toplama",

          "yaprak temizleme işi",

          "yaprak toplama işi",

          "yaprak temizleme usta",

          "yaprak temizleme lazım",
        ],
      },
      {
        id: "other-leaf-removal",
        name: "Diğer (yaprak temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yaprak temizleme",

          "yaprak toplama",

          "yaprak temizleme işi",

          "yaprak toplama işi",

          "yaprak temizleme lazım",

          "yaprak toplama lazım",

          "yaprak temizleme usta",

          "yaprak temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "tree-removal",
    name: "Ağaç Kesimi",
    keywords: [
      "ağaç kesimi",

      "ağaç kesme",

      "ağaç kesimi işi",

      "ağaç kesme işi",

      "ağaç kesimi lazım",

      "ağaç kesme lazım",

      "ağaç kesimi usta",
    ],
    subServices: [
      {
        id: "tree-removal-service",
        name: "Ağaç kesimi hizmeti",
        keywords: [
          "ağaç kesimi",

          "ağaç kesme",

          "ağaç kesimi işi",

          "ağaç kesme işi",

          "ağaç kesimi usta",

          "ağaç kesimi lazım",
        ],
      },
      {
        id: "other-tree-removal",
        name: "Diğer (ağaç kesimi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ağaç kesimi",

          "ağaç kesme",

          "ağaç kesimi işi",

          "ağaç kesme işi",

          "ağaç kesimi lazım",

          "ağaç kesme lazım",

          "ağaç kesimi usta",

          "ağaç kesimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "stump-removal",
    name: "Kütük Sökümü",
    keywords: [
      "kütük sökümü",

      "kütük sökme",

      "kütük sökümü işi",

      "kütük sökme işi",

      "kütük sökümü lazım",

      "kütük sökme lazım",

      "kütük sökümü usta",
    ],
    subServices: [
      {
        id: "stump-removal-service",
        name: "Kütük sökümü hizmeti",
        keywords: [
          "kütük sökümü",

          "kütük sökme",

          "kütük sökümü işi",

          "kütük sökme işi",

          "kütük sökümü usta",

          "kütük sökümü lazım",
        ],
      },
      {
        id: "other-stump-removal",
        name: "Diğer (kütük sökümü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kütük sökümü",

          "kütük sökme",

          "kütük sökümü işi",

          "kütük sökme işi",

          "kütük sökümü lazım",

          "kütük sökme lazım",

          "kütük sökümü usta",

          "kütük sökümü hizmeti",
        ],
      },
    ],
  },

  {
    id: "hedge-trimming",
    name: "Çit Budama",
    keywords: [
      "çit budama",

      "çit kesme",

      "çit budama işi",

      "çit kesme işi",

      "çit budama lazım",

      "çit kesme lazım",

      "çit budama usta",
    ],
    subServices: [
      {
        id: "hedge-trimming-service",
        name: "Çit budama hizmeti",
        keywords: [
          "çit budama",

          "çit kesme",

          "çit budama işi",

          "çit kesme işi",

          "çit budama usta",

          "çit budama lazım",
        ],
      },
      {
        id: "other-hedge-trimming",
        name: "Diğer (çit budama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çit budama",

          "çit kesme",

          "çit budama işi",

          "çit kesme işi",

          "çit budama lazım",

          "çit kesme lazım",

          "çit budama usta",

          "çit budama hizmeti",
        ],
      },
    ],
  },

  {
    id: "mulching",
    name: "Malçlama",
    keywords: [
      "malçlama",

      "malç yapma",

      "malçlama işi",

      "malç yapma işi",

      "malçlama lazım",

      "malç yapma lazım",

      "malçlama usta",
    ],
    subServices: [
      {
        id: "mulching-service",
        name: "Malçlama hizmeti",
        keywords: [
          "malçlama",

          "malç yapma",

          "malçlama işi",

          "malç yapma işi",

          "malçlama usta",

          "malçlama lazım",
        ],
      },
      {
        id: "other-mulching",
        name: "Diğer (malçlama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "malçlama",

          "malç yapma",

          "malçlama işi",

          "malç yapma işi",

          "malçlama lazım",

          "malç yapma lazım",

          "malçlama usta",

          "malçlama hizmeti",
        ],
      },
    ],
  },

  {
    id: "irrigation-installation",
    name: "Sulama Sistemi Kurulumu",
    keywords: [
      "sulama sistemi kurulumu",

      "sulama sistemi montajı",

      "sulama sistemi kurulumu işi",

      "sulama sistemi montajı işi",

      "sulama sistemi kurulumu lazım",

      "sulama sistemi montajı lazım",
    ],
    subServices: [
      {
        id: "irrigation-installation-service",
        name: "Sulama sistemi kurulumu",
        keywords: [
          "sulama sistemi kurulumu",

          "sulama sistemi montajı",

          "sulama sistemi takma",

          "sulama sistemi kurulumu işi",

          "sulama sistemi montajı işi",

          "sulama sistemi kurulumu lazım",
        ],
      },
      {
        id: "irrigation-repair",
        name: "Sulama sistemi tamiri",
        keywords: [
          "sulama sistemi tamiri",

          "sulama sistemi onarımı",

          "sulama sistemi düzeltme",

          "sulama sistemi tamir",

          "sulama sistemi onarım",

          "sulama sistemi tamiri lazım",
        ],
      },
      {
        id: "other-irrigation-installation",
        name: "Diğer (sulama sistemi kurulumu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "sulama sistemi kurulumu",

          "sulama sistemi montajı",

          "sulama sistemi kurulumu işi",

          "sulama sistemi montajı işi",

          "sulama sistemi kurulumu lazım",

          "sulama sistemi montajı lazım",

          "sulama sistemi kurulumu hizmeti",
        ],
      },
    ],
  },

  {
    id: "sprinkler-installation",
    name: "Fıskiye Sistemi Kurulumu",
    keywords: [
      "fıskiye sistemi kurulumu",

      "fıskiye sistemi montajı",

      "fıskiye sistemi kurulumu işi",

      "fıskiye sistemi montajı işi",

      "fıskiye sistemi kurulumu lazım",

      "fıskiye sistemi montajı lazım",
    ],
    subServices: [
      {
        id: "sprinkler-installation-service",
        name: "Fıskiye sistemi kurulumu",
        keywords: [
          "fıskiye sistemi kurulumu",

          "fıskiye sistemi montajı",

          "fıskiye sistemi takma",

          "fıskiye sistemi kurulumu işi",

          "fıskiye sistemi montajı işi",

          "fıskiye sistemi kurulumu lazım",
        ],
      },
      {
        id: "sprinkler-repair",
        name: "Fıskiye sistemi tamiri",
        keywords: [
          "fıskiye sistemi tamiri",

          "fıskiye sistemi onarımı",

          "fıskiye sistemi düzeltme",

          "fıskiye sistemi tamir",

          "fıskiye sistemi onarım",

          "fıskiye sistemi tamiri lazım",
        ],
      },
      {
        id: "other-sprinkler-installation",
        name: "Diğer (fıskiye sistemi kurulumu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fıskiye sistemi kurulumu",

          "fıskiye sistemi montajı",

          "fıskiye sistemi kurulumu işi",

          "fıskiye sistemi montajı işi",

          "fıskiye sistemi kurulumu lazım",

          "fıskiye sistemi montajı lazım",

          "fıskiye sistemi kurulumu hizmeti",
        ],
      },
    ],
  },

  {
    id: "deck-construction",
    name: "Teras / Deck Yapımı",
    keywords: [
      "teras yapımı",

      "deck yapımı",

      "teras kurulumu",

      "deck kurulumu",

      "teras yapımı işi",

      "deck yapımı işi",

      "teras yapımı lazım",

      "deck yapımı lazım",
    ],
    subServices: [
      {
        id: "deck-construction-service",
        name: "Teras / deck yapımı",
        keywords: [
          "teras yapımı",

          "deck yapımı",

          "teras kurulumu",

          "deck kurulumu",

          "teras yapımı işi",

          "deck yapımı işi",

          "teras yapımı lazım",
        ],
      },
      {
        id: "deck-repair",
        name: "Teras / deck tamiri",
        keywords: [
          "teras tamiri",

          "deck tamiri",

          "teras onarımı",

          "deck onarımı",

          "teras tamir",

          "deck tamir",

          "teras tamiri lazım",
        ],
      },
      {
        id: "other-deck-construction",
        name: "Diğer (teras / deck yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "teras yapımı",

          "deck yapımı",

          "teras kurulumu",

          "deck kurulumu",

          "teras yapımı işi",

          "deck yapımı işi",

          "teras yapımı lazım",

          "deck yapımı lazım",

          "teras yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "patio-construction",
    name: "Patio / Avlu Yapımı",
    keywords: [
      "patio yapımı",

      "avlu yapımı",

      "patio kurulumu",

      "avlu kurulumu",

      "patio yapımı işi",

      "avlu yapımı işi",

      "patio yapımı lazım",

      "avlu yapımı lazım",
    ],
    subServices: [
      {
        id: "patio-construction-service",
        name: "Patio / avlu yapımı",
        keywords: [
          "patio yapımı",

          "avlu yapımı",

          "patio kurulumu",

          "avlu kurulumu",

          "patio yapımı işi",

          "avlu yapımı işi",

          "patio yapımı lazım",
        ],
      },
      {
        id: "other-patio-construction",
        name: "Diğer (patio / avlu yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "patio yapımı",

          "avlu yapımı",

          "patio kurulumu",

          "avlu kurulumu",

          "patio yapımı işi",

          "avlu yapımı işi",

          "patio yapımı lazım",

          "avlu yapımı lazım",

          "patio yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "outdoor-kitchen-construction",
    name: "Dış Mekan Mutfağı Yapımı",
    keywords: [
      "dış mekan mutfağı yapımı",

      "bahçe mutfağı yapımı",

      "dış mekan mutfağı kurulumu",

      "dış mekan mutfağı yapımı işi",

      "bahçe mutfağı yapımı işi",

      "dış mekan mutfağı yapımı lazım",
    ],
    subServices: [
      {
        id: "outdoor-kitchen-construction-service",
        name: "Dış mekan mutfağı yapımı",
        keywords: [
          "dış mekan mutfağı yapımı",

          "bahçe mutfağı yapımı",

          "dış mekan mutfağı kurulumu",

          "dış mekan mutfağı yapımı işi",

          "bahçe mutfağı yapımı işi",

          "dış mekan mutfağı yapımı lazım",
        ],
      },
      {
        id: "other-outdoor-kitchen-construction",
        name: "Diğer (dış mekan mutfağı yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dış mekan mutfağı yapımı",

          "bahçe mutfağı yapımı",

          "dış mekan mutfağı kurulumu",

          "dış mekan mutfağı yapımı işi",

          "bahçe mutfağı yapımı işi",

          "dış mekan mutfağı yapımı lazım",

          "dış mekan mutfağı yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "fireplace-construction",
    name: "Şömine / Ocak Yapımı",
    keywords: [
      "şömine yapımı",

      "ocak yapımı",

      "şömine kurulumu",

      "ocak kurulumu",

      "şömine yapımı işi",

      "ocak yapımı işi",

      "şömine yapımı lazım",

      "ocak yapımı lazım",
    ],
    subServices: [
      {
        id: "fireplace-construction-service",
        name: "Şömine / ocak yapımı",
        keywords: [
          "şömine yapımı",

          "ocak yapımı",

          "şömine kurulumu",

          "ocak kurulumu",

          "şömine yapımı işi",

          "ocak yapımı işi",

          "şömine yapımı lazım",
        ],
      },
      {
        id: "fireplace-repair",
        name: "Şömine / ocak tamiri",
        keywords: [
          "şömine tamiri",

          "ocak tamiri",

          "şömine onarımı",

          "ocak onarımı",

          "şömine tamir",

          "ocak tamir",

          "şömine tamiri lazım",
        ],
      },
      {
        id: "other-fireplace-construction",
        name: "Diğer (şömine / ocak yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "şömine yapımı",

          "ocak yapımı",

          "şömine kurulumu",

          "ocak kurulumu",

          "şömine yapımı işi",

          "ocak yapımı işi",

          "şömine yapımı lazım",

          "ocak yapımı lazım",

          "şömine yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "barbecue-construction",
    name: "Barbekü / Mangal Yapımı",
    keywords: [
      "barbekü yapımı",

      "mangal yapımı",

      "barbekü kurulumu",

      "mangal kurulumu",

      "barbekü yapımı işi",

      "mangal yapımı işi",

      "barbekü yapımı lazım",

      "mangal yapımı lazım",
    ],
    subServices: [
      {
        id: "barbecue-construction-service",
        name: "Barbekü / mangal yapımı",
        keywords: [
          "barbekü yapımı",

          "mangal yapımı",

          "barbekü kurulumu",

          "mangal kurulumu",

          "barbekü yapımı işi",

          "mangal yapımı işi",

          "barbekü yapımı lazım",
        ],
      },
      {
        id: "other-barbecue-construction",
        name: "Diğer (barbekü / mangal yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "barbekü yapımı",

          "mangal yapımı",

          "barbekü kurulumu",

          "mangal kurulumu",

          "barbekü yapımı işi",

          "mangal yapımı işi",

          "barbekü yapımı lazım",

          "mangal yapımı lazım",

          "barbekü yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "pergola-construction",
    name: "Çardak / Pergola Yapımı",
    keywords: [
      "çardak yapımı",

      "pergola yapımı",

      "çardak kurulumu",

      "pergola kurulumu",

      "çardak yapımı işi",

      "pergola yapımı işi",

      "çardak yapımı lazım",

      "pergola yapımı lazım",
    ],
    subServices: [
      {
        id: "pergola-construction-service",
        name: "Çardak / pergola yapımı",
        keywords: [
          "çardak yapımı",

          "pergola yapımı",

          "çardak kurulumu",

          "pergola kurulumu",

          "çardak yapımı işi",

          "pergola yapımı işi",

          "çardak yapımı lazım",
        ],
      },
      {
        id: "other-pergola-construction",
        name: "Diğer (çardak / pergola yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çardak yapımı",

          "pergola yapımı",

          "çardak kurulumu",

          "pergola kurulumu",

          "çardak yapımı işi",

          "pergola yapımı işi",

          "çardak yapımı lazım",

          "pergola yapımı lazım",

          "çardak yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "shed-construction",
    name: "Kulübe / Depo Yapımı",
    keywords: [
      "kulübe yapımı",

      "depo yapımı",

      "kulübe kurulumu",

      "depo kurulumu",

      "kulübe yapımı işi",

      "depo yapımı işi",

      "kulübe yapımı lazım",

      "depo yapımı lazım",
    ],
    subServices: [
      {
        id: "shed-construction-service",
        name: "Kulübe / depo yapımı",
        keywords: [
          "kulübe yapımı",

          "depo yapımı",

          "kulübe kurulumu",

          "depo kurulumu",

          "kulübe yapımı işi",

          "depo yapımı işi",

          "kulübe yapımı lazım",
        ],
      },
      {
        id: "other-shed-construction",
        name: "Diğer (kulübe / depo yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kulübe yapımı",

          "depo yapımı",

          "kulübe kurulumu",

          "depo kurulumu",

          "kulübe yapımı işi",

          "depo yapımı işi",

          "kulübe yapımı lazım",

          "depo yapımı lazım",

          "kulübe yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "playground-equipment",
    name: "Oyun Parkı Ekipmanı",
    keywords: [
      "oyun parkı ekipmanı",

      "oyun parkı kurulumu",

      "oyun parkı ekipmanı işi",

      "oyun parkı kurulumu işi",

      "oyun parkı ekipmanı lazım",

      "oyun parkı kurulumu lazım",
    ],
    subServices: [
      {
        id: "playground-equipment-service",
        name: "Oyun parkı ekipmanı kurulumu",
        keywords: [
          "oyun parkı ekipmanı",

          "oyun parkı kurulumu",

          "oyun parkı takma",

          "oyun parkı ekipmanı işi",

          "oyun parkı kurulumu işi",

          "oyun parkı ekipmanı lazım",
        ],
      },
      {
        id: "playground-equipment-repair",
        name: "Oyun parkı ekipmanı tamiri",
        keywords: [
          "oyun parkı ekipmanı tamiri",

          "oyun parkı ekipmanı onarımı",

          "oyun parkı ekipmanı düzeltme",

          "oyun parkı ekipmanı tamir",

          "oyun parkı ekipmanı onarım",

          "oyun parkı ekipmanı tamiri lazım",
        ],
      },
      {
        id: "other-playground-equipment",
        name: "Diğer (oyun parkı ekipmanı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "oyun parkı ekipmanı",

          "oyun parkı kurulumu",

          "oyun parkı ekipmanı işi",

          "oyun parkı kurulumu işi",

          "oyun parkı ekipmanı lazım",

          "oyun parkı kurulumu lazım",

          "oyun parkı ekipmanı hizmeti",
        ],
      },
    ],
  },

  {
    id: "fountain-construction",
    name: "Çeşme / Fıskiye Yapımı",
    keywords: [
      "çeşme yapımı",

      "fıskiye yapımı",

      "çeşme kurulumu",

      "fıskiye kurulumu",

      "çeşme yapımı işi",

      "fıskiye yapımı işi",

      "çeşme yapımı lazım",

      "fıskiye yapımı lazım",
    ],
    subServices: [
      {
        id: "fountain-construction-service",
        name: "Çeşme / fıskiye yapımı",
        keywords: [
          "çeşme yapımı",

          "fıskiye yapımı",

          "çeşme kurulumu",

          "fıskiye kurulumu",

          "çeşme yapımı işi",

          "fıskiye yapımı işi",

          "çeşme yapımı lazım",
        ],
      },
      {
        id: "fountain-repair",
        name: "Çeşme / fıskiye tamiri",
        keywords: [
          "çeşme tamiri",

          "fıskiye tamiri",

          "çeşme onarımı",

          "fıskiye onarımı",

          "çeşme tamir",

          "fıskiye tamir",

          "çeşme tamiri lazım",
        ],
      },
      {
        id: "other-fountain-construction",
        name: "Diğer (çeşme / fıskiye yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çeşme yapımı",

          "fıskiye yapımı",

          "çeşme kurulumu",

          "fıskiye kurulumu",

          "çeşme yapımı işi",

          "fıskiye yapımı işi",

          "çeşme yapımı lazım",

          "fıskiye yapımı lazım",

          "çeşme yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "statue-installation",
    name: "Heykel / Heykel Montajı",
    keywords: [
      "heykel montajı",

      "heykel kurulumu",

      "heykel montajı işi",

      "heykel kurulumu işi",

      "heykel montajı lazım",

      "heykel kurulumu lazım",
    ],
    subServices: [
      {
        id: "statue-installation-service",
        name: "Heykel montajı",
        keywords: [
          "heykel montajı",

          "heykel kurulumu",

          "heykel takma",

          "heykel montajı işi",

          "heykel kurulumu işi",

          "heykel montajı lazım",
        ],
      },
      {
        id: "other-statue-installation",
        name: "Diğer (heykel montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "heykel montajı",

          "heykel kurulumu",

          "heykel montajı işi",

          "heykel kurulumu işi",

          "heykel montajı lazım",

          "heykel kurulumu lazım",

          "heykel montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "outdoor-lighting",
    name: "Dış Mekan Aydınlatması",
    keywords: [
      "dış mekan aydınlatması",

      "bahçe aydınlatması",

      "dış mekan aydınlatması işi",

      "bahçe aydınlatması işi",

      "dış mekan aydınlatması lazım",

      "bahçe aydınlatması lazım",
    ],
    subServices: [
      {
        id: "outdoor-lighting-service",
        name: "Dış mekan aydınlatması kurulumu",
        keywords: [
          "dış mekan aydınlatması",

          "bahçe aydınlatması",

          "dış mekan aydınlatması kurulumu",

          "dış mekan aydınlatması işi",

          "bahçe aydınlatması işi",

          "dış mekan aydınlatması lazım",
        ],
      },
      {
        id: "outdoor-lighting-repair",
        name: "Dış mekan aydınlatması tamiri",
        keywords: [
          "dış mekan aydınlatması tamiri",

          "bahçe aydınlatması tamiri",

          "dış mekan aydınlatması onarımı",

          "dış mekan aydınlatması tamir",

          "bahçe aydınlatması tamir",

          "dış mekan aydınlatması tamiri lazım",
        ],
      },
      {
        id: "other-outdoor-lighting",
        name: "Diğer (dış mekan aydınlatması ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dış mekan aydınlatması",

          "bahçe aydınlatması",

          "dış mekan aydınlatması işi",

          "bahçe aydınlatması işi",

          "dış mekan aydınlatması lazım",

          "bahçe aydınlatması lazım",

          "dış mekan aydınlatması hizmeti",
        ],
      },
    ],
  },

  {
    id: "dryer-vent-cleaning",
    name: "Kurutucu Hava Kanalı Temizliği",
    keywords: [
      "kurutucu hava kanalı temizliği",

      "kurutucu kanal temizliği",

      "kurutucu hava kanalı temizleme",

      "kurutucu hava kanalı temizliği işi",

      "kurutucu kanal temizliği işi",

      "kurutucu hava kanalı temizliği lazım",
    ],
    subServices: [
      {
        id: "dryer-vent-cleaning-service",
        name: "Kurutucu hava kanalı temizliği",
        keywords: [
          "kurutucu hava kanalı temizliği",

          "kurutucu kanal temizliği",

          "kurutucu hava kanalı temizleme",

          "kurutucu hava kanalı temizliği işi",

          "kurutucu kanal temizliği işi",

          "kurutucu hava kanalı temizliği lazım",
        ],
      },
      {
        id: "other-dryer-vent-cleaning",
        name: "Diğer (kurutucu hava kanalı temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kurutucu hava kanalı temizliği",

          "kurutucu kanal temizliği",

          "kurutucu hava kanalı temizleme",

          "kurutucu hava kanalı temizliği işi",

          "kurutucu kanal temizliği işi",

          "kurutucu hava kanalı temizliği lazım",

          "kurutucu hava kanalı temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "demolition",
    name: "Yıkım / Söküm",
    keywords: [
      "yıkım",

      "söküm",

      "yıkım işi",

      "söküm işi",

      "yıkım lazım",

      "söküm lazım",

      "yıkım usta",
    ],
    subServices: [
      {
        id: "demolition-service",
        name: "Yıkım / söküm hizmeti",
        keywords: [
          "yıkım",

          "söküm",

          "yıkım işi",

          "söküm işi",

          "yıkım usta",

          "yıkım lazım",
        ],
      },
      {
        id: "other-demolition",
        name: "Diğer (yıkım / söküm ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yıkım",

          "söküm",

          "yıkım işi",

          "söküm işi",

          "yıkım lazım",

          "söküm lazım",

          "yıkım usta",

          "yıkım hizmeti",
        ],
      },
    ],
  },

  {
    id: "junk-removal",
    name: "Hurda / Eski Eşya Kaldırma",
    keywords: [
      "hurda kaldırma",

      "eski eşya kaldırma",

      "hurda kaldırma işi",

      "eski eşya kaldırma işi",

      "hurda kaldırma lazım",

      "eski eşya kaldırma lazım",

      "hurda kaldırma usta",
    ],
    subServices: [
      {
        id: "junk-removal-service",
        name: "Hurda / eski eşya kaldırma hizmeti",
        keywords: [
          "hurda kaldırma",

          "eski eşya kaldırma",

          "hurda kaldırma işi",

          "eski eşya kaldırma işi",

          "hurda kaldırma usta",

          "hurda kaldırma lazım",
        ],
      },
      {
        id: "other-junk-removal",
        name: "Diğer (hurda / eski eşya kaldırma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "hurda kaldırma",

          "eski eşya kaldırma",

          "hurda kaldırma işi",

          "eski eşya kaldırma işi",

          "hurda kaldırma lazım",

          "eski eşya kaldırma lazım",

          "hurda kaldırma usta",

          "hurda kaldırma hizmeti",
        ],
      },
    ],
  },

  {
    id: "concrete-work",
    name: "Beton İşleri",
    keywords: [
      "beton işleri",

      "beton dökme",

      "beton işleri işi",

      "beton dökme işi",

      "beton işleri lazım",

      "beton dökme lazım",

      "beton işleri usta",
    ],
    subServices: [
      {
        id: "concrete-work-service",
        name: "Beton işleri hizmeti",
        keywords: [
          "beton işleri",

          "beton dökme",

          "beton işleri işi",

          "beton dökme işi",

          "beton işleri usta",

          "beton işleri lazım",
        ],
      },
      {
        id: "other-concrete-work",
        name: "Diğer (beton işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "beton işleri",

          "beton dökme",

          "beton işleri işi",

          "beton dökme işi",

          "beton işleri lazım",

          "beton dökme lazım",

          "beton işleri usta",

          "beton işleri hizmeti",
        ],
      },
    ],
  },

  {
    id: "asphalt-work",
    name: "Asfalt İşleri",
    keywords: [
      "asfalt işleri",

      "asfalt dökme",

      "asfalt işleri işi",

      "asfalt dökme işi",

      "asfalt işleri lazım",

      "asfalt dökme lazım",

      "asfalt işleri usta",
    ],
    subServices: [
      {
        id: "asphalt-work-service",
        name: "Asfalt işleri hizmeti",
        keywords: [
          "asfalt işleri",

          "asfalt dökme",

          "asfalt işleri işi",

          "asfalt dökme işi",

          "asfalt işleri usta",

          "asfalt işleri lazım",
        ],
      },
      {
        id: "other-asphalt-work",
        name: "Diğer (asfalt işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "asfalt işleri",

          "asfalt dökme",

          "asfalt işleri işi",

          "asfalt dökme işi",

          "asfalt işleri lazım",

          "asfalt dökme lazım",

          "asfalt işleri usta",

          "asfalt işleri hizmeti",
        ],
      },
    ],
  },

  {
    id: "excavation",
    name: "Kazı / Hafriyat",
    keywords: [
      "kazı",

      "hafriyat",

      "kazı işi",

      "hafriyat işi",

      "kazı lazım",

      "hafriyat lazım",

      "kazı usta",
    ],
    subServices: [
      {
        id: "excavation-service",
        name: "Kazı / hafriyat hizmeti",
        keywords: [
          "kazı",

          "hafriyat",

          "kazı işi",

          "hafriyat işi",

          "kazı usta",

          "kazı lazım",
        ],
      },
      {
        id: "other-excavation",
        name: "Diğer (kazı / hafriyat ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kazı",

          "hafriyat",

          "kazı işi",

          "hafriyat işi",

          "kazı lazım",

          "hafriyat lazım",

          "kazı usta",

          "kazı hizmeti",
        ],
      },
    ],
  },

  {
    id: "land-grading",
    name: "Toprak Tesviye",
    keywords: [
      "toprak tesviye",

      "toprak düzeltme",

      "toprak tesviye işi",

      "toprak düzeltme işi",

      "toprak tesviye lazım",

      "toprak düzeltme lazım",

      "toprak tesviye usta",
    ],
    subServices: [
      {
        id: "land-grading-service",
        name: "Toprak tesviye hizmeti",
        keywords: [
          "toprak tesviye",

          "toprak düzeltme",

          "toprak tesviye işi",

          "toprak düzeltme işi",

          "toprak tesviye usta",

          "toprak tesviye lazım",
        ],
      },
      {
        id: "other-land-grading",
        name: "Diğer (toprak tesviye ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "toprak tesviye",

          "toprak düzeltme",

          "toprak tesviye işi",

          "toprak düzeltme işi",

          "toprak tesviye lazım",

          "toprak düzeltme lazım",

          "toprak tesviye usta",

          "toprak tesviye hizmeti",
        ],
      },
    ],
  },

  {
    id: "landscaping-design",
    name: "Peyzaj Tasarımı",
    keywords: [
      "peyzaj tasarımı",

      "bahçe tasarımı",

      "peyzaj tasarımı işi",

      "bahçe tasarımı işi",

      "peyzaj tasarımı lazım",

      "bahçe tasarımı lazım",

      "peyzaj tasarımcısı",
    ],
    subServices: [
      {
        id: "landscaping-design-service",
        name: "Peyzaj tasarımı hizmeti",
        keywords: [
          "peyzaj tasarımı",

          "bahçe tasarımı",

          "peyzaj tasarımı işi",

          "bahçe tasarımı işi",

          "peyzaj tasarımcısı",

          "peyzaj tasarımı lazım",
        ],
      },
      {
        id: "other-landscaping-design",
        name: "Diğer (peyzaj tasarımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "peyzaj tasarımı",

          "bahçe tasarımı",

          "peyzaj tasarımı işi",

          "bahçe tasarımı işi",

          "peyzaj tasarımı lazım",

          "bahçe tasarımı lazım",

          "peyzaj tasarımcısı",

          "peyzaj tasarımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "tree-planting",
    name: "Ağaç Dikimi",
    keywords: [
      "ağaç dikimi",

      "ağaç dikme",

      "ağaç dikimi işi",

      "ağaç dikme işi",

      "ağaç dikimi lazım",

      "ağaç dikme lazım",

      "ağaç dikimi usta",
    ],
    subServices: [
      {
        id: "tree-planting-service",
        name: "Ağaç dikimi hizmeti",
        keywords: [
          "ağaç dikimi",

          "ağaç dikme",

          "ağaç dikimi işi",

          "ağaç dikme işi",

          "ağaç dikimi usta",

          "ağaç dikimi lazım",
        ],
      },
      {
        id: "other-tree-planting",
        name: "Diğer (ağaç dikimi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ağaç dikimi",

          "ağaç dikme",

          "ağaç dikimi işi",

          "ağaç dikme işi",

          "ağaç dikimi lazım",

          "ağaç dikme lazım",

          "ağaç dikimi usta",

          "ağaç dikimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "sod-installation",
    name: "Çim Döşeme",
    keywords: [
      "çim döşeme",

      "çim serimi",

      "çim döşeme işi",

      "çim serimi işi",

      "çim döşeme lazım",

      "çim serimi lazım",

      "çim döşeme usta",
    ],
    subServices: [
      {
        id: "sod-installation-service",
        name: "Çim döşeme hizmeti",
        keywords: [
          "çim döşeme",

          "çim serimi",

          "çim döşeme işi",

          "çim serimi işi",

          "çim döşeme usta",

          "çim döşeme lazım",
        ],
      },
      {
        id: "other-sod-installation",
        name: "Diğer (çim döşeme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çim döşeme",

          "çim serimi",

          "çim döşeme işi",

          "çim serimi işi",

          "çim döşeme lazım",

          "çim serimi lazım",

          "çim döşeme usta",

          "çim döşeme hizmeti",
        ],
      },
    ],
  },

  {
    id: "turf-installation",
    name: "Hazır Çim Döşeme",
    keywords: [
      "hazır çim döşeme",

      "hazır çim serimi",

      "hazır çim döşeme işi",

      "hazır çim serimi işi",

      "hazır çim döşeme lazım",

      "hazır çim serimi lazım",

      "hazır çim döşeme usta",
    ],
    subServices: [
      {
        id: "turf-installation-service",
        name: "Hazır çim döşeme hizmeti",
        keywords: [
          "hazır çim döşeme",

          "hazır çim serimi",

          "hazır çim döşeme işi",

          "hazır çim serimi işi",

          "hazır çim döşeme usta",

          "hazır çim döşeme lazım",
        ],
      },
      {
        id: "other-turf-installation",
        name: "Diğer (hazır çim döşeme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "hazır çim döşeme",

          "hazır çim serimi",

          "hazır çim döşeme işi",

          "hazır çim serimi işi",

          "hazır çim döşeme lazım",

          "hazır çim serimi lazım",

          "hazır çim döşeme usta",

          "hazır çim döşeme hizmeti",
        ],
      },
    ],
  },

  {
    id: "fertilization",
    name: "Gübreleme",
    keywords: [
      "gübreleme",

      "gübre atma",

      "gübreleme işi",

      "gübre atma işi",

      "gübreleme lazım",

      "gübre atma lazım",

      "gübreleme usta",
    ],
    subServices: [
      {
        id: "fertilization-service",
        name: "Gübreleme hizmeti",
        keywords: [
          "gübreleme",

          "gübre atma",

          "gübreleme işi",

          "gübre atma işi",

          "gübreleme usta",

          "gübreleme lazım",
        ],
      },
      {
        id: "other-fertilization",
        name: "Diğer (gübreleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "gübreleme",

          "gübre atma",

          "gübreleme işi",

          "gübre atma işi",

          "gübreleme lazım",

          "gübre atma lazım",

          "gübreleme usta",

          "gübreleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "weed-removal",
    name: "Yabani Ot Temizleme",
    keywords: [
      "yabani ot temizleme",

      "ot temizleme",

      "yabani ot temizleme işi",

      "ot temizleme işi",

      "yabani ot temizleme lazım",

      "ot temizleme lazım",

      "yabani ot temizleme usta",
    ],
    subServices: [
      {
        id: "weed-removal-service",
        name: "Yabani ot temizleme hizmeti",
        keywords: [
          "yabani ot temizleme",

          "ot temizleme",

          "yabani ot temizleme işi",

          "ot temizleme işi",

          "yabani ot temizleme usta",

          "yabani ot temizleme lazım",
        ],
      },
      {
        id: "other-weed-removal",
        name: "Diğer (yabani ot temizleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yabani ot temizleme",

          "ot temizleme",

          "yabani ot temizleme işi",

          "ot temizleme işi",

          "yabani ot temizleme lazım",

          "ot temizleme lazım",

          "yabani ot temizleme usta",

          "yabani ot temizleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "pruning",
    name: "Budama",
    keywords: [
      "budama",

      "ağaç budama",

      "budama işi",

      "ağaç budama işi",

      "budama lazım",

      "ağaç budama lazım",

      "budama usta",
    ],
    subServices: [
      {
        id: "pruning-service",
        name: "Budama hizmeti",
        keywords: [
          "budama",

          "ağaç budama",

          "budama işi",

          "ağaç budama işi",

          "budama usta",

          "budama lazım",
        ],
      },
      {
        id: "other-pruning",
        name: "Diğer (budama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "budama",

          "ağaç budama",

          "budama işi",

          "ağaç budama işi",

          "budama lazım",

          "ağaç budama lazım",

          "budama usta",

          "budama hizmeti",
        ],
      },
    ],
  },

  {
    id: "stump-grinding",
    name: "Kütük Öğütme",
    keywords: [
      "kütük öğütme",

      "kütük parçalama",

      "kütük öğütme işi",

      "kütük parçalama işi",

      "kütük öğütme lazım",

      "kütük parçalama lazım",

      "kütük öğütme usta",
    ],
    subServices: [
      {
        id: "stump-grinding-service",
        name: "Kütük öğütme hizmeti",
        keywords: [
          "kütük öğütme",

          "kütük parçalama",

          "kütük öğütme işi",

          "kütük parçalama işi",

          "kütük öğütme usta",

          "kütük öğütme lazım",
        ],
      },
      {
        id: "other-stump-grinding",
        name: "Diğer (kütük öğütme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kütük öğütme",

          "kütük parçalama",

          "kütük öğütme işi",

          "kütük parçalama işi",

          "kütük öğütme lazım",

          "kütük parçalama lazım",

          "kütük öğütme usta",

          "kütük öğütme hizmeti",
        ],
      },
    ],
  },

  {
    id: "railing-construction",
    name: "Küpeşte Yapımı",
    keywords: [
      "küpeşte yapımı",
      "küpeşte montajı",
      "küpeşte kurulumu",
      "küpeşte işi",
      "küpeşte yapımı işi",
      "küpeşte montajı işi",
      "küpeşte yapımı lazım",
      "küpeşte montajı lazım",
    ],
    subServices: [
      {
        id: "railing-installation",
        name: "Küpeşte montajı",
        keywords: [
          "küpeşte montajı",
          "küpeşte kurulumu",
          "küpeşte takma",
          "küpeşte montajı işi",
          "küpeşte kurulumu işi",
          "küpeşte montajı lazım",
        ],
      },
      {
        id: "railing-repair",
        name: "Küpeşte tamiri",
        keywords: [
          "küpeşte tamiri",
          "küpeşte onarımı",
          "küpeşte düzeltme",
          "küpeşte tamir",
          "küpeşte onarım",
          "küpeşte tamiri lazım",
        ],
      },
      {
        id: "balcony-railing",
        name: "Balkon küpeştesi",
        keywords: [
          "balkon küpeştesi",
          "balkon küpeşte montajı",
          "balkon küpeşte kurulumu",
          "balkon küpeşte işi",
          "balkon küpeşte montajı işi",
          "balkon küpeşte montajı lazım",
        ],
      },
      {
        id: "stair-railing",
        name: "Merdiven küpeştesi",
        keywords: [
          "merdiven küpeştesi",
          "merdiven küpeşte montajı",
          "merdiven küpeşte kurulumu",
          "merdiven küpeşte işi",
          "merdiven küpeşte montajı işi",
          "merdiven küpeşte montajı lazım",
        ],
      },
      {
        id: "other-railing-construction",
        name: "Diğer (küpeşte yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "küpeşte yapımı",
          "küpeşte montajı",
          "küpeşte kurulumu",
          "küpeşte işi",
          "küpeşte yapımı işi",
          "küpeşte montajı işi",
          "küpeşte yapımı lazım",
          "küpeşte montajı lazım",
          "küpeşte yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "pvc-window-installation",
    name: "Pimapen / PVC Pencere",
    keywords: [
      "pimapen",
      "pvc pencere",
      "pimapen montajı",
      "pvc pencere montajı",
      "pimapen kurulumu",
      "pvc pencere kurulumu",
      "pimapen işi",
      "pvc pencere işi",
      "pimapen montajı işi",
      "pvc pencere montajı işi",
      "pimapen montajı lazım",
      "pvc pencere montajı lazım",
    ],
    subServices: [
      {
        id: "pvc-window-installation-service",
        name: "Pimapen / PVC pencere montajı",
        keywords: [
          "pimapen montajı",
          "pvc pencere montajı",
          "pimapen kurulumu",
          "pvc pencere kurulumu",
          "pimapen montajı işi",
          "pvc pencere montajı işi",
          "pimapen montajı lazım",
        ],
      },
      {
        id: "pvc-window-repair",
        name: "Pimapen / PVC pencere tamiri",
        keywords: [
          "pimapen tamiri",
          "pvc pencere tamiri",
          "pimapen onarımı",
          "pvc pencere onarımı",
          "pimapen tamir",
          "pvc pencere tamir",
          "pimapen tamiri lazım",
        ],
      },
      {
        id: "pvc-window-replacement",
        name: "Pimapen / PVC pencere değişimi",
        keywords: [
          "pimapen değişimi",
          "pvc pencere değişimi",
          "pimapen değiştirme",
          "pvc pencere değiştirme",
          "pimapen yenileme",
          "pvc pencere yenileme",
          "pimapen değişimi lazım",
        ],
      },
      {
        id: "other-pvc-window-installation",
        name: "Diğer (pimapen / PVC pencere ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "pimapen",
          "pvc pencere",
          "pimapen montajı",
          "pvc pencere montajı",
          "pimapen kurulumu",
          "pvc pencere kurulumu",
          "pimapen işi",
          "pvc pencere işi",
          "pimapen montajı işi",
          "pvc pencere montajı işi",
          "pimapen montajı lazım",
          "pvc pencere montajı lazım",
          "pimapen hizmeti",
        ],
      },
    ],
  },

  {
    id: "underfloor-heating",
    name: "Yerden Isıtma",
    keywords: [
      "yerden ısıtma",
      "yerden ısıtma sistemi",
      "yerden ısıtma montajı",
      "yerden ısıtma kurulumu",
      "yerden ısıtma işi",
      "yerden ısıtma sistemi işi",
      "yerden ısıtma montajı işi",
      "yerden ısıtma kurulumu işi",
      "yerden ısıtma montajı lazım",
      "yerden ısıtma kurulumu lazım",
    ],
    subServices: [
      {
        id: "underfloor-heating-installation",
        name: "Yerden ısıtma montajı",
        keywords: [
          "yerden ısıtma montajı",
          "yerden ısıtma kurulumu",
          "yerden ısıtma takma",
          "yerden ısıtma montajı işi",
          "yerden ısıtma kurulumu işi",
          "yerden ısıtma montajı lazım",
        ],
      },
      {
        id: "underfloor-heating-repair",
        name: "Yerden ısıtma tamiri",
        keywords: [
          "yerden ısıtma tamiri",
          "yerden ısıtma onarımı",
          "yerden ısıtma düzeltme",
          "yerden ısıtma tamir",
          "yerden ısıtma onarım",
          "yerden ısıtma tamiri lazım",
        ],
      },
      {
        id: "other-underfloor-heating",
        name: "Diğer (yerden ısıtma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yerden ısıtma",
          "yerden ısıtma sistemi",
          "yerden ısıtma montajı",
          "yerden ısıtma kurulumu",
          "yerden ısıtma işi",
          "yerden ısıtma sistemi işi",
          "yerden ısıtma montajı işi",
          "yerden ısıtma kurulumu işi",
          "yerden ısıtma montajı lazım",
          "yerden ısıtma kurulumu lazım",
          "yerden ısıtma hizmeti",
        ],
      },
    ],
  },

  {
    id: "brick-work",
    name: "Tuğla Örme",
    keywords: [
      "tuğla örme",
      "tuğla yapımı",
      "tuğla örme işi",
      "tuğla yapımı işi",
      "tuğla örme lazım",
      "tuğla yapımı lazım",
      "tuğla örme usta",
    ],
    subServices: [
      {
        id: "brick-work-service",
        name: "Tuğla örme hizmeti",
        keywords: [
          "tuğla örme",
          "tuğla yapımı",
          "tuğla örme işi",
          "tuğla yapımı işi",
          "tuğla örme usta",
          "tuğla örme lazım",
        ],
      },
      {
        id: "other-brick-work",
        name: "Diğer (tuğla örme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tuğla örme",
          "tuğla yapımı",
          "tuğla örme işi",
          "tuğla yapımı işi",
          "tuğla örme lazım",
          "tuğla yapımı lazım",
          "tuğla örme usta",
          "tuğla örme hizmeti",
        ],
      },
    ],
  },

  {
    id: "formwork-rebar",
    name: "Kalıp Demir Bağlama",
    keywords: [
      "kalıp demir bağlama",
      "demir bağlama",
      "kalıp demir işi",
      "demir bağlama işi",
      "kalıp demir bağlama lazım",
      "demir bağlama lazım",
      "kalıp demir bağlama usta",
    ],
    subServices: [
      {
        id: "formwork-rebar-service",
        name: "Kalıp demir bağlama hizmeti",
        keywords: [
          "kalıp demir bağlama",
          "demir bağlama",
          "kalıp demir işi",
          "demir bağlama işi",
          "kalıp demir bağlama usta",
          "kalıp demir bağlama lazım",
        ],
      },
      {
        id: "other-formwork-rebar",
        name: "Diğer (kalıp demir bağlama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kalıp demir bağlama",
          "demir bağlama",
          "kalıp demir işi",
          "demir bağlama işi",
          "kalıp demir bağlama lazım",
          "demir bağlama lazım",
          "kalıp demir bağlama usta",
          "kalıp demir bağlama hizmeti",
        ],
      },
    ],
  },

  {
    id: "wall-lathing",
    name: "Duvar Çıtalama",
    keywords: [
      "duvar çıtalama",
      "çıtalama",
      "duvar çıtalama işi",
      "çıtalama işi",
      "duvar çıtalama lazım",
      "çıtalama lazım",
      "duvar çıtalama usta",
    ],
    subServices: [
      {
        id: "wall-lathing-service",
        name: "Duvar çıtalama hizmeti",
        keywords: [
          "duvar çıtalama",
          "çıtalama",
          "duvar çıtalama işi",
          "çıtalama işi",
          "duvar çıtalama usta",
          "duvar çıtalama lazım",
        ],
      },
      {
        id: "other-wall-lathing",
        name: "Diğer (duvar çıtalama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "duvar çıtalama",
          "çıtalama",
          "duvar çıtalama işi",
          "çıtalama işi",
          "duvar çıtalama lazım",
          "çıtalama lazım",
          "duvar çıtalama usta",
          "duvar çıtalama hizmeti",
        ],
      },
    ],
  },

  {
    id: "kitchen-cabinet-construction",
    name: "Mutfak Dolabı Yapımı",
    keywords: [
      "mutfak dolabı yapımı",
      "mutfak dolabı montajı",
      "mutfak dolabı kurulumu",
      "mutfak dolabı yapımı işi",
      "mutfak dolabı montajı işi",
      "mutfak dolabı kurulumu işi",
      "mutfak dolabı yapımı lazım",
      "mutfak dolabı montajı lazım",
      "mutfak dolabı kurulumu lazım",
    ],
    subServices: [
      {
        id: "kitchen-cabinet-installation",
        name: "Mutfak dolabı montajı",
        keywords: [
          "mutfak dolabı montajı",
          "mutfak dolabı kurulumu",
          "mutfak dolabı takma",
          "mutfak dolabı montajı işi",
          "mutfak dolabı kurulumu işi",
          "mutfak dolabı montajı lazım",
        ],
      },
      {
        id: "kitchen-cabinet-repair",
        name: "Mutfak dolabı tamiri",
        keywords: [
          "mutfak dolabı tamiri",
          "mutfak dolabı onarımı",
          "mutfak dolabı düzeltme",
          "mutfak dolabı tamir",
          "mutfak dolabı onarım",
          "mutfak dolabı tamiri lazım",
        ],
      },
      {
        id: "other-kitchen-cabinet-construction",
        name: "Diğer (mutfak dolabı yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "mutfak dolabı yapımı",
          "mutfak dolabı montajı",
          "mutfak dolabı kurulumu",
          "mutfak dolabı yapımı işi",
          "mutfak dolabı montajı işi",
          "mutfak dolabı kurulumu işi",
          "mutfak dolabı yapımı lazım",
          "mutfak dolabı montajı lazım",
          "mutfak dolabı kurulumu lazım",
          "mutfak dolabı yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "bathroom-cabinet-construction",
    name: "Banyo Dolabı Yapımı",
    keywords: [
      "banyo dolabı yapımı",
      "banyo dolabı montajı",
      "banyo dolabı kurulumu",
      "banyo dolabı yapımı işi",
      "banyo dolabı montajı işi",
      "banyo dolabı kurulumu işi",
      "banyo dolabı yapımı lazım",
      "banyo dolabı montajı lazım",
      "banyo dolabı kurulumu lazım",
    ],
    subServices: [
      {
        id: "bathroom-cabinet-installation",
        name: "Banyo dolabı montajı",
        keywords: [
          "banyo dolabı montajı",
          "banyo dolabı kurulumu",
          "banyo dolabı takma",
          "banyo dolabı montajı işi",
          "banyo dolabı kurulumu işi",
          "banyo dolabı montajı lazım",
        ],
      },
      {
        id: "bathroom-cabinet-repair",
        name: "Banyo dolabı tamiri",
        keywords: [
          "banyo dolabı tamiri",
          "banyo dolabı onarımı",
          "banyo dolabı düzeltme",
          "banyo dolabı tamir",
          "banyo dolabı onarım",
          "banyo dolabı tamiri lazım",
        ],
      },
      {
        id: "other-bathroom-cabinet-construction",
        name: "Diğer (banyo dolabı yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "banyo dolabı yapımı",
          "banyo dolabı montajı",
          "banyo dolabı kurulumu",
          "banyo dolabı yapımı işi",
          "banyo dolabı montajı işi",
          "banyo dolabı kurulumu işi",
          "banyo dolabı yapımı lazım",
          "banyo dolabı montajı lazım",
          "banyo dolabı kurulumu lazım",
          "banyo dolabı yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "shower-cabin",
    name: "Duşakabin",
    keywords: [
      "duşakabin",
      "duşakabin montajı",
      "duşakabin kurulumu",
      "duşakabin işi",
      "duşakabin montajı işi",
      "duşakabin kurulumu işi",
      "duşakabin montajı lazım",
      "duşakabin kurulumu lazım",
    ],
    subServices: [
      {
        id: "shower-cabin-installation",
        name: "Duşakabin montajı",
        keywords: [
          "duşakabin montajı",
          "duşakabin kurulumu",
          "duşakabin takma",
          "duşakabin montajı işi",
          "duşakabin kurulumu işi",
          "duşakabin montajı lazım",
        ],
      },
      {
        id: "shower-cabin-repair",
        name: "Duşakabin tamiri",
        keywords: [
          "duşakabin tamiri",
          "duşakabin onarımı",
          "duşakabin düzeltme",
          "duşakabin tamir",
          "duşakabin onarım",
          "duşakabin tamiri lazım",
        ],
      },
      {
        id: "other-shower-cabin",
        name: "Diğer (duşakabin ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "duşakabin",
          "duşakabin montajı",
          "duşakabin kurulumu",
          "duşakabin işi",
          "duşakabin montajı işi",
          "duşakabin kurulumu işi",
          "duşakabin montajı lazım",
          "duşakabin kurulumu lazım",
          "duşakabin hizmeti",
        ],
      },
    ],
  },

  {
    id: "room-door",
    name: "Oda Kapısı Yapımı / Tamiri",
    keywords: [
      "oda kapısı yapımı",
      "oda kapısı tamiri",
      "oda kapısı montajı",
      "oda kapısı kurulumu",
      "oda kapısı yapımı işi",
      "oda kapısı tamiri işi",
      "oda kapısı montajı işi",
      "oda kapısı kurulumu işi",
      "oda kapısı yapımı lazım",
      "oda kapısı tamiri lazım",
      "oda kapısı montajı lazım",
    ],
    subServices: [
      {
        id: "room-door-installation",
        name: "Oda kapısı montajı",
        keywords: [
          "oda kapısı montajı",
          "oda kapısı kurulumu",
          "oda kapısı takma",
          "oda kapısı montajı işi",
          "oda kapısı kurulumu işi",
          "oda kapısı montajı lazım",
        ],
      },
      {
        id: "room-door-repair",
        name: "Oda kapısı tamiri",
        keywords: [
          "oda kapısı tamiri",
          "oda kapısı onarımı",
          "oda kapısı düzeltme",
          "oda kapısı tamir",
          "oda kapısı onarım",
          "oda kapısı tamiri lazım",
        ],
      },
      {
        id: "room-door-replacement",
        name: "Oda kapısı değişimi",
        keywords: [
          "oda kapısı değişimi",
          "oda kapısı değiştirme",
          "oda kapısı yenileme",
          "oda kapısı değişimi işi",
          "oda kapısı değiştirme işi",
          "oda kapısı değişimi lazım",
        ],
      },
      {
        id: "other-room-door",
        name: "Diğer (oda kapısı yapımı / tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "oda kapısı yapımı",
          "oda kapısı tamiri",
          "oda kapısı montajı",
          "oda kapısı kurulumu",
          "oda kapısı yapımı işi",
          "oda kapısı tamiri işi",
          "oda kapısı montajı işi",
          "oda kapısı kurulumu işi",
          "oda kapısı yapımı lazım",
          "oda kapısı tamiri lazım",
          "oda kapısı montajı lazım",
          "oda kapısı yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "fiber-optic-installation",
    name: "Fiber Hat Çekimi",
    keywords: [
      "fiber hat çekimi",
      "fiber optik çekimi",
      "fiber hat montajı",
      "fiber optik montajı",
      "fiber hat çekimi işi",
      "fiber optik çekimi işi",
      "fiber hat montajı işi",
      "fiber optik montajı işi",
      "fiber hat çekimi lazım",
      "fiber optik çekimi lazım",
      "fiber hat montajı lazım",
    ],
    subServices: [
      {
        id: "fiber-optic-installation-service",
        name: "Fiber hat çekimi",
        keywords: [
          "fiber hat çekimi",
          "fiber optik çekimi",
          "fiber hat montajı",
          "fiber optik montajı",
          "fiber hat çekimi işi",
          "fiber optik çekimi işi",
          "fiber hat çekimi lazım",
        ],
      },
      {
        id: "fiber-optic-repair",
        name: "Fiber hat tamiri",
        keywords: [
          "fiber hat tamiri",
          "fiber optik tamiri",
          "fiber hat onarımı",
          "fiber optik onarımı",
          "fiber hat tamir",
          "fiber optik tamir",
          "fiber hat tamiri lazım",
        ],
      },
      {
        id: "other-fiber-optic-installation",
        name: "Diğer (fiber hat çekimi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fiber hat çekimi",
          "fiber optik çekimi",
          "fiber hat montajı",
          "fiber optik montajı",
          "fiber hat çekimi işi",
          "fiber optik çekimi işi",
          "fiber hat montajı işi",
          "fiber optik montajı işi",
          "fiber hat çekimi lazım",
          "fiber optik çekimi lazım",
          "fiber hat montajı lazım",
          "fiber hat çekimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "duct-connection",
    name: "Kanal Bağlantı Yapımı",
    keywords: [
      "kanal bağlantı yapımı",
      "kanal bağlantı montajı",
      "kanal bağlantı kurulumu",
      "kanal bağlantı yapımı işi",
      "kanal bağlantı montajı işi",
      "kanal bağlantı kurulumu işi",
      "kanal bağlantı yapımı lazım",
      "kanal bağlantı montajı lazım",
      "kanal bağlantı kurulumu lazım",
    ],
    subServices: [
      {
        id: "duct-connection-service",
        name: "Kanal bağlantı yapımı",
        keywords: [
          "kanal bağlantı yapımı",
          "kanal bağlantı montajı",
          "kanal bağlantı kurulumu",
          "kanal bağlantı yapımı işi",
          "kanal bağlantı montajı işi",
          "kanal bağlantı yapımı lazım",
        ],
      },
      {
        id: "other-duct-connection",
        name: "Diğer (kanal bağlantı yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kanal bağlantı yapımı",
          "kanal bağlantı montajı",
          "kanal bağlantı kurulumu",
          "kanal bağlantı yapımı işi",
          "kanal bağlantı montajı işi",
          "kanal bağlantı kurulumu işi",
          "kanal bağlantı yapımı lazım",
          "kanal bağlantı montajı lazım",
          "kanal bağlantı kurulumu lazım",
          "kanal bağlantı yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "underground-electrical",
    name: "Yer Altı Elektrik",
    keywords: [
      "yer altı elektrik",
      "yer altı elektrik tesisatı",
      "yer altı elektrik montajı",
      "yer altı elektrik kurulumu",
      "yer altı elektrik işi",
      "yer altı elektrik tesisatı işi",
      "yer altı elektrik montajı işi",
      "yer altı elektrik kurulumu işi",
      "yer altı elektrik montajı lazım",
      "yer altı elektrik kurulumu lazım",
    ],
    subServices: [
      {
        id: "underground-electrical-installation",
        name: "Yer altı elektrik montajı",
        keywords: [
          "yer altı elektrik montajı",
          "yer altı elektrik kurulumu",
          "yer altı elektrik takma",
          "yer altı elektrik montajı işi",
          "yer altı elektrik kurulumu işi",
          "yer altı elektrik montajı lazım",
        ],
      },
      {
        id: "underground-electrical-repair",
        name: "Yer altı elektrik tamiri",
        keywords: [
          "yer altı elektrik tamiri",
          "yer altı elektrik onarımı",
          "yer altı elektrik düzeltme",
          "yer altı elektrik tamir",
          "yer altı elektrik onarım",
          "yer altı elektrik tamiri lazım",
        ],
      },
      {
        id: "other-underground-electrical",
        name: "Diğer (yer altı elektrik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yer altı elektrik",
          "yer altı elektrik tesisatı",
          "yer altı elektrik montajı",
          "yer altı elektrik kurulumu",
          "yer altı elektrik işi",
          "yer altı elektrik tesisatı işi",
          "yer altı elektrik montajı işi",
          "yer altı elektrik kurulumu işi",
          "yer altı elektrik montajı lazım",
          "yer altı elektrik kurulumu lazım",
          "yer altı elektrik hizmeti",
        ],
      },
    ],
  },

  {
    id: "underground-plumbing",
    name: "Yer Altı Su Bağlantısı",
    keywords: [
      "yer altı su bağlantısı",
      "yer altı su tesisatı",
      "yer altı su montajı",
      "yer altı su kurulumu",
      "yer altı su bağlantısı işi",
      "yer altı su tesisatı işi",
      "yer altı su montajı işi",
      "yer altı su kurulumu işi",
      "yer altı su bağlantısı lazım",
      "yer altı su montajı lazım",
      "yer altı su kurulumu lazım",
    ],
    subServices: [
      {
        id: "underground-plumbing-installation",
        name: "Yer altı su bağlantısı montajı",
        keywords: [
          "yer altı su bağlantısı montajı",
          "yer altı su kurulumu",
          "yer altı su takma",
          "yer altı su bağlantısı montajı işi",
          "yer altı su kurulumu işi",
          "yer altı su bağlantısı montajı lazım",
        ],
      },
      {
        id: "underground-plumbing-repair",
        name: "Yer altı su bağlantısı tamiri",
        keywords: [
          "yer altı su bağlantısı tamiri",
          "yer altı su onarımı",
          "yer altı su düzeltme",
          "yer altı su tamir",
          "yer altı su onarım",
          "yer altı su bağlantısı tamiri lazım",
        ],
      },
      {
        id: "other-underground-plumbing",
        name: "Diğer (yer altı su bağlantısı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yer altı su bağlantısı",
          "yer altı su tesisatı",
          "yer altı su montajı",
          "yer altı su kurulumu",
          "yer altı su bağlantısı işi",
          "yer altı su tesisatı işi",
          "yer altı su montajı işi",
          "yer altı su kurulumu işi",
          "yer altı su bağlantısı lazım",
          "yer altı su montajı lazım",
          "yer altı su kurulumu lazım",
          "yer altı su bağlantısı hizmeti",
        ],
      },
    ],
  },

  {
    id: "iron-door",
    name: "Demir Kapı",
    keywords: [
      "demir kapı",
      "demir kapı montajı",
      "demir kapı kurulumu",
      "demir kapı işi",
      "demir kapı montajı işi",
      "demir kapı kurulumu işi",
      "demir kapı montajı lazım",
      "demir kapı kurulumu lazım",
    ],
    subServices: [
      {
        id: "iron-door-installation",
        name: "Demir kapı montajı",
        keywords: [
          "demir kapı montajı",
          "demir kapı kurulumu",
          "demir kapı takma",
          "demir kapı montajı işi",
          "demir kapı kurulumu işi",
          "demir kapı montajı lazım",
        ],
      },
      {
        id: "iron-door-repair",
        name: "Demir kapı tamiri",
        keywords: [
          "demir kapı tamiri",
          "demir kapı onarımı",
          "demir kapı düzeltme",
          "demir kapı tamir",
          "demir kapı onarım",
          "demir kapı tamiri lazım",
        ],
      },
      {
        id: "other-iron-door",
        name: "Diğer (demir kapı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "demir kapı",
          "demir kapı montajı",
          "demir kapı kurulumu",
          "demir kapı işi",
          "demir kapı montajı işi",
          "demir kapı kurulumu işi",
          "demir kapı montajı lazım",
          "demir kapı kurulumu lazım",
          "demir kapı hizmeti",
        ],
      },
    ],
  },

  {
    id: "site-gate",
    name: "Site Giriş Kapısı",
    keywords: [
      "site giriş kapısı",
      "site kapısı",
      "site giriş kapısı montajı",
      "site kapısı montajı",
      "site giriş kapısı işi",
      "site kapısı işi",
      "site giriş kapısı montajı işi",
      "site kapısı montajı işi",
      "site giriş kapısı montajı lazım",
      "site kapısı montajı lazım",
    ],
    subServices: [
      {
        id: "site-gate-installation",
        name: "Site giriş kapısı montajı",
        keywords: [
          "site giriş kapısı montajı",
          "site kapısı montajı",
          "site giriş kapısı kurulumu",
          "site kapısı kurulumu",
          "site giriş kapısı montajı işi",
          "site kapısı montajı işi",
          "site giriş kapısı montajı lazım",
        ],
      },
      {
        id: "site-gate-repair",
        name: "Site giriş kapısı tamiri",
        keywords: [
          "site giriş kapısı tamiri",
          "site kapısı tamiri",
          "site giriş kapısı onarımı",
          "site kapısı onarımı",
          "site giriş kapısı tamir",
          "site kapısı tamir",
          "site giriş kapısı tamiri lazım",
        ],
      },
      {
        id: "other-site-gate",
        name: "Diğer (site giriş kapısı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "site giriş kapısı",
          "site kapısı",
          "site giriş kapısı montajı",
          "site kapısı montajı",
          "site giriş kapısı işi",
          "site kapısı işi",
          "site giriş kapısı montajı işi",
          "site kapısı montajı işi",
          "site giriş kapısı montajı lazım",
          "site kapısı montajı lazım",
          "site giriş kapısı hizmeti",
        ],
      },
    ],
  },

  {
    id: "terrace-enclosure",
    name: "Teras Kapatma",
    keywords: [
      "teras kapatma",
      "teras kapama",
      "teras kapatma işi",
      "teras kapama işi",
      "teras kapatma lazım",
      "teras kapama lazım",
      "teras kapatma usta",
    ],
    subServices: [
      {
        id: "terrace-enclosure-service",
        name: "Teras kapatma hizmeti",
        keywords: [
          "teras kapatma",
          "teras kapama",
          "teras kapatma işi",
          "teras kapama işi",
          "teras kapatma usta",
          "teras kapatma lazım",
        ],
      },
      {
        id: "other-terrace-enclosure",
        name: "Diğer (teras kapatma ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "teras kapatma",
          "teras kapama",
          "teras kapatma işi",
          "teras kapama işi",
          "teras kapatma lazım",
          "teras kapama lazım",
          "teras kapatma usta",
          "teras kapatma hizmeti",
        ],
      },
    ],
  },

  {
    id: "aquarium-construction",
    name: "Akvaryum Yapımı",
    keywords: [
      "akvaryum yapımı",
      "akvaryum montajı",
      "akvaryum kurulumu",
      "akvaryum işi",
      "akvaryum yapımı işi",
      "akvaryum montajı işi",
      "akvaryum kurulumu işi",
      "akvaryum yapımı lazım",
      "akvaryum montajı lazım",
      "akvaryum kurulumu lazım",
    ],
    subServices: [
      {
        id: "aquarium-installation",
        name: "Akvaryum montajı",
        keywords: [
          "akvaryum montajı",
          "akvaryum kurulumu",
          "akvaryum takma",
          "akvaryum montajı işi",
          "akvaryum kurulumu işi",
          "akvaryum montajı lazım",
        ],
      },
      {
        id: "aquarium-maintenance",
        name: "Akvaryum bakımı",
        keywords: [
          "akvaryum bakımı",
          "akvaryum temizliği",
          "akvaryum bakımı işi",
          "akvaryum temizliği işi",
          "akvaryum bakımı lazım",
          "akvaryum temizliği lazım",
        ],
      },
      {
        id: "aquarium-repair",
        name: "Akvaryum tamiri",
        keywords: [
          "akvaryum tamiri",
          "akvaryum onarımı",
          "akvaryum düzeltme",
          "akvaryum tamir",
          "akvaryum onarım",
          "akvaryum tamiri lazım",
        ],
      },
      {
        id: "other-aquarium-construction",
        name: "Diğer (akvaryum yapımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "akvaryum yapımı",
          "akvaryum montajı",
          "akvaryum kurulumu",
          "akvaryum işi",
          "akvaryum yapımı işi",
          "akvaryum montajı işi",
          "akvaryum kurulumu işi",
          "akvaryum yapımı lazım",
          "akvaryum montajı lazım",
          "akvaryum kurulumu lazım",
          "akvaryum yapımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "expertise-services",
    name: "Expertiz Hizmetleri",
    keywords: [
      "expertiz",
      "expertiz hizmeti",
      "expertiz işi",
      "expertiz lazım",
      "expertiz hizmeti işi",
      "expertiz lazım",
      "expertiz hizmeti lazım",
    ],
    subServices: [
      {
        id: "property-expertise",
        name: "Gayrimenkul expertizi",
        keywords: [
          "gayrimenkul expertizi",
          "gayrimenkul expertiz",
          "gayrimenkul expertiz işi",
          "gayrimenkul expertiz lazım",
          "gayrimenkul expertiz hizmeti",
        ],
      },
      {
        id: "vehicle-expertise",
        name: "Araç expertizi",
        keywords: [
          "araç expertizi",
          "araç expertiz",
          "araç expertiz işi",
          "araç expertiz lazım",
          "araç expertiz hizmeti",
        ],
      },
      {
        id: "damage-expertise",
        name: "Hasar expertizi",
        keywords: [
          "hasar expertizi",
          "hasar expertiz",
          "hasar expertiz işi",
          "hasar expertiz lazım",
          "hasar expertiz hizmeti",
        ],
      },
      {
        id: "other-expertise-services",
        name: "Diğer (expertiz hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "expertiz",
          "expertiz hizmeti",
          "expertiz işi",
          "expertiz lazım",
          "expertiz hizmeti işi",
          "expertiz lazım",
          "expertiz hizmeti lazım",
          "expertiz hizmeti",
        ],
      },
    ],
  },

  {
    id: "valuation-services",
    name: "Değerleme Hizmetleri",
    keywords: [
      "değerleme",
      "değerleme hizmeti",
      "değerleme işi",
      "değerleme lazım",
      "değerleme hizmeti işi",
      "değerleme lazım",
      "değerleme hizmeti lazım",
    ],
    subServices: [
      {
        id: "property-valuation",
        name: "Gayrimenkul değerleme",
        keywords: [
          "gayrimenkul değerleme",
          "gayrimenkul değerleme işi",
          "gayrimenkul değerleme lazım",
          "gayrimenkul değerleme hizmeti",
          "emlak değerleme",
        ],
      },
      {
        id: "vehicle-valuation",
        name: "Araç değerleme",
        keywords: [
          "araç değerleme",
          "araç değerleme işi",
          "araç değerleme lazım",
          "araç değerleme hizmeti",
          "oto değerleme",
        ],
      },
      {
        id: "other-valuation-services",
        name: "Diğer (değerleme hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "değerleme",
          "değerleme hizmeti",
          "değerleme işi",
          "değerleme lazım",
          "değerleme hizmeti işi",
          "değerleme lazım",
          "değerleme hizmeti lazım",
          "değerleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "company-expertise",
    name: "Şirket Expertizleri",
    keywords: [
      "şirket expertizi",
      "şirket expertiz",
      "şirket expertiz işi",
      "şirket expertiz lazım",
      "şirket expertiz hizmeti",
      "firma expertizi",
      "firma expertiz",
    ],
    subServices: [
      {
        id: "company-expertise-service",
        name: "Şirket expertizi hizmeti",
        keywords: [
          "şirket expertizi",
          "şirket expertiz",
          "şirket expertiz işi",
          "şirket expertiz lazım",
          "şirket expertiz hizmeti",
          "firma expertizi",
          "firma expertiz",
        ],
      },
      {
        id: "other-company-expertise",
        name: "Diğer (şirket expertizleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "şirket expertizi",
          "şirket expertiz",
          "şirket expertiz işi",
          "şirket expertiz lazım",
          "şirket expertiz hizmeti",
          "firma expertizi",
          "firma expertiz",
          "şirket expertizi hizmeti",
        ],
      },
    ],
  },

  {
    id: "software-development",
    name: "Yazılım İşleri",
    keywords: [
      "yazılım",
      "yazılım geliştirme",
      "yazılım işi",
      "yazılım lazım",
      "yazılım geliştirme işi",
      "yazılım lazım",
      "yazılım geliştirme lazım",
    ],
    subServices: [
      {
        id: "web-development",
        name: "Web yazılım",
        keywords: [
          "web yazılım",
          "web geliştirme",
          "web yazılım işi",
          "web geliştirme işi",
          "web yazılım lazım",
          "web geliştirme lazım",
        ],
      },
      {
        id: "mobile-development",
        name: "Mobil yazılım",
        keywords: [
          "mobil yazılım",
          "mobil uygulama",
          "mobil yazılım işi",
          "mobil uygulama işi",
          "mobil yazılım lazım",
          "mobil uygulama lazım",
        ],
      },
      {
        id: "desktop-development",
        name: "Masaüstü yazılım",
        keywords: [
          "masaüstü yazılım",
          "desktop yazılım",
          "masaüstü yazılım işi",
          "desktop yazılım işi",
          "masaüstü yazılım lazım",
          "desktop yazılım lazım",
        ],
      },
      {
        id: "software-maintenance",
        name: "Yazılım bakımı",
        keywords: [
          "yazılım bakımı",
          "yazılım güncelleme",
          "yazılım bakımı işi",
          "yazılım güncelleme işi",
          "yazılım bakımı lazım",
          "yazılım güncelleme lazım",
        ],
      },
      {
        id: "other-software-development",
        name: "Diğer (yazılım işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "yazılım",
          "yazılım geliştirme",
          "yazılım işi",
          "yazılım lazım",
          "yazılım geliştirme işi",
          "yazılım lazım",
          "yazılım geliştirme lazım",
          "yazılım hizmeti",
        ],
      },
    ],
  },

  {
    id: "steel-door",
    name: "Çelik Kapı",
    keywords: [
      "çelik kapı",
      "çelik kapı montajı",
      "çelik kapı kurulumu",
      "çelik kapı işi",
      "çelik kapı montajı işi",
      "çelik kapı kurulumu işi",
      "çelik kapı montajı lazım",
      "çelik kapı kurulumu lazım",
    ],
    subServices: [
      {
        id: "steel-door-installation",
        name: "Çelik kapı montajı",
        keywords: [
          "çelik kapı montajı",
          "çelik kapı kurulumu",
          "çelik kapı takma",
          "çelik kapı montajı işi",
          "çelik kapı kurulumu işi",
          "çelik kapı montajı lazım",
        ],
      },
      {
        id: "steel-door-repair",
        name: "Çelik kapı tamiri",
        keywords: [
          "çelik kapı tamiri",
          "çelik kapı onarımı",
          "çelik kapı düzeltme",
          "çelik kapı tamir",
          "çelik kapı onarım",
          "çelik kapı tamiri lazım",
        ],
      },
      {
        id: "other-steel-door",
        name: "Diğer (çelik kapı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çelik kapı",
          "çelik kapı montajı",
          "çelik kapı kurulumu",
          "çelik kapı işi",
          "çelik kapı montajı işi",
          "çelik kapı kurulumu işi",
          "çelik kapı montajı lazım",
          "çelik kapı kurulumu lazım",
          "çelik kapı hizmeti",
        ],
      },
    ],
  },

  {
    id: "automatic-door",
    name: "Otomatik Kapı",
    keywords: [
      "otomatik kapı",
      "otomatik kapı montajı",
      "otomatik kapı kurulumu",
      "otomatik kapı işi",
      "otomatik kapı montajı işi",
      "otomatik kapı kurulumu işi",
      "otomatik kapı montajı lazım",
      "otomatik kapı kurulumu lazım",
    ],
    subServices: [
      {
        id: "automatic-door-installation",
        name: "Otomatik kapı montajı",
        keywords: [
          "otomatik kapı montajı",
          "otomatik kapı kurulumu",
          "otomatik kapı takma",
          "otomatik kapı montajı işi",
          "otomatik kapı kurulumu işi",
          "otomatik kapı montajı lazım",
        ],
      },
      {
        id: "automatic-door-repair",
        name: "Otomatik kapı tamiri",
        keywords: [
          "otomatik kapı tamiri",
          "otomatik kapı onarımı",
          "otomatik kapı düzeltme",
          "otomatik kapı tamir",
          "otomatik kapı onarım",
          "otomatik kapı tamiri lazım",
        ],
      },
      {
        id: "other-automatic-door",
        name: "Diğer (otomatik kapı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "otomatik kapı",
          "otomatik kapı montajı",
          "otomatik kapı kurulumu",
          "otomatik kapı işi",
          "otomatik kapı montajı işi",
          "otomatik kapı kurulumu işi",
          "otomatik kapı montajı lazım",
          "otomatik kapı kurulumu lazım",
          "otomatik kapı hizmeti",
        ],
      },
    ],
  },

  {
    id: "glass-door",
    name: "Cam Kapı",
    keywords: [
      "cam kapı",
      "cam kapı montajı",
      "cam kapı kurulumu",
      "cam kapı işi",
      "cam kapı montajı işi",
      "cam kapı kurulumu işi",
      "cam kapı montajı lazım",
      "cam kapı kurulumu lazım",
    ],
    subServices: [
      {
        id: "glass-door-installation",
        name: "Cam kapı montajı",
        keywords: [
          "cam kapı montajı",
          "cam kapı kurulumu",
          "cam kapı takma",
          "cam kapı montajı işi",
          "cam kapı kurulumu işi",
          "cam kapı montajı lazım",
        ],
      },
      {
        id: "glass-door-repair",
        name: "Cam kapı tamiri",
        keywords: [
          "cam kapı tamiri",
          "cam kapı onarımı",
          "cam kapı düzeltme",
          "cam kapı tamir",
          "cam kapı onarım",
          "cam kapı tamiri lazım",
        ],
      },
      {
        id: "other-glass-door",
        name: "Diğer (cam kapı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "cam kapı",
          "cam kapı montajı",
          "cam kapı kurulumu",
          "cam kapı işi",
          "cam kapı montajı işi",
          "cam kapı kurulumu işi",
          "cam kapı montajı lazım",
          "cam kapı kurulumu lazım",
          "cam kapı hizmeti",
        ],
      },
    ],
  },

  {
    id: "bioclimatic-pergola",
    name: "Bioklimatik Pergola",
    keywords: [
      "bioklimatik pergola",
      "bioklimatik pergole",
      "bioklimatik pergola montajı",
      "bioklimatik pergole montajı",
      "bioklimatik pergola işi",
      "bioklimatik pergole işi",
      "bioklimatik pergola montajı işi",
      "bioklimatik pergole montajı işi",
      "bioklimatik pergola montajı lazım",
      "bioklimatik pergole montajı lazım",
    ],
    subServices: [
      {
        id: "bioclimatic-pergola-installation",
        name: "Bioklimatik pergola montajı",
        keywords: [
          "bioklimatik pergola montajı",
          "bioklimatik pergole montajı",
          "bioklimatik pergola kurulumu",
          "bioklimatik pergole kurulumu",
          "bioklimatik pergola montajı işi",
          "bioklimatik pergole montajı işi",
          "bioklimatik pergola montajı lazım",
        ],
      },
      {
        id: "bioclimatic-pergola-repair",
        name: "Bioklimatik pergola tamiri",
        keywords: [
          "bioklimatik pergola tamiri",
          "bioklimatik pergole tamiri",
          "bioklimatik pergola onarımı",
          "bioklimatik pergole onarımı",
          "bioklimatik pergola tamir",
          "bioklimatik pergole tamir",
          "bioklimatik pergola tamiri lazım",
        ],
      },
      {
        id: "other-bioclimatic-pergola",
        name: "Diğer (bioklimatik pergola ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bioklimatik pergola",
          "bioklimatik pergole",
          "bioklimatik pergola montajı",
          "bioklimatik pergole montajı",
          "bioklimatik pergola işi",
          "bioklimatik pergole işi",
          "bioklimatik pergola montajı işi",
          "bioklimatik pergole montajı işi",
          "bioklimatik pergola montajı lazım",
          "bioklimatik pergole montajı lazım",
          "bioklimatik pergola hizmeti",
        ],
      },
    ],
  },

  {
    id: "agricultural-machinery",
    name: "Tarım ve Hasat Makinaları",
    keywords: [
      "tarım makinası",
      "hasat makinası",
      "tarım makinası işi",
      "hasat makinası işi",
      "tarım makinası lazım",
      "hasat makinası lazım",
      "tarım makinası usta",
    ],
    subServices: [
      {
        id: "agricultural-machinery-service",
        name: "Tarım ve hasat makinası hizmeti",
        keywords: [
          "tarım makinası",
          "hasat makinası",
          "tarım makinası işi",
          "hasat makinası işi",
          "tarım makinası usta",
          "tarım makinası lazım",
        ],
      },
      {
        id: "other-agricultural-machinery",
        name: "Diğer (tarım ve hasat makinaları ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tarım makinası",
          "hasat makinası",
          "tarım makinası işi",
          "hasat makinası işi",
          "tarım makinası lazım",
          "hasat makinası lazım",
          "tarım makinası usta",
          "tarım makinası hizmeti",
        ],
      },
    ],
  },

  {
    id: "excavator-service",
    name: "Kepçe Hizmeti",
    keywords: [
      "kepçe",
      "kepçe hizmeti",
      "kepçe işi",
      "kepçe lazım",
      "kepçe hizmeti işi",
      "kepçe lazım",
      "kepçe hizmeti lazım",
    ],
    subServices: [
      {
        id: "excavator-service-general",
        name: "Kepçe hizmeti",
        keywords: [
          "kepçe",
          "kepçe hizmeti",
          "kepçe işi",
          "kepçe lazım",
          "kepçe hizmeti işi",
          "kepçe lazım",
          "kepçe hizmeti lazım",
        ],
      },
      {
        id: "other-excavator-service",
        name: "Diğer (kepçe hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kepçe",
          "kepçe hizmeti",
          "kepçe işi",
          "kepçe lazım",
          "kepçe hizmeti işi",
          "kepçe lazım",
          "kepçe hizmeti lazım",
          "kepçe hizmeti",
        ],
      },
    ],
  },

  {
    id: "manitou-service",
    name: "Manitou Hizmeti",
    keywords: [
      "manitou",
      "manitou hizmeti",
      "manitou işi",
      "manitou lazım",
      "manitou hizmeti işi",
      "manitou lazım",
      "manitou hizmeti lazım",
    ],
    subServices: [
      {
        id: "manitou-service-general",
        name: "Manitou hizmeti",
        keywords: [
          "manitou",
          "manitou hizmeti",
          "manitou işi",
          "manitou lazım",
          "manitou hizmeti işi",
          "manitou lazım",
          "manitou hizmeti lazım",
        ],
      },
      {
        id: "other-manitou-service",
        name: "Diğer (manitou hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "manitou",
          "manitou hizmeti",
          "manitou işi",
          "manitou lazım",
          "manitou hizmeti işi",
          "manitou lazım",
          "manitou hizmeti lazım",
          "manitou hizmeti",
        ],
      },
    ],
  },

  {
    id: "curtain-concrete",
    name: "Perde Beton İşçiliği",
    keywords: [
      "perde beton",
      "perde beton işçiliği",
      "perde beton işi",
      "perde beton işçiliği işi",
      "perde beton lazım",
      "perde beton işçiliği lazım",
      "perde beton usta",
    ],
    subServices: [
      {
        id: "curtain-concrete-service",
        name: "Perde beton işçiliği hizmeti",
        keywords: [
          "perde beton",
          "perde beton işçiliği",
          "perde beton işi",
          "perde beton işçiliği işi",
          "perde beton usta",
          "perde beton lazım",
        ],
      },
      {
        id: "other-curtain-concrete",
        name: "Diğer (perde beton işçiliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "perde beton",
          "perde beton işçiliği",
          "perde beton işi",
          "perde beton işçiliği işi",
          "perde beton lazım",
          "perde beton işçiliği lazım",
          "perde beton usta",
          "perde beton işçiliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "demolition-work",
    name: "Kırım İşleri",
    keywords: [
      "kırım",
      "kırım işi",
      "kırım lazım",
      "kırım usta",
      "kırım işi",
      "kırım lazım",
      "kırım usta",
    ],
    subServices: [
      {
        id: "demolition-work-service",
        name: "Kırım işleri hizmeti",
        keywords: [
          "kırım",
          "kırım işi",
          "kırım lazım",
          "kırım usta",
          "kırım işi",
          "kırım lazım",
          "kırım usta",
        ],
      },
      {
        id: "other-demolition-work",
        name: "Diğer (kırım işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kırım",
          "kırım işi",
          "kırım lazım",
          "kırım usta",
          "kırım işi",
          "kırım lazım",
          "kırım usta",
          "kırım hizmeti",
        ],
      },
    ],
  },

  {
    id: "electrical-engineer",
    name: "Elektrik Mühendisi",
    keywords: [
      "elektrik mühendisi",
      "elektrik mühendisliği",
      "elektrik mühendisi işi",
      "elektrik mühendisliği işi",
      "elektrik mühendisi lazım",
      "elektrik mühendisliği lazım",
      "elektrik mühendisi hizmeti",
    ],
    subServices: [
      {
        id: "electrical-engineer-service",
        name: "Elektrik mühendisi hizmeti",
        keywords: [
          "elektrik mühendisi",
          "elektrik mühendisliği",
          "elektrik mühendisi işi",
          "elektrik mühendisliği işi",
          "elektrik mühendisi lazım",
          "elektrik mühendisliği lazım",
        ],
      },
      {
        id: "other-electrical-engineer",
        name: "Diğer (elektrik mühendisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "elektrik mühendisi",
          "elektrik mühendisliği",
          "elektrik mühendisi işi",
          "elektrik mühendisliği işi",
          "elektrik mühendisi lazım",
          "elektrik mühendisliği lazım",
          "elektrik mühendisi hizmeti",
          "elektrik mühendisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "architect",
    name: "Mimar",
    keywords: [
      "mimar",
      "mimarlık",
      "mimar işi",
      "mimarlık işi",
      "mimar lazım",
      "mimarlık lazım",
      "mimar hizmeti",
    ],
    subServices: [
      {
        id: "architect-service",
        name: "Mimar hizmeti",
        keywords: [
          "mimar",
          "mimarlık",
          "mimar işi",
          "mimarlık işi",
          "mimar lazım",
          "mimarlık lazım",
        ],
      },
      {
        id: "other-architect",
        name: "Diğer (mimar ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "mimar",
          "mimarlık",
          "mimar işi",
          "mimarlık işi",
          "mimar lazım",
          "mimarlık lazım",
          "mimar hizmeti",
          "mimar hizmeti",
        ],
      },
    ],
  },

  {
    id: "interior-architect",
    name: "İç Mimar",
    keywords: [
      "iç mimar",
      "iç mimarlık",
      "iç mimar işi",
      "iç mimarlık işi",
      "iç mimar lazım",
      "iç mimarlık lazım",
      "iç mimar hizmeti",
    ],
    subServices: [
      {
        id: "interior-architect-service",
        name: "İç mimar hizmeti",
        keywords: [
          "iç mimar",
          "iç mimarlık",
          "iç mimar işi",
          "iç mimarlık işi",
          "iç mimar lazım",
          "iç mimarlık lazım",
        ],
      },
      {
        id: "other-interior-architect",
        name: "Diğer (iç mimar ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "iç mimar",
          "iç mimarlık",
          "iç mimar işi",
          "iç mimarlık işi",
          "iç mimar lazım",
          "iç mimarlık lazım",
          "iç mimar hizmeti",
          "iç mimar hizmeti",
        ],
      },
    ],
  },

  {
    id: "wood-railing",
    name: "Ahşap Korkuluk",
    keywords: [
      "ahşap korkuluk",
      "ahşap korkuluk montajı",
      "ahşap korkuluk kurulumu",
      "ahşap korkuluk işi",
      "ahşap korkuluk montajı işi",
      "ahşap korkuluk kurulumu işi",
      "ahşap korkuluk montajı lazım",
      "ahşap korkuluk kurulumu lazım",
    ],
    subServices: [
      {
        id: "wood-railing-installation",
        name: "Ahşap korkuluk montajı",
        keywords: [
          "ahşap korkuluk montajı",
          "ahşap korkuluk kurulumu",
          "ahşap korkuluk takma",
          "ahşap korkuluk montajı işi",
          "ahşap korkuluk kurulumu işi",
          "ahşap korkuluk montajı lazım",
        ],
      },
      {
        id: "wood-railing-repair",
        name: "Ahşap korkuluk tamiri",
        keywords: [
          "ahşap korkuluk tamiri",
          "ahşap korkuluk onarımı",
          "ahşap korkuluk düzeltme",
          "ahşap korkuluk tamir",
          "ahşap korkuluk onarım",
          "ahşap korkuluk tamiri lazım",
        ],
      },
      {
        id: "other-wood-railing",
        name: "Diğer (ahşap korkuluk ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ahşap korkuluk",
          "ahşap korkuluk montajı",
          "ahşap korkuluk kurulumu",
          "ahşap korkuluk işi",
          "ahşap korkuluk montajı işi",
          "ahşap korkuluk kurulumu işi",
          "ahşap korkuluk montajı lazım",
          "ahşap korkuluk kurulumu lazım",
          "ahşap korkuluk hizmeti",
        ],
      },
    ],
  },

  {
    id: "wood-stair",
    name: "Ahşap Merdiven",
    keywords: [
      "ahşap merdiven",
      "ahşap merdiven yapımı",
      "ahşap merdiven montajı",
      "ahşap merdiven kurulumu",
      "ahşap merdiven işi",
      "ahşap merdiven yapımı işi",
      "ahşap merdiven montajı işi",
      "ahşap merdiven kurulumu işi",
      "ahşap merdiven yapımı lazım",
      "ahşap merdiven montajı lazım",
      "ahşap merdiven kurulumu lazım",
    ],
    subServices: [
      {
        id: "wood-stair-installation",
        name: "Ahşap merdiven montajı",
        keywords: [
          "ahşap merdiven montajı",
          "ahşap merdiven kurulumu",
          "ahşap merdiven takma",
          "ahşap merdiven montajı işi",
          "ahşap merdiven kurulumu işi",
          "ahşap merdiven montajı lazım",
        ],
      },
      {
        id: "wood-stair-repair",
        name: "Ahşap merdiven tamiri",
        keywords: [
          "ahşap merdiven tamiri",
          "ahşap merdiven onarımı",
          "ahşap merdiven düzeltme",
          "ahşap merdiven tamir",
          "ahşap merdiven onarım",
          "ahşap merdiven tamiri lazım",
        ],
      },
      {
        id: "other-wood-stair",
        name: "Diğer (ahşap merdiven ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ahşap merdiven",
          "ahşap merdiven yapımı",
          "ahşap merdiven montajı",
          "ahşap merdiven kurulumu",
          "ahşap merdiven işi",
          "ahşap merdiven yapımı işi",
          "ahşap merdiven montajı işi",
          "ahşap merdiven kurulumu işi",
          "ahşap merdiven yapımı lazım",
          "ahşap merdiven montajı lazım",
          "ahşap merdiven kurulumu lazım",
          "ahşap merdiven hizmeti",
        ],
      },
    ],
  },

  {
    id: "stone-stair",
    name: "Taş Merdiven",
    keywords: [
      "taş merdiven",
      "taş merdiven yapımı",
      "taş merdiven montajı",
      "taş merdiven kurulumu",
      "taş merdiven işi",
      "taş merdiven yapımı işi",
      "taş merdiven montajı işi",
      "taş merdiven kurulumu işi",
      "taş merdiven yapımı lazım",
      "taş merdiven montajı lazım",
      "taş merdiven kurulumu lazım",
    ],
    subServices: [
      {
        id: "stone-stair-installation",
        name: "Taş merdiven montajı",
        keywords: [
          "taş merdiven montajı",
          "taş merdiven kurulumu",
          "taş merdiven takma",
          "taş merdiven montajı işi",
          "taş merdiven kurulumu işi",
          "taş merdiven montajı lazım",
        ],
      },
      {
        id: "stone-stair-repair",
        name: "Taş merdiven tamiri",
        keywords: [
          "taş merdiven tamiri",
          "taş merdiven onarımı",
          "taş merdiven düzeltme",
          "taş merdiven tamir",
          "taş merdiven onarım",
          "taş merdiven tamiri lazım",
        ],
      },
      {
        id: "other-stone-stair",
        name: "Diğer (taş merdiven ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "taş merdiven",
          "taş merdiven yapımı",
          "taş merdiven montajı",
          "taş merdiven kurulumu",
          "taş merdiven işi",
          "taş merdiven yapımı işi",
          "taş merdiven montajı işi",
          "taş merdiven kurulumu işi",
          "taş merdiven yapımı lazım",
          "taş merdiven montajı lazım",
          "taş merdiven kurulumu lazım",
          "taş merdiven hizmeti",
        ],
      },
    ],
  },

  {
    id: "granite-work",
    name: "Granit İşleri",
    keywords: [
      "granit",
      "granit işleri",
      "granit işi",
      "granit işleri işi",
      "granit lazım",
      "granit işleri lazım",
      "granit usta",
    ],
    subServices: [
      {
        id: "granite-installation",
        name: "Granit montajı",
        keywords: [
          "granit montajı",
          "granit kurulumu",
          "granit takma",
          "granit montajı işi",
          "granit kurulumu işi",
          "granit montajı lazım",
        ],
      },
      {
        id: "granite-repair",
        name: "Granit tamiri",
        keywords: [
          "granit tamiri",
          "granit onarımı",
          "granit düzeltme",
          "granit tamir",
          "granit onarım",
          "granit tamiri lazım",
        ],
      },
      {
        id: "other-granite-work",
        name: "Diğer (granit işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "granit",
          "granit işleri",
          "granit işi",
          "granit işleri işi",
          "granit lazım",
          "granit işleri lazım",
          "granit usta",
          "granit işleri hizmeti",
        ],
      },
    ],
  },

  {
    id: "marble-work",
    name: "Mermer İşleri",
    keywords: [
      "mermer",
      "mermer işleri",
      "mermer işi",
      "mermer işleri işi",
      "mermer lazım",
      "mermer işleri lazım",
      "mermer usta",
    ],
    subServices: [
      {
        id: "marble-installation",
        name: "Mermer montajı",
        keywords: [
          "mermer montajı",
          "mermer kurulumu",
          "mermer takma",
          "mermer montajı işi",
          "mermer kurulumu işi",
          "mermer montajı lazım",
        ],
      },
      {
        id: "marble-repair",
        name: "Mermer tamiri",
        keywords: [
          "mermer tamiri",
          "mermer onarımı",
          "mermer düzeltme",
          "mermer tamir",
          "mermer onarım",
          "mermer tamiri lazım",
        ],
      },
      {
        id: "other-marble-work",
        name: "Diğer (mermer işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "mermer",
          "mermer işleri",
          "mermer işi",
          "mermer işleri işi",
          "mermer lazım",
          "mermer işleri lazım",
          "mermer usta",
          "mermer işleri hizmeti",
        ],
      },
    ],
  },

  {
    id: "3d-design",
    name: "3D Çizim",
    keywords: [
      "3d çizim",
      "3d tasarım",
      "3d çizim işi",
      "3d tasarım işi",
      "3d çizim lazım",
      "3d tasarım lazım",
      "3d çizim hizmeti",
    ],
    subServices: [
      {
        id: "3d-design-service",
        name: "3D çizim hizmeti",
        keywords: [
          "3d çizim",
          "3d tasarım",
          "3d çizim işi",
          "3d tasarım işi",
          "3d çizim lazım",
          "3d tasarım lazım",
        ],
      },
      {
        id: "other-3d-design",
        name: "Diğer (3D çizim ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "3d çizim",
          "3d tasarım",
          "3d çizim işi",
          "3d tasarım işi",
          "3d çizim lazım",
          "3d tasarım lazım",
          "3d çizim hizmeti",
          "3d çizim hizmeti",
        ],
      },
    ],
  },

  {
    id: "render-service",
    name: "Render Hizmeti",
    keywords: [
      "render",
      "render hizmeti",
      "render işi",
      "render lazım",
      "render hizmeti işi",
      "render lazım",
      "render hizmeti lazım",
    ],
    subServices: [
      {
        id: "render-service-general",
        name: "Render hizmeti",
        keywords: [
          "render",
          "render hizmeti",
          "render işi",
          "render lazım",
          "render hizmeti işi",
          "render lazım",
          "render hizmeti lazım",
        ],
      },
      {
        id: "other-render-service",
        name: "Diğer (render hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "render",
          "render hizmeti",
          "render işi",
          "render lazım",
          "render hizmeti işi",
          "render lazım",
          "render hizmeti lazım",
          "render hizmeti",
        ],
      },
    ],
  },

  {
    id: "project-design",
    name: "Proje Çizimi",
    keywords: [
      "proje çizimi",
      "proje tasarımı",
      "proje çizimi işi",
      "proje tasarımı işi",
      "proje çizimi lazım",
      "proje tasarımı lazım",
      "proje çizimi hizmeti",
    ],
    subServices: [
      {
        id: "project-design-service",
        name: "Proje çizimi hizmeti",
        keywords: [
          "proje çizimi",
          "proje tasarımı",
          "proje çizimi işi",
          "proje tasarımı işi",
          "proje çizimi lazım",
          "proje tasarımı lazım",
        ],
      },
      {
        id: "other-project-design",
        name: "Diğer (proje çizimi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "proje çizimi",
          "proje tasarımı",
          "proje çizimi işi",
          "proje tasarımı işi",
          "proje çizimi lazım",
          "proje tasarımı lazım",
          "proje çizimi hizmeti",
          "proje çizimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "permit-procedures",
    name: "Ruhsat Onaylı Proje İşlemleri",
    keywords: [
      "ruhsat onaylı proje",
      "ruhsat işlemleri",
      "ruhsat onaylı proje işi",
      "ruhsat işlemleri işi",
      "ruhsat onaylı proje lazım",
      "ruhsat işlemleri lazım",
      "ruhsat onaylı proje hizmeti",
    ],
    subServices: [
      {
        id: "permit-application",
        name: "Ruhsat başvurusu",
        keywords: [
          "ruhsat başvurusu",
          "ruhsat başvuru",
          "ruhsat başvurusu işi",
          "ruhsat başvuru işi",
          "ruhsat başvurusu lazım",
          "ruhsat başvuru lazım",
        ],
      },
      {
        id: "permit-approval",
        name: "Ruhsat onayı",
        keywords: [
          "ruhsat onayı",
          "ruhsat onay işi",
          "ruhsat onayı işi",
          "ruhsat onayı lazım",
          "ruhsat onay lazım",
        ],
      },
      {
        id: "other-permit-procedures",
        name: "Diğer (ruhsat onaylı proje işlemleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ruhsat onaylı proje",
          "ruhsat işlemleri",
          "ruhsat onaylı proje işi",
          "ruhsat işlemleri işi",
          "ruhsat onaylı proje lazım",
          "ruhsat işlemleri lazım",
          "ruhsat onaylı proje hizmeti",
          "ruhsat onaylı proje hizmeti",
        ],
      },
    ],
  },

  {
    id: "occupancy-permit",
    name: "İskan Alım",
    keywords: [
      "iskan",
      "iskan alım",
      "iskan işi",
      "iskan alım işi",
      "iskan lazım",
      "iskan alım lazım",
      "iskan hizmeti",
    ],
    subServices: [
      {
        id: "occupancy-permit-service",
        name: "İskan alım hizmeti",
        keywords: [
          "iskan",
          "iskan alım",
          "iskan işi",
          "iskan alım işi",
          "iskan lazım",
          "iskan alım lazım",
        ],
      },
      {
        id: "other-occupancy-permit",
        name: "Diğer (iskan alım ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "iskan",
          "iskan alım",
          "iskan işi",
          "iskan alım işi",
          "iskan lazım",
          "iskan alım lazım",
          "iskan hizmeti",
          "iskan hizmeti",
        ],
      },
    ],
  },

  {
    id: "document-tracking",
    name: "Evrak Takibi",
    keywords: [
      "evrak takibi",
      "evrak işlemleri",
      "evrak takibi işi",
      "evrak işlemleri işi",
      "evrak takibi lazım",
      "evrak işlemleri lazım",
      "evrak takibi hizmeti",
    ],
    subServices: [
      {
        id: "document-tracking-service",
        name: "Evrak takibi hizmeti",
        keywords: [
          "evrak takibi",
          "evrak işlemleri",
          "evrak takibi işi",
          "evrak işlemleri işi",
          "evrak takibi lazım",
          "evrak işlemleri lazım",
        ],
      },
      {
        id: "other-document-tracking",
        name: "Diğer (evrak takibi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "evrak takibi",
          "evrak işlemleri",
          "evrak takibi işi",
          "evrak işlemleri işi",
          "evrak takibi lazım",
          "evrak işlemleri lazım",
          "evrak takibi hizmeti",
          "evrak takibi hizmeti",
        ],
      },
    ],
  },

  {
    id: "coaching",
    name: "Koçluk Hizmetleri",
    keywords: [
      "koçluk",
      "koç",
      "koçluk hizmeti",
      "koç işi",
      "koçluk lazım",
      "yaşam koçu",
      "kariyer koçu",
      "iş koçu",
      "spor koçu",
    ],
    subServices: [
      {
        id: "life-coaching",
        name: "Yaşam koçluğu",
        keywords: [
          "yaşam koçu",
          "yaşam koçluğu",
          "yaşam koçu işi",
          "yaşam koçluğu işi",
          "yaşam koçu lazım",
          "yaşam koçluğu lazım",
        ],
      },
      {
        id: "career-coaching",
        name: "Kariyer koçluğu",
        keywords: [
          "kariyer koçu",
          "kariyer koçluğu",
          "kariyer koçu işi",
          "kariyer koçluğu işi",
          "kariyer koçu lazım",
          "kariyer koçluğu lazım",
        ],
      },
      {
        id: "business-coaching",
        name: "İş koçluğu",
        keywords: [
          "iş koçu",
          "iş koçluğu",
          "iş koçu işi",
          "iş koçluğu işi",
          "iş koçu lazım",
          "iş koçluğu lazım",
        ],
      },
      {
        id: "other-coaching",
        name: "Diğer (koçluk hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "koçluk",
          "koç",
          "koçluk hizmeti",
          "koç işi",
          "koçluk lazım",
          "yaşam koçu",
          "kariyer koçu",
          "iş koçu",
          "spor koçu",
          "koçluk hizmeti",
        ],
      },
    ],
  },

  {
    id: "general-consulting",
    name: "Danışmanlık Hizmetleri",
    keywords: [
      "danışmanlık",
      "danışman",
      "danışmanlık hizmeti",
      "danışman işi",
      "danışmanlık lazım",
      "iş danışmanlığı",
      "finans danışmanlığı",
      "yönetim danışmanlığı",
    ],
    subServices: [
      {
        id: "business-consulting",
        name: "İş danışmanlığı",
        keywords: [
          "iş danışmanlığı",
          "iş danışmanı",
          "iş danışmanlığı işi",
          "iş danışmanı işi",
          "iş danışmanlığı lazım",
          "iş danışmanı lazım",
        ],
      },
      {
        id: "financial-consulting",
        name: "Finans danışmanlığı",
        keywords: [
          "finans danışmanlığı",
          "finans danışmanı",
          "finans danışmanlığı işi",
          "finans danışmanı işi",
          "finans danışmanlığı lazım",
          "finans danışmanı lazım",
        ],
      },
      {
        id: "management-consulting",
        name: "Yönetim danışmanlığı",
        keywords: [
          "yönetim danışmanlığı",
          "yönetim danışmanı",
          "yönetim danışmanlığı işi",
          "yönetim danışmanı işi",
          "yönetim danışmanlığı lazım",
          "yönetim danışmanı lazım",
        ],
      },
      {
        id: "other-general-consulting",
        name: "Diğer (danışmanlık hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "danışmanlık",
          "danışman",
          "danışmanlık hizmeti",
          "danışman işi",
          "danışmanlık lazım",
          "iş danışmanlığı",
          "finans danışmanlığı",
          "yönetim danışmanlığı",
          "danışmanlık hizmeti",
        ],
      },
    ],
  },

  {
    id: "career-counseling",
    name: "Meslek Danışmanlığı",
    keywords: [
      "meslek danışmanlığı",
      "kariyer danışmanlığı",
      "meslek danışmanı",
      "kariyer danışmanı",
      "meslek danışmanlığı işi",
      "kariyer danışmanlığı işi",
      "meslek danışmanlığı lazım",
      "kariyer danışmanlığı lazım",
    ],
    subServices: [
      {
        id: "career-counseling-service",
        name: "Meslek danışmanlığı hizmeti",
        keywords: [
          "meslek danışmanlığı",
          "kariyer danışmanlığı",
          "meslek danışmanı",
          "kariyer danışmanı",
          "meslek danışmanlığı işi",
          "kariyer danışmanlığı işi",
          "meslek danışmanlığı lazım",
        ],
      },
      {
        id: "other-career-counseling",
        name: "Diğer (meslek danışmanlığı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "meslek danışmanlığı",
          "kariyer danışmanlığı",
          "meslek danışmanı",
          "kariyer danışmanı",
          "meslek danışmanlığı işi",
          "kariyer danışmanlığı işi",
          "meslek danışmanlığı lazım",
          "kariyer danışmanlığı lazım",
          "meslek danışmanlığı hizmeti",
        ],
      },
    ],
  },

  {
    id: "pet-care-services",
    name: "Evcil Hayvan Bakımı",
    keywords: [
      "evcil hayvan bakımı",
      "pet bakımı",
      "hayvan bakımı",
      "evcil hayvan bakımı işi",
      "pet bakımı işi",
      "hayvan bakımı işi",
      "evcil hayvan bakımı lazım",
      "pet bakımı lazım",
    ],
    subServices: [
      {
        id: "pet-sitting",
        name: "Evcil hayvan bakıcılığı",
        keywords: [
          "evcil hayvan bakıcılığı",
          "pet bakıcılığı",
          "hayvan bakıcılığı",
          "evcil hayvan bakıcılığı işi",
          "pet bakıcılığı işi",
          "hayvan bakıcılığı işi",
          "evcil hayvan bakıcılığı lazım",
        ],
      },
      {
        id: "pet-grooming",
        name: "Evcil hayvan tımarı",
        keywords: [
          "evcil hayvan tımarı",
          "pet tımarı",
          "hayvan tımarı",
          "evcil hayvan tımarı işi",
          "pet tımarı işi",
          "hayvan tımarı işi",
          "evcil hayvan tımarı lazım",
        ],
      },
      {
        id: "other-pet-care-services",
        name: "Diğer (evcil hayvan bakımı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "evcil hayvan bakımı",
          "pet bakımı",
          "hayvan bakımı",
          "evcil hayvan bakımı işi",
          "pet bakımı işi",
          "hayvan bakımı işi",
          "evcil hayvan bakımı lazım",
          "pet bakımı lazım",
          "evcil hayvan bakımı hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-rental",
    name: "Araç Kiralama",
    keywords: [
      "araç kiralama",
      "araba kiralama",
      "oto kiralama",
      "araç kiralama işi",
      "araba kiralama işi",
      "oto kiralama işi",
      "araç kiralama lazım",
      "araba kiralama lazım",
    ],
    subServices: [
      {
        id: "car-rental-service",
        name: "Araç kiralama hizmeti",
        keywords: [
          "araç kiralama",
          "araba kiralama",
          "oto kiralama",
          "araç kiralama işi",
          "araba kiralama işi",
          "oto kiralama işi",
          "araç kiralama lazım",
        ],
      },
      {
        id: "other-car-rental",
        name: "Diğer (araç kiralama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç kiralama",
          "araba kiralama",
          "oto kiralama",
          "araç kiralama işi",
          "araba kiralama işi",
          "oto kiralama işi",
          "araç kiralama lazım",
          "araba kiralama lazım",
          "araç kiralama hizmeti",
        ],
      },
    ],
  },

  {
    id: "boat-rental",
    name: "Tekne Kiralama",
    keywords: [
      "tekne kiralama",
      "yat kiralama",
      "tekne kiralama işi",
      "yat kiralama işi",
      "tekne kiralama lazım",
      "yat kiralama lazım",
      "tekne kiralama hizmeti",
    ],
    subServices: [
      {
        id: "boat-rental-service",
        name: "Tekne kiralama hizmeti",
        keywords: [
          "tekne kiralama",
          "yat kiralama",
          "tekne kiralama işi",
          "yat kiralama işi",
          "tekne kiralama lazım",
          "yat kiralama lazım",
        ],
      },
      {
        id: "other-boat-rental",
        name: "Diğer (tekne kiralama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tekne kiralama",
          "yat kiralama",
          "tekne kiralama işi",
          "yat kiralama işi",
          "tekne kiralama lazım",
          "yat kiralama lazım",
          "tekne kiralama hizmeti",
          "tekne kiralama hizmeti",
        ],
      },
    ],
  },

  {
    id: "equipment-rental",
    name: "Ekipman Kiralama",
    keywords: [
      "ekipman kiralama",
      "makine kiralama",
      "ekipman kiralama işi",
      "makine kiralama işi",
      "ekipman kiralama lazım",
      "makine kiralama lazım",
      "ekipman kiralama hizmeti",
    ],
    subServices: [
      {
        id: "equipment-rental-service",
        name: "Ekipman kiralama hizmeti",
        keywords: [
          "ekipman kiralama",
          "makine kiralama",
          "ekipman kiralama işi",
          "makine kiralama işi",
          "ekipman kiralama lazım",
          "makine kiralama lazım",
        ],
      },
      {
        id: "other-equipment-rental",
        name: "Diğer (ekipman kiralama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ekipman kiralama",
          "makine kiralama",
          "ekipman kiralama işi",
          "makine kiralama işi",
          "ekipman kiralama lazım",
          "makine kiralama lazım",
          "ekipman kiralama hizmeti",
          "ekipman kiralama hizmeti",
        ],
      },
    ],
  },

  {
    id: "antique-restoration",
    name: "Antika Restorasyonu",
    keywords: [
      "antika restorasyonu",
      "antika tamiri",
      "antika onarımı",
      "antika restorasyonu işi",
      "antika tamiri işi",
      "antika onarımı işi",
      "antika restorasyonu lazım",
      "antika tamiri lazım",
    ],
    subServices: [
      {
        id: "antique-restoration-service",
        name: "Antika restorasyonu hizmeti",
        keywords: [
          "antika restorasyonu",
          "antika tamiri",
          "antika onarımı",
          "antika restorasyonu işi",
          "antika tamiri işi",
          "antika onarımı işi",
          "antika restorasyonu lazım",
        ],
      },
      {
        id: "other-antique-restoration",
        name: "Diğer (antika restorasyonu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "antika restorasyonu",
          "antika tamiri",
          "antika onarımı",
          "antika restorasyonu işi",
          "antika tamiri işi",
          "antika onarımı işi",
          "antika restorasyonu lazım",
          "antika tamiri lazım",
          "antika restorasyonu hizmeti",
        ],
      },
    ],
  },

  {
    id: "jewelry-repair",
    name: "Mücevher Tamiri",
    keywords: [
      "mücevher tamiri",
      "takı tamiri",
      "mücevher onarımı",
      "takı onarımı",
      "mücevher tamiri işi",
      "takı tamiri işi",
      "mücevher tamiri lazım",
      "takı tamiri lazım",
    ],
    subServices: [
      {
        id: "jewelry-repair-service",
        name: "Mücevher tamiri hizmeti",
        keywords: [
          "mücevher tamiri",
          "takı tamiri",
          "mücevher onarımı",
          "takı onarımı",
          "mücevher tamiri işi",
          "takı tamiri işi",
          "mücevher tamiri lazım",
        ],
      },
      {
        id: "other-jewelry-repair",
        name: "Diğer (mücevher tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "mücevher tamiri",
          "takı tamiri",
          "mücevher onarımı",
          "takı onarımı",
          "mücevher tamiri işi",
          "takı tamiri işi",
          "mücevher tamiri lazım",
          "takı tamiri lazım",
          "mücevher tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "watch-repair",
    name: "Saat Tamiri",
    keywords: [
      "saat tamiri",
      "saat onarımı",
      "saat tamir",
      "saat onarım",
      "saat tamiri işi",
      "saat onarımı işi",
      "saat tamiri lazım",
      "saat onarımı lazım",
    ],
    subServices: [
      {
        id: "watch-repair-service",
        name: "Saat tamiri hizmeti",
        keywords: [
          "saat tamiri",
          "saat onarımı",
          "saat tamir",
          "saat onarım",
          "saat tamiri işi",
          "saat onarımı işi",
          "saat tamiri lazım",
        ],
      },
      {
        id: "other-watch-repair",
        name: "Diğer (saat tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "saat tamiri",
          "saat onarımı",
          "saat tamir",
          "saat onarım",
          "saat tamiri işi",
          "saat onarımı işi",
          "saat tamiri lazım",
          "saat onarımı lazım",
          "saat tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "glasses-repair",
    name: "Gözlük Tamiri",
    keywords: [
      "gözlük tamiri",
      "gözlük onarımı",
      "gözlük tamir",
      "gözlük onarım",
      "gözlük tamiri işi",
      "gözlük onarımı işi",
      "gözlük tamiri lazım",
      "gözlük onarımı lazım",
    ],
    subServices: [
      {
        id: "glasses-repair-service",
        name: "Gözlük tamiri hizmeti",
        keywords: [
          "gözlük tamiri",
          "gözlük onarımı",
          "gözlük tamir",
          "gözlük onarım",
          "gözlük tamiri işi",
          "gözlük onarımı işi",
          "gözlük tamiri lazım",
        ],
      },
      {
        id: "other-glasses-repair",
        name: "Diğer (gözlük tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "gözlük tamiri",
          "gözlük onarımı",
          "gözlük tamir",
          "gözlük onarım",
          "gözlük tamiri işi",
          "gözlük onarımı işi",
          "gözlük tamiri lazım",
          "gözlük onarımı lazım",
          "gözlük tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "bag-repair",
    name: "Çanta Tamiri",
    keywords: [
      "çanta tamiri",
      "çanta onarımı",
      "çanta tamir",
      "çanta onarım",
      "çanta tamiri işi",
      "çanta onarımı işi",
      "çanta tamiri lazım",
      "çanta onarımı lazım",
    ],
    subServices: [
      {
        id: "bag-repair-service",
        name: "Çanta tamiri hizmeti",
        keywords: [
          "çanta tamiri",
          "çanta onarımı",
          "çanta tamir",
          "çanta onarım",
          "çanta tamiri işi",
          "çanta onarımı işi",
          "çanta tamiri lazım",
        ],
      },
      {
        id: "other-bag-repair",
        name: "Diğer (çanta tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çanta tamiri",
          "çanta onarımı",
          "çanta tamir",
          "çanta onarım",
          "çanta tamiri işi",
          "çanta onarımı işi",
          "çanta tamiri lazım",
          "çanta onarımı lazım",
          "çanta tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "shoe-repair",
    name: "Ayakkabı Tamiri",
    keywords: [
      "ayakkabı tamiri",
      "ayakkabı onarımı",
      "ayakkabı tamir",
      "ayakkabı onarım",
      "ayakkabı tamiri işi",
      "ayakkabı onarımı işi",
      "ayakkabı tamiri lazım",
      "ayakkabı onarımı lazım",
    ],
    subServices: [
      {
        id: "shoe-repair-service",
        name: "Ayakkabı tamiri hizmeti",
        keywords: [
          "ayakkabı tamiri",
          "ayakkabı onarımı",
          "ayakkabı tamir",
          "ayakkabı onarım",
          "ayakkabı tamiri işi",
          "ayakkabı onarımı işi",
          "ayakkabı tamiri lazım",
        ],
      },
      {
        id: "other-shoe-repair",
        name: "Diğer (ayakkabı tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ayakkabı tamiri",
          "ayakkabı onarımı",
          "ayakkabı tamir",
          "ayakkabı onarım",
          "ayakkabı tamiri işi",
          "ayakkabı onarımı işi",
          "ayakkabı tamiri lazım",
          "ayakkabı onarımı lazım",
          "ayakkabı tamiri hizmeti",
        ],
      },
    ],
  },

  {
    id: "leather-work",
    name: "Deri İşleri",
    keywords: [
      "deri işleri",
      "deri işçiliği",
      "deri işleri işi",
      "deri işçiliği işi",
      "deri işleri lazım",
      "deri işçiliği lazım",
      "deri işleri usta",
    ],
    subServices: [
      {
        id: "leather-work-service",
        name: "Deri işleri hizmeti",
        keywords: [
          "deri işleri",
          "deri işçiliği",
          "deri işleri işi",
          "deri işçiliği işi",
          "deri işleri usta",
          "deri işleri lazım",
        ],
      },
      {
        id: "other-leather-work",
        name: "Diğer (deri işleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "deri işleri",
          "deri işçiliği",
          "deri işleri işi",
          "deri işçiliği işi",
          "deri işleri lazım",
          "deri işçiliği lazım",
          "deri işleri usta",
          "deri işleri hizmeti",
        ],
      },
    ],
  },

  {
    id: "knitting",
    name: "Örgü",
    keywords: [
      "örgü",
      "örgü işi",
      "örgü lazım",
      "örgü hizmeti",
      "örgü işi",
      "örgü lazım",
      "örgü hizmeti",
    ],
    subServices: [
      {
        id: "knitting-service",
        name: "Örgü hizmeti",
        keywords: [
          "örgü",
          "örgü işi",
          "örgü lazım",
          "örgü hizmeti",
          "örgü işi",
          "örgü lazım",
        ],
      },
      {
        id: "other-knitting",
        name: "Diğer (örgü ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "örgü",
          "örgü işi",
          "örgü lazım",
          "örgü hizmeti",
          "örgü işi",
          "örgü lazım",
          "örgü hizmeti",
          "örgü hizmeti",
        ],
      },
    ],
  },

  {
    id: "handicraft",
    name: "El İşi",
    keywords: [
      "el işi",
      "el sanatları",
      "el işi işi",
      "el sanatları işi",
      "el işi lazım",
      "el sanatları lazım",
      "el işi hizmeti",
    ],
    subServices: [
      {
        id: "handicraft-service",
        name: "El işi hizmeti",
        keywords: [
          "el işi",
          "el sanatları",
          "el işi işi",
          "el sanatları işi",
          "el işi lazım",
          "el sanatları lazım",
        ],
      },
      {
        id: "other-handicraft",
        name: "Diğer (el işi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "el işi",
          "el sanatları",
          "el işi işi",
          "el sanatları işi",
          "el işi lazım",
          "el sanatları lazım",
          "el işi hizmeti",
          "el işi hizmeti",
        ],
      },
    ],
  },

  {
    id: "gardening-services",
    name: "Bahçıvanlık",
    keywords: [
      "bahçıvanlık",
      "bahçıvan",
      "bahçıvanlık işi",
      "bahçıvan işi",
      "bahçıvanlık lazım",
      "bahçıvan lazım",
      "bahçıvanlık hizmeti",
    ],
    subServices: [
      {
        id: "gardening-service",
        name: "Bahçıvanlık hizmeti",
        keywords: [
          "bahçıvanlık",
          "bahçıvan",
          "bahçıvanlık işi",
          "bahçıvan işi",
          "bahçıvanlık lazım",
          "bahçıvan lazım",
        ],
      },
      {
        id: "other-gardening-services",
        name: "Diğer (bahçıvanlık ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "bahçıvanlık",
          "bahçıvan",
          "bahçıvanlık işi",
          "bahçıvan işi",
          "bahçıvanlık lazım",
          "bahçıvan lazım",
          "bahçıvanlık hizmeti",
          "bahçıvanlık hizmeti",
        ],
      },
    ],
  },

  {
    id: "pastry-chef",
    name: "Pastacılık",
    keywords: [
      "pastacılık",
      "pastacı",
      "pastacılık işi",
      "pastacı işi",
      "pastacılık lazım",
      "pastacı lazım",
      "pastacılık hizmeti",
    ],
    subServices: [
      {
        id: "pastry-chef-service",
        name: "Pastacılık hizmeti",
        keywords: [
          "pastacılık",
          "pastacı",
          "pastacılık işi",
          "pastacı işi",
          "pastacılık lazım",
          "pastacı lazım",
        ],
      },
      {
        id: "other-pastry-chef",
        name: "Diğer (pastacılık ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "pastacılık",
          "pastacı",
          "pastacılık işi",
          "pastacı işi",
          "pastacılık lazım",
          "pastacı lazım",
          "pastacılık hizmeti",
          "pastacılık hizmeti",
        ],
      },
    ],
  },

  {
    id: "waiter-service",
    name: "Garsonluk",
    keywords: [
      "garsonluk",
      "garson",
      "garsonluk işi",
      "garson işi",
      "garsonluk lazım",
      "garson lazım",
      "garsonluk hizmeti",
    ],
    subServices: [
      {
        id: "waiter-service-general",
        name: "Garsonluk hizmeti",
        keywords: [
          "garsonluk",
          "garson",
          "garsonluk işi",
          "garson işi",
          "garsonluk lazım",
          "garson lazım",
        ],
      },
      {
        id: "other-waiter-service",
        name: "Diğer (garsonluk ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "garsonluk",
          "garson",
          "garsonluk işi",
          "garson işi",
          "garsonluk lazım",
          "garson lazım",
          "garsonluk hizmeti",
          "garsonluk hizmeti",
        ],
      },
    ],
  },

  {
    id: "bartender",
    name: "Barmenlik",
    keywords: [
      "barmenlik",
      "barmen",
      "barmenlik işi",
      "barmen işi",
      "barmenlik lazım",
      "barmen lazım",
      "barmenlik hizmeti",
    ],
    subServices: [
      {
        id: "bartender-service",
        name: "Barmenlik hizmeti",
        keywords: [
          "barmenlik",
          "barmen",
          "barmenlik işi",
          "barmen işi",
          "barmenlik lazım",
          "barmen lazım",
        ],
      },
      {
        id: "other-bartender",
        name: "Diğer (barmenlik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "barmenlik",
          "barmen",
          "barmenlik işi",
          "barmen işi",
          "barmenlik lazım",
          "barmen lazım",
          "barmenlik hizmeti",
          "barmenlik hizmeti",
        ],
      },
    ],
  },

  {
    id: "security-guard",
    name: "Güvenlik Görevlisi",
    keywords: [
      "güvenlik görevlisi",
      "güvenlik",
      "güvenlik görevlisi işi",
      "güvenlik işi",
      "güvenlik görevlisi lazım",
      "güvenlik lazım",
      "güvenlik görevlisi hizmeti",
    ],
    subServices: [
      {
        id: "security-guard-service",
        name: "Güvenlik görevlisi hizmeti",
        keywords: [
          "güvenlik görevlisi",
          "güvenlik",
          "güvenlik görevlisi işi",
          "güvenlik işi",
          "güvenlik görevlisi lazım",
          "güvenlik lazım",
        ],
      },
      {
        id: "other-security-guard",
        name: "Diğer (güvenlik görevlisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "güvenlik görevlisi",
          "güvenlik",
          "güvenlik görevlisi işi",
          "güvenlik işi",
          "güvenlik görevlisi lazım",
          "güvenlik lazım",
          "güvenlik görevlisi hizmeti",
          "güvenlik görevlisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "courier-service",
    name: "Kurye Hizmeti",
    keywords: [
      "kurye",
      "kurye hizmeti",
      "kurye işi",
      "kurye lazım",
      "kurye hizmeti işi",
      "kurye lazım",
      "kurye hizmeti lazım",
    ],
    subServices: [
      {
        id: "courier-service-general",
        name: "Kurye hizmeti",
        keywords: [
          "kurye",
          "kurye hizmeti",
          "kurye işi",
          "kurye lazım",
          "kurye hizmeti işi",
          "kurye lazım",
          "kurye hizmeti lazım",
        ],
      },
      {
        id: "other-courier-service",
        name: "Diğer (kurye hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kurye",
          "kurye hizmeti",
          "kurye işi",
          "kurye lazım",
          "kurye hizmeti işi",
          "kurye lazım",
          "kurye hizmeti lazım",
          "kurye hizmeti",
        ],
      },
    ],
  },

  {
    id: "cargo-service",
    name: "Kargo Hizmeti",
    keywords: [
      "kargo",
      "kargo hizmeti",
      "kargo işi",
      "kargo lazım",
      "kargo hizmeti işi",
      "kargo lazım",
      "kargo hizmeti lazım",
    ],
    subServices: [
      {
        id: "cargo-service-general",
        name: "Kargo hizmeti",
        keywords: [
          "kargo",
          "kargo hizmeti",
          "kargo işi",
          "kargo lazım",
          "kargo hizmeti işi",
          "kargo lazım",
          "kargo hizmeti lazım",
        ],
      },
      {
        id: "other-cargo-service",
        name: "Diğer (kargo hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kargo",
          "kargo hizmeti",
          "kargo işi",
          "kargo lazım",
          "kargo hizmeti işi",
          "kargo lazım",
          "kargo hizmeti lazım",
          "kargo hizmeti",
        ],
      },
    ],
  },

  {
    id: "logistics",
    name: "Lojistik",
    keywords: [
      "lojistik",
      "lojistik hizmeti",
      "lojistik işi",
      "lojistik lazım",
      "lojistik hizmeti işi",
      "lojistik lazım",
      "lojistik hizmeti lazım",
    ],
    subServices: [
      {
        id: "logistics-service",
        name: "Lojistik hizmeti",
        keywords: [
          "lojistik",
          "lojistik hizmeti",
          "lojistik işi",
          "lojistik lazım",
          "lojistik hizmeti işi",
          "lojistik lazım",
          "lojistik hizmeti lazım",
        ],
      },
      {
        id: "other-logistics",
        name: "Diğer (lojistik ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "lojistik",
          "lojistik hizmeti",
          "lojistik işi",
          "lojistik lazım",
          "lojistik hizmeti işi",
          "lojistik lazım",
          "lojistik hizmeti lazım",
          "lojistik hizmeti",
        ],
      },
    ],
  },

  {
    id: "archiving",
    name: "Arşivleme",
    keywords: [
      "arşivleme",
      "arşiv",
      "arşivleme işi",
      "arşiv işi",
      "arşivleme lazım",
      "arşiv lazım",
      "arşivleme hizmeti",
    ],
    subServices: [
      {
        id: "archiving-service",
        name: "Arşivleme hizmeti",
        keywords: [
          "arşivleme",
          "arşiv",
          "arşivleme işi",
          "arşiv işi",
          "arşivleme lazım",
          "arşiv lazım",
        ],
      },
      {
        id: "other-archiving",
        name: "Diğer (arşivleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "arşivleme",
          "arşiv",
          "arşivleme işi",
          "arşiv işi",
          "arşivleme lazım",
          "arşiv lazım",
          "arşivleme hizmeti",
          "arşivleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "digitization",
    name: "Dijitalleştirme",
    keywords: [
      "dijitalleştirme",
      "dijitalleştirme hizmeti",
      "dijitalleştirme işi",
      "dijitalleştirme lazım",
      "dijitalleştirme hizmeti işi",
      "dijitalleştirme lazım",
      "dijitalleştirme hizmeti lazım",
    ],
    subServices: [
      {
        id: "digitization-service",
        name: "Dijitalleştirme hizmeti",
        keywords: [
          "dijitalleştirme",
          "dijitalleştirme hizmeti",
          "dijitalleştirme işi",
          "dijitalleştirme lazım",
          "dijitalleştirme hizmeti işi",
          "dijitalleştirme lazım",
          "dijitalleştirme hizmeti lazım",
        ],
      },
      {
        id: "other-digitization",
        name: "Diğer (dijitalleştirme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dijitalleştirme",
          "dijitalleştirme hizmeti",
          "dijitalleştirme işi",
          "dijitalleştirme lazım",
          "dijitalleştirme hizmeti işi",
          "dijitalleştirme lazım",
          "dijitalleştirme hizmeti lazım",
          "dijitalleştirme hizmeti",
        ],
      },
    ],
  },

  {
    id: "data-entry",
    name: "Veri Girişi",
    keywords: [
      "veri girişi",
      "veri girişi hizmeti",
      "veri girişi işi",
      "veri girişi lazım",
      "veri girişi hizmeti işi",
      "veri girişi lazım",
      "veri girişi hizmeti lazım",
    ],
    subServices: [
      {
        id: "data-entry-service",
        name: "Veri girişi hizmeti",
        keywords: [
          "veri girişi",
          "veri girişi hizmeti",
          "veri girişi işi",
          "veri girişi lazım",
          "veri girişi hizmeti işi",
          "veri girişi lazım",
          "veri girişi hizmeti lazım",
        ],
      },
      {
        id: "other-data-entry",
        name: "Diğer (veri girişi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "veri girişi",
          "veri girişi hizmeti",
          "veri girişi işi",
          "veri girişi lazım",
          "veri girişi hizmeti işi",
          "veri girişi lazım",
          "veri girişi hizmeti lazım",
          "veri girişi hizmeti",
        ],
      },
    ],
  },

  {
    id: "interpreting",
    name: "Tercümanlık",
    keywords: [
      "tercümanlık",
      "tercüman",
      "tercümanlık işi",
      "tercüman işi",
      "tercümanlık lazım",
      "tercüman lazım",
      "tercümanlık hizmeti",
    ],
    subServices: [
      {
        id: "interpreting-service",
        name: "Tercümanlık hizmeti",
        keywords: [
          "tercümanlık",
          "tercüman",
          "tercümanlık işi",
          "tercüman işi",
          "tercümanlık lazım",
          "tercüman lazım",
        ],
      },
      {
        id: "other-interpreting",
        name: "Diğer (tercümanlık ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "tercümanlık",
          "tercüman",
          "tercümanlık işi",
          "tercüman işi",
          "tercümanlık lazım",
          "tercüman lazım",
          "tercümanlık hizmeti",
          "tercümanlık hizmeti",
        ],
      },
    ],
  },

  {
    id: "dubbing",
    name: "Dublaj",
    keywords: [
      "dublaj",
      "dublaj hizmeti",
      "dublaj işi",
      "dublaj lazım",
      "dublaj hizmeti işi",
      "dublaj lazım",
      "dublaj hizmeti lazım",
    ],
    subServices: [
      {
        id: "dubbing-service",
        name: "Dublaj hizmeti",
        keywords: [
          "dublaj",
          "dublaj hizmeti",
          "dublaj işi",
          "dublaj lazım",
          "dublaj hizmeti işi",
          "dublaj lazım",
          "dublaj hizmeti lazım",
        ],
      },
      {
        id: "other-dubbing",
        name: "Diğer (dublaj ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "dublaj",
          "dublaj hizmeti",
          "dublaj işi",
          "dublaj lazım",
          "dublaj hizmeti işi",
          "dublaj lazım",
          "dublaj hizmeti lazım",
          "dublaj hizmeti",
        ],
      },
    ],
  },

  {
    id: "voice-over",
    name: "Seslendirme",
    keywords: [
      "seslendirme",
      "seslendirme hizmeti",
      "seslendirme işi",
      "seslendirme lazım",
      "seslendirme hizmeti işi",
      "seslendirme lazım",
      "seslendirme hizmeti lazım",
    ],
    subServices: [
      {
        id: "voice-over-service",
        name: "Seslendirme hizmeti",
        keywords: [
          "seslendirme",
          "seslendirme hizmeti",
          "seslendirme işi",
          "seslendirme lazım",
          "seslendirme hizmeti işi",
          "seslendirme lazım",
          "seslendirme hizmeti lazım",
        ],
      },
      {
        id: "other-voice-over",
        name: "Diğer (seslendirme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "seslendirme",
          "seslendirme hizmeti",
          "seslendirme işi",
          "seslendirme lazım",
          "seslendirme hizmeti işi",
          "seslendirme lazım",
          "seslendirme hizmeti lazım",
          "seslendirme hizmeti",
        ],
      },
    ],
  },

  {
    id: "modeling",
    name: "Modelleme",
    keywords: [
      "modelleme",
      "model",
      "modelleme işi",
      "model işi",
      "modelleme lazım",
      "model lazım",
      "modelleme hizmeti",
    ],
    subServices: [
      {
        id: "modeling-service",
        name: "Modelleme hizmeti",
        keywords: [
          "modelleme",
          "model",
          "modelleme işi",
          "model işi",
          "modelleme lazım",
          "model lazım",
        ],
      },
      {
        id: "other-modeling",
        name: "Diğer (modelleme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "modelleme",
          "model",
          "modelleme işi",
          "model işi",
          "modelleme lazım",
          "model lazım",
          "modelleme hizmeti",
          "modelleme hizmeti",
        ],
      },
    ],
  },

  {
    id: "acting",
    name: "Aktörlük",
    keywords: [
      "aktörlük",
      "aktör",
      "aktörlük işi",
      "aktör işi",
      "aktörlük lazım",
      "aktör lazım",
      "aktörlük hizmeti",
    ],
    subServices: [
      {
        id: "acting-service",
        name: "Aktörlük hizmeti",
        keywords: [
          "aktörlük",
          "aktör",
          "aktörlük işi",
          "aktör işi",
          "aktörlük lazım",
          "aktör lazım",
        ],
      },
      {
        id: "other-acting",
        name: "Diğer (aktörlük ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "aktörlük",
          "aktör",
          "aktörlük işi",
          "aktör işi",
          "aktörlük lazım",
          "aktör lazım",
          "aktörlük hizmeti",
          "aktörlük hizmeti",
        ],
      },
    ],
  },

  {
    id: "instrument-teaching",
    name: "Enstrüman Öğretimi",
    keywords: [
      "enstrüman öğretimi",
      "müzik aleti öğretimi",
      "enstrüman dersi",
      "müzik aleti dersi",
      "enstrüman öğretimi işi",
      "müzik aleti öğretimi işi",
      "enstrüman öğretimi lazım",
      "müzik aleti öğretimi lazım",
    ],
    subServices: [
      {
        id: "instrument-teaching-service",
        name: "Enstrüman öğretimi hizmeti",
        keywords: [
          "enstrüman öğretimi",
          "müzik aleti öğretimi",
          "enstrüman dersi",
          "müzik aleti dersi",
          "enstrüman öğretimi işi",
          "müzik aleti öğretimi işi",
          "enstrüman öğretimi lazım",
        ],
      },
      {
        id: "other-instrument-teaching",
        name: "Diğer (enstrüman öğretimi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "enstrüman öğretimi",
          "müzik aleti öğretimi",
          "enstrüman dersi",
          "müzik aleti dersi",
          "enstrüman öğretimi işi",
          "müzik aleti öğretimi işi",
          "enstrüman öğretimi lazım",
          "müzik aleti öğretimi lazım",
          "enstrüman öğretimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "fitness-training",
    name: "Fitness",
    keywords: [
      "fitness",
      "fitness antrenörü",
      "fitness işi",
      "fitness antrenörü işi",
      "fitness lazım",
      "fitness antrenörü lazım",
      "fitness hizmeti",
    ],
    subServices: [
      {
        id: "fitness-training-service",
        name: "Fitness hizmeti",
        keywords: [
          "fitness",
          "fitness antrenörü",
          "fitness işi",
          "fitness antrenörü işi",
          "fitness lazım",
          "fitness antrenörü lazım",
        ],
      },
      {
        id: "other-fitness-training",
        name: "Diğer (fitness ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "fitness",
          "fitness antrenörü",
          "fitness işi",
          "fitness antrenörü işi",
          "fitness lazım",
          "fitness antrenörü lazım",
          "fitness hizmeti",
          "fitness hizmeti",
        ],
      },
    ],
  },

  {
    id: "wedding-organization",
    name: "Düğün Organizasyonu",
    keywords: [
      "düğün organizasyonu",
      "düğün organizatörü",
      "düğün organizasyonu işi",
      "düğün organizatörü işi",
      "düğün organizasyonu lazım",
      "düğün organizatörü lazım",
      "düğün organizasyonu hizmeti",
    ],
    subServices: [
      {
        id: "wedding-planning",
        name: "Düğün planlama",
        keywords: [
          "düğün planlama",
          "düğün planlama işi",
          "düğün planlama lazım",
          "düğün planlama hizmeti",
          "düğün organizasyonu planlama",
        ],
      },
      {
        id: "wedding-coordination",
        name: "Düğün koordinasyonu",
        keywords: [
          "düğün koordinasyonu",
          "düğün koordinasyonu işi",
          "düğün koordinasyonu lazım",
          "düğün koordinasyonu hizmeti",
          "düğün organizasyonu koordinasyon",
        ],
      },
      {
        id: "other-wedding-organization",
        name: "Diğer (düğün organizasyonu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "düğün organizasyonu",
          "düğün organizatörü",
          "düğün organizasyonu işi",
          "düğün organizatörü işi",
          "düğün organizasyonu lazım",
          "düğün organizatörü lazım",
          "düğün organizasyonu hizmeti",
          "düğün organizasyonu hizmeti",
        ],
      },
    ],
  },

  {
    id: "event-organization",
    name: "Etkinlik Organizasyonu",
    keywords: [
      "etkinlik organizasyonu",
      "etkinlik organizatörü",
      "etkinlik organizasyonu işi",
      "etkinlik organizatörü işi",
      "etkinlik organizasyonu lazım",
      "etkinlik organizatörü lazım",
      "etkinlik organizasyonu hizmeti",
    ],
    subServices: [
      {
        id: "event-planning",
        name: "Etkinlik planlama",
        keywords: [
          "etkinlik planlama",
          "etkinlik planlama işi",
          "etkinlik planlama lazım",
          "etkinlik planlama hizmeti",
          "etkinlik organizasyonu planlama",
        ],
      },
      {
        id: "event-coordination",
        name: "Etkinlik koordinasyonu",
        keywords: [
          "etkinlik koordinasyonu",
          "etkinlik koordinasyonu işi",
          "etkinlik koordinasyonu lazım",
          "etkinlik koordinasyonu hizmeti",
          "etkinlik organizasyonu koordinasyon",
        ],
      },
      {
        id: "other-event-organization",
        name: "Diğer (etkinlik organizasyonu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "etkinlik organizasyonu",
          "etkinlik organizatörü",
          "etkinlik organizasyonu işi",
          "etkinlik organizatörü işi",
          "etkinlik organizasyonu lazım",
          "etkinlik organizatörü lazım",
          "etkinlik organizasyonu hizmeti",
          "etkinlik organizasyonu hizmeti",
        ],
      },
    ],
  },

  {
    id: "ironing-service",
    name: "Ütü Hizmeti",
    keywords: [
      "ütü",
      "ütü hizmeti",
      "ütü işi",
      "ütü lazım",
      "ütü hizmeti işi",
      "ütü lazım",
      "ütü hizmeti lazım",
    ],
    subServices: [
      {
        id: "ironing-service-general",
        name: "Ütü hizmeti",
        keywords: [
          "ütü",
          "ütü hizmeti",
          "ütü işi",
          "ütü lazım",
          "ütü hizmeti işi",
          "ütü lazım",
          "ütü hizmeti lazım",
        ],
      },
      {
        id: "other-ironing-service",
        name: "Diğer (ütü hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ütü",
          "ütü hizmeti",
          "ütü işi",
          "ütü lazım",
          "ütü hizmeti işi",
          "ütü lazım",
          "ütü hizmeti lazım",
          "ütü hizmeti",
        ],
      },
    ],
  },

  {
    id: "private-driver",
    name: "Özel Şoför",
    keywords: [
      "özel şoför",
      "şoför",
      "özel şoför işi",
      "şoför işi",
      "özel şoför lazım",
      "şoför lazım",
      "özel şoför hizmeti",
    ],
    subServices: [
      {
        id: "private-driver-service",
        name: "Özel şoför hizmeti",
        keywords: [
          "özel şoför",
          "şoför",
          "özel şoför işi",
          "şoför işi",
          "özel şoför lazım",
          "şoför lazım",
        ],
      },
      {
        id: "other-private-driver",
        name: "Diğer (özel şoför ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "özel şoför",
          "şoför",
          "özel şoför işi",
          "şoför işi",
          "özel şoför lazım",
          "şoför lazım",
          "özel şoför hizmeti",
          "özel şoför hizmeti",
        ],
      },
    ],
  },

  {
    id: "transfer-service",
    name: "Transfer Hizmeti",
    keywords: [
      "transfer",
      "transfer hizmeti",
      "transfer işi",
      "transfer lazım",
      "transfer hizmeti işi",
      "transfer lazım",
      "transfer hizmeti lazım",
    ],
    subServices: [
      {
        id: "transfer-service-general",
        name: "Transfer hizmeti",
        keywords: [
          "transfer",
          "transfer hizmeti",
          "transfer işi",
          "transfer lazım",
          "transfer hizmeti işi",
          "transfer lazım",
          "transfer hizmeti lazım",
        ],
      },
      {
        id: "other-transfer-service",
        name: "Diğer (transfer hizmeti ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "transfer",
          "transfer hizmeti",
          "transfer işi",
          "transfer lazım",
          "transfer hizmeti işi",
          "transfer lazım",
          "transfer hizmeti lazım",
          "transfer hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-inspection",
    name: "Araç Muayene",
    keywords: [
      "araç muayene",
      "araç muayenesi",
      "araç muayene işi",
      "araç muayenesi işi",
      "araç muayene lazım",
      "araç muayenesi lazım",
      "araç muayene hizmeti",
    ],
    subServices: [
      {
        id: "car-inspection-service",
        name: "Araç muayene hizmeti",
        keywords: [
          "araç muayene",
          "araç muayenesi",
          "araç muayene işi",
          "araç muayenesi işi",
          "araç muayene lazım",
          "araç muayenesi lazım",
        ],
      },
      {
        id: "other-car-inspection",
        name: "Diğer (araç muayene ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç muayene",
          "araç muayenesi",
          "araç muayene işi",
          "araç muayenesi işi",
          "araç muayene lazım",
          "araç muayenesi lazım",
          "araç muayene hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-alarm-installation",
    name: "Araç Alarm Kurulumu",
    keywords: [
      "araç alarm kurulumu",
      "oto alarm kurulumu",
      "araç alarm montajı",
      "oto alarm montajı",
      "araç alarm kurulumu işi",
      "oto alarm kurulumu işi",
      "araç alarm kurulumu lazım",
      "oto alarm kurulumu lazım",
    ],
    subServices: [
      {
        id: "car-alarm-installation-service",
        name: "Araç alarm kurulumu",
        keywords: [
          "araç alarm kurulumu",
          "oto alarm kurulumu",
          "araç alarm montajı",
          "oto alarm montajı",
          "araç alarm kurulumu işi",
          "oto alarm kurulumu işi",
          "araç alarm kurulumu lazım",
        ],
      },
      {
        id: "car-alarm-repair",
        name: "Araç alarm tamiri",
        keywords: [
          "araç alarm tamiri",
          "oto alarm tamiri",
          "araç alarm onarımı",
          "oto alarm onarımı",
          "araç alarm tamir",
          "oto alarm tamir",
          "araç alarm tamiri lazım",
        ],
      },
      {
        id: "other-car-alarm-installation",
        name: "Diğer (araç alarm kurulumu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç alarm kurulumu",
          "oto alarm kurulumu",
          "araç alarm montajı",
          "oto alarm montajı",
          "araç alarm kurulumu işi",
          "oto alarm kurulumu işi",
          "araç alarm kurulumu lazım",
          "oto alarm kurulumu lazım",
          "araç alarm kurulumu hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-navigation-installation",
    name: "Araç Navigasyon Kurulumu",
    keywords: [
      "araç navigasyon kurulumu",
      "oto navigasyon kurulumu",
      "araç navigasyon montajı",
      "oto navigasyon montajı",
      "araç navigasyon kurulumu işi",
      "oto navigasyon kurulumu işi",
      "araç navigasyon kurulumu lazım",
      "oto navigasyon kurulumu lazım",
    ],
    subServices: [
      {
        id: "car-navigation-installation-service",
        name: "Araç navigasyon kurulumu",
        keywords: [
          "araç navigasyon kurulumu",
          "oto navigasyon kurulumu",
          "araç navigasyon montajı",
          "oto navigasyon montajı",
          "araç navigasyon kurulumu işi",
          "oto navigasyon kurulumu işi",
          "araç navigasyon kurulumu lazım",
        ],
      },
      {
        id: "car-navigation-repair",
        name: "Araç navigasyon tamiri",
        keywords: [
          "araç navigasyon tamiri",
          "oto navigasyon tamiri",
          "araç navigasyon onarımı",
          "oto navigasyon onarımı",
          "araç navigasyon tamir",
          "oto navigasyon tamir",
          "araç navigasyon tamiri lazım",
        ],
      },
      {
        id: "other-car-navigation-installation",
        name: "Diğer (araç navigasyon kurulumu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç navigasyon kurulumu",
          "oto navigasyon kurulumu",
          "araç navigasyon montajı",
          "oto navigasyon montajı",
          "araç navigasyon kurulumu işi",
          "oto navigasyon kurulumu işi",
          "araç navigasyon kurulumu lazım",
          "oto navigasyon kurulumu lazım",
          "araç navigasyon kurulumu hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-camera-installation",
    name: "Araç Kamera Kurulumu",
    keywords: [
      "araç kamera kurulumu",
      "oto kamera kurulumu",
      "araç kamera montajı",
      "oto kamera montajı",
      "araç kamera kurulumu işi",
      "oto kamera kurulumu işi",
      "araç kamera kurulumu lazım",
      "oto kamera kurulumu lazım",
    ],
    subServices: [
      {
        id: "car-camera-installation-service",
        name: "Araç kamera kurulumu",
        keywords: [
          "araç kamera kurulumu",
          "oto kamera kurulumu",
          "araç kamera montajı",
          "oto kamera montajı",
          "araç kamera kurulumu işi",
          "oto kamera kurulumu işi",
          "araç kamera kurulumu lazım",
        ],
      },
      {
        id: "car-camera-repair",
        name: "Araç kamera tamiri",
        keywords: [
          "araç kamera tamiri",
          "oto kamera tamiri",
          "araç kamera onarımı",
          "oto kamera onarımı",
          "araç kamera tamir",
          "oto kamera tamir",
          "araç kamera tamiri lazım",
        ],
      },
      {
        id: "other-car-camera-installation",
        name: "Diğer (araç kamera kurulumu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç kamera kurulumu",
          "oto kamera kurulumu",
          "araç kamera montajı",
          "oto kamera montajı",
          "araç kamera kurulumu işi",
          "oto kamera kurulumu işi",
          "araç kamera kurulumu lazım",
          "oto kamera kurulumu lazım",
          "araç kamera kurulumu hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-stereo-installation",
    name: "Araç Ses Sistemi Kurulumu",
    keywords: [
      "araç ses sistemi kurulumu",
      "oto ses sistemi kurulumu",
      "araç ses sistemi montajı",
      "oto ses sistemi montajı",
      "araç ses sistemi kurulumu işi",
      "oto ses sistemi kurulumu işi",
      "araç ses sistemi kurulumu lazım",
      "oto ses sistemi kurulumu lazım",
    ],
    subServices: [
      {
        id: "car-stereo-installation-service",
        name: "Araç ses sistemi kurulumu",
        keywords: [
          "araç ses sistemi kurulumu",
          "oto ses sistemi kurulumu",
          "araç ses sistemi montajı",
          "oto ses sistemi montajı",
          "araç ses sistemi kurulumu işi",
          "oto ses sistemi kurulumu işi",
          "araç ses sistemi kurulumu lazım",
        ],
      },
      {
        id: "car-stereo-repair",
        name: "Araç ses sistemi tamiri",
        keywords: [
          "araç ses sistemi tamiri",
          "oto ses sistemi tamiri",
          "araç ses sistemi onarımı",
          "oto ses sistemi onarımı",
          "araç ses sistemi tamir",
          "oto ses sistemi tamir",
          "araç ses sistemi tamiri lazım",
        ],
      },
      {
        id: "other-car-stereo-installation",
        name: "Diğer (araç ses sistemi kurulumu ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç ses sistemi kurulumu",
          "oto ses sistemi kurulumu",
          "araç ses sistemi montajı",
          "oto ses sistemi montajı",
          "araç ses sistemi kurulumu işi",
          "oto ses sistemi kurulumu işi",
          "araç ses sistemi kurulumu lazım",
          "oto ses sistemi kurulumu lazım",
          "araç ses sistemi kurulumu hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-window-tinting",
    name: "Cam Filmi",
    keywords: [
      "cam filmi",
      "araç cam filmi",
      "oto cam filmi",
      "cam filmi işi",
      "araç cam filmi işi",
      "oto cam filmi işi",
      "cam filmi lazım",
      "araç cam filmi lazım",
    ],
    subServices: [
      {
        id: "car-window-tinting-service",
        name: "Cam filmi hizmeti",
        keywords: [
          "cam filmi",
          "araç cam filmi",
          "oto cam filmi",
          "cam filmi işi",
          "araç cam filmi işi",
          "oto cam filmi işi",
          "cam filmi lazım",
        ],
      },
      {
        id: "other-car-window-tinting",
        name: "Diğer (cam filmi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "cam filmi",
          "araç cam filmi",
          "oto cam filmi",
          "cam filmi işi",
          "araç cam filmi işi",
          "oto cam filmi işi",
          "cam filmi lazım",
          "araç cam filmi lazım",
          "cam filmi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-interior-cleaning",
    name: "Araç İç Mekan Temizliği",
    keywords: [
      "araç iç mekan temizliği",
      "oto iç mekan temizliği",
      "araç iç temizlik",
      "oto iç temizlik",
      "araç iç mekan temizliği işi",
      "oto iç mekan temizliği işi",
      "araç iç mekan temizliği lazım",
      "oto iç mekan temizliği lazım",
    ],
    subServices: [
      {
        id: "car-interior-cleaning-service",
        name: "Araç iç mekan temizliği",
        keywords: [
          "araç iç mekan temizliği",
          "oto iç mekan temizliği",
          "araç iç temizlik",
          "oto iç temizlik",
          "araç iç mekan temizliği işi",
          "oto iç mekan temizliği işi",
          "araç iç mekan temizliği lazım",
        ],
      },
      {
        id: "other-car-interior-cleaning",
        name: "Diğer (araç iç mekan temizliği ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç iç mekan temizliği",
          "oto iç mekan temizliği",
          "araç iç temizlik",
          "oto iç temizlik",
          "araç iç mekan temizliği işi",
          "oto iç mekan temizliği işi",
          "araç iç mekan temizliği lazım",
          "oto iç mekan temizliği lazım",
          "araç iç mekan temizliği hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-accessory-installation",
    name: "Araç Aksesuar Montajı",
    keywords: [
      "araç aksesuar montajı",
      "oto aksesuar montajı",
      "araç aksesuar kurulumu",
      "oto aksesuar kurulumu",
      "araç aksesuar montajı işi",
      "oto aksesuar montajı işi",
      "araç aksesuar montajı lazım",
      "oto aksesuar montajı lazım",
    ],
    subServices: [
      {
        id: "car-accessory-installation-service",
        name: "Araç aksesuar montajı",
        keywords: [
          "araç aksesuar montajı",
          "oto aksesuar montajı",
          "araç aksesuar kurulumu",
          "oto aksesuar kurulumu",
          "araç aksesuar montajı işi",
          "oto aksesuar montajı işi",
          "araç aksesuar montajı lazım",
        ],
      },
      {
        id: "other-car-accessory-installation",
        name: "Diğer (araç aksesuar montajı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç aksesuar montajı",
          "oto aksesuar montajı",
          "araç aksesuar kurulumu",
          "oto aksesuar kurulumu",
          "araç aksesuar montajı işi",
          "oto aksesuar montajı işi",
          "araç aksesuar montajı lazım",
          "oto aksesuar montajı lazım",
          "araç aksesuar montajı hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-upholstery",
    name: "Araç Döşeme",
    keywords: [
      "araç döşeme",
      "oto döşeme",
      "araç döşeme işi",
      "oto döşeme işi",
      "araç döşeme lazım",
      "oto döşeme lazım",
      "araç döşeme hizmeti",
    ],
    subServices: [
      {
        id: "car-upholstery-service",
        name: "Araç döşeme hizmeti",
        keywords: [
          "araç döşeme",
          "oto döşeme",
          "araç döşeme işi",
          "oto döşeme işi",
          "araç döşeme lazım",
          "oto döşeme lazım",
        ],
      },
      {
        id: "car-upholstery-repair",
        name: "Araç döşeme tamiri",
        keywords: [
          "araç döşeme tamiri",
          "oto döşeme tamiri",
          "araç döşeme onarımı",
          "oto döşeme onarımı",
          "araç döşeme tamir",
          "oto döşeme tamir",
          "araç döşeme tamiri lazım",
        ],
      },
      {
        id: "other-car-upholstery",
        name: "Diğer (araç döşeme ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç döşeme",
          "oto döşeme",
          "araç döşeme işi",
          "oto döşeme işi",
          "araç döşeme lazım",
          "oto döşeme lazım",
          "araç döşeme hizmeti",
          "araç döşeme hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-glass-replacement",
    name: "Araç Cam Değişimi",
    keywords: [
      "araç cam değişimi",
      "oto cam değişimi",
      "araç cam değiştirme",
      "oto cam değiştirme",
      "araç cam değişimi işi",
      "oto cam değişimi işi",
      "araç cam değişimi lazım",
      "oto cam değişimi lazım",
    ],
    subServices: [
      {
        id: "car-glass-replacement-service",
        name: "Araç cam değişimi",
        keywords: [
          "araç cam değişimi",
          "oto cam değişimi",
          "araç cam değiştirme",
          "oto cam değiştirme",
          "araç cam değişimi işi",
          "oto cam değişimi işi",
          "araç cam değişimi lazım",
        ],
      },
      {
        id: "car-glass-repair",
        name: "Araç cam tamiri",
        keywords: [
          "araç cam tamiri",
          "oto cam tamiri",
          "araç cam onarımı",
          "oto cam onarımı",
          "araç cam tamir",
          "oto cam tamir",
          "araç cam tamiri lazım",
        ],
      },
      {
        id: "other-car-glass-replacement",
        name: "Diğer (araç cam değişimi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç cam değişimi",
          "oto cam değişimi",
          "araç cam değiştirme",
          "oto cam değiştirme",
          "araç cam değişimi işi",
          "oto cam değişimi işi",
          "araç cam değişimi lazım",
          "oto cam değişimi lazım",
          "araç cam değişimi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-air-conditioning-service",
    name: "Araç Klima Servisi",
    keywords: [
      "araç klima servisi",
      "oto klima servisi",
      "araç klima tamiri",
      "oto klima tamiri",
      "araç klima servisi işi",
      "oto klima servisi işi",
      "araç klima servisi lazım",
      "oto klima servisi lazım",
    ],
    subServices: [
      {
        id: "car-ac-repair",
        name: "Araç klima tamiri",
        keywords: [
          "araç klima tamiri",
          "oto klima tamiri",
          "araç klima onarımı",
          "oto klima onarımı",
          "araç klima tamir",
          "oto klima tamir",
          "araç klima tamiri lazım",
        ],
      },
      {
        id: "car-ac-gas-refill",
        name: "Araç klima gaz doldurma",
        keywords: [
          "araç klima gaz doldurma",
          "oto klima gaz doldurma",
          "araç klima gaz",
          "oto klima gaz",
          "araç klima gaz doldurma işi",
          "oto klima gaz doldurma işi",
          "araç klima gaz doldurma lazım",
        ],
      },
      {
        id: "other-car-air-conditioning-service",
        name: "Diğer (araç klima servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç klima servisi",
          "oto klima servisi",
          "araç klima tamiri",
          "oto klima tamiri",
          "araç klima servisi işi",
          "oto klima servisi işi",
          "araç klima servisi lazım",
          "oto klima servisi lazım",
          "araç klima servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-battery-service",
    name: "Araç Akü Servisi",
    keywords: [
      "araç akü servisi",
      "oto akü servisi",
      "araç akü değişimi",
      "oto akü değişimi",
      "araç akü servisi işi",
      "oto akü servisi işi",
      "araç akü servisi lazım",
      "oto akü servisi lazım",
    ],
    subServices: [
      {
        id: "car-battery-replacement",
        name: "Araç akü değişimi",
        keywords: [
          "araç akü değişimi",
          "oto akü değişimi",
          "araç akü değiştirme",
          "oto akü değiştirme",
          "araç akü değişimi işi",
          "oto akü değişimi işi",
          "araç akü değişimi lazım",
        ],
      },
      {
        id: "car-battery-repair",
        name: "Araç akü tamiri",
        keywords: [
          "araç akü tamiri",
          "oto akü tamiri",
          "araç akü onarımı",
          "oto akü onarımı",
          "araç akü tamir",
          "oto akü tamir",
          "araç akü tamiri lazım",
        ],
      },
      {
        id: "other-car-battery-service",
        name: "Diğer (araç akü servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç akü servisi",
          "oto akü servisi",
          "araç akü değişimi",
          "oto akü değişimi",
          "araç akü servisi işi",
          "oto akü servisi işi",
          "araç akü servisi lazım",
          "oto akü servisi lazım",
          "araç akü servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-tire-service",
    name: "Araç Lastik Servisi",
    keywords: [
      "araç lastik servisi",
      "oto lastik servisi",
      "araç lastik değişimi",
      "oto lastik değişimi",
      "araç lastik servisi işi",
      "oto lastik servisi işi",
      "araç lastik servisi lazım",
      "oto lastik servisi lazım",
    ],
    subServices: [
      {
        id: "car-tire-replacement",
        name: "Araç lastik değişimi",
        keywords: [
          "araç lastik değişimi",
          "oto lastik değişimi",
          "araç lastik değiştirme",
          "oto lastik değiştirme",
          "araç lastik değişimi işi",
          "oto lastik değişimi işi",
          "araç lastik değişimi lazım",
        ],
      },
      {
        id: "car-tire-repair",
        name: "Araç lastik tamiri",
        keywords: [
          "araç lastik tamiri",
          "oto lastik tamiri",
          "araç lastik onarımı",
          "oto lastik onarımı",
          "araç lastik tamir",
          "oto lastik tamir",
          "araç lastik tamiri lazım",
        ],
      },
      {
        id: "car-tire-balancing",
        name: "Araç lastik balans",
        keywords: [
          "araç lastik balans",
          "oto lastik balans",
          "araç lastik balans ayarı",
          "oto lastik balans ayarı",
          "araç lastik balans işi",
          "oto lastik balans işi",
          "araç lastik balans lazım",
        ],
      },
      {
        id: "other-car-tire-service",
        name: "Diğer (araç lastik servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç lastik servisi",
          "oto lastik servisi",
          "araç lastik değişimi",
          "oto lastik değişimi",
          "araç lastik servisi işi",
          "oto lastik servisi işi",
          "araç lastik servisi lazım",
          "oto lastik servisi lazım",
          "araç lastik servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-sale-consulting",
    name: "Araç Satış Danışmanlığı",
    keywords: [
      "araç satış danışmanlığı",
      "oto satış danışmanlığı",
      "araç satış danışmanı",
      "oto satış danışmanı",
      "araç satış danışmanlığı işi",
      "oto satış danışmanlığı işi",
      "araç satış danışmanlığı lazım",
      "oto satış danışmanlığı lazım",
    ],
    subServices: [
      {
        id: "car-sale-consulting-service",
        name: "Araç satış danışmanlığı hizmeti",
        keywords: [
          "araç satış danışmanlığı",
          "oto satış danışmanlığı",
          "araç satış danışmanı",
          "oto satış danışmanı",
          "araç satış danışmanlığı işi",
          "oto satış danışmanlığı işi",
          "araç satış danışmanlığı lazım",
        ],
      },
      {
        id: "other-car-sale-consulting",
        name: "Diğer (araç satış danışmanlığı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç satış danışmanlığı",
          "oto satış danışmanlığı",
          "araç satış danışmanı",
          "oto satış danışmanı",
          "araç satış danışmanlığı işi",
          "oto satış danışmanlığı işi",
          "araç satış danışmanlığı lazım",
          "oto satış danışmanlığı lazım",
          "araç satış danışmanlığı hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-buy-sell",
    name: "Araç Alım-Satım",
    keywords: [
      "araç alım satım",
      "oto alım satım",
      "araç alım satım işi",
      "oto alım satım işi",
      "araç alım satım lazım",
      "oto alım satım lazım",
      "araç alım satım hizmeti",
    ],
    subServices: [
      {
        id: "car-buy-sell-service",
        name: "Araç alım-satım hizmeti",
        keywords: [
          "araç alım satım",
          "oto alım satım",
          "araç alım satım işi",
          "oto alım satım işi",
          "araç alım satım lazım",
          "oto alım satım lazım",
        ],
      },
      {
        id: "other-car-buy-sell",
        name: "Diğer (araç alım-satım ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç alım satım",
          "oto alım satım",
          "araç alım satım işi",
          "oto alım satım işi",
          "araç alım satım lazım",
          "oto alım satım lazım",
          "araç alım satım hizmeti",
          "araç alım satım hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-registration",
    name: "Araç Ruhsat İşlemleri",
    keywords: [
      "araç ruhsat işlemleri",
      "oto ruhsat işlemleri",
      "araç ruhsat",
      "oto ruhsat",
      "araç ruhsat işlemleri işi",
      "oto ruhsat işlemleri işi",
      "araç ruhsat işlemleri lazım",
      "oto ruhsat işlemleri lazım",
    ],
    subServices: [
      {
        id: "car-registration-service",
        name: "Araç ruhsat işlemleri hizmeti",
        keywords: [
          "araç ruhsat işlemleri",
          "oto ruhsat işlemleri",
          "araç ruhsat",
          "oto ruhsat",
          "araç ruhsat işlemleri işi",
          "oto ruhsat işlemleri işi",
          "araç ruhsat işlemleri lazım",
        ],
      },
      {
        id: "other-car-registration",
        name: "Diğer (araç ruhsat işlemleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç ruhsat işlemleri",
          "oto ruhsat işlemleri",
          "araç ruhsat",
          "oto ruhsat",
          "araç ruhsat işlemleri işi",
          "oto ruhsat işlemleri işi",
          "araç ruhsat işlemleri lazım",
          "oto ruhsat işlemleri lazım",
          "araç ruhsat işlemleri hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-insurance",
    name: "Araç Sigortası",
    keywords: [
      "araç sigortası",
      "oto sigortası",
      "araç sigorta",
      "oto sigorta",
      "araç sigortası işi",
      "oto sigortası işi",
      "araç sigortası lazım",
      "oto sigortası lazım",
    ],
    subServices: [
      {
        id: "car-insurance-service",
        name: "Araç sigortası hizmeti",
        keywords: [
          "araç sigortası",
          "oto sigortası",
          "araç sigorta",
          "oto sigorta",
          "araç sigortası işi",
          "oto sigortası işi",
          "araç sigortası lazım",
        ],
      },
      {
        id: "other-car-insurance",
        name: "Diğer (araç sigortası ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç sigortası",
          "oto sigortası",
          "araç sigorta",
          "oto sigorta",
          "araç sigortası işi",
          "oto sigortası işi",
          "araç sigortası lazım",
          "oto sigortası lazım",
          "araç sigortası hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-parts",
    name: "Araç Yedek Parça",
    keywords: [
      "araç yedek parça",
      "oto yedek parça",
      "araç yedek parça işi",
      "oto yedek parça işi",
      "araç yedek parça lazım",
      "oto yedek parça lazım",
      "araç yedek parça hizmeti",
    ],
    subServices: [
      {
        id: "car-parts-service",
        name: "Araç yedek parça hizmeti",
        keywords: [
          "araç yedek parça",
          "oto yedek parça",
          "araç yedek parça işi",
          "oto yedek parça işi",
          "araç yedek parça lazım",
          "oto yedek parça lazım",
        ],
      },
      {
        id: "other-car-parts",
        name: "Diğer (araç yedek parça ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç yedek parça",
          "oto yedek parça",
          "araç yedek parça işi",
          "oto yedek parça işi",
          "araç yedek parça lazım",
          "oto yedek parça lazım",
          "araç yedek parça hizmeti",
          "araç yedek parça hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-painting",
    name: "Araç Boyama",
    keywords: [
      "araç boyama",
      "oto boyama",
      "araç boyama işi",
      "oto boyama işi",
      "araç boyama lazım",
      "oto boyama lazım",
      "araç boyama hizmeti",
    ],
    subServices: [
      {
        id: "car-painting-service",
        name: "Araç boyama hizmeti",
        keywords: [
          "araç boyama",
          "oto boyama",
          "araç boyama işi",
          "oto boyama işi",
          "araç boyama lazım",
          "oto boyama lazım",
        ],
      },
      {
        id: "car-painting-repair",
        name: "Araç boyama tamiri",
        keywords: [
          "araç boyama tamiri",
          "oto boyama tamiri",
          "araç boyama onarımı",
          "oto boyama onarımı",
          "araç boyama tamir",
          "oto boyama tamir",
          "araç boyama tamiri lazım",
        ],
      },
      {
        id: "other-car-painting",
        name: "Diğer (araç boyama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç boyama",
          "oto boyama",
          "araç boyama işi",
          "oto boyama işi",
          "araç boyama lazım",
          "oto boyama lazım",
          "araç boyama hizmeti",
          "araç boyama hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-wrap",
    name: "Araç Wrap / Folyo",
    keywords: [
      "araç wrap",
      "oto wrap",
      "araç folyo",
      "oto folyo",
      "araç wrap işi",
      "oto wrap işi",
      "araç wrap lazım",
      "oto wrap lazım",
    ],
    subServices: [
      {
        id: "car-wrap-service",
        name: "Araç wrap / folyo hizmeti",
        keywords: [
          "araç wrap",
          "oto wrap",
          "araç folyo",
          "oto folyo",
          "araç wrap işi",
          "oto wrap işi",
          "araç wrap lazım",
        ],
      },
      {
        id: "other-car-wrap",
        name: "Diğer (araç wrap / folyo ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç wrap",
          "oto wrap",
          "araç folyo",
          "oto folyo",
          "araç wrap işi",
          "oto wrap işi",
          "araç wrap lazım",
          "oto wrap lazım",
          "araç wrap hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-polishing",
    name: "Araç Cilalama",
    keywords: [
      "araç cilalama",
      "oto cilalama",
      "araç cilalama işi",
      "oto cilalama işi",
      "araç cilalama lazım",
      "oto cilalama lazım",
      "araç cilalama hizmeti",
    ],
    subServices: [
      {
        id: "car-polishing-service",
        name: "Araç cilalama hizmeti",
        keywords: [
          "araç cilalama",
          "oto cilalama",
          "araç cilalama işi",
          "oto cilalama işi",
          "araç cilalama lazım",
          "oto cilalama lazım",
        ],
      },
      {
        id: "other-car-polishing",
        name: "Diğer (araç cilalama ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç cilalama",
          "oto cilalama",
          "araç cilalama işi",
          "oto cilalama işi",
          "araç cilalama lazım",
          "oto cilalama lazım",
          "araç cilalama hizmeti",
          "araç cilalama hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-wheel-alignment",
    name: "Araç Rot Balans",
    keywords: [
      "araç rot balans",
      "oto rot balans",
      "araç rot ayarı",
      "oto rot ayarı",
      "araç rot balans işi",
      "oto rot balans işi",
      "araç rot balans lazım",
      "oto rot balans lazım",
    ],
    subServices: [
      {
        id: "car-wheel-alignment-service",
        name: "Araç rot balans hizmeti",
        keywords: [
          "araç rot balans",
          "oto rot balans",
          "araç rot ayarı",
          "oto rot ayarı",
          "araç rot balans işi",
          "oto rot balans işi",
          "araç rot balans lazım",
        ],
      },
      {
        id: "other-car-wheel-alignment",
        name: "Diğer (araç rot balans ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç rot balans",
          "oto rot balans",
          "araç rot ayarı",
          "oto rot ayarı",
          "araç rot balans işi",
          "oto rot balans işi",
          "araç rot balans lazım",
          "oto rot balans lazım",
          "araç rot balans hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-brake-service",
    name: "Araç Fren Servisi",
    keywords: [
      "araç fren servisi",
      "oto fren servisi",
      "araç fren tamiri",
      "oto fren tamiri",
      "araç fren servisi işi",
      "oto fren servisi işi",
      "araç fren servisi lazım",
      "oto fren servisi lazım",
    ],
    subServices: [
      {
        id: "car-brake-repair",
        name: "Araç fren tamiri",
        keywords: [
          "araç fren tamiri",
          "oto fren tamiri",
          "araç fren onarımı",
          "oto fren onarımı",
          "araç fren tamir",
          "oto fren tamir",
          "araç fren tamiri lazım",
        ],
      },
      {
        id: "car-brake-replacement",
        name: "Araç fren değişimi",
        keywords: [
          "araç fren değişimi",
          "oto fren değişimi",
          "araç fren değiştirme",
          "oto fren değiştirme",
          "araç fren değişimi işi",
          "oto fren değişimi işi",
          "araç fren değişimi lazım",
        ],
      },
      {
        id: "other-car-brake-service",
        name: "Diğer (araç fren servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç fren servisi",
          "oto fren servisi",
          "araç fren tamiri",
          "oto fren tamiri",
          "araç fren servisi işi",
          "oto fren servisi işi",
          "araç fren servisi lazım",
          "oto fren servisi lazım",
          "araç fren servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-suspension-service",
    name: "Araç Süspansiyon Servisi",
    keywords: [
      "araç süspansiyon servisi",
      "oto süspansiyon servisi",
      "araç süspansiyon tamiri",
      "oto süspansiyon tamiri",
      "araç süspansiyon servisi işi",
      "oto süspansiyon servisi işi",
      "araç süspansiyon servisi lazım",
      "oto süspansiyon servisi lazım",
    ],
    subServices: [
      {
        id: "car-suspension-repair",
        name: "Araç süspansiyon tamiri",
        keywords: [
          "araç süspansiyon tamiri",
          "oto süspansiyon tamiri",
          "araç süspansiyon onarımı",
          "oto süspansiyon onarımı",
          "araç süspansiyon tamir",
          "oto süspansiyon tamir",
          "araç süspansiyon tamiri lazım",
        ],
      },
      {
        id: "other-car-suspension-service",
        name: "Diğer (araç süspansiyon servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç süspansiyon servisi",
          "oto süspansiyon servisi",
          "araç süspansiyon tamiri",
          "oto süspansiyon tamiri",
          "araç süspansiyon servisi işi",
          "oto süspansiyon servisi işi",
          "araç süspansiyon servisi lazım",
          "oto süspansiyon servisi lazım",
          "araç süspansiyon servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-exhaust-service",
    name: "Araç Egzoz Servisi",
    keywords: [
      "araç egzoz servisi",
      "oto egzoz servisi",
      "araç egzoz tamiri",
      "oto egzoz tamiri",
      "araç egzoz servisi işi",
      "oto egzoz servisi işi",
      "araç egzoz servisi lazım",
      "oto egzoz servisi lazım",
    ],
    subServices: [
      {
        id: "car-exhaust-repair",
        name: "Araç egzoz tamiri",
        keywords: [
          "araç egzoz tamiri",
          "oto egzoz tamiri",
          "araç egzoz onarımı",
          "oto egzoz onarımı",
          "araç egzoz tamir",
          "oto egzoz tamir",
          "araç egzoz tamiri lazım",
        ],
      },
      {
        id: "car-exhaust-replacement",
        name: "Araç egzoz değişimi",
        keywords: [
          "araç egzoz değişimi",
          "oto egzoz değişimi",
          "araç egzoz değiştirme",
          "oto egzoz değiştirme",
          "araç egzoz değişimi işi",
          "oto egzoz değişimi işi",
          "araç egzoz değişimi lazım",
        ],
      },
      {
        id: "other-car-exhaust-service",
        name: "Diğer (araç egzoz servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç egzoz servisi",
          "oto egzoz servisi",
          "araç egzoz tamiri",
          "oto egzoz tamiri",
          "araç egzoz servisi işi",
          "oto egzoz servisi işi",
          "araç egzoz servisi lazım",
          "oto egzoz servisi lazım",
          "araç egzoz servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-engine-service",
    name: "Araç Motor Servisi",
    keywords: [
      "araç motor servisi",
      "oto motor servisi",
      "araç motor tamiri",
      "oto motor tamiri",
      "araç motor servisi işi",
      "oto motor servisi işi",
      "araç motor servisi lazım",
      "oto motor servisi lazım",
    ],
    subServices: [
      {
        id: "car-engine-repair",
        name: "Araç motor tamiri",
        keywords: [
          "araç motor tamiri",
          "oto motor tamiri",
          "araç motor onarımı",
          "oto motor onarımı",
          "araç motor tamir",
          "oto motor tamir",
          "araç motor tamiri lazım",
        ],
      },
      {
        id: "car-engine-rebuild",
        name: "Araç motor revizyonu",
        keywords: [
          "araç motor revizyonu",
          "oto motor revizyonu",
          "araç motor revizyon",
          "oto motor revizyon",
          "araç motor revizyonu işi",
          "oto motor revizyonu işi",
          "araç motor revizyonu lazım",
        ],
      },
      {
        id: "other-car-engine-service",
        name: "Diğer (araç motor servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç motor servisi",
          "oto motor servisi",
          "araç motor tamiri",
          "oto motor tamiri",
          "araç motor servisi işi",
          "oto motor servisi işi",
          "araç motor servisi lazım",
          "oto motor servisi lazım",
          "araç motor servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-transmission-service",
    name: "Araç Şanzıman Servisi",
    keywords: [
      "araç şanzıman servisi",
      "oto şanzıman servisi",
      "araç şanzıman tamiri",
      "oto şanzıman tamiri",
      "araç şanzıman servisi işi",
      "oto şanzıman servisi işi",
      "araç şanzıman servisi lazım",
      "oto şanzıman servisi lazım",
    ],
    subServices: [
      {
        id: "car-transmission-repair",
        name: "Araç şanzıman tamiri",
        keywords: [
          "araç şanzıman tamiri",
          "oto şanzıman tamiri",
          "araç şanzıman onarımı",
          "oto şanzıman onarımı",
          "araç şanzıman tamir",
          "oto şanzıman tamir",
          "araç şanzıman tamiri lazım",
        ],
      },
      {
        id: "other-car-transmission-service",
        name: "Diğer (araç şanzıman servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç şanzıman servisi",
          "oto şanzıman servisi",
          "araç şanzıman tamiri",
          "oto şanzıman tamiri",
          "araç şanzıman servisi işi",
          "oto şanzıman servisi işi",
          "araç şanzıman servisi lazım",
          "oto şanzıman servisi lazım",
          "araç şanzıman servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-clutch-service",
    name: "Araç Debriyaj Servisi",
    keywords: [
      "araç debriyaj servisi",
      "oto debriyaj servisi",
      "araç debriyaj tamiri",
      "oto debriyaj tamiri",
      "araç debriyaj servisi işi",
      "oto debriyaj servisi işi",
      "araç debriyaj servisi lazım",
      "oto debriyaj servisi lazım",
    ],
    subServices: [
      {
        id: "car-clutch-repair",
        name: "Araç debriyaj tamiri",
        keywords: [
          "araç debriyaj tamiri",
          "oto debriyaj tamiri",
          "araç debriyaj onarımı",
          "oto debriyaj onarımı",
          "araç debriyaj tamir",
          "oto debriyaj tamir",
          "araç debriyaj tamiri lazım",
        ],
      },
      {
        id: "car-clutch-replacement",
        name: "Araç debriyaj değişimi",
        keywords: [
          "araç debriyaj değişimi",
          "oto debriyaj değişimi",
          "araç debriyaj değiştirme",
          "oto debriyaj değiştirme",
          "araç debriyaj değişimi işi",
          "oto debriyaj değişimi işi",
          "araç debriyaj değişimi lazım",
        ],
      },
      {
        id: "other-car-clutch-service",
        name: "Diğer (araç debriyaj servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç debriyaj servisi",
          "oto debriyaj servisi",
          "araç debriyaj tamiri",
          "oto debriyaj tamiri",
          "araç debriyaj servisi işi",
          "oto debriyaj servisi işi",
          "araç debriyaj servisi lazım",
          "oto debriyaj servisi lazım",
          "araç debriyaj servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-electric-service",
    name: "Araç Elektrik Servisi",
    keywords: [
      "araç elektrik servisi",
      "oto elektrik servisi",
      "araç elektrik tamiri",
      "oto elektrik tamiri",
      "araç elektrik servisi işi",
      "oto elektrik servisi işi",
      "araç elektrik servisi lazım",
      "oto elektrik servisi lazım",
    ],
    subServices: [
      {
        id: "car-electric-repair",
        name: "Araç elektrik tamiri",
        keywords: [
          "araç elektrik tamiri",
          "oto elektrik tamiri",
          "araç elektrik onarımı",
          "oto elektrik onarımı",
          "araç elektrik tamir",
          "oto elektrik tamir",
          "araç elektrik tamiri lazım",
        ],
      },
      {
        id: "car-electric-installation",
        name: "Araç elektrik montajı",
        keywords: [
          "araç elektrik montajı",
          "oto elektrik montajı",
          "araç elektrik kurulumu",
          "oto elektrik kurulumu",
          "araç elektrik montajı işi",
          "oto elektrik montajı işi",
          "araç elektrik montajı lazım",
        ],
      },
      {
        id: "other-car-electric-service",
        name: "Diğer (araç elektrik servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç elektrik servisi",
          "oto elektrik servisi",
          "araç elektrik tamiri",
          "oto elektrik tamiri",
          "araç elektrik servisi işi",
          "oto elektrik servisi işi",
          "araç elektrik servisi lazım",
          "oto elektrik servisi lazım",
          "araç elektrik servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-radiator-service",
    name: "Araç Radyatör Servisi",
    keywords: [
      "araç radyatör servisi",
      "oto radyatör servisi",
      "araç radyatör tamiri",
      "oto radyatör tamiri",
      "araç radyatör servisi işi",
      "oto radyatör servisi işi",
      "araç radyatör servisi lazım",
      "oto radyatör servisi lazım",
    ],
    subServices: [
      {
        id: "car-radiator-repair",
        name: "Araç radyatör tamiri",
        keywords: [
          "araç radyatör tamiri",
          "oto radyatör tamiri",
          "araç radyatör onarımı",
          "oto radyatör onarımı",
          "araç radyatör tamir",
          "oto radyatör tamir",
          "araç radyatör tamiri lazım",
        ],
      },
      {
        id: "car-radiator-cleaning",
        name: "Araç radyatör temizliği",
        keywords: [
          "araç radyatör temizliği",
          "oto radyatör temizliği",
          "araç radyatör temizleme",
          "oto radyatör temizleme",
          "araç radyatör temizliği işi",
          "oto radyatör temizliği işi",
          "araç radyatör temizliği lazım",
        ],
      },
      {
        id: "other-car-radiator-service",
        name: "Diğer (araç radyatör servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç radyatör servisi",
          "oto radyatör servisi",
          "araç radyatör tamiri",
          "oto radyatör tamiri",
          "araç radyatör servisi işi",
          "oto radyatör servisi işi",
          "araç radyatör servisi lazım",
          "oto radyatör servisi lazım",
          "araç radyatör servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-light-service",
    name: "Araç Far Servisi",
    keywords: [
      "araç far servisi",
      "oto far servisi",
      "araç far tamiri",
      "oto far tamiri",
      "araç far servisi işi",
      "oto far servisi işi",
      "araç far servisi lazım",
      "oto far servisi lazım",
    ],
    subServices: [
      {
        id: "car-light-repair",
        name: "Araç far tamiri",
        keywords: [
          "araç far tamiri",
          "oto far tamiri",
          "araç far onarımı",
          "oto far onarımı",
          "araç far tamir",
          "oto far tamir",
          "araç far tamiri lazım",
        ],
      },
      {
        id: "car-light-replacement",
        name: "Araç far değişimi",
        keywords: [
          "araç far değişimi",
          "oto far değişimi",
          "araç far değiştirme",
          "oto far değiştirme",
          "araç far değişimi işi",
          "oto far değişimi işi",
          "araç far değişimi lazım",
        ],
      },
      {
        id: "other-car-light-service",
        name: "Diğer (araç far servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç far servisi",
          "oto far servisi",
          "araç far tamiri",
          "oto far tamiri",
          "araç far servisi işi",
          "oto far servisi işi",
          "araç far servisi lazım",
          "oto far servisi lazım",
          "araç far servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-mirror-service",
    name: "Araç Ayna Servisi",
    keywords: [
      "araç ayna servisi",
      "oto ayna servisi",
      "araç ayna tamiri",
      "oto ayna tamiri",
      "araç ayna servisi işi",
      "oto ayna servisi işi",
      "araç ayna servisi lazım",
      "oto ayna servisi lazım",
    ],
    subServices: [
      {
        id: "car-mirror-repair",
        name: "Araç ayna tamiri",
        keywords: [
          "araç ayna tamiri",
          "oto ayna tamiri",
          "araç ayna onarımı",
          "oto ayna onarımı",
          "araç ayna tamir",
          "oto ayna tamir",
          "araç ayna tamiri lazım",
        ],
      },
      {
        id: "car-mirror-replacement",
        name: "Araç ayna değişimi",
        keywords: [
          "araç ayna değişimi",
          "oto ayna değişimi",
          "araç ayna değiştirme",
          "oto ayna değiştirme",
          "araç ayna değişimi işi",
          "oto ayna değişimi işi",
          "araç ayna değişimi lazım",
        ],
      },
      {
        id: "other-car-mirror-service",
        name: "Diğer (araç ayna servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç ayna servisi",
          "oto ayna servisi",
          "araç ayna tamiri",
          "oto ayna tamiri",
          "araç ayna servisi işi",
          "oto ayna servisi işi",
          "araç ayna servisi lazım",
          "oto ayna servisi lazım",
          "araç ayna servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-wiper-service",
    name: "Araç Silecek Servisi",
    keywords: [
      "araç silecek servisi",
      "oto silecek servisi",
      "araç silecek tamiri",
      "oto silecek tamiri",
      "araç silecek servisi işi",
      "oto silecek servisi işi",
      "araç silecek servisi lazım",
      "oto silecek servisi lazım",
    ],
    subServices: [
      {
        id: "car-wiper-replacement",
        name: "Araç silecek değişimi",
        keywords: [
          "araç silecek değişimi",
          "oto silecek değişimi",
          "araç silecek değiştirme",
          "oto silecek değiştirme",
          "araç silecek değişimi işi",
          "oto silecek değişimi işi",
          "araç silecek değişimi lazım",
        ],
      },
      {
        id: "other-car-wiper-service",
        name: "Diğer (araç silecek servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç silecek servisi",
          "oto silecek servisi",
          "araç silecek tamiri",
          "oto silecek tamiri",
          "araç silecek servisi işi",
          "oto silecek servisi işi",
          "araç silecek servisi lazım",
          "oto silecek servisi lazım",
          "araç silecek servisi hizmeti",
        ],
      },
    ],
  },

  {
    id: "car-key-service",
    name: "Araç Anahtar Servisi",
    keywords: [
      "araç anahtar servisi",
      "oto anahtar servisi",
      "araç anahtar yapımı",
      "oto anahtar yapımı",
      "araç anahtar servisi işi",
      "oto anahtar servisi işi",
      "araç anahtar servisi lazım",
      "oto anahtar servisi lazım",
    ],
    subServices: [
      {
        id: "car-key-duplication",
        name: "Araç anahtar kopyalama",
        keywords: [
          "araç anahtar kopyalama",
          "oto anahtar kopyalama",
          "araç anahtar çoğaltma",
          "oto anahtar çoğaltma",
          "araç anahtar kopyalama işi",
          "oto anahtar kopyalama işi",
          "araç anahtar kopyalama lazım",
        ],
      },
      {
        id: "car-key-programming",
        name: "Araç anahtar programlama",
        keywords: [
          "araç anahtar programlama",
          "oto anahtar programlama",
          "araç anahtar kodlama",
          "oto anahtar kodlama",
          "araç anahtar programlama işi",
          "oto anahtar programlama işi",
          "araç anahtar programlama lazım",
        ],
      },
      {
        id: "other-car-key-service",
        name: "Diğer (araç anahtar servisi ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "araç anahtar servisi",
          "oto anahtar servisi",
          "araç anahtar yapımı",
          "oto anahtar yapımı",
          "araç anahtar servisi işi",
          "oto anahtar servisi işi",
          "araç anahtar servisi lazım",
          "oto anahtar servisi lazım",
          "araç anahtar servisi hizmeti",
        ],
      },
    ],
  },

  // ============================================
  // SGK VE RESMİ KAYNAKLARA GÖRE EKLENEN KATEGORİLER
  // ============================================

  {
    id: "tailoring-sewing",
    name: "Terzilik ve Dikiş",
    keywords: [
      "terzi",
      "dikiş",
      "terzilik",
      "elbise dikimi",
      "kıyafet tamiri",
      "dikiş tamiri",
      "terzi lazım",
      "dikiş makinesi",
      "kıyafet diktirme",
      "elbise diktirme",
      "kıyafet değiştirme",
      "terzi hizmeti",
      "dikiş hizmeti",
      "kıyafet ölçüsü",
      "prova",
    ],
    subServices: [
      {
        id: "clothing-sewing",
        name: "Elbise / kıyafet dikimi",
        keywords: [
          "elbise dikimi",
          "kıyafet dikimi",
          "gömlek dikimi",
          "pantolon dikimi",
          "etek dikimi",
          "ceket dikimi",
          "takım elbise dikimi",
          "kıyafet diktirme",
          "elbise diktirme",
          "özel dikim",
          "ölçüye göre dikim",
        ],
      },
      {
        id: "clothing-repair",
        name: "Kıyafet tamiri",
        keywords: [
          "kıyafet tamiri",
          "elbise tamiri",
          "pantolon tamiri",
          "ceket tamiri",
          "fermuar tamiri",
          "düğme dikme",
          "yırtık tamiri",
          "kıyafet onarımı",
          "elbise onarımı",
          "kıyafet düzeltme",
        ],
      },
      {
        id: "alteration",
        name: "Kıyafet değiştirme / daraltma",
        keywords: [
          "kıyafet daraltma",
          "kıyafet genişletme",
          "pantolon daraltma",
          "elbise daraltma",
          "kıyafet kısaltma",
          "kıyafet uzatma",
          "kıyafet değiştirme",
          "ölçü alma",
          "prova",
        ],
      },
      {
        id: "sewing-machine-repair",
        name: "Dikiş makinesi tamiri",
        keywords: [
          "dikiş makinesi tamiri",
          "dikiş makinesi onarımı",
          "dikiş makinesi bakımı",
          "dikiş makinesi ayarı",
          "dikiş makinesi tamir",
        ],
      },
      {
        id: "other-tailoring",
        name: "Diğer (terzilik ve dikiş ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "terzi",
          "dikiş",
          "terzilik",
          "terzi hizmeti",
          "dikiş hizmeti",
        ],
      },
    ],
  },

  {
    id: "leather-shoe-repair",
    name: "Deri İşleri ve Ayakkabı Tamiri",
    keywords: [
      "ayakkabı tamiri",
      "ayakkabı tamirci",
      "kundura tamiri",
      "deri tamiri",
      "çanta tamiri",
      "cüzdan tamiri",
      "ayakkabı boyama",
      "ayakkabı bakımı",
      "deri işleri",
      "ayakkabı tamirci lazım",
      "kundura tamirci",
      "ayakkabı onarımı",
      "deri onarımı",
    ],
    subServices: [
      {
        id: "shoe-repair",
        name: "Ayakkabı tamiri",
        keywords: [
          "ayakkabı tamiri",
          "ayakkabı onarımı",
          "ayakkabı düzeltme",
          "ayakkabı taban değişimi",
          "ayakkabı topuk değişimi",
          "ayakkabı fermuar tamiri",
          "ayakkabı bağcık",
          "kundura tamiri",
        ],
      },
      {
        id: "shoe-polishing",
        name: "Ayakkabı boyama / cilalama",
        keywords: [
          "ayakkabı boyama",
          "ayakkabı cilalama",
          "ayakkabı bakımı",
          "ayakkabı temizleme",
          "ayakkabı parlatma",
        ],
      },
      {
        id: "leather-repair",
        name: "Deri ürün tamiri",
        keywords: [
          "deri tamiri",
          "çanta tamiri",
          "cüzdan tamiri",
          "deri onarımı",
          "deri dikişi",
          "deri yapıştırma",
        ],
      },
      {
        id: "other-leather",
        name: "Diğer (deri işleri ve ayakkabı tamiri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "ayakkabı tamiri",
          "deri tamiri",
          "ayakkabı tamirci",
          "deri işleri",
        ],
      },
    ],
  },

  {
    id: "translation-interpreting",
    name: "Çeviri ve Tercümanlık",
    keywords: [
      "çeviri",
      "tercüman",
      "tercümanlık",
      "çevirmen",
      "dil çevirisi",
      "belge çevirisi",
      "sözlü çeviri",
      "yazılı çeviri",
      "simultane çeviri",
      "çeviri hizmeti",
      "tercüman lazım",
      "çevirmen lazım",
      "noter çevirisi",
      "yeminli çevirmen",
    ],
    subServices: [
      {
        id: "document-translation",
        name: "Belge çevirisi",
        keywords: [
          "belge çevirisi",
          "evrak çevirisi",
          "noter çevirisi",
          "yeminli çeviri",
          "resmi belge çevirisi",
          "diploma çevirisi",
          "pasaport çevirisi",
        ],
      },
      {
        id: "interpreting",
        name: "Tercümanlık (sözlü çeviri)",
        keywords: [
          "tercüman",
          "sözlü çeviri",
          "simultane çeviri",
          "ardıl çeviri",
          "toplantı tercümanı",
          "konferans tercümanı",
          "iş görüşmesi tercümanı",
        ],
      },
      {
        id: "other-translation",
        name: "Diğer (çeviri ve tercümanlık ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "çeviri",
          "tercüman",
          "çevirmen",
          "çeviri hizmeti",
        ],
      },
    ],
  },

  {
    id: "content-writing-editing",
    name: "İçerik Yazarlığı ve Editörlük",
    keywords: [
      "içerik yazarlığı",
      "editör",
      "yazarlık",
      "metin yazarlığı",
      "blog yazarlığı",
      "web içerik",
      "redaksiyon",
      "düzeltme",
      "metin düzenleme",
      "içerik editörü",
      "yazar lazım",
      "editör lazım",
      "metin yazma",
      "içerik hazırlama",
    ],
    subServices: [
      {
        id: "content-writing",
        name: "İçerik yazarlığı",
        keywords: [
          "içerik yazarlığı",
          "metin yazarlığı",
          "blog yazarlığı",
          "web içerik",
          "makale yazma",
          "içerik hazırlama",
          "metin yazma",
        ],
      },
      {
        id: "editing-proofreading",
        name: "Editörlük ve redaksiyon",
        keywords: [
          "editörlük",
          "redaksiyon",
          "metin düzenleme",
          "düzeltme",
          "imla kontrolü",
          "dil kontrolü",
          "metin gözden geçirme",
        ],
      },
      {
        id: "other-content",
        name: "Diğer (içerik yazarlığı ve editörlük ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "içerik yazarlığı",
          "editörlük",
          "yazarlık",
          "içerik hizmeti",
        ],
      },
    ],
  },

  {
    id: "accounting-tax-consulting",
    name: "Muhasebe ve Vergi Danışmanlığı",
    keywords: [
      "muhasebe",
      "muhasebeci",
      "vergi danışmanı",
      "mali müşavir",
      "muhasebe hizmeti",
      "vergi danışmanlığı",
      "beyanname",
      "fatura düzenleme",
      "muhasebe kaydı",
      "mali danışmanlık",
      "muhasebeci lazım",
      "mali müşavir lazım",
      "vergi danışmanı lazım",
      "muhasebe desteği",
    ],
    subServices: [
      {
        id: "accounting-services",
        name: "Muhasebe hizmetleri",
        keywords: [
          "muhasebe",
          "muhasebe kaydı",
          "fatura düzenleme",
          "defter tutma",
          "muhasebe kayıtları",
          "muhasebe raporu",
          "mali kayıt",
        ],
      },
      {
        id: "tax-consulting",
        name: "Vergi danışmanlığı",
        keywords: [
          "vergi danışmanlığı",
          "beyanname",
          "vergi beyannamesi",
          "vergi danışmanı",
          "mali müşavir",
          "vergi planlaması",
        ],
      },
      {
        id: "other-accounting",
        name: "Diğer (muhasebe ve vergi danışmanlığı ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "muhasebe",
          "muhasebeci",
          "vergi danışmanlığı",
          "mali müşavir",
        ],
      },
    ],
  },

  {
    id: "health-services",
    name: "Sağlık Hizmetleri",
    keywords: [
      "hemşire",
      "hemşirelik",
      "fizyoterapi",
      "fizyoterapist",
      "masaj",
      "masaj terapisi",
      "diyet danışmanı",
      "sağlık danışmanlığı",
      "evde bakım",
      "hasta bakımı",
      "hemşire lazım",
      "fizyoterapist lazım",
      "masaj terapisti",
      "sağlık hizmeti",
    ],
    subServices: [
      {
        id: "nursing-care",
        name: "Hemşirelik hizmetleri",
        keywords: [
          "hemşire",
          "hemşirelik",
          "evde bakım",
          "hasta bakımı",
          "sağlık bakımı",
          "hemşire hizmeti",
          "evde hemşire",
        ],
      },
      {
        id: "physiotherapy",
        name: "Fizyoterapi",
        keywords: [
          "fizyoterapi",
          "fizyoterapist",
          "fizik tedavi",
          "rehabilitasyon",
          "egzersiz terapisi",
          "masaj terapisi",
        ],
      },
      {
        id: "massage-therapy",
        name: "Masaj terapisi",
        keywords: [
          "masaj",
          "masaj terapisi",
          "masaj terapisti",
          "spor masajı",
          "relaks masajı",
          "terapötik masaj",
        ],
      },
      {
        id: "diet-consulting",
        name: "Diyet danışmanlığı",
        keywords: [
          "diyet danışmanı",
          "beslenme danışmanı",
          "diyet programı",
          "beslenme programı",
          "kilo verme danışmanlığı",
        ],
      },
      {
        id: "other-health",
        name: "Diğer (sağlık hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "sağlık hizmeti",
          "hemşire",
          "fizyoterapi",
          "masaj",
        ],
      },
    ],
  },

  {
    id: "entertainment-services",
    name: "Eğlence Hizmetleri",
    keywords: [
      "dj",
      "müzik",
      "müzik grubu",
      "animasyon",
      "etkinlik organizasyonu",
      "düğün müziği",
      "parti müziği",
      "canlı müzik",
      "dj hizmeti",
      "müzik grubu lazım",
      "animasyon lazım",
      "eğlence hizmeti",
      "düğün organizasyonu",
      "parti organizasyonu",
    ],
    subServices: [
      {
        id: "dj-services",
        name: "DJ hizmetleri",
        keywords: [
          "dj",
          "dj hizmeti",
          "düğün dj",
          "parti dj",
          "müzik çalma",
          "ses sistemi",
        ],
      },
      {
        id: "live-music",
        name: "Canlı müzik",
        keywords: [
          "canlı müzik",
          "müzik grubu",
          "orkestra",
          "düğün müziği",
          "parti müziği",
          "canlı performans",
        ],
      },
      {
        id: "animation-services",
        name: "Animasyon hizmetleri",
        keywords: [
          "animasyon",
          "çocuk animasyonu",
          "etkinlik animasyonu",
          "oyun organizasyonu",
          "eğlence organizasyonu",
        ],
      },
      {
        id: "other-entertainment",
        name: "Diğer (eğlence hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "eğlence hizmeti",
          "dj",
          "müzik",
          "animasyon",
        ],
      },
    ],
  },

  {
    id: "courier-packing",
    name: "Kurye ve Paketleme Hizmetleri",
    keywords: [
      "kurye",
      "kurye hizmeti",
      "teslimat",
      "paketleme",
      "ambalajlama",
      "kargo paketleme",
      "kurye lazım",
      "teslimat hizmeti",
      "paket taşıma",
      "evrak teslimat",
      "yemek teslimat",
      "hızlı teslimat",
      "acil teslimat",
    ],
    subServices: [
      {
        id: "courier-service",
        name: "Kurye hizmetleri",
        keywords: [
          "kurye",
          "kurye hizmeti",
          "teslimat",
          "paket teslimat",
          "evrak teslimat",
          "yemek teslimat",
          "hızlı teslimat",
          "acil teslimat",
        ],
      },
      {
        id: "packaging-service",
        name: "Paketleme ve ambalajlama",
        keywords: [
          "paketleme",
          "ambalajlama",
          "kargo paketleme",
          "koli paketleme",
          "eşya paketleme",
          "hediye paketleme",
        ],
      },
      {
        id: "other-courier",
        name: "Diğer (kurye ve paketleme hizmetleri ile ilgili, listede yok)",
        isOther: true,
        keywords: [
          "kurye",
          "kurye hizmeti",
          "paketleme",
          "teslimat",
        ],
      },
    ],
  },

  // Toplam 357 kategori (7 yeni kategori eklendi)
  // SGK ve resmi kaynaklara göre platform için uygun kategoriler eklendi.
];
