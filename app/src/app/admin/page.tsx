import React from "react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch some metrics
  const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
  const { count: sponsorsCount } = await supabase.from('sponsors').select('*', { count: 'exact', head: true });
  const { count: announcementsCount } = await supabase.from('announcements').select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of RISECE 2K26 system.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-6 rounded-xl">
          <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Total Events</h3>
          <div className="text-4xl font-display font-bold text-primary">{eventsCount || 0}</div>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl">
          <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Total Sponsors</h3>
          <div className="text-4xl font-display font-bold text-secondary">{sponsorsCount || 0}</div>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl">
          <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Announcements</h3>
          <div className="text-4xl font-display font-bold text-accent">{announcementsCount || 0}</div>
        </div>
      </div>
    </div>
  );
}
