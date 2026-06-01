"use client";

import { ArrowLeft, Home } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789";

function useGlitchText(target: string, duration = 1200) {
  const [text, setText] = useState(target);

  useEffect(() => {
    const steps = 12;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const resolved = Math.floor(progress * target.length);

      const result = target
        .split("")
        .map((char, i) => {
          if (i < resolved) {
            return char;
          }
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join("");

      setText(result);

      if (step >= steps) {
        clearInterval(timer);
        setText(target);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, duration]);

  return text;
}

export default function NotFound() {
  const glitched = useGlitchText("404");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="grid-pattern grid-fade pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground" />
            </span>
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              Page not found
            </span>
          </div>
        </motion.div>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-bold font-mono text-5xl tracking-tighter sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {glitched}
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-10 max-w-sm text-muted-foreground text-sm leading-relaxed md:text-base"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 font-medium text-background text-xs transition-all hover:bg-foreground/90"
            href="/"
          >
            <Home className="h-3.5 w-3.5" />
            Go home
          </Link>
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 font-medium text-xs transition-all hover:border-foreground/20 hover:bg-muted/30"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
            type="button"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Go back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
