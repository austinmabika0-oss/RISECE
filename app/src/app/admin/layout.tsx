import React from "react";
import Link from "next/link";
import { IconDashboard, IconCalendarEvent, IconSpeakerphone, IconBuildingSkyscraper, IconLogout } from "@tabler/icons-react";

export const metadata = {
  title: "Admin Portal - RISECE 2K26",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="font-display text-2xl font-bold text-primary">
            RISECE <span className="text-foreground">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <IconDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <IconCalendarEvent size={20} /> Events
          </Link>
          <Link href="/admin/announcements" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <IconSpeakerphone size={20} /> Announcements
          </Link>
          <Link href="/admin/sponsors" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <IconBuildingSkyscraper size={20} /> Sponsors
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
              <IconLogout size={20} /> Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto bg-background/50 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
