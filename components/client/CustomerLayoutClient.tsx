"use client";
import { ReactNode, Suspense } from "react";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import PromotionalBanner from "@/components/layout/PromotionalBanner";

export default function CustomerLayoutClient({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={null}>
        <PromotionalBanner />
      </Suspense>
      <Suspense fallback={<div className="h-[170px] bg-white border-b border-slate-200" />}>
        <AppHeader />
      </Suspense>
      <main className="flex-1 pt-[170px]">{children}</main>
      <AppFooter />
    </div>
  );
}

