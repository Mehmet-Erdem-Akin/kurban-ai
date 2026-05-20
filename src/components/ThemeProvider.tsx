"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={false}
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);
