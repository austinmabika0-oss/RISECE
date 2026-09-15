"use client";

import { useState } from "react";
import EventCard from "@/components/events/EventCard";
import EventDossier from "@/components/events/EventDossier";
import { events, type Event } from "@/data/events";
import { IconLayoutDashboard } from "@tabler/icons-react";

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <>
      <section
        id="events"
        className="relative py-24 border-t border-blueprint-cyan/20 bg-blueprint-navy"
        aria-label="RISECE 2K26 Events"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Engineering Header */}
          <div className="flex items-center gap-4 mb-4 border-b border-blueprint-cyan/20 pb-4">
            <IconLayoutDashboard className="text-blueprint-cyan" size={24} />
            <h2 className="font-display text-4xl md:text-5xl tracking-widest text-blueprint-white uppercase">
              Operations Roster
            </h2>
            <div className="ml-auto hidden md:block text-blueprint-cyan/50 font-mono text-xs tracking-widest uppercase">
              SYS_REV: 02.4.9
            </div>
          </div>

          <p className="font-mono text-sm text-blueprint-white/60 max-w-2xl mb-12 uppercase leading-relaxed tracking-wide">
            Select any operational module to open its complete engineering dossier — reviewing all rules, parameters, and structural judging criteria.
          </p>

          {/* Event grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onClick={setSelectedEvent} />
            ))}
          </div>
        </div>
      </section>

      {/* Dossier Modal */}
      <EventDossier event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}
