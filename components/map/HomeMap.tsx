"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useHizmetgoStore } from "@/lib/store/useHizmetgoStore";
import { getMatchingVendors } from "@/lib/utils/matching";
import type { UserProfile, Job } from "@/lib/types/mahallem";

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

interface HomeMapProps {
  onMapClick?: () => void;
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

function MapClickHandler({ onMapClick }: { onMapClick?: () => void }) {
  useMapEvents({
    click: () => {
      if (onMapClick) {
        onMapClick();
      }
    },
  });
  return null;
}

export default function HomeMap({ onMapClick }: HomeMapProps) {
  const { users, jobs } = useHizmetgoStore();
  const [userLocation, setUserLocation] = useState<[number, number]>([
    41.0082, 28.9784,
  ]);
  const [vendors, setVendors] = useState<UserProfile[]>([]);
  const [instantJobs, setInstantJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        () => {
          // Fallback to İstanbul
          setUserLocation([41.0082, 28.9784]);
        },
      );
    }

    // Load vendors and jobs
    const allVendors = users.filter((u) => u.role === "vendor" && u.location);
    setVendors(allVendors);

    const instant = jobs.filter(
      (j) => j.type === "instant" && j.status === "open" && j.location,
    );
    setInstantJobs(instant);
  }, [users, jobs]);

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
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: "100%", width: "100%", cursor: "pointer" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={userLocation} zoom={13} />
        {onMapClick && <MapClickHandler onMapClick={onMapClick} />}

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
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#FF6000]"></span>
            <span className="font-medium">Esnaflar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#10B981]"></span>
            <span className="font-medium">Anlık İşler</span>
          </div>
        </div>
      </div>
    </div>
  );
}
