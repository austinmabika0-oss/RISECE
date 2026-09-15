"use client";

import { useState, useEffect } from "react";
import { IconX, IconCrown, IconTrash, IconLoader2, IconUsers } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { UserSearchAutocomplete } from "./UserSearchAutocomplete";

export interface AdminTeamMember {
  id: string; // team_member.id
  role: string;
  status: string;
  user_id: string;
  profiles: {
    id: string;
    full_name: string;
    roll_number: string;
  };
}

interface AdminTeamManagerModalProps {
  teamId: string | null;
  onClose: () => void;
}

export function AdminTeamManagerModal({ teamId, onClose }: AdminTeamManagerModalProps) {
  const [team, setTeam] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [members, setMembers] = useState<AdminTeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    if (!teamId) return;

    const fetchTeam = async () => {
      setFetching(true);
      const { data: tData, error: tErr } = await supabase
        .from('teams')
        .select(`
          id, name, leader_id, event_id, status,
          team_members (
            id, role, status, user_id,
            profiles (id, full_name, roll_number)
          )
        `)
        .eq('id', teamId)
        .single();
      
      if (tErr) {
        setError(tErr.message);
        setFetching(false);
        return;
      }
      
      const { data: eData } = await supabase
        .from('events')
        .select('*')
        .eq('id', tData.event_id)
        .single();

      setTeam(tData);
      setEvent(eData);
      
      // Map correctly to ensure single profile object
      const formattedMembers = tData.team_members.map((m: any) => ({
        ...m,
        profiles: Array.isArray(m.profiles) ? m.profiles[0] : m.profiles
      })) as AdminTeamMember[];
      
      setMembers(formattedMembers);
      setFetching(false);
    };

    fetchTeam();
  }, [teamId, supabase]);

  if (!teamId) return null;

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!confirm(`ADMIN OVERRIDE: Are you sure you want to remove ${memberName} from this team?`)) return;
    
    setLoading(true);
    setError(null);
    
    // Admins bypass normal RLS deletion restrictions due to their role
    const { error: deleteError } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId)
      .eq('team_id', team.id);
      
    if (deleteError) {
      setError(deleteError.message);
    } else {
      setMembers(prev => prev.filter(m => m.id !== memberId));
      logAdminAction('remove_team_member', { member_id: memberId, team_id: team.id });
    }
    
    setLoading(false);
  };

  const handleMakeLeader = async (memberId: string, userId: string, memberName: string) => {
    if (!confirm(`ADMIN OVERRIDE: Make ${memberName} the new team leader?`)) return;
    
    setLoading(true);
    setError(null);
    
    // Demote current leader
    await supabase.from('team_members').update({ role: 'member' }).eq('team_id', team.id).eq('role', 'leader');
    // Promote new leader
    await supabase.from('team_members').update({ role: 'leader' }).eq('id', memberId);
    // Update team leader_id
    await supabase.from('teams').update({ leader_id: userId }).eq('id', team.id);
    
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) return { ...m, role: 'leader' };
      if (m.role === 'leader') return { ...m, role: 'member' };
      return m;
    }));
    
    logAdminAction('change_team_leader', { new_leader_id: userId, team_id: team.id });
    setLoading(false);
  };

  const handleInviteUser = async (user: any) => {
    setLoading(true);
    setError(null);
    
    // We bypass RPC capacity checks and insert directly, admins have ultimate power
    const { data: newMember, error: insertError } = await supabase
      .from('team_members')
      .insert({
        team_id: team.id,
        user_id: user.id,
        event_id: team.event_id,
        role: 'member',
        status: 'accepted' // Admins auto-accept
      })
      .select()
      .single();
    
    if (insertError) {
      setError(insertError.message);
    } else if (newMember) {
      setMembers([...members, {
        id: newMember.id,
        role: 'member',
        status: 'accepted',
        user_id: user.id,
        profiles: {
          id: user.id,
          full_name: user.full_name,
          roll_number: user.roll_number
        }
      }]);
      logAdminAction('add_team_member', { user_id: user.id, team_id: team.id });
    }
    
    setLoading(false);
  };

  const logAdminAction = async (action: string, details: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from("admin_audit_logs").insert({
        admin_id: session.user.id,
        action,
        target_id: team.id,
        details
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border-0 md:border md:border-border w-full h-full md:h-auto md:max-h-[90vh] md:max-w-lg shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
          <div>
            <h2 className="font-display font-bold text-lg text-primary flex items-center gap-2">
              <IconUsers size={20} />
              ADMIN TEAM MANAGER
            </h2>
            {event && <div className="font-mono text-xs text-muted-foreground">{event.title} • {team?.name}</div>}
          </div>
          <button 
            onClick={onClose}
            className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors border border-transparent hover:border-destructive/50"
          >
            <IconX size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {fetching ? (
            <div className="flex justify-center p-12">
              <IconLoader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-3 border border-destructive/50 bg-destructive/10 text-destructive font-mono text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-end mb-4 border-b border-border pb-2">
                <h3 className="font-mono font-bold text-sm tracking-widest uppercase text-muted-foreground">Team Roster</h3>
                <span className={`font-mono text-xs px-2 py-1 border ${members.length > (event?.max_team_size || 0) ? 'bg-destructive/20 border-destructive text-destructive' : 'bg-secondary border-border'}`}>
                  {members.length} / {event?.max_team_size || '?'} Members
                </span>
              </div>

              <div className="space-y-3 mb-8">
                {members.map(member => (
                  <div key={member.id} className="flex justify-between items-center p-3 border border-border bg-background relative overflow-hidden group">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${member.status === 'accepted' ? 'bg-primary' : member.status === 'pending' ? 'bg-amber-500' : 'bg-muted'}`} />
                    
                    <div className="pl-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">{member.profiles?.full_name}</span>
                        {member.role === 'leader' && (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-amber-500 bg-amber-500/10 px-1.5 py-0.5 border border-amber-500/20">
                            <IconCrown size={12} /> LEADER
                          </span>
                        )}
                        {member.status === 'pending' && (
                          <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Pending</span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground uppercase mt-1">
                        {member.profiles?.roll_number}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {member.role !== 'leader' && (
                        <button 
                          onClick={() => handleMakeLeader(member.id, member.user_id, member.profiles?.full_name)}
                          disabled={loading}
                          className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-500/30"
                          title="Make Team Leader"
                        >
                          <IconCrown size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleRemoveMember(member.id, member.profiles?.full_name)}
                        disabled={loading}
                        className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors border border-transparent hover:border-destructive/30"
                        title="Remove member"
                      >
                        {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconTrash size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Member Section */}
              <div className="p-4 border border-primary/30 bg-primary/5">
                <h3 className="font-mono font-bold text-xs tracking-widest uppercase text-primary mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Override: Force Add Member
                </h3>
                <UserSearchAutocomplete 
                  excludeIds={members.map(m => m.user_id)} 
                  onSelect={handleInviteUser} 
                />
                <p className="font-mono text-[10px] text-muted-foreground mt-2">
                  Search by name, roll number, or phone. Admins bypass capacity limits and auto-accept invites.
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
