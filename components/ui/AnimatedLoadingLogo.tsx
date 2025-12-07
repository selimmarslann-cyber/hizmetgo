"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const phrases = ["Yükleniyor...", "Veriler getiriliyor...", "Hazırlanıyor..."];

interface AnimatedLoadingLogoProps {
  className?: string;
}

export default function AnimatedLoadingLogo({
  className = "",
}: AnimatedLoadingLogoProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2000); // Her 2 saniyede bir değiş
    return () => clearInterval(t);
  }, []);

  // SSR'da hydration hatasını önlemek için
  if (!mounted) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-20 ${className}`}
        suppressHydrationWarning
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-500 flex items-center justify-center">
            <span className="text-white font-bold text-2xl md:text-3xl">H</span>
          </div>
        </div>
        <div className="h-12 md:h-16 overflow-hidden">
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 text-center">
            {phrases[0]}
          </div>
        </div>
      </div>
    );
  }

  const current = phrases[index];

  return (
    <div
      className={`flex flex-col items-center justify-center py-20 ${className}`}
      suppressHydrationWarning
    >
      {/* Logo - Animasyonlu */}
      <motion.div
        className="flex items-center justify-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        suppressHydrationWarning
      >
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-500 flex items-center justify-center"
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
          <motion.span
            className="text-white font-bold text-2xl md:text-3xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            suppressHydrationWarning
          >
            H
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Animasyonlu Yazı */}
      <div className="h-12 md:h-16 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 text-center"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
            suppressHydrationWarning
          >
            {current}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
