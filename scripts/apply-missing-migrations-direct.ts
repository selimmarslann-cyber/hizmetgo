/**
 * Apply Missing Migrations Script (Direct SQL Execution)
 * 
 * Supabase'e eksik migration'ları direkt SQL olarak uygular.
 * Dosya yolu: C:\mahallem-main\mahallem-main
 */

import { config } from "dotenv";
import { Client } from "pg";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Load .env file
const envPaths = [
  join(process.cwd(), ".env"),
  join(process.cwd(), "mahallem-main", ".env"),
  join(process.cwd(), "mahallem-main", "mahallem-main", ".env"),
  "C:\\mahallem-main\\mahallem-main\\.env",
];

for (const envPath of envPaths) {
  try {
    if (existsSync(envPath)) {
      const result = config({ path: envPath, override: false });
      if (!result.error) {
        console.log(`📄 Loaded .env from: ${envPath}\n`);
        break;
      }
    }
  } catch (e) {
    // Continue
  }
}

async function applyMigrations() {
  console.log("🚀 Applying missing migrations to Supabase...\n");

  const databaseUrl =
    process.env.DIRECT_URL ||
    process.env.DATABASE_URL ||
    (process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
      ? `postgresql://postgres.${process.env.NEXT_PUBLIC_SUPABASE_URL.match(/https:\/\/(.+)\.supabase\.co/)?.[1]}:${process.env.SUPABASE_SERVICE_ROLE_KEY}@aws-0.eu-central-1.pooler.supabase.com:5432/postgres`
      : null);

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL, DIRECT_URL or Supabase credentials not found");
    console.error("💡 Set DATABASE_URL, DIRECT_URL, or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env file");
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

    // Migration dosyası
    const migrationFile = "15_fix_missing_tables.sql";
    
    // Try multiple paths
    const possiblePaths = [
      join(process.cwd(), "supabase", "migrations", migrationFile),
      join(process.cwd(), "mahallem-main", "supabase", "migrations", migrationFile),
      join(process.cwd(), "mahallem-main", "mahallem-main", "supabase", "migrations", migrationFile),
      "C:\\mahallem-main\\mahallem-main\\supabase\\migrations\\15_fix_missing_tables.sql",
    ];
    
    let filePath = possiblePaths.find(p => existsSync(p));
    
    if (!filePath) {
      console.error(`❌ Migration file not found. Tried paths:`);
      possiblePaths.forEach(p => console.error(`   - ${p}`));
      process.exit(1);
    }
    
    console.log(`📝 Using migration file: ${filePath}\n`);
    console.log(`📝 Applying: ${migrationFile}...\n`);

    try {
      const sql = readFileSync(filePath, "utf-8");
      
      // Tüm SQL'i tek seferde çalıştır
      // PostgreSQL birden fazla statement'ı destekler
      await client.query(sql);
      
      console.log(`   ✅ Success: ${migrationFile}\n`);
    } catch (error: any) {
      // Hata mesajını göster ama devam et
      console.error(`   ⚠️  Error (some statements may have failed): ${error.message.substring(0, 200)}\n`);
      // Devam et, bazı statement'lar başarılı olmuş olabilir
    }

    // Verify tables were created
    console.log("🔍 Verifying created tables...\n");

    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    const existingTables = result.rows.map((row) => row.table_name);

    const expectedTables = [
      "accounts",
      "invoices",
      "ledger_entries",
      "user_referral_profiles",
      "user_billing_profiles",
    ];

    const missingTables = expectedTables.filter(
      (table) => !existingTables.includes(table),
    );

    if (missingTables.length === 0) {
      console.log("✅ All expected tables now exist!\n");
    } else {
      console.log(`⚠️  Still missing ${missingTables.length} tables:`);
      missingTables.forEach((table) => console.log(`   - ${table}`));
      console.log("\n💡 Please run the SQL manually in Supabase Dashboard SQL Editor\n");
    }

    // Verify enums
    const enumResult = await client.query(`
      SELECT typname 
      FROM pg_type 
      WHERE typtype = 'e' 
      AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      ORDER BY typname;
    `);

    const existingEnums = enumResult.rows.map((row) => row.typname);

    const expectedEnums = ["ledger_entry_type", "wallet_transaction_type"];

    const missingEnums = expectedEnums.filter(
      (enumName) => !existingEnums.includes(enumName),
    );

    if (missingEnums.length === 0) {
      console.log("✅ All expected enums now exist!\n");
    } else {
      console.log(`⚠️  Still missing ${missingEnums.length} enums:`);
      missingEnums.forEach((enumName) => console.log(`   - ${enumName}`));
      console.log("\n💡 Please run the SQL manually in Supabase Dashboard SQL Editor\n");
    }
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    throw error;
  } finally {
    await client.end();
    console.log("🔌 Database connection closed\n");
  }
}

applyMigrations()
  .then(() => {
    console.log("🎉 Migration process completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Process failed:", error);
    process.exit(1);
  });

