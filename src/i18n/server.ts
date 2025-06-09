import { createTranslator } from "next-intl";
import { notFound } from "next/navigation";
import { Locale, defaultLocale, locales } from "./config";

// Function to validate if the locale is supported
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Function to get translations for a given locale
export async function getTranslations(locale: Locale) {
  try {
    return (await import(`./locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Could not load translations for locale: ${locale}`, error);
    return {};
  }
}

// Function to create a translator instance
export async function createServerTranslator(locale: Locale, namespace = "common") {
  const messages = await getTranslations(locale);
  return createTranslator({ locale, messages, namespace });
}

// Middleware to handle locale validation
export function validateLocale(locale: string | undefined) {
  if (!locale || !isValidLocale(locale)) {
    notFound();
  }
  return locale;
}

// Helper to get the preferred locale from cookies or headers
export function getLocale(locale?: string): Locale {
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  
  // Default to English if no valid locale is found
  return defaultLocale;
}
