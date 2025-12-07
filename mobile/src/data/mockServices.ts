export interface Service {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  category?: string;
}

export const mockServices: Service[] = [
  {
    id: 1,
    title: "2+1 Komple Boya",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
    description: "2+1 daire komple boya işi",
    rating: 4.8,
    category: "Boya Badana",
  },
  {
    id: 2,
    title: "Acil Elektrik Arızası",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    description: "Acil elektrik arıza tamiri",
    rating: 4.7,
    category: "Elektrikçi",
  },
  {
    id: 3,
    title: "Ev Temizliği (3+1)",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    description: "Derinlemesine ev temizliği",
    rating: 4.9,
    category: "Temizlik",
  },
  {
    id: 4,
    title: "Su Tesisatı Tamiri",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
    description: "Musluk, tesisat tamiri",
    rating: 4.5,
    category: "Su Tesisatçısı",
  },
  {
    id: 5,
    title: "Mobilya Montajı",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
    description: "IKEA ve diğer mobilya montajı",
    rating: 4.6,
    category: "Marangoz",
  },
  {
    id: 6,
    title: "Evden Eve Nakliyat",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    description: "2+1 daire taşıma",
    rating: 4.4,
    category: "Nakliyat",
  },
  {
    id: 7,
    title: "Saç Kesimi & Fön",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    description: "Kadın saç kesimi ve fön",
    rating: 4.7,
    category: "Kuaför",
  },
  {
    id: 8,
    title: "Bahçe Bakımı",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "Aylık bahçe bakım hizmeti",
    rating: 4.5,
    category: "Bahçıvan",
  },
  {
    id: 9,
    title: "Düğün Fotoğrafçılığı",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
    description: "Tam gün düğün fotoğrafçılığı",
    rating: 4.8,
    category: "Fotoğrafçı",
  },
  {
    id: 10,
    title: "Matematik Özel Ders",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    description: "1 saatlik özel ders",
    rating: 4.9,
    category: "Özel Ders",
  },
  {
    id: 11,
    title: "Köpek Gezdirme (1 saat)",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
    description: "Günlük köpek gezdirme hizmeti",
    rating: 4.6,
    category: "Evcil Hayvan Bakımı",
  },
  {
    id: 12,
    title: "Catering (50 kişi)",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
    description: "50 kişilik özel gün catering",
    rating: 4.7,
    category: "Yemek & Catering",
  },
  {
    id: 13,
    title: "Pantolon Tamiri",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    description: "Pantolon kısaltma, tamir",
    rating: 4.5,
    category: "Giyim & Dikiş",
  },
  {
    id: 14,
    title: "Kişisel Antrenör",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    description: "1 saatlik kişisel antrenör",
    rating: 4.8,
    category: "Spor & Fitness",
  },
  {
    id: 15,
    title: "Klima Montajı",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    description: "Split klima montajı",
    rating: 4.4,
    category: "Elektrikçi",
  },
  {
    id: 16,
    title: "Ofis Temizliği",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    description: "Haftalık ofis temizliği",
    rating: 4.9,
    category: "Temizlik",
  },
  {
    id: 17,
    title: "Kombi Bakımı",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
    description: "Yıllık kombi bakım ve temizlik",
    rating: 4.6,
    category: "Su Tesisatçısı",
  },
  {
    id: 18,
    title: "Kapı Pencere Tamiri",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
    description: "Kapı pencere tamir ve bakım",
    rating: 4.5,
    category: "Marangoz",
  },
  {
    id: 19,
    title: "Parça Eşya Taşıma",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    description: "Küçük eşya taşıma hizmeti",
    rating: 4.3,
    category: "Nakliyat",
  },
  {
    id: 20,
    title: "Saç Boyama",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    description: "Saç boyama ve bakım",
    rating: 4.8,
    category: "Kuaför",
  },
  {
    id: 21,
    title: "Ağaç Budama",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "Bahçe ağaç budama işi",
    rating: 4.5,
    category: "Bahçıvan",
  },
  {
    id: 22,
    title: "Portre Fotoğraf Çekimi",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
    description: "Profesyonel portre çekimi",
    rating: 4.7,
    category: "Fotoğrafçı",
  },
];

export default mockServices;
