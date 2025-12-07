-- ============================================
-- WALLET SYSTEM MIGRATION
-- Cüzdan sistemi: wallets, payout_requests
-- Created: 2025-11-29
-- ============================================

-- ============================================
-- ENUMS
-- ============================================
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payout_status') THEN
    CREATE TYPE payout_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID');
  END IF;
END $$;

-- ============================================
-- 1. WALLETS TABLE (zaten 03_referral_commissions.sql'de oluşturulmuş, sadece eksik kolonları ekle)
-- ============================================
-- wallets tablosu zaten var (03_referral_commissions.sql'de TEXT user_id ile)
-- Eksik kolonları ekle
DO $$
BEGIN
  -- pending_balance kolonu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'wallets' 
    AND column_name = 'pending_balance'
  ) THEN
    ALTER TABLE wallets 
      ADD COLUMN pending_balance NUMERIC(18,2) NOT NULL DEFAULT 0;
  END IF;

  -- currency kolonu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'wallets' 
    AND column_name = 'currency'
  ) THEN
    ALTER TABLE wallets 
      ADD COLUMN currency TEXT NOT NULL DEFAULT 'TRY';
  END IF;

  -- created_at kolonu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'wallets' 
    AND column_name = 'created_at'
  ) THEN
    ALTER TABLE wallets 
      ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT now();
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);

-- ============================================
-- 2. PAYOUT_REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id TEXT NOT NULL, -- wallets tablosunda user_id TEXT, bu yüzden wallet_id TEXT
  user_id TEXT NOT NULL, -- users tablosunda id TEXT
  amount NUMERIC(18,2) NOT NULL,
  status payout_status NOT NULL DEFAULT 'PENDING',
  iban TEXT,
  notes TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Foreign key constraints (tablolar varsa)
DO $$
BEGIN
  -- wallet_id foreign key (wallets.user_id'ye referans)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'wallets') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'payout_requests_wallet_id_fkey'
    ) THEN
      ALTER TABLE payout_requests 
        ADD CONSTRAINT payout_requests_wallet_id_fkey 
        FOREIGN KEY (wallet_id) REFERENCES wallets(user_id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- user_id foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'payout_requests_user_id_fkey'
    ) THEN
      ALTER TABLE payout_requests 
        ADD CONSTRAINT payout_requests_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_payout_requests_wallet_id ON payout_requests(wallet_id);
CREATE INDEX IF NOT EXISTS idx_payout_requests_user_id ON payout_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_payout_requests_status ON payout_requests(status);
CREATE INDEX IF NOT EXISTS idx_payout_requests_requested_at ON payout_requests(requested_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE payout_requests ENABLE ROW LEVEL SECURITY;

-- Wallets: users can view their own wallets
DROP POLICY IF EXISTS "Users can view own wallet" ON wallets;
CREATE POLICY "Users can view own wallet" ON wallets FOR SELECT USING (auth.uid()::text = user_id);
DROP POLICY IF EXISTS "Users can update own wallet" ON wallets;
CREATE POLICY "Users can update own wallet" ON wallets FOR UPDATE USING (auth.uid()::text = user_id);

-- Payout requests: users can view their own requests
DROP POLICY IF EXISTS "Users can view own payout requests" ON payout_requests;
CREATE POLICY "Users can view own payout requests" ON payout_requests FOR SELECT USING (auth.uid()::text = user_id);
DROP POLICY IF EXISTS "Users can create payout requests" ON payout_requests;
CREATE POLICY "Users can create payout requests" ON payout_requests FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Service role can manage all
DROP POLICY IF EXISTS "Service role can manage wallets" ON wallets;
CREATE POLICY "Service role can manage wallets" ON wallets FOR ALL USING (auth.role() = 'service_role');
DROP POLICY IF EXISTS "Service role can manage payout requests" ON payout_requests;
CREATE POLICY "Service role can manage payout requests" ON payout_requests FOR ALL USING (auth.role() = 'service_role');

COMMENT ON TABLE wallets IS 'Kullanıcı cüzdanları tablosu';
COMMENT ON TABLE payout_requests IS 'Çekim talepleri tablosu';
