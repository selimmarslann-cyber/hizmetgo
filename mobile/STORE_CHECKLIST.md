# ✅ Hizmetgo Store Yayınlama Kontrol Listesi

Bu liste, Hizmetgo uygulamasını Google Play Store ve Apple App Store'a yayınlamadan önce kontrol edilmesi gereken tüm öğeleri içerir.

## 📱 Genel Kontroller

### App Configuration

- [x] `app.json` - App name: "Hizmetgo"
- [x] `app.json` - Bundle ID: `com.hizmetgo.app`
- [x] `app.json` - Brand color: `#FF6000`
- [x] `app.json` - Privacy descriptions eklendi
- [ ] `app.json` - EAS Project ID eklendi (REPLACE_WITH_EAS_PROJECT_ID değiştirilmeli)
- [ ] `app.json` - Updates URL güncellendi

### Assets

- [ ] `icon.png` (1024x1024) - `mobile/assets/` klasöründe
- [ ] `splash.png` (1284x2778) - `mobile/assets/` klasöründe
- [ ] `adaptive-icon.png` (1024x1024) - `mobile/assets/` klasöründe
- [ ] `notification-icon.png` (96x96) - `mobile/assets/` klasöründe
- [ ] `favicon.png` (48x48) - `mobile/assets/` klasöründe
- [ ] Tüm asset'ler web app logo tasarımıyla uyumlu
- [ ] Asset'ler yüksek kalitede (PNG, lossless)

### Code Quality

- [x] Logo component web app ile uyumlu
- [x] Renk paleti web app ile uyumlu (#FF6000)
- [x] Tüm "Mahallem" referansları "Hizmetgo" olarak güncellendi
- [x] Hardcoded renkler colors.primary kullanıyor
- [x] Bottom tabs active color: #FF6000
- [ ] TypeScript hataları yok
- [ ] Linter hataları yok

---

## 🍎 iOS (App Store) Kontrolleri

### App Store Connect

- [ ] Apple Developer Account aktif ($99/yıl)
- [ ] App Store Connect'te app oluşturuldu
- [ ] Bundle ID: `com.hizmetgo.app` oluşturuldu
- [ ] App Store listing bilgileri dolduruldu:
  - [ ] App name: "Hizmetgo"
  - [ ] Subtitle: "Yakınındaki Esnafları Bul"
  - [ ] Category: Business
  - [ ] Description (TR)
  - [ ] Keywords (100 karakter)
  - [ ] Privacy Policy URL: `https://hizmetgo.app/legal/privacy`
  - [ ] Support URL: `https://hizmetgo.app` veya destek e-posta
- [ ] Screenshots hazırlandı:
  - [ ] iPhone 6.7" (1290x2796)
  - [ ] iPhone 6.5" (1242x2688)
  - [ ] iPhone 5.5" (1242x2208)
  - [ ] iPad Pro 12.9" (2048x2732)
- [ ] App Preview videos (opsiyonel)

### Build Configuration

- [ ] `eas.json` - `ascAppId` eklendi
- [ ] Production build başarıyla oluşturuldu
- [ ] TestFlight'ta test edildi
- [ ] Build number artırıldı (her yeni build için)

### Privacy & Compliance

- [ ] Privacy Policy URL erişilebilir
- [ ] App Privacy details dolduruldu (Data collection)
- [ ] Age rating belirlendi
- [ ] Export compliance bilgileri dolduruldu

---

## 🤖 Android (Google Play) Kontrolleri

### Google Play Console

- [ ] Google Play Console hesabı aktif ($25 tek seferlik)
- [ ] Google Play Console'da app oluşturuldu
- [ ] Package name: `com.hizmetgo.app`
- [ ] Store listing bilgileri dolduruldu:
  - [ ] App name: "Hizmetgo"
  - [ ] Short description (80 karakter)
  - [ ] Full description
  - [ ] Category: Business
  - [ ] Tags: esnaf, usta, tamir, ev hizmetleri
  - [ ] Privacy Policy URL: `https://hizmetgo.app/legal/privacy`
  - [ ] Support URL: `https://hizmetgo.app` veya destek e-posta
- [ ] Graphics hazırlandı:
  - [ ] App icon (512x512)
  - [ ] Feature graphic (1024x500)
  - [ ] Screenshots (Phone, min 2, max 8)
  - [ ] Screenshots (Tablet, opsiyonel)

### Build Configuration

- [ ] Service account key oluşturuldu
- [ ] `google-service-account.json` dosyası `mobile/credentials/` klasöründe
- [ ] Service account'a Admin yetkisi verildi
- [ ] Production build başarıyla oluşturuldu
- [ ] Internal testing'de test edildi
- [ ] Version code artırıldı (her yeni build için)

### Privacy & Compliance

- [ ] Privacy Policy URL erişilebilir
- [ ] Content rating tamamlandı
- [ ] Data safety bilgileri dolduruldu:
  - [ ] Data collected
  - [ ] Data shared
  - [ ] Security practices
- [ ] Target audience belirlendi

---

## 🔧 Teknik Kontroller

### Environment Variables

- [ ] `EXPO_PUBLIC_API_BASE_URL` production'da doğru URL
- [ ] Tüm API endpoint'leri çalışıyor
- [ ] Environment variables doğru yapılandırıldı

### Permissions

- [x] Location permissions açıklamaları eklendi
- [x] Camera permissions açıklamaları eklendi
- [x] Photo library permissions açıklamaları eklendi
- [x] Notification permissions açıklamaları eklendi

### Build & Test

- [ ] Development build test edildi
- [ ] Preview build test edildi
- [ ] Production build test edildi
- [ ] Tüm özellikler çalışıyor:
  - [ ] Login/Register
  - [ ] Home screen
  - [ ] Map screen
  - [ ] Jobs screen
  - [ ] Profile screen
  - [ ] Settings screen

---

## 📝 Store Listing İçerikleri

### App Store Description (iOS)

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

### Google Play Description (Android)

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

### Keywords (iOS - 100 karakter)

```
esnaf,usta,tamir,ev hizmetleri,boya,temizlik,elektrik,tesisat,mahalle,hizmet
```

---

## 🚀 Yayınlama Adımları

### 1. Son Kontroller

- [ ] Tüm checklist öğeleri tamamlandı
- [ ] Production build başarıyla oluşturuldu
- [ ] Test edildi ve çalışıyor

### 2. iOS Submit

```bash
cd mobile
eas submit --profile production --platform ios
```

### 3. Android Submit

```bash
cd mobile
eas submit --profile production --platform android
```

### 4. Review Süreci

- [ ] iOS: 1-7 gün arası review süreci
- [ ] Android: 1-3 gün arası review süreci
- [ ] Review sonrası yayınlandı mı kontrol et

---

## 📞 Destek Bilgileri

- **Email**: destek@hizmetgo.app
- **Privacy Policy**: https://hizmetgo.app/legal/privacy
- **Terms of Service**: https://hizmetgo.app/legal/terms
- **Support URL**: https://hizmetgo.app

---

## 🎉 Başarılar!

Tüm checklist öğelerini tamamladıktan sonra store'a yayınlamaya hazırsınız! 🚀
