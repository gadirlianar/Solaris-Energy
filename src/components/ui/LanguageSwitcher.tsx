"use client";

import React from "react";
import { useLanguage, type Language } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
}

export function LanguageSwitcher({
  className = "",
  showIcon = true,
}: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string; full: string }[] = [
    { code: "en", label: "EN", full: "English" },
    { code: "az", label: "AZ", full: "Azərbaycan" },
    { code: "ru", label: "RU", full: "Русский" },
  ];

  return (
    <div
      role="group"
      aria-label={t.nav.langAria || "Select language / Dili seç / Выбор языка"}
      className={`inline-flex items-center p-1 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md border border-black/8 shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all duration-200 ${className}`}
    >
      {showIcon && (
        <span className="pl-1.5 pr-1 text-[#666666]" aria-hidden="true">
          <Globe className="w-3.5 h-3.5" />
        </span>
      )}

      <div className="flex items-center gap-0.5">
        {languages.map(({ code, label, full }) => {
          const isActive = language === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLanguage(code)}
              aria-pressed={isActive}
              title={full}
              className={`relative px-2.5 py-1 text-[12px] font-semibold tracking-wider rounded-full transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4F86E] ${
                isActive
                  ? "bg-[#111111] text-white shadow-xs"
                  : "text-[#555555] hover:text-[#111111] hover:bg-black/5"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
