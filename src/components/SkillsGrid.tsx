import { motion } from "motion/react";
import { RESUME_DATA } from "../constants/resume";
import { 
  Database, 
  Layout, 
  Wrench, 
  Layers, 
  Zap,
  ShieldCheck
} from "lucide-react";

export const SkillsGrid = () => {
  const categories = [
    { 
      title: "Frontend Core", 
      skills: RESUME_DATA.skills.frontend, 
      icon: <Layout className="text-blue-500 dark:text-blue-400" size={22} />,
      color: "from-blue-500/5 dark:from-blue-500/10",
      description: "Type-safe interfaces & migration"
    },
    { 
      title: "State & Logic", 
      skills: RESUME_DATA.skills.stateManagement, 
      icon: <Layers className="text-emerald-500 dark:text-emerald-400" size={22} />,
      color: "from-emerald-500/5 dark:from-emerald-500/10",
      description: "Data flow & real-time sync"
    },
    { 
      title: "Backend & DB", 
      skills: RESUME_DATA.skills.backend, 
      icon: <Database className="text-purple-500 dark:text-purple-400" size={22} />,
      color: "from-purple-500/5 dark:from-purple-500/10",
      description: "Server architecture & SQL/NoSQL"
    },
    { 
      title: "Tools & DevOps", 
      skills: RESUME_DATA.skills.tools, 
      icon: <Wrench className="text-orange-500 dark:text-orange-400" size={22} />,
      color: "from-orange-500/5 dark:from-orange-500/10",
      description: "Cloud, CI/CD & Analytics"
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="gravity-item group relative p-6 md:p-8 rounded-3xl 
                       bg-white dark:bg-slate-900/40 
                       border border-slate-200 dark:border-slate-800/50 
                       shadow-xl shadow-slate-200/40 dark:shadow-none 
                       backdrop-blur-sm overflow-hidden transition-all duration-300"
          >
            {/* Adaptive Hover Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 shadow-inner group-hover:border-blue-500/30 transition-colors">
                  {cat.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Expertise</span>
                  <div className="h-[2px] w-8 bg-blue-500/40 mt-1 group-hover:w-12 transition-all duration-300" />
                </div>
              </div>

              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{cat.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">{cat.description}</p>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <div 
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1.5 
                               bg-slate-50 dark:bg-slate-950/80 
                               text-slate-700 dark:text-slate-300 
                               rounded-xl text-xs font-semibold dark:font-medium 
                               border border-slate-200 dark:border-slate-800 
                               group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all"
                  >
                    <Zap size={10} className="text-blue-500 dark:text-blue-400" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Modernization Card (Centered Full Width) */}
        <motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.4 }}
  className="md:col-span-2 relative group p-6 md:p-8 rounded-3xl 
             /* 1. Background Logic Fix */
             bg-blue-50/50 dark:bg-gradient-to-r dark:from-slate-900/60 dark:to-blue-900/10 
             /* 2. Border Logic Fix */
             border border-blue-100 dark:border-slate-800/50 
             /* 3. Shadow & Effects */
             shadow-xl shadow-blue-900/5 dark:shadow-none backdrop-blur-sm 
             transition-all duration-300 overflow-hidden"
>
  {/* Hover Glow for Light Mode */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
    <div className="flex items-center gap-5">
      <div className="p-3 rounded-2xl bg-white dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 shadow-sm">
        <ShieldCheck className="text-blue-600 dark:text-blue-400" size={24} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Enterprise System Modernization</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm">Specialized in migrating jQuery/Jinja legacy stacks into modern React ecosystems.</p>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-2 md:gap-3">
       <span className="px-3 md:px-4 py-2 bg-white dark:bg-slate-950/50 rounded-full text-[10px] md:text-xs font-mono text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-800 font-bold shadow-sm">
         Jinja → React
       </span>
       <span className="px-3 md:px-4 py-2 bg-white dark:bg-slate-950/50 rounded-full text-[10px] md:text-xs font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-slate-800 font-bold shadow-sm">
         jQuery → TS
       </span>
    </div>
  </div>
</motion.div>
      </div>
    </div>
  );
};