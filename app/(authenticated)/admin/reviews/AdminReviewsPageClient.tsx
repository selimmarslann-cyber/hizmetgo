"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, CheckCircle2, Star } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";

export default function AdminReviewsPageClient() {
  const { success, error } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error("Reviews load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        success("Yorum silindi");
        loadReviews();
      } else {
        const data = await res.json();
        error(data.error || "Yorum silinemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    }
  };

  const handleApproveReview = async (reviewId: string) => {
    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}/approve`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        success("Yorum onaylandı");
        loadReviews();
      } else {
        const data = await res.json();
        error(data.error || "Yorum onaylanamadı");
      }
    } catch (err) {
      error("Bir hata oluştu");
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.comment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.business?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      review.moderationStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Yorumlar</h2>
          <p className="text-gray-600 mt-1">
            Tüm yorumları görüntüleyin, onaylayın veya silin
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Yorum, kullanıcı veya işletme ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                Tümü
              </Button>
              <Button
                variant={filterStatus === "PENDING" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("PENDING")}
              >
                Bekleyen
              </Button>
              <Button
                variant={filterStatus === "APPROVED" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("APPROVED")}
              >
                Onaylanan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Yorum Listesi ({filteredReviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge
                        variant={
                          review.moderationStatus === "APPROVED"
                            ? "default"
                            : review.moderationStatus === "REJECTED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {review.moderationStatus === "APPROVED"
                          ? "Onaylandı"
                          : review.moderationStatus === "REJECTED"
                            ? "Reddedildi"
                            : "Beklemede"}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">
                          {review.reviewer?.name || "Anonim"}
                        </span>
                        {" → "}
                        <span className="font-semibold">
                          {review.business?.name || "İşletme"}
                        </span>
                      </p>
                      {review.comment && (
                        <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-md">
                          {review.comment}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleString("tr-TR")}
                        {review.approvedAt &&
                          ` • Onaylandı: ${new Date(review.approvedAt).toLocaleString("tr-TR")}`}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {review.moderationStatus === "PENDING" && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleApproveReview(review.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Onayla
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Sil
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredReviews.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Yorum bulunamadı
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

