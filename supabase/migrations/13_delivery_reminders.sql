-- ============================================
-- DELIVERY REMINDERS MIGRATION
-- Teslimat hatırlatmaları: delivery_reminders
-- Created: 2025-11-29
-- ============================================

-- ============================================
-- 1. DELIVERY_REMINDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS delivery_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE,
  remind_at TIMESTAMPTZ NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Foreign key constraint (orders tablosu varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'delivery_reminders_order_id_fkey'
    ) THEN
      ALTER TABLE delivery_reminders 
        ADD CONSTRAINT delivery_reminders_order_id_fkey 
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
    END IF;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_delivery_reminders_remind_at ON delivery_reminders(remind_at);
CREATE INDEX IF NOT EXISTS idx_delivery_reminders_processed ON delivery_reminders(processed);
CREATE INDEX IF NOT EXISTS idx_delivery_reminders_order_id ON delivery_reminders(order_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE delivery_reminders ENABLE ROW LEVEL SECURITY;

-- Delivery reminders: no public access, only server-side
DROP POLICY IF EXISTS "No public access to delivery reminders" ON delivery_reminders;
CREATE POLICY "No public access to delivery reminders" ON delivery_reminders FOR ALL USING (false);

COMMENT ON TABLE delivery_reminders IS 'Teslimat hatırlatmaları tablosu';
