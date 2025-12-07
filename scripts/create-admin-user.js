/**
 * Admin kullanıcısı oluştur: admin@admin.com
 *
 * Kullanım:
 * node scripts/create-admin-user.js
 */

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const email = "admin@admin.com";
    const password = "admin";
    const name = "admin";

    // Mevcut kullanıcıyı kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("⚠️  Kullanıcı zaten mevcut:", email);
      console.log("Kullanıcı ID:", existingUser.id);

      // Şifreyi güncelle
      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { passwordHash, name, role: "ADMIN" },
      });
      console.log("✅ Kullanıcı bilgileri güncellendi");
      return existingUser;
    }

    // Şifreyi hash'le
    const passwordHash = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin kullanıcısı oluşturuldu:");
    console.log("  ID:", user.id);
    console.log("  Email:", user.email);
    console.log("  İsim:", user.name);
    console.log("  Rol:", user.role);

    // Referral kodu oluştur
    try {
      const {
        getOrCreateReferralCodeForUser,
      } = require("../lib/services/referralService");
      const referralCode = await getOrCreateReferralCodeForUser(user.id);
      console.log("  Referral Kodu:", referralCode);
    } catch (refError) {
      console.log(
        "  Referral kodu oluşturulamadı (opsiyonel):",
        refError.message,
      );
    }

    // Wallet oluştur
    try {
      await prisma.$executeRaw`
        INSERT INTO wallets (user_id, balance, updated_at)
        VALUES (${user.id}::uuid, 0, now())
        ON CONFLICT (user_id) DO NOTHING
      `;
      console.log("  Wallet oluşturuldu");
    } catch (walletError) {
      console.log("  Wallet oluşturulamadı (opsiyonel):", walletError.message);
    }

    console.log("\n🎉 Admin kullanıcısı hazır!");
    console.log("\nGiriş bilgileri:");
    console.log("  Email:", email);
    console.log("  Şifre:", password);

    return user;
  } catch (error) {
    console.error("❌ Hata:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Script doğrudan çalıştırılıyorsa
if (require.main === module) {
  createAdminUser()
    .then(() => {
      console.log("\n✅ Tamamlandı!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Hata:", error);
      process.exit(1);
    });
}

module.exports = { createAdminUser };
