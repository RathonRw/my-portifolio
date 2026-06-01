import { Calendar, Code2, Globe, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { formatGithubThousands } from "@/lib/github-api";

export function useProjects() {
  const [githubStats, setGithubStats] = useState<{
    stars: string;
    forks: string;
  } | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/x1xhlol/system-prompts-and-models-of-ai-tools",
          {
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        const data = (await response.json()) as {
          message?: string;
          stargazers_count?: number;
          forks_count?: number;
        };

        if (!response.ok || typeof data.stargazers_count !== "number") {
          setGithubStats({ stars: "—", forks: "—" });
          return;
        }

        setGithubStats({
          stars: formatGithubThousands(data.stargazers_count),
          forks:
            typeof data.forks_count === "number"
              ? formatGithubThousands(data.forks_count)
              : "—",
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        setGithubStats({ stars: "—", forks: "—" });
      }
    };

    fetchGitHubStats();
  }, []);
  return [
    {
      title: "System Prompts and Models of AI Tools",
      subtitle: "AI Research / Open Source",
      description:
        "Reverse-engineered system prompts from major AI coding assistants including v0, Cursor, and Windsurf.",
      fullDescription:
        "This repository contains reverse-engineered system prompts from major AI coding assistants. I extract, document, and analyze the internal instructions that tools like v0, Cursor, Manus, and Windsurf use to guide their LLMs. The goal is transparency: developers can understand how these tools work and improve their own prompt engineering.",
      image:
        "https://xobhe5j5syssmps0.public.blob.vercel-storage.com/Screenshot%202026-01-07%20152543.png",
      stats: githubStats,
      links: {
        github:
          "https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools",
      },
      icon: Code2,
    },
    {
      title: "ZeroLeaks",
      subtitle: "Cybersecurity / SaaS",
      description:
        "Security testing platform for LLM applications to identify prompt extraction vulnerabilities.",
      fullDescription:
        "ZeroLeaks is a security platform built to help companies test their LLM deployments. It simulates prompt injection and extraction attacks to identify if system prompts can be leaked. The platform provides detailed reports and remediation strategies to harden AI applications against these attack vectors.",
      image:
        "https://xobhe5j5syssmps0.public.blob.vercel-storage.com/Screenshot%202026-01-11%20190656.png",
      links: {
        github: "https://github.com/ZeroLeaks/zeroleaks",
        demo: "https://zeroleaks.ai",
      },
      icon: Shield,
    },
    {
      title: "Zero Calendar",
      subtitle: "Productivity",
      description:
        "AI-powered calendar with natural language event creation and Google Calendar sync.",
      fullDescription:
        'Zero Calendar is an open-source scheduling tool. Instead of clicking through date pickers, you type natural language like "lunch with Alex next Tuesday at noon" and it parses everything automatically. It syncs with Google Calendar and supports recurring events.',
      image: "/projects/zero-calendar.png",
      links: {
        github: "https://github.com/x1xhlol/zero-calendar",
      },
      icon: Calendar,
    },
    {
      title: "Better-Clawd",
      subtitle: "Developer Tools / CLI",
      description:
        "A faster, telemetry-free Claude Code fork with OpenAI, OpenRouter, and Anthropic support.",
      fullDescription:
        "Better-Clawd is an independent Claude Code fork focused on performance, provider flexibility, and local-first behavior. It keeps the original CLI experience that worked, removes telemetry, reduces vendor lock-in, and adds support for OpenAI, OpenRouter, and Anthropic without turning setup into a science project.",
      image: "/projects/better-clawd-terminal.png",
      links: {
        github: "https://github.com/x1xhlol/better-clawd",
      },
      icon: Code2,
    },
    {
      title: "This portfolio",
      subtitle: "lucasvalbuena.com",
      description:
        "Personal site built with Next.js and Tailwind: projects, blog, stack, and photos.",
      fullDescription:
        "My personal site runs on Next.js and Tailwind. I use it for project write-ups, blog posts, and my photography. Source is on GitHub.",
      links: {
        github: "https://github.com/x1xhlol/lucasvalbuena.com",
      },
      icon: Globe,
    },
  ];
}
