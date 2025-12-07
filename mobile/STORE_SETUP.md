# Store Setup Guide

Bu dosya, Mahallem uygulamasını App Store ve Google Play Store'a yüklemek için gerekli adımları içerir.

## Ön Gereksinimler

1. **EAS Project ID**: Expo Application Services (EAS) proje ID'si
2. **App Store Connect App ID**: iOS uygulaması için App Store Connect'te oluşturulmuş app ID
3. **Google Service Account Key**: Android uygulaması için Google Play Console'da oluşturulmuş service account key

## Yapılacak Değişiklikler

### 1. app.json

Aşağıdaki placeholder değerleri gerçek değerlerle değiştirin:

```json
{
  "extra": {
    "eas": {
      "projectId": "REPLACE_WITH_EAS_PROJECT_ID" // ← EAS proje ID'nizi buraya yazın
    }
  },
  "updates": {
    "url": "https://u.expo.dev/REPLACE_WITH_EAS_PROJECT_ID" // ← Aynı ID'yi buraya yazın
  }
}
```

**Nasıl alınır:**

- `npx eas init` komutunu çalıştırın
- EAS projenizi oluşturun veya mevcut projeyi bağlayın
- Proje ID'si otomatik olarak `app.json`'a eklenir

### 2. eas.json

Aşağıdaki placeholder değerleri gerçek değerlerle değiştirin:

```json
{
  "submit": {
    "production": {
      "ios": {
        "ascAppId": "REPLACE_WITH_APP_STORE_CONNECT_APP_ID" // ← App Store Connect App ID'nizi buraya yazın
      },
      "android": {
        "serviceAccountKeyPath": "./credentials/google-service-account.json" // ← Service account key dosya yolu
      }
    }
  }
}
```

**iOS App Store Connect App ID nasıl alınır:**

1. [App Store Connect](https://appstoreconnect.apple.com) hesabınıza giriş yapın
2. "My Apps" bölümünden yeni bir app oluşturun
3. App ID'yi alın (genellikle 10 haneli bir sayı)

**Google Service Account Key nasıl alınır:**

1. [Google Play Console](https://play.google.com/console) hesabınıza giriş yapın
2. "Setup" > "API access" bölümüne gidin
3. "Create new service account" ile yeni bir service account oluşturun
4. JSON key dosyasını indirin
5. Dosyayı `mobile/credentials/google-service-account.json` konumuna kaydedin
6. Google Play Console'da bu service account'a "Admin" yetkisi verin

### 3. Bundle Identifiers

**iOS:**

- `app.json` içinde `ios.bundleIdentifier` değeri: `com.mahallem.app`
- Bu değer App Store Connect'te oluşturduğunuz app'in bundle identifier'ı ile eşleşmeli

**Android:**

- `app.json` içinde `android.package` değeri: `com.mahallem.app`
- Bu değer Google Play Console'da oluşturduğunuz app'in package name'i ile eşleşmeli

### 4. App Store Listings

**iOS (App Store Connect):**

- App adı: "Mahallem"
- Kategori: "Business" veya "Lifestyle"
- Açıklama: Uygulamanın özelliklerini ve faydalarını içeren detaylı açıklama
- Screenshot'lar: Farklı cihaz boyutları için screenshot'lar ekleyin
- Privacy Policy URL: `https://mahallem.app/legal/privacy`
- Support URL: `https://mahallem.app` veya destek e-posta adresi

**Android (Google Play Console):**

- App adı: "Mahallem"
- Kategori: "Business" veya "Lifestyle"
- Kısa açıklama: 80 karakter limiti
- Uzun açıklama: Detaylı açıklama
- Screenshot'lar: Farklı cihaz boyutları için screenshot'lar ekleyin
- Privacy Policy URL: `https://mahallem.app/legal/privacy`
- Support URL: `https://mahallem.app` veya destek e-posta adresi

### 5. Permissions Açıklamaları

Uygulama şu izinleri kullanıyor:

- **Konum**: Yakınındaki esnafları ve işleri bulmak için
- **Bildirimler**: İş durumu, teklifler ve önemli güncellemeler için

Bu izinlerin kullanım amaçları `app.json` içinde tanımlı:

- iOS: `infoPlist.NSLocationWhenInUseUsageDescription`
- Android: `permissions` array içinde listelenmiş

### 6. Build ve Submit

**Development Build:**

```bash
cd mobile
npx eas build --profile development --platform ios
npx eas build --profile development --platform android
```

**Preview Build (Internal Testing):**

```bash
npx eas build --profile preview --platform ios
npx eas build --profile preview --platform android
```

**Production Build (Store):**

```bash
npx eas build --profile production --platform ios
npx eas build --profile production --platform android
```

**Store'a Yükleme:**

```bash
npx eas submit --profile production --platform ios
npx eas submit --profile production --platform android
```

## Kontrol Listesi

- [ ] EAS Project ID `app.json`'a eklendi
- [ ] App Store Connect App ID `eas.json`'a eklendi
- [ ] Google Service Account Key dosyası eklendi
- [ ] Bundle identifiers doğru yapılandırıldı
- [ ] App Store listing bilgileri hazır
- [ ] Google Play listing bilgileri hazır
- [ ] Screenshot'lar hazır
- [ ] Privacy Policy URL hazır
- [ ] Support URL hazır
- [ ] Production build başarıyla oluşturuldu
- [ ] Store'a submit edildi

## Notlar

- İlk kez store'a yükleme yapıyorsanız, review süreci 1-7 gün arasında sürebilir
- Her build sonrası `versionCode` (Android) ve `buildNumber` (iOS) değerlerini artırın
- Runtime version değişikliklerinde dikkatli olun, OTA update'ler için uyumluluk önemlidir

## Destek

Sorularınız için: destek@mahallem.app
