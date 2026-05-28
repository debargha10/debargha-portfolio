"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DiaryTransitionLink({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  const openDiary = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => router.push("/diary"), 1150);
  };

  return (
    <>
      <button
        type="button"
        onClick={openDiary}
        className={`premium-glow-button ${className ?? ""}`}
        aria-label={ariaLabel ?? "Open My Diary"}
      >
        {children}
      </button>
      {opening ? (
        <div className="diary-open-transition" aria-hidden="true">
          <div className="diary-open-portal">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/diary/videos/loading-alpha.webm" type="video/webm" />
              <source src="/diary/videos/loading.mp4" type="video/mp4" />
            </video>
            <p>Opening Diary</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
