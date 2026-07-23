"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { 
  Sparkles, 
  Briefcase, 
  Compass, 
  GraduationCap, 
  UserCheck, 
  ArrowRight, 
  LogOut, 
  Settings, 
  LayoutDashboard, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Mail, 
  Loader2,
  Zap,
  BarChart2,
  Home
} from "lucide-react";
import UserDropdown from "@/components/auth/UserDropdown";
import ThemeToggle from "@/components/ThemeToggle";

// Role display configuration mapping
const ROLE_MAP: Record<string, { label: string; icon: any; color: string }> = {
  "job-seeker": { label: "Job Seeker", icon: Briefcase, color: "text-[#3b28cc]" },
  "switcher": { label: "Career Switcher", icon: Compass, color: "text-indigo-500" },
  "student": { label: "Student", icon: GraduationCap, color: "text-amber-500" },
  "mentor": { label: "Mentor / Recruiter", icon: UserCheck, color: "text-emerald-500" },
};

export default function UnifiedDashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

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

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#3b28cc] dark:text-purple-400 animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Loading your Career Dashboard...</p>
        </div>
      </div>
    );
  }

  // User details
  const user = session?.user || {
    name: "Alex Candidate",
    email: "alex.candidate@example.com",
    image: null,
    role: "job-seeker",
  };

  const userRoleKey = (user as any).role || "job-seeker";
  const roleConfig = ROLE_MAP[userRoleKey] || ROLE_MAP["job-seeker"];
  const RoleIcon = roleConfig.icon;

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "AC";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      
      {/* Standalone Dashboard Header (No Main Site Navbar - Matching Image 2) */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#3b28cc] text-white flex items-center justify-center font-bold font-serif text-lg shadow-xs group-hover:scale-105 transition-transform">
              C
            </div>
            <div>
              <span className="font-serif font-bold text-slate-900 dark:text-white text-lg block leading-tight">CareerAI</span>
              <span className="text-[10px] text-slate-400 font-sans block">Unified Dashboard Hub</span>
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

      {/* Main Workspace Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Welcome Hero Card */}
        <div className="bg-gradient-to-r from-[#3b28cc] via-[#4338ca] to-[#1e1b4b] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

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
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-white/10 text-white border-white/20 backdrop-blur-md">
                    <RoleIcon className="w-3.5 h-3.5" />
                    <span>{roleConfig.label}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-200 font-medium">
                  <Mail className="w-3.5 h-3.5 text-purple-300" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href="/careerai/settings"
                className="flex-1 md:flex-none text-center bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
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

        {/* Workspace Hub Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
              Select Your Workspace
            </h2>
            <span className="text-xs font-semibold text-slate-400">
              AI Empowered Workspaces
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: CareerAI Intelligence */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-[#3b28cc] dark:text-purple-400 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#3b28cc] dark:text-purple-400 uppercase tracking-wider block mb-1">
                    Primary Intelligence Platform
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#3b28cc] dark:group-hover:text-purple-400 transition-colors">
                    CareerAI Intelligence Dashboard
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Scan your resume with AI, identify critical skill gaps, view customized career roadmaps, and match with real-time target jobs.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <BarChart2 className="w-3 h-3 text-[#3b28cc] dark:text-purple-400" /> AI Resume Score
                  </span>
                  <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Target className="w-3 h-3 text-[#3b28cc] dark:text-purple-400" /> Skill Gap Radar
                  </span>
                  <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[#3b28cc] dark:text-purple-400" /> 90-Day Roadmap
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/careerai"
                  className="w-full bg-[#3b28cc] hover:bg-[#2e1ebd] text-white font-semibold py-3 px-5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all group-hover:translate-x-0.5"
                >
                  <span>Launch CareerAI Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Career Mentor Portal */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                    Empathetic Mentorship
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Career Mentor Dashboard
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Connect with AI Career Mentors, simulate mock interviews, get step-by-step career switching guidance, and expert feedback.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> AI Mentor Chat
                  </span>
                  <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Interview Coach
                  </span>
                  <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Hiring Insights
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/mentor"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all group-hover:translate-x-0.5"
                >
                  <span>Launch Career Mentor Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
