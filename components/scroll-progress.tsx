"use client";

import { motion } from "framer-motion";
import { useScrollPercent } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const { width } = useScrollPercent();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[90] h-[2px] bg-gradient-to-r from-electric via-white to-electric"
      style={{ width }}
    />
  );
}
