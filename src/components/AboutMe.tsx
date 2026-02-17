import { motion } from "framer-motion";
import { RESUME_DATA } from "../constants/resume";

export const AboutMe = () => {
  return (
    <section id="about" className="scroll-mt-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 1. Main Biography Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-8 p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group"
        >
          {/* Decorative Background Icon */}
          
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                The Professional Brief
              </h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
              {RESUME_DATA.aboutMe}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Experience</span>
                  <span className="text-lg font-bold text-blue-500">3+ Years</span>
               </div>
               <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">User Base</span>
                  <span className="text-lg font-bold text-blue-500">119M+ Serviced</span>
               </div>
               <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Focus</span>
                  <span className="text-lg font-bold text-blue-500">React Architecture</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Side Feature Cards */}
        <div className="md:col-span-4 grid grid-cols-1 gap-6">
          
          {/* Specialist Highlight */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group p-6 rounded-[2rem] bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors flex flex-col justify-center"
          >
            
            <h4 className="font-bold text-lg text-white mb-2">Modernization Expert</h4>
            <p className="text-slate-400 text-sm leading-snug">
              Architecting the migration of legacy <span className="text-slate-200">Jinja/jQuery</span> stacks into modern <span className="text-slate-200">React ecosystems</span>.
            </p>
          </motion.div>

          {/* Academic Highlight */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group p-6 rounded-[2rem] bg-blue-600 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors flex flex-col justify-center"
          >
            <h4 className="font-bold text-lg text-white mb-1">Adjunct Faculty</h4>
            <p className="text-blue-100 text-sm leading-snug">
              Mentoring students in Data Structures, Algorithms, and Python at <span className="text-white font-medium">Independent University Bangladesh</span>.
            </p>
          </motion.div>

        </div>

        {/* 3. Bottom Marquee/Focus Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-12 p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Current Tech Focus:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['Enterprise ERP', 'B2B Analytics', 'Real-time Systems', 'UI Optimization'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};