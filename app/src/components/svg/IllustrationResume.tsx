import React from 'react';
import { motion } from 'framer-motion';

export function IllustrationResume({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="docGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Document Base */}
        <motion.rect x="30" y="20" width="40" height="60" rx="2" fill="url(#docGlow)" stroke="hsl(var(--primary))" strokeWidth="1.5" 
          initial={{ y: 10 }} whileInView={{ y: 0 }} transition={{ type: "spring", bounce: 0.4 }} />
        
        {/* Profile Circle */}
        <circle cx="50" cy="35" r="5" fill="hsl(var(--primary))" fillOpacity="0.5" />
        
        {/* Lines */}
        <motion.path d="M40 48 H60 M40 55 H55 M40 62 H60 M40 69 H50" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" 
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
          
        {/* Growth Arrow */}
        <motion.path d="M75 50 L85 40 L90 45" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" 
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
        <motion.path d="M85 40 L85 55" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" fill="none" 
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 1 }} />
      </motion.svg>
    </div>
  );
}
