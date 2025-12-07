"use client";
/**
 * Download / App Landing Page
 *
 * Store butonları, screenshot'lar, app açıklaması
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, CheckCircle2, Download, MapPin, Smartphone, Star, Users, Wallet } from "lucide-react";


// Static generation'ı engelle
const FEATURES = [
  {
    icon: MapPin,
    title: "Haritadan Esnaf Bul",
    description:
      "Yakınındaki esnafları canlı haritada gör, anında iletişime geç",
  },
  {
    icon: Briefcase,
    title: "İş İlanı Ver",
    description: "İhtiyacın olan hizmeti tanımla, uygun esnaflardan teklif al",
  },
  {
    icon: Wallet,
    title: "Güvenli Ödeme",
    description: "Cüzdan sistemi ile güvenli ödeme, kolay çekim",
  },
  {
    icon: Star,
    title: "Değerlendirme Sistemi",
    description: "Her iş sonrası değerlendirme yap, güvenilir esnafları bul",
  },
  {
    icon: Users,
    title: "Referans Programı",
    description: "Arkadaşlarını davet et, her ikiniz de kazan",
  },
  {
    icon: CheckCircle2,
    title: "Anlık Bildirimler",
    description:
      "İş durumu, teklifler ve önemli güncellemeler için anlık bildirim",
  },
];

const SCREENSHOTS = [
  {
    title: "Ana Sayfa",
    description: "Kategoriler, öne çıkan esnaflar ve canlı işler",
    image: "/screenshots/home.png",
  },
  {
    title: "Canlı İşler",
    description: "Açık iş ilanlarını görüntüle ve teklif ver",
    image: "/screenshots/jobs.png",
  },
  {
    title: "Harita",
    description: "Yakınındaki esnafları haritada gör",
    image: "/screenshots/map.png",
  },
  {
    title: "Cüzdan",
    description: "Kazançlarını takip et ve çekim talebi oluştur",
    image: "/screenshots/wallet.png",
  },
];

export default function DownloadPageClient() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll animasyonları - Thumbtack tarzı subtle
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const orb1X = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);
  const orb1Opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.25, 0.4, 0.25],
  );
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);
  const orb2X = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const orb2Opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 0.35, 0.2],
  );
  const orb3Scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const orb3Opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.12, 0.2, 0.12],
  );

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated Background - Thumbtack Style */}
      {isMounted ? (
        <motion.div
          className="fixed inset-0 -z-10 bg-gradient-to-b from-white via-orange-50/30 to-white"
          style={{
            y: backgroundY,
          }}
        >
          {/* Floating Orbs - Subtle parallax */}
          <motion.div
            className="absolute top-32 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-orange-200/25 to-orange-100/15 blur-3xl"
            style={{
              y: orb1Y,
              x: orb1X,
              opacity: orb1Opacity,
            }}
          />
          <motion.div
            className="absolute bottom-32 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/10 blur-3xl"
            style={{
              y: orb2Y,
              x: orb2X,
              opacity: orb2Opacity,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-100/12 to-amber-100/8 blur-3xl"
            style={{
              scale: orb3Scale,
              opacity: orb3Opacity,
            }}
          />
        </motion.div>
      ) : (
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white via-orange-50/30 to-white" />
      )}

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-6 px-4 py-1.5 rounded-full text-sm font-semibold">
                <Smartphone className="w-4 h-4 mr-2 inline" />
                Mobil Uygulama
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                Mahallendeki{" "}
                <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFB347] bg-clip-text text-transparent">
                  her iş
                </span>{" "}
                için tek uygulama
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Temizlikten tamire, marketten çilingire kadar tüm esnaflar tek
                app&apos;te. İndir, hemen başla.
              </p>

              {/* Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.hizmetgo.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Google Play&apos;den İndir
                  </Button>
                </motion.a>
                <motion.a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "App Store bağlantısı yakında eklenecek. Lütfen daha sonra tekrar deneyin.",
                    );
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    App Store&apos;dan İndir
                  </Button>
                </motion.a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600 mb-1">
                    10K+
                  </div>
                  <div className="text-sm text-slate-600">Aktif Kullanıcı</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600 mb-1">
                    4.8
                  </div>
                  <div className="text-sm text-slate-600">Ortalama Puan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600 mb-1">
                    500+
                  </div>
                  <div className="text-sm text-slate-600">Aktif Esnaf</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Uygulamayı Keşfet
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Hizmetgo ile mahallendeki tüm işleri tek yerden yönet
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SCREENSHOTS.map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all">
                    <div className="aspect-[9/16] bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center p-4 z-10">
                        <Smartphone className="w-16 h-16 text-orange-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600 font-medium">
                          {screenshot.title}
                        </p>
                      </div>
                      {/* Placeholder pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,0.1),transparent_50%)]" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {screenshot.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {screenshot.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Neden Hizmetgo?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Mahallendeki tüm işler için tek uygulama
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FF7A00] to-[#FFB347]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Hemen İndir, Başla
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Mahallendeki tüm işler için tek uygulama. Ücretsiz indir, hemen
                kullanmaya başla.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.hizmetgo.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white hover:bg-slate-100 text-orange-600 px-8 py-6 rounded-2xl shadow-xl"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Google Play
                  </Button>
                </motion.a>
                <motion.a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "App Store bağlantısı yakında eklenecek. Lütfen daha sonra tekrar deneyin.",
                    );
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-6 rounded-2xl shadow-xl"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    App Store
                  </Button>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
