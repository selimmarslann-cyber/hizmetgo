"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import { useCartStore } from "@/lib/store/useCartStore";

// Static generation'ı engelle
export default function CartPageClient() {
  const router = useRouter();
  const { error } = useToast();
  const {
    items: cart,
    removeItem,
    updateQuantity,
    getTotal,
    clearCart,
  } = useCartStore();
  const [address, setAddress] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [deliveryType, setDeliveryType] = useState<"DELIVERY" | "PICKUP">("DELIVERY");
  const [businessInfo, setBusinessInfo] = useState<{
    minOrderAmount?: number | null;
    deliveryRadius?: number | null;
    hasDelivery?: boolean;
    lat?: number;
    lng?: number;
  } | null>(null);

  const total = getTotal();

  // Auth kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  // Business bilgisini yükle
  useEffect(() => {
    if (cart.length > 0) {
      const businessId = cart[0].businessId;
      fetch(`/api/businesses/${businessId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            setBusinessInfo({
              minOrderAmount: data.minOrderAmount,
              deliveryRadius: data.deliveryRadius,
              hasDelivery: data.hasDelivery,
              lat: data.lat,
              lng: data.lng,
            });
          }
        })
        .catch((err) => console.error("Business bilgisi yüklenemedi:", err));
    }
  }, [cart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {return;}

    // Login kontrolü
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent("/cart")}`);
      return;
    }

    setLoading(true);

    try {
      // İlk ürünün businessId'sini al (şimdilik tek işletmeden sipariş)
      const businessId = cart[0].businessId;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          addressText: deliveryType === "DELIVERY" ? address : (address || "Gel-al"),
          scheduledAt: scheduledAt || undefined,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          // Unauthorized - login sayfasına yönlendir
          router.push(`/auth/login?redirect=${encodeURIComponent("/cart")}`);
          return;
        }
        error(data.error || "Sipariş oluşturulamadı");
        return;
      }

      // Sepeti temizle
      clearCart();
      router.push(`/orders/${data.order.id}`);
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">Sepetiniz boş</p>
            <Link href="/map">
              <Button>İşletmelere Göz At</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center space-y-4">
            <p className="text-gray-500 mb-4">
              Sipariş vermek için giriş yapmalısınız
            </p>
            <div className="flex gap-3 justify-center">
              <Link href={`/auth/login?redirect=${encodeURIComponent("/cart")}`}>
                <Button>Giriş Yap</Button>
              </Link>
              <Link href={`/auth/register?redirect=${encodeURIComponent("/cart")}`}>
                <Button variant="outline">Kayıt Ol</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Sepetim</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.productName}</h3>
                      {item.businessName && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.businessName}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        {parseFloat(item.price.toString()).toFixed(2)} ₺
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {businessInfo?.hasDelivery && (
                    <div className="space-y-2">
                      <Label>Teslimat Tipi</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={deliveryType === "DELIVERY" ? "default" : "outline"}
                          onClick={() => setDeliveryType("DELIVERY")}
                          className="flex-1"
                        >
                          Eve Teslim
                        </Button>
                        <Button
                          type="button"
                          variant={deliveryType === "PICKUP" ? "default" : "outline"}
                          onClick={() => setDeliveryType("PICKUP")}
                          className="flex-1"
                        >
                          Gel-Al
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {deliveryType === "DELIVERY" ? "Teslimat Adresi" : "Adres (Opsiyonel)"}
                    </Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required={deliveryType === "DELIVERY"}
                      placeholder={deliveryType === "DELIVERY" ? "Teslimat adresi" : "Adres (opsiyonel)"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduledAt">
                      Planlanan Saat (Opsiyonel)
                    </Label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                    />
                  </div>
                  <div className="pt-4 border-t">
                    {businessInfo?.minOrderAmount &&
                      total < businessInfo.minOrderAmount && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            Minimum sipariş tutarı:{" "}
                            <strong>
                              {businessInfo.minOrderAmount.toFixed(2)} ₺
                            </strong>
                          </p>
                          <p className="text-xs text-yellow-700 mt-1">
                            Sepetinize{" "}
                            <strong>
                              {(businessInfo.minOrderAmount - total).toFixed(2)}{" "}
                              ₺
                            </strong>{" "}
                            daha eklemelisiniz.
                          </p>
                        </div>
                      )}
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Toplam</span>
                      <span className="text-xl font-bold">
                        {total.toFixed(2)} ₺
                      </span>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        loading ||
                        (businessInfo?.minOrderAmount
                          ? total < businessInfo.minOrderAmount
                          : false)
                      }
                    >
                      {loading ? "Gönderiliyor..." : "Sipariş İste"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
