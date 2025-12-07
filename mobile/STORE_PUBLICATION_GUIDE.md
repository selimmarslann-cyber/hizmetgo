# 🚀 Hizmetgo - Store Yayınlama Rehberi

Bu rehber, Hizmetgo uygulamasını Google Play Store ve Apple App Store'a yayınlamak için gereken tüm adımları içerir.

## 📋 Ön Hazırlık

### 1. EAS Hesabı Oluşturma

```bash
npm install -g eas-cli
eas login
eas init
```

### 2. EAS Project ID Alma

```bash
cd mobile
eas init
# Proje oluşturulduktan sonra app.json'a projectId eklenecek
```

### 3. Gerekli Hesaplar

- ✅ **Expo Account**: https://expo.dev
- ✅ **Apple Developer Account**: $99/yıl (https://developer.apple.com)
- ✅ **Google Play Console**: $25 tek seferlik (https://play.google.com/console)

---

## 🎨 Assets Hazırlama

### Gerekli Dosyalar (mobile/assets/ klasörüne koyun)

#### 1. Icon (icon.png)

- **Boyut**: 1024x1024 px
- **Format**: PNG, şeffaf arka plan
- **Tasarım**: Hizmetgo logosu, turuncu (#FF6000) tema
- **Not**: Köşeler yuvarlatılmamalı, Expo otomatik yuvarlatır

#### 2. Splash Screen (splash.png)

- **Boyut**: 1284x2778 px (iPhone 14 Pro Max boyutu)
- **Format**: PNG
- **Tasarım**: Hizmetgo logosu ortada, turuncu (#FF6000) arka plan
- **Not**: Logo ortada, yeterli padding olmalı

#### 3. Adaptive Icon (Android) (adaptive-icon.png)

- **Boyut**: 1024x1024 px
- **Format**: PNG
- **Tasarım**: Hizmetgo logosu, güvenli alan (padding) içinde
- **Not**: Android 8.0+ için, logo merkezde olmalı, kenarlarda %20 padding

#### 4. Notification Icon (notification-icon.png)

- **Boyut**: 96x96 px
- **Format**: PNG, şeffaf arka plan
- **Tasarım**: Basit Hizmetgo ikonu, beyaz veya turuncu

#### 5. Favicon (favicon.png)

- **Boyut**: 48x48 px
- **Format**: PNG
- **Tasarım**: Hizmetgo logosu küçük versiyonu

### Assets Oluşturma Rehberi

1. **Figma/Photoshop** ile tasarım yapın
2. **Export** ederken yukarıdaki boyutlara dikkat edin
3. Tüm dosyaları `mobile/assets/` klasörüne koyun
4. Dosya isimleri tam olarak yukarıdaki gibi olmalı

---

## 📱 iOS (App Store) Yayınlama

### 1. App Store Connect'te App Oluşturma

1. [App Store Connect](https://appstoreconnect.apple.com) hesabınıza giriş yapın
2. **My Apps** > **+** > **New App**
3. Bilgileri doldurun:
   - **Platform**: iOS
   - **Name**: Hizmetgo
   - **Primary Language**: Turkish (Türkçe)
   - **Bundle ID**: `com.hizmetgo.app` (önce Developer Portal'da oluşturmalısınız)
   - **SKU**: `hizmetgo-ios-001`
   - **User Access**: Full Access

### 2. App Store Listing Bilgileri

#### App Information

- **Name**: Hizmetgo
- **Subtitle**: Yakınındaki Esnafları Bul
- **Category**:
  - Primary: Business
  - Secondary: Lifestyle
- **Content Rights**: Kendi içeriğiniz

#### Pricing and Availability

- **Price**: Free
- **Availability**: All countries veya seçili ülkeler

#### App Privacy

- **Privacy Policy URL**: `https://hizmetgo.app/legal/privacy`
- **Data Collection**:
  - Location Data (Coarse & Fine)
  - User Content (Photos, Messages)
  - Identifiers (User ID)
  - Usage Data (Analytics)

### 3. Screenshots Hazırlama

#### Gerekli Boyutlar:

- **iPhone 6.7" Display** (iPhone 14 Pro Max): 1290x2796 px
- **iPhone 6.5" Display** (iPhone 11 Pro Max): 1242x2688 px
- **iPhone 5.5" Display** (iPhone 8 Plus): 1242x2208 px
- **iPad Pro 12.9"**: 2048x2732 px

#### Screenshot İçerikleri:

1. Ana sayfa (kategori listesi)
2. Harita ekranı (esnaf konumları)
3. İş detay sayfası
4. Profil sayfası
5. Mesajlaşma ekranı

### 4. App Store Description

**Kısa Açıklama (30 karakter):**

```
Yakınındaki Esnafları Bul
```

**Açıklama:**

```
Hizmetgo ile yakınındaki esnafları bul, hızlı ve güvenilir hizmet al.

🎯 ÖZELLİKLER:
• Yakınındaki esnafları haritada gör
• Anlık iş ilanları oluştur
• Güvenilir esnaflardan teklif al
• Mesajlaşma ile iletişim kur
• Profil ve yorumları incele
• Güvenli ödeme sistemi

🏠 HİZMETLER:
• Ev hizmetleri (temizlik, boya, tamir)
• Elektrik, su tesisatı
• Mobilya montajı
• Nakliye
• Ve daha fazlası...

Hizmetgo, mahallenizdeki güvenilir esnaflarla sizi buluşturur. Hızlı, kolay ve güvenli!
```

**Keywords** (100 karakter):

```
esnaf,usta,tamir,ev hizmetleri,boya,temizlik,elektrik,tesisat,mahalle,hizmet
```

### 5. Build ve Submit

```bash
# Production build oluştur
cd mobile
eas build --profile production --platform ios

# Build tamamlandıktan sonra submit et
eas submit --profile production --platform ios
```

**Not**: İlk kez submit ediyorsanız:

- App Store Connect'te app'i oluşturduktan sonra
- `eas.json` içindeki `ascAppId` değerini güncelleyin
- Build tamamlandıktan sonra App Store Connect'te "TestFlight" bölümünden test edebilirsiniz

---

## 🤖 Android (Google Play) Yayınlama

### 1. Google Play Console'da App Oluşturma

1. [Google Play Console](https://play.google.com/console) hesabınıza giriş yapın
2. **Create app** butonuna tıklayın
3. Bilgileri doldurun:
   - **App name**: Hizmetgo
   - **Default language**: Turkish (Türkçe)
   - **App or game**: App
   - **Free or paid**: Free
   - **Declarations**: Privacy policy, content ratings, etc.

### 2. Store Listing Bilgileri

#### App Details

- **App name**: Hizmetgo
- **Short description** (80 karakter):
  ```
  Yakınındaki esnafları bul, hızlı ve güvenilir hizmet al
  ```
- **Full description**:

  ```
  Hizmetgo ile yakınındaki esnafları bul, hızlı ve güvenilir hizmet al.

  🎯 ÖZELLİKLER:
  • Yakınındaki esnafları haritada gör
  • Anlık iş ilanları oluştur
  • Güvenilir esnaflardan teklif al
  • Mesajlaşma ile iletişim kur
  • Profil ve yorumları incele
  • Güvenli ödeme sistemi

  🏠 HİZMETLER:
  • Ev hizmetleri (temizlik, boya, tamir)
  • Elektrik, su tesisatı
  • Mobilya montajı
  • Nakliye
  • Ve daha fazlası...

  Hizmetgo, mahallenizdeki güvenilir esnaflarla sizi buluşturur. Hızlı, kolay ve güvenli!
  ```

#### Graphics

- **App icon**: 512x512 px (icon.png'dan oluşturulabilir)
- **Feature graphic**: 1024x500 px (Play Store'da üstte görünen banner)
- **Screenshots**:
  - Phone: En az 2, en fazla 8 screenshot
  - Tablet (opsiyonel): En az 2 screenshot
  - Boyut: 16:9 veya 9:16 oranında, min 320px, max 3840px

#### Categorization

- **App category**: Business
- **Tags**: esnaf, usta, tamir, ev hizmetleri

#### Privacy Policy

- **Privacy Policy URL**: `https://hizmetgo.app/legal/privacy`

### 3. Content Rating

Google Play Console'da **Content rating** bölümünden:

- **Questionnaire** doldurun
- **Rating**: Genellikle "Everyone" veya "Teen" çıkar
- **Rating certificate** alın

### 4. Data Safety

**Data collected**:

- Location (Approximate & Precise)
- Photos and videos
- Personal info (Name, Email, Phone)
- Device or other IDs

**Data shared**: Aynı kategoriler

**Security practices**:

- Data encrypted in transit
- Users can request data deletion

### 5. Service Account Key Oluşturma

1. Google Play Console > **Setup** > **API access**
2. **Create new service account** tıklayın
3. Google Cloud Console'da service account oluşturun
4. JSON key dosyasını indirin
5. Dosyayı `mobile/credentials/google-service-account.json` konumuna kaydedin
6. Google Play Console'da bu service account'a **Admin** yetkisi verin

### 6. Build ve Submit

```bash
# Production build oluştur
cd mobile
eas build --profile production --platform android

# Build tamamlandıktan sonra submit et
eas submit --profile production --platform android
```

---

## 🔧 Konfigürasyon Dosyaları

### app.json Güncellemeleri

✅ **Tamamlandı**:

- App name: "Hizmetgo"
- Bundle ID: `com.hizmetgo.app`
- Brand color: `#FF6000`
- Privacy descriptions eklendi

⚠️ **Yapılacaklar**:

- EAS Project ID ekle
- Privacy policy URL'leri ekle (eğer varsa)

### eas.json Güncellemeleri

⚠️ **Yapılacaklar**:

- `ascAppId` değerini App Store Connect'ten alınan ID ile değiştirin
- `serviceAccountKeyPath` doğru yolu gösteriyor mu kontrol edin

---

## 📝 Kontrol Listesi

### Genel

- [ ] EAS Project ID `app.json`'a eklendi
- [ ] Tüm assets dosyaları `mobile/assets/` klasöründe
- [ ] Icon ve splash screen tasarımları hazır
- [ ] Privacy policy sayfası hazır ve yayında

### iOS

- [ ] Apple Developer Account aktif
- [ ] App Store Connect'te app oluşturuldu
- [ ] Bundle ID `com.hizmetgo.app` oluşturuldu
- [ ] App Store listing bilgileri dolduruldu
- [ ] Screenshots hazırlandı
- [ ] `ascAppId` `eas.json`'a eklendi
- [ ] Production build başarıyla oluşturuldu
- [ ] TestFlight'ta test edildi
- [ ] App Store'a submit edildi

### Android

- [ ] Google Play Console hesabı aktif
- [ ] Google Play Console'da app oluşturuldu
- [ ] Store listing bilgileri dolduruldu
- [ ] Screenshots ve feature graphic hazırlandı
- [ ] Content rating tamamlandı
- [ ] Data safety bilgileri dolduruldu
- [ ] Service account key oluşturuldu ve eklendi
- [ ] Production build başarıyla oluşturuldu
- [ ] Internal testing'de test edildi
- [ ] Google Play'e submit edildi

---

## 🚨 Önemli Notlar

1. **İlk Yayınlama**: Review süreci 1-7 gün arasında sürebilir
2. **Version Updates**: Her güncellemede `versionCode` (Android) ve `buildNumber` (iOS) artırılmalı
3. **Privacy Policy**: Mutlaka yayında olmalı ve erişilebilir olmalı
4. **Screenshots**: Gerçek uygulama ekranlarından alınmalı, mockup kullanmayın
5. **Test**: Production build'i mutlaka test edin (TestFlight/Internal Testing)

---

## 📞 Destek

Sorularınız için:

- **Email**: destek@hizmetgo.app
- **Documentation**: https://docs.expo.dev

---

## 🎉 Başarılar!

Store'a yayınlama sürecinde başarılar dileriz! 🚀
