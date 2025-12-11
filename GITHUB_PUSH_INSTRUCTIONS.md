# 🚀 GitHub'a Yükleme Talimatları

## 📋 Yapılan Değişiklikler

1. ✅ Hesap silme sayfası oluşturuldu: `/account/delete`
2. ✅ Hesap silme API endpoint'i: `/api/user/delete-account`
3. ✅ Google Play Console form rehberi: `GOOGLE_PLAY_DATA_SAFETY_FORM.md`
4. ✅ Support help sayfasına hesap silme linki eklendi

## 🔧 Build Hatası

Şu anda bir build hatası var (`AccountDeletePageClient.tsx`). Bu hatayı düzeltmek için:

1. Next.js cache'ini temizleyin: `rm -rf .next` (veya Windows'ta `.next` klasörünü silin)
2. `node_modules` ve `package-lock.json`'ı silip yeniden yükleyin:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Build'i tekrar deneyin: `npm run build`

## 📤 GitHub'a Yükleme Adımları

### 1. Git Kurulumu (Eğer yüklü değilse)

Windows için Git'i [git-scm.com](https://git-scm.com/download/win) adresinden indirip kurun.

### 2. Repository'yi Klonlayın veya Bağlayın

```bash
# Eğer henüz klonlanmadıysa
git clone https://github.com/selimmarslann-cyber/hizmetgo.git
cd hizmetgo

# Veya mevcut klasörü bağlayın
git remote add origin https://github.com/selimmarslann-cyber/hizmetgo.git
```

### 3. Değişiklikleri Ekleyin

```bash
# Tüm değişiklikleri ekle
git add .

# Commit oluştur
git commit -m "feat: Google Play Console için hesap silme sayfası ve veri güvenliği formu eklendi

- Hesap silme sayfası oluşturuldu (/account/delete)
- Hesap silme API endpoint'i eklendi (/api/user/delete-account)
- Google Play Console form rehberi hazırlandı
- Support help sayfasına hesap silme linki eklendi"
```

### 4. GitHub'a Push Edin

```bash
# Main branch'e push et
git push origin main

# Veya master branch ise
git push origin master
```

## 📝 Commit Mesajı Önerisi

```
feat: Google Play Console için hesap silme sayfası ve veri güvenliği formu eklendi

- Hesap silme sayfası oluşturuldu (/account/delete)
- Hesap silme API endpoint'i eklendi (/api/user/delete-account)
- Google Play Console form rehberi hazırlandı (GOOGLE_PLAY_DATA_SAFETY_FORM.md)
- Support help sayfasına hesap silme linki eklendi
- Hesap silme URL'si: https://hizmetgo.app/account/delete
```

## ⚠️ Önemli Notlar

1. Build hatasını düzeltmeden push etmeyin
2. `.env` dosyalarını commit etmeyin (`.gitignore`'da olmalı)
3. `node_modules` klasörünü commit etmeyin
4. `.next` klasörünü commit etmeyin

## 🔗 İlgili Dosyalar

- `app/(public)/account/delete/page.tsx` - Hesap silme sayfası
- `app/(public)/account/delete/AccountDeletePageClient.tsx` - Client component
- `app/(public)/account/delete/success/page.tsx` - Başarı sayfası
- `app/api/user/delete-account/route.ts` - API endpoint
- `GOOGLE_PLAY_DATA_SAFETY_FORM.md` - Google Play Console form rehberi

