"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  avgRating: number;
  reviewCount: number;
  onlineStatus: string;
  addressText: string;
}

interface BusinessMapProps {
  businesses: Business[];
  onBusinessClick?: (business: Business) => void;
  onMapMove?: (bounds: { ne: [number, number]; sw: [number, number] }) => void;
}

export default function BusinessMap({
  businesses,
  onBusinessClick,
  onMapMove,
}: BusinessMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );

  const updateMarkers = useCallback(() => {
    if (!map.current) return;

    // Eski marker'ları temizle
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // ONLINE işletmeleri öncelikli göster
    const onlineBusinesses = businesses.filter(
      (b) => b.onlineStatus === "ONLINE",
    );
    const otherBusinesses = businesses.filter(
      (b) => b.onlineStatus !== "ONLINE",
    );

    // ONLINE işletmeler için yeşil marker
    onlineBusinesses.forEach((business) => {
      const el = document.createElement("div");
      el.className = "business-marker online";
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "#22c55e";
      el.style.border = "3px solid white";
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([business.lng, business.lat])
        .addTo(map.current!);

      el.addEventListener("click", () => {
        setSelectedBusiness(business);
        if (onBusinessClick) {
          onBusinessClick(business);
        }
      });

      markersRef.current.push(marker);
    });

    // Diğer işletmeler için gri marker
    otherBusinesses.forEach((business) => {
      const el = document.createElement("div");
      el.className = "business-marker offline";
      el.style.width = "25px";
      el.style.height = "25px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "#9ca3af";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([business.lng, business.lat])
        .addTo(map.current!);

      el.addEventListener("click", () => {
        setSelectedBusiness(business);
        if (onBusinessClick) {
          onBusinessClick(business);
        }
      });

      markersRef.current.push(marker);
    });
  }, [businesses, onBusinessClick]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // MapLibre GL harita başlat
    // OpenStreetMap style kullan (ücretsiz)
    const mapStyle =
      process.env.NEXT_PUBLIC_MAPLIBRE_STYLE_URL ||
      "https://demotiles.maplibre.org/style.json";

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [29.0, 41.0], // İstanbul merkez
      zoom: 11,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Harita yüklendiğinde marker'ları ekle
    map.current.on("load", () => {
      updateMarkers();
    });

    // Viewport değiştiğinde marker'ları güncelle ve parent'a bildir
    const handleMoveEnd = () => {
      updateMarkers();
      if (onMapMove && map.current) {
        const bounds = map.current.getBounds();
        onMapMove({
          ne: [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
          sw: [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
        });
      }
    };
    map.current.on("moveend", handleMoveEnd);

    return () => {
      // Cleanup
      markersRef.current.forEach((marker) => marker.remove());
      if (map.current) {
        map.current.off("moveend", handleMoveEnd);
        map.current.remove();
      }
    };
  }, [onMapMove, updateMarkers]);

  // İşletmeler değiştiğinde marker'ları güncelle
  useEffect(() => {
    if (map.current?.loaded()) {
      updateMarkers();
    }
  }, [updateMarkers]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Marker popup */}
      {selectedBusiness && (
        <div className="absolute top-4 left-4 z-10 max-w-sm">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">
                  {selectedBusiness.name}
                </h3>
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{selectedBusiness.category}</Badge>
                <Badge
                  variant={
                    selectedBusiness.onlineStatus === "ONLINE"
                      ? "success"
                      : "secondary"
                  }
                >
                  {selectedBusiness.onlineStatus === "ONLINE"
                    ? "Aktif"
                    : "Offline"}
                </Badge>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">
                  {selectedBusiness.avgRating.toFixed(1)} (
                  {selectedBusiness.reviewCount} değerlendirme)
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {selectedBusiness.addressText}
              </p>
              <Link href={`/business/${selectedBusiness.id}`}>
                <Button size="sm" className="w-full">
                  Detaya Git
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
