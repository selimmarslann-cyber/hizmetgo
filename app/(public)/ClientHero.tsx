"use client";
import { ErrorBoundary } from "@/components/error-boundary/ErrorBoundary";
import HeroAfterImage from "@/components/home/HeroAfterImage";

// Phase 4: Progressive loading - Start with simplest component only
export default function ClientHero() {
  return (
    <div className="w-full bg-slate-50 relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 relative z-0">
        {/* Phase 4 Step 1: Only HeroAfterImage (simplest component) */}
        <ErrorBoundary>
          <HeroAfterImage />
        </ErrorBoundary>
      </div>
    </div>
  );
}

