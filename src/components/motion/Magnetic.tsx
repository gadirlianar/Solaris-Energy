"use client";

import React, { useRef, useState } from "react";
import { useIsTouch } from "./useIsTouch";
import { useReducedMotion } from "./useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion-tokens";

interface MagneticProps {
  children: React.ReactNode;
  maxPull?: number;
  className?: string;
}

export function Magnetic({
  children,
  maxPull = MOTION_TOKENS.maxMagneticPull,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    const pullX = Math.max(Math.min(deltaX * maxPull, maxPull), -maxPull);
    const pullY = Math.max(Math.min(deltaY * maxPull, maxPull), -maxPull);

    setOffset({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  if (isTouch || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
