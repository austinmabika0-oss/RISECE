"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/Navbar";
import { BrochureDetails } from "@/components/sections/BrochureDetails";
import { AboutContent } from "@/components/sections/AboutContent";

const AboutScrollStory = dynamic(
  () => import("@/components/sections/AboutScrollStory").then(mod => ({ default: mod.AboutScrollStory })),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <main className="min-h-screen relative flex flex-col">
      <Navbar />
      <AboutScrollStory />
      <AboutContent />
      <BrochureDetails />
    </main>
  );
}
