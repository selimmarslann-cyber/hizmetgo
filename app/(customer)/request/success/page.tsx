"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Home,
} from "lucide-react";

// Renk array'i - component scope'ta sabit
const CONFETTI_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFE66D",
  "#FF6B9D",
  "#C44569",
] as const;

// Konfeti parçacık tipi
interface ConfettiParticle {
  left: number;
  colorIndex: number;
  xOffset: number;
  duration: number;
  delay: number;
}

export default function RequestSuccessPage() {
  const router = useRouter();
  const [confettiActive, setConfettiActive] = useState(true);
  const [windowHeight, setWindowHeight] = useState(800); // Default height
  const [confettiParticles, setConfettiParticles] = useState<
    ConfettiParticle[]
  >([]);

  useEffect(() => {
    // Window height'ı client-side'da al
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }

    // Konfeti animasyonunu 3 saniye sonra durdur
    const timer = setTimeout(() => setConfettiActive(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Konfeti parçacıklarını sadece bir kere üret (client-side'da)
  useEffect(() => {
    if (!confettiActive || typeof window === "undefined" || windowHeight === 0)
      return;

    // Parçacıkları üret - tüm Math.random() çağrıları burada
    const particles: ConfettiParticle[] = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      colorIndex: Math.floor(Math.random() * CONFETTI_COLORS.length),
      xOffset: (Math.random() - 0.5) * 200,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.5,
    }));

    setConfettiParticles(particles);
  }, [confettiActive, windowHeight]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Konfeti Efekti */}
      {confettiActive && confettiParticles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: "-10px",
                backgroundColor: CONFETTI_COLORS[particle.colorIndex],
              }}
              animate={{
                y: [0, windowHeight + 100],
                x: [0, particle.xOffset],
                rotate: [0, 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-emerald-200 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Başarı İkonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 relative"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                  <CheckCircle2 className="w-14 h-14 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Başlık */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black text-slate-900 mb-3"
            >
              Başvurunuz alındı!
            </motion.h1>

            {/* Açıklama */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 mb-6 leading-relaxed"
            >
              Mahallenizdeki esnaflar, talebinizi inceleyip en kısa sürede
              teklif verecek.
              <br />
              <span className="text-sm text-slate-500 mt-2 block">
                Gelen teklifleri &apos;İşlerim&apos; sekmesinden görebilirsiniz.
              </span>
            </motion.p>

            {/* Bilgi Badge'leri */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 justify-center mb-6"
            >
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Başarıyla gönderildi
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                Esnaflara iletildi
              </Badge>
            </motion.div>

            {/* Butonlar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <Button
                onClick={() => router.push("/")}
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Home className="w-5 h-5 mr-2" />
                Anasayfaya Dön
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/jobs")}
                size="lg"
                className="w-full border-2 hover:bg-slate-50"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                İşlerimi Gör
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
