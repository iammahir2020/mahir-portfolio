import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { useBlog } from "../../hooks/useBlog";
import { AdminGate } from "./AdminGate";
import { BlogCard } from "./BlogCard";
import { BlogDetail } from "./BlogDetail";
import { BlogEditor } from "./BlogEditor";
import type { BlogPost, BlogFormData } from "../../types/blog";

export const BlogSection = () => {
  const { publicPosts, allPosts, isAuthenticated, create, update, remove, toggleVis, login, logout } = useBlog();

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const visiblePosts = isAuthenticated ? allPosts : publicPosts;

  const handleSave = (data: BlogFormData) => {
    if (editingPost) {
      update(editingPost.id, data);
    } else {
      create(data);
    }
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      remove(id);
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileText size={16} className="text-slate-400" />
          <span className="text-xs font-mono text-slate-500">
            {visiblePosts.length} {visiblePosts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <AdminGate isAuthenticated={isAuthenticated} onLogin={login} onLogout={logout} />
          {isAuthenticated && (
            <button
              onClick={handleNewPost}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              <Plus size={14} />
              New Post
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {visiblePosts.length === 0 ? (
        <div className="text-center py-20">
          <FileText size={48} className="text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 font-mono text-sm">No blog posts yet.</p>
          {isAuthenticated && (
            <button onClick={handleNewPost} className="mt-4 text-blue-500 text-sm font-bold hover:underline">
              Write your first post →
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visiblePosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              isAdmin={isAuthenticated}
              onClick={() => setSelectedPost(post)}
              onEdit={() => handleEdit(post)}
              onDelete={() => handleDelete(post.id)}
              onToggleVisibility={() => toggleVis(post.id)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <BlogDetail post={selectedPost} onClose={() => setSelectedPost(null)} />

      {/* Editor Modal */}
      <BlogEditor
        isOpen={isEditorOpen}
        onClose={() => { setIsEditorOpen(false); setEditingPost(null); }}
        onSave={handleSave}
        editingPost={editingPost}
      />
    </div>
  );
};
