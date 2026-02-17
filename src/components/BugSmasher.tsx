import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bug, Target } from 'lucide-react';

// Use a simple Error Boundary wrapper if you want to be extra safe
export const BugSmasher = () => {
  const [bugs, setBugs] = useState<{ id: string; startX: number; startY: number; pathX: number[]; pathY: number[] }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure we only run on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const spawnBug = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    setBugs(prev => {
      if (prev.length >= 12) return prev; // Lowered limit for stability
      
      const id = Math.random().toString(36).substr(2, 9); // More robust ID
      const startX = Math.random() * (window.innerWidth - 60);
      const startY = Math.random() * (window.innerHeight - 60);
      
      const pathX = Array.from({ length: 4 }, () => Math.random() * (window.innerWidth - 60));
      const pathY = Array.from({ length: 4 }, () => Math.random() * (window.innerHeight - 60));

      return [...prev, { id, startX, startY, pathX, pathY }];
    });
  }, []);

  useEffect(() => {
    if (!isGameActive || !mounted) {
      setBugs([]);
      return;
    }
    
    // Initial spawn
    const timeout = setTimeout(() => {
        spawnBug();
        spawnBug();
    }, 500);

    const interval = setInterval(spawnBug, 6000); 
    return () => {
        clearInterval(interval);
        clearTimeout(timeout);
    };
  }, [isGameActive, mounted, spawnBug]);

  const killBug = (id: string) => {
    setBugs(prev => prev.filter(bug => bug.id !== id));
    setScore(s => s + 1);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[101]">
        <button 
          onClick={() => setIsGameActive(!isGameActive)}
          className={`p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 shadow-2xl flex items-center gap-3
            ${isGameActive 
              ? "bg-red-500/10 border-red-500/50 text-red-500" 
              : "bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-500"
            }`}
        >
          {isGameActive ? <Bug size={20} className="animate-pulse" /> : <Target size={20} />}
          <span className="text-xs font-black font-mono tracking-tighter uppercase">
            {isGameActive ? `Bugs: ${score}` : "Debug"}
          </span>
        </button>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
        <AnimatePresence mode="popLayout">
          {isGameActive && bugs.map((bug) => (
            <motion.div
              key={bug.id} // This key must be unique and persistent
              initial={{ x: bug.startX, y: bug.startY, opacity: 0, scale: 0 }}
              animate={{ 
                x: [bug.startX, ...bug.pathX],
                y: [bug.startY, ...bug.pathY],
                rotate: [0, 90, 180, 270, 360],
                opacity: 1,
                scale: 1,
              }}
              transition={{ 
                duration: 45, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "linear" 
              }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              className="absolute pointer-events-auto cursor-crosshair p-4 group"
              onPointerDown={() => killBug(bug.id)}
            >
              <Bug 
                size={24} 
                className="text-slate-600/40 dark:text-slate-400/40 group-hover:text-red-500 transition-colors" 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};