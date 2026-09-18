"use client";

import { use, useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { IconArrowLeft, IconMapPin, IconCalendar, IconClock, IconPhone, IconChevronRight, IconLoader2, IconBuilding, IconRuler2, IconBrain, IconClipboardCheck, IconCode, IconPuzzle } from "@tabler/icons-react";
import { Navbar } from "@/components/ui/Navbar";
import { FestivalTicker } from "@/components/ui/FestivalTicker";
import { EventRulesAccordion } from "@/components/ui/EventRulesAccordion";
import { EventCard } from "@/components/ui/EventCard";
import { EventRegistrationPanel } from "@/components/ui/EventRegistrationPanel";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<any>(null);
  const [prevEvent, setPrevEvent] = useState<any>(null);
  const [nextEvent, setNextEvent] = useState<any>(null);
  const [moreEvents, setMoreEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      const supabase = createClient();
      
      // Fetch event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('slug', resolvedParams.slug)
        .single();
        
      if (eventError || !eventData) {
        setLoading(false);
        return;
      }
      
      // Fetch related data
      const [rules, criteria, coordinators] = await Promise.all([
        supabase.from('event_rules').select('*').eq('event_id', eventData.id).order('display_order'),
        supabase.from('judging_criteria').select('*').eq('event_id', eventData.id).order('display_order'),
        supabase.from('event_coordinators').select('*').eq('event_id', eventData.id).order('display_order')
      ]);
      
      // Map DB fields to UI expected fields
      eventData.teamSize = eventData.team_size_text;
      eventData.date = eventData.event_date;
      eventData.time = eventData.event_time;
      eventData.image = eventData.image_path?.replace('/assets', '');
      
      eventData.rules = rules.data?.map(r => r.rule_text) || [];
      eventData.judgingCriteria = criteria.data?.map(c => ({ criteria: c.name, detail: c.detail, maxMarks: c.max_marks })) || [];
      eventData.coordinators = coordinators.data?.map(c => ({ name: c.name, role: c.role, phone: c.phone })) || [];
      
      setEvent(eventData);

      // Fetch all events to determine prev/next and more events
      const { data: allEvents } = await supabase.from('events').select('*').order('display_order');
      if (allEvents && allEvents.length > 0) {
        const currentIndex = allEvents.findIndex(e => e.slug === resolvedParams.slug);
        if (currentIndex !== -1) {
          const prevIndex = (currentIndex - 1 + allEvents.length) % allEvents.length;
          const nextIndex = (currentIndex + 1) % allEvents.length;
          
          setPrevEvent(allEvents[prevIndex]);
          setNextEvent(allEvents[nextIndex]);

          // Pick 3 related/other events to display
          const more = [];
          for (let i = 1; i <= 3; i++) {
            const idx = (currentIndex + i + 1) % allEvents.length; 
            const ev = allEvents[idx];
            let IconCmp = IconBuilding;
            switch (ev.icon_name) {
              case 'ruler2': IconCmp = IconRuler2; break;
              case 'brain': IconCmp = IconBrain; break;
              case 'clipboard-check': IconCmp = IconClipboardCheck; break;
              case 'code': IconCmp = IconCode; break;
              case 'puzzle': IconCmp = IconPuzzle; break;
            }
            more.push({
              ...ev,
              teamSize: ev.team_size_text,
              icon: <IconCmp size={32} stroke={1.5} />,
              image: ev.image_path?.replace('/assets', '')
            });
          }
          setMoreEvents(more);
        }
      }

      setLoading(false);
    };
    
    fetchEventData();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <IconLoader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (!event) {
    notFound();
  }

  // Registration state moved to EventRegistrationPanel component

  return (
    <main className="min-h-screen relative flex flex-col font-sans bg-background selection:bg-primary/30">
      <div className="absolute inset-0 bg-ambient-light dark:bg-ambient-dark -z-10 pointer-events-none" />
      
      {/* Subtle Technical Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: `48px 48px`
      }} />

      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-0 px-4 md:px-6 relative z-10 border-b border-border/50 bg-card/20 overflow-hidden min-h-[80vh] flex items-center">
        {/* Giant Event Number Background */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 text-[40vw] font-display font-bold leading-none text-foreground opacity-5 pointer-events-none select-none overflow-hidden">
          {String(event.id).padStart(2, "0")}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 h-full flex flex-col justify-center py-20">
          
          {/* Optional Event Hero Image */}
          {event.image && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute right-[-5%] md:right-0 top-1/2 -translate-y-1/2 translate-x-[15%] lg:translate-x-[25%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] z-0 pointer-events-none hidden md:block"
            >
              <img 
                src={event.image} 
                alt={`${event.title} illustration`} 
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen invert dark:invert-0 opacity-90 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          )}

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-12 relative z-10 w-max"
          >
            <IconArrowLeft size={16} /> All Events
          </Link>

          <div className="relative z-10 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] border border-primary/50 text-primary">
                  {event.category}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                  {event.code} // {event.domain}
                </span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-4 uppercase leading-[0.9]"
            >
              {event.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-foreground/80 font-medium tracking-wide mb-12 max-w-xl"
            >
              {event.subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <EventRegistrationPanel event={event} />

            </motion.div>
          </div>
        </div>
      </section>

      {/* Festival Ticker */}
      <FestivalTicker items={["RISECE 2K26", event.title, "10 OCT 2026", "COMPETE", "CREATE", "INNOVATE"]} />

      {/* Main Content */}
      <section className="py-24 px-4 md:px-6 relative z-10 bg-background">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Details (Span 8) */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* The Challenge */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="font-mono text-xs text-primary tracking-[0.2em] mb-4">01 // OVERVIEW</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">
                The Challenge
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-sans max-w-3xl">
                {event.overview}
              </p>
            </motion.div>

            {/* Rules */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="font-mono text-xs text-primary tracking-[0.2em] mb-4">02 // REGULATIONS</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">
                Rules of the Arena
              </h2>
              <EventRulesAccordion rules={event.rules} />
            </motion.div>

            {/* Judging */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="font-mono text-xs text-primary tracking-[0.2em] mb-4">03 // EVALUATION</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">
                How You're Judged
              </h2>
              <div className="grid gap-8">
                {event.judgingCriteria.map((crit: any, idx: number) => {
                  const percentage = crit.maxMarks || Math.round(100 / event.judgingCriteria.length);
                  return (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <h4 className="font-bold text-lg uppercase tracking-wider">{crit.criteria}</h4>
                          <p className="text-sm text-muted-foreground">{crit.detail}</p>
                        </div>
                        <div className="font-mono text-xl text-primary font-bold">{percentage}%</div>
                      </div>
                      <div className="w-full h-1 bg-secondary">
                        <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sidebar (Span 4) */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-8">
              
              {/* Event Logistics */}
              <div className="p-8 border border-border bg-card/30 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <IconMapPin size={120} />
                </div>
                <h3 className="font-mono text-xs text-primary tracking-[0.2em] uppercase mb-8">Logistics</h3>
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Date</div>
                    <div className="font-bold text-lg flex items-center gap-2">
                      <IconCalendar size={18} className="text-primary" /> {event.date}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Time</div>
                    <div className="font-bold text-lg flex items-center gap-2">
                      <IconClock size={18} className="text-primary" /> {event.time}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Venue</div>
                    <div className="font-bold text-lg flex items-center gap-2">
                      <IconMapPin size={18} className="text-primary" /> {event.venue}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coordinators */}
              <div className="p-8 border border-border bg-card/30 backdrop-blur-md">
                <h3 className="font-mono text-xs text-primary tracking-[0.2em] uppercase mb-8">Coordinators</h3>
                <div className="space-y-6">
                  {event.coordinators.map((coord: any, idx: number) => (
                    <div key={idx}>
                      <div className="font-bold text-base mb-1">{coord.name}</div>
                      <div className="text-xs text-primary font-mono tracking-wider mb-2">{coord.role}</div>
                      <a href={`tel:${coord.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <IconPhone size={14} /> {coord.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="border-t border-border/50 py-12 bg-card/20">
        <div className="container mx-auto max-w-6xl flex justify-between items-center px-4 md:px-6">
          {prevEvent ? (
            <Link href={`/events/${prevEvent.slug}`} className="group flex flex-col items-start">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">← Previous Event</span>
              <span className="font-display text-xl md:text-2xl font-bold">{prevEvent.title}</span>
            </Link>
          ) : <div />}
          
          {nextEvent ? (
            <Link href={`/events/${nextEvent.slug}`} className="group flex flex-col items-end text-right">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">Next Event →</span>
              <span className="font-display text-xl md:text-2xl font-bold">{nextEvent.title}</span>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* More Events */}
      <section className="py-24 px-4 md:px-6 bg-background border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="font-mono text-xs text-primary tracking-[0.2em] mb-4">EXPLORE</div>
              <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
                More Events
              </h2>
            </div>
            <Link href="/events" className="hidden md:flex items-center gap-2 font-mono text-sm uppercase tracking-widest hover:text-primary transition-colors">
              View All <IconChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moreEvents.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
