import OpenAI from "openai";
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

// .env dosyasını manuel yükle (Next.js bazen yüklemez)
if (typeof window === "undefined") {
  const envPath = resolve(process.cwd(), ".env");
  config({ path: envPath, override: true });

  // Ekstra güvenlik: .env dosyasından direkt oku
  try {
    const envContent = readFileSync(envPath, "utf8");
    const envLines = envContent.split("\n");
    for (const line of envLines) {
      if (line.startsWith("OPENAI_API_KEY=")) {
        const keyValue = line.replace("OPENAI_API_KEY=", "").trim();
        if (keyValue && !process.env.OPENAI_API_KEY) {
          process.env.OPENAI_API_KEY = keyValue;
        } else if (keyValue) {
          // Eğer zaten varsa ama farklıysa, .env'deki değeri kullan
          process.env.OPENAI_API_KEY = keyValue;
        }
        break;
      }
    }
  } catch (e) {
    // .env okunamazsa sessizce devam et
  }
}

// Lazy initialization - Next.js'de environment variables runtime'da yüklenir
let openaiInstance: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiInstance) {
    // Önce process.env'den oku, yoksa manuel oku
    let apiKey = process.env.OPENAI_API_KEY?.trim();

    // Eğer hala yoksa, .env dosyasından direkt oku
    if (!apiKey) {
      try {
        const envPath = resolve(process.cwd(), ".env");
        const envContent = readFileSync(envPath, "utf8");
        const envLines = envContent.split("\n");
        for (const line of envLines) {
          if (line.startsWith("OPENAI_API_KEY=")) {
            apiKey = line.replace("OPENAI_API_KEY=", "").trim();
            break;
          }
        }
      } catch (e) {
        // Hata durumunda sessizce devam et
      }
    }

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY environment variable bulunamadı. Lütfen .env dosyasına ekleyin.",
      );
    }

    // Key format kontrolü
    if (!apiKey.startsWith("sk-")) {
      throw new Error(
        "OPENAI_API_KEY formatı hatalı. Key 'sk-' ile başlamalı.",
      );
    }

    openaiInstance = new OpenAI({
      apiKey: apiKey,
    });
  }
  return openaiInstance;
}

export default getOpenAIClient();

// Backward compatibility için askOpenAI fonksiyonu
export async function askOpenAI(
  prompt: string,
  messages: any[] = [],
  includeSystemPrompt: boolean = true,
) {
  // API Key kontrolü ve trim - önce process.env'den, yoksa .env dosyasından direkt oku
  let apiKey = process.env.OPENAI_API_KEY?.trim();

  // Eğer hala yoksa, .env dosyasından direkt oku
  if (!apiKey) {
    try {
      const envPath = resolve(process.cwd(), ".env");
      const envContent = readFileSync(envPath, "utf8");
      const envLines = envContent.split("\n");
      for (const line of envLines) {
        if (line.startsWith("OPENAI_API_KEY=")) {
          apiKey = line.replace("OPENAI_API_KEY=", "").trim();
          // process.env'e de ekle
          process.env.OPENAI_API_KEY = apiKey;
          break;
        }
      }
    } catch (e) {
      // Hata durumunda sessizce devam et
    }
  }

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY environment variable bulunamadı. Lütfen .env dosyasına ekleyin.",
    );
  }

  // Key format kontrolü
  if (!apiKey.startsWith("sk-")) {
    throw new Error("OPENAI_API_KEY formatı hatalı. Key 'sk-' ile başlamalı.");
  }

  // System prompt sadece ilk mesajda veya açıkça istenirse gönderilir
  const messageArray: any[] = [];

  if (includeSystemPrompt && process.env.HIZMETGO_SYSTEM_PROMPT) {
    messageArray.push({
      role: "system",
      content: process.env.HIZMETGO_SYSTEM_PROMPT,
    });
  }

  // Conversation history ekle
  messageArray.push(...messages);

  // Son olarak kullanıcı mesajını ekle
  messageArray.push({ role: "user", content: prompt });

  // Timeout kontrolü için AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

  try {
    // SDK sorunlu, direkt HTTP kullan (daha güvenilir)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messageArray,
        temperature: 0.4,
        max_tokens: 700, // Token limiti - gereksiz tüketimi engelle
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText } };
      }

      if (
        response.status === 401 ||
        errorData.error?.code === "invalid_api_key"
      ) {
        throw new Error(
          "OpenAI API Key geçersiz. Lütfen .env dosyasındaki OPENAI_API_KEY değerini kontrol edin.",
        );
      }

      throw new Error(
        `OpenAI API hatası: ${errorData.error?.message || response.statusText}`,
      );
    }

    const data = await response.json();
    return data.choices[0].message.content || "";
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("AI çağrısı zaman aşımına uğradı (10 saniye)");
    }

    if (
      error.message.includes("invalid_api_key") ||
      error.message.includes("API Key geçersiz")
    ) {
      console.error("❌ OpenAI API Key geçersiz!");
      console.error("API Key başlangıcı:", apiKey.substring(0, 20) + "...");
      console.error("API Key uzunluğu:", apiKey.length);
      throw error;
    }
    throw error;
  }
}
