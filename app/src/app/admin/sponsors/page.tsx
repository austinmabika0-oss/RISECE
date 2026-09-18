import React from "react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSponsorsPage() {
  const supabase = await createClient();
  const { data: sponsors } = await supabase.from('sponsors').select('*').order('display_order');

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Sponsors</h1>
          <p className="text-muted-foreground mt-1">Manage event partners and sponsors.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg">
          + Add Sponsor
        </button>
      </header>
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-muted-foreground">List of {sponsors?.length || 0} sponsors loaded from Supabase.</p>
      </div>
    </div>
  );
}
