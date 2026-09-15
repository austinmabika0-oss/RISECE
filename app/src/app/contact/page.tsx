"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { IconMapPin, IconPhone, IconMail } from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen relative flex flex-col">
      <div className="absolute inset-0 bg-ambient-light dark:bg-ambient-dark -z-10 pointer-events-none" />
      <Navbar />

      <section className="pt-32 pb-12 px-4 md:px-6 relative z-10 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl font-bold tracking-tighter text-foreground mb-4">
              GET IN <span className="text-primary">TOUCH</span>
            </h1>
            <p className="text-muted-foreground">We're here to help you navigate the fest.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="p-6 rounded-2xl border bg-card flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl"><IconMapPin /></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Campus Location</h3>
                  <p className="text-muted-foreground">Department of Civil Engineering<br/>Vignan University, Vadlamudi<br/>Guntur, AP 522213</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border bg-card flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl"><IconPhone /></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Helpdesk</h3>
                  <p className="text-muted-foreground">Student Coord: +91 98765 43210<br/>Faculty Coord: +91 98765 43211</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border bg-card flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl"><IconMail /></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground">risece2k26@vignan.ac.in</p>
                </div>
              </div>
            </div>

            {/* Quick Form */}
            <div className="p-8 rounded-2xl border bg-card">
              <h3 className="font-bold text-2xl mb-6">Send a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full p-3 rounded-lg border bg-background" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full p-3 rounded-lg border bg-background" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea rows={4} className="w-full p-3 rounded-lg border bg-background" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
