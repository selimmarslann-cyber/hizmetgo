export interface Job {
  id: number;
  title: string;
  category: string;
  budget: string;
  location: string;
  description?: string;
  createdAt?: string;
  timeAgo?: string;
}

export const mockJobs: Job[] = [
  {
    id: 1,
    title: "3+1 Komple Elektrik Tesisatı",
    category: "Elektrik",
    budget: "8.000 - 12.000",
    location: "Aydoğdu Mah. Süleymanpaşa",
    description:
      "Yeni yapılan 3+1 daire için komple elektrik tesisatı yapılacak. Tüm kablolar, prizler, anahtar ve aydınlatma dahil.",
    timeAgo: "2 saat önce",
  },
  {
    id: 2,
    title: "Ev Temizliği",
    category: "Temizlik",
    budget: "600 - 900",
    location: "Hürriyet Mah. Süleymanpaşa",
    description:
      "3+1 ev için derinlemesine temizlik. Banyo, mutfak, camlar dahil.",
    timeAgo: "5 saat önce",
  },
  {
    id: 3,
    title: "Bu akşam köpek gezdirme (1 saat)",
    category: "Evcil Hayvan",
    budget: "300",
    location: "Kadıköy",
    description:
      "Köpeğimi bu akşam 1 saat gezdirilmesi gerekiyor. Deneyimli biri tercih edilir.",
    timeAgo: "1 saat önce",
  },
  {
    id: 4,
    title: "3 günlük köpek bakıcısı",
    category: "Evcil Hayvan",
    budget: "3.000",
    location: "Beşiktaş",
    description:
      "3 gün boyunca köpeğime bakılması gerekiyor. Evde kalabilir veya günlük ziyaret edebilir.",
    timeAgo: "3 saat önce",
  },
  {
    id: 5,
    title: "Hafta sonu depo sayımı için 2 kişi",
    category: "Ofis & Depo",
    budget: "2.500",
    location: "Çorlu",
    description:
      "Cumartesi ve Pazar günü depo sayımı yapılacak. 2 kişi aranıyor.",
    timeAgo: "6 saat önce",
  },
  {
    id: 6,
    title: "Yarın ev temizliği yardımcısı aranıyor",
    category: "Temizlik",
    budget: "1.500",
    location: "Şişli",
    description:
      "Yarın sabah 09:00'da başlayacak ev temizliği için yardımcı aranıyor.",
    timeAgo: "8 saat önce",
  },
  {
    id: 7,
    title: "Acil su tesisatı tamiri",
    category: "Tesisat",
    budget: "500 - 800",
    location: "Kadıköy",
    description: "Musluktan su sızıntısı var. Acil müdahale gerekiyor.",
    timeAgo: "30 dakika önce",
  },
  {
    id: 8,
    title: "Mobilya montajı (IKEA)",
    category: "Marangoz",
    budget: "400 - 600",
    location: "Beşiktaş",
    description: "IKEA'dan alınan dolap ve yatak montajı yapılacak.",
    timeAgo: "4 saat önce",
  },
  {
    id: 9,
    title: "Düğün fotoğrafçısı aranıyor",
    category: "Fotoğrafçı",
    budget: "5.000 - 8.000",
    location: "Beylikdüzü",
    description: "15 gün sonra düğünümüz var. Profesyonel fotoğrafçı aranıyor.",
    timeAgo: "12 saat önce",
  },
  {
    id: 10,
    title: "Matematik özel ders",
    category: "Eğitim",
    budget: "200 - 300",
    location: "Üsküdar",
    description: "Lise öğrencisi için haftada 2 gün matematik özel ders.",
    timeAgo: "1 gün önce",
  },
  {
    id: 11,
    title: "Bahçe bakımı ve çim biçme",
    category: "Bahçıvan",
    budget: "800 - 1.200",
    location: "Ataşehir",
    description: "200 m² bahçe için çim biçme ve genel bakım.",
    timeAgo: "2 gün önce",
  },
  {
    id: 12,
    title: "Catering hizmeti (50 kişi)",
    category: "Yemek",
    budget: "4.000 - 6.000",
    location: "Kartal",
    description: "Doğum günü için 50 kişilik catering hizmeti aranıyor.",
    timeAgo: "5 saat önce",
  },
  {
    id: 13,
    title: "Pantolon kısaltma",
    category: "Dikiş",
    budget: "50 - 100",
    location: "Bakırköy",
    description: "2 pantolon kısaltılacak. Acil değil.",
    timeAgo: "1 gün önce",
  },
  {
    id: 14,
    title: "Klima montajı",
    category: "Elektrik",
    budget: "600 - 1.000",
    location: "Maltepe",
    description: "Split klima montajı yapılacak. 3. kat.",
    timeAgo: "3 saat önce",
  },
  {
    id: 15,
    title: "Ofis temizliği (haftalık)",
    category: "Temizlik",
    budget: "1.000 - 1.500",
    location: "Mecidiyeköy",
    description: "200 m² ofis için haftalık temizlik hizmeti.",
    timeAgo: "1 gün önce",
  },
  {
    id: 16,
    title: "Kombi bakımı ve temizlik",
    category: "Tesisat",
    budget: "500 - 700",
    location: "Pendik",
    description: "Yıllık kombi bakımı ve temizliği yapılacak.",
    timeAgo: "6 saat önce",
  },
  {
    id: 17,
    title: "Kapı tamiri",
    category: "Marangoz",
    budget: "300 - 500",
    location: "Ümraniye",
    description: "Ahşap kapı tamiri ve cilalama.",
    timeAgo: "4 saat önce",
  },
  {
    id: 18,
    title: "Parça eşya taşıma",
    category: "Nakliyat",
    budget: "400 - 600",
    location: "Kadıköy - Beşiktaş",
    description: "Küçük eşyaların taşınması gerekiyor.",
    timeAgo: "2 saat önce",
  },
  {
    id: 19,
    title: "Saç kesimi ve fön",
    category: "Kuaför",
    budget: "200 - 400",
    location: "Nişantaşı",
    description: "Kadın saç kesimi ve fön yapılacak.",
    timeAgo: "1 saat önce",
  },
  {
    id: 20,
    title: "Kişisel antrenör",
    category: "Fitness",
    budget: "400 - 600",
    location: "Etiler",
    description: "Haftada 3 gün kişisel antrenör aranıyor.",
    timeAgo: "1 gün önce",
  },
  {
    id: 21,
    title: "Ağaç budama",
    category: "Bahçıvan",
    budget: "300 - 500",
    location: "Beykoz",
    description: "Bahçedeki 5 ağacın budanması gerekiyor.",
    timeAgo: "3 gün önce",
  },
  {
    id: 22,
    title: "Portre fotoğraf çekimi",
    category: "Fotoğrafçı",
    budget: "800 - 1.200",
    location: "Bebek",
    description: "Profesyonel portre fotoğraf çekimi.",
    timeAgo: "5 saat önce",
  },
];

export default mockJobs;
