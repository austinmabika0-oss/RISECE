"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import {
  IconMapPin,
  IconClock,
  IconAlertCircle,
  IconPhone,
  IconUsers,
  IconCalendarEvent,
  IconChevronRight,
} from "@tabler/icons-react";

type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  venue?: string | string[];
  notes?: string[];
  type: "opening" | "event" | "break" | "ceremony" | "registration";
  concurrent?: boolean;
};

const DAY1_OPENING: ScheduleItem[] = [
  {
    id: "d1-r1",
    time: "07:30 – 08:50",
    title: "Registration Desk 1 & Reporting",
    subtitle: "All participants",
    venue: "Sangamitra Seminar Hall, N Block 2nd Floor",
    notes: ["Bring college ID"],
    type: "registration",
  },
  {
    id: "d1-ina",
    time: "09:00 – 09:56",
    title: "Inaugural Ceremony",
    subtitle: "Lamp lighting · Welcome address · Chief guest address",
    venue: "Sangamitra Seminar Hall, N Block 2nd Floor",
    type: "ceremony",
  },
  {
    id: "d1-photo",
    time: "09:56 – 10:00",
    title: "Group Photograph & Tea Break",
    venue: "Sangamitra Seminar Hall, N Block 2nd Floor",
    type: "break",
  },
  {
    id: "d1-r2",
    time: "10:00 – 10:30",
    title: "Registration Desk 2 & Reporting",
    subtitle: "All participants — Move to Event Venues / Event Briefing",
    venue: ["Registration Desk 2 · U Block, 1st Floor", "Respective Venues"],
    type: "registration",
  },
];

const DAY1_EVENTS: ScheduleItem[] = [
  {
    id: "d1-paper",
    time: "10:30 – 12:30",
    title: "Paper Presentation",
    venue: "U Block, 1st Floor · AFF 15",
    notes: ["PPT presentation & submit full paper printed with tape binding"],
    type: "event",
    concurrent: true,
  },
  {
    id: "d1-bridge",
    time: "10:30 – 13:30",
    title: "BridgeMania — Full Construction",
    venue: "U Block, 1st Floor · AFF 12",
    notes: ["Load testing & judging on Day 2"],
    type: "event",
    concurrent: true,
  },
  {
    id: "d1-exhibit",
    time: "10:30 – 14:00",
    title: "Exhibitions: Model Making & AI-Project Display",
    venue: "U Block, 1st Floor Corridor",
    notes: ["Only exhibition.", "Evaluation will be done on Day 2."],
    type: "event",
    concurrent: true,
  },
  {
    id: "d1-lunch",
    time: "13:00 – 13:30",
    title: "Lunch Break",
    type: "break",
  },
  {
    id: "d1-autocad",
    time: "14:00 – 16:00",
    title: "AutoCAD",
    venue: "U Block, 1st Floor · CAD Lab AFF8(A)",
    type: "event",
  },
  {
    id: "d1-quiz",
    time: "16:00 – 18:00",
    title: "Technical Quiz: All Rounds",
    venue: "U Block, 1st Floor · AFF 15",
    type: "event",
  },
];

const DAY2_REGISTRATION: ScheduleItem[] = [
  {
    id: "d2-r1",
    time: "08:00 – 08:30",
    title: "Registration Desk 2 & Reporting",
    subtitle: "All participants",
    venue: ["Registration Desk 2 · U Block, 1st Floor", "Respective Venues"],
    type: "registration",
  },
];

const DAY2_EVENTS: ScheduleItem[] = [
  {
    id: "d2-smartmix",
    time: "08:30 – 09:30",
    title: "Smart Mix – Light Weight Concrete Cube",
    venue: "Structural Computational & Research Lab, Opp. Pharmacy Block",
    type: "event",
    concurrent: true,
  },
  {
    id: "d2-treasure",
    time: "08:30 – 09:30",
    title: "Technical Treasure Hunt",
    venue: "Reporting at U Block, 1st Floor · AFF 11",
    type: "event",
    concurrent: true,
  },
  {
    id: "d2-bridge",
    time: "09:30 – 11:30",
    title: "BridgeMania Final",
    venue: "U Block, 1st Floor · AFF 12",
    notes: [
      "1 hr for finishing any incomplete bridges",
      "1 hr for Testing",
    ],
    type: "event",
  },
  {
    id: "d2-ai",
    time: "11:00 – 12:00",
    title: "AI Project – Prototype/Live Model Challenge",
    venue: "U Block, 1st Floor Corridor",
    notes: ["Evaluation"],
    type: "event",
    concurrent: true,
  },
  {
    id: "d2-model",
    time: "11:00 – 12:00",
    title: "Model Making – Structure Showcase",
    venue: [
      "Showcasing: U Block, 1st Floor Corridor",
      "PPT Presentation: U Block, 1st Floor · AFF 15",
    ],
    notes: ["Evaluation.", "Bring PPT in pendrive."],
    type: "event",
    concurrent: true,
  },
  {
    id: "d2-results",
    time: "12:00 – 12:30",
    title: "Compilation of Results & Winner Certificates",
    venue: "Organising Committee Room, HOD's Office, U Block 1st Floor",
    notes: ["No competitions running"],
    type: "ceremony",
  },
];

const DAY2_CLOSING: ScheduleItem[] = [
  {
    id: "d2-vale",
    time: "12:30 – 13:30",
    title: "Valedictory Ceremony & Prize Distribution",
    venue: "U Block Ground Floor · AGF04, Seminar Hall",
    notes: ["Fest concludes"],
    type: "ceremony",
  },
];

const typeConfig = {
  opening:      { dot: "bg-[#00A9D9]",      border: "border-[#00A9D9]/40",   bg: "bg-[#F3FAFD]/60" },
  event:        { dot: "bg-[#08264A]",      border: "border-[#08264A]/25",   bg: "bg-white/50"     },
  break:        { dot: "bg-gray-300",       border: "border-gray-200",       bg: "bg-gray-50/60"   },
  ceremony:     { dot: "bg-amber-400",      border: "border-amber-300/50",   bg: "bg-amber-50/40"  },
  registration: { dot: "bg-emerald-500",    border: "border-emerald-400/40", bg: "bg-emerald-50/40"},
};

function ScheduleCard({ item, isLast }: { item: ScheduleItem; isLast: boolean }) {
  const cfg = typeConfig[item.type];
  const venues = Array.isArray(item.venue) ? item.venue : item.venue ? [item.venue] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex gap-4 md:gap-6 group"
    >
      <div className="flex flex-col items-center pt-1 shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full border-2 border-background ${cfg.dot} z-10 mt-[3px]`} />
        {!isLast && <div className="w-[1px] flex-1 bg-border/50 mt-1" />}
      </div>
      <div
        className={`flex-1 mb-6 border ${cfg.border} ${cfg.bg} backdrop-blur-sm p-4 md:p-5 transition-all duration-200 group-hover:border-[#00A9D9]/60 group-hover:shadow-[0_0_0_1px_rgba(0,169,217,0.15)]`}
        style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <IconClock size={13} className="text-[#00A9D9] shrink-0" />
          <span className="font-mono text-[12px] md:text-[13px] font-bold text-[#00A9D9] tracking-wide">
            {item.time}
          </span>
          {item.concurrent && (
            <span className="px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-200">
              Simultaneous
            </span>
          )}
        </div>
        <h3 className="font-display font-bold text-[#08264A] text-base md:text-lg uppercase tracking-tight leading-snug mb-1">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="font-sans text-sm text-muted-foreground mb-2 leading-snug">{item.subtitle}</p>
        )}
        {venues.length > 0 && (
          <div className="flex flex-col gap-1 mt-2">
            {venues.map((v, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <IconMapPin size={12} className="text-[#00A9D9] shrink-0 mt-0.5" />
                <span className="font-mono text-[11px] md:text-[12px] text-[#08264A]/80 leading-snug">{v}</span>
              </div>
            ))}
          </div>
        )}
        {item.notes && item.notes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-current/10 flex flex-col gap-1.5">
            {item.notes.map((n, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <IconAlertCircle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="font-sans text-[11px] md:text-[12px] text-[#08264A]/70 leading-snug">{n}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-2">
      <div className="h-[1px] w-6 bg-[#00A9D9]" />
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold text-[#00A9D9]">{label}</span>
      <div className="flex-1 h-[1px] bg-[#00A9D9]/20" />
    </div>
  );
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  return (
    <main className="min-h-screen relative flex flex-col bg-[#F3FAFD]">
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-70 mix-blend-multiply"
        style={{ backgroundImage: "url('/back_light.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="fixed inset-0 z-0 bg-white/30 pointer-events-none" />
      <Navbar />

      <section className="relative z-10 pt-32 pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">

          <div className="mb-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00A9D9] font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00A9D9] animate-pulse" />
              RISECE 2K26 · Vignan University · Dept. of Civil Engineering
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-[#08264A] uppercase mb-3">
              PROGRAMME <span className="text-[#00A9D9]">SCHEDULE</span>
            </h1>
            <p className="font-mono text-sm text-[#08264A]/60">9 – 10 October 2026 · Two-Day Technical Fest</p>
          </div>

          {/* Contact */}
          <div
            className="mb-10 border border-[#00A9D9]/40 bg-white/50 backdrop-blur-sm p-4 md:p-5 flex flex-col sm:flex-row gap-4 sm:items-center"
            style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
          >
            <div className="flex items-center gap-2 shrink-0">
              <IconPhone size={16} className="text-[#00A9D9]" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#08264A]/60 font-bold">Any Inquiries?</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:ml-2">
              <span className="font-bold text-[#08264A] text-sm">Vinay</span>
              <div className="flex items-center gap-3 flex-wrap">
                <a href="tel:+919912768071" className="font-mono text-[13px] text-[#00A9D9] hover:text-[#0087AD] underline underline-offset-2 transition-colors">+91 9912768071</a>
                <span className="text-border hidden sm:block">·</span>
                <a href="tel:+918639195200" className="font-mono text-[13px] text-[#00A9D9] hover:text-[#0087AD] underline underline-offset-2 transition-colors">+91 8639195200</a>
              </div>
            </div>
          </div>

          {/* Day switcher */}
          <div className="flex gap-3 mb-8" role="tablist" aria-label="Schedule days">
            {([
              { day: 1 as const, label: "DAY 01", sub: "FRI · 09 OCT" },
              { day: 2 as const, label: "DAY 02", sub: "SAT · 10 OCT" },
            ]).map(({ day, label, sub }) => (
              <button
                key={day}
                role="tab"
                aria-selected={activeDay === day}
                onClick={() => setActiveDay(day)}
                className={`flex-1 sm:flex-none px-6 py-4 font-mono font-bold uppercase tracking-widest text-left transition-all border ${
                  activeDay === day
                    ? "bg-[#08264A] text-white border-[#08264A]"
                    : "bg-white/60 text-[#08264A]/60 border-border hover:border-[#00A9D9]/60 hover:text-[#08264A]"
                }`}
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${activeDay === day ? "bg-[#00A9D9]" : "bg-border"}`} />
                  <div>
                    <div className="text-sm md:text-base">{label}</div>
                    <div className={`text-[10px] font-normal tracking-widest mt-0.5 ${activeDay === day ? "text-[#00A9D9]" : "text-muted-foreground"}`}>{sub}</div>
                  </div>
                  {activeDay === day && <IconChevronRight size={14} className="text-[#00A9D9] ml-auto" />}
                </div>
              </button>
            ))}
          </div>

          {/* Simultaneous legend */}
          <div className="flex items-start gap-2 mb-8 py-2 px-3 border border-amber-200 bg-amber-50/60 w-fit max-w-full">
            <IconCalendarEvent size={13} className="text-amber-600 shrink-0 mt-0.5" />
            <span className="font-mono text-[10px] text-amber-700 uppercase tracking-widest leading-snug">
              "Simultaneous" = events running at the same time. Attend based on your registered event.
            </span>
          </div>

          {/* Schedule content */}
          <AnimatePresence mode="wait">
            {activeDay === 1 ? (
              <motion.div key="day1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} role="tabpanel" aria-label="Day 1 Schedule">
                <SectionHeader label="Opening Programme" />
                <div className="pl-2">
                  {DAY1_OPENING.map((item, i) => (
                    <ScheduleCard key={item.id} item={item} isLast={i === DAY1_OPENING.length - 1} />
                  ))}
                </div>
                <SectionHeader label="Day 1 Events" />
                <div className="mb-4 p-3 border border-[#00A9D9]/20 bg-[#00A9D9]/5 font-mono text-[10px] text-[#08264A]/60 uppercase tracking-widest flex items-start gap-1.5">
                  <IconUsers size={11} className="text-[#00A9D9] shrink-0 mt-0.5" />
                  <span>Multiple competitions run simultaneously. Proceed to your registered event venue after briefing.</span>
                </div>
                <div className="pl-2">
                  {DAY1_EVENTS.map((item, i) => (
                    <ScheduleCard key={item.id} item={item} isLast={i === DAY1_EVENTS.length - 1} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="day2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} role="tabpanel" aria-label="Day 2 Schedule">
                <SectionHeader label="Registration & Reporting" />
                <div className="pl-2">
                  {DAY2_REGISTRATION.map((item, i) => (
                    <ScheduleCard key={item.id} item={item} isLast={i === DAY2_REGISTRATION.length - 1} />
                  ))}
                </div>
                <SectionHeader label="Day 2 Events" />
                <div className="mb-4 p-3 border border-[#00A9D9]/20 bg-[#00A9D9]/5 font-mono text-[10px] text-[#08264A]/60 uppercase tracking-widest flex items-start gap-1.5">
                  <IconUsers size={11} className="text-[#00A9D9] shrink-0 mt-0.5" />
                  <span>Multiple competitions run simultaneously from 08:30 and again from 11:00.</span>
                </div>
                <div className="pl-2">
                  {DAY2_EVENTS.map((item, i) => (
                    <ScheduleCard key={item.id} item={item} isLast={i === DAY2_EVENTS.length - 1} />
                  ))}
                </div>
                <SectionHeader label="Closing Ceremony" />
                <div className="pl-2">
                  {DAY2_CLOSING.map((item) => (
                    <ScheduleCard key={item.id} item={item} isLast={true} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 pt-8 border-t border-border/50 flex items-center gap-3">
            <div className="h-[1px] w-4 bg-[#00A9D9]/40" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#08264A]/40">
              Department of Civil Engineering · Vignan University
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
