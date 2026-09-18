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
      const { data } = await supabase.from('events').select('*').order('display_order');
      if (data) {
        // Map database fields to EventCard props
        const mappedData = data.map(ev => {
          let IconCmp = IconBuilding;
          switch (ev.icon_name) {
            case 'ruler2': IconCmp = IconRuler2; break;
            case 'brain': IconCmp = IconBrain; break;
            case 'clipboard-check': IconCmp = IconClipboardCheck; break;
            case 'code': IconCmp = IconCode; break;
            case 'puzzle': IconCmp = IconPuzzle; break;
            case 'camera': IconCmp = IconCamera; break;
            case 'message-circle': IconCmp = IconMessageCircle; break;
          }
          return {
            ...ev,
            teamSize: ev.team_size_text,
            icon: <IconCmp size={32} stroke={1.5} />,
            image: ev.image_path?.replace('/assets', ''),
          };
        });
        setEvents(mappedData);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
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
