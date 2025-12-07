-- Test kullanıcısı oluştur: selimarslan
-- Bu script'i Supabase SQL Editor'de çalıştırabilirsiniz

-- Önce mevcut kullanıcıyı kontrol et ve varsa sil
DO $$
DECLARE
  existing_user_id UUID;
BEGIN
  SELECT id INTO existing_user_id
  FROM public.users
  WHERE email = 'selimarslan@mahallem.test';
  
  IF existing_user_id IS NOT NULL THEN
    -- Kullanıcıyı sil (cascade ile ilişkili kayıtlar da silinir)
    DELETE FROM public.users WHERE id = existing_user_id;
    RAISE NOTICE 'Mevcut kullanıcı silindi: %', existing_user_id;
  END IF;
END $$;

-- Yeni kullanıcı oluştur
-- Şifre: selimarslan (bcrypt hash)
-- bcrypt hash'i oluşturmak için: node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('selimarslan', 10).then(h => console.log(h))"
-- Veya online bcrypt generator kullanabilirsiniz

INSERT INTO public.users (
  id,
  email,
  password_hash,
  name,
  referral_rank,
  network_cumulative_gmv,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'selimarslan@mahallem.test',
  '$2a$10$rK8X8X8X8X8X8X8X8X8X.8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X', -- Bu hash'i gerçek bcrypt hash ile değiştirin
  'Selim Arslan',
  0,
  0,
  now(),
  now()
)
RETURNING id, email, name;

-- Referral kodu oluştur
DO $$
DECLARE
  new_user_id UUID;
  referral_code TEXT;
BEGIN
  SELECT id INTO new_user_id
  FROM public.users
  WHERE email = 'selimarslan@mahallem.test';
  
  IF new_user_id IS NOT NULL THEN
    -- Referral kodu oluştur (SELIMARSLAN veya SELIMARSLAN1, SELIMARSLAN2, vb.)
    referral_code := 'SELIMARSLAN';
    
    -- Benzersizlik kontrolü
    WHILE EXISTS (SELECT 1 FROM public.referral_codes WHERE code = referral_code) LOOP
      referral_code := referral_code || floor(random() * 1000)::text;
    END LOOP;
    
    INSERT INTO public.referral_codes (user_id, code, created_at, updated_at)
    VALUES (new_user_id, referral_code, now(), now());
    
    RAISE NOTICE 'Kullanıcı oluşturuldu: % (ID: %)', 'selimarslan@mahallem.test', new_user_id;
    RAISE NOTICE 'Referral kodu: %', referral_code;
  END IF;
END $$;

-- Wallet oluştur
INSERT INTO public.wallets (user_id, balance, updated_at)
SELECT id, 0, now()
FROM public.users
WHERE email = 'selimarslan@mahallem.test'
ON CONFLICT (user_id) DO NOTHING;

-- Sonuçları göster
SELECT 
  u.id,
  u.email,
  u.name,
  u.referral_rank,
  u.network_cumulative_gmv,
  rc.code as referral_code,
  w.balance as wallet_balance
FROM public.users u
LEFT JOIN public.referral_codes rc ON rc.user_id = u.id
LEFT JOIN public.wallets w ON w.user_id = u.id
WHERE u.email = 'selimarslan@mahallem.test';

