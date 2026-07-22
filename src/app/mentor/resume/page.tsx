"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, Download, RefreshCw, ArrowRight } from "lucide-react";

export default function ResumePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  const scoreMetrics = [
    { label: "ATS Compatibility", score: "94%", status: "Excellent", color: "text-emerald-600 bg-emerald-50" },
    { label: "Keyword Optimization", score: "82%", status: "Good", color: "text-blue-600 bg-blue-50" },
    { label: "Formatting & Structure", score: "90%", status: "Excellent", color: "text-emerald-600 bg-emerald-50" },
    { label: "Impact & Quantified Results", score: "68%", status: "Needs Improvement", color: "text-amber-600 bg-amber-50" },
  ];

  const suggestions = [
    {
      category: "Action Verbs",
      text: "Replace weak verbs like 'worked on' with high-impact terms like 'Spearheaded', 'Architected', or 'Engineered'.",
      impact: "+4 pts",
    },
    {
      category: "Quantified Metrics",
      text: "Add specific metrics to your Senior Engineer bullet points (e.g. 'reduced latency by 35%').",
      impact: "+8 pts",
    },
    {
      category: "Target Role Keywords",
      text: "Include missing target keywords: 'GraphQL Subscriptions', 'Docker Compose', 'CI/CD Pipelines'.",
      impact: "+5 pts",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-900">AI Resume Optimizer</h1>
          <p className="text-slate-500 text-sm mt-1">
            Analyze, score, and tailor your resume for top-tier tech roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all">
            <Download className="w-4 h-4 text-slate-500" />
            Download PDF
          </button>
          <button className="bg-[#3b28cc] hover:bg-[#2d1eb3] text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all">
            <Upload className="w-4 h-4" />
            Upload New Resume
          </button>
        </div>
      </div>

      {/* Main Resume Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Score & AI Suggestions */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Overall Score Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Resume Health</span>
                <div className="text-4xl font-bold text-slate-900 mt-1">78 <span className="text-sm font-normal text-slate-400">/ 100</span></div>
              </div>
              <div className="bg-purple-50 text-[#3b28cc] p-3 rounded-2xl border border-purple-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold">Grade A-</span>
              </div>
            </div>

            {/* Metric Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scoreMetrics.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.label}</span>
                    <span className="font-bold text-slate-900">{item.score}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#3b28cc] h-full rounded-full"
                      style={{ width: item.score }}
                    />
                  </div>
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tailoring Suggestions */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">AI Recommendations</h2>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                3 High Impact Fixes
              </span>
            </div>

            <div className="space-y-3">
              {suggestions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{item.category}</span>
                    <span className="text-xs font-bold text-[#3b28cc] bg-purple-50 px-2 py-0.5 rounded-md">
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Live Resume Document Preview */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3b28cc]" />
              <span className="text-xs font-bold text-slate-800">Alex_Chen_Resume_2026.pdf</span>
            </div>
            <span className="text-[11px] text-slate-400">Updated 2 days ago</span>
          </div>

          {/* Mock Document Sheet */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs font-sans space-y-4 text-slate-700">
            <div className="border-b border-slate-200 pb-3 space-y-1">
              <h3 className="text-base font-bold text-slate-900">Alex Chen</h3>
              <p className="text-slate-500 text-[11px]">Senior Full-Stack Engineer • San Francisco, CA</p>
              <p className="text-slate-400 text-[10px]">alex.chen@email.com • linkedin.com/in/alexchen</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Professional Summary</h4>
              <p className="text-[11px] text-slate-600 leading-normal">
                Results-driven Senior Full-Stack Engineer with 5+ years of experience architecting high-scalability web apps with React, Next.js, TypeScript, and Node.js.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Experience</h4>
              
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-[#3b28cc]">
                  <span>Senior Software Developer • Tech Corp</span>
                  <span>2022 - Present</span>
                </div>
                <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5 pl-1">
                  <li>Architected microservices infrastructure improving API throughput by 40%.</li>
                  <li>Mentored junior engineers and led frontend migration to Next.js.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Skills</h4>
              <p className="text-[11px] text-slate-600">
                React, Next.js, Node.js, TypeScript, PostgreSQL, AWS, GraphQL, Docker
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
