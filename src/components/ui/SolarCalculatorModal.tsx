"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Zap, Leaf, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SolarCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SolarCalculatorModal({ isOpen, onClose }: SolarCalculatorModalProps) {
  const { language, t } = useLanguage();

  const getInitialBill = (lang: string) => {
    if (lang === "az") return 120;
    if (lang === "ru") return 7500;
    return 180; // en (USD)
  };

  const [bill, setBill] = useState(getInitialBill(language));

  // Sync bill scale if language flips while open
  useEffect(() => {
    if (language === "az" && bill > 500) setBill(120);
    else if (language === "ru" && bill < 600) setBill(7500);
    else if (language === "en" && (bill > 1000 || bill < 30)) setBill(180);
  }, [language, bill]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const minBill = language === "az" ? 30 : language === "ru" ? 1500 : 40;
  const maxBill = language === "az" ? 500 : language === "ru" ? 30000 : 700;
  const step = language === "az" ? 10 : language === "ru" ? 500 : 10;
  const currencySymbol = language === "az" ? "AZN" : language === "ru" ? "₽" : "$";

  // Calculations:
  // Solar saves ~70% on average
  const monthlySavings = Math.round(bill * 0.7);
  const yearlySavings = monthlySavings * 12;
  const twentyFiveYearSavings = yearlySavings * 25;

  // Approx kW needed: 1 kW produces ~120-140 kWh/month.
  // Assuming tariff ~0.10 AZN/kWh, ~6 RUB/kWh, or ~$0.16/kWh
  const estimatedKwh =
    language === "az" ? bill / 0.10 : language === "ru" ? bill / 6.0 : bill / 0.16;
  const systemKw = Math.max(3.2, Math.round((estimatedKwh / 130) * 10) / 10);
  const co2Tons = Math.round(systemKw * 1.35 * 10) / 10;

  const calcT = t.calculator;

  const handleApply = () => {
    onClose();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calculator-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[620px] bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)] border border-black/8 overflow-hidden select-none animate-in zoom-in-95 duration-200"
      >
        {/* Top Lime Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 bg-[#E4F86E]/40 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-[#E4F86E] text-[11.5px] font-semibold tracking-wide uppercase mb-2.5">
              <Sparkles className="w-3 h-3" />
              <span>{calcT.badge}</span>
            </div>
            <h3
              id="calculator-title"
              className="text-[24px] sm:text-[28px] font-medium tracking-tight text-[#111111] leading-tight"
            >
              {calcT.title}
            </h3>
            <p className="text-[14.5px] text-[#666666] mt-1.5 max-w-[460px] leading-relaxed">
              {calcT.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={calcT.close}
            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bill Slider Section */}
        <div className="bg-[#F8F9FA] rounded-[20px] p-5 sm:p-6 border border-black/5 mb-6 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] font-medium text-[#444444]">
              {calcT.billLabel}
            </span>
            <span className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-[#111111]">
              {bill.toLocaleString()} <span className="text-[17px] font-normal text-[#666666]">{currencySymbol}</span>
            </span>
          </div>

          <input
            type="range"
            min={minBill}
            max={maxBill}
            step={step}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#111111] focus:outline-none"
          />

          <div className="flex justify-between text-[12px] text-[#888888] font-medium mt-2">
            <span>{minBill.toLocaleString()} {currencySymbol}</span>
            <span>{maxBill.toLocaleString()} {currencySymbol}</span>
          </div>
        </div>

        {/* Real-Time Calculated Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 relative z-10">
          {/* Monthly */}
          <div className="bg-white rounded-[16px] p-3.5 border border-black/8 shadow-2xs">
            <span className="text-[11.5px] font-medium text-[#777777] block leading-tight mb-1">
              {calcT.monthlySavings}
            </span>
            <div className="text-[20px] font-semibold text-[#111111]">
              ~{monthlySavings.toLocaleString()} <span className="text-[13px] font-normal text-[#666]">{currencySymbol}</span>
            </div>
          </div>

          {/* 25-Year Cumulative */}
          <div className="bg-[#E4F86E]/20 rounded-[16px] p-3.5 border border-[#E4F86E] shadow-2xs">
            <span className="text-[11.5px] font-semibold text-[#333333] block leading-tight mb-1">
              {calcT.twentyFiveYear}
            </span>
            <div className="text-[20px] font-bold text-[#111111]">
              {twentyFiveYearSavings.toLocaleString()} <span className="text-[13px] font-medium text-[#333]">{currencySymbol}</span>
            </div>
          </div>

          {/* System Size */}
          <div className="bg-white rounded-[16px] p-3.5 border border-black/8 shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-[11.5px] font-medium text-[#777777] block leading-tight mb-1">
              {calcT.recommendedPower}
            </span>
            <div className="text-[20px] font-semibold text-[#111111] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#E4F86E] fill-[#111111]" />
              <span>{systemKw} kVt</span>
            </div>
          </div>
        </div>

        {/* Environmental impact note */}
        <div className="flex items-center gap-2.5 px-3 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-[12.5px] font-medium mb-6">
          <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {calcT.co2Reduction}: <strong>{co2Tons} {calcT.tons}</strong> (≈ {Math.round(co2Tons * 45)} ağac əkməyə bərabərdir)
          </span>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 h-[46px] rounded-[14px] bg-[#111111] hover:bg-[#222222] text-white font-medium text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer"
          >
            <span>{calcT.orderCTA}</span>
            <ArrowRight className="w-4 h-4 text-[#E4F86E]" />
          </button>
        </div>
      </div>
    </div>
  );
}
