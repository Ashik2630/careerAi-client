"use client";

import Link from "next/link";
import {
  FileText,
  Briefcase,
  TrendingUp,
  Target,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Building2,
  MapPin,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const JOB_SEEKER_ANALYTICS = [
  { week: "W1", Applications: 5, Interviews: 1, Score: 70 },
  { week: "W2", Applications: 12, Interviews: 2, Score: 76 },
  { week: "W3", Applications: 18, Interviews: 4, Score: 82 },
  { week: "W4", Applications: 24, Interviews: 6, Score: 88 },
];

export default function JobSeekerDashboard({ user, profile }: { user: any; profile: any }) {
  const activeApplications = [
    { title: "Senior Frontend Developer", company: "Stripe", location: "Remote", status: "Interviewing", date: "2 days ago", match: "94%" },
    { title: "Full Stack Engineer", company: "Vercel", location: "San Francisco, CA", status: "Applied", date: "5 days ago", match: "89%" },
    { title: "React Specialist", company: "Linear", location: "Remote", status: "Screening", date: "1 week ago", match: "92%" },
  ];

  const targetRole = profile?.goal || "Frontend Developer";

  return (
    <div className="space-y-8">
      
      {/* Role Badge Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 text-blue-900 dark:text-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Job Seeker Workspace Active</h4>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Tailored tools for active role applications, resume ATS scoring, and recruiter matching.
            </p>
          </div>
        </div>
        <Link
          href="/resume-analyzer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Run ATS Resume Scan</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">ATS Match Score</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">88%</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+6% vs last scan</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Target Role: {targetRole}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Applications</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">24</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">6 Interviews</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">3 response alerts pending</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Target Role Matches</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">142</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">98.4% Match</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Updated 10 mins ago</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Interview Readiness</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">4.9 / 5.0</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Top Candidate</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Based on AI Mock Sessions</p>
        </div>
      </div>

      {/* Analytics & Active Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Application Progress Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Job Search Velocity & Interview Conversion
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Applications submitted vs interview invitations over 4 weeks.</p>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={JOB_SEEKER_ANALYTICS}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", color: "#fff" }} />
                <Area type="monotone" dataKey="Applications" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Active Job Applications */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Active Job Pipeline
            </h3>
            <Link href="/job-recommendation" className="text-xs font-semibold text-blue-600 dark:text-purple-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {activeApplications.map((app, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{app.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {app.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {app.location}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 block">
                    {app.status}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">{app.match} AI Match</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/job-recommendation"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore AI Matched Openings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
