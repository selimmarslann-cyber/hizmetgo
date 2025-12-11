/**
 * Billing Profile Zod Schema
 * 
 * Fatura profili form validasyonu için Zod schema tanımları.
 */

import { z } from "zod";

/**
 * Fatura tipi enum
 */
export const BillingTypeEnum = z.enum(["PERSONAL", "COMPANY"]);

/**
 * Fatura teslimat yöntemi enum
 */
export const InvoiceDeliveryMethodEnum = z.enum([
  "PDF_ONLY",
  "E_ARCHIVE",
  "MANUAL_UPLOAD",
]);

/**
 * Billing form schema
 * 
 * Conditional validation:
 * - PERSONAL: fullName, tckn zorunlu
 * - COMPANY: companyName, taxNumber zorunlu
 */
export const BillingFormSchema = z
  .object({
    billingType: BillingTypeEnum,
    fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır").optional(),
    tckn: z
      .string()
      .regex(/^\d{11}$/, "TCKN 11 haneli olmalıdır")
      .optional(),
    companyName: z
      .string()
      .min(2, "Firma ünvanı en az 2 karakter olmalıdır")
      .optional(),
    taxNumber: z
      .string()
      .min(10, "Vergi numarası en az 10 karakter olmalıdır")
      .optional(),
    taxOffice: z.string().min(2, "Vergi dairesi zorunludur"),
    country: z.string().min(1, "Ülke zorunludur"),
    city: z.string().min(2, "Şehir zorunludur"),
    district: z.string().optional(),
    addressLine: z.string().min(5, "Adres en az 5 karakter olmalıdır"),
    iban: z
      .string()
      .min(10, "IBAN en az 10 karakter olmalıdır")
      .regex(/^TR/i, "IBAN TR ile başlamalıdır"),
    invoiceDeliveryMethod: InvoiceDeliveryMethodEnum,
  })
  .refine(
    (data) => {
      // PERSONAL ise: fullName ve tckn zorunlu
      if (data.billingType === "PERSONAL") {
        return !!data.fullName && !!data.tckn;
      }
      return true;
    },
    {
      message: "Şahıs için ad soyad ve TCKN zorunludur",
      path: ["fullName"],
    },
  )
  .refine(
    (data) => {
      // COMPANY ise: companyName ve taxNumber zorunlu
      if (data.billingType === "COMPANY") {
        return !!data.companyName && !!data.taxNumber;
      }
      return true;
    },
    {
      message: "Şirket için firma ünvanı ve vergi numarası zorunludur",
      path: ["companyName"],
    },
  );

/**
 * Billing form values type
 */
export type BillingFormValues = z.infer<typeof BillingFormSchema>;

/**
 * Billing type enum values
 */
export type BillingType = z.infer<typeof BillingTypeEnum>;

/**
 * Invoice delivery method enum values
 */
export type InvoiceDeliveryMethod = z.infer<typeof InvoiceDeliveryMethodEnum>;

