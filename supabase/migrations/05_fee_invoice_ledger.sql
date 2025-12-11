-- Migration: Fee, Invoice, Ledger, Wallet Transaction ve User Referral Profile modelleri
-- Tarih: 2025-01-XX

-- Invoice tablosu
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  partner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id TEXT NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  commission_gross DECIMAL(10, 2) NOT NULL,
  referral_fee DECIMAL(10, 2) NOT NULL,
  payment_fee DECIMAL(10, 2) NOT NULL,
  platform_net DECIMAL(10, 2) NOT NULL,
  vat_amount DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'TRY',
  pdf_url TEXT,
  external_accounting_id TEXT,
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoices_partner_id ON invoices(partner_id);
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_issued_at ON invoices(issued_at);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at);

-- Ledger Entry Type enum
DO $$ BEGIN
  CREATE TYPE ledger_entry_type AS ENUM (
    'PLATFORM_NET_REVENUE',
    'REFERRAL_FEE_EXPENSE',
    'PAYMENT_FEE_EXPENSE',
    'VAT_LIABILITY',
    'PARTNER_PAYOUT'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Ledger Entry tablosu
CREATE TABLE IF NOT EXISTS ledger_entries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  invoice_id TEXT REFERENCES invoices(id) ON DELETE SET NULL,
  order_id TEXT,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  type ledger_entry_type NOT NULL,
  description TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'TRY',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ledger_entries_invoice_id ON ledger_entries(invoice_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_order_id ON ledger_entries(order_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_user_id ON ledger_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_type ON ledger_entries(type);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_created_at ON ledger_entries(created_at);

-- Wallet Transaction Type enum
DO $$ BEGIN
  CREATE TYPE wallet_transaction_type AS ENUM (
    'REFERRAL_INCOME',
    'PARTNER_INCOME',
    'WITHDRAWAL',
    'DEPOSIT',
    'REFUND'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Wallet Transaction tablosu
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id TEXT,
  type wallet_transaction_type NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'TRY',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_order_id ON wallet_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_type ON wallet_transactions(type);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at ON wallet_transactions(created_at);

-- User Referral Profile tablosu
CREATE TABLE IF NOT EXISTS user_referral_profiles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 0,
  rank INTEGER NOT NULL DEFAULT 0,
  custom_rate DECIMAL(5, 4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_referral_profiles_user_id ON user_referral_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_referral_profiles_level ON user_referral_profiles(level);
CREATE INDEX IF NOT EXISTS idx_user_referral_profiles_rank ON user_referral_profiles(rank);

-- Updated at trigger function (eğer yoksa)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Updated at trigger for invoices
DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Updated at trigger for user_referral_profiles
DROP TRIGGER IF EXISTS update_user_referral_profiles_updated_at ON user_referral_profiles;
CREATE TRIGGER update_user_referral_profiles_updated_at
  BEFORE UPDATE ON user_referral_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

