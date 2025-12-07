"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, MapPin, Phone, Save, Shield } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


// Static generation'ı engelle
export default function AccountSettingsPageClient() {
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Notification settings
  const [notifications, setNotifications] = useState({
    instantJob: false,
    sms: false,
    whatsapp: false,
    email: false,
  });

  // Security settings
  const [security, setSecurity] = useState({
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Location settings
  const [location, setLocation] = useState({
    city: "",
    district: "",
    neighborhood: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        const user = data.user;

        // Notification settings
        setNotifications({
          instantJob: user.instantJobNotifications || false,
          sms: user.smsNotifications || false,
          whatsapp: user.whatsappNotifications || false,
          email: user.emailMarketing || false,
        });

        // Location settings
        setLocation({
          city: user.city || "",
          district: "", // User modelinde yok, şimdilik boş
          neighborhood: "", // User modelinde yok, şimdilik boş
        });
      }
    } catch (err) {
      console.error("Ayarlar yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instantJobNotifications: notifications.instantJob,
          smsNotifications: notifications.sms,
          whatsappNotifications: notifications.whatsapp,
          emailMarketing: notifications.email,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Bildirim ayarları kaydedilemedi");
      }

      setSuccess(true);
      showSuccessToast("Bildirim ayarları başarıyla kaydedildi");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Kaydetme hatası:", err);
      showErrorToast(err.message || "Bildirim ayarları kaydedilemedi");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecurity = async () => {
    if (
      security.newPassword &&
      security.newPassword !== security.confirmPassword
    ) {
      alert("Yeni şifreler eşleşmiyor");
      return;
    }

    setSaving(true);
    try {
      // TODO: Backend'e kaydet
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setSecurity((prev) => ({
        ...prev,
        password: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      console.error("Kaydetme hatası:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLocation = async () => {
    setSaving(true);
    try {
      // Get user location if available (async)
      const getLocation = (): Promise<{
        lat: number | null;
        lng: number | null;
      }> => {
        return new Promise((resolve) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => {
                // Geolocation denied or failed, continue without it
                resolve({ lat: null, lng: null });
              },
            );
          } else {
            resolve({ lat: null, lng: null });
          }
        });
      };

      const coords = await getLocation();

      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: location.city || null,
          locationLat: coords.lat,
          locationLng: coords.lng,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Konum ayarları kaydedilemedi");
      }

      setSuccess(true);
      showSuccessToast("Konum ayarları başarıyla kaydedildi");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Kaydetme hatası:", err);
      showErrorToast(err.message || "Konum ayarları kaydedilemedi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <p className="text-gray-600 mt-2">Hesap ayarlarınızı yönetin</p>
      </div>

      {/* Success Banner */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
          <p>✓ Ayarlar başarıyla kaydedildi</p>
        </div>
      )}

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Bildirim Ayarları
            </CardTitle>
            <CardDescription>Bildirim tercihlerinizi yönetin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="instantJob">Anlık İş Bildirimleri</Label>
                <p className="text-xs text-gray-500">
                  Yakınındaki anlık işler için bildirim al
                </p>
              </div>
              <Switch
                id="instantJob"
                checked={notifications.instantJob}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, instantJob: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms">SMS ile bilgilendirme</Label>
                <p className="text-xs text-gray-500">
                  Önemli işlemler için SMS alın
                </p>
              </div>
              <Switch
                id="sms"
                checked={notifications.sms}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, sms: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="whatsapp">WhatsApp bildirimleri</Label>
                <p className="text-xs text-gray-500">
                  WhatsApp üzerinden bildirim al
                </p>
              </div>
              <Switch
                id="whatsapp"
                checked={notifications.whatsapp}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, whatsapp: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email">E-posta pazarlama</Label>
                <p className="text-xs text-gray-500">
                  Kampanya ve fırsatlar için e-posta alın
                </p>
              </div>
              <Switch
                id="email"
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, email: checked }))
                }
              />
            </div>
            <Button
              onClick={handleSaveNotifications}
              disabled={saving}
              className="mt-4"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Güvenlik
            </CardTitle>
            <CardDescription>Güvenlik ayarlarınızı yönetin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon Numarası</Label>
              <div className="flex gap-2">
                <Input
                  id="phone"
                  type="tel"
                  value={security.phone}
                  onChange={(e) =>
                    setSecurity((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+90 5XX XXX XX XX"
                />
                <Button variant="outline" type="button">
                  <Phone className="w-4 h-4 mr-2" />
                  Değiştir
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mevcut Şifre</Label>
              <Input
                id="password"
                type="password"
                value={security.password}
                onChange={(e) =>
                  setSecurity((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Şifre değiştirmek için mevcut şifrenizi girin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Yeni Şifre</Label>
              <Input
                id="newPassword"
                type="password"
                value={security.newPassword}
                onChange={(e) =>
                  setSecurity((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                placeholder="Yeni şifrenizi girin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={security.confirmPassword}
                onChange={(e) =>
                  setSecurity((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Yeni şifrenizi tekrar girin"
              />
            </div>
            <Button
              onClick={handleSaveSecurity}
              disabled={saving}
              className="mt-4"
            >
              <Lock className="w-4 h-4 mr-2" />
              {saving ? "Kaydediliyor..." : "Şifreyi Güncelle"}
            </Button>
            <div className="pt-4 border-t">
              <Button variant="destructive" type="button" className="w-full">
                Hesabımı geçici olarak dondur
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Hesabınızı geçici olarak dondurduğunuzda, giriş yapamazsınız.
                İstediğiniz zaman tekrar aktif edebilirsiniz.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Location Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Adres & Bölge Bilgileri
            </CardTitle>
            <CardDescription>Konum bilgilerinizi güncelleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">İl</Label>
                <Input
                  id="city"
                  value={location.city}
                  onChange={(e) =>
                    setLocation((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="İstanbul"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">İlçe</Label>
                <Input
                  id="district"
                  value={location.district}
                  onChange={(e) =>
                    setLocation((prev) => ({
                      ...prev,
                      district: e.target.value,
                    }))
                  }
                  placeholder="Kadıköy"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Mahalle</Label>
              <Input
                id="neighborhood"
                value={location.neighborhood}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    neighborhood: e.target.value,
                  }))
                }
                placeholder="Acıbadem"
              />
            </div>
            <Button
              onClick={handleSaveLocation}
              disabled={saving}
              className="mt-4"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
