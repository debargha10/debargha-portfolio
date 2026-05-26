"use client";

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export function useScrollPercent() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIsScrolled(value > 0.015);
  });

  return { width, isScrolled };
}
