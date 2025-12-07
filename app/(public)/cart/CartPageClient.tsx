"use client";
import { useState } from "react";
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

  const total = getTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

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
          addressText: address,
          scheduledAt: scheduledAt || undefined,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
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
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Teslimat adresi"
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
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Toplam</span>
                      <span className="text-xl font-bold">
                        {total.toFixed(2)} ₺
                      </span>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
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
