-- ============================================
-- SUPPORT SYSTEM MIGRATION
-- Destek sistemi: support_tickets, support_messages
-- Created: 2025-11-29
-- ============================================

-- ============================================
-- ENUMS
-- ============================================
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'support_ticket_status') THEN
    CREATE TYPE support_ticket_status AS ENUM ('OPEN', 'BOT_RESOLVED', 'ADMIN_OPEN', 'ADMIN_REPLIED', 'RESOLVED', 'CLOSED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'support_ticket_category') THEN
    CREATE TYPE support_ticket_category AS ENUM ('GENERAL', 'TECHNICAL', 'PAYMENT', 'REFUND', 'ACCOUNT', 'BUSINESS', 'ORDER', 'REFERRAL', 'OTHER');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'support_message_type') THEN
    CREATE TYPE support_message_type AS ENUM ('USER', 'BOT', 'ADMIN');
  END IF;
END $$;

-- ============================================
-- 1. SUPPORT_TICKETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT, -- users tablosunda id TEXT
  email TEXT NOT NULL,
  name TEXT,
  category support_ticket_category NOT NULL DEFAULT 'GENERAL',
  subject TEXT NOT NULL,
  status support_ticket_status NOT NULL DEFAULT 'OPEN',
  priority INTEGER NOT NULL DEFAULT 3,
  assigned_to TEXT, -- users tablosunda id TEXT
  resolved_by TEXT, -- users tablosunda id TEXT
  is_bot_resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ
);

-- Foreign key constraints (users tablosu varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    -- user_id foreign key
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'support_tickets_user_id_fkey'
    ) THEN
      ALTER TABLE support_tickets 
        ADD CONSTRAINT support_tickets_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
    END IF;
    -- assigned_to foreign key
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'support_tickets_assigned_to_fkey'
    ) THEN
      ALTER TABLE support_tickets 
        ADD CONSTRAINT support_tickets_assigned_to_fkey 
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;
    END IF;
    -- resolved_by foreign key
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'support_tickets_resolved_by_fkey'
    ) THEN
      ALTER TABLE support_tickets 
        ADD CONSTRAINT support_tickets_resolved_by_fkey 
        FOREIGN KEY (resolved_by) REFERENCES users(id) ON DELETE SET NULL;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

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
  ticket_id UUID NOT NULL,
  type support_message_type NOT NULL DEFAULT 'USER',
  content TEXT NOT NULL,
  user_id TEXT, -- users tablosunda id TEXT
  admin_id TEXT, -- users tablosunda id TEXT
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Foreign key constraints (tablolar varsa)
DO $$
BEGIN
  -- ticket_id foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'support_tickets') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'support_messages_ticket_id_fkey'
    ) THEN
      ALTER TABLE support_messages 
        ADD CONSTRAINT support_messages_ticket_id_fkey 
        FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE;
    END IF;
  END IF;
  -- user_id foreign key
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'support_messages_user_id_fkey'
    ) THEN
      ALTER TABLE support_messages 
        ADD CONSTRAINT support_messages_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
    END IF;
    -- admin_id foreign key
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'support_messages_admin_id_fkey'
    ) THEN
      ALTER TABLE support_messages 
        ADD CONSTRAINT support_messages_admin_id_fkey 
        FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_support_messages_ticket_id ON support_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_messages_created_at ON support_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_support_messages_is_read ON support_messages(is_read);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- Support tickets: users can view their own tickets
DROP POLICY IF EXISTS "Users can view own support tickets" ON support_tickets;
CREATE POLICY "Users can view own support tickets" ON support_tickets FOR SELECT USING (
  user_id IS NULL OR auth.uid()::text = user_id
);
DROP POLICY IF EXISTS "Users can create support tickets" ON support_tickets;
CREATE POLICY "Users can create support tickets" ON support_tickets FOR INSERT WITH CHECK (
  user_id IS NULL OR auth.uid()::text = user_id
);

-- Support messages: users can view messages in their tickets
DROP POLICY IF EXISTS "Users can view messages in own tickets" ON support_messages;
CREATE POLICY "Users can view messages in own tickets" ON support_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM support_tickets 
    WHERE support_tickets.id = support_messages.ticket_id 
    AND (support_tickets.user_id IS NULL OR support_tickets.user_id = auth.uid()::text)
  )
);
DROP POLICY IF EXISTS "Users can create messages in own tickets" ON support_messages;
CREATE POLICY "Users can create messages in own tickets" ON support_messages FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM support_tickets 
    WHERE support_tickets.id = support_messages.ticket_id 
    AND (support_tickets.user_id IS NULL OR support_tickets.user_id = auth.uid()::text)
  )
);

-- Service role can manage all
DROP POLICY IF EXISTS "Service role can manage support tickets" ON support_tickets;
CREATE POLICY "Service role can manage support tickets" ON support_tickets FOR ALL USING (auth.role() = 'service_role');
DROP POLICY IF EXISTS "Service role can manage support messages" ON support_messages;
CREATE POLICY "Service role can manage support messages" ON support_messages FOR ALL USING (auth.role() = 'service_role');

COMMENT ON TABLE support_tickets IS 'Destek talepleri tablosu';
COMMENT ON TABLE support_messages IS 'Destek mesajları tablosu';
