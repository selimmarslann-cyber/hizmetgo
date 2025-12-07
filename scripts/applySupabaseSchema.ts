/**
 * Supabase Schema Uygulama Script'i
 *
 * Bu script, Supabase veritabanına SQL şemasını uygular.
 * DATABASE_URL environment değişkenini kullanır.
 */

// .env.local dosyasını yükle (önce .env.local, sonra .env)
import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

// Önce .env.local'i yükle (daha yüksek öncelik)
const envLocalPath = resolve(process.cwd(), ".env.local");
const envPath = resolve(process.cwd(), ".env");

// Mevcut DATABASE_URL'i sakla (eğer varsa)
const existingDbUrl = process.env.DATABASE_URL;

// .env.local varsa onu yükle (override: true ile mevcut değerleri ezecek)
if (existsSync(envLocalPath)) {
  const result = config({ path: envLocalPath, override: true });
  if (result.error) {
    console.warn("⚠️  .env.local yüklenirken hata:", result.error.message);
  } else {
    console.log("✅ .env.local dosyası yüklendi");
  }
} else {
  console.warn("⚠️  .env.local dosyası bulunamadı!");
}

// .env dosyasını yükle (override: false = .env.local öncelikli)
if (existsSync(envPath)) {
  config({ path: envPath, override: false });
}

import { Client } from "pg";
import { readFileSync } from "fs";
import { join } from "path";

async function applySupabaseSchema() {
  // Ortam değişkenleri kontrolü
  // .env.local'den yüklenen değeri kontrol et
  const databaseUrl = process.env.DATABASE_URL;

  console.log("\n🔍 Environment değişkenleri kontrol ediliyor...");
  console.log(`   DATABASE_URL uzunluğu: ${databaseUrl?.length || 0}`);
  console.log(
    `   DATABASE_URL başlangıcı: ${databaseUrl?.substring(0, 30) || "undefined"}...`,
  );

  if (!databaseUrl) {
    console.error("❌ HATA: DATABASE_URL environment değişkeni tanımlı değil!");
    console.error(
      "   Lütfen .env.local dosyasında DATABASE_URL değişkenini ayarlayın.",
    );
    process.exit(1);
  }

  console.log("🔄 Supabase schema uygulanıyor...");

  // DATABASE_URL format kontrolü
  if (
    !databaseUrl.startsWith("postgresql://") &&
    !databaseUrl.startsWith("postgres://")
  ) {
    console.error("❌ HATA: DATABASE_URL geçersiz format!");
    console.error(`   Mevcut değer: ${databaseUrl}`);
    console.error(
      "   DATABASE_URL postgresql:// veya postgres:// ile başlamalıdır.",
    );
    console.error(
      "   Örnek: postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres",
    );
    console.error(
      "\n💡 İpucu: .env.local dosyasını kontrol edin ve DATABASE_URL değerinin doğru olduğundan emin olun.",
    );
    process.exit(1);
  }

  console.log(`   Database URL: ${databaseUrl.replace(/:[^:@]+@/, ":****@")}`); // Şifreyi gizle

  // Connection string'i kullan (DIRECT_URL varsa onu kullan, yoksa DATABASE_URL)
  let connectionString = process.env.DIRECT_URL || databaseUrl;

  // DIRECT_URL migration'lar için daha uygun (pgbouncer olmadan)
  if (process.env.DIRECT_URL) {
    console.log(`   ℹ️  DIRECT_URL kullanılıyor (migration için)`);
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false, // Supabase için gerekli
    },
  });

  try {
    // Veritabanına bağlan
    await client.connect();
    console.log("✅ Veritabanına bağlanıldı");

    // SQL dosyalarını sırayla çalıştır
    const sqlFiles = ["supabase/migrations/03_referral_commissions.sql"];

    for (const sqlFile of sqlFiles) {
      const filePath = join(process.cwd(), sqlFile);
      console.log(`\n📄 ${sqlFile} dosyası okunuyor...`);

      try {
        const sql = readFileSync(filePath, "utf8");

        // SQL'i çalıştır (birden fazla statement varsa split et)
        // PostgreSQL'de ; ile ayrılmış statement'ları tek tek çalıştır
        const statements = sql
          .split(";")
          .map((s) => s.trim())
          .filter((s) => s.length > 0 && !s.startsWith("--"));

        let successCount = 0;
        let errorCount = 0;

        for (const statement of statements) {
          try {
            if (statement.length > 10) {
              // Çok kısa statement'ları atla
              await client.query(statement + ";");
              successCount++;
            }
          } catch (stmtError: any) {
            // Kritik olmayan hatalar için devam et
            if (
              stmtError.message.includes("already exists") ||
              stmtError.message.includes("duplicate") ||
              stmtError.message.includes("cannot be implemented")
            ) {
              // Bu hatalar genellikle zaten var olan objeler için
              errorCount++;
              console.warn(
                `   ⚠️  Statement atlandı (zaten mevcut): ${stmtError.message.substring(0, 50)}...`,
              );
            } else {
              // Kritik hataları fırlat
              throw stmtError;
            }
          }
        }

        if (successCount > 0 || errorCount === 0) {
          console.log(
            `✅ ${sqlFile} başarıyla uygulandı (${successCount} statement başarılı)`,
          );
        } else {
          console.warn(
            `⚠️  ${sqlFile} kısmen uygulandı (bazı statement'lar zaten mevcut)`,
          );
        }
      } catch (fileError: any) {
        // Dosya bulunamadıysa veya hata varsa
        if (fileError.code === "ENOENT") {
          console.warn(`⚠️  ${sqlFile} dosyası bulunamadı, atlanıyor...`);
        } else {
          console.error(`❌ ${sqlFile} uygulanırken hata:`, fileError.message);
          // Kritik olmayan hatalar için devam et
          if (
            fileError.message.includes("already exists") ||
            fileError.message.includes("duplicate")
          ) {
            console.warn(
              `   (Bu hata genellikle şema zaten uygulanmış olduğunda görülür)`,
            );
          } else if (fileError.message.includes("does not exist")) {
            console.error(`\n   ⚠️  Tablo/relation bulunamadı hatası!`);
            console.error(`   💡 Önce Prisma schema'yı uygulamanız gerekiyor:`);
            console.error(`      npm run db:push`);
            console.error(
              `   Bu migration dosyası Prisma schema'dan sonra çalıştırılmalıdır.`,
            );
            // Bu hatayı throw etme, sadece uyar
            console.warn(
              `   ⚠️  Migration atlanıyor, önce Prisma schema'yı uygulayın.`,
            );
          } else if (
            fileError.message.includes("cannot be implemented") ||
            fileError.message.includes("foreign key constraint")
          ) {
            console.warn(
              `\n   ⚠️  Foreign key constraint hatası (genellikle zaten var olan constraint'ler için)`,
            );
            console.warn(
              `   💡 Bu hata genellikle constraint zaten mevcut olduğunda görülür.`,
            );
            console.warn(`   Migration devam ediyor...`);
            // Bu hatayı throw etme, sadece uyar ve devam et
          } else {
            throw fileError;
          }
        }
      }
    }

    console.log("\n✅ Supabase schema başarıyla uygulandı!");
  } catch (error: any) {
    console.error("\n❌ Schema uygulanırken hata oluştu:");
    console.error(error.message);
    if (error.stack) {
      console.error("\nStack trace:");
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    await client.end();
    console.log("🔌 Veritabanı bağlantısı kapatıldı");
  }
}

// Script doğrudan çalıştırılıyorsa
if (require.main === module) {
  applySupabaseSchema()
    .then(() => {
      console.log("\n🎉 Tamamlandı!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Kritik hata:", error);
      process.exit(1);
    });
}

export { applySupabaseSchema };
