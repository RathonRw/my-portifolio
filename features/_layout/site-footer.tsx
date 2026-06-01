"use client";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { ThemeSwitcher } from "@/components/custom/theme-switcher";
import { siteConfig } from "@/config/site";

const themes = ["light", "dark", "system"] as const;
type ThemeName = (typeof themes)[number];

function isThemeName(theme: string | undefined): theme is ThemeName {
  return themes.includes(theme as ThemeName);
}

export default function SiteFooter() {
  return (
    // <div className="relative z-10 mx-auto w-full max-w-5xl p-6 md:p-12">
    //   <div className="mx-auto max-w-2xl space-y-6 md:space-y-7">
    <footer className="flex animate-on-scroll flex-col items-center justify-between gap-4 pt-10 md:flex-row">
      <div className="order-2 flex h-8 items-center md:order-1">
        <p className="text-muted-foreground text-xs leading-none">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
      <div className="order-1 md:order-2">
        <ThemeChanger />
      </div>
    </footer>
    //   {/* </div>
    // </div> */}
  );
}

function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const activeTheme = isThemeName(theme) ? theme : "system";

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "d" || e.key === "D") && !e.metaKey && !e.ctrlKey) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleTheme]);
  return <ThemeSwitcher onChange={(v) => setTheme(v)} value={activeTheme} />;
}
