"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocalWarning, { INITIAL_WARNING } from "./LocalWarning";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/useToast";
import { sendChatMessage, type ChatMessage } from "@/lib/ai/chatService";

interface AIChatBoxProps {
  userId: string;
}

export default function AIChatBox({ userId }: AIChatBoxProps) {
  const router = useRouter();
  const { success, error: showError } = useToast();

  // UI Messages - only for display
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Separate conversation history - sent to backend, NOT bound to UI changes
  const conversationHistoryRef = useRef<ChatMessage[]>([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showInitialWarning, setShowInitialWarning] = useState(true);
  const [localWarning, setLocalWarning] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageRef = useRef<string>("");

  // Scroll to bottom ONLY when a new assistant message arrives
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  // Track assistant messages for scroll
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.role === "assistant" &&
      lastMessage.content !== lastAssistantMessageRef.current
    ) {
      lastAssistantMessageRef.current = lastMessage.content;
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  // Hide initial warning after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowInitialWarning(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Reset state when component unmounts
  useEffect(() => {
    return () => {
      setMessages([]);
      setInput("");
      setSessionId(null);
      conversationHistoryRef.current = [];
      lastAssistantMessageRef.current = "";
    };
  }, []);

  // ONLY handler that triggers API calls
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessageText = input.trim();
    setInput("");
    setLocalWarning(null);

    // Add user message to UI
    const userMessage: ChatMessage = {
      role: "user",
      content: userMessageText,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add to conversation history (for backend context)
    conversationHistoryRef.current.push(userMessage);

    setLoading(true);

    try {
      // Send to API with conversation history (NOT including current user message in history)
      const historyForBackend = conversationHistoryRef.current.slice(0, -1); // Exclude current message

      const response = await sendChatMessage(
        userMessageText,
        sessionId,
        historyForBackend,
        userId,
      );

      console.log("🧠 AI raw response", response);

      if (response.error) {
        setLocalWarning(response.error);
        setLoading(false);
        return;
      }

      if (response.localMessage) {
        setLocalWarning(response.localMessage);
        if (response.shouldSwitchToManual) {
          setIsManualMode(true);
        }
      }

      // Update session ID
      if (response.sessionId) {
        setSessionId(response.sessionId);
      }

      // Add assistant response to UI
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Add to conversation history
      conversationHistoryRef.current.push(assistantMessage);

      // Check if complete
      if (response.isComplete) {
        setIsComplete(true);
      }
    } catch (err: any) {
      console.error("AI chat error:", err);
      setLocalWarning("Bir hata oluştu. Lütfen tekrar deneyin.");
      showError(err.message || "Bir hata oluştu");

      // Remove user message on error
      setMessages((prev) => prev.slice(0, -1));
      conversationHistoryRef.current.pop();
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (listingData: any) => {
    try {
      const response = await fetch("/api/ai/create-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          listingData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "İlan oluşturulamadı");
      }

      setLocalWarning("İlanınız başarıyla oluşturuldu!");
      // TS2345 fix: ChatMessage type only allows "user" | "assistant", using "assistant" for system messages
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: "İlanınız başarıyla oluşturuldu!",
        },
      ]);

      success("İlan başarıyla oluşturuldu!");
      setIsComplete(false);
      setIsManualMode(false);
    } catch (err: any) {
      console.error("Create listing error:", err);
      showError(err.message || "İlan oluşturulamadı");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleConfirmRedirect = async () => {
    const message = input.trim().toLowerCase();
    if (message === "tamam" || message === "ok" || message === "tamamdır") {
      router.push("/jobs");
    } else if (message) {
      await handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-lg border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-900">
          Hizmet Talebi Oluştur
        </h3>
        <p className="text-sm text-slate-600">
          AI asistanımız size yardımcı olacak
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showInitialWarning && (
          <LocalWarning message={INITIAL_WARNING} type="info" />
        )}

        {localWarning && (
          <LocalWarning
            message={localWarning}
            type={
              isManualMode || localWarning.includes("sohbet")
                ? "error"
                : "warning"
            }
          />
        )}

        {/* WhatsApp-style message bubbles */}
        {messages.map((msg, index) => (
          <div
            key={`${msg.role}-${index}-${msg.content.substring(0, 10)}`}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === "user"
                  ? "bg-brand-500 text-white rounded-br-sm"
                  : // TS2367 fix: system role not in ChatMessage type, treating as assistant
                    "bg-slate-100 text-slate-900 rounded-bl-sm"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-2">
              <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        {localWarning?.includes("İlanınız başarıyla oluşturuldu") ? (
          <div className="space-y-2">
            <p className="text-sm text-slate-600">
              &quot;Tamam&quot; yazarak İlanlarım sayfasına gidebilirsiniz.
            </p>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleConfirmRedirect}
                placeholder="Tamam yazın..."
                className="flex-1"
              />
              <Button
                onClick={handleConfirmRedirect}
                disabled={loading || !input.trim()}
                className="bg-brand-500 hover:bg-brand-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isManualMode
                  ? "İlanınızı yazın..."
                  : isComplete
                    ? "Evet veya Hayır yazın..."
                    : "Mesajınızı yazın..."
              }
              disabled={loading || isManualMode}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim() || isManualMode}
              className="bg-brand-500 hover:bg-brand-600"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
