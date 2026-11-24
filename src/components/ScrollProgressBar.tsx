import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-white/[0.06]"
    >
      <motion.div
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
        className="h-full w-full origin-left bg-[#FF3B30]"
      />
    </div>
  );
}
