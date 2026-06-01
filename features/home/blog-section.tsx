"use client";

import type { Post } from "content-collections";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export interface BlogPost {
  excerpt: string;
  id: string;
  publishedAt: string;
  slug: string;
  tags?: BlogPostTag[];
  title: string;
}

export interface BlogPostTag {
  tag?: string | null;
}

export function BlogSection({ posts }: { posts: Post[] }) {
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
      id="blog"
      ref={sectionRef}
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <div className="mx-auto max-w-2xl space-y-6 md:space-y-7">
          <h2 className="animate-on-scroll font-medium text-foreground text-sm md:text-base">
            Writing
          </h2>
          {posts.length === 0 ? (
            <div className="animate-on-scroll py-2">
              <p className="text-muted-foreground text-sm">
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {posts.map((post, index) => (
                <Link
                  className="group -mx-2 flex animate-on-scroll items-baseline gap-1.5 rounded-md px-2 py-2 transition-colors duration-150 hover:bg-muted/40"
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <span className="shrink-0 font-medium text-foreground text-sm">
                    {post.title}
                  </span>
                  {post.description && (
                    <span className="line-clamp-1 text-muted-foreground text-sm">
                      {post.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
          {posts.length > 0 && (
            <div className="animate-on-scroll">
              <Link
                className="group inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
                href="/blog"
              >
                View all posts
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
