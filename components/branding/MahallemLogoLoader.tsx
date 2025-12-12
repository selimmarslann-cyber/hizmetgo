"use client";

import { useState, useEffect } from "react";

type HizmetgoLogoLoaderProps = {
  size?: number;
  className?: string;
};

export function HizmetgoLogoLoader({
  size = 96,
  className = "",
}: HizmetgoLogoLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [MotionComponents, setMotionComponents] = useState<{
    MotionDiv: any;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    // Dynamically import framer-motion only on client
    import("framer-motion").then((mod) => {
      setMotionComponents({
        MotionDiv: mod.motion.div,
      });
    });
  }, []);

  const ringSize = size * 1.2;
  const textSize = size * 0.4;

  const logoContent = (
    <div
        className="flex items-baseline gap-1"
        style={{
          fontSize: `${textSize}px`,
        }}
      >
        <span
          className="text-black lowercase font-bold"
          style={{
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
            letterSpacing: "-0.02em",
            fontWeight: 700,
          }}
        >
          hizmet
        </span>
        <span
          className="lowercase font-bold"
          style={
            {
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#FF6000",
              WebkitTextStroke: "2px white",
            } as React.CSSProperties
          }
        >
          go
        </span>
    </div>
  );

  if (!mounted || !MotionComponents) {
    return (
      <div
        className={`inline-flex items-center justify-center relative ${className}`}
        aria-label="Hizmetgo loading"
      >
        <div
          className="absolute rounded-full border-4 border-transparent"
          style={{
            width: ringSize,
            height: ringSize,
            borderTopColor: "#FF6000",
            borderRightColor: "#FF6000",
          }}
        />
        {logoContent}
      </div>
    );
  }

  const { MotionDiv } = MotionComponents;

  return (
    <div
      className={`inline-flex items-center justify-center relative ${className}`}
      aria-label="Hizmetgo loading"
    >
      {/* Dönen halka */}
      <MotionDiv
        className="absolute rounded-full border-4 border-transparent"
        style={{
          width: ringSize,
          height: ringSize,
          borderTopColor: "#FF6000",
          borderRightColor: "#FF6000",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        suppressHydrationWarning
      />

      {/* Logo Text */}
      <MotionDiv
        animate={{
          scale: [1, 1.05, 1],
          opacity: [1, 0.9, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        suppressHydrationWarning
      >
        {logoContent}
      </MotionDiv>
    </div>
  );
}

// Alias export for MahallemLogoLoader
export const MahallemLogoLoader = HizmetgoLogoLoader;
