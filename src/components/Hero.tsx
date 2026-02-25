import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RESUME_DATA } from "../constants/resume";
import { ChevronDown, Download } from "lucide-react";
import { ResumeButton } from "./ResumeButton";

export const Hero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  /**
   * FIX: Starting Position Centering
   * By setting the first value of the output array to 0, 
   * the element starts exactly where flexbox places it (the center).
   */
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const ringY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-700"
    >
      {/* LAYER 1: Parallax Background Glows */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px]" />
      </motion.div>

      {/* LAYER 2: Decorative Floating Rings (Centered behind text) */}
      <motion.div
        style={{ y: ringY }}
        className="absolute z-5 opacity-20 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-blue-200 dark:border-blue-500/30 rounded-full flex items-center justify-center animate-[pulse_8s_infinite]">
          <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] border border-slate-200 dark:border-slate-700/50 rounded-full" />
        </div>
      </motion.div>

      {/* LAYER 3: Content Layer */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full flex flex-col items-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Status Badge */}
          <div className="gravity-item inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-blue-800 shadow-sm mb-6 md:mb-10">
            <span className="text-slate-600 dark:text-slate-300 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">
              Always open for New Experiences
            </span>
          </div>

          <h1 className="gravity-item text-5xl sm:text-7xl md:text-[9.5rem] font-black flex flex-row gap-2 justify-center tracking-tighter mb-6 md:mb-8 leading-[0.85] select-none">
            <span className="block text-slate-900 dark:text-white">
              {RESUME_DATA.name.split(' ')[0]}
            </span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              {RESUME_DATA.name.split(' ')[1]}
            </span>
            <span className="block text-slate-900 dark:text-white">
              {RESUME_DATA.name.split(' ')[2]}
            </span>
          </h1>

          <p className="text-base md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium dark:font-light">
            {RESUME_DATA.role} with <span className="text-slate-900 dark:text-white font-semibold">3+ years</span> of experience
            architecting <span className="text-blue-600 dark:text-blue-400 font-semibold">national-scale</span> digital infrastructure.
          </p>

          {/* --- Primary Action: Resume Button --- */}
<ResumeButton resumeLink={RESUME_DATA.resumeLink} />

{/* --- Secondary Hint: Scroll Indicator --- */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.5, duration: 1 }}
  className="mt-16 md:mt-24 flex flex-col items-center gap-3 opacity-40 hover:opacity-80 transition-opacity cursor-default"
>
  <span className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-500 dark:text-slate-400 ml-2">
    Scroll to Explore
  </span>
  <motion.div
    animate={{ y: [0, 6, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <ChevronDown size={20} className="text-blue-500 dark:text-blue-400" />
  </motion.div>
</motion.div>
        </motion.div>
      </motion.div>

      {/* Fine-tuned Grid Background (Only visible in Dark Mode for that "Developer" feel) */}
      <div className="absolute inset-0 z-[-1] opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
    </section>
  );
};