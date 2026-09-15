"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card";
import { type Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <Card 
      onClick={() => onClick(event)}
      className="blueprint-panel rounded-none border border-blueprint-cyan/30 bg-blueprint-navy/80 hover:bg-blueprint-navy cursor-pointer transition-all hover:border-blueprint-cyan group"
    >
      <CardHeader className="p-4 border-b border-blueprint-cyan/10 bg-blueprint-cyan/5">
        <div className="flex justify-between items-start mb-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-blueprint-cyan opacity-70">
            {event.code}
          </span>
          <div className="text-blueprint-cyan opacity-80 group-hover:opacity-100 transition-opacity">
            {event.icon}
          </div>
        </div>
        <h3 className="font-display text-2xl text-blueprint-white tracking-wider group-hover:text-blueprint-cyan transition-colors">
          {event.title}
        </h3>
        <p className="font-mono text-[10px] text-blueprint-cyan/70 tracking-widest uppercase">
          {event.subtitle}
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x divide-y divide-blueprint-cyan/10 border-b border-blueprint-cyan/10 font-mono text-xs">
          <div className="p-3">
            <div className="text-[9px] text-blueprint-cyan/50 tracking-widest mb-1">TEAM</div>
            <div className="text-blueprint-white/80">{event.teamSize}</div>
          </div>
          <div className="p-3">
            <div className="text-[9px] text-blueprint-cyan/50 tracking-widest mb-1">DURATION</div>
            <div className="text-blueprint-white/80">{event.duration}</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 font-mono text-xs flex justify-between items-center bg-blueprint-navy">
        <span className="text-[9px] text-blueprint-cyan/50 tracking-widest">PRIZE POOL</span>
        <span className="text-blueprint-white/90">{event.prize}</span>
      </CardFooter>
    </Card>
  );
}
