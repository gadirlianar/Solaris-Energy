"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HOW_IT_WORKS_CONTENT } from "@/data/content";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function HowItWorks() {
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [progressHeight, setProgressHeight] = useState<number>(25);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;

    let ticking = false;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 2;

      // Track card closest to viewport center
      let closestIdx = 0;
      let minDistance = Infinity;

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const cardRect = el.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const dist = Math.abs(cardCenter - centerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveStep(closestIdx);

      // Progress bar fill percentage: (activeStep + 1) / total
      const totalSteps = HOW_IT_WORKS_CONTENT.steps.length;
      const progress = ((closestIdx + 1) / totalSteps) * 100;
      setProgressHeight(progress);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <section id="how-it-works" className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 pt-[120px] pb-[106px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column (Sticky on desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-32 self-start pr-0 lg:pr-6">
          <Reveal direction="left" distance={16} duration={400}>
            <Eyebrow>{HOW_IT_WORKS_CONTENT.eyebrow}</Eyebrow>
          </Reveal>

          <SplitReveal
            as="h2"
            delay={0.1}
            className="text-[34px] sm:text-[40px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111111] mt-3.5 mb-5"
          >
            <span>{HOW_IT_WORKS_CONTENT.titleLine1}</span>
            <span>{HOW_IT_WORKS_CONTENT.titleLine2}</span>
          </SplitReveal>

          <Reveal direction="up" delay={0.2} distance={20} duration={600}>
            <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[#555555] max-w-[500px]">
              {HOW_IT_WORKS_CONTENT.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Right Column: Gray Panel with 4 Step Cards & Vertical Lime Progress Rail */}
        <div ref={containerRef} className="lg:col-span-6 w-full flex justify-end">
          <div className="relative w-full max-w-[587px] bg-[#F2F2F2] rounded-[28px] p-2.5 flex flex-col gap-2.5">
            {/* Vertical Lime Progress Rail along inner edge (Desktop) */}
            {!reduced && (
              <div
                className="hidden sm:block absolute left-4 top-6 bottom-6 w-[2px] bg-black/10 rounded-full overflow-hidden pointer-events-none z-10"
                aria-hidden="true"
              >
                <div
                  className="w-full bg-[#E4F86E] transition-all duration-300 ease-out"
                  style={{ height: `${progressHeight}%` }}
                />
              </div>
            )}

            {HOW_IT_WORKS_CONTENT.steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`bg-white rounded-[20px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] will-change-transform ${
                    !reduced && !isActive
                      ? "opacity-90 scale-[0.99]"
                      : "opacity-100 scale-100 shadow-sm"
                  }`}
                >
                  {/* 54px Lime Number Badge */}
                  <div
                    className={`w-[54px] h-[54px] rounded-[14px] bg-[#E4F86E] flex items-center justify-center font-semibold text-[22px] tracking-tight text-[#111111] select-none transition-transform duration-300 ${
                      isActive && !reduced ? "scale-105 shadow-sm" : ""
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-[24px] sm:text-[26px] font-medium tracking-tight text-[#111111] mt-5 mb-4">
                    {step.title}
                  </h3>

                  {/* Bullets with diamond marker */}
                  <ul className="flex flex-col gap-2.5">
                    {step.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-center gap-3 text-[15px] sm:text-[16px] text-[#555555]"
                      >
                        {/* Small diamond bullet marker */}
                        <span
                          className={`w-2 h-2 rotate-45 shrink-0 inline-block transition-colors duration-300 ${
                            isActive && !reduced ? "bg-[#111111]" : "bg-[#888888]"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
