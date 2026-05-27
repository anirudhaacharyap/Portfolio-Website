"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const pageVariants = {
  initial: {
    opacity: 0,
    clipPath: "inset(100% 0 0 0)",
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.8,
      ease: EASE,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.4,
      ease: EASE,
    },
  },
} as const;

const childVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
} as const;

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children }: { children: ReactNode }) {
  return <motion.div variants={childVariants}>{children}</motion.div>;
}
