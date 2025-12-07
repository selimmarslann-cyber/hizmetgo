"use client";
/**
 * Available Jobs Page - Vendor'lara uygun işleri gösterir
 *
 * Bu sayfada vendor:
 * - Kendisine uygun işleri görür
 * - Her işe teklif verebilir
 */

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, CheckCircle2, Clock, DollarSign, MapPin, MessageSquare, Send, User } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import { motion } from "framer-motion";



// Static generation'ı engelle - client component olduğu için
interface Job {
  id: string;
  customerId: string;
  mainCategoryId: string;
  subServiceId?: string;
  description: string;
  city: string;
  district: string;
  addressText?: string;
  scheduledAt?: string;
  status: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  offers?: Array<{
    id: string;
    businessId: string;
    amount: number;
    status: string;
  }>;
  offerCount?: number;
  userOffer?: {
    id: string;
    businessId: string;
    amount: number;
    status: string;
  };
}

export default function AvailableJobsPageClient() {
  const router = useRouter();
  const { success, error } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadAvailableJobs = useCallback(async () => {
    try {
      const res = await fetch("/api/jobs/available", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      } else {
        if (res.status === 401) {
          router.push("/auth/business-login");
        }
      }
    } catch (err) {
      console.error("İşler yüklenemedi:", err);
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [router, error]);

  useEffect(() => {
    loadAvailableJobs();
  }, [loadAvailableJobs]);

  const handleOpenOfferDialog = (job: Job) => {
    setSelectedJob(job);
    setOfferAmount("");
    setOfferMessage("");
    setOfferDialogOpen(true);
  };

  const handleSubmitOffer = async () => {
    if (!selectedJob || !offerAmount) {
      error("Lütfen teklif fiyatı girin");
      return;
    }

    const amount = parseFloat(offerAmount);
    if (isNaN(amount) || amount <= 0) {
      error("Geçerli bir fiyat girin");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/jobs/${selectedJob.id}/offers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          message: offerMessage.trim() || undefined,
        }),
        credentials: "include",
      });

      if (res.ok) {
        success("Teklifiniz başarıyla gönderildi!");
        setOfferDialogOpen(false);
        setSelectedJob(null);
        loadAvailableJobs();
      } else {
        const data = await res.json();
        error(data.error || "Teklif gönderilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setSubmitting(false);
    }
  };

  const hasOffered = (job: Job) => {
    return job.offers?.some(
      (o) => o.status === "PENDING" || o.status === "ACCEPTED",
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Uygun İşler</h1>
          <p className="text-gray-600 mt-2">
            Size uygun iş taleplerini görüntüleyin ve teklif verin
          </p>
        </div>

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="py-16 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Şu anda uygun iş yok
              </p>
              <p className="text-sm text-gray-500">
                Yeni iş talepleri geldiğinde burada görünecek
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job, index) => {
              const alreadyOffered = hasOffered(job);
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Yeni İş</Badge>
                            {alreadyOffered && (
                              <Badge variant="outline" className="bg-blue-50">
                                Teklif Verildi
                              </Badge>
                            )}
                            <span className="text-sm text-gray-500">
                              {new Date(job.createdAt).toLocaleDateString(
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

                          <h3 className="font-semibold text-lg mb-2">
                            İş Talebi
                          </h3>
                          <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                            {job.description}
                          </p>

                          {/* Teklif sayısı */}
                          {job.offerCount !== undefined &&
                            job.offerCount > 0 && (
                              <div className="mb-3">
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-slate-50 text-slate-700 border-slate-300"
                                >
                                  {job.offerCount} teklif alındı
                                </Badge>
                              </div>
                            )}

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {job.district}, {job.city}
                              </span>
                            </div>
                            {job.scheduledAt && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {new Date(job.scheduledAt).toLocaleDateString(
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
                            )}
                            <div className="flex items-center gap-2 text-gray-600">
                              <User className="w-4 h-4" />
                              <span>{job.customer.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t">
                        {!alreadyOffered ? (
                          <Button
                            onClick={() => handleOpenOfferDialog(job)}
                            className="flex-1"
                          >
                            <DollarSign className="w-4 h-4 mr-2" />
                            Teklif Ver
                          </Button>
                        ) : (
                          <Button variant="outline" className="flex-1" disabled>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Teklif Verildi
                          </Button>
                        )}
                        <Link href={`/jobs/job/${job.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Detayları Gör
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Offer Dialog */}
      <Dialog open={offerDialogOpen} onOpenChange={setOfferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Teklif Ver</DialogTitle>
            <DialogDescription>
              Bu işe ne kadar teklif vermek istiyorsunuz?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Teklif Fiyatı (₺)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Örn: 500.00"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="message">Mesaj (Opsiyonel)</Label>
              <Textarea
                id="message"
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                placeholder="Müşteriye özel bir mesaj yazabilirsiniz..."
                className="mt-1 min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOfferDialogOpen(false)}>
              İptal
            </Button>
            <Button
              onClick={handleSubmitOffer}
              disabled={submitting || !offerAmount}
            >
              <Send className="w-4 h-4 mr-2" />
              {submitting ? "Gönderiliyor..." : "Teklif Gönder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
