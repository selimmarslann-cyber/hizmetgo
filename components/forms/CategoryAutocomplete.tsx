"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/data/service-categories";
import { cn } from "@/lib/utils/cn";

interface CategoryAutocompleteProps {
  value: string[];
  onChange: (categories: string[]) => void;
  placeholder?: string;
  maxCategories?: number;
}

export default function CategoryAutocomplete({
  value,
  onChange,
  placeholder = "Kategori ara ve seç...",
  maxCategories = 10,
}: CategoryAutocompleteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sadece ana kategorileri al (alt hizmetler gösterilmeyecek)
  const allCategories = SERVICE_CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  // Filtreleme
  const filteredCategories = allCategories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !value.includes(cat.id),
  );

  const handleSelect = (categoryId: string) => {
    if (value.length >= maxCategories) return;
    onChange([...value, categoryId]);
    setSearchQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleRemove = (categoryId: string) => {
    onChange(value.filter((id) => id !== categoryId));
  };

  const getCategoryName = (categoryId: string) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return category?.name || categoryId;
  };

  // Dışarı tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Klavye navigasyonu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCategories.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredCategories[highlightedIndex].id);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={value.length >= maxCategories}
          className="w-full"
        />
        {isOpen && searchQuery && filteredCategories.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {filteredCategories.slice(0, 10).map((category, index) => (
              <div
                key={category.id}
                onClick={() => handleSelect(category.id)}
                className={cn(
                  "px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors",
                  index === highlightedIndex && "bg-gray-100",
                )}
              >
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seçili kategoriler */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((categoryId) => (
            <Badge
              key={categoryId}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              <span className="text-sm">{getCategoryName(categoryId)}</span>
              <button
                type="button"
                onClick={() => handleRemove(categoryId)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {value.length >= maxCategories && (
        <p className="text-xs text-gray-500">
          Maksimum {maxCategories} kategori seçebilirsiniz.
        </p>
      )}
    </div>
  );
}
