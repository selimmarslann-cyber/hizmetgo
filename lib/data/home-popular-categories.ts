import { HomePopularCategory } from "@/types/home-popular-category";

// Resim versiyonu - resim değiştiğinde bu numarayı artır (cache bypass için)
const IMAGE_VERSION = "22";

// Her kategori için 1 benzersiz resim - Pexels kaynaklı, yüksek kaliteli görseller
// Hiçbir kategori birbirinin resmini kullanmaz
// ✅ OKEY: ev-temizligi, bahcivan, marangoz, cilingir, su-tesisati, elektrik, boya-badana, nakliyat, beyaz-esya, klima, hali-temizligi, cati, cam-balkon, guvenlik, fotografci
const categoryImages: Record<string, string> = {
  "ev-temizligi":
    "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=1000", // ✅ OKEY
  elektrik:
    "https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&w=1000",
  "su-tesisati":
    "https://images.pexels.com/photos/8793484/pexels-photo-8793484.jpeg?auto=compress&cs=tinysrgb&w=1000",
  "boya-badana":
    "https://images.pexels.com/photos/7509752/pexels-photo-7509752.jpeg?auto=compress&cs=tinysrgb&w=1000",
  cilingir:
    "https://images.pexels.com/photos/115642/pexels-photo-115642.jpeg?auto=compress&cs=tinysrgb&w=1000",
  nakliyat:
    "https://images.pexels.com/photos/4569338/pexels-photo-4569338.jpeg?auto=compress&cs=tinysrgb&w=1000",
  "beyaz-esya":
    "https://images.pexels.com/photos/4700388/pexels-photo-4700388.jpeg?auto=compress&cs=tinysrgb&w=1000",
  klima:
    "https://images.pexels.com/photos/7347538/pexels-photo-7347538.jpeg?auto=compress&cs=tinysrgb&w=1000",
  marangoz:
    "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1000",
  "hali-temizligi":
    "https://images.pexels.com/photos/4700387/pexels-photo-4700387.jpeg?auto=compress&cs=tinysrgb&w=1000",
  cati: "https://images.pexels.com/photos/8853534/pexels-photo-8853534.jpeg?auto=compress&cs=tinysrgb&w=1000",
  bahcivan:
    "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1000", // ✅ OKEY
  "cam-balkon":
    "https://images.pexels.com/photos/34929038/pexels-photo-34929038.jpeg?auto=compress&cs=tinysrgb&w=1000",
  guvenlik:
    "https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=1000",
  fotografci:
    "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1000",
};

// URL'e version ekle (cache bypass için)
const addVersionToUrl = (url: string): string => {
  if (!url) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${IMAGE_VERSION}`;
};

export const HOME_POPULAR_CATEGORIES: HomePopularCategory[] = [
  {
    id: "ev-temizligi",
    title: "Ev Temizliği",
    slug: "ev-temizligi",
    imageSrc: addVersionToUrl(categoryImages["ev-temizligi"]),
    href: "/request?categoryId=cleaning",
  },
  {
    id: "elektrik",
    title: "Elektrik",
    slug: "elektrik",
    imageSrc: addVersionToUrl(categoryImages["elektrik"]),
    href: "/request?categoryId=electricity",
  },
  {
    id: "su-tesisati",
    title: "Su Tesisatı",
    slug: "su-tesisati",
    imageSrc: addVersionToUrl(categoryImages["su-tesisati"]),
    href: "/request?categoryId=plumbing",
  },
  {
    id: "boya-badana",
    title: "Boya Badana",
    slug: "boya-badana",
    imageSrc: addVersionToUrl(categoryImages["boya-badana"]),
    href: "/request?categoryId=painting",
  },
  {
    id: "cilingir",
    title: "Çilingir",
    slug: "cilingir",
    imageSrc: addVersionToUrl(categoryImages["cilingir"]),
    href: "/request?categoryId=locksmith",
  },
  {
    id: "nakliyat",
    title: "Nakliyat",
    slug: "nakliyat",
    imageSrc: addVersionToUrl(categoryImages["nakliyat"]),
    href: "/request?categoryId=moving",
  },
  {
    id: "beyaz-esya",
    title: "Beyaz Eşya",
    slug: "beyaz-esya",
    imageSrc: addVersionToUrl(categoryImages["beyaz-esya"]),
    href: "/request?categoryId=appliance-repair",
  },
  {
    id: "klima",
    title: "Klima",
    slug: "klima",
    imageSrc: addVersionToUrl(categoryImages["klima"]),
    href: "/request?categoryId=air-conditioner",
  },
  {
    id: "marangoz",
    title: "Marangoz",
    slug: "marangoz",
    imageSrc: addVersionToUrl(categoryImages["marangoz"]),
    href: "/request?categoryId=carpenter",
  },
  {
    id: "hali-temizligi",
    title: "Halı Yıkama",
    slug: "hali-temizligi",
    imageSrc: addVersionToUrl(categoryImages["hali-temizligi"]),
    href: "/request?categoryId=carpet-cleaning",
  },
  {
    id: "cati",
    title: "Çatı",
    slug: "cati",
    imageSrc: addVersionToUrl(categoryImages["cati"]),
    href: "/request?categoryId=roofing",
  },
  {
    id: "bahcivan",
    title: "Bahçıvan",
    slug: "bahcivan",
    imageSrc: addVersionToUrl(categoryImages["bahcivan"]),
    href: "/request?categoryId=gardening",
  },
  {
    id: "cam-balkon",
    title: "Cam Balkon",
    slug: "cam-balkon",
    imageSrc: addVersionToUrl(categoryImages["cam-balkon"]),
    href: "/request?categoryId=glass-balcony",
  },
  {
    id: "guvenlik",
    title: "Güvenlik",
    slug: "guvenlik",
    imageSrc: addVersionToUrl(categoryImages["guvenlik"]),
    href: "/request?categoryId=security",
  },
  {
    id: "fotografci",
    title: "Fotoğrafçı",
    slug: "fotografci",
    imageSrc: addVersionToUrl(categoryImages["fotografci"]),
    href: "/request?categoryId=photographer",
  },
];
