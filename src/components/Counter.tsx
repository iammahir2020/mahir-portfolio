import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "motion/react";

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const Counter = ({ to, prefix = "", suffix = "", duration = 1.2 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [isInView, to, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};
