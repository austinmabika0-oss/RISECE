import React from "react";
import Link from "next/link";
import { REGISTRATION_CONFIG } from "@/config/registration";
import { IconArrowLeft } from "@tabler/icons-react";
import { VantaDotsBackground } from "@/components/ui/VantaDotsBackground";

export const metadata = {
  title: "Registration - RISECE 2K26",
  description: "Register for VFSTR-RISECE 2K26 Technical Fest",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen relative flex flex-col font-sans bg-background selection:bg-primary/30 pt-32 pb-16">
      <div className="absolute inset-0 bg-ambient-light dark:bg-ambient-dark -z-10 pointer-events-none"></div>
      
      {/* Vanta Dots Background Layer */}
      <VantaDotsBackground />

      <div className="container mx-auto max-w-4xl px-4 md:px-6 mb-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors bg-card/30 border border-border px-4 py-2 rounded-full backdrop-blur-sm">
          <IconArrowLeft size={14} /> Back to Headquarters
        </Link>
      </div>

      <section className="px-4 md:px-6 relative z-10 border-b border-border/50 text-center mb-16">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Official Registration
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 uppercase">
            Registration & Payment
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto mb-12">
            Complete the registration process in two simple steps to secure your spot at VFSTR-RISECE 2026.
          </p>

          <div className="hidden md:flex items-center justify-between bg-card/50 backdrop-blur-md border border-border p-6 rounded-lg">
            <div className="flex flex-col items-center flex-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary mb-2">Step 1</span>
              <span className="text-sm font-medium">Participant Registration</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mx-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <div className="flex flex-col items-center flex-1 opacity-70">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Payment</span>
              <span className="text-sm">Fee & Accom.</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mx-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <div className="flex flex-col items-center flex-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Step 2</span>
              <span className="text-sm font-medium">Event/Team Registration</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mx-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <div className="flex flex-col items-center flex-1 opacity-70">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Done</span>
              <span className="text-sm">Confirmation Email</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-primary/30 bg-primary/5 rounded-lg flex flex-col justify-center">
              <div className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Individual Participation Fee</div>
              <div className="flex justify-between items-end border-b border-border/50 pb-4 mb-4">
                <span className="text-lg">1-2 Events</span>
                <span className="font-display text-3xl font-bold text-foreground">₹200</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-lg">3 or More Events</span>
                <span className="font-display text-3xl font-bold text-foreground">₹300</span>
              </div>
            </div>
            <div className="p-6 border border-border bg-card/30 rounded-lg flex flex-col justify-center">
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Accommodation (Optional)</div>
              <div className="font-display text-4xl font-bold text-foreground mb-2">₹200 <span className="text-sm font-sans font-normal text-muted-foreground">per participant</span></div>
              <p className="text-sm text-muted-foreground">Can be selected during the event registration step if required.</p>
            </div>
          </div>

          <div className="border border-border bg-card/40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-primary/10 border-b border-primary/20 p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground font-display text-2xl font-bold flex items-center justify-center rounded">01</div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">Participant Registration</h2>
                <p className="text-sm text-muted-foreground font-mono mt-1">Complete this form and payment first to obtain your VFSTR-RISECE ID.</p>
              </div>
            </div>
            <div className="w-full relative h-[600px] md:h-[800px]">
              <iframe 
                src={REGISTRATION_CONFIG.PARTICIPANT_REGISTRATION_URL}
                width="100%" 
                height="100%" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="absolute inset-0 z-10"
              >
                Loading...
              </iframe>
            </div>
          </div>

          <div className="border border-border bg-card/40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-blue-600/10 dark:bg-blue-400/10 border-b border-blue-600/20 dark:border-blue-400/20 p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-400 text-white font-display text-2xl font-bold flex items-center justify-center rounded">02</div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">Event & Team Registration</h2>
                <p className="text-sm text-muted-foreground font-mono mt-1">Select the events you wish to participate in.</p>
              </div>
            </div>
            <div className="w-full relative h-[600px] md:h-[800px]">
              <iframe 
                src={REGISTRATION_CONFIG.EVENT_REGISTRATION_URL}
                width="100%" 
                height="100%" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="absolute inset-0 z-10"
              >
                Loading...
              </iframe>
            </div>
          </div>

          {/* Registration Confirmation Note */}
          <div className="p-8 border-l-4 border-emerald-500 bg-emerald-500/10 rounded-r-lg flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
            <div>
              <h3 className="font-mono text-sm font-bold text-emerald-500 uppercase tracking-widest mb-2">Registration Confirmation</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                A confirmation email will be sent automatically to the email address provided during registration. Please check your inbox and spam/junk folder for the confirmation details.
              </p>
            </div>
          </div>

          {/* General Rules & Code of Conduct */}
          <div className="mt-16 bg-card/30 border border-border p-8 rounded-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-8 text-center uppercase border-b border-border pb-4">General Rules & Code of Conduct</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-mono text-sm font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Participation Guidelines
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&bull;</span><span>The fest is open to all undergraduate and diploma engineering students from any recognized institution.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&bull;</span><span>Participants must carry a valid college ID card at all times during the event.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&bull;</span><span>Registration is mandatory for all events. On-the-spot registration is available for specified events only.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&bull;</span><span>All participants must report at least 30 minutes before the scheduled start of their event for registration and orientation.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&bull;</span><span>Participants are responsible for bringing all personal equipment and materials required for their event unless provision is mentioned.</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                  Code of Conduct & Rules
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400 mt-0.5">&bull;</span><span>Participants must maintain decorum and respect towards fellow participants, judges, and organizers. Any misbehaviour, offensive language, or harassment results in immediate disqualification and possible reporting to the home institution.</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400 mt-0.5">&bull;</span><span>Damage to college property results in disqualification and compensation charges.</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400 mt-0.5">&bull;</span><span>Participants must adhere strictly to all instructions given by event coordinators and judges. All disputes must be brought to the organizing committee; arguing with judges is not allowed.</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400 mt-0.5">&bull;</span><span>The organizing committee reserves the right to modify event rules, time limits, or judging criteria if necessary.</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400 mt-0.5">&bull;</span><span>Judges' decisions are final and binding in all matters. Use of unfair means, plagiarism, or copying from other teams results in immediate disqualification.</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400 mt-0.5">&bull;</span><span>The organizing committee is not responsible for loss of personal belongings.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
