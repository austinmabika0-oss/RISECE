"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import gsap from "gsap";

interface ThemeWaveContextType {
  toggleTheme: (event: React.MouseEvent) => void;
}

const ThemeWaveContext = createContext<ThemeWaveContextType | undefined>(undefined);

export const useThemeWave = () => {
  const context = useContext(ThemeWaveContext);
  if (!context) {
    throw new Error("useThemeWave must be used within a ThemeWaveProvider");
  }
  return context;
};

// SVG Overlay that appears during transition
const WaveScannerOverlay = () => {
  return (
    <div id="theme-scanner-overlay" className="fixed inset-0 pointer-events-none z-[9999] hidden">
      <svg className="w-full h-full" style={{ filter: "drop-shadow(0 0 10px rgba(0,229,255,0.5))" }}>
        <circle id="scanner-ring" cx="50%" cy="50%" r="0" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary opacity-50" />
        <circle id="scanner-core" cx="50%" cy="50%" r="4" fill="currentColor" className="text-primary" />
        
        {/* Crosshairs */}
        <line id="scanner-v" x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-primary opacity-20" />
        <line id="scanner-h" x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-primary opacity-20" />
      </svg>
    </div>
  );
};

export function ThemeWaveProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      {mounted ? (
        <ThemeWaveWrapper>{children}</ThemeWaveWrapper>
      ) : (
        // During SSR and initial hydration, provide a dummy context
        <ThemeWaveContext.Provider value={{ toggleTheme: () => {} }}>
          {children}
        </ThemeWaveContext.Provider>
      )}
    </NextThemesProvider>
  );
}

// Inner component to safely use useTheme
function ThemeWaveWrapper({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = async (event: React.MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    
    const newTheme = theme === "dark" ? "light" : "dark";

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Set SVG scanner positions
    const overlay = document.getElementById("theme-scanner-overlay");
    const ring = document.getElementById("scanner-ring");
    const core = document.getElementById("scanner-core");
    const vLine = document.getElementById("scanner-v");
    const hLine = document.getElementById("scanner-h");

    if (overlay && ring && core && vLine && hLine) {
      overlay.style.display = "block";
      
      // Update SVG elements to center on the click
      ring.setAttribute("cx", `${x}`);
      ring.setAttribute("cy", `${y}`);
      core.setAttribute("cx", `${x}`);
      core.setAttribute("cy", `${y}`);
      vLine.setAttribute("x1", `${x}`);
      vLine.setAttribute("x2", `${x}`);
      hLine.setAttribute("y1", `${y}`);
      hLine.setAttribute("y2", `${y}`);

      // GSAP Animation for the scanning ring
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      gsap.fromTo(ring, 
        { attr: { r: 0 }, opacity: 1 },
        { attr: { r: endRadius }, opacity: 0, duration: 1.2, ease: "power2.out" }
      );
      
      gsap.fromTo([core, vLine, hLine],
        { opacity: 1 },
        { opacity: 0, duration: 0.5, delay: 0.5 }
      );
    }

    // Native View Transition for the actual DOM colors
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
        ],
        {
          duration: 1200,
          easing: "cubic-bezier(0.19, 1, 0.22, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      
      // Cleanup overlay after transition
      setTimeout(() => {
        if (overlay) overlay.style.display = "none";
      }, 1200);
    });
  };

  return (
    <ThemeWaveContext.Provider value={{ toggleTheme }}>
      <WaveScannerOverlay />
      {children}
    </ThemeWaveContext.Provider>
  );
}
