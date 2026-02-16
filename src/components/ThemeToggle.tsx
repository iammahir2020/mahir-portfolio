import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="fixed bottom-6 right-6 md:bottom-auto md:top-24 md:right-8 z-[100] 
                 p-3 md:p-4 rounded-2xl 
                 bg-white/80 dark:bg-slate-900/50 
                 backdrop-blur-xl border border-slate-200 dark:border-slate-800 
                 text-blue-600 dark:text-blue-400 
                 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-2xl 
                 transition-all active:scale-95"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -10, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {theme === "dark" ? (
            <Sun size={20} className="md:w-6 md:h-6" />
          ) : (
            <Moon size={20} className="md:w-6 md:h-6" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};