"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/app/lib/motion";

export function AboutSection() {
  return (
    <div className="min-h-[calc(100vh-104px)] px-6 md:px-10 lg:px-16 pt-20 md:pt-32 pb-24 flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
      {/* Left Column */}
      <motion.div
        className="w-full lg:w-1/2 space-y-8"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      >
        <p className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-widest text-[#00FE66] uppercase">
          I&apos;m Ani — backend engineer &amp; researcher
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-instrument)] font-normal tracking-tight text-white leading-[1.1]">
          Building systems that{" "}
          <span className="italic font-light text-[#c4c7c9]">scale</span>
          <br />
          and never{" "}
          <span className="italic font-light text-[#c4c7c9]">fail</span>.
        </h1>

        <div className="flex flex-wrap items-center gap-8 pt-8 opacity-30 grayscale contrast-125">
          {["Oasis", "Diseno Divino", "Forge", "Google"].map((brand) => (
            <span
              key={brand}
              className="font-[family-name:var(--font-jetbrains)] text-lg tracking-widest uppercase text-white"
            >
              {brand}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Right Column: Asymmetric Cards */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center card-container"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT_EXPO }}
      >
        <div className="relative w-full max-w-md h-[500px]">
          {/* Card 1: Violin — Bottom Right (rendered first = behind) */}
          <motion.div
            className="card-perspective absolute bottom-0 right-0 w-[280px] h-[340px] bg-[#1c1b1b] border border-[#444749] p-4 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="relative w-full h-[220px] overflow-hidden mb-4 bg-[#0B0B0C]">
              <Image
                src="/images/violin.png"
                alt="Shruti Sangama Creative Illustration"
                width={540}
                height={405}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="space-y-1">
              <div className="font-[family-name:var(--font-space-mono)] text-xs text-[#00FE66]">
                Shruti Sangama
              </div>
              <div className="font-[family-name:var(--font-jetbrains)] text-sm font-semibold tracking-[2px] text-white">
                Carnatic Violinist &amp; Creator
              </div>
            </div>
          </motion.div>

          {/* Card 2: Portrait — Top Left (rendered second = in front, overlaps musician) */}
          <motion.div
            className="card-perspective absolute top-0 left-0 w-[280px] h-[340px] bg-[#353434] border border-[#444749] p-4 group tag-trigger"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_EXPO }}
          >
            <div className="relative w-full h-[220px] overflow-hidden mb-4 bg-[#0B0B0C]">
              <Image
                src="/images/portrait.png"
                alt="Anirudha portrait"
                width={540}
                height={405}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                priority
              />
              <div className="absolute bottom-2 right-2 flex items-center bg-[#0B0B0C]/80 backdrop-blur-sm border border-[#444749] px-2 py-1 overflow-hidden">
                <span className="text-[14px] text-[#00FE66]">⬡</span>
                <div className="tag-expand">
                  <span className="font-[family-name:var(--font-space-mono)] text-[10px] ml-2 text-white">
                    DEV_IDENTITY
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-[family-name:var(--font-space-mono)] text-xs text-[#00FE66]">
                Anirudha
              </div>
              <div className="font-[family-name:var(--font-jetbrains)] text-sm font-semibold tracking-[2px] text-white">
                AI/ML &amp; Systems Engineer
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
