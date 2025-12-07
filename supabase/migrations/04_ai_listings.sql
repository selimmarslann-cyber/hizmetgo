-- AI Listings and Blocks Tables
-- Created: 2024-01-15

-- AI Blocks Table - Kullanıcı ban sistemi
-- NOT: Mevcut tabloda user_id UUID olarak var, değiştirme!
CREATE TABLE IF NOT EXISTS ai_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- Mevcut yapıyı koru (UUID)
  blocked_until TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Foreign key constraint'i ayrı ekle (users tablosu varsa ve constraint yoksa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'ai_blocks_user_id_fkey'
    ) THEN
      ALTER TABLE ai_blocks 
        ADD CONSTRAINT ai_blocks_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_blocks_user_id ON ai_blocks(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_blocks_blocked_until ON ai_blocks(blocked_until);

-- Listings Table - Müşteri ilanları
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category VARCHAR(100),
  description TEXT NOT NULL,
  date VARCHAR(50), -- 'YYYY-MM-DD', 'acil', 'esnek'
  priority VARCHAR(20) DEFAULT 'normal', -- 'acil', 'normal', 'esnek'
  address TEXT,
  price_range VARCHAR(100),
  status VARCHAR(20) DEFAULT 'open', -- 'open', 'closed', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Foreign key constraint'i ayrı ekle (users tablosu varsa ve constraint yoksa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'listings_user_id_fkey'
    ) THEN
      ALTER TABLE listings 
        ADD CONSTRAINT listings_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

-- Indexes for listings
CREATE INDEX IF NOT EXISTS idx_listings_user_id ON listings(user_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);

-- RLS Policies
ALTER TABLE ai_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- AI Blocks Policies
DROP POLICY IF EXISTS "Users can view their own block status" ON ai_blocks;
CREATE POLICY "Users can view their own block status"
  ON ai_blocks FOR SELECT
  USING (auth.uid()::uuid = user_id::uuid);

DROP POLICY IF EXISTS "Service role can manage all blocks" ON ai_blocks;
CREATE POLICY "Service role can manage all blocks"
  ON ai_blocks FOR ALL
  USING (auth.role() = 'service_role');

-- Listings Policies
DROP POLICY IF EXISTS "Users can view their own listings" ON listings;
CREATE POLICY "Users can view their own listings"
  ON listings FOR SELECT
  USING (auth.uid()::uuid = user_id);

DROP POLICY IF EXISTS "Users can insert their own listings" ON listings;
CREATE POLICY "Users can insert their own listings"
  ON listings FOR INSERT
  WITH CHECK (auth.uid()::uuid = user_id);

DROP POLICY IF EXISTS "Users can update their own listings" ON listings;
CREATE POLICY "Users can update their own listings"
  ON listings FOR UPDATE
  USING (auth.uid()::uuid = user_id);

DROP POLICY IF EXISTS "Service role can manage all listings" ON listings;
CREATE POLICY "Service role can manage all listings"
  ON listings FOR ALL
  USING (auth.role() = 'service_role');

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_ai_blocks_updated_at ON ai_blocks;
CREATE TRIGGER update_ai_blocks_updated_at
  BEFORE UPDATE ON ai_blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_listings_updated_at ON listings;
CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

