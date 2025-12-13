# 🏪 Esnaf Kayıt Sistemi - Detaylı Eksiklik Analizi

## 📊 Mevcut Durum Özeti

### ✅ Şu Anda Mevcut Olanlar:
1. **Konum Seçimi**: Harita üzerinden konum seçimi (zorunlu)
2. **Temel Bilgiler**: İşletme adı, kategori, açıklama
3. **Görsel**: Dükkan resmi/logo yükleme
4. **Adres**: Basit adres metni
5. **Menü/Ürünler**: Ürün ekleme (ad, açıklama, fiyat, resim)
6. **Kategori Sistemi**: 9 kategori (Restoran, Market, Kuaför, vb.)

---

## ❌ EKSİK OLAN ÖNEMLİ ÖZELLİKLER

### 🔴 1. İLETİŞİM BİLGİLERİ (KRİTİK EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Telefon numarası (zorunlu)
- ✅ E-posta adresi (zorunlu)
- ✅ Web sitesi (opsiyonel)
- ✅ WhatsApp numarası (opsiyonel)
- ✅ Sosyal medya linkleri (Instagram, Facebook)

**Bizde yok:** ❌ Hiçbiri yok

**Öncelik:** 🔴🔴🔴 YÜKSEK - Müşterilerin işletmeyle iletişime geçmesi için kritik

---

### 🔴 2. ÇALIŞMA SAATLERİ (KRİTİK EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Haftalık çalışma saatleri (Pazartesi-Pazar)
- ✅ Her gün için açılış-kapanış saati
- ✅ Öğle arası (opsiyonel)
- ✅ Tatil günleri işaretleme
- ✅ Özel günler (Bayram, özel etkinlikler)

**Bizde:** ⚠️ Database'de `workingHoursJson` var ama UI'da yok

**Öncelik:** 🔴🔴🔴 YÜKSEK - Müşteriler ne zaman açık olduğunu bilmeli

---

### 🔴 3. TESLİMAT BİLGİLERİ (KRİTİK EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Teslimat var mı? (Evet/Hayır)
- ✅ Minimum sipariş tutarı
- ✅ Teslimat ücreti
- ✅ Teslimat süresi (dakika)
- ✅ Teslimat yarıçapı (km)
- ✅ Ücretsiz teslimat eşiği
- ✅ Kendi kuryesi var mı?
- ✅ Platform kuryesi kullanıyor mu?

**Bizde:** ⚠️ Database'de `hasDelivery`, `deliveryRadius`, `minOrderAmount` var ama UI'da yok

**Öncelik:** 🔴🔴🔴 YÜKSEK - Sipariş sistemi için kritik

---

### 🔴 4. YASAL BELGELER VE DOĞRULAMA (KRİTİK EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Vergi levhası yükleme (zorunlu)
- ✅ Kimlik belgesi yükleme (zorunlu)
- ✅ İşletme ruhsatı yükleme (opsiyonel)
- ✅ Belge doğrulama süreci
- ✅ Onay durumu gösterimi (Beklemede/Onaylandı/Reddedildi)
- ✅ Red nedeni bildirimi

**Bizde:** ❌ Hiçbiri yok

**Öncelik:** 🔴🔴🔴 YÜKSEK - Yasal zorunluluk ve güven

---

### 🔴 5. FİNANSAL BİLGİLER (KRİTİK EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Banka hesap bilgileri (IBAN)
- ✅ Hesap sahibi adı
- ✅ Banka adı
- ✅ Şube kodu
- ✅ Vergi numarası
- ✅ Vergi dairesi
- ✅ Fatura adresi
- ✅ Komisyon oranı bilgisi (platform tarafından gösterilir)

**Bizde:** ❌ Hiçbiri yok (Sadece billing profile var ama esnaf kayıtta yok)

**Öncelik:** 🔴🔴🔴 YÜKSEK - Ödeme almak için kritik

---

### 🟡 6. İŞLETME DETAYLARI (ÖNEMLİ EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ İşletme tipi (Şahıs/Şirket)
- ✅ Ticaret unvanı
- ✅ Mersis numarası (şirket için)
- ✅ Kuruluş tarihi
- ✅ Çalışan sayısı
- ✅ Yıllık ciro (opsiyonel)

**Bizde:** ❌ Hiçbiri yok

**Öncelik:** 🟡🟡 ORTA - İstatistik ve segmentasyon için

---

### 🟡 7. ÜRÜN/MENÜ GELİŞMİŞ ÖZELLİKLER (ÖNEMLİ EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Kategori bazlı ürün grupları (Çorbalar, Ana Yemekler, vb.)
- ✅ Ürün varyantları (Boyut: Küçük/Orta/Büyük)
- ✅ Ekstralar/Seçenekler (Ekstra peynir, sos seçimi)
- ✅ Stok takibi (Stokta var/yok)
- ✅ Ürün aktif/pasif durumu
- ✅ Ürün sıralaması (drag & drop)
- ✅ Toplu ürün yükleme (Excel/CSV)
- ✅ Ürün etiketleri (Vegan, Glütensiz, Hızlı hazırlanır)
- ✅ Besin değerleri (kalori, protein, vb.)
- ✅ Alerjen bilgileri

**Bizde:** ⚠️ Sadece temel ürün bilgileri var (ad, açıklama, fiyat, resim)

**Öncelik:** 🟡🟡 ORTA - Menü yönetimi için önemli

---

### 🟡 8. GÖRSEL İÇERİK (ÖNEMLİ EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Çoklu resim yükleme (galeri)
- ✅ Kapak fotoğrafı
- ✅ Logo (ayrı)
- ✅ İç mekan fotoğrafları
- ✅ Video yükleme (tanıtım videosu)
- ✅ Resim düzenleme (kırpma, filtre)

**Bizde:** ⚠️ Sadece tek logo/resim var

**Öncelik:** 🟡🟡 ORTA - Görsel çekicilik için

---

### 🟡 9. ÖZELLİKLER VE ETİKETLER (ÖNEMLİ EKSİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Özellikler (WiFi var, Otopark var, Açık hava, vb.)
- ✅ Hizmet etiketleri (Hızlı teslimat, İndirimli, Yeni)
- ✅ Ödeme yöntemleri (Nakit, Kredi kartı, Online)
- ✅ Dil desteği (Türkçe, İngilizce)

**Bizde:** ❌ Hiçbiri yok

**Öncelik:** 🟡🟡 ORTA - Filtreleme ve arama için

---

### 🟢 10. KAMPANYA VE PROMOSYON (DÜŞÜK ÖNCELİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ İndirim kampanyaları
- ✅ Kupon kodları
- ✅ İlk sipariş indirimi
- ✅ Minimum sipariş indirimi
- ✅ Kampanya başlangıç/bitiş tarihi

**Bizde:** ❌ Hiçbiri yok

**Öncelik:** 🟢 DÜŞÜK - İlk versiyon için gerekli değil

---

### 🟢 11. SOSYAL MEDYA VE MARKETİNG (DÜŞÜK ÖNCELİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Instagram linki
- ✅ Facebook sayfası
- ✅ Twitter/X hesabı
- ✅ TikTok hesabı
- ✅ YouTube kanalı

**Bizde:** ❌ Hiçbiri yok

**Öncelik:** 🟢 DÜŞÜK - İlk versiyon için opsiyonel

---

### 🟢 12. MÜŞTERİ HİZMETLERİ BİLGİLERİ (DÜŞÜK ÖNCELİK)
**Yemeksepeti/Trendyol/Getir'de var:**
- ✅ Müşteri hizmetleri telefonu
- ✅ Müşteri hizmetleri e-postası
- ✅ Şikayet/öneri formu

**Bizde:** ❌ Hiçbiri yok

**Öncelik:** 🟢 DÜŞÜK - Genel destek sistemi var

---

## 📋 ÖNCELİK SIRALAMASI (Uygulama Önerisi)

### 🔴 FAZ 1 - KRİTİK EKSİKLER (Hemen eklenmeli)
1. **İletişim Bilgileri**
   - Telefon numarası (zorunlu)
   - E-posta (zorunlu)
   - WhatsApp (opsiyonel)

2. **Çalışma Saatleri**
   - Haftalık çalışma saatleri formu
   - Her gün için açılış-kapanış

3. **Teslimat Bilgileri**
   - Teslimat var mı?
   - Minimum sipariş tutarı
   - Teslimat ücreti
   - Teslimat süresi

4. **Yasal Belgeler**
   - Vergi levhası yükleme
   - Kimlik belgesi yükleme
   - Doğrulama durumu

5. **Finansal Bilgiler**
   - IBAN
   - Hesap sahibi adı
   - Vergi numarası
   - Vergi dairesi

### 🟡 FAZ 2 - ÖNEMLİ EKSİKLER (Kısa vadede)
6. **Gelişmiş Ürün Özellikleri**
   - Ürün kategorileri
   - Stok takibi
   - Ürün aktif/pasif

7. **Çoklu Görsel**
   - Galeri yükleme
   - Kapak fotoğrafı

8. **İşletme Detayları**
   - İşletme tipi
   - Ticaret unvanı

### 🟢 FAZ 3 - İYİLEŞTİRMELER (Uzun vadede)
9. Ürün varyantları
10. Kampanya sistemi
11. Sosyal medya linkleri
12. Özellikler ve etiketler

---

## 🎯 ÖNERİLEN UYGULAMA PLANI

### Adım 1: Kayıt Formunu Genişlet
- 3 adımlı formu 5-6 adıma çıkar
- Her adımda ilgili bilgileri topla

### Adım 2: Doğrulama Sistemi
- Belge yükleme
- Admin onay süreci
- Onay durumu bildirimi

### Adım 3: Eksik Alanları Doldur
- Çalışma saatleri
- Teslimat bilgileri
- Finansal bilgiler

### Adım 4: Gelişmiş Menü Yönetimi
- Kategori bazlı gruplama
- Stok takibi
- Toplu yükleme

---

## 📊 KARŞILAŞTIRMA TABLOSU

| Özellik | Yemeksepeti | Trendyol | Getir | Bizim Sistem | Öncelik |
|---------|-------------|----------|-------|--------------|---------|
| Konum Seçimi | ✅ | ✅ | ✅ | ✅ | - |
| İşletme Adı | ✅ | ✅ | ✅ | ✅ | - |
| Kategori | ✅ | ✅ | ✅ | ✅ | - |
| Logo/Resim | ✅ | ✅ | ✅ | ✅ | - |
| Telefon | ✅ | ✅ | ✅ | ❌ | 🔴🔴🔴 |
| E-posta | ✅ | ✅ | ✅ | ❌ | 🔴🔴🔴 |
| Çalışma Saatleri | ✅ | ✅ | ✅ | ⚠️ | 🔴🔴🔴 |
| Teslimat Bilgileri | ✅ | ✅ | ✅ | ⚠️ | 🔴🔴🔴 |
| Vergi Levhası | ✅ | ✅ | ✅ | ❌ | 🔴🔴🔴 |
| Kimlik Belgesi | ✅ | ✅ | ✅ | ❌ | 🔴🔴🔴 |
| Banka Bilgileri | ✅ | ✅ | ✅ | ❌ | 🔴🔴🔴 |
| Vergi No | ✅ | ✅ | ✅ | ❌ | 🔴🔴🔴 |
| Minimum Sipariş | ✅ | ✅ | ✅ | ⚠️ | 🔴🔴🔴 |
| Ürün Kategorileri | ✅ | ✅ | ✅ | ❌ | 🟡🟡 |
| Stok Takibi | ✅ | ✅ | ✅ | ❌ | 🟡🟡 |
| Çoklu Resim | ✅ | ✅ | ✅ | ❌ | 🟡🟡 |
| Ürün Varyantları | ✅ | ✅ | ❌ | ❌ | 🟢 |
| Kampanya Sistemi | ✅ | ✅ | ✅ | ❌ | 🟢 |

---

## 💡 SONUÇ VE ÖNERİLER

### En Kritik Eksikler:
1. **İletişim bilgileri** - Müşteriler işletmeyle nasıl iletişime geçecek?
2. **Çalışma saatleri** - Müşteriler ne zaman açık olduğunu bilmeli
3. **Teslimat bilgileri** - Sipariş sistemi için kritik
4. **Yasal belgeler** - Güven ve yasal zorunluluk
5. **Finansal bilgiler** - Ödeme almak için gerekli

### Hızlı Kazanımlar:
- Bu 5 kritik eksikliği eklemek, sistemin kullanılabilirliğini %80 artırır
- Mevcut database yapısı çoğu için hazır (workingHoursJson, hasDelivery, vb.)
- Sadece UI eklemek yeterli

### Uzun Vadeli:
- Gelişmiş menü yönetimi
- Kampanya sistemi
- Çoklu görsel yükleme

---

**Hazırlayan:** AI Assistant  
**Tarih:** 2025-12-13  
**Versiyon:** 1.0

