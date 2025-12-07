"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Package, Power, ShoppingBag, Star } from "lucide-react";



// Static generation'ı engelle
export default function BusinessDashboardPageClient() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async (businessId: string) => {
    try {
      const res = await fetch(`/api/orders/business/${businessId}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Siparişler yüklenemedi:", err);
    }
  }, []);

  const loadBusiness = useCallback(
    async (userId: string) => {
      try {
        const res = await fetch(`/api/businesses/owner/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setBusiness(data);
          if (data) {
            loadOrders(data.id);
          }
        }
      } catch (err) {
        console.error("İşletme yüklenemedi:", err);
      } finally {
        setLoading(false);
      }
    },
    [loadOrders],
  );

  const loadUserAndBusiness = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        router.push("/auth/login");
        return;
      }
      const data = await res.json();
      setUser(data.user);
      loadBusiness(data.user.id);
    } catch (err) {
      router.push("/auth/login");
    }
  }, [router, loadBusiness]);

  useEffect(() => {
    loadUserAndBusiness();
  }, [loadUserAndBusiness]);

  const toggleOnlineStatus = async () => {
    if (!business) return;

    try {
      const res = await fetch(`/api/businesses/${business.id}/online-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          onlineStatus:
            business.onlineStatus === "ONLINE" ? "OFFLINE" : "ONLINE",
        }),
        credentials: "include",
      });

      if (res.ok) {
        const updated = await res.json();
        setBusiness(updated);
      }
    } catch (err) {
      alert("Durum güncellenemedi");
    }
  };

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
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">Henüz işletme kaydınız yok</p>
            <Button onClick={() => router.push("/business/register")}>
              İşletme Kaydet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isBanned =
    business.bannedUntil && new Date(business.bannedUntil) > new Date();
  const pendingOrders = orders.filter(
    (o) => o.status === "PENDING_CONFIRMATION",
  );
  const activeOrders = orders.filter((o) =>
    ["ACCEPTED", "IN_PROGRESS"].includes(o.status),
  );
  const completedOrders = orders.filter((o) => o.status === "COMPLETED");

  // Online durumu badge rengi
  const getStatusBadgeVariant = () => {
    if (business.onlineStatus === "ONLINE") return "success";
    if (business.onlineStatus === "AUTO_OFFLINE") return "secondary";
    return "secondary";
  };

  const getStatusText = () => {
    if (business.onlineStatus === "ONLINE") return "Online";
    if (business.onlineStatus === "AUTO_OFFLINE") return "Otomatik Offline";
    return "Offline";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Esnaf Paneli</h1>
          <Button variant="outline" onClick={() => router.push("/map")}>
            Ana Sayfa
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Ban Uyarısı */}
        {isBanned && (
          <Card className="mb-6 border-yellow-500 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900">
                    Hesabınız Geçici Olarak Durduruldu
                  </p>
                  <p className="text-sm text-yellow-800 mt-1">
                    Hesabınız{" "}
                    {new Date(business.bannedUntil).toLocaleDateString(
                      "tr-TR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}{" "}
                    tarihine kadar sistem tarafından geçici olarak
                    durdurulmuştur. Üst üste 3 iptal sebebiyle 7 günlük ban
                    uygulanmıştır.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Durum Kartı */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{business.name}</CardTitle>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={getStatusBadgeVariant()}
                    className="text-base px-3 py-1"
                  >
                    {getStatusText()}
                  </Badge>
                  {isBanned && (
                    <Badge variant="destructive">
                      Banlı (
                      {new Date(business.bannedUntil).toLocaleDateString(
                        "tr-TR",
                      )}
                      )
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                onClick={toggleOnlineStatus}
                disabled={isBanned}
                variant={
                  business.onlineStatus === "ONLINE" ? "destructive" : "default"
                }
                size="lg"
              >
                <Power className="w-4 h-4 mr-2" />
                {business.onlineStatus === "ONLINE"
                  ? "Offline Yap"
                  : "Online Yap"}
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {business.onlineStatus === "ONLINE"
                ? "Online iken yeni sipariş isteği alırsınız. Offline iken yeni iş gelmez."
                : "Offline durumdasınız. Online yapmak için yukarıdaki butona tıklayın."}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Ortalama Puan</p>
                <p className="text-2xl font-bold">
                  {business.avgRating.toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Değerlendirme</p>
                <p className="text-2xl font-bold">{business.reviewCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">İptal Sayacı</p>
                <p className="text-2xl font-bold">
                  {business.consecutiveCancellations}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList>
            <TabsTrigger value="orders">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Siparişler
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package className="w-4 h-4 mr-2" />
              Mağaza
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="w-4 h-4 mr-2" />
              Yorumlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Yeni İstekler</h3>
              {pendingOrders.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    Yeni sipariş isteği yok
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {pendingOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onUpdate={() => loadOrders(business.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Aktif Siparişler</h3>
              {activeOrders.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    Aktif sipariş yok
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {activeOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onUpdate={() => loadOrders(business.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                Ürün yönetimi yakında eklenecek
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                Yorumlar yakında eklenecek
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrderCard({ order, onUpdate }: { order: any; onUpdate: () => void }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // Client-side'da "şimdiki zaman"ı belirle (SSR ve ilk client render tutarlı olsun)
    setNow(Date.now());
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      PENDING_CONFIRMATION: { variant: "secondary", text: "Beklemede" },
      ACCEPTED: { variant: "default", text: "Kabul Edildi" },
      IN_PROGRESS: { variant: "default", text: "Devam Ediyor" },
      COMPLETED: { variant: "success", text: "Tamamlandı" },
      CANCELLED_BY_CUSTOMER: { variant: "destructive", text: "Müşteri İptal" },
      CANCELLED_BY_PROVIDER: { variant: "destructive", text: "İptal Edildi" },
    };
    return variants[status] || { variant: "outline", text: status };
  };

  const statusInfo = getStatusBadge(order.status);
  const isPending = order.status === "PENDING_CONFIRMATION";

  // hoursSinceCreated hesaplaması - now state üzerinden (SSR ve client tutarlı)
  const hoursSinceCreated = now
    ? (now - new Date(order.createdAt).getTime()) / (1000 * 60 * 60)
    : null;

  const handleAccept = async () => {
    try {
      const res = await fetch(`/api/orders/${order.id}/accept`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        onUpdate();
      } else {
        const data = await res.json();
        alert(data.error || "Sipariş kabul edilemedi");
      }
    } catch (err) {
      alert("Sipariş kabul edilemedi");
    }
  };

  const handleReject = async () => {
    try {
      const res = await fetch(`/api/orders/${order.id}/reject`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        onUpdate();
      } else {
        const data = await res.json();
        alert(data.error || "Sipariş reddedilemedi");
      }
    } catch (err) {
      alert("Sipariş reddedilemedi");
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("tr-TR")}
              </span>
            </div>
            <p className="font-semibold text-lg">{order.totalAmount} ₺</p>
            <p className="text-sm text-gray-600 mt-1">{order.addressText}</p>
            {order.items && (
              <div className="mt-2 text-sm text-gray-600">
                {order.items.map((item: any) => (
                  <div key={item.id}>
                    {item.product.name} x {item.quantity}
                  </div>
                ))}
              </div>
            )}
            {isPending && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                ⚠️ 2 saat içinde yanıt vermezseniz otomatik offline olursunuz
                {hoursSinceCreated !== null && hoursSinceCreated > 1 && (
                  <span className="block mt-1 font-semibold">
                    ({Math.floor(hoursSinceCreated)} saat geçti)
                  </span>
                )}
              </div>
            )}
          </div>
          {isPending && (
            <div className="flex gap-2 ml-4">
              <Button size="sm" onClick={handleAccept}>
                Kabul Et
              </Button>
              <Button size="sm" variant="destructive" onClick={handleReject}>
                Reddet
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
