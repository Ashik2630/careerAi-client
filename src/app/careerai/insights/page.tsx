"use client";

import { BarChart3, TrendingUp, DollarSign, Award, Sparkles } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900 tracking-tight">Market & Salary Intelligence</h1>
        <p className="text-slate-500 text-sm mt-1">
          Real-time hiring trends, salary distribution, and role demand analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Avg Senior Designer Salary</span>
          <div className="text-3xl font-bold text-slate-900">$215,000</div>
          <p className="text-xs text-emerald-600 font-semibold">+8.4% growth year-over-year</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Top In-Demand Skill</span>
          <div className="text-2xl font-bold text-[#3b28cc]">Design Systems</div>
          <p className="text-xs text-slate-500">Appears in 84% of senior postings</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Interview Callback Rate</span>
          <div className="text-3xl font-bold text-slate-900">4.2x</div>
          <p className="text-xs text-emerald-600 font-semibold">With AI-optimized portfolio</p>
        </div>
      </div>
    </div>
  );
}
