"use client";

import { useState, useEffect } from "react";
import { HOME_POPULAR_CATEGORIES } from "@/lib/data/home-popular-categories";
import { CategoryCard } from "@/components/home/CategoryCard";

export function PopularCategoriesSection() {
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
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {HOME_POPULAR_CATEGORIES.map((category, index) => {
          const content = <CategoryCard category={category} />;
          
          if (!mounted || !MotionDiv) {
            return (
              <div key={category.id} className="w-full">
                {content}
              </div>
            );
          }

          return (
            <MotionDiv
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            suppressHydrationWarning
            className="w-full"
          >
              {content}
            </MotionDiv>
          );
        })}
      </div>
    </div>
  );
}

// Default export for backward compatibility
export default PopularCategoriesSection;
