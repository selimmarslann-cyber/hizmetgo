import { z } from "zod";

export const businessCategorySchema = z.enum([
  "TESISAT",
  "KUAFOR",
  "MARKET",
  "NAKLIYE",
  "TEMIZLIK",
  "ELEKTRIK",
  "BOYA",
  "MARANGOZ",
  "DIGER",
]);

export const createBusinessSchema = z.object({
  name: z.string().min(2, "İşletme adı en az 2 karakter olmalı"),
  description: z.string().optional(),
  category: businessCategorySchema,
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  addressText: z.string().min(5, "Adres en az 5 karakter olmalı"),
  coverImageUrl: z.string().url().optional().nullable(),
  workingHoursJson: z
    .record(
      z.string(),
      z
        .object({
          open: z.string(),
          close: z.string(),
        })
        .nullable(),
    )
    .optional(),
  // İletişim Bilgileri
  phone: z.string().min(10, "Geçerli bir telefon numarası girin").optional(),
  email: z.string().email("Geçerli bir e-posta adresi girin").optional(),
  whatsapp: z.string().optional(),
  website: z.string().url("Geçerli bir web sitesi URL'i girin").optional().nullable(),
  // Yasal Belgeler
  taxDocumentUrl: z.string().url().optional().nullable(),
  idDocumentUrl: z.string().url().optional().nullable(),
  licenseUrl: z.string().url().optional().nullable(),
  // Finansal Bilgiler
  iban: z.string().optional(),
  accountHolder: z.string().optional(),
  bankName: z.string().optional(),
  taxNumber: z.string().optional(),
  taxOffice: z.string().optional(),
  // Teslimat Bilgileri
  hasDelivery: z.boolean().optional(),
  minOrderAmount: z.number().min(0).optional().nullable(),
  deliveryRadius: z.number().min(0).optional().nullable(),
  deliveryFee: z.number().min(0).optional().nullable(),
  deliveryTime: z.number().min(0).optional().nullable(),
  freeDeliveryThreshold: z.number().min(0).optional().nullable(),
});

export const updateBusinessSchema = createBusinessSchema.partial();

export const updateOnlineStatusSchema = z.object({
  onlineStatus: z.enum(["ONLINE", "OFFLINE", "AUTO_OFFLINE"]),
});
