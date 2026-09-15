"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/shadcn/dialog";
import { Artifact, ArtifactHeader, ArtifactTitle, ArtifactDescription, ArtifactContent, ArtifactActions, ArtifactAction } from "@/components/ui/ai-elements/artifact";
import { DownloadIcon, ShareIcon } from "lucide-react";
import type { Event } from "@/data/events";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface EventDossierProps {
  event: Event | null;
  onClose: () => void;
}

export default function EventDossier({ event, onClose }: EventDossierProps) {
  if (!event) return null;

  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none [&>button]:hidden">
        
        <VisuallyHidden>
          <DialogTitle>{event.title} Dossier</DialogTitle>
          <DialogDescription>Technical specifications and rules for {event.title}</DialogDescription>
        </VisuallyHidden>

        <Artifact className="rounded-none border border-blueprint-cyan/40 bg-blueprint-panel">
          <ArtifactHeader className="bg-blueprint-navy border-b border-blueprint-cyan/20 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="text-blueprint-cyan opacity-80">
                {event.icon}
              </div>
              <div>
                <ArtifactTitle className="font-display text-3xl tracking-wider text-blueprint-white uppercase">
                  {event.title}
                </ArtifactTitle>
                <ArtifactDescription className="font-mono text-xs text-blueprint-cyan/70 tracking-widest uppercase">
                  MODULE {event.code} // {event.domain}
                </ArtifactDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ArtifactActions>
                <ArtifactAction icon={DownloadIcon} label="Download PDF" className="text-blueprint-cyan hover:bg-blueprint-cyan/10" />
                <ArtifactAction icon={ShareIcon} label="Share" className="text-blueprint-cyan hover:bg-blueprint-cyan/10" />
              </ArtifactActions>
            </div>
          </ArtifactHeader>

          <ArtifactContent className="p-6 h-[70vh] overflow-y-auto custom-scrollbar bg-[linear-gradient(rgba(0,163,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,163,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]">
            
            {/* Spec Table */}
            <div className="grid grid-cols-3 border border-blueprint-cyan/20 bg-blueprint-navy/50 mb-8 font-mono text-xs">
              <div className="p-4 border-r border-blueprint-cyan/20">
                <div className="text-blueprint-cyan/50 tracking-widest mb-2">TEAM SIZE</div>
                <div className="text-blueprint-white">{event.teamSize}</div>
              </div>
              <div className="p-4 border-r border-blueprint-cyan/20">
                <div className="text-blueprint-cyan/50 tracking-widest mb-2">DURATION</div>
                <div className="text-blueprint-white">{event.duration}</div>
              </div>
              <div className="p-4">
                <div className="text-blueprint-cyan/50 tracking-widest mb-2">PRIZE POOL</div>
                <div className="text-blueprint-white">{event.prize}</div>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h4 className="font-mono text-sm tracking-widest text-blueprint-cyan mb-4 border-b border-blueprint-cyan/20 pb-2">
                01. OVERVIEW
              </h4>
              <p className="font-sans text-sm leading-relaxed text-blueprint-white/80">
                {event.overview}
              </p>
            </div>

            {/* Rules */}
            <div className="mb-8">
              <h4 className="font-mono text-sm tracking-widest text-blueprint-cyan mb-4 border-b border-blueprint-cyan/20 pb-2">
                02. REGULATIONS
              </h4>
              <ul className="space-y-3">
                {event.rules.map((rule, i) => (
                  <li key={i} className="flex gap-4 font-sans text-sm text-blueprint-white/80">
                    <span className="font-mono text-blueprint-cyan/50 shrink-0">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Judging Criteria */}
            <div className="mb-8">
              <h4 className="font-mono text-sm tracking-widest text-blueprint-cyan mb-4 border-b border-blueprint-cyan/20 pb-2">
                03. JUDGING CRITERIA
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {event.judgingCriteria.map(({ criteria, detail }, i) => (
                  <div key={i} className="p-4 border border-blueprint-cyan/20 bg-blueprint-navy/30">
                    <div className="font-mono text-xs text-blueprint-cyan tracking-widest mb-2">
                      {criteria}
                    </div>
                    <div className="font-sans text-sm text-blueprint-white/70">
                      {detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </ArtifactContent>
        </Artifact>
      </DialogContent>
    </Dialog>
  );
}
