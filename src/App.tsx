import { motion, useScroll, useSpring } from "framer-motion";

// Standard components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ExperienceCard } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { SkillsGrid } from "./components/SkillsGrid";
import { ThemeToggle } from "./components/ThemeToggle";
import { ProjectGallery } from "./components/Projects";
import { BugSmasher } from "./components/BugSmasher";
import { RESUME_DATA } from "./constants/resume";

import { JumpToTop } from "./components/JumpToTop";
import Footer from "./components/Footer";
import { SimulationLab } from "./components/SimulationLab";
import SectionHeader from "./components/SectionHeader";
import { AboutMe } from "./components/AboutMe";

// --- REFINED SECTION HEADER ---


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

      {/* Skills Grid - Integrated tighter */}
      <div className="py-20 border-y border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10">
        <SkillsGrid />
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 space-y-24 md:space-y-40 py-24">

        {/* ADD ABOUT ME HERE */}
        {/* <section id="about" className="scroll-mt-32">
          <SectionHeader
            title="Professional Narrative"
            subtitle="Bridging the gap between complex engineering and human-centric design."
          />
          <AboutMe />
        </section> */}

        {/* Experience */}
        <section id="experience" className="scroll-mt-32">
          <SectionHeader title="Professional Experience" subtitle="Building scalable digital infrastructure and figuring out complex UI issues." />
          <div className="space-y-4">
            {RESUME_DATA.experience.map((exp, i) => (
              <ExperienceCard key={i} item={exp} />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-32">
          <SectionHeader title="Professional Projects" subtitle="High-impact applications deployed across national networks." />
          <ProjectGallery projects={RESUME_DATA.projects} />
        </section>

        <section id="petPprojects" className="scroll-mt-32">
          <SectionHeader title="Personal Projects" subtitle="Some works I do on my own time." />
          <ProjectGallery projects={RESUME_DATA.petProjects} />
        </section>

        {/* Lab (Bento) */}
        <section id="playground" className="scroll-mt-32">
          {/* 2. Use your existing SectionHeader with the new titles we discussed */}
          <SectionHeader
            title="Simulation Lab"
            subtitle="Interactive benchmarks for state management and algorithmic logic."
          />

          {/* 3. Place the component inside a container to control its max-width */}
          <div className="max-w-5xl mx-auto">
            <SimulationLab />
          </div>
        </section>

        {/* SECTION 04: EDUCATION */}
        <section id="education" className="scroll-mt-32">
          <SectionHeader
            title="Academic Foundation"

            subtitle="Formal training and certifications in software engineering and systems design."
          />
          <div className="max-w-6xl">
            <Education />
          </div>
        </section>

        {/* SECTION 05: CONTACT (Full-width "Closing" Module) */}
        <section id="contact" className="scroll-mt-32">
          <div className=" bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <Contact />
          </div>

        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;