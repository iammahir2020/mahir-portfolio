import { Suspense, lazy } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Analytics } from "@vercel/analytics/react";

// Standard components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ThemeToggle } from "./components/ThemeToggle";
import { BugSmasher } from "./components/BugSmasher";
import { JumpToTop } from "./components/JumpToTop";

// Below-the-fold content is code-split so the hero can paint before this
// (and its dependencies, e.g. framer-motion drag/physics widgets) downloads.
const MainContent = lazy(() => import("./components/MainContent"));


function App() {
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

      <Suspense fallback={null}>
        <MainContent />
      </Suspense>

      <Analytics />
    </div>
  );
}

export default App;