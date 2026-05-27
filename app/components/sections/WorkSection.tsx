"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT_EXPO } from "@/app/lib/motion";

/* ── Telemetry Bar ── */
function TelemetryRow({ label, value, width }: { label: string; value: string; width: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center group">
        <span className="text-[#E2E8F0] group-hover:text-white transition-colors font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.05em]">
          {label}
        </span>
        <span className="text-[#00e55b] font-[family-name:var(--font-space-mono)] text-[10px] font-bold">
          {value}
        </span>
      </div>
      <div className="w-full bg-[#0B0B0C] h-1 mt-1">
        <motion.div
          className="bg-[#00e55b] h-1"
          initial={{ width: 0 }}
          animate={isInView ? { width } : { width: 0 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

const sectionReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export function WorkSection() {
  return (
    <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
      {/* ═══ SECTION 01: PRODUCTION SYSTEMS ═══ */}
      <motion.div
        className="space-y-4 mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA] uppercase tracking-[0.1em]">
          SECTION_01 // PRODUCTION_SYSTEMS
        </div>
        <div className="border-b border-[#1A1A1C] pb-6">
          <h2 className="font-[family-name:var(--font-jetbrains)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter font-bold leading-tight">
            01 // SHIPPED_PRODUCTION_SYSTEMS
          </h2>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="lg:col-span-4 font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#A1A1AA] space-y-4">
          <p>[SYSTEM_LOG: ARCHITECTURE_DEPLOYMENT]</p>
          <p className="font-normal text-sm leading-relaxed">
            Execution of high-throughput distributed systems. Focus on fault
            tolerance, latency reduction, and robust data pipelines.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-12">
          {/* VIBE APP */}
          <motion.div className="space-y-4" variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] font-semibold tracking-[2px] bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
              PROJECT::VIBE_APP
            </h3>
            <div className="bg-[#121214] border border-[#1A1A1C] p-6">
              <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] mb-4 border-b border-[#1A1A1C] pb-2 flex justify-between">
                <span>METADATA.JSON</span>
                <span>[READ_ONLY]</span>
              </div>
              <pre className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.05em] text-[#E2E8F0] whitespace-pre-wrap leading-relaxed">
{`{
  "stack": ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "gRPC", "Python", "Flutter"],
  "architecture": "Event-driven microservices",
  "throughput": "5,000+ events/day",
  "inference_latency": "< 20ms"
}`}
              </pre>
            </div>
            <div className="bg-[#121214] border border-[#1A1A1C] p-6">
              <div className="font-[family-name:var(--font-jetbrains)] text-[14px] font-bold text-white mb-2">ARCHITECTURE OVERVIEW</div>
              <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm leading-relaxed">
                Architected a distributed event-driven backend processing 5,000+ events/day over Kafka with zero message loss. Exposed music-taste ML microservice over gRPC achieving sub-20ms inference. Cut API p95 latency by 30% with Redis caching.
              </p>
            </div>
          </motion.div>

          {/* SCRAPING PLATFORM */}
          <motion.div className="space-y-4" variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] font-semibold tracking-[2px] bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
              PROJECT::MULTI_SOURCE_SCRAPING_PLATFORM
            </h3>
            <div className="bg-[#121214] border border-[#1A1A1C] p-6">
              <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm leading-relaxed">
                Built fault-tolerant ingestion pipelines across YouTube, Google Trends, and forums with auto-retry; composable API layer powering 50+ workflows using FastAPI, PostgreSQL, and Docker.
              </p>
            </div>
          </motion.div>

          {/* HELPDESK */}
          <motion.div className="space-y-4" variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] font-semibold tracking-[2px] bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
              PROJECT::HELPDESK_AUTOMATION_SYSTEM
            </h3>
            <div className="bg-[#121214] border border-[#1A1A1C] p-6">
              <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm leading-relaxed">
                Full-stack ticket management system managing 100+ support records. DAO-based persistence layer with JDBC and Oracle DB. Built on J2EE/Servlets MVC architecture.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full h-[0.5px] bg-[#1A1A1C] mb-24" />

      {/* ═══ SECTION 02: RESEARCH ═══ */}
      <motion.div
        className="space-y-4 mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA] uppercase tracking-[0.1em]">
          SECTION_02 // INTELLIGENT_COMPUTE_RESEARCH
        </div>
        <div className="border-b border-[#1A1A1C] pb-6">
          <h2 className="font-[family-name:var(--font-jetbrains)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter font-bold leading-tight">
            04 // ACADEMIC_INTELLIGENCE
          </h2>
        </div>
      </motion.div>

      <div className="space-y-12 mb-24">
        {/* MARL Research */}
        <motion.div
          className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8 space-y-6"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 border-b border-[#1A1A1C] pb-6">
            <div>
              <div className="text-[#00e55b] font-bold text-sm mb-2 inline-block px-2 py-1 bg-[#00e55b]/10 border border-[#00e55b]/30 font-[family-name:var(--font-space-mono)]">
                [STATUS: ACTIVE_RESEARCH]
              </div>
              <h3 className="text-white text-xl md:text-2xl font-bold font-[family-name:var(--font-jetbrains)] mt-2">
                Dependency-Aware Activation Scheduling in Multi-Agent Reinforcement Learning
              </h3>
            </div>
            <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#E2E8F0] text-right space-y-1 shrink-0">
              <p>MODEL: MARL-DAAS-v1.2</p>
              <p>EPOCHS: 50,000</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#1A1A1C] p-4 bg-[#0B0B0C]">
              <div className="text-[#00e55b] font-bold text-xs mb-2 border-b border-[#1A1A1C] pb-1 font-[family-name:var(--font-space-mono)]">INPUTS::TASK/AGENT</div>
              <ul className="font-[family-name:var(--font-space-mono)] text-[#E2E8F0] space-y-1 list-disc list-inside text-[11px]">
                <li>Task Dependency Graph (DAG)</li>
                <li>Agent Capabilities Matrix</li>
                <li>Resource Constraints</li>
                <li>Environment State Vector (s_t)</li>
              </ul>
            </div>
            <div className="border border-[#1A1A1C] p-4 bg-[#0B0B0C]">
              <div className="text-[#00e55b] font-bold text-xs mb-2 border-b border-[#1A1A1C] pb-1 font-[family-name:var(--font-space-mono)]">OUTPUTS::LEARNED_POLICY</div>
              <ul className="font-[family-name:var(--font-space-mono)] text-[#E2E8F0] space-y-1 list-disc list-inside text-[11px]">
                <li>Activation Sequence (a_t)</li>
                <li>Resource Allocation Vector</li>
                <li>Dynamic Task Re-assignment</li>
                <li>Cooperative Value Function (Q_tot)</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#1c1b1b] border border-[#1A1A1C] p-4">
            <div className="text-[#E2E8F0] text-xs mb-4 border-b border-[#1A1A1C] pb-2 flex items-center space-x-2 font-[family-name:var(--font-space-mono)]">
              <span className="w-2 h-2 bg-[#00e55b] inline-block pulse-green" />
              <span>TELEMETRY_MONITOR [REAL-TIME]</span>
            </div>
            <div className="space-y-3">
              <TelemetryRow label="Average Cumulative Reward" value="▲ +24.5%" width="75%" />
              <TelemetryRow label="Task Completion Time" value="▼ -18.2%" width="82%" />
              <TelemetryRow label="Coordination Efficiency" value="▲ +15.8%" width="68%" />
              <TelemetryRow label="Success Rate" value="98.5%" width="98.5%" />
              <TelemetryRow label="Training Convergence Speed" value="▲ 1.4x" width="85%" />
            </div>
          </div>
        </motion.div>

        {/* Cancer Research */}
        <motion.div
          className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="text-[#00e55b] font-bold text-lg border-b border-[#1A1A1C] pb-2 inline-block font-[family-name:var(--font-space-mono)] mb-4">
            PAPER_ID: RES-ML-01
          </div>
          <h3 className="text-white text-xl md:text-2xl font-bold font-[family-name:var(--font-jetbrains)] mb-8">
            Colorectal Cancer Classification via Hybrid Optimization &amp; Diffusion Transformers
          </h3>
          <div className="bg-[#0B0B0C] border border-[#1A1A1C] p-6 md:p-12">
            <div className="text-[#00e55b] mb-8 font-bold text-center border-b border-[#1A1A1C] pb-4 font-[family-name:var(--font-space-mono)]">
              [METRICS_EVALUATION]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { label: "AUC-ROC", value: "1.0000" },
                { label: "MCC", value: "0.9960" },
                { label: "95% CI Lower", value: "0.9950" },
              ].map((metric) => (
                <div key={metric.label} className="bg-[#2a2a2a] p-6 border border-[#1A1A1C]">
                  <div className="text-[#A1A1AA] text-sm mb-4 tracking-widest uppercase font-[family-name:var(--font-space-mono)]">
                    {metric.label}
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)]">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RL Pricing */}
        <motion.div
          className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8 space-y-4"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-[#00e55b] font-bold text-lg border-b border-[#1A1A1C] pb-2 inline-block font-[family-name:var(--font-space-mono)]">
            PAPER_ID: RES-RL-02
          </div>
          <h3 className="text-white text-xl font-bold font-[family-name:var(--font-jetbrains)]">
            Systematic Exploration of Reinforcement Learning for Dynamic Pricing in E-Commerce
          </h3>
          <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm">
            Models Investigated: Q-Learning, Deep Q-Networks (DQN)
          </p>
        </motion.div>
      </div>

      <div className="w-full h-[0.5px] bg-[#1A1A1C] mb-24" />

      {/* ═══ SECTION 03: OPEN SOURCE ═══ */}
      <motion.div
        className="space-y-4 mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA] uppercase tracking-[0.1em]">
          SECTION_03 // OPEN_SOURCE_CONTRIBUTIONS
        </div>
        <div className="border-b border-[#1A1A1C] pb-6">
          <h2 className="font-[family-name:var(--font-jetbrains)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter font-bold leading-tight">
            05 // GLOBAL_CONTRIBUTIONS
          </h2>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Evidently */}
        <div className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8 flex flex-col group hover:bg-[#141313] transition-colors">
          <div className="flex items-center space-x-2 mb-6 border-b border-[#1A1A1C] pb-4">
            <span className="text-[#00e55b] text-lg">⊕</span>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] font-semibold tracking-[2px] text-white">
              evidentlyai / evidently
            </h3>
          </div>
          <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] mb-4">ML OBSERVABILITY LIBRARY</div>
          <p className="text-[#E2E8F0] leading-relaxed mb-8 font-[family-name:var(--font-space-mono)] text-sm flex-grow">
            Contributions to the core observability platform. Focus on implementing and optimizing data drift modules for evaluating, testing, and monitoring ML models in production.
          </p>
          <div className="flex space-x-4 text-xs font-[family-name:var(--font-space-mono)] text-[#A1A1AA]">
            <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-blue-400" /><span>Python</span></span>
            <span className="flex items-center space-x-1"><span>★</span><span>4.5k</span></span>
            <span className="flex items-center space-x-1"><span>⑂</span><span>850</span></span>
          </div>
        </div>

        {/* XMem */}
        <div className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8 flex flex-col group hover:bg-[#141313] transition-colors">
          <div className="flex items-center space-x-2 mb-6 border-b border-[#1A1A1C] pb-4">
            <span className="text-[#00e55b] text-lg">⊕</span>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] font-semibold tracking-[2px] text-white">
              xmem-dev / xmem
            </h3>
          </div>
          <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] mb-4">THE MEMORY LAYER FOR AI</div>
          <p className="text-[#E2E8F0] leading-relaxed mb-6 font-[family-name:var(--font-space-mono)] text-sm">
            High-throughput data ingestion pathways and state management, significantly reducing system overhead.
          </p>
          <div className="bg-[#0e0e0e] p-4 border border-[#1A1A1C] mb-6">
            <div className="text-[#00e55b] text-xs mb-2 font-bold font-[family-name:var(--font-space-mono)]">ENDPOINT_IMPLEMENTATION</div>
            <div className="text-white font-[family-name:var(--font-jetbrains)] text-sm flex items-center space-x-2">
              <span className="text-[#00e55b] font-bold">POST</span>
              <span>/v1/memory/batch-ingest</span>
            </div>
          </div>
          <div className="mt-auto flex space-x-4 text-xs font-[family-name:var(--font-space-mono)] text-[#A1A1AA]">
            <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /><span>Go</span></span>
            <span className="flex items-center space-x-1"><span>★</span><span>1.2k</span></span>
            <span className="flex items-center space-x-1"><span>⑂</span><span>120</span></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
