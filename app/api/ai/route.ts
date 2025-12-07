import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";
import { memoryCache } from "@/lib/cache/memoryCache";
import { withRateLimit } from "@/lib/middleware/rateLimit";
import { logger } from "@/lib/utils/logger";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorCodeFromStatus,
  getStatusFromErrorCode,
} from "@/lib/utils/apiError";

const SESSION_TTL = 3600; // 1 saat session TTL

// System prompt - Environment variable'dan oku, yoksa default kullan
const DEFAULT_SYSTEM_PROMPT = `SEN HİZMETGO USTASISIN.

AMAÇ:
Kullanıcının istediği işe fiyat çıkarabilmek için gereken TEMEL bilgileri hızlıca toplamak ve ilan taslağı oluşturmak.

DAVRANIŞ KURALLARI:
- Sohbet etme, açıklama yapma, tavsiye verme, paragraf yazma.
- Cevapların 1 cümlelik özet + 3–5 kısa soru şeklinde olsun.
- Kullanıcıyı dışarı yönlendirme, reklam yapma, teşekkür etme, "iyi günler" deme.
- Gereksiz teknik detay, renk, dekor, marka, ürün önerisi YASAK.
- Her mesaj mutlaka sorularla bitsin.
- Mantıksız soru sorma, kategoriye göre otomatik uyum sağla.

TOPLANACAK TEMEL BİLGİLER (HER KATEGORİDE USTA MANTIĞINA GÖRE):
1) İl / ilçe
2) Alan veya büyüklük (m2, metre, oda sayısı, basit tanım)
3) Çalışma şartları (erişim kolay mı, zemin durumu, engel var mı, eşyalı mı – sadece uygunsa)
4) Malzeme durumu (malzemeli mi sadece işçilik mi)
5) Ne zaman yapılacak? (acil / tarih)
6) Tahmini bütçe (bilmiyorsa "bilmiyorum" demesi yeterli)
7) Gerekliyse: Alet var mı? Ürün hazır mı? Ölçü alınabilir mi?

KATEGORİYE GÖRE AKILLI ADAPTASYON:
- Bahçe işleri: zemin düz mü, alet var mı, alan kaç m2.
- Boya: oda/alan, eşya durumu, malzeme, tarih.
- Tesisat/elektrik: arıza kısa tanımı, erişim, malzeme.
- Nakliye: nereden-nereye, kat/asansör, eşya listesi.
- Montaj: ürün hazır mı, montaj yeri, erişim.
- Küpeşte/demir: alan/ölçü, erişim, malzeme.
- Temizlik: m2, boş mu eşyalı mı, ne zaman.

HER MESAJ ŞABLONU:
1) Kullanıcının söylediğini TEK cümlede özetle.
2) Ardından 3–5 tane gerekli soruyu tek seferde sor.

BİTİŞ:
Tüm bilgiler alındığında sadece şu cümleyi yaz:
"İlan taslağınız hazır, onaylıyor musunuz?"
Başka hiçbir şey ekleme.`;

// System prompt'u environment variable'dan oku, yoksa default kullan
function getSystemPrompt(): string {
  // Önce environment variable'dan oku
  if (process.env.HIZMETGO_SYSTEM_PROMPT) {
    return process.env.HIZMETGO_SYSTEM_PROMPT;
  }
  
  // .env dosyasından manuel oku (Next.js bazen yüklemez)
  if (typeof window === "undefined") {
    try {
      const envPath = resolve(process.cwd(), ".env");
      const envContent = readFileSync(envPath, "utf8");
      const envLines = envContent.split("\n");
      for (const line of envLines) {
        if (line.startsWith("HIZMETGO_SYSTEM_PROMPT=")) {
          const value = line.replace("HIZMETGO_SYSTEM_PROMPT=", "").trim();
          if (value) {
            // Çok satırlı değerler için \n karakterlerini decode et
            return value.replace(/\\n/g, "\n");
          }
        }
      }
    } catch (e) {
      // .env okunamazsa sessizce devam et
    }
  }
  
  // Fallback: default prompt
  return DEFAULT_SYSTEM_PROMPT;
}

const HIZMETGO_SYSTEM_PROMPT = getSystemPrompt();

// .env dosyasını manuel yükle
if (typeof window === "undefined") {
  const envPath = resolve(process.cwd(), ".env");
  config({ path: envPath, override: true });

  try {
    const envContent = readFileSync(envPath, "utf8");
    const envLines = envContent.split("\n");
    for (const line of envLines) {
      if (line.startsWith("OPENAI_API_KEY=")) {
        const keyValue = line.replace("OPENAI_API_KEY=", "").trim();
        if (keyValue) {
          process.env.OPENAI_API_KEY = keyValue;
        }
      }
      // System prompt'u da yükle
      if (line.startsWith("HIZMETGO_SYSTEM_PROMPT=")) {
        const promptValue = line.replace("HIZMETGO_SYSTEM_PROMPT=", "").trim();
        if (promptValue && !process.env.HIZMETGO_SYSTEM_PROMPT) {
          process.env.HIZMETGO_SYSTEM_PROMPT = promptValue.replace(/\\n/g, "\n");
        }
      }
    }
  } catch (e) {
    // .env okunamazsa sessizce devam et
  }
}

// OpenAI client oluştur
function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY environment variable bulunamadı. Lütfen .env dosyasına ekleyin.",
    );
  }

  // BaseURL'i açıkça belirt - Groq'a gitmesini engelle
  return new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.openai.com/v1",
  });
}

async function aiChatHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      message,
      sessionId,
      action,
      initialCategory,
      conversationHistory = [],
    } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 401 });
    }

    // Session ID oluştur veya kullan
    const currentSessionId = sessionId || `${userId}-${Date.now()}`;

    // Session mesajlarını cache'den al veya oluştur
    let sessionMessages =
      memoryCache.get<Array<{ role: string; content: string }>>(
        `ai:session:${currentSessionId}`,
      ) || [];

    // Kullanıcı mesajını ekle
    const userMessage =
      action === "initial" && initialCategory
        ? `${initialCategory} hizmeti için bilgi topla. ${message}`
        : message;

    sessionMessages.push({ role: "user", content: userMessage });

    // Conversation history'yi formatla - frontend'den gelen history'yi kullan
    // Eğer frontend history göndermediyse, session'dan al (mevcut kullanıcı mesajı hariç)
    const formattedMessages =
      conversationHistory.length > 0
        ? conversationHistory.map((m: any) => ({
            role: m.role,
            content: m.content,
          }))
        : sessionMessages.slice(0, -1).map((m) => ({
            role: m.role,
            content: m.content,
          }));

    // İlk mesaj kontrolü: System prompt sadece ilk mesajda gönderilir
    // Bu sayede token tasarrufu yapılır ve sohbet bağlamı korunur
    const isFirstMessage = 
      conversationHistory.length === 0 && 
      sessionMessages.length === 1 && // Sadece şu anki user mesajı var
      action === "initial";

    // OpenAI çağrısı - System prompt SADECE ilk mesajda
    const openai = getOpenAIClient();
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];
    
    // System prompt sadece ilk mesajda ekle
    if (isFirstMessage) {
      messages.push({ role: "system", content: HIZMETGO_SYSTEM_PROMPT });
    }
    
    // Conversation history'yi ekle
    messages.push(...formattedMessages);
    
    // Son olarak kullanıcı mesajını ekle
    messages.push({ role: "user", content: userMessage });

    // Timeout kontrolü (10 saniye)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("AI_TIMEOUT")), 10000);
    });

    let completion;
    try {
      completion = (await Promise.race([
        openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: messages,
          temperature: 0.4,
          max_tokens: 700, // Token limiti - gereksiz tüketimi engelle
        }),
        timeoutPromise,
      ])) as any;
    } catch (timeoutError: any) {
      if (timeoutError.message === "AI_TIMEOUT") {
        logger.error("AI chat timeout", {
          userId,
          sessionId: currentSessionId,
        });
        const errorResponse = createErrorResponse(
          "INTERNAL_ERROR",
          "AI yanıt verme süresi aşıldı. Lütfen tekrar deneyin.",
        );
        return NextResponse.json(errorResponse, { status: 500 });
      }
      throw timeoutError;
    }

    const reply = completion.choices[0].message.content || "";

    // AI cevabını session'a ekle
    sessionMessages.push({ role: "assistant", content: reply });
    // Cache'e kaydet (TTL ile)
    memoryCache.set(
      `ai:session:${currentSessionId}`,
      sessionMessages,
      SESSION_TTL,
    );

    // İlan tamamlandı mı kontrolü
    const isComplete =
      reply.toLowerCase().includes("ilan") ||
      reply.toLowerCase().includes("hazır") ||
      reply.toLowerCase().includes("oluştur");

    const successResponse = createSuccessResponse({
      reply,
      sessionId: currentSessionId,
      isComplete,
      message: reply,
      content: reply,
      text: reply,
      aiResponse: reply,
    });

    return NextResponse.json(successResponse);
  } catch (err: any) {
    logger.error("AI Error", err);

    const errorResponse = createErrorResponse(
      getErrorCodeFromStatus(500),
      err.message || "AI yanıt veremedi",
    );

    return NextResponse.json(errorResponse, {
      status: getStatusFromErrorCode(getErrorCodeFromStatus(500)),
    });
  }
}

// Export with rate limiting (20 requests per 15 minutes for AI chat)

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export const POST = withRateLimit(aiChatHandler, {
  maxRequests: 20,
  windowMs: 15 * 60 * 1000,
  getIdentifier: async (req) => {
    try {
      const body = await req.clone().json();
      const userId = body.userId;
      if (userId) {
        return `user:${userId}`;
      }
    } catch {
      // Body parse hatası durumunda IP kullan
    }
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : req.headers.get("x-real-ip") || "unknown";
    return `ip:${ip}`;
  },
});
