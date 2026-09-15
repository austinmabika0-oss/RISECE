import React from 'react';
import { motion } from 'framer-motion';

export function IllustrationNetwork({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="netGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Links */}
        <motion.path d="M50 30 L30 50 L50 70 L70 50 Z" stroke="url(#netGlow)" strokeWidth="1.5" fill="none" 
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.3 }} />
        <motion.path d="M50 30 L50 70 M30 50 L70 50" stroke="hsl(var(--primary))" strokeWidth="0.75" strokeOpacity="0.5" fill="none" 
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />

        {/* Outer Links */}
        <path d="M30 50 L15 40 M70 50 L85 60 M50 30 L65 15 M50 70 L35 85" stroke="hsl(var(--primary))" strokeWidth="0.75" strokeOpacity="0.3" fill="none" />
        
        {/* Nodes */}
        <motion.circle cx="50" cy="30" r="4" fill="hsl(var(--primary))" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }} />
        <motion.circle cx="30" cy="50" r="4" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }} />
        <motion.circle cx="70" cy="50" r="5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }} />
        <motion.circle cx="50" cy="70" r="3" fill="hsl(var(--primary))" fillOpacity="0.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.6 }} />
        
        {/* Pulsing ring */}
        <motion.circle cx="70" cy="50" r="8" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none" 
          initial={{ scale: 0.8, opacity: 1 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ repeat: Infinity, duration: 2 }} />
      </motion.svg>
    </div>
  );
}
