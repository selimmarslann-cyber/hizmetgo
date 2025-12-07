"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, MessageSquare, Search, User } from "lucide-react";


export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
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
    if (priority === 1) return "bg-red-500";
    if (priority === 2) return "bg-orange-500";
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
        <div className="w-8 h-8 border-4 border-[#FF6000] border-t-transparent rounded-full animate-spin"></div>
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
          <CardTitle>Ticket Listesi ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
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
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-mono text-sm">
                      {ticket.id.substring(0, 8)}...
                    </td>
                    <td className="py-3 px-4">{ticket.subject}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{ticket.name || ticket.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{ticket.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
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
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(ticket.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/admin/tickets/${ticket.id}`}>
                        <Button variant="outline" size="sm">
                          Görüntüle
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
