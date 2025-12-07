"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MapPin, TrendingUp, Users } from "lucide-react";



// Static generation'ı engelle
interface TopEarner {
  user_id: string;
  name: string;
  total_earnings: number;
  network_gmv: number;
  referral_rank: number;
}

interface RegionStats {
  region_type: string;
  region_code: string;
  total_gmv: number;
  total_commissions: number;
}

export default function AdminReferralOverviewPageClient() {
  const [topEarners, setTopEarners] = useState<TopEarner[]>([]);
  const [topGMV, setTopGMV] = useState<TopEarner[]>([]);
  const [regionStats, setRegionStats] = useState<RegionStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch("/api/admin/referral-stats", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTopEarners(data.topEarners || []);
        setTopGMV(data.topGMV || []);
        setRegionStats(data.regionStats || []);
      }
    } catch (err) {
      console.error("Admin verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Referral Sistem Özeti</h1>
        <p className="text-gray-600 mt-2">
          En çok kazananlar ve bölge istatistikleri
        </p>
      </div>

      {/* Top Earners */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            En Çok Kazanan 20 Kullanıcı
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topEarners.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Henüz veri yok</div>
          ) : (
            <div className="space-y-2">
              {topEarners.map((earner, idx) => (
                <div
                  key={earner.user_id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium">{earner.name}</p>
                      <p className="text-xs text-gray-500">
                        Rank: {earner.referral_rank} | GMV:{" "}
                        {formatCurrency(earner.network_gmv)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {formatCurrency(earner.total_earnings)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top GMV */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            En Yüksek Network GMV
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topGMV.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Henüz veri yok</div>
          ) : (
            <div className="space-y-2">
              {topGMV.map((user, idx) => (
                <div
                  key={user.user_id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">
                        Rank: {user.referral_rank}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">
                      {formatCurrency(user.network_gmv)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Region Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Bölge Bazında Toplam Ciro
          </CardTitle>
        </CardHeader>
        <CardContent>
          {regionStats.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Henüz veri yok</div>
          ) : (
            <div className="space-y-2">
              {regionStats.map((stat, idx) => (
                <div
                  key={`${stat.region_type}-${stat.region_code}`}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium capitalize">{stat.region_type}</p>
                    <p className="text-xs text-gray-500">{stat.region_code}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {formatCurrency(stat.total_gmv)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Komisyon: {formatCurrency(stat.total_commissions)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
