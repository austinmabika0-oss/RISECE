import { IconExternalLink, IconUserPlus, IconCalendarEvent } from "@tabler/icons-react";
import type { Event } from "@/data/events";
import { REGISTRATION_CONFIG } from "@/config/registration";

export function EventRegistrationPanel({ event }: { event: Event }) {
  return (
    <div className="w-full max-w-xl">
      <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
        <h3 className="font-display font-bold text-2xl uppercase mb-6 text-primary">Registration Process</h3>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(var(--color-primary),0.5)] z-10">
              <span className="font-mono font-bold text-sm">1</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-background shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <IconUserPlus size={18} />
                <h4 className="font-bold uppercase text-sm font-mono tracking-widest">Initial Registration</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                First, register as a participant and pay the entry fee. You will receive a unique <strong>VFSTR-RISE ID</strong>.
              </p>
              <a 
                href={REGISTRATION_CONFIG.PARTICIPANT_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-secondary/80 transition-colors border border-border w-full justify-center"
              >
                Go to Form 1 <IconExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-muted-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <span className="font-mono font-bold text-sm">2</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-background shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-foreground">
                <IconCalendarEvent size={18} />
                <h4 className="font-bold uppercase text-sm font-mono tracking-widest">Event Selection</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                After obtaining your VFSTR-RISE ID, use it to register for <strong>{event.title}</strong> and other events.
              </p>
              <a 
                href={REGISTRATION_CONFIG.EVENT_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(var(--color-primary),0.3)] w-full justify-center"
              >
                Go to Form 2 <IconExternalLink size={14} />
              </a>
            </div>
          </div>

        </div>
        
        <p className="text-[10px] font-mono text-center text-muted-foreground mt-8 uppercase tracking-widest">
          Both forms must be completed to finalize your registration.
        </p>
      </div>
    </div>
  );
}
