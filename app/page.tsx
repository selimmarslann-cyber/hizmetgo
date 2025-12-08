"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary/ErrorBoundary";
import HeroAfterImage from "@/components/home/HeroAfterImage";
import { PopularCategoriesSection } from "@/components/home/PopularCategoriesTabs";
import { SearchExperienceShowcase } from "@/components/home/SearchExperienceShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import AppDownloadFinal from "@/components/home/AppDownloadFinal";
import SearchBarInfo from "@/components/home/SearchBarInfo";
import PromotionalBanner from "@/components/layout/PromotionalBanner";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";

// Client-only components with dynamic import to prevent hydration issues
const RotatingHeadline = dynamic(
  () => import("@/components/home/RotatingHeadline").then((mod) => ({ default: mod.RotatingHeadline })),
  { 
    ssr: false,
    loading: () => <div className="h-32 flex items-center justify-center"><p className="text-slate-600">Yükleniyor...</p></div>
  }
);

const SmartSearchBar = dynamic(
  () => import("@/components/ui/SmartSearchBar"),
  { 
    ssr: false,
    loading: () => <div className="h-20 flex items-center justify-center"><p className="text-slate-600">Yükleniyor...</p></div>
  }
);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Layout Components */}
      <PromotionalBanner />
      <Suspense fallback={<div className="h-[170px] bg-white border-b border-slate-200" />}>
        <AppHeader isPublic={true} />
      </Suspense>

      {/* Main Content */}
      <main className="flex-1">
        <div className="w-full bg-white relative">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 relative z-0">
            {/* Hero Section */}
            <section className="relative pb-12 md:pb-16">
              <div className="w-full">
                {/* Rotating Headline */}
                <ErrorBoundary>
                  <Suspense fallback={<div className="h-32 flex items-center justify-center"><p className="text-slate-600">Yükleniyor...</p></div>}>
                    <div className="mb-8 md:mb-12">
                      <RotatingHeadline />
                    </div>
                  </Suspense>
                </ErrorBoundary>

                {/* Search Bar */}
                <ErrorBoundary>
                  <Suspense fallback={<div className="h-20 flex items-center justify-center"><p className="text-slate-600">Yükleniyor...</p></div>}>
                    <div className="mb-6 md:mb-8">
                      <SmartSearchBar />
                    </div>
                  </Suspense>
                </ErrorBoundary>

                {/* Nasıl Çalışır? Bilgilendirme */}
                <ErrorBoundary>
                  <SearchBarInfo />
                </ErrorBoundary>
              </div>
            </section>

            {/* Hero After Image */}
            <ErrorBoundary>
              <HeroAfterImage />
            </ErrorBoundary>

            {/* Popular Categories */}
            <section className="relative py-12 md:py-16">
              <div className="w-full">
                <div className="mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 text-center">
                    Popüler Kategoriler
                  </h2>
                  <ErrorBoundary>
                    <PopularCategoriesSection />
                  </ErrorBoundary>
                </div>
              </div>
            </section>

            {/* Search Experience Showcase with MobileDemo */}
            <ErrorBoundary>
              <SearchExperienceShowcase />
            </ErrorBoundary>

            {/* Nasıl Çalışır? */}
            <ErrorBoundary>
              <HowItWorks />
            </ErrorBoundary>

            {/* App Download Section */}
            <ErrorBoundary>
              <AppDownloadFinal />
            </ErrorBoundary>
          </div>
        </div>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}

