"use client";

import { Terminal, TerminalHeader, TerminalTitle, TerminalContent, TerminalActions, TerminalCopyButton } from "@/components/ui/ai-elements/terminal";
import { IconUserBolt, IconUser, IconHeadset, IconAddressBook } from "@tabler/icons-react";

const contacts = [
  {
    role: "FACULTY COORDINATOR",
    name: "Dr. A.V.A. Bharat Kumar",
    designation: "Assistant Professor, Dept. of Civil Engineering",
    phone: "+91 79899 79510",
    email: "drava_civil@vignan.ac.in",
    icon: <IconUserBolt size={20} stroke={1.5} />,
  },
  {
    role: "EXECUTIVE STUDENT COORDINATOR",
    name: "B. Koushik Bethapudi",
    designation: "Chief Coordinator, RISECE 2K26",
    phone: "+91 88854 24673",
    email: null,
    icon: <IconUser size={20} stroke={1.5} />,
  },
  {
    role: "CHIEF STUDENT COORDINATOR",
    name: "T. Mukotami",
    designation: "Chief Coordinator, RISECE 2K26",
    phone: "+91 86391 95200",
    email: null,
    icon: <IconUser size={20} stroke={1.5} />,
  },
  {
    role: "CHIEF STUDENT COORDINATOR",
    name: "K. Indra",
    designation: "Chief Coordinator, RISECE 2K26",
    phone: "+91 79898 99501",
    email: null,
    icon: <IconUser size={20} stroke={1.5} />,
  },
  {
    role: "EVENT HELPDESK",
    name: "Ms. Jhansi",
    designation: "General Helpdesk & Participant Support",
    phone: "+91 85559 37539",
    email: null,
    icon: <IconHeadset size={20} stroke={1.5} />,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 bg-blueprint-navy border-t border-blueprint-cyan/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Engineering Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-blueprint-cyan/20 pb-4">
          <IconAddressBook className="text-blueprint-cyan" size={24} />
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-blueprint-white uppercase">
            Personnel Directory
          </h2>
          <div className="ml-auto hidden md:block text-blueprint-cyan/50 font-mono text-xs tracking-widest uppercase">
            SEC_LEVEL: 0
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Directory */}
          <Terminal output="" autoScroll={false} className="border-blueprint-cyan/30 rounded-none bg-blueprint-navy/80">
            <TerminalHeader className="border-blueprint-cyan/20 bg-blueprint-cyan/5">
              <TerminalTitle className="text-blueprint-cyan tracking-widest font-mono uppercase">
                DIR // COORDINATORS
              </TerminalTitle>
              <TerminalActions>
                <TerminalCopyButton />
              </TerminalActions>
            </TerminalHeader>
            <TerminalContent className="p-0">
              <div className="divide-y divide-blueprint-cyan/20">
                {contacts.map((c, i) => (
                  <div key={i} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-blueprint-cyan/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-blueprint-cyan bg-blueprint-cyan/10 p-2 border border-blueprint-cyan/30">
                        {c.icon}
                      </div>
                      <div>
                        <div className="font-mono text-[9px] text-blueprint-cyan/70 tracking-widest uppercase mb-1">
                          {c.role}
                        </div>
                        <div className="font-sans text-sm text-blueprint-white uppercase tracking-wider">
                          {c.name}
                        </div>
                        <div className="font-sans text-[10px] text-blueprint-white/50 tracking-wide mt-1">
                          {c.designation}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 shrink-0 border-l border-blueprint-cyan/20 pl-4 mt-2 sm:mt-0">
                      <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="font-mono text-[10px] text-blueprint-cyan hover:text-blueprint-white transition-colors tracking-widest flex items-center gap-2">
                        <span>TEL:</span> {c.phone}
                      </a>
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="font-mono text-[10px] text-blueprint-cyan hover:text-blueprint-white transition-colors tracking-widest flex items-center gap-2">
                          <span>EML:</span> {c.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TerminalContent>
          </Terminal>

          {/* Location & Institution */}
          <Terminal output="" autoScroll={false} className="border-blueprint-accent/30 rounded-none bg-blueprint-navy/80 h-fit">
            <TerminalHeader className="border-blueprint-accent/20 bg-blueprint-accent/5">
              <TerminalTitle className="text-blueprint-accent tracking-widest font-mono uppercase">
                LOC // HEADQUARTERS
              </TerminalTitle>
            </TerminalHeader>
            <TerminalContent className="p-6">
              <div className="flex flex-col gap-6">
                {[
                  { label: "INSTITUTION", value: "Vignan's Foundation for Science, Technology & Research" },
                  { label: "DEPARTMENT", value: "Civil Engineering — U Block" },
                  { label: "EVENT DATES", value: "9—10 October 2026" },
                ].map(({ label, value }) => (
                  <div key={label} className="border-l-2 border-blueprint-accent/40 pl-4">
                    <div className="font-mono text-[10px] tracking-widest text-blueprint-accent uppercase mb-1">
                      {label}
                    </div>
                    <div className="font-sans text-sm text-blueprint-white/90 leading-relaxed uppercase tracking-wider">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </TerminalContent>
          </Terminal>

        </div>
      </div>
    </section>
  );
}
