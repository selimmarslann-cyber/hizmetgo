"use client";

import { useEffect, useState } from "react";
import AnimatedLoadingLogo from "@/components/ui/AnimatedLoadingLogo";

export function FullScreenLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // SSR'da render etme
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F5F7] flex items-center justify-center">
      <AnimatedLoadingLogo />
    </div>
  );
}
