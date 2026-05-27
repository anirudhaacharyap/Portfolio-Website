"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { EASE_OUT_EXPO } from "@/app/lib/motion";
import {
  Terminal as TerminalIcon,
  Cpu,
  Binary,
  Music,
  Activity,
  FolderOpen,
  RefreshCw,
  Sparkles,
  Play,
  Heart,
  ChevronRight
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/app/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Button } from "@/app/components/ui/button";
import { sendEmail } from "@/app/actions/send-email";

// ==========================================
// DATA DEFINITIONS & TYPES
// ==========================================

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

const SOCIAL_LINKS = [
  { label: "GITHUB", url: "https://github.com/anirudhaacharyap", protocol: "git://" },
  { label: "LINKEDIN", url: "https://linkedin.com/in/anirudhaacharyap", protocol: "https://" },
  { label: "EMAIL", url: "mailto:anirudhaacharyap@gmail.com", protocol: "mailto://" },
];

// ==========================================
// SUB-COMPONENTS FOR HIGH FIDELITY ANIMATIONS
// ==========================================

function TelemetryRow({ label, value, width }: { label: string; value: string; width: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between items-center group">
        <span className="text-[#E2E8F0] group-hover:text-white transition-colors font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.05em]">
          {label}
        </span>
        <span className="text-[#00FF66] font-[family-name:var(--font-space-mono)] text-[10px] font-bold">
          {value}
        </span>
      </div>
      <div className="w-full bg-[#0B0B0C] h-1 border border-[#1A1A1C]/50 relative overflow-hidden">
        <motion.div
          className="bg-[#00FF66] h-full absolute left-0 top-0"
          initial={{ width: 0 }}
          animate={isInView ? { width } : { width: 0 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.1 }}
        />
      </div>
    </div>
  );
}

// Staggered fade and rise for general blocks
const viewportAnimationConfig = {
  once: false,
  amount: 0.15,
};

const sectionRevealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

const cardStaggerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE_OUT_EXPO },
  }),
};

const metricContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const metricItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const experienceCardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};


// ==========================================
// MAIN COMPONENT
// ==========================================

export default function Home() {
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // 1. Global Scroll Progress Hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 2. Parallax and Scale controls for Hero Canvas scroll dynamics
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"],
  });

  const card1Y = useTransform(heroScrollY, [0, 1], [0, 50]);
  const card2Y = useTransform(heroScrollY, [0, 1], [0, -50]);
  const card1Scale = useTransform(heroScrollY, [0, 1], [1, 0.96]);
  const card2Scale = useTransform(heroScrollY, [0, 1], [1, 1.04]);

  // Form State logic for Contact Terminal
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // System Monitor States
  const [uptimeSeconds, setUptimeSeconds] = useState(847 * 3600 + 42 * 60 + 15);
  const [syncingPid, setSyncingPid] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeoutId: any;
    const triggerSync = () => {
      const pids = ["001", "002", "003", "004", "005"];
      const randomPid = pids[Math.floor(Math.random() * pids.length)];
      setSyncingPid(randomPid);

      setTimeout(() => {
        setSyncingPid(null);
      }, 1500);

      const nextDelay = 4000 + Math.random() * 2000;
      timeoutId = setTimeout(triggerSync, nextDelay);
    };

    timeoutId = setTimeout(triggerSync, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  const formatUptime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const handleProcessClick = (processName: string) => {
    if (processName === "vibe-app.backend" || processName === "kafka.message-broker" || processName === "postgres.connection-pool") {
      const elements = Array.from(document.querySelectorAll("h3"));
      const vibeElement = elements.find(el => el.textContent?.includes("PROJECT::VIBE_APP"));
      if (vibeElement) {
        vibeElement.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    } else if (processName === "research.pipeline") {
      const elements = Array.from(document.querySelectorAll("h3"));
      const researchElement = elements.find(el => el.textContent?.includes("RESEARCH_PIPELINE::MARL") || el.textContent?.includes("RESEARCH_PIPELINE::COLORECTAL_CANCER_CLASSIFICATION"));
      if (researchElement) {
        researchElement.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    } else if (processName === "alloy-advisor.api") {
      const elements = Array.from(document.querySelectorAll("h3"));
      const alloyElement = elements.find(el => el.textContent?.includes("ALLOY_ADVISOR"));
      if (alloyElement) {
        alloyElement.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);

    const result = await sendEmail(formState);
    setIsSending(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSendError(result.error || "An unexpected error occurred during transmission.");
    }
  }

  // About Me Section - Custom Tab and Terminal CLI states
  const [aboutTab, setAboutTab] = useState<"rigor" | "flow" | "harmony">("rigor");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    { command: "systeminit", output: <div className="text-zinc-500 font-mono">SYSTEM DIAGNOSTICS: INITIALIZATION COMPLETE. ALL SYSTEMS LOGICAL.</div> },
    { command: "systeminit", output: <div className="text-[#00FF66] font-mono">TYPE &apos;help&apos; TO COMMENCE PORTFOLIO SYSTEM EXPLORATION.</div> }
  ]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const [crcStep, setCrcStep] = useState<"extraction" | "selection" | "dit" | "calibration">("extraction");

  const isFirstRender = useRef(true);

  // Auto-scroll terminal log to bottom
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [terminalHistory]);

  function handleTerminalCommand(e: FormEvent) {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 font-mono text-zinc-400">
            <div className="text-white font-bold mb-1">AVAILABLE ENGINE COMMAND LOGS:</div>
            <div><span className="text-[#00FF66]">&apos;skills&apos;</span>     : Output verified core engineering capabilities grid.</div>
            <div><span className="text-[#00FF66]">&apos;specs&apos;</span>      : Output diagnostic hardware &amp; server latency specifications.</div>
            <div><span className="text-[#00FF66]">&apos;neofetch&apos;</span>   : Output system profile environment dashboard.</div>
            <div><span className="text-[#00FF66]">&apos;clear&apos;</span>      : Flush terminal diagnostic buffers.</div>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="space-y-1.5 font-mono text-zinc-400">
            <div className="text-white font-bold mb-1 border-b border-[#1A1A1C] pb-1">TECHNICAL CAPABILITIES CATALOG:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
              <div><span className="text-[#00FF66] font-bold">[LANGUAGES]</span> Java SE, Java EE, Python, TypeScript, JavaScript, C++, Go</div>
              <div><span className="text-[#00FF66] font-bold">[BACKEND]</span> Spring Framework, Servlets, FastAPI, Node.js, REST APIs, gRPC, Kafka, GraphQL, Spring MVC</div>
              <div><span className="text-[#00FF66] font-bold">[DATABASES]</span> Oracle, PostgreSQL, Redis, MongoDB, Firebase</div>
              <div><span className="text-[#00FF66] font-bold">[DEVOPS/CLOUD]</span> AWS, Docker, Linux, CI/CD, Git</div>
            </div>
          </div>
        );
        break;
      case "specs":
        output = (
          <div className="space-y-1 font-mono text-zinc-400">
            <div className="text-white font-bold mb-1">ENGINE OPERATIONAL SPECIFICATIONS:</div>
            <div>IDENTITY_NODE   : <span className="text-white font-semibold">ANI_0x4F9B</span></div>
            <div>CPU_CLOCK_CYCLE: <span className="text-[#00FF66] font-bold">4.80GHz // OVERCLOCKED</span></div>
            <div>ML_INFERENCE   : <span className="text-white">PyTorch RL DQN Agent active</span></div>
            <div>EVENT_ROUTING  : <span className="text-white">Kafka Message Queue active</span></div>
            <div>P95_LATENCY    : <span className="text-[#00FF66] font-semibold">&lt; 15ms target validation</span></div>
          </div>
        );
        break;
      case "neofetch":
        output = (
          <div className="flex gap-4 font-mono text-xs text-zinc-400">
            <div className="text-[#00FF66] font-bold leading-relaxed select-none hidden sm:block">
              {`   /\\_/\\
  ( o.o )
   > ^ <
 /|     |\\
  | | | |
  (_(_|_)`}
            </div>
            <div className="space-y-1 text-[11px] leading-relaxed">
              <div><span className="text-[#00FF66] font-bold">ani@anirudha-os</span></div>
              <div>------------------</div>
              <div><span className="text-[#00FF66]">OS</span>     : Next.js 16.2 / Vercel Host</div>
              <div><span className="text-[#00FF66]">Host</span>   : Portfolio Systems Core v4.8</div>
              <div><span className="text-[#00FF66]">Kernel</span> : TypeScript TSX Architecture</div>
              <div><span className="text-[#00FF66]">Shell</span>  : recruiter_dossier.sh</div>
              <div><span className="text-[#00FF66]">Theme</span>  : Cyber-Terminal Brutalist (Shadcn-inspired)</div>
              <div><span className="text-[#00FF66]">Memory</span> : 16GB virtual / 240KB runtime chunk</div>
            </div>
          </div>
        );
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        output = (
          <div className="text-[#FF0033] font-mono">
            COMMAND NOT RECOGNIZED: &quot;{cmd}&quot;. TYPE &apos;help&apos; TO LOG AVAILABLE INSTRUCTIONS.
          </div>
        );
    }

    setTerminalHistory(prev => [...prev, { command: cmd, output }]);
    setTerminalInput("");
  }

  return (
    <div className="relative min-h-screen bg-[#0B0B0C] select-none grid-bg">
      {/* Cinematic scroll progress bar positioned at the absolute top of the viewport */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#00FF66] z-[101] origin-left"
        aria-hidden="true"
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-logo-marquee {
          display: flex !important;
          flex-direction: row !important;
          flex-shrink: 0 !important;
          align-items: center !important;
          justify-content: space-around !important;
          min-width: 100% !important;
          animation: marquee 35s linear infinite !important;
        }
        .marquee-container:hover .animate-logo-marquee {
          animation-play-state: paused !important;
        }
        @keyframes scanlineDrift {
          from { background-position: 0 0; }
          to { background-position: 0 100%; }
        }
        .hero-scanlines::after {
          content: " ";
          display: block;
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(0, 255, 102, 0.035) 0px,
            rgba(0, 255, 102, 0.035) 2px,
            transparent 2px,
            transparent 6px
          );
          background-size: 100% 6px;
          animation: scanlineDrift 25s linear infinite;
        }
      `}} />

      <section
        id="about"
        ref={heroContainerRef}
        className="relative min-h-screen xl:min-h-[100vh] w-full flex flex-col justify-between pt-20 pb-4 overflow-hidden bg-transparent hero-scanlines"
      >

        {/* Centers the Hero content vertically within the remaining viewport height */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 relative z-10">

            {/* Left Column: Intro Copy */}
            <div className="w-full lg:w-[52%] space-y-5 z-10">
              <motion.p
                className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.05em] text-[#00FF66] uppercase tracking-widest font-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              >
                I&apos;m Ani — backend engineer &amp; researcher
              </motion.p>

              <motion.h1
                className="text-6xl lg:text-7xl font-[family-name:var(--font-instrument)] font-normal tracking-tight text-white leading-[1.1] max-w-xl"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.3
                    }
                  }
                }}
              >
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>Building</motion.span> <br />
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>systems</motion.span>{" "}
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>that</motion.span> <br />
                <motion.span className="inline-block italic font-serif font-light text-[#c4c7c9]" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>scale</motion.span>{" "}
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>and</motion.span>{" "}
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>never</motion.span> <br />
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>fail.</motion.span>
              </motion.h1>

              <motion.div
                className="flex flex-row items-center gap-4 pt-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.6
                    }
                  }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>
                  <a href="/ani_resume.pdf" download="ani_resume.pdf">
                    <Button
                      variant="outline"
                      className="px-5 py-2.5 rounded-[2px]"
                    >
                      [DOWNLOAD RESUME]
                    </Button>
                  </a>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}>
                  <a href="https://github.com/anirudhaacharyap" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="px-5 py-2.5 rounded-[2px]"
                    >
                      [GITHUB ↗]
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: SYSTEM_MONITOR widget */}
            <motion.div
              className="w-full lg:w-[48%] flex flex-col items-center justify-center pt-12 lg:pt-0 z-10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            >
              <Card className="w-full max-w-md bg-[#0B0B0C] border border-[#00FF66]/20 rounded-none shadow-none text-zinc-400 font-mono">
                <style dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes blockBlink {
                    50% { opacity: 0; }
                  }
                  .status-cursor {
                    animation: blockBlink 1s step-end infinite;
                  }
                  `
                }} />
                
                <CardHeader className="py-2.5 px-4 border-b border-[#00FF66]/20 flex flex-row items-center gap-2 space-y-0">
                  <span className="text-[#00FF66] font-bold">&gt;</span>
                  <span className="text-[10px] tracking-widest font-bold uppercase text-zinc-400">
                    SYSTEM_MONITOR // LIVE
                  </span>
                </CardHeader>
                
                <CardContent className="p-0">
                  <TooltipProvider>
                    <Table className="w-full border-none">
                      <TableHeader className="border-b border-[#00FF66]/20">
                        <TableRow className="border-b border-[#00FF66]/20 hover:bg-transparent">
                          <TableHead className="font-bold text-[10px] text-zinc-500 uppercase tracking-wider py-2 border-none pl-4">PID</TableHead>
                          <TableHead className="font-bold text-[10px] text-zinc-500 uppercase tracking-wider py-2 border-none">PROCESS</TableHead>
                          <TableHead className="font-bold text-[10px] text-zinc-500 uppercase tracking-wider py-2 border-none pr-4 text-right">STATUS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { pid: "001", name: "vibe-app.backend", originalStatus: "RUNNING", projectCardId: "vibe-app", tooltipText: "Social discovery app · Spring Boot · Kafka · PostGIS" },
                          { pid: "002", name: "research.pipeline", originalStatus: "ACTIVE", projectCardId: "research", tooltipText: "Cancer classification · DiT · BOA-WOA · LC25000" },
                          { pid: "003", name: "alloy-advisor.api", originalStatus: "DEPLOYED", projectCardId: "alloy-advisor", tooltipText: "AI metal alloy recommender · FastAPI · LLM" },
                          { pid: "004", name: "kafka.message-broker", originalStatus: "LISTENING", projectCardId: "vibe-app", tooltipText: "Event streaming · Kafka · gRPC · Redis" },
                          { pid: "005", name: "postgres.connection-pool", originalStatus: "HEALTHY", projectCardId: "vibe-app", tooltipText: "Persistence layer · PostgreSQL · PostGIS · Redis" }
                        ].map((row) => {
                          const isSyncing = syncingPid === row.pid;
                          return (
                            <TableRow key={row.pid} className="border-none hover:bg-transparent">
                              <TableCell className="text-[11px] text-zinc-600 py-2 border-none pl-4">{row.pid}</TableCell>
                              <TableCell className="text-[11px] py-2 border-none">
                                <Tooltip>
                                  <TooltipTrigger className="text-white hover:text-[#00FF66] transition-colors cursor-pointer text-left block w-full" onClick={() => handleProcessClick(row.name)}>
                                    {row.name}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {row.tooltipText}
                                  </TooltipContent>
                                </Tooltip>
                              </TableCell>
                              <TableCell className="text-[11px] py-2 border-none pr-4 text-right">
                                {isSyncing ? (
                                  <span className="text-zinc-600 transition-colors duration-200">
                                    SYNCING... <span className="status-cursor">▋</span>
                                  </span>
                                ) : (
                                  <span className="text-[#00FF66] transition-colors duration-200">
                                    {row.originalStatus} <span className="status-cursor">▋</span>
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TooltipProvider>

                  <Separator className="bg-[#00FF66]/20 h-[1px] w-full" />
                  
                  <div className="py-2.5 px-4 flex flex-row items-center justify-between text-[9px] tracking-wider text-zinc-500">
                    <div>
                      UPTIME: <span className="text-white font-bold">{formatUptime(uptimeSeconds)}</span>
                    </div>
                    <div>
                      THREADS: <span className="text-white font-bold">12</span>
                    </div>
                    <div>
                      MEM: <span className="text-white font-bold">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>

        {/* Marquee Row */}
        <motion.div 
          className="w-full flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
        >
          {/* Label */}
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-2">
            <span className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.15em] text-[#666666] uppercase">
              Collaborated with
            </span>
          </div>

          {/* Infinite Marquee logo scroll strip */}
          <div className="marquee-container relative w-full overflow-hidden select-none border-t border-b border-[#1A1A1C] py-3.5 flex flex-row bg-transparent">
            <div className="animate-logo-marquee flex flex-row shrink-0 items-center justify-around min-w-full gap-12 md:gap-16">
              <img src="/google-icon-logo-svgrepo-com.svg" alt="Google" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
              <img src="/Google_Gemini_icon_2025.svg" alt="Google Gemini" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
              <img src="/Vercel_logo_2025.svg" alt="Vercel" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
              <img src="/Bybit_Logo.svg" alt="ByBit" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
              <img src="/PlayStation_logo.svg" alt="PlayStation" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
            </div>
            <div className="animate-logo-marquee flex flex-row shrink-0 items-center justify-around min-w-full gap-12 md:gap-16" aria-hidden="true">
              <img src="/google-icon-logo-svgrepo-com.svg" alt="Google" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
              <img src="/Google_Gemini_icon_2025.svg" alt="Google Gemini" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
              <img src="/Vercel_logo_2025.svg" alt="Vercel" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
              <img src="/Bybit_Logo.svg" alt="ByBit" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
              <img src="/PlayStation_logo.svg" alt="PlayStation" className="h-[22px] md:h-[28px] w-auto object-contain select-none" style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.35 }} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================================================
          MAIN CONTENT AREA
          ================================================== */}
      <div className="w-full grid-bg bg-[#0B0B0C] relative z-10 pb-16 pt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-32">

          {/* SECTION 02: ABOUT ME (id="about-me") */}
          <section
            id="about-me"
            className="scroll-mt-20 pt-2 md:pt-4 pb-16 md:pb-24 relative z-10 w-full"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {}
              }}
            >
              <motion.div 
                className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.1em] mb-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                SECTION_02 // HUMAN_ELEMENT
              </motion.div>
              <motion.div 
                className="pb-4 mb-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } }
                }}
              >
                <h2 className="font-[family-name:var(--font-jetbrains)] text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter font-bold">
                  02 // ABOUT_ME
                </h2>
              </motion.div>
            </motion.div>

            {/* FIX 1: Forced tracking align-items to 'items-start' for clean layout boundaries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start w-full">

              {/* Left Column: Biography & Shadcn Tabs Console */}
              {/* FIX 2: Stripped out the bleeding lg:pl-16 override so text spans completely to the grid margins */}
              <motion.div 
                className="lg:col-span-7 space-y-8 flex flex-col justify-start h-full w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <motion.div 
                  className="space-y-6"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-base md:text-[17px] leading-relaxed font-light">
                    AI/ML &amp; Backend Engineer, Carnatic violinist, and dedicated product builder driven by the challenge of designing high-throughput systems and intelligent compute models. I approach software engineering as a disciplined art form where micro-spacing is precise, architecture is clean, and code is absolute.
                  </p>
                </motion.div>

                {/* Shadcn UI Tabs Component */}
                <motion.div 
                  className="space-y-4 pt-1 w-full"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="w-full bg-[#121214] border border-[#1A1A1C] p-1 rounded-lg flex gap-1">
                    <button
                      onClick={() => setAboutTab("rigor")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-[11px] font-mono rounded-md transition-all duration-200 cursor-pointer ${aboutTab === "rigor"
                        ? "bg-[#1C1C1E] text-[#00FF66] border border-[#2A2A2C] shadow-sm font-bold"
                        : "text-[#A1A1AA] hover:text-white border border-transparent"
                        }`}
                    >
                      <Binary className="w-3.5 h-3.5" />
                      <span>01 // RIGOR</span>
                    </button>
                    <button
                      onClick={() => setAboutTab("flow")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-[11px] font-mono rounded-md transition-all duration-200 cursor-pointer ${aboutTab === "flow"
                        ? "bg-[#1C1C1E] text-[#00FF66] border border-[#2A2A2C] shadow-sm font-bold"
                        : "text-[#A1A1AA] hover:text-white border border-transparent"
                        }`}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>02 // SYSTEMS</span>
                    </button>
                    <button
                      onClick={() => setAboutTab("harmony")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-[11px] font-mono rounded-md transition-all duration-200 cursor-pointer ${aboutTab === "harmony"
                        ? "bg-[#1C1C1E] text-[#00FF66] border border-[#2A2A2C] shadow-sm font-bold"
                        : "text-[#A1A1AA] hover:text-white border border-transparent"
                        }`}
                    >
                      <Music className="w-3.5 h-3.5" />
                      <span>03 // HARMONY</span>
                    </button>
                  </div>

                  {/* Tabs Panels Container */}
                  <div className="min-h-[220px] w-full">
                    {aboutTab === "rigor" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-[#121214] border border-[#1A1A1C] rounded-lg p-5 font-mono text-[11px] leading-relaxed relative overflow-hidden group shadow-xl w-full"
                      >
                        <div className="flex justify-between items-center text-[#666666] border-b border-[#1A1A1C] pb-3 mb-4 select-none">
                          <span className="flex items-center gap-2">
                            <FolderOpen className="w-3.5 h-3.5 text-[#00FF66]" />
                            <span>reinforcement_learning.py</span>
                          </span>
                          <span className="text-[10px]">Python 3.11</span>
                        </div>
                        <div className="space-y-1 text-[#E2E8F0] select-text overflow-x-auto whitespace-pre font-mono">
                          <div><span className="text-[#666666] mr-4 select-none">1</span><span className="text-[#00FF66]">import</span> torch.nn <span className="text-[#00FF66]">as</span> nn</div>
                          <div><span className="text-[#666666] mr-4 select-none">2</span></div>
                          <div><span className="text-[#666666] mr-4 select-none">3</span><span className="text-[#00FF66]">class</span> <span className="text-white font-bold">PolicyNetwork</span>(nn.Module):</div>
                          <div><span className="text-[#666666] mr-4 select-none">4</span>    <span className="text-[#00FF66]">def</span> <span className="text-white">__init__</span>(self, state_dim, action_dim):</div>
                          <div><span className="text-[#666666] mr-4 select-none">5</span>        super().__init__()</div>
                          <div><span className="text-[#666666] mr-4 select-none">6</span>        self.network = nn.Sequential(</div>
                          <div><span className="text-[#666666] mr-4 select-none">7</span>            nn.Linear(state_dim, <span className="text-[#00FF66]">128</span>),</div>
                          <div><span className="text-[#666666] mr-4 select-none">8</span>            nn.ReLU(),</div>
                          <div><span className="text-[#666666] mr-4 select-none">9</span>            nn.Linear(<span className="text-[#00FF66]">128</span>, action_dim)</div>
                          <div><span className="text-[#666666] mr-4 select-none">10</span>        )</div>
                        </div>
                      </motion.div>
                    )}

                    {aboutTab === "flow" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                      >
                        <div className="bg-[#121214] border border-[#1A1A1C] rounded-lg p-5 flex flex-col justify-between group hover:border-[#00FF66] transition-all duration-300">
                          <div className="flex justify-between items-center text-[#666666] mb-3 select-none">
                            <span className="text-[10px] font-mono tracking-wider">LATENCY_P95</span>
                            <Activity className="w-3.5 h-3.5 text-[#00FF66] animate-pulse" />
                          </div>
                          <div className="text-2xl font-bold text-white tracking-tight font-mono flex items-baseline gap-1">
                            12.4 <span className="text-xs text-[#666666] font-normal">ms</span>
                          </div>
                          <p className="text-[10px] text-[#A1A1AA] font-mono mt-2">API round-trip gRPC server response.</p>
                        </div>

                        <div className="bg-[#121214] border border-[#1A1A1C] rounded-lg p-5 flex flex-col justify-between group hover:border-[#00FF66] transition-all duration-300">
                          <div className="flex justify-between items-center text-[#666666] mb-3 select-none">
                            <span className="text-[10px] font-mono tracking-wider">KAFKA_ROUTING</span>
                            <div className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
                          </div>
                          <div className="text-2xl font-bold text-white tracking-tight font-mono flex items-baseline gap-1">
                            99.999<span className="text-xs text-[#00FF66] font-normal">%</span>
                          </div>
                          <p className="text-[10px] text-[#A1A1AA] font-mono mt-2">Zero packet drop message guarantee.</p>
                        </div>

                        <div className="bg-[#121214] border border-[#1A1A1C] rounded-lg p-5 flex flex-col justify-between group hover:border-[#00FF66] transition-all duration-300">
                          <div className="flex justify-between items-center text-[#666666] mb-3 select-none">
                            <span className="text-[10px] font-mono tracking-wider">REDIS_CACHE_HIT</span>
                            <RefreshCw className="w-3.5 h-3.5 text-zinc-600 group-hover:rotate-180 transition-transform duration-700" />
                          </div>
                          <div className="text-2xl font-bold text-white tracking-tight font-mono flex items-baseline gap-1">
                            94.2 <span className="text-xs text-[#666666] font-normal">%</span>
                          </div>
                          <p className="text-[10px] text-[#A1A1AA] font-mono mt-2">Optimal key-value eviction rates.</p>
                        </div>

                        <div className="bg-[#121214] border border-[#1A1A1C] rounded-lg p-5 flex flex-col justify-between group hover:border-[#00FF66] transition-all duration-300">
                          <div className="flex justify-between items-center text-[#666666] mb-3 select-none">
                            <span className="text-[10px] font-mono tracking-wider">CONCURRENT_THREADS</span>
                            <Cpu className="w-3.5 h-3.5 text-[#00FF66]" />
                          </div>
                          <div className="text-2xl font-bold text-white tracking-tight font-mono">
                            1,024 <span className="text-xs text-[#666666] font-normal">Active</span>
                          </div>
                          <p className="text-[10px] text-[#A1A1AA] font-mono mt-2">Virtualized execution fibers scale.</p>
                        </div>
                      </motion.div>
                    )}

                    {aboutTab === "harmony" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-[#121214] border border-[#1A1A1C] rounded-lg p-5 font-mono text-[11px] leading-relaxed relative overflow-hidden group shadow-xl w-full"
                      >
                        <div className="flex justify-between items-center text-[#666666] border-b border-[#1A1A1C] pb-3 mb-4 select-none">
                          <span className="flex items-center gap-2">
                            <Music className="w-3.5 h-3.5 text-[#00FF66]" />
                            <span>Carnatic Violin Pitch Tracker</span>
                          </span>
                          <span className="text-[#00FF66] font-bold animate-pulse">440.0 Hz (A4)</span>
                        </div>

                        <div className="h-32 flex items-end justify-center gap-1.5 relative px-4 select-none mb-2">
                          {[25, 40, 65, 80, 45, 30, 55, 75, 95, 80, 60, 45, 70, 85, 50, 35, 60, 80, 50, 25].map((h, i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 bg-[#00FF66]/80 rounded-full"
                              initial={{ height: 10 }}
                              animate={{ height: [h * 0.4, h, h * 0.6, h * 0.3, h * 0.4] }}
                              transition={{
                                duration: 1.5 + (i % 3) * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                            <svg className="w-full h-full" viewBox="0 0 400 100" fill="none">
                              <path
                                d="M0,50 Q50,10 100,50 T200,50 T300,50 T400,50"
                                stroke="#00FF66"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#1A1A1C]/50 flex justify-between items-center text-[10px] text-[#A1A1AA] select-none">
                          <span>Svara: SA ➔ RI ➔ GA (Gamakas calibrated)</span>
                          <span>DSP Filter: Active</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: Interactive Diagnostic CLI Console */}
              {/* FIX 3: Set full-width scaling layout targets on the shell component */}
              <div className="lg:col-span-5 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
                  className="w-full bg-[#121214] border border-[#1A1A1C] rounded-lg shadow-2xl relative overflow-hidden flex flex-col h-[400px]"
                >
                  {/* CLI Header bar */}
                  <div className="bg-[#1C1C1E] border-b border-[#1A1A1C] px-4 py-3 flex items-center justify-between select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF0033]/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFD18D]/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66]/70" />
                      <span className="text-[#A1A1AA] ml-3 text-[10px] font-mono">recruiter_dossier.sh</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#00FF66] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" />
                      ONLINE
                    </span>
                  </div>

                  {/* CLI Log view */}
                  <div ref={terminalContainerRef} className="flex-1 p-4 overflow-y-auto font-mono text-[10px] md:text-[11px] leading-relaxed space-y-3 scrollbar-thin text-[#E2E8F0] select-text">
                    {terminalHistory.map((item, index) => (
                      <div key={index} className="space-y-1">
                        {item.command !== "systeminit" && (
                          <div className="text-[#666666] font-bold">
                            ani_os:~ $ <span className="text-[#E2E8F0] font-normal">{item.command}</span>
                          </div>
                        )}
                        <div className="pl-2 border-l border-[#1A1A1C]">{item.output}</div>
                      </div>
                    ))}
                  </div>

                  {/* CLI Interactive Input Form */}
                  <form
                    onSubmit={handleTerminalCommand}
                    className="flex items-center gap-2 px-4 py-3 border-t border-[#1A1A1C]/50 bg-[#0B0B0C]"
                  >
                    <span className="text-[#00FF66] font-mono text-[11px] font-bold select-none">ani_os:~ $</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent text-white border-none outline-none caret-[#00FF66] font-mono text-[11px] w-full focus:ring-0 p-0"
                      placeholder="Type 'help'..."
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </form>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SECTION 03: DOSSIER RECORDS & PROJECTS (id="projects") */}
          <section
            id="projects"
            className="scroll-mt-20 space-y-12 w-full"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {}
              }}
            >
              <motion.div 
                className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.1em]"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                SECTION_03 // PROOF_OF_WORK
              </motion.div>
              <motion.div 
                className="flex items-center border-b-[0.5px] pb-4 border-[#1A1A1C]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } }
                }}
              >
                <h2 className="font-[family-name:var(--font-jetbrains)] text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter font-bold">
                  03 // DOSSIER_RECORDS_&amp;_PROJECTS
                </h2>
              </motion.div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div 
                className="lg:col-span-4 text-[#A1A1AA] font-[family-name:var(--font-space-mono)] space-y-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-[10px] font-bold">[DOSSIER_LOG: COMPUTE_INTEGRITY]</p>
                <p className="text-[10px] leading-[1.5] tracking-[0.1em] font-normal">
                  Execution of high-throughput production microservices alongside deep reinforcement learning research. Focus on algorithmic efficiency, synchronization models, and robust computational systems.
                </p>
              </motion.div>
              <motion.div 
                className="lg:col-span-8 space-y-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.12
                    }
                  }
                }}
              >
                {/* Project 1: VIBE_APP */}
                <motion.section 
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
                      PROJECT::VIBE_APP
                    </h3>
                    <a
                      href="https://github.com/anirudhaacharyap/Vibe-App"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 bg-[#121214] border border-[#1A1A1C] hover:border-[#00FF66] text-[#A1A1AA] hover:text-[#00FF66] transition-colors rounded-none group cursor-pointer"
                      title="View GitHub Repository"
                    >
                      <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.5px] bg-[#1A1A1C] border border-[#1A1A1C]">
                    <div className="bg-[#121214] p-6 flex flex-col group hover:bg-[#141313] transition-colors relative overflow-hidden md:col-span-2">
                      <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                      <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00FF66] mb-4 border-b border-[#1A1A1C] pb-2 inline-flex justify-between w-full">
                        <span>METADATA.JSON</span>
                        <span>[READ_ONLY]</span>
                      </div>
                      <pre className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.1em] leading-[1.5] font-normal text-[#E2E8F0] whitespace-pre-wrap">{`{
  "id": "VIB-001",
  "stack": ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "gRPC", "Python", "Flutter"],
  "architecture": "Event-driven microservices",
  "throughput": "5,000+ events/day",
  "inference_latency": "< 20ms"
  }`}</pre>
                    </div>
                    <div className="bg-[#121214] p-6 md:col-span-2 group">
                      <div className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] font-bold text-white mb-2 group-hover:text-[#00FF66] transition-colors">
                        ARCHITECTURE OVERVIEW
                      </div>
                      <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-[10px] font-normal tracking-[0.1em] leading-[1.5] leading-relaxed">
                        Architected a distributed event-driven backend processing 5,000+ events/day over Kafka with zero message loss under sustained load. Exposed music-taste ML microservice over gRPC achieving sub-20ms inference round-trip. Cut API p95 latency by 30% with Redis caching.
                      </p>
                    </div>
                  </div>
                </motion.section>

                {/* Project 2: FORGE */}
                <motion.section 
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
                      PROJECT::FORGE
                    </h3>
                    <a
                      href="https://github.com/anirudhaacharyap/Forge_App.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 bg-[#121214] border border-[#1A1A1C] hover:border-[#00FF66] text-[#A1A1AA] hover:text-[#00FF66] transition-colors rounded-none group cursor-pointer"
                      title="View GitHub Repository"
                    >
                      <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.5px] bg-[#1A1A1C] border border-[#1A1A1C]">
                    <div className="bg-[#121214] p-6 flex flex-col group hover:bg-[#141313] transition-colors relative overflow-hidden md:col-span-2">
                      <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                      <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00FF66] mb-4 border-b border-[#1A1A1C] pb-2 inline-flex justify-between w-full">
                        <span>METADATA.JSON</span>
                        <span>[READ_ONLY]</span>
                      </div>
                      <pre className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.1em] leading-[1.5] font-normal text-[#E2E8F0] whitespace-pre-wrap">{`{
  "id": "FRG-002",
  "stack": ["FastAPI 0.111", "MongoDB Atlas (Motor)", "Google Gemini 3 Flash", "Sarvam Bulbul (en/hi/kn)", "ReportLab PDF", "slowapi", "cachetools"],
  "architecture": "Asynchronous Agentic Multimodal Orchestration",
  "async_strategy": "Native async via client.aio",
  "accolades": "Top 10 @ Codex Hackathon // Top 3 @ Vibeathon"
  }`}</pre>
                    </div>
                    <div className="bg-[#121214] p-6 md:col-span-2 group">
                      <div className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] font-bold text-white mb-2 group-hover:text-[#00FF66] transition-colors">
                        SYSTEM ARCHITECTURE &amp; AGENTIC PIPELINE
                      </div>
                      <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-[10px] font-normal tracking-[0.1em] leading-[1.5] leading-relaxed">
                        Engineered Forge, a high-performance voice-enabled agentic platform. Built on FastAPI 0.111 with MongoDB Atlas (utilizing the Motor asynchronous driver for non-blocking I/O) and custom slowapi rate-limiting. Orchestrated an asynchronous AI pipeline using Google Gemini 3 Flash via the google-genai native client.aio interface for concurrent NLP + Vision multimodal reasoning. Integrated Sarvam Bulbul TTS for low-latency en-IN, hi-IN, and kn-IN speech synthesis. Rendered dynamic documents via ReportLab PDF, query locations via Google Maps Places API, and in-memory caching using cachetools TTLCache. Secured Top 10 standing in the Codex Hackathon and Top 3 in the Vibeathon.
                      </p>
                    </div>
                  </div>
                </motion.section>

                {/* Project 3: HELPDESK_SUPPORT_TICKET_AUTOMATION */}
                <motion.section 
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
                      PROJECT::HELPDESK_SUPPORT_TICKET_AUTOMATION
                    </h3>
                    <a
                      href="https://github.com/anirudhaacharyap/HelpDesk_Automation_new.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 bg-[#121214] border border-[#1A1A1C] hover:border-[#00FF66] text-[#A1A1AA] hover:text-[#00FF66] transition-colors rounded-none group cursor-pointer"
                      title="View GitHub Repository"
                    >
                      <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.5px] bg-[#1A1A1C] border border-[#1A1A1C]">
                    <div className="bg-[#121214] p-6 flex flex-col group hover:bg-[#141313] transition-colors relative overflow-hidden md:col-span-2">
                      <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                      <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00FF66] mb-4 border-b border-[#1A1A1C] pb-2 inline-flex justify-between w-full">
                        <span>METADATA.JSON</span>
                        <span>[READ_ONLY]</span>
                      </div>
                      <pre className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.1em] leading-[1.5] font-normal text-[#E2E8F0] whitespace-pre-wrap">{`{
  "id": "HLP-003",
  "stack": ["Java 17", "Jakarta Servlets", "JSP", "Oracle XE", "JDBC (no ORM)", "BCrypt", "iText 5", "Tomcat 10"],
  "architecture": "Zero-Framework Enterprise Web Engine (No Spring/JSTL)",
  "scoring_engines": "PriorityEngine (Keyword Weight) // SLAEngine (Deadline Calculations)"
  }`}</pre>
                    </div>
                    <div className="bg-[#121214] p-6 md:col-span-2 group">
                      <div className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] font-bold text-white mb-2 group-hover:text-[#00FF66] transition-colors">
                        SYSTEM ARCHITECTURE &amp; LOW-LEVEL SQL EXECUTION
                      </div>
                      <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-[10px] font-normal tracking-[0.1em] leading-[1.5] leading-relaxed">
                        Architected an enterprise-level IT Helpdesk support ticket system without modern framework abstractions (no Spring Boot, no JSTL). Written completely in pure Jakarta Servlets and JSP scriptlets, driving low-latency native SQL queries over JDBC direct to an Oracle Database XE instance. Integrated a keyword-weighted PriorityEngine that dynamically scores incoming tickets to assign priority status (Critical/High/Medium/Low) alongside a custom SLAEngine for automated due-date calculations and real-time breach alerts. Implemented secure BCrypt user password hashing, asynchronous AJAX knowledge-base queries, and iText 5 report engines for administrative PDF dashboard compilation.
                      </p>
                    </div>
                  </div>
                </motion.section>

                {/* Project 4: N8N_WORKFLOW_POPULARITY_TRACKER */}
                <motion.section 
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
                      PROJECT::N8N_WORKFLOW_POPULARITY_TRACKER
                    </h3>
                    <a
                      href="https://github.com/anirudhaacharyap/n8n-Workflow-Popularity-System.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 bg-[#121214] border border-[#1A1A1C] hover:border-[#00FF66] text-[#A1A1AA] hover:text-[#00FF66] transition-colors rounded-none group cursor-pointer"
                      title="View GitHub Repository"
                    >
                      <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.5px] bg-[#1A1A1C] border border-[#1A1A1C]">
                    <div className="bg-[#121214] p-6 flex flex-col group hover:bg-[#141313] transition-colors relative overflow-hidden md:col-span-2">
                      <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                      <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00FF66] mb-4 border-b border-[#1A1A1C] pb-2 inline-flex justify-between w-full">
                        <span>METADATA.JSON</span>
                        <span>[READ_ONLY]</span>
                      </div>
                      <pre className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.1em] leading-[1.5] font-normal text-[#E2E8F0] whitespace-pre-wrap">{`{
  "id": "N8N-004",
  "stack": ["FastAPI", "Python 3.10+", "PostgreSQL 15", "Async SQLAlchemy", "Alembic", "Docker Compose", "pytest"],
  "architecture": "Asynchronous Multi-Source Analytics & Scraper Engine",
  "automation": "Daily/Weekly background cron cycles via APScheduler",
  "novelty_analytics": "Geographic Divergence Metrics // Predictive Trending"
  }`}</pre>
                    </div>
                    <div className="bg-[#121214] p-6 md:col-span-2 group">
                      <div className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] font-bold text-white mb-2 group-hover:text-[#00FF66] transition-colors">
                        ASYNCHRONOUS SCALABILITY &amp; GEOGRAPHIC DIVERGENCE
                      </div>
                      <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-[10px] font-normal tracking-[0.1em] leading-[1.5] leading-relaxed">
                        Engineered a production-ready asynchronous web scraping and popularity tracking system designed to ingest, score, and rank n8n community workflow utilization across multiple web platforms. Developed background workers utilizing Python, FastAPI, and PostgreSQL 15 (orchestrated with Async SQLAlchemy and Alembic) wrapped in high-integrity Docker containers. Integrates public YouTube Video APIs, discourse n8n Community Forums, and Google Trends data to analyze engagement metrics. Incorporates sophisticated novelty analytics, including Geographic Divergence monitoring to isolate regionally trending workflow anomalies (e.g., popular in India but not the US) and predictive regression algorithms. Automated with daily/weekly APScheduler crons and validated through modular pytest integration suites.
                      </p>
                    </div>
                  </div>
                </motion.section>

                {/* Research Pipeline 1: MARL RESEARCH_PIPELINE */}
                <motion.section 
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
                    RESEARCH_PIPELINE::MARL
                  </h3>
                  <div className="bg-[#121214] border-[0.5px] border-[#1A1A1C] p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 border-b-[0.5px] border-[#1A1A1C] pb-6">
                      <div>
                        <div className="text-[#00FF66] font-bold text-sm mb-2 inline-block px-2 py-1 bg-[#00FF66]/10 border border-[#00FF66]/30 font-[family-name:var(--font-space-mono)]">
                          [STATUS: ACTIVE_RESEARCH]
                        </div>
                        <h4 className="text-white text-2xl font-bold font-[family-name:var(--font-jetbrains)]">
                          Dependency-Aware Activation Scheduling in Multi-Agent Reinforcement Learning
                        </h4>
                      </div>
                      <div className="font-[family-name:var(--font-space-mono)] text-[#E2E8F0] text-right space-y-1 shrink-0 text-[10px]">
                        <p>MODEL: MARL-DAAS-v1.2</p>
                        <p>EPOCHS: 50,000</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 border-[0.5px] border-[#1A1A1C] p-4 bg-[#0B0B0C]">
                        <div className="text-[#00FF66] font-bold text-xs mb-2 border-b-[0.5px] border-[#1A1A1C] pb-1 font-[family-name:var(--font-space-mono)]">
                          INPUTS::TASK/AGENT
                        </div>
                        <ul className="font-[family-name:var(--font-space-mono)] text-[#E2E8F0] space-y-1 list-disc list-inside text-sm">
                          <li>Task Dependency Graph (DAG)</li>
                          <li>Agent Capabilities Matrix</li>
                          <li>Resource Constraints</li>
                          <li>Environment State Vector (s_t)</li>
                        </ul>
                      </div>
                      <div className="space-y-2 border-[0.5px] border-[#1A1A1C] p-4 bg-[#0B0B0C]">
                        <div className="text-[#00FF66] font-bold text-xs mb-2 border-b-[0.5px] border-[#1A1A1C] pb-1 font-[family-name:var(--font-space-mono)]">
                          OUTPUTS::LEARNED_POLICY
                        </div>
                        <ul className="font-[family-name:var(--font-space-mono)] text-[#E2E8F0] space-y-1 list-disc list-inside text-sm">
                          <li>Activation Sequence (a_t)</li>
                          <li>Resource Allocation Vector</li>
                          <li>Dynamic Task Re-assignment</li>
                          <li>Cooperative Value Function (Q_tot)</li>
                        </ul>
                      </div>
                    </div>
                    {/* 5-row terminal monitor */}
                    <div className="bg-[#1c1b1b] border-[0.5px] border-[#1A1A1C] p-4 font-[family-name:var(--font-space-mono)]">
                      <div className="text-[#E2E8F0] text-xs mb-4 border-b-[0.5px] border-[#1A1A1C] pb-2 inline-flex items-center space-x-2 w-full">
                        <span className="w-2 h-2 bg-[#00FF66] inline-block animate-pulse"></span>
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
                  </div>
                </motion.section>

                {/* Research Pipeline 2: COLORECTAL_CANCER_CLASSIFICATION */}
                <motion.section 
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
                    RESEARCH_PIPELINE::COLORECTAL_CANCER_CLASSIFICATION
                  </h3>
                  <div className="bg-[#121214] border-[0.5px] border-[#1A1A1C] p-6 md:p-8 space-y-8">
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b-[0.5px] border-[#1A1A1C] pb-4">
                        <div className="text-[#00FF66] font-bold text-sm inline-block px-2 py-1 bg-[#00FF66]/10 border border-[#00FF66]/30 font-[family-name:var(--font-space-mono)]">
                          PAPER_ID: RES-ML-01
                        </div>
                        <span className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-[10px] tracking-wider">
                          DATASET: LC25000 HistoPathology
                        </span>
                      </div>
                      <h4 className="text-white text-2xl font-bold font-[family-name:var(--font-jetbrains)] leading-tight">
                        Colorectal Cancer Classification via Hybrid Optimization &amp; Diffusion Transformers
                      </h4>
                      <p className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-xs leading-relaxed max-w-3xl">
                        Deep learning research pipeline for high-integrity binary classification of colon histopathology images (Benign vs. Adenocarcinoma). Leverages a novel **Hybrid Butterfly-Whale Optimization Algorithm (BOA-WOA)** for hyper-dimensional feature selection and a **Diffusion Transformer (DiT)** classifier with adaLN-Zero conditioning.
                      </p>

                      {/* Shadcn UI Interactive Pipeline Stepper */}
                      <div className="space-y-4 pt-2 w-full">
                        <div className="w-full bg-[#0B0B0C] border border-[#1A1A1C] p-1 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-1">
                          <button
                            onClick={() => setCrcStep("extraction")}
                            className={`flex items-center justify-center gap-2 py-2.5 px-2 text-[10px] font-mono rounded-md transition-all duration-200 cursor-pointer ${crcStep === "extraction"
                              ? "bg-[#1C1C1E] text-[#00FF66] border border-[#2A2A2C] shadow-sm font-bold"
                              : "text-[#A1A1AA] hover:text-white border border-transparent"
                              }`}
                          >
                            <span>01 // EXTRACTION</span>
                          </button>
                          <button
                            onClick={() => setCrcStep("selection")}
                            className={`flex items-center justify-center gap-2 py-2.5 px-2 text-[10px] font-mono rounded-md transition-all duration-200 cursor-pointer ${crcStep === "selection"
                              ? "bg-[#1C1C1E] text-[#00FF66] border border-[#2A2A2C] shadow-sm font-bold"
                              : "text-[#A1A1AA] hover:text-white border border-transparent"
                              }`}
                          >
                            <span>02 // OPTIMIZATION</span>
                          </button>
                          <button
                            onClick={() => setCrcStep("dit")}
                            className={`flex items-center justify-center gap-2 py-2.5 px-2 text-[10px] font-mono rounded-md transition-all duration-200 cursor-pointer ${crcStep === "dit"
                              ? "bg-[#1C1C1E] text-[#00FF66] border border-[#2A2A2C] shadow-sm font-bold"
                              : "text-[#A1A1AA] hover:text-white border border-transparent"
                              }`}
                          >
                            <span>03 // DIT_MODEL</span>
                          </button>
                          <button
                            onClick={() => setCrcStep("calibration")}
                            className={`flex items-center justify-center gap-2 py-2.5 px-2 text-[10px] font-mono rounded-md transition-all duration-200 cursor-pointer ${crcStep === "calibration"
                              ? "bg-[#1C1C1E] text-[#00FF66] border border-[#2A2A2C] shadow-sm font-bold"
                              : "text-[#A1A1AA] hover:text-white border border-transparent"
                              }`}
                          >
                            <span>04 // CALIBRATION</span>
                          </button>
                        </div>

                        {/* Steps Panel Viewports */}
                        <div className="min-h-[190px] w-full bg-[#0B0B0C] border border-[#1A1A1C] p-5 rounded-lg flex flex-col justify-between font-mono text-[11px] leading-relaxed relative overflow-hidden group shadow-xl">
                          {crcStep === "extraction" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="space-y-4 w-full"
                            >
                              <div className="text-[#00FF66] font-bold border-b border-[#1A1A1C] pb-2 flex justify-between items-center">
                                <span>[STAGE 01: MULTI-BACKBONE FEATURE EXTRACTION]</span>
                                <span className="text-[10px] text-zinc-500">Concatenated Feature Space</span>
                              </div>
                              <p className="text-zinc-400">
                                Extracts highly robust spatial and topological representations from colon histopathology slides using three distinct pretrained neural backbones:
                              </p>
                              <div className="space-y-2">
                                <TelemetryRow label="ResNet-50 Feature Space" value="2048-dim" width="53%" />
                                <TelemetryRow label="DenseNet-121 Feature Space" value="1024-dim" width="27%" />
                                <TelemetryRow label="Vision Transformer (ViT-B/16)" value="768-dim" width="20%" />
                                <div className="pt-1 flex justify-between text-[10px] text-[#00FF66] font-bold">
                                  <span>TOTAL ASSEMBLED FEATURES:</span>
                                  <span>3,840-dimensional Vector (Cached)</span>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {crcStep === "selection" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="space-y-3 w-full"
                            >
                              <div className="text-[#00FF66] font-bold border-b border-[#1A1A1C] pb-2 flex justify-between items-center">
                                <span>[STAGE 02: HYBRID BOA-WOA SELECTION ENGINE]</span>
                                <span className="text-[10px] text-zinc-500">Metaheuristic Masking</span>
                              </div>
                              <p className="text-zinc-400">
                                Applies a synchronized **Hybrid Butterfly-Whale Optimization Algorithm** to select optimal features, discarding computational noise and avoiding overfitting.
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div className="border border-[#1A1A1C] p-3 bg-[#121214] space-y-1">
                                  <div className="text-[#00FF66] font-bold">Butterfly Optimization (BOA)</div>
                                  <div className="text-[10px] text-zinc-500">Global Fragrance Range &amp; Local Flight</div>
                                  <div className="text-[10px] text-zinc-400">Agent Population: 50 | Max Iter: 75</div>
                                </div>
                                <div className="border border-[#1A1A1C] p-3 bg-[#121214] space-y-1">
                                  <div className="text-[#00FF66] font-bold">Whale Optimization (WOA)</div>
                                  <div className="text-[10px] text-zinc-500">Bubble-Net Encircling &amp; Spiral Attack</div>
                                  <div className="text-[10px] text-zinc-400">Yields Optimal Feature Binary Mask</div>
                                </div>
                              </div>
                              <div className="text-[10px] text-zinc-600 truncate pt-1 tracking-widest bg-[#121214] p-1.5 border border-[#1A1A1C] font-bold text-center">
                                MASK_OUT: [1 0 1 1 0 0 1 0 1 1 1 0 0 1 1 0 1 ...] // Compressed Dimensionality
                              </div>
                            </motion.div>
                          )}

                          {crcStep === "dit" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="space-y-3 w-full"
                            >
                              <div className="text-[#00FF66] font-bold border-b border-[#1A1A1C] pb-2 flex justify-between items-center">
                                <span>[STAGE 03: DIT TRANSFORMER ENGINE]</span>
                                <span className="text-[10px] text-zinc-500">Diffusion Classifier</span>
                              </div>
                              <p className="text-zinc-400">
                                Feeds selected optimal features into a high-performance **Diffusion Transformer (DiT)** classifier utilizing adaptive layer normalization (adaLN-Zero) conditioning.
                              </p>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                                <div className="border border-[#1A1A1C] p-2 bg-[#121214]">
                                  <div className="text-zinc-500 text-[9px]">DIT_DEPTH</div>
                                  <div className="text-white text-xs font-bold">12 Blocks</div>
                                </div>
                                <div className="border border-[#1A1A1C] p-2 bg-[#121214]">
                                  <div className="text-zinc-500 text-[9px]">HIDDEN_DIM</div>
                                  <div className="text-white text-xs font-bold">768-dim</div>
                                </div>
                                <div className="border border-[#1A1A1C] p-2 bg-[#121214]">
                                  <div className="text-zinc-500 text-[9px]">SWA_START</div>
                                  <div className="text-[#00FF66] text-xs font-bold">Epoch 140</div>
                                </div>
                                <div className="border border-[#1A1A1C] p-2 bg-[#121214]">
                                  <div className="text-zinc-500 text-[9px]">REGULARIZATION</div>
                                  <div className="text-white text-[10px] font-bold">Mixup (α=0.2)</div>
                                </div>
                              </div>
                              <div className="text-[10px] text-zinc-500 flex justify-between pt-1">
                                <span>Optimization: Cosine Warmup (10 epochs)</span>
                                <span>Loss: Smooth CrossEntropy (0.1)</span>
                              </div>
                            </motion.div>
                          )}

                          {crcStep === "calibration" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="space-y-3 w-full"
                            >
                              <div className="text-[#00FF66] font-bold border-b border-[#1A1A1C] pb-2 flex justify-between items-center">
                                <span>[STAGE 04: CALIBRATION &amp; TTA EVALUATION]</span>
                                <span className="text-[10px] text-zinc-500">Statistical Validation</span>
                              </div>
                              <p className="text-zinc-400">
                                Ensures highly calibrated probability distribution outputs and statistical generalization via post-hoc scaling and multi-inference testing.
                              </p>
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between items-center text-zinc-400 border-b border-[#1A1A1C]/30 pb-1">
                                  <span>Post-Hoc Probability Calibration:</span>
                                  <span className="text-white">Temperature Scaling (LBFGS fitting)</span>
                                </div>
                                <div className="flex justify-between items-center text-zinc-400 border-b border-[#1A1A1C]/30 pb-1">
                                  <span>Test-Time Augmentation (TTA):</span>
                                  <span className="text-white">7-Pass Inference with Gaussian Noise (σ=0.008)</span>
                                </div>
                                <div className="flex justify-between items-center text-zinc-400">
                                  <span>Confidence Intervals &amp; Tests:</span>
                                  <span className="text-white">2000-sample Bootstrap CIs &amp; DeLong Significance Tests</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Dynamic Metrics Section */}
                      <div className="bg-[#0B0B0C] border-[0.5px] border-[#1A1A1C] p-6 md:p-8 mt-6">
                        <div className="text-[#00FF66] mb-6 font-bold text-center border-b-[0.5px] border-[#1A1A1C] pb-3 font-[family-name:var(--font-space-mono)]">
                          [METRICS_EVALUATION_LOG]
                        </div>
                        <motion.div
                          className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-100px" }}
                          variants={metricContainerVariants}
                        >
                          {/* Row 1 */}
                          <motion.div className="bg-[#121214] p-4 border-[0.5px] border-[#1A1A1C] flex flex-col justify-between" variants={metricItemVariants}>
                            <div className="text-[#A1A1AA] text-[9px] tracking-widest uppercase font-[family-name:var(--font-space-mono)] mb-2">
                              ACCURACY
                            </div>
                            <div className="text-2xl md:text-3xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)]">
                              99.80%
                            </div>
                            <div className="text-[8px] text-[#00FF66] font-mono mt-1">Overall prediction rate</div>
                          </motion.div>
                          <motion.div className="bg-[#121214] p-4 border-[0.5px] border-[#1A1A1C] flex flex-col justify-between" variants={metricItemVariants}>
                            <div className="text-[#A1A1AA] text-[9px] tracking-widest uppercase font-[family-name:var(--font-space-mono)] mb-2">
                              AUC-ROC
                            </div>
                            <div className="text-2xl md:text-3xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)]">
                              1.0000
                            </div>
                            <div className="text-[8px] text-[#00FF66] font-mono mt-1">Perfect separation curve</div>
                          </motion.div>
                          <motion.div className="bg-[#121214] p-4 border-[0.5px] border-[#1A1A1C] flex flex-col justify-between" variants={metricItemVariants}>
                            <div className="text-[#A1A1AA] text-[9px] tracking-widest uppercase font-[family-name:var(--font-space-mono)] mb-2">
                              F1-SCORE
                            </div>
                            <div className="text-2xl md:text-3xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)]">
                              0.9980
                            </div>
                            <div className="text-[8px] text-[#00FF66] font-mono mt-1">Harmonic precision/recall</div>
                          </motion.div>
                          <motion.div className="bg-[#121214] p-4 border-[0.5px] border-[#1A1A1C] flex flex-col justify-between" variants={metricItemVariants}>
                            <div className="text-[#A1A1AA] text-[9px] tracking-widest uppercase font-[family-name:var(--font-space-mono)] mb-2">
                              MCC
                            </div>
                            <div className="text-2xl md:text-3xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)]">
                              0.9960
                            </div>
                            <div className="text-[8px] text-[#00FF66] font-mono mt-1">Matthews Correlation</div>
                          </motion.div>

                          {/* Row 2 */}
                          <motion.div className="bg-[#121214] p-4 border-[0.5px] border-[#1A1A1C] flex flex-col justify-between" variants={metricItemVariants}>
                            <div className="text-[#A1A1AA] text-[9px] tracking-widest uppercase font-[family-name:var(--font-space-mono)] mb-2">
                              PRECISION
                            </div>
                            <div className="text-2xl md:text-3xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)]">
                              0.9980
                            </div>
                            <div className="text-[8px] text-[#00FF66] font-mono mt-1">Positive predictive value</div>
                          </motion.div>
                          <motion.div className="bg-[#121214] p-4 border-[0.5px] border-[#1A1A1C] flex flex-col justify-between" variants={metricItemVariants}>
                            <div className="text-[#A1A1AA] text-[9px] tracking-widest uppercase font-[family-name:var(--font-space-mono)] mb-2">
                              RECALL
                            </div>
                            <div className="text-2xl md:text-3xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)]">
                              0.9980
                            </div>
                            <div className="text-[8px] text-[#00FF66] font-mono mt-1">Sensitivity / TPR</div>
                          </motion.div>
                          <motion.div className="bg-[#121214] p-4 border-[0.5px] border-[#1A1A1C] flex flex-col justify-between" variants={metricItemVariants}>
                            <div className="text-[#A1A1AA] text-[9px] tracking-widest uppercase font-[family-name:var(--font-space-mono)] mb-2">
                              SPECIFICITY
                            </div>
                            <div className="text-2xl md:text-3xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)]">
                              0.9980
                            </div>
                            <div className="text-[8px] text-[#00FF66] font-mono mt-1">True negative rate (TNR)</div>
                          </motion.div>
                          <motion.div className="bg-[#121214] p-4 border-[0.5px] border-[#1A1A1C] flex flex-col justify-between" variants={metricItemVariants}>
                            <div className="text-[#A1A1AA] text-[9px] tracking-widest uppercase font-[family-name:var(--font-space-mono)] mb-2">
                              95% CONFIDENCE INTERVAL
                            </div>
                            <div className="text-xl md:text-2xl text-white font-bold tracking-tighter font-[family-name:var(--font-jetbrains)] py-1">
                              (0.9950, 1.0000)
                            </div>
                            <div className="text-[8px] text-[#00FF66] font-mono mt-1">Bootstrap verified (n=2000)</div>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Computational Infrastructure Footnote */}
                      <div className="border border-[#1A1A1C] p-4 bg-[#0B0B0C] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[9px] text-[#A1A1AA]">
                        <span className="text-[#00FF66] font-bold">COMPUTATIONAL_INFRASTRUCTURE // NVIDIA_RTX</span>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          <span>• GPU: RTX 3090 24GB (FP16 AMP)</span>
                          <span>• CPU: 64-Core Threaded Engine</span>
                          <span>• RAM: 256GB Aggressive Prefetch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Project 5: RESEARCH_PIPELINE::DYNAMIC_PRICING */}
                <motion.section 
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold bg-[#2a2a2a] text-white inline-block px-4 py-2 border border-[#1A1A1C]">
                    RESEARCH_PIPELINE::DYNAMIC_PRICING
                  </h3>
                  <div className="bg-[#121214] border-[0.5px] border-[#1A1A1C] p-6 md:p-8 space-y-4">
                    <div className="text-[#00FF66] font-bold text-lg border-b-[0.5px] border-[#1A1A1C] pb-2 inline-block font-[family-name:var(--font-space-mono)]">
                      PAPER_ID: RES-RL-02
                    </div>
                    <h4 className="text-white text-xl font-bold font-[family-name:var(--font-jetbrains)]">
                      Systematic Exploration of Reinforcement Learning for Dynamic Pricing in E-Commerce
                    </h4>
                    <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)]">
                      Models Investigated: Q-Learning, Deep Q-Networks (DQN)
                    </p>
                  </div>
                </motion.section>
              </motion.div>
            </div>
          </section>

          {/* SECTION 04: EXPERIENCE TIMELINE (id="experience") */}
          <section
            id="experience"
            className="scroll-mt-20 min-h-screen flex flex-col justify-center py-20 md:py-28 relative z-10 w-full"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {}
              }}
            >
              <motion.div 
                className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.1em]"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                SECTION_04 // ENGAGEMENT_HISTORY
              </motion.div>
              <motion.div 
                className="flex items-center border-b-[0.5px] pb-4 border-[#1A1A1C]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } }
                }}
              >
                <h2 className="font-[family-name:var(--font-jetbrains)] text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter font-bold">
                  04 // EXPERIENCE_&amp;_IMPACT
                </h2>
              </motion.div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-12 gap-[0.5px] bg-[#1A1A1C] border border-[#1A1A1C]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {/* Node 1 */}
              <motion.div
                className="bg-[#121214] md:col-span-7 p-8 group hover:bg-[#141313] transition-colors relative overflow-hidden"
                variants={experienceCardVariants}
              >
                <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 border-b-[0.5px] border-[#1A1A1C] pb-4 gap-2">
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold text-white group-hover:text-[#00FF66] transition-colors">
                    [GOOGLE // GOOGLE STUDENT AMBASSADOR]
                  </h3>
                  <span className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-xs">
                    Aug 2025 – Jan 2026
                  </span>
                </div>
                <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm mb-6 leading-relaxed">
                  Drove AI/ML adoption across NMIT, reaching 1,000+ students through hands-on developer workshops.
                </p>
                <motion.div
                  className="space-y-2 font-[family-name:var(--font-space-mono)] text-xs"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                >
                  <motion.div
                    className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66]"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4 } },
                    }}
                  >
                    IMPACT_METRIC_01 // 1,000+ STUDENTS
                  </motion.div>
                  <motion.div
                    className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66]"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4 } },
                    }}
                  >
                    IMPACT_METRIC_02 // 500+ ATTENDEES PER VIBE-CODING EVENT...
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Node 2 */}
              <motion.div
                className="bg-[#121214] md:col-span-5 p-8 group hover:bg-[#141313] transition-colors relative overflow-hidden"
                variants={experienceCardVariants}
              >
                <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 border-b-[0.5px] border-[#1A1A1C] pb-4 gap-2">
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold text-white group-hover:text-[#00FF66] transition-colors">
                    [OASIS NMIT // CO-FOUNDER &amp; ADMINISTRATOR]
                  </h3>
                  <span className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-xs">
                    MAY 2024 - Present
                  </span>
                </div>
                <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm leading-relaxed mb-6">
                  Founded the premier campus Gaming &amp; Esports Club, growing it to 200+ active members. Collaborated with and secured sponsorships from global brands including Sony PlayStation, Monster Energy, Krafton, Garena, and OnePlus to host competitive tournaments with 1,000+ active event participations.
                </p>
                <motion.div
                  className="space-y-2 font-[family-name:var(--font-space-mono)] text-xs flex flex-col items-stretch"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4 } },
                    }}
                  >
                    <Badge variant="outline" className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66] rounded-none justify-start font-normal block w-full">
                      IMPACT_METRIC_01 // 200+ ACTIVE MEMBERS
                    </Badge>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4 } },
                    }}
                  >
                    <Badge variant="outline" className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66] rounded-none justify-start font-normal block w-full">
                      IMPACT_METRIC_02 // 1,000+ EVENT PARTICIPATIONS
                    </Badge>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Node 3 */}
              <motion.div
                className="bg-[#121214] md:col-span-12 p-8 group hover:bg-[#141313] transition-colors relative overflow-hidden"
                variants={experienceCardVariants}
              >
                <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 border-b-[0.5px] border-[#1A1A1C] pb-4 gap-2">
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold text-white group-hover:text-[#00FF66] transition-colors">
                    [Diseño Divino NMIT // CO-FOUNDER &amp; SPONSORSHIP LEAD]
                  </h3>
                  <span className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-xs">
                    Aug 2024 - Present
                  </span>
                </div>
                <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm leading-relaxed mb-6">
                  Established the UI/UX &amp; AI design collective at NMIT.
                </p>
                <motion.div
                  className="space-y-2 font-[family-name:var(--font-space-mono)] text-xs flex flex-col items-stretch"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4 } },
                    }}
                  >
                    <Badge variant="outline" className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66] rounded-none justify-start font-normal block w-full">
                      IMPACT_METRIC_01 // 800+ ONLINE REGISTRATIONS
                    </Badge>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4 } },
                    }}
                  >
                    <Badge variant="outline" className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66] rounded-none justify-start font-normal block w-full">
                      IMPACT_METRIC_02 // 300+ OFFLINE PARTICIPANTS
                    </Badge>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4 } },
                    }}
                  >
                    <Badge variant="outline" className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66] rounded-none justify-start font-normal block w-full">
                      IMPACT_METRIC_03 // PARTNERS: GOOGLE GEMINI · VERCEL · AI COLLECTIVE
                    </Badge>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Node 4 (Vercel) */}
              <motion.div
                className="md:col-span-12"
                variants={experienceCardVariants}
              >
                <Card className="rounded-none border-0 bg-[#121214] p-8 group hover:bg-[#141313] transition-colors relative overflow-hidden shadow-none">
                  <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  <CardHeader className="p-0 flex flex-col sm:flex-row justify-between items-start mb-6 border-[#1A1A1C] border-b-[0.5px] pb-4 gap-2 space-y-0">
                    <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] tracking-[2px] font-semibold text-white group-hover:text-[#00FF66] transition-colors">
                      [VERCEL // COMMUNITY PARTNER]
                    </h3>
                    <span className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-xs">
                      26TH APRIL 2026
                    </span>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm mb-6 leading-relaxed">
                      Co-hosted the V0 Buildathon in India with The AI Collective.
                    </p>
                    <motion.div
                      className="space-y-2 font-[family-name:var(--font-space-mono)] text-xs flex flex-col items-stretch"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.06,
                          },
                        },
                      }}
                    >
                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1, transition: { duration: 0.4 } },
                        }}
                      >
                        <Badge variant="outline" className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66] rounded-none justify-start font-normal block w-full">
                          IMPACT_METRIC_01 // 1,000+ REGISTRATIONS
                        </Badge>
                      </motion.div>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1, transition: { duration: 0.4 } },
                        }}
                      >
                        <Badge variant="outline" className="bg-[#1c1b1b] border border-[#1A1A1C] px-3 py-2 text-[#00FF66] rounded-none justify-start font-normal block w-full">
                          IMPACT_METRIC_02 // 200+ BUILDERS SELECTED OFFLINE
                        </Badge>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </section>

          {/* SECTION 05: TECH ENGINE CAPABILITIES (id="tech-stack") */}
          <section
            id="tech-stack"
            className="scroll-mt-20 min-h-screen flex flex-col justify-center py-20 md:py-28 relative z-10 w-full space-y-12"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {}
              }}
            >
              <motion.div 
                className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.1em]"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                ACTIVE DEPENDENCIES // SYSTEM.CONFIG
              </motion.div>
              <motion.div 
                className="flex items-center border-b-[0.5px] pb-4 border-[#1A1A1C]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } }
                }}
              >
                <h2 className="font-[family-name:var(--font-jetbrains)] text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter font-bold">
                  05 // TECH_ENGINE_CAPABILITIES
                </h2>
              </motion.div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div 
                className="lg:col-span-3 flex lg:flex-col gap-4 font-[family-name:var(--font-space-mono)] text-[10px] text-[#00FF66]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <motion.div 
                  className="border border-[#1A1A1C] p-4 bg-[#121214] inline-flex lg:flex justify-center items-center w-full"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <span className="lg:text-vertical uppercase tracking-widest">[STACK: POLYGLOT]</span>
                </motion.div>
                <motion.div 
                  className="border border-[#1A1A1C] p-4 bg-[#121214] inline-flex lg:flex justify-center items-center w-full"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <span className="lg:text-vertical uppercase tracking-widest">[FOCUS: DISTRIBUTED SYSTEMS]</span>
                </motion.div>
              </motion.div>
              <motion.div 
                className="lg:col-span-9 bg-[#1A1A1C] border border-[#1A1A1C] grid grid-cols-1 md:grid-cols-3 gap-[0.5px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
              >
                {/* Column 1 */}
                <motion.div 
                  className="bg-[#121214] p-6 hover:bg-[#141313] transition-colors group relative overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  <div className="font-[family-name:var(--font-jetbrains)] text-[14px] font-bold text-white mb-4 border-b border-[#1A1A1C] pb-2 group-hover:text-[#00FF66] transition-colors">
                    Architecture &amp; Core
                  </div>
                  <motion.ul 
                    className="text-[#E2E8F0] space-y-2 font-[family-name:var(--font-space-mono)] text-sm"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    {["Java SE", "Java EE", "Python", "TypeScript", "JavaScript"].map((item) => (
                      <motion.li 
                        key={item}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                {/* Column 2 */}
                <motion.div 
                  className="bg-[#121214] p-6 hover:bg-[#141313] transition-colors group relative overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  <div className="font-[family-name:var(--font-jetbrains)] text-[14px] font-bold text-white mb-4 border-b border-[#1A1A1C] pb-2 group-hover:text-[#00FF66] transition-colors">
                    Backend &amp; Runtime
                  </div>
                  <motion.ul 
                    className="text-[#E2E8F0] space-y-2 font-[family-name:var(--font-space-mono)] text-sm"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    {["Servlets", "Spring Framework", "FastAPI", "Node.js", "REST APIs", "gRPC", "Kafka", "GraphQL", "Spring MVC"].map((item) => (
                      <motion.li 
                        key={item}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                {/* Column 3 */}
                <motion.div 
                  className="bg-[#121214] p-6 hover:bg-[#141313] transition-colors group relative overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  <div className="font-[family-name:var(--font-jetbrains)] text-[14px] font-bold text-white mb-4 border-b border-[#1A1A1C] pb-2 group-hover:text-[#00FF66] transition-colors">
                    Persistence &amp; Deployment
                  </div>
                  <motion.ul 
                    className="text-[#E2E8F0] space-y-2 font-[family-name:var(--font-space-mono)] text-sm"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    {["Oracle", "PostgreSQL", "Redis", "MongoDB", "Firebase", "AWS", "Docker", "Git", "Linux", "CI/CD"].map((item) => (
                      <motion.li 
                        key={item}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                {/* Exposure Row */}
                <motion.div 
                  className="bg-[#121214] p-6 md:col-span-3 hover:bg-[#141313] transition-colors group relative overflow-hidden border-t-[0.5px] border-[#1A1A1C]"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 font-[family-name:var(--font-space-mono)]">
                    <span className="text-[10px] text-[#00FF66] border border-[#1A1A1C] px-2 py-1 bg-[#1c1b1b] shrink-0 w-fit">
                      [EXPOSURE // LEARNING]
                    </span>
                    <span className="text-[#A1A1AA] text-sm tracking-wide">
                      Go &middot; C++
                    </span>
                  </div>
                </motion.div>
                {/* Bottom Row */}
                <motion.div 
                  className="bg-[#121214] p-6 md:col-span-3 hover:bg-[#141313] transition-colors group relative overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="absolute inset-0 bg-[#00FF66] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 border-b border-[#1A1A1C] pb-2 gap-2">
                    <div className="font-[family-name:var(--font-jetbrains)] text-[14px] font-bold text-white group-hover:text-[#00FF66] transition-colors">
                      [INTELLIGENT COMPUTE // AI &amp; LLM WORKFLOWS]
                    </div>
                    <div className="text-[10px] font-[family-name:var(--font-space-mono)] text-[#00FF66] border border-[#1A1A1C] px-2 py-1 bg-[#1c1b1b]">
                      MODEL: MARL // DEPENDENCY_AWARE_SCHEDULING
                    </div>
                  </div>
                  <p className="text-[#E2E8F0] font-[family-name:var(--font-space-mono)] text-sm leading-relaxed">
                    PyTorch, Multi-Agent RL, Diffusion Transformers, LLM tool-use, RAG pipelines, Prompt engineering, N8N Workflows
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 06: OPEN SOURCE CONTRIBUTIONS (id="open-source") */}
          <section
            id="open-source"
            className="scroll-mt-20 min-h-screen flex flex-col justify-start pt-12 md:pt-16 relative z-10 w-full space-y-12 pb-24"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {}
              }}
            >
              <motion.div 
                className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.1em]"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                SECTION_06 // OPEN_SOURCE_CONTRIBUTIONS
              </motion.div>
              <motion.div 
                className="flex items-center border-b-[0.5px] pb-4 border-[#1A1A1C]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } }
                }}
              >
                <h2 className="font-[family-name:var(--font-jetbrains)] text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter font-bold">
                  06 // GLOBAL_CONTRIBUTIONS
                </h2>
              </motion.div>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-[0.5px] bg-[#1A1A1C] border border-[#1A1A1C]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
            >
              {/* Item 1: Evidently */}
              <motion.section 
                className="bg-[#121214] p-6 md:p-8 flex flex-col group hover:bg-[#141313] transition-colors h-full"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                <div className="flex items-center space-x-2 mb-6 border-b-[0.5px] pb-4 border-[#1A1A1C]">
                  <svg className="w-4 h-4 text-[#00FF66] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] font-semibold text-white">
                    evidentlyai / evidently
                  </h3>
                </div>
                <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00FF66] mb-4">
                  ML OBSERVABILITY LIBRARY
                </div>
                <p className="text-[#E2E8F0] leading-relaxed mb-6 font-[family-name:var(--font-space-mono)] text-sm flex-grow">
                  Resolved bare NotImplementedError bugs in RemoteWorkspace's Snapshot API (list_runs, get_run, delete_run) by implementing descriptive, actionable context messages to improve developer experience. Backed by new unit tests.
                </p>
                <div className="bg-[#0b0b0c] p-4 border-[0.5px] border-[#1A1A1C] mt-2 mb-6">
                  <div className="text-[#00FF66] text-xs mb-2 font-bold font-[family-name:var(--font-space-mono)]">
                    PULL_REQUEST_SCOPE
                  </div>
                  <div className="text-white font-[family-name:var(--font-jetbrains)] text-sm break-all flex items-center space-x-2">
                    <span className="text-[#00FF66] font-bold">FIX</span>
                    <span>src/evidently/ui/workspace.py</span>
                  </div>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex space-x-4 text-xs font-[family-name:var(--font-space-mono)] text-[#A1A1AA] items-center">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>Python</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>7.5k</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M6 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M6 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M18 18v-3a4 4 0 0 0 -4 -4h-4" />
                        <path d="M6 9v7" />
                      </svg>
                      <span>851</span>
                    </span>
                  </div>
                </div>
              </motion.section>

              {/* Item 2: XMem */}
              <motion.section 
                className="bg-[#121214] p-6 md:p-8 flex flex-col group hover:bg-[#141313] transition-colors h-full"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                <div className="flex items-center space-x-2 mb-6 border-b-[0.5px] pb-4 border-[#1A1A1C]">
                  <svg className="w-4 h-4 text-[#00FF66] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[14px] leading-[1.2] font-semibold text-white">
                    xmem-dev / xmem
                  </h3>
                </div>
                <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00FF66] mb-4">
                  THE MEMORY LAYER FOR AI
                </div>
                <p className="text-[#E2E8F0] leading-relaxed mb-6 font-[family-name:var(--font-space-mono)] text-sm flex-grow">
                  Implementation focus on high-throughput data ingestion pathways and state management, significantly reducing system overhead.
                </p>
                <div className="bg-[#0b0b0c] p-4 border-[0.5px] border-[#1A1A1C] mt-2 mb-6">
                  <div className="text-[#00FF66] text-xs mb-2 font-bold font-[family-name:var(--font-space-mono)]">
                    ENDPOINT_IMPLEMENTATION
                  </div>
                  <div className="text-white font-[family-name:var(--font-jetbrains)] text-sm break-all flex items-center space-x-2">
                    <span className="text-[#00FF66] font-bold">POST</span>
                    <span>/v1/memory/batch-ingest</span>
                  </div>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex space-x-4 text-xs font-[family-name:var(--font-space-mono)] text-[#A1A1AA] items-center">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>Python</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>181</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M6 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M6 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M18 18v-3a4 4 0 0 0 -4 -4h-4" />
                        <path d="M6 9v7" />
                      </svg>
                      <span>40</span>
                    </span>
                  </div>
                </div>
              </motion.section>

              {/* Pipeline / Upcoming Contributions Row */}
              <motion.div 
                className="bg-[#121214] p-6 lg:col-span-2 hover:bg-[#141313] transition-colors group relative overflow-hidden border-t-[0.5px] border-[#1A1A1C]"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-[family-name:var(--font-space-mono)]">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <span className="text-[10px] text-[#00FF66] border border-[#1A1A1C] px-2 py-1 bg-[#1c1b1b] shrink-0 w-fit">
                      [PIPELINE // UPCOMING_CONTRIBUTIONS]
                    </span>
                    <span className="text-[#E2E8F0] text-xs md:text-sm leading-relaxed">
                      Actively auditing open issues and preparing upstream patches for PyTorch, Spring Framework, and Apache Kafka. Multiple pull requests under community review and local integration testing.
                    </span>
                  </div>
                  <div className="text-[10px] text-[#00FF66] border border-[#1A1A1C] px-2 py-1 bg-[#1c1b1b] shrink-0 w-fit md:ml-auto">
                    STATUS: 3 PENDING PULL REQUESTS
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* SECTION 07: SYSTEM CONNECT TERMINAL (id="contact") */}
          <section
            id="contact"
            className="scroll-mt-20 space-y-12 w-full"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {}
              }}
            >
              <motion.div 
                className="text-[#A1A1AA] font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.1em]"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                }}
              >
                TERMINAL_SESSION // OPEN_CHANNEL
              </motion.div>
              <motion.div 
                className="flex items-center border-b-[0.5px] pb-4 border-[#1A1A1C]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } }
                }}
              >
                <h2 className="font-[family-name:var(--font-jetbrains)] text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter font-bold">
                  INITIATE_TRANSMISSION
                </h2>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Endpoint links + Status */}
              <motion.div 
                className="lg:col-span-4 space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
              >
                <motion.div 
                  className="bg-[#121214] border border-[#1A1A1C] p-6 space-y-6"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00FF66] border-b border-[#1A1A1C] pb-2">
                    CONNECTION_ENDPOINTS
                  </div>
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="flex items-center justify-between p-3 border border-[#1A1A1C] bg-[#0B0B0C] hover:border-[#00FF66] transition-colors">
                        <div>
                          <div className="font-[family-name:var(--font-jetbrains)] text-xs font-bold text-white group-hover:text-[#00FF66] transition-colors">
                            {link.label}
                          </div>
                          <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#666666]">
                            {link.protocol}
                          </div>
                        </div>
                        <span className="text-[#666666] group-hover:text-[#00FF66] transition-colors text-sm">
                          →
                        </span>
                      </div>
                    </a>
                  ))}
                </motion.div>

                <motion.div 
                  className="bg-[#121214] border border-[#1A1A1C] p-6"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                >
                  <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00FF66] border-b border-[#1A1A1C] pb-2 mb-4">
                    SYSTEM_STATUS
                  </div>
                  <div className="space-y-2 font-[family-name:var(--font-space-mono)] text-[10px]">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#00FF66] inline-block pulse-green rounded-full" />
                      <span className="text-[#E2E8F0]">RECEIVING: ACTIVE</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#00FF66] inline-block rounded-full" />
                      <span className="text-[#E2E8F0]">LOCATION: BENGALURU, IN</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#00FF66] inline-block rounded-full" />
                      <span className="text-[#E2E8F0]">RESPONSE_TIME: &lt;24h</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Terminal Form */}
              <motion.div 
                className="lg:col-span-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.6, 
                      ease: [0.25, 0.1, 0.25, 1],
                      staggerChildren: 0.08,
                      delayChildren: 0.2
                    } 
                  }
                }}
              >
                <div className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6 border-b border-[#1A1A1C] pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#FF0033]" />
                        <span className="w-3 h-3 rounded-full bg-[#FFD18D]" />
                        <span className="w-3 h-3 rounded-full bg-[#00FF66]" />
                      </div>
                      <span className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#666666]">
                        transmission_form.sh
                      </span>
                    </div>
                    <span className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA]">
                      v1.0.0
                    </span>
                  </div>

                  {submitted ? (
                    <div className="py-16 text-center space-y-4">
                      <div className="text-[#00FF66] font-[family-name:var(--font-jetbrains)] text-2xl font-bold">
                        [TRANSMISSION_SENT]
                      </div>
                      <p className="font-[family-name:var(--font-space-mono)] text-sm text-[#E2E8F0]">
                        Message queued successfully. Expect response within 24h.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {sendError && (
                        <div className="p-3 border border-[#FF0033]/30 bg-[#FF0033]/5 text-[#FF0033] font-mono text-[10px] uppercase tracking-wider">
                          [TRANSMISSION_ERROR] // {sendError}
                        </div>
                      )}
                      {[
                        {
                          id: "contact-name",
                          label: "$ IDENTITY_STRING",
                          type: "text",
                          placeholder: "Enter your name...",
                          key: "name" as const,
                        },
                        {
                          id: "contact-email",
                          label: "$ RETURN_ADDRESS",
                          type: "email",
                          placeholder: "your@email.com",
                          key: "email" as const,
                        },
                        {
                          id: "contact-subject",
                          label: "$ SUBJECT_HEADER",
                          type: "text",
                          placeholder: "What's this about?",
                          key: "subject" as const,
                        },
                      ].map((field) => (
                        <motion.div 
                          key={field.id}
                          variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                          }}
                        >
                          <label className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#00FF66] mb-2 block uppercase tracking-wider">
                            {field.label}
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            required
                            disabled={isSending}
                            value={formState[field.key]}
                            onChange={(e) =>
                              setFormState({ ...formState, [field.key]: e.target.value })
                            }
                            className="w-full bg-[#0B0B0C] border border-[#1A1A1C] px-4 py-3 text-white font-[family-name:var(--font-space-mono)] text-sm focus:border-[#00FF66] focus:outline-none transition-colors placeholder-[#666666] rounded-sm disabled:opacity-50"
                            placeholder={field.placeholder}
                          />
                        </motion.div>
                      ))}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 16 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                        }}
                      >
                        <label className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#00FF66] mb-2 block uppercase tracking-wider">
                          $ MESSAGE_BODY
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          disabled={isSending}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-[#1A1A1C] px-4 py-3 text-white font-[family-name:var(--font-space-mono)] text-sm focus:border-[#00FF66] focus:outline-none transition-colors placeholder-[#666666] resize-none rounded-sm disabled:opacity-50"
                          placeholder="Type your message..."
                        />
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-between pt-4 border-t border-[#1A1A1C]"
                        variants={{
                          hidden: { opacity: 0, scale: 0.97 },
                          visible: { 
                            opacity: 1, 
                            scale: 1, 
                            transition: { 
                              duration: 0.6, 
                              ease: [0.25, 0.1, 0.25, 1],
                              delay: 0.45
                            } 
                          }
                        }}
                      >
                        <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#666666] flex items-center gap-2">
                          <span className="cursor-blink text-[#00FF66]">█</span>
                          {isSending ? "TRANSMITTING..." : "READY_TO_TRANSMIT"}
                        </div>
                        <button
                          type="submit"
                          disabled={isSending}
                          className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.05em] bg-white text-[#0B0B0C] px-6 py-3 font-bold hover:bg-[#00FF66] transition-all duration-300 uppercase rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSending ? "[SENDING...]" : "EXECUTE_SEND"}
                        </button>
                      </motion.div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
