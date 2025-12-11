"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BillingFormSchema,
  BillingFormValues,
  InvoiceDeliveryMethod,
} from "@/lib/billing/billingSchema";
import { useToast } from "@/lib/hooks/useToast";
interface BillingFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel?: () => void;
}
export default function BillingForm({
  initialData,
  onSuccess,
  onCancel,
}: BillingFormProps) {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BillingFormValues>({
    resolver: zodResolver(BillingFormSchema),
    defaultValues: {
      billingType: initialData?.billingType || "PERSONAL",
      fullName: initialData?.fullName || "",
      tckn: initialData?.tckn || "",
      companyName: initialData?.companyName || "",
      taxNumber: initialData?.taxNumber || "",
      taxOffice: initialData?.taxOffice || "",
      country: initialData?.country || "Türkiye",
      city: initialData?.city || "",
      district: initialData?.district || "",
      addressLine: initialData?.addressLine || "",
      iban: initialData?.iban || "",
      invoiceDeliveryMethod:
        (initialData?.invoiceDeliveryMethod as InvoiceDeliveryMethod) ||
        "PDF_ONLY",
    },
  });
  const billingType = watch("billingType");
  const onSubmit = async (data: BillingFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        success("Fatura bilgileriniz kaydedildi.");
        onSuccess();
      } else {
        const errorData = await res.json();
        error(errorData.error || "Fatura bilgileri kaydedilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Fatura Tipi */}
      <div>
        <Label>Fatura Tipi *</Label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="PERSONAL"
              checked={billingType === "PERSONAL"}
              onChange={() => setValue("billingType", "PERSONAL")}
              className="w-4 h-4"
            />
            <span>Şahıs</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="COMPANY"
              checked={billingType === "COMPANY"}
              onChange={() => setValue("billingType", "COMPANY")}
              className="w-4 h-4"
            />
            <span>Şirket</span>
          </label>
        </div>
        {errors.billingType && (
          <p className="text-sm text-red-500 mt-1">
            {errors.billingType.message}
          </p>
        )}
      </div>
      {/* Şahıs Alanları */}
      {billingType === "PERSONAL" && (
        <>
          <div>
            <Label htmlFor="fullName">Ad Soyad *</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              className="mt-1"
              placeholder="Ad Soyad"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="tckn">TCKN *</Label>
            <Input
              id="tckn"
              {...register("tckn")}
              className="mt-1"
              placeholder="11 haneli TCKN"
              maxLength={11}
            />
            {errors.tckn && (
              <p className="text-sm text-red-500 mt-1">
                {errors.tckn.message}
              </p>
            )}
          </div>
        </>
      )}
      {/* Şirket Alanları */}
      {billingType === "COMPANY" && (
        <>
          <div>
            <Label htmlFor="companyName">Firma Ünvanı *</Label>
            <Input
              id="companyName"
              {...register("companyName")}
              className="mt-1"
              placeholder="Firma Ünvanı"
            />
            {errors.companyName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="taxNumber">Vergi No *</Label>
            <Input
              id="taxNumber"
              {...register("taxNumber")}
              className="mt-1"
              placeholder="Vergi Numarası"
            />
            {errors.taxNumber && (
              <p className="text-sm text-red-500 mt-1">
                {errors.taxNumber.message}
              </p>
            )}
          </div>
        </>
      )}
      {/* Ortak Alanlar */}
      <div>
        <Label htmlFor="taxOffice">Vergi Dairesi *</Label>
        <Input
          id="taxOffice"
          {...register("taxOffice")}
          className="mt-1"
          placeholder="Vergi Dairesi"
        />
        {errors.taxOffice && (
          <p className="text-sm text-red-500 mt-1">
            {errors.taxOffice.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="country">Ülke *</Label>
        <Input
          id="country"
          {...register("country")}
          className="mt-1"
          placeholder="Ülke"
          defaultValue="Türkiye"
        />
        {errors.country && (
          <p className="text-sm text-red-500 mt-1">
            {errors.country.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="city">Şehir *</Label>
        <Input
          id="city"
          {...register("city")}
          className="mt-1"
          placeholder="Şehir"
        />
        {errors.city && (
          <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="district">İlçe</Label>
        <Input
          id="district"
          {...register("district")}
          className="mt-1"
          placeholder="İlçe (Opsiyonel)"
        />
        {errors.district && (
          <p className="text-sm text-red-500 mt-1">
            {errors.district.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="addressLine">Adres *</Label>
        <Textarea
          id="addressLine"
          {...register("addressLine")}
          className="mt-1"
          placeholder="Adres"
          rows={3}
        />
        {errors.addressLine && (
          <p className="text-sm text-red-500 mt-1">
            {errors.addressLine.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="iban">IBAN *</Label>
        <Input
          id="iban"
          {...register("iban")}
          className="mt-1"
          placeholder="TR..."
          style={{ textTransform: "uppercase" }}
        />
        {errors.iban && (
          <p className="text-sm text-red-500 mt-1">{errors.iban.message}</p>
        )}
      </div>
      {/* Fatura Teslimat Yöntemi */}
      <div>
        <Label htmlFor="invoiceDeliveryMethod">
          Faturayı nasıl almak istiyorsunuz? *
        </Label>
        <Select
          value={watch("invoiceDeliveryMethod")}
          onValueChange={(value) =>
            setValue("invoiceDeliveryMethod", value as InvoiceDeliveryMethod)
          }
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Fatura teslimat yöntemi seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PDF_ONLY">
              Sadece PDF (Hesabım + e-posta)
            </SelectItem>
            <SelectItem value="E_ARCHIVE">
              e-Arşiv entegrasyonu ile otomatik
            </SelectItem>
            <SelectItem value="MANUAL_UPLOAD">
              Kendim fatura kesiyorum, sadece bilgilerimi sakla
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.invoiceDeliveryMethod && (
          <p className="text-sm text-red-500 mt-1">
            {errors.invoiceDeliveryMethod.message}
          </p>
        )}
        {/* Açıklama Metinleri */}
        <div className="mt-2 text-sm text-gray-600 space-y-1">
          {watch("invoiceDeliveryMethod") === "PDF_ONLY" && (
            <p>
              Faturalarınız panelden indirilebilir ve e-posta ile size
              gönderilir.
            </p>
          )}
          {watch("invoiceDeliveryMethod") === "E_ARCHIVE" && (
            <p>
              Uygun entegrasyon aktif olduğunda, faturalarınız otomatik olarak
              e-Arşiv üzerinden düzenlenecektir.
            </p>
          )}
          {watch("invoiceDeliveryMethod") === "MANUAL_UPLOAD" && (
            <p>
              Kendi faturanızı kesiyorsanız, sadece bilgileriniz HizmetGo
              sistemi için saklanır.
            </p>
          )}
        </div>
      </div>
      {/* Butonlar */}
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
        )}
      </div>
    </form>
  );
}