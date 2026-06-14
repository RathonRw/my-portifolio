"use client";

import { useEffect, useRef } from "react";

export function Skills() {
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

  const areas = [
    {
      title: "Design",
      description:
        "Finding and learning how other designer design their products. I spent my weekend looking on how other designers think.",
    },
    {
      title: "Reverse engineering",
      description:
        "Mapping how AI tools work under the hood: system prompts, agent loops, model routing.",
    },
    {
      title: "Open source",
      description:
        "Building tools in public and maintaining them long after launch.",
    },
    {
      title: "Web",
      description: "React, Next.js, and TypeScript for the things around it.",
    },
  ];

  return (
    <section
      className="relative py-10 md:py-12"
      data-nosnippet=""
      id="skills"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="mx-auto max-w-2xl space-y-6 md:space-y-7">
          <h2 className="animate-on-scroll font-medium text-foreground text-sm md:text-base">
            Focus
          </h2>

          <p className="max-w-xl animate-on-scroll text-[15px] text-foreground/90 leading-relaxed md:text-base">
            A few things I keep coming back to.
          </p>

          <div className="flex flex-col gap-5 sm:gap-6">
            {areas.map((area, index) => (
              <div
                className="animate-on-scroll space-y-1"
                key={area.title}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <h3 className="font-medium text-foreground text-sm">
                  {area.title}
                </h3>
                <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
