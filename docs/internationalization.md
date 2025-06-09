# Internationalization (i18n) Guide

This Next.js + Shadcn template includes built-in internationalization support to help you create multilingual applications. This guide explains how to use and extend the i18n features.

## Table of Contents

1. [Overview](#overview)
2. [Supported Languages](#supported-languages)
3. [Directory Structure](#directory-structure)
4. [Using Translations](#using-translations)
5. [Adding New Languages](#adding-new-languages)
6. [Language Switching](#language-switching)
7. [Server-Side Translations](#server-side-translations)
8. [Route-Based Internationalization](#route-based-internationalization)

## Overview

The internationalization system is built using:

- Custom React hooks for client-side translations
- Server-side translation utilities 
- A language switcher component
- Translation JSON files for each supported language

## Supported Languages

The template currently supports the following languages:

- English (en) - Default
- Spanish (es)

You can easily add more languages as needed.

## Directory Structure

```
src/
└── i18n/
    ├── client.tsx         # Client-side i18n provider and hook
    ├── config.ts          # Configuration for supported locales
    ├── middleware.ts      # Example i18n routing middleware
    ├── server.ts          # Server-side i18n utilities
    ├── useTranslation.ts  # Client hook for accessing translations
    └── locales/
        ├── en/
        │   └── common.json  # English translations
        └── es/
            └── common.json  # Spanish translations
```

## Using Translations

### Client Components

In client components, use the `useTranslation` hook:

```tsx
"use client";

import { useTranslation } from "@/i18n/useTranslation";

export default function MyComponent() {
  const { t, locale } = useTranslation();
  
  return (
    <div>
      <h1>{t("app.name")}</h1>
      <p>{t("app.description")}</p>
      <p>Current language: {locale}</p>
    </div>
  );
}
```

You can also use placeholders in your translations:

```tsx
// In your translation file:
// "greeting": "Hello, {{name}}!"

const { t } = useTranslation();
return <p>{t("greeting", { name: "User" })}</p>;
```

### Server Components

For server components, use the server-side utilities:

```tsx
import { createServerTranslator } from "@/i18n/server";

export default async function MyServerComponent({ params }: { params: { locale: string } }) {
  const translate = await createServerTranslator(params.locale);
  
  return (
    <h1>{translate("app.welcome")}</h1>
  );
}
```

## Adding New Languages

1. Create a new folder in `src/i18n/locales/` with the language code (e.g., `fr` for French)
2. Copy the `common.json` file from an existing language folder
3. Translate all the strings to the new language
4. Add the new locale to the `locales` array in `src/i18n/config.ts`

## Language Switching

The template includes a `LanguageSwitcher` component that allows users to change the application language:

```tsx
import { LanguageSwitcher } from "@/components/language-switcher";

// Basic usage
<LanguageSwitcher />

// With custom styling
<LanguageSwitcher variant="outline" size="sm" showLabel={true} />
```

## Server-Side Translations

For server-side rendering with translations:

```tsx
import { getLocale, getTranslations } from "@/i18n/server";

export default async function Page({ params }: { params: { locale?: string } }) {
  const locale = getLocale(params.locale);
  const translations = await getTranslations(locale);
  
  // Use translations here
}
```

## Route-Based Internationalization

The template includes an example middleware (`src/i18n/middleware.ts`) that demonstrates how to implement route-based internationalization by:

1. Detecting the user's preferred language
2. Redirecting to localized routes (e.g., `/en/dashboard`, `/es/dashboard`)
3. Preserving language preferences in cookies

To fully implement route-based internationalization, follow these steps:

1. Install required dependencies mentioned in the middleware file
2. Configure your routes with locale parameters
3. Update the root middleware.ts file to use the i18n middleware

---

For a practical example of the internationalization system in action, check out the example page at `/dashboard/i18n-example`.
