"use client";

import { useEffect } from "react";
import { useToast } from "@/lib/hooks/useToast";
import { setGlobalToastHandler } from "@/lib/hooks/useToast";
import { Toaster } from "@/components/ui/toaster";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  useEffect(() => {
    // Set global toast handler
    setGlobalToastHandler((description, variant = "default", title) => {
      toast(description, variant, title);
    });
  }, [toast]);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
