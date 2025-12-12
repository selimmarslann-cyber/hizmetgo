"use client";
import { ReactNode, Suspense } from "react";
import dynamic from "next/dynamic";
import AppFooter from "@/components/layout/AppFooter";
import PromotionalBanner from "@/components/layout/PromotionalBanner";

const AppHeader = dynamic(
  () => import("@/components/layout/AppHeader"),
  { ssr: false }
);

export default function BusinessLayoutClient({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PromotionalBanner />
      <Suspense fallback={<div className="h-[170px] bg-white border-b border-slate-200" />}>
        <AppHeader />
      </Suspense>
      <main className="flex-1 pt-[170px]">{children}</main>
      <AppFooter />
    </div>
  );
}

