import { ExperienceCard } from "./Experience";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { SkillsGrid } from "./SkillsGrid";
import { ProjectGallery } from "./Projects";
import { RESUME_DATA } from "../constants/resume";

import Footer from "./Footer";
import { SimulationLab } from "./SimulationLab";
import SectionHeader from "./SectionHeader";
import { AboutMe } from "./AboutMe";
import { Research } from "./Research";

export default function MainContent() {
  return (
    <>
      {/* Skills Grid - Integrated tighter */}
      <div className="py-20 border-y border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10">
        <SkillsGrid />
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 space-y-24 md:space-y-40 py-24">

        {/* ADD ABOUT ME HERE */}
        <section id="about" className="scroll-mt-32">
          <SectionHeader
            title="Professional Narrative"
            subtitle="Bridging the gap between complex engineering and human-centric design."
          />
          <AboutMe />
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-32">
          <SectionHeader title="Professional Experience" subtitle="Building scalable digital infrastructure and figuring out complex UI issues." />
          <div className="space-y-4">
            {RESUME_DATA.experience.map((exp, i) => (
              <ExperienceCard key={i} item={exp} index={i} />
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

        {/* SECTION 05: RESEARCH */}
        <section id="research" className="scroll-mt-32">
          <SectionHeader
            title="Research"
            subtitle="Manuscripts in preparation, co-authored alongside faculty and collaborators."
          />
          <Research />
        </section>

        {/* SECTION 06: CONTACT (Full-width "Closing" Module) */}
        <section id="contact" className="scroll-mt-32">
          <div className=" bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <Contact />
          </div>

        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
