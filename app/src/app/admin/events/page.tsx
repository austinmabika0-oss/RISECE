import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events, error } = await supabase.from('events').select('*').order('display_order');

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">Manage RISECE events and competitions.</p>
        </div>
      </header>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/50 border-b border-border text-muted-foreground text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium">Event Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events?.map((event: any) => (
              <tr key={event.id} className="hover:bg-secondary/20 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">{event.code}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{event.title}</div>
                  <div className="text-sm text-muted-foreground">{event.domain}</div>
                </td>
                <td className="px-6 py-4 capitalize">{event.category}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    event.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/events/${event.id}`} className="text-sm text-primary hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(!events || events.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No events found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
