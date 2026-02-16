import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Flag, Play, RotateCcw, ShieldAlert } from 'lucide-react';

export const CommitDash = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bugs, setBugs] = useState<{ id: number; x: number }[]>([]);
  
  // Fix: requestRef needs to handle number or null correctly for TS
  const requestRef = useRef<number | null>(null);
  const lastBugTime = useRef<number>(0);

  const jump = useCallback(() => {
    if (!isJumping && isPlaying) {
      setIsJumping(true);
      // We keep this for visual state, but collision now uses a more reliable check
      setTimeout(() => setIsJumping(false), 700); 
    }
  }, [isJumping, isPlaying]);

  const startGame = () => {
    setScore(0);
    setBugs([]);
    setGameOver(false);
    setIsPlaying(true);
    lastBugTime.current = Date.now();
  };

  const update = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setBugs((prevBugs) => {
      const nextBugs = prevBugs
        .map(bug => ({ ...bug, x: bug.x - 6 })) // Slightly faster for "Premium" feel
        .filter(bug => bug.x > -50);

      // Collision Detection: We check the actual jumping state
      // Player is roughly between x: 40 and x: 80
      const collision = nextBugs.some(bug => {
        const inXRange = bug.x > 30 && bug.x < 70;
        return inXRange && !isJumping; // If in X range and NOT in air = Hit
      });

      if (collision) {
        setGameOver(true);
        setIsPlaying(false);
        return prevBugs;
      }
      
      return nextBugs;
    });

    // Spawn bugs with increasing difficulty
    const spawnRate = Math.max(800, 2000 - (score * 50)); 
    if (Date.now() - lastBugTime.current > spawnRate) {
      setBugs(prev => [...prev, { id: Date.now(), x: 500 }]);
      lastBugTime.current = Date.now();
      setScore(s => s + 1);
    }

    requestRef.current = requestAnimationFrame(update);
  }, [isPlaying, gameOver, isJumping, score]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, update]);

  return (
    <div 
      className="gravity-item relative w-full max-w-md h-56 bg-slate-950 rounded-[2rem] border border-slate-800 overflow-hidden cursor-pointer shadow-2xl group"
      onClick={isPlaying ? jump : undefined}
    >
      {/* Premium Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Start UI */}
      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm z-20">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startGame} 
            className="p-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            <Play fill="white" className="text-white ml-1" />
          </motion.button>
          <p className="mt-4 text-[10px] text-blue-400 font-mono font-bold tracking-[0.2em] animate-pulse">INITIATE DEPLOYMENT</p>
        </div>
      )}

      {/* Game Over UI */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/80 backdrop-blur-md z-20 border-2 border-red-500/20 m-2 rounded-2xl">
          <ShieldAlert size={40} className="text-red-500 mb-2" />
          <p className="text-red-400 font-black text-2xl tracking-tighter italic">PIPELINE_FAILED</p>
          <p className="text-red-500/60 font-mono text-[10px] mb-4">CRITICAL BUG DETECTED IN PRODUCTION</p>
          <button 
            onClick={startGame} 
            className="flex items-center gap-2 text-[10px] font-bold text-white bg-red-600 px-6 py-2 rounded-full hover:bg-red-500 transition-colors shadow-lg shadow-red-900/40"
          >
            <RotateCcw size={14} /> RE-TRIGGER BUILD
          </button>
        </div>
      )}

      {/* Stats Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Environment</span>
          <span className="text-[10px] font-mono text-emerald-500 font-bold tracking-tighter">● PRODUCTION</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Successful_Commits</span>
          <div className="text-xl font-black font-mono text-blue-400 leading-none">{score}</div>
        </div>
      </div>

      {/* Floor Line */}
      <div className="absolute bottom-10 w-full h-[2px] bg-slate-800 shadow-[0_0_10px_rgba(30,41,59,0.5)]" />

      {/* Player (The Commit) */}
      <motion.div
        animate={{ 
          y: isJumping ? -80 : 0,
          rotate: isJumping ? 15 : 0
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute bottom-11 left-12 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center border-2 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] z-10"
      >
        <Flag size={18} className="text-white fill-white/20" />
      </motion.div>

      {/* Obstacles (Bugs) */}
      <AnimatePresence>
        {bugs.map((bug) => (
          <motion.div
            key={bug.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-11 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
            style={{ left: `${bug.x}px` }}
          >
            <Bug size={24} className="animate-pulse" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};