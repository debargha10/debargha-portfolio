"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowLeft, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { diaryHeroVideo, diaryImages, diaryMusic, diaryVideos } from "@/lib/diary-data";

const AUDIO_START_TIME = 0.06;
const AUDIO_VOLUME = 0.8;

function seekToStart(audio: HTMLAudioElement) {
  try {
    if (audio.currentTime < AUDIO_START_TIME) {
      audio.currentTime = AUDIO_START_TIME;
    }
  } catch {
    // Some browsers only allow seeking after metadata is ready.
  }
}

export function TravelDiary() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const lowerBackgroundVideo = diaryVideos[1]?.src ?? diaryVideos[0]?.src;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = AUDIO_VOLUME;
    seekToStart(audio);

    const play = async () => {
      try {
        audio.muted = true;
        await audio.play();
        window.setTimeout(() => {
          audio.muted = false;
        }, 250);
      } catch {
        audio.muted = false;
      }
    };

    void play();
    window.addEventListener("pageshow", play);
    window.addEventListener("load", play);
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("pointermove", play, { once: true });
    window.addEventListener("touchstart", play, { once: true });
    window.addEventListener("scroll", play, { once: true });
    window.addEventListener("keydown", play, { once: true });
    window.addEventListener("focus", play);
    document.addEventListener("visibilitychange", play);
    const earlyRetry = window.setInterval(() => {
      if (!audio.paused) {
        window.clearInterval(earlyRetry);
        return;
      }
      void play();
    }, 900);

    return () => {
      window.clearInterval(earlyRetry);
      window.removeEventListener("pageshow", play);
      window.removeEventListener("load", play);
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("pointermove", play);
      window.removeEventListener("touchstart", play);
      window.removeEventListener("scroll", play);
      window.removeEventListener("keydown", play);
      window.removeEventListener("focus", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, []);

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
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (audio) seekToStart(audio);
        }}
      />
      <div className="relative z-10">
        <Link href="/#diary" className="diary-return-button">
          <ArrowLeft size={17} />
          Return
        </Link>

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
