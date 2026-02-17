import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { RESUME_DATA } from "../constants/resume";

export const Contact = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Side: Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <MessageSquare size={14} className="text-blue-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Availability: Open for roles
            </span>
          </div> */}

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
            Let's build the <span className="text-blue-500">future</span> together.
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl">
            Currently looking for high-impact engineering roles. 
            Drop a message and let's discuss how I can contribute to your team.
          </p>

          {/* Minimalist Social Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
            <a href={`https://github.com/${RESUME_DATA.github}`} className="group flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
              <Github size={18} />
              <span className="text-xs font-mono">GitHub</span>
            </a>
            <a href={`https://linkedin.com/in/${RESUME_DATA.linkedin}`} className="group flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
              <Linkedin size={18} />
              <span className="text-xs font-mono">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="shrink-0 w-full md:w-auto">
          <motion.a 
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            href={`mailto:${RESUME_DATA.email}`}
            className="flex items-center justify-center gap-3 px-10 py-6 
                       bg-blue-600 hover:bg-blue-700
                       text-white rounded-2xl font-bold text-lg 
                       transition-all shadow-2xl shadow-blue-500/20 w-full md:w-auto"
          >
            <Mail size={22} />
            <span>Send Email</span>
            <ArrowUpRight 
              size={20} 
              className="opacity-50 group-hover:opacity-100 transition-opacity" 
            />
          </motion.a>
        </div>

      </div>
    </div>
  );
};