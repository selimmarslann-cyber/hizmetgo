"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ❗ HATA ÇÖZÜMÜ: dynamic import'un adı değiştirildi
import NextDynamic from "next/dynamic";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/lib/store/useCartStore";
import { haversineDistanceKm } from "@/lib/utils/matching";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import MapFilters from "@/components/map/MapFilters";
import BusinessCard from "@/components/home/BusinessCard";
import EmptyState from "@/components/ui/empty-state";
import {
  Filter,
  List,
  MapIcon,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Star,
  Store,
  X,
  Zap,
} from "lucide-react";

// ✔ Leaflet map dinamik import - adı değiştirildi
const LeafletMap = NextDynamic(
  () => import("@/components/map/LeafletMapBusinesses"),
  { ssr: false }
);

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

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  active: boolean;
}

const CATEGORIES = [
  "Temizlik",
  "Elektrik",
  "Tesisat",
  "Boya / Badana",
  "Nakliyat",
  "Beyaz Eşya",
  "Özel Ders",
  "Evcil Hayvan",
];

export default function MapPageClient() {
  const router = useRouter();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<[number, number]>([
    41.0082,
    28.9784,
  ]);
  // Store initial location for fallback (avoids dependency issues)
  const initialLocationRef = useRef<[number, number]>([41.0082, 28.9784]);

  const {
    items: cartItems,
    addItem,
    removeItem,
    updateQuantity,
    getTotal,
    getItemCount,
  } = useCartStore();

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "responseTime">(
    "distance"
  );
  const [openNow, setOpenNow] = useState(false);
  const [highRated, setHighRated] = useState(false);

  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [showFilters, setShowFilters] = useState(false);

  const loadBusinesses = useCallback(async (lat: number, lng: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/businesses/map?lat=${lat}&lng=${lng}&limit=50`);
      if (res.ok) {
        const data = await res.json();
        setBusinesses(data);
      }
    } catch (err) {
      console.error("İşletmeler yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = businesses.map((b) => {
      const distance = haversineDistanceKm(
        { lat: userLocation[0], lng: userLocation[1] },
        { lat: b.lat, lng: b.lng }
      );
      return { ...b, distance };
    });

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query) ||
          b.description?.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((b) => selectedCategories.includes(b.category));
    }

    filtered = filtered.filter((b) => (b.distance || 999) <= maxDistance);

    if (openNow) {
      filtered = filtered.filter((b) => b.onlineStatus === "ONLINE");
    }

    if (highRated) {
      filtered = filtered.filter((b) => b.avgRating >= 4.0);
    }

    filtered.sort((a, b) => {
      if (sortBy === "rating") return b.avgRating - a.avgRating;
      if (sortBy === "distance") return (a.distance || 0) - (b.distance || 0);
      return b.avgRating - a.avgRating;
    });

    setFilteredBusinesses(filtered);
  }, [
    businesses,
    selectedCategories,
    maxDistance,
    sortBy,
    searchQuery,
    openNow,
    highRated,
    userLocation,
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(loc);
          initialLocationRef.current = loc;
          loadBusinesses(loc[0], loc[1]);
        },
        () => {
          // Fallback to initial location if geolocation fails
          loadBusinesses(initialLocationRef.current[0], initialLocationRef.current[1]);
        }
      );
    } else {
      // Fallback to initial location if geolocation not available
      loadBusinesses(initialLocationRef.current[0], initialLocationRef.current[1]);
    }
  }, [loadBusinesses]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business);
    if (!business.products) loadBusinessProducts(business.id);
  };

  const loadBusinessProducts = async (businessId: string) => {
    try {
      const res = await fetch(`/api/businesses/${businessId}/products`);
      if (res.ok) {
        const products = await res.json();
        setBusinesses((prev) =>
          prev.map((b) => (b.id === businessId ? { ...b, products } : b))
        );
        setSelectedBusiness((prev) =>
          prev?.id === businessId ? { ...prev, products } : prev
        );
      }
    } catch {
      console.error("Ürünler yüklenemedi");
    }
  };

  const addToCartHandler = (product: Product) => {
    if (!selectedBusiness) return;
    addItem({
      productId: product.id,
      businessId: selectedBusiness.id,
      businessName: selectedBusiness.name,
      productName: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  const removeFromCartHandler = (productId: string) => {
    if (!selectedBusiness) return;
    const itemId = `${selectedBusiness.id}_${productId}`;
    const existing = cartItems.find((i) => i.id === itemId);
    if (existing && existing.quantity > 1) {
      updateQuantity(itemId, existing.quantity - 1);
    } else {
      removeItem(itemId);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxDistance(10);
    setSortBy("distance");
    setOpenNow(false);
    setHighRated(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      ...
      {/* TÜM TASARIM AYNEN KALDI */}
      ...
      {/* Map Component */}
      {!loading && (
        <LeafletMap
          businesses={filteredBusinesses}
          center={userLocation}
          zoom={13}
          onBusinessClick={handleBusinessClick}
        />
      )}
      ...
    </div>
  );
}
