/**
 * OpenAI API Key Test Script
 *
 * Usage: node scripts/test-openai-key.js
 */

const path = require("path");
const fs = require("fs");

// Önce .env dosyasını manuel oku
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

require("dotenv").config({ path: ".env", override: true });

const OpenAI = require("openai");

async function testOpenAIKey() {
  console.log("🧪 OpenAI API Key Test Başlatılıyor...\n");

  const apiKey = process.env.OPENAI_API_KEY?.trim();

  // OPENAI key'ini göster
  console.log("🔍 Environment Variables:");
  console.log(
    "OPENAI_API_KEY:",
    apiKey ? apiKey.substring(0, 20) + "..." : "BULUNAMADI",
  );
  console.log("");

  if (!apiKey) {
    console.error("❌ OPENAI_API_KEY environment variable bulunamadı!");
    console.error("Lütfen .env dosyasına OPENAI_API_KEY ekleyin.");
    process.exit(1);
  }

  console.log("✅ OPENAI_API_KEY bulundu");
  console.log("📋 Key başlangıcı:", apiKey.substring(0, 20) + "...");
  console.log("📏 Key uzunluğu:", apiKey.length, "karakter");
  console.log("");

  // Format kontrolü
  if (!apiKey.startsWith("sk-")) {
    console.error(
      '❌ API Key formatı hatalı! OpenAI key\'leri "sk-" ile başlamalı.',
    );
    process.exit(1);
  }

  console.log("✅ API Key formatı doğru (sk- ile başlıyor)");
  console.log("");

  // Gerçek API çağrısı ile test
  console.log("🔍 OpenAI API'ye bağlanılıyor...");
  try {
    const client = new OpenAI({
      apiKey: apiKey,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content:
            'Merhaba, bu bir test mesajıdır. Sadece "Test başarılı" yaz.',
        },
      ],
      max_tokens: 10,
    });

    const reply = response.choices[0].message.content;
    console.log("✅ API Key geçerli ve çalışıyor!");
    console.log("📝 Test yanıtı:", reply);
    console.log("");
    console.log("🎉 OpenAI entegrasyonu hazır!");
  } catch (error) {
    console.error("❌ API Key testi başarısız!");
    console.error("Hata:", error.message);

    if (error.code === "invalid_api_key") {
      console.error("");
      console.error("🔴 API Key geçersiz!");
      console.error("Lütfen:");
      console.error("1. OpenAI dashboard'dan yeni bir API key oluşturun");
      console.error("2. .env dosyasına doğru key'i ekleyin");
      console.error("3. Server'ı restart edin");
    } else if (error.code === "insufficient_quota") {
      console.error("");
      console.error("🔴 API Key'de yeterli kredi yok!");
      console.error("Lütfen OpenAI dashboard'dan kredi yükleyin");
    } else {
      console.error("");
      console.error("🔴 Beklenmeyen hata:", error.code || "Bilinmeyen");
    }

    process.exit(1);
  }
}

testOpenAIKey().catch(console.error);
