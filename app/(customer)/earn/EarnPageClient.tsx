"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/useToast";
import { haversineDistanceKm } from "@/lib/utils/matching";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Section from "@/components/layout/Section";
import ListSkeleton from "@/components/ui/ListSkeleton";
import EmptyState from "@/components/ui/empty-state";
import {
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  TrendingUp,
  Zap,
  Search,
} from "lucide-react";



// Static generation'ı engelle
interface InstantJob {
  id: string;
  description: string;
  locationLat: number;
  locationLng: number;
  city: string;
  district?: string | null;
  status: string;
  offerCount: number;
  requiresSkills: boolean;
  estimatedBudget?: number | null;
  scheduledAt?: string | null;
  createdAt: string;
  customer?: {
    name: string;
  };
  distanceKm?: number;
}

export default function EarnPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [instantJobs, setInstantJobs] = useState<InstantJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<InstantJob[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState(10);
  const [statusFilter, setStatusFilter] = useState<"all" | "open">("open");

  // URL'den query parametresini al
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const loadInstantJobs = useCallback(async () => {
    try {
      const res = await fetch("/api/instant-jobs?status=OPEN", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        const jobs: InstantJob[] = data.jobs || [];

        // Calculate distances if user location is available
        if (userLocation) {
          const jobsWithDistance = jobs.map((job) => {
            const distance = haversineDistanceKm(userLocation, {
              lat: job.locationLat,
              lng: job.locationLng,
            });
            return { ...job, distanceKm: distance };
          });

          // Sort by distance
          jobsWithDistance.sort(
            (a, b) => (a.distanceKm || 999) - (b.distanceKm || 999),
          );
          setInstantJobs(jobsWithDistance);
        } else {
          setInstantJobs(jobs);
        }
      }
    } catch (err) {
      console.error("Anlık işler yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [userLocation]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Default to Istanbul
          setUserLocation({ lat: 41.0082, lng: 28.9784 });
        },
      );
    } else {
      setUserLocation({ lat: 41.0082, lng: 28.9784 });
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      loadInstantJobs();
    }
  }, [userLocation, loadInstantJobs]);

  useEffect(() => {
    // Apply filters
    let filtered = [...instantJobs];

    // Status filter
    if (statusFilter === "open") {
      filtered = filtered.filter((job) => job.status === "OPEN");
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((job) =>
        job.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Distance filter
    if (userLocation) {
      filtered = filtered.filter((job) => {
        const distance =
          job.distanceKm ||
          haversineDistanceKm(userLocation, {
            lat: job.locationLat,
            lng: job.locationLng,
          });
        return distance <= maxDistance;
      });
    }


    setFilteredJobs(filtered);
  }, [
    instantJobs,
    searchQuery,
    maxDistance,
    statusFilter,
    userLocation,
  ]);

  const handleApply = async (jobId: string) => {
    try {
      const res = await fetch(`/api/instant-jobs/${jobId}/offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Teklif gönderilemedi");
      }

      success("Teklifiniz gönderildi! Müşteri teklifinizi değerlendirecek.");
      loadInstantJobs();
    } catch (err: any) {
      error(err.message || "Bir hata oluştu");
    }
  };

  const openJobsCount = instantJobs.filter((j) => j.status === "OPEN").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Hero Section with Stats */}
      <Section
        title="Mahallende ek gelir fırsatları"
        subtitle="Anlık işlere başvur, hızlıca para kazan"
        className="bg-surface border-b border-borderSoft/70"
      >
        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="bg-brand-50 border-brand-100">
            <CardContent className="p-4 md:p-5">
              <p className="text-sm text-brand-700 font-medium mb-1">
                Bu hafta toplam
              </p>
              <p className="text-2xl md:text-3xl font-bold text-brand-900">
                {openJobsCount} iş
              </p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-100">
            <CardContent className="p-4 md:p-5">
              <p className="text-sm text-emerald-700 font-medium mb-1">
                Ortalama iş süresi
              </p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-900">
                35 dk
              </p>
            </CardContent>
          </Card>

          <Card className="bg-sky-50 border-sky-100">
            <CardContent className="p-4 md:p-5">
              <p className="text-sm text-sky-700 font-medium mb-1">
                Ortalama kazanç
              </p>
              <p className="text-2xl md:text-3xl font-bold text-sky-900">
                120 ₺/iş
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* "Ben iş istiyorum" Card */}
          <Card className="border-2 border-brand-200 hover:shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-600" />
                Ben iş istiyorum
              </CardTitle>
              <CardDescription>
                Anlık iş oluştur, hızlıca çözüme kavuş
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/instant-jobs/new">
                <Button variant="default" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni İş Oluştur
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* "Ek gelir kazanmak istiyorum" Card */}
          <Card className="border-2 border-emerald-200 hover:shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Ek gelir kazanmak istiyorum
              </CardTitle>
              <CardDescription>
                Çevrendeki anlık işlere başvur, ek gelir kazan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-textSecondary mb-4">
                Aşağıdaki listeden uygun işlere başvurabilirsin
              </p>
              <div className="text-xs text-textSecondary bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                💡 <strong>İpucu:</strong> Ek gelir kazanmak için profilini
                doldur ve bildirimleri aç.
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Filters & Jobs List */}
      <Section title="Yakınımdaki Anlık İşler" className="bg-surfaceMuted">
        {/* Premium Filter Bar */}
        <div className="rounded-full bg-surface shadow-sm border border-borderSoft px-4 py-2 flex items-center justify-between gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <Input
              placeholder="İş açıklamasında ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-0 focus-visible:ring-0 bg-transparent"
            />
          </div>

          {/* Filter Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={maxDistance.toString()}
              onValueChange={(v) => setMaxDistance(Number(v))}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 km</SelectItem>
                <SelectItem value="10">10 km</SelectItem>
                <SelectItem value="20">20 km</SelectItem>
                <SelectItem value="50">50 km</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <ListSkeleton count={5} />
        ) : filteredJobs.length === 0 ? (
          <EmptyState
            icon={<Zap className="w-12 h-12" />}
            title="Anlık iş bulunamadı"
            description="Şu anda çevrende anlık iş yok. Biraz sonra tekrar kontrol edebilirsin."
            ctaText="Yeni İş Oluştur"
            ctaLink="/instant-jobs/new"
          />
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hover:shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="text-lg md:text-xl font-semibold text-textPrimary">
                            {job.description}
                          </h3>
                          {!job.requiresSkills && (
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                              <Zap className="w-3 h-3 mr-1 inline" />
                              VASIF GEREKTİRMEZ
                            </Badge>
                          )}
                        </div>

                        {/* Job Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-textSecondary mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {job.district ? `${job.district}, ` : ""}
                              {job.city}
                            </span>
                            {job.distanceKm !== undefined && (
                              <span className="text-brand-600 font-semibold">
                                {" • "}
                                {job.distanceKm.toFixed(1)} km
                              </span>
                            )}
                          </div>

                          {job.estimatedBudget && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-brand-500" />
                              <span className="font-bold text-brand-600">
                                {job.estimatedBudget.toFixed(2)} ₺
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {job.scheduledAt
                                ? new Date(job.scheduledAt).toLocaleDateString(
                                    "tr-TR",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )
                                : "Bugün, 19:00'a kadar"}
                            </span>
                          </div>

                          {job.offerCount > 0 && (
                            <div className="flex items-center gap-1">
                              <Badge
                                variant="outline"
                                className="text-xs bg-slate-50 text-slate-700 border-slate-300"
                              >
                                {job.offerCount} teklif alındı
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <Button
                          onClick={() => handleApply(job.id)}
                          disabled={job.status !== "OPEN"}
                          className="w-full"
                          size="sm"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Başvur
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/jobs/${job.id}`)}
                          className="w-full"
                          size="sm"
                        >
                          Detay
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
