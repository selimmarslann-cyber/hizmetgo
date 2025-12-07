"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/lib/hooks/useToast";
import { getKeywordSuggestions } from "@/lib/utils/keywords";
import RequestFlow from "@/components/request/RequestFlow";
import AIChatModal from "@/components/AIChat/AIChatModal";
import EmptyState from "@/components/ui/empty-state";
import { ChevronRight, FileText, Loader2, MapPin, MessageCircle, Search, Sparkles, Star } from "lucide-react";


// Static generation'ı engelle
interface Business {
  id: string;
  name: string;
  category: string;
  description?: string;
  rating: number;
  reviewCount: number;
  distance?: number;
  priceRange?: string;
  coverImageUrl?: string;
  onlineStatus: "ONLINE" | "OFFLINE" | "AUTO_OFFLINE";
  phone?: string;
  addressText?: string;
}

export default function ServicesPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Eğer categoryId varsa RequestFlow göster
  const categoryId = searchParams.get("categoryId");
  const showRequestFlow = !!categoryId;

  // AI chat açılması gerekiyor mu? (login sonrası yönlendirme için)
  const shouldOpenAI = searchParams.get("ai") === "true";

  // Kullanıcı bilgisini al
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.user?.id) {
            setUserId(data.user.id);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // AI chat açılması gerekiyorsa aç
  useEffect(() => {
    if (shouldOpenAI && userId && searchQuery) {
      // URL'den ai parametresini kaldır (tekrar açılmasını önlemek için)
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("ai");
      router.replace(newUrl.pathname + newUrl.search, { scroll: false });

      // AI chat modal'ını aç
      setShowAIChat(true);
    }
  }, [shouldOpenAI, userId, searchQuery, router]);

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation({ lat: 41.0082, lng: 28.9784 }); // Default Istanbul
        },
      );
    } else {
      setUserLocation({ lat: 41.0082, lng: 28.9784 });
    }
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        return;
      }

      setLoading(true);
      try {
        const lat = userLocation?.lat || 41.0082;
        const lng = userLocation?.lng || 28.9784;

        const res = await fetch(
          `/api/businesses/search?q=${encodeURIComponent(query)}&lat=${lat}&lng=${lng}&limit=20`,
        );

        if (res.ok) {
          const data = await res.json();
          setBusinesses(data.businesses || []);
        } else {
          error("Arama yapılamadı");
        }
      } catch (err) {
        error("Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    },
    [userLocation, error],
  );

  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam && queryParam !== searchQuery) {
      setSearchQuery(queryParam);
      // Hemen arama yap (konum beklemeden, default konum kullanılacak)
      performSearch(queryParam);
    }
  }, [searchParams, searchQuery, performSearch]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const query = searchQuery.trim();
    if (!query) {
      error("Lütfen bir hizmet veya anahtar kelime girin");
      return;
    }

    // URL'i güncelle
    router.replace(`/request?q=${encodeURIComponent(query)}`, {
      scroll: false,
    });
    setShowSuggestions(false);
    await performSearch(query);
  };

  const handleRequestQuote = async (businessId: string) => {
    try {
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (!userRes.ok) {
        router.push(`/auth/login?redirect=${encodeURIComponent("/request")}`);
        return;
      }

      // İş talebi oluşturma sayfasına yönlendir
      router.push(
        `/request/create?businessId=${businessId}&service=${encodeURIComponent(searchQuery)}`,
      );
    } catch (err) {
      error("Teklif isteği gönderilemedi");
    }
  };

  const handleWhatsApp = (phone?: string) => {
    if (!phone) {
      error("Telefon numarası bulunamadı");
      return;
    }

    const message = encodeURIComponent(
      `Merhaba, "${searchQuery}" hizmeti hakkında bilgi almak istiyorum.`,
    );
    window.open(
      `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`,
      "_blank",
    );
  };

  // RequestFlow gösterilmesi gerekiyorsa onu göster
  if (showRequestFlow) {
    return <RequestFlow />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Hizmet/Teklif
              </h1>
              <p className="text-slate-600">
                Hangi hizmete ihtiyacın var? Esnaflardan teklif al veya doğrudan
                iletişime geç.
              </p>
            </div>
            <Link href="/ai-chat">
              <Button className="bg-brand-500 hover:bg-brand-600 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                AI ile İlan Oluştur
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
            <Input
              type="text"
              placeholder="Örn: Elektrik arıza, Temizlik, Boya badana, Tesisat..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);

                // Anahtar kelime önerileri
                if (value.trim().length >= 2) {
                  const keywordSuggestions = getKeywordSuggestions(value, 8);
                  setSuggestions(keywordSuggestions);
                  setShowSuggestions(keywordSuggestions.length > 0);
                } else {
                  setShowSuggestions(false);
                  setSuggestions([]);
                }
              }}
              onFocus={() => {
                if (searchQuery.trim().length >= 2 && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                // Kısa bir gecikme ile kapat (tıklama için zaman tanı)
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              className="pl-12 pr-32 h-14 text-base rounded-lg border-2 border-gray-200 focus:border-[#FF6000] focus:ring-2 focus:ring-[#FF6000]/20"
            />
            <Button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-lg"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ara"}
            </Button>

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-50 max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                      handleSearch();
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-sm text-gray-900">{suggestion}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6000] transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF6000]" />
          </div>
        ) : businesses.length > 0 ? (
          <div>
            <div className="mb-6">
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">
                  {businesses.length}
                </span>{" "}
                esnaf bulundu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-2 border-gray-200 hover:border-[#FF6000]/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all bg-white">
                    {/* Business Info */}
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-slate-900 mb-1">
                                {business.name}
                              </h3>
                              <p className="text-sm text-slate-600">
                                {business.category}
                              </p>
                            </div>
                            {business.onlineStatus === "ONLINE" && (
                              <Badge className="bg-green-500 text-white">
                                Online
                              </Badge>
                            )}
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-sm text-slate-900">
                              {business.rating.toFixed(1)}
                            </span>
                            <span className="text-xs text-slate-500">
                              ({business.reviewCount} değerlendirme)
                            </span>
                          </div>

                          {/* Distance */}
                          {business.distance !== undefined && (
                            <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {business.distance.toFixed(1)} km uzaklıkta
                              </span>
                            </div>
                          )}

                          {/* Description */}
                          {business.description && (
                            <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                              {business.description}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                          <Button
                            onClick={() => handleRequestQuote(business.id)}
                            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Teklif İste
                          </Button>
                          {business.phone && (
                            <Button
                              variant="outline"
                              onClick={() => handleWhatsApp(business.phone)}
                              className="w-full border-brand-500 text-brand-500 hover:bg-brand-500/10 font-bold"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              WhatsApp ile İletişim
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            onClick={() =>
                              router.push(`/business/${business.id}`)
                            }
                            className="w-full text-slate-600 hover:text-slate-900"
                          >
                            Detayları Gör
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ) : searchQuery ? (
          <EmptyState
            icon={<Search className="w-12 h-12" />}
            title="Sonuç bulunamadı"
            description={`"${searchQuery}" için esnaf bulunamadı. Farklı bir anahtar kelime deneyin.`}
          />
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600">
              Hangi hizmete ihtiyacın var? Yukarıdaki arama çubuğuna yaz ve ara.
            </p>
          </div>
        )}
      </div>

      {/* AI Chat Modal - Login sonrası yönlendirme için */}
      {userId && (
        <AIChatModal
          isOpen={showAIChat}
          onClose={() => setShowAIChat(false)}
          userId={userId}
          initialCategory={searchQuery.trim() || undefined}
        />
      )}
    </div>
  );
}
