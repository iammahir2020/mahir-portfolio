import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { RESUME_DATA } from "../constants/resume";

const SkillCard = ({ cat }: { cat: any; }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  
  // FIX: Reduced rotation range slightly for better realism (10deg is the sweet spot)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  // ADDED: A "Sink" effect. As you move to corners, the whole card moves slightly back (Z-axis)
  const translateZ = useSpring(useTransform(
    [x, y], 
    ([latestX, latestY]:any) => {
      const distance = Math.sqrt(latestX**2 + latestY**2);
      return distance * -20; // Sinks up to 20px in corners
    }
  ), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      // Precise normalized coordinates
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  return (
    // FIX: Perspective MUST be on the wrapper for the 3D math to look right
    <div className="relative group p-0 perspective-[1500px]"> 
      
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{
          rotateX,
          rotateY,
          z: translateZ, // The card now physically sinks into the "bed"
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 p-8 min-h-[206px] rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
      >
        {/* PARALLAX CONTENT */}
        <div style={{ transform: "translateZ(40px)" }} className="relative pointer-events-none">
          <h4 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{cat.title}</h4>
          <p className="text-slate-500 text-sm mb-6">{cat.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill: string) => (
              <span key={skill} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-mono font-bold">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* GLOW FOLLOWS CURSOR */}
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-[2rem]"
          style={{
            background: useTransform(
              [x, y],
              ([mx, my]:any) => `radial-gradient(circle at ${mx * 100 + 50}% ${my * 100 + 50}%, rgba(59, 130, 246, 0.1), transparent 70%)`
            )
          }}
        />
      </motion.div>
    </div>
  );
};
export const SkillsGrid = () => {
  const categories = [
    { title: "Frontend Core", skills: RESUME_DATA.skills.frontend, description: "Type-safe interfaces & migration" },
    { title: "State & Logic", skills: RESUME_DATA.skills.stateManagement, description: "Data flow & real-time sync" },
    { title: "Backend & DB", skills: RESUME_DATA.skills.backend, description: "Server architecture & SQL/NoSQL" },
    { title: "Tools & DevOps", skills: RESUME_DATA.skills.tools, description: "Cloud, CI/CD & Analytics" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <SkillCard key={idx} cat={cat} />
        ))}
        {/* Modernization Card (Centered Full Width) */}
        <motion.div 
  // whileHover={{ y: -5 }}
  className="md:col-span-2 relative group p-[2px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
>
  {/* 1. ANIMATED BORDER (The "Eye-Catcher") */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#3B82F6_25%,#E2E8F0_50%,#3B82F6_75%,#E2E8F0_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#1E293B_0%,#3B82F6_25%,#1E293B_50%,#3B82F6_75%,#1E293B_100%)]" />
  </div>

  {/* 2. MAIN CARD BODY */}
  <div className="relative z-10 p-6 md:p-8 rounded-[calc(1.5rem-2px)] bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl h-full w-full">
    
    {/* 3. INTERNAL SHIMMER & GLOW */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* <div className="absolute -inset-[100%] group-hover:animate-shimmer bg-gradient-to-r from-transparent via-blue-500/5 to-transparent skew-x-[-20deg] transition-all duration-1000" /> */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
    </div>

    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
      <div className="space-y-2">
        
        <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Enterprise System Modernization
        </h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
          Specialized in migrating legacy jQuery/Jinja stacks into high-performance React ecosystems with TypeScript.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 md:gap-3">
        <div className="relative group/pill">
          <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full opacity-0 group-hover/pill:opacity-100 transition-opacity" />
          <span className="relative px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full text-xs font-mono text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-500/30 font-bold block">
            Jinja → React
          </span>
        </div>
        <div className="relative group/pill">
          <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full opacity-0 group-hover/pill:opacity-100 transition-opacity" />
          <span className="relative px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-xs font-mono text-emerald-600 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/30 font-bold block">
            jQuery → TS
          </span>
        </div>
      </div>
    </div>
  </div>
</motion.div>
      </div>
    </div>
  );
};