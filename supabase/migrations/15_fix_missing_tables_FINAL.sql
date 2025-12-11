-- Migration: Fix Missing Tables and Enums (FINAL VERSION)
-- Tarih: 2025-01-XX
-- ÖNEMLİ: Enum'ları ve tabloları public. prefix'i ile oluşturuyoruz
-- Bu migration: accounts, invoices, ledger_entries, wallet_transactions, user_referral_profiles, user_billing_profiles tablolarını oluşturur

-- ============================================
-- ENUM'LARI OLUŞTUR (public. prefix ile)
-- ============================================

-- Önce varsa sil (CASCADE ile bağımlılıkları da siler)
DROP TYPE IF EXISTS public.ledger_entry_type CASCADE;
DROP TYPE IF EXISTS public.wallet_transaction_type CASCADE;

-- public. prefix'i ile oluştur
CREATE TYPE public.ledger_entry_type AS ENUM (
  'PLATFORM_NET_REVENUE',
  'REFERRAL_FEE_EXPENSE',
  'PAYMENT_FEE_EXPENSE',
  'VAT_LIABILITY',
  'PARTNER_PAYOUT'
);

CREATE TYPE public.wallet_transaction_type AS ENUM (
  'REFERRAL_INCOME',
  'PARTNER_INCOME',
  'WITHDRAWAL',
  'DEPOSIT',
  'REFUND'
);

-- ============================================
-- FUNCTION OLUŞTUR (public. prefix ile)
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ADIM 3: TABLOLARI OLUŞTUR (public. prefix ile)
-- ============================================

-- ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS public.accounts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  provider_email TEXT,
  provider_name TEXT,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT accounts_provider_account_id_unique UNIQUE (provider, provider_account_id)
);

CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON public.accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON public.accounts(provider);

DROP TRIGGER IF EXISTS update_accounts_updated_at ON public.accounts;
CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- INVOICES TABLE
CREATE TABLE IF NOT EXISTS public.invoices (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  partner_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_id TEXT NOT NULL UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_invoices_partner_id ON public.invoices(partner_id);
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON public.invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_issued_at ON public.invoices(issued_at);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON public.invoices(created_at);

DROP TRIGGER IF EXISTS update_invoices_updated_at ON public.invoices;
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- LEDGER_ENTRIES TABLE
-- ÖNEMLİ: type public.ledger_entry_type kullanıyoruz!
CREATE TABLE IF NOT EXISTS public.ledger_entries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  invoice_id TEXT REFERENCES public.invoices(id) ON DELETE SET NULL,
  order_id TEXT,
  user_id TEXT REFERENCES public.users(id) ON DELETE SET NULL,
  type public.ledger_entry_type NOT NULL,
  description TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'TRY',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ledger_entries_invoice_id ON public.ledger_entries(invoice_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_order_id ON public.ledger_entries(order_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_user_id ON public.ledger_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_type ON public.ledger_entries(type);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_created_at ON public.ledger_entries(created_at);

-- WALLET_TRANSACTIONS TABLE
-- ÖNEMLİ: type public.wallet_transaction_type kullanıyoruz!
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_id TEXT,
  type public.wallet_transaction_type NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'TRY',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON public.wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_order_id ON public.wallet_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_type ON public.wallet_transactions(type);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at ON public.wallet_transactions(created_at);

-- USER_REFERRAL_PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.user_referral_profiles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 0,
  rank INTEGER NOT NULL DEFAULT 0,
  custom_rate DECIMAL(5, 4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_referral_profiles_user_id ON public.user_referral_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_referral_profiles_level ON public.user_referral_profiles(level);
CREATE INDEX IF NOT EXISTS idx_user_referral_profiles_rank ON public.user_referral_profiles(rank);

DROP TRIGGER IF EXISTS update_user_referral_profiles_updated_at ON public.user_referral_profiles;
CREATE TRIGGER update_user_referral_profiles_updated_at
  BEFORE UPDATE ON public.user_referral_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- USER_BILLING_PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.user_billing_profiles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  billing_type TEXT NOT NULL,
  full_name TEXT,
  tckn TEXT,
  company_name TEXT,
  tax_number TEXT,
  tax_office TEXT,
  country TEXT DEFAULT 'Türkiye',
  city TEXT,
  district TEXT,
  address_line TEXT,
  iban TEXT,
  invoice_delivery_method TEXT NOT NULL DEFAULT 'PDF_ONLY',
  is_complete BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_billing_profiles_user_id ON public.user_billing_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_billing_profiles_is_complete ON public.user_billing_profiles(is_complete);

DROP TRIGGER IF EXISTS update_user_billing_profiles_updated_at ON public.user_billing_profiles;
CREATE TRIGGER update_user_billing_profiles_updated_at
  BEFORE UPDATE ON public.user_billing_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
