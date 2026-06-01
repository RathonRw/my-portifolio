"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import SiteFooter from "../_layout/site-footer";

const ease = [0.22, 1, 0.36, 1] as const;

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setCopied(false), 1600);
      } catch {
        // fall through to default mailto: behavior
      }
    }
  };

  const decoration =
    "underline underline-offset-[5px] decoration-muted-foreground/30 group-hover:decoration-foreground transition-colors";

  return (
    <a
      aria-label={`Copy email address ${email}`}
      className="group relative inline-flex items-baseline rounded-sm align-baseline text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
      href={`mailto:${email}`}
      onClick={onClick}
    >
      <span aria-hidden className={`invisible whitespace-nowrap ${decoration}`}>
        {email}
      </span>
      <span className="absolute inset-0 flex items-baseline justify-center overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {copied ? (
            <motion.span
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className={`inline-flex items-center gap-1 whitespace-nowrap text-foreground ${decoration}`}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              key="copied"
              transition={{ duration: 0.28, ease }}
            >
              <Check aria-hidden className="h-3.5 w-3.5" />
              <span>Copied</span>
            </motion.span>
          ) : (
            <motion.span
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className={`whitespace-nowrap ${decoration}`}
              exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              key="email"
              transition={{ duration: 0.28, ease }}
            >
              {email}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </a>
  );
}

export function Contact() {
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
      className="relative py-10 md:py-12"
      data-nosnippet=""
      id="contact"
      ref={sectionRef}
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <div className="mx-auto max-w-2xl space-y-6 md:space-y-7">
          <h2 className="animate-on-scroll font-medium text-foreground text-sm md:text-base">
            Elsewhere
          </h2>

          <div className="flex animate-on-scroll flex-col">
            <p className="max-w-xl text-foreground/90 text-sm leading-relaxed">
              The best way to reach me is by email at{" "}
              <CopyEmail email={siteConfig.links.email} />. You can also find
              more of my code on{" "}
              <a
                className="text-foreground underline decoration-muted-foreground/30 underline-offset-[5px] transition-colors hover:decoration-foreground"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>{" "}
              and more of my work on{" "}
              <a
                className="text-foreground underline decoration-muted-foreground/30 underline-offset-[5px] transition-colors hover:decoration-foreground"
                href={siteConfig.links.x}
                rel="noopener noreferrer"
                target="_blank"
              >
                X
              </a>{" "}
              and{" "}
              <a
                className="text-foreground underline decoration-muted-foreground/30 underline-offset-[5px] transition-colors hover:decoration-foreground"
                href={siteConfig.links.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
          <SiteFooter />
        </div>
      </div>
    </section>
  );
}
