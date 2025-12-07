-- ============================================
-- MAHALLEM MULTI-LEVEL REFERRAL COMMISSION SYSTEM
-- ============================================
-- Bu script, Herbalife/Amway benzeri ama YASAL, sadece işlem fee'sinden
-- kazanç dağıtan çok seviyeli referral sistemi kurar.
-- 
-- Kurallar:
-- - Maksimum %45 fee dağıtımı (referral + bölge yöneticileri)
-- - 5 seviyeli referral zinciri (L1-L5)
-- - Rank bonusları (0-4 seviye)
-- - Bölge yöneticileri (mahalle, ilçe, il, ülke)
-- ============================================

-- ============================================
-- 1. USERS TABLOSUNA YENİ ALANLAR EKLE
-- ============================================
-- Önce kolonları ekle (foreign key olmadan)
DO $$
BEGIN
  -- referrer_id kolonu (foreign key olmadan)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'referrer_id'
  ) THEN
    ALTER TABLE public.users ADD COLUMN referrer_id TEXT;
  END IF;

  -- referral_rank kolonu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'referral_rank'
  ) THEN
    ALTER TABLE public.users 
      ADD COLUMN referral_rank INT NOT NULL DEFAULT 0;
    
    -- Check constraint'i ayrı ekle
    ALTER TABLE public.users 
      ADD CONSTRAINT users_referral_rank_check 
      CHECK (referral_rank >= 0 AND referral_rank <= 4);
  END IF;

  -- network_cumulative_gmv kolonu
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'network_cumulative_gmv'
  ) THEN
    ALTER TABLE public.users 
      ADD COLUMN network_cumulative_gmv NUMERIC(18,2) NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Foreign key constraint'i ekleme (Prisma schema'da zaten tanımlı olabilir)
-- NOT: Foreign key constraint'i Prisma schema'da zaten tanımlı olabilir
-- Bu migration sadece ek alanlar ve fonksiyonlar için
-- Eğer foreign key constraint gerekirse, Prisma schema'dan veya manuel olarak eklenebilir

CREATE INDEX IF NOT EXISTS idx_users_referrer ON public.users(referrer_id);
CREATE INDEX IF NOT EXISTS idx_users_referral_rank ON public.users(referral_rank);

-- ============================================
-- 2. BÖLGE YÖNETİCİLERİ TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS public.region_managers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  region_type TEXT NOT NULL CHECK (region_type IN ('mahalle','ilce','il','ulke')),
  region_code TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, region_type, region_code)
);

CREATE INDEX IF NOT EXISTS idx_region_managers_region 
  ON public.region_managers(region_type, region_code);
CREATE INDEX IF NOT EXISTS idx_region_managers_user 
  ON public.region_managers(user_id);
CREATE INDEX IF NOT EXISTS idx_region_managers_active 
  ON public.region_managers(is_active) WHERE is_active = true;

-- ============================================
-- 3. ORDERS TABLOSUNA BÖLGE ALANLARI EKLE
-- ============================================
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS region_mahalle TEXT,
  ADD COLUMN IF NOT EXISTS region_ilce TEXT,
  ADD COLUMN IF NOT EXISTS region_il TEXT,
  ADD COLUMN IF NOT EXISTS region_country TEXT DEFAULT 'TR',
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_orders_region_mahalle ON public.orders(region_mahalle);
CREATE INDEX IF NOT EXISTS idx_orders_region_ilce ON public.orders(region_ilce);
CREATE INDEX IF NOT EXISTS idx_orders_region_il ON public.orders(region_il);

-- commission_fee alanı zaten var, platform_fee_amount olarak kullanılacak
-- Eğer yoksa ekle:
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'orders' 
    AND column_name = 'platform_fee_amount'
  ) THEN
    ALTER TABLE public.orders 
      ADD COLUMN platform_fee_amount NUMERIC(18,2) NOT NULL DEFAULT 0;
  END IF;
END $$;

-- commission_fee'yi platform_fee_amount olarak kopyala (eğer platform_fee_amount 0 ise)
UPDATE public.orders 
SET platform_fee_amount = commission_fee 
WHERE platform_fee_amount = 0 AND commission_fee > 0;

-- ============================================
-- 4. CÜZDAN TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS public.wallets (
  user_id TEXT PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  balance NUMERIC(18,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Mevcut referral_balance'ı wallets'e taşı
INSERT INTO public.wallets (user_id, balance)
SELECT id, referral_balance 
FROM public.users 
WHERE referral_balance > 0
ON CONFLICT (user_id) DO UPDATE 
SET balance = wallets.balance + EXCLUDED.balance;

-- ============================================
-- 5. CÜZDAN İŞLEMLERİ TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_id TEXT REFERENCES public.orders(id) ON DELETE SET NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('deposit','withdraw','spend','referral','region','adjustment')),
  level INT CHECK (level >= 1 AND level <= 5), -- referral level 1..5 için
  region_type TEXT CHECK (region_type IN ('mahalle','ilce','il','ulke')), -- bölge yöneticisi için
  amount NUMERIC(18,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wallet_tx_user ON public.wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_tx_order ON public.wallet_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_wallet_tx_source ON public.wallet_transactions(source_type);
CREATE INDEX IF NOT EXISTS idx_wallet_tx_created ON public.wallet_transactions(created_at DESC);

-- ============================================
-- 6. REFERRAL PAYOUT KAYITLARI
-- ============================================
CREATE TABLE IF NOT EXISTS public.referral_payouts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  beneficiary_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  payout_type TEXT NOT NULL CHECK (payout_type IN ('referral','region')),
  level INT CHECK (level >= 1 AND level <= 5), -- referral level için
  region_type TEXT CHECK (region_type IN ('mahalle','ilce','il','ulke')), -- bölge yöneticisi için
  percentage NUMERIC(6,3) NOT NULL, -- Örn: 10.500 (10.5%)
  amount NUMERIC(18,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ref_payouts_order ON public.referral_payouts(order_id);
CREATE INDEX IF NOT EXISTS idx_ref_payouts_beneficiary ON public.referral_payouts(beneficiary_id);
CREATE INDEX IF NOT EXISTS idx_ref_payouts_type ON public.referral_payouts(payout_type);

-- ============================================
-- 7. FONKSİYON: REFERRAL RANK HESAPLA
-- ============================================
CREATE OR REPLACE FUNCTION public.calculate_referral_rank(
  gmv NUMERIC
) RETURNS INT AS $$
BEGIN
  IF gmv >= 500000000 THEN
    RETURN 4; -- Ülke yöneticisi adayı
  ELSIF gmv >= 100000000 THEN
    RETURN 3; -- İl yöneticisi adayı
  ELSIF gmv >= 10000000 THEN
    RETURN 2; -- İlçe yöneticisi adayı
  ELSIF gmv >= 1000000 THEN
    RETURN 1; -- Mahalle lideri / muhtar adayı
  ELSE
    RETURN 0; -- Normal kullanıcı
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- 8. FONKSİYON: RANK BONUS YÜZDESİ
-- ============================================
CREATE OR REPLACE FUNCTION public.get_rank_bonus_percentage(
  rank_level INT
) RETURNS NUMERIC AS $$
BEGIN
  CASE rank_level
    WHEN 0 THEN RETURN 0.0;
    WHEN 1 THEN RETURN 0.5;  -- +0.5%
    WHEN 2 THEN RETURN 1.0;    -- +1.0%
    WHEN 3 THEN RETURN 1.5;   -- +1.5%
    WHEN 4 THEN RETURN 2.0;   -- +2.0%
    ELSE RETURN 0.0;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- 9. FONKSİYON: REFERRAL ZİNCİRİNİ BUL (L1-L5)
-- ============================================
CREATE OR REPLACE FUNCTION public.get_referral_chain(
  start_user_id TEXT,
  max_levels INT DEFAULT 5
) RETURNS TABLE (
  user_id TEXT,
  level INT,
  referral_rank INT,
  network_gmv NUMERIC
) AS $$
DECLARE
  current_user_id TEXT;
  current_level INT := 1;
  found_user RECORD;
BEGIN
  -- Kullanıcının referrer'ını bul (L1)
  SELECT u.referrer_id INTO current_user_id
  FROM public.users u
  WHERE u.id = start_user_id;
  
  -- Eğer referrer yoksa boş döndür
  IF current_user_id IS NULL THEN
    RETURN;
  END IF;
  
  -- L1'den L5'e kadar zinciri oluştur
  WHILE current_level <= max_levels AND current_user_id IS NOT NULL LOOP
    SELECT u.id, COALESCE(u.referral_rank, 0), COALESCE(u.network_cumulative_gmv, 0)
    INTO found_user
    FROM public.users u
    WHERE u.id = current_user_id;
    
    IF found_user IS NULL THEN
      EXIT;
    END IF;
    
    -- Bu seviyeyi ekle
    user_id := found_user.id;
    level := current_level;
    referral_rank := found_user.referral_rank;
    network_gmv := found_user.network_cumulative_gmv;
    RETURN NEXT;
    
    -- Bir üst seviyeye geç (bu kullanıcının referrer'ı)
    SELECT u.referrer_id INTO current_user_id
    FROM public.users u
    WHERE u.id = current_user_id;
    
    current_level := current_level + 1;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 10. FONKSİYON: ORDER REFERRAL IMPACT UYGULA
-- ============================================
CREATE OR REPLACE FUNCTION public.apply_order_referral_impact(
  p_order_id TEXT
) RETURNS VOID AS $$
DECLARE
  v_order RECORD;
  v_user_id TEXT;
  v_total_amount NUMERIC;
  v_chain_user RECORD;
BEGIN
  -- Order bilgilerini al
  SELECT customer_id, total_amount
  INTO v_order
  FROM public.orders
  WHERE id = p_order_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found: %', p_order_id;
  END IF;
  
  v_user_id := v_order.customer_id;
  v_total_amount := v_order.total_amount;
  
  -- Kullanıcının kendisine GMV ekle
  UPDATE public.users
  SET network_cumulative_gmv = network_cumulative_gmv + v_total_amount,
      referral_rank = public.calculate_referral_rank(network_cumulative_gmv + v_total_amount)
  WHERE id = v_user_id;
  
  -- Referral zincirindeki herkese GMV ekle ve rank güncelle
  FOR v_chain_user IN 
    SELECT * FROM public.get_referral_chain(v_user_id, 5)
  LOOP
    UPDATE public.users
    SET network_cumulative_gmv = network_cumulative_gmv + v_total_amount,
        referral_rank = public.calculate_referral_rank(network_cumulative_gmv + v_total_amount)
    WHERE id = v_chain_user.user_id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 11. FONKSİYON: KOMİSYON DAĞITIMI
-- ============================================
CREATE OR REPLACE FUNCTION public.distribute_order_commissions(
  p_order_id TEXT
) RETURNS VOID AS $$
DECLARE
  v_order RECORD;
  v_platform_fee NUMERIC;
  v_max_distributable NUMERIC; -- F * 0.45
  v_referral_total NUMERIC := 0;
  v_region_total NUMERIC := 0;
  v_total_distributed NUMERIC := 0;
  v_chain_user RECORD;
  v_base_pct NUMERIC;
  v_bonus_pct NUMERIC;
  v_effective_pct NUMERIC;
  v_payout_amount NUMERIC;
  v_region_manager RECORD;
  v_region_pct NUMERIC;
BEGIN
  -- Order bilgilerini al
  SELECT 
    customer_id,
    platform_fee_amount,
    region_mahalle,
    region_ilce,
    region_il,
    region_country
  INTO v_order
  FROM public.orders
  WHERE id = p_order_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found: %', p_order_id;
  END IF;
  
  v_platform_fee := COALESCE(v_order.platform_fee_amount, 0);
  
  -- Eğer fee <= 0 ise çık
  IF v_platform_fee <= 0 THEN
    RETURN;
  END IF;
  
  v_max_distributable := v_platform_fee * 0.45; -- %45 maksimum
  
  -- ============================================
  -- REFERRAL ZİNCİRİNE PAYLARI DAĞIT
  -- ============================================
  FOR v_chain_user IN 
    SELECT * FROM public.get_referral_chain(v_order.customer_id, 5)
  LOOP
    -- Base yüzdeyi belirle (L1=10%, L2=6%, L3=5%, L4=3%, L5=1%)
    CASE v_chain_user.level
      WHEN 1 THEN v_base_pct := 10.0;
      WHEN 2 THEN v_base_pct := 6.0;
      WHEN 3 THEN v_base_pct := 5.0;
      WHEN 4 THEN v_base_pct := 3.0;
      WHEN 5 THEN v_base_pct := 1.0;
      ELSE v_base_pct := 0.0;
    END CASE;
    
    -- Rank bonusunu al
    v_bonus_pct := public.get_rank_bonus_percentage(v_chain_user.referral_rank);
    
    -- Effective yüzde = base + bonus
    v_effective_pct := v_base_pct + v_bonus_pct;
    
    -- Payout miktarı
    v_payout_amount := v_platform_fee * v_effective_pct / 100.0;
    
    -- Eğer maksimumu aşarsa, pro-rata küçült
    IF v_referral_total + v_payout_amount > v_max_distributable THEN
      v_payout_amount := GREATEST(0, v_max_distributable - v_referral_total);
    END IF;
    
    IF v_payout_amount > 0 THEN
      -- Wallet'a ekle
      INSERT INTO public.wallets (user_id, balance, updated_at)
      VALUES (v_chain_user.user_id, v_payout_amount, now())
      ON CONFLICT (user_id) DO UPDATE
      SET balance = wallets.balance + v_payout_amount,
          updated_at = now();
      
      -- Transaction kaydı
      INSERT INTO public.wallet_transactions (
        user_id, order_id, source_type, level, amount
      ) VALUES (
        v_chain_user.user_id, p_order_id, 'referral', v_chain_user.level, v_payout_amount
      );
      
      -- Payout kaydı
      INSERT INTO public.referral_payouts (
        order_id, beneficiary_id, payout_type, level, percentage, amount
      ) VALUES (
        p_order_id, v_chain_user.user_id, 'referral', v_chain_user.level, v_effective_pct, v_payout_amount
      );
      
      v_referral_total := v_referral_total + v_payout_amount;
    END IF;
  END LOOP;
  
  -- ============================================
  -- BÖLGE YÖNETİCİLERİNE PAYLARI DAĞIT
  -- ============================================
  -- Mahalle yöneticisi: 3%
  IF v_order.region_mahalle IS NOT NULL THEN
    SELECT * INTO v_region_manager
    FROM public.region_managers
    WHERE region_type = 'mahalle'
      AND region_code = v_order.region_mahalle
      AND is_active = true
    LIMIT 1;
    
    IF FOUND THEN
      v_region_pct := 3.0;
      v_payout_amount := v_platform_fee * v_region_pct / 100.0;
      
      -- Maksimum kontrolü
      IF v_total_distributed + v_payout_amount > v_max_distributable THEN
        v_payout_amount := GREATEST(0, v_max_distributable - v_total_distributed);
      END IF;
      
      IF v_payout_amount > 0 THEN
        INSERT INTO public.wallets (user_id, balance, updated_at)
        VALUES (v_region_manager.user_id, v_payout_amount, now())
        ON CONFLICT (user_id) DO UPDATE
        SET balance = wallets.balance + v_payout_amount,
            updated_at = now();
        
        INSERT INTO public.wallet_transactions (
          user_id, order_id, source_type, region_type, amount
        ) VALUES (
          v_region_manager.user_id, p_order_id, 'region', 'mahalle', v_payout_amount
        );
        
        INSERT INTO public.referral_payouts (
          order_id, beneficiary_id, payout_type, region_type, percentage, amount
        ) VALUES (
          p_order_id, v_region_manager.user_id, 'region', 'mahalle', v_region_pct, v_payout_amount
        );
        
        v_region_total := v_region_total + v_payout_amount;
        v_total_distributed := v_total_distributed + v_payout_amount;
      END IF;
    END IF;
  END IF;
  
  -- İlçe yöneticisi: 3%
  IF v_order.region_ilce IS NOT NULL THEN
    SELECT * INTO v_region_manager
    FROM public.region_managers
    WHERE region_type = 'ilce'
      AND region_code = v_order.region_ilce
      AND is_active = true
    LIMIT 1;
    
    IF FOUND THEN
      v_region_pct := 3.0;
      v_payout_amount := v_platform_fee * v_region_pct / 100.0;
      
      IF v_total_distributed + v_payout_amount > v_max_distributable THEN
        v_payout_amount := GREATEST(0, v_max_distributable - v_total_distributed);
      END IF;
      
      IF v_payout_amount > 0 THEN
        INSERT INTO public.wallets (user_id, balance, updated_at)
        VALUES (v_region_manager.user_id, v_payout_amount, now())
        ON CONFLICT (user_id) DO UPDATE
        SET balance = wallets.balance + v_payout_amount,
            updated_at = now();
        
        INSERT INTO public.wallet_transactions (
          user_id, order_id, source_type, region_type, amount
        ) VALUES (
          v_region_manager.user_id, p_order_id, 'region', 'ilce', v_payout_amount
        );
        
        INSERT INTO public.referral_payouts (
          order_id, beneficiary_id, payout_type, region_type, percentage, amount
        ) VALUES (
          p_order_id, v_region_manager.user_id, 'region', 'ilce', v_region_pct, v_payout_amount
        );
        
        v_region_total := v_region_total + v_payout_amount;
        v_total_distributed := v_total_distributed + v_payout_amount;
      END IF;
    END IF;
  END IF;
  
  -- İl yöneticisi: 2%
  IF v_order.region_il IS NOT NULL THEN
    SELECT * INTO v_region_manager
    FROM public.region_managers
    WHERE region_type = 'il'
      AND region_code = v_order.region_il
      AND is_active = true
    LIMIT 1;
    
    IF FOUND THEN
      v_region_pct := 2.0;
      v_payout_amount := v_platform_fee * v_region_pct / 100.0;
      
      IF v_total_distributed + v_payout_amount > v_max_distributable THEN
        v_payout_amount := GREATEST(0, v_max_distributable - v_total_distributed);
      END IF;
      
      IF v_payout_amount > 0 THEN
        INSERT INTO public.wallets (user_id, balance, updated_at)
        VALUES (v_region_manager.user_id, v_payout_amount, now())
        ON CONFLICT (user_id) DO UPDATE
        SET balance = wallets.balance + v_payout_amount,
            updated_at = now();
        
        INSERT INTO public.wallet_transactions (
          user_id, order_id, source_type, region_type, amount
        ) VALUES (
          v_region_manager.user_id, p_order_id, 'region', 'il', v_payout_amount
        );
        
        INSERT INTO public.referral_payouts (
          order_id, beneficiary_id, payout_type, region_type, percentage, amount
        ) VALUES (
          p_order_id, v_region_manager.user_id, 'region', 'il', v_region_pct, v_payout_amount
        );
        
        v_region_total := v_region_total + v_payout_amount;
        v_total_distributed := v_total_distributed + v_payout_amount;
      END IF;
    END IF;
  END IF;
  
  -- Ülke yöneticisi: 2%
  IF v_order.region_country IS NOT NULL THEN
    SELECT * INTO v_region_manager
    FROM public.region_managers
    WHERE region_type = 'ulke'
      AND region_code = v_order.region_country
      AND is_active = true
    LIMIT 1;
    
    IF FOUND THEN
      v_region_pct := 2.0;
      v_payout_amount := v_platform_fee * v_region_pct / 100.0;
      
      IF v_total_distributed + v_payout_amount > v_max_distributable THEN
        v_payout_amount := GREATEST(0, v_max_distributable - v_total_distributed);
      END IF;
      
      IF v_payout_amount > 0 THEN
        INSERT INTO public.wallets (user_id, balance, updated_at)
        VALUES (v_region_manager.user_id, v_payout_amount, now())
        ON CONFLICT (user_id) DO UPDATE
        SET balance = wallets.balance + v_payout_amount,
            updated_at = now();
        
        INSERT INTO public.wallet_transactions (
          user_id, order_id, source_type, region_type, amount
        ) VALUES (
          v_region_manager.user_id, p_order_id, 'region', 'ulke', v_payout_amount
        );
        
        INSERT INTO public.referral_payouts (
          order_id, beneficiary_id, payout_type, region_type, percentage, amount
        ) VALUES (
          p_order_id, v_region_manager.user_id, 'region', 'ulke', v_region_pct, v_payout_amount
        );
        
        v_region_total := v_region_total + v_payout_amount;
        v_total_distributed := v_total_distributed + v_payout_amount;
      END IF;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 12. TRIGGER: ORDER COMPLETED OLDUĞUNDA
-- ============================================
CREATE OR REPLACE FUNCTION public.on_order_completed()
RETURNS TRIGGER AS $$
BEGIN
  -- Sadece status COMPLETED olduğunda ve önceki status farklıysa
  IF NEW.status = 'COMPLETED' AND (OLD.status IS NULL OR OLD.status != 'COMPLETED') THEN
    -- completed_at'i set et
    NEW.completed_at := now();
    
    -- Referral impact uygula (GMV ve rank güncelle)
    PERFORM public.apply_order_referral_impact(NEW.id);
    
    -- Komisyon dağıtımı yap
    PERFORM public.distribute_order_commissions(NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger'ı oluştur
DROP TRIGGER IF EXISTS trigger_order_completed ON public.orders;
CREATE TRIGGER trigger_order_completed
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.on_order_completed();

-- ============================================
-- 13. YARDIMCI FONKSİYONLAR
-- ============================================

-- Kullanıcının toplam referral kazancını getir
CREATE OR REPLACE FUNCTION public.get_user_referral_earnings(
  p_user_id TEXT
) RETURNS NUMERIC AS $$
DECLARE
  v_total NUMERIC;
BEGIN
  SELECT COALESCE(SUM(amount), 0)
  INTO v_total
  FROM public.wallet_transactions
  WHERE user_id = p_user_id
    AND source_type = 'referral';
  
  RETURN v_total;
END;
$$ LANGUAGE plpgsql;

-- Kullanıcının toplam bölge kazancını getir
CREATE OR REPLACE FUNCTION public.get_user_region_earnings(
  p_user_id TEXT
) RETURNS NUMERIC AS $$
DECLARE
  v_total NUMERIC;
BEGIN
  SELECT COALESCE(SUM(amount), 0)
  INTO v_total
  FROM public.wallet_transactions
  WHERE user_id = p_user_id
    AND source_type = 'region';
  
  RETURN v_total;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SON
-- ============================================
COMMENT ON FUNCTION public.apply_order_referral_impact IS 
  'Order tamamlandığında referral zincirindeki herkesin network_cumulative_gmv ve rank değerlerini günceller';
COMMENT ON FUNCTION public.distribute_order_commissions IS 
  'Order tamamlandığında referral zinciri ve bölge yöneticilerine komisyon dağıtır (maksimum %45)';
COMMENT ON TABLE public.region_managers IS 
  'Bölge yöneticileri: mahalle, ilçe, il, ülke seviyesinde yöneticiler';
COMMENT ON TABLE public.wallets IS 
  'Kullanıcı cüzdanları: referral ve bölge kazançları burada birikir';
COMMENT ON TABLE public.wallet_transactions IS 
  'Cüzdan işlem geçmişi: tüm para giriş/çıkış kayıtları';
COMMENT ON TABLE public.referral_payouts IS 
  'Referral payout kayıtları: şeffaflık için her payout kaydı tutulur';

