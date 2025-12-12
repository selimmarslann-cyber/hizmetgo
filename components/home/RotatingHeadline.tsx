"use client";

import { useEffect, useState } from "react";

const phrases = ["Ev hizmetleri", "Ek kazanç", "Esnaf bulma"];

export function RotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [MotionComponents, setMotionComponents] = useState<{
    MotionDiv: any;
    MotionSpan: any;
    AnimatePresence: any;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    // Dynamically import framer-motion only on client
    import("framer-motion").then((mod) => {
      setMotionComponents({
        MotionDiv: mod.motion.div,
        MotionSpan: mod.motion.span,
        AnimatePresence: mod.AnimatePresence,
      });
    });
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // 3 saniye
    return () => clearInterval(t);
  }, []);

  // SSR'da hydration hatasını önlemek için
  const current = mounted ? phrases[index] : phrases[0];

  const LogoWrapper = mounted && MotionComponents ? MotionComponents.MotionDiv : "div";
  const LogoSpan = mounted && MotionComponents ? MotionComponents.MotionSpan : "span";
  const AnimatePresenceWrapper = mounted && MotionComponents ? MotionComponents.AnimatePresence : "div";
  const TextWrapper = mounted && MotionComponents ? MotionComponents.MotionDiv : "div";

  if (!MotionComponents) return null;
  return (
    <div className="text-center">
      {/* Logo - Turuncu ince çerçeve, beyaz iç, turuncu H - Animasyonlu */}
      <div className="flex items-center justify-center mb-8 md:mb-12">
        {mounted && MotionComponents ? (
          <LogoWrapper
          className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-white"
          style={{
            border: "2px solid #FF6000",
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          suppressHydrationWarning
        >
            <LogoSpan
            className="font-black text-base md:text-lg lg:text-xl"
            style={{ color: "#FF6000" }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            suppressHydrationWarning
          >
            H
            </LogoSpan>
          </LogoWrapper>
        ) : (
          <div
            className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-white"
            style={{
              border: "2px solid #FF6000",
            }}
          >
            <span
              className="font-black text-base md:text-lg lg:text-xl"
              style={{ color: "#FF6000" }}
            >
              H
            </span>
          </div>
        )}
      </div>

      {/* Üst satır: dönen kısım - Thumbtack style */}
      <div
        className="h-12 md:h-16 lg:h-20 overflow-hidden mb-3"
        suppressHydrationWarning
      >
        {mounted && MotionComponents ? (
          <AnimatePresenceWrapper mode="wait">
            <TextWrapper
            key={current}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
            suppressHydrationWarning
          >
            {current}
            </TextWrapper>
          </AnimatePresenceWrapper>
        ) : (
          <div
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {current}
          </div>
        )}
      </div>

      {/* Alt satır: sabit "Kolaylaştırıldı." */}
      <div>
        <p
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900"
          style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Kolaylaştırıldı.
        </p>
      </div>
    </div>
  );
}
