"use client";
import { useEffect, useRef } from "react";
import { ThemeSwitcher } from "@/components/custom/theme-switcher";
import { siteConfig } from "@/config/site";

export default function SiteFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    if (elements) {
      for (const el of elements) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);
  return (
    <footer
      className="relative z-10 mx-auto w-full max-w-5xl p-6 md:p-12"
      data-nosnippet=""
      id="contact"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-2xl space-y-6 md:space-y-7">
        <footer className="flex animate-on-scroll flex-col items-center justify-between gap-4 pt-10 md:flex-row">
          <div className="order-2 flex h-8 items-center md:order-1">
            <p className="text-muted-foreground text-xs leading-none">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>
          <div className="order-1 md:order-2">
            <ThemeSwitcher />
          </div>
        </footer>
      </div>
    </footer>
  );
}
