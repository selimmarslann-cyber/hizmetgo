"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell,
  ShoppingCart,
  Menu,
  X,
  Home,
  Map,
  Briefcase,
  Wallet,
  User,
  Zap,
  Bike,
  Gauge,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import SupportHelpButton from "@/components/support/SupportHelpButton";
import NotificationBadge from "@/components/notifications/NotificationBadge";
import CategoryBar from "@/components/layout/CategoryBar";

const CATEGORIES = [
  { name: "Elektrik", keyword: "elektrik" },
  { name: "Temizlik", keyword: "temizlik" },
  { name: "Tesisat", keyword: "tesisat" },
  { name: "Boya badana", keyword: "boya badana" },
  { name: "Nakliyat", keyword: "nakliyat" },
  { name: "Beyaz eşya", keyword: "beyaz eşya" },
  { name: "Özel ders", keyword: "özel ders" },
  { name: "Evcil hayvan", keyword: "evcil hayvan" },
  { name: "Bahçıvan", keyword: "bahçıvan" },
  { name: "Marangoz", keyword: "marangoz" },
  { name: "Klima", keyword: "klima" },
  { name: "Cam balkon", keyword: "cam balkon" },
  { name: "Asansör", keyword: "asansör" },
  { name: "Güvenlik", keyword: "güvenlik" },
  { name: "Fotoğrafçı", keyword: "fotoğrafçı" },
  { name: "Nakliye", keyword: "nakliye" },
];

interface AppHeaderProps {
  showNotifications?: boolean;
  showCart?: boolean;
  cartCount?: number;
  isPublic?: boolean;
}

const customerTabs = [
  {
    key: "home",
    label: "Ana",
    icon: Home,
    href: "/",
  },
  {
    key: "map",
    label: "Yakınımdakiler",
    icon: Map,
    href: "/map",
  },
  {
    key: "jobs",
    label: "İşlerim",
    icon: Briefcase,
    href: "/jobs",
  },
  {
    key: "wallet",
    label: "Kazancım",
    icon: Wallet,
    href: "/account/wallet",
  },
  {
    key: "profile",
    label: "Profil",
    icon: User,
    href: "/account/profile",
  },
];

export default function AppHeader({
  showNotifications = false,
  showCart = false,
  cartCount = 0,
  isPublic = false,
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Kullanıcı bilgisini yükle
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const isPartnerPage = pathname === "/partner";

  // Beyaz arka planlı sayfalar - header turuncu olacak
  const whiteBackgroundPages = [
    "/auth",
    "/account",
    "/jobs",
    "/map",
    "/profile",
    "/wallet",
    "/business/register",
    "/cart",
  ];
  const hasWhiteBackground =
    whiteBackgroundPages.some((page) => pathname.startsWith(page)) &&
    pathname !== "/partner";

  // CategoryBar için active category - useSearchParams kullan (SSR ve client tutarlı)
  const activeCategory = searchParams.get("q") || "";

  const handleCategoryClick = (keyword: string) => {
    router.push(`/request?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <header
      className={`w-full transition-all ${
        isPartnerPage
          ? "bg-slate-400/90 backdrop-blur-md shadow-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst menü - Ortalanmış */}
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo + Brand - Premium Professional Design */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <span
              className="text-2xl md:text-3xl font-extrabold leading-none tracking-tight"
              style={{
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
                letterSpacing: "-0.04em",
              }}
              suppressHydrationWarning
            >
              <span className="text-slate-800">hizmet</span>
              <span
                className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 bg-clip-text text-transparent"
                style={{
                  fontWeight: 900,
                }}
              >
                go
              </span>
            </span>
          </Link>

          {/* Center Navigation - Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {customerTabs.map((tab) => {
              const isActive =
                pathname === tab.href ||
                (tab.href !== "/" && pathname.startsWith(tab.href + "/"));
              const Icon = tab.icon;
              return (
                <Link key={tab.key} href={tab.href}>
                  <span
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      "hover:bg-slate-100",
                      isActive
                        ? "text-brand-600 bg-brand-50 font-semibold"
                        : "text-slate-700 hover:text-slate-900",
                    )}
                    suppressHydrationWarning
                  >
                    <Icon className="w-4 h-4" />
                    <span suppressHydrationWarning>{tab.label}</span>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Actions - Thumbtack Style */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Destek Butonu - Çevrimiçi Kulaklık */}
            <SupportHelpButton />

            {/* Giriş yapmış kullanıcı için profil */}
            {!isLoading && isAuthenticated && user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/account">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar className="w-8 h-8 border border-slate-200">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback className="bg-slate-100 text-slate-700">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden xl:block">
                      <p className="text-sm font-medium text-slate-900">
                        {user.name}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ) : !isLoading && isPublic ? (
              /* Desktop CTAs - Thumbtack Style */
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/auth/login?redirect=/account"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-colors"
                >
                  Kayıt Ol
                </Link>
                <Link
                  href="/business/register"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-colors"
                >
                  Esnaf Kayıt
                </Link>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push("/partner")}
                  className="px-4 py-2 text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white"
                >
                  Ortak Ol
                </Button>
              </div>
            ) : null}

            {/* Mobile Menu Button - Thumbtack Style */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-slate-700 hover:bg-slate-100 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            {/* Notifications & Cart - Thumbtack Style */}
            {showNotifications && (
              <NotificationBadge className="text-slate-700 hover:bg-slate-100 rounded-md" />
            )}

            {showCart && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative text-slate-700 hover:bg-slate-100 rounded-md"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Menu - Thumbtack Style */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white py-4 space-y-1"
          >
            {/* Main Tabs */}
            {customerTabs.map((tab) => {
              const isActive =
                pathname === tab.href ||
                (tab.href !== "/" && pathname.startsWith(tab.href + "/"));

              return (
                <Link key={tab.key} href={tab.href}>
                  <span
                    className={cn(
                      "block w-full px-4 py-3 text-sm font-medium text-slate-700 rounded-md transition-all duration-200",
                      "hover:bg-slate-50 hover:text-slate-900",
                      isActive && "text-brand-600 bg-brand-50 font-semibold",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    suppressHydrationWarning
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}

            {/* Mobile: Giriş yapmış kullanıcı */}
            {isAuthenticated && user ? (
              <div className="pt-4 border-t border-slate-200">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 rounded-md transition-all duration-200 hover:bg-slate-50"
                >
                  <Avatar className="w-8 h-8 border border-slate-200">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback className="bg-slate-100 text-slate-700">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">Hesabım</p>
                  </div>
                </Link>
              </div>
            ) : (
              /* Public CTAs - Thumbtack Style */
              isPublic && (
                <div className="pt-4 border-t border-slate-200 space-y-1">
                  <Link
                    href="/auth/login?redirect=/account"
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-sm font-medium text-slate-700 rounded-md transition-all duration-200 hover:bg-slate-50"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-sm font-medium text-slate-700 rounded-md transition-all duration-200 hover:bg-slate-50"
                  >
                    Kayıt Ol
                  </Link>
                  <Link
                    href="/business/register"
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-sm font-medium text-slate-700 rounded-md transition-all duration-200 hover:bg-slate-50"
                  >
                    Esnaf Kayıt
                  </Link>
                  <Button
                    onClick={() => {
                      router.push("/partner");
                      setMobileMenuOpen(false);
                    }}
                    variant="default"
                    size="sm"
                    className="w-full mt-2 bg-brand-500 hover:bg-brand-600 text-white"
                  >
                    Ortak Ol
                  </Button>
                </div>
              )
            )}
          </motion.div>
        )}
      </div>

      {/* Category Bar */}
      <CategoryBar />
    </header>
  );
}
