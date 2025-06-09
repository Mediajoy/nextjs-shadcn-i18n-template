// Configuration for i18n
export const defaultLocale = 'en';
export const locales = ['en', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

// Function to get all available locales with their names
export function getAvailableLocales() {
  return locales.map(locale => ({
    code: locale,
    name: localeNames[locale],
  }));
}
