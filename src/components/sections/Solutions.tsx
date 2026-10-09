"use client";

import React from "react";
import Image from "next/image";
import {
  Sun,
  Banknote,
  Wrench,
  Leaf,
  Gauge,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useTranslation } from "@/context/LanguageContext";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { DrawSVG } from "@/components/motion/DrawSVG";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

function SolutionIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "sun":
      return (
        <Sun className="w-6 h-6 text-[#111111] stroke-[1.75] transition-transform duration-500 ease-out group-hover:rotate-90" />
      );
    case "banknote":
      return (
        <Banknote className="w-6 h-6 text-[#111111] stroke-[1.75] transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
      );
    case "presentation":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#111111"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 transition-transform duration-300"
        >
          <rect x="3" y="3" width="18" height="13" rx="2" />
          <line x1="8" y1="21" x2="12" y2="16" />
          <line x1="16" y1="21" x2="12" y2="16" />
          <line
            x1="7.5"
            y1="12"
            x2="7.5"
            y2="10"
            className="transition-transform duration-300 origin-bottom group-hover:scale-y-125"
          />
          <line
            x1="12"
            y1="12"
            x2="12"
            y2="8"
            className="transition-transform duration-300 origin-bottom group-hover:scale-y-125"
          />
          <line
            x1="16.5"
            y1="12"
            x2="16.5"
            y2="6"
            className="transition-transform duration-300 origin-bottom group-hover:scale-y-125"
          />
        </svg>
      );
    case "wrench":
      return (
        <Wrench className="w-6 h-6 text-[#111111] stroke-[1.75] transition-transform duration-300 ease-out group-hover:rotate-[15deg]" />
      );
    case "leaf":
      return (
        <Leaf className="w-6 h-6 text-[#111111] stroke-[1.75] transition-transform duration-300 ease-out group-hover:rotate-[-8deg]" />
      );
    case "gauge":
    default:
      return (
        <Gauge className="w-6 h-6 text-[#111111] stroke-[1.75] transition-transform duration-300 ease-out group-hover:rotate-45" />
      );
  }
}

const illustrationMap: Record<string, { src: string; width: number; height: number }> = {
  "home-install": { src: "/illustrations/sol-1.svg", width: 375, height: 200 },
  "cost-savings": { src: "/illustrations/sol-2.svg", width: 375, height: 200 },
  "smart-monitoring": { src: "/illustrations/sol-3.svg", width: 370, height: 200 },
  "quick-install": { src: "/illustrations/sol-4.svg", width: 375, height: 200 },
  "sustainability": { src: "/illustrations/sol-5.svg", width: 375, height: 200 },
  "energy-efficiency": { src: "/illustrations/sol-6.svg", width: 370, height: 200 },
};

export function Solutions() {
  const { t } = useTranslation();
  const solutions = t.solutions;
  const reduced = useReducedMotion();

  return (
    <section id="solutions" className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 pt-[90px] pb-[66px]">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <Reveal direction="left" distance={16} duration={400}>
          <Eyebrow>{solutions.eyebrow}</Eyebrow>
        </Reveal>

        <SplitReveal
          as="h2"
          delay={0.1}
          className="text-[34px] sm:text-[40px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111111] mt-3.5 mb-4 max-w-[850px]"
        >
          <span>{solutions.titleLine1}</span>
          <span>{solutions.titleLine2}</span>
        </SplitReveal>

        <Reveal direction="up" delay={0.2} distance={20} duration={600}>
          <p className="text-[16px] sm:text-[17px] leading-[1.5] text-[#555555] max-w-[620px]">
            {solutions.subtitle}
          </p>
        </Reveal>
      </div>

      {/* Gray Panel with 3x2 Grid */}
      <div className="w-full bg-[#F2F2F2] rounded-[28px] p-[11px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[11px]">
          {solutions.cards.map((card, idx) => {
            const ill = illustrationMap[card.illustrationType] || illustrationMap["home-install"];
            return (
              <Reveal
                key={card.id}
                delay={idx * 0.08}
                distance={24}
                duration={600}
                className="h-full"
              >
                <TiltCard
                  maxTilt={5}
                  perspective={1000}
                  glare={true}
                  className="h-full"
                >
                  <div className="group bg-white rounded-[20px] p-[21px] flex flex-col justify-between h-[435px] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] cursor-default overflow-hidden relative">
                    <div>
                      {/* 44px Lime Icon Square with micro-animation on hover */}
                      <div className="w-[44px] h-[44px] rounded-[10px] bg-[#E4F86E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                        <SolutionIcon icon={card.icon} />
                      </div>

                      {/* Title */}
                      <h3 className="text-[24px] sm:text-[25px] font-medium tracking-tight text-[#111111] leading-[1.2] mb-2.5">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[15px] sm:text-[16px] leading-[1.5] text-[#666666]">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Line Illustration anchored to bottom with DrawSVG & subtle idle loop */}
                    <div className="w-full h-[170px] flex items-end justify-center overflow-hidden -mx-[5px] -mb-[5px] relative">
                      <DrawSVG duration={1500} delay={idx * 100}>
                        <div
                          className={`relative ${
                            !reduced && card.illustrationType === "energy-efficiency"
                              ? "group-hover:animate-[carRoll_1.8s_ease-in-out_infinite_alternate]"
                              : ""
                          }`}
                        >
                          <Image
                            src={ill.src}
                            alt={card.title}
                            width={ill.width}
                            height={ill.height}
                            className="w-full max-w-[340px] h-auto object-contain transition-transform duration-500 group-hover:-translate-y-1"
                            unoptimized
                          />
                        </div>
                      </DrawSVG>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes carRoll {
          0% {
            transform: translateX(-3px);
          }
          100% {
            transform: translateX(3px);
          }
        }
      `}</style>
    </section>
  );
}
