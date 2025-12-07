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
});

export const updateBusinessSchema = createBusinessSchema.partial();

export const updateOnlineStatusSchema = z.object({
  onlineStatus: z.enum(["ONLINE", "OFFLINE", "AUTO_OFFLINE"]),
});
