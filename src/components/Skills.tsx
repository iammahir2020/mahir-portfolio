import { motion } from "motion/react";
import { RESUME_DATA } from "../constants/resume";

const allSkills = [
  ...RESUME_DATA.skills.frontend,
  ...RESUME_DATA.skills.stateManagement,
  ...RESUME_DATA.skills.tools,
  ...RESUME_DATA.skills.backend, // Included backend for a more complete marquee
];

export const Skills = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-100/50 dark:bg-slate-900/20 overflow-hidden border-y border-slate-200 dark:border-slate-900 transition-colors duration-500">
      <div className="flex whitespace-nowrap select-none">
        <motion.div 
          animate={{ x: [0, -1035] }} // Adjust based on content width for seamless loop
          transition={{ 
            duration: 30, // Slower for better readability
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-8 md:gap-16 items-center"
        >
          {/* Duplicate the array to create a seamless infinite loop */}
          {[...allSkills, ...allSkills, ...allSkills].map((skill, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16">
              <span 
                className="text-3xl md:text-7xl font-black 
                           text-slate-300 dark:text-slate-800 
                           hover:text-blue-500 dark:hover:text-blue-500/50 
                           transition-colors duration-300 cursor-default uppercase tracking-tighter"
              >
                {skill}
              </span>
              {/* Decorative separator */}
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500/30" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};