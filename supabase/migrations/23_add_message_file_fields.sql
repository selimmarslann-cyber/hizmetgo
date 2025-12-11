-- ============================================
-- ADD MESSAGE FILE FIELDS
-- Messages tablosuna file_url, file_type, file_name, file_size, is_read, read_at kolonlarını ekler
-- ============================================

-- file_url kolonunu ekle
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'file_url'
  ) THEN
    ALTER TABLE messages ADD COLUMN file_url TEXT;
  END IF;
END $$;

-- file_type kolonunu ekle
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'file_type'
  ) THEN
    ALTER TABLE messages ADD COLUMN file_type TEXT;
  END IF;
END $$;

-- file_name kolonunu ekle
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'file_name'
  ) THEN
    ALTER TABLE messages ADD COLUMN file_name TEXT;
  END IF;
END $$;

-- file_size kolonunu ekle
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'file_size'
  ) THEN
    ALTER TABLE messages ADD COLUMN file_size INTEGER;
  END IF;
END $$;

-- is_read kolonunu ekle
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'is_read'
  ) THEN
    ALTER TABLE messages ADD COLUMN is_read BOOLEAN NOT NULL DEFAULT false;
  END IF;
END $$;

-- read_at kolonunu ekle
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'read_at'
  ) THEN
    ALTER TABLE messages ADD COLUMN read_at TIMESTAMPTZ;
  END IF;
END $$;

-- updated_at kolonunu ekle (eğer yoksa)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE messages ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
  END IF;
END $$;

-- Index'leri ekle
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_read_at ON messages(read_at);

-- Updated at trigger ekle (eğer yoksa)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_messages_updated_at'
  ) THEN
    CREATE TRIGGER update_messages_updated_at
      BEFORE UPDATE ON messages
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

