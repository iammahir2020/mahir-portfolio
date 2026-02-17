import { motion } from "framer-motion";

const SectionHeader = ({ title, subtitle}: {title: string, subtitle?: string }) => (
    <div className="max-w-6xl mx-auto mb-12 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-3"
      >      
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

export default SectionHeader