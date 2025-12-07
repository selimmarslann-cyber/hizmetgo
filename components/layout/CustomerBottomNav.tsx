/**
 * Customer Bottom Navigation
 *
 * Mobil için 4 ana tab navigasyonu:
 * 1. Ana sayfa
 * 2. Hizmet İste
 * 3. Çevremdekiler (Harita)
 * 4. Hesabım
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, Map, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const customerNavItems = [
  {
    key: "home",
    label: "Ana",
    icon: Home,
    href: "/",
  },
  {
    key: "request",
    label: "Hizmet İste",
    icon: Wrench,
    href: "/request",
  },
  {
    key: "map",
    label: "Çevremdekiler",
    icon: Map,
    href: "/map",
  },
  {
    key: "account",
    label: "Hesabım",
    icon: User,
    href: "/account",
  },
];

interface CustomerBottomNavProps {
  className?: string;
}

export default function CustomerBottomNav({
  className,
}: CustomerBottomNavProps) {
  const pathname = usePathname();

  // Account sayfalarında bottom nav gösterme
  if (pathname.startsWith("/account")) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200",
        "md:hidden", // Sadece mobilde göster
        className,
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto safe-area-bottom">
        {customerNavItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full",
                "transition-colors duration-200",
                isActive
                  ? "text-[#FF6000]"
                  : "text-gray-500 hover:text-gray-700",
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 mb-1 transition-transform",
                  isActive && "scale-110",
                )}
              />
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
