"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageCircle, Star } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";



// Static generation'ı engelle
export default function OrderDetailPageClient() {
  const params = useParams();
  const router = useRouter();
  const { success, error } = useToast();
  const [order, setOrder] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  const loadOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      }
    } catch (err) {
      console.error("Sipariş yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleReviewSubmit = async () => {
    if (!rating) {
      error("Lütfen puan verin");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          rating,
          comment: comment || undefined,
        }),
        credentials: "include",
      });

      if (res.ok) {
        loadOrder(); // Review'i yükle
        success("Değerlendirme gönderildi");
      } else {
        const data = await res.json();
        error(data.error || "Değerlendirme gönderilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Sipariş bulunamadı</div>
      </div>
    );
  }

  const canReview = order.status === "COMPLETED" && !order.review;

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING_CONFIRMATION: "Beklemede",
      ACCEPTED: "Kabul Edildi",
      IN_PROGRESS: "Devam Ediyor",
      COMPLETED: "Tamamlandı",
      CANCELLED_BY_CUSTOMER: "İptal Edildi",
      CANCELLED_BY_PROVIDER: "İptal Edildi",
    };
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/orders")}
          className="mb-4"
        >
          ← Siparişlerime Dön
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sipariş Detayı</CardTitle>
              <Badge variant="outline">{getStatusText(order.status)}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">İşletme</p>
                <p className="font-semibold">{order.business?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Adres</p>
                <p>{order.addressText}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Tutar</p>
                <p className="text-xl font-bold">{order.totalAmount} ₺</p>
              </div>
              {order.items && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Ürünler</p>
                  <div className="space-y-1">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.product.name} x {item.quantity}
                        </span>
                        <span>{item.totalPrice} ₺</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => router.push(`/orders/${params.id}`)}
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-2" />
                Sipariş Detayına Git
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => router.push(`/orders/${params.id}/chat`)}
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Esnaf ile Yazış
              </Button>
            </div>
          </CardContent>
        </Card>

        {canReview && (
          <Card>
            <CardHeader>
              <CardTitle>Değerlendirme Yap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm mb-2">Puan</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Yorum (Opsiyonel)</p>
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Deneyiminizi paylaşın..."
                />
              </div>
              <Button
                onClick={handleReviewSubmit}
                disabled={submittingReview || !rating}
              >
                {submittingReview ? "Gönderiliyor..." : "Değerlendirme Gönder"}
              </Button>
            </CardContent>
          </Card>
        )}

        {order.review && (
          <Card>
            <CardHeader>
              <CardTitle>Değerlendirmeniz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= order.review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {order.review.comment && (
                <p className="text-gray-700">{order.review.comment}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
