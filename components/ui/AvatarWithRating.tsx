"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AvatarWithRatingProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  rating?: number | null;
  reviewCount?: number | null;
  size?: "sm" | "md" | "lg" | "xl";
  showRating?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    avatar: "w-8 h-8",
    text: "text-xs",
    star: "w-3 h-3",
    badge: "text-[10px] px-1 py-0.5",
  },
  md: {
    avatar: "w-10 h-10",
    text: "text-xs",
    star: "w-3.5 h-3.5",
    badge: "text-[10px] px-1.5 py-0.5",
  },
  lg: {
    avatar: "w-12 h-12",
    text: "text-sm",
    star: "w-4 h-4",
    badge: "text-xs px-2 py-1",
  },
  xl: {
    avatar: "w-16 h-16",
    text: "text-base",
    star: "w-5 h-5",
    badge: "text-sm px-2 py-1",
  },
};

export default function AvatarWithRating({
  src,
  alt = "Avatar",
  fallback,
  rating,
  reviewCount,
  size = "md",
  showRating = true,
  className,
}: AvatarWithRatingProps) {
  const sizes = sizeClasses[size];
  const hasRating = rating !== null && rating !== undefined && rating > 0;
  const hasReviews = reviewCount !== null && reviewCount !== undefined && reviewCount > 0;

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {/* Avatar */}
      <Avatar className={cn(sizes.avatar, "border-2 border-white shadow-sm")}>
        <AvatarImage src={src || undefined} alt={alt} />
        <AvatarFallback className="bg-slate-200 text-slate-700 font-semibold">
          {fallback || alt?.charAt(0)?.toUpperCase() || "?"}
        </AvatarFallback>
      </Avatar>

      {/* Rating Badge - Avatar'ın altında */}
      {showRating && (hasRating || hasReviews) && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white rounded-full px-1.5 py-0.5 shadow-md border border-slate-200 whitespace-nowrap">
          {hasRating && (
            <>
              <Star className={cn(sizes.star, "fill-yellow-400 text-yellow-400")} />
              <span className={cn(sizes.text, "font-bold text-slate-900")}>
                {rating.toFixed(1)}
              </span>
            </>
          )}
          {hasReviews && (
            <span className={cn(sizes.text, "text-slate-600 ml-0.5")}>
              ({reviewCount})
            </span>
          )}
        </div>
      )}
    </div>
  );
}

