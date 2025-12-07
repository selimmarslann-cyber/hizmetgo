-- ============================================
-- LEAD GUARANTEE SYSTEM MIGRATION
-- ============================================
-- Lead iade politikası ve garanti sistemi
-- Created: 2024-01-XX
-- ============================================

-- ============================================
-- 1. LEAD_REFUNDS TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS lead_refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_purchase_id UUID NOT NULL,
  listing_id UUID NOT NULL,
  vendor_id TEXT NOT NULL,
  refund_reason TEXT NOT NULL CHECK (refund_reason IN (
    'no_contact',           -- Usta 24 saat içinde iletişime geçmedi
    'customer_cancelled',   -- Müşteri iptal etti
    'vendor_cancelled',     -- Usta iptal etti
    'duplicate_lead',       -- Duplicate lead (aynı usta aynı lead'i iki kez aldı)
    'job_not_completed',    -- İş tamamlanmadı
    'quality_issue',        -- Kalite sorunu
    'other'                 -- Diğer
  )),
  refund_amount_tl INT NOT NULL CHECK (refund_amount_tl > 0),
  refund_status TEXT NOT NULL DEFAULT 'pending' CHECK (refund_status IN ('pending', 'approved', 'rejected', 'processed')),
  processed_at TIMESTAMPTZ,
  processed_by TEXT, -- Admin user_id
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_refunds_lead_purchase ON lead_refunds(lead_purchase_id);
CREATE INDEX IF NOT EXISTS idx_lead_refunds_listing ON lead_refunds(listing_id);
CREATE INDEX IF NOT EXISTS idx_lead_refunds_vendor ON lead_refunds(vendor_id);
CREATE INDEX IF NOT EXISTS idx_lead_refunds_status ON lead_refunds(refund_status);
CREATE INDEX IF NOT EXISTS idx_lead_refunds_created ON lead_refunds(created_at DESC);

-- Foreign key constraints (tablolar varsa)
DO $$
BEGIN
  -- lead_purchases foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'lead_purchases') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'lead_refunds_lead_purchase_id_fkey'
    ) THEN
      ALTER TABLE lead_refunds 
        ADD CONSTRAINT lead_refunds_lead_purchase_id_fkey 
        FOREIGN KEY (lead_purchase_id) REFERENCES lead_purchases(id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- listings foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'listings') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'lead_refunds_listing_id_fkey'
    ) THEN
      ALTER TABLE lead_refunds 
        ADD CONSTRAINT lead_refunds_listing_id_fkey 
        FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- users foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'lead_refunds_vendor_id_fkey'
    ) THEN
      ALTER TABLE lead_refunds 
        ADD CONSTRAINT lead_refunds_vendor_id_fkey 
        FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

-- Foreign key for processed_by (users tablosu varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'lead_refunds_processed_by_fkey'
    ) THEN
      ALTER TABLE lead_refunds 
        ADD CONSTRAINT lead_refunds_processed_by_fkey 
        FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

-- ============================================
-- 2. LEAD_PURCHASES TABLOSUNA YENİ KOLONLAR
-- ============================================
DO $$
BEGIN
  -- contact_made_at: Usta iletişime geçti mi?
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'lead_purchases' 
    AND column_name = 'contact_made_at'
  ) THEN
    ALTER TABLE lead_purchases 
      ADD COLUMN contact_made_at TIMESTAMPTZ;
  END IF;

  -- job_status: İş durumu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'lead_purchases' 
    AND column_name = 'job_status'
  ) THEN
    ALTER TABLE lead_purchases 
      ADD COLUMN job_status TEXT DEFAULT 'pending' CHECK (job_status IN ('pending', 'contacted', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled'));
  END IF;

  -- cancelled_at: İptal tarihi
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'lead_purchases' 
    AND column_name = 'cancelled_at'
  ) THEN
    ALTER TABLE lead_purchases 
      ADD COLUMN cancelled_at TIMESTAMPTZ;
  END IF;

  -- cancelled_by: Kim iptal etti
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'lead_purchases' 
    AND column_name = 'cancelled_by'
  ) THEN
    ALTER TABLE lead_purchases 
      ADD COLUMN cancelled_by TEXT CHECK (cancelled_by IN ('customer', 'vendor', 'admin'));
  END IF;

  -- refund_requested: İade talebi var mı?
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'lead_purchases' 
    AND column_name = 'refund_requested'
  ) THEN
    ALTER TABLE lead_purchases 
      ADD COLUMN refund_requested BOOLEAN DEFAULT false;
  END IF;

  -- refund_processed: İade işlendi mi?
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'lead_purchases' 
    AND column_name = 'refund_processed'
  ) THEN
    ALTER TABLE lead_purchases 
      ADD COLUMN refund_processed BOOLEAN DEFAULT false;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_lead_purchases_contact_made ON lead_purchases(contact_made_at);
CREATE INDEX IF NOT EXISTS idx_lead_purchases_job_status ON lead_purchases(job_status);
CREATE INDEX IF NOT EXISTS idx_lead_purchases_refund_requested ON lead_purchases(refund_requested) WHERE refund_requested = true;

-- ============================================
-- 3. LISTINGS TABLOSUNA YENİ KOLONLAR
-- ============================================
DO $$
BEGIN
  -- cancelled_at: İlan iptal tarihi
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'listings' 
    AND column_name = 'cancelled_at'
  ) THEN
    ALTER TABLE listings 
      ADD COLUMN cancelled_at TIMESTAMPTZ;
  END IF;

  -- cancelled_by: Kim iptal etti
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'listings' 
    AND column_name = 'cancelled_by'
  ) THEN
    ALTER TABLE listings 
      ADD COLUMN cancelled_by TEXT CHECK (cancelled_by IN ('customer', 'admin'));
  END IF;

  -- cancellation_reason: İptal nedeni
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'listings' 
    AND column_name = 'cancellation_reason'
  ) THEN
    ALTER TABLE listings 
      ADD COLUMN cancellation_reason TEXT;
  END IF;
END $$;

-- ============================================
-- 4. FONKSİYON: OTOMATİK LEAD İADE KONTROLÜ
-- ============================================
CREATE OR REPLACE FUNCTION check_lead_refund_eligibility()
RETURNS TRIGGER AS $$
DECLARE
  v_lead_purchase RECORD;
  v_hours_since_purchase NUMERIC;
  v_refund_exists BOOLEAN;
BEGIN
  -- 24 saat icinde iletisim kurulmamis leadleri kontrol et
  FOR v_lead_purchase IN 
    SELECT lp.*
    FROM lead_purchases lp
    WHERE lp.contact_made_at IS NULL
      AND lp.refund_requested = false
      AND lp.refund_processed = false
      AND lp.created_at < NOW() - INTERVAL '24 hours'
  LOOP
    -- Bu lead için zaten iade talebi var mı?
    SELECT EXISTS(
      SELECT 1 FROM lead_refunds 
      WHERE lead_purchase_id = v_lead_purchase.id 
        AND refund_status IN ('pending', 'approved')
    ) INTO v_refund_exists;

    -- Eğer yoksa otomatik iade talebi oluştur
    IF NOT v_refund_exists THEN
      INSERT INTO lead_refunds (
        lead_purchase_id,
        listing_id,
        vendor_id,
        refund_reason,
        refund_amount_tl,
        refund_status
      ) VALUES (
        v_lead_purchase.id,
        v_lead_purchase.listing_id,
        v_lead_purchase.vendor_id,
        'no_contact',
        v_lead_purchase.lead_fee_tl,
        'approved' -- Otomatik onay (24 saat kuralı)
      );

      -- lead_purchases'ı güncelle
      UPDATE lead_purchases
      SET refund_requested = true
      WHERE id = v_lead_purchase.id;
    END IF;
  END LOOP;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. TRIGGER: PERİYODİK İADE KONTROLÜ
-- ============================================
-- NOT: Bu trigger'ı bir cron job veya scheduled task ile çalıştırmak gerekir
-- Şimdilik manuel olarak çalıştırılabilir: SELECT check_lead_refund_eligibility();

-- ============================================
-- 6. FONKSİYON: LEAD İADESİ İŞLE
-- ============================================
CREATE OR REPLACE FUNCTION process_lead_refund(
  p_refund_id UUID,
  p_admin_user_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_refund RECORD;
  v_wallet_id TEXT;
BEGIN
  -- İade kaydını al
  SELECT * INTO v_refund
  FROM lead_refunds
  WHERE id = p_refund_id
    AND refund_status = 'approved';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Refund not found or not approved';
  END IF;

  -- Ustanın cüzdanını bul (Prisma Wallet modeli)
  -- NOT: Supabase'de wallets tablosu var, Prisma'da Wallet modeli var
  -- Burada Supabase wallets tablosunu kullanıyoruz
  SELECT user_id INTO v_wallet_id
  FROM wallets
  WHERE user_id = v_refund.vendor_id;

  -- Cüzdan yoksa oluştur
  IF v_wallet_id IS NULL THEN
    INSERT INTO wallets (user_id, balance, updated_at)
    VALUES (v_refund.vendor_id, 0, NOW())
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  -- Cüzdana iade tutarını ekle
  UPDATE wallets
  SET balance = balance + v_refund.refund_amount_tl,
      updated_at = NOW()
  WHERE user_id = v_refund.vendor_id;

  -- Wallet transaction kaydı oluştur
  INSERT INTO wallet_transactions (
    user_id,
    listing_id,
    source_type,
    amount,
    created_at
  ) VALUES (
    v_refund.vendor_id,
    v_refund.listing_id,
    'adjustment', -- lead_refund type'ı henüz eklenmedi, adjustment kullan
    v_refund.refund_amount_tl,
    NOW()
  );

  -- İade durumunu güncelle
  UPDATE lead_refunds
  SET refund_status = 'processed',
      processed_at = NOW(),
      processed_by = p_admin_user_id
  WHERE id = p_refund_id;

  -- lead_purchases'ı güncelle
  UPDATE lead_purchases
  SET refund_processed = true
  WHERE id = v_refund.lead_purchase_id;

  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 7. WALLET_TRANSACTIONS'A YENİ TYPE
-- ============================================
DO $$
BEGIN
  -- lead_refund type'ını ekle
  ALTER TABLE wallet_transactions 
    DROP CONSTRAINT IF EXISTS wallet_transactions_source_type_check;
  
  ALTER TABLE wallet_transactions 
    ADD CONSTRAINT wallet_transactions_source_type_check 
    CHECK (source_type IN ('deposit','withdraw','spend','referral','region','adjustment','lead_purchase','topup','lead_refund'));
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- ============================================
-- 8. RLS POLICIES
-- ============================================
ALTER TABLE lead_refunds ENABLE ROW LEVEL SECURITY;

-- Lead refunds: Usta kendi iadelerini görebilir
DROP POLICY IF EXISTS "Vendors can view their own refunds" ON lead_refunds;
CREATE POLICY "Vendors can view their own refunds"
  ON lead_refunds FOR SELECT
  USING (auth.uid()::text = vendor_id);

-- Lead refunds: Service role tümünü görebilir
DROP POLICY IF EXISTS "Service role can view all refunds" ON lead_refunds;
CREATE POLICY "Service role can view all refunds"
  ON lead_refunds FOR SELECT
  USING (auth.role() = 'service_role');

-- Lead refunds: Service role yönetebilir
DROP POLICY IF EXISTS "Service role can manage refunds" ON lead_refunds;
CREATE POLICY "Service role can manage refunds"
  ON lead_refunds FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- 9. COMMENTS
-- ============================================
COMMENT ON TABLE lead_refunds IS 
  'Lead iade kayitlari: Garanti sistemi icin iade talepleri ve islemleri';
COMMENT ON FUNCTION check_lead_refund_eligibility IS 
  '24 saat icinde iletisim kurulmamis leadleri otomatik olarak iade icin isaretler';
COMMENT ON FUNCTION process_lead_refund IS 
  'Onaylanmis iade talebini isler ve ustanin cuzdanina para iade eder';

