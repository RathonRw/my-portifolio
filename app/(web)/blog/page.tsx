import { allPosts } from "content-collections";
import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, open source, security, and web development.",
};

export default async function BlogPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <header className="mb-16 text-center">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
            Blog
          </p>
        </header>

        {allPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground text-sm">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {allPosts.map((post) => (
              <Link
                className="group flex items-baseline justify-between gap-4 py-4 transition-colors"
                href={`/blog/${post.slug}`}
                key={post.slug}
              >
                <span className="truncate font-medium text-foreground text-sm transition-colors group-hover:text-muted-foreground">
                  {post.title}
                </span>
                {post.publishedAt && (
                  <span className="shrink-0 font-mono text-muted-foreground text-xs tabular-nums">
                    {format(new Date(post.publishedAt), "MMM d, yyyy")}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
