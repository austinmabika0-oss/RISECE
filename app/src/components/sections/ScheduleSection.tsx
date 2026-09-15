"use client";

import { useState } from "react";
import {
  IconHexagon,
  IconDiamond,
  IconCircleDot,
  IconBuilding,
  IconBolt,
  IconBuildingMonument,
  IconFlask,
  IconBrain,
  IconStar,
  IconRuler2,
  IconFileText,
  IconPuzzle,
  IconClock,
} from "@tabler/icons-react";
import { Task, TaskTrigger, TaskContent, TaskItem } from "@/components/ui/ai-elements/task";

const day1 = [
  { time: "7:30 – 8:30 AM", activity: "Registration & Reporting", venue: "Main Foyer, U Block", icon: <IconHexagon size={16} stroke={1.5} /> },
  { time: "8:30 – 9:30 AM", activity: "Inaugural Ceremony", venue: "TBA", icon: <IconDiamond size={16} stroke={1.5} /> },
  { time: "9:45 AM – 3:45 PM", activity: "Bridgemania — Full Construction", venue: "Workshop Yard", icon: <IconBuilding size={16} stroke={1.5} /> },
  { time: "10:00 – 11:30 AM", activity: "Technical Quiz — Elimination & Blitz", venue: "TBA", icon: <IconBolt size={16} stroke={1.5} /> },
  { time: "10:30 AM – 1:00 PM", activity: "Model Making Showcase", venue: "TBA", icon: <IconBuildingMonument size={16} stroke={1.5} /> },
  { time: "2:00 – 3:30 PM", activity: "Smart Mix — Cube Testing", venue: "Structural Lab", icon: <IconFlask size={16} stroke={1.5} /> },
  { time: "3:30 – 5:00 PM", activity: "Code Breaker (AutoCAD)", venue: "TBA", icon: <IconBrain size={16} stroke={1.5} /> },
];

const day2 = [
  { time: "8:00 – 8:30 AM", activity: "Reporting — Day 2", venue: "Respective Venues", icon: <IconHexagon size={16} stroke={1.5} /> },
  { time: "8:30 – 10:00 AM", activity: "Bridgemania Final — Load Testing", venue: "TBA", icon: <IconBuilding size={16} stroke={1.5} /> },
  { time: "8:30 – 9:30 AM", activity: "Technical Quiz — Rapid Fire Final", venue: "TBA", icon: <IconBolt size={16} stroke={1.5} /> },
  { time: "9:30 – 11:30 AM", activity: "AutoCAD — Timed Drafting", venue: "TBA", icon: <IconRuler2 size={16} stroke={1.5} /> },
  { time: "11:00 AM – 1:00 PM", activity: "Paper Presentation", venue: "TBA", icon: <IconFileText size={16} stroke={1.5} /> },
  { time: "1:00 – 2:30 PM", activity: "Puzzle Challenge", venue: "TBA", icon: <IconPuzzle size={16} stroke={1.5} /> },
  { time: "3:00 – 5:00 PM", activity: "Valedictory & Prize Distribution", venue: "Main Auditorium", icon: <IconStar size={16} stroke={1.5} /> },
];

export default function ScheduleSection() {
  const [activeTab, setActiveTab] = useState<"DAY1" | "DAY2">("DAY1");

  return (
    <section id="schedule" className="relative py-24 bg-blueprint-navy border-t border-blueprint-cyan/20">
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,163,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,163,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Engineering Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-blueprint-cyan/20 pb-4">
          <IconClock className="text-blueprint-cyan" size={24} />
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-blueprint-white uppercase">
            Execution Timeline
          </h2>
          <div className="ml-auto flex gap-4">
            <button 
              onClick={() => setActiveTab("DAY1")}
              className={`font-mono text-sm tracking-widest uppercase px-4 py-2 border transition-colors ${activeTab === 'DAY1' ? 'border-blueprint-cyan bg-blueprint-cyan/10 text-blueprint-cyan' : 'border-blueprint-cyan/20 text-blueprint-white/50 hover:border-blueprint-cyan/50 hover:text-blueprint-white'}`}
            >
              DAY 1
            </button>
            <button 
              onClick={() => setActiveTab("DAY2")}
              className={`font-mono text-sm tracking-widest uppercase px-4 py-2 border transition-colors ${activeTab === 'DAY2' ? 'border-blueprint-cyan bg-blueprint-cyan/10 text-blueprint-cyan' : 'border-blueprint-cyan/20 text-blueprint-white/50 hover:border-blueprint-cyan/50 hover:text-blueprint-white'}`}
            >
              DAY 2
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-blueprint-cyan/30 pl-6 ml-4">
          
          <div className="absolute -left-[5px] top-0 bottom-0 w-[10px] bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(0,229,255,0.3)_4px,rgba(0,229,255,0.3)_8px)] pointer-events-none" />

          <div className="flex flex-col gap-6">
            {(activeTab === "DAY1" ? day1 : day2).map((item, index) => (
              <Task key={index} defaultOpen={false} className="blueprint-panel p-0 bg-blueprint-navy/80 border-blueprint-cyan/30">
                <TaskTrigger title="" className="p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center border border-blueprint-cyan/30 text-blueprint-cyan bg-blueprint-cyan/5 group-hover:bg-blueprint-cyan/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-mono text-xs text-blueprint-cyan/70 tracking-widest mb-1">
                        {item.time}
                      </div>
                      <div className="font-sans text-sm md:text-base text-blueprint-white uppercase tracking-wider">
                        {item.activity}
                      </div>
                    </div>
                  </div>
                </TaskTrigger>
                <TaskContent className="px-4 pb-4 pt-0 text-blueprint-white/70">
                  <TaskItem className="font-mono text-xs border border-blueprint-cyan/20 bg-blueprint-cyan/5 inline-flex items-center gap-2 px-3 py-1.5 uppercase tracking-widest">
                    <span className="text-blueprint-cyan opacity-50">LOCATION:</span> {item.venue}
                  </TaskItem>
                </TaskContent>
              </Task>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
