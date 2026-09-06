import type { BlogPost, BlogFormData } from "../types/blog";

const STORAGE_KEY = "mahir_blog_posts";
const ADMIN_KEY = "mahir_blog_admin";
// Change this to your own secret phrase
const ADMIN_PASSWORD = "iamadmin";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function getAllPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const posts: BlogPost[] = JSON.parse(raw);
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch {
    return [];
  }
}

export function getPostById(id: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.id === id);
}

export function createPost(data: BlogFormData): BlogPost {
  const now = new Date().toISOString();
  const post: BlogPost = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  const posts = getAllPosts();
  posts.unshift(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return post;
}

export function updatePost(id: string, data: BlogFormData): BlogPost | null {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated: BlogPost = {
    ...posts[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  posts[idx] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updated;
}

export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function toggleVisibility(id: string): BlogPost | null {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx].visibility = posts[idx].visibility === "public" ? "private" : "public";
  posts[idx].updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return posts[idx];
}

export function isAdmin(): boolean {
  return localStorage.getItem(ADMIN_KEY) === "true";
}

export function loginAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_KEY);
}
