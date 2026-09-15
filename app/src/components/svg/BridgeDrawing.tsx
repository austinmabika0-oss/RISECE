"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function BridgeDrawing() {
  const bridgeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!bridgeRef.current) return;

    // Get all paths in the SVG
    const paths = bridgeRef.current.querySelectorAll("path, line, polyline");
    
    // Initial state: hide all paths
    gsap.set(paths, { 
      strokeDasharray: (i, target) => {
        const length = target.getTotalLength ? target.getTotalLength() : 1000;
        return length;
      },
      strokeDashoffset: (i, target) => {
        const length = target.getTotalLength ? target.getTotalLength() : 1000;
        return length;
      },
      opacity: 1
    });

    // Create drawing animation timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate main structural beams (longer duration)
    tl.to(".bridge-main", {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      stagger: 0.2
    })
    // Animate truss members (faster, staggered)
    .to(".bridge-truss", {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power1.out",
      stagger: {
        amount: 1.5,
        from: "center"
      }
    }, "-=1")
    // Animate annotations and markers
    .to(".bridge-annotation", {
      strokeDashoffset: 0,
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.1
    }, "-=0.5")
    .to(".bridge-node", {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: "back.out(2)"
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none opacity-80">
      <svg
        ref={bridgeRef}
        viewBox="0 0 1000 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-full max-w-5xl text-foreground"
        style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.1))" }}
      >
        {/* Nodes (hidden initially for scale animation) */}
        <g style={{ transformOrigin: "center" }}>
          {[100, 300, 500, 700, 900].map((x, i) => (
            <circle key={`node-t-${i}`} cx={x} cy="100" r="4" fill="var(--color-background)" stroke="var(--color-primary)" strokeWidth="2" className="bridge-node opacity-0" style={{ transformOrigin: `${x}px 100px` }} />
          ))}
          {[0, 200, 400, 600, 800, 1000].map((x, i) => (
            <circle key={`node-b-${i}`} cx={x} cy="300" r="4" fill="var(--color-background)" stroke="var(--color-primary)" strokeWidth="2" className="bridge-node opacity-0" style={{ transformOrigin: `${x}px 300px` }} />
          ))}
        </g>

        {/* Main Beams */}
        <path d="M 100 100 L 900 100" className="bridge-main" strokeWidth="4" />
        <path d="M 0 300 L 1000 300" className="bridge-main" strokeWidth="6" />
        
        {/* Truss Diagonals */}
        <path d="M 0 300 L 100 100 L 200 300 L 300 100 L 400 300 L 500 100 L 600 300 L 700 100 L 800 300 L 900 100 L 1000 300" className="bridge-truss" stroke="var(--color-primary)" />
        
        {/* Vertical Members */}
        <path d="M 100 100 L 100 300 M 300 100 L 300 300 M 500 100 L 500 300 M 700 100 L 700 300 M 900 100 L 900 300" className="bridge-truss" />
        
        {/* Annotations & Dimensions */}
        <g className="text-muted-foreground font-mono text-[10px]" strokeWidth="1">
          {/* Top dimension line */}
          <path d="M 100 60 L 900 60" className="bridge-annotation" strokeDasharray="4 4" />
          <path d="M 100 50 L 100 70 M 900 50 L 900 70" className="bridge-annotation" />
          <text x="500" y="50" fill="currentColor" stroke="none" textAnchor="middle" className="bridge-node opacity-0">800.00 m</text>
          
          {/* Vertical dimension line */}
          <path d="M 940 100 L 940 300" className="bridge-annotation" strokeDasharray="4 4" />
          <path d="M 930 100 L 950 100 M 930 300 L 950 300" className="bridge-annotation" />
          <text x="960" y="200" fill="currentColor" stroke="none" alignmentBaseline="middle" className="bridge-node opacity-0">200.00 m</text>
        </g>
      </svg>
    </div>
  );
}
