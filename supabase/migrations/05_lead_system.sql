-- ============================================
-- LEAD SYSTEM MIGRATION
-- ============================================
-- Hizmet ilanı sistemi için lead (usta ödeme) yapısı
-- Created: 2024-01-XX
-- ============================================

-- ============================================
-- 1. SERVICE_CATEGORIES TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  level INT NOT NULL CHECK (level >= 1 AND level <= 10),
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_service_categories_slug ON service_categories(slug);
CREATE INDEX IF NOT EXISTS idx_service_categories_level ON service_categories(level);
CREATE INDEX IF NOT EXISTS idx_service_categories_active ON service_categories(is_active) WHERE is_active = true;

-- ============================================
-- 2. LEAD_LEVELS TABLOSU (Level -> Fee Mapping)
-- ============================================
CREATE TABLE IF NOT EXISTS lead_levels (
  level INT PRIMARY KEY CHECK (level >= 1 AND level <= 10),
  fee_tl INT NOT NULL CHECK (fee_tl > 0),
  description TEXT
);

-- Seed data: Level -> Fee mapping
INSERT INTO lead_levels (level, fee_tl, description) VALUES
  (1, 20, 'Çok küçük işler (priz, musluk, avize)'),
  (2, 25, 'Küçük işler'),
  (3, 30, 'Orta işler'),
  (4, 35, 'Orta-zor işler'),
  (5, 40, 'Zor işler'),
  (6, 50, 'Ağır işler'),
  (7, 60, 'Çok ağır işler (korkuluk, küpeşte vs.)'),
  (8, 70, 'Büyük tadilat'),
  (9, 80, 'Çatı / izolasyon / büyük imalat'),
  (10, 90, 'Yazılım, proje, büyük uzmanlık işleri')
ON CONFLICT (level) DO NOTHING;

-- ============================================
-- 3. SERVICE_CATEGORIES SEED DATA
-- ============================================
INSERT INTO service_categories (name, slug, level, description, is_active) VALUES
  ('Priz / Anahtar Değişimi', 'priz-anahtar', 1, 'Elektrik priz ve anahtar değişim işleri', true),
  ('Küçük Su Tesisat İşleri', 'kucuk-su-tesisat', 1, 'Musluk, batarya, küçük tesisat tamiri', true),
  ('Küçük Ev Aleti Tamiri', 'kucuk-ev-aleti', 2, 'Küçük ev aletleri tamir işleri', true),
  ('Beyaz Eşya Tamiri', 'beyaz-esya', 3, 'Buzdolabı, çamaşır makinesi, bulaşık makinesi tamiri', true),
  ('Kombi Bakım / Servis', 'kombi-bakim', 3, 'Kombi bakım ve servis işleri', true),
  ('Büyük Su Kaçağı / Tesisat', 'buyuk-tesisat', 4, 'Büyük tesisat işleri ve su kaçağı tamiri', true),
  ('Büyük Elektrik İşleri', 'buyuk-elektrik', 4, 'Büyük elektrik tesisat işleri', true),
  ('PVC Kapı / Pencere İşleri', 'pvc-kapi-pencere', 6, 'PVC kapı ve pencere montaj/tamir', true),
  ('Demir Doğrama / Küpeşte', 'demir-dograma', 7, 'Demir doğrama ve küpeşte işleri', true),
  ('Tadilat & Yenileme', 'tadilat-yenileme', 8, 'Genel tadilat ve yenileme işleri', true),
  ('Çatı & İzolasyon', 'cati-izolasyon', 9, 'Çatı tamiri ve izolasyon işleri', true),
  ('Yazılım / Uygulama Geliştirme', 'yazilim-uygulama', 10, 'Yazılım ve uygulama geliştirme projeleri', true),
  ('Klima Montaj / Servis', 'klima-montaj', 3, 'Klima montaj ve servis işleri', true),
  ('Boya Badana', 'boya-badana', 5, 'İç ve dış cephe boya işleri', true),
  ('Marangoz İşleri', 'marangoz', 6, 'Ahşap işleri ve marangozluk', true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. LISTINGS TABLOSUNA YENİ KOLONLAR EKLE
-- ============================================
DO $$
BEGIN
  -- service_category_id kolonu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'listings' 
    AND column_name = 'service_category_id'
  ) THEN
    ALTER TABLE listings 
      ADD COLUMN service_category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL;
  END IF;

  -- level kolonu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'listings' 
    AND column_name = 'level'
  ) THEN
    ALTER TABLE listings 
      ADD COLUMN level INT NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 10);
  END IF;

  -- lead_fee_tl kolonu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'listings' 
    AND column_name = 'lead_fee_tl'
  ) THEN
    ALTER TABLE listings 
      ADD COLUMN lead_fee_tl INT NOT NULL DEFAULT 20 CHECK (lead_fee_tl > 0);
  END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_listings_service_category ON listings(service_category_id);
CREATE INDEX IF NOT EXISTS idx_listings_level ON listings(level);

-- ============================================
-- 5. WALLET_TRANSACTIONS TABLOSUNA TYPE GÜNCELLEMESİ
-- ============================================
-- Mevcut wallet_transactions tablosunda source_type CHECK constraint'ini güncelle
-- 'lead_purchase' ve 'topup' tiplerini ekle
DO $$
BEGIN
  -- Eğer constraint varsa drop et
  ALTER TABLE wallet_transactions 
    DROP CONSTRAINT IF EXISTS wallet_transactions_source_type_check;
  
  -- Yeni constraint ekle (lead_purchase ve topup dahil)
  ALTER TABLE wallet_transactions 
    ADD CONSTRAINT wallet_transactions_source_type_check 
    CHECK (source_type IN ('deposit','withdraw','spend','referral','region','adjustment','lead_purchase','topup'));
EXCEPTION
  WHEN OTHERS THEN
    -- Constraint zaten yoksa veya farklı bir hata varsa devam et
    NULL;
END $$;

-- wallet_transactions'a listing_id kolonu ekle (lead_purchase için)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'wallet_transactions' 
    AND column_name = 'listing_id'
  ) THEN
    ALTER TABLE wallet_transactions 
      ADD COLUMN listing_id UUID REFERENCES listings(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_wallet_tx_listing ON wallet_transactions(listing_id);

-- ============================================
-- 6. LEAD_PURCHASES TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS lead_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  vendor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lead_fee_tl INT NOT NULL CHECK (lead_fee_tl > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(listing_id, vendor_id) -- Bir usta bir ilan için sadece bir kez ödeme yapabilir
);

CREATE INDEX IF NOT EXISTS idx_lead_purchases_listing ON lead_purchases(listing_id);
CREATE INDEX IF NOT EXISTS idx_lead_purchases_vendor ON lead_purchases(vendor_id);
CREATE INDEX IF NOT EXISTS idx_lead_purchases_created ON lead_purchases(created_at DESC);

-- ============================================
-- 7. RLS POLICIES
-- ============================================
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_purchases ENABLE ROW LEVEL SECURITY;

-- Service categories: Herkes okuyabilir (aktif olanlar)
DROP POLICY IF EXISTS "Anyone can view active service categories" ON service_categories;
CREATE POLICY "Anyone can view active service categories"
  ON service_categories FOR SELECT
  USING (is_active = true);

-- Service categories: Sadece service role yönetebilir
DROP POLICY IF EXISTS "Service role can manage service categories" ON service_categories;
CREATE POLICY "Service role can manage service categories"
  ON service_categories FOR ALL
  USING (auth.role() = 'service_role');

-- Lead levels: Herkes okuyabilir
DROP POLICY IF EXISTS "Anyone can view lead levels" ON lead_levels;
CREATE POLICY "Anyone can view lead levels"
  ON lead_levels FOR SELECT
  USING (true);

-- Lead levels: Sadece service role yönetebilir
DROP POLICY IF EXISTS "Service role can manage lead levels" ON lead_levels;
CREATE POLICY "Service role can manage lead levels"
  ON lead_levels FOR ALL
  USING (auth.role() = 'service_role');

-- Lead purchases: Usta kendi satın alımlarını görebilir
DROP POLICY IF EXISTS "Vendors can view their own lead purchases" ON lead_purchases;
CREATE POLICY "Vendors can view their own lead purchases"
  ON lead_purchases FOR SELECT
  USING (auth.uid()::text = vendor_id);

-- Lead purchases: Service role tümünü görebilir
DROP POLICY IF EXISTS "Service role can view all lead purchases" ON lead_purchases;
CREATE POLICY "Service role can view all lead purchases"
  ON lead_purchases FOR SELECT
  USING (auth.role() = 'service_role');

-- Lead purchases: Sadece service role insert edebilir (API üzerinden)
DROP POLICY IF EXISTS "Service role can insert lead purchases" ON lead_purchases;
CREATE POLICY "Service role can insert lead purchases"
  ON lead_purchases FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- 8. COMMENTS
-- ============================================
COMMENT ON TABLE service_categories IS 
  'Hizmet kategorileri: Her kategori bir level (1-10) ve slug içerir. Level admin tarafından belirlenir.';
COMMENT ON TABLE lead_levels IS 
  'Level-fee mapping: Her level (1-10) için sabit lead ücreti (TL).';
COMMENT ON TABLE lead_purchases IS 
  'Usta lead satın alımları: Hangi usta hangi ilan için ödeme yapmış.';
COMMENT ON COLUMN listings.service_category_id IS 
  'İlanın ait olduğu hizmet kategorisi (AI tarafından otomatik atanır).';
COMMENT ON COLUMN listings.level IS 
  'İlanın zorluk seviyesi (1-10). Kategori level''inden otomatik gelir.';
COMMENT ON COLUMN listings.lead_fee_tl IS 
  'Usta için iletişim açma ücreti (TL). Level''den otomatik gelir.';

