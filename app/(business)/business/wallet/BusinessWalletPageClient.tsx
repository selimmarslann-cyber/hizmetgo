"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Copy, MessageCircle, TrendingUp, Wallet } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";


// Static generation'ı engelle
export default function BusinessWalletPageClient() {
  const router = useRouter();
  const { success } = useToast();
  const [overview, setOverview] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const calculateBusinessEarnings = useCallback(async () => {
    if (!business) return { total: 0, monthly: 0, pending: 0 };

    try {
      const ordersRes = await fetch(`/api/orders/business/${business.id}`, {
        credentials: "include",
      });
      if (ordersRes.ok) {
        const orders = await ordersRes.json();
        const completed = orders.filter((o: any) => o.status === "COMPLETED");
        const thisMonth = completed.filter((o: any) => {
          const orderDate = new Date(o.createdAt);
          const now = new Date();
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        });

        const total = completed.reduce(
          (sum: number, o: any) => sum + (parseFloat(o.totalAmount) || 0),
          0,
        );
        const monthly = thisMonth.reduce(
          (sum: number, o: any) => sum + (parseFloat(o.totalAmount) || 0),
          0,
        );
        const pending = orders
          .filter(
            (o: any) =>
              o.status === "COMPLETED" && o.paymentStatus !== "CAPTURED",
          )
          .reduce(
            (sum: number, o: any) => sum + (parseFloat(o.totalAmount) || 0),
            0,
          );

        return { total, monthly, pending };
      }
    } catch (err) {
      console.error("Kazanç hesaplanamadı:", err);
    }
    return { total: 0, monthly: 0, pending: 0 };
  }, [business]);

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
      }

      const overviewRes = await fetch("/api/referral/overview", {
        credentials: "include",
      });
      if (overviewRes.ok) {
        const data = await overviewRes.json();
        setOverview(data);
      }
    } catch (err) {
      console.error("Cüzdan verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const [businessEarnings, setBusinessEarnings] = useState({
    total: 0,
    monthly: 0,
    pending: 0,
  });

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (business) {
      calculateBusinessEarnings().then(setBusinessEarnings);
    }
  }, [business, calculateBusinessEarnings]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      success("Kopyalandı!");
    } catch (err) {
      console.error("Kopyalama hatası:", err);
    }
  };

  const shareWhatsApp = () => {
    if (!overview) return;
    const text = encodeURIComponent(
      "Hizmetgo'e katıl, kazan! Bu link ile kayıt ol: " + overview.referralLink,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Cüzdan</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* İşletme Kazançları */}
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Kazancın
              </CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {businessEarnings.total.toFixed(2)} ₺
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Tamamlanan tüm işlerden
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bu Ayın Kazancı
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {businessEarnings.monthly.toFixed(2)} ₺
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Bu takvim ayındaki kazanç
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bekleyen Ödemeler
              </CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {businessEarnings.pending.toFixed(2)} ₺
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Henüz ödenmemiş işler
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Özeti */}
        {overview && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Referral Kazançları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Başka esnafları veya müşterileri davet ederek komisyon payı
                  kazan.
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Referral Kodun</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={overview.currentReferralCode}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-md bg-gray-50 font-mono font-semibold text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(overview.currentReferralCode)
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Referral Linkin</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={overview.referralLink}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-xs"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(overview.referralLink)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                variant="default"
                className="w-full"
                onClick={shareWhatsApp}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp'ta Paylaş
              </Button>

              <Link href="/referral">
                <Button variant="outline" className="w-full">
                  Detaylı referral kazançlarını gör
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
