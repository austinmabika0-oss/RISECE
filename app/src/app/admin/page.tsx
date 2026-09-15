import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/ui/Navbar";
import { AdminDashboardClient } from "@/components/ui/AdminDashboardClient";
import { IconShieldLock } from "@tabler/icons-react";
import { FlatRegistration } from "@/components/ui/AdminRegistrationsTable";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Fetch profile to check admin status
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.admin_role) {
    // Check old is_admin just in case DB schema wasn't fully migrated yet
    if (!profile?.is_admin) {
      redirect("/dashboard");
    }
  }

  // Fetch all events from DB
  const { data: dbEvents } = await supabase.from("events").select("*");

  // Fetch all teams with their members and member profiles
  // The backend RLS policy automatically filters teams if they are an event_admin
  const { data: teams } = await supabase
    .from("teams")
    .select(`
      *,
      team_members (
        id,
        role,
        status,
        created_at,
        profiles (
          full_name,
          roll_number,
          college_name,
          branch,
          year_of_study,
          phone_number
        )
      )
    `)
    .order('created_at', { ascending: false });

  // Flatten the teams data into individual registrations for the Table View
  const flatRegistrations: FlatRegistration[] = [];
  
  if (teams && dbEvents) {
    teams.forEach(team => {
      const event = dbEvents.find(e => e.id === team.event_id);
      
      if (team.team_members) {
        team.team_members.forEach((member: any) => {
          if (member.profiles) {
            flatRegistrations.push({
              id: member.id,
              team_id: team.id,
              registration_id: `IND-${member.profiles.roll_number}`,
              participant_name: member.profiles.full_name,
              phone: member.profiles.phone_number,
              university: member.profiles.college_name,
              event_name: event?.title || team.event_id,
              event_code: event?.id || team.event_id,
              team_name: team.name,
              team_size: `${team.team_members.length}/${event?.max_team_size || '?'}`,
              role: member.role,
              registration_date: new Date(member.created_at || team.created_at).toLocaleDateString(),
              status: team.status
            });
          }
        });
      }
    });
  }

  return (
    <main className="min-h-screen relative flex flex-col pt-24 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-12 flex-1 flex flex-col max-w-[1400px]">
        <div className="mb-8 border-b border-border/50 pb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2 text-primary">
              <IconShieldLock size={24} />
              <span className="font-mono text-sm tracking-[0.2em] uppercase font-bold">Admin Clearance: {profile?.admin_role || 'Super Admin'}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight uppercase">Registration Control</h1>
          </div>
        </div>

        <AdminDashboardClient 
          flatRegistrations={flatRegistrations} 
          teams={teams || []} 
          events={dbEvents || []} 
        />
      </div>
    </main>
  );
}
