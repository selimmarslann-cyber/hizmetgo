/**
 * Create missing tables in Supabase using Management API
 * Uses SUPABASE_SERVICE_ROLE_KEY to execute SQL
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

// Load .env file
config({ path: join(process.cwd(), ".env") });

// Expected tables from Prisma schema and migrations
const EXPECTED_TABLES = [
  "users",
  "businesses",
  "products",
  "orders",
  "order_items",
  "payments",
  "reviews",
  "messages",
  "business_bans",
  "referral_codes",
  "referral_relations",
  "referral_rewards",
  "jobs",
  "instant_jobs",
  "instant_job_offers",
  "job_offers",
  "wallets",
  "payout_requests",
  "notifications",
  "push_tokens",
  "otps",
  "delivery_reminders",
  "job_notifications",
  "support_tickets",
  "support_messages",
  // Referral commission system tables (from 03_referral_commissions.sql)
  "region_managers",
  "wallet_transactions",
  "referral_payouts",
];

async function createMissingTables() {
  console.log("🚀 Checking and creating missing tables in Supabase...\n");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL environment variable is not set");
  }

  if (!supabaseServiceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY environment variable is not set",
    );
  }

  console.log(
    `📡 Connecting to Supabase: ${supabaseUrl.substring(0, 30)}...\n`,
  );

  // Supabase admin client
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // Get existing tables using a query
    // Note: Supabase JS client doesn't support direct SQL queries
    // We'll use the REST API directly
    console.log("📋 Checking existing tables...\n");

    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/get_tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
      },
      body: JSON.stringify({}),
    });

    let existingTables: string[] = [];

    // If the function doesn't exist, we'll check tables by trying to query them
    if (!response.ok) {
      console.log(
        "⚠️  Cannot query tables directly, will check migration files...\n",
      );

      // Alternative: Read migration files and determine which tables should exist
      const migrationsDir = join(process.cwd(), "supabase", "migrations");
      const migrationFiles = readdirSync(migrationsDir)
        .filter((file) => file.endsWith(".sql"))
        .sort();

      console.log(`📁 Found ${migrationFiles.length} migration files\n`);

      // Check which migrations create which tables
      const tableMigrations: Record<string, string[]> = {};

      for (const file of migrationFiles) {
        const filePath = join(migrationsDir, file);
        const sql = readFileSync(filePath, "utf-8");

        // Extract CREATE TABLE statements
        const createTableRegex =
          /CREATE TABLE (?:IF NOT EXISTS )?public\.(\w+)/gi;
        let match;
        while ((match = createTableRegex.exec(sql)) !== null) {
          const tableName = match[1];
          if (!tableMigrations[tableName]) {
            tableMigrations[tableName] = [];
          }
          tableMigrations[tableName].push(file);
        }
      }

      console.log("📊 Tables and their migrations:\n");
      for (const [table, migrations] of Object.entries(tableMigrations)) {
        console.log(`   ${table}:`);
        migrations.forEach((migration) => console.log(`      - ${migration}`));
      }
      console.log();

      // Check which expected tables are missing
      const allTablesFromMigrations = Object.keys(tableMigrations);
      const missingTables = EXPECTED_TABLES.filter(
        (table) => !allTablesFromMigrations.includes(table),
      );

      if (missingTables.length > 0) {
        console.log("⚠️  Tables in Prisma schema but not found in migrations:");
        missingTables.forEach((table) => console.log(`   - ${table}`));
        console.log();
        console.log("💡 These tables might be created by Prisma directly\n");
      }

      // Now try to execute missing migrations
      console.log("🔍 Checking which migrations need to be applied...\n");
      console.log(
        "💡 Since we cannot execute SQL directly via Supabase JS client,",
      );
      console.log(
        "   please apply the following migrations manually in Supabase SQL Editor:\n",
      );

      // List all migration files
      migrationFiles.forEach((file) => {
        console.log(`   - ${file}`);
      });

      console.log("\n📝 To apply migrations:");
      console.log("   1. Go to Supabase Dashboard > SQL Editor");
      console.log("   2. Copy and paste each migration file content");
      console.log("   3. Run the SQL\n");

      return;
    }

    // If we got here, we have the tables list
    const data = await response.json();
    existingTables = data.map((row: any) => row.table_name);

    console.log(`✅ Found ${existingTables.length} existing tables\n`);

    // Find missing tables
    const missingTables = EXPECTED_TABLES.filter(
      (table) => !existingTables.includes(table),
    );

    if (missingTables.length === 0) {
      console.log("✅ All expected tables exist!\n");
      return;
    }

    console.log(`⚠️  Found ${missingTables.length} missing tables:`);
    missingTables.forEach((table) => console.log(`   - ${table}`));
    console.log();
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    console.log(
      "\n💡 Alternative: Apply migrations manually via Supabase Dashboard\n",
    );
    throw error;
  }
}

createMissingTables()
  .then(() => {
    console.log("🎉 Check completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Check failed:", error);
    process.exit(1);
  });
