"use client";

import { Analytics } from "@vercel/analytics/next";
import { TailwindIndicator } from "../custom/tailwind-indicator";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        {children}
        <TailwindIndicator />
      </ThemeProvider>
      <Analytics />
    </>
  );
}
