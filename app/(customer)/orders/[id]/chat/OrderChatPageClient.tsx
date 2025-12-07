"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, User, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import { useRealtimeChat } from "@/lib/hooks/useRealtimeChat";
import FilePreview from "@/components/chat/FilePreview";
import FileCountBadge from "@/components/chat/FileCountBadge";
import FileUploadButton from "@/components/chat/FileUploadButton";


// Static generation'ı engelle
interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
  receiver: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
  fileUrl?: string | null;
  fileType?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  isRead?: boolean;
}

export default function OrderChatPageClient() {
  const params = useParams();
  const router = useRouter();
  const { error, success } = useToast();
  const orderId = params.id as string;
  const [order, setOrder] = useState<{
    id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{
    url: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await fetch("/api/auth/me", { credentials: "include" });
        if (userRes.ok) {
          const userData = await userRes.json();
          setCurrentUserId(userData.user?.id || null);
        }
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    fetchUser();
  }, []);

  // Load order details
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        }
      } catch (err) {
        console.error("Order load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [orderId]);

  // Real-time chat hook
  const {
    messages,
    isConnected,
    isTyping,
    typingUser,
    loadMessages,
    sendTyping,
  } = useRealtimeChat({
    orderId,
    userId: currentUserId,
    enabled: !!currentUserId && !!orderId,
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle typing indicator
  useEffect(() => {
    if (!messageContent.trim()) return;

    const timeoutId = setTimeout(() => {
      sendTyping();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [messageContent, sendTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if ((!messageContent.trim() && !attachedFile) || sending) {
      return;
    }

    const content = messageContent.trim();
    const file = attachedFile;
    setMessageContent("");
    setAttachedFile(null);
    setSending(true);

    try {
      const res = await fetch(`/api/orders/${orderId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content || undefined,
          fileUrl: file?.url,
          fileType: file?.fileType,
          fileName: file?.fileName,
          fileSize: file?.fileSize,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Mesaj gönderilemedi");
      }

      // Message will appear via real-time subscription
      // No need to manually add it or reload
    } catch (err: any) {
      console.error("Mesaj gönderilemedi:", err);
      error(err.message || "Mesaj gönderilemedi");
      // Restore message content on error
      setMessageContent(content);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6000]"></div>
          <p className="mt-4 text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const otherUser =
    messages.length > 0
      ? messages[0].senderId === currentUserId
        ? messages[0].receiver
        : messages[0].sender
      : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {otherUser?.avatarUrl ? (
                <img
                  src={otherUser.avatarUrl}
                  alt={otherUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {otherUser?.name || "Kullanıcı"}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">
                  Sipariş: #{orderId.slice(0, 8)}
                </p>
                {/* Connection Status */}
                {isConnected ? (
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Çevrimiçi</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <WifiOff className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Bağlantı kesildi
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* System Message: Order Created */}
          {order && (
            <div className="flex items-center justify-center my-4">
              <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <p className="text-xs text-blue-700 font-medium">
                  Sipariş oluşturuldu •{" "}
                  {new Date(order.createdAt).toLocaleString("tr-TR", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )}

          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-base font-medium">Henüz mesaj yok</p>
              <p className="text-sm mt-2 text-gray-400">
                İlk mesajı siz gönderin!
              </p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isMyMessage = message.senderId === currentUserId;
              const prevMessage = index > 0 ? messages[index - 1] : null;
              const showDateSeparator =
                !prevMessage ||
                new Date(message.createdAt).toDateString() !==
                  new Date(prevMessage.createdAt).toDateString();

              const messageDate = new Date(message.createdAt);
              const isToday =
                messageDate.toDateString() === new Date().toDateString();

              return (
                <div key={message.id}>
                  {/* Date Separator */}
                  {showDateSeparator && (
                    <div className="flex items-center justify-center my-4">
                      <div className="flex items-center gap-2">
                        <div className="h-px bg-gray-200 flex-1 w-16"></div>
                        <span className="text-xs text-gray-500 font-medium">
                          {isToday
                            ? "Bugün"
                            : messageDate.toLocaleDateString("tr-TR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                        </span>
                        <div className="h-px bg-gray-200 flex-1 w-16"></div>
                      </div>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`flex items-end gap-2 ${isMyMessage ? "justify-end" : "justify-start"}`}
                  >
                    {!isMyMessage && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        {message.sender?.avatarUrl ? (
                          <img
                            src={message.sender.avatarUrl}
                            alt={message.sender.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    )}

                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${
                        isMyMessage
                          ? "bg-[#FF6000] text-white rounded-br-md"
                          : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                      }`}
                    >
                      {!isMyMessage && message.sender && (
                        <p className="text-xs font-semibold mb-1 opacity-90">
                          {message.sender.name}
                        </p>
                      )}
                      <p
                        className={`text-sm whitespace-pre-wrap break-words leading-relaxed ${
                          isMyMessage ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {message.content}
                      </p>
                      {message.fileUrl && (
                        <div className="mt-2">
                          <FilePreview
                            url={message.fileUrl}
                            fileName={message.fileName || "Dosya"}
                            fileType={
                              message.fileType || "application/octet-stream"
                            }
                            fileSize={message.fileSize ?? undefined}
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1.5">
                        <p
                          className={`text-xs ${
                            isMyMessage ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          {messageDate.toLocaleTimeString("tr-TR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {isMyMessage && message.isRead && (
                          <span className="text-xs text-white/70">✓✓</span>
                        )}
                      </div>
                    </div>

                    {isMyMessage && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* Typing Indicator */}
          {isTyping && typingUser && typingUser !== currentUserId && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        {attachedFile && (
          <div className="mb-2">
            <FilePreview
              url={attachedFile.url}
              fileName={attachedFile.fileName}
              fileType={attachedFile.fileType}
              fileSize={attachedFile.fileSize}
            />
            <button
              type="button"
              onClick={() => setAttachedFile(null)}
              className="text-xs text-red-500 hover:text-red-700 mt-1"
            >
              Kaldır
            </button>
          </div>
        )}
        <FileCountBadge orderId={orderId} maxFiles={5} messages={messages} />
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-2">
          <FileUploadButton
            orderId={orderId}
            onFileSelect={setAttachedFile}
            disabled={sending || !isConnected}
          />
          <Input
            ref={inputRef}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1"
            maxLength={1000}
            disabled={sending || !isConnected}
          />
          <Button
            type="submit"
            disabled={
              (!messageContent.trim() && !attachedFile) ||
              sending ||
              !isConnected
            }
            className="bg-[#FF6000] hover:bg-[#FF5500] text-white disabled:opacity-50"
          >
            {sending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
        {!isConnected && (
          <p className="text-xs text-red-500 mt-2 text-center">
            Bağlantı kesildi. Mesaj gönderilemiyor.
          </p>
        )}
      </div>
    </div>
  );
}
