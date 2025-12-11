-- ============================================
-- BUSINESS ORDER SETTINGS MIGRATION
-- Minimum sipariş tutarı, teslimat yarıçapı ve teslimat toggle ekleme
-- Created: 2024-01-XX
-- ============================================

-- Add new columns to businesses table
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS min_order_amount DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS delivery_radius DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS has_delivery BOOLEAN NOT NULL DEFAULT false;

-- Add comments
COMMENT ON COLUMN businesses.min_order_amount IS 'Minimum sipariş tutarı (TL)';
COMMENT ON COLUMN businesses.delivery_radius IS 'Teslimat yarıçapı (km)';
COMMENT ON COLUMN businesses.has_delivery IS 'Teslimat hizmeti var mı?';

