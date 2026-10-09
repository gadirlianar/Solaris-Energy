import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Solutions } from "@/components/sections/Solutions";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Projects } from "@/components/sections/Projects";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { CtaFooter } from "@/components/sections/CtaFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Cursor } from "@/components/motion/Cursor";
import { IntroOverlay } from "@/components/motion/IntroOverlay";
import { MotionDebug } from "@/components/motion/MotionDebug";

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white">
        {/* Intro Session Animation */}
        <IntroOverlay />

        {/* Top 2px Lime Scroll Progress Bar */}
        <ScrollProgress />

        {/* Custom Desktop Interactive Cursor */}
        <Cursor />

        {/* Fixed/Sticky Glass Navbar */}
        <Navbar />

        {/* Main Landing Sections */}
        <main>
          {/* 02 Hero */}
          <Hero />

          {/* 09 About */}
          <About />

          {/* 06 Solutions */}
          <Solutions />

          {/* 01 How It Works */}
          <HowItWorks />

          {/* 07 Projects */}
          <Projects />

          {/* 08 Benefits */}
          <Benefits />

          {/* 03 Testimonials */}
          <Testimonials />

          {/* 05 FAQ */}
          <Faq />

          {/* 10 Contact & Location */}
          <Contact />
        </main>

        {/* 04 CTA + Footer */}
        <CtaFooter />

        {/* Dev Debug Panel (?motion-debug) */}
        <MotionDebug />
      </div>
    </SmoothScroll>
  );
}
