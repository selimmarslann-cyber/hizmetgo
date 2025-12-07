"use client";
import { RotatingHeadline } from "@/components/home/RotatingHeadline";
import SmartSearchBar from "@/components/ui/SmartSearchBar";
import { PopularCategoriesSection } from "@/components/home/PopularCategoriesTabs";
import { SearchExperienceShowcase } from "@/components/home/SearchExperienceShowcase";
import HeroAfterImage from "@/components/home/HeroAfterImage";
import AppDownloadFinal from "@/components/home/AppDownloadFinal";

export default function ClientHero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* Hero Section */}
      <section className="relative pt-2 md:pt-4 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Rotating Headline */}
          <div className="mb-8 md:mb-12">
            <RotatingHeadline />
          </div>

          {/* Search Bar */}
          <div className="mb-12 md:mb-16">
            <SmartSearchBar />
          </div>
        </div>
      </section>

      {/* Hero After Image */}
      <HeroAfterImage />

      {/* Popular Categories */}
      <section className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
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
  );
}
