"use client";
import React from "react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMe, login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useToast } from "@/lib/hooks/useToast";
import { ArrowRight, Key, Mail, Phone, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Static generation'ı engelle
export default function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { error: showError } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const type = searchParams.get("type");
  const isBusiness = type === "business";

  const checkAuth = useCallback(async () => {
    try {
      await getMe();
      const redirect =
        searchParams.get("redirect") ||
        (isBusiness ? "/business/jobs" : "/account");
      router.push(redirect);
    } catch (err) {
      // Giriş yapılmamış, sayfada kal
    }
  }, [router, searchParams, isBusiness]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      if (isBusiness) {
        try {
          const businessRes = await fetch(
            `/api/businesses/owner/${data.user.id}`,
            {
              credentials: "include",
            },
          );
          if (businessRes.ok) {
            const business = await businessRes.json();
            if (business) {
              router.push("/business/jobs");
            } else {
              router.push("/business/not-registered");
            }
          } else {
            router.push("/business/not-registered");
          }
        } catch {
          router.push("/business/not-registered");
        }
      } else {
        const redirect = searchParams.get("redirect") || "/account";
        router.push(redirect);
      }
      router.refresh();
    } catch (err: any) {
      console.error("Login error:", err);

      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError("E-posta veya şifre hatalı.");
        } else {
          setError(err.message || "Giriş yapılamadı.");
        }
      } else {
        setError("Bağlantı hatası. Lütfen tekrar deneyin.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-slate-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-baseline gap-1 justify-center mx-auto mb-4">
              <span
                className="text-2xl font-bold text-black lowercase"
                style={{
                  fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                }}
              >
                hizmet
              </span>
              <span
                className="text-2xl font-bold lowercase"
                style={
                  {
                    fontFamily:
                      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                    color: "#FF6000",
                    WebkitTextStroke: "2px white",
                  } as React.CSSProperties
                }
              >
                go
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              {isBusiness ? "Esnaf Girişi" : "Giriş Yap"}
            </CardTitle>
            <CardDescription>
              {isBusiness ? (
                "Esnaf hesabınızla Hizmetgo iş panelinize giriş yapın."
              ) : (
                <>
                  Hesabınıza giriş yapın veya{" "}
                  <Link
                    href="/auth/register"
                    className="text-[#FF6000] hover:underline font-semibold"
                  >
                    yeni hesap oluşturun
                  </Link>
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 text-sm text-red-700 bg-red-50 rounded-xl border-2 border-red-200">
                  <div className="font-semibold mb-1">⚠️ Giriş Başarısız</div>
                  <div className="text-red-600">{error}</div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-900 font-semibold">
                  E-posta
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 border-2 border-slate-200 focus:border-[#FF6000]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-900 font-semibold"
                >
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 border-2 border-slate-200 focus:border-[#FF6000]"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-[#FF6000] hover:bg-[#FF5500] text-white font-semibold"
                disabled={loading}
              >
                {loading ? (
                  "Giriş yapılıyor..."
                ) : (
                  <>
                    Giriş Yap
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <Link href="/auth/email-login">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2 mb-3"
              >
                <Mail className="w-4 h-4 mr-2" />
                E-posta ile Giriş (Kod)
              </Button>
            </Link>

            <Link href="/auth/phone-login">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2"
              >
                <Phone className="w-4 h-4 mr-2" />
                Telefon ile Giriş Yap
              </Button>
            </Link>

            {!isBusiness && (
              <div className="space-y-3 pt-4">
                <Link href="/auth/register" className="block">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-2 border-[#FF6000] text-[#FF6000] hover:bg-[#FF6000] hover:text-white font-semibold"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Kayıt Ol
                  </Button>
                </Link>
                <div className="text-center">
                  <Link
                    href="/auth/register"
                    className="text-sm text-[#FF6000] hover:underline font-semibold"
                  >
                    Hesabınız yok mu? Kayıt olun
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
