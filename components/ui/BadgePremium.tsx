/**
 * Premium Badge Component
 *
 * Tutarlı badge tasarımı için premium badge sistemi.
 */

import { cn } from "@/lib/utils/cn";
import {
  CheckCircle2,
  Zap,
  Star,
  Sparkles,
  Shield,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type BadgeType = "verified" | "fast" | "topRated" | "new" | "trending";

interface BadgePremiumProps {
  type: BadgeType;
  className?: string;
  size?: "sm" | "md" | "lg";
  showTrend?: boolean; // Rating trend göstermek için
  trendDirection?: "up" | "down" | null; // Trend yönü
}

const badgeConfig: Record<
  BadgeType,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    bgColor: string;
    textColor: string;
    borderColor: string;
  }
> = {
  verified: {
    label: "Onaylı Esnaf",
    icon: Shield,
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  fast: {
    label: "Hızlı Yanıt",
    icon: Zap,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  topRated: {
    label: "Yüksek Puan",
    icon: Star,
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
  new: {
    label: "Yeni",
    icon: Sparkles,
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
  trending: {
    label: "Popüler",
    icon: CheckCircle2,
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
};

export default function BadgePremium({
  type,
  className,
  size = "md",
  showTrend = false,
  trendDirection = null,
}: BadgePremiumProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center font-semibold rounded-full border",
        config.bgColor,
        config.textColor,
        config.borderColor,
        sizeClasses[size],
        className,
      )}
    >
      <Icon className={iconSizeClasses[size]} />
      <span>{config.label}</span>
      {showTrend && trendDirection && (
        <>
          {trendDirection === "up" ? (
            <TrendingUp
              className={cn(iconSizeClasses[size], "text-green-600")}
            />
          ) : (
            <TrendingDown
              className={cn(iconSizeClasses[size], "text-red-600")}
            />
          )}
        </>
      )}
    </div>
  );
}
