"use client";

import { useState } from "react";
import { IconX, IconUser, IconCrown, IconTrash, IconLoader2, IconUsers } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { UserSearchAutocomplete } from "./UserSearchAutocomplete";

export interface TeamMember {
  id: string; // The team_member record ID
  role: string;
  status: string;
  user_id: string;
  profiles: {
    id: string;
    full_name: string;
    roll_number: string;
  };
}

interface ManageTeamModalProps {
  team: {
    id: string;
    name: string;
    leader_id: string;
    event_id: string;
    team_members: TeamMember[];
  };
  event: {
    id: string;
    title: string;
    max_team_size: number;
    code: string;
  };
  currentUserId: string;
}

export function ManageTeamModal({ team, event, currentUserId }: ManageTeamModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>(team.team_members || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isLeader = currentUserId === team.leader_id;
  const acceptedMembers = members.filter(m => m.status === 'accepted' || m.role === 'leader');
  const pendingMembers = members.filter(m => m.status === 'pending');
  const totalCount = acceptedMembers.length + pendingMembers.length;

  const supabase = createClient();

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to remove ${memberName} from the team?`)) return;
    
    setLoading(true);
    setError(null);
    
    // We expect the new RLS policy to allow this deletion
    const { error: deleteError } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId)
      .eq('team_id', team.id); // extra safety
      
    if (deleteError) {
      setError(deleteError.message);
    } else {
      setMembers(prev => prev.filter(m => m.id !== memberId));
    }
    
    setLoading(false);
  };

  const handleInviteUser = async (user: any) => {
    if (totalCount >= event.max_team_size) {
      setError("Maximum team size reached.");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Call the RPC function
    const { data, error: rpcError } = await supabase.rpc('invite_user_by_roll_number', {
      target_roll_number: user.roll_number,
      target_team_id: team.id,
      target_event_id: event.id
    });
    
    if (rpcError) {
      setError(rpcError.message);
    } else if (data && data.error) {
      setError(data.error);
    } else {
      // Optimistically add to members list as pending
      // Since we don't have the new team_member ID immediately, we can fake it or refetch
      // Better to refetch or just add a temporary object
      const tempId = `temp-${Date.now()}`;
      setMembers([...members, {
        id: tempId,
        role: 'member',
        status: 'pending',
        user_id: user.id,
        profiles: {
          id: user.id,
          full_name: user.full_name,
          roll_number: user.roll_number
        }
      }]);
    }
    
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full py-2 border border-primary/50 text-primary font-mono text-xs tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2 uppercase"
      >
        <IconUsers size={14} />
        Manage Team
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border-0 md:border md:border-border w-full h-full md:h-auto md:max-h-[90vh] md:max-w-lg shadow-2xl relative flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
              <div>
                <h2 className="font-display font-bold text-lg">MANAGE TEAM</h2>
                <div className="font-mono text-xs text-muted-foreground">{event.title} • ID: {event.code}</div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors border border-transparent hover:border-destructive/50"
              >
                <IconX size={20} />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {error && (
                <div className="mb-6 p-3 border border-destructive/50 bg-destructive/10 text-destructive font-mono text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-end mb-4 border-b border-border pb-2">
                <h3 className="font-mono font-bold text-sm tracking-widest uppercase text-muted-foreground">Team Roster</h3>
                <span className="font-mono text-xs bg-secondary px-2 py-1 border border-border">
                  {totalCount} / {event.max_team_size} Members
                </span>
              </div>

              <div className="space-y-3 mb-8">
                {members.map(member => (
                  <div key={member.id} className="flex justify-between items-center p-3 border border-border bg-background relative overflow-hidden group">
                    {/* Status indicator bar */}
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
                          <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Pending Invite</span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground uppercase mt-1">
                        {member.profiles?.roll_number}
                      </div>
                    </div>

                    {isLeader && member.role !== 'leader' && (
                      <button 
                        onClick={() => handleRemoveMember(member.id, member.profiles?.full_name)}
                        disabled={loading}
                        className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors border border-transparent hover:border-destructive/30"
                        title="Remove member"
                      >
                        {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconTrash size={16} />}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Member Section */}
              {isLeader && totalCount < event.max_team_size && (
                <div className="p-4 border border-primary/30 bg-primary/5">
                  <h3 className="font-mono font-bold text-xs tracking-widest uppercase text-primary mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    Deploy New Member
                  </h3>
                  <UserSearchAutocomplete 
                    excludeIds={members.map(m => m.user_id)} 
                    onSelect={handleInviteUser} 
                  />
                  <p className="font-mono text-[10px] text-muted-foreground mt-2">
                    Search by name, roll number, or phone to issue an official invite.
                  </p>
                </div>
              )}
              
              {isLeader && totalCount >= event.max_team_size && (
                <div className="p-4 border border-border bg-secondary/50 text-center font-mono text-xs text-muted-foreground">
                  TEAM CAPACITY REACHED. CANNOT ADD MORE MEMBERS.
                </div>
              )}
              
              {!isLeader && (
                <div className="p-4 border border-border bg-secondary/50 text-center font-mono text-xs text-muted-foreground">
                  ONLY THE TEAM LEADER CAN MODIFY THE ROSTER.
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
