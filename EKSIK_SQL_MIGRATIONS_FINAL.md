# Eksik SQL Migration - Supabase'e Uygulama

## ⚠️ ÖNEMLİ: SQL'i Supabase Dashboard SQL Editor'de çalıştırın

Script otomatik olarak çalışmıyor. Aşağıdaki SQL'i **Supabase Dashboard > SQL Editor**'de çalıştırın.

---

## SQL Migration (Sırayla Uygulayın)

### 1. Önce Enum'ları Oluşturun

```sql
-- ============================================
-- LEDGER_ENTRY_TYPE ENUM
-- ============================================
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

-- ============================================
-- WALLET_TRANSACTION_TYPE ENUM
-- ============================================
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
```

### 2. UPDATE_UPDATED_AT_COLUMN Function (Eğer Yoksa)

```sql
-- ============================================
-- UPDATE_UPDATED_AT_COLUMN FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 3. Tabloları Oluşturun

```sql
-- ============================================
-- 1. ACCOUNTS TABLE (OAuth Accounts)
-- ============================================
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider);

DROP TRIGGER IF EXISTS update_accounts_updated_at ON accounts;
CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. INVOICES TABLE
-- ============================================
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

DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. LEDGER_ENTRIES TABLE
-- ============================================
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

-- ============================================
-- 4. WALLET_TRANSACTIONS TABLE
-- ============================================
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

-- ============================================
-- 5. USER_REFERRAL_PROFILES TABLE
-- ============================================
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

DROP TRIGGER IF EXISTS update_user_referral_profiles_updated_at ON user_referral_profiles;
CREATE TRIGGER update_user_referral_profiles_updated_at
  BEFORE UPDATE ON user_referral_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. USER_BILLING_PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_billing_profiles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_user_billing_profiles_user_id ON user_billing_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_billing_profiles_is_complete ON user_billing_profiles(is_complete);

DROP TRIGGER IF EXISTS update_user_billing_profiles_updated_at ON user_billing_profiles;
CREATE TRIGGER update_user_billing_profiles_updated_at
  BEFORE UPDATE ON user_billing_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## Uygulama Adımları

1. **Supabase Dashboard**'a giriş yapın
2. **SQL Editor**'ü açın
3. Yukarıdaki SQL'leri **sırayla** çalıştırın:
   - Önce enum'ları (1. adım)
   - Sonra function'ı (2. adım)
   - Son olarak tabloları (3. adım)
4. Her adımı ayrı ayrı çalıştırın veya tümünü birleştirip tek seferde çalıştırın

---

## Doğrulama

Migration'ları uyguladıktan sonra kontrol edin:

```sql
-- Tabloları kontrol et
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
AND table_name IN ('accounts', 'invoices', 'ledger_entries', 'user_referral_profiles', 'user_billing_profiles')
ORDER BY table_name;

-- Enum'ları kontrol et
SELECT typname 
FROM pg_type 
WHERE typtype = 'e' 
AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND typname IN ('ledger_entry_type', 'wallet_transaction_type')
ORDER BY typname;
```

---

## Dosya Konumu

SQL dosyası: `C:\mahallem-main\mahallem-main\supabase\migrations\15_fix_missing_tables.sql`

