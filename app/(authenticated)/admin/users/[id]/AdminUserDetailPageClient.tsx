"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Users } from "lucide-react";



// Static generation'ı engelle
export default function AdminUserDetailPageClient() {
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [referralStats, setReferralStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/users/${params.id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setReferralStats(data.referralStats);
      }
    } catch (err) {
      console.error("Kullanıcı verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Kullanıcı bulunamadı</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kullanıcı Detayı</h1>
          <p className="text-gray-600">
            {user.name} - {user.email}
          </p>
        </div>

        {/* Referral Bilgileri */}
        {referralStats && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Referral Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Referral Kodu</p>
                    <Badge variant="outline" className="font-mono text-base">
                      {referralStats.referralCode || "-"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Çekilebilir Bakiye
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {referralStats.balance.toFixed(2)} ₺
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-4">Toplam Kazanç</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">1. Seviye</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {referralStats.level1Earnings.toFixed(2)} ₺
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {referralStats.level1Count} kullanıcı
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">2. Seviye</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {referralStats.level2Earnings.toFixed(2)} ₺
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {referralStats.level2Count} kullanıcı
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Toplam</span>
                      <span className="text-2xl font-bold">
                        {referralStats.totalEarnings.toFixed(2)} ₺
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
