"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/app/lib/motion";

const SOCIAL_LINKS = [
  { label: "GITHUB", url: "https://github.com/anirudha-acharya", protocol: "git://" },
  { label: "LINKEDIN", url: "https://linkedin.com/in/anirudha-acharya", protocol: "https://" },
  { label: "EMAIL", url: "mailto:anirudha@example.com", protocol: "mailto://" },
];

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <motion.div
        className="space-y-4 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA] uppercase tracking-[0.1em]">
          TERMINAL_SESSION // OPEN_CHANNEL
        </div>
        <div className="border-b border-[#1A1A1C] pb-6">
          <h2 className="font-[family-name:var(--font-jetbrains)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter font-bold leading-tight">
            INITIATE_TRANSMISSION
          </h2>
        </div>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Links + Status */}
        <motion.div
          className="lg:col-span-4 space-y-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          <div className="bg-[#121214] border border-[#1A1A1C] p-6 space-y-6">
            <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] border-b border-[#1A1A1C] pb-2">
              CONNECTION_ENDPOINTS
            </div>
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="flex items-center justify-between p-3 border border-[#1A1A1C] bg-[#0B0B0C] hover:border-[#00FF66] transition-colors">
                  <div>
                    <div className="font-[family-name:var(--font-jetbrains)] text-xs font-bold text-white group-hover:text-[#00FF66] transition-colors">{link.label}</div>
                    <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#666666]">{link.protocol}</div>
                  </div>
                  <span className="text-[#666666] group-hover:text-[#00FF66] transition-colors text-sm">→</span>
                </div>
              </a>
            ))}
          </div>
          <div className="bg-[#121214] border border-[#1A1A1C] p-6">
            <div className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-[#00e55b] border-b border-[#1A1A1C] pb-2 mb-4">SYSTEM_STATUS</div>
            <div className="space-y-2 font-[family-name:var(--font-space-mono)] text-[10px]">
              <div className="flex items-center space-x-2"><span className="w-2 h-2 bg-[#00e55b] inline-block pulse-green" /><span className="text-[#E2E8F0]">RECEIVING: ACTIVE</span></div>
              <div className="flex items-center space-x-2"><span className="w-2 h-2 bg-[#00e55b] inline-block" /><span className="text-[#E2E8F0]">LOCATION: BENGALURU, IN</span></div>
              <div className="flex items-center space-x-2"><span className="w-2 h-2 bg-[#00e55b] inline-block" /><span className="text-[#E2E8F0]">RESPONSE_TIME: &lt;24h</span></div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <div className="bg-[#121214] border border-[#1A1A1C] p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 border-b border-[#1A1A1C] pb-4">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF0033]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFD18D]" />
                  <span className="w-3 h-3 rounded-full bg-[#00e55b]" />
                </div>
                <span className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#666666]">transmission_form.sh</span>
              </div>
              <span className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#A1A1AA]">v1.0.0</span>
            </div>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="text-[#00e55b] font-[family-name:var(--font-jetbrains)] text-2xl font-bold">[TRANSMISSION_SENT]</div>
                <p className="font-[family-name:var(--font-space-mono)] text-sm text-[#E2E8F0]">Message queued successfully. Expect response within 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "contact-name", label: "$ IDENTITY_STRING", type: "text", placeholder: "Enter your name...", key: "name" as const },
                  { id: "contact-email", label: "$ RETURN_ADDRESS", type: "email", placeholder: "your@email.com", key: "email" as const },
                  { id: "contact-subject", label: "$ SUBJECT_HEADER", type: "text", placeholder: "What's this about?", key: "subject" as const },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#00e55b] mb-2 block uppercase tracking-wider">{field.label}</label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      value={formState[field.key]}
                      onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                      className="w-full bg-[#0B0B0C] border border-[#1A1A1C] px-4 py-3 text-white font-[family-name:var(--font-space-mono)] text-sm focus:border-[#00FF66] focus:outline-none transition-colors placeholder-[#666666]"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#00e55b] mb-2 block uppercase tracking-wider">$ MESSAGE_BODY</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#0B0B0C] border border-[#1A1A1C] px-4 py-3 text-white font-[family-name:var(--font-space-mono)] text-sm focus:border-[#00FF66] focus:outline-none transition-colors placeholder-[#666666] resize-none"
                    placeholder="Type your message..."
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1C]">
                  <div className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#666666] flex items-center gap-2">
                    <span className="cursor-blink text-[#00e55b]">█</span>READY_TO_TRANSMIT
                  </div>
                  <button type="submit" className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.05em] bg-white text-[#0B0B0C] px-6 py-3 font-bold hover:bg-[#00FF66] transition-all duration-300 uppercase">
                    EXECUTE_SEND
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
