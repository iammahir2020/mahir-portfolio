import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Target, Database, Activity } from "lucide-react";

// Import your games here
import { TerminalTyper } from "./TerminalTyper";
import { SkillShot } from "./SkillShot";
import { MemoryMatch } from "./MemoryMatch";
import { StressTest } from "./StressTest";

const GAMES = [
  { 
    id: "terminal", 
    title: "Terminal", 
    icon: <Terminal size={16} />, 
    component: <TerminalTyper />, 
    description: "A custom-built pseudo-terminal emulator for system interfacing.",
    techStack: ["Regex Parsers", "Command Pattern", "Ref Hooks"],
    challenge: "Mapping string-based inputs to executable JS functions while maintaining persistent state.",
    metrics: { label: "Input Buffer", value: "Active" }
  },
  { 
    id: "skillshot", 
    title: "Skill Shot", 
    icon: <Target size={16} />, 
    component: <SkillShot />, 
    description: "Interactive physics simulation demonstrating collision detection logic.",
    techStack: ["Motion Values", "Vector Physics", "Drag Gestures"],
    challenge: "Translating drag velocity into trajectory animations using framer-motion.",
    metrics: { label: "Frame Rate", value: "60 FPS" }
  },
  { 
    id: "memory", 
    title: "Cache Match", 
    icon: <Database size={16} />, 
    component: <MemoryMatch />, 
    description: "A memory-management simulation testing pattern recognition.",
    techStack: ["State Machines", "Preserve-3D", "Array Shuffling"],
    challenge: "Synchronizing 3D flip transitions with rapid state updates to prevent race conditions.",
    metrics: { label: "Cache Hit", value: "L1/L2" }
  },
  { 
    id: "stress", 
    title: "Stress Test", 
    icon: <Activity size={16} />, 
    component: <StressTest />, 
    description: "A high-concurrency throughput simulation.",
    techStack: ["Interval Management", "Event Loops", "Reconciliation"],
    challenge: "Simulating heavy DOM pressure and measuring the overhead of React’s engine.",
    metrics: { label: "Throughput", value: "High" }
  }
];

export const SimulationLab = () => {
  const [activeGame, setActiveGame] = useState(GAMES[0].id);
  const currentGame = GAMES.find((g) => g.id === activeGame) || GAMES[0];

  return (
    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 p-2 md:p-4 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={`group flex items-center gap-3 px-5 py-2.5 rounded-2xl font-mono text-[10px] md:text-xs font-bold transition-all ${
              activeGame === game.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {game.icon}
            {game.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
        {/* Technical Log Sidebar */}
        <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20 space-y-8">
          <div className="space-y-4">
           
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{currentGame.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{currentGame.description}</p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Logic Stack</h5>
            <div className="flex flex-wrap gap-2">
              {currentGame.techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed font-medium text-pretty">
              "{currentGame.challenge}"
            </p>
          </div>
        </div>

        {/* Viewport */}
        <div className="lg:col-span-2 p-4 md:p-12 flex items-center justify-center relative bg-white dark:bg-slate-950/40">
           {/* Engineering Grid */}
           <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />
          
           {/* HUD Performance Monitor */}
           <div className="absolute top-6 right-6 hidden md:flex flex-col items-end">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">{currentGame.metrics.label}</span>
              <span className="text-xs font-mono font-bold text-emerald-500">{currentGame.metrics.value}</span>
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={activeGame}
               initial={{ opacity: 0, scale: 0.98, y: 5 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.02, y: -5 }}
               className="relative z-10 w-full"
             >
               {currentGame.component}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};