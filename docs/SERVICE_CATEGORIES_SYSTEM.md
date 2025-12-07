# Mahallem - Hizmet Kategorileri Sistemi Dokümantasyonu

## Genel Bakış

Mahallem platformu, Türkiye'deki tüm hizmet ve meslek kategorilerini kapsayan kapsamlı bir kategori sistemi kullanır.

## Yapı

### 1. Ana Kategoriler (ServiceCategory)

- **Toplam**: 150+ ana kategori
- **Her kategori**:
  - `id`: Benzersiz kategori ID'si (örn: "electricity", "plumbing")
  - `name`: Kategori adı (örn: "Elektrik", "Su Tesisatı")
  - `keywords`: Kategori genelinde arama kelimeleri (20+)
  - `subServices`: Alt hizmetler listesi (10+)

### 2. Alt Hizmetler (SubService)

- **Her kategori için**: Minimum 10 alt hizmet
- **Her alt hizmet**:
  - `id`: Benzersiz alt hizmet ID'si (örn: "home-repair", "full-installation")
  - `name`: Alt hizmet adı (örn: "Ev içi küçük tamir / arıza")
  - `isOther`: "Diğer" seçeneği ise `true`
  - `keywords`: Türkçe arama kelimeleri (20+)

### 3. "Diğer" Seçeneği Mantığı

Her ana kategori için, alt hizmet listesinde son seçenek olarak **"Diğer"** bulunur:

- Kullanıcı "Diğer" seçerse:
  - `main_category_id` = kategori ID'si
  - `subservice_id` = `null` veya `"other"`
  - `is_other` = `true`
  - Bu iş, o kategorideki **TÜM ustaların** "Gelen İşlerim" ekranına düşer

- Özel alt hizmet seçilirse:
  - İş sadece o alt hizmeti seçmiş ustalara filtrelenebilir

## Veri Modeli

### TypeScript Tipleri

```typescript
type SubService = {
  id: string;
  name: string;
  isOther?: boolean;
  keywords: string[];
};

type ServiceCategory = {
  id: string;
  name: string;
  keywords: string[];
  subServices: SubService[];
};
```

### Veritabanı Şeması

#### `jobs` Tablosu

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES users(id),
  main_category_id TEXT NOT NULL,
  sub_service_id TEXT,
  is_other BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  address_text TEXT,
  location_lat FLOAT,
  location_lng FLOAT,
  scheduled_at TIMESTAMP,
  status TEXT DEFAULT 'PENDING',
  accepted_by_business_id UUID REFERENCES businesses(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_jobs_main_category ON jobs(main_category_id);
CREATE INDEX idx_jobs_sub_service ON jobs(sub_service_id);
CREATE INDEX idx_jobs_is_other ON jobs(is_other);
CREATE INDEX idx_jobs_status ON jobs(status);
```

#### `businesses` Tablosu (Güncelleme)

```sql
ALTER TABLE businesses
ADD COLUMN main_categories TEXT[] DEFAULT '{}',
ADD COLUMN sub_services TEXT[] DEFAULT '{}';

CREATE INDEX idx_businesses_main_categories ON businesses USING GIN(main_categories);
```

## Arama ve Eşleştirme

### Arama Servisi (`lib/services/serviceSearchService.ts`)

- `searchServiceCategories(query, limit)`: Arama yapar ve en iyi eşleşen kategorileri döndürür
- `findBestMatch(query)`: En iyi eşleşen kategoriyi döndürür
- `getCategoryById(categoryId)`: Kategori ID'sine göre kategori bulur

**Arama Mantığı**:

1. Input string → küçük harfe çevir, trim, Türkçe karakter normalize et
2. `category.keywords` ve `subService.keywords` içinde geçenlerle eşleştir
3. Skor hesapla (kategori anahtar kelimesi: 10 puan, alt hizmet anahtar kelimesi: 5 puan)
4. En yüksek skorlu kategorileri döndür

### İş Eşleştirme Servisi (`lib/services/jobMatchingService.ts`)

- `matchesJob(job, providerPreferences)`: İş ve usta eşleşmesi kontrolü
- `filterMatchingJobs(jobs, providerPreferences)`: Birden fazla iş için eşleşme kontrolü

**Eşleştirme Mantığı**:

1. **"Diğer" seçeneği** (`isOther = true`):

   ```sql
   WHERE is_other = true
     AND main_category_id = ANY(provider.main_categories)
   ```

2. **Özel alt hizmet**:
   ```sql
   WHERE is_other = false
     AND main_category_id = ANY(provider.main_categories)
     AND subservice_id = ANY(provider.sub_services)
   ```

## Kullanım Örnekleri

### 1. Kullanıcı Arama Yapıyor

```typescript
import { searchServiceCategories } from "@/lib/services/serviceSearchService";

const results = searchServiceCategories("elektrik arızası", 5);
// En iyi eşleşen kategorileri döndürür
```

### 2. İş Oluşturma

```typescript
import { JobFormData } from "@/lib/types/service-categories";

const job: JobFormData = {
  mainCategoryId: "electricity",
  subServiceId: "home-repair",
  isOther: false,
  description: "Priz çalışmıyor, acil tamir lazım...",
  city: "İstanbul",
  district: "Kadıköy",
  addressText: "Bağdat Caddesi No:123",
  locationLat: 40.9923,
  locationLng: 29.0244,
};
```

### 3. Usta İşleri Görüntülüyor

```typescript
import { getMatchingJobsForProvider } from "@/lib/services/jobMatchingService";

const providerPreferences = {
  mainCategories: ["electricity", "plumbing"],
  subServices: ["home-repair", "small-leak-repair"],
};

// Prisma ile:
const matchingJobs = await prisma.job.findMany({
  where: {
    status: "PENDING",
    OR: [
      {
        isOther: true,
        mainCategoryId: { in: providerPreferences.mainCategories },
      },
      {
        isOther: false,
        mainCategoryId: { in: providerPreferences.mainCategories },
        subServiceId: { in: providerPreferences.subServices },
      },
    ],
  },
  orderBy: { createdAt: "desc" },
});
```

## Kategori Listesi (Örnekler)

1. Elektrik
2. Su Tesisatı
3. Doğalgaz
4. Kombi / Petek
5. Beyaz Eşya Tamiri
6. Klima Montaj / Servis
7. Çilingir
8. Boya / Badana
9. Alçı / Sıva / Alçıpan
10. Fayans / Seramik
    ... (150+ kategori)

## Dosya Yapısı

```
lib/
  types/
    service-categories.ts      # TypeScript tip tanımları
  data/
    service-categories.ts       # Tüm kategori verileri (150+ kategori)
  services/
    serviceSearchService.ts    # Arama servisi
    jobMatchingService.ts      # İş eşleştirme servisi
prisma/
  schema.prisma                # Veritabanı şeması (jobs, businesses güncellemesi)
```

## Notlar

- Tüm anahtar kelimeler **TÜRKÇE** olmalı
- Kullanıcı dili + usta dili + günlük konuşma + yazım hataları versiyonlarını içermeli
- Her alt hizmet için minimum **20 anahtar kelime** olmalı
- Her kategori için minimum **10 alt hizmet** olmalı
- Toplam **150+ ana kategori** olmalı
