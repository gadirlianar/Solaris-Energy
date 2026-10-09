"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function IntroOverlay() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"logo" | "curtain" | "done">("logo");

  useEffect(() => {
    // Check if running in reduced motion, static mode, or already seen this session
    if (reduced) return;
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("solaris_intro_seen");
    if (seen) return;

    sessionStorage.setItem("solaris_intro_seen", "true");

    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 10);

    // Timeline:
    // 0ms - 850ms: lime rounded square scales in and logo draws
    // 850ms - 1500ms: white curtain wipes up
    // 1600ms: unmount completely
    const curtainTimer = setTimeout(() => {
      setPhase("curtain");
    }, 850);

    const doneTimer = setTimeout(() => {
      setPhase("done");
      setVisible(false);
    }, 1500);

    const fallbackTimer = setTimeout(() => {
      setVisible(false);
    }, 1600);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(curtainTimer);
      clearTimeout(doneTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [reduced]);

  if (!visible || phase === "done" || reduced) return null;

  return (
    <div
      onClick={() => setVisible(false)}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-white cursor-pointer select-none overflow-hidden transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
      style={{
        clipPath: phase === "curtain" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
      }}
      aria-label="Solaris Energy Intro - Click to skip"
    >
      {/* Central Brand Reveal */}
      <div className="flex flex-col items-center">
        {/* Lime Rounded Square */}
        <div
          className="w-16 h-16 rounded-[18px] bg-[#E4F86E] flex items-center justify-center shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: phase === "logo" ? "scale(1)" : "scale(1.1)",
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 32 32"
            fill="none"
            className="text-[#111111]"
          >
            <path
              d="M16 4L28 16L16 28L4 16Z"
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="animate-[dash_0.8s_ease-out_forwards]"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 0,
              }}
            />
            <circle cx="16" cy="16" r="4.5" fill="#111111" />
          </svg>
        </div>

        <div className="mt-4 text-[20px] font-medium tracking-tight text-[#111111]">
          Solaris Energy
        </div>
      </div>
    </div>
  );
}
