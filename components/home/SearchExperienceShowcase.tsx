"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FileText, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";

// Safe dynamic import for MobileDemo to prevent webpack factory errors
const MobileDemo = dynamic(() => import("./MobileDemo"), {
  ssr: false, // Client-side only
  loading: () => null, // Loading component kaldırıldı
});

const benefits = [
  {
    title: "İhtiyacını belirt",
    description:
      "Hangi hizmete ihtiyacın var? Arama yap veya kategorini seç, ihtiyacını detaylıca anlat.",
    icon: FileText,
  },
  {
    title: "Teklifler al",
    description:
      "Yakındaki esnaflardan teklifler al, fiyatları karşılaştır, yorumları oku ve en uygun olanı seç.",
    icon: MessageSquare,
  },
  {
    title: "İşini hallettir",
    description:
      "Seçtiğin esnafla iletişime geç, işini hallettir ve memnun kalırsan değerlendirme yap.",
    icon: CheckCircle2,
  },
];

export function SearchExperienceShowcase() {
  return (
    <section className="mt-12 md:mt-16 mb-16 md:mb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6 text-center"
            style={{ lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Müşteriler neden Hizmetgo&apos;yu seviyor
          </h2>
          <p className="text-base md:text-lg text-slate-600 text-center max-w-2xl leading-relaxed">
            Her gün onlarca müşteri gibi siz de evinize bakım için
            Hizmetgo&apos;ya güveniyorsunuz—ve işler planlandığı gibi gitmezse
            yanınızdayız.
          </p>
        </div>

        {/* Thumbtack Style Layout: Benefits on left, Mobile Demo on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Sol taraf - Benefit boxes - Modern SaaS Style */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {benefits.map((benefit, index) => {
              const href =
                index === 0 ? "/request" : index === 1 ? "/jobs" : "/jobs";
              const Icon = benefit.icon;
              return (
                <Link key={index} href={href} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative bg-white border border-slate-200/80 rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-lg hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer"
                    suppressHydrationWarning
                  >
                    {/* Content */}
                    <div className="relative">
                      {/* Icon and Title Row */}
                      <div className="flex items-start gap-3 mb-2.5">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors duration-200">
                            <Icon className="w-4 h-4 text-slate-700" strokeWidth={2} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-lg md:text-xl font-bold text-slate-900 mb-1.5 group-hover:text-slate-950 transition-colors"
                      style={{ lineHeight: 1.3, letterSpacing: "-0.01em" }}
                    >
                      {benefit.title}
                    </h3>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-3 pl-12">
                      {benefit.description}
                    </p>
                      
                      {/* Arrow indicator - Subtle */}
                      <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-brand-600 transition-colors text-xs font-medium pl-12">
                        <span>Daha fazla bilgi</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Sağ taraf - Mobil animasyon */}
          <div className="flex items-center justify-center lg:justify-end w-full">
            <MobileDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
