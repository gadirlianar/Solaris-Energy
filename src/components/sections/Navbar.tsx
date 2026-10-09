"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/content";
import { Magnetic } from "@/components/motion/Magnetic";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      if (!reduced) {
        if (currentY > 120 && currentY > lastY + 5) {
          setHidden(true); // scrolling down
        } else if (currentY < lastY - 5 || currentY <= 120) {
          setHidden(false); // scrolling up
        }
      } else {
        setHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduced]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "about", "solutions", "projects", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-white/85 backdrop-blur-md py-3 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border-b border-black/[0.04]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Center Nav Links (Desktop) */}
        <nav
          className="hidden md:flex items-center gap-8 text-[16px] text-[#333333] font-normal"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-1 transition-colors duration-150 flex items-center gap-1.5 ${
                  isActive ? "text-[#111111] font-medium" : "hover:text-[#111111]"
                }`}
              >
                <span>{link.label}</span>
                {/* Active Section Lime Dot */}
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#E4F86E] inline-block shadow-sm"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:block">
          <Magnetic maxPull={8}>
            <Button href="#contact" variant="glass">
              Get Consultation
            </Button>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#111111] bg-white/60 backdrop-blur-md"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-6 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-[17px] text-[#222222]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 font-medium hover:text-black"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button
                href="#contact"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full justify-between"
              >
                Get Consultation
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
