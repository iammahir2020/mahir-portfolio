import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, X, CheckCircle2, Terminal } from "lucide-react";
import type { Project } from "../types";

export const ProjectGallery = ({ projects }: { projects: Project[] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.title}`}
            key={project.title}
            onClick={() => setSelectedProject(project)}
            className="gravity-item group cursor-pointer bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            {/* Image Preview Container */}
            <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
              <motion.img 
                layoutId={`image-${project.title}`}
                src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 dark:opacity-60 group-hover:opacity-100"
              />
              {/* Gradient overlay adjusts based on mode */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-slate-950 dark:via-transparent dark:to-transparent" />
            </div>

            <div className="p-8">
              <div className="flex gap-2 mb-4 flex-wrap">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-500/20 uppercase tracking-tighter font-bold">
                    {t}
                  </span>
                ))}
              </div>
              <motion.h3 layoutId={`title-${project.title}`} className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                {project.title}
              </motion.h3>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop: Adaptive blur and opacity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-white/60 dark:bg-slate-950/80 backdrop-blur-md z-[100]"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`card-${selectedProject.title}`}
              className="fixed inset-4 md:inset-x-[10%] md:inset-y-[10%] lg:inset-x-[15%] 
                         bg-white dark:bg-slate-900 
                         border border-slate-200 dark:border-slate-800 
                         rounded-[2.5rem] z-[110] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-48 md:h-auto bg-slate-100 dark:bg-slate-800 relative">
                <motion.img
                  layoutId={`image-${selectedProject.title}`}
                  src={selectedProject.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 left-4 md:top-6 md:left-6 p-3 bg-white/90 dark:bg-slate-950/50 backdrop-blur-md rounded-full text-slate-900 dark:text-white hover:text-red-500 transition-colors border border-slate-200 dark:border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
                <div className="flex flex-col gap-4 mb-6">
                  <motion.h3 layoutId={`title-${selectedProject.title}`} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedProject.title}
                  </motion.h3>
                  
                  <div className="flex gap-4 items-center">
                    {selectedProject.githubFrontendRepo && (
                      <a href={selectedProject.githubFrontendRepo} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Github size={20} />
                        <span className="text-[10px] font-mono font-bold uppercase">Client</span>
                      </a>
                    )}
                    {selectedProject.githubBackendRepo && (
                      <a href={selectedProject.githubBackendRepo} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        <Terminal size={18} />
                        <span className="text-[10px] font-mono font-bold uppercase">Server</span>
                      </a>
                    )}
                    {selectedProject.liveSite && (
                      <a href={selectedProject.liveSite} className="flex items-center gap-2 text-slate-900 dark:text-slate-300 hover:text-blue-500 transition-colors">
                        <ExternalLink size={20} />
                        <span className="text-[10px] font-mono font-bold uppercase">Live Site</span>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="space-y-4 mb-8">
                   <h4 className="text-blue-600 dark:text-blue-400 font-mono text-xs uppercase tracking-widest font-bold">Key Features</h4>
                   <div className="grid grid-cols-1 gap-3">
                      {(selectedProject.features || []).map((f) => (
                        <div key={f} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                          {f}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-4">Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-300 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-slate-700">
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