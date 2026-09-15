"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function BlueprintGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(gridRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30 dark:opacity-40">
      <div
        ref={gridRef}
        className="absolute inset-[-5%] w-[110%] h-[110%]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          color: "var(--color-border)",
        }}
      >
        {/* Major grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 2px, transparent 2px),
              linear-gradient(to bottom, currentColor 2px, transparent 2px)
            `,
            backgroundSize: "300px 300px",
            opacity: 0.5,
            color: "var(--color-primary)",
          }}
        />
        
        {/* Survey Markers at intersections */}
        <svg className="absolute inset-0 w-full h-full">
          <pattern id="crosshair" width="300" height="300" patternUnits="userSpaceOnUse">
            <path d="M -5,0 L 5,0 M 0,-5 L 0,5" stroke="currentColor" strokeWidth="2" className="text-primary" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#crosshair)" />
        </svg>
      </div>
      
      {/* Vignette fade out at edges */}
      <div className="absolute inset-0 bg-background/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_90%)]" />
    </div>
  );
}
