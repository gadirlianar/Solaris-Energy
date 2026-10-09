"use client";

import React from "react";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion-tokens";

interface SplitRevealProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export function SplitReveal({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  stagger = MOTION_TOKENS.stagger.standard,
  duration = MOTION_TOKENS.duration.slow,
}: SplitRevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  // If reduced motion is requested or static mode, render pristine rest state
  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  // If children is an array of elements or strings (e.g. lines)
  const items = React.Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      <Component className="contents">
        {items.map((item, index) => {
          const itemDelay = delay + index * (stagger / 1000);
          return (
            <span
              key={index}
              className="block overflow-hidden"
              style={{ display: "block" }}
            >
              <span
                className="block will-change-transform"
                style={{
                  transform: inView ? "translate3d(0, 0%, 0)" : "translate3d(0, 105%, 0)",
                  transition: `transform ${duration}ms ${MOTION_TOKENS.ease.primaryCss} ${itemDelay}s`,
                  display: "block",
                }}
              >
                {item}
              </span>
            </span>
          );
        })}
      </Component>
    </div>
  );
}
