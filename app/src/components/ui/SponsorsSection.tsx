"use client";

import Image from "next/image";

/**
 * SponsorsSection
 * ---------------
 * Compact, premium horizontal sponsor identity element.
 */
export function SponsorsSection() {
  const panelClipPath = "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)";

  return (
    <div className="w-full max-w-[720px] flex flex-col items-center z-20">
      
      {/* -- POWERED BY: label -- */}
      <div className="flex items-center justify-center gap-4 mb-4 w-full">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#00A9D9]" />
        <span className="font-mono text-[13px] md:text-[14px] font-semibold tracking-[0.28em] uppercase text-[#08264A] dark:text-[#00A9D9] whitespace-nowrap">
          POWERED BY:
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#00A9D9]" />
      </div>

      {/* -- Geometric Sponsor Wrapper (Outer Border) -- */}
      <div 
        className="relative w-full max-w-[720px] p-[1px] bg-[#00A9D9]"
        style={{ clipPath: panelClipPath }}
      >
        {/* -- Geometric Sponsor Inner (Translucent Background) -- */}
        <div 
          className="w-full bg-[#F3FAFD]/40 backdrop-blur-[2px] dark:bg-[#0A192F]/60 flex flex-row items-center justify-center py-5 px-6 sm:px-10 min-h-[120px] sm:min-h-[140px]"
          style={{ clipPath: panelClipPath }}
        >
          {/* Decorative notches */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#00A9D9] opacity-70" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#00A9D9] opacity-70" />

          {/* Logos & Divider Container */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 w-full">
            {/* KCP LOGO */}
            <div className="flex items-center justify-center w-[140px] sm:w-[190px]">
              <Image
                src="/logos/sponsors/kcp-sponsor.png"
                alt="KCP Super Sreshtaa"
                width={200}
                height={85}
                className="object-contain w-full max-h-[70px] sm:max-h-[85px]"
                priority
                unoptimized
              />
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-[55px] sm:h-[65px] bg-[#00A9D9] opacity-40 shrink-0" />

            {/* VISHWA LOGO */}
            <div className="flex items-center justify-center w-[90px] sm:w-[130px]">
              <Image
                src="/logos/sponsors/vishwa-sponsor.jpg"
                alt="VISHWA"
                width={140}
                height={85}
                className="object-contain w-full max-h-[70px] sm:max-h-[85px] mix-blend-multiply dark:mix-blend-screen"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
