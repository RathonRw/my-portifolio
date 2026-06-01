import { allPosts } from "content-collections";
import { BlogSection } from "./blog-section";

export function LatestPosts() {
  const latestPosts = [...allPosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 2);

  return <BlogSection posts={latestPosts} />;
}
