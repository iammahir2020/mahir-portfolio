import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { RESUME_DATA } from "../constants/resume";
import { useMagnetic } from "../hooks/useMagnetic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};
  // Name is optional — only validate length if the visitor entered one.
  const trimmedName = name.trim();
  if (trimmedName.length > 0 && (trimmedName.length < 2 || trimmedName.length > 100)) {
    errors.name = "Name must be between 2 and 100 characters.";
  }
  // Email is optional — only validate format if the visitor entered one.
  const trimmedEmail = email.trim();
  if (trimmedEmail.length > 0 && (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 254)) {
    errors.email = "Please enter a valid email address, or leave it blank.";
  }
  if (message.trim().length < 10 || message.trim().length > 2000) {
    errors.message = "Message must be between 10 and 2000 characters.";
  }
  return errors;
}

export const Contact = () => {
  const magnetic = useMagnetic<HTMLButtonElement>(0.15);
  const startedAtRef = useRef(Date.now());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(name, email, message);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
          startedAt: startedAtRef.current,
          // Browser-reported timezone — a built-in Intl lookup, not a permission-gated API.
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left Side: Content */}
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
            Let's build the <span className="text-blue-500">future</span> together.
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl">
            Currently looking for high-impact engineering roles.
            Drop a message and let's discuss how I can contribute to your team.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2">
            <a href={`https://github.com/${RESUME_DATA.github}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
              <Github size={18} />
              <span className="text-xs font-mono">GitHub</span>
            </a>
            <a href={`https://linkedin.com/in/${RESUME_DATA.linkedin}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
              <Linkedin size={18} />
              <span className="text-xs font-mono">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center gap-3 p-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 min-h-[320px]"
              >
                <CheckCircle2 size={40} className="text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message sent</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs font-mono font-bold text-blue-500 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >
                {/* Honeypot field — hidden from real users, catches simple bots */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] w-px h-px opacity-0"
                />

                <div>
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white outline-none transition-colors ${
                      errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={254}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white outline-none transition-colors ${
                      errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <textarea
                    placeholder="What would you like to talk about?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white outline-none transition-colors resize-none ${
                      errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                    }`}
                  />
                  <div className="mt-1 flex items-center justify-between">
                    {errors.message ? (
                      <p className="text-xs text-red-500">{errors.message}</p>
                    ) : <span />}
                    <span className="text-[10px] font-mono text-slate-400">{message.length}/2000</span>
                  </div>
                </div>

                {status === "error" && serverError && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    {serverError}
                  </div>
                )}

                <motion.button
                  ref={magnetic.ref}
                  onMouseMove={magnetic.onMouseMove}
                  onMouseLeave={magnetic.onMouseLeave}
                  style={magnetic.style}
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-base transition-colors shadow-xl shadow-blue-500/20"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
