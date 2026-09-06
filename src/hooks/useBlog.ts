import { useState, useCallback, useEffect } from "react";
import type { BlogPost, BlogFormData } from "../types/blog";
import * as storage from "../services/blogStorage";

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refresh = useCallback(() => {
    setPosts(storage.getAllPosts());
    setIsAuthenticated(storage.isAdmin());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const publicPosts = posts.filter((p) => p.visibility === "public");
  const allPosts = posts; // includes private — only shown when admin

  const create = (data: BlogFormData) => {
    storage.createPost(data);
    refresh();
  };

  const update = (id: string, data: BlogFormData) => {
    storage.updatePost(id, data);
    refresh();
  };

  const remove = (id: string) => {
    storage.deletePost(id);
    refresh();
  };

  const toggleVis = (id: string) => {
    storage.toggleVisibility(id);
    refresh();
  };

  const login = (password: string): boolean => {
    const ok = storage.loginAdmin(password);
    if (ok) setIsAuthenticated(true);
    return ok;
  };

  const logout = () => {
    storage.logoutAdmin();
    setIsAuthenticated(false);
  };

  return {
    publicPosts,
    allPosts,
    isAuthenticated,
    create,
    update,
    remove,
    toggleVis,
    login,
    logout,
    refresh,
  };
}
