import React, { createContext, useContext, useState, useCallback } from "react";
import { Lang, T, Translations, LANGUAGES } from "@/i18n/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  languages: typeof LANGUAGES;
};

const LanguageCtx = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "monzon-lang-v1";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && ["en", "fr", "es"].includes(saved)) return saved;
    // Auto-detect browser language
    const browser = navigator.language?.slice(0, 2);
    if (browser === "fr") return "fr";
    if (browser === "es") return "es";
    return "en";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  // Set initial html lang
  React.useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <LanguageCtx.Provider value={{ lang, setLang, t: T[lang], languages: LANGUAGES }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
