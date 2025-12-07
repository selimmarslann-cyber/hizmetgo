"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  maxDistance: number;
  onDistanceChange: (distance: number) => void;
  sortBy: "distance" | "rating" | "responseTime";
  onSortChange: (sort: "distance" | "rating" | "responseTime") => void;
  onReset: () => void;
}

export default function MapFilters({
  categories,
  selectedCategories,
  onCategoriesChange,
  maxDistance,
  onDistanceChange,
  sortBy,
  onSortChange,
  onReset,
}: MapFiltersProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  return (
    <Card className="h-full border-2 border-slate-200">
      <CardHeader className="border-b bg-slate-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtreler
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs text-slate-600 hover:text-slate-900"
          >
            Sıfırla
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-6 overflow-y-auto">
        {/* Kategori Filtresi */}
        <div>
          <Label className="text-sm font-semibold text-slate-900 mb-3 block">
            Kategori
          </Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm text-slate-700 cursor-pointer flex-1"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Mesafe Filtresi */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-semibold text-slate-900">
              Mesafe
            </Label>
            <Badge variant="outline" className="text-xs">
              {maxDistance} km
            </Badge>
          </div>
          <Slider
            value={[maxDistance]}
            onValueChange={([value]) => onDistanceChange(value)}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Sıralama */}
        <div>
          <Label className="text-sm font-semibold text-slate-900 mb-3 block">
            Sıralama
          </Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">En yakın</SelectItem>
              <SelectItem value="rating">En yüksek puan</SelectItem>
              <SelectItem value="responseTime">En hızlı yanıt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
