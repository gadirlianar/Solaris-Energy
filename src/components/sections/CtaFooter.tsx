"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { useTranslation } from "@/context/LanguageContext";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { useInView } from "@/components/motion/useInView";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "x":
      return (
        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "instagram":
    default:
      return (
        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
  }
}

export function CtaFooter() {
  const { t } = useTranslation();
  const ctaFooter = t.ctaFooter;
  const [photoRef, photoInView] = useInView<HTMLDivElement>({ once: true, margin: "-40px" });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const reduced = useReducedMotion();

  // Scroll listener for back-to-top and photo parallax
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 1.2;
      setShowBackToTop(scrollY > threshold);

      if (!reduced) {
        const offset = Math.max(Math.min((scrollY - 3000) * 0.04, 20), -20);
        setParallaxOffset(offset);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduced]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 pt-0 pb-[21px] relative">
      {/* Outer Gray Panel */}
      <div className="w-full bg-[#F2F2F2] rounded-[32px] p-2.5 flex flex-col gap-2.5">
        {/* Card 1: CTA Banner + Solar Field Photo + 3-Column Footer */}
        <div className="bg-white rounded-[24px] pt-14 md:pt-16 pb-12 px-6 sm:px-10 md:px-14 flex flex-col items-center relative overflow-hidden">
          {/* Faint Sun-Glow Flare passing behind heading */}
          {!reduced && (
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-[550px] h-[300px] rounded-full blur-[90px] bg-gradient-to-b from-[#E4F86E]/20 via-[#E4F86E]/5 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          )}

          {/* CTA Header */}
          <div className="flex flex-col items-center text-center max-w-[850px] relative z-10">
            <SplitReveal
              as="h2"
              delay={0.1}
              className="text-[34px] sm:text-[40px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111111]"
            >
              <span>{ctaFooter.h2Line1}</span>
              <span>{ctaFooter.h2Line2}</span>
            </SplitReveal>

            <Reveal direction="up" delay={0.2} distance={20} duration={600}>
              <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.55] text-[#555555] max-w-[620px]">
                {ctaFooter.subtitle}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3} distance={16} duration={500}>
              <div className="mt-8 mb-10">
                <Magnetic maxPull={8}>
                  <Button href="#contact" variant="primary">
                    {ctaFooter.ctaButton}
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Wide Solar Field Image with Bottom Fade & Scroll Parallax */}
          <div
            ref={photoRef}
            className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-[20px] overflow-hidden my-4 select-none transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              clipPath:
                reduced || photoInView ? "inset(0% 0 0% 0)" : "inset(15% 0 0% 0)",
            }}
          >
            <Image
              src={ctaFooter.solarFieldImage}
              alt="Expansive ground-mounted solar panels"
              fill
              sizes="(max-width: 1288px) 100vw, 1200px"
              className="object-cover object-top will-change-transform transition-transform duration-700"
              style={{
                transform: reduced ? "none" : `scale(1.04) translateY(${parallaxOffset}px)`,
              }}
            />
            {/* Fade to white gradient at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
          </div>

          {/* 3-Column Footer Section */}
          <div className="w-full pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 text-left">
            {/* Column 1: Brand & Socials */}
            <div className="md:col-span-5 flex flex-col items-start">
              <Logo />

              <p className="mt-4 text-[15px] leading-relaxed text-[#555555] max-w-[340px]">
                {ctaFooter.brandDescription}
              </p>

              {/* Social icons with micro lift/pop */}
              <div className="flex items-center gap-2.5 mt-6">
                {ctaFooter.socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-[36px] h-[36px] rounded-[10px] bg-[#ECECEC] hover:bg-[#E4F86E] text-[#111111] flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:scale-105"
                    aria-label={`Follow on ${social.name}`}
                  >
                    <SocialIcon icon={social.icon} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links with sliding underline */}
            <div className="md:col-span-3 flex flex-col items-start md:pl-6">
              <h3 className="text-[17px] font-semibold text-[#111111] tracking-tight mb-4">
                {ctaFooter.quickLinksTitle}
              </h3>

              <ul className="flex flex-col gap-3">
                {ctaFooter.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="relative text-[15.5px] text-[#555555] hover:text-[#111111] transition-colors group inline-block"
                    >
                      <span>{link.label}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#111111] transition-all duration-200 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Us */}
            <div className="md:col-span-4 flex flex-col items-start">
              <h3 className="text-[17px] font-semibold text-[#111111] tracking-tight mb-4">
                {ctaFooter.contactTitle}
              </h3>

              <div className="flex flex-col gap-3.5">
                {/* Email */}
                <div className="flex items-center gap-3 group">
                  <div className="w-[34px] h-[34px] rounded-[8px] bg-[#ECECEC] group-hover:bg-[#E4F86E] flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="w-4 h-4 text-[#111111]" />
                  </div>
                  <a
                    href={`mailto:${ctaFooter.contactEmail}`}
                    className="text-[15.5px] text-[#555555] hover:text-[#111111] transition-colors"
                  >
                    {ctaFooter.contactEmail}
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 group">
                  <div className="w-[34px] h-[34px] rounded-[8px] bg-[#ECECEC] group-hover:bg-[#E4F86E] flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-[#111111]" />
                  </div>
                  <a
                    href={`tel:${ctaFooter.contactPhone.replace(/[^0-9+]/g, "")}`}
                    className="text-[15.5px] text-[#555555] hover:text-[#111111] transition-colors"
                  >
                    {ctaFooter.contactPhone}
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 group">
                  <div className="w-[34px] h-[34px] rounded-[8px] bg-[#ECECEC] group-hover:bg-[#E4F86E] flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <MapPin className="w-4 h-4 text-[#111111]" />
                  </div>
                  <span className="text-[15.5px] text-[#555555] leading-snug">
                    {ctaFooter.contactAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Dynamic Copyright */}
        <Reveal direction="fade" delay={0.4} duration={600}>
          <div className="bg-white rounded-[20px] py-5 px-6 text-center">
            <p className="text-[14px] sm:text-[15px] text-[#666666]">
              &copy; <CurrentYear /> Solaris Energy. {ctaFooter.rightsReserved}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Back to Top Lime Floating Button (appears after 1.2 viewport heights) */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#E4F86E] text-[#111111] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        aria-label={ctaFooter.backToTop}
      >
        <ArrowUp className="w-5 h-5 stroke-[2.2]" />
      </button>
    </footer>
  );
}
