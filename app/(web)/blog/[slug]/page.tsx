import { MDXContent } from "@content-collections/mdx/react";
import { allPosts, type Post } from "content-collections";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { components } from "@/features/blog/mdx-component";
import type { BlogPostTag } from "@/features/home/blog-section";

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostFromParams(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}
async function getPostFromParams(slug: string) {
  const post = allPosts.find((p: Post) => p.slugAsParams === slug);

  if (!post) {
    notFound();
  }

  return post;
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams,
  }));
}
export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostFromParams(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pt-32 pb-24">
      <article className="mx-auto max-w-2xl px-6">
        <header className="mb-10 text-center">
          <p className="mb-4 font-mono text-muted-foreground text-xs uppercase tracking-widest">
            Blog
          </p>
          <h1 className="mb-6 font-bold text-2xl text-foreground leading-tight tracking-tight md:text-3xl">
            {post.title as string}
          </h1>
          <div className="flex items-center justify-center gap-6 font-mono text-muted-foreground text-xs">
            {post.publishedAt && (
              <time>
                {format(new Date(post.publishedAt as string), "MMMM d, yyyy")}
              </time>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                {(post.tags as BlogPostTag[]).map((t, i) => (
                  <span key={i}>{t.tag}</span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="border-border border-t pt-10">
          <div className="prose-custom">
            <MDXContent code={post?.body.code} components={components} />
          </div>
        </div>

        <div className="mt-16 border-border border-t pt-8">
          <Link
            className="inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
            href="/blog"
          >
            <ArrowLeft className="h-3 w-3" />
            All posts
          </Link>
        </div>
      </article>
    </main>
  );
}
