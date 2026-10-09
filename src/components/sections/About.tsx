"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Wrench,
  CheckCircle,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ABOUT_CONTENT } from "@/data/content";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

function StatCard({
  targetNumber,
  suffix,
  label,
  description,
  icon,
  delay = 0,
}: {
  targetNumber: number;
  suffix: string;
  startText: string;
  label: string;
  description: string;
  icon: string;
  delay?: number;
}) {
  const renderIcon = () => {
    switch (icon) {
      case "shield-check":
        return <ShieldCheck className="w-6 h-6 text-[#111111] stroke-[1.75]" />;
      case "wrench":
        return <Wrench className="w-6 h-6 text-[#111111] stroke-[1.75]" />;
      case "circle-check":
      default:
        return <CheckCircle className="w-6 h-6 text-[#111111] stroke-[1.75]" />;
    }
  };

  return (
    <Reveal delay={delay} distance={24} duration={600}>
      <div className="bg-white rounded-[20px] p-[24px] flex flex-col justify-between h-[201px] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group">
        {/* Top Row: Icon square 56px at left + [Number & Label stacked right] */}
        <div className="flex items-center gap-4">
          {/* 56px Gray Icon Square */}
          <div className="w-[56px] h-[56px] shrink-0 rounded-[14px] bg-[#ECECEC] group-hover:bg-[#E4F86E] transition-colors duration-300 flex items-center justify-center">
            {renderIcon()}
          </div>

          {/* Stacked Big Number + Label */}
          <div className="flex flex-col justify-center">
            <div className="text-[36px] font-normal tracking-[-0.03em] text-[#111111] leading-[1.1]">
              <CountUp target={targetNumber} suffix={suffix} duration={1600} />
            </div>
            <div className="text-[16px] font-normal text-[#666666] leading-[1.2] mt-0.5">
              {label}
            </div>
          </div>
        </div>

        {/* Description below (gray, 3 lines) */}
        <p className="text-[14px] leading-[1.5] text-[#666666] line-clamp-3">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

export function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduced = useReducedMotion();
  const slides = ABOUT_CONTENT.slides;

  // Auto-play timer (5s)
  useEffect(() => {
    if (isPaused || reduced) return;
    if (typeof window !== "undefined" && window.location.search.includes("freeze=true")) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length, reduced]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section id="about" className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 pt-[96px] pb-[131px]">
      {/* Top Split: Copy left, Story Slider right (aligned at top to eyebrow) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-10 md:mb-12">
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-6">
          <Reveal direction="left" distance={16} duration={400}>
            <Eyebrow>{ABOUT_CONTENT.eyebrow}</Eyebrow>
          </Reveal>

          <SplitReveal
            as="h2"
            delay={0.1}
            className="text-[34px] sm:text-[40px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111111] mt-3.5 mb-5"
          >
            <span>{ABOUT_CONTENT.titleLine1}</span>
            <span>{ABOUT_CONTENT.titleLine2}</span>
          </SplitReveal>

          {/* Paragraph wrapped to exactly 2 lines */}
          <Reveal direction="up" delay={0.2} distance={20} duration={600}>
            <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[#666666] max-w-[540px] mb-8">
              {ABOUT_CONTENT.paragraph}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} distance={16} duration={500}>
            <Magnetic maxPull={8}>
              <Button href="#solutions" variant="dark-gray">
                {ABOUT_CONTENT.buttonText}
              </Button>
            </Magnetic>
          </Reveal>
        </div>

        {/* Right Story Slider */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[566px] h-[473px] rounded-[24px] overflow-hidden bg-[#111111] select-none group">
            {/* Background Image with Ken Burns motion */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                key={activeSlide.id}
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                sizes="(max-width: 768px) 100vw, 566px"
                className={`object-cover ${
                  reduced
                    ? "opacity-100"
                    : "animate-[kenBurns_8s_ease-out_infinite_alternate]"
                }`}
                priority
              />
            </div>

            {/* Top subtle gradient for progress bar visibility */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />

            {/* Bottom lighter gradient for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/70 via-black/35 to-transparent pointer-events-none z-10" />

            {/* Story Progress Bars (5 segments, thin 2px, translucent white) */}
            <div className="absolute top-4 inset-x-4 flex gap-1.5 z-20">
              {slides.map((slide, idx) => (
                <div
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className="h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                >
                  <div
                    className={`h-full bg-white transition-all ${
                      idx < currentSlide
                        ? "w-full"
                        : idx === currentSlide
                        ? isPaused
                          ? "w-1/2"
                          : "w-full duration-[5000ms] ease-linear"
                        : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Pause / Play Button: Translucent frosted circle */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="absolute top-8 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center z-20 transition-colors"
              aria-label={isPaused ? "Play story slider" : "Pause story slider"}
            >
              {isPaused ? <Play className="w-3 h-3 fill-white" /> : <Pause className="w-3 h-3 fill-white" />}
            </button>

            {/* Prev / Next Chevrons: Thin white, no background */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 p-1"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 p-1"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 stroke-[1.5]" />
            </button>

            {/* Bottom Caption: Masked slide-up on slide switch */}
            <div
              key={`caption-${activeSlide.id}`}
              className="absolute bottom-6 left-6 right-6 z-20 text-white animate-[slideUpMask_0.45s_cubic-bezier(0.22,1,0.36,1)]"
            >
              <span className="inline-block text-[12px] font-medium text-white/80 tracking-wider mb-1.5">
                {activeSlide.date}
              </span>
              <h3 className="text-[22px] sm:text-[25px] font-medium tracking-tight text-white leading-snug mb-2">
                {activeSlide.title}
              </h3>
              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-white/85 line-clamp-2">
                {activeSlide.caption}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gray Panel with 3 Stat Cards */}
      <div className="w-full bg-[#F2F2F2] rounded-[28px] p-[11px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[11px]">
          {ABOUT_CONTENT.stats.map((stat, idx) => (
            <StatCard
              key={stat.label}
              {...stat}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1.04) translate(0%, 0%);
          }
          100% {
            transform: scale(1.12) translate(-1.5%, -1%);
          }
        }
        @keyframes slideUpMask {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
