"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/lib/hooks/useToast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryAutocomplete from "@/components/forms/CategoryAutocomplete";
import { ArrowLeft } from "lucide-react";

export default function RegisterSkillsPageClient() {
  const router = useRouter();
  const { success, error } = useToast();
  const [skillCategories, setSkillCategories] = useState<string[]>([]);
  const [publishWithoutKeyword, setPublishWithoutKeyword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Kullanıcı giriş yapmış mı kontrol et
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          router.push("/auth/register");
          return;
        }
      } catch (err) {
        router.push("/auth/register");
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/complete-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          skillCategories,
          publishWithoutKeyword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        error(data.error || "Yetenekler kaydedilemedi.");
        setLoading(false);
        return;
      }

      success("Kayıt tamamlandı! Hoş geldiniz!");
      router.push("/account/profile");
      router.refresh();
    } catch (err: any) {
      console.error("Complete registration error:", err);
      error("Bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Yeteneklerinizi Seçin
                </CardTitle>
                <CardDescription className="mt-2">
                  Hangi kategorilerde hizmet vermek istiyorsunuz?
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Bu platformda her üye hem <strong>işveren</strong> hem <strong>işyapan</strong> rolündedir. Yapabileceğiniz işlerin anahtar kelimelerini seçtiğinizde, bu kelimelerle ilgili ilanlar size bildirim olarak gelecektir. Bu sayede size uygun iş fırsatlarını kaçırmazsınız.
                  </p>
                  <div className="space-y-2">
                    <Label
                      htmlFor="skillCategories"
                      className="text-base font-semibold text-slate-900"
                    >
                      Hangi kategoride yeteneklisiniz veya hizmet vermeyi düşünürsünüz?
                    </Label>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Örnek: Elektrik, Temizlik, Tesisat, Boya, vb. Ana kategoriler seçilir, seçtiğiniz kategorinin tüm alt hizmetlerinden bildirim alırsınız. Örneğin &quot;Elektrik&quot; seçerseniz, elektrik ile ilgili tüm işlerden bildirim alırsınız. Yetenekli olduğunuz veya hizmet vermek istediğiniz ana kategorileri seçin.
                    </p>
                    <CategoryAutocomplete
                      value={skillCategories}
                      onChange={setSkillCategories}
                      placeholder="Ana kategori ara ve seç... (örn: elektrik, temizlik)"
                      maxCategories={10}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="publishWithoutKeyword"
                    checked={publishWithoutKeyword}
                    onCheckedChange={(checked) =>
                      setPublishWithoutKeyword(checked === true)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <Label
                      htmlFor="publishWithoutKeyword"
                      className="text-base font-semibold text-slate-900 cursor-pointer"
                    >
                      Girdiğin mesleğe dair bir anahtar kelime bulamadıysan bu kısma tik koy ve yeteneğini öyle yayınla
                    </Label>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong>Yapay zeka</strong> yakın kategorilerle eşleştirsin ve <strong>ilk işleri alma fırsatı senin olsun</strong>. Sistem otomatik olarak yeteneğinizi en uygun kategorilerle eşleştirecek ve size özel iş fırsatları sunacaktır. Yapay zeka destekli kategori eşleştirme sayesinde yeteneğiniz en doğru şekilde kategorize edilecek ve ilk iş fırsatlarından haberdar olacaksınız.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/account/profile")}
                  className="flex-1"
                  disabled={loading}
                >
                  Şimdilik Atla
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? "Kaydediliyor..." : "Kaydet ve Devam Et"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

