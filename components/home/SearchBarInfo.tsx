"use client";

import { useState, useEffect } from "react";
import { Sparkles, Search, FileText, CheckCircle2, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Kategori Ara",
    description: "Elektrik, temizlik, boya gibi kategorilerden birini seç veya arama yap",
  },
  {
    icon: Sparkles,
    title: "AI İlan Oluştur",
    description: "Yapay zeka, ihtiyacını otomatik olarak detaylı bir ilana dönüştürür",
  },
  {
    icon: FileText,
    title: "İlanı Onayla",
    description: "Oluşturulan ilanı kontrol et, gerekirse düzenle ve onayla",
  },
  {
    icon: MessageSquare,
    title: "Teklifler Al",
    description: "Yakındaki esnaflardan teklifler gelmeye başlar, en uygun olanı seç",
  },
];

export default function SearchBarInfo() {
  const [mounted, setMounted] = useState(false);
  const [MotionDiv, setMotionDiv] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Dynamically import framer-motion only on client
    import("framer-motion").then((mod) => {
      setMotionDiv(mod.motion.div);
    });
  }, []);

  const content = (
    <div className="bg-white rounded-2xl p-6 md:p-8">
      {/* Açıklama */}
      <div className="text-center mb-6">
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
          Hizmetgo ile ihtiyacını karşılamak çok kolay. Yapay zeka destekli ilan oluşturma ile sadece birkaç adımda teklifler al.
        </p>
      </div>

      {/* Adımlar - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const stepContent = (
            <>
                {/* Icon Circle */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:border-brand-300 group-hover:bg-brand-50">
                    <Icon className="w-6 h-6 text-slate-700 group-hover:text-brand-600 transition-colors" strokeWidth={2} />
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-sm md:text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </>
          );

          if (!mounted || !MotionDiv) {
            return (
              <div key={index} className="flex flex-col items-center text-center group">
                {stepContent}
              </div>
            );
          }

          return (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
              suppressHydrationWarning
            >
              {stepContent}
            </MotionDiv>
          );
        })}
      </div>

      {/* Örnek Kategori */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Örnek:</span>
          </span>
          <span className="font-medium text-slate-700">
            "Elektrik tamiri" ara → AI ilan oluştur → Onayla → Teklifler al
          </span>
        </div>
      </div>
    </div>
  );

  if (!mounted || !MotionDiv) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-4 md:mb-6">
        {content}
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-4 md:mb-6"
      suppressHydrationWarning
    >
      {content}
    </MotionDiv>
  );
}

