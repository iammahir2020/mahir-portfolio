import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, Star } from "lucide-react";
import { RESUME_DATA } from "../constants/resume";

export const Education = () => {
  return (
    <section className="py-20 dark:border-slate-900 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Featured Education Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gravity-item relative p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/5 to-transparent dark:from-blue-500/10 dark:to-transparent border border-blue-100 dark:border-blue-500/20 shadow-xl shadow-blue-500/5"
        >
          {/* Decorative Icon for Light Mode */}
          <div className="absolute -top-6 -right-6 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg">
            <GraduationCap className="text-blue-500" size={32} />
          </div>

          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
              {RESUME_DATA.education.degree}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
              {RESUME_DATA.education.institution}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-2xl text-sm font-bold border border-blue-200 dark:border-blue-500/30">
              <Star size={14} className="fill-current" />
              CGPA: {RESUME_DATA.education.cgpa}
            </div>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-mono bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-2xl">
              Class of {RESUME_DATA.education.year}
            </span>
          </div>
        </motion.div>

        {/* Details and Achievements */}
        <div className="gravity-item space-y-8">
          <div className="group flex gap-5 items-start">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Faculty Background</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Conducted lab courses on programming, data structures, and algorithms while mentoring students in web development competitions.
              </p>
            </div>
          </div>

          <div className="group flex gap-5 items-start">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Research & Development</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Collaborated with faculty on technical evaluations and maintained the university website frontend using modern React architecture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};