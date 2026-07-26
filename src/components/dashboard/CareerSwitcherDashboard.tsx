"use client";

import Link from "next/link";
import {
  Compass,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Award,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Layers,
  GraduationCap
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const SWITCHER_PROGRESS_DATA = [
  { month: "Month 1", SkillGap: 80, TransferableScore: 40 },
  { month: "Month 2", SkillGap: 60, TransferableScore: 58 },
  { month: "Month 3", SkillGap: 40, TransferableScore: 72 },
  { month: "Month 4", SkillGap: 20, TransferableScore: 88 },
];

export default function CareerSwitcherDashboard({ user, profile }: { user: any; profile: any }) {
  const pivotMilestones = [
    { title: "Transferable Skills Identified", desc: "Communication, Data Analysis, Stakeholder Mgmt", done: true },
    { title: "Target Role Bridge Course", desc: "Enrolled in AI & Cloud System Fundamentals", done: true },
    { title: "First Transition Portfolio Project", desc: "Full Stack Next.js + MongoDB Platform", done: false },
    { title: "Mentorship Mock Interview", desc: "Scheduled with Senior Tech Lead Mentor", done: false },
  ];

  const transferableSkills = [
    { skill: "Project Management", targetApplication: "Agile Sprint Orchestration", match: "95%" },
    { skill: "Data Analysis (Excel / SQL)", targetApplication: "Business Intelligence & Metrics", match: "90%" },
    { skill: "Client Engagement", targetApplication: "User Requirements & Solutions Arch", match: "88%" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Role Badge Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/80 text-purple-900 dark:text-purple-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600 text-white font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Career Switcher Workspace Active</h4>
            <p className="text-xs text-purple-700 dark:text-purple-300">
              Pivot strategy engine, transferable skills mapping matrix, and domain transition roadmap.
            </p>
          </div>
        </div>
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Pivot Roadmap</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Pivot Readiness Score</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">78%</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+14% Pivot Gain</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Targeting: {profile?.goal || "AI Product Specialist"}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Transferable Skills</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">8 Identified</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">92% Relevance</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Mapped to Tech Requirements</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Bridge Courses</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">2 Completed</span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">1 In Progress</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Estimated finish: 3 weeks</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Mentor Guidance</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">Active</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">1:1 Session Set</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Next: Thursday 4:00 PM</p>
        </div>
      </div>

      {/* Analytics & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Transition Skill Velocity */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Career Switch Transition Velocity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Transferable Skill Score vs Target Skill Gap Reduction.</p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SWITCHER_PROGRESS_DATA}>
                <defs>
                  <linearGradient id="colorSwitcher" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", color: "#fff" }} />
                <Area type="monotone" dataKey="TransferableScore" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorSwitcher)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Pivot Milestones & Transferable Matrix */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Transition Roadmap Milestones
          </h3>

          <div className="space-y-3">
            {pivotMilestones.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                <div className={`p-1 rounded-full mt-0.5 ${m.done ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400"}`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/roadmap"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Explore AI Transition Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
