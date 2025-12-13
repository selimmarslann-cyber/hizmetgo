# 🚀 Google Play AAB Build - Tam Rehber

Bu rehber, Google Play Store için tam teşekküllü bir AAB dosyası oluşturmanız için gereken tüm adımları içerir.

## ⚠️ ÖNEMLİ: Ön Hazırlık

### 1. EAS CLI Kurulumu ve Giriş

```powershell
# EAS CLI yükle (eğer yoksa)
npm install -g eas-cli

# EAS hesabına giriş yap
eas login

# Mobile klasörüne geç
cd mobile

# EAS projesi oluştur (ilk kez)
eas init
```

**Not**: `eas init` komutu çalıştırıldığında bir Project ID oluşturulacak. Bu ID'yi `app.json` dosyasındaki `REPLACE_WITH_EAS_PROJECT_ID` yerine yazın.

### 2. Assets Dosyaları (ZORUNLU)

Aşağıdaki dosyaları `mobile/assets/` klasörüne koymanız **ZORUNLUDUR**:

- ✅ `icon.png` - 1024x1024 px (App ikonu)
- ✅ `splash.png` - 1284x2778 px (Splash screen)
- ✅ `adaptive-icon.png` - 1024x1024 px (Android adaptive icon)
- ✅ `notification-icon.png` - 96x96 px (Bildirim ikonu)
- ✅ `favicon.png` - 48x48 px (Web favicon)

**Eğer bu dosyalar yoksa**, build başarısız olacaktır!

### 3. app.json Kontrolü

`app.json` dosyasında şunları kontrol edin:

- ✅ `expo.extra.eas.projectId` - Gerçek EAS Project ID ile doldurulmuş olmalı
- ✅ `expo.android.package` - `com.hizmetgo.app` olmalı
- ✅ `expo.android.versionCode` - Her build için artırılmalı (1, 2, 3, ...)
- ✅ `expo.version` - Versiyon numarası (örn: "1.0.0")

### 4. Google Play Console Hazırlığı

1. [Google Play Console](https://play.google.com/console) hesabınızı açın
2. Yeni bir app oluşturun veya mevcut app'i kullanın
3. Package name: `com.hizmetgo.app` olmalı

## 🔨 Build İşlemi

### Adım 1: Hazırlık Kontrolü

```powershell
cd mobile
.\check-build-ready.ps1
```

Bu script şunları kontrol eder:
- EAS CLI kurulu mu?
- EAS hesabına giriş yapılmış mı?
- Assets dosyaları mevcut mu?
- app.json doğru yapılandırılmış mı?

### Adım 2: Production Build

```powershell
cd mobile
.\build-aab-production.ps1
```

Bu script:
1. Tüm kontrolleri yapar
2. Production AAB build'i başlatır
3. Build durumunu gösterir

**Build süresi**: 5-30 dakika arasında sürebilir.

### Adım 3: Build Durumu Kontrolü

```powershell
# Tüm build'leri listele
eas build:list

# Son build'in detaylarını gör
eas build:list --limit 1
```

### Adım 4: AAB Dosyasını İndirme

Build tamamlandığında:
1. EAS dashboard'dan (https://expo.dev) build sayfasına gidin
2. Build'in yanındaki "Download" butonuna tıklayın
3. `.aab` dosyasını indirin

## 📤 Google Play Console'a Yükleme

### Manuel Yükleme

1. [Google Play Console](https://play.google.com/console) açın
2. App'inizi seçin
3. **Production** > **Create new release** tıklayın
4. İndirdiğiniz `.aab` dosyasını yükleyin
5. Release notes ekleyin
6. **Review release** > **Start rollout** tıklayın

### Otomatik Yükleme (EAS ile)

**Not**: Bu için Google Play Service Account key gerekir.

```powershell
cd mobile
eas submit --profile production --platform android
```

## ✅ Build Başarı Kontrolü

AAB dosyası başarıyla oluşturulduysa:

- ✅ Dosya uzantısı `.aab` olmalı
- ✅ Dosya boyutu genellikle 10-50 MB arasında olmalı
- ✅ Google Play Console'a yüklenebilmeli
- ✅ Hata mesajı olmamalı

## 🐛 Sorun Giderme

### "EAS Project ID bulunamadı" hatası

```powershell
cd mobile
eas init
# Oluşturulan project ID'yi app.json'a ekleyin
```

### "Assets dosyaları eksik" hatası

- `mobile/assets/` klasörüne gerekli dosyaları ekleyin
- Dosya isimleri tam olarak yukarıdaki gibi olmalı
- Dosya boyutları doğru olmalı

### Build başarısız olursa

```powershell
# Build loglarını görüntüle
eas build:view [BUILD_ID]

# Son build'in durumunu kontrol et
eas build:list --limit 1
```

### "Version code already used" hatası

- `app.json` içindeki `versionCode` değerini artırın
- Örnek: 1 → 2, 2 → 3, vb.

## 📝 Önemli Notlar

1. **Version Code**: Her yeni build için mutlaka artırılmalı
2. **Version Name**: Her yeni release için artırılabilir (örn: 1.0.0 → 1.0.1)
3. **Runtime Version**: OTA updates için değiştirilmemeli
4. **API URL**: Production build'de `https://hizmetgo.app` kullanılıyor
5. **Test**: Build'i mutlaka test edin (Internal Testing track)

## 🎯 Hızlı Başlangıç (Özet)

```powershell
# 1. EAS kurulumu ve giriş
npm install -g eas-cli
eas login
cd mobile
eas init

# 2. app.json'da project ID'yi güncelle

# 3. Assets dosyalarını ekle (mobile/assets/)

# 4. Build başlat
.\build-aab-production.ps1

# 5. Build tamamlanmasını bekle (5-30 dakika)

# 6. AAB dosyasını indir ve Google Play Console'a yükle
```

---

**Hazır mısınız?** Yukarıdaki adımları takip ederek AAB dosyanızı oluşturun! 🚀

