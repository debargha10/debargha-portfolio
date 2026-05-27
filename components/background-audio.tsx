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
    audio.muted = muted;

    try {
      await audio.play();
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

    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
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
      <audio ref={audioRef} src="/soft.mp3" loop preload="auto" playsInline />
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
