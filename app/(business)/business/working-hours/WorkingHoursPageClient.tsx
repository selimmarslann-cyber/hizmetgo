"use client";
/**
 * Working Hours Management Page
 *
 * Esnaf çalışma saatlerini yönetir
 */

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Save } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";

// Static generation'ı engelle
type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: "mon", label: "Pazartesi" },
  { key: "tue", label: "Salı" },
  { key: "wed", label: "Çarşamba" },
  { key: "thu", label: "Perşembe" },
  { key: "fri", label: "Cuma" },
  { key: "sat", label: "Cumartesi" },
  { key: "sun", label: "Pazar" },
];

export default function WorkingHoursPageClient() {
  const router = useRouter();
  const { success, error } = useToast();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    mon: { open: "09:00", close: "18:00", closed: false },
    tue: { open: "09:00", close: "18:00", closed: false },
    wed: { open: "09:00", close: "18:00", closed: false },
    thu: { open: "09:00", close: "18:00", closed: false },
    fri: { open: "09:00", close: "18:00", closed: false },
    sat: { open: "09:00", close: "18:00", closed: false },
    sun: { open: "09:00", close: "18:00", closed: true },
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

        // Working hours'ı yükle
        if (businessData.workingHoursJson) {
          setWorkingHours(businessData.workingHoursJson as WorkingHours);
        }
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
          workingHoursJson: workingHours,
        }),
        credentials: "include",
      });

      if (res.ok) {
        success("Çalışma saatleri kaydedildi");
      } else {
        const errorData = await res.json();
        error(errorData.error || "Çalışma saatleri kaydedilemedi");
      }
    } catch (err) {
      console.error("Kaydetme hatası:", err);
      error("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const updateDay = (
    day: DayOfWeek,
    field: "open" | "close" | "closed",
    value: string | boolean,
  ) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const copyDay = (fromDay: DayOfWeek, toDay: DayOfWeek) => {
    setWorkingHours((prev) => ({
      ...prev,
      [toDay]: { ...prev[fromDay] },
    }));
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
          <h1 className="text-3xl font-bold text-gray-900">Çalışma Saatleri</h1>
          <p className="text-gray-600 mt-2">
            İşletmenizin çalışma saatlerini belirleyin. Mesai saatleri dışında
            otomatik offline'a geçersiniz.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Haftalık Çalışma Saatleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DAYS.map((day) => {
                const dayHours = workingHours[day.key];
                return (
                  <div
                    key={day.key}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="w-32">
                      <Label className="font-medium">{day.label}</Label>
                    </div>

                    <Switch
                      checked={!dayHours.closed}
                      onCheckedChange={(checked) =>
                        updateDay(day.key, "closed", !checked)
                      }
                    />

                    {!dayHours.closed ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={dayHours.open}
                            onChange={(e) =>
                              updateDay(day.key, "open", e.target.value)
                            }
                            className="w-32"
                          />
                          <span className="text-gray-500">-</span>
                          <Input
                            type="time"
                            value={dayHours.close}
                            onChange={(e) =>
                              updateDay(day.key, "close", e.target.value)
                            }
                            className="w-32"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Copy to all days
                            DAYS.forEach((d) => {
                              if (d.key !== day.key) {
                                copyDay(day.key, d.key);
                              }
                            });
                            success("Tüm günlere kopyalandı");
                          }}
                        >
                          Tümüne Uygula
                        </Button>
                      </>
                    ) : (
                      <Badge variant="secondary">Kapalı</Badge>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t">
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
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Otomatik Kapanma
                </p>
                <p className="text-sm text-blue-700">
                  Mesai saati bittiğinde işletmeniz otomatik olarak offline'a
                  geçer. Yeni siparişler gelmez ve mevcut siparişleriniz
                  korunur.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
