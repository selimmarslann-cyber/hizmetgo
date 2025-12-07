export interface Vendor {
  id: number;
  name: string;
  category: string;
  rating: number;
  priceRange: string;
  lat: number;
  lng: number;
  image: string;
  description?: string;
  reviewCount?: number;
}

export const mockVendors: Vendor[] = [
  {
    id: 1,
    name: "Usta Mehmet Elektrik",
    category: "Elektrikçi",
    rating: 4.7,
    priceRange: "500 - 2500",
    lat: 40.978,
    lng: 27.511,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    description: "20 yıllık tecrübe ile elektrik işlerinizde yanınızdayım.",
    reviewCount: 127,
  },
  {
    id: 2,
    name: "Tesisatçı Ali",
    category: "Su Tesisatçısı",
    rating: 4.5,
    priceRange: "300 - 1800",
    lat: 40.98,
    lng: 27.514,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
    description: "Acil tesisat arızaları için 7/24 hizmet.",
    reviewCount: 89,
  },
  {
    id: 3,
    name: "Boya Ustası Hasan",
    category: "Boya Badana",
    rating: 4.8,
    priceRange: "2000 - 8000",
    lat: 40.975,
    lng: 27.508,
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
    description: "İç ve dış cephe boyama hizmetleri.",
    reviewCount: 156,
  },
  {
    id: 4,
    name: "Temizlik Hizmetleri Ayşe",
    category: "Temizlik",
    rating: 4.9,
    priceRange: "400 - 1200",
    lat: 40.982,
    lng: 27.515,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    description: "Ev ve ofis temizliği, derinlemesine temizlik.",
    reviewCount: 203,
  },
  {
    id: 5,
    name: "Marangoz İsmail",
    category: "Marangoz",
    rating: 4.6,
    priceRange: "1500 - 5000",
    lat: 40.977,
    lng: 27.512,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
    description: "Mobilya yapımı ve tamiri.",
    reviewCount: 94,
  },
  {
    id: 6,
    name: "Nakliyat Hızlı Taşıma",
    category: "Nakliyat",
    rating: 4.4,
    priceRange: "800 - 3000",
    lat: 40.979,
    lng: 27.509,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    description: "Evden eve nakliyat, parça eşya taşıma.",
    reviewCount: 67,
  },
  {
    id: 7,
    name: "Kuaför Güzellik Salonu",
    category: "Kuaför",
    rating: 4.7,
    priceRange: "200 - 800",
    lat: 40.981,
    lng: 27.513,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    description: "Saç kesimi, boyama, makyaj hizmetleri.",
    reviewCount: 178,
  },
  {
    id: 8,
    name: "Bahçıvan Mustafa",
    category: "Bahçıvan",
    rating: 4.5,
    priceRange: "500 - 2000",
    lat: 40.976,
    lng: 27.51,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "Bahçe bakımı, ağaç budama, peyzaj.",
    reviewCount: 45,
  },
  {
    id: 9,
    name: "Fotoğrafçı Zeynep",
    category: "Fotoğrafçı",
    rating: 4.8,
    priceRange: "1000 - 5000",
    lat: 40.983,
    lng: 27.516,
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
    description: "Düğün, nişan, özel gün fotoğrafçılığı.",
    reviewCount: 112,
  },
  {
    id: 10,
    name: "Özel Ders Merkezi",
    category: "Özel Ders",
    rating: 4.9,
    priceRange: "300 - 1000",
    lat: 40.978,
    lng: 27.507,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    description: "Matematik, fizik, kimya özel ders.",
    reviewCount: 234,
  },
  {
    id: 11,
    name: "Pet Bakım Servisi",
    category: "Evcil Hayvan Bakımı",
    rating: 4.6,
    priceRange: "200 - 600",
    lat: 40.98,
    lng: 27.511,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
    description: "Köpek gezdirme, bakıcılık hizmetleri.",
    reviewCount: 89,
  },
  {
    id: 12,
    name: "Lezzet Catering",
    category: "Yemek & Catering",
    rating: 4.7,
    priceRange: "500 - 2500",
    lat: 40.984,
    lng: 27.517,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
    description: "Özel günler için catering hizmeti.",
    reviewCount: 145,
  },
  {
    id: 13,
    name: "Terzi Fatma",
    category: "Giyim & Dikiş",
    rating: 4.5,
    priceRange: "100 - 500",
    lat: 40.977,
    lng: 27.509,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    description: "Dikiş, tamir, özel dikim işleri.",
    reviewCount: 78,
  },
  {
    id: 14,
    name: "Fitness Koçu Emre",
    category: "Spor & Fitness",
    rating: 4.8,
    priceRange: "400 - 1200",
    lat: 40.981,
    lng: 27.514,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    description: "Kişisel antrenör, fitness danışmanlığı.",
    reviewCount: 167,
  },
  {
    id: 15,
    name: "Klima Servisi Teknik",
    category: "Elektrikçi",
    rating: 4.4,
    priceRange: "600 - 2000",
    lat: 40.979,
    lng: 27.512,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    description: "Klima montaj, bakım, tamir.",
    reviewCount: 56,
  },
];

export default mockVendors;
