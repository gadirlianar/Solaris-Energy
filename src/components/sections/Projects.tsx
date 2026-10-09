"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROJECTS_CONTENT } from "@/data/content";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

function BentoProjectCard({
  title,
  description,
  image,
  widthClass,
  delay = 0,
}: {
  title: string;
  description: string;
  image: string;
  widthClass: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, margin: "-40px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [parallaxY, setParallaxY] = useState(0);

  // Subtle image scroll parallax inside the card (±16px)
  useEffect(() => {
    if (reduced) return;

    let ticking = false;
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const diff = rect.top + rect.height / 2 - windowHeight / 2;
      const offset = Math.max(Math.min(-diff * 0.06, 18), -18);
      setParallaxY(offset);
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
    <div
      ref={ref}
      className={`${widthClass} h-[420px] sm:h-[479px] shrink-0 group relative rounded-[18px] overflow-hidden shadow-sm bg-neutral-900 select-none cursor-pointer transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      style={{
        clipPath: reduced || inView ? "inset(0% 0 0% 0)" : "inset(20% 0 0% 0)",
        transitionDelay: `${delay}s`,
      }}
      data-cursor="view"
    >
      <div
        ref={cardRef}
        className="relative w-full h-full overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1280px) 100vw, 700px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] will-change-transform"
          style={{
            transform: reduced ? "none" : `scale(1.03) translateY(${parallaxY}px)`,
          }}
        />
        {/* Dark Gradient Overlay that deepens slightly on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/50 transition-colors duration-300 pointer-events-none" />

        {/* Bottom Caption: lifts 6px on hover */}
        <div className="absolute bottom-7 left-7 right-7 text-white z-10 transition-transform duration-300 ease-out group-hover:-translate-y-1.5 will-change-transform">
          <h3 className="text-[21px] sm:text-[23px] font-medium tracking-tight text-white mb-2 leading-snug">
            {title}
          </h3>
          <p className="text-[14px] sm:text-[14.5px] leading-relaxed text-white/85 line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [p1, p2, p3, p4] = PROJECTS_CONTENT.projects;

  return (
    <section id="projects" className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 pt-[60px] pb-[53px]">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <Reveal direction="left" distance={16} duration={400}>
          <Eyebrow>{PROJECTS_CONTENT.eyebrow}</Eyebrow>
        </Reveal>

        <SplitReveal
          as="h2"
          delay={0.1}
          className="text-[34px] sm:text-[40px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111111] mt-3.5 mb-4"
        >
          {PROJECTS_CONTENT.title}
        </SplitReveal>

        <Reveal direction="up" delay={0.2} distance={20} duration={600}>
          <p className="text-[16px] sm:text-[17px] leading-[1.5] text-[#555555]">
            {PROJECTS_CONTENT.subtitle}
          </p>
        </Reveal>
      </div>

      {/* Bento Grid (2 rows: 509px + 693px on desktop >=1280px) */}
      <div className="flex flex-col gap-[12px] items-center w-full">
        {/* Row 1: Card 1 (509px) + Card 2 (693px) */}
        <div className="flex flex-col xl:flex-row gap-[12px] w-full max-w-[1214px] justify-center">
          <BentoProjectCard
            {...p1}
            widthClass="w-full xl:w-[509px]"
            delay={0.05}
          />
          <BentoProjectCard
            {...p2}
            widthClass="w-full xl:w-[693px]"
            delay={0.15}
          />
        </div>

        {/* Row 2: Card 3 (693px) + Card 4 (509px) */}
        <div className="flex flex-col xl:flex-row gap-[12px] w-full max-w-[1214px] justify-center">
          <BentoProjectCard
            {...p3}
            widthClass="w-full xl:w-[693px]"
            delay={0.25}
          />
          <BentoProjectCard
            {...p4}
            widthClass="w-full xl:w-[509px]"
            delay={0.35}
          />
        </div>
      </div>
    </section>
  );
}
