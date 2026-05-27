"use client";

export function Footer() {
  const statusText =
    "STATUS: ACTIVE // BENGALURU, IN // CURRENT PROJECT: FORGE // NODE_STATUS: OPTIMAL // ENCRYPTION: AES-256-GCM // SYSTEM_LOAD: 12.4%";

  return (
    <footer className="fixed bottom-0 w-full z-[100] flex items-center overflow-hidden bg-[#0e0e0e] border-t-[0.5px] border-[#1A1A1C] h-10 select-none">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes footerMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-footer-marquee {
          display: flex !important;
          flex-direction: row !important;
          flex-shrink: 0 !important;
          align-items: center !important;
          justify-content: space-around !important;
          min-width: 100% !important;
          animation: footerMarquee 30s linear infinite !important;
        }
        `
      }} />
      <div className="relative w-full overflow-hidden flex flex-row">
        <div className="animate-footer-marquee flex flex-row shrink-0 items-center justify-around min-w-full gap-8">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA] uppercase tracking-widest whitespace-nowrap"
            >
              {statusText} <span className="text-[#333333] mx-4">//</span>
            </span>
          ))}
        </div>
        <div className="animate-footer-marquee flex flex-row shrink-0 items-center justify-around min-w-full gap-8" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA] uppercase tracking-widest whitespace-nowrap"
            >
              {statusText} <span className="text-[#333333] mx-4">//</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
