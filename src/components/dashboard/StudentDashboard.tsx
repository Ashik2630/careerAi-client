"use client";

import Link from "next/link";
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Code2,
  Trophy,
  Sparkles,
  CheckCircle2,
  Laptop,
  Layers
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const STUDENT_PROGRESS_DATA = [
  { month: "Sem 1", Fundamentals: 35, Projects: 1, Preparedness: 40 },
  { month: "Sem 2", Fundamentals: 55, Projects: 2, Preparedness: 60 },
  { month: "Sem 3", Fundamentals: 75, Projects: 4, Preparedness: 78 },
  { month: "Sem 4", Fundamentals: 90, Projects: 6, Preparedness: 88 },
];

export default function StudentDashboard({ user, profile }: { user: any; profile: any }) {
  const academicProjects = [
    { title: "AI Resume & Career Accelerator", tech: "React, Next.js, Node.js, MongoDB", status: "Published" },
    { title: "Distributed Task Queue System", tech: "TypeScript, Redis, Docker", status: "In Progress" },
    { title: "Real-time Chat Copilot", tech: "WebSockets, OpenAI API, Tailwind", status: "Completed" },
  ];

  const internships = [
    { title: "Frontend Engineering Intern", company: "Meta", stipend: "$45/hr", deadline: "In 3 days" },
    { title: "Junior Software Developer Intern", company: "Microsoft", stipend: "$40/hr", deadline: "In 1 week" },
    { title: "AI / ML Research Intern", company: "OpenAI", stipend: "$50/hr", deadline: "In 5 days" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Role Badge Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-600 text-white font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Student & Campus Placement Workspace Active</h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Campus placement prep, entry-level internships, project portfolio builder, and fundamental skill trees.
            </p>
          </div>
        </div>
        <Link
          href="/job-recommendation"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Find Campus Internships</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">First-Job Readiness</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">85%</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Placement Ready</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Education: {profile?.education || "Computer Science B.S."}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Portfolio Projects</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">3 Projects</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">GitHub Synced</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">2 Live Demos hosted</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Internship Matches</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Laptop className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">18 Openings</span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Summer 2026</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Top Tier Tech & Startups</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Core Fundamentals</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">4 / 4 Verified</span>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Data Structs & OS</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">CS Core Level Complete</p>
        </div>
      </div>

      {/* Projects & Internships */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Portfolio Projects */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Academic & Capstone Portfolio
            </h3>
          </div>

          <div className="space-y-3">
            {academicProjects.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{p.tech}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Internship Openings */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Laptop className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Recommended Internships
            </h3>
            <Link href="/job-recommendation" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {internships.map((intern, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{intern.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{intern.company} • {intern.stipend}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block">{intern.deadline}</span>
                  <Link href="/job-recommendation" className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mt-1 block">
                    Apply Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
