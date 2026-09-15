"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { events } from "@/data/events";

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState<"Day 1" | "Day 2">("Day 1");
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "phase-1") setActiveDay("Day 1");
            if (entry.target.id === "phase-2") setActiveDay("Day 2");
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    if (phase1Ref.current) observer.observe(phase1Ref.current);
    if (phase2Ref.current) observer.observe(phase2Ref.current);

    return () => observer.disconnect();
  }, []);

  const scrollToPhase = (phase: "Day 1" | "Day 2") => {
    const target = phase === "Day 1" ? phase1Ref.current : phase2Ref.current;
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const sortEvents = (dateString: string) => {
    return events
      .filter(e => e.date === dateString)
      .sort((a, b) => {
        const timeA = new Date(`2000-01-01 ${a.time}`).getTime();
        const timeB = new Date(`2000-01-01 ${b.time}`).getTime();
        return timeA - timeB;
      });
  };

  const day1Events = sortEvents("Oct 9, 2026");
  const day2Events = sortEvents("Oct 10, 2026");

  const renderEvent = (event: any, i: number) => (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: i * 0.1 }}
      className="relative group"
    >
      <div className="absolute top-6 left-[-32px] md:left-[-48px] w-8 md:w-12 h-px bg-border/50 group-hover:bg-primary transition-colors" />
      <div className="absolute top-[22px] left-[-36px] md:left-[-52px] w-2 h-2 border border-primary bg-background group-hover:bg-primary transition-colors" />
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-card/50 border border-border group-hover:border-primary/50 transition-colors">
        <div className="md:w-32 flex-shrink-0">
          <div className="font-mono text-xl font-bold text-primary group-hover:text-primary transition-colors">
            {event.time}
          </div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase mt-1">Local Time</div>
        </div>
        <div className="flex-grow border-l border-border/50 pl-4 md:pl-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 border border-primary/20 bg-primary/5 text-[10px] font-mono text-primary uppercase">
              ID: {event.code}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 font-sans">
            {event.subtitle}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border border-border/50 text-[10px] font-mono text-muted-foreground uppercase">
            <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
            VENUE: {event.venue}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="min-h-screen relative flex flex-col">
      <div className="absolute inset-0 bg-ambient-light dark:bg-ambient-dark -z-10 pointer-events-none opacity-20" />
      <Navbar />

      <section className="pt-32 pb-24 px-4 md:px-6 relative z-10 flex-grow">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Construction Milestones
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
              EXECUTION <span className="text-primary">PLAN</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm">Sequence of operations and critical path events.</p>
          </div>

          {/* Sticky Tab Navigation */}
          <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md pt-4 pb-4 flex gap-2 mb-12 border-b border-border/50">
            <button
              onClick={() => scrollToPhase("Day 1")}
              className={`px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-colors ${
                activeDay === "Day 1" ? "bg-primary text-primary-foreground border-t border-l border-r border-primary" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              PHASE_1 [OCT 09]
            </button>
            <button
              onClick={() => scrollToPhase("Day 2")}
              className={`px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-colors ${
                activeDay === "Day 2" ? "bg-primary text-primary-foreground border-t border-l border-r border-primary" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              PHASE_2 [OCT 10]
            </button>
          </div>

          {/* Continuous Timeline */}
          <div className="relative border-l border-border/50 pl-8 ml-4 md:ml-0 md:pl-12 pb-12">
            {/* The pulsing routing line origin */}
            <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-primary" />
            
            {/* PHASE 1 */}
            <div id="phase-1" ref={phase1Ref} className="space-y-8 pt-4">
              <div className="font-mono text-sm font-bold tracking-widest text-muted-foreground uppercase mb-8">
                // INITIATING PHASE 1
              </div>
              {day1Events.map((event, i) => renderEvent(event, i))}
            </div>
            
            {/* Divider between phases */}
            <div className="py-16 relative">
              <div className="absolute left-[-32px] md:left-[-48px] w-8 md:w-12 h-px bg-primary/30" />
              <div className="absolute left-[-36px] md:left-[-52px] top-1/2 -translate-y-1/2 w-2 h-2 border border-primary/50 bg-background rotate-45" />
            </div>

            {/* PHASE 2 */}
            <div id="phase-2" ref={phase2Ref} className="space-y-8">
              <div className="font-mono text-sm font-bold tracking-widest text-muted-foreground uppercase mb-8">
                // INITIATING PHASE 2
              </div>
              {day2Events.map((event, i) => renderEvent(event, i))}
            </div>
            
            {/* End of line terminal */}
            <div className="absolute bottom-[-10px] left-[-6px] w-3 h-3 border-2 border-border/50 bg-background" />
          </div>
        </div>
      </section>
    </main>
  );
}
