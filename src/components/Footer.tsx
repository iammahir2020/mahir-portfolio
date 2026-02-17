
import { RESUME_DATA } from "../constants/resume";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-slate-100 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-950/30">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                © 2026 {RESUME_DATA.name}
              </p>
              <div className="flex gap-8 font-mono text-[10px] text-slate-400 uppercase tracking-tighter font-bold">
               
                <a 
            href={`https://github.com/${RESUME_DATA.github}`} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-600"
          >
            GitHub
          </a>
          
          <a 
            href={`https://linkedin.com/in/${RESUME_DATA.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600"
          >
            LinkedIn
          </a>
          
          <a 
            href={`mailto:${RESUME_DATA.email}`}
            aria-label="Email"
            className="hover:text-blue-600"
          >
            Mail
          </a>
              </div>
            </div>
          </footer>
  )
}

export default Footer