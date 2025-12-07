"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Coins,
  Copy,
  TrendingUp,
  Share2,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function CustomerWalletPage() {
  const router = useRouter();
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch("/api/referral/overview", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOverview(data);
      }
    } catch (err) {
      console.error("Cüzdan verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Kopyalama hatası:", err);
    }
  };

  const shareWhatsApp = () => {
    if (!overview) return;
    const text = encodeURIComponent(
      "Hizmetgo'e katıl, kazan! Bu link ile kayıt ol: " + overview.referralLink,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white">
        <div className="max-w-md mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-4"
            >
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto shadow-xl">
                <Coins className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Cüzdanım</h1>
            <p className="text-white/90 text-sm">
              Kazancını takip et, arkadaşlarını davet et
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6 -mt-6">
        {/* Üst Kartlar */}
        <div className="grid grid-cols-1 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="border-2 border-amber-200 shadow-lg bg-gradient-to-br from-white to-amber-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Kullanılabilir Bakiyen
                </CardTitle>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Coins className="h-5 w-5 text-amber-600" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {overview?.currentBalance.toFixed(2) || "0.00"} ₺
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Çekilebilir bakiye
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="border-2 border-emerald-200 shadow-lg bg-gradient-to-br from-white to-emerald-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Referral Kazancın
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {overview?.totalEarnings.toFixed(2) || "0.00"} ₺
                </div>
                <Link href="/referral">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs text-emerald-600 hover:text-emerald-700"
                  >
                    Detayları gör →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Bu Ay Referral Kazancın
                </CardTitle>
                <Sparkles className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {overview?.monthlyEarnings.toFixed(2) || "0.00"} ₺
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Bu takvim ayındaki kazanç
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Referral Blok */}
        {overview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-amber-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
                <CardTitle className="text-lg font-bold text-slate-900">
                  Arkadaşın sipariş verdikçe kazanç elde et
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Referral Kodun</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={overview.currentReferralCode}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50 font-mono font-semibold text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(overview.currentReferralCode)
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Referral Linkin</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={overview.referralLink}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(overview.referralLink)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  variant="default"
                  className="w-full"
                  onClick={shareWhatsApp}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp'ta Paylaş
                </Button>

                {/* 3 Adımlı Açıklama */}
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-gray-700 pt-0.5">
                      Linkini arkadaşlarınla paylaş
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-gray-700 pt-0.5">
                      Onlar bu uygulamadan sipariş verdikçe
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-gray-700 pt-0.5">
                      Platform komisyonundan pay kazan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Alt Buton */}
        <Link href="/referral">
          <Button variant="outline" className="w-full">
            Referral kazanç geçmişini gör
          </Button>
        </Link>
      </div>
    </div>
  );
}
