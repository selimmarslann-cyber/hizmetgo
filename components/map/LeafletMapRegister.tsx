"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";

// Leaflet CSS - client-side only
if (typeof window !== "undefined") {
  require("leaflet/dist/leaflet.css");
}

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LeafletMapRegisterProps {
  center: [number, number];
  zoom?: number;
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (lat: number, lng: number) => void;
  businessLogo?: string;
  businessName?: string;
  rating?: number;
  reviewCount?: number;
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

export default function LeafletMapRegister({
  center,
  zoom = 13,
  selectedLocation,
  onLocationSelect,
  businessLogo,
  businessName,
  rating,
  reviewCount,
}: LeafletMapRegisterProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Custom icon for selected location - dükkan emojisi veya logo
  const selectedIcon = L.divIcon({
    className: "custom-selected-marker",
    html: businessLogo 
      ? `<div style="
          width: 48px; 
          height: 48px; 
          border-radius: 8px; 
          border: 3px solid white; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.3); 
          cursor: pointer;
          overflow: hidden;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <img src="${businessLogo}" alt="${businessName || 'Dükkan'}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>`
      : `<div style="
          width: 48px; 
          height: 48px; 
          border-radius: 8px; 
          border: 3px solid white; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.3); 
          cursor: pointer;
          background: #FF6000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        ">🏪</div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  });

  // Popup content with rating and review count
  const popupContent = businessName 
    ? `<div style="padding: 8px; min-width: 150px;">
        <div style="font-weight: bold; margin-bottom: 4px; font-size: 14px;">${businessName}</div>
        ${rating !== undefined && reviewCount !== undefined ? `
          <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #666;">
            <span style="color: #FFA500;">⭐</span>
            <span style="font-weight: 600;">${rating.toFixed(1)}</span>
            <span style="color: #999;">(${reviewCount} değerlendirme)</span>
          </div>
        ` : ''}
      </div>`
    : '';

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {return;}

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [onLocationSelect]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", cursor: "crosshair" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={center} zoom={zoom} />

        {selectedLocation && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lng]}
            icon={selectedIcon}
          >
            {popupContent && (
              <Popup>
                <div dangerouslySetInnerHTML={{ __html: popupContent }} />
              </Popup>
            )}
          </Marker>
        )}
      </MapContainer>

      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
        <p className="text-sm font-semibold text-gray-900 mb-1">Konum Seçimi</p>
        <p className="text-xs text-gray-600">
          Haritaya tıklayarak dükkanınızın konumunu seçin
        </p>
      </div>
    </div>
  );
}
