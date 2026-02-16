import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Terminal, Target, Database, Activity, Cpu, 
  GraduationCap, Mail, LayoutGrid, Briefcase
} from "lucide-react";

// Standard components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { SkillsGrid } from "./components/SkillsGrid";
import { ThemeToggle } from "./components/ThemeToggle";
import { ProjectGallery } from "./components/Projects";
import { BugSmasher } from "./components/BugSmasher";
import { RESUME_DATA } from "./constants/resume";

// Game Components
import { TerminalTyper } from "./components/TerminalTyper";
import { SkillShot } from "./components/SkillShot";
import { MemoryMatch } from "./components/MemoryMatch";
import { StressTest } from "./components/StressTest";
import { JumpToTop } from "./components/JumpToTop";

const GAMES = [
  { id: "terminal", title: "Terminal", icon: <Terminal size={16} />, component: <TerminalTyper />, description: "Execute shell commands to interface with system logic." },
  { id: "skillshot", title: "Skill Shot", icon: <Target size={16} />, component: <SkillShot />, description: "Interactive tech-stack collision physics." },
  { id: "memory", title: "Cache Match", icon: <Database size={16} />, component: <MemoryMatch />, description: "Optimize memory management via pattern matching." },
  { id: "stress", title: "Stress Test", icon: <Activity size={16} />, component: <StressTest />, description: "Simulate high-concurrency request throughput." }
];

// --- REFINED SECTION HEADER ---
const SectionHeader = ({ icon: Icon, title, subtitle, index }: { icon: any, title: string, subtitle?: string, index: string }) => (
  <div className="max-w-6xl mx-auto mb-12 px-4 md:px-0">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-500">
          <Icon size={18} />
        </div>
        <span className="font-mono text-[10px] tracking-[0.4em] text-slate-500 uppercase font-bold">
          {index} // System_Module
        </span>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="h-px w-full bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent mt-4" />
    </motion.div>
  </div>
);

function App() {
  const [activeGame, setActiveGame] = useState<string>("terminal");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-500">
      
      {/* UI Hud */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]" style={{ scaleX }} />
      <Navbar />
      <ThemeToggle />
      <BugSmasher />
      <JumpToTop />
      
      <Hero />

      {/* Skills Grid - Integrated tighter */}
      <div className="py-20 border-y border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10">
        <SkillsGrid />
      </div>
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 space-y-24 md:space-y-40 py-24">
        
        {/* Experience */}
        <section id="experience" className="scroll-mt-32">
          <SectionHeader icon={Briefcase} title="Professional Experience" index="01" subtitle="Building scalable digital infrastructure and figuring out complex UI issues." />
          <div className="space-y-4">
            {RESUME_DATA.experience.map((exp, i) => (
              <Experience key={i} {...exp} />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-32">
          <SectionHeader icon={LayoutGrid} title="Professional Projects" index="02" subtitle="High-impact applications deployed across national networks." />
          <ProjectGallery projects={RESUME_DATA.projects} />
        </section>

        <section id="petPprojects" className="scroll-mt-32">
          <SectionHeader icon={LayoutGrid} title="Personal Projects" index="03" subtitle="Some works I do on my own time." />
          <ProjectGallery projects={RESUME_DATA.petProjects} />
        </section>

        {/* Lab (Bento) */}
        <section id="playground" className="scroll-mt-32">
          <SectionHeader icon={Cpu} title="Bored?" index="04" subtitle="Let's play some games." />
          
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 p-2 md:p-4 gap-2">
              {GAMES.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${
                    activeGame === game.id
                      ? "bg-white dark:bg-slate-800 text-blue-500 shadow-sm border border-slate-200 dark:border-slate-700"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {game.icon} {game.title}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-16 flex flex-col items-center min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGame}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="w-full flex flex-col items-center"
                >
                  <p className="mb-8 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-widest text-center opacity-70">
                    // Description: {GAMES.find(g => g.id === activeGame)?.description}
                  </p>
                  <div className="scale-90 md:scale-100">
                    {GAMES.find(g => g.id === activeGame)?.component}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

       {/* SECTION 04: EDUCATION */}
       <section id="education" className="scroll-mt-32">
          <SectionHeader 
            icon={GraduationCap} 
            title="Academic Foundation" 
            index="05" 
            subtitle="Formal training and certifications in software engineering and systems design." 
          />
          <div className="max-w-4xl">
             <Education />
          </div>
        </section>

        {/* SECTION 05: CONTACT (Full-width "Closing" Module) */}
        <section id="contact" className="scroll-mt-32">
        <SectionHeader 
            icon={Mail} 
            title="Lets Connect" 
            index="06" 
            subtitle="Get in touch." 
          />
          <div className=" bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <Contact />
          </div>
          
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-950/30">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
            © 2026 {RESUME_DATA.name} // TSX_ENGINE_BUILD
          </p>
          <div className="flex gap-8 font-mono text-[10px] text-slate-400 uppercase tracking-tighter font-bold">
            <span className="hover:text-blue-500 cursor-pointer">GitHub</span>
            <span className="hover:text-blue-500 cursor-pointer">LinkedIn</span>
            <span className="hover:text-blue-500 cursor-pointer">Source</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;