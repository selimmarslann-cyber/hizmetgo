"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Gift, Plus, TrendingUp, Wallet } from "lucide-react";
import AnimatedLoadingLogo from "@/components/ui/AnimatedLoadingLogo";


// Static generation'ı engelle
export default function AccountDashboardPageClient() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    balance: 0,
    totalJobs: 0,
    referralEarnings: 0,
    activeJobs: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      // Kullanıcı bilgisi
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      // Referral overview
      const referralRes = await fetch("/api/referral/overview", {
        credentials: "include",
      });
      if (referralRes.ok) {
        const referralData = await referralRes.json();
        setStats((prev) => ({
          ...prev,
          balance: parseFloat(referralData.currentBalance || 0),
          referralEarnings: parseFloat(referralData.totalEarnings || 0),
        }));
      }

      // Job stats (mock - gerçek endpoint eklenebilir)
      // const jobsRes = await fetch('/api/jobs/my-stats', { credentials: 'include' })
      // if (jobsRes.ok) {
      //   const jobsData = await jobsRes.json()
      //   setStats(prev => ({
      //     ...prev,
      //     totalJobs: jobsData.total || 0,
      //     activeJobs: jobsData.active || 0,
      //   }))
      // }
    } catch (err) {
      console.error("Veri yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AnimatedLoadingLogo />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Genel Bakış</h1>
        <p className="text-gray-600 mt-2">Hesabınızın özet bilgileri</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cüzdan Bakiyen
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.balance.toFixed(2)} ₺
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Çekilebilir bakiye
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam İşlerim
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeJobs} aktif iş
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Referral Kazancı
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.referralEarnings.toFixed(2)} ₺
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Toplam kazanç
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Referans Programı
              </CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link href="/account/referral">
                <Button variant="ghost" size="sm" className="mt-2">
                  Detayları gör <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/account/wallet">
              <Button variant="outline" className="w-full justify-start">
                <Wallet className="w-4 h-4 mr-2" />
                Cüzdanıma Para Yükle
              </Button>
            </Link>
            <Link href="/account/referral">
              <Button variant="outline" className="w-full justify-start">
                <Gift className="w-4 h-4 mr-2" />
                Referans Linkimi Paylaş
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="w-4 h-4 mr-2" />
                İşlerimi Görüntüle
              </Button>
            </Link>
            <Link href="/request">
              <Button className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Yeni İş Talebi Oluştur
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-sm text-gray-500 py-8">
              Henüz işlem geçmişi yok
            </div>
            <Link href="/account/wallet">
              <Button variant="ghost" className="w-full">
                Tüm işlemleri gör <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
