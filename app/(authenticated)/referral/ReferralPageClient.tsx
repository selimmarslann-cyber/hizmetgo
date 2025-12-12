"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Coins,
  Copy,
  LinkIcon,
  MessageCircle,
  Share2,
  TrendingUp,
  Twitter,
  Users,
} from "lucide-react";
import AnimatedLoadingLogo from "@/components/ui/AnimatedLoadingLogo";
import {
  getReferralOverview,
  getReferralRewards,
} from "@/lib/api/referral";
import type {
  ReferralOverview,
  ReferralReward,
  ReferralRewardsResponse,
} from "@/lib/types/domain";

export default function ReferralPageClient() {
  const [overview, setOverview] = useState<ReferralOverview | null>(null);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [pagination, setPagination] =
    useState<ReferralRewardsResponse["pagination"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const [page, setPage] = useState(1);
  const [levelFilter, setLevelFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const loadRewards = useCallback(async () => {
    const data = await getReferralRewards({
      page,
      pageSize: 20,
      level: levelFilter !== "all" ? Number(levelFilter) : undefined,
      dateFrom: dateFrom ? new Date(dateFrom) : undefined,
      dateTo: dateTo ? new Date(dateTo) : undefined,
    });
    setRewards(data.rewards);
    setPagination(data.pagination);
  }, [page, levelFilter, dateFrom, dateTo]);

  const loadOverview = useCallback(async () => {
    setLoading(true);
    const data = await getReferralOverview();
    setOverview(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    loadRewards();
  }, [loadRewards]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AnimatedLoadingLogo />
      </div>
    );
  }

  if (!overview) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Referans Kazançların</h1>

        {/* Kazanç Tablosu */}
        <Card>
          <CardHeader>
            <CardTitle>Kazanç Geçmişi</CardTitle>
          </CardHeader>
          <CardContent>
            {rewards.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Henüz kazanç yok
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Tarih</th>
                      <th className="text-left py-3 px-4">Sipariş</th>
                      <th className="text-left py-3 px-4">Seviye</th>
                      <th className="text-right py-3 px-4">Kazanç</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewards.map((reward) => {
                      // 🔒 BUILD-SAFE: order.business opsiyonel
                      const orderAny =
                        reward.order as unknown as
                          | { business?: { name?: string } }
                          | undefined;

                      return (
                        <tr
                          key={reward.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-sm">
                            {new Date(reward.createdAt).toLocaleDateString(
                              "tr-TR",
                            )}
                          </td>

                          <td className="py-3 px-4 text-sm">
                            <Link
                              href={`/orders/${reward.orderId}`}
                              className="text-blue-600 hover:underline"
                            >
                              #{reward.orderId.slice(0, 8)}
                            </Link>

                            {orderAny?.business?.name && (
                              <span className="text-gray-500 ml-2">
                                – {orderAny.business.name}
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                reward.level === 1
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {reward.level}. Seviye
                            </Badge>
                          </td>

                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            +{reward.amount.toFixed(2)} ₺
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Önceki
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((p) =>
                      Math.min(pagination.totalPages, p + 1),
                    )
                  }
                  disabled={page >= pagination.totalPages}
                >
                  Sonraki
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
