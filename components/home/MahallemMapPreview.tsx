"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Mock business data for preview
const MOCK_BUSINESSES = [
  {
    id: "1",
    name: "Ahmet Temizlik",
    category: "Temizlik",
    lat: 41.0082,
    lng: 28.9784,
    avgRating: 4.8,
    reviewCount: 24,
    onlineStatus: "ONLINE",
  },
  {
    id: "2",
    name: "Mehmet Tamirci",
    category: "Tamir",
    lat: 41.012,
    lng: 28.982,
    avgRating: 4.9,
    reviewCount: 18,
    onlineStatus: "ONLINE",
  },
  {
    id: "3",
    name: "Ayşe Pet Care",
    category: "Evcil Hayvan",
    lat: 41.005,
    lng: 28.975,
    avgRating: 4.7,
    reviewCount: 31,
    onlineStatus: "ONLINE",
  },
];

interface Business {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  avgRating: number;
  reviewCount: number;
  onlineStatus: string;
}

interface HizmetgoMapPreviewProps {
  className?: string;
}

export default function HizmetgoMapPreview({
  className,
}: HizmetgoMapPreviewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [hoveredBusiness, setHoveredBusiness] = useState<Business | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Dynamic import for MapLibre
    import("maplibre-gl").then((maplibregl) => {
      // CSS import is handled at the top level

      // Use a light, Google Maps-like style
      const mapStyle =
        process.env.NEXT_PUBLIC_MAPLIBRE_STYLE_URL ||
        "https://api.maptiler.com/maps/streets-v2/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL";

      const map = new maplibregl.default.Map({
        container: mapContainer.current!,
        style: mapStyle,
        center: [28.9784, 41.0082], // İstanbul Kadıköy
        zoom: 13,
        attributionControl: false,
      });

      // Add navigation controls
      map.addControl(new maplibregl.default.NavigationControl(), "top-right");

      // Add markers
      MOCK_BUSINESSES.forEach((business) => {
        const el = document.createElement("div");
        el.className = "cursor-pointer";
        el.innerHTML = `
          <div class="relative">
            <div class="w-10 h-10 rounded-full bg-white border-3 border-orange-500 shadow-lg flex items-center justify-center">
              <div class="w-6 h-6 rounded-full ${
                business.onlineStatus === "ONLINE"
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }"></div>
            </div>
            <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500"></div>
          </div>
        `;
        el.addEventListener("mouseenter", () => setHoveredBusiness(business));
        el.addEventListener("mouseleave", () => setHoveredBusiness(null));

        new maplibregl.default.Marker({ element: el })
          .setLngLat([business.lng, business.lat])
          .addTo(map);
      });

      map.on("load", () => setMapLoaded(true));

      return () => {
        map.remove();
      };
    });
  }, []);

  return (
    <div className={`relative ${className}`}>
      <Card className="bg-white rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.12)] border-0 overflow-hidden">
        {/* Map Container */}
        <div
          ref={mapContainer}
          className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
        />

        {/* Filter Chips Overlay */}
        <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
          {["Hepsi", "En Yakın", "En Yüksek Puanlı", "Şu an Online"].map(
            (filter) => (
              <Badge
                key={filter}
                className="bg-white/95 backdrop-blur-sm text-slate-700 hover:bg-white cursor-pointer shadow-md border border-slate-200"
              >
                {filter}
              </Badge>
            ),
          )}
        </div>

        {/* Hover Tooltip */}
        {hoveredBusiness && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 z-20"
          >
            <Card className="bg-white/95 backdrop-blur-sm p-4 shadow-xl border border-slate-200">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 mb-1">
                    {hoveredBusiness.name}
                  </h4>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {hoveredBusiness.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-slate-900">
                        {hoveredBusiness.avgRating}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({hoveredBusiness.reviewCount})
                      </span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <MapPin className="w-3 h-3" />
                      <span>0.8 km</span>
                    </div>
                  </div>
                </div>
                {hoveredBusiness.onlineStatus === "ONLINE" && (
                  <Badge className="bg-emerald-500 text-white text-xs">
                    <span className="w-2 h-2 bg-white rounded-full inline-block mr-1.5 animate-pulse" />
                    Online
                  </Badge>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center rounded-2xl">
            <div className="text-slate-400">Harita yükleniyor...</div>
          </div>
        )}
      </Card>
    </div>
  );
}
