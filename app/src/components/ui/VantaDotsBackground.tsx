"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-expect-error Vanta does not have type definitions
import DOTS from "vanta/dist/vanta.dots.min.js";

export function VantaDotsBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!vantaEffect.current && vantaRef.current) {
      if (typeof window !== "undefined") {
        // @ts-expect-error Attaching to window for Vanta compatibility
        window.THREE = THREE;
      }
      try {
        vantaEffect.current = DOTS({
          el: vantaRef.current,
          THREE,
          color: 0x00A8D6,
          color2: 0x00A8D6,
          backgroundColor: 0xffffff,
          backgroundAlpha: 0, // Ensure transparency
          size: 3.5, // Small/subtle size
          spacing: 35, // Moderate spacing
          showLines: false, // Ensure no lines, just dots
          mouseControls: true, // Subtle desktop interaction
          touchControls: false, // Disable for mobile safety
          gyroControls: false,
        });
      } catch (e) {
        console.error("[Vanta] Error initializing:", e);
      }
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []); // Run once on mount, completely independent of theme changes

  return (
    <div 
      ref={vantaRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30" // Subtle opacity
    />
  );
}
