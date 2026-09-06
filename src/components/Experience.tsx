import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import type { ExperienceItem } from "../types";

export const ExperienceCard = ({ item, index = 0 }: { item: ExperienceItem; index?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. Main Card View */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        onClick={() => setIsOpen(true)}
        className="group relative cursor-pointer p-8 rounded-[2.5rem]
                   bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800
                   hover:border-blue-500/30 transition-all duration-500 shadow-xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
                Organization
              </span>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {item.company}
              </h3>
            </div>

            {/* Show only the latest role on the main card to keep it clean */}
            <div className="flex flex-col gap-3">
  {item.history.map((job, i) => (
    <div key={i} className="flex flex-wrap items-center gap-3">
      {/* Role Pill */}
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
        ${job.keyRole
          ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
          : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'
        }`}
      >
        {job.role}
      </span>

      {/* Date/Period Badge */}
      <div className="flex items-center gap-1.5 text-blue-600/70 dark:text-blue-400/70 font-mono text-[10px] font-bold">
        <Calendar size={12} className="opacity-70" />
        {job.period}
      </div>
    </div>
  ))}
</div>
          </div>

          <button className="flex items-center gap-2 text-blue-500 font-mono text-xs font-bold group-hover:gap-4 transition-all">
            VIEW DETAILS <ChevronRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* 2. Detailed Modal View */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-4 md:inset-x-[15%] md:inset-y-[10%] lg:inset-x-[25%]
                         bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800
                         rounded-[3rem] z-[110] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-12 border-b border-slate-100 dark:border-slate-900 flex justify-between items-start">
                <div className="space-y-2">

                  <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                    {item.company}
                  </h3>
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 text-xs"><MapPin size={14}/> {item.location}</div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <X size={24} className="text-slate-500 hover:text-red-500" />
                </button>
              </div>

              {/* Modal Content - Scrollable History */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="space-y-16">
                  {item.history.map((job, idx) => (
                    <div key={idx} className="relative pl-8 border-l-2 border-blue-500/20">
                      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{job.role}</h4>
                        <div className="flex items-center gap-2 text-blue-500 font-mono text-sm font-bold bg-blue-500/5 px-3 py-1 rounded-lg">
                          <Calendar size={14} /> {job.period}
                        </div>
                      </div>

                      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="space-y-4">
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">Main Responsibilities</span>
                        <div className="grid grid-cols-1 gap-4">
                          {job.responsibilities.map((resp, k) => (
                            <div key={k} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
                              <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                              <span className="text-slate-600 dark:text-slate-300 text-sm md:text-base">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {job.subProjects && job.subProjects.length > 0 && (
                        <div className="mt-10 space-y-8">
                          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">Key Engagements</span>
                          {job.subProjects.map((sp, spIdx) => (
                            <div key={spIdx} className="pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                              <h5 className="text-lg font-bold text-slate-900 dark:text-white">
                                {sp.name}
                                {sp.subtitle && (
                                  <span className="ml-2 text-xs font-normal italic text-slate-400">{sp.subtitle}</span>
                                )}
                              </h5>
                              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-relaxed">{sp.description}</p>
                              <div className="grid grid-cols-1 gap-3">
                                {sp.bullets.map((b, bIdx) => (
                                  <div key={bIdx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
                                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-600 dark:text-slate-300 text-sm">{b}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
