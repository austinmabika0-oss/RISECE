"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/ui/Navbar";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { BlueprintGrid } from "@/components/svg/BlueprintGrid";
import { BridgeDrawing } from "@/components/svg/BridgeDrawing";
import { EventCard } from "@/components/ui/EventCard";
import { RegistrationInfo } from "@/components/ui/RegistrationInfo";
import { IconArrowRight, IconBuilding, IconRuler2, IconBrain, IconClipboardCheck, IconCode, IconPuzzle } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";

// Lazy load SVG illustrations for performance
const IllustrationBlueprint = dynamic(() => import("@/components/svg/IllustrationBlueprint").then(mod => mod.IllustrationBlueprint), { ssr: false });
const IllustrationTrophy = dynamic(() => import("@/components/svg/IllustrationTrophy").then(mod => mod.IllustrationTrophy), { ssr: false });
const IllustrationNetwork = dynamic(() => import("@/components/svg/IllustrationNetwork").then(mod => mod.IllustrationNetwork), { ssr: false });
const IllustrationResume = dynamic(() => import("@/components/svg/IllustrationResume").then(mod => mod.IllustrationResume), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('events').select('*').order('display_order').limit(3);
      
      if (data) {
        const mapped = data.map(ev => {
          let IconCmp = IconBuilding;
          switch (ev.icon_name) {
            case 'ruler2': IconCmp = IconRuler2; break;
            case 'brain': IconCmp = IconBrain; break;
            case 'clipboard-check': IconCmp = IconClipboardCheck; break;
            case 'code': IconCmp = IconCode; break;
            case 'puzzle': IconCmp = IconPuzzle; break;
          }
          return {
            ...ev,
            teamSize: ev.team_size_text,
            icon: <IconCmp size={32} stroke={1.5} />,
            image: ev.image_path?.replace('/assets', ''),
          };
        });
        setFeaturedEvents(mapped);
      }
    };
    fetchEvents();

    // Hero reveal sequence
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      ".hero-word",
      { opacity: 0, y: 50, rotateX: 45 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    ).fromTo(
      ".hero-content",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden flex flex-col">
      <BlueprintGrid />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 overflow-hidden">
        

        {/* Background Bridge SVG */}
        <div className="absolute inset-y-0 right-0 z-0 flex items-center justify-end translate-x-[5%] lg:translate-x-[5%] w-[120%] lg:w-[65%] opacity-60 pointer-events-none">
          <BridgeDrawing />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10" ref={contentRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            
            {/* Left Content */}
            <div className="pt-24 lg:pt-0">

              
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-[0.9] mb-8">
                <div className="hero-word opacity-0 [perspective:1000px]">DESIGN.</div>
                <div className="hero-word opacity-0 [perspective:1000px]">BUILD.</div>
                <div className="hero-word opacity-0 [perspective:1000px] text-primary">RISE.</div>
              </h1>

              <div className="hero-content opacity-0">
                <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mb-8 font-light border-l-2 border-primary/50 pl-6">
                  National Level Civil Engineering Technical Fest
                  <br />
                  <span className="font-mono text-sm tracking-widest font-bold text-foreground mt-2 inline-block">
                    09–10 OCTOBER 2026
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 hero-content opacity-0">
                <Link
                  href="/events"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-background bg-primary hover:bg-primary/90 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    REGISTER <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
                <Link
                  href="https://drive.google.com/file/d/1qpsyoMdt6fSsvJuZDSvYHCQZmFws4nTm/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 font-mono font-bold text-foreground border border-border hover:border-primary hover:text-primary transition-all bg-card/50 backdrop-blur-sm"
                >
                  DOWNLOAD BROCHURE
                </Link>
              </div>

              {/* Eligibility Note */}
              <div className="hero-content opacity-0 mt-8 max-w-lg bg-card/30 p-4 border-l-2 border-primary/30 backdrop-blur-sm text-sm text-muted-foreground">
                <p className="mb-1"><span className="text-primary font-bold">Eligibility:</span> Open to all Diploma & UG engineering students from any recognised institution.</p>
                <p>Valid college ID mandatory. Report 30 minutes before event start.</p>
              </div>
            </div>

            {/* Right Content: Timer */}
            <div className="flex justify-start lg:justify-end hero-content opacity-0 mt-12 lg:mt-32 self-center lg:translate-y-8">
              <div className="relative">
                <div className="absolute -inset-4 border border-border/50 bg-card/20 backdrop-blur-sm -z-10" />
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary -translate-x-4 -translate-y-4" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary translate-x-4 -translate-y-4" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary -translate-x-4 translate-y-4" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary translate-x-4 translate-y-4" />
                
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">T-Minus to Execution</h3>
                <CountdownTimer />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Registration & Payment Section */}
      <RegistrationInfo />

      {/* Brochure Content: Why Participate & Focus Themes */}
      <section 
        className="py-24 px-4 md:px-6 relative z-10 border-t border-border bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/events/why-participate-bg.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-background/75 z-0 backdrop-blur-sm"></div>
        
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          
          {/* Why Participate */}
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight mb-2">WHY PARTICIPATE IN RISECE 2K26?</h2>
            <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              BENEFITS
            </div>
            
            <div className="space-y-6">
              {[
                { 
                  title: "Showcase Skills", 
                  desc: "Showcase your engineering skills on a national stage.",
                  illustration: <IllustrationBlueprint className="w-full h-full text-primary" />
                },
                { 
                  title: "Compete & Win", 
                  desc: "Compete with top students across institutions and win exciting prizes & certificates.",
                  illustration: <IllustrationTrophy className="w-full h-full text-primary" />
                },
                { 
                  title: "Gain Exposure", 
                  desc: "Gain practical exposure beyond classrooms and network with peers and faculty experts.",
                  illustration: <IllustrationNetwork className="w-full h-full text-primary" />
                },
                { 
                  title: "Enhance Resume", 
                  desc: "Enhance your resume with real-world experience.",
                  illustration: <IllustrationResume className="w-full h-full text-primary" />
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 border border-border bg-card/20 hover:border-primary/50 transition-colors group overflow-hidden relative">
                  
                  {/* Left Content */}
                  <div className="flex gap-4 flex-1 z-10">
                    <div className="font-mono text-sm font-bold text-primary opacity-50 pt-0.5">0{idx + 1}</div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>

                  {/* Right Illustration */}
                  <div className="w-full sm:w-1/4 flex-shrink-0 min-h-[100px] sm:min-h-0 flex items-center justify-center sm:justify-end opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-24 h-24 sm:w-32 sm:h-full flex items-center justify-center transform group-hover:scale-105 group-hover:-translate-x-2 transition-transform duration-500">
                      {item.illustration}
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <p className="font-display text-2xl font-bold text-primary italic">Step in. Build. Compete. Rise.</p>
              <p className="text-muted-foreground uppercase tracking-wider text-sm mt-1">Your talent deserves recognition!</p>
            </div>
          </div>

          {/* Focus Themes */}
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight mb-2">FOCUS THEMES</h2>
            <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              ALIGNED WITH VIKSIT BHARAT
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                "Climate-Resilient & Disaster-Proof Infrastructure",
                "Net-Zero & Green Building Technologies",
                "Smart Cities & AI-Driven Urban Planning",
                "Rural Empowerment via Vibrant Village Infrastructure",
                "Coastal Green Infrastructure",
                "Sustainable & Resilient Transportation Infrastructure",
                "Digital Twins & AI for Infrastructure Management",
                "Water Security & Smart Water Management and any other"
              ].map((theme, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-secondary/30 border border-border/50">
                  <div className="w-1.5 h-1.5 bg-primary rotate-45 shrink-0" />
                  <span className="text-sm text-foreground/90 font-medium">{theme}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Featured Events Blueprint Scroll Section */}
      <section className="py-24 px-4 md:px-6 relative z-10 border-t border-border bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">FEATURED EVENTS</h2>
              <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Technical Schematics
              </div>
            </div>
            <Link href="/events" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline">
              VIEW ALL DIRECTORY <IconArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
