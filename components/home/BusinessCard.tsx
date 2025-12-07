"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Store, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distance?: number;
  priceRange?: string;
  image?: string;
  isOnline?: boolean;
  href?: string;
  avgResponseTime?: number | null; // Saat cinsinden ortalama yanıt süresi
  onOrderClick?: (businessId: string) => void; // "Sipariş ver" butonu için
  showActions?: boolean; // "Mağazaya git" ve "Sipariş ver" butonlarını göster
}

export default function BusinessCard({
  id,
  name,
  category,
  rating,
  reviewCount,
  distance,
  priceRange,
  image,
  isOnline = false,
  href = `/business/${id}`,
  avgResponseTime,
  onOrderClick,
  showActions = false,
}: BusinessCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className="h-full cursor-pointer border-2 border-gray-200 hover:border-[#FF6000]/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 bg-white overflow-hidden">
          {/* Image */}
          <div className="relative w-full h-40 md:h-48 bg-gray-100">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <span className="text-4xl font-bold text-slate-400">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Online Badge */}
            {isOnline && (
              <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
                Online
              </Badge>
            )}
          </div>

          <CardContent className="p-4 md:p-5">
            <div className="space-y-3">
              {/* Name & Category */}
              <div>
                <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 line-clamp-1">
                  {name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                  {category}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm text-gray-900">
                    {rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({reviewCount} değerlendirme)
                </span>
              </div>

              {/* Response Time */}
              {avgResponseTime !== undefined && avgResponseTime !== null && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Ort. yanıt: {avgResponseTime.toFixed(1)} saat</span>
                </div>
              )}

              {/* Distance & Price */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                {distance !== undefined && (
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{distance.toFixed(1)} km</span>
                  </div>
                )}
                {priceRange && (
                  <Badge variant="outline" className="text-xs">
                    {priceRange} ₺
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              {showActions && (
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Link
                    href={href}
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                    >
                      <Store className="w-3 h-3 mr-1" />
                      Mağazaya Git
                    </Button>
                  </Link>
                  {onOrderClick && (
                    <Button
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onOrderClick(id);
                      }}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Sipariş Ver
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
