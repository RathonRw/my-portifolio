"use client";
import { format } from "date-fns";
import { ArrowUpRightIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { certificates } from "@/config/data";

export default function CertificatesList() {
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
    <section
      className="flex flex-col gap-10"
      id="certificates"
      ref={sectionRef}
    >
      {certificates.map((cat) => (
        <div className="flex flex-col gap-5" key={cat.category}>
          <p className="animate-on-scroll font-mono text-muted-foreground text-sm">
            {cat.category}
          </p>

          <div className="divide-y divide-border">
            {cat.certificates.map((c, index) => (
              <a
                className="group flex animate-on-scroll items-baseline justify-between gap-4 py-4 transition-colors"
                href={c.link}
                key={c.title}
                rel="noopener"
                style={{ transitionDelay: `${index * 60}ms` }}
                target="_blank"
              >
                <span className="truncate font-medium text-foreground text-sm transition-colors group-hover:text-muted-foreground">
                  {c.title}
                </span>
                <ArrowUpRightIcon className="ml-auto size-3 shrink-0 self-center text-muted-foreground/60 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground group-hover:opacity-100" />
                {c.date && (
                  <span className="shrink-0 font-mono text-muted-foreground text-xs tabular-nums">
                    {format(new Date(c.date), "MMM d, yyyy")}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
