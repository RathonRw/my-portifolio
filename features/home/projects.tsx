"use client";

import { ArrowUpRight, Globe, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { FiGithub } from "react-icons/fi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProjects } from "@/config/projects";

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projects = useProjects();

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

    for (const project of projects) {
      if (project.image) {
        const img = new Image();
        img.src = project.image;
      }
    }

    return () => observer.disconnect();
  }, [projects]);

  return (
    <section
      className="relative pt-2 pb-10 md:pt-4 md:pb-12"
      data-nosnippet=""
      id="projects"
      ref={sectionRef}
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <div className="mx-auto max-w-2xl space-y-6 md:space-y-7">
          <h2 className="animate-on-scroll font-medium text-foreground text-sm md:text-base">
            Projects
          </h2>

          <div className="flex flex-col">
            {projects.map((project, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <button
                    className="group relative -mx-2 w-full animate-on-scroll cursor-pointer rounded-md px-2 py-2 text-left transition-colors duration-150 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                    style={{ transitionDelay: `${index * 60}ms` }}
                    type="button"
                  >
                    <div className="flex items-baseline gap-1.5 leading-snug">
                      <span className="shrink-0 font-medium text-foreground text-sm">
                        {project.title}
                      </span>
                      <span className="line-clamp-1 text-muted-foreground text-sm">
                        {project.description}
                      </span>
                      <ArrowUpRight className="ml-auto h-3 w-3 shrink-0 self-center text-muted-foreground/60 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground group-hover:opacity-100" />
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent
                  className="max-h-[88dvh] w-[calc(100%-1rem)] max-w-xl gap-0 overflow-hidden rounded-xl border border-border bg-background p-0 shadow-2xl sm:max-h-[90vh] sm:w-full sm:max-w-xl"
                  showCloseButton={false}
                >
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="custom-scrollbar relative flex max-h-[88dvh] flex-col overflow-y-auto overscroll-contain sm:max-h-[90vh]"
                    initial={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DialogClose
                      aria-label="Close"
                      className="sticky top-3 z-50 mr-3 -mb-9 inline-flex h-8 w-8 items-center justify-center self-end rounded-full border border-border bg-background/80 text-muted-foreground outline-none backdrop-blur transition-colors duration-150 hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20"
                    >
                      <X className="h-3.5 w-3.5" />
                    </DialogClose>

                    {project.image && (
                      <div className="relative w-full shrink-0 border-border border-b bg-muted/30">
                        <div className="aspect-video w-full overflow-hidden sm:aspect-16/10">
                          {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: for now */}
                          {/** biome-ignore lint/correctness/useImageSize: for now */}
                          {/** biome-ignore lint/performance/noImgElement: fornow */}
                          <img
                            alt={project.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.classList.add(
                                  "flex",
                                  "items-center",
                                  "justify-center"
                                );
                                const span = document.createElement("span");
                                span.className =
                                  "text-muted-foreground font-mono text-xs text-center px-6";
                                span.innerText = "[ image unavailable ]";
                                parent.appendChild(span);
                              }
                            }}
                            src={project.image}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col space-y-4 p-5 sm:space-y-5 sm:p-6 md:p-7">
                      <div className="space-y-1.5 sm:space-y-2">
                        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
                          {project.subtitle}
                        </p>
                        <DialogTitle className="pr-10 font-semibold text-[17px] text-foreground leading-snug tracking-tight sm:text-lg md:text-xl">
                          {project.title}
                        </DialogTitle>
                      </div>

                      <DialogDescription className="text-[14px] text-foreground/85 leading-relaxed sm:text-[15px]">
                        {project.fullDescription}
                      </DialogDescription>

                      {(project.links.demo || project.links.github) && (
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-border border-t pt-3">
                          {project.links.demo && (
                            <a
                              className="group inline-flex items-center gap-1.5 font-medium text-foreground text-sm"
                              href={project.links.demo}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Globe className="h-3.5 w-3.5" />
                              <span className="underline decoration-muted-foreground/30 underline-offset-[5px] transition-colors group-hover:decoration-foreground">
                                Website
                              </span>
                              <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              className="group inline-flex items-center gap-1.5 font-medium text-foreground text-sm"
                              href={project.links.github}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <FiGithub className="h-3.5 w-3.5" />
                              <span className="underline decoration-muted-foreground/30 underline-offset-[5px] transition-colors group-hover:decoration-foreground">
                                Source
                              </span>
                              <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
