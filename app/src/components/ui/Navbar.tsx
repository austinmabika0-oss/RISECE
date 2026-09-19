"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useThemeWave } from "@/components/ui/ThemeWaveProvider";
import { motion } from "framer-motion";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { REGISTRATION_CONFIG } from "@/config/registration";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Schedule", href: "/schedule" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeWave();
  const pathname = usePathname();

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

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
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <img src="/logos/vignan logo.png" alt="Vignan Logo" className="h-[43px] w-auto object-contain" />
            <img src="/logos/custom_logo.png" alt="RISE CE" className="h-12 w-auto object-contain" />
            <img src="/logos/nbr accredation.png" alt="NBA" className="h-12 w-auto object-contain" />
            <img src="/logos/naac acredation.png" alt="NAAC A+" className="h-12 w-auto object-contain" />
            <img src="/logos/nirf rank.png" alt="NIRF 70" className="h-12 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative font-semibold text-sm transition-colors hover:text-primary uppercase tracking-widest"
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
          {/* Theme Toggle (Desktop Only) */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </button>
          )}

          <Link
            href="/register"
            className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 uppercase font-mono tracking-widest"
          >
            Register Now
          </Link>
        </div>
      </div>
    </header>
  );
}
