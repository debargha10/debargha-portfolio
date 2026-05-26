"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const x = useSpring(mouseX, { stiffness: 90, damping: 26, mass: 0.45 });
  const y = useSpring(mouseY, { stiffness: 90, damping: 26, mass: 0.45 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX - 220);
      mouseY.set(event.clientY - 220);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-40 hidden h-[440px] w-[440px] rounded-full bg-electric/20 blur-3xl md:block"
      style={{ x, y }}
    />
  );
}
