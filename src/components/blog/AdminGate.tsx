import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, LogIn, X, ShieldCheck } from "lucide-react";

interface AdminGateProps {
  isAuthenticated: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
}

export const AdminGate = ({ isAuthenticated, onLogin, onLogout }: AdminGateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(password);
    if (ok) {
      setIsOpen(false);
      setPassword("");
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isAuthenticated) {
    return (
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all"
      >
        <ShieldCheck size={12} />
        Admin Mode
        <X size={10} />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-[10px] font-mono font-bold uppercase tracking-widest hover:border-blue-500/50 transition-all"
      >
        <Lock size={10} />
        Admin
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[210] w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock size={18} className="text-blue-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Admin Access</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Enter admin password"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-mono text-slate-900 dark:text-white outline-none transition-all ${
                    error ? "border-red-500" : "border-slate-200 dark:border-slate-700 focus:border-blue-500"
                  }`}
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs font-mono">Invalid password</p>}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
                >
                  <LogIn size={16} />
                  Authenticate
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
