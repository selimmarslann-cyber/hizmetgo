"use client";

import { useState, useEffect } from "react";

export default function Logo({
  className = "w-10 h-10",
}: {
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [MotionDiv, setMotionDiv] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Dynamically import framer-motion only on client
    import("framer-motion").then((mod) => {
      setMotionDiv(mod.motion.div);
    });
  }, []);

  const content = (
      <div className="flex items-baseline gap-1">
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
              fontWeight: 800,
              color: "#FF6000",
            } as React.CSSProperties
          }
        >
          go
        </span>
      </div>
  );

  return (
    <div className={`${className} relative flex items-center justify-center`}>
      {mounted && MotionDiv ? (
        <MotionDiv
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full h-full"
        >
          {content}
        </MotionDiv>
      ) : (
        content
      )}
    </div>
  );
}
