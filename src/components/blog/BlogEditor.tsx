import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Trash2, Save, Image, Link, BookOpen, Eye, EyeOff } from "lucide-react";
import type { BlogPost, BlogFormData, BlogImage, BlogReference } from "../../types/blog";

interface BlogEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BlogFormData) => void;
  editingPost?: BlogPost | null;
}

const emptyForm: BlogFormData = {
  title: "",
  description: "",
  content: "",
  coverImage: "",
  images: [],
  links: [],
  references: [],
  tags: [],
  visibility: "private",
};

export const BlogEditor = ({ isOpen, onClose, onSave, editingPost }: BlogEditorProps) => {
  const [form, setForm] = useState<BlogFormData>(emptyForm);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (editingPost) {
      setForm({
        title: editingPost.title,
        description: editingPost.description,
        content: editingPost.content,
        coverImage: editingPost.coverImage || "",
        images: editingPost.images,
        links: editingPost.links,
        references: editingPost.references,
        tags: editingPost.tags,
        visibility: editingPost.visibility,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingPost, isOpen]);

  const updateField = <K extends keyof BlogFormData>(key: K, value: BlogFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addImage = () => {
    updateField("images", [...form.images, { url: "", caption: "" }]);
  };

  const updateImage = (idx: number, field: keyof BlogImage, value: string) => {
    const updated = [...form.images];
    updated[idx] = { ...updated[idx], [field]: value };
    updateField("images", updated);
  };

  const removeImage = (idx: number) => {
    updateField("images", form.images.filter((_, i) => i !== idx));
  };

  const addLink = () => {
    updateField("links", [...form.links, { label: "", url: "" }]);
  };

  const updateLink = (idx: number, field: keyof BlogReference, value: string) => {
    const updated = [...form.links];
    updated[idx] = { ...updated[idx], [field]: value };
    updateField("links", updated);
  };

  const removeLink = (idx: number) => {
    updateField("links", form.links.filter((_, i) => i !== idx));
  };

  const addReference = () => {
    updateField("references", [...form.references, { label: "", url: "" }]);
  };

  const updateReference = (idx: number, field: keyof BlogReference, value: string) => {
    const updated = [...form.references];
    updated[idx] = { ...updated[idx], [field]: value };
    updateField("references", updated);
  };

  const removeReference = (idx: number) => {
    updateField("references", form.references.filter((_, i) => i !== idx));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      updateField("tags", [...form.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    updateField("tags", form.tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    onSave(form);
    setForm(emptyForm);
    onClose();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors font-mono";
  const labelClass = "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5 block";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-4 md:inset-x-[10%] md:inset-y-[5%] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl z-[210] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-blue-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingPost ? "Edit Post" : "New Blog Post"}
                </h3>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
              {/* Title */}
              <div>
                <label className={labelClass}>Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Blog post title..."
                  className={inputClass}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Short Description</label>
                <input
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Brief summary for the card view..."
                  className={inputClass}
                />
              </div>

              {/* Cover Image URL */}
              <div>
                <label className={labelClass}>Cover Image URL</label>
                <input
                  value={form.coverImage}
                  onChange={(e) => updateField("coverImage", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                />
              </div>

              {/* Content */}
              <div>
                <label className={labelClass}>Content *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  placeholder="Write your blog content here... (Use double newlines for paragraphs)"
                  rows={12}
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className={labelClass}>Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md text-[10px] font-mono font-bold border border-blue-100 dark:border-blue-500/20"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}><X size={8} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                    placeholder="Add a tag..."
                    className={`${inputClass} flex-1`}
                  />
                  <button type="button" onClick={addTag} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={labelClass}>Images</label>
                  <button type="button" onClick={addImage} className="flex items-center gap-1 text-[10px] font-mono font-bold text-blue-500 hover:text-blue-400">
                    <Plus size={10} /> Add Image
                  </button>
                </div>
                <div className="space-y-3">
                  {form.images.map((img, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <Image size={14} className="text-slate-400 mt-3 shrink-0" />
                      <div className="flex-1 flex flex-col sm:flex-row gap-2">
                        <input value={img.url} onChange={(e) => updateImage(i, "url", e.target.value)} placeholder="Image URL" className={`${inputClass} flex-1`} />
                        <input value={img.caption || ""} onChange={(e) => updateImage(i, "caption", e.target.value)} placeholder="Caption (optional)" className={`${inputClass} flex-1`} />
                      </div>
                      <button type="button" onClick={() => removeImage(i)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg mt-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={labelClass}>Links</label>
                  <button type="button" onClick={addLink} className="flex items-center gap-1 text-[10px] font-mono font-bold text-blue-500 hover:text-blue-400">
                    <Plus size={10} /> Add Link
                  </button>
                </div>
                <div className="space-y-3">
                  {form.links.map((link, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <Link size={14} className="text-slate-400 mt-3 shrink-0" />
                      <div className="flex-1 flex flex-col sm:flex-row gap-2">
                        <input value={link.label} onChange={(e) => updateLink(i, "label", e.target.value)} placeholder="Label" className={`${inputClass} flex-1`} />
                        <input value={link.url} onChange={(e) => updateLink(i, "url", e.target.value)} placeholder="URL" className={`${inputClass} flex-1`} />
                      </div>
                      <button type="button" onClick={() => removeLink(i)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg mt-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* References */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={labelClass}>References</label>
                  <button type="button" onClick={addReference} className="flex items-center gap-1 text-[10px] font-mono font-bold text-blue-500 hover:text-blue-400">
                    <Plus size={10} /> Add Reference
                  </button>
                </div>
                <div className="space-y-3">
                  {form.references.map((ref, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <BookOpen size={14} className="text-slate-400 mt-3 shrink-0" />
                      <div className="flex-1 flex flex-col sm:flex-row gap-2">
                        <input value={ref.label} onChange={(e) => updateReference(i, "label", e.target.value)} placeholder="Reference title" className={`${inputClass} flex-1`} />
                        <input value={ref.url} onChange={(e) => updateReference(i, "url", e.target.value)} placeholder="URL" className={`${inputClass} flex-1`} />
                      </div>
                      <button type="button" onClick={() => removeReference(i)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg mt-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  {form.visibility === "public" ? (
                    <Eye size={16} className="text-emerald-500" />
                  ) : (
                    <EyeOff size={16} className="text-amber-500" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {form.visibility === "public" ? "Public" : "Private"}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {form.visibility === "public" ? "Visible to everyone" : "Only visible to you"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => updateField("visibility", form.visibility === "public" ? "private" : "public")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    form.visibility === "public" ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    form.visibility === "public" ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
              >
                <Save size={16} />
                {editingPost ? "Update Post" : "Publish"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
