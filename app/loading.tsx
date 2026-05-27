import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0B0C] text-[#E2E8F0] font-mono select-none overflow-hidden">
      {/* CSS keyframe animations for the loader */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes progress-fill {
          0% { width: 0%; }
          50% { width: 70%; }
          80% { width: 90%; }
          100% { width: 100%; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }
        .animate-caret {
          animation: caret-blink 1s step-end infinite;
        }
        .animate-progress-loading {
          animation: progress-fill 2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
        }
        .animate-status-pulse {
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        .scanline-effect::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.18) 50%
          );
          background-size: 100% 4px;
          z-index: 2;
          pointer-events: none;
        }
      `}} />

      {/* Retro scanline effect and grain noise */}
      <div className="scanline-effect absolute inset-0 w-full h-full pointer-events-none z-[100]" />
      <div className="grain absolute inset-0 w-full h-full opacity-45 pointer-events-none z-[100]" aria-hidden="true" />

      {/* Terminal Loading Card Container */}
      <div className="w-full max-w-[340px] px-6 py-5 bg-[#0B0B0C] border border-[#00FF66]/20 rounded-none shadow-[0_0_30px_rgba(0,255,102,0.02)] flex flex-col relative z-[101] mx-4">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#00FF66]/20 pb-3 mb-4 text-[10px] text-zinc-500 uppercase tracking-widest font-[family-name:var(--font-space-mono)]">
          <span>sys.boot_seq //</span>
          <span className="flex items-center gap-1.5 text-[#00FF66]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-status-pulse"></span>
            online
          </span>
        </div>

        {/* Diagnostic Log */}
        <div className="space-y-1.5 text-[11px] leading-relaxed text-zinc-400 font-[family-name:var(--font-space-mono)]">
          <div className="flex justify-between">
            <span>KERNEL_ENGINE:</span>
            <span className="text-white">CREATIVE_SYSTEM_V4.8</span>
          </div>
          <div className="flex justify-between">
            <span>TARGET_HOST:</span>
            <span className="text-white">ANIRUDHA-PORTFOLIO</span>
          </div>
          <div className="flex justify-between">
            <span>SYS_MEM_POOL:</span>
            <span className="text-white">240KB RUNTIME_CHUNK</span>
          </div>
          <div className="flex justify-between">
            <span>STATUS_CODE:</span>
            <span className="text-[#00FF66] font-bold">INITIALIZING</span>
          </div>
        </div>

        {/* Separator line */}
        <div className="h-[1px] bg-[#00FF66]/20 my-4 w-full" />

        {/* Loading Progress Indicator */}
        <div className="space-y-2 font-[family-name:var(--font-space-mono)]">
          <div className="flex justify-between items-center text-[10px] uppercase text-zinc-400 tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="text-[#00FF66] font-bold animate-pulse">&gt;</span> 
              LOADING CORE MODULES
              <span className="inline-block w-1.5 h-3 bg-[#00FF66] align-middle animate-caret"></span>
            </span>
          </div>
          
          {/* Progress bar boundary */}
          <div className="w-full bg-[#121214] h-1.5 border border-[#00FF66]/10 relative overflow-hidden">
            <div className="bg-[#00FF66] h-full absolute left-0 top-0 animate-progress-loading" />
          </div>
        </div>
      </div>
      
      {/* Subtext footer */}
      <span className="mt-4 text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-[family-name:var(--font-space-mono)]">
        securing terminal session...
      </span>
    </div>
  );
}
