"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  CheckCircle2,
  MapPin,
  Store,
  Menu,
  ArrowRight,
} from "lucide-react";

export default function BusinessNotRegisteredPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const loadUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/auth/business-login");
      }
    } catch (err) {
      router.push("/auth/business-login");
    }
  }, [router]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Arka Plan - Esnafa Uygun Fotoğraf */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/90" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-2 border-white/20">
            <CardContent className="p-8 md:p-12">
              {/* İkon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl">
                  <Store className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Başlık */}
              <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Henüz Esnaf Değilsiniz
              </h1>

              <p className="text-lg text-center text-gray-700 mb-8">
                Dükkanınızı Hizmetgo'e kaydedin ve mahallendeki müşterilerle
                buluşun. Ücretsiz kayıt, kolay menü yönetimi ve anında
                görünürlük.
              </p>

              {/* Özellikler */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    icon: MapPin,
                    title: "Haritada Konum",
                    description: "Dükkanınızı haritada işaretleyin",
                  },
                  {
                    icon: Menu,
                    title: "Menü Yönetimi",
                    description: "Yemeksepeti tarzı kolay menü sistemi",
                  },
                  {
                    icon: Briefcase,
                    title: "Anında Görünür",
                    description: "Kayıt olduktan sonra hemen görünür olun",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Avantajlar */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8 border border-primary/20">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Esnaf Kaydının Avantajları
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Ücretsiz kayıt ve kullanım",
                    "Otomatik menü ve ürün sistemi",
                    "Haritada görünürlük",
                    "Müşteri yorumları ve puanlama",
                    "Sipariş yönetim paneli",
                    "Kazanç takibi",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Butonları */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => router.push("/map")}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Esnaf Olarak Kayıt Ol
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={() => router.push("/account")}
                  variant="outline"
                  className="flex-1 py-6 text-lg"
                  size="lg"
                >
                  Kullanıcı Paneline Dön
                </Button>
              </div>

              {/* Bilgi */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Sorularınız mı var?{" "}
                <Link
                  href="/partner"
                  className="text-primary hover:underline font-semibold"
                >
                  Ortaklık sayfasını ziyaret edin
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
