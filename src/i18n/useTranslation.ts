"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./client";

type TranslationPath = string;
type TranslationValues = Record<string, string | number>;

export function useTranslation() {
  const { locale } = useI18n();
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load translations for the current locale
  useEffect(() => {
    async function loadTranslations() {
      try {
        // Dynamic import for the translations
        const messages = (await import(`./locales/${locale}/common.json`)).default;
        setTranslations(messages);
        setIsLoaded(true);
      } catch (error) {
        console.error(`Failed to load translations for locale: ${locale}`, error);
        // Fallback to empty translations
        setTranslations({});
        setIsLoaded(true);
      }
    }

    loadTranslations();
  }, [locale]);

  // Function to access nested translation keys (e.g. "auth.login")
  function getNestedValue(obj: Record<string, any>, path: string): string {
    const keys = path.split(".");
    let result: any = obj;
    
    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        // Return the key if translation is not found
        return path;
      }
    }
    
    return typeof result === 'string' ? result : path;
  }

  // Function to interpolate values into translation strings
  function interpolateValues(text: string, values?: TranslationValues): string {
    if (!values) return text;
    
    return Object.entries(values).reduce((result, [key, value]) => {
      // Replace {{key}} with the value
      const regex = new RegExp(`{{${key}}}`, "g");
      return result.replace(regex, String(value));
    }, text);
  }

  // Main translation function
  function t(key: TranslationPath, values?: TranslationValues): string {
    if (!isLoaded) {
      return key; // Return the key while translations are loading
    }
    
    const translation = getNestedValue(translations, key);
    return interpolateValues(translation, values);
  }

  return {
    t,
    locale,
    isLoaded,
  };
}
