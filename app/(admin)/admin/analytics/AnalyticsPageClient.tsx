"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  TrendingUp,
  Users,
  Loader2,
  AlertCircle,
  DollarSign,
} from "lucide-react";



// Static generation'ı engelle
interface LeadAnalytics {
  period: {
    startDate: string;
    endDate: string;
  };
  overview: {
    totalLeads: number;
    totalListings: number;
    totalRevenue: number;
    netRevenue: number;
    totalRefundAmount: number;
    avgLeadFee: number;
    contactRate: number;
    completionRate: number;
    refundRate: number;
    cancellationRate: number;
  };
  categoryBreakdown: Array<{
    name: string;
    slug: string;
    level: number;
    count: number;
    totalRevenue: number;
  }>;
  refundReasons: Record<string, number>;
  dailyTrend: Array<{
    date: string;
    leads: number;
    revenue: number;
    refunds: number;
  }>;
}

export default function AnalyticsPageClient() {
  const [analytics, setAnalytics] = useState<LeadAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics/leads", {
          credentials: "include",
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Analytics yüklenemedi");
        }

        const data = await res.json();
        setAnalytics(data);
      } catch (err: any) {
        setError(err.message || "Analytics yüklenemedi");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto mb-4" />
          <p className="text-slate-600">Analytics yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Hata</h2>
          <p className="text-slate-600">{error || "Analytics yüklenemedi"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Lead Analytics
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Lead</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.overview.totalLeads}
              </div>
              <p className="text-xs text-muted-foreground">
                Toplam satın alınan lead
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Gelir</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.overview.netRevenue} TL
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics.overview.totalRevenue} TL -{" "}
                {analytics.overview.totalRefundAmount} TL iade
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                İletişim Oranı
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.overview.contactRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                24 saat içinde iletişim kuran
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tamamlanma Oranı
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.overview.completionRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                İş tamamlanan lead'ler
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Kategori Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Kategori Bazlı Analiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Kategori</th>
                    <th className="text-right p-2">Level</th>
                    <th className="text-right p-2">İlan Sayısı</th>
                    <th className="text-right p-2">Toplam Gelir</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.categoryBreakdown.map((cat) => (
                    <tr key={cat.slug} className="border-b">
                      <td className="p-2">{cat.name}</td>
                      <td className="text-right p-2">L{cat.level}</td>
                      <td className="text-right p-2">{cat.count}</td>
                      <td className="text-right p-2 font-semibold">
                        {cat.totalRevenue} TL
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* İade Nedenleri */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>İade Nedenleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(analytics.refundReasons).map(
                ([reason, count]) => (
                  <div
                    key={reason}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded"
                  >
                    <span className="text-sm font-medium">{reason}</span>
                    <span className="text-sm text-slate-600">{count} adet</span>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Günlük Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Günlük Trend (Son 30 Gün)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Tarih</th>
                    <th className="text-right p-2">Lead Sayısı</th>
                    <th className="text-right p-2">Gelir</th>
                    <th className="text-right p-2">İade</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.dailyTrend.slice(-7).map((day) => (
                    <tr key={day.date} className="border-b">
                      <td className="p-2">
                        {new Date(day.date).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="text-right p-2">{day.leads}</td>
                      <td className="text-right p-2">{day.revenue} TL</td>
                      <td className="text-right p-2 text-red-600">
                        {day.refunds}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
