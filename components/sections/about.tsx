"use client";

import { MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { reveal, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/section-heading";

const stats = [
  ["Role", "AI Developer"],
  ["Focus", "Automation + Interfaces"],
  ["Base", "Kolkata, India"],
];

const timeline = ["Ideate", "Prototype", "Engineer", "Polish", "Launch"];

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-electric/10 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="A builder at the intersection of intelligence, utility, and cinematic digital craft."
        />
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="space-y-7"
          >
            <motion.div variants={reveal} className="flex items-center gap-3 text-titanium">
              <MapPin size={18} className="text-electric" />
              Debargha Adhikary • Kolkata, India
            </motion.div>
            <motion.h3 variants={reveal} className="text-3xl font-semibold text-white md:text-5xl">
              AI Developer | Python Developer | Creative Technologist
            </motion.h3>
            <motion.p variants={reveal} className="max-w-2xl text-lg leading-8 text-titanium">
              Passionate about building futuristic AI systems, immersive digital experiences,
              and scalable technologies that blend creativity with engineering.
            </motion.p>
            <motion.div variants={stagger} className="grid gap-3 sm:grid-cols-3">
              {stats.map(([label, value]) => (
                <motion.div key={label} variants={reveal} className="glass rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-titanium">{label}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative min-h-[520px] overflow-hidden rounded-[2rem] p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(69,163,255,0.22),transparent_36%)]" />
            <div className="relative flex h-full min-h-[470px] flex-col justify-between">
              <div>
                <Sparkles className="mb-8 text-electric" size={28} />
                <p className="max-w-xs text-2xl font-semibold leading-tight text-white">
                  Systems that feel intelligent before they feel complicated.
                </p>
              </div>
              <div className="space-y-5">
                {timeline.map((item, index) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="grid size-9 place-items-center rounded-full border border-white/[0.12] bg-white/[0.08] text-sm text-white">
                      {index + 1}
                    </div>
                    <div className="h-px flex-1 bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${52 + index * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: index * 0.12 }}
                        className="h-px bg-gradient-to-r from-electric to-white"
                      />
                    </div>
                    <span className="w-20 text-sm text-titanium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
