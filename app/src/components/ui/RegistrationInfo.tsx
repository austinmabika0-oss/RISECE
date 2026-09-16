"use client";

import { motion } from "framer-motion";
import { IconId, IconChecklist, IconMail, IconExternalLink, IconAlertTriangle, IconHome, IconTicket } from "@tabler/icons-react";
import { REGISTRATION_CONFIG } from "@/config/registration";

export function RegistrationInfo() {
  return (
    <section className="py-24 px-4 md:px-6 relative z-10 bg-background border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            OFFICIAL PROCESS
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground uppercase">
            REGISTRATION & PAYMENT
          </h2>
        </div>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm shadow-sm relative group"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-5xl font-black text-muted-foreground/10 group-hover:text-primary/10 transition-colors pointer-events-none select-none">
              01
            </div>
            <div className="w-12 h-12 bg-primary/10 border border-primary/50 text-primary rounded flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">
              <IconId size={24} />
            </div>
            <h3 className="font-display font-bold text-xl uppercase mb-2">Get Your VFSTR-RISE ID</h3>
            <p className="text-sm text-muted-foreground font-sans mb-8 flex-grow">
              All participants must first complete the Participant Registration Form. This step covers your initial payment and assigns you your required <strong>VFSTR-RISE ID</strong>.
            </p>
            <a 
              href={REGISTRATION_CONFIG.PARTICIPANT_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg active:scale-95 w-full"
            >
              Get VFSTR-RISE ID <IconExternalLink size={16} />
            </a>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm shadow-sm relative group"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-5xl font-black text-muted-foreground/10 group-hover:text-primary/10 transition-colors pointer-events-none select-none">
              02
            </div>
            <div className="w-12 h-12 bg-secondary border border-border text-foreground rounded flex items-center justify-center mb-6">
              <IconChecklist size={24} />
            </div>
            <h3 className="font-display font-bold text-xl uppercase mb-2">Register For Events</h3>
            <p className="text-sm text-muted-foreground font-sans mb-8 flex-grow">
              After obtaining your VFSTR-RISE ID, complete the Event Registration Form to officially register for your selected events and provide any team details.
            </p>
            <a 
              href={REGISTRATION_CONFIG.EVENT_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground border border-border hover:border-primary/50 hover:text-primary font-mono text-xs font-bold uppercase tracking-widest transition-all active:scale-95 w-full"
            >
              Register For Events <IconExternalLink size={16} />
            </a>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm shadow-sm relative group"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-5xl font-black text-muted-foreground/10 transition-colors pointer-events-none select-none">
              03
            </div>
            <div className="w-12 h-12 bg-secondary border border-border text-muted-foreground rounded flex items-center justify-center mb-6">
              <IconMail size={24} />
            </div>
            <h3 className="font-display font-bold text-xl uppercase mb-2">Confirmation</h3>
            <p className="text-sm text-muted-foreground font-sans mb-8 flex-grow">
              After submitting the required registration forms, a confirmation email will be sent directly to the email address provided. 
              <br /><br />
              <span className="italic">Please ensure you check your inbox and spam/junk folder.</span>
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Participation Fee */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-lg border border-primary/30 bg-primary/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <IconTicket className="text-primary" size={28} />
              <h3 className="font-display font-bold text-2xl uppercase text-foreground tracking-tight">Participation Fee</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-px bg-border border border-border rounded overflow-hidden">
              <div className="bg-background p-4 md:p-6 text-center">
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">1–2 Events</div>
                <div className="font-display text-3xl md:text-4xl text-primary font-bold">₹200</div>
              </div>
              <div className="bg-background p-4 md:p-6 text-center">
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">3 or More Events</div>
                <div className="font-display text-3xl md:text-4xl text-primary font-bold">₹300</div>
              </div>
            </div>
          </motion.div>

          {/* Accommodation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-lg border border-border bg-card/30 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <IconHome className="text-muted-foreground" size={28} />
              <h3 className="font-display font-bold text-2xl uppercase text-foreground tracking-tight">Accommodation</h3>
            </div>
            <div className="font-display text-3xl md:text-4xl text-foreground font-bold mb-4">
              ₹200 <span className="text-base text-muted-foreground font-sans font-normal">per participant</span>
            </div>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              Participants requiring accommodation can select the option during event registration. 
              <strong> Please note that accommodation is an additional ₹200 and is not included in the base participation fee.</strong>
            </p>
          </motion.div>
        </div>

        {/* Important Info Warning Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-l-4 border-amber-500 bg-amber-500/10 p-6 rounded-r-lg"
        >
          <div className="flex items-start gap-4">
            <IconAlertTriangle className="text-amber-500 shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-mono font-bold text-amber-500 uppercase tracking-widest text-sm mb-4">Important Registration Information</h4>
              <ul className="space-y-2 text-sm text-foreground/80 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  All participants must obtain a VFSTR-RISE ID before completing event registration.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  The VFSTR-RISE ID is the participant identifier used for event registration.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <strong>Do NOT use or display the old VFSTR-XXXX ID format anywhere.</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  Participation fee is ₹200 for 1–2 events, and ₹300 for 3 or more events.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  Accommodation costs an additional ₹200 per participant.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  A confirmation email will be sent to the email address provided during registration.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  Participants should retain their payment details/receipt for future reference.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
