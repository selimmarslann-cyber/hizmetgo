"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Minimize2,
  Maximize2,
  Send,
  Loader2,
  Bot,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";

interface Message {
  id: string;
  type: "user" | "bot" | "admin";
  content: string;
  timestamp: Date;
  isRead?: boolean;
}

interface SupportChatWidgetProps {
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

export default function SupportChatWidget({
  onClose,
  onMinimize,
  isMinimized,
}: SupportChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { error } = useToast();
  const [mounted, setMounted] = useState(false);
  const [MotionDiv, setMotionDiv] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Dynamically import framer-motion only on client
    import("framer-motion").then((mod) => {
      setMotionDiv(mod.motion.div);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: `bot-${Date.now()}`,
      type: "bot",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const loadOrCreateTicket = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/support/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "get_or_create" }),
      });

      if (!res.ok) {
        throw new Error("support ticket request failed");
      }

      const data = await res.json();
      setTicketId(data.ticketId);

      if (data.messages && data.messages.length > 0) {
        setMessages(
          data.messages.map((msg: any) => ({
            id: msg.id,
            type:
              msg.type === "USER"
                ? "user"
                : msg.type === "BOT"
                  ? "bot"
                  : "admin",
            content: msg.content,
            timestamp: new Date(msg.createdAt),
            isRead: msg.isRead,
          })),
        );
      } else {
        addBotMessage(
          "Merhaba! 👋 Hizmetgo Destek Botuna hoş geldiniz. Size nasıl yardımcı olabilirim?",
        );
      }
    } catch (err) {
      error("Destek sistemine bağlanılamadı. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  }, [addBotMessage, error]);

  const loadMessages = useCallback(async () => {
    if (!ticketId) return;

    try {
      const res = await fetch(`/api/support/messages?ticketId=${ticketId}`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      setMessages(
        data.messages.map((msg: any) => ({
          id: msg.id,
          type:
            msg.type === "USER"
              ? "user"
              : msg.type === "BOT"
                ? "bot"
                : "admin",
          content: msg.content,
          timestamp: new Date(msg.createdAt),
          isRead: msg.isRead,
        })),
      );
    } catch {
      // sessiz
    }
  }, [ticketId]);

  // ✅ Ticket'ı yükle veya yeni oluştur (TS-safe: her path return eder)
  useEffect(() => {
    // TS "Not all code paths return a value" fix: her durumda return
    if (isLoading) {
      return;
    }

    // Ticket yoksa oluştur/yükle
    if (!ticketId) {
      loadOrCreateTicket();
      return;
    }

    // Ticket varsa mesajları yükle + polling
    loadMessages();
    const interval = setInterval(loadMessages, 5000);

    return () => clearInterval(interval);
  }, [ticketId, isLoading, loadOrCreateTicket, loadMessages]);

  const handleSend = async () => {
    if (!input.trim() || !ticketId || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageContent = input.trim();
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/support/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ticketId,
          content: messageContent,
        }),
      });

      if (!res.ok) {
        error("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
        return;
      }

      const data = await res.json();

      if (data.botResponse) {
        setTimeout(() => {
          addBotMessage(data.botResponse.content);

          if (data.botResponse.escalated) {
            setTimeout(() => {
              addBotMessage(
                "🤝 Sorunuzu daha detaylı incelemek için destek ekibimize yönlendirdim. En kısa sürede size dönüş yapılacaktır.",
              );
            }, 500);
          }
        }, 1000);
      }
    } catch {
      error("Bir hata oluştu. Lütfen tekrar deneyin.");
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
    } finally {
      setIsTyping(false);
    }
  };

  if (isMinimized) {
    return (
      <div className="bg-[#FF6000] text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            <span className="font-semibold text-sm">Canlı Destek</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={onMinimize}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Büyüt"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs opacity-90">Yeni mesajınız var</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#FF6000] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Canlı Destek</h3>
            <p className="text-xs opacity-90">Hizmetgo Destek Botu</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={onMinimize}
            className="p-1.5 hover:bg-white/20 rounded transition-colors"
            aria-label="Küçült"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-[#FF6000]" />
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const messageContent = (
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-[#FF6000] text-white"
                      : message.type === "bot"
                        ? "bg-white border border-gray-200 text-gray-900"
                        : "bg-blue-50 border border-blue-200 text-gray-900"
                  }`}
                >
                  {message.type !== "user" && (
                    <div className="flex items-center gap-1 mb-1">
                      {message.type === "bot" ? (
                        <Bot className="w-3 h-3 text-[#FF6000]" />
                      ) : (
                        <User className="w-3 h-3 text-blue-600" />
                      )}
                      <span className="text-xs font-semibold">
                        {message.type === "bot"
                          ? "Hizmetgo Bot"
                          : "Destek Ekibi"}
                      </span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );

              if (!mounted || !MotionDiv) {
                return (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {messageContent}
                  </div>
                );
              }

              return (
                <MotionDiv
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  suppressHydrationWarning
                >
                  {messageContent}
                </MotionDiv>
              );
            })}

            {isTyping && (
              mounted && MotionDiv ? (
                <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
                  suppressHydrationWarning
              >
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <Bot className="w-3 h-3 text-[#FF6000]" />
                    <span className="text-xs font-semibold">Hizmetgo Bot</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </MotionDiv>
              ) : (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-1">
                      <Bot className="w-3 h-3 text-[#FF6000]" />
                      <span className="text-xs font-semibold">Hizmetgo Bot</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Mesajınızı yazın..."
            disabled={isTyping || isLoading || !ticketId}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping || isLoading || !ticketId}
            className="bg-[#FF6000] hover:bg-[#FF7000]"
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Bot sorununuzu çözemezse otomatik olarak destek ekibimize
          yönlendirileceksiniz.
        </p>
      </div>
    </div>
  );
}
