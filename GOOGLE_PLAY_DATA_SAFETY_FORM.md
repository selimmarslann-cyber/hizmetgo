# 📋 Google Play Console - Veri Güvenliği Formu Doldurma Rehberi

Bu rehber, Google Play Console'daki "Veri güvenliği" (Data safety) formunu doldurmanız için gerekli bilgileri içerir.

## 🔗 Hesap Silme URL'si

**URL:** `https://hizmetgo.app/account/delete`

Bu sayfa:
- ✅ Hizmetgo uygulamasına atıfta bulunur
- ✅ Kullanıcıların hesap silme adımlarını açıkça gösterir
- ✅ Silinen ve saklanan veri türlerini belirtir
- ✅ Ek saklama sürelerini açıklar

## 📝 Form Doldurma Adımları

### 1. Hesap Oluşturma

**Soru:** "Uygulamam kullanıcıların hesap oluşturmasına izin vermiyor"

**Cevap:** ❌ **İşaretlenmeyecek** (Hizmetgo kullanıcıların hesap oluşturmasına izin veriyor)

### 2. Hesap Silme URL'si

**URL:** `https://hizmetgo.app/account/delete`

Bu URL'yi "Hesap silme URL'si" alanına girin.

### 3. OAuth

**Soru:** "OAuth" checkbox'ı

**Cevap:** ✅ **İşaretlenecek** (Hizmetgo Google, Facebook gibi OAuth sağlayıcıları kullanıyor)

### 4. Diğer

**Soru:** "Diğer" checkbox'ı

**Cevap:** ❌ **İşaretlenmeyecek** (OAuth yeterli)

### 5. Kısmi Veri Silme

**Soru:** "Kullanıcıların, hesaplarını silmelerine gerek kalmadan verilerinin bir kısmının veya tamamının silinmesini talep edebilecekleri bir yöntem sağlıyor musunuz?"

**Cevap:** ⚪ **Hayır** seçeneği işaretlenecek

**Not:** Şu anda kısmi veri silme özelliği yok. Kullanıcılar sadece tüm hesabı silebilir.

## 📊 Toplanan Veri Türleri

Google Play Console'da "Veri toplama" bölümünde aşağıdaki verileri belirtin:

### 1. Konum (Location)
- ✅ **Toplanıyor:** Evet
- **Tür:** Yaklaşık konum (Approximate location) ve Kesin konum (Precise location)
- **Amaç:** Hizmet sağlama (Esnaf ve müşteri eşleştirme)
- **Paylaşılıyor:** Hayır (sadece eşleştirme için kullanılıyor)

### 2. Kişisel Bilgiler (Personal info)
- ✅ **Toplanıyor:** Evet
- **Türler:**
  - Ad, soyad
  - E-posta adresi
  - Telefon numarası
  - Kullanıcı ID
- **Amaç:** Hesap yönetimi, hizmet sağlama
- **Paylaşılıyor:** Hayır

### 3. Fotoğraflar ve Videolar (Photos & videos)
- ✅ **Toplanıyor:** Evet
- **Amaç:** Profil fotoğrafları, iş fotoğrafları
- **Paylaşılıyor:** Hayır (sadece platform içinde görüntüleniyor)

### 4. Finansal Bilgiler (Financial info)
- ✅ **Toplanıyor:** Evet
- **Türler:**
  - Ödeme bilgileri (şifrelenmiş)
  - Fatura bilgileri
- **Amaç:** Ödeme işlemleri, faturalama
- **Paylaşılıyor:** Hayır (sadece ödeme sağlayıcılarına güvenli şekilde iletilir)

### 5. Uygulama Aktivitesi (App activity)
- ✅ **Toplanıyor:** Evet
- **Türler:**
  - Uygulama etkileşimleri
  - Arama geçmişi
  - Diğer kullanıcı tarafından oluşturulan içerik
- **Amaç:** Hizmet iyileştirme, kişiselleştirme
- **Paylaşılıyor:** Hayır

### 6. Cihaz veya Diğer ID'ler (Device or other IDs)
- ✅ **Toplanıyor:** Evet
- **Amaç:** Analiz, güvenlik
- **Paylaşılıyor:** Hayır

## 🔒 Veri Güvenliği Uygulamaları

**Soru:** "Veri güvenliği uygulamaları" bölümünde:

- ✅ **Veri şifreleme:** Aktarım sırasında şifrelenir (Data encrypted in transit)
- ✅ **Veri silme:** Kullanıcılar veri silme talep edebilir (Users can request data deletion)
- ✅ **Veri güvenliği taahhütleri:** KVKK uyumluluğu

## 📧 İletişim Bilgileri

**Destek E-posta:** `destek@hizmetgo.app`

**Gizlilik Politikası URL:** `https://hizmetgo.app/legal/privacy`

## ✅ Kontrol Listesi

Formu doldururken şunları kontrol edin:

- [ ] Hesap silme URL'si doğru: `https://hizmetgo.app/account/delete`
- [ ] OAuth checkbox'ı işaretli
- [ ] "Uygulamım kullanıcıların hesap oluşturmasına izin vermiyor" işaretli DEĞİL
- [ ] Tüm toplanan veri türleri belirtildi
- [ ] Veri güvenliği uygulamaları işaretlendi
- [ ] Gizlilik politikası URL'si doğru
- [ ] Form kaydedildi ve gözden geçirildi

## 🚨 Önemli Notlar

1. **Hesap Silme Süreci:** Hesap silme talebi oluşturulduktan sonra 30 gün içinde tamamlanır. Bu süre içinde kullanıcılar hesabı geri alabilir.

2. **Veri Saklama:** Yasal yükümlülükler gereği fatura ve ödeme kayıtları 10 yıl süreyle saklanır.

3. **Gizlilik Politikası:** Formu doldurmadan önce gizlilik politikası sayfasının yayında olduğundan emin olun.

---

**Son Güncelleme:** Form doldurulmadan önce bu rehberi kontrol edin! ✅

