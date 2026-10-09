"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/data/content";
import { HeroAtmosphere } from "@/components/motion/HeroAtmosphere";
import { HeroHouseMotion } from "@/components/motion/HeroHouseMotion";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[1056px] h-[1056px] flex flex-col justify-between items-center overflow-hidden pt-28 pb-0"
      style={{
        background:
          "linear-gradient(180deg, #87B8D9 0%, #9BC6E2 15%, #B7DCF0 30%, #D2EDF6 50%, #E8F5FA 75%, #FFFFFF 100%)",
      }}
    >
      {/* Dynamic Sky Atmosphere (clouds, sun glow, energy particles) */}
      <HeroAtmosphere />

      {/* Film grain noise overlay (6-8%) */}
      <div className="absolute inset-0 bg-grain pointer-events-none mix-blend-overlay opacity-[0.07] z-10" />

      {/* Main hero typography & CTAs */}
      <div className="relative z-20 max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 flex flex-col items-center text-center mt-6">
        {/* Trusted Badge: 245x28px */}
        <Reveal direction="down" delay={0.05} duration={500}>
          <div className="animate-hero-badge w-[245px] h-[28px] inline-flex items-center justify-between p-[2px] pr-3 bg-[#111111] rounded-full shadow-sm mb-6 select-none relative overflow-hidden group">
            <span className="relative overflow-hidden bg-[#E4F86E] text-[#111111] text-[12px] font-semibold px-2.5 rounded-full h-[24px] flex items-center">
              {HERO_CONTENT.trustedBadge.highlight}
              {/* One-time lime shimmer across Trusted */}
              <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-out_1_1s] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            </span>
            <span className="text-white text-[13px] font-normal tracking-tight">
              {HERO_CONTENT.trustedBadge.text}
            </span>
          </div>
        </Reveal>

        {/* H1 Heading: line 1 ~733px, line 2 ~532px with SplitReveal */}
        <SplitReveal
          as="h1"
          delay={0.12}
          className="animate-hero-h1 text-[48px] sm:text-[58px] md:text-[66px] lg:text-[70px] font-medium leading-[1.08] tracking-[-0.03em] text-[#111111] max-w-[960px]"
        >
          <span>{HERO_CONTENT.titleLine1}</span>
          <span>{HERO_CONTENT.titleLine2}</span>
        </SplitReveal>

        {/* Subtitle: line 1 ~456px */}
        <Reveal direction="up" delay={0.25} duration={600}>
          <p className="animate-hero-sub mt-5 text-[16px] sm:text-[17px] leading-[1.55] text-[#444444] max-w-[460px]">
            {HERO_CONTENT.subtitle}
          </p>
        </Reveal>

        {/* Primary CTA: 190x44px with Magnetic */}
        <Reveal direction="up" delay={0.35} duration={500}>
          <div className="animate-hero-cta mt-7">
            <Magnetic maxPull={8}>
              <Button href="#contact" variant="primary" className="w-[190px] justify-between">
                {HERO_CONTENT.ctaText}
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* Villa Image anchored at bottom with 3D pointer-parallax & overlays */}
      <HeroHouseMotion />
    </section>
  );
}
