"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/context/LanguageContext";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function Faq() {
  const { t } = useTranslation();
  const faqData = t.faq;
  const [openId, setOpenId] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 pt-[45px] pb-[91px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Eyebrow, H2, Subtitle, and Floating Help Card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <Reveal direction="left" distance={16} duration={400}>
              <Eyebrow>{faqData.eyebrow}</Eyebrow>
            </Reveal>

            <SplitReveal
              as="h2"
              delay={0.1}
              className="text-[34px] sm:text-[40px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111111] mt-3.5 mb-5"
            >
              {faqData.title}
            </SplitReveal>

            <Reveal direction="up" delay={0.2} distance={20} duration={600}>
              <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[#555555] max-w-[420px]">
                {faqData.subtitle}
              </p>
            </Reveal>
          </div>

          {/* Need More Help Card (floats 4px up/down very slowly 6s) */}
          <Reveal direction="up" delay={0.3} distance={24} duration={600}>
            <div
              className={`mt-12 lg:mt-16 bg-[#F2F2F2] rounded-[24px] p-7 md:p-8 ${
                !reduced ? "animate-[cardFloat_6s_ease-in-out_infinite_alternate]" : ""
              }`}
            >
              <h3 className="text-[21px] sm:text-[22px] font-medium tracking-tight text-[#111111] mb-2.5">
                {faqData.helpCard.title}
              </h3>

              <p className="text-[15px] sm:text-[15.5px] leading-relaxed text-[#555555] mb-6">
                {faqData.helpCard.text}
              </p>

              <Magnetic maxPull={8}>
                <Button href="#contact" variant="primary">
                  {faqData.helpCard.buttonText}
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Gray Panel with 6 Accordion Rows */}
        <div className="lg:col-span-7 w-full bg-[#F2F2F2] rounded-[28px] p-2.5 flex flex-col gap-2.5">
          {faqData.faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <Reveal
                key={faq.id}
                direction="up"
                distance={16}
                delay={idx * 0.06}
                duration={450}
              >
                <div
                  className={`bg-white rounded-[16px] overflow-hidden transition-all duration-300 ${
                    isOpen ? "shadow-[0_4px_16px_rgba(0,0,0,0.04)]" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4F86E] cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] sm:text-[18.5px] font-medium text-[#111111] tracking-tight pr-4">
                      {faq.question}
                    </span>

                    {/* Plus Icon Circle that rotates 45° with bg tint */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-[#E4F86E] text-[#111111]"
                          : "bg-[#ECECEC] text-[#555555] group-hover:bg-[#E4F86E]/50"
                      }`}
                    >
                      <Plus className="w-4 h-4 stroke-[2.2]" />
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
                        <div className="px-6 pb-6 pt-1 text-[15px] sm:text-[15.5px] leading-relaxed text-[#555555] animate-[faqAnswer_0.3s_ease-out]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes cardFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-4px);
          }
        }
        @keyframes faqAnswer {
          from {
            opacity: 0;
            transform: translateY(8px);
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
