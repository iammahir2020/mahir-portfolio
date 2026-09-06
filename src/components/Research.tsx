import { motion } from "motion/react";
import { FlaskConical } from "lucide-react";
import { RESUME_DATA } from "../constants/resume";

export const Research = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {RESUME_DATA.research.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="p-8 rounded-[2rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical size={14} className="text-blue-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-500">
              {item.status}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
            {item.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
