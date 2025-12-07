"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


// Static generation'ı engelle
export default function BusinessLoginPageClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        // Kullanıcının esnaf olup olmadığını kontrol et
        const businessRes = await fetch(
          `/api/businesses/owner/${data.user.id}`,
          {
            credentials: "include",
          },
        );
        if (businessRes.ok) {
          const business = await businessRes.json();
          if (business) {
            // Esnaf ise dashboard'a yönlendir
            router.push("/business");
          } else {
            // Esnaf değilse bilgilendirme sayfasına yönlendir
            router.push("/business/not-registered");
          }
        }
      }
    } catch (err) {
      // Giriş yapılmamış, sayfada kal
    }
  }, [router]);

  useEffect(() => {
    // Eğer zaten giriş yapılmışsa kontrol et
    checkAuth();
  }, [checkAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const contentType = res.headers.get("content-type");
      let data;

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        if (text.includes("<!DOCTYPE") || text.includes("<html")) {
          setError(
            "Sunucu hatası. Lütfen sayfayı yenileyin ve tekrar deneyin.",
          );
        } else {
          setError(`Sunucu hatası: ${text.substring(0, 100)}`);
        }
        setLoading(false);
        return;
      }

      try {
        data = await res.json();
      } catch (jsonError) {
        setError("Sunucu yanıtı beklenmedik formatta. Lütfen tekrar deneyin.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.error || "E-posta veya şifre hatalı.");
        setLoading(false);
        return;
      }

      // Giriş başarılı - esnaf kontrolü yap
      const businessRes = await fetch(`/api/businesses/owner/${data.user.id}`, {
        credentials: "include",
      });

      if (businessRes.ok) {
        const business = await businessRes.json();
        if (business) {
          // Esnaf ise dashboard'a yönlendir
          router.push("/business");
        } else {
          // Esnaf değilse bilgilendirme sayfasına yönlendir
          router.push("/business/not-registered");
        }
      } else {
        // Hata durumunda da bilgilendirme sayfasına yönlendir
        router.push("/business/not-registered");
      }

      router.refresh();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.message ||
          "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle>Esnaf Girişi</CardTitle>
              <CardDescription className="mt-1">
                Esnaf hesabınızla Hizmetgo iş panelinize giriş yapın
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 text-sm text-red-700 bg-red-50 rounded-md border border-red-200">
                <div className="font-semibold mb-1">⚠️ Giriş Başarısız</div>
                <div className="text-red-600">{error}</div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                "Giriş yapılıyor..."
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
            <div className="text-center text-sm text-gray-600">
              <span>Henüz hesabınız yok mu? </span>
              <Link
                href="/auth/register"
                className="text-primary hover:underline font-semibold"
              >
                Kayıt Ol
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  veya
                </span>
              </div>
            </div>
            <Link href="/auth/login">
              <Button type="button" variant="outline" className="w-full">
                Kullanıcı Girişi
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
