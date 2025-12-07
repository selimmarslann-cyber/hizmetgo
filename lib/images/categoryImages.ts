/**
 * Kategori görsel stok haritası
 * Her kategori için doğru görselleri eşleştirir
 * Pexels kaynaklı görseller
 */

export const CATEGORY_IMAGE_POOL: Record<string, string[]> = {
  "ev-temizligi": [
    "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "hali-temizligi": [
    "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "ofis-temizligi": [
    "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "duzen-toplama": [
    "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "boya-badana": [
    "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "boya-tadilat": [
    "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  nakliyat: [
    "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  cilingir: [
    "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "beyaz-esya": [
    "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "evcil-hayvan": [
    "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "bahce-bakimi": [
    "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  klima: [
    "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "cam-balkon": [
    "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  fotografci: [
    "https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  güvenlik: [
    "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  tasiyici: [
    "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  "esnaf-market": [
    "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  tesisat: [
    "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  elektrik: [
    "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
  default: [
    "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  ],
};

/**
 * Kategori slug'ına göre görsel al
 */
export function getCategoryImage(
  categoryId: string,
  index: number = 0,
): string {
  const images =
    CATEGORY_IMAGE_POOL[categoryId] || CATEGORY_IMAGE_POOL["default"];
  return images[index % images.length];
}
