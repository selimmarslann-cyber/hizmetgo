"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/lib/hooks/useToast";
import { ArrowLeft, Calendar, DollarSign, MapPin } from "lucide-react";


// Static generation'ı engelle
export default function NewInstantJobPageClient() {
  const router = useRouter();
  const { success, error } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    when: "now", // 'now' | 'today' | 'custom'
    customDateTime: "",
    city: "",
    district: "",
    locationLat: 0,
    locationLng: 0,
    budget: "",
    requiresSkills: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    // Final submission
    if (!formData.description || formData.description.length < 10) {
      error("Açıklama en az 10 karakter olmalı");
      return;
    }

    if (!formData.locationLat || !formData.locationLng) {
      error("Konum bilgisi gerekli");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/instant-jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: formData.description,
          locationLat: formData.locationLat,
          locationLng: formData.locationLng,
          city: formData.city || "İstanbul",
          district: formData.district || undefined,
          requiresSkills: formData.requiresSkills,
          estimatedBudget: formData.budget
            ? parseFloat(formData.budget)
            : undefined,
          scheduledAt:
            formData.when === "custom" && formData.customDateTime
              ? new Date(formData.customDateTime).toISOString()
              : formData.when === "today"
                ? new Date(new Date().setHours(18, 0, 0, 0)).toISOString() // Bugün 18:00
                : undefined, // 'now' için undefined
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "İş oluşturulamadı");
      }

      success("Anlık iş başarıyla oluşturuldu!");
      router.push(`/instant-jobs/${data.instantJob?.id || ""}`);
    } catch (err: any) {
      error(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            locationLat: position.coords.latitude,
            locationLng: position.coords.longitude,
          });
        },
        () => {
          error("Konum alınamadı");
        },
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri Dön
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Yeni Anlık İş Oluştur</CardTitle>
            <CardDescription>
              {step === 1 && "İşinizi kısaca açıklayın"}
              {step === 2 && "Ne zaman yapılacak?"}
              {step === 3 && "Konum ve bütçe bilgisi"}
              {step === 4 && "Son kontroller"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Description */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">İş Açıklaması</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Örn: Köpeğimi akşam 7'de gezdir"
                      rows={4}
                      required
                      minLength={10}
                    />
                    <p className="text-xs text-gray-500">En az 10 karakter</p>
                  </div>
                </div>
              )}

              {/* Step 2: When */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant={formData.when === "now" ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setFormData({ ...formData, when: "now" })}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Şimdi / En kısa sürede
                    </Button>
                    <Button
                      type="button"
                      variant={
                        formData.when === "today" ? "default" : "outline"
                      }
                      className="w-full justify-start"
                      onClick={() =>
                        setFormData({ ...formData, when: "today" })
                      }
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Bugün
                    </Button>
                    <div>
                      <Label htmlFor="customDateTime">Özel Tarih/Saat</Label>
                      <Input
                        id="customDateTime"
                        type="datetime-local"
                        value={formData.customDateTime}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            customDateTime: e.target.value,
                            when: "custom",
                          });
                        }}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Location & Budget */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Konum</Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getLocation}
                      className="w-full"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Mevcut Konumumu Kullan
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">İl</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          placeholder="İstanbul"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">İlçe</Label>
                        <Input
                          id="district"
                          value={formData.district}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              district: e.target.value,
                            })
                          }
                          placeholder="Kadıköy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Tahmini Bütçe (Opsiyonel)
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      min="0"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      placeholder="Örn: 100"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Final checks */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresSkills"
                        checked={formData.requiresSkills}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            requiresSkills: checked === true,
                          })
                        }
                      />
                      <Label
                        htmlFor="requiresSkills"
                        className="font-normal cursor-pointer"
                      >
                        Bu iş vasıf gerektirmez (herkes başvurabilir)
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Geri
                  </Button>
                )}
                <Button type="submit" className="ml-auto" disabled={loading}>
                  {step === 4
                    ? loading
                      ? "Oluşturuluyor..."
                      : "İş Oluştur"
                    : "Devam"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
