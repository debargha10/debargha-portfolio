"use client";

import { Music2, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.22;

    try {
      audio.muted = true;
      await audio.play();
      window.setTimeout(() => {
        audio.muted = muted;
      }, 250);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [muted]);

  useEffect(() => {
    void playAudio();

    const unlockAudio = () => {
      void playAudio();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    const retryAudio = () => {
      if (!audioRef.current?.paused) return;
      void playAudio();
    };

    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("focus", retryAudio);
    document.addEventListener("visibilitychange", retryAudio);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("focus", retryAudio);
      document.removeEventListener("visibilitychange", retryAudio);
    };
  }, [playAudio]);

  const toggleMute = () => {
    const audio = audioRef.current;
    const nextMuted = !muted;

    setMuted(nextMuted);

    if (audio) {
      audio.muted = nextMuted;
      audio.volume = 0.22;
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
