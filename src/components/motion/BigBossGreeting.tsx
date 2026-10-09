"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * ============================================================================
 * [MÜVƏQQƏTİ KOMPONENT / TEMPORARY COMPONENT]
 * "BIG BOSS DAN çakma bossa salam" - 7 Saniyəlik Minimalist Kreativ Ekran
 * 
 * Qeyd: İstifadəçi istənilən vaxt bunu silmək istədikdə, sadəcə bu faylı və
 * `src/app/page.tsx`-dəki <BigBossGreeting /> çağırışını silmək kifayətdir.
 * ============================================================================
 */
export function BigBossGreeting() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"active" | "exit" | "done">("active");
  const [progressPercent, setProgressPercent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7.0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setPhase("done");
      return;
    }

    // Precise 60fps/50ms timer for 7.0 seconds
    const interval = setInterval(() => {
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now();
      }
      const elapsedMs = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsedMs / 7000) * 100);
      const remainingSec = Math.max(0, (7000 - elapsedMs) / 1000);

      setProgressPercent(progress);
      setTimeLeft(parseFloat(remainingSec.toFixed(1)));

      if (elapsedMs >= 7000) {
        clearInterval(interval);
        handleExit();
      }
    }, 50);

    // Escape or Space key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [reduced]);

  const handleExit = () => {
    setPhase("exit");
    setTimeout(() => {
      setPhase("done");
    }, 650);
  };

  if (phase === "done" || reduced) return null;

  return (
    <aside
      aria-label="Big Boss Xüsusi Salamlaşma Ekranı"
      onClick={handleExit}
      className={`fixed inset-0 z-[99999] flex flex-col justify-between bg-[#08090A] text-white select-none cursor-pointer overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        phase === "exit"
          ? "opacity-0 -translate-y-full pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
      style={{
        clipPath: phase === "exit" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
      }}
    >
      {/* Background Ambience: Cinematic Solar Glow & Matrix Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pulsing central lime aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] bg-[#E4F86E]/15 rounded-full blur-[150px] animate-pulse" />
        
        {/* Deep emerald accent aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-[#10B981]/10 rounded-full blur-[130px]" />

        {/* Minimal dot matrix background */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#E4F86E 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top Bar: Clean Minimal Skip Action */}
      <div className="relative z-10 w-full px-6 py-6 sm:px-12 sm:py-8 flex items-center justify-end">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleExit();
          }}
          className="group flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-[#E4F86E]/40 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-200 text-xs sm:text-sm text-white/80 hover:text-white"
        >
          <span className="font-medium">Keç</span>
          <span className="text-white/40 group-hover:text-white/70 text-xs font-mono">[ESC]</span>
          <span className="w-4 h-4 rounded-full bg-[#E4F86E] text-[#111111] font-bold text-[10px] flex items-center justify-center">
            ✕
          </span>
        </button>
      </div>

      {/* Central Clean Typography Hero: BIG BOSS DAN / ÇAKMA BOSSA SALAM */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-6xl mx-auto w-full">
        {/* Line 1: BIG BOSS DAN */}
        <div className="relative my-2 sm:my-3">
          {/* Layered back glow */}
          <span 
            aria-hidden="true"
            className="absolute inset-0 select-none blur-3xl opacity-60 text-[#E4F86E] text-5xl sm:text-7xl md:text-8xl lg:text-[118px] font-black tracking-tight uppercase leading-[0.95]"
          >
            BIG BOSS DAN
          </span>
          {/* Crisp front text */}
          <h1 className="relative text-5xl sm:text-7xl md:text-8xl lg:text-[118px] font-black tracking-tight uppercase leading-[0.95] text-white">
            <span className="bg-gradient-to-b from-white via-[#F7FFC4] to-[#E4F86E] bg-clip-text text-transparent">
              BIG BOSS DAN
            </span>
          </h1>
        </div>

        {/* Line 2: ÇAKMA BOSSA SALAM */}
        <div className="relative my-2 sm:my-3">
          {/* Layered back glow */}
          <span 
            aria-hidden="true"
            className="absolute inset-0 select-none blur-3xl opacity-80 text-[#E4F86E] text-4xl sm:text-6xl md:text-7xl lg:text-[102px] font-black tracking-tight uppercase leading-[0.95]"
          >
            ÇAKMA BOSSA SALAM
          </span>
          {/* Crisp front text in signature neon lime */}
          <h2 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-[102px] font-black tracking-tight uppercase leading-[0.95] text-[#E4F86E]">
            ÇAKMA BOSSA SALAM
          </h2>
        </div>
      </div>

      {/* Bottom Progress Bar & 7.0s Countdown Meter */}
      <div className="relative z-10 w-full px-6 pt-4 pb-10 sm:px-12 sm:py-8 flex flex-col items-center gap-3">
        {/* Dynamic progress track */}
        <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden p-0 relative backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#B5FF3B] via-[#E4F86E] to-white rounded-full shadow-[0_0_14px_#E4F86E] transition-[width] duration-75 ease-linear"
            style={{
              width: `${progressPercent}%`,
            }}
          />
        </div>

        {/* 7.0s Timer display */}
        <div className="flex items-center justify-between w-full max-w-md text-xs font-mono text-white/50 px-1">
          <span>0.0s</span>
          <span className="text-[#E4F86E] font-semibold text-sm">
            {timeLeft.toFixed(1)}s
          </span>
          <span>7.0s</span>
        </div>

        <div className="text-[11px] text-white/35 tracking-tight">
          Sayta dərhal keçmək üçün istənilən yerə klikləyin və ya [ESC] basın
        </div>
      </div>
    </aside>
  );
}
