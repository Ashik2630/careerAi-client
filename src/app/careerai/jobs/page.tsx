"use client";

import { Briefcase, Sparkles, Send, CheckCircle2, Bookmark } from "lucide-react";

export default function CareerAiJobsPage() {
  const jobs = [
    {
      role: "Senior Product Designer - Design Systems",
      company: "Figma",
      location: "San Francisco, CA (Hybrid)",
      match: "95%",
      salary: "$190k - $240k",
    },
    {
      role: "Lead UI/UX Architect",
      company: "Airbnb",
      location: "Remote (US)",
      match: "91%",
      salary: "$205k - $250k",
    },
    {
      role: "Staff Design Engineer",
      company: "Vercel",
      location: "Remote",
      match: "87%",
      salary: "$180k - $225k",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900 dark:text-white tracking-tight">AI Job Opportunities</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          High-match vacancies matched with your empathetic AI Career Agent.
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{job.role}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{job.company} • {job.location} • {job.salary}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                {job.match} Match
              </span>
              <button className="bg-[#3b28cc] hover:bg-[#2d1eb3] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer">
                One-Click Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
