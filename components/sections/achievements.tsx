"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/section-heading";
import { achievements } from "@/lib/data";
import { reveal, stagger } from "@/lib/motion";

export function Achievements() {
  return (
    <section id="achievements" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(69,163,255,0.12),transparent_34%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Measured outcomes from building, coordinating, and automating real systems."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {achievements.map((achievement) => (
            <motion.article
              key={achievement.label}
              variants={reveal}
              whileHover={{ y: -8 }}
              className="glass rounded-3xl p-6 text-center"
            >
              <Counter value={achievement.value} suffix={achievement.suffix} />
              <p className="mt-4 text-sm leading-6 text-titanium">{achievement.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1700, bounce: 0 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return (
    <motion.div ref={ref} className="text-5xl font-semibold text-white">
      {rounded}
    </motion.div>
  );
}
