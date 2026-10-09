"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useTranslation } from "@/context/LanguageContext";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t.testimonials;
  const [activeIndex, setActiveIndex] = useState(2); // Start with Anar Gadirli (center)
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const reduced = useReducedMotion();
  const items = testimonials.testimonials;

  // Drag interaction state
  const dragStartX = useRef<number | null>(null);
  const dragDistance = useRef<number>(0);

  // Auto-advance loop every 4.5 seconds unless hovered, reduced-motion, or frozen
  useEffect(() => {
    if (isHovered || reduced) return;
    if (typeof window !== "undefined" && window.location.search.includes("freeze=true")) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, items.length, reduced]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }
  };

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragDistance.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) {
      dragDistance.current = e.clientX - dragStartX.current;
    }
    // Calculate glare on active card
    const target = e.currentTarget.getBoundingClientRect();
    setGlarePos({
      x: ((e.clientX - target.left) / target.width) * 100,
      y: ((e.clientY - target.top) / target.height) * 100,
      opacity: 0.15,
    });
  };

  const handlePointerUp = () => {
    if (dragStartX.current !== null) {
      if (dragDistance.current > 40) {
        // Drag right -> previous
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (dragDistance.current < -40) {
        // Drag left -> next
        setActiveIndex((prev) => (prev + 1) % items.length);
      }
    }
    dragStartX.current = null;
    dragDistance.current = 0;
  };

  const getCardStyle = (index: number) => {
    // Relative offset from active index in circular array
    let offset = (index - activeIndex) % items.length;
    if (offset < -2) offset += items.length;
    if (offset > 2) offset -= items.length;

    // Desktop 3D positions matching the reference perspective:
    switch (offset) {
      case 0:
        // Center card: flat, slightly lower/smaller (~330px), zIndex 30
        return {
          transform: "translateX(0px) translateZ(20px) rotateY(0deg) scale(0.96)",
          zIndex: 30,
          opacity: 1,
        };
      case -1:
        // Immediate left neighbor: rotated inward toward center, taller (~355px), zIndex 20
        return {
          transform: "translateX(-285px) translateZ(-10px) rotateY(22deg) scale(1)",
          zIndex: 20,
          opacity: 1,
        };
      case 1:
        // Immediate right neighbor: rotated inward toward center, taller (~355px), zIndex 20
        return {
          transform: "translateX(285px) translateZ(-10px) rotateY(-22deg) scale(1)",
          zIndex: 20,
          opacity: 1,
        };
      case -2:
        // Far left: heavily rotated, faded by edge gradient
        return {
          transform: "translateX(-520px) translateZ(-60px) rotateY(38deg) scale(0.98)",
          zIndex: 10,
          opacity: 0.7,
        };
      case 2:
        // Far right: heavily rotated, faded by edge gradient
        return {
          transform: "translateX(520px) translateZ(-60px) rotateY(-38deg) scale(0.98)",
          zIndex: 10,
          opacity: 0.7,
        };
      default:
        return {
          transform: "translateX(0px) translateZ(-200px) scale(0.5)",
          zIndex: 0,
          opacity: 0,
        };
    }
  };

  return (
    <section
      id="testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 pt-[60px] pb-[40px] overflow-hidden focus:outline-none"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-12">
        <Reveal direction="left" distance={16} duration={400}>
          <Eyebrow>{testimonials.eyebrow}</Eyebrow>
        </Reveal>

        <SplitReveal
          as="h2"
          delay={0.1}
          className="text-[34px] sm:text-[40px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111111] mt-3.5 mb-4"
        >
          <span>{testimonials.titleLine1}</span>
          <span>{testimonials.titleLine2}</span>
        </SplitReveal>

        <Reveal direction="up" delay={0.2} distance={20} duration={600}>
          <p className="text-[16px] sm:text-[17px] leading-[1.5] text-[#555555]">
            {testimonials.subtitle}
          </p>
        </Reveal>
      </div>

      {/* 3D Carousel Stage */}
      <div
        className="relative w-full h-[450px] flex items-center justify-center perspective-container select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setGlarePos((prev) => ({ ...prev, opacity: 0 }));
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Left/Right soft fade gradient masks matching container edges */}
        <div className="absolute left-0 inset-y-0 w-28 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-40 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-28 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-40 pointer-events-none" />

        {/* 3D Cards container */}
        <div className="relative w-full max-w-[1200px] h-[400px] flex items-center justify-center preserve-3d">
          {items.map((item, idx) => {
            const isCenter = idx === activeIndex;
            const cardStyle = getCardStyle(idx);
            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  ...cardStyle,
                  transition:
                    "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease",
                }}
                className="absolute w-[260px] h-[355px] rounded-[20px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.12)] bg-neutral-900 cursor-pointer origin-center group"
              >
                {/* Full bleed portrait photo with depth parallax */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="260px"
                  className={`object-cover transition-transform duration-700 ease-out will-change-transform ${
                    isCenter ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                {/* Pointer glare on active center card */}
                {isCenter && !reduced && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-20"
                    style={{
                      opacity: glarePos.opacity,
                      background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.3), transparent 75%)`,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Card Content at bottom */}
                <div className="absolute bottom-6 left-5 right-5 text-white z-10">
                  {/* 5 White Stars with twinkle stagger when center */}
                  <div className="flex items-center gap-1 mb-2.5">
                    {[...Array(item.stars)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-3.5 h-3.5 fill-white text-white transition-transform duration-300 ${
                          isCenter && !reduced ? "scale-105" : "scale-100"
                        }`}
                        style={{
                          transitionDelay: isCenter ? `${starIdx * 60}ms` : "0ms",
                        }}
                      />
                    ))}
                  </div>

                  {/* Quote with gentle fade-up as it centers */}
                  <p
                    className={`text-[13.5px] leading-[1.45] text-white/95 mb-3 line-clamp-3 transition-opacity duration-500 ${
                      isCenter ? "opacity-100" : "opacity-80"
                    }`}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Customer Name */}
                  <div className="text-[16px] font-medium text-white tracking-tight">
                    {item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
