"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen relative flex flex-col">
      <div className="absolute inset-0 bg-ambient-light dark:bg-ambient-dark -z-10 pointer-events-none" />
      <Navbar />

      <section className="pt-32 pb-12 px-4 md:px-6 relative z-10 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl font-bold tracking-tighter text-foreground mb-4">
              OUR <span className="text-primary">SPONSORS</span>
            </h1>
            <p className="text-muted-foreground">Powering the next generation of engineers.</p>
          </div>

          <div className="space-y-16">
            {/* Platinum */}
            <div className="text-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Platinum Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="h-40 rounded-2xl border bg-card/50 flex items-center justify-center text-muted-foreground font-mono">Logo Space</div>
                <div className="h-40 rounded-2xl border bg-card/50 flex items-center justify-center text-muted-foreground font-mono">Logo Space</div>
              </div>
            </div>

            {/* Gold */}
            <div className="text-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Gold Partners</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="h-32 rounded-2xl border bg-card/50 flex items-center justify-center text-muted-foreground font-mono">Logo Space</div>
                <div className="h-32 rounded-2xl border bg-card/50 flex items-center justify-center text-muted-foreground font-mono">Logo Space</div>
                <div className="h-32 rounded-2xl border bg-card/50 flex items-center justify-center text-muted-foreground font-mono">Logo Space</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
