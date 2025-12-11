"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Calendar,
  Mail,
  MessageSquare,
  Send,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";

interface Message {
  id: string;
  type: "USER" | "BOT" | "ADMIN";
  content: string;
  createdAt: string;
  userName?: string;
  adminName?: string;
}

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: string;
  priority: number;
  email: string;
  name?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  messages: Message[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function AdminTicketDetailPageClient({
  ticketId,
}: {
  ticketId: string;
}) {
  // router removed - not used
  const { success, error } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  const loadTicket = async () => {
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTicket(data.ticket);
      } else {
        error("Ticket yüklenemedi");
      }
    } catch (err) {
      console.error("Ticket load error:", err);
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim()) {
      error("Mesaj boş olamaz");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent }),
        credentials: "include",
      });

      if (res.ok) {
        success("Yanıt gönderildi");
        setReplyContent("");
        loadTicket();
      } else {
        const data = await res.json();
        error(data.error || "Yanıt gönderilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      });

      if (res.ok) {
        success("Durum güncellendi");
        loadTicket();
      } else {
        const data = await res.json();
        error(data.error || "Durum güncellenemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-700";
      case "ADMIN_OPEN":
        return "bg-orange-100 text-orange-700";
      case "ADMIN_REPLIED":
        return "bg-blue-100 text-blue-700";
      case "BOT_RESOLVED":
      case "RESOLVED":
        return "bg-green-100 text-green-700";
      case "CLOSED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return "bg-red-500";
    if (priority === 2) return "bg-orange-500";
    return "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Ticket bulunamadı</p>
        <Link href="/admin/tickets">
          <Button variant="outline">Geri Dön</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/tickets">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{ticket.subject}</h2>
            <p className="text-gray-600 mt-1">Ticket Detayı</p>
          </div>
        </div>
      </div>

      {/* Ticket Info */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Durum</p>
              <Badge className={getStatusColor(ticket.status)}>
                {ticket.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Öncelik</p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`}
                />
                <span className="text-sm">
                  {ticket.priority === 1
                    ? "Yüksek"
                    : ticket.priority === 2
                      ? "Orta"
                      : "Düşük"}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Kategori</p>
              <Badge variant="outline">{ticket.category}</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Kullanıcı</p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span>{ticket.name || ticket.user?.name || ticket.email}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">E-posta</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{ticket.email}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Oluşturulma</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  {new Date(ticket.createdAt).toLocaleString("tr-TR")}
                </span>
              </div>
            </div>
          </div>

          {/* Status Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Durum Değiştir</p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("ADMIN_OPEN")}
                disabled={ticket.status === "ADMIN_OPEN"}
              >
                Admin Açık
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("RESOLVED")}
                disabled={ticket.status === "RESOLVED"}
              >
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Çözüldü
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("CLOSED")}
                disabled={ticket.status === "CLOSED"}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Kapat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Mesajlar ({ticket.messages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {ticket.messages
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              )
              .map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.type === "ADMIN"
                      ? "bg-blue-50 border border-blue-200 ml-8"
                      : message.type === "BOT"
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-gray-50 border border-gray-200 mr-8"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {message.type === "ADMIN" ? (
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                      ) : message.type === "BOT" ? (
                        <MessageSquare className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <User className="w-4 h-4 text-gray-600" />
                      )}
                      <span className="font-semibold text-sm">
                        {message.type === "ADMIN"
                          ? message.adminName || "Admin"
                          : message.type === "BOT"
                            ? "Bot"
                            : message.userName || ticket.name || "Kullanıcı"}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        {message.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleString("tr-TR")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Reply Form */}
      {ticket.status !== "CLOSED" && (
        <Card>
          <CardHeader>
            <CardTitle>Yanıt Yaz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Yanıtınızı yazın..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={5}
              />
              <Button
                onClick={handleReply}
                disabled={sending || !replyContent.trim()}
                className="bg-brand-500 hover:bg-brand-600"
              >
                <Send className="w-4 h-4 mr-2" />
                {sending ? "Gönderiliyor..." : "Yanıt Gönder"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


