"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  History,
} from "lucide-react";
import { useHizmetgoStore } from "@/lib/store/useHizmetgoStore";
import { useToast } from "@/lib/hooks/useToast";
import EarningsChart from "@/components/wallet/EarningsChart";


// Static generation'ı engelle
interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "payment" | "reward";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export default function AccountWalletPageClient() {
  const router = useRouter();
  const { currentUser, earnings, jobs } = useHizmetgoStore();
  const { success, error } = useToast();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Earnings breakdown
  const userEarnings = earnings.find(
    (e) => e.userId === (currentUser?.id || user?.id),
  );
  const jobEarnings = userEarnings?.jobEarnings || 0;
  const referralEarnings = userEarnings?.referralEarnings || 0;
  const totalEarnings = userEarnings?.totalEarnings || 0;

  // This month's earnings (mock calculation)
  const thisMonthJobEarnings = jobEarnings * 0.3;
  const thisMonthReferralEarnings = referralEarnings * 0.3;
  const thisMonthTotal = thisMonthJobEarnings + thisMonthReferralEarnings;

  // SSR-safe: chart data'yı client-side'da oluştur
  const [chartData, setChartData] = useState<
    Array<{ date: string; amount: number }>
  >([]);

  useEffect(() => {
    // Deterministik chart data (last 7 days) - Math.random() kullanmıyor
    const baseAmount = thisMonthTotal > 0 ? thisMonthTotal / 7 : 300;
    const data = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      // Deterministik pattern: baseAmount'tan başlayıp hafif artış gösteren bir trend
      // Her gün için 0.8 + 0.05 * i ile çarpıyoruz (0.8'den 1.15'e kadar)
      return {
        date: date.toISOString(),
        amount: Math.round(baseAmount * (0.8 + 0.05 * i)),
      };
    });
    setChartData(data);
  }, [thisMonthTotal]);

  // Deposit form
  const [depositAmount, setDepositAmount] = useState("");
  const [depositing, setDepositing] = useState(false);

  // Withdraw form
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [iban, setIban] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);

  const loadWalletData = useCallback(async () => {
    try {
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      const res = await fetch("/api/referral/overview", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBalance(parseFloat(data.currentBalance || 0));
      }

      // Mock transactions - Deterministik tarihler (Date.now() kullanmıyor)
      const now = new Date();
      const oneDayAgo = new Date(now);
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      const twoDaysAgo = new Date(now);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const threeDaysAgo = new Date(now);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      setTransactions([
        {
          id: "tx-1",
          type: "deposit",
          amount: 500,
          description: "Cüzdana yükleme",
          date: now.toISOString(),
          status: "completed",
        },
        {
          id: "tx-2",
          type: "payment",
          amount: -150,
          description: "Hizmet ödemesi - Temizlik",
          date: oneDayAgo.toISOString(),
          status: "completed",
        },
        {
          id: "tx-3",
          type: "reward",
          amount: 25.5,
          description: "Referral kazancı",
          date: twoDaysAgo.toISOString(),
          status: "completed",
        },
        {
          id: "tx-4",
          type: "withdraw",
          amount: -200,
          description: "Para çekme - IBAN: TR12****5678",
          date: threeDaysAgo.toISOString(),
          status: "pending",
        },
      ]);
    } catch (err) {
      console.error("Cüzdan verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        router.push(
          `/auth/required?page=Kazancım&redirect=${encodeURIComponent("/account/wallet")}`,
        );
        return;
      }
      loadWalletData();
    } catch (err) {
      router.push(
        `/auth/required?page=Kazancım&redirect=${encodeURIComponent("/account/wallet")}`,
      );
    }
  }, [router, loadWalletData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);

    if (amount <= 0) {
      error("Lütfen geçerli bir tutar girin");
      return;
    }

    setDepositing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setBalance((prev) => prev + amount);
      // Transaction ID - event handler içinde olduğu için Date.now() kullanılabilir
      const newTransaction: Transaction = {
        id: `tx-${Date.now()}`,
        type: "deposit",
        amount,
        description: "Cüzdana yükleme",
        date: new Date().toISOString(),
        status: "completed",
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      setDepositAmount("");
      success("Para yükleme başarılı!");
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setDepositing(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);

    if (amount <= 0) {
      error("Lütfen geçerli bir tutar girin");
      return;
    }

    if (amount > balance) {
      error("Yetersiz bakiye");
      return;
    }

    if (!iban || iban.length < 15) {
      error("Lütfen geçerli bir IBAN girin");
      return;
    }

    setWithdrawing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setBalance((prev) => prev - amount);
      // Transaction ID - event handler içinde olduğu için Date.now() kullanılabilir
      const newTransaction: Transaction = {
        id: `tx-${Date.now()}`,
        type: "withdraw",
        amount: -amount,
        description: `Para çekme - IBAN: ${iban.slice(0, 4)}****${iban.slice(-4)}`,
        date: new Date().toISOString(),
        status: "pending",
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      setWithdrawAmount("");
      setIban("");
      success("Para çekme talebi oluşturuldu!");
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setWithdrawing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı";
      case "pending":
        return "Beklemede";
      case "failed":
        return "Başarısız";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6000]"></div>
          <p className="mt-4 text-slate-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const isVendor = currentUser?.role === "vendor" || user?.role === "vendor";

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Kazancım</h1>
          <p className="text-slate-600">
            Bakiyenizi yönetin ve kazançlarınızı takip edin
          </p>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-[#FF6000]/10 via-[#FF6000]/5 to-white border-2 border-[#FF6000]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Cüzdan Bakiyen</p>
                  <p className="text-4xl font-bold text-slate-900">
                    {balance.toFixed(2)} ₺
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#FF6000] flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Earnings Breakdown - For Vendors */}
        {isVendor && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2 border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="w-5 h-5 text-[#FF6000]" />
                    İş Kazançlarım
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Bu ay:</p>
                    <p className="text-2xl font-bold text-[#FF6000]">
                      {thisMonthJobEarnings.toFixed(2)} ₺
                    </p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-slate-600">Toplam:</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {jobEarnings.toFixed(2)} ₺
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-[#FF6000]" />
                    Referans Kazancım
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Bu ay:</p>
                    <p className="text-2xl font-bold text-[#FF6000]">
                      {thisMonthReferralEarnings.toFixed(2)} ₺
                    </p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-slate-600">Toplam:</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {referralEarnings.toFixed(2)} ₺
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Toplam Kazanç
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Bu ay:</p>
                    <p className="text-2xl font-bold text-green-700">
                      {thisMonthTotal.toFixed(2)} ₺
                    </p>
                  </div>
                  <div className="pt-3 border-t border-green-200">
                    <p className="text-sm text-slate-600">Toplam:</p>
                    <p className="text-xl font-semibold text-green-700">
                      {totalEarnings.toFixed(2)} ₺
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Earnings Chart */}
        {isVendor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <EarningsChart
              data={chartData}
              title="Son 7 Günlük Kazanç Trendi"
            />
          </motion.div>
        )}

        {/* Deposit & Withdraw Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownCircle className="w-5 h-5 text-green-600" />
                  Para Yükle
                </CardTitle>
                <CardDescription>Cüzdanınıza para yükleyin</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDeposit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Yükleme Tutarı (₺)</Label>
                    <Input
                      id="depositAmount"
                      type="number"
                      step="0.01"
                      min="1"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      required
                      className="h-12"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={depositing}
                  >
                    {depositing ? (
                      "Yükleniyor..."
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Cüzdana Yükle
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpCircle className="w-5 h-5 text-blue-600" />
                  Para Çek
                </CardTitle>
                <CardDescription>
                  Bakiyenizi banka hesabınıza aktarın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdraw} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Çekilecek Tutar (₺)</Label>
                    <Input
                      id="withdrawAmount"
                      type="number"
                      step="0.01"
                      min="1"
                      max={balance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      required
                      className="h-12"
                    />
                    <p className="text-xs text-slate-500">
                      Maksimum: {balance.toFixed(2)} ₺
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="iban">IBAN</Label>
                    <Input
                      id="iban"
                      value={iban}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\s/g, "")
                          .toUpperCase();
                        setIban(value);
                      }}
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      maxLength={34}
                      required
                      className="h-12"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full"
                    disabled={withdrawing || balance <= 0}
                  >
                    {withdrawing ? "İşleniyor..." : "Para Çekme Talebi Oluştur"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transaction History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                İşlem Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center text-slate-500 py-12">
                  <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Henüz işlem geçmişi yok</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 text-sm font-semibold text-slate-700">
                          İşlem
                        </th>
                        <th className="pb-3 text-sm font-semibold text-slate-700">
                          Açıklama
                        </th>
                        <th className="pb-3 text-sm font-semibold text-slate-700">
                          Tarih
                        </th>
                        <th className="pb-3 text-sm font-semibold text-slate-700">
                          Durum
                        </th>
                        <th className="pb-3 text-sm font-semibold text-slate-700 text-right">
                          Tutar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === "deposit" ||
                                transaction.type === "reward"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {transaction.type === "deposit" ? (
                                <ArrowDownCircle className="w-5 h-5" />
                              ) : transaction.type === "withdraw" ? (
                                <ArrowUpCircle className="w-5 h-5" />
                              ) : transaction.type === "reward" ? (
                                <TrendingUp className="w-5 h-5" />
                              ) : (
                                <CreditCard className="w-5 h-5" />
                              )}
                            </div>
                          </td>
                          <td className="py-4">
                            <p className="font-medium text-slate-900">
                              {transaction.description}
                            </p>
                          </td>
                          <td className="py-4">
                            <p className="text-sm text-slate-600">
                              {new Date(transaction.date).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(transaction.status)}
                              <span
                                className={`text-sm ${
                                  transaction.status === "completed"
                                    ? "text-green-600"
                                    : transaction.status === "pending"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {getStatusText(transaction.status)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <p
                              className={`font-bold ${
                                transaction.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : ""}
                              {transaction.amount.toFixed(2)} ₺
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
