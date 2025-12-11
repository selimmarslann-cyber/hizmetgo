# 🚀 AAB Build - Hızlı Başlangıç

Google Play Store için Android App Bundle (AAB) oluşturma rehberi.

## ⚡ Hızlı Başlangıç (3 Adım)

### 1. EAS Kurulumu ve Giriş
```bash
# EAS CLI yükle (eğer yoksa)
npm install -g eas-cli

# EAS hesabına giriş yap
eas login

# Mobile klasörüne geç
cd mobile

# EAS projesi oluştur (ilk kez)
eas init
```

### 2. Assets Hazırlama
Aşağıdaki dosyaları `mobile/assets/` klasörüne koyun:

- ✅ `icon.png` - 1024x1024 px (App ikonu)
- ✅ `splash.png` - 1284x2778 px (Splash screen)
- ✅ `adaptive-icon.png` - 1024x1024 px (Android adaptive icon)

**Not**: Bu dosyalar şu anda eksik. Tasarım ekibinden veya `ASSETS_GENERATOR.md` dosyasına bakarak oluşturabilirsiniz.

### 3. Build Başlatma

**Windows için:**
```powershell
cd mobile
.\build-aab.ps1
```

**Linux/Mac için:**
```bash
cd mobile
chmod +x build-aab.sh
./build-aab.sh
```

**Manuel:**
```bash
cd mobile
eas build --profile production --platform android
```

## 📋 Detaylı Kontrol Listesi

Tüm adımlar için `AAB_BUILD_CHECKLIST.md` dosyasına bakın.

## ⚠️ Önemli Notlar

1. **EAS Project ID**: `app.json` içinde `expo.extra.eas.projectId` gerçek ID ile doldurulmalı
2. **Version Code**: Her build için `app.json` → `expo.android.versionCode` artırılmalı
3. **API URL**: Production build'de `https://hizmetgo.app` kullanılıyor (eas.json'da kontrol edin)
4. **Build Süresi**: 5-30 dakika arasında sürebilir

## 🔍 Build Durumu Kontrolü

```bash
# Tüm build'leri listele
eas build:list

# Belirli bir build'in detaylarını gör
eas build:view [BUILD_ID]
```

## 📤 Google Play Console'a Yükleme

### Otomatik (EAS ile):
```bash
cd mobile
eas submit --profile production --platform android
```

**Not**: Otomatik submit için `credentials/google-service-account.json` dosyası gerekli.

### Manuel:
1. Google Play Console'u açın
2. App'i seçin
3. **Production** > **Create new release**
4. İndirilen AAB dosyasını yükleyin
5. Release notes ekleyin
6. **Review release** > **Start rollout**

## 🐛 Sorun Giderme

### "EAS Project ID bulunamadı" hatası
```bash
cd mobile
eas init
# Oluşturulan project ID'yi app.json'a ekleyin
```

### "Assets dosyaları eksik" hatası
- `mobile/assets/` klasörüne gerekli dosyaları ekleyin
- `ASSETS_CREATION_GUIDE.md` dosyasına bakın

### Build başarısız olursa
```bash
# Build loglarını görüntüle
eas build:view [BUILD_ID]

# Son build'in durumunu kontrol et
eas build:list --limit 1
```

## 📚 Daha Fazla Bilgi

- **Detaylı Rehber**: `STORE_PUBLICATION_GUIDE.md`
- **Kontrol Listesi**: `AAB_BUILD_CHECKLIST.md`
- **Assets Rehberi**: `ASSETS_CREATION_GUIDE.md`
- **EAS Docs**: https://docs.expo.dev/build/introduction/

---

**Hazır mısınız?** Yukarıdaki 3 adımı tamamlayın ve AAB'nizi oluşturun! 🚀

