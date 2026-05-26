"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { skills } from "@/lib/data";
import { reveal, stagger } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="A focused stack for AI products, automation systems, and refined interfaces."
          body="Every capability is tuned toward building fast, intelligent, and production-ready digital experiences."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.article
                key={skill.name}
                variants={reveal}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-electric/40"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="mb-8 flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-white/[0.08] text-electric">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm text-titanium">{skill.level}%</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-electric to-white"
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
