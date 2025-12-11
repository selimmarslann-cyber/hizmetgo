/**
 * Check Missing Tables Script
 * 
 * Prisma schema'daki tüm modelleri kontrol edip Supabase'de eksik tabloları tespit eder.
 */

import { config } from "dotenv";
import { Client } from "pg";
import { join } from "path";

// Load .env file
const envPaths = [
  join(process.cwd(), ".env"),
  join(process.cwd(), "mahallem-main", ".env"),
  join(process.cwd(), "mahallem-main", "mahallem-main", ".env"),
];

for (const envPath of envPaths) {
  try {
    const result = config({ path: envPath, override: false });
    if (!result.error) {
      console.log(`📄 Loaded .env from: ${envPath}\n`);
      break;
    }
  } catch (e) {
    // Continue
  }
}

async function checkMissingTables() {
  console.log("🔍 Checking for missing tables in Supabase...\n");

  const databaseUrl =
    process.env.DIRECT_URL ||
    process.env.DATABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
      "https://",
      "postgresql://postgres:",
    ).replace(".supabase.co", ".pooler.supabase.com:5432/postgres");

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL or DIRECT_URL not found");
    console.error("💡 Set DATABASE_URL or DIRECT_URL in .env file");
    process.exit(1);
  }

  console.log(`📡 Connecting to database...\n`);

  const client = new Client({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log("✅ Connected to database\n");

    // Get existing tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    const existingTables = result.rows.map((row) => row.table_name);
    console.log(`📋 Found ${existingTables.length} existing tables\n`);

    // Expected tables from Prisma schema
    const expectedTables = [
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
      "accounts",
      // FAZ 4: Fee & Invoice System
      "invoices",
      "ledger_entries",
      "wallet_transactions",
      "user_referral_profiles",
      "user_billing_profiles",
    ];

    // Find missing tables
    const missingTables = expectedTables.filter(
      (table) => !existingTables.includes(table),
    );

    console.log("=".repeat(60));
    if (missingTables.length === 0) {
      console.log("✅ All tables exist!\n");
    } else {
      console.log(`⚠️  Found ${missingTables.length} missing tables:\n`);
      missingTables.forEach((table) => console.log(`   - ${table}`));
      console.log("\n" + "=".repeat(60));
    }

    // Check existing enums
    const enumResult = await client.query(`
      SELECT typname 
      FROM pg_type 
      WHERE typtype = 'e' 
      AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      ORDER BY typname;
    `);

    const existingEnums = enumResult.rows.map((row) => row.typname);
    console.log(`\n📋 Found ${existingEnums.length} existing enums\n`);

    // Expected enums
    const expectedEnums = [
      "user_role",
      "business_category",
      "online_status",
      "delivery_type",
      "order_status",
      "payment_status",
      "job_status",
      "instant_job_status",
      "instant_job_offer_status",
      "job_offer_status",
      "payout_status",
      "notification_type",
      "support_ticket_status",
      "support_ticket_category",
      "support_message_type",
      "ledger_entry_type",
      "wallet_transaction_type",
    ];

    const missingEnums = expectedEnums.filter(
      (enumName) => !existingEnums.includes(enumName),
    );

    if (missingEnums.length > 0) {
      console.log(`⚠️  Found ${missingEnums.length} missing enums:\n`);
      missingEnums.forEach((enumName) => console.log(`   - ${enumName}`));
      console.log("\n" + "=".repeat(60));
    } else {
      console.log("✅ All enums exist!\n");
    }

    return { missingTables, missingEnums };
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    throw error;
  } finally {
    await client.end();
    console.log("🔌 Database connection closed\n");
  }
}

checkMissingTables()
  .then(({ missingTables, missingEnums }) => {
    if (missingTables.length > 0 || missingEnums.length > 0) {
      console.log("\n📝 Missing items detected. Please apply migrations.\n");
      process.exit(1);
    } else {
      console.log("🎉 All tables and enums exist!\n");
      process.exit(0);
    }
  })
  .catch((error) => {
    console.error("❌ Process failed:", error);
    process.exit(1);
  });

