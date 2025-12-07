/**
 * List Skeleton Component
 *
 * Loading durumları için tutarlı skeleton görünümü.
 */

import { cn } from "@/lib/utils/cn";

interface ListSkeletonProps {
  count?: number;
  className?: string;
  itemHeight?: "sm" | "md" | "lg";
}

export default function ListSkeleton({
  count = 3,
  className,
  itemHeight = "md",
}: ListSkeletonProps) {
  const heightClasses = {
    sm: "h-16",
    md: "h-24",
    lg: "h-32",
  };

  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "bg-gray-200 rounded-lg animate-pulse",
            heightClasses[itemHeight],
          )}
        />
      ))}
    </div>
  );
}
