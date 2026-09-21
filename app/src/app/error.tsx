"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Application error caught by Global Boundary:", error);
    
    // Automatically redirect to the home page
    router.push("/");
  }, [error, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground font-sans p-4 text-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
      <h2 className="font-display text-2xl font-bold mb-2 uppercase tracking-tight">System Recalibrating</h2>
      <p className="text-muted-foreground font-mono text-sm max-w-md">
        An unexpected anomaly was detected. Redirecting you to the main headquarters safely...
      </p>
    </div>
  );
}
