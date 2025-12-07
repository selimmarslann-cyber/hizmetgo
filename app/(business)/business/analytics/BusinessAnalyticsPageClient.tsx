"use client";
/**
 * Business Analytics Dashboard (Comprehensive)
 *
 * Interactive charts, trend analysis, customer insights, performance metrics
 */

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  BarChart3,
  Clock,
  DollarSign,
  Package,
  RefreshCw,
  ShoppingBag,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import RevenueChart from "@/components/analytics/RevenueChart";
import OrderStatusChart from "@/components/analytics/OrderStatusChart";
import RatingDistributionChart from "@/components/analytics/RatingDistributionChart";
import type { AnalyticsDashboardData } from "@/lib/analytics/types";

// Static generation'ı engelle - client component olduğu için
export default function BusinessAnalyticsPageClient() {
  const { error } = useToast();
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);

      const now = new Date();
      const startDate = new Date(now);

      if (dateRange === "7d") {
        startDate.setDate(startDate.getDate() - 7);
      } else if (dateRange === "30d") {
        startDate.setDate(startDate.getDate() - 30);
      } else {
        startDate.setDate(startDate.getDate() - 90);
      }

      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: now.toISOString(),
      });

      const res = await fetch(`/api/business/analytics?${params.toString()}`, {
        credentials: "include",
      });

      if (res.ok) {
        const analyticsData = await res.json();
        setData(analyticsData);
      } else {
        error("Analitik veriler yüklenemedi");
      }
    } catch (err) {
      console.error("Analytics load error:", err);
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [error, dateRange]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6000]"></div>
          <p className="mt-4 text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Veri bulunamadı</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analitik & Raporlar
            </h1>
            <p className="text-gray-600 mt-2">
              İşletmenizin performansını takip edin
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) =>
                setDateRange(e.target.value as "7d" | "30d" | "90d")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6000]"
            >
              <option value="7d">Son 7 Gün</option>
              <option value="30d">Son 30 Gün</option>
              <option value="90d">Son 90 Gün</option>
            </select>
            <button
              onClick={loadAnalytics}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Yenile"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Today's Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Bugünkü Gelir
              </CardTitle>
              <DollarSign className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.revenue.today.toFixed(2)} ₺
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                {data.revenue.trend > 0 ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-500">
                      +{data.revenue.trend.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3 h-3 text-red-500" />
                    <span className="text-red-500">
                      {data.revenue.trend.toFixed(1)}%
                    </span>
                  </>
                )}
                <span>geçen aya göre</span>
              </div>
            </CardContent>
          </Card>

          {/* This Month Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Bu Ay Gelir
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.revenue.thisMonth.toFixed(2)} ₺
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Toplam: {data.revenue.total.toFixed(2)} ₺
              </div>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Bu Ay Sipariş
              </CardTitle>
              <ShoppingBag className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.orders.thisMonth}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                {data.orders.trend > 0 ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-500">
                      +{data.orders.trend.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3 h-3 text-red-500" />
                    <span className="text-red-500">
                      {data.orders.trend.toFixed(1)}%
                    </span>
                  </>
                )}
                <span>geçen aya göre</span>
              </div>
            </CardContent>
          </Card>

          {/* Rating */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ortalama Puan
              </CardTitle>
              <Star className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.ratings.average.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                {data.ratings.trend > 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : data.ratings.trend < 0 ? (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                ) : null}
                <span>{data.ratings.count} değerlendirme</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">
                Müşteriler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{data.customers.total}</div>
              <div className="text-xs text-gray-500 mt-1">
                {data.customers.new} yeni, {data.customers.returning} dönen
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">
                Dönüşüm Oranı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {data.conversionRate.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {data.orders.completed}/{data.orders.total} tamamlandı
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">
                Yanıt Süresi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {data.averageResponseTime < 60
                  ? `${data.averageResponseTime.toFixed(0)} dk`
                  : `${(data.averageResponseTime / 60).toFixed(1)} saat`}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">
                Tamamlanma Oranı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {data.completionRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">
                İade Oranı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {data.refundRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts & Details */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="revenue">Gelir Analizi</TabsTrigger>
            <TabsTrigger value="products">En Çok Satan Ürünler</TabsTrigger>
            <TabsTrigger value="performance">Performans Metrikleri</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Gelir & Sipariş Trendi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart data={data.timeSeries} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Status Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sipariş Durumu</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderStatusChart
                    completed={data.orders.completed}
                    cancelled={data.orders.cancelled}
                    pending={data.orders.pending}
                  />
                </CardContent>
              </Card>

              {/* Rating Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Değerlendirme Dağılımı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RatingDistributionChart
                    distribution={data.ratings.distribution}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gelir Trendi</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart data={data.timeSeries} />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Bugün</p>
                    <p className="text-2xl font-bold text-[#FF6000]">
                      {data.revenue.today.toFixed(2)} ₺
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Bu Hafta</p>
                    <p className="text-2xl font-bold text-[#FF6000]">
                      {data.revenue.thisWeek.toFixed(2)} ₺
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Bu Ay</p>
                    <p className="text-2xl font-bold text-[#FF6000]">
                      {data.revenue.thisMonth.toFixed(2)} ₺
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Toplam</p>
                    <p className="text-2xl font-bold text-[#FF6000]">
                      {data.revenue.total.toFixed(2)} ₺
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">En Çok Satan Ürünler</CardTitle>
              </CardHeader>
              <CardContent>
                {data.topProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Henüz satış verisi yok</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.topProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#FF6000]/10 flex items-center justify-center text-[#FF6000] font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              {product.sales} satış
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-[#FF6000]">
                            {product.revenue.toFixed(2)} ₺
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Müşteri Metrikleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Toplam Müşteri
                    </span>
                    <span className="font-semibold">
                      {data.customers.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yeni Müşteri</span>
                    <span className="font-semibold">{data.customers.new}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dönen Müşteri</span>
                    <span className="font-semibold">
                      {data.customers.returning}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Ortalama Sipariş Değeri
                    </span>
                    <span className="font-semibold">
                      {data.customers.averageOrderValue.toFixed(2)} ₺
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Performans Metrikleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dönüşüm Oranı</span>
                    <span className="font-semibold">
                      {data.conversionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Tamamlanma Oranı
                    </span>
                    <span className="font-semibold">
                      {data.completionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Ortalama Yanıt Süresi
                    </span>
                    <span className="font-semibold">
                      {data.averageResponseTime < 60
                        ? `${data.averageResponseTime.toFixed(0)} dk`
                        : `${(data.averageResponseTime / 60).toFixed(1)} saat`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">İade Oranı</span>
                    <span className="font-semibold">
                      {data.refundRate.toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
