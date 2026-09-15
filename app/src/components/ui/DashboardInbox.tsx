"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { IconCheck, IconX, IconLoader2, IconMail } from "@tabler/icons-react";
import { events } from "@/data/events";

export function DashboardInbox({ invites }: { invites: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleAction = async (inviteId: string, action: 'accepted' | 'declined') => {
    setLoadingId(inviteId);
    
    // In a real app we might also need to check if the team is full before accepting, 
    // but we'll let the DB handle constraints or just blindly accept for this demo.
    if (action === 'declined') {
      await supabase.from("team_members").delete().eq("id", inviteId);
    } else {
      await supabase.from("team_members").update({ status: 'accepted' }).eq("id", inviteId);
    }
    
    setLoadingId(null);
    router.refresh();
  };

  if (invites.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="font-display text-2xl font-bold tracking-tight mb-4 flex items-center gap-2 text-amber-500">
        <IconMail size={24} /> SECURE INBOX ({invites.length})
      </h2>
      <div className="grid gap-4">
        {invites.map((invite) => {
          const event = events.find(e => String(e.id) === invite.event_id);
          return (
            <div key={invite.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-amber-500/50 bg-amber-500/10">
              <div>
                <div className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">TEAM INVITATION</div>
                <div className="font-bold text-lg mb-1">{invite.teams?.name}</div>
                <div className="text-sm text-muted-foreground">Event: {event?.title || invite.event_id}</div>
              </div>
              
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                {loadingId === invite.id ? (
                  <IconLoader2 className="animate-spin text-amber-500" />
                ) : (
                  <>
                    <button 
                      onClick={() => handleAction(invite.id, 'accepted')}
                      className="px-4 py-2 bg-emerald-500 text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 flex items-center gap-1"
                    >
                      <IconCheck size={14} /> ACCEPT
                    </button>
                    <button 
                      onClick={() => handleAction(invite.id, 'declined')}
                      className="px-4 py-2 border border-destructive/50 text-destructive font-mono text-xs font-bold uppercase tracking-widest hover:bg-destructive/10 flex items-center gap-1"
                    >
                      <IconX size={14} /> DECLINE
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
