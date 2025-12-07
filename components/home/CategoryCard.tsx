"use client";

import Link from "next/link";
import { HomePopularCategory } from "@/types/home-popular-category";
import { useState, useEffect } from "react";

interface CategoryCardProps {
  category: HomePopularCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  // URL zaten version içeriyor (data dosyasından geliyor), direkt kullan
  const imageSrc = category.imageSrc || "";

  // Resim yükleme kontrolü - SSR-safe
  useEffect(() => {
    if (!imageSrc) {
      setImageError(true);
      return;
    }

    // Resmin yüklenip yüklenmediğini kontrol et (client-side only)
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setImageError(false);
      };
      img.onerror = () => {
        setImageError(true);
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  return (
    <Link href={category.href}>
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/80 hover:border-brand-300">
        <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
          {!imageError && imageSrc ? (
            <img
              src={imageSrc}
              alt={category.title}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={() => setImageError(true)}
              key={imageSrc} // Key değişince React resmi yeniden render eder
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-600">
                {category.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-sm md:text-base font-bold text-white drop-shadow-lg mb-1">
              {category.title}
            </p>
            <p className="text-xs text-white/90 font-medium">Sık kullanılan</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
