"use client";

import { useState } from "react";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SupportHelpButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.push("/support/help")}
      className="hidden lg:flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md relative"
      aria-label="Destek"
    >
      <div className="relative">
        <Headphones className="h-5 w-5" />
        {/* Çevrimiçi göstergesi */}
        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
      </div>
      <span className="text-sm font-medium">Destek</span>
    </Button>
  );
}
