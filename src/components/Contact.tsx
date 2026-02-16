import { motion } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import { RESUME_DATA } from "../constants/resume";

export const Contact = () => {
  return (
    <section className="py-20 md:py-32 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 md:px-6"
      >
        {/* Responsive Heading: Scaled for mobile (text-4xl) to desktop (text-7xl) */}
        <h2 className="gravity-item text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-slate-900 dark:text-white leading-[1.1]">
          Let's build the <span className="text-blue-500">future</span> together.
        </h2>
        
        <p className="gravity-item text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto px-4">
          Currently open for collaborations and high-impact engineering roles. 
          Drop a message and let's discuss your next project.
        </p>

        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${RESUME_DATA.email}`}
          className="gravity-item inline-flex items-center gap-3 px-8 py-4 
                     bg-slate-900 dark:bg-white 
                     text-white dark:text-black 
                     rounded-full font-bold text-lg 
                     hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white 
                     transition-all group shadow-2xl shadow-blue-500/20"
        >
          <Mail size={20} />
          <span>Get in Touch</span>
          <ArrowUpRight 
            size={20} 
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
          />
        </motion.a>

        {/* Social Link Quick Access for Mobile */}
        <div className="gravity-item mt-12 flex justify-center gap-6 text-slate-400">
           <a href={`https://github.com/${RESUME_DATA.github}`} className="hover:text-blue-500 transition-colors font-mono text-sm">GitHub</a>
           <a href={`https://linkedin.com/in/${RESUME_DATA.linkedin}`} className="hover:text-blue-500 transition-colors font-mono text-sm">LinkedIn</a>
        </div>
      </motion.div>
    </section>
  );
};