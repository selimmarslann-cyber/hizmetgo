-- ============================================
-- JOBS SYSTEM MIGRATION
-- İş sistemi: jobs, job_offers, job_notifications, instant_jobs, instant_job_offers
-- Created: 2025-11-29
-- ============================================

-- ============================================
-- ENUMS (Sadece yoksa oluştur)
-- ============================================
DO $$ BEGIN
  CREATE TYPE job_status AS ENUM ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE job_offer_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE instant_job_status AS ENUM ('OPEN', 'ACCEPTED', 'COMPLETED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE instant_job_offer_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 1. JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  main_category_id TEXT NOT NULL,
  sub_service_id TEXT,
  is_other BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  address_text TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  scheduled_at TIMESTAMPTZ,
  status job_status NOT NULL DEFAULT 'PENDING',
  accepted_by_business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jobs_customer_id ON jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_main_category_id ON jobs(main_category_id);
CREATE INDEX IF NOT EXISTS idx_jobs_sub_service_id ON jobs(sub_service_id);
CREATE INDEX IF NOT EXISTS idx_jobs_is_other ON jobs(is_other);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_accepted_by_business_id ON jobs(accepted_by_business_id);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at);

-- ============================================
-- 2. JOB_OFFERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2),
  message TEXT,
  status job_offer_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, business_id)
);

CREATE INDEX IF NOT EXISTS idx_job_offers_job_id ON job_offers(job_id);
CREATE INDEX IF NOT EXISTS idx_job_offers_business_id ON job_offers(business_id);
CREATE INDEX IF NOT EXISTS idx_job_offers_status ON job_offers(status);
CREATE INDEX IF NOT EXISTS idx_job_offers_created_at ON job_offers(created_at);

-- ============================================
-- 3. JOB_NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS job_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, business_id)
);

CREATE INDEX IF NOT EXISTS idx_job_notifications_job_id ON job_notifications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_notifications_business_id ON job_notifications(business_id);
CREATE INDEX IF NOT EXISTS idx_job_notifications_sent_at ON job_notifications(sent_at);

-- ============================================
-- 4. INSTANT_JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS instant_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  location_lat DOUBLE PRECISION NOT NULL,
  location_lng DOUBLE PRECISION NOT NULL,
  city TEXT NOT NULL,
  district TEXT,
  requires_skills BOOLEAN NOT NULL DEFAULT false,
  estimated_budget DECIMAL(10, 2),
  scheduled_at TIMESTAMPTZ,
  status instant_job_status NOT NULL DEFAULT 'OPEN',
  accepted_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  offer_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_instant_jobs_customer_id ON instant_jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_instant_jobs_location ON instant_jobs(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_instant_jobs_status ON instant_jobs(status);
CREATE INDEX IF NOT EXISTS idx_instant_jobs_created_at ON instant_jobs(created_at);

-- ============================================
-- 5. INSTANT_JOB_OFFERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS instant_job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instant_job_id UUID NOT NULL REFERENCES instant_jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  message TEXT,
  status instant_job_offer_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_instant_job_offers_instant_job_id ON instant_job_offers(instant_job_id);
CREATE INDEX IF NOT EXISTS idx_instant_job_offers_user_id ON instant_job_offers(user_id);
CREATE INDEX IF NOT EXISTS idx_instant_job_offers_status ON instant_job_offers(status);
CREATE INDEX IF NOT EXISTS idx_instant_job_offers_created_at ON instant_job_offers(created_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE instant_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE instant_job_offers ENABLE ROW LEVEL SECURITY;

-- Jobs: customers can view their jobs, businesses can view relevant jobs
DROP POLICY IF EXISTS "Customers can view their jobs" ON jobs;
CREATE POLICY "Customers can view their jobs" ON jobs FOR SELECT USING (auth.uid()::text = customer_id::text);
DROP POLICY IF EXISTS "Customers can create jobs" ON jobs;
CREATE POLICY "Customers can create jobs" ON jobs FOR INSERT WITH CHECK (auth.uid()::text = customer_id::text);

-- Job offers: businesses can view their offers
DROP POLICY IF EXISTS "Businesses can view their job offers" ON job_offers;
CREATE POLICY "Businesses can view their job offers" ON job_offers FOR SELECT USING (
  EXISTS (SELECT 1 FROM businesses WHERE businesses.id = job_offers.business_id AND businesses.owner_user_id::text = auth.uid()::text)
);
DROP POLICY IF EXISTS "Businesses can create job offers" ON job_offers;
CREATE POLICY "Businesses can create job offers" ON job_offers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM businesses WHERE businesses.id = job_offers.business_id AND businesses.owner_user_id::text = auth.uid()::text)
);

-- Instant jobs: customers can view their jobs
DROP POLICY IF EXISTS "Customers can view their instant jobs" ON instant_jobs;
CREATE POLICY "Customers can view their instant jobs" ON instant_jobs FOR SELECT USING (auth.uid()::text = customer_id::text);
DROP POLICY IF EXISTS "Customers can create instant jobs" ON instant_jobs;
CREATE POLICY "Customers can create instant jobs" ON instant_jobs FOR INSERT WITH CHECK (auth.uid()::text = customer_id::text);

COMMENT ON TABLE jobs IS 'Normal işler tablosu';
COMMENT ON TABLE job_offers IS 'İş teklifleri tablosu';
COMMENT ON TABLE job_notifications IS 'İş bildirimleri tablosu';
COMMENT ON TABLE instant_jobs IS 'Anlık işler tablosu';
COMMENT ON TABLE instant_job_offers IS 'Anlık iş teklifleri tablosu';
