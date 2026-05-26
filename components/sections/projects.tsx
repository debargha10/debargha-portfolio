"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/data";
import { reveal } from "@/lib/motion";

export function Projects() {
  return (
    <section id="projects" className="section-pad relative overflow-hidden">
      <div className="absolute inset-x-0 top-32 h-[36rem] bg-[radial-gradient(circle_at_50%_50%,rgba(69,163,255,0.12),transparent_58%)]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Cinematic product reveals for systems built with intelligence and intent."
        />
        <div className="space-y-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-140px" }}
              whileHover={{ scale: 1.01 }}
              className="group sticky top-24 overflow-hidden rounded-[2rem] border border-white/10 bg-[#080a0f]/90 p-5 shadow-glass backdrop-blur-xl md:p-8"
              style={{ zIndex: 10 + index }}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${project.accent}`} />
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-black">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 blur-2xl`} />
                  <motion.div
                    className="absolute inset-10 rounded-full border border-white/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-20 rounded-full border border-electric/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-[0.34em] text-titanium">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-4 max-w-sm text-4xl font-semibold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center py-4">
                  <h3 className="text-3xl font-semibold text-white md:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-titanium">
                    {project.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-titanium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-9 flex flex-wrap gap-4">
                    <a
                      href="#contact"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-electric hover:text-white"
                    >
                      Send Message
                      <ArrowUpRight size={16} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
