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

export interface PhotoMetadata {
  aperture?: string;
  camera?: string;
  dateTaken?: string;
  focalLength?: string;
  iso?: number;
  lens?: string;
  location?: string;
  shutterSpeed?: string;
}

export interface Photo {
  height: number;
  id: string;
  metadata: PhotoMetadata;
  uploadedAt: string;
  url: string;
  width: number;
}

export interface PhotoManifest {
  photos: Photo[];
}
