"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-electric">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-normal text-white md:text-6xl">
        {title}
      </h2>
      {body ? <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-titanium">{body}</p> : null}
    </motion.div>
  );
}
