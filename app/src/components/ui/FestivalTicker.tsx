"use client";

import { motion } from "framer-motion";

interface FestivalTickerProps {
  items: string[];
}

export function FestivalTicker({ items }: FestivalTickerProps) {
  // Duplicate items to ensure smooth infinite scroll
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-primary text-primary-foreground py-2 border-y border-primary/20 flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed here
        }}
      >
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold mx-6">
              {item}
            </span>
            <span className="text-primary-foreground/50 opacity-50 text-[10px]">
              {index % 2 === 0 ? "◆" : "×"}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
