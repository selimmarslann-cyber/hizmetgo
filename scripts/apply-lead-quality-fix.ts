/**
 * Apply lead_quality_score fix to Supabase
 * Updates functions to handle RLS errors gracefully
 * Zorla .env'den tüm Supabase key'lerini alır
 */

import { config } from "dotenv";
import { resolve } from "path";
import { Client } from "pg";
import { readFileSync } from "fs";
import { join } from "path";

// .env dosyasını yükle (hem .env hem .env.local)
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: false });

async function applyFix() {
  console.log("🔧 Applying lead_quality_score RLS fix to Supabase...\n");

  // .env'den tüm Supabase key'lerini kontrol et
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const directUrl = process.env.DIRECT_URL;
  const databaseUrl = process.env.DATABASE_URL;

  console.log("📋 Environment variables check:");
  console.log(
    `   NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? "✅ Set" : "❌ Missing"}`,
  );
  console.log(
    `   SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceRoleKey ? "✅ Set" : "❌ Missing"}`,
  );
  console.log(`   DIRECT_URL: ${directUrl ? "✅ Set" : "❌ Missing"}`);
  console.log(`   DATABASE_URL: ${databaseUrl ? "✅ Set" : "❌ Missing"}\n`);

  // Öncelik sırası: DIRECT_URL > DATABASE_URL
  let connectionString = directUrl || databaseUrl;

  if (!connectionString) {
    // Eğer DIRECT_URL ve DATABASE_URL yoksa, Supabase URL'den connection string oluşturmayı dene
    if (!supabaseUrl) {
      throw new Error(
        "❌ DATABASE_URL, DIRECT_URL veya NEXT_PUBLIC_SUPABASE_URL bulunamadı!\n" +
          "💡 Lütfen .env dosyanıza şunlardan birini ekleyin:\n" +
          "   - DIRECT_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres\n" +
          "   - DATABASE_URL=postgresql://...\n" +
          "   - Veya Supabase Dashboard > Settings > Database > Connection string > Direct connection\n",
      );
    }

    // Supabase URL'den project ref çıkar
    const projectRefMatch = supabaseUrl.match(
      /https?:\/\/([^.]+)\.supabase\.co/,
    );
    if (projectRefMatch) {
      const projectRef = projectRefMatch[1];
      console.log(
        `⚠️  DIRECT_URL bulunamadı, Supabase project ref: ${projectRef}`,
      );
      console.log(`💡 Lütfen .env dosyanıza DIRECT_URL ekleyin:\n`);
      console.log(
        `   DIRECT_URL=postgresql://postgres.[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres\n`,
      );
      console.log(
        `   Supabase Dashboard > Settings > Database > Connection string > Direct connection\n`,
      );
      throw new Error(
        "DIRECT_URL environment variable is required for migrations",
      );
    } else {
      throw new Error("Invalid NEXT_PUBLIC_SUPABASE_URL format");
    }
  }

  if (
    !connectionString.startsWith("postgresql://") &&
    !connectionString.startsWith("postgres://")
  ) {
    throw new Error(
      "DATABASE_URL/DIRECT_URL must start with postgresql:// or postgres://",
    );
  }

  console.log(`📡 Connecting to database...`);
  console.log(
    `   Using: ${directUrl ? "DIRECT_URL" : databaseUrl ? "DATABASE_URL" : "N/A"}\n`,
  );

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

    // Fix dosyasını oku
    const fixFilePath = join(
      process.cwd(),
      "supabase",
      "migrations",
      "08_lead_quality_score_fix.sql",
    );
    const sql = readFileSync(fixFilePath, "utf-8");

    console.log(`📝 Applying fix: 08_lead_quality_score_fix.sql...\n`);

    try {
      // SQL'i çalıştır
      await client.query(sql);
      console.log("   ✅ Success: Functions updated successfully!\n");
      console.log("   📋 Updated functions:");
      console.log("      - update_lead_quality_score()");
      console.log("      - trigger_calculate_lead_quality_score()\n");
      console.log(
        "   ✨ Now lead_quality_scores RLS errors will be handled gracefully!",
      );
      console.log(
        "   ✨ Listing creation will continue even if quality score insert fails.\n",
      );
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}\n`);
      throw error;
    }
  } catch (error: any) {
    console.error("❌ Connection error:", error.message);
    throw error;
  } finally {
    await client.end();
    console.log("🔌 Disconnected from database");
  }
}

applyFix().catch((error) => {
  console.error("\n❌ Fix application failed!");
  console.error("Error:", error.message);
  console.error("\n💡 Çözüm önerileri:");
  console.error(
    "   1. .env dosyanızın proje kök dizininde olduğundan emin olun",
  );
  console.error(
    "   2. .env dosyasında DIRECT_URL veya DATABASE_URL olduğundan emin olun",
  );
  console.error(
    "   3. Supabase Dashboard > Settings > Database > Connection string > Direct connection",
  );
  console.error(
    "   4. DIRECT_URL formatı: postgresql://postgres.[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres\n",
  );
  process.exit(1);
});
