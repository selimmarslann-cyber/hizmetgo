"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


// Static generation'ı engelle
export default function OrdersPageClient() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/orders/customer/${userId}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Siparişler yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadUserAndOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        router.push("/auth/login");
        return;
      }
      const data = await res.json();
      loadOrders(data.user.id);
    } catch (err) {
      router.push("/auth/login");
    }
  }, [router, loadOrders]);

  useEffect(() => {
    loadUserAndOrders();
  }, [loadUserAndOrders]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING_CONFIRMATION: "Beklemede",
      ACCEPTED: "Kabul Edildi",
      IN_PROGRESS: "Devam Ediyor",
      COMPLETED: "Tamamlandı",
      CANCELLED_BY_CUSTOMER: "İptal Edildi",
      CANCELLED_BY_PROVIDER: "İptal Edildi",
    };
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Siparişlerim</h1>
          <Link href="/map">
            <Button variant="outline">Ana Sayfa</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              Henüz siparişiniz yok
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            {getStatusText(order.status)}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString(
                              "tr-TR",
                            )}
                          </span>
                        </div>
                        <p className="font-semibold">{order.business?.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.totalAmount} ₺
                        </p>
                        {order.status === "COMPLETED" && !order.review && (
                          <Badge variant="success" className="mt-2">
                            Değerlendirme Yap
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
