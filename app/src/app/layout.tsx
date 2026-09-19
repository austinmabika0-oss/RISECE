import type { Metadata } from "next";
import { ThemeWaveProvider } from "@/components/ui/ThemeWaveProvider";
import { Navbar } from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { BottomNav } from "@/components/ui/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "RISECE 2K26 — National Level Civil Engineering Technical Fest",
  description:
    "Resilience, Innovation, Strength & Excellence in Civil Engineering. A national-level technical fest organized by the Department of Civil Engineering, Vignan University. 8 events, 2 days, 9–10 October 2026.",
  keywords: [
    "RISECE 2K26",
    "civil engineering fest",
    "Vignan University",
    "technical fest",
    "engineering competition",
    "bridge building",
    "AutoCAD competition",
    "civil engineering events",
  ],
  openGraph: {
    title: "RISECE 2K26 — Where Civil Engineers Rise",
    description:
      "National Level Civil Engineering Technical Fest · 9–10 October 2026 · Vignan University",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased font-sans bg-background text-foreground overflow-x-hidden w-full max-w-[100vw] pb-20 md:pb-0" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <ThemeWaveProvider>
          <div className="fixed inset-0 z-[-1] pointer-events-none opacity-15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/back_light.png" alt="Blueprint Light" className="absolute inset-0 w-full h-full object-cover dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/back_dark.png" alt="Blueprint Dark" className="absolute inset-0 w-full h-full object-cover hidden dark:block" />
          </div>
          {children}
          <Footer />
          <BottomNav />
        </ThemeWaveProvider>
      </body>
    </html>
  );
}
