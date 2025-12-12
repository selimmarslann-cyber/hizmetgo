/**
 * Toaster Component - Toast notification container
 *
 * Layout'a eklenmeli
 */

"use client";

import { useToast } from "@/lib/hooks/useToast";
import { Toast } from "./toast";
import { useState, useEffect } from "react";

export function Toaster() {
  const [mounted, setMounted] = useState(false);
  const [MotionComponents, setMotionComponents] = useState<{
    MotionDiv: any;
    AnimatePresence: any;
  } | null>(null);
  
  useEffect(() => {
    setMounted(true);
    // Dynamically import framer-motion only on client
    import("framer-motion").then((mod) => {
      setMotionComponents({
        MotionDiv: mod.motion.div,
        AnimatePresence: mod.AnimatePresence,
      });
    });
  }, []);
  
  const { toasts, removeToast } = useToast();

  // Prevent framer-motion from rendering during SSR/static generation
  // to avoid useContext errors when React context isn't initialized
  if (toasts.length === 0 || !mounted || !MotionComponents) {
    return null;
  }

  const { MotionDiv, AnimatePresence } = MotionComponents;

  return (
    <div className="fixed top-20 right-4 z-toast flex flex-col gap-2 max-w-md pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <MotionDiv
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto"
          >
            <Toast
              id={toast.id}
              title={toast.title}
              description={toast.description}
              variant={toast.variant}
              onClose={() => removeToast(toast.id)}
            />
          </MotionDiv>
        ))}
      </AnimatePresence>
    </div>
  );
}
