import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Braces, Palette, Layout, Wind, Globe, Zap, 
  Figma, Smartphone, Cpu, Code2, Component, Layers, 
  RotateCcw, Trophy
} from "lucide-react";

const FRONTEND_ICONS = [
  { label: "React", icon: <Braces className="text-cyan-400" /> },
  { label: "Tailwind", icon: <Wind className="text-sky-400" /> },
  { label: "CSS", icon: <Palette className="text-pink-400" /> },
  { label: "Web", icon: <Globe className="text-emerald-400" /> },
  { label: "Vite", icon: <Zap className="text-yellow-400" /> },
  { label: "Figma", icon: <Figma className="text-purple-400" /> },
  { label: "Mobile", icon: <Smartphone className="text-slate-400" /> },
  { label: "Layout", icon: <Layout className="text-indigo-400" /> },
  { label: "Logic", icon: <Cpu className="text-red-400" /> },
  { label: "Syntax", icon: <Code2 className="text-orange-400" /> },
  { label: "Atomic", icon: <Component className="text-blue-400" /> },
  { label: "Stack", icon: <Layers className="text-amber-400" /> },
];

export const MemoryMatch = () => {
  // Memoize the deck so it only reshuffles on manual reset
  const [deck, setDeck] = useState(() => 
    [...FRONTEND_ICONS, ...FRONTEND_ICONS].sort(() => Math.random() - 0.5)
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const isWon = solved.length === deck.length;

  const resetGame = () => {
    setDeck([...FRONTEND_ICONS, ...FRONTEND_ICONS].sort(() => Math.random() - 0.5));
    setSolved([]);
    setFlipped([]);
    setMoves(0);
  };

  const handleClick = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;
    setFlipped(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(m => m + 1);
      // COMPARING LABELS INSTEAD OF OBJECTS
      if (deck[flipped[0]].label === deck[flipped[1]].label) {
        setSolved(prev => [...prev, ...flipped]);
      }
      const timer = setTimeout(() => setFlipped([]), 800);
      return () => clearTimeout(timer);
    }
  }, [flipped, deck]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between w-full font-mono text-[10px] text-slate-500 uppercase tracking-widest px-2">
        <div className="flex items-center gap-2">
          <Database size={14} className="text-blue-500" />
          <span>Cache: {deck.length} Blocks</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ops: {moves}</span>
          <button onClick={resetGame} className="hover:text-white transition-colors"><RotateCcw size={14} /></button>
        </div>
      </div>

      <div className="relative grid grid-cols-4 sm:grid-cols-6 gap-2 md:gap-3 w-full">
        {deck.map((card, i) => {
          const isFlipped = flipped.includes(i) || solved.includes(i);
          const isMatched = solved.includes(i);

          return (
            <motion.div key={i} onClick={() => handleClick(i)} className="relative aspect-[3/4] cursor-pointer">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back (Hidden) */}
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800" style={{ backfaceVisibility: 'hidden' }}>
                  <Database size={20} className="text-slate-700" />
                </div>
                {/* Front (Icon) */}
                <div 
                  className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 ${isMatched ? "bg-emerald-500/10 border-emerald-500/40" : "bg-blue-600/10 border-blue-500/40"}`}
                  style={{ backfaceVisibility: 'hidden', transform: "rotateY(180deg)" }}
                >
                  {card.icon}
                  {/* <span className="text-[7px] font-mono mt-1 opacity-40">{card.label}</span> */}
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {isWon && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-10 bg-slate-950/90 backdrop-blur flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30">
              <Trophy size={48} className="text-emerald-400 mb-2" />
              <h3 className="text-white font-bold uppercase tracking-tighter">Memory Optimized</h3>
              <p className="text-slate-500 text-[10px] mb-4">COMPLETED IN {moves} OPERATIONS</p>
              <button onClick={resetGame} className="px-6 py-2 bg-emerald-500 text-white rounded-full text-xs font-bold">RETRY</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};