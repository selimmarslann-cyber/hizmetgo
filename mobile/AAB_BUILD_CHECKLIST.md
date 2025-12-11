# 📦 AAB Build Kontrol Listesi

Google Play Store için Android App Bundle (AAB) oluşturmadan önce bu kontrol listesini tamamlayın.

## ✅ Ön Hazırlık

### 1. EAS CLI Kurulumu
- [ ] EAS CLI yüklü: `npm install -g eas-cli`
- [ ] EAS hesabına giriş yapıldı: `eas login`
- [ ] EAS projesi oluşturuldu: `eas init` (mobile klasöründe)

### 2. app.json Kontrolü
- [ ] `expo.extra.eas.projectId` gerçek EAS Project ID ile dolduruldu
- [ ] `expo.android.package` doğru: `com.hizmetgo.app`
- [ ] `expo.android.versionCode` artırıldı (her build için +1)
- [ ] `expo.version` güncel (örn: "1.0.0")
- [ ] `expo.runtimeVersion` güncel (örn: "1.0.0")

### 3. Assets Dosyaları
- [ ] `assets/icon.png` (1024x1024 px) mevcut
- [ ] `assets/splash.png` (1284x2778 px) mevcut
- [ ] `assets/adaptive-icon.png` (1024x1024 px) mevcut
- [ ] `assets/notification-icon.png` (96x96 px) mevcut (opsiyonel)
- [ ] `assets/favicon.png` (48x48 px) mevcut (opsiyonel)

### 4. API Yapılandırması
- [ ] `eas.json` içinde `production` profili doğru API URL'ini gösteriyor
- [ ] Production API URL: `https://hizmetgo.app` (veya gerçek domain)
- [ ] API endpoint'leri test edildi ve çalışıyor

### 5. Google Play Console Hazırlığı
- [ ] Google Play Console hesabı aktif
- [ ] App oluşturuldu (veya mevcut app kullanılacak)
- [ ] Package name: `com.hizmetgo.app` doğru
- [ ] Service account key oluşturuldu (otomatik submit için)
- [ ] Service account key dosyası: `credentials/google-service-account.json` mevcut

## 🔨 Build İşlemi

### 1. Build Başlatma
```bash
cd mobile
# Windows için:
.\build-aab.ps1

# Linux/Mac için:
chmod +x build-aab.sh
./build-aab.sh

# Veya manuel:
eas build --profile production --platform android
```

### 2. Build Takibi
- [ ] Build durumu kontrol edildi: `eas build:list`
- [ ] Build başarıyla tamamlandı (5-30 dakika sürebilir)
- [ ] AAB dosyası indirilebilir durumda

### 3. Build Sonrası Kontroller
- [ ] AAB dosyası indirildi ve test edildi
- [ ] Uygulama açılıyor ve çalışıyor
- [ ] API bağlantıları çalışıyor
- [ ] Tüm özellikler test edildi

## 📤 Google Play Console'a Yükleme

### 1. Manuel Yükleme
1. [Google Play Console](https://play.google.com/console) açın
2. App'i seçin
3. **Production** > **Create new release**
4. AAB dosyasını yükleyin
5. Release notes ekleyin
6. **Review release** > **Start rollout**

### 2. Otomatik Submit (EAS ile)
```bash
cd mobile
eas submit --profile production --platform android
```

**Not**: Otomatik submit için `eas.json` içinde `serviceAccountKeyPath` doğru yolu göstermeli.

## ⚠️ Önemli Notlar

1. **Version Code**: Her yeni build için `versionCode` artırılmalı
2. **Version Name**: Her yeni release için `version` artırılmalı (örn: 1.0.0 → 1.0.1)
3. **Runtime Version**: OTA updates için `runtimeVersion` değiştirilmemeli
4. **API URL**: Production build'de production API URL kullanılmalı
5. **Test**: Build'i mutlaka test edin (Internal Testing track)

## 🐛 Sorun Giderme

### Build Başarısız Olursa
1. `eas build:list` ile build loglarını kontrol edin
2. `eas build:view [BUILD_ID]` ile detaylı logları görün
3. Hata mesajlarını kontrol edin
4. `app.json` ve `eas.json` dosyalarını kontrol edin

### AAB Yüklenemezse
1. Package name doğru mu kontrol edin
2. Version code daha önce kullanılmış mı kontrol edin
3. Signing key doğru mu kontrol edin
4. Google Play Console'da app oluşturulmuş mu kontrol edin

## 📞 Destek

- **EAS Documentation**: https://docs.expo.dev/build/introduction/
- **Google Play Console Help**: https://support.google.com/googleplay/android-developer

---

**Son Güncelleme**: Build başlatılmadan önce bu listeyi kontrol edin! ✅

