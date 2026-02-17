import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { RESUME_DATA } from "../constants/resume";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 px-4 md:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center 
                      backdrop-blur-xl md:backdrop-blur-md 
                      bg-white/70 dark:bg-slate-950/50 
                      border border-slate-200 dark:border-slate-800 
                      p-3 md:p-4 rounded-2xl shadow-lg shadow-slate-200/20 dark:shadow-none transition-colors duration-500">
        
        <span className="gravity-item font-bold tracking-tighter text-lg md:text-xl text-slate-900 dark:text-white">
          Mr Mahir<span className="text-blue-500">.</span>
        </span>

        <div className="gravity-item flex gap-4 md:gap-6 items-center text-slate-500 dark:text-slate-400">
          <a 
            href={`https://github.com/${RESUME_DATA.github}`} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} className="md:w-5 md:h-5 hover:text-blue-600 dark:hover:text-white transition-colors" />
          </a>
          
          <a 
            href={`https://linkedin.com/in/${RESUME_DATA.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} className="md:w-5 md:h-5 hover:text-blue-600 dark:hover:text-white transition-colors" />
          </a>
          
          <a 
            href={`mailto:${RESUME_DATA.email}`}
            aria-label="Email"
          >
            <Mail size={18} className="md:w-5 md:h-5 hover:text-blue-600 dark:hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};