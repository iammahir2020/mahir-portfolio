import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import type { ExperienceItem } from "../types";
import { useParallax } from "../hooks/useParallax";

export const Experience = ({ company, role, period, description }: ExperienceItem) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Reduced parallax for mobile to prevent layout jumps
  const y = useParallax(scrollYProgress, 30);

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="gravity-item relative pl-8 md:pl-12 pb-12 md:pb-16 last:pb-0 border-l-2 border-slate-200 dark:border-slate-800/50"
    >
      {/* Timeline Indicator: Adaptive background and border */}
      <div className="absolute -left-[11px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-50 dark:bg-slate-950 border-2 border-blue-500 z-10 shadow-sm dark:shadow-none">
        <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
      </div>

      {/* Card Container: Adaptive bg, border, and shadows */}
      <div className="group relative p-6 md:p-8 rounded-3xl 
                      bg-white dark:bg-slate-900/40 
                      border border-slate-200 dark:border-slate-800 
                      hover:border-blue-500/30 dark:hover:border-blue-500/30 
                      transition-all duration-500 backdrop-blur-sm overflow-hidden 
                      shadow-xl shadow-slate-200/50 dark:shadow-none">
        
        {/* Subtle hover gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {role}
                </h3>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium text-base md:text-lg">
                  <Briefcase size={18} className="text-blue-600 dark:text-blue-500" />
                  <span>{company}</span>
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2">
                <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full 
                                bg-slate-100 dark:bg-slate-800/50 
                                border border-slate-200 dark:border-slate-700 
                                text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-mono tracking-wider">
                  <Calendar size={14} />
                  {period}
                </div>
                <div className="hidden md:flex items-center gap-1.5 text-slate-500 dark:text-slate-500 text-xs font-medium">
                  <MapPin size={12} />
                  Dhaka, Bangladesh
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg max-w-4xl font-normal dark:font-light">
              {description}
            </p>
            
            {/* Impact Area Badge */}
            <div className="pt-4 flex items-center gap-3">
              <div className="h-[1px] w-8 bg-blue-500/50" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 font-bold">
                Impact Area
              </span>
              <span className="text-xs md:text-sm text-slate-500 dark:text-slate-300 italic">
                {company.includes("Penta") 
                  ? "Scalable B2B Roaming Analytics & Infrastructure" 
                  : "End-to-end System Engineering"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};