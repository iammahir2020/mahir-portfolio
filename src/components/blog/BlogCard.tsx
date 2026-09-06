import { motion } from "motion/react";
import { Calendar, Eye, EyeOff, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import type { BlogPost } from "../../types/blog";

interface BlogCardProps {
  post: BlogPost;
  isAdmin: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleVisibility?: () => void;
}

export const BlogCard = ({ post, isAdmin, onClick, onEdit, onDelete, onToggleVisibility }: BlogCardProps) => {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none"
    >
      {/* Cover Image */}
      {post.coverImage && (
        <div onClick={onClick} className="aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 dark:opacity-60 group-hover:opacity-100"
          />
          {post.visibility === "private" && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-amber-500/90 text-white rounded-full text-[9px] font-bold font-mono">
              <EyeOff size={10} /> Private
            </div>
          )}
        </div>
      )}

      <div className="p-6 md:p-8" onClick={onClick}>
        {/* Tags */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-500/20 uppercase tracking-tighter font-bold"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-2 text-slate-900 dark:text-white leading-tight">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed mb-4">{post.description}</p>

        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono">
          <Calendar size={10} />
          <span>{date}</span>
          {post.visibility === "public" ? (
            <Eye size={10} className="ml-2 text-emerald-500" />
          ) : (
            <EyeOff size={10} className="ml-2 text-amber-500" />
          )}
        </div>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="px-6 md:px-8 pb-6 flex gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500 text-[10px] font-mono font-bold transition-colors"
          >
            <Pencil size={10} /> Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleVisibility?.(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-amber-500 text-[10px] font-mono font-bold transition-colors"
          >
            {post.visibility === "public" ? <ToggleRight size={10} /> : <ToggleLeft size={10} />}
            {post.visibility === "public" ? "Make Private" : "Make Public"}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:text-red-600 text-[10px] font-mono font-bold transition-colors ml-auto"
          >
            <Trash2 size={10} /> Delete
          </button>
        </div>
      )}
    </motion.div>
  );
};
