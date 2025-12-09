"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Database,
  Settings,
  Shield,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";

export default function AdminSettingsPageClient() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Güvenlik Ayarları
    requireEmailVerification: true,
    allowGuestCheckout: false,
    maxLoginAttempts: 5,
    sessionTimeout: 30, // dakika

    // Bildirim Ayarları
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminEmail: "",
    supportEmail: "",

    // Genel Ayarlar
    siteName: "Hizmetgo",
    siteDescription: "Esnaf/Hizmet Süper Uygulaması",
    maintenanceMode: false,
    allowRegistration: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings({ ...settings, ...data.settings });
        }
      }
    } catch (err) {
      console.error("Settings load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
        credentials: "include",
      });

      if (res.ok) {
        success("Ayarlar kaydedildi");
      } else {
        const data = await res.json();
        error(data.error || "Ayarlar kaydedilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#FF6000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ayarlar</h2>
          <p className="text-gray-600 mt-1">Sistem ayarlarını yönetin</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#FF6000] hover:bg-[#FF7000]"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Güvenlik Ayarları */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#FF6000]" />
              <CardTitle>Güvenlik Ayarları</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="requireEmailVerification">
                  E-posta Doğrulama Zorunlu
                </Label>
                <p className="text-xs text-gray-500">
                  Kullanıcıların e-posta doğrulaması yapması gerekir
                </p>
              </div>
              <Switch
                id="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireEmailVerification: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowGuestCheckout">
                  Misafir Sipariş Verme
                </Label>
                <p className="text-xs text-gray-500">
                  Giriş yapmadan sipariş verilebilir
                </p>
              </div>
              <Switch
                id="allowGuestCheckout"
                checked={settings.allowGuestCheckout}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowGuestCheckout: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">
                Maksimum Giriş Denemesi
              </Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                min="3"
                max="10"
                value={settings.maxLoginAttempts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxLoginAttempts: parseInt(e.target.value) || 5,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">
                Oturum Zaman Aşımı (dakika)
              </Label>
              <Input
                id="sessionTimeout"
                type="number"
                min="5"
                max="120"
                value={settings.sessionTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    sessionTimeout: parseInt(e.target.value) || 30,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Bildirim Ayarları */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#FF6000]" />
              <CardTitle>Bildirim Ayarları</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">E-posta Bildirimleri</Label>
                <p className="text-xs text-gray-500">
                  Sistem e-posta bildirimleri gönderir
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smsNotifications">SMS Bildirimleri</Label>
                <p className="text-xs text-gray-500">
                  SMS bildirimleri gönderilir
                </p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, smsNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications">Push Bildirimleri</Label>
                <p className="text-xs text-gray-500">
                  Mobil uygulama push bildirimleri
                </p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, pushNotifications: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin E-posta</Label>
              <Input
                id="adminEmail"
                type="email"
                placeholder="admin@hizmetgo.com"
                value={settings.adminEmail}
                onChange={(e) =>
                  setSettings({ ...settings, adminEmail: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Destek E-posta</Label>
              <Input
                id="supportEmail"
                type="email"
                placeholder="destek@hizmetgo.com"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings({ ...settings, supportEmail: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Genel Ayarlar */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-[#FF6000]" />
              <CardTitle>Genel Ayarlar</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Adı</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Açıklaması</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    siteDescription: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenanceMode">Bakım Modu</Label>
                <p className="text-xs text-gray-500">
                  Site bakım moduna alınır
                </p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenanceMode: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowRegistration">Kayıt İzni</Label>
                <p className="text-xs text-gray-500">
                  Yeni kullanıcı kaydına izin ver
                </p>
              </div>
              <Switch
                id="allowRegistration"
                checked={settings.allowRegistration}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowRegistration: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Veritabanı Yönetimi */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-[#FF6000]" />
              <CardTitle>Veritabanı Yönetimi</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Veritabanı Durumu</span>
                <Badge className="bg-green-500">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Aktif
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Bağlantı</span>
                <Badge variant="outline">Bağlı</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  try {
                    const res = await fetch("/api/admin/settings/backup", {
                      method: "POST",
                      credentials: "include",
                    });
                    if (res.ok) {
                      success("Yedekleme başlatıldı");
                    } else {
                      error("Yedekleme başlatılamadı");
                    }
                  } catch (err) {
                    error("Bir hata oluştu");
                  }
                }}
              >
                <Database className="w-4 h-4 mr-2" />
                Veritabanı Yedekle
              </Button>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <p className="text-xs text-yellow-800">
                  Veritabanı işlemleri dikkatli yapılmalıdır. Yedekleme işlemi
                  zaman alabilir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
