"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Business {
  id: string;
  name: string;
  lat: number;
  lng: number;
  onlineStatus: "ONLINE" | "OFFLINE" | "AUTO_OFFLINE";
  avgRating: number;
  reviewCount: number;
  category: string;
}

interface LeafletMapBusinessesProps {
  businesses: Business[];
  center: [number, number];
  zoom?: number;
  onBusinessClick: (business: Business) => void;
}

function MapController({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

export default function LeafletMapBusinesses({
  businesses,
  center,
  zoom = 13,
  onBusinessClick,
}: LeafletMapBusinessesProps) {
  // Create custom icons
  const onlineIcon = L.divIcon({
    className: "custom-business-marker online",
    html: `<div style="background-color: #22c55e; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); cursor: pointer;"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  const offlineIcon = L.divIcon({
    className: "custom-business-marker offline",
    html: `<div style="background-color: #94a3b8; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); cursor: pointer;"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={center} zoom={zoom} />

        {/* Business Markers */}
        {businesses.map((business) => (
          <Marker
            key={business.id}
            position={[business.lat, business.lng]}
            icon={business.onlineStatus === "ONLINE" ? onlineIcon : offlineIcon}
            eventHandlers={{
              click: () => onBusinessClick(business),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-sm mb-1">{business.name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    ⭐ {business.avgRating.toFixed(1)} ({business.reviewCount})
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {business.category}
                </div>
                <button
                  onClick={() => onBusinessClick(business)}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Menüyü Gör →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
