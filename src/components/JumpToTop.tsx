import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const JumpToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress for the outer ring
  const scrollValue = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when user has scrolled 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed bottom-6 right-20 md:bottom-6 md:right-6 z-[100]"
        >
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-xl transition-all hover:border-blue-500"
          >
            {/* Circular Progress Path */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-blue-600 dark:text-blue-400 "
                style={{
                  pathLength: scrollValue,
                  opacity: scrollYProgress.get() > 0 ? 1 : 0
                }}
              />
            </svg>

            {/* Icon and Label */}
            <div className="flex flex-col items-center justify-center gap-0.5 mt-0.5">
              <ArrowUp 
                size={18} 
                className="text-blue-600 dark:text-blue-400  group-hover:text-blue-500 group-hover:-translate-y-1 transition-all duration-300" 
              />
              <span className="text-[7px] font-black font-mono uppercase tracking-tighter text-slate-400 dark:text-slate-500">
                TOP
              </span>
            </div>

            {/* Background Glow on Hover */}
            <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};