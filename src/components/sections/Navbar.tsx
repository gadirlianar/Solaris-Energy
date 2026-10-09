"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Calculator } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useTranslation } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { QuickActionButton } from "@/components/ui/QuickActionButton";
import { SolarCalculatorModal } from "@/components/ui/SolarCalculatorModal";

export function Navbar() {
  const { t, language } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const reduced = useReducedMotion();

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.solutions, href: "#solutions" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

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
    const sectionIds = ["home", "about", "solutions", "projects", "faq", "contact"];
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
    <>
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
            className="hidden lg:flex items-center gap-7 text-[15.5px] text-[#333333] font-normal"
            aria-label={t.nav.menuAria || "Main Navigation"}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-150 flex items-center gap-1.5 ${
                    isActive ? "text-[#111111] font-medium" : "hover:text-[#111111]"
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Active Section Lime Dot */}
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#E4F86E] inline-block shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Functional Quick Action Button: Solar Calculator Modal */}
            <QuickActionButton
              onClick={() => setCalcModalOpen(true)}
              variant="glass"
              size="sm"
              icon={<Calculator className="w-4 h-4 text-[#111111]" />}
              ariaLabel={t.nav.quickCalcBtn}
            >
              {t.nav.quickCalcBtn}
            </QuickActionButton>

            {/* Main Consultation CTA */}
            <Magnetic maxPull={8}>
              <Button href="#contact" variant="primary">
                {t.nav.consultationBtn}
              </Button>
            </Magnetic>
          </div>

          {/* Mobile Right Controls: Language Switcher + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher showIcon={false} />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#111111] bg-white/60 backdrop-blur-md cursor-pointer"
              aria-label={t.nav.menuAria || "Toggle navigation menu"}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 font-medium hover:text-black"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                <QuickActionButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCalcModalOpen(true);
                  }}
                  variant="lime"
                  size="md"
                  className="w-full justify-center"
                  icon={<Calculator className="w-4 h-4 text-[#111111]" />}
                >
                  {t.nav.quickCalcBtn}
                </QuickActionButton>

                <Button
                  href="#contact"
                  variant="primary"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full justify-between"
                >
                  {t.nav.consultationBtn}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Solar Savings Calculator Modal */}
      <SolarCalculatorModal
        isOpen={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
      />
    </>
  );
}
