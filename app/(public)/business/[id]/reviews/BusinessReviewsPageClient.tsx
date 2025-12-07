"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";


// Static generation'ı engelle
export default function BusinessReviewsPageClient() {
  const params = useParams();
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBusiness = useCallback(async () => {
    try {
      const res = await fetch(`/api/businesses/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setBusiness(data);
      }
    } catch (err) {
      console.error("İşletme yüklenemedi:", err);
    }
  }, [params.id]);

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/businesses/${params.id}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Yorumlar yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadBusiness();
    loadReviews();
  }, [loadBusiness, loadReviews]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {business?.name} - Tüm Yorumlar
            </h1>
            {business && (
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {business.avgRating.toFixed(1)}
                </span>
                <span className="text-gray-500">
                  ({business.reviewCount} değerlendirme)
                </span>
              </div>
            )}
          </div>
          <Link href={`/business/${params.id}`}>
            <Button variant="outline">İşletmeye Dön</Button>
          </Link>
        </div>

        {reviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              Henüz yorum yok
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.reviewer.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "tr-TR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
