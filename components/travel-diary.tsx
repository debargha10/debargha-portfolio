"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowLeft, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { diaryHeroVideos, diaryImages, diaryMusic, diaryVideos } from "@/lib/diary-data";

const AUDIO_START_TIME = 0.06;
const AUDIO_VOLUME = 0.8;
const TYPEWRITER_LETTER_DELAY_SECONDS = 0.5;
const TYPEWRITER_LETTER_DURATION_SECONDS = 0.32;
const DIARY_TITLE_TEXT = "MY DIARY";
const DIARY_SUBTITLE_TEXT = "exploring the new";
const DIARY_SUBTITLE_OFFSET = 8;
const AIR_VIDEO_REVEAL_DELAY_MS = Math.round(
  ((DIARY_SUBTITLE_OFFSET + DIARY_SUBTITLE_TEXT.length - 1) * TYPEWRITER_LETTER_DELAY_SECONDS +
    TYPEWRITER_LETTER_DURATION_SECONDS) *
    1000,
);

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
  const [returnHidden, setReturnHidden] = useState(false);
  const [airVisible, setAirVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const airVideoRef = useRef<HTMLVideoElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const lastScrollY = useRef(0);
  const lowerBackgroundVideo = diaryVideos[1]?.src ?? diaryVideos[0]?.src;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = AUDIO_VOLUME;
    seekToStart(audio);

    const play = async (userGesture = false) => {
      try {
        audio.muted = !userGesture;
        await audio.play();
        if (!userGesture) {
          window.setTimeout(() => {
            audio.muted = false;
          }, 250);
        }
      } catch {
        audio.muted = false;
      }
    };

    void play();
    const unlockAudio = () => {
      void play(true);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    const retryPlay = () => {
      void play();
    };

    window.addEventListener("pageshow", retryPlay);
    window.addEventListener("load", retryPlay);
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("focus", retryPlay);
    document.addEventListener("visibilitychange", retryPlay);
    const earlyRetry = window.setInterval(() => {
      if (!audio.paused) {
        window.clearInterval(earlyRetry);
        return;
      }
      void play();
    }, 900);

    return () => {
      window.clearInterval(earlyRetry);
      window.removeEventListener("pageshow", retryPlay);
      window.removeEventListener("load", retryPlay);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("focus", retryPlay);
      document.removeEventListener("visibilitychange", retryPlay);
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

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;

      if (currentY < 80) {
        setReturnHidden(false);
      } else if (Math.abs(currentY - lastScrollY.current) > 8) {
        setReturnHidden(scrollingDown);
      }

      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setAirVisible(true);
      const video = airVideoRef.current;
      if (!video) return;
      try {
        video.currentTime = 0;
      } catch {
        // Some mobile browsers allow seeking only after metadata is ready.
      }
      void video.play().catch(() => undefined);
    }, AIR_VIDEO_REVEAL_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, []);

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
        <Link
          href="/#diary"
          className={`diary-return-button ${returnHidden ? "diary-return-button-hidden" : ""}`}
        >
          <ArrowLeft size={17} />
          Return
        </Link>

        <section className="diary-hero-stage relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28">
          <video
            className="diary-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={diaryHeroVideos.mobile} media="(max-width: 767px)" type="video/mp4" />
            <source src={diaryHeroVideos.desktop} media="(min-width: 768px)" type="video/mp4" />
          </video>
          <div className="mx-auto w-full max-w-7xl">
            <div className="diary-hero-copy-row">
              <motion.div
                initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="diary-typewriter-wrap"
              >
                <TypewriterLine text={DIARY_TITLE_TEXT} />
                <TypewriterLine text={DIARY_SUBTITLE_TEXT} offset={DIARY_SUBTITLE_OFFSET} />
              </motion.div>
              <video
                ref={airVideoRef}
                className={`diary-air-video ${airVisible ? "diary-air-video-visible" : ""}`}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src="/diary/videos/air-alpha.webm" type="video/webm" />
                <source src="/diary/videos/air.mp4" type="video/mp4" />
              </video>
            </div>
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

function TypewriterLine({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <p className="diary-typewriter-line" aria-label={text}>
      {Array.from(text).map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: letter === " " ? 1 : 0.82, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: (offset + index) * TYPEWRITER_LETTER_DELAY_SECONDS,
            duration: TYPEWRITER_LETTER_DURATION_SECONDS,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {letter === " " ? "\u00a0" : letter}
        </motion.span>
      ))}
    </p>
  );
}
