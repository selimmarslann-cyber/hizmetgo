/**
 * Check Missing Columns Script
 * 
 * Yeni eklenen kolonları kontrol eder (Message file fields, Review moderation, Business order settings)
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

async function checkMissingColumns() {
  console.log("🔍 Checking for missing columns in Supabase...\n");

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

    // Check Messages table columns
    console.log("📋 Checking Messages table columns...");
    const messagesResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'messages'
      ORDER BY column_name;
    `);

    const messagesColumns = messagesResult.rows.map((row) => row.column_name);
    const expectedMessageColumns = [
      "file_url",
      "file_type",
      "file_name",
      "file_size",
      "is_read",
      "read_at",
      "updated_at",
    ];

    const missingMessageColumns = expectedMessageColumns.filter(
      (col) => !messagesColumns.includes(col),
    );

    if (missingMessageColumns.length > 0) {
      console.log(`   ⚠️  Missing columns: ${missingMessageColumns.join(", ")}\n`);
      console.log(`   💡 Run migration: 23_add_message_file_fields.sql\n`);
    } else {
      console.log(`   ✅ All message file columns exist!\n`);
    }

    // Check Reviews table columns
    console.log("📋 Checking Reviews table columns...");
    const reviewsResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'reviews'
      ORDER BY column_name;
    `);

    const reviewsColumns = reviewsResult.rows.map((row) => row.column_name);
    const expectedReviewColumns = ["moderation_status", "approved_at"];

    const missingReviewColumns = expectedReviewColumns.filter(
      (col) => !reviewsColumns.includes(col),
    );

    if (missingReviewColumns.length > 0) {
      console.log(`   ⚠️  Missing columns: ${missingReviewColumns.join(", ")}\n`);
      console.log(`   💡 Run migration: 99_add_review_moderation.sql\n`);
    } else {
      console.log(`   ✅ All review moderation columns exist!\n`);
    }

    // Check Businesses table columns
    console.log("📋 Checking Businesses table columns...");
    const businessesResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'businesses'
      ORDER BY column_name;
    `);

    const businessesColumns = businessesResult.rows.map((row) => row.column_name);
    const expectedBusinessColumns = [
      "min_order_amount",
      "delivery_radius",
      "has_delivery",
    ];

    const missingBusinessColumns = expectedBusinessColumns.filter(
      (col) => !businessesColumns.includes(col),
    );

    if (missingBusinessColumns.length > 0) {
      console.log(`   ⚠️  Missing columns: ${missingBusinessColumns.join(", ")}\n`);
      console.log(`   💡 Run migration: 04_business_order_settings.sql\n`);
    } else {
      console.log(`   ✅ All business order settings columns exist!\n`);
    }

    // Check Accounts table
    console.log("📋 Checking Accounts table...");
    const accountsResult = await client.query(`
      SELECT COUNT(*) as count
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'accounts';
    `);

    if (accountsResult.rows[0].count === "0") {
      console.log(`   ⚠️  Accounts table does not exist!\n`);
      console.log(`   💡 Run migration: 15_fix_missing_tables_FINAL.sql\n`);
    } else {
      console.log(`   ✅ Accounts table exists!\n`);
    }

    // Check Invoices table
    console.log("📋 Checking Invoices table...");
    const invoicesResult = await client.query(`
      SELECT COUNT(*) as count
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'invoices';
    `);

    if (invoicesResult.rows[0].count === "0") {
      console.log(`   ⚠️  Invoices table does not exist!\n`);
      console.log(`   💡 Run migration: 15_fix_missing_tables_FINAL.sql\n`);
    } else {
      console.log(`   ✅ Invoices table exists!\n`);
    }

    // Check LedgerEntries table
    console.log("📋 Checking LedgerEntries table...");
    const ledgerResult = await client.query(`
      SELECT COUNT(*) as count
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'ledger_entries';
    `);

    if (ledgerResult.rows[0].count === "0") {
      console.log(`   ⚠️  LedgerEntries table does not exist!\n`);
      console.log(`   💡 Run migration: 15_fix_missing_tables_FINAL.sql\n`);
    } else {
      console.log(`   ✅ LedgerEntries table exists!\n`);
    }

    // Check WalletTransactions table
    console.log("📋 Checking WalletTransactions table...");
    const walletTxResult = await client.query(`
      SELECT COUNT(*) as count
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'wallet_transactions';
    `);

    if (walletTxResult.rows[0].count === "0") {
      console.log(`   ⚠️  WalletTransactions table does not exist!\n`);
      console.log(`   💡 Run migration: 15_fix_missing_tables_FINAL.sql\n`);
    } else {
      console.log(`   ✅ WalletTransactions table exists!\n`);
    }

    // Check UserReferralProfiles table
    console.log("📋 Checking UserReferralProfiles table...");
    const referralProfileResult = await client.query(`
      SELECT COUNT(*) as count
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'user_referral_profiles';
    `);

    if (referralProfileResult.rows[0].count === "0") {
      console.log(`   ⚠️  UserReferralProfiles table does not exist!\n`);
      console.log(`   💡 Run migration: 15_fix_missing_tables_FINAL.sql\n`);
    } else {
      console.log(`   ✅ UserReferralProfiles table exists!\n`);
    }

    // Check UserBillingProfiles table
    console.log("📋 Checking UserBillingProfiles table...");
    const billingProfileResult = await client.query(`
      SELECT COUNT(*) as count
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'user_billing_profiles';
    `);

    if (billingProfileResult.rows[0].count === "0") {
      console.log(`   ⚠️  UserBillingProfiles table does not exist!\n`);
      console.log(`   💡 Run migration: 15_fix_missing_tables_FINAL.sql\n`);
    } else {
      console.log(`   ✅ UserBillingProfiles table exists!\n`);
    }

    console.log("=".repeat(60));
    console.log("✅ Column check completed!\n");
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    throw error;
  } finally {
    await client.end();
    console.log("🔌 Database connection closed\n");
  }
}

checkMissingColumns()
  .then(() => {
    console.log("🎉 All checks completed!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Process failed:", error);
    process.exit(1);
  });

