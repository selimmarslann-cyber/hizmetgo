/**
 * Test kullanıcısı oluştur: selimarslan
 *
 * Kullanım:
 * node scripts/create-test-user.js
 *
 * Veya npm script olarak:
 * npm run create-test-user
 */

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const email = "selimarslan@mahallem.test";
    const password = "selimarslan";
    const name = "Selim Arslan";

    // Mevcut kullanıcıyı kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("⚠️  Kullanıcı zaten mevcut:", email);
      console.log("Kullanıcı ID:", existingUser.id);
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
      },
    });

    console.log("✅ Kullanıcı oluşturuldu:");
    console.log("  ID:", user.id);
    console.log("  Email:", user.email);
    console.log("  İsim:", user.name);

    // Referral kodu oluştur
    const {
      getOrCreateReferralCodeForUser,
    } = require("../lib/services/referralService");
    const referralCode = await getOrCreateReferralCodeForUser(user.id);
    console.log("  Referral Kodu:", referralCode);

    // Wallet oluştur
    await prisma.$executeRaw`
      INSERT INTO wallets (user_id, balance, updated_at)
      VALUES (${user.id}::uuid, 0, now())
      ON CONFLICT (user_id) DO NOTHING
    `;

    console.log("\n🎉 Test kullanıcısı hazır!");
    console.log("\nGiriş bilgileri:");
    console.log("  Email:", email);
    console.log("  Şifre:", password);
    console.log("  Referral Kodu:", referralCode);

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
  createTestUser()
    .then(() => {
      console.log("\n✅ Tamamlandı!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Hata:", error);
      process.exit(1);
    });
}

module.exports = { createTestUser };
