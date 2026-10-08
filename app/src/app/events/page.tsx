"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { EventCard } from "@/components/ui/EventCard";
import { createClient } from "@/lib/supabase/client";
import { 
  IconSearch, IconLoader2, IconBuilding, IconRuler2, IconBrain, 
  IconClipboardCheck, IconCode, IconPuzzle, IconCamera, IconMessageCircle 
} from "@tabler/icons-react";

const CATEGORIES = [
  { id: "all", label: "All Events" },
  { id: "structural", label: "Structural" },
  { id: "digital", label: "Digital & CAD" },
  { id: "knowledge", label: "Knowledge" },
  { id: "creative", label: "Creative & Logic" },
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('events').select('*').order('display_order');

      let rawEvents = data;

      // Full fallback — all 8 events from seed.sql
      if (!rawEvents || rawEvents.length === 0 || error) {
        rawEvents = [
          { id: '1', slug: 'bridgemania', code: 'EVT-01', title: 'Bridgemania', subtitle: 'From Sticks to Strength', icon_name: 'building', category: 'structural', team_size_text: '2–4 Members', prize: '₹7,000', duration: '4 Hours', image_path: '/images/events/bridgemania.png', color: '#06b6d4', venue: 'Civil Lab 1 (Block B)', event_date: 'Oct 9, 2026', event_time: '10:00 AM' },
          { id: '2', slug: 'autocad', code: 'EVT-02', title: 'AutoCAD', subtitle: '2D Engineering Drawing', icon_name: 'ruler2', category: 'digital', team_size_text: 'Individual', prize: '₹6,000', duration: 'As specified', image_path: '/images/events/cad-drafting.png', color: '#f43f5e', venue: 'CAD Lab (Block B)', event_date: 'Oct 10, 2026', event_time: '02:00 PM' },
          { id: '3', slug: 'ai-project', code: 'EVT-03', title: 'AI Project', subtitle: 'Prototype/Live Model Challenge', icon_name: 'brain', category: 'digital', team_size_text: '2–3 Members', prize: '₹6,000', duration: 'Exhibition Format', image_path: '/images/events/code-breaker.png', color: '#f59e0b', venue: 'Computing Lab (Block A)', event_date: 'Oct 10, 2026', event_time: '09:30 AM' },
          { id: '4', slug: 'technical-quiz', code: 'EVT-04', title: 'Technical Quiz', subtitle: 'Rapid Recall', icon_name: 'clipboard-check', category: 'knowledge', team_size_text: '2 Members', prize: '₹6,000', duration: '60-90 minutes', image_path: '/images/events/technical-quiz.png', color: '#10b981', venue: 'Main Auditorium', event_date: 'Oct 9, 2026', event_time: '03:00 PM' },
          { id: '5', slug: 'paper-presentation', code: 'EVT-05', title: 'Paper Presentation', subtitle: 'Research Symposium', icon_name: 'clipboard-check', category: 'knowledge', team_size_text: '1–2 Members', prize: '₹6,000', duration: '10 mins + 3 mins Q&A', image_path: '/images/events/paper-present.png', color: '#3b82f6', venue: 'Seminar Hall A', event_date: 'Oct 10, 2026', event_time: '11:00 AM' },
          { id: '6', slug: 'smart-mix', code: 'EVT-06', title: 'Smart Mix', subtitle: 'Lightweight Concrete Challenge', icon_name: 'building', category: 'structural', team_size_text: '2–3 Members', prize: '₹7,500', duration: 'Exhibition / Testing', image_path: '/images/events/smart-mix.png', color: '#8b5cf6', venue: 'Concrete Lab (Block C)', event_date: 'Oct 9, 2026', event_time: '01:30 PM' },
          { id: '7', slug: 'technical-treasure-hunt', code: 'EVT-07', title: 'Technical Treasure Hunt', subtitle: 'Logic & Spatial Reasoning', icon_name: 'puzzle', category: 'creative', team_size_text: '1–3 Members', prize: '₹3,000', duration: 'Trail based', image_path: '/images/events/puzzle-challenge.png', color: '#eab308', venue: 'Campus Wide', event_date: 'Oct 9, 2026', event_time: '11:30 AM' },
          { id: '8', slug: 'model-making', code: 'EVT-08', title: 'Model Making', subtitle: 'Structure Showcase', icon_name: 'building', category: 'creative', team_size_text: '2–3 Members', prize: '₹8,000', duration: 'Exhibition & Presentation', image_path: '/images/events/model-making.png', color: '#ec4899', venue: 'Exhibition Hall', event_date: 'Oct 10, 2026', event_time: 'All Day' },
        ];
      }

      const iconMap: Record<string, any> = {
        building: IconBuilding,
        ruler2: IconRuler2,
        brain: IconBrain,
        'clipboard-check': IconClipboardCheck,
        code: IconCode,
        puzzle: IconPuzzle,
        camera: IconCamera,
        'message-circle': IconMessageCircle,
      };

      const mappedData = rawEvents.map((ev: any) => {
        const IconCmp = iconMap[ev.icon_name] || IconBuilding;
        return {
          ...ev,
          teamSize: ev.team_size_text,
          icon: <IconCmp size={32} stroke={1.5} />,
          image: ev.image_path?.replace('/assets', ''),
        };
      });

      setEvents(mappedData);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    const matchesSearch =
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen relative flex flex-col">
      <div className="absolute inset-0 bg-ambient-light dark:bg-ambient-dark -z-10 pointer-events-none opacity-20" />
      <Navbar />

      <section className="pt-32 pb-12 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Event Directory
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-4"
            >
              TECHNICAL <span className="text-primary">DOSSIERS</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground font-mono text-sm max-w-2xl"
            >
              System loading... Accessing all registered technical and logical challenges.
            </motion.p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12 bg-card/50 p-4 border border-border">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-all border ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch size={16} className="text-primary" />
              </div>
              <input
                type="text"
                placeholder="SEARCH_DB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border font-mono text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">
              <IconLoader2 className="animate-spin mr-2" /> Loading DB Records...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredEvents.length === 0 && (
            <div className="text-center py-20 border border-border bg-card/30 border-dashed">
              <p className="font-mono text-sm text-muted-foreground">ERR: NO_MATCHING_RECORDS_FOUND</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-primary font-mono text-sm hover:underline"
              >
                [ RESET_FILTERS ]
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
