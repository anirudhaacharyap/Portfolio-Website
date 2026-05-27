"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/app/lib/motion";

interface TechColumn {
  title: string;
  items: Array<{ name: string; badge?: string }>;
}

const TECH_COLUMNS: TechColumn[] = [
  {
    title: "Architecture & Core",
    items: [
      { name: "Java SE" },
      { name: "Java EE" },
      { name: "Python" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "C++" },
      { name: "Go" },
    ],
  },
  {
    title: "Backend & Runtime",
    items: [
      { name: "Servlets" },
      { name: "Spring Framework" },
      { name: "FastAPI" },
      { name: "Node.js" },
      { name: "REST APIs" },
      { name: "gRPC", badge: "< 20ms" },
      { name: "Kafka", badge: "< 20ms" },
      { name: "GraphQL" },
      { name: "Java MVC" },
    ],
  },
  {
    title: "Persistence & Deployment",
    items: [
      { name: "Oracle" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "MongoDB" },
      { name: "Firebase" },
      { name: "AWS" },
      { name: "Docker" },
      { name: "Git" },
      { name: "Linux" },
      { name: "CI/CD" },
    ],
  },
];

const columnVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.3 + i * 0.12, ease: EASE_OUT_EXPO },
  }),
};

export function TechStackSection() {
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
          ACTIVE DEPENDENCIES // SYSTEM.CONFIG
        </div>
        <div className="border-b border-[#1A1A1C] pb-6">
          <h2 className="font-[family-name:var(--font-jetbrains)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter font-bold leading-tight">
            02 // TECH_ENGINE_CAPABILITIES
          </h2>
        </div>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <motion.div
          className="lg:col-span-2 flex lg:flex-col gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <div className="border border-[#1A1A1C] p-4 lg:py-8 bg-[#121214] flex justify-center items-center">
            <span className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] uppercase tracking-widest hidden lg:block text-vertical">
              [RUNTIME: PROD]
            </span>
            <span className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] uppercase tracking-widest lg:hidden">
              [RUNTIME: PROD]
            </span>
          </div>
          <div className="border border-[#1A1A1C] p-4 lg:py-8 bg-[#121214] flex justify-center items-center">
            <span className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] uppercase tracking-widest hidden lg:block text-vertical">
              [INTEGRITY: OPTIMAL]
            </span>
            <span className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] uppercase tracking-widest lg:hidden">
              [INTEGRITY: OPTIMAL]
            </span>
          </div>
        </motion.div>

        {/* Tech Grid */}
        <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_COLUMNS.map((column, i) => (
            <motion.div
              key={column.title}
              custom={i}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8 hover:bg-[#141313] transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#00e55b] opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
              <div className="font-[family-name:var(--font-jetbrains)] text-sm font-bold text-white mb-5 border-b border-[#1A1A1C] pb-3 group-hover:text-[#00e55b] transition-colors">
                {column.title}
              </div>
              <ul className="text-[#E2E8F0] space-y-3 font-[family-name:var(--font-space-mono)] text-sm">
                {column.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-3">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] bg-[#00e55b]/20 text-[#00e55b] px-2 py-0.5 border border-[#00e55b]/30 font-[family-name:var(--font-space-mono)] font-bold whitespace-nowrap">
                        {item.badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* AI Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT_EXPO }}
            className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8 md:col-span-3 hover:bg-[#141313] transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#00e55b] opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-[#1A1A1C] pb-3 gap-3">
              <div className="font-[family-name:var(--font-jetbrains)] text-sm font-bold text-white group-hover:text-[#00e55b] transition-colors">
                [INTELLIGENT COMPUTE // AI &amp; LLM WORKFLOWS]
              </div>
              <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] border border-[#1A1A1C] px-3 py-1.5 bg-[#1c1b1b] whitespace-nowrap">
                MODEL: RL // DEEP_Q_NETWORKS
              </div>
            </div>
            <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm leading-relaxed">
              PyTorch, Agentic workflows, LLM tool-use, RAG pipelines, prompt engineering.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
