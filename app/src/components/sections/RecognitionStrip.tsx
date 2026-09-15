"use client";

import Image from "next/image";

export function RecognitionStrip() {
  return (
    <section className="w-full py-12 border-t border-b border-border bg-background/50 backdrop-blur-sm relative z-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
        {/* Vignan Logo */}
        <Image 
          src="/logos/vignan logo.png" 
          alt="Vignan's Foundation for Science, Technology & Research" 
          width={400}
          height={200}
          className="h-[44px] md:h-[58px] w-auto max-w-[140px] md:max-w-[220px] object-contain"
        />

        {/* NIRF Rank */}
        <Image 
          src="/logos/nirf rank.png" 
          alt="NIRF 70th Rank" 
          width={400}
          height={200}
          className="h-[44px] md:h-[58px] w-auto max-w-[140px] md:max-w-[220px] object-contain"
        />

        {/* NAAC */}
        <Image 
          src="/logos/naac acredation.png" 
          alt="NAAC A+ Accreditation" 
          width={200}
          height={200}
          className="h-[44px] md:h-[58px] w-auto max-w-[140px] md:max-w-[180px] object-contain"
        />

        {/* NBA / NBR */}
        <Image 
          src="/logos/nbr accredation.png" 
          alt="NBA Accreditation" 
          width={200}
          height={200}
          className="h-[44px] md:h-[58px] w-auto max-w-[140px] md:max-w-[180px] object-contain"
        />
      </div>
    </section>
  );
}
