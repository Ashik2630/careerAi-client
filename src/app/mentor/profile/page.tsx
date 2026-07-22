"use client";

import { User, Mail, MapPin, Briefcase, Award, CheckCircle2, Plus } from "lucide-react";

export default function ProfilePage() {
  const skills = [
    { name: "React / Next.js", level: "Expert", score: "95%" },
    { name: "TypeScript / JavaScript", level: "Expert", score: "92%" },
    { name: "Python / Django", level: "Advanced", score: "88%" },
    { name: "System Architecture", level: "Advanced", score: "84%" },
    { name: "GraphQL & REST APIs", level: "Advanced", score: "80%" },
    { name: "React Native", level: "Intermediate (Gap)", score: "55%" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Profile Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
            AC
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold font-sans text-slate-900">Alex Chen</h1>
            <p className="text-xs font-semibold text-[#3b28cc]">Senior Software Engineer @ Tech Corp</p>
            <p className="text-xs text-slate-400">San Francisco, CA • alex.chen@email.com</p>
          </div>
        </div>

        <button className="bg-[#3b28cc] hover:bg-[#2d1eb3] text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer">
          Edit Profile
        </button>
      </div>

      {/* Target Role & Career Objective */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Target Role Preference</h2>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between font-bold">
              <span>Target Role:</span>
              <span className="text-[#3b28cc]">Lead Architect / Staff Engineer</span>
            </div>
            <div className="flex justify-between">
              <span>Target Salary:</span>
              <span className="font-semibold text-slate-900">$210,000 - $250,000</span>
            </div>
            <div className="flex justify-between">
              <span>Preferred Work Setup:</span>
              <span className="font-semibold text-slate-900">Remote / Hybrid</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Verified Skill Matrix</h2>
            <button className="text-xs font-semibold text-[#3b28cc] flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Skill
            </button>
          </div>

          <div className="space-y-3">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50">
                <span className="font-semibold text-slate-800">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{skill.level}</span>
                  <span className="font-bold text-[#3b28cc] bg-purple-50 px-2 py-0.5 rounded-md">
                    {skill.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
