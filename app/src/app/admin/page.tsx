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
    if (!profile?.is_admin) {
      redirect("/dashboard");
    }
  }

  // Fetch all events from DB
  const { data: dbEvents } = await supabase.from("events").select("*");

  // Fetch all registrations/payments
  const { data: registrations } = await supabase
    .from("event_registrations")
    .select(`
      *,
      profiles (
        full_name,
        roll_number,
        college_name,
        phone_number
      )
    `)
    .order('created_at', { ascending: false });

  // Flatten for the table
  const flatRegistrations: FlatRegistration[] = [];
  
  if (registrations) {
    registrations.forEach(reg => {
      if (reg.profiles) {
        flatRegistrations.push({
          id: reg.registration_id, // Primary key
          participant_name: reg.profiles.full_name,
          roll_number: reg.profiles.roll_number,
          phone: reg.profiles.phone_number,
          university: reg.profiles.college_name,
          program: reg.program,
          event_ids: reg.event_ids,
          event_count: reg.event_count,
          total_amount: reg.total_amount,
          participation_fee: reg.participation_fee,
          accommodation_required: reg.accommodation_required,
          accommodation_fee: reg.accommodation_fee,
          utr_number: reg.utr_number || "N/A",
          payment_status: reg.payment_status,
          payment_screenshot: reg.payment_screenshot || null,
          registration_date: new Date(reg.created_at).toLocaleDateString(),
        });
      }
    });
  }

  // Also fetch teams for the card view
  const { data: teams } = await supabase
    .from("teams")
    .select(`
      *,
      team_members (
        id, role, status, created_at,
        profiles ( full_name, roll_number, college_name, branch, year_of_study, phone_number )
      )
    `)
    .order('created_at', { ascending: false });

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
