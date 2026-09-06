import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, ExternalLink, BookOpen, Eye, EyeOff } from "lucide-react";
import type { BlogPost } from "../../types/blog";

interface BlogDetailProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogDetail = ({ post, onClose }: BlogDetailProps) => {
  if (!post) return null;

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatePresence>
      {post && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/60 dark:bg-slate-950/80 backdrop-blur-md z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed inset-4 md:inset-x-[10%] md:inset-y-[5%] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] z-[110] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header with Cover */}
            <div className="relative">
              {post.coverImage && (
                <div className="w-full h-48 md:h-64 bg-slate-950 overflow-hidden">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full text-slate-500 hover:text-red-500 transition-colors border border-white/10 z-20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="max-w-3xl mx-auto px-6 md:px-12 py-8 md:py-12">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="flex items-center gap-1.5 text-blue-500 font-mono text-[10px] font-bold">
                    <Calendar size={12} />
                    {date}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold">
                    {post.visibility === "public" ? (
                      <><Eye size={10} className="text-emerald-500" /><span className="text-emerald-500">Public</span></>
                    ) : (
                      <><EyeOff size={10} className="text-amber-500" /><span className="text-amber-500">Private</span></>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-500/20 uppercase tracking-tighter font-bold">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                  {post.title}
                </h1>

                {/* Description */}
                {post.description && (
                  <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium italic">
                    {post.description}
                  </p>
                )}

                {/* Content Body */}
                <div className="prose-like space-y-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                  {post.content.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Inline Images */}
                {post.images.length > 0 && (
                  <div className="mt-10 space-y-6">
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">Images</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {post.images.map((img, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                          <img src={img.url} alt={img.caption || `Image ${i + 1}`} className="w-full h-auto object-cover" />
                          {img.caption && (
                            <p className="px-4 py-2 text-xs text-slate-500 font-mono bg-slate-50 dark:bg-slate-800/50">{img.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                {post.links.length > 0 && (
                  <div className="mt-10 space-y-4">
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">Links</h4>
                    <div className="flex flex-wrap gap-3">
                      {post.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                        >
                          <ExternalLink size={14} />
                          {link.label || link.url}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* References */}
                {post.references.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">References</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {post.references.map((ref, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-400">
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline inline-flex items-center gap-1"
                          >
                            <BookOpen size={12} />
                            {ref.label || ref.url}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
