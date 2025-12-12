import "server-only";

import OpenAI from "openai";

let openaiInstance: OpenAI | null = null;

function assertServerOnly() {
  // Next build sırasında bu dosya client tarafına çekilmesin diye sert guard
  if (typeof window !== "undefined") {
    throw new Error("openai.ts client bundle içinde kullanılamaz (server-only).");
  }
}

export function getOpenAIClient(): OpenAI {
  assertServerOnly();

  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY?.trim();

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY bulunamadı. .env / Vercel Env'e ekleyin.");
    }

    openaiInstance = new OpenAI({ apiKey });
  }

  return openaiInstance;
}

export default getOpenAIClient;

// Backward compatibility
export async function askOpenAI(
  prompt: string,
  messages: any[] = [],
  includeSystemPrompt: boolean = true,
) {
  assertServerOnly();

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY bulunamadı. .env / Vercel Env'e ekleyin.");
  }

  const messageArray: any[] = [];

  if (includeSystemPrompt && process.env.HIZMETGO_SYSTEM_PROMPT) {
    messageArray.push({ role: "system", content: process.env.HIZMETGO_SYSTEM_PROMPT });
  }

  messageArray.push(...messages);
  messageArray.push({ role: "user", content: prompt });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
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
        max_tokens: 700,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API hatası: ${errorText}`);
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "";
  } finally {
    clearTimeout(timeoutId);
  }
}
