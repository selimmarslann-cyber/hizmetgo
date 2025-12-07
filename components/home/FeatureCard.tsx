"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: string;
  isActive?: boolean;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  color = "bg-[#FF6000]",
  isActive = false,
}: FeatureCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card
          className={cn(
            "h-full cursor-pointer border-2 transition-all duration-200 overflow-hidden group bg-white",
            isActive
              ? "border-[#FF6000] bg-[#FF6000] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              : "border-gray-200 hover:border-[#FF6000]/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.02)]",
          )}
        >
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div
                className={cn(
                  "w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-md transition-colors",
                  isActive ? "bg-white" : color,
                )}
              >
                <Icon
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10",
                    isActive ? "text-[#FF6000]" : "text-white",
                  )}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3
                  className={cn(
                    "text-xl md:text-2xl font-bold leading-tight",
                    isActive ? "text-white" : "text-gray-900",
                  )}
                >
                  {title}
                </h3>
                <p
                  className={cn(
                    "text-sm md:text-base leading-relaxed",
                    isActive ? "text-white/90" : "text-gray-600",
                  )}
                >
                  {description}
                </p>
              </div>

              {/* Arrow */}
              <div
                className={cn(
                  "flex items-center gap-2 font-bold transition-colors",
                  isActive ? "text-white" : "text-[#FF6000]",
                )}
              >
                <span className="text-sm">Keşfet</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
