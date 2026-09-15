"use client";

import { useState } from "react";
import { AdminRegistrationsTable, FlatRegistration } from "./AdminRegistrationsTable";
import { AdminTeamList } from "./AdminTeamList";
import { AdminTeamManagerModal } from "./AdminTeamManagerModal";
import { IconLayoutGrid, IconTable, IconLoader2 } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AdminDashboardClientProps {
  flatRegistrations: FlatRegistration[];
  teams: any[];
  events: any[];
}

export function AdminDashboardClient({ flatRegistrations, teams, events }: AdminDashboardClientProps) {
  const [view, setView] = useState<"table" | "card">("table");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [managingTeamId, setManagingTeamId] = useState<string | null>(null);
  
  const supabase = createClient();
  const router = useRouter();

  const handleManageTeam = (teamId: string) => {
    setManagingTeamId(teamId);
  };
  
  const handleApproveReject = async (teamId: string, action: 'approved' | 'rejected') => {
    setLoadingId(teamId);
    try {
      const { error } = await supabase.from("teams").update({ status: action }).eq("id", teamId);
      if (error) throw error;
      
      // Attempt to log audit event
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.from("admin_audit_logs").insert({
          admin_id: session.user.id,
          action: `team_${action}`,
          target_id: teamId,
          details: { action, team_id: teamId }
        });
      }
    } catch (err) {
      console.error("Action failed", err);
      alert("Failed to update team status");
    } finally {
      setLoadingId(null);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* View Toggle */}
      <div className="flex justify-end gap-2 mb-2">
        <button 
          onClick={() => setView("table")}
          className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors ${
            view === "table" ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary"
          }`}
        >
          <IconTable size={16} /> Table View
        </button>
        <button 
          onClick={() => setView("card")}
          className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors ${
            view === "card" ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary"
          }`}
        >
          <IconLayoutGrid size={16} /> Card View
        </button>
      </div>

      {view === "table" ? (
        <AdminRegistrationsTable 
          data={flatRegistrations} 
          onManageTeam={handleManageTeam}
          onApprove={(id) => handleApproveReject(id, 'approved')}
          onReject={(id) => handleApproveReject(id, 'rejected')}
          loadingId={loadingId}
        />
      ) : (
        <AdminTeamList teams={teams} events={events} />
      )}
      
      {managingTeamId && (
        <AdminTeamManagerModal 
          teamId={managingTeamId} 
          onClose={() => {
            setManagingTeamId(null);
            router.refresh();
          }} 
        />
      )}
    </div>
  );
}
