"use client";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary/ErrorBoundary";
import dynamic from "next/dynamic";

// Dynamic imports for layout components
const PromotionalBanner = dynamic(
  () => import("@/components/layout/PromotionalBanner"),
  { ssr: false }
);

const AppHeader = dynamic(
  () => import("@/components/layout/AppHeader"),
  { ssr: false }
);

const AppFooter = dynamic(
  () => import("@/components/layout/AppFooter"),
  { ssr: false }
);

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary>
        <Suspense fallback={<div className="h-[50px] bg-black border-b-2 border-brand-500" />}>
          <PromotionalBanner />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<div className="h-[70px] bg-white border-b border-slate-200" />}>
          <AppHeader isPublic={true} />
        </Suspense>
      </ErrorBoundary>
      <main className="flex-1">
        {children}
      </main>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <AppFooter />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
