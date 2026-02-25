import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, X, CheckCircle2, Terminal, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "../types";

export const ProjectGallery = ({ projects }: { projects: Project[] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset image index when modal closes or project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProject]);

  const handleNext = () => {
    if (!selectedProject?.gallaryImages) return;
    const count = selectedProject.gallaryImages.length
    setActiveImageIndex((prev) => (prev + 1) % count);
  };

  const handlePrev = () => {
    if (!selectedProject?.gallaryImages) return;
    const count = selectedProject.gallaryImages.length
    setActiveImageIndex((prev) => (prev - 1 + count) % count);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* --- GRID VIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.title}`}
            key={project.title}
            onClick={() => setSelectedProject(project)}
            className="gravity-item group cursor-pointer bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
              <motion.img 
                layoutId={`image-${project.title}`}
                src={project.coverImage} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 dark:opacity-60 group-hover:opacity-100"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-slate-950 dark:via-transparent dark:to-transparent" /> */}
            </div>

            <div className="p-8">
              <div className="flex gap-2 mb-4 flex-wrap">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-500/20 uppercase tracking-tighter font-bold">{t}</span>
                ))}
              </div>
              <motion.h3 layoutId={`title-${project.title}`} className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                {project.title}
              </motion.h3>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-white/60 dark:bg-slate-950/80 backdrop-blur-md z-[100]"
            />

            <motion.div
              layoutId={`card-${selectedProject.title}`}
              className="fixed inset-4 md:inset-x-[5%] md:inset-y-[5%] lg:inset-x-[10%] 
                         bg-white dark:bg-slate-900 
                         border border-slate-200 dark:border-slate-800 
                         rounded-[2.5rem] z-[110] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* --- IMAGE GALLERY SECTION --- */}
              <div className="w-full lg:w-[55%] h-[40vh] lg:h-auto bg-slate-950 relative group/gallery flex flex-col">
                <div className="relative flex-1 overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      src={selectedProject.gallaryImages?.[activeImageIndex] || selectedProject.coverImage}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {selectedProject.gallaryImages && selectedProject.gallaryImages.length > 1 && (
                    <>
                      <button onClick={handlePrev} className="absolute left-4 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10 opacity-0 group-hover/gallery:opacity-100">
                        <ChevronLeft size={24} />
                      </button>
                      <button onClick={handleNext} className="absolute right-4 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10 opacity-0 group-hover/gallery:opacity-100">
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails Track */}
                {selectedProject.gallaryImages && selectedProject.gallaryImages.length > 1 && (
                  <div className="h-20 bg-slate-900/50 backdrop-blur-xl border-t border-white/5 p-2 flex gap-2 overflow-x-auto no-scrollbar justify-center">
                    {selectedProject.gallaryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-full aspect-video rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          activeImageIndex === idx ? "border-blue-500 scale-95" : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 left-4 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:text-red-400 transition-colors border border-white/10 z-20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* --- TEXT CONTENT SECTION --- */}
              <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
                <div className="flex flex-col gap-4 mb-6">
                  <motion.h3 layoutId={`title-${selectedProject.title}`} className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                    {selectedProject.title}
                  </motion.h3>
                  
                  <div className="flex gap-4 items-center flex-wrap">
                    {selectedProject.githubFrontendRepo && (
                      <a href={selectedProject.githubFrontendRepo} target="_blank" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
                        <Github size={18} />
                        <span className="text-[10px] font-mono font-bold uppercase">Frontend</span>
                      </a>
                    )}
                    {selectedProject.githubBackendRepo && (
                      <a href={selectedProject.githubBackendRepo} target="_blank" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors">
                        <Terminal size={16} />
                        <span className="text-[10px] font-mono font-bold uppercase">Backend</span>
                      </a>
                    )}
                    {selectedProject.liveSite && (
                      <a href={selectedProject.liveSite} target="_blank" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                        <ExternalLink size={18} />
                        <span className="text-[10px] font-mono uppercase">Launch Live</span>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mb-8 leading-relaxed font-medium">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="space-y-6 mb-8">
                   <h4 className="text-blue-600 dark:text-blue-400 font-mono text-xs uppercase tracking-[0.3em] font-black">Technical Features</h4>
                   <div className="grid grid-cols-1 gap-4">
                      {(selectedProject.features || []).map((f) => (
                        <div key={f} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm">
                          <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                          {f}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-[10px] font-mono font-bold uppercase border border-slate-200 dark:border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};