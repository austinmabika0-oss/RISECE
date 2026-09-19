"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutScrollStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const rafId = useRef<number>(0);
  const targetTime = useRef(0);

  // Smooth video scrubbing via requestAnimationFrame
  // This avoids jank from setting currentTime directly in the scroll callback
  const smoothScrub = useCallback(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      const diff = targetTime.current - video.currentTime;
      if (Math.abs(diff) > 0.01) {
        video.currentTime += diff * 0.3; // Lerp for smoothness
      }
    }
    rafId.current = requestAnimationFrame(smoothScrub);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    // Wait for video to have enough data
    const initScrollTrigger = () => {
      if (!video.duration || video.duration === Infinity) return;
      setVideoReady(true);

      // Kill any existing ScrollTriggers first
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Create the pinned scroll-driven experience
      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: ".about-pin-target",
        pinSpacing: false,
        onUpdate: (self) => {
          // Drive video time from scroll
          targetTime.current = video.duration * self.progress;
          setProgress(self.progress);
        },
      });

      // Text stage animations (using separate ScrollTriggers for reliability)
      // Stage 1: visible 0-25%
      gsap.fromTo(".stage-1",
        { opacity: 1, y: 0 },
        {
          opacity: 0, y: -30,
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "25% top",
            scrub: true,
          }
        }
      );

      // Stage 2: visible 20-45%
      gsap.fromTo(".stage-2",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: "15% top",
            end: "25% top",
            scrub: true,
          }
        }
      );
      gsap.fromTo(".stage-2",
        { opacity: 1 },
        {
          opacity: 0, y: -30,
          immediateRender: false,
          scrollTrigger: {
            trigger: wrapper,
            start: "35% top",
            end: "45% top",
            scrub: true,
          }
        }
      );

      // Vision panel
      gsap.fromTo(".panel-vision",
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: "20% top",
            end: "30% top",
            scrub: true,
          }
        }
      );
      gsap.to(".panel-vision", {
        opacity: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: wrapper,
          start: "38% top",
          end: "45% top",
          scrub: true,
        }
      });

      // Stage 3: visible 45-70%
      gsap.fromTo(".stage-3",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: "40% top",
            end: "50% top",
            scrub: true,
          }
        }
      );
      gsap.to(".stage-3", {
        opacity: 0, y: -30,
        immediateRender: false,
        scrollTrigger: {
          trigger: wrapper,
          start: "60% top",
          end: "70% top",
          scrub: true,
        }
      });

      // Legacy counters
      gsap.fromTo(".panel-legacy",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: "45% top",
            end: "55% top",
            scrub: true,
          }
        }
      );
      gsap.to(".panel-legacy", {
        opacity: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: wrapper,
          start: "62% top",
          end: "70% top",
          scrub: true,
        }
      });

      // Stage 4: visible 70-100%
      gsap.fromTo(".stage-4",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: "65% top",
            end: "75% top",
            scrub: true,
          }
        }
      );

      // Department panel
      gsap.fromTo(".panel-department",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: wrapper,
            start: "70% top",
            end: "80% top",
            scrub: true,
          }
        }
      );
    };

    // Try to init immediately if metadata already loaded (cached video)
    if (video.readyState >= 1 && video.duration && video.duration !== Infinity) {
      initScrollTrigger();
    }

    // Also listen for the event in case it hasn't loaded yet
    video.addEventListener("loadeddata", initScrollTrigger);

    // Start the smooth scrub RAF loop
    rafId.current = requestAnimationFrame(smoothScrub);

    return () => {
      video.removeEventListener("loadeddata", initScrollTrigger);
      cancelAnimationFrame(rafId.current);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [smoothScrub]);

  return (
    // The wrapper provides the scroll height (500vh)
    <div ref={wrapperRef} className="relative" style={{ height: "500vh" }}>
      {/* The pinned viewport */}
      <div className="about-pin-target h-screen w-full relative overflow-hidden bg-background">

        {/* Background subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Video Container */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {/* Corner crosshairs */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary z-10 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary z-10 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary z-10 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary z-10 pointer-events-none" />

            {/* Dimension lines */}
            <div className="absolute top-4 left-12 right-12 flex items-center gap-1 z-10 pointer-events-none">
              <div className="h-px flex-1 bg-primary/30" />
              <span className="font-mono text-[9px] text-primary/80 px-1 font-bold tracking-widest drop-shadow-md">FULL_BLEED</span>
              <div className="h-px flex-1 bg-primary/30" />
            </div>
            <div className="absolute left-4 top-12 bottom-12 flex flex-col items-center gap-1 z-10 pointer-events-none">
              <div className="w-px flex-1 bg-primary/30" />
              <span className="font-mono text-[9px] text-primary/80 py-1 [writing-mode:vertical-lr] font-bold tracking-widest drop-shadow-md">IMMERSIVE_MODE</span>
              <div className="w-px flex-1 bg-primary/30" />
            </div>

            <video
              ref={videoRef}
              className="w-full h-full object-cover bg-black"
              muted
              playsInline
              preload="auto"
            >
              <source src="/about-video.mp4" type="video/mp4" />
            </video>

            {/* HUD overlays on the video */}
            <div className="absolute top-8 left-8 font-mono text-[10px] uppercase text-primary flex items-center gap-2 bg-background/90 px-2 py-1 border border-primary/20 backdrop-blur-sm z-10">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              STRUCT_ANALYSIS_V1.DWG
            </div>
            <div className="absolute top-8 right-8 font-mono text-[10px] text-primary/80 bg-background/90 px-2 py-1 border border-primary/20 backdrop-blur-sm z-10">
              FRAME: {videoReady ? Math.round(progress * 100) : '--'}%
            </div>
            <div className="absolute bottom-8 right-8 font-mono text-[10px] text-primary/80 bg-background/90 px-2 py-1 border border-primary/20 backdrop-blur-sm z-10">
              SCALE: 1:1
            </div>

            {/* Scrub progress bar on the video bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-background/50 z-20">
              <div className="h-full bg-primary transition-none" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        {/* ─── Text Overlays ─── */}

        {/* STAGE 1 */}
        <div className="stage-1 absolute bottom-16 left-6 md:left-16 max-w-xl z-10 pointer-events-none">
          <div className="bg-card/90 backdrop-blur-md p-8 md:p-10 border border-border shadow-2xl">
            <div className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" /> STAGE_01 // CONCEPT
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Every great structure begins as an idea.
            </h2>
            <p className="text-lg text-muted-foreground">
              RISECE was created to provide aspiring engineers with a platform to transform concepts into reality.
            </p>
          </div>
        </div>

        {/* STAGE 2 */}
        <div className="stage-2 absolute top-24 left-6 md:left-16 max-w-lg z-10 pointer-events-none opacity-0">
          <div className="bg-card/90 backdrop-blur-md p-8 md:p-10 border-l-4 border-primary shadow-2xl">
            <div className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest mb-4">
              STAGE_02 // DESIGN
            </div>
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
              Through design challenges, technical competitions, and collaborative problem solving, participants develop practical engineering skills.
            </p>
          </div>
        </div>

        {/* Vision Panel */}
        <div className="panel-vision absolute bottom-24 right-6 md:right-16 max-w-md z-10 pointer-events-none opacity-0">
          <div className="bg-secondary/95 backdrop-blur-md p-8 border border-border shadow-xl">
            <h3 className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest mb-4 pb-3 border-b border-border/50">
              SPEC // OUR_VISION
            </h3>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-secondary-foreground">
              To foster innovative civil engineers capable of solving tomorrow&apos;s infrastructure challenges.
            </p>
          </div>
        </div>

        {/* STAGE 3 */}
        <div className="stage-3 absolute top-28 left-1/2 -translate-x-1/2 text-center max-w-4xl z-10 pointer-events-none opacity-0">
          <div className="bg-card/90 backdrop-blur-md p-10 border border-border shadow-2xl inline-block">
            <div className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest mb-4">
              STAGE_03 // CONSTRUCTION
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              RISECE bridges the gap between classroom learning and real-world engineering practice.
            </h2>
          </div>
        </div>

        {/* Legacy Counters */}
        <div className="panel-legacy absolute bottom-20 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl z-10 pointer-events-none opacity-0">
          <div className="grid grid-cols-3 bg-card/95 backdrop-blur-md border border-border shadow-2xl">
            <div className="text-center p-4 md:p-8 border-r border-border/50">
              <div className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-primary mb-1 md:mb-2">5000+</div>
              <div className="font-mono text-[9px] sm:text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest">Students</div>
            </div>
            <div className="text-center p-4 md:p-8 border-r border-border/50">
              <div className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-primary mb-1 md:mb-2">100+</div>
              <div className="font-mono text-[9px] sm:text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest">Colleges</div>
            </div>
            <div className="text-center p-4 md:p-8">
              <div className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-primary mb-1 md:mb-2">10+</div>
              <div className="font-mono text-[9px] sm:text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest">Years</div>
            </div>
          </div>
        </div>

        {/* STAGE 4 */}
        <div className="stage-4 absolute top-1/3 left-6 md:left-16 max-w-sm z-10 pointer-events-none opacity-0">
          <div className="bg-card/95 backdrop-blur-md p-8 border-l-4 border-primary shadow-2xl">
            <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
              STAGE_04 // REALITY
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tighter mb-4 leading-none">
              DESIGN.<br />BUILD.<br /><span className="text-primary">RISE.</span>
            </h2>
            <p className="text-muted-foreground">
              Where engineering ideas become real-world solutions.
            </p>
          </div>
        </div>

        {/* Department Panel */}
        <div className="panel-department absolute bottom-12 right-6 md:right-12 max-w-md z-10 opacity-0">
          <div className="bg-background/95 backdrop-blur-xl border border-primary p-5 shadow-[0_0_30px_rgba(0,229,255,0.1)] relative">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-primary" />
            <h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Department Expertise
            </h3>
            <div className="grid grid-cols-2 gap-px bg-border">
              {['Structural Engineering', 'Geotechnical Engineering', 'Transportation Engineering', 'Environmental Engineering'].map(dept => (
                <div key={dept} className="bg-card p-3 hover:bg-secondary transition-colors cursor-default group">
                  <div className="font-mono text-[9px] text-primary mb-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    DEP_{dept.substring(0, 3).toUpperCase()}
                  </div>
                  <div className="font-bold text-xs text-foreground">{dept}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        {progress < 0.05 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce pointer-events-none">
            <span className="font-mono text-[10px] text-primary/60 uppercase tracking-widest">Scroll to explore</span>
            <div className="w-px h-6 bg-primary/40" />
          </div>
        )}
      </div>
    </div>
  );
}
