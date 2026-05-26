"use client";

import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { socials } from "@/lib/data";
import { reveal } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[34rem] bg-[radial-gradient(circle_at_50%_100%,rgba(69,163,255,0.22),transparent_58%)]" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s design the next intelligent experience."
          body="For AI tools, automation systems, product interfaces, or digital campaigns, send a signal."
        />
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="glass mx-auto max-w-3xl rounded-[2rem] p-5 md:p-8"
        >
          <form className="grid gap-4" aria-label="Contact form">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="sr-only" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                placeholder="Name"
                className="min-h-14 rounded-2xl border border-white/10 bg-black/30 px-5 text-white outline-none transition placeholder:text-titanium focus:border-electric/70"
              />
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="min-h-14 rounded-2xl border border-white/10 bg-black/30 px-5 text-white outline-none transition placeholder:text-titanium focus:border-electric/70"
              />
            </div>
            <label className="sr-only" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me what you want to build"
              rows={6}
              className="resize-none rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition placeholder:text-titanium focus:border-electric/70"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-electric hover:text-white md:w-auto md:justify-self-end"
            >
              Send Message
              <Send size={17} />
            </button>
          </form>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group inline-flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-titanium transition hover:border-electric/50 hover:text-white"
                  aria-label={social.label}
                >
                  <Icon size={18} />
                  <span className="sr-only">{social.label}</span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
