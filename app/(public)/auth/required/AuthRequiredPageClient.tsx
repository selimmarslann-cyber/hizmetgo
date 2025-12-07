"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedLoadingLogo from "@/components/ui/AnimatedLoadingLogo";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Lock,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";


// Static generation'ı engelle
export default function AuthRequiredPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pageName = searchParams.get("page") || "Bu sayfa";
  const redirectTo = searchParams.get("redirect") || "/account";

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        setIsAuthenticated(true);
        // Eğer giriş yapılmışsa, yönlendir
        router.push(redirectTo);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setChecking(false);
    }
  }, [router, redirectTo]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const getPageInfo = () => {
    const pageMap: Record<
      string,
      { title: string; description: string; icon: any }
    > = {
      İşlerim: {
        title: "İşlerim",
        description:
          "Verdiğin işleri takip et, esnaflardan gelen teklifleri gör",
        icon: Briefcase,
      },
      Kazancım: {
        title: "Kazancım",
        description: "İş kazançlarını ve referans kazançlarını görüntüle",
        icon: Wallet,
      },
      Profil: {
        title: "Profil",
        description: "Profil bilgilerini düzenle, yeteneklerini ekle",
        icon: User,
      },
    };
    return (
      pageMap[pageName] || {
        title: pageName,
        description: "Bu sayfayı görüntülemek için üye olmanız gerekmektedir",
        icon: Lock,
      }
    );
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AnimatedLoadingLogo />
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Router.push ile yönlendirilecek
  }

  const pageInfo = getPageInfo();
  const Icon = pageInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-2 border-slate-200 shadow-2xl overflow-hidden">
          {/* Header - Gradient */}
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-xl"
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Üyelik Gerekli
              </h1>
              <p className="text-center text-white/90 text-lg">
                {pageInfo.title} sayfasını görüntülemek için üye olmanız
                gerekmektedir
              </p>
            </div>
          </div>

          <CardContent className="p-8 md:p-12">
            {/* Açıklama */}
            <div className="text-center mb-8">
              <p className="text-gray-700 text-lg mb-4">
                {pageInfo.description}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Bu sayfa üyelik gerektirir
                </span>
              </div>
            </div>

            {/* Avantajlar */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: User,
                  title: "Kişisel Profil",
                  description: "Profil bilgilerini yönet",
                },
                {
                  icon: Briefcase,
                  title: "İş Takibi",
                  description: "İşlerini kolayca takip et",
                },
                {
                  icon: Wallet,
                  title: "Kazanç Takibi",
                  description: "Kazançlarını görüntüle",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Özellikler Listesi */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-8 border border-primary/20">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Üye Olunca Neler Yapabilirsiniz?
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "İş talepleri oluşturma",
                  "Esnaflardan teklif alma",
                  "Kazançlarınızı takip etme",
                  "Profil bilgilerinizi yönetme",
                  "Yeteneklerinizi ekleme",
                  "Haritada esnaf bulma",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() =>
                  router.push(
                    `/auth/register?redirect=${encodeURIComponent(redirectTo)}`,
                  )
                }
                className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                <User className="w-5 h-5 mr-2" />
                Üye Ol
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() =>
                  router.push(
                    `/auth/login?redirect=${encodeURIComponent(redirectTo)}`,
                  )
                }
                variant="outline"
                className="flex-1 py-6 text-lg border-2"
                size="lg"
              >
                Zaten Hesabım Var
              </Button>
            </div>

            {/* Bilgi */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Ücretsiz kayıt olun ve tüm özelliklerden faydalanın
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
