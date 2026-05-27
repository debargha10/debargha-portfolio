"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowLeft, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { diaryHeroVideo, diaryImages, diaryMusic, diaryVideos } from "@/lib/diary-data";

export function TravelDiary() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const lowerBackgroundVideo = diaryVideos[1]?.src ?? diaryVideos[0]?.src;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.24;

    const play = async () => {
      try {
        audio.muted = true;
        await audio.play();
        window.setTimeout(() => {
          audio.muted = muted;
        }, 250);
      } catch {
        audio.muted = muted;
      }
    };

    void play();
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });
    window.addEventListener("focus", play);
    document.addEventListener("visibilitychange", play);

    return () => {
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
      window.removeEventListener("focus", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, [muted]);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([src, video]) => {
      if (!video) return;
      if (hoveredVideo && hoveredVideo !== src) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    });
  }, [hoveredVideo]);

  const toggleMute = () => {
    const audio = audioRef.current;
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (audio) {
      audio.muted = nextMuted;
      if (!nextMuted) void audio.play().catch(() => undefined);
    }
  };

  return (
    <main className="diary-page min-h-screen overflow-hidden bg-black text-white">
      <audio
        ref={audioRef}
        src={diaryMusic}
        loop
        autoPlay
        muted={false}
        preload="auto"
        playsInline
      />
      <div className="relative z-10">
        <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-2xl">
            <Link href="/#diary" className="inline-flex items-center gap-2 text-sm text-white">
              <ArrowLeft size={17} />
              Portfolio
            </Link>
            <button
              type="button"
              onClick={toggleMute}
              className="cosmic-key inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm"
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              {muted ? "Muted" : "Music"}
            </button>
          </div>
        </header>

        <section className="diary-hero-stage relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28">
          <video
            className="diary-hero-video"
            src={diaryHeroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="diary-hero-copy max-w-3xl"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.38em] text-electric">
                My Diary
              </p>
              <h1 className="text-6xl font-semibold leading-none md:text-8xl">
                exploring the new
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                A dim-dark gallery of travel frames, looping moments, and moving memories.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="diary-lower-stage relative overflow-hidden">
          <video
            className="diary-lower-background-video"
            src={lowerBackgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="diary-lower-mask" aria-hidden="true" />

        <section className="relative z-10 px-5 pb-24 pt-24">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {diaryVideos.map((video) => (
              <button
                type="button"
                key={video.src}
                className="diary-video-card group text-left"
                onClick={() => setSelectedVideo(video.src)}
                onMouseEnter={() => setHoveredVideo(video.src)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <video
                  ref={(node) => {
                    videoRefs.current[video.src] = node;
                  }}
                  src={video.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="diary-card-label">
                  <Play size={16} />
                  play
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="relative z-10 px-5 pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="diary-gallery-grid">
              {diaryImages.map((image, index) => (
                <button
                  type="button"
                  key={image.src}
                  onClick={() => setSelectedImage(image.src)}
                  className={`diary-image-card ${index % 5 === 0 ? "md:row-span-2" : ""}`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                  <span>View</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        </div>
      </div>

      {selectedImage ? (
        <div className="diary-lightbox" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="cosmic-key absolute right-5 top-5 grid size-11 place-items-center rounded-full"
            aria-label="Close image"
          >
            <X size={18} />
          </button>
          <img src={selectedImage} alt="Expanded travel diary frame" />
        </div>
      ) : null}
      {selectedVideo ? (
        <div className="diary-lightbox" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="cosmic-key absolute right-5 top-5 grid size-11 place-items-center rounded-full"
            aria-label="Close video"
          >
            <X size={18} />
          </button>
          <video
            src={selectedVideo}
            controls
            autoPlay
            playsInline
            className="diary-lightbox-video"
          />
        </div>
      ) : null}
    </main>
  );
}
