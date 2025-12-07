"use client";

import { motion } from "framer-motion";

export default function Logo({
  className = "w-10 h-10",
}: {
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${className} relative flex items-center justify-center`}
    >
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
    </motion.div>
  );
}
