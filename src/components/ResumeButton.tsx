import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, CheckCircle2, FileJson, ArrowRight } from "lucide-react";

type ButtonStatus = "idle" | "fetching" | "success";

interface ResumeButtonProps {
  resumeLink: string;
}

export const ResumeButton: React.FC<ResumeButtonProps> = ({ resumeLink }) => {
  const [status, setStatus] = useState<ButtonStatus>("idle");
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleTrigger = (): void => {
    if (status !== "idle") return;

    setStatus("fetching");

    setTimeout(() => {
      setStatus("success");
      if (downloadRef.current) {
        downloadRef.current.click();
      }
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  return (
    <div className="mt-8 md:mt-12 flex flex-col items-center gap-4 w-full px-4">
      <a
        ref={downloadRef}
        href={resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
        aria-hidden="true"
      />

      <motion.button
        onClick={handleTrigger}
        disabled={status !== "idle"}
        /* FIX: Set a fixed width on desktop (md:w-[340px]) 
           to prevent layout jumping between states.
        */
        className="group relative w-full md:w-[340px] flex items-center justify-center gap-4 px-6 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl border border-slate-800 dark:border-slate-200 overflow-hidden touch-none select-none"
        whileTap={{ scale: 0.96 }}
      >
        {/* --- Animated Technical Border --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.rect
            rx="10"
            fill="none"
            className="w-full h-full stroke-blue-500 dark:stroke-blue-600 stroke-[3]"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: status === "idle" ? [0.15, 0.15] : 1,
              pathOffset: status === "idle" ? [0, 1] : 0,
              opacity: status === "idle" ? [0.3, 1, 0.3] : 0
            }}
            transition={{
              pathOffset: { duration: 3, repeat: Infinity, ease: "linear" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </svg>

        {/* --- UI Content (Centered Container) --- */}
        <div className="relative z-10 flex items-center justify-center font-mono text-xs md:text-sm w-full">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Terminal size={16} className="text-blue-500 shrink-0" />
                <div className="flex items-center">
                  <span className="text-blue-500 font-bold mr-1.5 whitespace-nowrap">curl -O</span>
                  <span className="font-medium tracking-tight whitespace-nowrap">
                    mahir_al_kamal.pdf
                  </span>
                </div>
                <ArrowRight 
                  size={14} 
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-500 shrink-0" 
                />
              </motion.div>
            )}

            {status === "fetching" && (
              <motion.div
                key="fetching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span className="font-bold tracking-widest uppercase animate-pulse">
                  Connecting...
                </span>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 text-emerald-500 font-bold"
              >
                <CheckCircle2 size={18} />
                <span className="uppercase tracking-widest">Done</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Background Micro-shimmer --- */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 dark:via-blue-400/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
      </motion.button>

      {/* --- Responsive Technical Footer --- */}
      <motion.div 
        className="flex items-center justify-between w-full max-w-[340px] md:max-w-none md:justify-center md:gap-6 text-[9px] font-mono text-slate-500 uppercase tracking-widest opacity-60"
      >
        <span className="flex items-center gap-1.5">
          <FileJson size={10} /> PDF 150KB
        </span>
        <span className="h-1 w-1 bg-slate-400 rounded-full hidden md:block" />
        <span>SHA-256: 8a3f...</span>
        <span className="h-1 w-1 bg-slate-400 rounded-full hidden md:block" />
        <span className="text-blue-500/80">Last Build: Today</span>
      </motion.div>
    </div>
  );
};