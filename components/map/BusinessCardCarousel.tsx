"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  category: string;
  avgRating: number;
  reviewCount: number;
  onlineStatus: string;
  addressText: string;
}

interface BusinessCardCarouselProps {
  businesses: Business[];
}

export default function BusinessCardCarousel({
  businesses,
}: BusinessCardCarouselProps) {
  if (businesses.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Bu bölgede işletme bulunamadı
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-4">
      {businesses.map((business) => (
        <Link key={business.id} href={`/business/${business.id}`}>
          <Card className="min-w-[280px] hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{business.name}</CardTitle>
                <Badge
                  variant={
                    business.onlineStatus === "ONLINE" ? "success" : "secondary"
                  }
                >
                  {business.onlineStatus === "ONLINE" ? "Aktif" : "Offline"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {business.avgRating.toFixed(1)} ({business.reviewCount}{" "}
                  değerlendirme)
                </span>
              </div>
              <Badge variant="secondary" className="mb-2">
                {business.category}
              </Badge>
              <p className="text-xs text-gray-500 line-clamp-2">
                {business.addressText}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
