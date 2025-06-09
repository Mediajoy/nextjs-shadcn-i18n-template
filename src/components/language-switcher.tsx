"use client";

import { useState, useEffect } from "react";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Locale, defaultLocale, locales, localeNames } from "@/i18n/config";
import { useI18n } from "@/i18n/client";

interface LanguageSwitcherProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function LanguageSwitcher({
  variant = "outline",
  size = "icon",
  showLabel = false,
}: LanguageSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale } = useI18n();
  
  // Avoid hydration mismatch by rendering only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle locale change
  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
      
      // The page will refresh due to setLocale implementation
    }
  };

  // If not mounted yet, render empty div with same width/height to avoid layout shift
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={showLabel ? "gap-2" : ""}
          aria-label="Select language"
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          {showLabel && <span>{localeNames[locale]}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLocaleChange(lang)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{localeNames[lang]}</span>
            {locale === lang && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
