import { useTransform, MotionValue } from "motion/react";

/**
 * @param value The ScrollMotionValue (usually scrollYProgress)
 * @param distance The offset distance for the parallax effect
 */
export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}