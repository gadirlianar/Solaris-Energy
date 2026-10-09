"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { useIsTouch } from "./useIsTouch";

export function HeroAtmosphere() {
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // IntersectionObserver to pause rAF loops when hero is scrolled out of view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Energy flow canvas particles: Sun Glow -> Solar Panels -> House
  useEffect(() => {
    if (reduced || isTouch || !inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Quadratic bezier curve from upper center to rooftop panels
    // Start: (width * 0.5, height * 0.1) -> Control: (width * 0.58, height * 0.35) -> End: (width * 0.52, height * 0.58)
    const particleCount = 18;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      t: i / particleCount,
      speed: 0.0018 + (i % 3) * 0.0004,
      size: 1.5 + (i % 2) * 0.5,
      alpha: 0.3 + (i % 3) * 0.15,
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const p0 = { x: width * 0.5, y: height * 0.12 };
      const p1 = { x: width * 0.56, y: height * 0.38 };
      const p2 = { x: width * 0.51, y: height * 0.62 };

      // Draw faint energy guide beam
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
      ctx.strokeStyle = "rgba(228, 248, 110, 0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw flowing lime energy particles
      particles.forEach((p) => {
        p.t = (p.t + p.speed) % 1;
        const mt = 1 - p.t;
        // Quadratic bezier equation
        const x = mt * mt * p0.x + 2 * mt * p.t * p1.x + p.t * p.t * p2.x;
        const y = mt * mt * p0.y + 2 * mt * p.t * p1.y + p.t * p.t * p2.y;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 248, 110, ${p.alpha})`;
        ctx.shadowColor = "#E4F86E";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduced, isTouch, inView]);

  if (reduced) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10"
      aria-hidden="true"
    >
      {/* 1. Breathing Sun Glow in upper atmosphere (8s breathing loop) */}
      <div
        className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[600px] h-[360px] rounded-full blur-[80px] pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(228, 248, 110, 0.22) 0%, rgba(255, 255, 255, 0.3) 45%, transparent 75%)",
          animation: "sunBreathe 8s ease-in-out infinite alternate",
        }}
      />

      {/* 2. 3 Drifting Cloud Silhouette Layers (very slow, <=20px range) */}
      {/* Cloud Layer 1 (Far background, slowest) */}
      <div
        className="absolute top-[14%] left-[10%] w-[380px] h-[90px] rounded-full bg-white/20 blur-[36px]"
        style={{ animation: "cloudDrift1 38s ease-in-out infinite alternate" }}
      />
      {/* Cloud Layer 2 (Mid background) */}
      <div
        className="absolute top-[22%] right-[14%] w-[420px] h-[100px] rounded-full bg-white/25 blur-[42px]"
        style={{ animation: "cloudDrift2 28s ease-in-out infinite alternate" }}
      />
      {/* Cloud Layer 3 (Lower subtle puff) */}
      <div
        className="absolute top-[32%] left-[24%] w-[320px] h-[80px] rounded-full bg-white/18 blur-[30px]"
        style={{ animation: "cloudDrift3 22s ease-in-out infinite alternate" }}
      />

      {/* 3. Subtle Energy Flow Canvas */}
      {!isTouch && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        />
      )}

      {/* Global CSS keyframes for atmospheric drift */}
      <style jsx>{`
        @keyframes sunBreathe {
          0% {
            opacity: 0.5;
            transform: translate(-50%, 0) scale(0.96);
          }
          100% {
            opacity: 0.72;
            transform: translate(-50%, 0) scale(1.04);
          }
        }
        @keyframes cloudDrift1 {
          0% {
            transform: translateX(-16px);
          }
          100% {
            transform: translateX(18px);
          }
        }
        @keyframes cloudDrift2 {
          0% {
            transform: translateX(15px);
          }
          100% {
            transform: translateX(-15px);
          }
        }
        @keyframes cloudDrift3 {
          0% {
            transform: translateX(-12px);
          }
          100% {
            transform: translateX(14px);
          }
        }
      `}</style>
    </div>
  );
}
