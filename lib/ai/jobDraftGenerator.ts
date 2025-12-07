/**
 * Job Draft Generator
 *
 * AI sohbetinden ilan taslağı oluşturur
 * HIZMETGO_SYSTEM_PROMPT kullanarak toplanan bilgilerden structured data üretir
 */

import { ChatMessage } from "./chatService";
import { askOpenAI } from "./openai";
import { HIZMETGO_SYSTEM_PROMPT } from "./systemPrompt";
import { logger } from "@/lib/utils/logger";

export interface JobDraft {
  title: string;
  description: string;
  mainCategoryId?: string;
  subServiceId?: string;
  city?: string;
  district?: string;
  locationLat?: number;
  locationLng?: number;
  scheduledAt?: string;
  estimatedBudget?: number;
  requiresSkills?: boolean;
}

/**
 * AI sohbetinden ilan taslağı oluştur
 *
 * @param messages - Sohbet mesajları (user + assistant)
 * @returns İlan taslağı
 */
export async function generateJobDraftFromConversation(
  messages: ChatMessage[],
): Promise<JobDraft> {
  if (!messages || messages.length === 0) {
    throw new Error("Sohbet mesajları boş olamaz");
  }

  // Sohbet geçmişini formatla
  const conversationText = messages
    .map(
      (msg) =>
        `${msg.role === "user" ? "Kullanıcı" : "Asistan"}: ${msg.content}`,
    )
    .join("\n");

  // AI'dan structured data çıkar
  const extractionPrompt = `Aşağıdaki sohbet geçmişinden ilan taslağı oluştur.

Sohbet:
${conversationText}

Lütfen aşağıdaki JSON formatında yanıt ver:
{
  "title": "Kısa başlık (max 50 karakter)",
  "description": "Detaylı açıklama",
  "city": "Şehir adı (varsa)",
  "district": "İlçe adı (varsa)",
  "scheduledAt": "ISO tarih formatı veya null",
  "estimatedBudget": "Sayısal değer veya null",
  "mainCategoryId": "Kategori ID (varsa)",
  "subServiceId": "Alt hizmet ID (varsa)"
}

ÖNEMLİ:
- Sadece JSON döndür, başka açıklama yapma
- Eksik bilgiler için null kullan
- Tarih formatı: ISO 8601 (örn: "2025-12-15T18:00:00Z")
- Bütçe sadece sayısal değer (TL cinsinden)`;

  try {
    const response = await askOpenAI(extractionPrompt, [], false);

    // JSON parse et
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI yanıtı JSON formatında değil");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // JobDraft oluştur
    const draft: JobDraft = {
      title: parsed.title || "İş Talebi",
      description: parsed.description || conversationText,
      city: parsed.city || undefined,
      district: parsed.district || undefined,
      scheduledAt: parsed.scheduledAt || undefined,
      estimatedBudget: parsed.estimatedBudget
        ? Number(parsed.estimatedBudget)
        : undefined,
      mainCategoryId: parsed.mainCategoryId || undefined,
      subServiceId: parsed.subServiceId || undefined,
      requiresSkills: false, // Default
    };

    logger.info("Job draft generated from conversation", {
      title: draft.title,
      hasCategory: !!draft.mainCategoryId,
    });

    return draft;
  } catch (error: any) {
    logger.error("Job draft generation error", error);

    // Fallback: Basit draft oluştur
    const lastUserMessage =
      messages.filter((m) => m.role === "user").pop()?.content || "İş talebi";

    return {
      title: lastUserMessage.substring(0, 50),
      description: lastUserMessage,
      requiresSkills: false,
    };
  }
}
