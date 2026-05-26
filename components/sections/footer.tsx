"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="px-5 pb-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl border-t border-white/10 pt-8"
      >
        <div className="mb-8 h-px w-full animated-line" />
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-titanium md:flex-row">
          <p>© 2026 Debargha Adhikary. All rights reserved.</p>
          <p>Built with Next.js, Framer Motion, Lenis, and Three.js.</p>
        </div>
      </motion.div>
    </footer>
  );
}
