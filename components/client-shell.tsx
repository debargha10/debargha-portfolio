"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import { PremiumSpaceBackground } from "@/components/effects/premium-space-background";
import { BackgroundAudio } from "@/components/background-audio";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useLenis();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1900);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink"
            exit={{ opacity: 0, scale: 1.04, filter: "blur(18px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="intro-starfield" aria-hidden="true" />
            <div className="cosmic-loader" aria-hidden="true">
              <span />
              <span />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(18px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              <motion.h1
                animate={{
                  textShadow: [
                    "0 0 20px rgba(69, 163, 255, 0.22)",
                    "0 0 54px rgba(126, 91, 255, 0.46)",
                    "0 0 20px rgba(69, 163, 255, 0.22)",
                  ],
                }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                className="intro-name"
              >
                DEBARGHA ADHIKARY
              </motion.h1>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <BackgroundAudio />
      <PremiumSpaceBackground />
      <ScrollProgress />
      <CursorGlow />
      <div className="relative z-10">{children}</div>
    </>
  );
}
