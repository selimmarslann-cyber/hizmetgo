"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface GigCardProps {
  title: string;
  location: string;
  budget: string;
  tag: string;
  timeLabel?: string;
  distance?: string;
  onApply?: () => void;
}

export default function GigCard({
  title,
  location,
  budget,
  tag,
  timeLabel,
  distance,
  onApply,
}: GigCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className="flex-shrink-0"
    >
      <Card className="bg-white border-2 border-slate-200 rounded-3xl p-6 w-80 min-w-[320px] h-[320px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col group relative overflow-hidden">
        {/* Premium Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7A00] via-[#FFB347] to-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardContent className="p-0 flex flex-col flex-1 h-full">
          {/* Premium Badges */}
          <div className="flex items-start justify-between mb-5 gap-3">
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
              <Sparkles className="w-3 h-3 mr-1.5" />
              {tag}
            </Badge>
            {timeLabel && (
              <Badge
                variant="outline"
                className="text-xs font-semibold border-2 border-slate-300 rounded-full px-3 py-1.5 bg-white/80 backdrop-blur-sm"
              >
                <Clock className="w-3 h-3 mr-1.5" />
                {timeLabel}
              </Badge>
            )}
          </div>

          {/* Premium Title */}
          <h3
            className="font-bold text-xl text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-300"
            style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              letterSpacing: "-0.3px",
            }}
          >
            {title}
          </h3>

          {/* Premium Info Section */}
          <div className="space-y-3 mb-6 flex-1 min-h-0">
            <div className="flex items-center gap-2.5 text-slate-600 group-hover:text-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-semibold">{location}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 font-bold text-sm">₺</span>
              </div>
              <p className="text-base font-bold text-slate-900">{budget}</p>
            </div>

            {distance && (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <p className="text-xs font-medium">Yakınında • {distance}</p>
              </div>
            )}
          </div>

          {/* Premium Button - Always at bottom */}
          <div className="mt-auto pt-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#FF9A00] text-white rounded-xl py-6 font-bold shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 group/btn"
                onClick={onApply}
              >
                <span className="flex items-center justify-center gap-2">
                  Başvur
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
