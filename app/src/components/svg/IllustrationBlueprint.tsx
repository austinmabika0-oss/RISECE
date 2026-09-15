import React from 'react';
import { motion } from 'framer-motion';

export function IllustrationBlueprint({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Background Grid */}
        <path d="M10 20 H90 M10 40 H90 M10 60 H90 M10 80 H90 M20 10 V90 M40 10 V90 M60 10 V90 M80 10 V90" stroke="hsl(var(--primary))" strokeOpacity="0.1" strokeWidth="0.5" />
        {/* Bridge Vector */}
        <motion.path d="M20 70 Q 50 20 80 70" stroke="url(#blueGlow)" strokeWidth="3" fill="none" filter="url(#glow)"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }} />
        <path d="M20 70 L 20 80 M40 50 L 40 80 M60 50 L 60 80 M80 70 L 80 80" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.6" />
        {/* Tech Nodes */}
        <circle cx="20" cy="70" r="3" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <circle cx="80" cy="70" r="3" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <circle cx="50" cy="35" r="4" fill="hsl(var(--primary))" filter="url(#glow)" />
      </motion.svg>
    </div>
  );
}
