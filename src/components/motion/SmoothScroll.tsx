"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./useReducedMotion";
import { useIsTouch } from "./useIsTouch";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable on reduced motion, static testing mode, or touch devices
    if (reducedMotion || isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Smoothly intercept anchor link clicks (e.g., #contact)
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, { offset: -70, duration: 1.2 });
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion, isTouch]);

  // Fallback anchor click handler when Lenis is not running (touch/reduced-motion)
  useEffect(() => {
    if (!reducedMotion && !isTouch) return;

    const handleFallbackAnchor = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleFallbackAnchor);
    return () => document.removeEventListener("click", handleFallbackAnchor);
  }, [reducedMotion, isTouch]);

  return <>{children}</>;
}
