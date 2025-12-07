/**
 * Profesyonel Stok Görsel Kütüphanesi
 * Pexels'tan yüksek kaliteli, profesyonel görseller
 */

export const imageStock = {
  // Kategori Görselleri
  categories: {
    // Temizlik
    "ev-temizligi":
      "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    "hali-temizligi":
      "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    "ofis-temizligi":
      "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    "duzen-toplama":
      "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",

    // Tamir & Onarım
    "boya-tadilat":
      "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    "beyaz-esya":
      "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    tesisat:
      "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    elektrik:
      "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    klima:
      "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    cilingir:
      "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",

    // Taşıma & Nakliyat
    nakliyat:
      "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    "parca-esya":
      "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    mobilya:
      "https://images.pexels.com/photos/159711/pexels-photo-159711.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    hurda:
      "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",

    // Esnaf & Market
    market:
      "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    kasap:
      "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    yemek:
      "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    pastane:
      "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  },

  // Avatar Görselleri (Ustalar) - Pexels
  avatars: {
    "usta-1":
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    "usta-2":
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    "usta-3":
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    "usta-4":
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    "usta-5":
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },

  // Hero & Genel Görseller - Pexels
  hero: {
    "happy-family":
      "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
    workers:
      "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
    service:
      "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
  },

  // Usta Görselleri (Mutlu çalışanlar) - Pexels
  workers: {
    cleaning:
      "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    painting:
      "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    plumber:
      "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    electrician:
      "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    moving:
      "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  },
};

/**
 * Kategori görseli al
 */
export function getCategoryImage(categoryId: string): string {
  return (
    imageStock.categories[categoryId as keyof typeof imageStock.categories] ||
    imageStock.categories["ev-temizligi"]
  );
}

/**
 * Avatar görseli al
 */
export function getAvatarImage(avatarId: string): string {
  return (
    imageStock.avatars[avatarId as keyof typeof imageStock.avatars] ||
    imageStock.avatars["usta-1"]
  );
}
