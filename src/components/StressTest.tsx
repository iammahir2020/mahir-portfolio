import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Activity, Zap, RotateCcw } from 'lucide-react';

export const StressTest = () => {
  const [clicks, setClicks] = useState(0);
  const [peak, setPeak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState<{ id: number }[]>([]);
  
  // Use a ref to track the interval ID safely
  const timerRef = useRef<any>(null);

  // Robust Timer Management
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Update peak score at the end of the run
      setPeak((currentPeak) => Math.max(currentPeak, clicks));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]); // Separated clicks from dependencies to prevent "stuttering"

  const handleServerClick = () => {
    // Prevent clicking if time is up
    if (timeLeft === 0) return;

    // Start the timer on the very first click
    if (!isActive && timeLeft === 10) {
      setIsActive(true);
    }
    
    // Increment clicks
    setClicks(prev => prev + 1);
    
    // Visual Ripple Logic
    const id = Date.now();
    setRipples(prev => [...prev, { id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  const resetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setClicks(0);
    setTimeLeft(10);
    setIsActive(false);
    setRipples([]);
  };

  return (
    <div className="gravity-item relative flex flex-col items-center gap-8 p-8 bg-slate-950 rounded-[2.5rem] border border-slate-800 w-full max-w-sm overflow-hidden shadow-2xl">
      {/* Background Glow - Intensifies when active */}
      <div className={`absolute -top-24 -left-24 w-48 h-48 blur-[100px] transition-all duration-700 ${isActive ? 'bg-emerald-500/30 scale-150' : 'bg-blue-500/10 scale-100'}`} />
      
      {/* Stats Dashboard */}
      <div className="w-full grid grid-cols-2 gap-4 z-10">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-3 rounded-2xl">
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[9px] uppercase tracking-wider mb-1">
            <Activity size={10} className={isActive ? "text-emerald-400 animate-pulse" : ""} />
            Live Load
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {clicks}<span className="text-[10px] text-slate-500 ml-1 italic">reqs</span>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-3 rounded-2xl">
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[9px] uppercase tracking-wider mb-1">
            <Zap size={10} className="text-yellow-500" />
            Peak Ops
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {peak}<span className="text-[10px] text-slate-500 ml-1 italic">max</span>
          </div>
        </div>
      </div>

      {/* Interactive Core */}
      <div className="relative py-4">
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              className="absolute inset-0 border-2 border-emerald-500/40 rounded-full pointer-events-none"
            />
          ))}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleServerClick}
          className={`relative z-10 w-40 h-40 rounded-full flex items-center justify-center transition-all duration-200 border-[4px] ${
            isActive 
              ? "border-emerald-500/60 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.2)]" 
              : "border-slate-800 bg-slate-900 hover:border-slate-700"
          }`}
        >
          <Server 
            size={52} 
            className={`transition-colors duration-300 ${isActive ? "text-emerald-400" : "text-slate-600"}`} 
          />
        </motion.button>
      </div>

      {/* Progress & Controls */}
      <div className="w-full flex flex-col items-center gap-6 z-10 mt-2">
  <div className="relative flex flex-col items-center w-full max-w-[280px]">
    {/* Technical Header with Decorative Borders */}
    <div className="w-full flex justify-between items-end mb-2 px-1">
      <div className="flex flex-col">
        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.2em]">Status</span>
        <div className={`font-mono text-sm font-bold tracking-tighter transition-colors duration-300 ${
          timeLeft < 4 && timeLeft > 0 ? "text-red-400" : isActive ? "text-emerald-400" : "text-slate-400"
        }`}>
          {timeLeft === 0 ? "TERMINATED" : isActive ? "EXECUTING..." : "IDLE_STANDBY"}
        </div>
      </div>
      <div className="text-right">
        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.2em]">Buffer</span>
        <div className="font-mono text-sm font-bold text-slate-200">
          {timeLeft}s
        </div>
      </div>
    </div>

    {/* Enhanced Segmented Progress Bar */}
    <div className="relative w-full h-3 bg-slate-900 rounded-sm border border-slate-800 p-[2px] overflow-hidden">
      {/* Background segments for a "grid" look */}
      <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-slate-800/50" />
        ))}
      </div>
      
      <motion.div 
        initial={{ width: "100%" }}
        animate={{ width: `${(timeLeft / 10) * 100}%` }}
        transition={{ ease: "linear", duration: 0.5 }}
        className={`h-full rounded-sm relative ${
          timeLeft < 4 ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
        }`}
      >
        {/* Scanning Light Effect */}
        {isActive && (
          <motion.div 
            animate={{ x: ['-100%', '400%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 w-20 bg-white/20 skew-x-12 blur-sm"
          />
        )}
      </motion.div>
    </div>

    {/* Small Technical Subtext */}
    <div className="w-full mt-2 flex justify-between text-[7px] font-mono text-slate-600 uppercase tracking-widest">
      <span>Core_Temp: 32°C</span>
      <span>Port: 8080</span>
      <span>Thread: 0x4F</span>
    </div>
  </div>

  {/* Re-Initialize Button with Glow */}
  <AnimatePresence>
    {timeLeft === 0 && (
      <motion.button 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={resetTest}
        className="group relative flex items-center gap-3 px-10 py-3 bg-slate-100 dark:bg-white text-slate-950 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <RotateCcw size={14} className="relative z-10 group-hover:rotate-180 transition-transform duration-500" />
        <span className="relative z-10 group-hover:text-white transition-colors">Re-Initialize System</span>
      </motion.button>
    )}
  </AnimatePresence>
</div>
    </div>
  );
};