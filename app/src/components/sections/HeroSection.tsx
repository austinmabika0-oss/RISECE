"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconMapPin, IconRulerMeasure, IconSettings } from "@tabler/icons-react";
import { Button } from "@/components/ui/shadcn/button";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onRegister }: { onRegister: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bridgeLinesRef = useRef<SVGGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    // Initial load animation (runs immediately)
    gsap.from(gridRef.current, { opacity: 0, duration: 2, ease: "power2.inOut" });
    gsap.from(".survey-point", { opacity: 0, scale: 0, duration: 1, stagger: 0.2, delay: 1 });
    
    // Scroll driven animation
    tl.to(bridgeLinesRef.current?.querySelectorAll("path") || [], {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.1,
      ease: "none",
    })
    .to(".structural-member", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
    }, "-=1")
    .to(".eng-label", {
      opacity: 1,
      duration: 1,
    }, "-=0.5")
    .fromTo(contentRef.current, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 2,
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-blueprint-navy overflow-hidden flex items-center justify-center">
      
      {/* Blueprint Grid Background */}
      <div ref={gridRef} className="absolute inset-0 blueprint-bg opacity-40 z-0"></div>

      {/* Survey Points */}
      <div className="absolute top-[20%] left-[10%] survey-point text-blueprint-cyan opacity-80 z-10 flex items-center gap-2">
        <IconMapPin size={20} />
        <span className="font-mono text-xs">LAT: 16.234 / LON: 80.567</span>
      </div>
      <div className="absolute bottom-[20%] right-[10%] survey-point text-blueprint-cyan opacity-80 z-10 flex items-center gap-2">
        <IconRulerMeasure size={20} />
        <span className="font-mono text-xs">ELEV: +14.5m</span>
      </div>

      {/* Bridge SVG Graphic (Structural Drawing) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-20 md:opacity-40">
        <svg viewBox="0 0 1000 400" className="w-full max-w-5xl">
          <g ref={bridgeLinesRef}>
            <path d="M50 350 L950 350" stroke="#00E5FF" strokeWidth="2" fill="none" className="line-draw" />
            <path d="M200 350 L200 150 L500 100 L800 150 L800 350" stroke="#00E5FF" strokeWidth="2" fill="none" className="line-draw" />
            <path d="M200 150 L350 250 L500 100 L650 250 L800 150" stroke="#00E5FF" strokeWidth="1" fill="none" strokeDasharray="5,5" className="line-draw" />
            <path d="M350 250 L350 350 M650 250 L650 350 M500 100 L500 350" stroke="#00E5FF" strokeWidth="1" fill="none" className="line-draw" />
          </g>
          
          {/* Structural Members (fade in on scroll) */}
          <g className="structural-member opacity-0 -translate-y-4">
            <rect x="180" y="350" width="40" height="50" fill="#00E5FF" fillOpacity="0.2" stroke="#00E5FF" />
            <rect x="780" y="350" width="40" height="50" fill="#00E5FF" fillOpacity="0.2" stroke="#00E5FF" />
          </g>

          {/* Labels */}
          <g className="eng-label opacity-0 font-mono text-[10px] fill-blueprint-cyan">
            <text x="450" y="80">MAIN PYLON (T1)</text>
            <text x="210" y="240">TENSION CABLE A</text>
            <text x="700" y="240">TENSION CABLE B</text>
            <text x="470" y="380">DECK SPAN L=450m</text>
          </g>
        </svg>
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-20 flex flex-col items-center justify-center text-center p-6 blueprint-panel">
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blueprint-cyan -translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blueprint-cyan translate-x-1 translate-y-1"></div>
        
        <div className="font-mono text-blueprint-cyan mb-4 tracking-widest text-sm flex items-center justify-center gap-2">
          <IconSettings className="animate-spin-slow" size={16} />
          PROJECT: VIGNAN UNIV / CIVIL ENG
        </div>
        
        <h1 className="font-display text-5xl md:text-8xl text-blueprint-white tracking-wide mb-2 uppercase">
          DESIGN. <span className="text-blueprint-cyan">BUILD.</span> RISE.
        </h1>
        
        <h2 className="font-mono text-xl md:text-3xl text-blueprint-white opacity-90 mb-8">
          RISECE 2K26
        </h2>
        
        <p className="max-w-2xl text-blueprint-white opacity-70 font-mono text-sm md:text-base mb-8 uppercase leading-relaxed">
          The Premier National-Level Technical Symposium.<br/>
          October 9th & 10th, 2026.<br/>
          Blueprint your legacy.
        </p>

        <div className="flex gap-4">
          <Button 
            onClick={onRegister}
            className="rounded-none border border-blueprint-cyan bg-blueprint-cyan/10 hover:bg-blueprint-cyan/30 text-blueprint-cyan font-mono uppercase tracking-widest px-8"
          >
            Access Terminal
          </Button>
          <Button 
            variant="outline"
            className="rounded-none border-blueprint-white/20 text-blueprint-white hover:bg-blueprint-white/10 font-mono uppercase tracking-widest px-8"
          >
            View Specs
          </Button>
        </div>
      </div>

    </section>
  );
}
