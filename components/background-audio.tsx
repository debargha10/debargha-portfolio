"use client";

import { Music2, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = useCallback(async (userGesture = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = AUDIO_VOLUME;
    seekToStart(audio);

    try {
      audio.muted = userGesture ? muted : true;
      await audio.play();
      if (!userGesture) {
        window.setTimeout(() => {
          audio.muted = muted;
        }, 250);
      }
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [muted]);

  useEffect(() => {
    void playAudio();

    const unlockAudio = () => {
      void playAudio(true);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    const retryAudio = () => {
      if (!audioRef.current?.paused) return;
      void playAudio();
    };
    const eagerPlay = () => {
      void playAudio();
    };

    window.addEventListener("pageshow", eagerPlay);
    window.addEventListener("load", eagerPlay);
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("focus", retryAudio);
    document.addEventListener("visibilitychange", retryAudio);
    const earlyRetry = window.setInterval(() => {
      if (!audioRef.current?.paused) {
        window.clearInterval(earlyRetry);
        return;
      }
      void playAudio();
    }, 900);

    return () => {
      window.clearInterval(earlyRetry);
      window.removeEventListener("pageshow", eagerPlay);
      window.removeEventListener("load", eagerPlay);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("focus", retryAudio);
      document.removeEventListener("visibilitychange", retryAudio);
    };
  }, [playAudio]);

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio || !isPlaying || audio.paused || audio.muted) {
      setMuted(false);
      if (audio) {
        audio.muted = false;
        audio.volume = AUDIO_VOLUME;
      }
      void playAudio(true);
      return;
    }

    const nextMuted = !muted;

    setMuted(nextMuted);

    if (audio) {
      audio.muted = nextMuted;
      audio.volume = AUDIO_VOLUME;
      if (!nextMuted) {
        void audio.play().then(() => setIsPlaying(true));
      }
    }
  };

  const Icon = muted ? VolumeX : isPlaying ? Volume2 : Music2;

  return (
    <>
      <audio
        ref={audioRef}
        src="/soft.mp3"
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
      <button
        type="button"
        onClick={toggleMute}
        className="cosmic-key music-control"
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        title={muted ? "Unmute music" : isPlaying ? "Mute music" : "Play music"}
      >
        <Icon size={18} />
        <span>{muted ? "Muted" : isPlaying ? "Music" : "Play"}</span>
      </button>
    </>
  );
}
