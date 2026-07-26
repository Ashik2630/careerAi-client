"use client";

import Link from "next/link";
import {
  UserCheck,
  Users,
  Calendar,
  Sparkles,
  CheckCircle2,
  FileSearch,
  Star,
  Clock,
  MessageSquare,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const MENTOR_ANALYTICS_DATA = [
  { month: "Jan", Mentees: 4, Sessions: 8, Rating: 4.8 },
  { month: "Feb", Mentees: 8, Sessions: 16, Rating: 4.9 },
  { month: "Mar", Mentees: 12, Sessions: 24, Rating: 4.9 },
  { month: "Apr", Mentees: 16, Sessions: 32, Rating: 5.0 },
];

export default function MentorDashboardView({ user, profile }: { user: any; profile: any }) {
  const upcomingSessions = [
    { mentee: "Alex Morgan", topic: "Senior Frontend System Design Prep", time: "Today 4:00 PM", type: "1:1 Session" },
    { mentee: "David Chen", topic: "Career Switch from Finance to AI Product", time: "Tomorrow 2:30 PM", type: "Portfolio Review" },
    { mentee: "Sophia Patel", topic: "Mock Technical Interview & ATS Scan", time: "Thu 5:00 PM", type: "Mock Interview" },
  ];

  const screeningCandidates = [
    { name: "Michael Chang", role: "Full Stack Engineer", matchScore: "96% ATS", status: "Review Ready" },
    { name: "Jessica Taylor", role: "React Specialist", matchScore: "92% ATS", status: "Session Scheduled" },
    { name: "Liam Wilson", role: "AI Engineer", matchScore: "94% ATS", status: "Screened" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Role Badge Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-600 text-white font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Mentor & Recruiter Portal Active</h4>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Manage mentee sessions, candidate resume screenings, and recruitment pipelines.
            </p>
          </div>
        </div>
        <Link
          href="/ai-chat"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch AI Co-Pilot</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Mentees</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">16 Active</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+4 this month</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">100% Satisfaction Rate</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Screening Pipeline</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">28 Resumes</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Ready to Review</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">High ATS Candidate Match</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Sessions Completed</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">32 Hours</span>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">This Month</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">3 Sessions Scheduled today</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Mentor Rating</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">4.98 / 5.0</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Top Verified</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Based on 48 reviews</p>
        </div>
      </div>

      {/* Analytics & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Sessions & Candidate Pipeline Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Mentorship Hours & Candidate Placements
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Mentees mentored vs successful candidate placements.</p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MENTOR_ANALYTICS_DATA}>
                <defs>
                  <linearGradient id="colorMentor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", color: "#fff" }} />
                <Area type="monotone" dataKey="Sessions" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorMentor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Upcoming Sessions Queue */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Upcoming 1:1 Sessions
            </h3>
          </div>

          <div className="space-y-3">
            {upcomingSessions.map((sessionItem, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{sessionItem.mentee}</h4>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">{sessionItem.time}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{sessionItem.topic}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/ai-chat"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Manage Session Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
