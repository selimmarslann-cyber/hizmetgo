"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, User } from "lucide-react";

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
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await fetch("/api/admin/tickets", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
      }
    } catch (err) {
      console.error("Tickets load error:", err);
    } finally {
      setLoading(false);
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
    if (priority === 1) {
      return "bg-red-500";
    }
    if (priority === 2) {
      return "bg-orange-500";
    }
    return "bg-gray-500";
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Destek Talepleri</h2>
        <p className="text-gray-600 mt-1">
          Tüm destek taleplerini görüntüleyin ve yönetin
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Ticket ara (konu, e-posta)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ticket Listesi ({filteredTickets.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Açık: {tickets.filter((t) => ["OPEN", "ADMIN_OPEN", "ADMIN_REPLIED"].includes(t.status)).length}
              </Badge>
              <Badge variant="outline">
                Yüksek Öncelik: {tickets.filter((t) => t.priority <= 2 && ["OPEN", "ADMIN_OPEN", "ADMIN_REPLIED"].includes(t.status)).length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-2">Ticket bulunamadı</p>
              <p className="text-sm text-gray-500">
                {searchQuery ? "Arama kriterlerinize uygun ticket bulunamadı." : "Henüz hiç ticket oluşturulmamış."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Konu
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Kullanıcı
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Durum
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Öncelik
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Tarih
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-sm text-gray-500">
                        {ticket.id.substring(0, 8)}...
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{ticket.subject}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{ticket.name || ticket.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {ticket.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(ticket.status)} text-xs`}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`}
                          />
                          <span className="text-sm text-gray-600">
                            {ticket.priority === 1
                              ? "Yüksek"
                              : ticket.priority === 2
                                ? "Orta"
                                : "Düşük"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {new Date(ticket.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/admin/tickets/${ticket.id}`}>
                          <Button variant="outline" size="sm" className="text-xs">
                            Görüntüle
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
