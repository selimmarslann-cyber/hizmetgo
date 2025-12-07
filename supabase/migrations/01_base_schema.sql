-- ============================================
-- BASE SCHEMA MIGRATION
-- Temel tablolar: users, businesses, products, orders, payments, reviews, messages
-- Created: 2025-11-29
-- ============================================

-- ============================================
-- ENUMS (Sadece yoksa oluştur)
-- ============================================
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('CUSTOMER', 'VENDOR', 'ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE business_category AS ENUM ('TESISAT', 'KUAFOR', 'MARKET', 'NAKLIYE', 'TEMIZLIK', 'ELEKTRIK', 'BOYA', 'MARANGOZ', 'DIGER');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE online_status AS ENUM ('ONLINE', 'OFFLINE', 'AUTO_OFFLINE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE delivery_type AS ENUM ('ON_SITE', 'PICKUP', 'DELIVERY');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('PENDING_CONFIRMATION', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED_BY_CUSTOMER', 'CANCELLED_BY_PROVIDER');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('INITIATED', 'AUTHORIZED', 'CAPTURED', 'REFUNDED', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'CUSTOMER',
  referral_balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
  instant_job_notifications BOOLEAN NOT NULL DEFAULT false,
  whatsapp_notifications BOOLEAN NOT NULL DEFAULT false,
  sms_notifications BOOLEAN NOT NULL DEFAULT false,
  email_marketing BOOLEAN NOT NULL DEFAULT false,
  skill_categories TEXT[] DEFAULT ARRAY[]::TEXT[],
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  city TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- 2. BUSINESSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category business_category NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  address_text TEXT,
  cover_image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  online_status online_status NOT NULL DEFAULT 'OFFLINE',
  working_hours_json JSONB,
  avg_rating DOUBLE PRECISION NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  consecutive_cancellations INTEGER NOT NULL DEFAULT 0,
  banned_until TIMESTAMPTZ,
  main_categories TEXT[] DEFAULT ARRAY[]::TEXT[],
  sub_services TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_businesses_owner_user_id ON businesses(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(lat, lng);
CREATE INDEX IF NOT EXISTS idx_businesses_online_status ON businesses(online_status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_main_categories ON businesses USING GIN(main_categories);

-- ============================================
-- 3. PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  is_service BOOLEAN NOT NULL DEFAULT false,
  delivery_type delivery_type NOT NULL,
  photo_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  stock INTEGER,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_business_id ON products(business_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(sort_order);

-- ============================================
-- 4. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  vendor_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  commission_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status order_status NOT NULL DEFAULT 'PENDING_CONFIRMATION',
  payment_status payment_status NOT NULL DEFAULT 'INITIATED',
  address_text TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  scheduled_at TIMESTAMPTZ,
  expected_delivery_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_business_id ON orders(business_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_completed_at ON orders(completed_at);

-- ============================================
-- 5. ORDER_ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- ============================================
-- 6. PAYMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  vendor_share DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status payment_status NOT NULL DEFAULT 'INITIATED',
  provider TEXT NOT NULL DEFAULT 'mock',
  external_id TEXT,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_vendor_id ON payments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- ============================================
-- 7. REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- ============================================
-- 8. MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_order_id ON messages(order_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- ============================================
-- 9. BUSINESS_BANS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS business_bans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  banned_from TIMESTAMPTZ NOT NULL,
  banned_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_business_bans_business_id ON business_bans(business_id);
CREATE INDEX IF NOT EXISTS idx_business_bans_banned_until ON business_bans(banned_until);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_bans ENABLE ROW LEVEL SECURITY;

-- Basic policies (users can see their own data)
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Businesses: owners can manage their businesses
CREATE POLICY "Business owners can manage their businesses" ON businesses FOR ALL USING (auth.uid()::text = owner_user_id::text);

-- Products: public read, business owners can manage
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (active = true);
CREATE POLICY "Business owners can manage their products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM businesses WHERE businesses.id = products.business_id AND businesses.owner_user_id::text = auth.uid()::text)
);

-- Orders: customers and businesses can view their orders
CREATE POLICY "Customers can view their orders" ON orders FOR SELECT USING (auth.uid()::text = customer_id::text);
CREATE POLICY "Businesses can view their orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM businesses WHERE businesses.id = orders.business_id AND businesses.owner_user_id::text = auth.uid()::text)
);

-- Reviews: public read, reviewers can create
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid()::text = reviewer_id::text);

-- Messages: participants can view
CREATE POLICY "Message participants can view messages" ON messages FOR SELECT USING (
  auth.uid()::text = sender_id::text OR auth.uid()::text = receiver_id::text
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid()::text = sender_id::text);

COMMENT ON TABLE users IS 'Kullanıcılar tablosu';
COMMENT ON TABLE businesses IS 'İşletmeler tablosu';
COMMENT ON TABLE products IS 'Ürünler ve hizmetler tablosu';
COMMENT ON TABLE orders IS 'Siparişler tablosu';
COMMENT ON TABLE order_items IS 'Sipariş kalemleri tablosu';
COMMENT ON TABLE payments IS 'Ödeme kayıtları tablosu';
COMMENT ON TABLE reviews IS 'Yorumlar ve puanlar tablosu';
COMMENT ON TABLE messages IS 'Mesajlaşma tablosu';
COMMENT ON TABLE business_bans IS 'İşletme yasakları log tablosu';
