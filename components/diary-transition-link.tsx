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
    window.setTimeout(() => router.push("/diary"), 720);
  };

  return (
    <>
      <button
        type="button"
        onClick={openDiary}
        className={className}
        aria-label={ariaLabel ?? "Open My Diary"}
      >
        {children}
      </button>
      {opening ? (
        <div className="diary-open-transition" aria-hidden="true">
          <div className="diary-open-portal">
            <span />
            <p>Opening Diary</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
