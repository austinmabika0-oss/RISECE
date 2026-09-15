"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@/data/events";
import Link from "next/link";

export function StackedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = events.length;

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <div
        className="relative w-full aspect-[3/4] max-w-[340px]"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
      >
        <AnimatePresence>
          {events.map((event, i) => {
            // Calculate position relative to active card
            let offset = i - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            // Only render cards within visible range for performance
            if (absOffset > 3) return null;

            return (
              <motion.div
                key={event.id}
                className="absolute inset-0 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={{
                  z: -absOffset * 60,
                  y: offset * 25,
                  x: offset * 8,
                  rotateX: offset * -3,
                  rotateZ: offset * 1.5,
                  scale: 1 - absOffset * 0.08,
                  opacity: 1 - absOffset * 0.25,
                  filter: isActive ? "blur(0px)" : `blur(${absOffset * 1.5}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 1,
                }}
                onClick={() => {
                  if (offset > 0) next();
                  else if (offset < 0) prev();
                }}
              >
                <div
                  className="w-full h-full rounded-2xl border flex flex-col justify-between p-8 overflow-hidden transition-colors"
                  style={{
                    backgroundColor: "var(--color-card)",
                    borderColor: isActive ? event.color : "var(--color-border)",
                    boxShadow: isActive
                      ? `0 20px 40px -10px ${event.color}40, inset 0 1px 0 ${event.color}20`
                      : "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Glowing background gradient on active */}
                  {isActive && (
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-1000"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${event.color}, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* Card top */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className="p-3 rounded-xl inline-block"
                        style={{
                          backgroundColor: `${event.color}15`,
                          color: event.color,
                        }}
                      >
                        {event.icon}
                      </div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                        {event.code}
                      </span>
                    </div>
                    
                    <h4 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2">
                      {event.title}
                    </h4>
                    <p className="font-medium text-xs text-muted-foreground tracking-wide uppercase">
                      {event.subtitle}
                    </p>
                  </div>

                  {/* Card bottom */}
                  <div className="relative z-10">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
                      {event.overview}
                    </p>
                    
                    {isActive ? (
                      <Link
                        href={`/events/${event.slug}`}
                        className="w-full py-3 rounded-full flex items-center justify-center font-bold text-sm transition-transform hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: event.color,
                          color: "#fff",
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        Explore Event
                      </Link>
                    ) : (
                      <div className="w-full py-3 rounded-full flex items-center justify-center font-bold text-sm bg-secondary text-secondary-foreground opacity-50">
                        View Details
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 mt-4">
        {events.map((event, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: i === activeIndex ? event.color : "var(--color-border)",
              width: i === activeIndex ? "24px" : "8px",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
