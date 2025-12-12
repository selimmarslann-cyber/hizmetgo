"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type MotionDivComponent = ComponentType<{
  initial?: unknown;
  animate?: unknown;
  transition?: unknown;
  className?: string;
  children?: React.ReactNode;
}>;

export default function WelcomePageClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [MotionDiv, setMotionDiv] = useState<MotionDivComponent | null>(null);

  useEffect(() => {
    setMounted(true);

    let cancelled = false;
    import("framer-motion").then((mod) => {
      if (cancelled) return;
      setMotionDiv(() => mod.motion.div as unknown as MotionDivComponent);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const content = useMemo(
    () => (
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <PartyPopper className="w-20 h-20 text-yellow-400 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Aramıza hoş geldin!
          </h1>

          <p className="text-slate-300 mb-8">
            Artık mahallendeki esnaflarla kolayca buluşabilir, hizmet alabilir
            ve arkadaşlarını davet ederek kazanç elde edebilirsin.
          </p>

          <div>
            <Button
              onClick={() => router.push("/")}
              size="lg"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Başlayalım
            </Button>
          </div>
        </CardContent>
      </Card>
    ),
    [router]
  );

  if (!mounted || !MotionDiv) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">{content}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {content}
      </MotionDiv>
    </div>
  );
}
