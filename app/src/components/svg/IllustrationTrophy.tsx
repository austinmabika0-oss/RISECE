import React from 'react';
import { motion } from 'framer-motion';

export function IllustrationTrophy({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Confetti */}
        <motion.circle cx="20" cy="30" r="2" fill="hsl(var(--primary))" initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 0.8 }} transition={{ duration: 0.5, delay: 0.4 }} />
        <motion.circle cx="80" cy="40" r="1.5" fill="hsl(var(--primary))" initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 0.6 }} transition={{ duration: 0.5, delay: 0.6 }} />
        <motion.rect x="70" y="20" width="3" height="3" fill="hsl(var(--primary))" transform="rotate(45 71.5 21.5)" initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 0.7 }} transition={{ duration: 0.5, delay: 0.5 }} />
        
        {/* Base */}
        <path d="M35 80 L65 80 L60 85 L40 85 Z" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
        <path d="M45 80 L45 65 L55 65 L55 80" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
        
        {/* Cup */}
        <motion.path d="M25 35 Q 25 65 50 65 Q 75 65 75 35 Z" fill="url(#goldGlow)" stroke="hsl(var(--primary))" strokeWidth="1.5" 
          initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.2 }} />
        
        {/* Handles */}
        <path d="M25 40 C 15 40 15 55 28 55" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
        <path d="M75 40 C 85 40 85 55 72 55" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
      </motion.svg>
    </div>
  );
}
