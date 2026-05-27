"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/app/lib/motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      className="space-y-4 mb-14 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      {subtitle && (
        <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA] uppercase tracking-[0.1em]">
          {subtitle}
        </div>
      )}
      <div className="flex items-center border-b-[0.5px] pb-6 border-[#1A1A1C]">
        <h1 className="font-[family-name:var(--font-jetbrains)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter font-bold leading-tight">
          {number} {"//"} {title}
        </h1>
      </div>
    </motion.div>
  );
}
