export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ServicesPageClient from "./ServicesPageClient";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-12 bg-slate-200 rounded-lg mb-6 max-w-md"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ServicesPageClient />
    </Suspense>
  );
}
