"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";
import { SERVICE_CATEGORIES } from "@/lib/data/service-categories";
import ListSkeleton from "@/components/ui/ListSkeleton";
import EmptyState from "@/components/ui/empty-state";
import BadgePremium from "@/components/ui/BadgePremium";
import { ArrowLeft, Clock, DollarSign, FileText, MapPin, MessageCircle, Star, TrendingUp, User, Zap } from "lucide-react";


// Static generation'ı engelle
interface Job {
  id: string;
  description: string;
  mainCategoryId: string;
  subServiceId: string | null;
  isOther: boolean;
  city: string;
  district: string;
  addressText: string | null;
  locationLat: number | null;
  locationLng: number | null;
  scheduledAt: string | null;
  status: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  acceptedBy?: {
    id: string;
    name: string;
    owner: {
      id: string;
      name: string;
      avatarUrl: string | null;
    };
  } | null;
  offers: Array<{
    id: string;
    amount: number;
    message: string | null;
    status: string;
    createdAt: string;
    business: {
      id: string;
      name: string;
      avgRating: number;
      reviewCount: number;
      owner: {
        id: string;
        name: string;
        avatarUrl: string | null;
      };
    };
  }>;
}

interface MatchedVendor {
  id: string;
  businessId: string;
  businessName: string;
  businessDescription?: string | null;
  businessCoverImageUrl?: string | null;
  owner: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  avgRating: number;
  reviewCount: number;
  location: { lat: number; lng: number } | null;
  city: string | null;
  avgResponseTime: number | null;
  completionRate: number | null;
  onlineStatus: "ONLINE" | "OFFLINE" | "AUTO_OFFLINE";
  matchScore: number;
  distanceKm: number | null;
  factors: {
    rating: number;
    distance: number;
    responseTime: number;
    completionRate: number;
  };
}

export default function JobDetailPageClient() {
  const params = useParams();
  const router = useRouter();
  const { success, error } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [matchedVendors, setMatchedVendors] = useState<MatchedVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceGuide, setPriceGuide] = useState<{
    min: number;
    max: number;
    average: number;
  } | null>(null);

  const loadJob = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/jobs/${params.id}`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setJob(data.job);
        setMatchedVendors(data.matchedVendors || []);

        // Fiyat rehberi yükle
        if (data.job.mainCategoryId && data.job.subServiceId) {
          try {
            const priceRes = await fetch(
              `/api/price-guide?categoryId=${data.job.mainCategoryId}&subServiceId=${data.job.subServiceId}`,
            );
            if (priceRes.ok) {
              const priceData = await priceRes.json();
              if (priceData.min) {
                setPriceGuide(priceData);
              }
            }
          } catch (err) {
            // Fiyat rehberi yüklenemezse devam et
          }
        }
      } else {
        const errorData = await res.json();
        error(errorData.error || "İş yüklenemedi");
      }
    } catch (err) {
      console.error("İş yüklenemedi:", err);
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [params.id, error]);

  useEffect(() => {
    loadJob();
  }, [loadJob]);

  const getCategoryName = (categoryId: string) => {
    const category = SERVICE_CATEGORIES.find((cat) => cat.id === categoryId);
    return category?.name || categoryId;
  };

  const getSubServiceName = (
    categoryId: string,
    subServiceId: string | null,
  ) => {
    if (!subServiceId) return null;
    const category = SERVICE_CATEGORIES.find((cat) => cat.id === categoryId);
    const subService = category?.subServices.find(
      (sub) => sub.id === subServiceId,
    );
    return subService?.name || null;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { text: string; variant: any }> = {
      PENDING: { text: "Teklif Bekleniyor", variant: "secondary" },
      ACCEPTED: { text: "Kabul Edildi", variant: "default" },
      IN_PROGRESS: { text: "İş Devam Ediyor", variant: "default" },
      COMPLETED: { text: "Tamamlandı", variant: "default" },
      CANCELLED: { text: "İptal Edildi", variant: "destructive" },
    };
    return statusMap[status] || { text: status, variant: "outline" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-6">
          <ListSkeleton count={5} />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon={<FileText className="w-12 h-12" />}
          title="İş bulunamadı"
          description="Bu iş kaydı bulunamadı veya görüntüleme yetkiniz yok."
        />
      </div>
    );
  }

  const statusInfo = getStatusBadge(job.status);
  const categoryName = getCategoryName(job.mainCategoryId);
  const subServiceName = getSubServiceName(
    job.mainCategoryId,
    job.subServiceId,
  );

  // Average response time hesapla
  const avgResponseTime =
    matchedVendors.length > 0
      ? matchedVendors
          .filter((v) => v.avgResponseTime !== null)
          .reduce((sum, v) => sum + (v.avgResponseTime || 0), 0) /
        matchedVendors.filter((v) => v.avgResponseTime !== null).length
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="font-semibold text-lg">İş Detayı</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge variant={statusInfo.variant} className="text-base px-4 py-2">
            {statusInfo.text}
          </Badge>
        </div>

        {/* Job Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">İş Bilgisi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Kategori</p>
              <p className="font-semibold">
                {categoryName}
                {subServiceName && ` - ${subServiceName}`}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Açıklama</p>
              <p className="text-gray-900 whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            {(job.addressText || job.district || job.city) && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Konum</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-900">
                    {job.addressText ||
                      `${job.district || ""} ${job.city || ""}`.trim()}
                  </p>
                </div>
              </div>
            )}

            {job.scheduledAt && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Tarih & Saat</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p>{new Date(job.scheduledAt).toLocaleString("tr-TR")}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-1">Oluşturulma Tarihi</p>
              <p className="text-gray-900">
                {new Date(job.createdAt).toLocaleDateString("tr-TR")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Summary Badges */}
        {job.status === "PENDING" && matchedVendors.length > 0 && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {matchedVendors.length}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Önerilen Esnaf</p>
                </div>
                {avgResponseTime !== null && (
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {avgResponseTime.toFixed(1)}s
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Ort. Yanıt Süresi
                    </p>
                  </div>
                )}
                {priceGuide && (
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {priceGuide.average.toFixed(0)}₺
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Ort. Fiyat</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fiyat Rehberi */}
        {priceGuide && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900 mb-1">
                    Benzer işlerin fiyat aralığı
                  </p>
                  <div className="flex items-center gap-4 text-sm text-green-800">
                    <div>
                      <span className="font-medium">Min:</span>{" "}
                      <span className="font-bold">
                        {priceGuide.min.toFixed(0)} ₺
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Ortalama:</span>{" "}
                      <span className="font-bold">
                        {priceGuide.average.toFixed(0)} ₺
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Max:</span>{" "}
                      <span className="font-bold">
                        {priceGuide.max.toFixed(0)} ₺
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Matched Vendors */}
        {job.status === "PENDING" && matchedVendors.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Önerilen Esnaflar</h2>
            <div className="space-y-4">
              {matchedVendors.map((vendor) => (
                <Card
                  key={vendor.businessId}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {vendor.owner.avatarUrl ? (
                          <img
                            src={vendor.owner.avatarUrl}
                            alt={vendor.businessName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-gray-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">
                              {vendor.businessName}
                            </h3>
                            {vendor.onlineStatus === "ONLINE" && (
                              <BadgePremium
                                type="verified"
                                size="sm"
                                className="mt-1"
                              />
                            )}
                          </div>
                          {vendor.matchScore > 0.7 && (
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              En İyi
                            </Badge>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {vendor.avgRating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({vendor.reviewCount} değerlendirme)
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-3">
                          {vendor.distanceKm !== null && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{vendor.distanceKm.toFixed(1)} km</span>
                            </div>
                          )}
                          {vendor.avgResponseTime !== null && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {vendor.avgResponseTime.toFixed(1)} saat
                              </span>
                            </div>
                          )}
                          {vendor.completionRate !== null && (
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              <span>
                                %{vendor.completionRate.toFixed(0)} tamamlanma
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              router.push(
                                `/jobs/${job.id}/offers?businessId=${vendor.businessId}`,
                              );
                            }}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Teklif Detayı
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              // Chat sayfasına yönlendir (job için chat endpoint'i gerekli)
                              router.push(
                                `/jobs/${job.id}/chat?businessId=${vendor.businessId}`,
                              );
                            }}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Mesaj
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Existing Offers */}
        {job.offers.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Gelen Teklifler ({job.offers.length})
            </h2>
            <div className="space-y-3">
              {job.offers.map((offer) => (
                <Card key={offer.id} className="border-2 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          {offer.business.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{offer.business.avgRating.toFixed(1)}</span>
                          <span>•</span>
                          <span>
                            {offer.business.reviewCount} değerlendirme
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {offer.amount.toFixed(0)} ₺
                        </p>
                        <Badge
                          variant={
                            offer.status === "ACCEPTED"
                              ? "default"
                              : "secondary"
                          }
                          className="mt-1"
                        >
                          {offer.status === "ACCEPTED"
                            ? "Kabul Edildi"
                            : "Bekliyor"}
                        </Badge>
                      </div>
                    </div>
                    {offer.message && (
                      <p className="text-sm text-gray-700 mb-3 italic">
                        &quot;{offer.message}&quot;
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          router.push(`/jobs/${job.id}/offers/${offer.id}`);
                        }}
                      >
                        Detay
                      </Button>
                      {offer.status === "PENDING" && (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            router.push(
                              `/jobs/${job.id}/chat?businessId=${offer.business.id}`,
                            );
                          }}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Mesaj
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Accepted Business */}
        {job.acceptedBy && (
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-900">
                Kabul Eden Esnaf
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {job.acceptedBy.owner.avatarUrl ? (
                    <img
                      src={job.acceptedBy.owner.avatarUrl}
                      alt={job.acceptedBy.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {job.acceptedBy.name}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push(`/jobs/${job.id}/chat`);
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Mesaj Gönder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State for Vendors */}
        {job.status === "PENDING" && matchedVendors.length === 0 && (
          <EmptyState
            icon={<User className="w-12 h-12" />}
            title="Henüz esnaf bulunamadı"
            description="Bu iş için uygun esnaf bulunamadı. Biraz sonra tekrar kontrol edebilirsiniz."
          />
        )}
      </div>
    </div>
  );
}
