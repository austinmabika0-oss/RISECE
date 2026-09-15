"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight, IconUsers, IconClock, IconActivity } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const [regCount, setRegCount] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from("teams")
        .select("*", { count: "exact", head: true })
        .eq("event_id", String(event.id))
        .neq("status", "rejected");
      setRegCount(count);
    };
    fetchCount();
  }, [event.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative block h-full"
    >
      <Link href={`/events/${event.slug}`} className="block h-full">
        {/* Dossier Background Container */}
        <div className="relative h-full flex flex-col border border-border bg-card/80 backdrop-blur-sm transition-all duration-500 hover:border-primary overflow-hidden group-hover:bg-card">
          
          {/* Optional Event Hero Image (Hover Reveal) */}
          {event.image && (
            <div className="absolute right-[-20%] bottom-[-10%] w-[250px] h-[250px] z-0 opacity-0 group-hover:opacity-10 transition-all duration-700 group-hover:scale-110 pointer-events-none mix-blend-multiply dark:mix-blend-screen invert dark:invert-0">
              <img src={event.image} alt="" className="w-full h-full object-contain" />
            </div>
          )}

          {/* Blueprint Crosshairs at corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Technical Tab Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-secondary/50 px-4 py-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              FILE: {event.code}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground">
              v2.0
            </div>
          </div>

          <div className="p-6 md:p-8 flex-grow flex flex-col z-10">
            {/* Top Row: Icon & Category */}
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-secondary/50 border border-border/50 text-foreground group-hover:text-primary transition-colors">
                {event.icon}
              </div>
              <span className="px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest border border-border bg-background text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors">
                {event.category}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6 relative">
              {/* Decorative side line */}
              <div className="absolute -left-6 top-1 bottom-1 w-[2px] bg-primary/20 group-hover:bg-primary transition-colors" />
              
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {event.subtitle}
              </p>
            </div>

            {/* Description Truncated */}
            <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow leading-relaxed font-sans">
              {event.overview}
            </p>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-3 gap-px bg-border/50 border border-border/50 mb-6">
              <div className="bg-card p-3">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Registered</div>
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <IconActivity size={14} className="text-primary" />
                  <span>{regCount !== null ? regCount : "-"} {event.isTeamEvent ? 'Teams' : 'Users'}</span>
                </div>
              </div>
              <div className="bg-card p-3">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Capacity</div>
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <IconUsers size={14} className="text-primary" />
                  <span>{event.teamSize}</span>
                </div>
              </div>
              <div className="bg-card p-3">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Duration</div>
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <IconClock size={14} className="text-primary" />
                  <span>{event.duration.split(" ")[0]}</span>
                </div>
              </div>
            </div>

            {/* Footer Row: Prize & CTA */}
            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  Prize Allocation
                </p>
                <p className="font-mono text-sm font-bold text-foreground">
                  {event.prize.split(" / ")[0]}+
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-primary group-hover:translate-x-2 transition-transform">
                OPEN FILE <IconArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
