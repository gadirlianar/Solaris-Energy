"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g. 0.2 means moves 0.2x of scroll
  maxOffset?: number; // clamp in pixels
  className?: string;
  direction?: "vertical" | "horizontal";
}

export function Parallax({
  children,
  speed = 0.15,
  maxOffset = 40,
  className = "",
  direction = "vertical",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    if (reduced) return;

    let ticking = false;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Distance of element center relative to viewport center
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const diff = elementCenter - viewportCenter;

      const calcOffset = Math.max(Math.min(-diff * speed, maxOffset), -maxOffset);
      setOffset(calcOffset);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, maxOffset, reduced]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const transformStyle =
    direction === "vertical"
      ? `translate3d(0, ${offset}px, 0)`
      : `translate3d(${offset}px, 0, 0)`;

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: transformStyle,
      }}
    >
      {children}
    </div>
  );
}
