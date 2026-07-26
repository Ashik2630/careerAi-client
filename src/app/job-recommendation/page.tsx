"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Briefcase, Target, Sparkles, MapPin, DollarSign, ArrowLeft, Loader2, Filter, CheckCircle2 } from "lucide-react";

export default function JobRecommendationPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch("/api/ai/recommendations");
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  const jobs = data?.matchedJobs || [];
  const skillGap = data?.skillGapAnalysis || {};

  const filteredJobs = jobs.filter((job: any) => {
    if (selectedFilter === "high-match") return job.matchScore >= 80;
    if (selectedFilter === "remote") return job.location.toLowerCase().includes("remote");
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#2563EB] mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold tracking-tight">AI Smart Job Recommendation Engine</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Context-aware AI matching algorithm based on your active skills and target career goals.
          </p>
        </div>

        {/* Skill Gap Banner */}
        <div className="bg-gradient-to-r from-[#2563EB] to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
          <div className="flex items-center gap-2 font-serif font-bold text-xl">
            <Sparkles className="w-6 h-6 fill-white" /> AI Skill Radar Insights
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-blue-200">Recommended Roles for You</span>
              <div className="flex flex-wrap gap-2">
                {skillGap.recommendedRoles?.map((role: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-blue-200">High-Priority Skills to Master Next</span>
              <div className="flex flex-wrap gap-2">
                {skillGap.learningPriority?.map((skill: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 backdrop-blur-md">
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filtering Tabs */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif">Matched Opportunities ({filteredJobs.length})</h2>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFilter === "all" ? "bg-[#2563EB] text-white" : "text-slate-600 dark:text-slate-400"}`}
              >
                All Jobs
              </button>
              <button
                onClick={() => setSelectedFilter("high-match")}
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFilter === "high-match" ? "bg-[#2563EB] text-white" : "text-slate-600 dark:text-slate-400"}`}
              >
                High Match (80%+)
              </button>
              <button
                onClick={() => setSelectedFilter("remote")}
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFilter === "remote" ? "bg-[#2563EB] text-white" : "text-slate-600 dark:text-slate-400"}`}
              >
                Remote Only
              </button>
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job: any, idx: number) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">{job.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    {job.type}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-semibold">{job.company}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-slate-400" /> {job.salary}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {job.skills?.map((s: string, sIdx: number) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match Score Badge */}
              <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 gap-4 shrink-0">
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#2563EB] dark:text-blue-400 font-serif block">
                    {job.matchScore}%
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">AI Match Score</span>
                </div>

                <button className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm">
                  Apply Now
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
