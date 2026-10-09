"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  showUnderline?: boolean;
}

export function CountUp({
  target,
  suffix = "",
  duration = 1600,
  className = "",
  showUnderline = true,
}: CountUpProps) {
  const [containerRef, inView] = useInView<HTMLDivElement>({ once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [count, setCount] = useState<number>(() => (reduced ? target : 0));
  const [isDone, setIsDone] = useState<boolean>(() => reduced);

  useEffect(() => {
    if (reduced) return;
    if (!inView) return;

    let startTime: number | null = null;
    let animId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out cubic: 1 - (1 - t)^3
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(ease * target);
      setCount(currentVal);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setCount(target);
        setIsDone(true);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, [inView, target, duration, reduced]);

  const displayCount = reduced ? target : count;
  const displayDone = reduced ? true : isDone;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <span className="tabular-nums">
        {displayCount}
        {suffix}
      </span>

      {/* Thin lime underline that draws across once counting is complete */}
      {showUnderline && (
        <span
          className="absolute left-0 -bottom-1 h-[2px] bg-[#E4F86E] rounded-full transition-all duration-500 ease-out pointer-events-none"
          style={{
            width: displayDone ? "100%" : "0%",
            opacity: displayDone ? 1 : 0,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
