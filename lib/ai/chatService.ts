/**
 * Chat Service
 * Handles AI chat API calls separately from UI state
 * Prevents duplicate messages and re-triggering
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  message?: string;
  content?: string;
  text?: string;
  aiResponse?: string;
  sessionId: string;
  isComplete: boolean;
  error?: string;
  localMessage?: string;
  shouldSwitchToManual?: boolean;
}

/**
 * Send a message to the AI chat API
 * @param userMessage - The user's message
 * @param sessionId - Current session ID (optional)
 * @param conversationHistory - Previous messages for context (NOT including the current user message)
 * @param initialCategory - Initial category if this is the first message
 * @returns AI response
 */
export async function sendChatMessage(
  userMessage: string,
  sessionId: string | null,
  conversationHistory: ChatMessage[],
  userId: string,
  initialCategory?: string,
): Promise<ChatResponse> {
  const isFirstMessage = !sessionId && conversationHistory.length === 0;
  const action = isFirstMessage ? "initial" : "message";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 70000); // 70 seconds

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        message: userMessage,
        sessionId: sessionId || undefined,
        action,
        initialCategory: isFirstMessage ? initialCategory : undefined,
        conversationHistory: conversationHistory,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (response.status === 403) {
      return {
        reply: "",
        sessionId: sessionId || "",
        isComplete: false,
        error:
          data.message ||
          "Bu alan sohbet için değildir. 30 dakika sonra tekrar deneyin.",
      };
    }

    if (!response.ok) {
      throw new Error(
        data.message || data.error || "Bir hata oluştu. Lütfen tekrar deneyin.",
      );
    }

    // Extract AI response text from various possible fields
    const aiText =
      data.reply ??
      data.message ??
      data.content ??
      data.text ??
      data.aiResponse ??
      "";

    if (!aiText || aiText.trim().length === 0) {
      throw new Error("AI cevap veremedi. Lütfen tekrar deneyin.");
    }

    return {
      reply: aiText,
      message: data.message,
      content: data.content,
      text: data.text,
      aiResponse: data.aiResponse,
      sessionId: data.sessionId || sessionId || "",
      isComplete: data.isComplete || false,
      localMessage: data.localMessage,
      shouldSwitchToManual: data.shouldSwitchToManual,
    };
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("İstek zaman aşımına uğradı. Lütfen tekrar deneyin.");
    }

    throw error;
  }
}
