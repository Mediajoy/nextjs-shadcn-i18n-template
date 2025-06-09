"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Locale, locales, defaultLocale, localeNames } from "./config";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  availableLocales: Array<{ code: Locale; name: string }>;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  locale: Locale;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const router = useRouter();

  const setLocale = (newLocale: Locale) => {
    // Store the selected locale in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }

    // Reload the page to switch the locale
    // In a real app, you might want to use Next.js internationalized routing instead
    router.refresh();
  };

  const availableLocales = locales.map(code => ({
    code,
    name: localeNames[code],
  }));

  return (
    <I18nContext.Provider value={{ locale, setLocale, availableLocales }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
