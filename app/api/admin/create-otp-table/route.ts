/**
 * Create OTP table in Supabase
 * POST /api/admin/create-otp-table
 */

/**
 * Create OTP table in Supabase
 * POST /api/admin/create-otp-table
 * Uses DATABASE_URL to connect directly to PostgreSQL
 */

import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";

const OTP_TABLE_SQL = `
-- ==
-- OTP SYSTEM MIGRATION
-- Email doğrulama kodları: otps
-- ==

-- 1. OTPS TABLE
CREATE TABLE IF NOT EXISTS otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. INDEXES
CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(email);
CREATE INDEX IF NOT EXISTS idx_otps_code ON otps(code);
CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps(expires_at);
CREATE INDEX IF NOT EXISTS idx_otps_used ON otps(used);

-- 3. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE otps ENABLE ROW LEVEL SECURITY;

-- OTPs: no public access, only server-side
DROP POLICY IF EXISTS "No public access to OTPs" ON otps;
CREATE POLICY "No public access to OTPs" ON otps FOR ALL USING (false);

-- 4. COMMENT
COMMENT ON TABLE otps IS 'Email doğrulama kodları tablosu';
`;


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return NextResponse.json(
      {
        success: false,
        error: "DATABASE_URL environment variable is not set",
      },
      { status: 500 },
    );
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes("supabase")
      ? { rejectUnauthorized: false }
      : undefined,
  });

  try {
    console.log("🚀 Creating OTP table...");
    await client.connect();
    console.log("✅ Connected to database");

    // SQL'i çalıştır
    await client.query(OTP_TABLE_SQL);
    console.log("✅ OTP table created successfully");

    // Tabloyu kontrol et
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'otps'
      ) as exists;
    `);

    const tableExists = result.rows[0]?.exists || false;

    return NextResponse.json({
      success: true,
      message: "OTP table created successfully",
      tableExists,
    });
  } catch (error: any) {
    console.error("❌ Error creating OTP table:", error);

    // Ignore "already exists" errors
    if (
      error.message.includes("already exists") ||
      error.message.includes("duplicate")
    ) {
      return NextResponse.json({
        success: true,
        message: "OTP table already exists",
        tableExists: true,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create OTP table",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  } finally {
    await client.end();
  }
}
