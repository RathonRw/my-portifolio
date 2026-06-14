"use client";

import { Terminal } from "lucide-react";
import { motion } from "motion/react";
import { BsOpenai } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { siteConfig } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

interface Stats {
  forks: string;
  stars: string;
}

export function Hero({
  initialStats,
  repoStats,
}: {
  initialStats: Stats;
  repoStats?: Stats;
}) {
  const stats = initialStats;
  const systemPrompts = repoStats ?? initialStats;

  const parent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease },
    },
  };

  return (
    <section
      className="relative pt-28 pb-10 md:pt-32 md:pb-14"
      data-nosnippet=""
      id="home"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <div className="mx-auto max-w-2xl">
          <motion.div
            animate="show"
            className="space-y-7 md:space-y-8"
            initial="hidden"
            variants={parent}
          >
            <motion.h1
              className="font-medium font-pixel-square text-2xl leading-[1.15] md:text-[32px]"
              variants={child}
            >
              {siteConfig.name}
            </motion.h1>

            <motion.div className="space-y-4" variants={child}>
              <p className="max-w-xl text-[15px] text-foreground/90 leading-relaxed md:text-base">
                I reverse-engineer AI tools and ship security research. 16,
                based in Kigali.
              </p>
              <p className="max-w-xl text-[15px] text-foreground/90 leading-relaxed md:text-base">
                I run{" "}
                <a
                  className="underline decoration-muted-foreground/30 underline-offset-[5px] transition-colors hover:decoration-foreground"
                  href="https://zeroleaks.ai"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  KuluChat
                </a>
                , a platform that stress-tests LLM apps for prompt injection and
                system-prompt extraction.
              </p>
              <p className="max-w-xl text-[15px] text-foreground/90 leading-relaxed md:text-base">
                I also maintain{" "}
                <a
                  className="underline decoration-muted-foreground/30 underline-offset-[5px] transition-colors hover:decoration-foreground"
                  href="https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Rathon
                </a>{" "}
                ({systemPrompts.stars} stars), a public archive of how the main
                AI tools guide their LLMs.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-2 pt-1"
              variants={child}
            >
              <a
                className="inline-flex items-center gap-3 rounded-md border border-border bg-background/60 px-3 py-1.5 font-mono text-[11px] transition-colors duration-150 hover:bg-muted/60"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">
                    @{siteConfig.githubUser}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  <span className="text-foreground">{stats.stars}</span> stars ·{" "}
                  <span className="text-foreground">{stats.forks}</span> forks
                </span>
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1.5 text-[11px] transition-colors duration-150 hover:bg-muted/60"
                href={siteConfig.links.x}
                rel="noopener noreferrer"
                target="_blank"
              >
                <BsOpenai className="h-3 w-3 shrink-0" />
                <span className="text-muted-foreground">
                  GPT-5 Security Research · OpenAI
                </span>
              </a>
            </motion.div>

            <motion.div
              className="-ml-2 flex items-center gap-1 pt-1"
              variants={child}
            >
              <a
                aria-label="GitHub profile"
                className="rounded-md p-2 text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FiGithub aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                aria-label="X profile"
                className="rounded-md p-2 text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground"
                href="https://x.com/NotLucknite"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaXTwitter aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                aria-label="LinkedIn profile"
                className="rounded-md p-2 text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground"
                href="https://linkedin.com/in/lucknite"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FiLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
