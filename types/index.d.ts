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
