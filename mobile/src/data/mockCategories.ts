export interface Category {
  id: number;
  name: string;
  image: string;
  icon?: string;
}

// Web'deki kategori resimleri ile aynı - Pexels kaynaklı
const IMAGE_VERSION = "22";
const addVersionToUrl = (url: string): string => {
  if (!url) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${IMAGE_VERSION}`;
};

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Elektrik",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 2,
    name: "Su Tesisatı",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/8793484/pexels-photo-8793484.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 3,
    name: "Boya Badana",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/7509752/pexels-photo-7509752.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 4,
    name: "Ev Temizliği",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 5,
    name: "Marangoz",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 6,
    name: "Nakliyat",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/4569338/pexels-photo-4569338.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 7,
    name: "Çilingir",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/115642/pexels-photo-115642.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 8,
    name: "Bahçıvan",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 9,
    name: "Fotoğrafçı",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 10,
    name: "Beyaz Eşya",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/4700388/pexels-photo-4700388.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 11,
    name: "Klima",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/7347538/pexels-photo-7347538.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 12,
    name: "Halı Yıkama",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/4700387/pexels-photo-4700387.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 13,
    name: "Çatı",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/8853534/pexels-photo-8853534.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
  {
    id: 14,
    name: "Cam Balkon",
    image: addVersionToUrl(
      "https://images.pexels.com/photos/34929038/pexels-photo-34929038.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ),
  },
];

export default mockCategories;
