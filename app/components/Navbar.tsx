"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface NavLink {
  label: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About me", sectionId: "about" },
  { label: "Projects", sectionId: "projects" },
  { label: "Experience", sectionId: "experience" },
  { label: "Tech Stack", sectionId: "tech-stack" },
  { label: "Let's Talk", sectionId: "contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Initial check for scroll state
    if (window.scrollY > 80) {
      setScrolled(true);
    }

    // Handle scroll reveal
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = useCallback((sectionId: string) => {
    setMobileOpen(false);

    // If we're not on the home page, navigate there first
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname, router]);

  const showNavbar = !scrolled || hovered;

  return (
    <>
      {/* Top Screen Hover Trigger Area */}
      <div
        className="fixed top-0 left-0 right-0 h-4 z-[99] bg-transparent pointer-events-auto"
        onMouseEnter={() => setHovered(true)}
      />

      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed top-0 w-full z-[100] flex items-center h-16 bg-[#0B0B0C]/80 backdrop-blur-md px-6 md:px-10 border-b-[0.5px] border-[#1A1A1C] transition-all duration-500 ease-in-out ${showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Brand */}
          <button
            onClick={() => scrollTo("about")}
            className="font-[family-name:var(--font-jetbrains)] text-2xl font-bold tracking-tighter text-white hover:text-[#00FF66] transition-colors duration-300 cursor-pointer"
          >
            ANIRUDH
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isContact = link.sectionId === "contact";

              if (isContact) {
                return (
                  <button
                    key={link.sectionId}
                    onClick={() => scrollTo(link.sectionId)}
                    className="font-[family-name:var(--font-space-mono)] text-xs font-bold tracking-[0.05em] bg-white text-[#0B0B0C] px-8 py-3 hover:bg-[#00FF66] transition-all duration-300 uppercase cursor-pointer"
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <button
                  key={link.sectionId}
                  onClick={() => scrollTo(link.sectionId)}
                  className="relative font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.05em] text-[#A1A1AA] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.05em] text-white border border-[#1A1A1C] px-3 py-1.5 hover:border-[#00FF66] transition-colors cursor-pointer"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "CLOSE" : "MENU"}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="absolute top-16 left-0 right-0 bg-[#0B0B0C]/95 backdrop-blur-md border-b border-[#1A1A1C] md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollTo(link.sectionId)}
                  className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.05em] text-[#A1A1AA] hover:text-white text-left transition-colors py-2 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
