# 🎨 Hizmetgo Assets Generator

Web app'teki logo tasarımını kullanarak mobile app için asset dosyalarını otomatik oluşturma rehberi.

## 🚀 Hızlı Başlangıç

### Yöntem 1: Next.js Sayfası ile (Önerilen)

1. **Asset generator sayfası oluşturun** (`app/generate-assets/page.tsx`):

```tsx
"use client";

import { useEffect, useRef } from "react";
import Logo from "@/components/layout/Logo";

export default function GenerateAssets() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateIcon = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1024x1024 canvas
    canvas.width = 1024;
    canvas.height = 1024;

    // Beyaz arka plan
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1024, 1024);

    // Logo'yu ortaya yerleştir (React component'i canvas'a render etmek için html2canvas kullanılabilir)
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-8">
      <h1 className="text-3xl font-bold mb-8">Hizmetgo Assets Generator</h1>

      {/* Icon Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Icon (1024x1024)</h2>
        <div className="w-[1024px] h-[1024px] bg-white flex items-center justify-center border-2 border-gray-200">
          <Logo className="w-96 h-96" />
        </div>
        <button
          onClick={generateIcon}
          className="mt-4 px-6 py-2 bg-[#FF6000] text-white rounded-lg"
        >
          Download Icon
        </button>
      </div>

      {/* Splash Screen Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Splash Screen (1284x2778)
        </h2>
        <div className="w-[400px] h-[866px] bg-[#FF6000] flex flex-col items-center justify-center border-2 border-gray-200">
          <Logo className="w-48 h-48" />
          <p className="text-white text-2xl font-bold mt-6">Hizmetgo</p>
        </div>
        <button className="mt-4 px-6 py-2 bg-[#FF6000] text-white rounded-lg">
          Download Splash
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
```

2. **Sayfayı açın**: `http://localhost:3000/generate-assets`
3. **Screenshot alın** veya **html2canvas** kullanarak PNG'ye çevirin

### Yöntem 2: Figma Template

1. **Figma'da yeni dosya oluşturun**
2. **Frame'ler oluşturun**:
   - Icon: 1024x1024
   - Splash: 1284x2778
   - Adaptive Icon: 1024x1024
   - Notification: 96x96
   - Favicon: 48x48

3. **Logo ekleyin**:
   - Text: "hizmetgo"
   - "hizmet": Siyah (#1A1A1A), Font weight 700
   - "go": Turuncu (#FF6000), Font weight 800
   - Font: Inter veya System font
   - Letter spacing: -0.02em

4. **Export edin**: PNG formatında, yüksek kalite

### Yöntem 3: Online Tool

1. **Canva** veya **Adobe Express** kullanın
2. Web app'teki logo tasarımını referans alın
3. Yukarıdaki boyutlarda tasarımlar oluşturun
4. PNG olarak export edin

---

## 📐 Logo Tasarım Spesifikasyonları

### Text Styling

- **Font**: Inter (veya System font)
- **"hizmet"**:
  - Color: `#1A1A1A` (siyah)
  - Font weight: 700
  - Letter spacing: -0.02em
- **"go"**:
  - Color: `#FF6000` (turuncu)
  - Font weight: 800
  - Letter spacing: -0.02em

### Layout

- Text baseline aligned
- Gap between "hizmet" and "go": ~1-2px

---

## 🎨 Asset Tasarım Detayları

### Icon (icon.png)

```
┌─────────────────────────┐
│                         │
│      [hizmetgo]         │
│                         │
└─────────────────────────┘
1024x1024, beyaz arka plan
Logo ortada, %20 padding
```

### Splash Screen (splash.png)

```
┌─────────────────────────┐
│                         │
│    Turuncu Arka Plan    │
│      (#FF6000)          │
│                         │
│      [hizmetgo]         │
│      Hizmetgo           │
│                         │
└─────────────────────────┘
1284x2778, turuncu arka plan
Logo ortada
```

### Adaptive Icon (adaptive-icon.png)

```
┌─────────────────────────┐
│  [Safe Zone - %80]     │
│      [hizmetgo]         │
│  [Safe Zone - %80]     │
└─────────────────────────┘
1024x1024, logo güvenli alan içinde
```

---

## ✅ Kontrol Listesi

- [ ] Icon (1024x1024) oluşturuldu
- [ ] Splash screen (1284x2778) oluşturuldu
- [ ] Adaptive icon (1024x1024) oluşturuldu
- [ ] Notification icon (96x96) oluşturuldu
- [ ] Favicon (48x48) oluşturuldu
- [ ] Tüm dosyalar `mobile/assets/` klasörüne kopyalandı
- [ ] Logo tasarımı web app ile uyumlu
- [ ] Renkler doğru (#FF6000, #1A1A1A)
- [ ] Dosya isimleri doğru

---

## 🚀 Sonraki Adımlar

1. Asset dosyalarını oluşturun
2. `mobile/assets/` klasörüne koyun
3. `npm start` ile test edin
4. Store'a yayınlamaya hazır!
