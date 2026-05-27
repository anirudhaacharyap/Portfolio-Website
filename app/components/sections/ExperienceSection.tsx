"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/app/lib/motion";

interface ExperienceNode {
  id: string;
  title: string;
  date?: string;
  description: string;
  metrics?: string[];
}

const EXPERIENCE_DATA: ExperienceNode[] = [
  {
    id: "google",
    title: "[GOOGLE // LEAD AMBASSADOR]",
    date: "Aug 2025 – Jan 2026",
    description:
      "Drove AI/ML adoption across NMIT, reaching 1,000+ students through hands-on developer workshops.",
    metrics: [
      "IMPACT_METRIC_01 // 1,000+ STUDENTS",
      "IMPACT_METRIC_02 // 500+ ATTENDEES PER VIBE-CODING EVENT",
    ],
  },
  {
    id: "oasis",
    title: "[OASIS ARENA // FOUNDER & SPONSORSHIP LEAD]",
    description:
      "Founded the premier campus Gaming & Esports Club, growing it to 200+ active members. Secured sponsorships and organized large-scale competitive tournaments.",
  },
  {
    id: "diseno",
    title: "[DISENO DIVINO // FOUNDER]",
    description:
      "Established the UI/UX & AI design collective at NMIT, conducting workshops on design systems, prototyping tools, and AI-assisted design workflows.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2 + i * 0.15, ease: EASE_OUT_EXPO },
  }),
};

export function ExperienceSection() {
  return (
    <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col">
      {/* Section Header */}
      <motion.div
        className="space-y-4 mb-14 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA] uppercase tracking-[0.1em]">
          SECTION_03 // ENGAGEMENT_HISTORY
        </div>
        <div className="border-b border-[#1A1A1C] pb-6">
          <h2 className="font-[family-name:var(--font-jetbrains)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter font-bold leading-tight">
            03 // PROFESSIONAL_LOGISTICS_&_IMPACT
          </h2>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 flex-1">
        {EXPERIENCE_DATA.map((node, i) => (
          <motion.div
            key={node.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#121214] border border-[#1A1A1C] p-8 md:p-10 group hover:bg-[#141313] transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#00e55b] opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />

            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 border-b border-[#1A1A1C] pb-5 gap-3">
              <h3 className="font-[family-name:var(--font-jetbrains)] text-base font-semibold tracking-[2px] text-white group-hover:text-[#00e55b] transition-colors">
                {node.title}
              </h3>
              {node.date && (
                <span className="font-[family-name:var(--font-space-mono)] text-[#A1A1AA] text-xs shrink-0">
                  {node.date}
                </span>
              )}
            </div>

            <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm leading-relaxed mb-6 max-w-3xl">
              {node.description}
            </p>

            {node.metrics && (
              <div className="flex flex-wrap gap-3">
                {node.metrics.map((metric) => (
                  <div
                    key={metric}
                    className="bg-[#1c1b1b] border border-[#1A1A1C] px-4 py-2.5 font-[family-name:var(--font-space-mono)] text-xs text-[#00e55b] tracking-wide"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
