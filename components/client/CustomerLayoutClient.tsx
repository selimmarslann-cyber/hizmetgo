"use client";
import { ReactNode, Suspense } from "react";
import dynamic from "next/dynamic";
import AppFooter from "@/components/layout/AppFooter";
import PromotionalBanner from "@/components/layout/PromotionalBanner";

const AppHeader = dynamic(
  () => import("@/components/layout/AppHeader"),
  { ssr: false }
);

export default function CustomerLayoutClient({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={null}>
        <PromotionalBanner />
      </Suspense>
      <Suspense fallback={<div className="h-[170px] bg-white border-b border-slate-200" />}>
        <AppHeader />
      </Suspense>
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}

