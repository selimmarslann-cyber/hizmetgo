# 🎨 Hizmetgo Mobile App - Assets Oluşturma Rehberi

Bu rehber, Hizmetgo mobil uygulaması için gerekli tüm asset dosyalarını oluşturmanız için detaylı talimatlar içerir.

## 📋 Gerekli Dosyalar

Tüm asset dosyaları `mobile/assets/` klasörüne konulmalıdır.

### 1. Icon (icon.png)

- **Boyut**: 1024x1024 px
- **Format**: PNG, şeffaf arka plan OLMAMALI (dolu arka plan)
- **Tasarım**:
  - Hizmetgo logosu ("hizmetgo" yazısı)
  - "hizmet" siyah (#1A1A1A), "go" turuncu (#FF6000)
  - Arka plan: Beyaz (#FFFFFF) veya turuncu (#FF6000)
  - Logo ortada, yeterli padding (en az %20)
- **Not**: Köşeler yuvarlatılmamalı, Expo otomatik yuvarlatır

### 2. Splash Screen (splash.png)

- **Boyut**: 1284x2778 px (iPhone 14 Pro Max boyutu - en büyük)
- **Format**: PNG
- **Tasarım**:
  - Arka plan: Turuncu (#FF6000)
  - Hizmetgo logosu ortada
  - Logo boyutu: Ekran genişliğinin %30-40'ı
  - Logo altında "Hizmetgo" yazısı (opsiyonel, beyaz)
- **Not**: Logo ortada, yeterli padding olmalı

### 3. Adaptive Icon (Android) (adaptive-icon.png)

- **Boyut**: 1024x1024 px
- **Format**: PNG
- **Tasarım**:
  - Hizmetgo logosu
  - Güvenli alan (safe zone): Merkez %80 alan
  - Logo bu güvenli alan içinde olmalı
  - Arka plan: Turuncu (#FF6000) veya beyaz
- **Not**: Android 8.0+ için, logo merkezde olmalı, kenarlarda %20 padding

### 4. Notification Icon (notification-icon.png)

- **Boyut**: 96x96 px
- **Format**: PNG, şeffaf arka plan
- **Tasarım**:
  - Basit Hizmetgo ikonu
  - Sadece "go" kısmı veya minimal logo
  - Beyaz veya turuncu renk
  - Şeffaf arka plan

### 5. Favicon (favicon.png)

- **Boyut**: 48x48 px
- **Format**: PNG
- **Tasarım**: Hizmetgo logosu küçük versiyonu

---

## 🛠️ Oluşturma Yöntemleri

### Yöntem 1: Figma ile (Önerilen)

1. **Figma'da yeni dosya oluşturun**
2. **Icon için**:
   - 1024x1024 frame oluşturun
   - Hizmetgo logosunu ekleyin (web app'teki Logo component'inden ilham alın)
   - Export > PNG > 1024x1024
3. **Splash Screen için**:
   - 1284x2778 frame oluşturun
   - Arka plan: #FF6000
   - Logo ekleyin ve ortaya hizalayın
   - Export > PNG > 1284x2778
4. **Adaptive Icon için**:
   - 1024x1024 frame oluşturun
   - Güvenli alan çizgisi ekleyin (merkez %80)
   - Logo ekleyin (güvenli alan içinde)
   - Export > PNG > 1024x1024
5. **Notification Icon için**:
   - 96x96 frame oluşturun
   - Minimal logo ekleyin
   - Export > PNG > 96x96
6. **Favicon için**:
   - 48x48 frame oluşturun
   - Logo ekleyin
   - Export > PNG > 48x48

### Yöntem 2: Web App Logo'sunu Kullanarak

Web app'teki Logo component'i zaten var. Bu component'i kullanarak asset'leri oluşturabilirsiniz:

1. **Next.js sayfası oluşturun** (`app/generate-assets/page.tsx`):

```tsx
"use client";
import { useEffect } from "react";
import Logo from "@/components/layout/Logo";

export default function GenerateAssets() {
  useEffect(() => {
    // Canvas kullanarak logo'yu PNG'ye çevir
    // Bu sayfayı tarayıcıda açıp screenshot alabilirsiniz
  }, []);

  return (
    <div
      style={{
        width: "1024px",
        height: "1024px",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo className="w-96 h-96" />
    </div>
  );
}
```

2. **Screenshot alın** veya **html2canvas** kütüphanesi kullanın

### Yöntem 3: Online Tool Kullanarak

1. **Canva** veya **Adobe Express** kullanın
2. Web app'teki logo tasarımını referans alın
3. Yukarıdaki boyutlarda tasarımlar oluşturun
4. PNG olarak export edin

---

## 📐 Logo Tasarım Detayları

Web app'teki Logo component'inden:

```tsx
// Logo yapısı
<div>
  <span style={{ color: "#1A1A1A", fontWeight: 700 }}>hizmet</span>
  <span style={{ color: "#FF6000", fontWeight: 800 }}>go</span>
</div>

// Font: Inter veya System font
// Letter spacing: -0.02em
// Font weight: "hizmet" 700, "go" 800
```

### Icon Tasarım Önerileri

1. **Basit ve net**: Küçük boyutlarda da okunabilir olmalı
2. **Yüksek kontrast**: Arka planla logo arasında net fark olmalı
3. **Minimal padding**: Logo kenarlara çok yakın olmamalı
4. **Renk uyumu**: Turuncu (#FF6000) ve siyah (#1A1A1A) kullanın

---

## ✅ Kontrol Listesi

Asset dosyalarını oluşturduktan sonra:

- [ ] `icon.png` (1024x1024) - `mobile/assets/` klasöründe
- [ ] `splash.png` (1284x2778) - `mobile/assets/` klasöründe
- [ ] `adaptive-icon.png` (1024x1024) - `mobile/assets/` klasöründe
- [ ] `notification-icon.png` (96x96) - `mobile/assets/` klasöründe
- [ ] `favicon.png` (48x48) - `mobile/assets/` klasöründe
- [ ] Tüm dosyalar PNG formatında
- [ ] Dosya isimleri tam olarak yukarıdaki gibi
- [ ] Logo tasarımı web app'tekiyle uyumlu
- [ ] Renkler doğru (#FF6000 turuncu, #1A1A1A siyah)

---

## 🚀 Test Etme

Asset'leri oluşturduktan sonra:

```bash
cd mobile
npm start
```

Expo Go'da veya emulator'de uygulamayı açın ve şunları kontrol edin:

- ✅ Icon doğru görünüyor mu?
- ✅ Splash screen doğru görünüyor mu?
- ✅ Logo net ve okunabilir mi?
- ✅ Renkler doğru mu?

---

## 📝 Notlar

- **Icon**: App Store ve Play Store'da görünecek ana ikon
- **Splash Screen**: Uygulama açılırken gösterilen ekran
- **Adaptive Icon**: Android 8.0+ için özel icon formatı
- **Notification Icon**: Bildirimlerde görünecek küçük icon
- **Favicon**: Web versiyonu için (opsiyonel)

---

## 🎨 Renk Paleti

- **Primary Orange**: `#FF6000`
- **Text Dark**: `#1A1A1A` veya `#111827`
- **Background**: `#FFFFFF` (icon için) veya `#FF6000` (splash için)
- **White**: `#FFFFFF` (text için splash screen'de)

---

## 💡 İpuçları

1. **Export kalitesi**: PNG export'unda kaliteyi maksimuma ayarlayın
2. **Test**: Farklı cihazlarda test edin (iPhone, Android, tablet)
3. **Yedek**: Asset dosyalarının yedeğini alın
4. **Versiyonlama**: Her değişiklikte versiyon numarasını artırın

---

Sorularınız için: destek@hizmetgo.app
