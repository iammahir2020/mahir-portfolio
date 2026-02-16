import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cpu, Zap } from "lucide-react";

// 0 = Straight Pipe, 1 = Corner Pipe
const TILE_TYPES = [1, 0, 1, 0, 1, 0, 1, 0, 1]; 

/**
 * THE SOLUTION MAP (Degrees):
 * [ 180,  90,  90 ]  <- Top row: Corner(In), Straight, Corner(Down)
 * [   0, 270,   0 ]  <- Mid row: Straight, Corner(Turn), Straight
 * [  90,  90,   0 ]  <- Bot row: Corner(Up), Straight, Corner(Out)
 */
const WINNING_STATE = [180, 90, 90, 0, 270, 0, 90, 90, 0];

export const CodeFlow = () => {
  // Start randomized (none matching WINNING_STATE initially)
  const [rotations, setRotations] = useState([90, 0, 180, 270, 0, 90, 0, 180, 270]);
  const [isSolved, setIsSolved] = useState(false);

  const rotate = (index: number) => {
    if (isSolved) return;
    const newRotations = [...rotations];
    newRotations[index] = (newRotations[index] + 90) % 360;
    setRotations(newRotations);
  };

  useEffect(() => {
    const solved = rotations.every((val, i) => val === WINNING_STATE[i]);
    if (solved) setIsSolved(true);
  }, [rotations]);

  return (
    <div className={`p-6 rounded-3xl transition-all duration-700 border gravity-item ${
      isSolved 
        ? "bg-blue-600/10 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)]" 
        : "bg-slate-900/50 border-slate-800"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-blue-400">
          <Cpu size={18} className={isSolved ? "animate-pulse" : ""} />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Logic Bridge</span>
        </div>
        {isSolved && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-emerald-400">
             <Zap size={12} fill="currentColor" />
             <span className="text-[10px] font-bold">UPLINK ACTIVE</span>
          </motion.div>
        )}
      </div>

      <div className="relative grid grid-cols-3 gap-2 w-full aspect-square bg-slate-950/50 p-2 rounded-2xl overflow-hidden">
        {/* Entrance/Exit Glows */}
        <div className={`absolute left-0 top-[22%] w-1 h-8 blur-sm transition-colors ${isSolved ? 'bg-blue-400' : 'bg-blue-900/30'}`} />
        <div className={`absolute right-0 bottom-[22%] w-1 h-8 blur-sm transition-colors ${isSolved ? 'bg-blue-400' : 'bg-blue-900/30'}`} />

        {/* Labels */}
        <div className="absolute left-1 top-[25%] text-[7px] font-bold text-blue-500/50 -rotate-90">IN</div>
        <div className="absolute right-1 bottom-[25%] text-[7px] font-bold text-blue-500/50 -rotate-90">OUT</div>

        {rotations.map((rot, i) => (
          <motion.div
            key={i}
            animate={{ rotate: rot }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => rotate(i)}
            className={`cursor-pointer rounded-xl flex items-center justify-center border transition-all ${
              isSolved ? "border-blue-400 bg-blue-500/20 text-blue-400" : "border-slate-700 bg-slate-800/40 text-slate-500/60"
            }`}
          >
            <div className="w-full h-full relative flex items-center justify-center">
               {TILE_TYPES[i] === 0 ? (
                 /* Straight Pipe - Horizontal by default at 0deg */
                 <div className="w-full h-[3px] bg-current rounded-full" />
               ) : (
                 /* Corner Pipe - Connects Left to Top by default at 0deg */
                 <>
                   <div className="absolute top-1/2 left-0 w-1/2 h-[3px] bg-current rounded-full" />
                   <div className="absolute top-0 left-1/2 w-[3px] h-1/2 bg-current rounded-full" />
                 </>
               )}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-5 text-[10px] text-slate-500 font-mono text-center">
        {isSolved ? "Circuit complete. Data optimized." : "Rotate nodes to bridge IN to OUT."}
      </p>
    </div>
  );
};