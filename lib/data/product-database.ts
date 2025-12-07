/**
 * Hizmetgo - Otomatik Ürün/Hizmet Veritabanı
 * Türkiye'de bilinen yemekler, hizmetler ve ürünler için otomatik resim ve malzeme ataması
 */

export interface ProductData {
  id: string;
  name: string;
  nameVariations: string[]; // Farklı yazılış şekilleri
  category: string;
  sector: string;
  imageUrl: string;
  ingredients?: string[]; // Malzemeler
  description?: string;
  defaultPrice?: number; // Varsayılan fiyat (opsiyonel)
}

export const PRODUCT_DATABASE: ProductData[] = [
  // ============================================
  // RESTORAN - YEMEKLER
  // ============================================

  // Döner Çeşitleri
  {
    id: "tavuk-doner",
    name: "Tavuk Döner",
    nameVariations: [
      "tavuk döner",
      "tavuk doner",
      "tavuk döneri",
      "tavuk doneri",
      "chicken doner",
    ],
    category: "Döner",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=500&fit=crop",
    ingredients: [
      "Tavuk eti",
      "Marinasyon sosu",
      "Soğan",
      "Domates",
      "Lahana",
      "Mayonez",
      "Ketçap",
    ],
    description: "Taze tavuk etinden yapılmış nefis döner",
  },
  {
    id: "et-doner",
    name: "Et Döner",
    nameVariations: [
      "et döner",
      "et doner",
      "kuzu döner",
      "kuzu doner",
      "dana döner",
    ],
    category: "Döner",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: [
      "Kuzu eti",
      "Kuzu yağı",
      "Soğan",
      "Domates",
      "Lahana",
      "Ayran",
    ],
    description: "Geleneksel kuzu eti döner",
  },
  {
    id: "karisik-doner",
    name: "Karışık Döner",
    nameVariations: ["karışık döner", "karisik doner", "karışık", "mix doner"],
    category: "Döner",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=500&fit=crop",
    ingredients: [
      "Tavuk eti",
      "Kuzu eti",
      "Soğan",
      "Domates",
      "Lahana",
      "Mayonez",
      "Ketçap",
    ],
    description: "Tavuk ve et karışık döner",
  },

  // Çorbalar
  {
    id: "mercimek-corbasi",
    name: "Mercimek Çorbası",
    nameVariations: [
      "mercimek çorbası",
      "mercimek corbasi",
      "mercimek",
      "lentil soup",
    ],
    category: "Çorba",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop",
    ingredients: [
      "Kırmızı mercimek",
      "Soğan",
      "Havuç",
      "Patates",
      "Tereyağı",
      "Un",
      "Tuz",
      "Kırmızı biber",
    ],
    description: "Geleneksel Türk mercimek çorbası",
  },
  {
    id: "ezogelin-corbasi",
    name: "Ezo Gelin Çorbası",
    nameVariations: [
      "ezo gelin çorbası",
      "ezogelin çorbası",
      "ezo gelin corbasi",
      "ezogelin corbasi",
    ],
    category: "Çorba",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop",
    ingredients: [
      "Bulgur",
      "Domates salçası",
      "Soğan",
      "Sarımsak",
      "Nane",
      "Kırmızı biber",
      "Tereyağı",
    ],
    description: "Güney Anadolu'nun meşhur çorbası",
  },
  {
    id: "tavuk-suyu-corbasi",
    name: "Tavuk Suyu Çorbası",
    nameVariations: [
      "tavuk suyu çorbası",
      "tavuk suyu corbasi",
      "tavuk çorbası",
      "tavuk corbasi",
      "chicken soup",
    ],
    category: "Çorba",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop",
    ingredients: [
      "Tavuk suyu",
      "Şehriye",
      "Havuç",
      "Soğan",
      "Maydanoz",
      "Limon",
      "Tuz",
    ],
    description: "Hafif ve besleyici tavuk suyu çorbası",
  },
  {
    id: "yayla-corbasi",
    name: "Yayla Çorbası",
    nameVariations: ["yayla çorbası", "yayla corbasi", "yogurtlu corba"],
    category: "Çorba",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop",
    ingredients: ["Yoğurt", "Pirinç", "Yumurta", "Nane", "Tereyağı", "Tuz"],
    description: "Yoğurtlu geleneksel çorba",
  },
  {
    id: "domates-corbasi",
    name: "Domates Çorbası",
    nameVariations: ["domates çorbası", "domates corbasi", "tomato soup"],
    category: "Çorba",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop",
    ingredients: [
      "Domates",
      "Soğan",
      "Sarımsak",
      "Tereyağı",
      "Un",
      "Krema",
      "Fesleğen",
    ],
    description: "Taze domates çorbası",
  },

  // Pizza
  {
    id: "margherita-pizza",
    name: "Margherita Pizza",
    nameVariations: ["margherita", "margarita", "margherita pizza"],
    category: "Pizza",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=500&fit=crop",
    ingredients: [
      "Pizza hamuru",
      "Domates sosu",
      "Mozzarella peyniri",
      "Fesleğen",
      "Zeytinyağı",
    ],
    description: "Klasik İtalyan pizza",
  },
  {
    id: "karisik-pizza",
    name: "Karışık Pizza",
    nameVariations: [
      "karışık pizza",
      "karisik pizza",
      "mix pizza",
      "supreme pizza",
    ],
    category: "Pizza",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=500&fit=crop",
    ingredients: [
      "Pizza hamuru",
      "Domates sosu",
      "Mozzarella",
      "Sucuk",
      "Sosis",
      "Biber",
      "Mantar",
      "Zeytin",
    ],
    description: "Çeşitli malzemeli pizza",
  },

  // Lahmacun
  {
    id: "lahmacun",
    name: "Lahmacun",
    nameVariations: ["lahmacun", "lahmacun pizza"],
    category: "Lahmacun",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop",
    ingredients: [
      "İnce hamur",
      "Kıyma",
      "Soğan",
      "Domates",
      "Biber salçası",
      "Maydanoz",
      "Kırmızı biber",
    ],
    description: "Geleneksel Türk lahmacun",
  },

  // Pide
  {
    id: "kiymali-pide",
    name: "Kıymalı Pide",
    nameVariations: ["kıymalı pide", "kiymali pide", "pide"],
    category: "Pide",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop",
    ingredients: [
      "Pide hamuru",
      "Kıyma",
      "Soğan",
      "Biber",
      "Domates",
      "Yumurta",
    ],
    description: "Geleneksel kıymalı pide",
  },
  {
    id: "kasarli-pide",
    name: "Kaşarlı Pide",
    nameVariations: ["kaşarlı pide", "kasarlı pide", "peynirli pide"],
    category: "Pide",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop",
    ingredients: ["Pide hamuru", "Kaşar peyniri", "Yumurta", "Tereyağı"],
    description: "Kaşar peynirli pide",
  },

  // Kebap
  {
    id: "adana-kebap",
    name: "Adana Kebap",
    nameVariations: ["adana kebap", "adana kebab", "adana"],
    category: "Kebap",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: [
      "Kuzu kıyma",
      "Kırmızı biber",
      "Tuz",
      "Sumak",
      "Soğan",
      "Domates",
      "Biber",
    ],
    description: "Acılı Adana usulü kebap",
  },
  {
    id: "urfa-kebap",
    name: "Urfa Kebap",
    nameVariations: ["urfa kebap", "urfa kebab", "urfa"],
    category: "Kebap",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: [
      "Kuzu kıyma",
      "Kırmızı biber (acısız)",
      "Tuz",
      "Sumak",
      "Soğan",
      "Domates",
    ],
    description: "Acısız Urfa usulü kebap",
  },
  {
    id: "iskender-kebap",
    name: "İskender Kebap",
    nameVariations: ["iskender kebap", "iskender kebab", "iskender"],
    category: "Kebap",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: [
      "Döner eti",
      "Yoğurt",
      "Domates sosu",
      "Tereyağı",
      "Pide",
      "Biber",
    ],
    description: "Bursa'nın meşhur İskender kebabı",
  },

  // Köfte
  {
    id: "izgara-kofte",
    name: "Izgara Köfte",
    nameVariations: ["ızgara köfte", "izgara kofte", "köfte", "kofte"],
    category: "Köfte",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: [
      "Kıyma",
      "Soğan",
      "Ekmek içi",
      "Yumurta",
      "Tuz",
      "Karabiber",
      "Kırmızı biber",
    ],
    description: "Geleneksel ızgara köfte",
  },

  // Börek
  {
    id: "sigara-boregi",
    name: "Sigara Böreği",
    nameVariations: ["sigara böreği", "sigara boregi", "sigara börek"],
    category: "Börek",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=500&fit=crop",
    ingredients: [
      "Yufka",
      "Beyaz peynir",
      "Maydanoz",
      "Yumurta",
      "Ayçiçek yağı",
    ],
    description: "Kızarmış sigara böreği",
  },
  {
    id: "peynirli-borek",
    name: "Peynirli Börek",
    nameVariations: ["peynirli börek", "peynirli borek", "börek"],
    category: "Börek",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=500&fit=crop",
    ingredients: ["Yufka", "Beyaz peynir", "Yumurta", "Tereyağı"],
    description: "Fırında peynirli börek",
  },
  {
    id: "kiymali-borek",
    name: "Kıymalı Börek",
    nameVariations: ["kıymalı börek", "kiymali borek"],
    category: "Börek",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=500&fit=crop",
    ingredients: [
      "Yufka",
      "Kıyma",
      "Soğan",
      "Biber salçası",
      "Yumurta",
      "Tereyağı",
    ],
    description: "Kıymalı fırın böreği",
  },

  // Pilav
  {
    id: "pilav",
    name: "Pilav",
    nameVariations: ["pilav", "beyaz pilav", "rice"],
    category: "Pilav",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Pirinç", "Tereyağı", "Tuz", "Su"],
    description: "Tereyağlı beyaz pilav",
  },
  {
    id: "nohutlu-pilav",
    name: "Nohutlu Pilav",
    nameVariations: ["nohutlu pilav", "nohut pilav"],
    category: "Pilav",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Pirinç", "Nohut", "Tereyağı", "Tuz"],
    description: "Nohutlu pilav",
  },

  // Salata
  {
    id: "coban-salatasi",
    name: "Çoban Salatası",
    nameVariations: ["çoban salatası", "coban salatasi", "coban salata"],
    category: "Salata",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
    ingredients: [
      "Domates",
      "Salatalık",
      "Soğan",
      "Biber",
      "Maydanoz",
      "Zeytinyağı",
      "Limon",
      "Tuz",
    ],
    description: "Taze çoban salatası",
  },
  {
    id: "mevsim-salatasi",
    name: "Mevsim Salatası",
    nameVariations: ["mevsim salatası", "mevsim salatasi"],
    category: "Salata",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
    ingredients: [
      "Marul",
      "Domates",
      "Salatalık",
      "Havuç",
      "Mısır",
      "Zeytinyağı",
      "Limon",
    ],
    description: "Mevsim sebzeleri salatası",
  },

  // Tatlılar
  {
    id: "baklava",
    name: "Baklava",
    nameVariations: ["baklava", "baklava tatlısı"],
    category: "Tatlı",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: ["Yufka", "Ceviz", "Şeker", "Tereyağı", "Şerbet"],
    description: "Geleneksel baklava",
  },
  {
    id: "kadayif",
    name: "Kadayıf",
    nameVariations: ["kadayıf", "kadayif", "tel kadayıf"],
    category: "Tatlı",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: ["Tel kadayıf", "Ceviz", "Şeker", "Tereyağı", "Şerbet"],
    description: "Tel kadayıf tatlısı",
  },
  {
    id: "sutlac",
    name: "Sütlaç",
    nameVariations: ["sütlaç", "sutlac", "sütlac"],
    category: "Tatlı",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: ["Pirinç", "Süt", "Şeker", "Vanilya", "Tarçın"],
    description: "Geleneksel sütlaç",
  },
  {
    id: "irmik-tatlisi",
    name: "İrmik Tatlısı",
    nameVariations: ["irmik tatlısı", "irmik tatlisi"],
    category: "Tatlı",
    sector: "RESTORAN",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop",
    ingredients: ["İrmik", "Süt", "Şeker", "Tereyağı", "Ceviz"],
    description: "İrmik helvası",
  },

  // ============================================
  // MARKET - ÜRÜNLER
  // ============================================

  // Ekmek & Fırın
  {
    id: "ekmek",
    name: "Ekmek",
    nameVariations: [
      "ekmek",
      "beyaz ekmek",
      "tam buğday ekmek",
      "ekmek 1 adet",
    ],
    category: "Fırın",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop",
    ingredients: ["Un", "Su", "Maya", "Tuz"],
    description: "Taze beyaz ekmek",
  },
  {
    id: "simit",
    name: "Simit",
    nameVariations: ["simit", "simit 1 adet"],
    category: "Fırın",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop",
    ingredients: ["Un", "Susam", "Pekmez", "Su"],
    description: "Taze simit",
  },
  {
    id: "poğaça",
    name: "Poğaça",
    nameVariations: ["poğaça", "pogaca", "poğaça 1 adet"],
    category: "Fırın",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop",
    ingredients: ["Un", "Tereyağı", "Peynir", "Yumurta"],
    description: "Taze poğaça",
  },

  // Süt Ürünleri
  {
    id: "sut",
    name: "Süt",
    nameVariations: ["süt", "sut", "milk", "süt 1 litre"],
    category: "Süt Ürünleri",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500&fit=crop",
    ingredients: ["Tam yağlı süt"],
    description: "1 litre tam yağlı süt",
  },
  {
    id: "yogurt",
    name: "Yoğurt",
    nameVariations: ["yoğurt", "yogurt", "yoğurt 1 kg"],
    category: "Süt Ürünleri",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=500&fit=crop",
    ingredients: ["Süt", "Yoğurt kültürü"],
    description: "1 kg tam yağlı yoğurt",
  },
  {
    id: "peynir",
    name: "Beyaz Peynir",
    nameVariations: ["peynir", "beyaz peynir", "peynir 500 gr"],
    category: "Süt Ürünleri",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=500&fit=crop",
    ingredients: ["Süt", "Tuz", "Maya"],
    description: "500 gr beyaz peynir",
  },
  {
    id: "kasar",
    name: "Kaşar Peyniri",
    nameVariations: [
      "kaşar",
      "kasarlı peynir",
      "kaşar peyniri",
      "kaşar 500 gr",
    ],
    category: "Süt Ürünleri",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=500&fit=crop",
    ingredients: ["Süt", "Tuz", "Maya"],
    description: "500 gr kaşar peyniri",
  },
  {
    id: "tereyagi",
    name: "Tereyağı",
    nameVariations: ["tereyağı", "tereyagi", "butter", "tereyağı 500 gr"],
    category: "Süt Ürünleri",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&h=500&fit=crop",
    ingredients: ["Krema", "Tuz"],
    description: "500 gr tereyağı",
  },

  // Temel Gıda
  {
    id: "yumurta",
    name: "Yumurta",
    nameVariations: ["yumurta", "yumurta 1 düzine", "egg", "yumurta düzine"],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&h=500&fit=crop",
    ingredients: ["Tavuk yumurtası"],
    description: "1 düzine yumurta",
  },
  {
    id: "pirinç",
    name: "Pirinç",
    nameVariations: ["pirinç", "pirinç 1 kg", "rice"],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Pirinç"],
    description: "1 kg pirinç",
  },
  {
    id: "bulgur",
    name: "Bulgur",
    nameVariations: ["bulgur", "bulgur 1 kg"],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Bulgur"],
    description: "1 kg bulgur",
  },
  {
    id: "makarna",
    name: "Makarna",
    nameVariations: ["makarna", "makarna 500 gr", "pasta"],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop",
    ingredients: ["Un", "Yumurta", "Tuz"],
    description: "500 gr makarna",
  },
  {
    id: "un",
    name: "Un",
    nameVariations: ["un", "un 1 kg", "beyaz un"],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Buğday unu"],
    description: "1 kg beyaz un",
  },
  {
    id: "seker",
    name: "Şeker",
    nameVariations: ["şeker", "seker", "toz şeker", "şeker 1 kg"],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Pancar şekeri"],
    description: "1 kg toz şeker",
  },
  {
    id: "tuz",
    name: "Tuz",
    nameVariations: ["tuz", "sofra tuzu", "tuz 1 kg"],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Sofra tuzu"],
    description: "1 kg sofra tuzu",
  },
  {
    id: "aycicek-yagi",
    name: "Ayçiçek Yağı",
    nameVariations: [
      "ayçiçek yağı",
      "aycicek yagi",
      "yağ",
      "ayçiçek yağı 1 litre",
    ],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Ayçiçek yağı"],
    description: "1 litre ayçiçek yağı",
  },
  {
    id: "zeytinyagi",
    name: "Zeytinyağı",
    nameVariations: [
      "zeytinyağı",
      "zeytinyagi",
      "zeytin yağı",
      "zeytinyağı 500 ml",
    ],
    category: "Temel Gıda",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Zeytinyağı"],
    description: "500 ml zeytinyağı",
  },

  // Sebze & Meyve
  {
    id: "domates",
    name: "Domates",
    nameVariations: ["domates", "domates 1 kg"],
    category: "Sebze",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1546470427-e26264be0acc?w=500&h=500&fit=crop",
    ingredients: ["Domates"],
    description: "1 kg domates",
  },
  {
    id: "salatalik",
    name: "Salatalık",
    nameVariations: ["salatalık", "salatalik", "hıyar", "salatalık 1 kg"],
    category: "Sebze",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1604977049385-4e03e6e5b1b0?w=500&h=500&fit=crop",
    ingredients: ["Salatalık"],
    description: "1 kg salatalık",
  },
  {
    id: "biber",
    name: "Biber",
    nameVariations: ["biber", "yeşil biber", "biber 1 kg"],
    category: "Sebze",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1604977049385-4e03e6e5b1b0?w=500&h=500&fit=crop",
    ingredients: ["Yeşil biber"],
    description: "1 kg yeşil biber",
  },
  {
    id: "patates",
    name: "Patates",
    nameVariations: ["patates", "patates 1 kg"],
    category: "Sebze",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=500&h=500&fit=crop",
    ingredients: ["Patates"],
    description: "1 kg patates",
  },
  {
    id: "soğan",
    name: "Soğan",
    nameVariations: ["soğan", "sogan", "soğan 1 kg"],
    category: "Sebze",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=500&h=500&fit=crop",
    ingredients: ["Kuru soğan"],
    description: "1 kg kuru soğan",
  },
  {
    id: "havuc",
    name: "Havuç",
    nameVariations: ["havuç", "havuc", "havuç 1 kg"],
    category: "Sebze",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=500&h=500&fit=crop",
    ingredients: ["Havuç"],
    description: "1 kg havuç",
  },
  {
    id: "elma",
    name: "Elma",
    nameVariations: ["elma", "elma 1 kg"],
    category: "Meyve",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&h=500&fit=crop",
    ingredients: ["Elma"],
    description: "1 kg elma",
  },
  {
    id: "muz",
    name: "Muz",
    nameVariations: ["muz", "muz 1 kg"],
    category: "Meyve",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&h=500&fit=crop",
    ingredients: ["Muz"],
    description: "1 kg muz",
  },
  {
    id: "portakal",
    name: "Portakal",
    nameVariations: ["portakal", "portakal 1 kg"],
    category: "Meyve",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1611080626919-7cf5e9baab5c?w=500&h=500&fit=crop",
    ingredients: ["Portakal"],
    description: "1 kg portakal",
  },

  // Et & Tavuk
  {
    id: "kiyma",
    name: "Kıyma",
    nameVariations: ["kıyma", "kiyma", "dana kıyma", "kıyma 500 gr"],
    category: "Et",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop",
    ingredients: ["Dana eti"],
    description: "500 gr dana kıyma",
  },
  {
    id: "tavuk-gogus",
    name: "Tavuk Göğüs",
    nameVariations: ["tavuk göğüs", "tavuk gogus", "tavuk göğüs 500 gr"],
    category: "Et",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop",
    ingredients: ["Tavuk göğüs eti"],
    description: "500 gr tavuk göğüs",
  },
  {
    id: "tavuk-but",
    name: "Tavuk But",
    nameVariations: ["tavuk but", "tavuk but 1 kg"],
    category: "Et",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop",
    ingredients: ["Tavuk but"],
    description: "1 kg tavuk but",
  },

  // İçecekler
  {
    id: "su",
    name: "Su",
    nameVariations: ["su", "su 1.5 litre", "pet su"],
    category: "İçecek",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1548839140-5a059f41d1d3?w=500&h=500&fit=crop",
    ingredients: ["Doğal kaynak suyu"],
    description: "1.5 litre pet su",
  },
  {
    id: "cay",
    name: "Çay",
    nameVariations: ["çay", "cay", "siyah çay", "çay 1 kg"],
    category: "İçecek",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop",
    ingredients: ["Siyah çay"],
    description: "1 kg siyah çay",
  },
  {
    id: "kahve",
    name: "Kahve",
    nameVariations: ["kahve", "türk kahvesi", "kahve 250 gr"],
    category: "İçecek",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
    ingredients: ["Kahve çekirdeği"],
    description: "250 gr Türk kahvesi",
  },
  {
    id: "kola",
    name: "Kola",
    nameVariations: ["kola", "cola", "kola 1.5 litre"],
    category: "İçecek",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&h=500&fit=crop",
    ingredients: ["Karbonatlı içecek"],
    description: "1.5 litre kola",
  },

  // Konserve & Hazır
  {
    id: "domates-salcasi",
    name: "Domates Salçası",
    nameVariations: [
      "domates salçası",
      "domates salcasi",
      "salça",
      "domates salçası 400 gr",
    ],
    category: "Konserve",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1546470427-e26264be0acc?w=500&h=500&fit=crop",
    ingredients: ["Domates", "Tuz"],
    description: "400 gr domates salçası",
  },
  {
    id: "biber-salcasi",
    name: "Biber Salçası",
    nameVariations: [
      "biber salçası",
      "biber salcasi",
      "acı biber salçası",
      "biber salçası 400 gr",
    ],
    category: "Konserve",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1604977049385-4e03e6e5b1b0?w=500&h=500&fit=crop",
    ingredients: ["Kırmızı biber", "Tuz"],
    description: "400 gr biber salçası",
  },
  {
    id: "nohut",
    name: "Nohut",
    nameVariations: ["nohut", "nohut 500 gr"],
    category: "Konserve",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Nohut"],
    description: "500 gr nohut",
  },
  {
    id: "fasulye",
    name: "Fasulye",
    nameVariations: ["fasulye", "kuru fasulye", "fasulye 500 gr"],
    category: "Konserve",
    sector: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-de94199738e7?w=500&h=500&fit=crop",
    ingredients: ["Kuru fasulye"],
    description: "500 gr kuru fasulye",
  },

  // ============================================
  // KUAFÖR - HİZMETLER
  // ============================================
  {
    id: "sac-kesimi",
    name: "Saç Kesimi",
    nameVariations: ["saç kesimi", "sac kesimi", "saç kestirme", "haircut"],
    category: "Saç Hizmetleri",
    sector: "KUAFOR",
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop",
    ingredients: ["Saç kesimi", "Şampuan", "Saç kremi", "Fön"],
    description: "Profesyonel saç kesimi ve şekillendirme",
  },
  {
    id: "sac-boyama",
    name: "Saç Boyama",
    nameVariations: ["saç boyama", "sac boyama", "saç boyama işlemi"],
    category: "Saç Hizmetleri",
    sector: "KUAFOR",
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop",
    ingredients: ["Saç boyası", "Oksidan", "Saç kremi", "Şampuan"],
    description: "Profesyonel saç boyama hizmeti",
  },
  {
    id: "sakal-tiras",
    name: "Sakal Tıraşı",
    nameVariations: [
      "sakal tıraşı",
      "sakal trası",
      "sakal kesimi",
      "beard trim",
    ],
    category: "Erkek Hizmetleri",
    sector: "KUAFOR",
    imageUrl:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=500&fit=crop",
    ingredients: [
      "Tıraş makinesi",
      "Tıraş köpüğü",
      "Aftershave",
      "Nemlendirici",
    ],
    description: "Profesyonel sakal tıraşı ve şekillendirme",
  },

  // ============================================
  // TEMİZLİK - HİZMETLER
  // ============================================
  {
    id: "ev-temizligi",
    name: "Ev Temizliği",
    nameVariations: ["ev temizliği", "ev temizlik", "house cleaning"],
    category: "Temizlik Hizmetleri",
    sector: "TEMIZLIK",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
    ingredients: ["Temizlik malzemeleri", "Süpürge", "Bez", "Dezenfektan"],
    description: "Kapsamlı ev temizlik hizmeti",
  },
  {
    id: "ofis-temizligi",
    name: "Ofis Temizliği",
    nameVariations: ["ofis temizliği", "ofis temizlik", "office cleaning"],
    category: "Temizlik Hizmetleri",
    sector: "TEMIZLIK",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
    ingredients: ["Temizlik malzemeleri", "Süpürge", "Bez", "Dezenfektan"],
    description: "Profesyonel ofis temizlik hizmeti",
  },

  // ============================================
  // TESİSAT - HİZMETLER
  // ============================================
  {
    id: "musluk-tamiri",
    name: "Musluk Tamiri",
    nameVariations: ["musluk tamiri", "musluk tamir", "faucet repair"],
    category: "Tesisat Hizmetleri",
    sector: "TESISAT",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop",
    ingredients: ["Musluk contası", "Anahtar takımı", "Teflon", "Silikon"],
    description: "Musluk tamir ve bakım hizmeti",
  },
  {
    id: "tikaniklik-acma",
    name: "Tıkanıklık Açma",
    nameVariations: ["tıkanıklık açma", "tikaniklik acma", "drain cleaning"],
    category: "Tesisat Hizmetleri",
    sector: "TESISAT",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop",
    ingredients: [
      "Tıkanıklık açma makinesi",
      "Kimyasal temizleyici",
      "Eldiven",
    ],
    description: "Lavabo, klozet ve gider tıkanıklık açma",
  },

  // ============================================
  // ELEKTRİK - HİZMETLER
  // ============================================
  {
    id: "priz-tamiri",
    name: "Priz Tamiri",
    nameVariations: ["priz tamiri", "priz tamir", "outlet repair"],
    category: "Elektrik Hizmetleri",
    sector: "ELEKTRIK",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop",
    ingredients: ["Priz", "Kablo", "Vida", "Elektrik bandı"],
    description: "Priz tamir ve montaj hizmeti",
  },
  {
    id: "lamba-degistirme",
    name: "Lamba Değiştirme",
    nameVariations: [
      "lamba değiştirme",
      "lamba degistirme",
      "ampul değiştirme",
    ],
    category: "Elektrik Hizmetleri",
    sector: "ELEKTRIK",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop",
    ingredients: ["Ampul", "Lamba", "Elektrik bandı"],
    description: "Lamba ve ampul değiştirme hizmeti",
  },

  // ============================================
  // BOYA - HİZMETLER
  // ============================================
  {
    id: "ev-boyama",
    name: "Ev Boyama",
    nameVariations: ["ev boyama", "duvar boyama", "house painting"],
    category: "Boya Hizmetleri",
    sector: "BOYA",
    imageUrl:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=500&fit=crop",
    ingredients: ["Boya", "Fırça", "Rulo", "Astarlama", "Maskeleme bandı"],
    description: "İç mekan boyama hizmeti",
  },
  {
    id: "dis-cephe-boyama",
    name: "Dış Cephe Boyama",
    nameVariations: [
      "dış cephe boyama",
      "dis cephe boyama",
      "exterior painting",
    ],
    category: "Boya Hizmetleri",
    sector: "BOYA",
    imageUrl:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=500&fit=crop",
    ingredients: ["Dış cephe boyası", "Fırça", "Rulo", "Astarlama"],
    description: "Dış cephe boyama hizmeti",
  },

  // ============================================
  // MARANGOZ - HİZMETLER
  // ============================================
  {
    id: "dolap-yapimi",
    name: "Dolap Yapımı",
    nameVariations: ["dolap yapımı", "dolap yapimi", "cabinet making"],
    category: "Marangoz Hizmetleri",
    sector: "MARANGOZ",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    ingredients: ["Ahşap", "Vida", "Zımpara", "Cila", "Kulp"],
    description: "Özel dolap yapımı hizmeti",
  },
  {
    id: "mobilya-tamiri",
    name: "Mobilya Tamiri",
    nameVariations: ["mobilya tamiri", "mobilya tamir", "furniture repair"],
    category: "Marangoz Hizmetleri",
    sector: "MARANGOZ",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    ingredients: ["Ahşap", "Tutkal", "Vida", "Zımpara", "Cila"],
    description: "Mobilya tamir ve restorasyon hizmeti",
  },
];

/**
 * Ürün adına göre eşleşen ürünü bul
 */
export function findProductByName(
  name: string,
  sector?: string,
): ProductData | null {
  const lowerName = name.toLowerCase().trim();

  const matches = PRODUCT_DATABASE.filter((product) => {
    // Sektör filtresi
    if (sector && product.sector !== sector) return false;

    // Tam eşleşme veya variation eşleşmesi
    return product.nameVariations.some(
      (variation) =>
        lowerName.includes(variation.toLowerCase()) ||
        variation.toLowerCase().includes(lowerName),
    );
  });

  // En iyi eşleşmeyi döndür (en uzun eşleşme)
  if (matches.length > 0) {
    return matches.sort((a, b) => {
      const aMatch = a.nameVariations.find((v) =>
        lowerName.includes(v.toLowerCase()),
      );
      const bMatch = b.nameVariations.find((v) =>
        lowerName.includes(v.toLowerCase()),
      );
      return (bMatch?.length || 0) - (aMatch?.length || 0);
    })[0];
  }

  return null;
}

/**
 * Sektöre göre ürün önerileri
 */
export function getProductSuggestions(
  sector: string,
  query: string = "",
): ProductData[] {
  const lowerQuery = query.toLowerCase().trim();
  const sectorProducts = PRODUCT_DATABASE.filter((p) => p.sector === sector);

  if (!lowerQuery) {
    return sectorProducts.slice(0, 10);
  }

  return sectorProducts
    .filter(
      (product) =>
        product.nameVariations.some((v) =>
          v.toLowerCase().includes(lowerQuery),
        ) || product.name.toLowerCase().includes(lowerQuery),
    )
    .slice(0, 10);
}
