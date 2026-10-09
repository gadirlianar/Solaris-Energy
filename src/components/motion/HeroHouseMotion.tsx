"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "./useReducedMotion";
import { useIsTouch } from "./useIsTouch";

export function HeroHouseMotion() {
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();
  const containerRef = useRef<HTMLDivElement>(null);

  // Pointer-tilt state (desktop only)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [scrollScale, setScrollScale] = useState(1);
  const [scrollTranslate, setScrollTranslate] = useState(0);

  // Mouse move handler for spring-smoothed pointer tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 2 - 1; // -1 to 1
    const percentY = (y / rect.height) * 2 - 1; // -1 to 1

    const maxDeg = 2.5; // Max ±2.5° tilt for restraint
    setTilt({
      rotateX: -percentY * maxDeg,
      rotateY: percentX * maxDeg,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Scroll responsive scaling (1 -> 1.05)
  useEffect(() => {
    if (reduced) return;

    let ticking = false;
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 1100) {
        const factor = Math.min(scrollY / 1000, 1);
        setScrollScale(1 + factor * 0.05);
        setScrollTranslate(factor * 16);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="animate-hero-house relative z-20 w-full max-w-[1106px] flex justify-center -mb-1 preserve-3d"
      style={{
        perspective: "1200px",
      }}
    >
      <div
        className="relative w-full aspect-[1106/576] transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: reduced
            ? "none"
            : `scale(${scrollScale}) translateY(${scrollTranslate}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        {/* Base Villa Architecture Image */}
        <Image
          src="/images/hero-villa.png"
          alt="Modern luxury villa with rooftop solar panels"
          fill
          priority
          sizes="(max-width: 1288px) 100vw, 1106px"
          className="object-contain object-bottom select-none pointer-events-none"
        />

        {/* Dynamic Motion Overlays (disabled in reduced motion or static) */}
        {!reduced && (
          <>
            {/* 1. Solar Panels Shimmer Overlay
                Clipped to rooftop solar arrays:
                Left array polygon: 26% 25%, 48% 28%, 46% 40%, 25% 36%
                Right array polygon: 58% 22%, 78% 24%, 76% 36%, 57% 33%
            */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 overflow-hidden"
              style={{
                clipPath:
                  "polygon(26% 25%, 48% 28%, 46% 40%, 25% 36%, 57% 33%, 58% 22%, 78% 24%, 76% 36%)",
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{
                  animation: "solarShimmer 7s ease-in-out infinite",
                }}
              />
            </div>

            {/* 2. Warm Window Illumination Sequence (Sun -> Panels -> Home Story) */}
            {/* Window 1: Left 2nd floor */}
            <div
              className="absolute pointer-events-none rounded-[2px] bg-[#FFE082]/35 blur-[3px]"
              style={{
                left: "31%",
                top: "43%",
                width: "6.5%",
                height: "10%",
                animation: "windowPulse 6s ease-in-out infinite 0.2s",
              }}
            />
            {/* Window 2: Center main living room glass */}
            <div
              className="absolute pointer-events-none rounded-[3px] bg-[#FFE082]/30 blur-[4px]"
              style={{
                left: "47%",
                top: "48%",
                width: "12%",
                height: "14%",
                animation: "windowPulse 6s ease-in-out infinite 0.35s",
              }}
            />
            {/* Window 3: Right lower terrace lounge */}
            <div
              className="absolute pointer-events-none rounded-[2px] bg-[#FFE082]/25 blur-[3px]"
              style={{
                left: "64%",
                top: "54%",
                width: "9%",
                height: "11%",
                animation: "windowPulse 6s ease-in-out infinite 0.5s",
              }}
            />
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes solarShimmer {
          0%,
          75% {
            transform: translateX(-150%) skewX(-20deg);
            opacity: 0;
          }
          82% {
            opacity: 0.9;
          }
          95%,
          100% {
            transform: translateX(150%) skewX(-20deg);
            opacity: 0;
          }
        }
        @keyframes windowPulse {
          0%,
          30% {
            opacity: 0.08;
          }
          50%,
          80% {
            opacity: 0.32;
          }
          100% {
            opacity: 0.08;
          }
        }
      `}</style>
    </div>
  );
}
