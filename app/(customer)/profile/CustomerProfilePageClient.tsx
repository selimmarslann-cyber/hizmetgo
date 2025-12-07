"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedLoadingLogo from "@/components/ui/AnimatedLoadingLogo";
import { Bell, CheckCircle2, ChevronRight, CreditCard, HelpCircle, Info, LogOut, MapPin, User } from "lucide-react";


// Static generation'ı engelle
export default function CustomerProfilePageClient() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkBusiness = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/businesses/owner/${userId}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setHasBusiness(!!data);
      }
    } catch (err) {
      // İşletme yok
    }
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        checkBusiness(data.user.id);
      }
    } catch (err) {
      console.error("Kullanıcı verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [checkBusiness]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/auth/login");
      router.refresh();
    } catch (err) {
      console.error("Çıkış hatası:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AnimatedLoadingLogo />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Profil</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* User Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    E-posta Doğrulanmış
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          <Card>
            <CardContent className="p-0">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => alert("Yakında eklenecek")}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>Adreslerim</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Yakında
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => alert("Yakında eklenecek")}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span>Ödeme Yöntemlerim</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Yakında
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => alert("Yakında eklenecek")}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span>Bildirim Tercihleri</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Yakında
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </CardContent>
          </Card>

          {hasBusiness && (
            <Card>
              <CardContent className="p-0">
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  onClick={() => router.push("/business/jobs")}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>Esnaf Paneline Geç</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => alert("Yakında eklenecek")}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span>Yardım & Destek</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Yakında
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => alert("Yakında eklenecek")}
              >
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-gray-400" />
                  <span>Hakkında / KVKK / Sözleşmeler</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Yakında
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span>Çıkış Yap</span>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
