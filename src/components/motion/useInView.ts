"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number | number[];
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { once = true, margin = "-40px", threshold = 0.1 } = options;
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const [isInView, setIsInView] = useState<boolean>(() => reduced);

  useEffect(() => {
    if (reduced) return;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setIsInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin: margin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, margin, threshold, reduced]);

  return [ref, reduced ? true : isInView];
}
