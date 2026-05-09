"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useCallback } from "react";

const segmentBase =
  "inline-flex min-h-9 min-w-[2.75rem] flex-1 items-center justify-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:min-w-0 sm:flex-none sm:px-3 dark:focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-stone-950";

const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const handleSetLight = useCallback(() => {
    setTheme("light");
  }, [setTheme]);

  const handleSetDark = useCallback(() => {
    setTheme("dark");
  }, [setTheme]);

  const handleLightKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      handleSetLight();
    },
    [handleSetLight],
  );

  const handleDarkKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      handleSetDark();
    },
    [handleSetDark],
  );

  const appearance = resolvedTheme ?? theme;
  const isLight = appearance === "light";
  const isDark = appearance === "dark";

  return (
    <fieldset className="m-0 inline-flex min-w-0 shrink-0 rounded-full border border-stone-200/90 bg-stone-100/90 p-0.5 shadow-sm dark:border-stone-600 dark:bg-stone-800/90">
      <legend className="sr-only">Renk teması</legend>
      <button
        type="button"
        onClick={handleSetLight}
        onKeyDown={handleLightKeyDown}
        aria-pressed={isLight}
        aria-label="Aydınlık tema"
        title="Aydınlık"
        className={`${segmentBase} ${
          isLight
            ? "bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-50"
            : "text-stone-500 hover:bg-white/60 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-700/50 dark:hover:text-stone-100"
        }`}
      >
        <SunIcon
          className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="hidden sm:inline">Açık</span>
      </button>
      <button
        type="button"
        onClick={handleSetDark}
        onKeyDown={handleDarkKeyDown}
        aria-pressed={isDark}
        aria-label="Karanlık tema"
        title="Karanlık"
        className={`${segmentBase} ${
          isDark
            ? "bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-50"
            : "text-stone-500 hover:bg-white/60 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-700/50 dark:hover:text-stone-100"
        }`}
      >
        <MoonIcon
          className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="hidden sm:inline">Koyu</span>
      </button>
    </fieldset>
  );
};

export default ThemeToggle;
