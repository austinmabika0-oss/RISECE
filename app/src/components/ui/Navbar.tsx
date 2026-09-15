"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useThemeWave } from "@/components/ui/ThemeWaveProvider";
import { motion } from "framer-motion";
import { IconSun, IconMoonStars, IconMenu2, IconX, IconUserCircle } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Schedule", href: "/schedule" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeWave();
  const pathname = usePathname();
  const supabase = createClient();

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: prof } = await supabase.from("profiles").select("full_name, roll_number").eq("id", user.id).single();
        if (prof) setProfile(prof);
      }
    }
    checkAuth();
  }, [supabase]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b shadow-sm"
          : "py-5 bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            RISECE<span className="text-primary">2K26</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative font-medium text-sm transition-colors hover:text-primary"
              >
                <span className={isActive ? "text-primary" : "text-muted-foreground"}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </button>
          )}

          {/* Auth Action */}
          {user ? (
            <Link
              href="/dashboard"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-sm hover:border-primary transition-all group"
            >
              <IconUserCircle size={20} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-mono font-bold uppercase tracking-widest">{profile?.roll_number || 'OPERATIVE'}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 uppercase font-mono tracking-widest"
            >
              Login / Register
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 top-[60px] md:hidden bg-background/95 backdrop-blur-xl border-t border-border z-40 overflow-y-auto"
        >
          <div className="flex flex-col p-6 space-y-6 h-full pb-safe">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-2xl font-display font-bold py-3 border-b border-border/50 ${
                  pathname === link.href ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-8 flex flex-col gap-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="w-full py-4 px-6 text-center text-primary bg-primary/10 border border-primary/50 rounded-lg font-bold uppercase font-mono flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IconUserCircle size={24} />
                  Dashboard ({profile?.roll_number})
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="w-full py-4 px-6 text-center text-primary-foreground bg-primary rounded-lg font-bold uppercase font-mono text-lg shadow-lg active:scale-95 transition-transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
