"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { IconLoader2, IconUsers, IconUserPlus, IconCheck, IconX } from "@tabler/icons-react";
import type { Event } from "@/data/events";

export function EventRegistrationPanel({ event }: { event: Event }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [myTeam, setMyTeam] = useState<any>(null);
  const [myTeamMembers, setMyTeamMembers] = useState<any[]>([]);
  
  const [hasVerifiedAccess, setHasVerifiedAccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  // Forms
  const [teamName, setTeamName] = useState("");
  const [inviteRoll, setInviteRoll] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const fetchState = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      setUser(user);
      
      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(prof);

      // Check if user has paid for this event
      const { data: reg } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (reg && reg.event_ids.includes(String(event.id))) {
        setPaymentStatus(reg.payment_status);
        if (reg.payment_status === 'VERIFIED') {
          setHasVerifiedAccess(true);
        }
      }

      // Check if user is in a team for this event
      const { data: tm } = await supabase
        .from("team_members")
        .select("team_id, role, status")
        .eq("user_id", user.id)
        .eq("event_id", String(event.id))
        .maybeSingle();

      if (tm) {
        // Fetch team details
        const { data: teamData } = await supabase.from("teams").select("*").eq("id", tm.team_id).single();
        setMyTeam(teamData);
        
        // Fetch all members of this team
        const { data: allMembers } = await supabase
          .from("team_members")
          .select("*, profiles(full_name, roll_number)")
          .eq("team_id", tm.team_id);
        
        setMyTeamMembers(allMembers || []);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchState();
  }, [event.id]);

  const handleCreateTeamOrRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return router.push("/login");
    
    setActionLoading(true);
    setError(null);

    try {
      const finalTeamName = event.isTeamEvent ? teamName : `IND-${profile.roll_number}`;
      
      // 1. Create Team
      const { data: teamData, error: teamErr } = await supabase
        .from("teams")
        .insert([{ event_id: String(event.id), name: finalTeamName, leader_id: user.id }])
        .select()
        .single();
        
      if (teamErr) throw new Error(teamErr.message);

      // 2. Add self as leader
      const { error: tmErr } = await supabase
        .from("team_members")
        .insert([{ team_id: teamData.id, user_id: user.id, event_id: String(event.id), role: "leader", status: "accepted" }]);

      if (tmErr) throw new Error(tmErr.message);
      
      await fetchState();
    } catch (err: any) {
      setError(err.message || "Failed to register.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteRoll) return;
    
    setActionLoading(true);
    setError(null);

    try {
      if (myTeamMembers.length >= event.maxTeamSize) {
        throw new Error(`Team is full (Max ${event.maxTeamSize}).`);
      }

      const { data, error } = await supabase.rpc('invite_user_by_roll_number', {
        target_roll_number: inviteRoll,
        target_team_id: myTeam.id,
        target_event_id: String(event.id)
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setInviteRoll("");
      await fetchState();
    } catch (err: any) {
      setError(err.message || "Failed to invite user.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 border border-border bg-card/50 flex items-center gap-2"><IconLoader2 className="animate-spin" /> CHECKING CLEARANCE...</div>;
  }

  // Not logged in
  if (!user) {
    return (
      <button 
        onClick={() => router.push("/login")}
        className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
      >
        LOGIN TO REGISTER →
      </button>
    );
  }

  // Already registered (Individual or Team)
  if (myTeam) {
    const isLeader = myTeam.leader_id === user.id;

    if (!event.isTeamEvent) {
      return (
        <div className="px-8 py-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <IconCheck size={18} /> ACCESS GRANTED (REGISTERED)
        </div>
      );
    }

    return (
      <div className="p-6 border border-border bg-card/50 backdrop-blur-sm w-full max-w-xl">
        <div className="flex items-center gap-2 mb-4">
          <IconUsers className="text-primary" />
          <h3 className="font-display font-bold text-2xl uppercase">{myTeam.name}</h3>
        </div>
        
        {error && <div className="p-2 mb-4 bg-destructive/10 text-destructive text-xs font-mono border border-destructive/50">{error}</div>}

        <div className="space-y-2 mb-6">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2 mb-2">Team Roster ({myTeamMembers.length} / {event.maxTeamSize})</div>
          {myTeamMembers.map(m => (
            <div key={m.id} className="flex items-center justify-between p-2 bg-background border border-border/50">
              <div>
                <div className="font-bold text-sm uppercase">{m.profiles?.full_name}</div>
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest">{m.profiles?.roll_number}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-mono px-2 py-0.5 border ${m.role === 'leader' ? 'bg-primary/10 text-primary border-primary/50' : 'bg-secondary text-muted-foreground border-border'}`}>{m.role}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 border mt-1 ${m.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50' : 'bg-amber-500/10 text-amber-500 border-amber-500/50'}`}>{m.status}</span>
              </div>
            </div>
          ))}
        </div>

        {isLeader && myTeamMembers.length < event.maxTeamSize && (
          <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-3">
            <input 
              type="text" required placeholder="ROLL NUMBER (e.g. 221FA001)" value={inviteRoll} onChange={e => setInviteRoll(e.target.value.toUpperCase())}
              className="w-full flex-1 p-3 min-h-[44px] bg-background border border-border focus:border-primary font-mono text-sm outline-none"
            />
            <button disabled={actionLoading} className="w-full md:w-auto px-6 py-3 min-h-[44px] bg-primary text-primary-foreground font-mono font-bold hover:bg-primary/90 flex items-center justify-center gap-2">
              {actionLoading ? <IconLoader2 size={16} className="animate-spin" /> : <><IconUserPlus size={16} /> INVITE</>}
            </button>
          </form>
        )}
      </div>
    );
  }

  // Not registered yet (Team Creation logic if verified, otherwise redirect to payment)
  if (!hasVerifiedAccess) {
    return (
      <div className="w-full max-w-md">
        {paymentStatus && paymentStatus !== 'REJECTED' ? (
          <div className="p-6 border border-amber-500/50 bg-amber-500/10 text-amber-500 font-mono text-sm uppercase text-center">
            PAYMENT STATUS: {paymentStatus}
            <br/><br/>
            Please check your dashboard. You can form a team once your payment is verified.
          </div>
        ) : (
          <>
            {error && <div className="p-2 mb-4 bg-destructive/10 text-destructive text-xs font-mono border border-destructive/50">{error}</div>}
            <button 
              onClick={() => router.push(`/register?events=${event.id}`)}
              className="w-full min-h-[44px] px-8 py-4 bg-primary text-primary-foreground font-mono text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--color-primary),0.3)] flex justify-center items-center gap-2"
            >
              PROCEED TO REGISTRATION CART →
            </button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Register for this event securely. Team formation unlocks after payment verification.
            </p>
          </>
        )}
      </div>
    );
  }

  // Verified access but no team yet
  return (
    <div className="w-full max-w-md">
      {error && <div className="p-2 mb-4 bg-destructive/10 text-destructive text-xs font-mono border border-destructive/50">{error}</div>}
      
      {!event.isTeamEvent ? (
        <button 
          onClick={handleCreateTeamOrRegister}
          disabled={actionLoading}
          className="w-full min-h-[44px] px-8 py-4 bg-primary text-primary-foreground font-mono text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--color-primary),0.3)] flex justify-center items-center gap-2"
        >
          {actionLoading && <IconLoader2 className="animate-spin" size={16} />}
          INITIALIZE INDIVIDUAL ENTRY →
        </button>
      ) : (
        <form onSubmit={handleCreateTeamOrRegister} className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <div className="font-mono text-xs text-primary tracking-[0.2em] mb-4">INITIALIZE TEAM SQUAD</div>
          <p className="text-sm text-muted-foreground mb-4">Create your team. You can invite {event.maxTeamSize - 1} members after creation.</p>
          <div className="space-y-4">
            <input 
              type="text" required placeholder="TEAM NAME" value={teamName} onChange={e => setTeamName(e.target.value)}
              className="w-full min-h-[44px] p-3 bg-background border border-border focus:border-primary font-mono uppercase outline-none"
            />
            <button 
              disabled={actionLoading}
              className="w-full min-h-[44px] px-8 py-3 bg-primary text-primary-foreground font-mono text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all flex justify-center items-center gap-2"
            >
              {actionLoading && <IconLoader2 className="animate-spin" size={16} />}
              CREATE TEAM
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
