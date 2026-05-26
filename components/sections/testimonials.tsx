"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/data";
import { reveal, stagger } from "@/lib/motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Glass-light notes from collaborators and clients."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 md:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.article
              key={item.name}
              variants={reveal}
              whileHover={{ y: -8, rotateX: 2 }}
              className="glass rounded-3xl p-7"
            >
              <Quote className="mb-8 text-electric" size={26} />
              <p className="text-lg leading-8 text-white">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-8 h-px w-full bg-white/10" />
              <p className="mt-5 font-semibold text-white">{item.name}</p>
              <p className="mt-1 text-sm text-titanium">{item.role}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
