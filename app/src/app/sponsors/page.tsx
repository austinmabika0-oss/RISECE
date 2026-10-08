"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";

// The custom clip-paths for the engineering geometry
const panelClipPath = "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)";
const cardClipPath = "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)";

const BENEFITS = [
  {
    id: "01",
    label: "EVENTS / 01",
    title: "NATIONAL VISIBILITY",
    desc: "Reach 500+ students from institutions across India",
    image: "/images/sponsors/national-visibility.jpg",
  },
  {
    id: "02",
    label: "ENGINEERING / 02",
    title: "INDUSTRY NETWORKING",
    desc: "Connect with faculty, researchers and future engineers",
    image: "/images/sponsors/industry-networking.jpg",
  },
  {
    id: "03",
    label: "INFRASTRUCTURE / 03",
    title: "BRAND PRESENCE",
    desc: "Premium placement across event collaterals and technical activities",
    image: "/images/sponsors/brand-presence.jpg",
  },
  {
    id: "04",
    label: "INNOVATION / 04",
    title: "CSR IMPACT",
    desc: "Support engineering education, innovation and future-ready skills",
    image: "/images/sponsors/csr-impact.jpg",
  },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen relative flex flex-col overflow-x-hidden bg-[#F3FAFD] text-[#08264A]">
      {/* ── 2. PAGE BACKGROUND ── */}
      <div 
        className="absolute inset-0 z-0 opacity-80 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "url('/back_light.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Subtle white overlay for better text contrast if needed */}
      <div className="absolute inset-0 z-0 bg-white/40 pointer-events-none" />

      <Navbar />

      {/* Subtle Technical Decorations */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#00A9D9]/60 leading-loose hidden lg:block z-0 writing-vertical-lr rotate-180">
        LEARN • CONNECT • COLLABORATE • BUILD
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#00A9D9]/60 leading-loose hidden lg:block z-0 writing-vertical-rl">
        CIVIL ENGINEERING BUILDS A BETTER TOMORROW
      </div>
      <div className="fixed left-20 top-32 w-4 h-4 border-l border-t border-[#00A9D9]/40 hidden lg:block z-0" />
      <div className="fixed right-20 top-32 w-4 h-4 border-r border-t border-[#00A9D9]/40 hidden lg:block z-0" />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-32 pb-24 relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* ── 3. TOP SPONSOR AREA ── */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 w-full max-w-2xl mb-6"
        >
          <div className="flex-1 h-[1px] bg-[#00A9D9]" />
          <span className="font-mono text-xs md:text-sm font-bold tracking-[0.25em] text-[#08264A]">
            POWERED BY:
          </span>
          <div className="flex-1 h-[1px] bg-[#00A9D9]" />
        </motion.div>

        {/* ── 4 & 5. SPONSOR LOGO PANEL ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-[780px] relative mb-16"
        >
          {/* Outer Border with Clip Path */}
          <div 
            className="w-full p-[1px] bg-[#00A9D9]"
            style={{ clipPath: panelClipPath }}
          >
            {/* Inner Content with Clip Path */}
            <div 
              className="w-full min-h-[140px] sm:min-h-[170px] bg-white/30 backdrop-blur-[2px] flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-14 py-6 sm:py-8 px-6 shadow-[inset_0_0_40px_rgba(0,169,217,0.05)]"
              style={{ clipPath: panelClipPath }}
            >
              {/* Notches decorative */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#00A9D9]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#00A9D9]" />

              <div className="flex items-center justify-center w-[160px] sm:w-[220px]">
                <Image 
                  src="/logos/sponsors/kcp-sponsor.png" 
                  alt="KCP Super Sreshtaa" 
                  width={300} 
                  height={150} 
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
              
              <div className="w-[1px] h-[60px] bg-[#00A9D9] hidden sm:block opacity-40" />
              <div className="w-full h-[1px] bg-[#00A9D9] sm:hidden opacity-40" />

              <div className="flex items-center justify-center w-[100px] sm:w-[140px]">
                <Image 
                  src="/logos/sponsors/vishwa-sponsor.jpg" 
                  alt="VISHWA" 
                  width={200} 
                  height={200} 
                  className="w-full h-auto object-contain mix-blend-multiply"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 6. WHY SPONSOR SECTION ── */}
        <div className="w-full max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#00A9D9] uppercase">
              WHY SPONSOR RISECE 2K26
            </span>
            <div className="h-[1px] w-24 bg-[#00A9D9]/50" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight mb-16 uppercase text-[#08264A]"
          >
            INVEST IN THE <span className="text-[#00A9D9]">NEXT GENERATION</span>
          </motion.h2>

          {/* ── 7. FOUR SPONSOR BENEFIT CARDS (2x2 GRID) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {BENEFITS.map((benefit, i) => (
              <motion.div 
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="group relative cursor-default"
              >
                {/* Outer Technical Border */}
                <div 
                  className="w-full p-[1px] bg-[#00A9D9]/60 group-hover:bg-[#00A9D9] transition-colors duration-500"
                  style={{ clipPath: cardClipPath }}
                >
                  <div 
                    className="relative w-full aspect-video bg-[#08264A] overflow-hidden"
                    style={{ clipPath: cardClipPath }}
                  >
                    {/* Background Image */}
                    <Image 
                      src={benefit.image} 
                      alt={benefit.title} 
                      fill 
                      className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out" 
                      unoptimized
                    />
                    
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08264A] via-[#08264A]/50 to-transparent" />

                    {/* Small Technical Label Top Left */}
                    <div className="absolute top-4 left-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/80 z-10 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00A9D9]" />
                      {benefit.label}
                    </div>

                    {/* Measurement marks right side */}
                    <div className="absolute right-3 top-1/4 h-1/2 flex flex-col justify-between items-end opacity-50 z-10 hidden sm:flex">
                      <div className="w-2 h-[1px] bg-[#00A9D9]" />
                      <div className="w-1 h-[1px] bg-[#00A9D9]" />
                      <div className="w-3 h-[1px] bg-[#00A9D9]" />
                      <div className="w-1 h-[1px] bg-[#00A9D9]" />
                      <div className="w-2 h-[1px] bg-[#00A9D9]" />
                    </div>

                    {/* Text Content Bottom */}
                    <div className="absolute bottom-6 left-6 pr-12 z-10">
                      <div className="font-display font-bold text-4xl text-[#00A9D9] mb-1 opacity-90">
                        {benefit.id}
                      </div>
                      <h3 className="font-bold text-white text-lg sm:text-xl uppercase tracking-wider mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm font-sans max-w-[85%] leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ── 10. BOTTOM EDGE / BASE ── */}
      <div className="relative w-full h-10 md:h-14 mt-auto z-10 overflow-hidden">
        {/* Dark Navy Structural Base */}
        <div 
          className="absolute bottom-0 w-full h-full bg-[#08264A]"
          style={{ clipPath: "polygon(0 15px, 20% 0, 80% 0, 100% 15px, 100% 100%, 0 100%)" }}
        />
        {/* Technical Top Border on the Base */}
        <div 
          className="absolute bottom-0 w-full h-full p-[1px] bg-[#00A9D9]/40 pointer-events-none"
          style={{ clipPath: "polygon(0 15px, 20% 0, 80% 0, 100% 15px, 100% 100%, 0 100%)" }}
        >
          <div 
            className="w-full h-full bg-transparent"
            style={{ clipPath: "polygon(0 15px, 20% 0, 80% 0, 100% 15px, 100% 100%, 0 100%)" }}
          />
        </div>
      </div>

    </main>
  );
}
