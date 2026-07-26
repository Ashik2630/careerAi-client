"use client";

import { useState, useEffect } from "react";
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
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Mail, 
  Loader2,
  Zap,
  BarChart2,
  Home,
  MessageSquare,
  FileSearch,
  BookOpen,
  PlusCircle,
  Database,
  User
} from "lucide-react";
import UserDropdown from "@/components/auth/UserDropdown";
import ThemeToggle from "@/components/ThemeToggle";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Analytics Data for Recharts
const SKILL_ANALYTICS_DATA = [
  { month: "Jan", React: 45, Node: 30, TypeScript: 20, Hours: 25 },
  { month: "Feb", React: 55, Node: 40, TypeScript: 35, Hours: 38 },
  { month: "Mar", React: 68, Node: 50, TypeScript: 50, Hours: 45 },
  { month: "Apr", React: 75, Node: 65, TypeScript: 62, Hours: 52 },
  { month: "May", React: 85, Node: 78, TypeScript: 75, Hours: 65 },
  { month: "Jun", React: 92, Node: 85, TypeScript: 88, Hours: 78 },
];

export default function UnifiedDashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success && data.data) {
        setProfile(data.data);
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

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#2563EB] dark:text-purple-400 animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Loading your Career Dashboard...</p>
        </div>
      </div>
    );
  }

  const user = session?.user || {
    name: profile?.name || "Alex Candidate",
    email: profile?.email || "alex.candidate@example.com",
    image: null,
    role: "job-seeker",
  };

  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
    : "AC";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold font-serif text-lg shadow-xs group-hover:scale-105 transition-transform">
              C
            </div>
            <div>
              <span className="font-serif font-bold text-slate-900 dark:text-white text-lg block leading-tight">CareerAI</span>
              <span className="text-[10px] text-slate-400 font-sans block">Multi-Agent AI Platform</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-purple-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-all"
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
        <div className="bg-gradient-to-r from-[#2563EB] via-[#1d4ed8] to-[#0F172A] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
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
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-white/10 text-white border-white/20 backdrop-blur-md">
                    <Target className="w-3.5 h-3.5 text-blue-300" />
                    <span>Goal: {profile?.goal || "Full Stack Developer"}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200 font-medium">
                  <Mail className="w-3.5 h-3.5 text-blue-300" />
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

        {/* Recharts Analytics Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#2563EB]" /> AI Career Progress Analytics
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track your skill acceleration % and learning hours logged over time.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full self-start sm:self-auto">
              +40% React Skill Growth
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SKILL_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#0F172A", border: "none", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="React" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorReact)" />
                <Area type="monotone" dataKey="TypeScript" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorTS)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Agent Features Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
            Protected AI Workspaces & Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tool 1: Resume Analyzer */}
            <Link href="/resume-analyzer" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#2563EB] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <FileSearch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] transition-colors">
                  AI Resume Analyzer
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Scan resume PDF/text for ATS score, extracted skills, and missing keywords.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#2563EB]">
                <span>Launch Scanner</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 2: AI Chat Assistant */}
            <Link href="/ai-chat" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  AI Career Assistant Chat
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Interactive AI coach with typing animation and persistent MongoDB history.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Start Chat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 3: Job Recommendations */}
            <Link href="/job-recommendation" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Smart Job Matcher
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Context-aware job recommendation engine based on user profile skills.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>View Recommendations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 4: Learning Roadmap */}
            <Link href="/roadmap" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  90-Day Learning Roadmap
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Step-by-step learning timeline with milestone checkboxes & progress track.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>View Roadmap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 5: Add Item */}
            <Link href="/items/add" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                  Add Item
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add target job listings or skill benchmarks directly to MongoDB.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>Create Item</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 6: Manage Items */}
            <Link href="/items/manage" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Manage Items
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  View, edit, or delete items stored in your MongoDB database collections.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-600">
                <span>Manage Records</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
}
