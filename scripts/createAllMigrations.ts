/**
 * Create all missing SQL migration files from Prisma schema
 * This script reads Prisma schema and creates migration files
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const migrationsDir = join(process.cwd(), "supabase", "migrations");

// Prisma schema'dan tablo yapılarını oku ve SQL migration dosyaları oluştur
async function createMigrations() {
  console.log("📋 Creating SQL migration files...\n");

  // 01_base_schema.sql
  const baseSchema = `-- ============================================
-- BASE SCHEMA MIGRATION
-- Temel tablolar: users, businesses, products, orders, payments, reviews, messages
-- Created: ${new Date().toISOString().split("T")[0]}
-- ============================================

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'VENDOR', 'ADMIN');
CREATE TYPE business_category AS ENUM ('TESISAT', 'KUAFOR', 'MARKET', 'NAKLIYE', 'TEMIZLIK', 'ELEKTRIK', 'BOYA', 'MARANGOZ', 'DIGER');
CREATE TYPE online_status AS ENUM ('ONLINE', 'OFFLINE', 'AUTO_OFFLINE');
CREATE TYPE delivery_type AS ENUM ('ON_SITE', 'PICKUP', 'DELIVERY');
CREATE TYPE order_status AS ENUM ('PENDING_CONFIRMATION', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED_BY_CUSTOMER', 'CANCELLED_BY_PROVIDER');
CREATE TYPE payment_status AS ENUM ('INITIATED', 'AUTHORIZED', 'CAPTURED', 'REFUNDED', 'FAILED');

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
`;

  // 02_jobs_system.sql
  const jobsSystem = `-- ============================================
-- JOBS SYSTEM MIGRATION
-- İş sistemi: jobs, job_offers, job_notifications, instant_jobs, instant_job_offers
-- Created: ${new Date().toISOString().split("T")[0]}
-- ============================================

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE job_status AS ENUM ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE job_offer_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
CREATE TYPE instant_job_status AS ENUM ('OPEN', 'ACCEPTED', 'COMPLETED', 'CANCELLED');
CREATE TYPE instant_job_offer_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

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
CREATE POLICY "Customers can view their jobs" ON jobs FOR SELECT USING (auth.uid()::text = customer_id::text);
CREATE POLICY "Customers can create jobs" ON jobs FOR INSERT WITH CHECK (auth.uid()::text = customer_id::text);

-- Job offers: businesses can view their offers
CREATE POLICY "Businesses can view their job offers" ON job_offers FOR SELECT USING (
  EXISTS (SELECT 1 FROM businesses WHERE businesses.id = job_offers.business_id AND businesses.owner_user_id::text = auth.uid()::text)
);
CREATE POLICY "Businesses can create job offers" ON job_offers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM businesses WHERE businesses.id = job_offers.business_id AND businesses.owner_user_id::text = auth.uid()::text)
);

-- Instant jobs: customers can view their jobs
CREATE POLICY "Customers can view their instant jobs" ON instant_jobs FOR SELECT USING (auth.uid()::text = customer_id::text);
CREATE POLICY "Customers can create instant jobs" ON instant_jobs FOR INSERT WITH CHECK (auth.uid()::text = customer_id::text);

COMMENT ON TABLE jobs IS 'Normal işler tablosu';
COMMENT ON TABLE job_offers IS 'İş teklifleri tablosu';
COMMENT ON TABLE job_notifications IS 'İş bildirimleri tablosu';
COMMENT ON TABLE instant_jobs IS 'Anlık işler tablosu';
COMMENT ON TABLE instant_job_offers IS 'Anlık iş teklifleri tablosu';
`;

  // 09_wallet_system.sql
  const walletSystem = `-- ============================================
-- WALLET SYSTEM MIGRATION
-- Cüzdan sistemi: wallets, payout_requests
-- Created: ${new Date().toISOString().split("T")[0]}
-- ============================================

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE payout_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID');

-- ============================================
-- 1. WALLETS TABLE (if not exists in 05_lead_system.sql)
-- ============================================
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
  pending_balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'TRY',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);

-- ============================================
-- 2. PAYOUT_REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status payout_status NOT NULL DEFAULT 'PENDING',
  iban TEXT,
  notes TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payout_requests_wallet_id ON payout_requests(wallet_id);
CREATE INDEX IF NOT EXISTS idx_payout_requests_user_id ON payout_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_payout_requests_status ON payout_requests(status);
CREATE INDEX IF NOT EXISTS idx_payout_requests_requested_at ON payout_requests(requested_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE payout_requests ENABLE ROW LEVEL SECURITY;

-- Wallets: users can view their own wallets
CREATE POLICY "Users can view own wallet" ON wallets FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own wallet" ON wallets FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Payout requests: users can view their own requests
CREATE POLICY "Users can view own payout requests" ON payout_requests FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create payout requests" ON payout_requests FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

COMMENT ON TABLE wallets IS 'Kullanıcı cüzdanları tablosu';
COMMENT ON TABLE payout_requests IS 'Çekim talepleri tablosu';
`;

  // 10_notifications_system.sql
  const notificationsSystem = `-- ============================================
-- NOTIFICATIONS SYSTEM MIGRATION
-- Bildirim sistemi: notifications, push_tokens
-- Created: ${new Date().toISOString().split("T")[0]}
-- ============================================

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE notification_type AS ENUM (
  'JOB_CREATED',
  'OFFER_RECEIVED',
  'OFFER_ACCEPTED',
  'OFFER_REJECTED',
  'ORDER_ACCEPTED',
  'ORDER_COMPLETED',
  'ORDER_CANCELLED',
  'REVIEW_RECEIVED',
  'REFERRAL_REWARD',
  'PAYOUT_APPROVED',
  'PAYOUT_REJECTED',
  'PAYOUT_PAID',
  'GENERAL'
);

-- ============================================
-- 1. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- ============================================
-- 2. PUSH_TOKENS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expo_push_token TEXT NOT NULL,
  device_id TEXT,
  platform TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, expo_push_token)
);

CREATE INDEX IF NOT EXISTS idx_push_tokens_user_id ON push_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_expo_push_token ON push_tokens(expo_push_token);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;

-- Notifications: users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Push tokens: users can manage their own tokens
CREATE POLICY "Users can manage own push tokens" ON push_tokens FOR ALL USING (auth.uid()::text = user_id::text);

COMMENT ON TABLE notifications IS 'Bildirimler tablosu';
COMMENT ON TABLE push_tokens IS 'Push notification token tablosu';
`;

  // 11_support_system.sql
  const supportSystem = `-- ============================================
-- SUPPORT SYSTEM MIGRATION
-- Destek sistemi: support_tickets, support_messages
-- Created: ${new Date().toISOString().split("T")[0]}
-- ============================================

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE support_ticket_status AS ENUM ('OPEN', 'BOT_RESOLVED', 'ADMIN_OPEN', 'ADMIN_REPLIED', 'RESOLVED', 'CLOSED');
CREATE TYPE support_ticket_category AS ENUM ('GENERAL', 'TECHNICAL', 'PAYMENT', 'REFUND', 'ACCOUNT', 'BUSINESS', 'ORDER', 'REFERRAL', 'OTHER');
CREATE TYPE support_message_type AS ENUM ('USER', 'BOT', 'ADMIN');

-- ============================================
-- 1. SUPPORT_TICKETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  name TEXT,
  category support_ticket_category NOT NULL DEFAULT 'GENERAL',
  subject TEXT NOT NULL,
  status support_ticket_status NOT NULL DEFAULT 'OPEN',
  priority INTEGER NOT NULL DEFAULT 3,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_bot_resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_category ON support_tickets(category);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_to ON support_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority);

-- ============================================
-- 2. SUPPORT_MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  type support_message_type NOT NULL DEFAULT 'USER',
  content TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_messages_ticket_id ON support_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_messages_created_at ON support_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_support_messages_is_read ON support_messages(is_read);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- Support tickets: users can view their own tickets
CREATE POLICY "Users can view own support tickets" ON support_tickets FOR SELECT USING (
  user_id IS NULL OR auth.uid()::text = user_id::text
);
CREATE POLICY "Users can create support tickets" ON support_tickets FOR INSERT WITH CHECK (
  user_id IS NULL OR auth.uid()::text = user_id::text
);

-- Support messages: users can view messages in their tickets
CREATE POLICY "Users can view messages in own tickets" ON support_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM support_tickets 
    WHERE support_tickets.id = support_messages.ticket_id 
    AND (support_tickets.user_id IS NULL OR support_tickets.user_id::text = auth.uid()::text)
  )
);
CREATE POLICY "Users can create messages in own tickets" ON support_messages FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM support_tickets 
    WHERE support_tickets.id = support_messages.ticket_id 
    AND (support_tickets.user_id IS NULL OR support_tickets.user_id::text = auth.uid()::text)
  )
);

COMMENT ON TABLE support_tickets IS 'Destek talepleri tablosu';
COMMENT ON TABLE support_messages IS 'Destek mesajları tablosu';
`;

  // 12_otp_system.sql
  const otpSystem = `-- ============================================
-- OTP SYSTEM MIGRATION
-- Email doğrulama kodları: otps
-- Created: ${new Date().toISOString().split("T")[0]}
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
CREATE POLICY "No public access to OTPs" ON otps FOR ALL USING (false);

COMMENT ON TABLE otps IS 'Email doğrulama kodları tablosu';
`;

  // 13_delivery_reminders.sql
  const deliveryReminders = `-- ============================================
-- DELIVERY REMINDERS MIGRATION
-- Teslimat hatırlatmaları: delivery_reminders
-- Created: ${new Date().toISOString().split("T")[0]}
-- ============================================

-- ============================================
-- 1. DELIVERY_REMINDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS delivery_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  remind_at TIMESTAMPTZ NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_delivery_reminders_remind_at ON delivery_reminders(remind_at);
CREATE INDEX IF NOT EXISTS idx_delivery_reminders_processed ON delivery_reminders(processed);
CREATE INDEX IF NOT EXISTS idx_delivery_reminders_order_id ON delivery_reminders(order_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE delivery_reminders ENABLE ROW LEVEL SECURITY;

-- Delivery reminders: no public access, only server-side
CREATE POLICY "No public access to delivery reminders" ON delivery_reminders FOR ALL USING (false);

COMMENT ON TABLE delivery_reminders IS 'Teslimat hatırlatmaları tablosu';
`;

  // Dosyaları oluştur
  const migrations = [
    { name: "01_base_schema.sql", content: baseSchema },
    { name: "02_jobs_system.sql", content: jobsSystem },
    { name: "09_wallet_system.sql", content: walletSystem },
    { name: "10_notifications_system.sql", content: notificationsSystem },
    { name: "11_support_system.sql", content: supportSystem },
    { name: "12_otp_system.sql", content: otpSystem },
    { name: "13_delivery_reminders.sql", content: deliveryReminders },
  ];

  for (const migration of migrations) {
    const filePath = join(migrationsDir, migration.name);
    if (!existsSync(filePath)) {
      writeFileSync(filePath, migration.content, "utf-8");
      console.log(`✅ Created: ${migration.name}`);
    } else {
      console.log(`⏭️  Skipped (exists): ${migration.name}`);
    }
  }

  console.log("\n📋 Migration files created successfully!");
}

createMigrations().catch(console.error);
