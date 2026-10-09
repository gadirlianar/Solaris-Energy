"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/locales/en.json";
import azTranslations from "@/locales/az.json";
import ruTranslations from "@/locales/ru.json";

export type Language = "en" | "az" | "ru";
export type Translations = typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isHydrated: boolean;
}

const translationsMap: Record<Language, Translations> = {
  en: enTranslations,
  az: azTranslations as unknown as Translations,
  ru: ruTranslations as unknown as Translations,
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: enTranslations,
  isHydrated: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("solaris_lang") as Language | null;
      if (savedLang === "en" || savedLang === "az" || savedLang === "ru") {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = "en";
      }
    } catch {
      // Graceful fallback for restricted environments
      document.documentElement.lang = "en";
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("solaris_lang", lang);
    } catch {
      // Ignore write errors in private browsing / sandboxes
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  const t = translationsMap[language] || enTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const useTranslation = useLanguage;
