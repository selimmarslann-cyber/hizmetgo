-- ============================================
-- VENDOR VERIFICATION SYSTEM MIGRATION
-- ============================================
-- Usta doğrulama ve kalite kontrolü sistemi
-- Created: 2024-01-XX
-- ============================================

-- ============================================
-- 1. VENDOR_VERIFICATIONS TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS vendor_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL,
  verification_type TEXT NOT NULL CHECK (verification_type IN (
    'identity',        -- Kimlik doğrulama
    'certificate',     -- Sertifika
    'license',        -- Lisans
    'insurance',      -- Sigorta
    'background_check' -- Geçmiş kontrolü
  )),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  document_url TEXT, -- Belge URL'i (Supabase Storage)
  document_type TEXT, -- 'id_card', 'certificate', 'license', etc.
  verified_by TEXT, -- Admin user_id
  verified_at TIMESTAMPTZ,
  expiry_date TIMESTAMPTZ, -- Sertifika/lisans son kullanma tarihi
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(vendor_id, verification_type) -- Bir usta bir tip için sadece bir doğrulama
);

-- Foreign key constraints (tablolar varsa)
DO $$
BEGIN
  -- vendor_id foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'vendor_verifications_vendor_id_fkey'
    ) THEN
      ALTER TABLE vendor_verifications 
        ADD CONSTRAINT vendor_verifications_vendor_id_fkey 
        FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- verified_by foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'vendor_verifications_verified_by_fkey'
    ) THEN
      ALTER TABLE vendor_verifications 
        ADD CONSTRAINT vendor_verifications_verified_by_fkey 
        FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_vendor_verifications_vendor ON vendor_verifications(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_verifications_type ON vendor_verifications(verification_type);
CREATE INDEX IF NOT EXISTS idx_vendor_verifications_status ON vendor_verifications(status);
CREATE INDEX IF NOT EXISTS idx_vendor_verifications_expiry ON vendor_verifications(expiry_date) WHERE expiry_date IS NOT NULL;

-- ============================================
-- 2. VENDOR_QUALITY_SCORES TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS vendor_quality_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL,
  overall_score DECIMAL(5,2) NOT NULL DEFAULT 0 CHECK (overall_score >= 0 AND overall_score <= 100),
  response_time_score DECIMAL(5,2) DEFAULT 0, -- Yanıt süresi skoru
  completion_rate_score DECIMAL(5,2) DEFAULT 0, -- Tamamlanma oranı skoru
  customer_rating_score DECIMAL(5,2) DEFAULT 0, -- Müşteri puanı skoru
  verification_score DECIMAL(5,2) DEFAULT 0, -- Doğrulama skoru
  refund_rate_score DECIMAL(5,2) DEFAULT 0, -- İade oranı skoru (düşük iade = yüksek skor)
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(vendor_id) -- Her usta için bir skor
);

-- Foreign key constraint (users tablosu varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'vendor_quality_scores_vendor_id_fkey'
    ) THEN
      ALTER TABLE vendor_quality_scores 
        ADD CONSTRAINT vendor_quality_scores_vendor_id_fkey 
        FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_vendor_quality_scores_vendor ON vendor_quality_scores(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_quality_scores_overall ON vendor_quality_scores(overall_score DESC);

-- ============================================
-- 3. BUSINESSES TABLOSUNA YENİ KOLONLAR
-- ============================================
DO $$
BEGIN
  -- verification_status: Usta doğrulama durumu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'businesses' 
    AND column_name = 'verification_status'
  ) THEN
    ALTER TABLE businesses 
      ADD COLUMN verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected'));
  END IF;

  -- quality_score: Kalite skoru (cache)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'businesses' 
    AND column_name = 'quality_score'
  ) THEN
    ALTER TABLE businesses 
      ADD COLUMN quality_score DECIMAL(5,2) DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100);
  END IF;

  -- verified_at: Doğrulama tarihi
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'businesses' 
    AND column_name = 'verified_at'
  ) THEN
    ALTER TABLE businesses 
      ADD COLUMN verified_at TIMESTAMPTZ;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_businesses_verification_status ON businesses(verification_status);
CREATE INDEX IF NOT EXISTS idx_businesses_quality_score ON businesses(quality_score DESC);

-- ============================================
-- 4. FONKSİYON: VENDOR QUALITY SCORE HESAPLA
-- ============================================
CREATE OR REPLACE FUNCTION calculate_vendor_quality_score(
  p_vendor_id TEXT
)
RETURNS DECIMAL AS $$
DECLARE
  v_response_time_score DECIMAL := 0;
  v_completion_rate_score DECIMAL := 0;
  v_customer_rating_score DECIMAL := 0;
  v_verification_score DECIMAL := 0;
  v_refund_rate_score DECIMAL := 0;
  v_overall_score DECIMAL := 0;
  
  v_avg_response_time NUMERIC;
  v_completion_rate NUMERIC;
  v_avg_rating NUMERIC;
  v_verification_count INT;
  v_refund_rate NUMERIC;
  v_total_leads INT;
  v_completed_leads INT;
  v_refunded_leads INT;
BEGIN
  -- 1. Response Time Score (0-25 puan)
  -- Ortalama yanıt süresini hesapla (saat cinsinden)
  SELECT AVG(EXTRACT(EPOCH FROM (contact_made_at - created_at)) / 3600)
  INTO v_avg_response_time
  FROM lead_purchases
  WHERE vendor_id = p_vendor_id
    AND contact_made_at IS NOT NULL
    AND created_at > NOW() - INTERVAL '90 days'; -- Son 90 gün

  IF v_avg_response_time IS NOT NULL THEN
    -- 24 saat içinde = 25 puan, 48 saat = 20 puan, 72 saat = 15 puan, 96 saat = 10 puan, 120+ saat = 5 puan
    IF v_avg_response_time <= 24 THEN
      v_response_time_score := 25;
    ELSIF v_avg_response_time <= 48 THEN
      v_response_time_score := 20;
    ELSIF v_avg_response_time <= 72 THEN
      v_response_time_score := 15;
    ELSIF v_avg_response_time <= 96 THEN
      v_response_time_score := 10;
    ELSE
      v_response_time_score := 5;
    END IF;
  END IF;

  -- 2. Completion Rate Score (0-25 puan)
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE job_status = 'completed')
  INTO v_total_leads, v_completed_leads
  FROM lead_purchases
  WHERE vendor_id = p_vendor_id
    AND created_at > NOW() - INTERVAL '90 days';

  IF v_total_leads > 0 THEN
    v_completion_rate := (v_completed_leads::NUMERIC / v_total_leads::NUMERIC) * 100;
    v_completion_rate_score := (v_completion_rate / 100) * 25; -- %100 = 25 puan
  END IF;

  -- 3. Customer Rating Score (0-25 puan)
  -- Business reviews'den ortalama rating al
  SELECT AVG(rating)
  INTO v_avg_rating
  FROM reviews r
  JOIN businesses b ON r.business_id = b.id
  WHERE b.owner_user_id = p_vendor_id
    AND r.created_at > NOW() - INTERVAL '90 days';

  IF v_avg_rating IS NOT NULL THEN
    v_customer_rating_score := (v_avg_rating / 5.0) * 25; -- 5 yıldız = 25 puan
  END IF;

  -- 4. Verification Score (0-15 puan)
  -- Doğrulanmış verification sayısı
  SELECT COUNT(*)
  INTO v_verification_count
  FROM vendor_verifications
  WHERE vendor_id = p_vendor_id
    AND status = 'approved'
    AND (expiry_date IS NULL OR expiry_date > NOW());

  -- Her doğrulama 3 puan (max 5 doğrulama = 15 puan)
  v_verification_score := LEAST(v_verification_count * 3, 15);

  -- 5. Refund Rate Score (0-10 puan)
  -- Düşük iade oranı = yüksek skor
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE refund_processed = true)
  INTO v_total_leads, v_refunded_leads
  FROM lead_purchases
  WHERE vendor_id = p_vendor_id
    AND created_at > NOW() - INTERVAL '90 days';

  IF v_total_leads > 0 THEN
    v_refund_rate := (v_refunded_leads::NUMERIC / v_total_leads::NUMERIC) * 100;
    -- %0 iade = 10 puan, %10 iade = 5 puan, %20+ iade = 0 puan
    IF v_refund_rate = 0 THEN
      v_refund_rate_score := 10;
    ELSIF v_refund_rate <= 10 THEN
      v_refund_rate_score := 10 - (v_refund_rate / 10) * 5;
    ELSE
      v_refund_rate_score := 0;
    END IF;
  END IF;

  -- Toplam skor
  v_overall_score := v_response_time_score + v_completion_rate_score + 
                     v_customer_rating_score + v_verification_score + v_refund_rate_score;

  RETURN v_overall_score;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. FONKSİYON: VENDOR QUALITY SCORE GÜNCELLE
-- ============================================
CREATE OR REPLACE FUNCTION update_vendor_quality_score(
  p_vendor_id TEXT
)
RETURNS VOID AS $$
DECLARE
  v_score DECIMAL;
BEGIN
  -- Skoru hesapla
  v_score := calculate_vendor_quality_score(p_vendor_id);

  -- vendor_quality_scores tablosuna kaydet
  INSERT INTO vendor_quality_scores (
    vendor_id,
    overall_score,
    calculated_at,
    updated_at
  ) VALUES (
    p_vendor_id,
    v_score,
    NOW(),
    NOW()
  )
  ON CONFLICT (vendor_id) DO UPDATE
  SET overall_score = v_score,
      calculated_at = NOW(),
      updated_at = NOW();

  -- businesses tablosundaki quality_score'u güncelle
  UPDATE businesses
  SET quality_score = v_score
  WHERE owner_user_id = p_vendor_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. RLS POLICIES
-- ============================================
ALTER TABLE vendor_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_quality_scores ENABLE ROW LEVEL SECURITY;

-- Vendor verifications: Usta kendi doğrulamalarını görebilir
DROP POLICY IF EXISTS "Vendors can view their own verifications" ON vendor_verifications;
CREATE POLICY "Vendors can view their own verifications"
  ON vendor_verifications FOR SELECT
  USING (auth.uid()::text = vendor_id);

-- Vendor verifications: Service role tümünü görebilir
DROP POLICY IF EXISTS "Service role can view all verifications" ON vendor_verifications;
CREATE POLICY "Service role can view all verifications"
  ON vendor_verifications FOR SELECT
  USING (auth.role() = 'service_role');

-- Vendor verifications: Service role yönetebilir
DROP POLICY IF EXISTS "Service role can manage verifications" ON vendor_verifications;
CREATE POLICY "Service role can manage verifications"
  ON vendor_verifications FOR ALL
  USING (auth.role() = 'service_role');

-- Vendor quality scores: Usta kendi skorunu görebilir
DROP POLICY IF EXISTS "Vendors can view their own quality score" ON vendor_quality_scores;
CREATE POLICY "Vendors can view their own quality score"
  ON vendor_quality_scores FOR SELECT
  USING (auth.uid()::text = vendor_id);

-- Vendor quality scores: Service role tümünü görebilir
DROP POLICY IF EXISTS "Service role can view all quality scores" ON vendor_quality_scores;
CREATE POLICY "Service role can view all quality scores"
  ON vendor_quality_scores FOR SELECT
  USING (auth.role() = 'service_role');

-- ============================================
-- 7. COMMENTS
-- ============================================
COMMENT ON TABLE vendor_verifications IS 
  'Usta doğrulama kayıtları: Kimlik, sertifika, lisans, sigorta, geçmiş kontrolü';
COMMENT ON TABLE vendor_quality_scores IS 
  'Usta kalite skorları: Performans metriklerine göre hesaplanan skorlar';
COMMENT ON FUNCTION calculate_vendor_quality_score IS 
  'Usta kalite skorunu hesaplar (0-100 arası)';
COMMENT ON FUNCTION update_vendor_quality_score IS 
  'Usta kalite skorunu hesaplayıp günceller';

