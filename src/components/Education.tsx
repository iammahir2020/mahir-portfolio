import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";
import { RESUME_DATA } from "../constants/resume";

export const Education = () => {
  return (
    <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-6 pb-4">
      {RESUME_DATA.education.map((edu, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="relative pl-8 group"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-950 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300" />

          {/* Compact Card */}
          <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 hover:border-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-md">
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <Calendar size={12} />
                  {edu.period}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {edu.degree}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  {edu.institution}
                </p>
              </div>

              {/* Minimalist GPA Badge */}
              <div className="shrink-0 px-3 py-1 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                 <span className="text-[10px] font-mono font-black text-blue-600 dark:text-blue-400">
                   GPA: {edu.cgpa}
                 </span>
              </div>
            </div>

            {/* Key Details - Tighter list */}
            {edu.keyDetails && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                {edu.keyDetails.map((detail, k) => (
                  <div key={k} className="flex items-center gap-2 group/item">
                    <CheckCircle2 size={12} className="text-emerald-500/60" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};