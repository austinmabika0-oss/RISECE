"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { events } from "@/data/events";
import { PaymentEvidenceUpload } from "@/components/ui/PaymentEvidenceUpload";
import { IconLoader2, IconCheck, IconChevronRight, IconBuildingCommunity, IconCreditCard } from "@tabler/icons-react";

const PROGRAMS = [
  "B.Tech — Civil Engineering",
  "M.Tech — Structural Engineering",
  "M.Tech — Construction Technology",
  "M.Tech — Transportation Engineering",
  "Diploma — Civil Engineering"
];

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
  // Registration State
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [program, setProgram] = useState(PROGRAMS[0]);
  const [accommodation, setAccommodation] = useState(false);
  
  // Checkout State
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingRegId, setExistingRegId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // If user passed ?events=1 from the event panel, pre-select it
    const eventParam = searchParams.get("events");
    if (eventParam && !selectedEvents.includes(eventParam)) {
      setSelectedEvents([eventParam]);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchState = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(prof);

      // Check if they already have an active registration
      const { data: existingReg } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingReg) {
        setExistingRegId(existingReg.registration_id);
        setPaymentStatus(existingReg.payment_status);
        setTotalAmount(existingReg.total_amount);
        // Pre-fill their existing selections if pending
        setSelectedEvents(existingReg.event_ids || []);
        setProgram(existingReg.program);
        setAccommodation(existingReg.accommodation_required);
      }

      setLoading(false);
    };

    fetchState();
  }, [router, supabase]);

  const toggleEvent = (id: string) => {
    setSelectedEvents(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const calculatePreviewTotal = () => {
    const eventCount = selectedEvents.length;
    let partFee = 0;
    if (eventCount > 0 && eventCount <= 2) partFee = 200;
    else if (eventCount > 2) partFee = 300;

    const accFee = accommodation ? 200 : 0;
    return { partFee, accFee, total: partFee + accFee };
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvents.length === 0) {
      setError("Please select at least one event.");
      return;
    }

    setCheckingOut(true);
    setError(null);

    try {
      const { data: newRegId, error: rpcError } = await supabase.rpc("checkout_registration", {
        p_event_ids: selectedEvents,
        p_program: program,
        p_accommodation: accommodation
      });

      if (rpcError) throw rpcError;

      // Update local state to show payment upload step
      setExistingRegId(newRegId);
      setPaymentStatus('PENDING PAYMENT');
      const { total } = calculatePreviewTotal();
      setTotalAmount(total);

    } catch (err: any) {
      setError(err.message || "Failed to create registration checkout.");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-32 flex justify-center"><IconLoader2 className="animate-spin text-primary" size={32} /></div>;
  }

  // If they already submitted payment or are verified, show status
  if (paymentStatus && paymentStatus !== 'PENDING PAYMENT' && paymentStatus !== 'REJECTED') {
    return (
      <main className="min-h-screen pt-32 pb-24 px-4 container mx-auto max-w-4xl">
        <div className="p-8 border border-border bg-card/50 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <IconCheck size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold uppercase mb-2">Registration Submitted</h1>
          <p className="text-muted-foreground mb-6">Your registration ID is <span className="font-mono text-primary">{existingRegId}</span></p>
          <div className="inline-block px-6 py-2 border border-primary text-primary font-mono text-sm mb-6">
            STATUS: {paymentStatus}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Once verified by admins, you will be able to form and join teams for your selected events from your Dashboard.
          </p>
          <button onClick={() => router.push("/dashboard")} className="mt-8 px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase hover:bg-primary/90 transition-colors">
            Go to Dashboard
          </button>
        </div>
      </main>
    );
  }

  // If pending payment, show payment evidence upload
  if (existingRegId && paymentStatus === 'PENDING PAYMENT') {
    return (
      <main className="min-h-screen pt-32 pb-24 px-4 container mx-auto max-w-4xl">
        <h1 className="text-4xl font-display font-bold uppercase tracking-tight mb-8">Payment Checkout</h1>
        <PaymentEvidenceUpload 
          registrationId={existingRegId}
          totalAmount={totalAmount}
          onSuccess={() => setPaymentStatus('UNDER VERIFICATION')}
        />
      </main>
    );
  }

  // Checkout Wizard
  const { partFee, accFee, total } = calculatePreviewTotal();

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 container mx-auto max-w-5xl">
      <div className="mb-8 border-b border-border/50 pb-8">
        <h1 className="text-4xl font-display font-bold uppercase tracking-tight mb-2">Event Registration</h1>
        <p className="text-muted-foreground">Select your events and complete your academic details to proceed to checkout.</p>
      </div>

      {error && <div className="p-4 mb-8 bg-destructive/10 border border-destructive/50 text-destructive font-mono">{error}</div>}

      <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Selections */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* 1. Academic Details */}
          <section>
            <h2 className="text-xl font-display font-bold uppercase mb-6 flex items-center gap-2">
              <IconBuildingCommunity className="text-primary" /> 1. Academic Information
            </h2>
            <div className="p-6 border border-border bg-card/30 space-y-6">
              <div>
                <label className="block font-mono text-xs text-muted-foreground uppercase mb-2">Department</label>
                <div className="p-4 bg-background border border-border/50 font-mono text-sm text-foreground/70 cursor-not-allowed">
                  Civil Engineering
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">This event is exclusively for Civil Engineering and related branches.</p>
              </div>

              <div>
                <label className="block font-mono text-xs text-muted-foreground uppercase mb-2">Program / Course</label>
                <div className="relative">
                  <select 
                    required
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full p-4 bg-background border border-border focus:border-primary font-mono text-sm outline-none appearance-none cursor-pointer"
                  >
                    {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <IconChevronRight className="rotate-90 text-muted-foreground" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Event Selection */}
          <section>
            <h2 className="text-xl font-display font-bold uppercase mb-6 flex items-center gap-2">
              <IconCheck className="text-primary" /> 2. Select Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map((evt) => {
                const isSelected = selectedEvents.includes(String(evt.id));
                return (
                  <div 
                    key={evt.id}
                    onClick={() => toggleEvent(String(evt.id))}
                    className={`p-4 border cursor-pointer transition-colors flex items-start gap-4 ${isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card/30 hover:border-border/80'}`}
                  >
                    <div className={`w-5 h-5 mt-0.5 border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/50'}`}>
                      {isSelected && <IconCheck size={14} />}
                    </div>
                    <div>
                      <h4 className={`font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>{evt.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{evt.isTeamEvent ? `Team Event (${evt.minTeamSize}-${evt.maxTeamSize} members)` : 'Individual Event'}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 3. Accommodation */}
          <section>
            <h2 className="text-xl font-display font-bold uppercase mb-6 flex items-center gap-2">
              <IconBuildingCommunity className="text-primary" /> 3. Accommodation
            </h2>
            <div className="p-6 border border-border bg-card/30 space-y-4">
              <label className="flex items-start gap-4 cursor-pointer">
                <input 
                  type="radio" 
                  name="accommodation" 
                  checked={!accommodation} 
                  onChange={() => setAccommodation(false)}
                  className="mt-1"
                />
                <div>
                  <div className="font-bold">No</div>
                  <div className="text-sm text-muted-foreground">I do not require accommodation</div>
                </div>
              </label>
              <label className="flex items-start gap-4 cursor-pointer">
                <input 
                  type="radio" 
                  name="accommodation" 
                  checked={accommodation} 
                  onChange={() => setAccommodation(true)}
                  className="mt-1"
                />
                <div>
                  <div className="font-bold">Yes (+₹200)</div>
                  <div className="text-sm text-muted-foreground">I require accommodation for the duration of the event</div>
                </div>
              </label>
            </div>
          </section>

        </div>

        {/* Right Col: Summary Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 p-6 border border-border bg-secondary/20">
            <h3 className="font-display font-bold text-lg uppercase mb-6 flex items-center gap-2">
              <IconCreditCard className="text-primary" /> Payment Summary
            </h3>
            
            <div className="space-y-4 font-mono text-sm mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Events Registered</span>
                <span className="font-bold">{selectedEvents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Participation Fee</span>
                <span>₹{partFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accommodation</span>
                <span>₹{accFee}</span>
              </div>
              <div className="pt-4 border-t border-border/50 flex justify-between text-base font-bold text-primary">
                <span>TOTAL</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button 
              type="submit"
              disabled={checkingOut || selectedEvents.length === 0}
              className="w-full py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
            >
              {checkingOut && <IconLoader2 className="animate-spin" size={18} />}
              PROCEED TO PAYMENT
            </button>
            
            <p className="text-[10px] text-muted-foreground text-center mt-4 uppercase tracking-widest">
              Pricing: 1-2 Events = ₹200 | 3+ Events = ₹300
            </p>
          </div>
        </div>

      </form>
    </main>
  );
}
