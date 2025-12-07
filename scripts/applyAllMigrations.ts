/**
 * Apply all SQL migrations to Supabase
 * Uses service role key from .env (does not modify .env)
 */

import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

async function applyMigrations() {
  console.log("🚀 Applying SQL migrations to Supabase...\n");

  // .env'den değerleri al (değiştirme, sadece oku)
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

  console.log(`📡 Connecting to Supabase: ${supabaseUrl.substring(0, 30)}...`);

  // Supabase admin client oluştur
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Migration dosyalarını oku
  const migrationsDir = join(process.cwd(), "supabase", "migrations");
  const files = readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort(); // Numaralı sırayla

  console.log(`📁 Found ${files.length} migration files\n`);

  for (const file of files) {
    const filePath = join(migrationsDir, file);
    const sql = readFileSync(filePath, "utf-8");

    console.log(`📝 Applying: ${file}...`);

    try {
      // SQL'i çalıştır
      const { error } = await supabase.rpc("exec_sql", { sql_query: sql });

      if (error) {
        // exec_sql function yoksa direkt query yap
        // Supabase'de SQL çalıştırmak için REST API kullan
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseServiceRoleKey,
            Authorization: `Bearer ${supabaseServiceRoleKey}`,
          },
          body: JSON.stringify({ sql_query: sql }),
        });

        if (!response.ok) {
          // Alternatif: SQL'i parçalara böl ve tek tek çalıştır
          const statements = sql
            .split(";")
            .map((s) => s.trim())
            .filter((s) => s.length > 0 && !s.startsWith("--"));

          for (const statement of statements) {
            if (statement.length > 0) {
              try {
                // Supabase PostgREST kullanarak direkt SQL çalıştıramayız
                // Bunun yerine migration'ları manuel olarak Supabase Dashboard'dan çalıştırmak gerekir
                // Veya Supabase CLI kullanılmalı
                console.log(`   ⚠️  Cannot execute SQL directly via API`);
                console.log(
                  `   💡 Please run migrations manually via Supabase Dashboard or CLI`,
                );
                break;
              } catch (err: any) {
                console.error(`   ❌ Error in statement: ${err.message}`);
              }
            }
          }
        }
      } else {
        console.log(`   ✅ Success: ${file}`);
      }
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`);
      console.log(
        `   💡 Migration file created but needs to be applied manually`,
      );
    }
  }

  console.log("\n📋 Migration files ready!");
  console.log("💡 To apply migrations:");
  console.log("   1. Use Supabase Dashboard > SQL Editor");
  console.log("   2. Or use Supabase CLI: supabase db push");
  console.log("   3. Or run each migration file manually");
}

applyMigrations().catch(console.error);
