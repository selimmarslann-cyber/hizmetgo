"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { cn } from "@/lib/utils/cn";

const transitionMessages = [
  "Bölgendeki en iyi ustaları bulun",
  "Hızlı ve güvenilir hizmet alın",
  "Puan ve yorumlarla en iyisini seçin",
];

const rotatingPhrases = ["Ev hizmetleri", "Ek kazanç", "Esnaf bulma"];

export default function MobileDemo() {
  const [isMounted, setIsMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTransitionMessage, setShowTransitionMessage] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [typingText, setTypingText] = useState("");
  const [hasShownInitialFlow, setHasShownInitialFlow] = useState(false);
  const [rotatingPhraseIndex, setRotatingPhraseIndex] = useState(0);
  const [serviceQuery, setServiceQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const steps = useMemo(
    () => [
      {
        id: "step-1",
        pill: "1. Adım",
        title: "Arama",
        subtitle: "İhtiyacını yaz, bölgedeki ustaları bul.",
        transitionMessage: transitionMessages[0],
        screen: null as JSX.Element | null,
      },
      {
        id: "step-2",
        pill: "2. Adım",
        title: "Popüler kategoriden seç",
        subtitle:
          "Temizlik, boya, çilingir gibi kategorilerden hızlı seçim yap.",
        transitionMessage: transitionMessages[1],
        screen: (
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-medium text-slate-700">
                Popüler kategoriler
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1">
                İstanbul
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  title: "Ev Temizliği",
                  img: "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                },
                {
                  title: "Boya Badana",
                  img: "https://images.pexels.com/photos/7509752/pexels-photo-7509752.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                },
                {
                  title: "Nakliyat",
                  img: "https://images.pexels.com/photos/4569338/pexels-photo-4569338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                },
                {
                  title: "Çilingir",
                  img: "https://images.pexels.com/photos/115642/pexels-photo-115642.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                },
                {
                  title: "Elektrik",
                  img: "https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                },
                {
                  title: "Su Tesisatı",
                  img: "https://images.pexels.com/photos/8793484/pexels-photo-8793484.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                },
              ].map((cat, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 h-24"
                >
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="relative p-2.5 flex flex-col justify-end h-full">
                    <span className="text-[10px] text-white font-semibold">
                      {cat.title}
                    </span>
                    <span className="text-[9px] text-white/80">
                      Sık kullanılan
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "step-3",
        pill: "3. Adım",
        title: "Ustaları karşılaştır",
        subtitle: "Puan, yorum ve yanıt süresine göre en iyisini seç.",
        transitionMessage: transitionMessages[2],
        screen: (
          <div className="p-4 flex flex-col gap-2 overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="font-medium text-slate-700">
                Ev Temizliği • Ümraniye
              </span>
              <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-1 text-[10px] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                Uygun bulundu
              </span>
            </div>

            {[
              {
                name: "Mehmet A.",
                info: "5.0 • 245 yorum • 5 dk cevap",
                price: "1.500 ₺",
                avatar:
                  "https://images.pexels.com/photos/34967833/pexels-photo-34967833.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
              },
              {
                name: "Ali B.",
                info: "5.0 • 189 yorum • 8 dk cevap",
                price: "2.000 ₺",
                avatar:
                  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
              },
              {
                name: "Hasan C.",
                info: "5.0 • 312 yorum • 3 dk cevap",
                price: "1.800 ₺",
                avatar:
                  "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
              },
              {
                name: "Fatih D.",
                info: "5.0 • 156 yorum • 7 dk cevap",
                price: "2.200 ₺",
                avatar:
                  "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
              },
              {
                name: "Mustafa E.",
                info: "5.0 • 278 yorum • 4 dk cevap",
                price: "1.600 ₺",
                avatar:
                  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
              },
              {
                name: "Emre F.",
                info: "5.0 • 201 yorum • 6 dk cevap",
                price: "1.900 ₺",
                avatar:
                  "https://images.pexels.com/photos/1043476/pexels-photo-1043476.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
              },
            ].map((u, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 px-3 py-2.5 flex items-center justify-between gap-2 shadow-sm"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="h-8 w-8 rounded-full overflow-hidden relative bg-slate-200 flex-shrink-0">
                    <Image
                      src={u.avatar}
                      alt={u.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-slate-800">
                      {u.name}
                    </span>
                    <span className="text-[10px] text-slate-500">{u.info}</span>
                    <span className="text-[11px] font-bold text-brand-600 mt-0.5">
                      {u.price}
                    </span>
                  </div>
                </div>
                <button
                  className="rounded-full bg-brand-500 text-[10px] text-white px-3 py-1 shadow-sm flex-shrink-0 pointer-events-none"
                  disabled
                >
                  Teklif
                </button>
              </div>
            ))}
          </div>
        ),
      },
    ],
    [],
  );

  // İlk ekran: "Usta arıyorum" yazma animasyonu
  useEffect(() => {
    if (isInitialLoading && !hasShownInitialFlow) {
      const text = "Usta arıyorum";
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setTypingText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsInitialLoading(false);
            setIndex(0);
            setHasShownInitialFlow(true);
          }, 3000);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [isInitialLoading, hasShownInitialFlow]);

  // Hareketli yazı (step-1)
  useEffect(() => {
    if (hasShownInitialFlow && index === 0) {
      const t = setInterval(() => {
        setRotatingPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
      }, 3000);
      return () => clearInterval(t);
    }
  }, [hasShownInitialFlow, index]);

  // step-1,2,3 döngü
  useEffect(() => {
    if (
      hasShownInitialFlow &&
      !isInitialLoading &&
      index >= 0 &&
      index < steps.length
    ) {
      const t = setInterval(() => {
        const nextIndex = (index + 1) % steps.length;
        const nextStep = steps[nextIndex];

        if (!nextStep || !nextStep.transitionMessage) return;

        setIsTransitioning(true);
        setShowTransitionMessage(true);
        setTransitionMessage(nextStep.transitionMessage as string);

        setTimeout(() => {
          setIndex(nextIndex);
          setShowTransitionMessage(false);

          setTimeout(() => {
            setIsTransitioning(false);
          }, 500);
        }, 2000);
      }, 3500);

      return () => clearInterval(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hasShownInitialFlow, isInitialLoading]); // steps'i dependency'den çıkardık çünkü useMemo ile sabit

  const current = steps[index] ?? steps[0];

  return (
    <div
      className="flex items-center justify-center w-full pointer-events-none relative z-0"
      suppressHydrationWarning
    >
      <div className="relative w-full max-w-[240px] md:w-[240px] lg:w-[260px]">
        {/* Telefon gölgesi */}
        <div className="absolute inset-0 bg-black/0.05 rounded-[3rem] blur-sm scale-110" />
        
        {/* Telefon çerçevesi - Profesyonel */}
        <div className="relative rounded-[2.5rem] bg-slate-900 p-1.5 shadow-2xl">
          {/* Ekran */}
          <div className="aspect-[9/19.5] rounded-[2rem] bg-white overflow-hidden border-2 border-slate-800 flex flex-col">
            {/* Status bar */}
            <div className="h-10 bg-white flex items-center justify-between px-4 pt-1 flex-shrink-0">
              <span className="text-[10px] font-semibold text-slate-900">9:41</span>
              <div className="flex items-center gap-0.5">
                <div className="w-3 h-1.5 border border-slate-900 rounded-sm">
                  <div className="w-2.5 h-1 bg-slate-900 rounded-sm m-0.5" />
                </div>
                <div className="w-0.5 h-0.5 bg-slate-900 rounded-full" />
              </div>
            </div>

            {/* İç ekran - Animasyonlar burada kalacak */}
            <div className="flex-1 bg-white flex flex-col overflow-hidden min-h-0">
              {/* App Header - Profesyonel */}
              <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                    style={{
                      border: "2px solid #FF6000",
                    }}
                  >
                    <span 
                      className="text-[10px] font-black"
                      style={{ color: "#FF6000" }}
                    >
                      H
                    </span>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-900 leading-tight">Hizmetgo</p>
                    <p className="text-[7px] text-slate-500">Mahallendeki esnaflar</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {steps.map((s, i) => (
                    <span
                      key={s.id}
                      className={cn(
                        "h-1 rounded-full transition-all",
                        i === index ? "w-3 bg-brand-500" : "w-1 bg-slate-300",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 bg-white relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isInitialLoading ? (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 z-10"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {typingText}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-0.5 h-6 bg-slate-900 ml-1"
                        />
                      </h2>
                    </motion.div>
                    {typingText === "Usta arıyorum" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
                          style={{
                            border: "2px solid #FF6000",
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <motion.span
                            className="font-bold text-2xl"
                            style={{ color: "#FF6000" }}
                            animate={{
                              scale: [1, 1.15, 1],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            H
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : isTransitioning && showTransitionMessage ? (
                  <motion.div
                    key="transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 z-20"
                  >
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
                        style={{
                          border: "2px solid #FF6000",
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <motion.span
                          className="font-bold text-2xl"
                          style={{ color: "#FF6000" }}
                          animate={{
                            scale: [1, 1.15, 1],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          H
                        </motion.span>
                      </motion.div>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-sm font-medium text-slate-700 text-center px-4"
                    >
                      {transitionMessage}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                  >
                    {current.id === "step-1" ? (
                      <div className="absolute inset-0 overflow-y-auto p-5 flex flex-col items-center justify-start pt-8">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex justify-center mb-4"
                        >
                          <motion.div
                            className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
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
                          >
                            <motion.span
                              className="font-black text-2xl"
                              style={{ color: "#FF6000" }}
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              H
                            </motion.span>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-center mb-6"
                        >
                          <div className="h-7 overflow-hidden mb-1">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={rotatingPhrases[rotatingPhraseIndex]}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="text-2xl font-bold text-slate-900"
                                style={{
                                  lineHeight: 1.1,
                                  letterSpacing: "-0.02em",
                                }}
                              >
                                {rotatingPhrases[rotatingPhraseIndex]}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                          <p
                            className="text-2xl font-bold text-slate-900"
                            style={{
                              lineHeight: 1.1,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            Kolaylaştırıldı.
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="w-full max-w-[260px]"
                        >
                          <form
                            className="flex flex-col gap-2"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <div className="flex items-stretch gap-1.5 bg-white rounded-2xl border border-slate-200/80 px-3 py-2.5">
                              <input
                                type="text"
                                placeholder="İhtiyacını yaz..."
                                value={serviceQuery}
                                onChange={(e) =>
                                  setServiceQuery(e.target.value)
                                }
                                className="flex-1 bg-transparent border-none outline-none text-[11px] text-slate-900 placeholder:text-slate-500 font-normal"
                                disabled
                              />
                              <button
                                type="button"
                                disabled
                                className="px-3 py-1.5 text-[11px] font-semibold bg-brand-500 text-white rounded-xl flex items-center justify-center cursor-default"
                              >
                                <Search className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      </div>
                    ) : (
                      current.screen
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
            
            {/* Home indicator (iPhone) */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
