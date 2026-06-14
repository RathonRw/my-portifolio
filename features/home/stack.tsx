"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function Stack() {
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

  const techStack = [
    { name: "React", icon: "/icons/react_dark.svg", href: "https://react.dev" },
    {
      name: "Next.js",
      icon: "/icons/nextjs_icon_dark.svg",
      href: "https://nextjs.org",
    },
    {
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      href: "https://www.typescriptlang.org",
    },
    {
      name: "Python",
      icon: "/icons/python.svg",
      href: "https://www.python.org",
    },
    { name: "AI", icon: "/icons/claude-mono.svg", href: "https://claude.ai/" },
    {
      name: "Tailwind",
      icon: "/icons/tailwindcss.svg",
      href: "https://tailwindcss.com",
    },
    {
      name: "Convex",
      icon: "/icons/convex.svg",
      href: "https://www.convex.dev",
    },
    { name: "Vercel", icon: "/icons/vercel.svg", href: "https://vercel.com" },
    { name: "Pnpm", icon: "/icons/pnpm-mono.svg", href: "https://pnpm.io" },
  ];

  return (
    <section
      className="relative py-10 md:py-12"
      data-nosnippet=""
      id="stack"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="mx-auto max-w-2xl space-y-6 md:space-y-7">
          <h2 className="animate-on-scroll font-medium text-foreground text-sm md:text-base">
            Stack
          </h2>

          <div className="grid animate-on-scroll grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {techStack.map((tech) => (
              <a
                className="group inline-flex items-center gap-2.5 py-1"
                href={tech.href}
                key={tech.name}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="relative h-4 w-4 shrink-0">
                  <Image
                    alt=""
                    aria-hidden
                    className="object-contain dark:invert"
                    fill
                    src={tech.icon}
                  />
                </span>
                <span className="text-foreground/90 text-sm underline decoration-muted-foreground/30 underline-offset-[5px] transition-colors group-hover:decoration-foreground">
                  {tech.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
