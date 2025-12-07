"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Award, CheckCircle2, Copy, Gift, MapPin, Share2, Target, TrendingUp, Users } from "lucide-react";

interface ReferralOverview {
  currentReferralCode: string;
  referralLink: string;
  totalReferralEarnings: number;
  totalRegionEarnings: number;
  totalEarnings: number;
  monthlyReferralEarnings: number;
  monthlyRegionEarnings: number;
  monthlyEarnings: number;
  level1Count: number;
  level2Count: number;
  level3Count: number;
  level4Count: number;
  level5Count: number;
  level1Earnings: number;
  level2Earnings: number;
  level3Earnings: number;
  level4Earnings: number;
  level5Earnings: number;
  currentBalance: number;
  currentRank: number;
  currentGMV: number;
  nextRankThreshold: number;
  nextRankName: string;
  remainingForNext: number;
}

interface InvitedUser {
  id: string;
  name: string;
  registeredAt: string;
  status: "active" | "inactive";
  totalGMV: number;
  earnings: number;
}

const RANK_NAMES = [
  "Normal Kullanıcı",
  "Mahalle Lideri",
  "İlçe Yöneticisi",
  "İl Yöneticisi",
  "Ülke Yöneticisi",
];

const RANK_BONUSES = [0, 0.5, 1.0, 1.5, 2.0];
const LEVEL_BASE_PERCENTAGES = [0, 10, 6, 5, 3, 1]; // L0 (yok), L1, L2, L3, L4, L5

export default function AccountReferralPage() {
  const router = useRouter();
  const [overview, setOverview] = useState<ReferralOverview | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  const loadReferralData = useCallback(async () => {
    try {
      const [overviewRes, invitedRes] = await Promise.all([
        fetch("/api/referral/overview", { credentials: "include" }),
        fetch("/api/referral/invited-users", { credentials: "include" }),
      ]);

      if (overviewRes.ok) {
        const data = await overviewRes.json();
        if (data.error) {
          console.error("Referral overview error:", data.error);
        } else {
          // Referral kodu yoksa bir daha dene
          if (!data.currentReferralCode) {
            console.warn("Referral kodu bulunamadı, yeniden deneniyor...");
            // Kısa bir gecikme sonrası tekrar dene
            setTimeout(() => {
              loadReferralData();
            }, 1000);
            return;
          }
          setOverview(data);
        }
      } else {
        const errorData = await overviewRes.json().catch(() => ({}));
        console.error(
          "Referral overview failed:",
          overviewRes.status,
          errorData,
        );
      }

      if (invitedRes.ok) {
        const data = await invitedRes.json();
        setInvitedUsers(data.users || []);
      }
    } catch (err) {
      console.error("Referral verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReferralData();
  }, [loadReferralData]);

  const copyToClipboard = async (text: string, type: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Kopyalama hatası:", err);
    }
  };

  const shareWhatsApp = () => {
    if (!overview) return;
    const text = encodeURIComponent(
      `Hizmetgo'e katıl, mahalle ekonomisini büyüt, ömür boyu kazan! Bu link ile kayıt ol: ${overview.referralLink}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toFixed(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-lg font-semibold text-gray-700">
          Veri yüklenemedi
        </div>
        <button
          onClick={() => {
            setLoading(true);
            loadReferralData();
          }}
          className="px-4 py-2 bg-[#FF6000] text-white rounded-lg hover:bg-[#FF7000] transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  const totalInvited =
    overview.level1Count +
    overview.level2Count +
    overview.level3Count +
    overview.level4Count +
    overview.level5Count;
  const activeUsers = invitedUsers.filter((u) => u.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white rounded-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Arkadaşlarını Davet Et, Mahalle Ekonomisini Büyüt
              </h1>
              <p className="text-white/90 mt-2">
                Arkadaşların sipariş verdikçe, platform komisyonundan{" "}
                <strong>ömür boyu</strong> kazan. Downline ciro büyüdükçe rank
                atla, bonus kazan!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rank Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Mevcut Rank: {RANK_NAMES[overview.currentRank]}
            </CardTitle>
            <CardDescription>
              Network cirona göre otomatik belirlenir
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Toplam Network Ciro (GMV)
                </span>
                <span className="text-lg font-bold">
                  {formatCurrency(overview.currentGMV)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (overview.currentGMV / Math.max(overview.nextRankThreshold, 1)) * 100)}%`,
                  }}
                />
              </div>
            </div>
            {overview.currentRank < 4 && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">
                    Bir Sonraki Rank: {overview.nextRankName}
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  {formatCurrency(overview.remainingForNext)} kaldı
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Rank atladığında bonus: +
                  {RANK_BONUSES[overview.currentRank + 1]}%
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-4 border-t">
              {RANK_NAMES.map((name, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded text-center text-xs ${
                    idx === overview.currentRank
                      ? "bg-primary text-primary-foreground font-bold"
                      : idx < overview.currentRank
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <div className="font-semibold">{name}</div>
                  <div className="text-xs mt-1">
                    {RANK_BONUSES[idx] > 0 ? `+${RANK_BONUSES[idx]}%` : "Base"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral Code & Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Referans Kodun</CardTitle>
            <CardDescription>
              Kodunu veya linkini paylaş, kazanmaya başla
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Referans Kodu
              </Label>
              <div className="flex gap-2">
                <Input
                  value={overview.currentReferralCode}
                  readOnly
                  className="font-mono font-bold text-lg"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(overview.currentReferralCode, "code")
                  }
                >
                  {copied === "code" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Kopyalandı!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Kopyala
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Davet Linki
              </Label>
              <div className="flex gap-2">
                <Input
                  value={overview.referralLink}
                  readOnly
                  className="text-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(overview.referralLink, "link")}
                >
                  {copied === "link" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Kopyalandı!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Kopyala
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={shareWhatsApp} className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                WhatsApp'ta Paylaş
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Referral Kazancı
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(overview.totalReferralEarnings)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">L1-L5 toplam</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Bölge Kazancı
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(overview.totalRegionEarnings)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Bölge yöneticisi payları
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Davet Edilen
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInvited}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {activeUsers} aktif kullanıcı
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cüzdan Bakiyen
              </CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(overview.currentBalance)}
              </div>
              <Link href="/account/wallet">
                <Button variant="ghost" size="sm" className="mt-2 text-xs">
                  Cüzdanı gör <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Level Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Level Bazlı Kazançlar</CardTitle>
            <CardDescription>
              Her level'den ne kadar kazandığını gör
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((level) => {
                const count = overview[
                  `level${level}Count` as keyof ReferralOverview
                ] as number;
                const earnings = overview[
                  `level${level}Earnings` as keyof ReferralOverview
                ] as number;
                const basePct = LEVEL_BASE_PERCENTAGES[level];

                return (
                  <div
                    key={level}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">L{level}</Badge>
                        <span className="text-sm font-medium">
                          {count} kişi
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Base: {basePct}% + Rank bonus
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {formatCurrency(earnings)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invited Users List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Davet Edilen Kullanıcılar (L1)</CardTitle>
            <CardDescription>Direkt davet ettiğin arkadaşların</CardDescription>
          </CardHeader>
          <CardContent>
            {invitedUsers.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Henüz kimseyi davet etmedin
              </div>
            ) : (
              <div className="space-y-3">
                {invitedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(user.registeredAt).toLocaleDateString(
                            "tr-TR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Toplam ciro: {formatCurrency(user.totalGMV)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        +{formatCurrency(user.earnings)}
                      </p>
                      <p
                        className={`text-xs ${
                          user.status === "active"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {user.status === "active" ? "Aktif" : "Pasif"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Nasıl Çalışır?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Kodu Paylaş</h3>
                  <p className="text-sm text-gray-600">
                    Referans kodunu veya linkini arkadaşlarınla paylaş.
                    WhatsApp, e-posta veya sosyal medya üzerinden.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Arkadaşın Sipariş Versin
                  </h3>
                  <p className="text-sm text-gray-600">
                    Arkadaşın linkinle kayıt olsun ve Hizmetgo'den sipariş
                    versin. Her siparişte platform komisyonundan pay kazan.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ömür Boyu Kazan</h3>
                  <p className="text-sm text-gray-600">
                    Arkadaşın ve onun davet ettikleri (L2-L5) sipariş verdikçe
                    sen de kazan. Network ciro büyüdükçe rank atla, bonus kazan!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <Link href="/account/wallet">
                <Button variant="outline" className="w-full">
                  Cüzdanımı Görüntüle <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
