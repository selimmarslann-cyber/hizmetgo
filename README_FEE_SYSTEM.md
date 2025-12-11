# HizmetGo Komisyon & Fatura & Muhasebe Otomasyon Sistemi

## ✅ Tamamlanan İşler

### 1. Fee & Vergi Konfigürasyonu ✅
- `lib/fees/config.ts` oluşturuldu
- KDV %20, Payment fee %4, Base referral %25, Platform net %51
- `getFeeConfig()`, `validateDistribution()` fonksiyonları

### 2. Prisma Schema Güncellemesi ✅
- `Invoice` modeli eklendi
- `LedgerEntry` modeli eklendi
- `WalletTransaction` modeli eklendi
- `UserReferralProfile` modeli eklendi
- Migration dosyası: `supabase/migrations/05_fee_invoice_ledger.sql`

### 3. Hesaplama Motoru ✅
- `lib/fees/calculator.ts` oluşturuldu
- `calculateFeeBreakdown()` fonksiyonu
- `validateFeeBreakdown()` doğrulama fonksiyonu
- Tüm fee hesaplamaları Decimal tipinde

### 4. Referans Rate Hesaplama ✅
- `lib/fees/referralEngine.ts` oluşturuldu
- `getUserReferralRate()` dinamik rate hesaplama
- Level ve rank bonusları
- Custom rate desteği

### 5. Sipariş Tamamlama Webhook ✅
- `lib/services/invoiceLedgerService.ts` oluşturuldu
- `createInvoiceAndLedgerEntries()` fonksiyonu
- `orderService.ts` güncellendi - COMPLETED durumunda invoice oluşturma
- Transaction içinde atomic işlemler

### 6. Fatura PDF & Görünüm ✅
- `lib/invoice/invoiceService.ts` oluşturuldu
- Partner UI: `/partner/invoices` ve `/partner/invoices/[id]`
- Admin UI: `/admin/finance/invoices`
- PDF endpoint: `/api/invoices/[id]/pdf` (şimdilik HTML)

### 7. Muhasebe Entegrasyonu ✅
- `lib/accounting/accountingProvider.ts` interface
- `lib/accounting/mockProvider.ts` mock implementasyon
- `createSalesInvoice()` ve `exportLedger()` fonksiyonları
- İleride Paraşüt/Logo/Mikro entegrasyonu için hazır

### 8. Test & Doğrulama ✅
- `lib/fees/__tests__/calculator.test.ts` unit testler
- `lib/fees/__tests__/calculator.integration.test.ts` entegrasyon testleri
- Senaryo bazlı testler

## 📊 Örnek Hesaplama

**Girdi:**
- Sipariş toplamı: 1000 TL
- Komisyon (KDV dahil): 100 TL
- Referral rate: %25 (base)

**Hesaplama:**
1. Net komisyon = 100 / 1.20 = **83.33 TL**
2. KDV (komisyon içinde) = 100 - 83.33 = **16.67 TL**
3. Referral fee = 83.33 * 0.25 = **20.83 TL**
4. Payment fee = 1000 * 0.04 = **40 TL**
5. Platform net = 83.33 - 20.83 - 40 = **22.50 TL**
6. KDV (platform net üzerinden) = 22.50 * 0.20 = **4.50 TL**
7. Fatura toplamı = 22.50 + 4.50 = **27.00 TL**

## 🔄 Sipariş Tamamlama Akışı

```
1. Vendor siparişi tamamlar
   ↓
2. /api/orders/[id]/complete endpoint
   ↓
3. updateOrderStatus() → COMPLETED
   ↓
4. createInvoiceAndLedgerEntries() çağrılır:
   - Fee breakdown hesaplanır
   - Invoice oluşturulur
   - Ledger entries oluşturulur
   - Wallet transactions oluşturulur
   ↓
5. Muhasebe sistemine gönderilir (async)
```

## 📁 Dosya Yapısı

```
lib/
├── fees/
│   ├── config.ts                    # Fee konfigürasyonu
│   ├── calculator.ts                # Fee hesaplama motoru
│   ├── referralEngine.ts            # Referral rate hesaplama
│   └── __tests__/
│       ├── calculator.test.ts       # Unit testler
│       └── calculator.integration.test.ts
├── invoice/
│   └── invoiceService.ts            # Fatura servisi
├── accounting/
│   ├── accountingProvider.ts        # Muhasebe provider interface
│   └── mockProvider.ts              # Mock implementasyon
└── services/
    └── invoiceLedgerService.ts       # Invoice ve ledger oluşturma

app/
├── (authenticated)/
│   ├── partner/
│   │   └── invoices/                # Partner fatura sayfaları
│   └── admin/
│       └── finance/
│           └── invoices/            # Admin fatura sayfaları
└── api/
    ├── partner/invoices/             # Partner invoice API
    ├── admin/invoices/               # Admin invoice API
    └── invoices/[id]/pdf/            # PDF endpoint
```

## 🚀 Migration Çalıştırma

```bash
# Prisma migration
npx prisma migrate dev --name add_fee_invoice_ledger_models

# Veya Supabase migration
# supabase/migrations/05_fee_invoice_ledger.sql dosyasını çalıştır
```

## 📌 Önemli Notlar

1. **Decimal Kullanımı**: Tüm para hesaplamaları Decimal tipinde (hassasiyet için)
2. **Transaction Güvenliği**: Invoice oluşturma transaction içinde (atomic)
3. **Async İşlemler**: Muhasebe entegrasyonu async (hata durumunda invoice oluşturulmuş olarak kalır)
4. **Referral Fee Dağıtımı**: L1-L5 zincirine dağıtım ReferralRelation modeline bağlı
5. **PDF Oluşturma**: Şimdilik HTML, ileride puppeteer ile PDF'e çevrilecek

## 🔧 İleride Yapılacaklar

1. Puppeteer ile PDF oluşturma
2. Paraşüt/Logo/Mikro gerçek entegrasyonu
3. e-Fatura / e-Arşiv entegrasyonu
4. Referral fee L1-L5 dağıtımı iyileştirme (şu an L1-L2, L3-L5 eklenecek)
5. Admin dashboard'da finansal raporlar ve grafikler

## 🧪 Test Senaryoları

1. ✅ 100 TL komisyon, 1000 TL sipariş - Fee breakdown doğru mu?
2. ✅ Farklı referral rate - Platform net azalıyor mu?
3. ✅ Ödeme fee - Sipariş toplamı üzerinden %4 hesaplanıyor mu?
4. ✅ Invoice oluşturma - Tüm kalemler doğru mu?
5. ✅ Muhasebe entegrasyonu - External ID kaydediliyor mu?

## 📝 API Endpoints

- `POST /api/orders/[id]/complete` - Sipariş tamamlama (invoice oluşturur)
- `GET /api/partner/invoices` - Partner faturaları listesi
- `GET /api/partner/invoices/[id]` - Partner fatura detayı
- `GET /api/admin/invoices` - Admin fatura listesi (filtrelerle)
- `GET /api/invoices/[id]/pdf` - Fatura PDF (HTML)

Tüm sistem TypeScript ile yazıldı, modüler yapıda ve test edilebilir.

