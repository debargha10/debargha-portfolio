"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { diaryImages } from "@/lib/diary-data";
import { reveal } from "@/lib/motion";

const previewImages = diaryImages.slice(0, 6);

export function MyDiary() {
  return (
    <section id="diary" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(69,163,255,0.12),transparent_34%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="My Diary"
          title="A dark little gallery of places, motion, and memories."
          body="A travel diary that opens into a cinematic photo and video room."
        />
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="mx-auto max-w-4xl"
        >
          <Link
            href="/diary"
            className="group glass relative block min-h-[360px] overflow-hidden rounded-[2rem] p-5"
            aria-label="Open My Diary travel gallery"
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="diary-preview-grid absolute inset-4">
              {previewImages.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt=""
                  className="diary-preview-image"
                  style={{ animationDelay: `${index * 0.7}s` }}
                />
              ))}
            </div>
            <div className="relative z-10 flex min-h-[320px] flex-col justify-between">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-xl">
                <Images size={17} />
                Travel Gallery
              </div>
              <div>
                <h3 className="text-4xl font-semibold text-white md:text-6xl">MY DIARY</h3>
                <p className="mt-4 max-w-lg text-lg leading-8 text-titanium">
                  Hover or click to enter a shuffled gallery of travel images and motion.
                </p>
                <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition group-hover:scale-[1.03]">
                  Open Diary
                  <ArrowUpRight size={17} />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
