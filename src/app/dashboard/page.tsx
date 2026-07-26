"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Compass,
  Briefcase,
  GraduationCap,
  UserCheck,
  LogOut,
  Target,
  Mail,
  Loader2,
  Home,
  User,
  Sparkles
} from "lucide-react";
import UserDropdown from "@/components/auth/UserDropdown";
import ThemeToggle from "@/components/ThemeToggle";

import JobSeekerDashboard from "@/components/dashboard/JobSeekerDashboard";
import CareerSwitcherDashboard from "@/components/dashboard/CareerSwitcherDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import MentorDashboardView from "@/components/dashboard/MentorDashboardView";

export default function UnifiedDashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [activeRole, setActiveRole] = useState<string>("job-seeker");

  useEffect(() => {
    fetchProfile();

    const handleProfileUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setProfile(customEvent.detail);
        if (customEvent.detail.role) {
          setActiveRole(customEvent.detail.role);
        }
      } else {
        fetchProfile();
      }
    };

    window.addEventListener("profile-updated", handleProfileUpdated);
    return () => window.removeEventListener("profile-updated", handleProfileUpdated);
  }, []);

  useEffect(() => {
    if (profile?.role) {
      setActiveRole(profile.role);
    } else if ((session?.user as any)?.role) {
      setActiveRole((session?.user as any).role);
    }
  }, [profile, session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success && data.data) {
        setProfile(data.data);
        if (data.data.role) {
          setActiveRole(data.data.role);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#3b28cc] dark:text-purple-400 animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Loading your Career Dashboard...</p>
        </div>
      </div>
    );
  }

  const user = {
    name: profile?.name || session?.user?.name || "Alex Candidate",
    email: profile?.email || session?.user?.email || "alex.candidate@example.com",
    image: session?.user?.image || null,
    role: profile?.role || (session?.user as any)?.role || "job-seeker",
  };

  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
    : "AC";

  const allRolesList = [
    { id: "job-seeker", label: "Job Seeker", icon: Briefcase },
    { id: "switcher", label: "Career Switcher", icon: Compass },
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "mentor", label: "Mentor / Recruiter", icon: UserCheck },
  ];

  // Mentors get access to all role tabs. Specific roles only see their own workspace tab.
  const rolesList = user.role === "mentor"
    ? allRolesList
    : allRolesList.filter(r => r.id === user.role);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">

      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#3b28cc] text-white flex items-center justify-center font-bold font-serif text-lg shadow-xs group-hover:scale-105 transition-transform">
              C
            </div>
            <div>
              <span className="font-serif font-bold text-slate-900 dark:text-white text-lg block leading-tight">CareerAI</span>
              <span className="text-[10px] text-slate-400 font-sans block">Role-Based Intelligence</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#3b28cc] dark:hover:text-purple-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Main Site</span>
          </Link>

          <ThemeToggle />

          <div className="border-l border-slate-200 dark:border-slate-800 pl-3">
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-[#1b1554] via-[#3b28cc] to-[#0f172a] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div className="flex items-center gap-4 sm:gap-6">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold text-xl sm:text-2xl flex items-center justify-center ring-4 ring-white/20 shadow-lg">
                  {initials}
                </div>
              )}

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight">
                    Welcome back, {user.name || "User"}!
                  </h1>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-white/15 text-white border-white/30 backdrop-blur-md uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                    <span>Role: {rolesList.find(r => r.id === activeRole)?.label || activeRole}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-200 font-medium">
                  <Mail className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href="/profile"
                className="flex-1 md:flex-none text-center bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Edit Profile</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 border border-rose-400/30 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 hidden sm:inline">
            Workspace:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto flex-1">
            {rolesList.map((r) => {
              const IconComp = r.icon;
              const isSelected = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRole(r.id)}
                  className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#3b28cc] text-white shadow-md shadow-purple-900/20"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Role Dashboard Render */}
        {activeRole === "job-seeker" && <JobSeekerDashboard user={user} profile={profile} />}
        {activeRole === "switcher" && <CareerSwitcherDashboard user={user} profile={profile} />}
        {activeRole === "student" && <StudentDashboard user={user} profile={profile} />}
        {activeRole === "mentor" && <MentorDashboardView user={user} profile={profile} />}

      </main>
    </div>
  );
}
