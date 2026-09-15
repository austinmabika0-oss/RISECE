"use client";

export default function Footer() {
  return (
    <footer
      className="relative bg-[#040507] pt-24 pb-12 overflow-hidden border-t border-[rgba(0,229,255,0.1)]"
      aria-label="Footer"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[#00E5FF] opacity-5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          
          {/* Brand */}
          <div>
            <div className="font-display text-4xl text-white tracking-wide mb-2">
              RISECE <span className="text-glow-cyan">2K26</span>
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-[#00E5FF] uppercase mb-6">
              Resilience · Innovation · Strength · Excellence
            </div>
            <p className="font-sans text-[0.9rem] leading-relaxed text-[#849bb3]">
              National Level Civil Engineering Technical Fest<br />
              9–10 October 2026 · Vignan University
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#B89033] uppercase mb-6">
              Navigation Roster
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "About Mission", href: "#about" },
                { label: "Operations (Events)", href: "#events" },
                { label: "Timeline (Schedule)", href: "#schedule" },
                { label: "Partners (Sponsors)", href: "#sponsors" },
                { label: "Communications (Contact)", href: "#contact" },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="font-mono text-[11px] tracking-[0.1em] text-[#849bb3] hover:text-[#00E5FF] transition-colors"
                >
                  <span className="text-[rgba(0,229,255,0.5)] mr-2">/</span> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Institution info */}
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#B89033] uppercase mb-6">
              Headquarters
            </div>
            <div className="font-sans text-[0.9rem] leading-relaxed text-[#849bb3]">
              <div className="text-[#f0f4f8] font-medium mb-1">Vignan&apos;s Foundation for Science, Technology &amp; Research</div>
              Department of Civil Engineering<br />
              U Block, Vadlamudi, Guntur<br />
              Andhra Pradesh, India<br /><br />
              <a href="mailto:drava_civil@vignan.ac.in" className="font-mono text-[11px] text-[#00E5FF] hover:text-white transition-colors">
                drava_civil@vignan.ac.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="font-mono text-[9px] tracking-[0.15em] text-[#849bb3] uppercase">
            © 2026 RISECE 2K26 · DEPT. OF CIVIL ENGINEERING · ALL RIGHTS RESERVED
          </div>
          <div className="font-mono text-[9px] tracking-[0.2em] text-[#00E5FF] uppercase">
            SYS.DWG.RSC-2K26
          </div>
        </div>
      </div>
    </footer>
  );
}
