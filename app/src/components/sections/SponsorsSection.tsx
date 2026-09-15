"use client";

import { IconBuildingSkyscraper, IconUsers } from "@tabler/icons-react";

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="relative py-24 bg-blueprint-navy border-t border-blueprint-cyan/20">
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,163,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,163,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Engineering Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-blueprint-cyan/20 pb-4">
          <IconBuildingSkyscraper className="text-blueprint-cyan" size={24} />
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-blueprint-white uppercase">
            Project Sponsors
          </h2>
          <div className="ml-auto hidden md:block text-blueprint-cyan/50 font-mono text-xs tracking-widest uppercase">
            TIER: ALL
          </div>
        </div>

        {/* Sponsor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { tier: "PLATINUM", limit: 2, color: "text-blueprint-cyan", border: "border-blueprint-cyan" },
            { tier: "GOLD", limit: 3, color: "text-blueprint-accent", border: "border-blueprint-accent" },
            { tier: "SILVER", limit: 4, color: "text-blueprint-white", border: "border-blueprint-white/40" },
          ].map(({ tier, limit, color, border }) => (
            <div key={tier} className="blueprint-panel p-6 bg-blueprint-navy/80">
              <div className="flex items-center justify-between mb-6 border-b border-blueprint-cyan/20 pb-4">
                <div className={`font-mono text-sm tracking-widest uppercase ${color}`}>
                  {tier} PARTNER
                </div>
                <div className="font-mono text-[9px] text-blueprint-white/40 tracking-widest">
                  [MAX: {limit}]
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                {Array.from({ length: limit }).map((_, i) => (
                  <div key={i} className={`h-16 flex items-center justify-center border ${border} border-dashed bg-blueprint-navy/50 opacity-40 hover:opacity-100 transition-opacity cursor-pointer`}>
                    <div className="flex items-center gap-2">
                      <IconUsers size={16} className={color} />
                      <div className="font-mono text-[9px] tracking-widest uppercase text-blueprint-white/70">
                        {tier} SLOT {i + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 border border-blueprint-accent/40 bg-blueprint-accent/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-blueprint-accent tracking-widest uppercase mb-2">
              UNIVERSITY MATCHING CONTRIBUTION
            </div>
            <div className="font-display text-5xl text-blueprint-white tracking-widest">
              ₹12,50,000
            </div>
            <div className="font-mono text-[10px] text-blueprint-white/50 tracking-widest mt-2 uppercase">
              Vignan University matches external sponsorship equally.
            </div>
          </div>
          <a
            href="mailto:drava_civil@vignan.ac.in"
            className="border border-blueprint-accent bg-blueprint-accent/10 hover:bg-blueprint-accent/30 text-blueprint-accent font-mono text-sm tracking-widest uppercase px-8 py-4 transition-colors"
          >
            BECOME A PARTNER
          </a>
        </div>
      </div>
    </section>
  );
}
