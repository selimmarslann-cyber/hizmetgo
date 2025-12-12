"use client";

import NextDynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useCartStore } from "@/lib/store/useCartStore";
import { haversineDistanceKm } from "@/lib/utils/matching";

const LeafletMap = NextDynamic(
  () => import("@/components/map/LeafletMapBusinesses"),
  { ssr: false }
);

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  active: boolean;
}

interface Business {
  id: string;
  name: string;
  description?: string;
  category: string;
  lat: number;
  lng: number;
  addressText?: string;
  coverImageUrl?: string;
  onlineStatus: "ONLINE" | "OFFLINE" | "AUTO_OFFLINE";
  avgRating: number;
  reviewCount: number;
  products?: Product[];
  distance?: number;
  priceRange?: string;
}

export default function MapPageClient() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "responseTime">(
    "distance"
  );
  const [openNow, setOpenNow] = useState(false);
  const [highRated, setHighRated] = useState(false);

  const [userLocation, setUserLocation] = useState<[number, number]>([
    41.0082,
    28.9784,
  ]);
  const initialLocationRef = useRef<[number, number]>([41.0082, 28.9784]);

  const { items: cartItems, addItem, removeItem, updateQuantity } =
    useCartStore();

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + (i.quantity ?? 0), 0),
    [cartItems]
  );

  const loadBusinesses = useCallback(async (lat: number, lng: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/businesses/map?lat=${lat}&lng=${lng}&limit=50`
      );
      if (res.ok) {
        const data = (await res.json()) as Business[];
        setBusinesses(Array.isArray(data) ? data : []);
      } else {
        setBusinesses([]);
      }
    } catch (err) {
      console.error("İşletmeler yüklenemedi:", err);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBusinessProducts = useCallback(async (businessId: string) => {
    try {
      const res = await fetch(`/api/businesses/${businessId}/products`);
      if (!res.ok) return;
      const products = (await res.json()) as Product[];

      setBusinesses((prev) =>
        prev.map((b) => (b.id === businessId ? { ...b, products } : b))
      );

      setSelectedBusiness((prev) =>
        prev?.id === businessId ? { ...prev, products } : prev
      );
    } catch (err) {
      console.error("Ürünler yüklenemedi:", err);
    }
  }, []);

  const applyFilters = useCallback(() => {
    const withDistance = businesses.map((b) => {
      const distance = haversineDistanceKm(
        { lat: userLocation[0], lng: userLocation[1] },
        { lat: b.lat, lng: b.lng }
      );
      return { ...b, distance };
    });

    let filtered = withDistance;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          (b.description?.toLowerCase().includes(q) ?? false)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((b) => selectedCategories.includes(b.category));
    }

    filtered = filtered.filter((b) => (b.distance ?? 999) <= maxDistance);

    if (openNow) {
      filtered = filtered.filter((b) => b.onlineStatus === "ONLINE");
    }

    if (highRated) {
      filtered = filtered.filter((b) => b.avgRating >= 4.0);
    }

    filtered.sort((a, b) => {
      if (sortBy === "rating") return b.avgRating - a.avgRating;
      if (sortBy === "distance") return (a.distance ?? 0) - (b.distance ?? 0);
      return b.avgRating - a.avgRating;
    });

    setFilteredBusinesses(filtered);
  }, [
    businesses,
    userLocation,
    searchQuery,
    selectedCategories,
    maxDistance,
    openNow,
    highRated,
    sortBy,
  ]);

  useEffect(() => {
    if (!navigator.geolocation) {
      loadBusinesses(initialLocationRef.current[0], initialLocationRef.current[1]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc);
        initialLocationRef.current = loc;
        loadBusinesses(loc[0], loc[1]);
      },
      () => {
        loadBusinesses(initialLocationRef.current[0], initialLocationRef.current[1]);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [loadBusinesses]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleBusinessClick = useCallback(
    (business: Business) => {
      setSelectedBusiness(business);
      if (!business.products) {
        void loadBusinessProducts(business.id);
      }
    },
    [loadBusinessProducts]
  );

  const addToCartHandler = useCallback(
    (product: Product) => {
      if (!selectedBusiness) return;

      const itemId = `${selectedBusiness.id}_${product.id}`;
      const existing = cartItems.find((i) => i.id === itemId);

      if (existing) {
        updateQuantity(itemId, (existing.quantity ?? 0) + 1);
        return;
      }

      // Not: store'un beklediği shape'e göre gerekirse alanları uyarlarsın.
      addItem({
        id: itemId,
        businessId: selectedBusiness.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      } as any);
    },
    [addItem, cartItems, selectedBusiness, updateQuantity]
  );

  const removeFromCartHandler = useCallback(
    (productId: string) => {
      if (!selectedBusiness) return;

      const itemId = `${selectedBusiness.id}_${productId}`;
      const existing = cartItems.find((i) => i.id === itemId);

      if (existing && (existing.quantity ?? 0) > 1) {
        updateQuantity(itemId, (existing.quantity ?? 0) - 1);
      } else {
        removeItem(itemId);
      }
    },
    [cartItems, removeItem, selectedBusiness, updateQuantity]
  );

  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxDistance(10);
    setSortBy("distance");
    setOpenNow(false);
    setHighRated(false);
    setSearchQuery("");
  };

  const selectedProducts = selectedBusiness?.products ?? [];

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div className="flex-1">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="İşletme / kategori ara..."
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            />
          </div>

          <button
            onClick={resetFilters}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            type="button"
          >
            Sıfırla
          </button>

          <div className="rounded-xl border px-3 py-2 text-sm">
            Sepet: <b>{cartCount}</b>
          </div>
        </div>

        {/* Filters */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 pb-3 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-3">
            <div className="text-xs text-gray-600">Maks. Mesafe (km)</div>
            <input
              type="range"
              min={1}
              max={50}
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm">
              <b>{maxDistance}</b> km
            </div>
          </div>

          <div className="rounded-xl border bg-white p-3">
            <div className="text-xs text-gray-600">Sıralama</div>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "distance" | "rating" | "responseTime")
              }
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
            >
              <option value="distance">Mesafe</option>
              <option value="rating">Puan</option>
              <option value="responseTime">Yanıt (şimdilik puan)</option>
            </select>
          </div>

          <div className="rounded-xl border bg-white p-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
              />
              Şu an açık (ONLINE)
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={highRated}
                onChange={(e) => setHighRated(e.target.checked)}
              />
              4.0+ puan
            </label>
          </div>

          <div className="rounded-xl border bg-white p-3">
            <div className="text-xs text-gray-600">Kategori (opsiyonel)</div>
            <input
              value={selectedCategories.join(", ")}
              onChange={(e) =>
                setSelectedCategories(
                  e.target.value
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Örn: Kuaför, Elektrikçi"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3">
        {/* Map */}
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-2xl border bg-white">
            <div className="border-b px-4 py-3 text-sm font-semibold">
              Harita
              {loading ? (
                <span className="ml-2 text-xs font-normal text-gray-500">
                  Yükleniyor...
                </span>
              ) : (
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {filteredBusinesses.length} işletme
                </span>
              )}
            </div>

            <div className="h-[520px]">
              {!loading && (
                <LeafletMap
                  businesses={filteredBusinesses}
                  center={userLocation}
                  zoom={13}
                  onBusinessClick={handleBusinessClick}
                />
              )}
              {loading && (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  Harita hazırlanıyor...
                </div>
              )}
            </div>
          </div>

          {/* List */}
          <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
            <div className="border-b px-4 py-3 text-sm font-semibold">
              Liste
            </div>

            <div className="divide-y">
              {filteredBusinesses.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleBusinessClick(b)}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="truncate text-sm font-semibold">{b.name}</div>
                      <span className="rounded-full border px-2 py-0.5 text-[11px] text-gray-600">
                        {b.category}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {(b.distance ?? 0).toFixed(1)} km
                      </span>
                    </div>
                    {b.description ? (
                      <div className="mt-1 line-clamp-1 text-xs text-gray-600">
                        {b.description}
                      </div>
                    ) : null}
                    <div className="mt-1 text-[11px] text-gray-500">
                      Puan: {b.avgRating.toFixed(1)} ({b.reviewCount})
                      {" · "}
                      Durum: {b.onlineStatus}
                    </div>
                  </div>
                </button>
              ))}

              {!loading && filteredBusinesses.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  Filtrelere uygun işletme bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-1">
          <div className="sticky top-[140px] space-y-4">
            <div className="overflow-hidden rounded-2xl border bg-white">
              <div className="border-b px-4 py-3 text-sm font-semibold">
                Seçili İşletme
              </div>

              {!selectedBusiness ? (
                <div className="px-4 py-6 text-sm text-gray-500">
                  Haritadan veya listeden bir işletme seç.
                </div>
              ) : (
                <div className="px-4 py-4">
                  <div className="text-sm font-semibold">
                    {selectedBusiness.name}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    {selectedBusiness.category}
                    {" · "}
                    {(selectedBusiness.distance ?? 0).toFixed(1)} km
                  </div>
                  {selectedBusiness.addressText ? (
                    <div className="mt-1 text-xs text-gray-500">
                      {selectedBusiness.addressText}
                    </div>
                  ) : null}

                  <div className="mt-4 text-xs font-semibold text-gray-700">
                    Ürünler
                  </div>

                  {selectedProducts.length === 0 ? (
                    <div className="mt-2 text-sm text-gray-500">
                      Ürün bulunamadı / yüklenmedi.
                    </div>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {selectedProducts
                        .filter((p) => p.active)
                        .map((p) => {
                          const itemId = `${selectedBusiness.id}_${p.id}`;
                          const existing = cartItems.find((i) => i.id === itemId);
                          const qty = existing?.quantity ?? 0;

                          return (
                            <div
                              key={p.id}
                              className="rounded-xl border p-3"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-semibold">
                                    {p.name}
                                  </div>
                                  <div className="mt-0.5 text-xs text-gray-600">
                                    ₺{p.price.toFixed(2)}
                                  </div>
                                  {p.description ? (
                                    <div className="mt-1 line-clamp-2 text-xs text-gray-500">
                                      {p.description}
                                    </div>
                                  ) : null}
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => removeFromCartHandler(p.id)}
                                    className="h-8 w-8 rounded-lg border text-sm hover:bg-gray-50"
                                    aria-label="Azalt"
                                  >
                                    -
                                  </button>

                                  <div className="w-6 text-center text-sm font-semibold">
                                    {qty}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => addToCartHandler(p)}
                                    className="h-8 w-8 rounded-lg border text-sm hover:bg-gray-50"
                                    aria-label="Arttır"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-2xl border bg-white p-4 text-sm">
              <div className="font-semibold">Konum</div>
              <div className="mt-1 text-xs text-gray-600">
                {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
