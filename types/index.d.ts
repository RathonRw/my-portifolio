export interface Project {
  description: string;
  fullDescription: string;
  icon: LucideIcon;
  image?: string;
  links: {
    github?: string;
    demo?: string;
  };
  stats?: {
    stars: string;
    forks: string;
  } | null;
  subtitle: string;
  title: string;
}

export interface PayloadBlogPost {
  excerpt: string;
  id: string;
  publishedAt: string;
  slug: string;
  tags?: { tag: string }[];
  title: string;
}
