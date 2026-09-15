"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { IconCheck, IconX, IconLoader2, IconUsers } from "@tabler/icons-react";

export function AdminTeamList({ teams, events }: { teams: any[], events: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>("all");
  const router = useRouter();
  const supabase = createClient();

  const handleAction = async (teamId: string, action: 'approved' | 'rejected') => {
    setLoadingId(teamId);
    
    await supabase.from("teams").update({ status: action }).eq("id", teamId);
    
    setLoadingId(null);
    router.refresh();
  };

  const filteredTeams = selectedEventId === "all" 
    ? teams 
    : teams.filter(t => t.event_id === selectedEventId);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button 
          onClick={() => setSelectedEventId("all")}
          className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors ${selectedEventId === "all" ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:border-primary'}`}
        >
          All Events
        </button>
        {events.map(ev => (
          <button 
            key={ev.id}
            onClick={() => setSelectedEventId(ev.id)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors ${selectedEventId === ev.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:border-primary'}`}
          >
            {ev.title}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredTeams.map(team => {
          const event = events.find(e => e.id === team.event_id);
          const leader = team.team_members.find((m: any) => m.role === 'leader');
          
          return (
            <div key={team.id} className="p-6 border border-border bg-card/30 flex flex-col md:flex-row gap-6">
              {/* Team Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 text-[10px] font-mono uppercase font-bold border ${
                    team.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                    team.status === 'rejected' ? 'bg-destructive/10 text-destructive border-destructive/30' :
                    'bg-amber-500/10 text-amber-500 border-amber-500/30'
                  }`}>
                    {team.status}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase">{event?.title || team.event_id}</span>
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight flex items-center gap-2 mb-4">
                  <IconUsers size={24} className="text-primary" /> {team.name}
                </h3>
                
                {/* Members List */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Roster</div>
                  {team.team_members.map((m: any) => (
                    <div key={m.id} className="flex items-center justify-between p-2 bg-background border border-border/50 text-sm">
                      <div className="flex items-center gap-4">
                        <span className={`w-16 text-[10px] font-mono uppercase ${m.role === 'leader' ? 'text-primary' : 'text-muted-foreground'}`}>{m.role}</span>
                        <span className="font-bold">{m.profiles?.full_name}</span>
                        <span className="font-mono text-muted-foreground">({m.profiles?.roll_number})</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="hidden md:inline text-xs text-muted-foreground">{m.profiles?.branch} - Yr {m.profiles?.year_of_study}</span>
                        <span className={`text-[10px] font-mono px-2 border ${m.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border-amber-500/30'}`}>{m.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="w-full md:w-48 flex flex-col gap-2 justify-start border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Actions</div>
                {loadingId === team.id ? (
                  <div className="flex justify-center p-4"><IconLoader2 className="animate-spin text-primary" /></div>
                ) : (
                  <>
                    <button 
                      onClick={() => handleAction(team.id, 'approved')}
                      disabled={team.status === 'approved'}
                      className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <IconCheck size={16} /> Approve
                    </button>
                    <button 
                      onClick={() => handleAction(team.id, 'rejected')}
                      disabled={team.status === 'rejected'}
                      className="w-full py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/30 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <IconX size={16} /> Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {filteredTeams.length === 0 && (
          <div className="p-12 border border-border border-dashed text-center">
            <div className="text-muted-foreground font-mono">NO TEAMS FOUND FOR THIS EVENT</div>
          </div>
        )}
      </div>
    </div>
  );
}
