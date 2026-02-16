import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Target, RotateCcw } from 'lucide-react';

const SKILLS = ["React", "TypeScript", "Tailwind", "Node.js", "Python"];

export const SkillShot = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLaunched, setIsLaunched] = useState(false);
  const constraintsRef = useRef(null);

  // Motion values for the "Sling" effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Visual feedback: line stretches and rotates based on drag
  const rotate = useTransform(x, [-100, 100], [-45, 45]);
  const opacity = useTransform(y, [0, -100], [1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    // If flicked upward with enough velocity
    if (info.offset.y < -50) {
      setIsLaunched(true);
      
      // Simulate "Hit" detection
      setTimeout(() => {
        setScore(s => s + 1);
        nextSkill();
      }, 600);
    } else {
      // Snap back if not flicked hard enough
      x.set(0);
      y.set(0);
    }
  };

  const nextSkill = () => {
    setIsLaunched(false);
    x.set(0);
    y.set(0);
    setCurrentSkillIndex((prev) => (prev + 1) % SKILLS.length);
  };

  return (
    <div className="gravity-item relative p-6 rounded-3xl bg-slate-900 border border-slate-800 h-[350px] overflow-hidden flex flex-col items-center justify-between">
      {/* Header */}
      <div className="w-full flex justify-between items-center text-slate-500 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-red-500" />
          <span>SKILL_SHOT.EXE</span>
        </div>
        <div className="bg-slate-800 px-2 py-1 rounded">SCORE: {score}</div>
      </div>

      {/* The Target Area */}
      <div className="relative w-full flex justify-center pt-4">
        <div className="w-24 h-12 border-b-2 border-x-2 border-dashed border-blue-500/30 rounded-b-xl flex items-center justify-center">
          <div className={`w-16 h-8 rounded-lg transition-colors duration-300 ${isLaunched ? 'bg-blue-500/20' : 'bg-transparent'}`} />
        </div>
        <div className="absolute -top-1 text-[8px] text-blue-500 font-bold uppercase tracking-widest">Deploy Zone</div>
      </div>

      {/* The Sling / Skill Icon */}
      <div ref={constraintsRef} className="relative w-full h-32 flex items-center justify-center">
        {!isLaunched ? (
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            style={{ x, y, rotate }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ cursor: 'grabbing' }}
            className="z-10 cursor-grab px-4 py-2 bg-blue-600 text-white rounded-full font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            {SKILLS[currentSkillIndex]}
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 0, scale: 1, opacity: 1 }}
            animate={{ y: -180, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-4 py-2 bg-emerald-500 text-white rounded-full font-bold text-sm"
          >
            {SKILLS[currentSkillIndex]}
          </motion.div>
        )}
        
        {/* Visual Sling Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.line 
                x1="50%" y1="50%" x2="50%" y2="50%"
                stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" strokeDasharray="4 2"
            />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-500 font-mono italic">
          Flick upward to "deploy" your skills
        </p>
        <button 
          onClick={() => {setScore(0); nextSkill();}}
          className="mt-2 p-1 hover:bg-slate-800 rounded-full transition-colors"
        >
          <RotateCcw size={12} className="text-slate-600" />
        </button>
      </div>
    </div>
  );
};