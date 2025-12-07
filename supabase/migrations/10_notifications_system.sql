-- ============================================
-- NOTIFICATIONS SYSTEM MIGRATION
-- Bildirim sistemi: notifications, push_tokens
-- Created: 2025-11-29
-- ============================================

-- ============================================
-- ENUMS
-- ============================================
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
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
  END IF;
END $$;

-- ============================================
-- 1. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- users tablosunda id TEXT
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Foreign key constraint (users tablosu varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'notifications_user_id_fkey'
    ) THEN
      ALTER TABLE notifications 
        ADD CONSTRAINT notifications_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- ============================================
-- 2. PUSH_TOKENS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- users tablosunda id TEXT
  expo_push_token TEXT NOT NULL,
  device_id TEXT,
  platform TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, expo_push_token)
);

-- Foreign key constraint (users tablosu varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'push_tokens_user_id_fkey'
    ) THEN
      ALTER TABLE push_tokens 
        ADD CONSTRAINT push_tokens_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_push_tokens_user_id ON push_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_expo_push_token ON push_tokens(expo_push_token);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;

-- Notifications: users can view their own notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid()::text = user_id);
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid()::text = user_id);

-- Push tokens: users can manage their own tokens
DROP POLICY IF EXISTS "Users can manage own push tokens" ON push_tokens;
CREATE POLICY "Users can manage own push tokens" ON push_tokens FOR ALL USING (auth.uid()::text = user_id);

-- Service role can manage all
DROP POLICY IF EXISTS "Service role can manage notifications" ON notifications;
CREATE POLICY "Service role can manage notifications" ON notifications FOR ALL USING (auth.role() = 'service_role');
DROP POLICY IF EXISTS "Service role can manage push tokens" ON push_tokens;
CREATE POLICY "Service role can manage push tokens" ON push_tokens FOR ALL USING (auth.role() = 'service_role');

COMMENT ON TABLE notifications IS 'Bildirimler tablosu';
COMMENT ON TABLE push_tokens IS 'Push notification token tablosu';
