"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING");

  useEffect(() => {
    let currentProgress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600); // Hold at 100% briefly
      }
      setProgress(currentProgress);
      
      // Cipher text effect
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
      if (currentProgress < 30) setText("ESTABLISHING_LINK");
      else if (currentProgress < 70) setText("LOADING_BLUEPRINTS");
      else if (currentProgress < 100) setText("RENDERING_VIRTUAL_SPACE");
      else setText("SYSTEM_READY");

      // Random scramble effect every few ticks
      if (Math.random() > 0.7 && currentProgress < 100) {
        setText(Array(15).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
      }

    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#040507]"
        >
          {/* Radial cyan glow behind spinner */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00E5FF] opacity-10 rounded-full blur-[60px]" />
          
          {/* Circular Spinner */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Outer dashed ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="1" strokeDasharray="4 8" />
            </svg>
            {/* Inner solid ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite_reverse]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="2" strokeDasharray="60 180" />
            </svg>

            <div className="text-[#00E5FF] font-display text-4xl" style={{ textShadow: "0 0 10px rgba(0, 229, 255, 0.5)" }}>
              {progress}%
            </div>
          </div>

          <div className="mt-8 font-mono text-[10px] tracking-[0.2em] text-[#849bb3] uppercase h-4">
            {text}
          </div>
          
          <div className="mt-4 w-48 h-1 bg-[rgba(0,229,255,0.1)] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#00E5FF]"
              style={{ width: `${progress}%`, boxShadow: "0 0 10px #00E5FF" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
