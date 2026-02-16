import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ShieldAlert, ShieldCheck } from "lucide-react";

const COMMANDS = ["sudo systemctl restart", "npm audit fix", "docker-compose up -d", "git push origin main"];

export const TerminalTyper = () => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "playing" | "success">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val === COMMANDS[index]) {
      if (index === COMMANDS.length - 1) {
        setStatus("success");
      } else {
        setIndex(prev => prev + 1);
        setInput("");
      }
    }
  };

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className="bg-black border border-slate-800 rounded-xl p-4 font-mono text-sm w-full max-w-md mx-auto shadow-2xl cursor-text"
    >
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <TerminalIcon size={14} className="text-slate-500" />
        <span className="text-slate-500 text-[10px]">zsh — 80x24</span>
      </div>

      {status === "idle" ? (
        <div className="text-blue-400 animate-pulse">
          <p>Scanning for vulnerabilities...</p>
          <button onClick={() => setStatus("playing")} className="text-white underline mt-2">Initialize Security Protocol?</button>
        </div>
      ) : status === "success" ? (
        <div className="text-emerald-400">
          <ShieldCheck className="mb-2" />
          <p>All patches applied. System Secure.</p>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-red-400 flex items-center gap-2 text-xs">
            <ShieldAlert size={12} /> ACTION REQUIRED: Type the command below
          </p>
          <p className="text-slate-500 text-xs italic">"{COMMANDS[index]}"</p>
          <div className="flex gap-2 text-blue-400 mt-2">
            <span>$</span>
            <input
              ref={inputRef}
              autoFocus
              className="bg-transparent outline-none flex-1 text-white"
              value={input}
              onChange={handleInput}
            />
          </div>
        </div>
      )}
    </div>
  );
};