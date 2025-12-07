"use client";
import { ReactNode } from "react";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import PromotionalBanner from "@/components/layout/PromotionalBanner";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PromotionalBanner />
      <AppHeader isPublic={true} />
      <main className="flex-1 pt-[170px]">{children}</main>
      <AppFooter />
    </div>
  );
}
