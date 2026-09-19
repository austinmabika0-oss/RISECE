"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useThemeWave } from "@/components/ui/ThemeWaveProvider";
import { useEffect, useState } from "react";
import { 
  IconHome, 
  IconCalendarEvent, 
  IconTicket, 
  IconListDetails,
  IconSun,
  IconMoonStars
} from "@tabler/icons-react";

export function BottomNav() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { toggleTheme } = useThemeWave();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navItems = [
    { name: "Home", href: "/", icon: <IconHome size={22} stroke={1.5} /> },
    { name: "Events", href: "/events", icon: <IconCalendarEvent size={22} stroke={1.5} /> },
    { name: "Register", href: "/register", icon: <IconTicket size={22} stroke={1.5} /> },
    { name: "Schedule", href: "/schedule", icon: <IconListDetails size={22} stroke={1.5} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110 mb-0.5' : 'scale-100 mb-1'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Theme Toggle Button */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center justify-center w-16 h-12 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
            aria-label="Toggle theme"
          >
            <div className="scale-100 mb-1 transition-transform duration-300">
              {theme === "dark" ? <IconSun size={22} stroke={1.5} /> : <IconMoonStars size={22} stroke={1.5} />}
            </div>
            <span className="text-[10px] font-medium tracking-wide opacity-70">
              Theme
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
