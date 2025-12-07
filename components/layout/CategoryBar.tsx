"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const CATEGORIES = [
  { name: "Elektrik", keyword: "elektrik" },
  { name: "Temizlik", keyword: "temizlik" },
  { name: "Tesisat", keyword: "tesisat" },
  { name: "Boya badana", keyword: "boya badana" },
  { name: "Nakliyat", keyword: "nakliyat" },
  { name: "Beyaz eşya", keyword: "beyaz eşya" },
  { name: "Özel ders", keyword: "özel ders" },
  { name: "Hayvan bakım", keyword: "evcil hayvan" },
  { name: "Bahçıvan", keyword: "bahçıvan" },
  { name: "Marangoz", keyword: "marangoz" },
  { name: "Klima", keyword: "klima" },
  { name: "Cam balkon", keyword: "cam balkon" },
  { name: "Asansör", keyword: "asansör" },
  { name: "Güvenlik", keyword: "güvenlik" },
  { name: "Fotoğrafçı", keyword: "fotoğrafçı" },
  { name: "Nakliye", keyword: "nakliye" },
];

export default function CategoryBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams?.get("q") || "";

  const handleCategoryClick = (keyword: string) => {
    router.push(`/request?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-[72px] z-30 shadow-sm">
      <div className="w-full">
        <div className="flex items-center gap-1.5 px-2 md:px-4 py-2 md:py-2.5">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.keyword;
            return (
              <button
                key={category.keyword}
                onClick={() => handleCategoryClick(category.keyword)}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 flex-1 text-center",
                  isActive
                    ? "bg-brand-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 bg-white border border-slate-200",
                )}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
