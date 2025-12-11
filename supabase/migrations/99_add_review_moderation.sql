-- ============================================
-- ADD REVIEW MODERATION STATUS
-- Reviews tablosuna moderation_status ve approved_at kolonlarını ekler
-- ============================================

-- moderation_status kolonunu ekle (varsa hata vermez)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'moderation_status'
  ) THEN
    ALTER TABLE reviews ADD COLUMN moderation_status TEXT DEFAULT 'PENDING';
  END IF;
END $$;

-- approved_at kolonunu ekle (varsa hata vermez)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'approved_at'
  ) THEN
    ALTER TABLE reviews ADD COLUMN approved_at TIMESTAMPTZ;
  END IF;
END $$;

-- Index'leri ekle
CREATE INDEX IF NOT EXISTS idx_reviews_moderation_status ON reviews(moderation_status);
CREATE INDEX IF NOT EXISTS idx_reviews_approved_at ON reviews(approved_at);

-- Mevcut review'ları PENDING olarak işaretle (eğer null ise)
UPDATE reviews SET moderation_status = 'PENDING' WHERE moderation_status IS NULL;

