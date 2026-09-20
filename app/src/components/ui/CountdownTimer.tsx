"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Target date: October 9, 2026 09:00:00
const TARGET_DATE = new Date("2026-10-09T09:00:00").getTime();

export function CountdownTimer({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return <div className="flex justify-center gap-4 py-8 opacity-0">Loading timer...</div>;
  }

  const timeUnits = [
    { label: "DAYS", shortLabel: "D", value: timeLeft.days },
    { label: "HOURS", shortLabel: "H", value: timeLeft.hours },
    { label: "MINS", shortLabel: "M", value: timeLeft.minutes },
    { label: "SECS", shortLabel: "S", value: timeLeft.seconds },
  ];

  if (variant === "compact") {
    return (
      <div className="flex items-center justify-between w-full">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={unit.value}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                className="font-mono text-xl sm:text-2xl font-bold text-primary tracking-tight"
              >
                {unit.value.toString().padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
            <div className="mt-0.5 text-[8px] font-mono font-medium text-muted-foreground/80 uppercase tracking-wide">
              {unit.shortLabel}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 p-4 bg-card/50 backdrop-blur-sm border border-border inline-flex">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center overflow-hidden border border-primary/30 bg-background text-primary shadow-[inset_0_0_15px_rgba(0,229,255,0.1)]">
            {/* Crosshairs inside box */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary/50" />
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-primary/50" />
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-primary/50" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-primary/50" />
            
            <AnimatePresence mode="popLayout">
              <motion.div
                key={unit.value}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="font-mono text-3xl sm:text-4xl font-bold tracking-tighter"
              >
                {unit.value.toString().padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-2 text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-1">
            <span className="w-1 h-1 bg-primary/50 rounded-full" />
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
