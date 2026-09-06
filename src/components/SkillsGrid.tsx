import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ComponentType } from "react";
import {
  Braces,
  LayoutDashboard,
  Server,
  Database,
  Cloud,
  TestTube,
  Brain,
  Wrench,
  Bot,
} from "lucide-react";
import { RESUME_DATA } from "../constants/resume";

interface SkillCategory {
  title: string;
  skills: string[];
  description: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

const SkillCard = ({ cat, index = 0 }: { cat: SkillCategory; index?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const Icon = cat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.08 }}
      className="relative group perspective-[1500px] h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-shadow duration-300"
      >
        <div style={{ transform: "translateZ(30px)" }} className="relative pointer-events-none flex flex-col h-full">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <Icon size={16} className="text-blue-500" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{cat.title}</h4>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-xs mb-4 leading-snug">{cat.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {cat.skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 rounded-md text-[11px] font-mono font-semibold border border-slate-100 dark:border-slate-800">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: useTransform(
              [x, y],
              ([mx, my]: number[]) => `radial-gradient(circle at ${mx * 100 + 50}% ${my * 100 + 50}%, rgba(59, 130, 246, 0.08), transparent 70%)`
            )
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export const SkillsGrid = () => {
  const categories: SkillCategory[] = [
    { title: "Languages", skills: RESUME_DATA.skills.languages, description: "Core languages across the stack", icon: Braces },
    { title: "Frontend", skills: RESUME_DATA.skills.frontend, description: "Type-safe interfaces & migration", icon: LayoutDashboard },
    { title: "Backend", skills: RESUME_DATA.skills.backend, description: "Server architecture & real-time APIs", icon: Server },
    { title: "Databases", skills: RESUME_DATA.skills.databases, description: "SQL, NoSQL & client-side storage", icon: Database },
    { title: "Cloud & AWS", skills: RESUME_DATA.skills.cloud, description: "Serverless infrastructure & analytics", icon: Cloud },
    { title: "Testing", skills: RESUME_DATA.skills.testing, description: "Unit, integration & E2E coverage", icon: TestTube },
    { title: "AI / ML", skills: RESUME_DATA.skills.aiMl, description: "Vision, OCR & retrieval pipelines", icon: Brain },
    { title: "Tooling", skills: RESUME_DATA.skills.tooling, description: "Version control, CI & design handoff", icon: Wrench },
    { title: "AI-Assisted Dev", skills: RESUME_DATA.skills.aiAssistedDev, description: "Spec-driven agentic workflow", icon: Bot },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, idx) => (
          <SkillCard key={idx} cat={cat} index={idx} />
        ))}
      </div>

      {/* Modernization Banner */}
      <motion.div
        className="mt-5 relative group p-[2px] rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#3B82F6_25%,#E2E8F0_50%,#3B82F6_75%,#E2E8F0_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#1E293B_0%,#3B82F6_25%,#1E293B_50%,#3B82F6_75%,#1E293B_100%)]" />
        </div>

        <div className="relative z-10 p-6 md:p-8 rounded-[calc(1.5rem-2px)] bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl h-full w-full">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Enterprise System Modernization
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
                Migrating legacy jQuery/Jinja stacks into high-performance React ecosystems with TypeScript, as part of the frontend team.
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
  );
};
