"use client";
/**
 * Order Settings Page
 *
 * Esnaf sipariş ayarlarını yönetir: min sepet, teslimat yarıçapı, teslimat var mı
 */

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Package, Truck, MapPin } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";

export default function OrderSettingsPageClient() {
  const router = useRouter();
  const { success, error } = useToast();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    minOrderAmount: "",
    deliveryRadius: "",
    hasDelivery: false,
  });

  const loadBusiness = useCallback(async () => {
    try {
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (!userRes.ok) {
        router.push("/auth/business-login");
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

        // Settings'i yükle
        setSettings({
          minOrderAmount: businessData.minOrderAmount
            ? businessData.minOrderAmount.toString()
            : "",
          deliveryRadius: businessData.deliveryRadius
            ? businessData.deliveryRadius.toString()
            : "",
          hasDelivery: businessData.hasDelivery || false,
        });
      }
    } catch (err) {
      console.error("İşletme verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadBusiness();
  }, [loadBusiness]);

  const handleSave = async () => {
    if (!business) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/businesses/${business.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minOrderAmount: settings.minOrderAmount
            ? parseFloat(settings.minOrderAmount)
            : null,
          deliveryRadius: settings.deliveryRadius
            ? parseFloat(settings.deliveryRadius)
            : null,
          hasDelivery: settings.hasDelivery,
        }),
        credentials: "include",
      });

      if (res.ok) {
        success("Sipariş ayarları kaydedildi");
      } else {
        const errorData = await res.json();
        error(errorData.error || "Sipariş ayarları kaydedilemedi");
      }
    } catch (err) {
      console.error("Kaydetme hatası:", err);
      error("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sipariş Ayarları</h1>
          <p className="text-gray-600 mt-2">
            Minimum sipariş tutarı, teslimat yarıçapı ve teslimat seçeneklerini
            belirleyin.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5" />
              Sipariş Kuralları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Minimum Sipariş Tutarı */}
            <div className="space-y-2">
              <Label htmlFor="minOrderAmount" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Minimum Sipariş Tutarı (₺)
              </Label>
              <Input
                id="minOrderAmount"
                type="number"
                min="0"
                step="0.01"
                value={settings.minOrderAmount}
                onChange={(e) =>
                  setSettings({ ...settings, minOrderAmount: e.target.value })
                }
                placeholder="Örn: 50.00"
              />
              <p className="text-sm text-gray-500">
                Bu tutarın altında sipariş kabul edilmez. Boş bırakırsanız
                minimum tutar olmaz.
              </p>
            </div>

            {/* Teslimat Var mı? */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="hasDelivery" className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Teslimat Hizmeti
                </Label>
                <Switch
                  id="hasDelivery"
                  checked={settings.hasDelivery}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, hasDelivery: checked })
                  }
                />
              </div>
              <p className="text-sm text-gray-500">
                Teslimat hizmeti açıkken müşteriler eve teslimat seçeneğini
                görebilir.
              </p>
            </div>

            {/* Teslimat Yarıçapı */}
            {settings.hasDelivery && (
              <div className="space-y-2">
                <Label
                  htmlFor="deliveryRadius"
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Teslimat Yarıçapı (km)
                </Label>
                <Input
                  id="deliveryRadius"
                  type="number"
                  min="0"
                  step="0.1"
                  value={settings.deliveryRadius}
                  onChange={(e) =>
                    setSettings({ ...settings, deliveryRadius: e.target.value })
                  }
                  placeholder="Örn: 5.0"
                />
                <p className="text-sm text-gray-500">
                  Bu yarıçapın dışındaki adreslere teslimat yapılmaz. Boş
                  bırakırsanız yarıçap sınırı olmaz.
                </p>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button onClick={handleSave} disabled={saving} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Sipariş Kuralları
                </p>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>
                    Minimum sipariş tutarı belirlerseniz, müşteriler bu tutarın
                    altında sipariş veremez.
                  </li>
                  <li>
                    Teslimat yarıçapı belirlerseniz, sadece bu mesafe içindeki
                    adreslere teslimat yapılır.
                  </li>
                  <li>
                    Teslimat kapalıyken müşteriler sadece "gel-al" seçeneğini
                    görebilir.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

