import { Keyword } from "../store/AppStateContext";

export const mockKeywords: Keyword[] = [
  {
    id: "k1",
    label: "elektrik",
    categoryId: "cat-electric",
    tags: ["elektrikçi", "elektrik arızası", "priz", "aydınlatma"],
  },
  {
    id: "k2",
    label: "su tesisatı",
    categoryId: "cat-plumbing",
    tags: ["tesisatçı", "su kaçağı", "musluk", "kombi"],
  },
  {
    id: "k3",
    label: "boya badana",
    categoryId: "cat-paint",
    tags: ["bina boyama", "ev boyama", "duvar", "dış cephe"],
  },
  {
    id: "k4",
    label: "temizlik",
    categoryId: "cat-cleaning",
    tags: [
      "günlük temizlik",
      "detaylı temizlik",
      "ev temizliği",
      "ofis temizliği",
    ],
  },
  {
    id: "k5",
    label: "marangoz",
    categoryId: "cat-carpenter",
    tags: ["mobilya", "kapı", "pencere", "tamir"],
  },
  {
    id: "k6",
    label: "nakliyat",
    categoryId: "cat-moving",
    tags: ["evden eve", "taşıma", "eşya", "kamyon"],
  },
  {
    id: "k7",
    label: "kuaför",
    categoryId: "cat-hairdresser",
    tags: ["saç kesimi", "saç boyama", "fön", "makyaj"],
  },
  {
    id: "k8",
    label: "bahçıvan",
    categoryId: "cat-gardener",
    tags: ["bahçe bakımı", "ağaç budama", "peyzaj", "çim biçme"],
  },
  {
    id: "k9",
    label: "fotoğrafçı",
    categoryId: "cat-photographer",
    tags: ["düğün", "portre", "video", "çekim"],
  },
  {
    id: "k10",
    label: "özel ders",
    categoryId: "cat-tutoring",
    tags: ["matematik", "fizik", "kimya", "eğitim"],
  },
  {
    id: "k11",
    label: "evcil hayvan",
    categoryId: "cat-pet",
    tags: ["köpek gezdirme", "bakıcı", "pansiyon", "pet"],
  },
  {
    id: "k12",
    label: "yemek",
    categoryId: "cat-food",
    tags: ["catering", "özel yemek", "pasta", "düğün yemeği"],
  },
  {
    id: "k13",
    label: "dikiş",
    categoryId: "cat-sewing",
    tags: ["terzi", "tamir", "kısaltma", "özel dikim"],
  },
  {
    id: "k14",
    label: "fitness",
    categoryId: "cat-fitness",
    tags: ["antrenör", "spor", "egzersiz", "kişisel antrenör"],
  },
];

export default mockKeywords;
