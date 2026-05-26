"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useLenis();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1150);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-ink"
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 h-px w-44 animated-line" />
              <p className="text-sm uppercase tracking-[0.34em] text-titanium">
                Debargha Adhikary
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <ScrollProgress />
      <CursorGlow />
      {children}
    </>
  );
}
