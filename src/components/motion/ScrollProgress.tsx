"use client";

import React from "react";
import { useScrollProgress } from "./useScrollProgress";
import { useReducedMotion } from "./useReducedMotion";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#E4F86E] z-[100] origin-left pointer-events-none transition-transform duration-75 ease-out"
      style={{
        transform: `scaleX(${progress})`,
      }}
      aria-hidden="true"
    />
  );
}
