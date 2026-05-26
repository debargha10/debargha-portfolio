"use client";

import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThreeBackground } from "@/components/three-background";
import { ease } from "@/lib/motion";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-28"
    >
      <ThreeBackground />
      <motion.div
        className="absolute inset-x-[-12%] top-[-28%] h-[44rem] rounded-full bg-[radial-gradient(circle,rgba(69,163,255,0.34),transparent_62%)] blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.65, 0.92, 0.65] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.16),#050505_91%)]" />
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease }}
          className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-titanium backdrop-blur-xl"
        >
          <span className="size-2 rounded-full bg-electric shadow-[0_0_24px_rgba(69,163,255,0.9)]" />
          AI Developer from Kolkata, India
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 34, scale: 0.98, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.15, delay: 0.15, ease }}
          className="text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl md:text-8xl"
        >
          Building Digital Experiences Beyond Imagination.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-titanium md:text-2xl"
        >
          Developer • AI Engineer • Creative Technologist
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black shadow-glow transition hover:scale-[1.03] hover:bg-electric hover:text-white"
          >
            Explore Projects
            <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.12]"
          >
            <Mail size={17} />
            Contact Me
          </a>
        </motion.div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-titanium"
        aria-hidden="true"
      >
        <ArrowDown size={24} />
      </motion.div>
      <FloatingCards />
    </section>
  );
}

function FloatingCards() {
  const cards = [
    { className: "left-[8%] top-[30%]", label: "Local LLM" },
    { className: "right-[10%] top-[26%]", label: "Vision ML" },
    { className: "bottom-[17%] right-[16%]", label: "Automation" },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.9 + index * 0.12 },
            y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`glass pointer-events-none absolute z-10 hidden rounded-2xl px-5 py-4 text-sm text-white md:block ${card.className}`}
        >
          <div className="mb-2 h-px w-24 bg-gradient-to-r from-electric to-transparent" />
          {card.label}
        </motion.div>
      ))}
    </>
  );
}
