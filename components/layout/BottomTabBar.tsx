"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export type TabItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

interface BottomTabBarProps {
  items: TabItem[];
  className?: string;
}

export default function BottomTabBar({ items, className }: BottomTabBarProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border",
        "safe-area-bottom pb-safe",
        className,
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full",
                "transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className={cn("mb-1", isActive && "scale-110")}>
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive && "font-semibold",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
