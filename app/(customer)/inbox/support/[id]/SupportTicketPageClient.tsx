"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/lib/hooks/useToast";
import { ArrowLeft, Bot, Loader2, Send, Shield } from "lucide-react";


// Static generation'ı engelle
interface Message {
  id: string;
  type: "USER" | "BOT" | "ADMIN";
  content: string;
  createdAt: string;
  isRead: boolean;
  userName?: string;
}

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: string;
  createdAt: string;
  messages: Message[];
}

export default function SupportTicketPageClient() {
  const params = useParams();
  const router = useRouter();
  const { success, error } = useToast();
  const ticketId = params.id as string;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadTicket = useCallback(async () => {
    try {
      const res = await fetch(`/api/support/tickets/${ticketId}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTicket(data.ticket);
      } else {
        error("Talep yüklenemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [ticketId, error]);

  useEffect(() => {
    loadTicket();
    // Her 5 saniyede bir yeni mesajları kontrol et
    const interval = setInterval(loadTicket, 5000);
    return () => clearInterval(interval);
  }, [loadTicket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  const handleSendMessage = async () => {
    if (!messageContent.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/support/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ticketId,
          content: messageContent.trim(),
        }),
      });

      if (res.ok) {
        setMessageContent("");
        await loadTicket(); // Mesajları yeniden yükle
        success("Mesajınız gönderildi");
      } else {
        const data = await res.json();
        throw new Error(data.error || "Mesaj gönderilemedi");
      }
    } catch (err: any) {
      error(err.message || "Mesaj gönderilemedi");
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      OPEN: { label: "Açık", color: "bg-blue-100 text-blue-700" },
      ADMIN_OPEN: {
        label: "Admin İnceliyor",
        color: "bg-orange-100 text-orange-700",
      },
      ADMIN_REPLIED: {
        label: "Cevaplandı",
        color: "bg-green-100 text-green-700",
      },
      BOT_RESOLVED: { label: "Çözüldü", color: "bg-gray-100 text-gray-700" },
      RESOLVED: { label: "Çözüldü", color: "bg-green-100 text-green-700" },
      CLOSED: { label: "Kapatıldı", color: "bg-gray-100 text-gray-700" },
    };
    const statusInfo = statusMap[status] || {
      label: status,
      color: "bg-gray-100 text-gray-700",
    };
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      ORDER: "Sipariş Sorunu",
      TECHNICAL: "Hizmet Sorunu",
      PAYMENT: "Ödeme Sorunu",
      ACCOUNT: "Hesap Sorunu",
      BUSINESS: "Esnaf Kaydı",
      GENERAL: "Genel Soru",
      OTHER: "Diğer",
    };
    return categoryMap[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF6000] mx-auto" />
          <p className="mt-4 text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center">
          <p className="text-gray-600">Talep bulunamadı</p>
          <Button onClick={() => router.push("/inbox")} className="mt-4">
            Gelen Kutusuna Dön
          </Button>
        </Card>
      </div>
    );
  }

  const isClosed = ticket.status === "CLOSED" || ticket.status === "RESOLVED";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/inbox")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Gelen Kutusuna Dön
          </Button>
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {ticket.subject}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  {getStatusBadge(ticket.status)}
                  <Badge variant="outline">
                    {getCategoryLabel(ticket.category)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Messages */}
        <Card className="p-6 mb-6">
          <div className="space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto mb-6">
            {ticket.messages.map((message) => {
              const isUser = message.type === "USER";
              const isBot = message.type === "BOT";
              const isAdmin = message.type === "ADMIN";

              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      isUser
                        ? "bg-[#FF6000] text-white"
                        : isBot
                          ? "bg-gray-100 text-gray-900"
                          : "bg-blue-50 border border-blue-200 text-gray-900"
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center gap-2 mb-2">
                        {isBot ? (
                          <Bot className="w-4 h-4 text-[#FF6000]" />
                        ) : (
                          <Shield className="w-4 h-4 text-blue-600" />
                        )}
                        <span className="text-xs font-semibold">
                          {isBot ? "Hizmetgo Bot" : "Destek Ekibi"}
                        </span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-2">
                      {new Date(message.createdAt).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!isClosed && (
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  disabled={sending}
                  className="min-h-[100px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageContent.trim() || sending}
                  className="bg-[#FF6000] hover:bg-[#E65500]"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Mesaj göndermek için Ctrl+Enter veya Cmd+Enter tuşlarını
                kullanabilirsiniz
              </p>
            </div>
          )}
          {isClosed && (
            <div className="border-t pt-4 text-center text-gray-500">
              <p>
                Bu talep kapatılmıştır. Yeni bir talep oluşturmak için destek
                formunu kullanabilirsiniz.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
