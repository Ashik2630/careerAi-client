"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Target,
  Briefcase,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Award,
  ChevronRight,
  PlayCircle
} from "lucide-react";

export default function CareerAiDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header Overview Title */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-slate-900 dark:text-white tracking-tight">
          Your Career Overview: Senior Product Designer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-1">
          Based on your current skill set and target role requirements. Keep up the momentum.
        </p>
      </div>

      {/* Progress Metrics & AI Insight Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Metric Bar (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Overall Progress</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">62% Completed</div>
          </div>
          <div className="sm:border-x sm:border-slate-100 dark:sm:border-slate-800 sm:px-6">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Steps Remaining</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#3b28cc] dark:text-purple-400 mt-1">2 Steps</div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Target Date</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">Sept 2026</div>
          </div>
        </div>

        {/* AI Insight (4 cols) */}
        <div className="lg:col-span-4 bg-emerald-50/75 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/60 shadow-2xs space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            AI Insight
          </div>
          <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            Based on recent market trends, highlighting <span className="font-bold">Design Token Architecture</span> in your portfolio increases interview callbacks for Senior roles by <span className="font-bold">34%</span>.
          </p>
        </div>

      </div>

      {/* Middle Row: Active Roadmap Milestone & Curated Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Milestones Box (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Milestone Progress</h2>
            <Link href="/careerai/roadmap" className="text-xs font-bold text-[#3b28cc] dark:text-purple-400 hover:underline flex items-center gap-1">
              Full Roadmap <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            
            {/* Active Milestone Card */}
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3b28cc] dark:text-purple-300 bg-blue-100/80 dark:bg-blue-900/60 px-2.5 py-1 rounded-full">
                  Step 3 • In Progress
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estimated 2 weeks left</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Design Systems Architecture</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Learn to build scalable token systems and governance models across multi-brand enterprise platforms.
              </p>

              {/* Embedded Action Resource */}
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                    ✦
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">Design Systems Masterclass on Coursera</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Interactive course • 4 modules</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-[#3b28cc] dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors cursor-pointer">
                  Start Learning →
                </button>
              </div>
            </div>

            {/* Next Upcoming Locked Step preview */}
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between opacity-75">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 text-xs">Step 4 • Leadership & Strategy</h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Bridging design with business outcomes & stakeholder alignment</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Locked</span>
            </div>

          </div>
        </div>

        {/* Right Curated Column (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Curated for You</h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">
              Resources aligned with your focus: <span className="font-semibold text-slate-700 dark:text-slate-300">Design Systems Architecture</span>.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#3b28cc] dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">The Anatomy of a Token System</h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Medium • 8 min read</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#3b28cc] dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <PlayCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">Scaling Figma Variables</h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Video • 45 mins</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#3b28cc] dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">Design Systems Handbook 2026</h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">InVision • Free eBook</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
