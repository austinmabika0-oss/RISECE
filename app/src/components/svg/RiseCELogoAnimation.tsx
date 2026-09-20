"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function RiseCELogoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect accessibility settings
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(".logo-final", { opacity: 1 });
      gsap.set(".logo-svg", { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Ensure initial dasharrays
      gsap.set(".logo-circle circle, .logo-arch path, .logo-support", {
        strokeDasharray: (i, t) => t.getTotalLength ? t.getTotalLength() : 200,
        strokeDashoffset: (i, t) => t.getTotalLength ? t.getTotalLength() : 200
      });

      // 1. Technical Target
      tl.fromTo(".logo-target", 
        { opacity: 0, scale: 0.8, rotate: -45, transformOrigin: "center center" }, 
        { opacity: 0.4, scale: 1, rotate: 0, duration: 1.5, ease: "power2.out" }
      );

      // 2. Outer Circle Construction
      tl.to(".logo-circle circle", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.2
      }, "-=1");

      // 3. Internal Structural Geometry
      tl.to(".logo-arch path", { 
        strokeDashoffset: 0, 
        duration: 1, 
        ease: "power2.out" 
      }, "-=0.5")
      .to(".logo-support", { 
        strokeDashoffset: 0, 
        duration: 0.5, 
        stagger: { amount: 0.4, from: "center" }, 
        ease: "power1.out" 
      }, "-=0.5");

      // 4. Arrow and "RISE" / "CE"
      tl.fromTo(".logo-arrow", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(2)" }
      )
      .fromTo(".logo-text-rise", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 
        "-=0.2"
      )
      .fromTo(".logo-text-ce", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 
        "-=0.3"
      );

      // 5. Outer Details
      tl.fromTo(".logo-motto", 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: "power2.inOut" }, 
        "-=0.2"
      );

      // 6. Final Lock - technical pulse then swap
      tl.to(".logo-svg", { filter: "brightness(1.5)", duration: 0.2, yoyo: true, repeat: 1 }, "+=0.5")
        .to(".logo-svg", { opacity: 0, duration: 1, ease: "power2.inOut" }, "+=0.2")
        .to(".logo-final", { opacity: 1, duration: 1, ease: "power2.inOut" }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96 flex items-center justify-center">
      
      {/* Dynamic SVG Construction */}
      <svg viewBox="0 0 400 400" className="logo-svg absolute inset-0 w-full h-full text-foreground z-10">
        
        {/* Technical Target (Blueprint style) */}
        <g className="logo-target" stroke="#00ffff" strokeWidth="1" strokeDasharray="4 4" opacity="0">
          <line x1="200" y1="20" x2="200" y2="380" />
          <line x1="20" y1="200" x2="380" y2="200" />
          <circle cx="200" cy="200" r="190" fill="none" />
          <circle cx="200" cy="200" r="100" fill="none" opacity="0.3" />
        </g>

        {/* Outer Circular Geometry */}
        <g fill="none" stroke="currentColor" strokeWidth="2" className="logo-circle">
          <circle cx="200" cy="200" r="160" />
          <circle cx="200" cy="200" r="145" strokeWidth="1" />
        </g>
        
        {/* Bridge Structural Arch */}
        <g fill="none" stroke="currentColor" strokeWidth="2" className="logo-arch">
          <path d="M 80 260 Q 200 120 320 260" />
        </g>
        
        {/* Structural Supports */}
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="120" y1="210" x2="120" y2="260" className="logo-support" />
          <line x1="160" y1="165" x2="160" y2="260" className="logo-support" />
          <line x1="200" y1="150" x2="200" y2="260" className="logo-support" />
          <line x1="240" y1="165" x2="240" y2="260" className="logo-support" />
          <line x1="280" y1="210" x2="280" y2="260" className="logo-support" />
        </g>

        {/* Central Arrow */}
        <polygon points="200,90 220,120 180,120" fill="var(--color-primary, #ea580c)" className="logo-arrow opacity-0" />

        {/* Text Elements */}
        <g textAnchor="middle" className="font-display">
          <text x="160" y="240" fontSize="48" fontWeight="bold" fill="currentColor" className="logo-text-rise opacity-0">RISE</text>
          <text x="260" y="240" fontSize="48" fontWeight="bold" fill="var(--color-primary, #ea580c)" className="logo-text-ce opacity-0">CE</text>
        </g>

        {/* Motto Text */}
        <g className="logo-motto opacity-0 font-mono text-[11px]" textAnchor="middle" fill="currentColor" letterSpacing="2">
          {/* Top curve */}
          <path id="arc-top" d="M 60 200 A 140 140 0 0 1 340 200" fill="transparent" />
          <text>
            <textPath href="#arc-top" startOffset="50%" textAnchor="middle">WHERE ENGINEERS RISE</textPath>
          </text>
          
          {/* Bottom curve - reversed so text is readable left to right */}
          <path id="arc-bottom" d="M 340 210 A 140 140 0 0 1 60 210" fill="transparent" />
          <text fontSize="10">
            <textPath href="#arc-bottom" startOffset="50%" textAnchor="middle">Resilience, Innovation, Strength, Excellence</textPath>
          </text>
        </g>
      </svg>
      
      {/* Final Official Logo */}
      <img 
        src="/logos/custom_logo.png" 
        alt="Official RISE CE Logo" 
        className="logo-final absolute inset-0 w-full h-full object-contain opacity-0 z-20 pointer-events-none drop-shadow-2xl" 
      />

    </div>
  );
}
