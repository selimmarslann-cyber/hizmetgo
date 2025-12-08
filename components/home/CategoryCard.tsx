"use client";

import Link from "next/link";

export interface CategoryCardProps {
  category: {
    title: string;
    slug?: string;
    href?: string;
    imageSrc?: string;
    subtitle?: string;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const href = category.href || (category.slug ? `/kategori/${category.slug}` : "#");
  const imageSrc = category.imageSrc || "";

  return (
    <Link href={href} className="group block">
      <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900/80 shadow-sm transition hover:shadow-md">
        <div className="relative w-full pb-[75%]">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={category.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-700">
              <span className="text-3xl font-bold text-white/80">
                {category.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-3 bottom-3 z-20 space-y-1">
            <p className="truncate text-sm font-semibold text-white">
              {category.title}
            </p>
            {category.subtitle ? (
              <p className="text-xs text-white/80 truncate">{category.subtitle}</p>
            ) : (
              <p className="text-xs text-white/80">Sık kullanılan</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
