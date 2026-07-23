"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if current route is a dashboard workspace (CareerAI, Mentor, or Unified Dashboard)
  const isDashboardRoute =
    pathname.startsWith("/careerai") ||
    pathname.startsWith("/mentor") ||
    pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
