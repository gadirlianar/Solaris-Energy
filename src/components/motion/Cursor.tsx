"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { useIsTouch } from "./useIsTouch";
import { useReducedMotion } from "./useReducedMotion";

type CursorVariant = "default" | "pointer" | "view" | "hidden";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function Cursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const isClient = useIsClient();
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  // Position references for smooth interpolation
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch || reduced || !isClient) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Check element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) {
        setVariant("default");
        return;
      }

      // Hide over inputs and textareas
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        setVariant("hidden");
        return;
      }

      // Check for project card or [data-cursor="view"]
      if (target.closest('[data-cursor="view"]')) {
        setVariant("view");
        return;
      }

      // Check for clickable elements (links, buttons, tab-focusable)
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer")
      ) {
        setVariant("pointer");
        return;
      }

      setVariant("default");
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // RAF loop for lagging smooth spring/lerp ring
    let rafId: number;
    const lerpFactor = 0.18;

    const tick = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerpFactor;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, reduced, isClient, visible]);

  if (isTouch || reduced || !isClient) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        visible && variant !== "hidden" ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Small Black Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#111111] transition-transform duration-75 will-change-transform ${
          variant === "view" ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Lagging Ring / View Bubble */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center will-change-transform transition-all duration-200 ease-out ${
          variant === "view"
            ? "-ml-8 -mt-8 w-16 h-16 rounded-full bg-[#E4F86E] text-[#111111] text-[12px] font-semibold tracking-wider uppercase shadow-md scale-100"
            : variant === "pointer"
            ? "-ml-5 -mt-5 w-10 h-10 rounded-full border border-[#111111]/40 bg-[#111111]/5 scale-100"
            : "-ml-4 -mt-4 w-8 h-8 rounded-full border border-[#111111]/25 scale-75"
        }`}
      >
        {variant === "view" && <span>View</span>}
      </div>
    </div>
  );
}
