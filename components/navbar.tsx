"use client";

import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { navItems } from "@/lib/data";
import { useScrollPercent } from "@/hooks/use-scroll-progress";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isScrolled } = useScrollPercent();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-[80] px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition duration-500 md:px-5 ${
          isScrolled
            ? "border-white/[0.12] bg-black/[0.48] shadow-glass backdrop-blur-2xl"
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
          className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-electric hover:text-white md:inline-flex"
        >
          Let&apos;s build
        </a>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
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
