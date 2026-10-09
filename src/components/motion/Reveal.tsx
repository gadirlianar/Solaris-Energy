"use client";

import React from "react";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion-tokens";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "down" | "fade";
  distance?: number;
  duration?: number;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = MOTION_TOKENS.distance.medium,
  duration = MOTION_TOKENS.duration.slow,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(-${distance}px, 0, 0)`;
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={`will-change-[transform,opacity] ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0, 0, 0)" : getInitialTransform(),
        transition: `opacity ${duration}ms ${MOTION_TOKENS.ease.primaryCss} ${delay}s, transform ${duration}ms ${MOTION_TOKENS.ease.primaryCss} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
