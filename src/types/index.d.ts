/**
 * Global type declarations for the project
 */

// Extend the Window interface for any global JS variables
declare interface Window {
  // Add any window globals here if needed
}

// Declare modules that don't have TypeScript definitions
declare module 'next-themes' {
  import { ReactNode } from 'react';

  export interface ThemeProviderProps {
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    storageKey?: string;
    themes?: string[];
    value?: { [themeName: string]: string };
    children: ReactNode;
  }

  export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
  
  export function useTheme(): {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    resolvedTheme: string | undefined;
    themes: string[];
    systemTheme?: string;
  };
}

// Extend types for testing libraries
declare module '@testing-library/jest-dom' {
  // This empty declaration ensures TypeScript recognizes the module
}

// For any other missing types that might be encountered
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: string;
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string;
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string;
    NEXT_PUBLIC_VERCEL_BLOB_READ_WRITE_TOKEN: string;
    DATABASE_URL: string;
  }
}

// For any libraries that might not have types
declare module 'cmdk' {
  import * as React from 'react';

  export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
    shouldFilter?: boolean;
    filter?: (value: string, search: string) => number;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    label?: string;
  }

  export const Command: React.ForwardRefExoticComponent<
    CommandProps & React.RefAttributes<HTMLDivElement>
  > & {
    List: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
    >;
    Item: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
    >;
    Input: React.ForwardRefExoticComponent<
      React.InputHTMLAttributes<HTMLInputElement> &
        React.RefAttributes<HTMLInputElement>
    >;
    Group: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
    >;
    Separator: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
    >;
    Empty: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
    >;
  };
}
