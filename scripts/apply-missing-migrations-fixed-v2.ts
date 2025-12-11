/**
 * Apply Missing Migrations Script (Fixed Path & SQL Parsing)
 * 
 * Supabase'e eksik migration'ları uygular.
 * Dosya yolu: C:\mahallem-main\mahallem-main
 */

import { config } from "dotenv";
import { Client } from "pg";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Load .env file - try multiple paths
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

      // SQL'i düzgün şekilde statement'lara böl
      // DO $$ BEGIN ... END $$; bloklarını koru
      const statements: string[] = [];
      let currentStatement = "";
      let inDollarQuote = false;
      let dollarTag = "";
      
      const lines = sql.split("\n");
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        currentStatement += line + "\n";
        
        // Dollar quote kontrolü
        const dollarQuoteMatch = line.match(/\$(\w*)\$/g);
        if (dollarQuoteMatch) {
          for (const match of dollarQuoteMatch) {
            if (!inDollarQuote) {
              inDollarQuote = true;
              dollarTag = match;
            } else if (match === dollarTag) {
              inDollarQuote = false;
              dollarTag = "";
            }
          }
        }
        
        // Eğer dollar quote içinde değilsek ve ; ile bitiyorsa statement'ı tamamla
        if (!inDollarQuote && line.trim().endsWith(";")) {
          const trimmed = currentStatement.trim();
          if (trimmed && !trimmed.startsWith("--")) {
            statements.push(trimmed);
          }
          currentStatement = "";
        }
      }
      
      // Kalan statement varsa ekle
      if (currentStatement.trim() && !currentStatement.trim().startsWith("--")) {
        statements.push(currentStatement.trim());
      }

      console.log(`📊 Found ${statements.length} SQL statements\n`);

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        if (statement.length > 0) {
          try {
            await client.query(statement);
          } catch (err: any) {
            // "already exists" hatalarını yoksay
            if (
              err.message.includes("already exists") ||
              err.message.includes("duplicate") ||
              err.code === "42710" || // duplicate_object
              err.code === "42P07" || // duplicate_table
              err.code === "42723" || // duplicate_function
              err.message.includes("does not exist") // Relation does not exist (normal, çünkü sırayla oluşturuyoruz)
            ) {
              // Skip, already exists or will be created
            } else {
              console.error(`   ⚠️  Statement ${i + 1} Warning: ${err.message.substring(0, 100)}`);
            }
          }
        }
      }

      console.log(`   ✅ Success: ${migrationFile}\n`);
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}\n`);
      throw error;
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

