/**
 * Create OTP table in Supabase
 * Uses DATABASE_URL from .env to connect directly to PostgreSQL
 */

import { config } from "dotenv";
import { Client } from "pg";
import { readFileSync } from "fs";
import { join } from "path";

// Load .env file
config({ path: join(process.cwd(), ".env") });

async function createOtpTable() {
  console.log("🚀 Creating OTP table in Supabase...\n");

  // DIRECT_URL varsa onu kullan (migration için daha uygun)
  const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  console.log("📡 Connecting to database...");

  // PostgreSQL client oluştur
  const client = new Client({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false, // Supabase için gerekli
    },
  });

  try {
    await client.connect();
    console.log("✅ Connected to database\n");

    // SQL migration dosyasını oku
    const sqlPath = join(
      process.cwd(),
      "supabase",
      "migrations",
      "12_otp_system.sql",
    );
    const sql = readFileSync(sqlPath, "utf-8");

    console.log("📝 Executing SQL migration...\n");

    // SQL'i çalıştır
    await client.query(sql);

    console.log("✅ OTP table created successfully!\n");
    console.log("📋 Table: otps");
    console.log("   - id (UUID)");
    console.log("   - email (TEXT)");
    console.log("   - code (TEXT)");
    console.log("   - used (BOOLEAN)");
    console.log("   - expires_at (TIMESTAMPTZ)");
    console.log("   - created_at (TIMESTAMPTZ)\n");

    // Tabloyu kontrol et
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'otps'
      );
    `);

    if (result.rows[0].exists) {
      console.log("✅ Verification: otps table exists in database\n");
    }
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    if (error.message.includes("already exists")) {
      console.log("ℹ️  Table already exists, skipping...\n");
    } else {
      throw error;
    }
  } finally {
    await client.end();
    console.log("🔌 Database connection closed\n");
  }
}

createOtpTable()
  .then(() => {
    console.log("🎉 Migration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  });
