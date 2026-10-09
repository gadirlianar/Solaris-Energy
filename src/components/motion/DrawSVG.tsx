"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion-tokens";

interface DrawSVGProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export function DrawSVG({
  children,
  duration = 1600,
  delay = 100,
  className = "",
}: DrawSVGProps) {
  const [containerRef, inView] = useInView<HTMLDivElement>({ once: true, margin: "-20px" });
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (inView) {
      const timer = setTimeout(() => {
        setDrawn(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, delay, reduced]);

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    // Apply stroke-dasharray and stroke-dashoffset to path and line elements inside
    const svgElements = containerRef.current.querySelectorAll<SVGGeometryElement>(
      "path, line, polyline, polygon, circle, rect"
    );

    svgElements.forEach((el) => {
      try {
        const length = el.getTotalLength ? el.getTotalLength() : 300;
        if (!drawn) {
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;
          el.style.transition = `stroke-dashoffset ${duration}ms ${MOTION_TOKENS.ease.primaryCss}`;
        } else {
          el.style.strokeDashoffset = "0";
        }
      } catch {
        // Fallback for non-measurable shapes
      }
    });
  }, [drawn, duration, reduced, containerRef]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
