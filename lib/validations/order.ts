import { z } from "zod";

export const createOrderSchema = z.object({
  businessId: z.string().uuid(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
  addressText: z.string().min(5, "Adres en az 5 karakter olmalı"),
  locationLat: z.number().optional(),
  locationLng: z.number().optional(),
  scheduledAt: z.string().datetime().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING_CONFIRMATION",
    "ACCEPTED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED_BY_CUSTOMER",
    "CANCELLED_BY_PROVIDER",
  ]),
});
