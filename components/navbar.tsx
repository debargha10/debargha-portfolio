"use client";

import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/data";
import { useScrollPercent } from "@/hooks/use-scroll-progress";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { isScrolled } = useScrollPercent();
  const lastScrollY = useRef(0);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      const scrollingUp = currentY < lastScrollY.current;

      if (currentY < 80 || open) {
        clearHideTimer();
        setHidden(false);
      } else if (Math.abs(currentY - lastScrollY.current) > 8) {
        if (scrollingDown) {
          clearHideTimer();
          setHidden(true);
        }
        if (scrollingUp) {
          setHidden(false);
          clearHideTimer();
          hideTimer.current = window.setTimeout(() => {
            if (window.scrollY >= 80) setHidden(true);
          }, 5000);
        }
      }

      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearHideTimer();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -42, opacity: 0, filter: "blur(14px)", scale: 0.985 }}
      animate={{
        y: hidden ? -118 : 0,
        opacity: hidden ? 0 : 1,
        filter: hidden ? "blur(18px)" : "blur(0px)",
        scale: hidden ? 0.985 : 1,
      }}
      transition={{ duration: hidden ? 0.56 : 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{
        pointerEvents: hidden ? "none" : "auto",
        willChange: "transform, opacity, filter",
      }}
      className="fixed left-0 right-0 top-0 z-[80] px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition duration-500 md:px-5 ${
          isScrolled
            ? "border-white/[0.12] bg-black/[0.34] shadow-glass backdrop-blur-2xl"
            : "border-white/[0.08] bg-white/[0.05] backdrop-blur-md"
        }`}
        aria-label="Primary navigation"
      >
        <a href="#hero" className="text-sm font-semibold text-white">
          DA
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-titanium transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="cosmic-key hidden rounded-full px-4 py-2 text-sm font-medium transition md:inline-flex"
        >
          Let&apos;s build
        </a>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="premium-glow-button grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/10 bg-black/76 p-3 backdrop-blur-2xl md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm text-titanium hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      ) : null}
    </motion.header>
  );
}
