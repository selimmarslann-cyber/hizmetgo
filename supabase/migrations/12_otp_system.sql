-- ============================================
-- OTP SYSTEM MIGRATION
-- Email doğrulama kodları: otps
-- Created: 2025-11-29
-- ============================================

-- ============================================
-- 1. OTPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(email);
CREATE INDEX IF NOT EXISTS idx_otps_code ON otps(code);
CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps(expires_at);
CREATE INDEX IF NOT EXISTS idx_otps_used ON otps(used);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE otps ENABLE ROW LEVEL SECURITY;

-- OTPs: no public access, only server-side
DROP POLICY IF EXISTS "No public access to OTPs" ON otps;
CREATE POLICY "No public access to OTPs" ON otps FOR ALL USING (false);

COMMENT ON TABLE otps IS 'Email doğrulama kodları tablosu';
