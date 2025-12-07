"use client";

import { motion } from "framer-motion";
import { HOME_POPULAR_CATEGORIES } from "@/lib/data/home-popular-categories";
import { CategoryCard } from "@/components/home/CategoryCard";

export function PopularCategoriesSection() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {HOME_POPULAR_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            suppressHydrationWarning
          >
            <CategoryCard category={category} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Default export for backward compatibility
export default PopularCategoriesSection;
