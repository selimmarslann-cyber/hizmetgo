"use client";
/**
 * Job Detail Page - Müşteri iş detay sayfası
 *
 * Bu sayfada müşteri:
 * - İş detaylarını görür
 * - Gelen teklifleri görür ve karşılaştırır
 * - Bir teklifi kabul eder
 */

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building2, CheckCircle2, Clock, MapPin, Star, TrendingDown } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Static generation'ı engelle
interface JobOffer {
  id: string;
  businessId: string;
  amount: number;
  message?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  business: {
    id: string;
    name: string;
    avgRating: number;
    reviewCount: number;
    owner: {
      id: string;
      name: string;
      avatarUrl?: string;
    };
  };
}

export default function JobDetailPageClient() {
  const params = useParams();
  const router = useRouter();
  const { success, error, info } = useToast();
  const [job, setJob] = useState<any>(null);
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

  const loadOffers = useCallback(async () => {
    try {
      const res = await fetch(`/api/jobs/${params.id}/offers`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOffers(data.offers || []);
      }
    } catch (err) {
      console.error("Teklifler yüklenemedi:", err);
    }
  }, [params.id]);

  const loadJob = useCallback(async () => {
    try {
      const res = await fetch(`/api/jobs/${params.id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setJob(data);
      } else {
        error("İş yüklenemedi");
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
    loadOffers();
  }, [loadJob, loadOffers]);

  const handleAcceptOffer = async () => {
    if (!selectedOffer) return;

    try {
      const res = await fetch(
        `/api/jobs/${params.id}/offers/${selectedOffer.id}/accept`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (res.ok) {
        success("Teklif kabul edildi! İşletme ile iletişime geçebilirsiniz.");
        setAcceptDialogOpen(false);
        setSelectedOffer(null);
        loadJob();
        loadOffers();
        // Siparişler sayfasına yönlendir
        setTimeout(() => {
          router.push("/jobs");
        }, 1500);
      } else {
        const data = await res.json();
        error(data.error || "Teklif kabul edilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">İş bulunamadı</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.back()}
          >
            Geri Dön
          </Button>
        </div>
      </div>
    );
  }

  const pendingOffers = offers.filter((o) => o.status === "PENDING");
  const acceptedOffer = offers.find((o) => o.status === "ACCEPTED");
  const sortedOffers = [...pendingOffers].sort((a, b) => a.amount - b.amount); // En düşük fiyattan yükseğe

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { text: string; variant: any }> = {
      PENDING: { text: "Teklif Bekleniyor", variant: "secondary" },
      ACCEPTED: { text: "Teklif Kabul Edildi", variant: "default" },
      IN_PROGRESS: { text: "İş Devam Ediyor", variant: "default" },
      COMPLETED: { text: "Tamamlandı", variant: "default" },
      CANCELLED: { text: "İptal Edildi", variant: "destructive" },
    };
    return statusMap[status] || { text: status, variant: "outline" };
  };

  const statusInfo = getStatusBadge(job.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            ← Geri
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge variant={statusInfo.variant} className="text-base px-4 py-2">
            {statusInfo.text}
          </Badge>
        </div>

        {/* Job Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">İş Detayları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Açıklama</p>
              <p className="text-gray-900 whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Şehir</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="font-medium">{job.city}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">İlçe</p>
                <p className="font-medium">{job.district}</p>
              </div>
            </div>
            {job.scheduledAt && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Planlanan Tarih</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="font-medium">
                    {new Date(job.scheduledAt).toLocaleString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )}
            {job.addressText && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Adres</p>
                <p className="font-medium">{job.addressText}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Offers Section */}
        {job.status === "PENDING" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Gelen Teklifler</CardTitle>
                <Badge variant="secondary">{pendingOffers.length} teklif</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {pendingOffers.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-1">Henüz teklif gelmedi</p>
                  <p className="text-sm text-gray-400">
                    Uygun esnaflara bildirim gönderildi. Teklifler geldiğinde
                    burada görünecek.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedOffers.map((offer, index) => (
                    <motion.div
                      key={offer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={`border-2 transition-all ${
                          index === 0
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {index === 0 && (
                                  <Badge className="bg-green-600 text-white">
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                    En Düşük Fiyat
                                  </Badge>
                                )}
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-5 h-5 text-primary" />
                                  <h3 className="font-semibold text-lg">
                                    {offer.business.name}
                                  </h3>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold">
                                    {offer.business.avgRating.toFixed(1)}
                                  </span>
                                  <span className="text-gray-400">
                                    ({offer.business.reviewCount} değerlendirme)
                                  </span>
                                </div>
                              </div>

                              {offer.message && (
                                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-700">
                                    {offer.message}
                                  </p>
                                </div>
                              )}

                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {new Date(offer.createdAt).toLocaleString(
                                    "tr-TR",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="mb-2">
                                <p className="text-sm text-gray-500">Teklif</p>
                                <p className="text-2xl font-bold text-primary">
                                  {offer.amount.toFixed(2)} ₺
                                </p>
                              </div>
                              <Button
                                onClick={() => {
                                  setSelectedOffer(offer);
                                  setAcceptDialogOpen(true);
                                }}
                                className="w-full"
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Kabul Et
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Accepted Offer */}
        {acceptedOffer && (
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Kabul Edilen Teklif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">
                      {acceptedOffer.business.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {acceptedOffer.business.avgRating.toFixed(1)}
                      </span>
                      <span className="text-gray-400">
                        ({acceptedOffer.business.reviewCount} değerlendirme)
                      </span>
                    </div>
                  </div>
                  {acceptedOffer.message && (
                    <div className="mb-3 p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-700">
                        {acceptedOffer.message}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">
                    Kabul Edilen Fiyat
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {acceptedOffer.amount.toFixed(2)} ₺
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Accept Offer Dialog */}
      <Dialog open={acceptDialogOpen} onOpenChange={setAcceptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Teklifi Kabul Et</DialogTitle>
            <DialogDescription>
              {selectedOffer && (
                <>
                  <strong>{selectedOffer.business.name}</strong> işletmesinin{" "}
                  <strong>{selectedOffer.amount.toFixed(2)} ₺</strong> teklifini
                  kabul etmek istediğinize emin misiniz?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAcceptDialogOpen(false)}
            >
              İptal
            </Button>
            <Button onClick={handleAcceptOffer}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Evet, Kabul Et
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
