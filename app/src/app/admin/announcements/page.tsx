import React from "react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient();
  const { data: announcements } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">Manage notices and updates.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg">
          + New Announcement
        </button>
      </header>
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-muted-foreground">List of {announcements?.length || 0} announcements loaded from Supabase.</p>
      </div>
    </div>
  );
}
