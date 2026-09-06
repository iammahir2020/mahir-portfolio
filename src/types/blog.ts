export interface BlogImage {
  url: string;
  caption?: string;
}

export interface BlogReference {
  label: string;
  url: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string; // Short summary for cards
  content: string; // Full blog content (supports paragraphs)
  coverImage?: string;
  images: BlogImage[];
  links: BlogReference[];
  references: BlogReference[];
  tags: string[];
  visibility: "public" | "private";
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type BlogFormData = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;
