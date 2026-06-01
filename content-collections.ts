// contentlayer.config.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.string(),
    published: z.boolean().default(true),
    image: z.string(),
    tags: z.array(z.string()).optional(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {});
    return {
      ...document,
      slug: `${document._meta.path}`,
      slugAsParams: document._meta.path,
      body: {
        raw: document.content,
        code: body,
      },
    };
  },
});

export default defineConfig({
  content: [posts],
});
