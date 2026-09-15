"use client";

import { Terminal, TerminalHeader, TerminalTitle, TerminalContent, TerminalActions, TerminalCopyButton } from "@/components/ui/ai-elements/terminal";
import { IconHexagon, IconDeviceDesktop, IconRobot, IconBulb, IconInfoCircle } from "@tabler/icons-react";

const stats = [
  { value: 8, suffix: "+", label: "Operations (Events)" },
  { value: 500, suffix: "+", label: "Engineers (Expected)" },
  { value: 50, suffix: "K+", label: "Prize Pool (INR)" },
  { value: 2, suffix: "", label: "Days of Execution" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-blueprint-navy border-t border-blueprint-cyan/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Engineering Header */}
        <div className="flex items-center gap-4 mb-4 border-b border-blueprint-cyan/20 pb-4">
          <IconInfoCircle className="text-blueprint-cyan" size={24} />
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-blueprint-white uppercase">
            Project Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-start">
          
          {/* Left: Description */}
          <div className="flex flex-col gap-8">
            <Terminal output="" autoScroll={false} className="border-blueprint-cyan/30 rounded-none bg-blueprint-navy/80">
              <TerminalHeader className="border-blueprint-cyan/20 bg-blueprint-cyan/5">
                <TerminalTitle className="text-blueprint-cyan tracking-widest font-mono uppercase">
                  SYS.INFO // RISECE 2K26
                </TerminalTitle>
              </TerminalHeader>
              <TerminalContent className="p-6">
                <p className="font-sans text-sm leading-relaxed text-blueprint-white/90 mb-4">
                  <strong className="text-blueprint-cyan font-mono tracking-widest">RISECE 2K26</strong> is a prestigious national-level technical fest organized by the Department of Civil Engineering, Vignan&apos;s Foundation for Science, Technology &amp; Research.
                </p>
                <p className="font-sans text-sm leading-relaxed text-blueprint-white/70">
                  Designed to challenge students&apos; creativity, technical expertise, and problem-solving abilities across structural, geotechnical, and digital domains. The fest brings together engineering minds from institutions across the state to compete, collaborate, and innovate — all under one roof.
                </p>
              </TerminalContent>
            </Terminal>

            {/* Sub-modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "STRUCTURAL ENGG", icon: <IconHexagon size={24} stroke={1.5} />, desc: "Bridge building and physical models" },
                { label: "DIGITAL DESIGN", icon: <IconDeviceDesktop size={24} stroke={1.5} />, desc: "AutoCAD precision drafting" },
                { label: "INNOVATION LAB", icon: <IconRobot size={24} stroke={1.5} />, desc: "AI-powered civil prototypes" },
                { label: "KNOWLEDGE ARENA", icon: <IconBulb size={24} stroke={1.5} />, desc: "Technical quizzes and research" },
              ].map(({ label, icon, desc }) => (
                <div key={label} className="border border-blueprint-cyan/20 bg-blueprint-navy/50 p-4">
                  <div className="text-blueprint-cyan mb-3 bg-blueprint-cyan/5 inline-block p-2 border border-blueprint-cyan/20">
                    {icon}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-blueprint-cyan uppercase mb-2">
                    {label}
                  </div>
                  <p className="font-sans text-xs text-blueprint-white/60 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Metrics */}
          <div className="flex flex-col gap-6">
            <Terminal output="" autoScroll={false} className="border-blueprint-cyan/30 rounded-none bg-blueprint-navy/80">
              <TerminalHeader className="border-blueprint-cyan/20 bg-blueprint-cyan/5">
                <TerminalTitle className="text-blueprint-cyan tracking-widest font-mono uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-blueprint-cyan border border-blueprint-cyan"></span>
                  LIVE EVENT METRICS
                </TerminalTitle>
                <TerminalActions>
                  <TerminalCopyButton  />
                </TerminalActions>
              </TerminalHeader>
              <TerminalContent className="p-0">
                <div className="grid grid-cols-2 divide-x divide-y divide-blueprint-cyan/20 border-b border-blueprint-cyan/20 bg-blueprint-navy/40">
                  {stats.map(({ value, suffix, label }) => (
                    <div key={label} className="p-6">
                      <div className="font-display text-4xl text-blueprint-white tracking-widest">
                        {value}<span className="text-blueprint-cyan">{suffix}</span>
                      </div>
                      <div className="font-mono text-[9px] text-blueprint-cyan/70 uppercase tracking-widest mt-2">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </TerminalContent>
            </Terminal>

            {/* Timeline teaser */}
            <Terminal output="" autoScroll={false} className="border-blueprint-accent/30 rounded-none bg-blueprint-navy/80">
              <TerminalHeader className="border-blueprint-accent/20 bg-blueprint-accent/5">
                <TerminalTitle className="text-blueprint-accent tracking-widest font-mono uppercase">
                  KEY TRANSMISSIONS
                </TerminalTitle>
              </TerminalHeader>
              <TerminalContent className="p-6">
                <div className="flex flex-col gap-4">
                  {[
                    { date: "15 AUG 2026", event: "Structure change deadline for Model Making", done: true },
                    { date: "01 OCT 2026", event: "Registration portal locks", done: false },
                    { date: "09 OCT 2026", event: "SYSTEM BOOT: Day 1 events begin", done: false },
                  ].map(({ date, event, done }) => (
                    <div key={date} className="flex items-start gap-4">
                      <div className={`font-mono text-xs tracking-widest ${done ? 'text-blueprint-accent' : 'text-blueprint-white/50'}`}>
                        [{date}]
                      </div>
                      <div className="font-sans text-sm text-blueprint-white/80">
                        {event}
                      </div>
                    </div>
                  ))}
                </div>
              </TerminalContent>
            </Terminal>
          </div>

        </div>
      </div>
    </section>
  );
}
