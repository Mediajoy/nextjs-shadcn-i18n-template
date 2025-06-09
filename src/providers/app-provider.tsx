"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth-provider";
import { PermissionsProvider } from "./permissions";
import { I18nProvider } from "@/i18n/client";
import { defaultLocale, Locale, locales } from "@/i18n/config";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * Global application provider that combines all context providers
 * This ensures a consistent provider hierarchy throughout the application
 */
export function AppProvider({ children }: AppProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  
  // Initialize locale from localStorage on client side
  useEffect(() => {
    setMounted(true);
    const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
    
    // Check if the saved locale is valid
    if (savedLocale && locales.includes(savedLocale as Locale)) {
      setCurrentLocale(savedLocale as Locale);
    }
  }, []);

  // To avoid hydration mismatch, render providers only after mounted
  if (!mounted) {
    // Return a simple div with the children to avoid hydration issues
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider locale={currentLocale}>
        <AuthProvider>
          <PermissionsProvider>
            {children}
            <Toaster 
              position="top-right" 
              richColors 
              closeButton
              toastOptions={{
                duration: 5000,
                className: "my-toast-class",
              }}
            />
          </PermissionsProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

/**
 * Usage:
 * 
 * In your root layout.tsx file:
 * 
 * import { AppProvider } from "@/providers/app-provider";
 * 
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="en" suppressHydrationWarning>
 *       <body className={inter.className}>
 *         <AppProvider>{children}</AppProvider>
 *       </body>
 *     </html>
 *   );
 * }
 */
