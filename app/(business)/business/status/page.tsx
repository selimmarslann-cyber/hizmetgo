"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Calendar, CheckCircle2, MessageSquare, Phone, TrendingUp, XCircle } from "lucide-react";



export default function BusinessStatusPage() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (!userRes.ok) {
        router.push("/auth/login");
        return;
      }
      const userData = await userRes.json();

      const businessRes = await fetch(
        `/api/businesses/owner/${userData.user.id}`,
        {
          credentials: "include",
        },
      );
      if (businessRes.ok) {
        const businessData = await businessRes.json();
        setBusiness(businessData);

        // Siparişleri yükle
        const ordersRes = await fetch(
          `/api/orders/business/${businessData.id}`,
          {
            credentials: "include",
          },
        );
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
          calculateStats(ordersData);
        }
      }
    } catch (err) {
      console.error("Veri yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const calculateStats = (ordersData: any[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = ordersData.filter((o) => {
      const orderDate = new Date(o.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });

    const thisWeekOrders = ordersData.filter((o) => {
      const orderDate = new Date(o.createdAt);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return orderDate >= weekAgo;
    });

    const thisWeekEarnings = thisWeekOrders
      .filter((o) => o.status === "COMPLETED")
      .reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0);

    const last30DaysCancellations = ordersData.filter((o) => {
      const orderDate = new Date(o.createdAt);
      const monthAgo = new Date(today);
      monthAgo.setDate(monthAgo.getDate() - 30);
      return (
        orderDate >= monthAgo &&
        (o.status === "CANCELLED_BY_PROVIDER" ||
          o.status === "CANCELLED_BY_CUSTOMER")
      );
    }).length;

    setStats({
      todayCount: todayOrders.length,
      thisWeekEarnings,
      last30DaysCancellations,
    });
  };

  const handleGoOnline = async () => {
    if (!business) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/businesses/${business.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onlineStatus: "ONLINE" }),
        credentials: "include",
      });

      if (res.ok) {
        setBusiness({ ...business, onlineStatus: "ONLINE" });
      } else {
        const data = await res.json();
        alert(data.error || "Durum güncellenemedi");
      }
    } catch (err) {
      alert("Bir hata oluştu");
    } finally {
      setUpdating(false);
    }
  };

  // Bugünkü işleri grupla
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = orders.filter((o) => {
    if (!o.scheduledAt) return false;
    const orderDate = new Date(o.scheduledAt);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>İşletme bulunamadı</div>
      </div>
    );
  }

  const isAutoOffline = business.onlineStatus === "AUTO_OFFLINE";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Durum & Takvim</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Auto Offline Uyarısı */}
        {isAutoOffline && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Son gelen işlere cevap vermediğiniz veya mesai saati dışında
              olduğunuz için hesabınız otomatik offline'a alınmıştır.
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={handleGoOnline}
                disabled={updating}
              >
                Tekrar Online Ol
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bugünkü İş Sayın
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.todayCount || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Bugün planlanan işler
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bu Hafta Kazancın
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.thisWeekEarnings?.toFixed(2) || "0.00"} ₺
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Son 7 gündeki tamamlanan işler
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Son 30 Günde İptal Sayın
              </CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.last30DaysCancellations || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {business.consecutiveCancellations || 0} üst üste iptal
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bugünkü İşler */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bugünkü İşler</CardTitle>
          </CardHeader>
          <CardContent>
            {todayOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Bugün planlanmış iş yok</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {order.scheduledAt
                            ? new Date(order.scheduledAt).toLocaleTimeString(
                                "tr-TR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "Saat belirtilmemiş"}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {order.customer?.name || "Müşteri"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {order.totalAmount} ₺
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.business?.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
