"use client";

import { useState, useEffect } from "react";
import { Search, MessageSquare, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "İhtiyacını Belirt",
    description: "Hangi hizmete ihtiyacın var? Arama yap veya kategorini seç, ihtiyacını detaylıca anlat.",
    icon: Search,
  },
  {
    number: 2,
    title: "Teklifler Al",
    description: "Yakındaki esnaflardan teklifler al, fiyatları karşılaştır, yorumları oku ve en uygun olanı seç.",
    icon: MessageSquare,
  },
  {
    number: 3,
    title: "İşini Hallettir",
    description: "Seçtiğin esnafla iletişime geç, işini hallettir ve memnun kalırsan değerlendirme yap.",
    icon: CheckCircle2,
  },
];

export default function HowItWorks() {
  const [mounted, setMounted] = useState(false);
  const [MotionDiv, setMotionDiv] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Dynamically import framer-motion only on client
    import("framer-motion").then((mod) => {
      setMotionDiv(mod.motion.div);
    });
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hizmetgo ile ihtiyacını karşılamak çok kolay. Sadece 3 basit adım.
          </p>
        </div>

        {/* Adımlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const content = (
              <>
                {/* Icon Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center shadow-lg">
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </>
            );

            if (!mounted || !MotionDiv) {
              return (
                <div key={step.number} className="flex flex-col items-center text-center">
                  {content}
                </div>
              );
            }

            return (
              <MotionDiv
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
                suppressHydrationWarning
              >
                {content}
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}

