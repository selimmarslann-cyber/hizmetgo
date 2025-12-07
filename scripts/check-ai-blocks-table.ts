/**
 * Check ai_blocks table structure
 */

import { config } from "dotenv";
import { Client } from "pg";
import { join } from "path";

config({ path: join(process.cwd(), ".env") });

async function checkTable() {
  const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DIRECT_URL or DATABASE_URL not set");
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Connected\n");

    // Check table structure
    const result = await client.query(`
      SELECT 
        column_name, 
        data_type, 
        is_nullable,
        column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'ai_blocks' 
      ORDER BY ordinal_position;
    `);

    console.log("📋 ai_blocks table columns:");
    console.log(JSON.stringify(result.rows, null, 2));
    console.log();
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.end();
  }
}

checkTable();
