"use client";

import { Target, Sparkles, CheckCircle2, AlertCircle, Plus } from "lucide-react";

export default function SkillsPage() {
  const skillsMatrix = [
    { skill: "Design Token Systems", proficiency: 92, status: "Mastered", demand: "High" },
    { skill: "Framer Interactions & Prototyping", proficiency: 88, status: "Mastered", demand: "Very High" },
    { skill: "Design System Governance", proficiency: 78, status: "In Progress", demand: "High" },
    { skill: "Cross-Functional Stakeholder Alignment", proficiency: 65, status: "Gap Identified", demand: "Critical" },
    { skill: "Design Analytics & Metrics", proficiency: 50, status: "Gap Identified", demand: "Medium" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900 tracking-tight">AI Skill Gap Analysis</h1>
        <p className="text-slate-500 text-sm mt-1">
          Skill matrix mapped against real-time Senior Product Designer benchmark criteria.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Verified Skills Matrix</h2>
          <button className="bg-[#3b28cc] hover:bg-[#2d1eb3] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Assess New Skill
          </button>
        </div>

        <div className="space-y-4">
          {skillsMatrix.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-slate-800">{item.skill}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">Market Demand: <strong className="text-slate-700">{item.demand}</strong></span>
                  <span className="font-bold text-[#3b28cc] bg-purple-50 px-2 py-0.5 rounded-md">
                    {item.proficiency}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#3b28cc] h-full rounded-full"
                  style={{ width: `${item.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
