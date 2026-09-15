"use client";

import { motion } from "framer-motion";
import { IconUserPlus, IconIdBadge2, IconUsersGroup, IconShieldCheck, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

const steps = [
  {
    id: "01",
    title: "Initialize Account",
    description: "Create your secure account using your email and a strong password to enter the system.",
    icon: <IconUserPlus size={32} className="text-primary" />
  },
  {
    id: "02",
    title: "Configure Profile",
    description: "Submit your academic credentials including your Roll Number, Branch, and Year of Study.",
    icon: <IconIdBadge2 size={32} className="text-primary" />
  },
  {
    id: "03",
    title: "Assemble Team",
    description: "Browse the event directory and form your squad. The leader must invite members via Roll Number.",
    icon: <IconUsersGroup size={32} className="text-primary" />
  },
  {
    id: "04",
    title: "Await Clearance",
    description: "Once your team accepts their invites, your registration is locked. Await admin approval for final clearance.",
    icon: <IconShieldCheck size={32} className="text-primary" />
  }
];

export function RegistrationSteps() {
  return (
    <section className="py-24 px-4 md:px-6 relative z-10 border-t border-border bg-card/10">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 mix-blend-overlay" style={{
        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: `48px 48px`
      }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            STANDARD OPERATING PROCEDURE
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight uppercase">
            How to Register
          </h2>
          <p className="mt-4 text-muted-foreground font-mono text-sm max-w-2xl mx-auto">
            FOLLOW THESE INSTRUCTIONS CAREFULLY TO SECURE YOUR CLEARANCE FOR THE TECHNICAL EVENTS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[1px] bg-border border-t border-dashed border-primary/30 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 bg-background border border-primary/30 flex items-center justify-center mb-6 relative group-hover:border-primary transition-colors shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                {/* Corner Crosshairs */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
                
                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-background font-mono text-[10px] font-bold flex items-center justify-center">
                  {step.id}
                </div>
                
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold uppercase mb-2 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <Link
            href="/login"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-background bg-primary hover:bg-primary/90 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              COMMENCE REGISTRATION <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
