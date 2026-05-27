"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/data";
import { reveal, stagger } from "@/lib/motion";
import { DiaryTransitionLink } from "@/components/diary-transition-link";

export function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Experience" title="A timeline of practical creativity, systems thinking, and execution." />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="absolute bottom-0 left-5 top-0 w-px bg-white/10 md:left-1/2" />
          {experience.map((item, index) => {
            const Icon = item.icon;
            const alignRight = index % 2 === 0;
            return (
              <motion.div
                key={item.title}
                variants={reveal}
                className={`relative mb-8 flex ${alignRight ? "md:justify-start" : "md:justify-end"}`}
              >
                <div className="absolute left-0 top-6 z-10 grid size-10 place-items-center rounded-full border border-electric/40 bg-ink text-electric md:left-1/2 md:-translate-x-1/2">
                  <Icon size={18} />
                </div>
                <ExperienceCard item={item} index={index} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  const content = (
    <motion.article
      whileHover={{ y: -6 }}
      className="glass group relative ml-16 w-[calc(100%-4rem)] overflow-hidden rounded-3xl p-6 md:ml-0 md:w-[45%]"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-electric">
        0{index + 1}
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
      <p className="mt-4 leading-7 text-titanium">{item.body}</p>
      {"prompt" in item && item.prompt ? (
        <div className="tap-explore-pop">
          {item.prompt}
        </div>
      ) : null}
    </motion.article>
  );

  if ("href" in item && item.href) {
    return (
      <DiaryTransitionLink className="contents" ariaLabel="Open travel diary">
        {content}
      </DiaryTransitionLink>
    );
  }

  return content;
}
