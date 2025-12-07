"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { UserProfile, Job } from "@/lib/types/mahallem";

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

interface LeafletMapProps {
  vendors?: UserProfile[];
  instantJobs?: Job[];
  center?: [number, number];
  zoom?: number;
  onVendorClick?: (vendor: UserProfile) => void;
  onJobClick?: (job: Job) => void;
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

export default function LeafletMap({
  vendors = [],
  instantJobs = [],
  center = [41.0082, 28.9784], // İstanbul default
  zoom = 13,
  onVendorClick,
  onJobClick,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Create custom icons
  const vendorIcon = L.divIcon({
    className: "custom-vendor-marker",
    html: `<div style="background-color: #FF6000; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const jobIcon = L.divIcon({
    className: "custom-job-marker",
    html: `<div style="background-color: #10B981; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={center} zoom={zoom} />

        {/* Vendor Markers */}
        {vendors.map((vendor) => {
          if (!vendor.location) return null;
          return (
            <Marker
              key={vendor.id}
              position={[vendor.location.lat, vendor.location.lng]}
              icon={vendorIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-sm mb-1">{vendor.name}</h3>
                  {vendor.skills.length > 0 && (
                    <div className="text-xs text-gray-600 mb-2">
                      {vendor.skills
                        .slice(0, 3)
                        .map((s) => s.label)
                        .join(", ")}
                    </div>
                  )}
                  {onVendorClick && (
                    <button
                      onClick={() => onVendorClick(vendor)}
                      className="text-xs text-primary hover:underline mt-1"
                    >
                      Profilini Gör
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Instant Job Markers */}
        {instantJobs.map((job) => {
          if (!job.location) return null;
          return (
            <Marker
              key={job.id}
              position={[job.location.lat, job.location.lng]}
              icon={jobIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="text-xs text-gray-500 mb-2">
                    {job.city} •{" "}
                    {new Date(job.createdAt).toLocaleDateString("tr-TR")}
                  </div>
                  {onJobClick && (
                    <button
                      onClick={() => onJobClick(job)}
                      className="text-xs text-primary hover:underline"
                    >
                      İş Detayı
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
