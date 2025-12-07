"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Users } from "lucide-react";


// Static generation'ı engelle
export default function AdminReferralsPageClient() {
  const [stats, setStats] = useState<any>(null);
  const [topReferrers, setTopReferrers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch("/api/admin/referrals", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setTopReferrers(data.topReferrers);
      }
    } catch (err) {
      console.error("Admin referral data yüklenemedi:", err);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Referral Yönetimi</h1>
          <p className="text-gray-600">Sistem geneli referral istatistikleri</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam Dağıtılan
                </CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalDistributed.toFixed(2)} ₺
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam Referrer
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalReferrers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam Referans
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalReferrals}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Top Referrers */}
        <Card>
          <CardHeader>
            <CardTitle>Top 20 Referrer</CardTitle>
          </CardHeader>
          <CardContent>
            {topReferrers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Henüz referrer yok
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Sıra
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Kullanıcı
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Referans Kodu
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Toplam Kazanç
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        1. Seviye
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        2. Seviye
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Bakiye
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topReferrers.map((referrer: any, index: number) => (
                      <tr
                        key={referrer.userId}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-medium">
                          #{index + 1}
                        </td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/admin/users/${referrer.userId}`}
                            className="text-blue-600 hover:underline"
                          >
                            {referrer.userName}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="font-mono">
                            {referrer.referralCode}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-semibold">
                          {referrer.totalEarnings.toFixed(2)} ₺
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          {referrer.level1Count}
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          {referrer.level2Count}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-green-600">
                          {referrer.balance.toFixed(2)} ₺
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
