import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/ui/Navbar";
import { events } from "@/data/events";
import Link from "next/link";
import { IconLogout, IconCalendarEvent, IconUserCircle, IconCreditCard } from "@tabler/icons-react";
import { DashboardInbox } from "@/components/ui/DashboardInbox";
import { ManageTeamModal } from "@/components/ui/ManageTeamModal";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch their event registration cart
  const { data: registration } = await supabase
    .from("event_registrations")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // Fetch team memberships
  const { data: teamMemberships } = await supabase
    .from("team_members")
    .select(`
      *,
      teams (
        *,
        team_members (
          *,
          profiles ( id, full_name, roll_number )
        )
      )
    `)
    .eq("user_id", user.id);

  const activeRegistrations = teamMemberships?.filter(tm => tm.status === "accepted") || [];
  const pendingInvites = teamMemberships?.filter(tm => tm.status === "pending") || [];

  const registeredEventIds = registration?.event_ids || [];
  const myEvents = events.filter(e => registeredEventIds.includes(String(e.id)));

  const isVerified = registration?.payment_status === 'VERIFIED';

  return (
    <main className="min-h-screen relative flex flex-col pt-24 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Profile Sidebar */}
          <aside className="w-full md:w-1/3 lg:w-1/4">
            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm sticky top-28">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 flex items-center justify-center text-primary rounded-full">
                  <IconUserCircle size={32} />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Operative</div>
                  <div className="font-bold text-lg">{profile?.full_name || "Unknown"}</div>
                </div>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Institution</div>
                  <div className="p-2 bg-background border border-border">{profile?.college_name || "N/A"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Contact</div>
                  <div className="p-2 bg-background border border-border">{profile?.phone_number || "N/A"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Email</div>
                  <div className="p-2 bg-background border border-border">{user.email}</div>
                </div>
              </div>

              <form action="/auth/signout" method="post" className="mt-8">
                <button type="submit" className="w-full py-3 flex items-center justify-center gap-2 text-destructive border border-destructive/50 hover:bg-destructive/10 transition-colors font-mono uppercase tracking-widest text-sm font-bold">
                  <IconLogout size={16} /> Terminate Session
                </button>
              </form>
            </div>
          </aside>

          {/* Registrations & Inbox */}
          <section className="flex-1">
            <DashboardInbox invites={pendingInvites} />

            <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-border/50 pb-4">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight mb-2">MY REGISTRATIONS</h1>
                <p className="text-muted-foreground font-mono text-sm">Active event clearances and access codes.</p>
              </div>
              {registration && (
                <div className="text-right">
                  <div className="font-mono text-xs text-muted-foreground uppercase mb-1">Registration ID</div>
                  <div className="font-mono font-bold text-primary">{registration.registration_id}</div>
                </div>
              )}
            </div>

            {!registration ? (
              <div className="p-12 border border-border border-dashed text-center">
                <div className="text-muted-foreground font-mono mb-4">NO ACTIVE REGISTRATIONS DETECTED</div>
                <Link href="/register" className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">
                  Begin Registration Process
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myEvents.map(event => {
                  const activeTeamForThisEvent = activeRegistrations.find(r => r.event_id === String(event.id))?.teams;
                  
                  return (
                    <div key={event.id} className={`p-6 border relative group overflow-hidden flex flex-col ${isVerified ? 'border-border bg-card/20' : 'border-amber-500/30 bg-amber-500/5'}`}>
                      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <IconCalendarEvent size={64} />
                      </div>
                      
                      <div className="relative z-10 flex-1">
                        <div className="font-mono text-xs font-bold mb-4 flex justify-between items-start gap-1">
                          <span className={`${isVerified ? 'text-primary' : 'text-amber-500'} shrink-0 uppercase`}>
                            {isVerified ? "ACCESS GRANTED" : `PAYMENT: ${registration.payment_status}`}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-1 pr-12 break-words">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{event.date} • {event.time}</p>
                        
                        <div className="inline-block px-3 py-1 bg-background border border-border text-xs font-mono uppercase mb-4">
                          ID: {event.code}
                        </div>
                        
                        {event.isTeamEvent && isVerified && (
                          <div className="mt-2 pt-4 border-t border-border/50">
                            <div className="text-xs font-mono text-muted-foreground uppercase mb-2">Team Details</div>
                            {!activeTeamForThisEvent ? (
                              <div className="text-sm text-foreground/70 mb-4">
                                You have not joined a team for this event yet.
                                <br/><br/>
                                <Link href={`/events/${event.slug}`} className="text-primary hover:underline font-mono">
                                  Go to event to initialize team →
                                </Link>
                              </div>
                            ) : (
                              <div className="mb-4">
                                <div className="font-bold text-sm uppercase">{activeTeamForThisEvent.name}</div>
                                <div className="text-xs text-muted-foreground">{activeTeamForThisEvent.team_members.length} / {event.maxTeamSize} Members</div>
                              </div>
                            )}
                          </div>
                        )}

                        {event.isTeamEvent && isVerified && activeTeamForThisEvent && (
                          <ManageTeamModal 
                            team={activeTeamForThisEvent} 
                            event={{
                              id: String(event.id),
                              title: event.title,
                              max_team_size: event.maxTeamSize,
                              code: event.code
                            }}
                            currentUserId={user.id}
                          />
                        )}

                        {!isVerified && (
                          <div className="mt-4 pt-4 border-t border-amber-500/20">
                            <Link href="/register" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-mono text-sm font-bold uppercase">
                              <IconCreditCard size={16} /> View Payment Status
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
