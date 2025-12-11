-- Migration: User Billing Profile
-- Tarih: 2025-01-XX

-- User Billing Profile tablosu
CREATE TABLE IF NOT EXISTS user_billing_profiles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  billing_type TEXT NOT NULL, -- "PERSONAL" | "COMPANY"
  full_name TEXT, -- Şahıs için: ad soyad
  tckn TEXT, -- Şahıs için: TCKN
  company_name TEXT, -- Şirket için: ünvan
  tax_number TEXT, -- Şirket için: vergi no
  tax_office TEXT, -- Vergi Dairesi
  country TEXT DEFAULT 'Türkiye',
  city TEXT,
  district TEXT,
  address_line TEXT,
  iban TEXT,
  invoice_delivery_method TEXT NOT NULL DEFAULT 'PDF_ONLY', -- "PDF_ONLY" | "E_ARCHIVE" | "MANUAL_UPLOAD"
  is_complete BOOLEAN NOT NULL DEFAULT FALSE, -- Fatura profili tamamlanmış mı
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_billing_profiles_user_id ON user_billing_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_billing_profiles_is_complete ON user_billing_profiles(is_complete);

-- Updated at trigger
DROP TRIGGER IF EXISTS update_user_billing_profiles_updated_at ON user_billing_profiles;
CREATE TRIGGER update_user_billing_profiles_updated_at
  BEFORE UPDATE ON user_billing_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

