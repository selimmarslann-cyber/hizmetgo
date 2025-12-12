"use client";
import dynamic from "next/dynamic";
import { RotatingHeadline } from "@/components/home/RotatingHeadline";
import SmartSearchBar from "@/components/ui/SmartSearchBar";
import { SearchExperienceShowcase } from "@/components/home/SearchExperienceShowcase";
import HeroAfterImage from "@/components/home/HeroAfterImage";
import AppDownloadFinal from "@/components/home/AppDownloadFinal";

const PopularCategoriesSection = dynamic(
  () => import("@/components/home/PopularCategoriesTabs").then((mod) => ({ default: mod.PopularCategoriesSection })),
  { 
    ssr: false,
    loading: () => <div className="h-64 flex items-center justify-center"><p className="text-slate-600">Yükleniyor...</p></div>
  }
);

export default function ClientHero() {
  return (
    <div className="w-full bg-slate-50 relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 relative z-0">
        {/* Hero Section */}
        <section className="relative pb-12 md:pb-16">
          <div className="w-full">
            {/* Rotating Headline */}
            <div className="mb-8 md:mb-12">
              <RotatingHeadline />
            </div>

            {/* Search Bar */}
            <div className="mb-8 md:mb-12">
              <SmartSearchBar />
            </div>
          </div>
        </section>

        {/* Hero After Image */}
        <HeroAfterImage />

        {/* Popular Categories */}
        <section className="relative py-12 md:py-16">
          <div className="w-full">
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 text-center">
                Popüler Kategoriler
              </h2>
              <PopularCategoriesSection />
            </div>
          </div>
        </section>

        {/* Search Experience Showcase with MobileDemo */}
        <SearchExperienceShowcase />

        {/* App Download Section */}
        <AppDownloadFinal />
      </div>
    </div>
  );
}

