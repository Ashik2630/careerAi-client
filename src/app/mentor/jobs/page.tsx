"use client";

import { useState } from "react";
import { Search, MapPin, DollarSign, Building2, Briefcase, ExternalLink, Bookmark, CheckCircle2, Sparkles, Send } from "lucide-react";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Matches");

  const jobs = [
    {
      id: 1,
      role: "Senior Software Engineer",
      company: "Google",
      location: "Remote",
      salary: "$180k - $220k",
      matchScore: 92,
      posted: "2 hours ago",
      skillsMatched: ["React", "TypeScript", "System Design"],
      applied: false,
    },
    {
      id: 2,
      role: "Backend Developer (Python)",
      company: "Netflix",
      location: "Los Gatos, CA",
      salary: "$195k - $240k",
      matchScore: 88,
      posted: "5 hours ago",
      skillsMatched: ["Python", "Django", "AWS"],
      applied: true,
    },
    {
      id: 3,
      role: "Cloud Infrastructure Engineer",
      company: "AWS",
      location: "Seattle, WA",
      salary: "$175k - $210k",
      matchScore: 78,
      posted: "1 day ago",
      skillsMatched: ["AWS", "Kubernetes", "Docker"],
      applied: false,
    },
    {
      id: 4,
      role: "Staff Product Designer / Engineer",
      company: "Stripe",
      location: "San Francisco, CA",
      salary: "$210k - $260k",
      matchScore: 85,
      posted: "1 day ago",
      skillsMatched: ["Design Systems", "React", "Node.js"],
      applied: false,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-900 dark:text-white">AI Job Matcher</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Curated opportunities matched against your skill gap profile.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700 text-xs font-semibold">
          {["All Matches", "Remote Only", "Saved"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedFilter === filter
                  ? "bg-white dark:bg-slate-900 text-[#3b28cc] dark:text-purple-400 shadow-2xs font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Job List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Job Cards List */}
        <div className="lg:col-span-8 space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs hover:border-[#3b28cc]/40 dark:hover:border-purple-400/40 transition-all space-y-4 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 font-bold text-base shrink-0 group-hover:bg-purple-50 dark:group-hover:bg-purple-950/60 group-hover:text-[#3b28cc] dark:group-hover:text-purple-400 transition-colors">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-[#3b28cc] dark:group-hover:text-purple-400 transition-colors">
                      {job.role}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {job.company} • {job.location} • {job.posted}
                    </p>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="text-right">
                  <span className="inline-block bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-900/60">
                    {job.matchScore}% Match
                  </span>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{job.salary}</p>
                </div>
              </div>

              {/* Skills Tag Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {job.skillsMatched.map((skill, sIdx) => (
                  <span key={sIdx} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs px-2.5 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button className="text-xs font-semibold text-[#3b28cc] dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5 text-[#3b28cc] dark:text-purple-400" /> Generate Cover Letter
                  </button>

                  <button
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      job.applied
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
                        : "bg-[#3b28cc] hover:bg-[#2d1eb3] text-white shadow-xs cursor-pointer"
                    }`}
                  >
                    {job.applied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Applied
                      </>
                    ) : (
                      <>
                        Apply Now <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: AI Job Copilot Summary */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#3b28cc] dark:text-purple-400" />
            <h2 className="font-bold text-slate-900 dark:text-white text-base">AI Job Copilot</h2>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60 space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold text-[#3b28cc] dark:text-purple-400 block">Market Opportunity Insight</span>
            <p className="leading-relaxed">
              Senior Developer roles with Python & React expertise have increased by <span className="font-bold text-[#3b28cc] dark:text-purple-400">24%</span> this month. Your profile matches top recruiters at Google and Netflix.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">Salary Range Distribution</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400">San Francisco Bay Area</span>
                <span className="text-slate-900 dark:text-white font-bold">$190k - $250k</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400">Remote (US)</span>
                <span className="text-slate-900 dark:text-white font-bold">$170k - $220k</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
