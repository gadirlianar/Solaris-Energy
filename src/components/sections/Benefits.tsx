"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Gauge,
  ShieldCheck,
  TrendingUp,
  Leaf,
  CheckCircle,
  Wrench,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BENEFITS_CONTENT } from "@/data/content";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

function BenefitIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "gauge":
      return <Gauge className="w-5 h-5 text-[#111111] stroke-[1.75]" />;
    case "shield-check":
      return <ShieldCheck className="w-5 h-5 text-[#111111] stroke-[1.75]" />;
    case "trending-up":
      return <TrendingUp className="w-5 h-5 text-[#111111] stroke-[1.75]" />;
    case "leaf":
      return <Leaf className="w-5 h-5 text-[#111111] stroke-[1.75]" />;
    case "circle-check":
      return <CheckCircle className="w-5 h-5 text-[#111111] stroke-[1.75]" />;
    case "wrench":
    default:
      return <Wrench className="w-5 h-5 text-[#111111] stroke-[1.75]" />;
  }
}

export function Benefits() {
  const [sectionRef, inView] = useInView<HTMLDivElement>({ once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  // First item open by default
  const [openId, setOpenId] = useState<string>(BENEFITS_CONTENT.items[0].id);
  const [activePhotoScale, setActivePhotoScale] = useState(false);

  // Auto-open first item 600ms after entering view if closed
  useEffect(() => {
    if (reduced || !inView) return;
    const timer = setTimeout(() => {
      if (!openId) {
        setOpenId(BENEFITS_CONTENT.items[0].id);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [inView, openId, reduced]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
    setActivePhotoScale(true);
    setTimeout(() => setActivePhotoScale(false), 500);
  };

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 pt-[140px] pb-[106px]"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <Reveal direction="left" distance={16} duration={400}>
          <Eyebrow>{BENEFITS_CONTENT.eyebrow}</Eyebrow>
        </Reveal>

        <SplitReveal
          as="h2"
          delay={0.1}
          className="text-[34px] sm:text-[40px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111111] mt-3.5 mb-4"
        >
          <span>{BENEFITS_CONTENT.titleLine1}</span>
          <span>{BENEFITS_CONTENT.titleLine2}</span>
        </SplitReveal>

        <Reveal direction="up" delay={0.2} distance={20} duration={600}>
          <p className="text-[16px] sm:text-[17px] leading-[1.5] text-[#555555]">
            {BENEFITS_CONTENT.subtitle}
          </p>
        </Reveal>
      </div>

      {/* Gray Panel with Two Halves */}
      <div className="w-full bg-[#F2F2F2] rounded-[28px] p-2.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch">
          {/* Left: 6 Accordion Rows with Stagger */}
          <div className="lg:col-span-6 flex flex-col gap-2.5">
            {BENEFITS_CONTENT.items.map((item, idx) => {
              const isOpen = openId === item.id;
              return (
                <Reveal
                  key={item.id}
                  direction="left"
                  distance={20}
                  delay={idx * 0.07}
                  duration={500}
                >
                  <div
                    className={`bg-white rounded-[16px] overflow-hidden transition-all duration-300 ${
                      isOpen ? "shadow-[0_4px_16px_rgba(0,0,0,0.04)]" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4F86E] group cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon with micro-pop on open */}
                        <div
                          className={`w-8 h-8 rounded-[8px] bg-[#F4F4F4] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen ? "scale-110 bg-[#E4F86E]" : "group-hover:bg-[#ECECEC]"
                          }`}
                        >
                          <BenefitIcon icon={item.icon} />
                        </div>
                        <span className="text-[18px] sm:text-[19px] font-medium text-[#111111] tracking-tight">
                          {item.title}
                        </span>
                      </div>

                      <div className="text-[#111111] ml-4 shrink-0 transition-transform duration-300">
                        {isOpen ? (
                          <ArrowUpRight className="w-5 h-5 stroke-[2] text-[#111111]" />
                        ) : (
                          <ArrowRight className="w-5 h-5 stroke-[2] text-[#888888] group-hover:translate-x-0.5 transition-transform" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-1 text-[15px] sm:text-[15.5px] leading-relaxed text-[#555555] pl-[68px]">
                            {item.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right: Large Photo of Woman on Rooftop with subtle zoom/pan & corner highlight sweep */}
          <div className="lg:col-span-6 relative min-h-[460px] lg:min-h-full rounded-[16px] overflow-hidden shadow-sm bg-neutral-900 group">
            <Image
              src={BENEFITS_CONTENT.image}
              alt="Woman holding tablet on rooftop with solar panels"
              fill
              sizes="(max-width: 1024px) 100vw, 592px"
              className={`object-cover transition-transform duration-700 ease-out will-change-transform ${
                activePhotoScale && !reduced ? "scale-[1.04]" : "scale-100"
              }`}
              priority
            />

            {/* Subtle Lime Corner Highlight Sweep on accordion change */}
            <div
              className={`absolute top-0 right-0 w-28 h-28 pointer-events-none transition-opacity duration-700 ${
                activePhotoScale && !reduced ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(228, 248, 110, 0.4), transparent 70%)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
