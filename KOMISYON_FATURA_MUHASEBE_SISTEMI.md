# HizmetGo Komisyon & Fatura & Muhasebe Otomasyon Sistemi

## 📋 Sistem Özeti

Bu sistem, HizmetGo platformunda sipariş tamamlandığında otomatik olarak:
1. Komisyon, KDV, ödeme sistemi fee ve referans fee hesaplar
2. Partner'a fatura oluşturur
3. Muhasebe kayıtlarını (ledger entries) oluşturur
4. Wallet transaction'larını kaydeder
5. Muhasebe sistemine (Paraşüt/Logo/Mikro) entegre eder

## 🏗️ Mimari

### 1. Fee & Vergi Konfigürasyonu
**Dosya:** `lib/fees/config.ts`

- KDV oranı: %20
- Ödeme sistemi fee: %4 (sipariş toplamı üzerinden)
- Base referans fee: %25 (komisyon üzerinden)
- Platform net gelir: %51

### 2. Hesaplama Motoru
**Dosya:** `lib/fees/calculator.ts`

**Girdi:**
- `orderAmount`: Sipariş toplam tutarı (KDV dahil)
- `commissionGross`: Partner'a gösterilen komisyon (KDV dahil)
- `userReferralRate`: Kullanıcıya özel referans fee oranı

**Çıktı (FeeBreakdown):**
- `netCommission`: KDV hariç komisyon
- `vatFromCommission`: Komisyon içindeki KDV
- `referralFee`: Referans fee (TL)
- `paymentFee`: Ödeme sistemi fee (TL)
- `platformNet`: Platform net gelir (KDV hariç)
- `vatOnPlatformNet`: Platform net üzerinden KDV
- `invoiceTotal`: Fatura toplam tutarı

### 3. Referans Rate Hesaplama
**Dosya:** `lib/fees/referralEngine.ts`

- `getUserReferralRate(userId)`: Kullanıcının level, rank ve customRate'ine göre dinamik rate hesaplar
- Level bonusları: L1 +%10, L2 +%6, L3 +%5, L4 +%3, L5 +%1
- Rank bonusu: rank * %2

### 4. Invoice ve Ledger Entry Oluşturma
**Dosya:** `lib/services/invoiceLedgerService.ts`

Sipariş tamamlandığında:
1. Invoice kaydı oluşturur
2. Ledger Entry kayıtları oluşturur:
   - `PLATFORM_NET_REVENUE`: Platform net geliri
   - `REFERRAL_FEE_EXPENSE`: Referans fee gideri
   - `PAYMENT_FEE_EXPENSE`: Ödeme sistemi fee gideri
   - `VAT_LIABILITY`: KDV yükümlülüğü
3. Wallet Transaction kayıtları oluşturur:
   - Referral fee'yi L1-L5 zincirine böler
   - Partner net kazancını kaydeder

### 5. Fatura Servisi
**Dosya:** `lib/invoice/invoiceService.ts`

- `createInvoice()`: Invoice oluşturur
- `createInvoicePdf()`: PDF oluşturur (şimdilik HTML, ileride puppeteer ile PDF)
- `getPartnerInvoices()`: Partner'ın faturalarını listeler
- `getInvoiceDetail()`: Invoice detayını getirir

### 6. Muhasebe Entegrasyonu
**Dosya:** `lib/accounting/accountingProvider.ts` ve `mockProvider.ts`

- `AccountingProvider` interface: Paraşüt/Logo/Mikro entegrasyonu için
- `MockAccountingProvider`: Test ve geliştirme için mock implementasyon
- `createSalesInvoice()`: e-Fatura / e-Arşiv faturası oluşturur
- `exportLedger()`: Muhasebe kayıtlarını export eder

## 📊 Veritabanı Modelleri

### Invoice
- Partner ID, Order ID
- Komisyon (KDV dahil), Referral fee, Payment fee
- Platform net, KDV, Toplam fatura tutarı
- PDF URL, External accounting ID

### LedgerEntry
- Invoice ID, Order ID, User ID
- Type (PLATFORM_NET_REVENUE, REFERRAL_FEE_EXPENSE, vb.)
- Amount, Currency

### WalletTransaction
- User ID, Order ID
- Type (REFERRAL_INCOME, PARTNER_INCOME, vb.)
- Amount, Description

### UserReferralProfile
- User ID (unique)
- Level (0-5), Rank (0-4)
- Custom Rate (opsiyonel)

## 🔄 Sipariş Tamamlama Akışı

1. Vendor siparişi tamamlar → `/api/orders/[id]/complete`
2. `updateOrderStatus()` → `COMPLETED` durumuna geçer
3. `createInvoiceAndLedgerEntries()` çağrılır:
   - Fee breakdown hesaplanır
   - Invoice oluşturulur
   - Ledger entries oluşturulur
   - Wallet transactions oluşturulur
   - Muhasebe sistemine gönderilir (async)

## 🎨 UI Sayfaları

### Partner Tarafı
- `/partner/invoices`: Fatura listesi
- `/partner/invoices/[id]`: Fatura detayı

### Admin Tarafı
- `/admin/finance/invoices`: Tüm faturalar, filtreler, özet istatistikler

## 📝 Örnek Hesaplama

**Girdi:**
- Sipariş toplamı: 1000 TL
- Komisyon (KDV dahil): 100 TL

**Hesaplama:**
1. Net komisyon = 100 / 1.20 = 83.33 TL
2. KDV (komisyon içinde) = 100 - 83.33 = 16.67 TL
3. Referral fee = 83.33 * 0.25 = 20.83 TL
4. Payment fee = 1000 * 0.04 = 40 TL
5. Platform net = 83.33 - 20.83 - 40 = 22.50 TL
6. KDV (platform net üzerinden) = 22.50 * 0.20 = 4.50 TL
7. Fatura toplamı = 22.50 + 4.50 = 27.00 TL

## 🧪 Test Senaryoları

1. **100 TL komisyon, 1000 TL sipariş:**
   - Fee breakdown doğru mu?
   - Dağılım oranları tutarlı mı?

2. **Farklı referral rate:**
   - Referral fee artınca platform net azalıyor mu?
   - Ledger entries doğru mu?

3. **Ödeme fee:**
   - Sipariş toplamı üzerinden %4 hesaplanıyor mu?

4. **Invoice oluşturma:**
   - Tüm kalemler doğru mu?
   - Muhasebe entegrasyonu çalışıyor mu?

## 🚀 Migration

Migration dosyası: `supabase/migrations/05_fee_invoice_ledger.sql`

Çalıştırma:
```bash
npx prisma migrate dev --name add_fee_invoice_ledger_models
```

## 📌 Notlar

- Tüm tutarlar Decimal tipinde (hassasiyet için)
- Invoice oluşturma transaction içinde (atomic)
- Muhasebe entegrasyonu async (hata durumunda invoice oluşturulmuş olarak kalır)
- PDF oluşturma şimdilik HTML, ileride puppeteer ile PDF'e çevrilecek
- Referral fee L1-L5 dağıtımı referralRelation modeline bağlı (şimdilik basit implementasyon)

## 🔧 İleride Yapılacaklar

1. Puppeteer ile PDF oluşturma
2. Paraşüt/Logo/Mikro gerçek entegrasyonu
3. e-Fatura / e-Arşiv entegrasyonu
4. Referral fee L1-L5 dağıtımı iyileştirme
5. Admin dashboard'da finansal raporlar

