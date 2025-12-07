"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocalWarning, { INITIAL_WARNING } from "./LocalWarning";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/useToast";
import { sendChatMessage, type ChatMessage } from "@/lib/ai/chatService";

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initialCategory?: string;
}

export default function AIChatModal({
  isOpen,
  onClose,
  userId,
  initialCategory,
}: AIChatModalProps) {
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
  const [userName, setUserName] = useState<string | null>(null);
  const [createdListingId, setCreatedListingId] = useState<string | null>(null);
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

  // Fetch user name on mount
  useEffect(() => {
    if (isOpen && userId && !userName) {
      fetch("/api/auth/me", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.user?.name) {
            setUserName(data.user.name);
          }
        })
        .catch(console.error);
    }
  }, [isOpen, userId, userName]);

  // Show initial welcome message (one-time, no API call)
  useEffect(() => {
    if (
      isOpen &&
      initialCategory &&
      messages.length === 0 &&
      userName !== null
    ) {
      const userNameDisplay = userName || "Değerli";
      const welcomeMessage: ChatMessage = {
        role: "assistant",
        content: `Merhaba ${userNameDisplay} bey, platformumuza hoşgeldiniz! Yapay zeka asistanımız size yardımcı olacak. Unutmayınız ki bu bir sohbet aracı değildir, olabildiğince kısa ve anlaşılır şekilde ilerleyerek ilanınızı birlikte oluşturacağız. ${initialCategory} kategorisiyle ilgili ne tür bir hizmete ihtiyacınız var? Lütfen detaylarıyla belirtin.`,
      };

      setMessages([welcomeMessage]);
      const currentSessionId = `${userId}-${Date.now()}`;
      setSessionId(currentSessionId);
    }
  }, [isOpen, initialCategory, messages.length, userName, userId]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput("");
      setSessionId(null);
      setShowInitialWarning(true);
      setLocalWarning(null);
      setIsComplete(false);
      setIsManualMode(false);
      setUserName(null);
      setCreatedListingId(null);
      conversationHistoryRef.current = [];
      lastAssistantMessageRef.current = "";
    }
  }, [isOpen]);

  // Hide initial warning after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowInitialWarning(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ONLY handler that triggers API calls
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessageText = input.trim().toLowerCase();
    const originalInput = input.trim();
    setInput("");
    setLocalWarning(null);

    // Eğer isComplete true ise VE son AI mesajı "onaylıyor musunuz" içeriyorsa
    // ve kullanıcı "onaylıyorum", "evet", "tamam" gibi bir mesaj yazdıysa
    // conversation history'den ilan oluştur
    const lastAssistantMessage = messages
      .filter((m) => m.role === "assistant")
      .pop();
    const lastMessageContent =
      lastAssistantMessage?.content?.toLowerCase() || "";
    const isAskingForApproval =
      lastMessageContent.includes("onaylıyor musunuz") ||
      lastMessageContent.includes("onaylıyor musun") ||
      lastMessageContent.includes("ilan taslağınız hazır");

    const approvalKeywords = [
      "onaylıyorum",
      "evet",
      "tamam",
      "tamamdır",
      "ok",
      "okay",
      "yes",
      "onay",
    ];
    const trimmedMessage = userMessageText.trim().replace(/[.,!?]/g, ""); // Noktalama işaretlerini kaldır
    const isApprovalMessage = approvalKeywords.some(
      (keyword) => trimmedMessage === keyword,
    );
    const shouldCreateListing =
      isComplete && isAskingForApproval && isApprovalMessage;

    if (shouldCreateListing) {
      // Kullanıcı mesajını UI'da göster
      const userMessage: ChatMessage = {
        role: "user",
        content: originalInput,
      };
      setMessages((prev) => [...prev, userMessage]);

      setLoading(true);

      try {
        // Conversation history'yi birleştir (onay mesajı hariç)
        const fullConversation = conversationHistoryRef.current
          .map(
            (msg) =>
              `${msg.role === "user" ? "Kullanıcı" : "Asistan"}: ${msg.content}`,
          )
          .join("\n\n");

        console.log("📝 İlan oluşturma başlatılıyor...", {
          conversationLength: fullConversation.length,
        });

        // İlan metnini oluştur
        const generateResponse = await fetch("/api/generate-listing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            details: {
              conversation: fullConversation,
              category: initialCategory || "genel",
            },
          }),
        });

        if (!generateResponse.ok) {
          const errorData = await generateResponse
            .json()
            .catch(() => ({ error: "İlan metni oluşturulamadı" }));
          throw new Error(errorData.error || "İlan metni oluşturulamadı");
        }

        const generateData = await generateResponse.json();
        let listingDescription =
          generateData.listing || generateData.listingText || fullConversation;

        if (!listingDescription || listingDescription.trim().length < 10) {
          // Eğer AI'dan gelen metin çok kısa ise, conversation history'yi kullan
          const fallbackDescription =
            fullConversation.length >= 10
              ? fullConversation
              : `Hizmet talebi: ${initialCategory || "genel"} kategorisinde hizmet arıyorum. ${fullConversation.substring(0, 200)}`;

          if (fallbackDescription.length < 10) {
            throw new Error(
              "İlan metni oluşturulamadı. Lütfen daha detaylı bilgi verin.",
            );
          }

          console.warn("⚠️ AI metni çok kısa, fallback kullanılıyor");
          listingDescription = fallbackDescription;
        }

        console.log(
          "✅ İlan metni oluşturuldu, uzunluk:",
          listingDescription.length,
        );

        // İlanı oluştur
        const listingPayload = {
          description: listingDescription.trim(),
          title: listingDescription.substring(0, 50).trim(),
          raw_description: fullConversation,
          date: "esnek",
          priority: "normal" as const,
          price_range: "",
        };

        console.log("📤 İlan payload:", {
          descriptionLength: listingPayload.description.length,
          title: listingPayload.title,
          priority: listingPayload.priority,
        });

        const createResponse = await fetch("/api/listings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(listingPayload),
          credentials: "include",
        });

        if (!createResponse.ok) {
          const errorData = await createResponse
            .json()
            .catch(() => ({ error: "İlan oluşturulamadı" }));
          console.error("❌ İlan oluşturma hatası:", errorData);
          throw new Error(errorData.error || "İlan oluşturulamadı");
        }

        const createData = await createResponse.json();

        if (!createData.listing || !createData.listing.id) {
          console.error("❌ İlan ID bulunamadı:", createData);
          throw new Error("İlan oluşturuldu ancak ID alınamadı");
        }

        console.log(
          "✅ İlan başarıyla oluşturuldu, ID:",
          createData.listing.id,
        );

        // İlan ID'sini sakla (buton için)
        setCreatedListingId(createData.listing.id);

        // Başarı mesajı göster - buton ile
        setLocalWarning("İlanınız başarıyla oluşturuldu!");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "İlanınız başarıyla oluşturuldu! Düzenleme sayfasına gitmek için butona tıklayın.",
          },
        ]);
      } catch (err: any) {
        console.error("❌ Create listing error:", err);
        const errorMessage =
          err.message || "İlan oluşturulamadı. Lütfen tekrar deneyin.";
        showError(errorMessage);
        setLocalWarning(errorMessage);

        // Hata mesajını chat'e ekle
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Üzgünüm, bir hata oluştu: ${errorMessage}`,
          },
        ]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Normal mesaj gönderme akışı
    const userMessage: ChatMessage = {
      role: "user",
      content: originalInput,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add to conversation history (for backend context)
    conversationHistoryRef.current.push(userMessage);

    setLoading(true);

    try {
      // Send to API with conversation history (NOT including current user message in history)
      // The backend will add it itself
      const historyForBackend = conversationHistoryRef.current.slice(0, -1); // Exclude current message

      const response = await sendChatMessage(
        originalInput,
        sessionId,
        historyForBackend,
        userId,
        !sessionId ? initialCategory : undefined,
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
      let finalDescription =
        listingData.description || listingData.finalDescription || "";

      if (listingData.category && listingData.location) {
        try {
          const generateResponse = await fetch("/api/generate-listing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category: listingData.category || "genel",
              location: listingData.location || "belirtilmemiş",
              area: listingData.area || "belirtilmemiş",
              budget: listingData.budget || "belirtilmemiş",
              urgency: listingData.urgency || "esnek",
              details:
                listingData.details ||
                listingData.description ||
                "belirtilmemiş",
            }),
          });

          const generateData = await generateResponse.json();
          console.log("🧠 /api/generate-listing response", generateData);

          if (generateData.listing) {
            finalDescription = generateData.listing;
          } else if (generateData.listingText) {
            finalDescription = generateData.listingText;
          }
        } catch (generateError) {
          console.error("Generate listing error:", generateError);
        }
      }

      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: finalDescription,
          title: listingData.title || finalDescription.substring(0, 30),
          raw_description: listingData.rawDescription || "",
          city: listingData.city || "",
          district: listingData.district || "",
          address: listingData.address || "",
          date: listingData.date || "esnek",
          priority: listingData.priority || "normal",
          price_range: listingData.price_range || "",
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "İlan oluşturulamadı");
      }

      setLocalWarning(
        "İlanınız oluşturuldu! 5 saniye içinde detay sayfasına yönlendiriliyorsunuz...",
      );

      setTimeout(() => {
        router.push(`/listings/${data.listing.id}?edit=true&created=true`);
        onClose();
      }, 5000);
    } catch (err: any) {
      console.error("Create listing error:", err);
      showError(err.message || "İlan oluşturulamadı");
      setLocalWarning(
        "İlan oluşturulamadı. Manuel forma yönlendiriliyorsunuz...",
      );

      setTimeout(() => {
        router.push("/request");
        onClose();
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
              Hizmet Talebi Oluştur
            </h3>
            <p className="text-sm text-slate-600">
              AI asistanımız size yardımcı olacak
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
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
                    : "bg-slate-100 text-slate-900 rounded-bl-sm"
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
        <div className="p-4 md:p-6 border-t border-slate-200 bg-slate-50">
          {createdListingId ? (
            <div className="text-center space-y-3">
              <p className="text-sm text-slate-700 font-medium">
                İlanınız başarıyla oluşturuldu!
              </p>
              <Button
                onClick={() => {
                  router.push(
                    `/listings/${createdListingId}?edit=true&created=true`,
                  );
                  onClose();
                }}
                className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2"
              >
                Düzenleme Sayfasına Git
              </Button>
            </div>
          ) : localWarning?.includes("İlanınız başarıyla oluşturuldu") ? (
            <div className="text-center">
              <p className="text-sm text-slate-600">Yönlendiriliyorsunuz...</p>
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
    </div>
  );
}
