"use client";
import { ReactNode, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Wallet,
  Settings,
  Gift,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils/cn";

interface AccountLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    key: "dashboard",
    label: "Genel Bakış",
    icon: LayoutDashboard,
    href: "/account",
  },
  {
    key: "profile",
    label: "Profilim",
    icon: User,
    href: "/account/profile",
  },
  {
    key: "wallet",
    label: "Cüzdanım",
    icon: Wallet,
    href: "/account/wallet",
  },
  {
    key: "settings",
    label: "Ayarlar",
    icon: Settings,
    href: "/account/settings",
  },
  {
    key: "referral",
    label: "Referans ile Kazan",
    icon: Gift,
    href: "/account/referral",
  },
];

export default function AccountLayout({ children }: AccountLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/auth/login?redirect=" + encodeURIComponent(pathname));
      }
    } catch (err) {
      router.push("/auth/login?redirect=" + encodeURIComponent(pathname));
    } finally {
      setLoading(false);
    }
  }, [router, pathname]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Çıkış hatası:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Hesabım</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white border-r">
            <div className="flex-1 overflow-y-auto">
              {/* User Info */}
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback>
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {user?.name || "Kullanıcı"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || user?.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <nav className="p-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/account" &&
                      pathname.startsWith(item.href));

                  return (
                    <Link key={item.key} href={item.href}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-gray-700 hover:bg-gray-100",
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t mt-auto">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Çıkış Yap
                </Button>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          {mobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 z-50 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="w-64 h-full bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-semibold">Menü</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user?.avatarUrl} />
                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {user?.name || "Kullanıcı"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || user?.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <nav className="p-4 space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/account" &&
                        pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-gray-700 hover:bg-gray-100",
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-4 border-t mt-auto">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Çıkış Yap
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 pb-8">
            <div className="max-w-6xl mx-auto p-4 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
