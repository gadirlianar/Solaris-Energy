"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import azTranslations from "@/locales/az.json";
import ruTranslations from "@/locales/ru.json";

export type Language = "az" | "ru";
export type Translations = typeof azTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isHydrated: boolean;
}

const translationsMap: Record<Language, Translations> = {
  az: azTranslations,
  ru: ruTranslations as Translations,
};

const LanguageContext = createContext<LanguageContextType>({
  language: "az",
  setLanguage: () => {},
  t: azTranslations,
  isHydrated: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("az");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("solaris_lang") as Language | null;
      if (savedLang === "az" || savedLang === "ru") {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = "az";
      }
    } catch {
      // Graceful fallback for restricted environments
      document.documentElement.lang = "az";
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

  const t = translationsMap[language] || azTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  return useContext(LanguageContext);
}
