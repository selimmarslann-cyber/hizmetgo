# Profil > Faturalandırma Sayfası

## ✅ Tamamlanan İşler

### 1. Prisma Modeli ✅
- `UserBillingProfile` modeli eklendi
- Migration dosyası: `supabase/migrations/06_user_billing_profile.sql`

### 2. Service Layer ✅
- `lib/billing/billingService.ts` - `getUserBillingProfile()`, `upsertUserBillingProfile()`
- `lib/billing/isBillingComplete.ts` - `isUserBillingComplete()` helper fonksiyonu

### 3. Zod Schema ✅
- `lib/billing/billingSchema.ts` - Form validasyonu için Zod schema
- Conditional validation (PERSONAL vs COMPANY)

### 4. API Route ✅
- `app/api/profile/billing/route.ts`
  - GET: Fatura profilini getir
  - POST: Fatura profilini oluştur/güncelle

### 5. UI Sayfası ✅
- `app/(authenticated)/profile/faturalandirma/page.tsx` - Server component
- `app/(authenticated)/profile/faturalandirma/BillingPageClient.tsx` - Ana sayfa client component
- `app/(authenticated)/profile/faturalandirma/BillingForm.tsx` - Form component

### 6. Helper Fonksiyon ✅
- `lib/billing/isBillingComplete.ts` - Fatura bilgileri tamamlanmış mı kontrolü

### 7. Fatura Motoruyla Entegrasyon ✅
- `lib/invoice/invoiceService.ts` güncellendi
- `lib/services/invoiceLedgerService.ts` güncellendi
- `lib/accounting/accountingProvider.ts` güncellendi (billingType, taxOffice, address eklendi)
- `invoiceDeliveryMethod`'a göre işlem yapılıyor:
  - `E_ARCHIVE`: Muhasebe sistemine gönderilir
  - `PDF_ONLY`: Sadece sistemde PDF üretilir
  - `MANUAL_UPLOAD`: Kullanıcı kendi faturasını yükler (TODO)

### 8. UX Detayları ✅
- Uyarı bannerları (isComplete durumuna göre)
- Form açıklama metinleri
- Özet kartı gösterimi

## 📋 Özellikler

### Fatura Tipi
- **Şahıs (PERSONAL)**: Ad Soyad, TCKN
- **Şirket (COMPANY)**: Firma Ünvanı, Vergi No

### Ortak Alanlar
- Vergi Dairesi
- Ülke (default: Türkiye)
- Şehir
- İlçe (opsiyonel)
- Adres
- IBAN

### Fatura Teslimat Yöntemi
1. **PDF_ONLY**: Sadece PDF (Hesabım + e-posta)
2. **E_ARCHIVE**: e-Arşiv entegrasyonu ile otomatik
3. **MANUAL_UPLOAD**: Kendim fatura kesiyorum, sadece bilgilerimi sakla

## 🔄 İş Akışı

1. Kullanıcı `/profile/faturalandirma` sayfasına gider
2. Eğer profil yoksa form gösterilir
3. Eğer profil varsa özet kartı gösterilir, "Bilgileri Düzenle" butonu ile form açılabilir
4. Form doldurulup kaydedilir
5. `isComplete` otomatik hesaplanır:
   - PERSONAL: fullName + tckn + taxOffice + city + addressLine + iban doluysa `true`
   - COMPANY: companyName + taxNumber + taxOffice + city + addressLine + iban doluysa `true`

## 🔗 Entegrasyon

### Sipariş Tamamlandığında
- `createInvoiceAndLedgerEntries()` fonksiyonu `getUserBillingProfile()` çağırır
- `invoiceDeliveryMethod`'a göre:
  - `E_ARCHIVE`: `AccountingProvider.createSalesInvoice()` çağrılır
  - `PDF_ONLY`: PDF oluşturulur (createInvoicePdf)
  - `MANUAL_UPLOAD`: Sadece Invoice kaydı oluşturulur (TODO: fatura yükleme sayfası)

## 📝 Kullanım Örnekleri

### Helper Fonksiyon Kullanımı
```typescript
import { isUserBillingComplete } from "@/lib/billing/isBillingComplete";

const isComplete = await isUserBillingComplete(userId);
if (!isComplete) {
  // Fatura bilgileri eksik uyarısı göster
}
```

### API Kullanımı
```typescript
// GET - Fatura profilini getir
const res = await fetch("/api/profile/billing", {
  credentials: "include",
});
const { billingProfile } = await res.json();

// POST - Fatura profilini kaydet
const res = await fetch("/api/profile/billing", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    billingType: "PERSONAL",
    fullName: "Ahmet Yılmaz",
    tckn: "12345678901",
    // ...
  }),
});
```

## 🚀 Migration

```bash
npx prisma migrate dev --name add_user_billing_profile
```

Veya Supabase migration:
```sql
-- supabase/migrations/06_user_billing_profile.sql dosyasını çalıştır
```

## 📌 Notlar

- Tüm form validasyonları Zod schema ile yapılıyor
- `isComplete` otomatik hesaplanıyor (manuel set edilmiyor)
- Fatura teslimat yöntemi seçimine göre farklı işlemler yapılıyor
- e-Arşiv entegrasyonu için billing profile bilgileri kullanılıyor
- MANUAL_UPLOAD için ileride fatura yükleme sayfası eklenecek (TODO)

