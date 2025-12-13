"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  MessageSquare,
  ShoppingCart,
  Store,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalBusinesses: number;
  totalOrders: number;
  openTickets: number;
  totalRevenue: number;
  monthlyRevenue: number;
  supportStats?: {
    totalTickets: number;
    resolvedTickets: number;
    ticketsLast24Hours: number;
    highPriorityTickets: number;
    avgResponseTimeMinutes: number;
    satisfactionRate: number;
  };
}

interface RecentTicket {
  id: string;
  subject: string;
  category: string;
  status: string;
  priority: number;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentTickets, setRecentTickets] = useState<RecentTicket[]>([]);

  useEffect(() => {
    loadStats();
    loadRecentTickets();
  }, []);

  const loadStats = async () => {
    try {
      const res = await fetch("/api/admin/dashboard/stats", {
        credentials: "include",
      });
      if (res.ok) {
        const response = await res.json();
        if (response.ok && response.data) {
          setStats(response.data);
        }
      }
    } catch (err) {
      console.error("Stats load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentTickets = async () => {
    try {
      const res = await fetch("/api/admin/tickets/recent", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setRecentTickets(data.tickets || []);
      }
    } catch (err) {
      console.error("Recent tickets load error:", err);
    }
  };

  const statCards = [
    {
      title: "Toplam Kullanıcı",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Toplam İşletme",
      value: stats?.totalBusinesses || 0,
      icon: Store,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Toplam Sipariş",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Açık Destek Talepleri",
      value: stats?.openTickets || 0,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Toplam Gelir",
      value: `${stats?.totalRevenue?.toFixed(2) || "0.00"} ₺`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Bu Ay Gelir",
      value: `${stats?.monthlyRevenue?.toFixed(2) || "0.00"} ₺`,
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

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
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Sistem özeti ve istatistikler</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Support Center Stats */}
      {stats?.supportStats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-2 border-brand-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-600" />
                Destek Merkezi İstatistikleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Toplam Ticket</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.supportStats.totalTickets}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Çözülen</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.supportStats.resolvedTickets}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Son 24 Saat</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.supportStats.ticketsLast24Hours}
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Yüksek Öncelik</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.supportStats.highPriorityTickets}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ortalama Yanıt Süresi</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stats.supportStats.avgResponseTimeMinutes} dakika
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Memnuniyet Oranı</p>
                    <p className="text-lg font-semibold text-gray-900">
                      %{stats.supportStats.satisfactionRate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admin/tickets">
                  <Button className="w-full" variant="outline">
                    Tüm Ticket'ları Görüntüle
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Open Tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Açık Ticket'lar
                <Badge variant="outline" className="ml-auto">
                  {stats.openTickets}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.openTickets > 0 ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {stats.openTickets} açık ticket var
                        </p>
                        <p className="text-sm text-gray-600">
                          {stats.supportStats.highPriorityTickets > 0 && (
                            <span className="text-red-600 font-medium">
                              {stats.supportStats.highPriorityTickets} yüksek öncelikli
                            </span>
                          )}
                        </p>
                      </div>
                      <Link href="/admin/tickets">
                        <Button size="sm" variant="outline">
                          Görüntüle
                        </Button>
                      </Link>
                    </div>
                    <Link href="/admin/tickets">
                      <Button className="w-full" variant="outline">
                        Tüm Açık Ticket'ları Görüntüle
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Tüm ticket'lar çözüldü!</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Şu anda açık ticket bulunmuyor.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Open Tickets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Son Açık Ticket'lar</CardTitle>
            <Link href="/admin/tickets">
              <Button variant="outline" size="sm">
                Tümünü Gör
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentTickets.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Açık ticket bulunmuyor</p>
              <p className="text-sm text-gray-500 mt-1">
                Tüm destek talepleri çözülmüş görünüyor.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTickets.map((ticket) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case "OPEN":
                      return "bg-red-100 text-red-700";
                    case "ADMIN_OPEN":
                      return "bg-orange-100 text-orange-700";
                    case "ADMIN_REPLIED":
                      return "bg-blue-100 text-blue-700";
                    default:
                      return "bg-gray-100 text-gray-700";
                  }
                };

                const getPriorityColor = (priority: number) => {
                  if (priority === 1) return "bg-red-500";
                  if (priority === 2) return "bg-orange-500";
                  return "bg-gray-500";
                };

                return (
                  <Link
                    key={ticket.id}
                    href={`/admin/tickets/${ticket.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {ticket.subject}
                          </h3>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`}
                            />
                            <span className="text-xs text-gray-500">
                              {ticket.priority === 1
                                ? "Yüksek"
                                : ticket.priority === 2
                                  ? "Orta"
                                  : "Düşük"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            {ticket.user?.name || ticket.user?.email || "Misafir"}
                          </span>
                          <span>•</span>
                          <span>{ticket.category}</span>
                          <span>•</span>
                          <span>
                            {new Date(ticket.createdAt).toLocaleDateString("tr-TR", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
