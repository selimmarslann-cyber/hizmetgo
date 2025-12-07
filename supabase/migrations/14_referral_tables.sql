-- ============================================
-- REFERRAL TABLES MIGRATION
-- Referral sistemi tabloları: referral_codes, referral_relations, referral_rewards
-- Created: 2024-01-XX
-- ============================================

-- ============================================
-- 1. REFERRAL_CODES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE, -- users tablosunda id TEXT
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Foreign key constraint (users tablosu varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'referral_codes_user_id_fkey'
    ) THEN
      ALTER TABLE referral_codes 
        ADD CONSTRAINT referral_codes_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_referral_codes_user_id ON referral_codes(user_id);

-- ============================================
-- 2. REFERRAL_RELATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS referral_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id TEXT NOT NULL, -- users tablosunda id TEXT
  referred_user_id TEXT NOT NULL, -- users tablosunda id TEXT
  level INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(referred_user_id, level)
);

-- Foreign key constraints (users tablosu varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    -- referrer_user_id foreign key
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'referral_relations_referrer_user_id_fkey'
    ) THEN
      ALTER TABLE referral_relations 
        ADD CONSTRAINT referral_relations_referrer_user_id_fkey 
        FOREIGN KEY (referrer_user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
    -- referred_user_id foreign key
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'referral_relations_referred_user_id_fkey'
    ) THEN
      ALTER TABLE referral_relations 
        ADD CONSTRAINT referral_relations_referred_user_id_fkey 
        FOREIGN KEY (referred_user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_referral_relations_referrer_user_id ON referral_relations(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_referral_relations_referred_user_id ON referral_relations(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_referral_relations_level ON referral_relations(level);

-- ============================================
-- 3. REFERRAL_REWARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- users tablosunda id TEXT
  order_id UUID NOT NULL, -- orders tablosunda id UUID
  level INTEGER NOT NULL,
  gross_commission NUMERIC(18,2) NOT NULL,
  share_rate NUMERIC(5,4) NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Foreign key constraints (tablolar varsa)
DO $$
BEGIN
  -- user_id foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'referral_rewards_user_id_fkey'
    ) THEN
      ALTER TABLE referral_rewards 
        ADD CONSTRAINT referral_rewards_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
  -- order_id foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'referral_rewards_order_id_fkey'
    ) THEN
      ALTER TABLE referral_rewards 
        ADD CONSTRAINT referral_rewards_order_id_fkey 
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_referral_rewards_user_id ON referral_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_order_id ON referral_rewards(order_id);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_level ON referral_rewards(level);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_created_at ON referral_rewards(created_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_rewards ENABLE ROW LEVEL SECURITY;

-- Referral codes: users can view their own codes
DROP POLICY IF EXISTS "Users can view own referral codes" ON referral_codes;
CREATE POLICY "Users can view own referral codes" ON referral_codes FOR SELECT USING (auth.uid()::text = user_id);
DROP POLICY IF EXISTS "Users can insert own referral codes" ON referral_codes;
CREATE POLICY "Users can insert own referral codes" ON referral_codes FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Referral relations: users can view their own relations
DROP POLICY IF EXISTS "Users can view own referral relations" ON referral_relations;
CREATE POLICY "Users can view own referral relations" ON referral_relations FOR SELECT USING (
  auth.uid()::text = referrer_user_id OR auth.uid()::text = referred_user_id
);

-- Referral rewards: users can view their own rewards
DROP POLICY IF EXISTS "Users can view own referral rewards" ON referral_rewards;
CREATE POLICY "Users can view own referral rewards" ON referral_rewards FOR SELECT USING (auth.uid()::text = user_id);

-- Service role can manage all
DROP POLICY IF EXISTS "Service role can manage referral codes" ON referral_codes;
CREATE POLICY "Service role can manage referral codes" ON referral_codes FOR ALL USING (auth.role() = 'service_role');
DROP POLICY IF EXISTS "Service role can manage referral relations" ON referral_relations;
CREATE POLICY "Service role can manage referral relations" ON referral_relations FOR ALL USING (auth.role() = 'service_role');
DROP POLICY IF EXISTS "Service role can manage referral rewards" ON referral_rewards;
CREATE POLICY "Service role can manage referral rewards" ON referral_rewards FOR ALL USING (auth.role() = 'service_role');

COMMENT ON TABLE referral_codes IS 'Kullanici referral kodlari tablosu';
COMMENT ON TABLE referral_relations IS 'Referral iliskileri tablosu (referrer-referred)';
COMMENT ON TABLE referral_rewards IS 'Referral odulleri tablosu';

