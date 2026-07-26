"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  ExternalLink,
  ThumbsDown,
  Briefcase,
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  RotateCcw
} from "lucide-react";

export default function CareerMentorDashboard() {
  const [timeFilter, setTimeFilter] = useState("Last 6 Months");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedMessage, setOptimizedMessage] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizedMessage(true);
    }, 1200);
  };

  const learningPath = [
    {
      title: "Advanced React Patterns",
      provider: "Coursera",
      duration: "Est. 4 weeks",
      iconColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50",
      symbol: "{}",
    },
    {
      title: "System Design Interview Prep",
      provider: "Educative",
      duration: "Est. 2 weeks",
      iconColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50",
      symbol: "⟁",
    },
    {
      title: "AI Prompt Engineering for Devs",
      provider: "DeepLearning.AI",
      duration: "Est. 1 week",
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50",
      symbol: "✦",
    },
  ];

  const recentMatches = [
    {
      role: "Senior Software Engineer",
      company: "Google",
      location: "Remote",
      matchScore: "92%",
    },
    {
      role: "Backend Developer (Python)",
      company: "Netflix",
      location: "Los Gatos, CA",
      matchScore: "88%",
    },
    {
      role: "Cloud Infrastructure Eng",
      company: "AWS",
      location: "Seattle, WA",
      matchScore: "78%",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header Greeting */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-slate-900 dark:text-white tracking-tight">
          Good morning, Alex.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans mt-1">
          Your Career Health Score is <span className="text-[#3b28cc] dark:text-purple-400 font-bold">84</span>.
        </p>
      </div>

      {/* 4 Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Resume Score */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Resume Score</span>

          {/* Donut Score Visualization */}
          <div className="flex flex-col items-center justify-center my-1">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#3b28cc] dark:text-purple-400"
                  strokeDasharray="78, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">78</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">/ 100</span>
              </div>
            </div>

            <div className="mt-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold px-3 py-1 rounded-full text-[11px] border border-emerald-200/60 dark:border-emerald-900/60">
              +5 pts this week
            </div>
          </div>
        </div>

        {/* Card 2: Skill Gaps */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Skill Gaps</span>
            <Target className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>

          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">3</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">identified for target role</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 font-medium px-2.5 py-1 rounded-lg text-xs border border-cyan-200/50 dark:border-cyan-900/50">
              React Native
            </span>
            <span className="bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 font-medium px-2.5 py-1 rounded-lg text-xs border border-cyan-200/50 dark:border-cyan-900/50">
              GraphQL
            </span>
          </div>
        </div>

        {/* Card 3: Job Matches */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Job Matches</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-[#3b28cc] dark:text-purple-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">12</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">new opportunities today</p>
          </div>

          <div className="pt-2">
            <Link
              href="/mentor/jobs"
              className="text-[#3b28cc] dark:text-purple-400 font-semibold text-xs inline-flex items-center gap-1 hover:underline"
            >
              Review Matches <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: Roadmap Progress */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Roadmap Progress</span>
            <TrendingUp className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>

          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">62%</div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-2.5 overflow-hidden">
              <div className="bg-[#3b28cc] dark:bg-purple-500 h-full rounded-full w-[62%]" />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400">On track for Q3 promotion</p>
        </div>

      </div>

      {/* Middle Row: Skill Growth Analysis & AI Career Orchestrator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Skill Growth Analysis Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Skill Growth Analysis</h2>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#3b28cc] dark:focus:border-purple-400 cursor-pointer"
              >
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>Last Year</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* SVG Smooth Curve Line Chart */}
          <div className="relative bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <svg viewBox="0 0 500 180" className="w-full h-48 sm:h-56 overflow-visible" fill="none">
              <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b28cc" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3b28cc" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Horizontal Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" className="dark:stroke-slate-800" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" className="dark:stroke-slate-800" strokeWidth="1" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="#f1f5f9" className="dark:stroke-slate-800" strokeWidth="1" />

              {/* Area Under Curve */}
              <path
                d="M 20 140 C 90 120, 150 110, 200 118 C 260 125, 300 70, 360 85 C 420 100, 450 40, 480 30 L 480 160 L 20 160 Z"
                fill="url(#growthGradient)"
              />

              {/* Smooth Curve Path */}
              <path
                d="M 20 140 C 90 120, 150 110, 200 118 C 260 125, 300 70, 360 85 C 420 100, 450 40, 480 30"
                stroke="#3b28cc"
                className="dark:stroke-purple-400"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Node Points */}
              <circle cx="20" cy="140" r="5" fill="#ffffff" stroke="#3b28cc" strokeWidth="3" />
              <circle cx="110" cy="118" r="5" fill="#ffffff" stroke="#3b28cc" strokeWidth="3" />
              <circle cx="200" cy="118" r="5" fill="#ffffff" stroke="#3b28cc" strokeWidth="3" />
              <circle cx="285" cy="72" r="5" fill="#ffffff" stroke="#3b28cc" strokeWidth="3" />
              <circle cx="370" cy="85" r="5" fill="#ffffff" stroke="#3b28cc" strokeWidth="3" />
              <circle cx="480" cy="30" r="6" fill="#3b28cc" />
            </svg>

            {/* Month Labels */}
            <div className="flex justify-between text-xs font-medium text-slate-400 dark:text-slate-400 pt-3 px-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* AI Career Orchestrator Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3b28cc] dark:text-purple-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">AI Career Orchestrator</h3>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {optimizedMessage ? (
                <div className="space-y-2 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-lg">
                  <p className="font-semibold">✓ Optimization Complete!</p>
                  <p className="text-xs">Your resume has been tailored with Python & Cloud Architecture keywords for Google Senior Engineer roles.</p>
                </div>
              ) : (
                <p>
                  I noticed your Python skills match <span className="font-bold text-[#3b28cc] dark:text-purple-400">90%</span> of the Senior Engineer roles at Google. Should we optimize your resume for it?
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="w-full bg-[#3b28cc] hover:bg-[#2d1eb3] text-white font-semibold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isOptimizing ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  Optimizing Resume...
                </>
              ) : optimizedMessage ? (
                "View Optimized Resume"
              ) : (
                "Optimize Resume"
              )}
            </button>

            <button className="w-full flex items-center justify-center gap-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs py-2 cursor-pointer">
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Not relevant right now</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Row: Recommended Learning Path & Recent Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recommended Learning Path */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recommended Learning Path</h2>

          <div className="space-y-3">
            {learningPath.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl ${item.iconColor} flex items-center justify-center font-bold text-sm shrink-0`}>
                    {item.symbol}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400">
                      {item.provider} • {item.duration}
                    </p>
                  </div>
                </div>

                <button className="text-xs font-semibold text-[#3b28cc] dark:text-purple-400 hover:underline px-3 py-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/60 cursor-pointer">
                  Start Course
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Matches</h2>
            <Link href="/mentor/jobs" className="text-xs font-semibold text-[#3b28cc] dark:text-purple-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentMatches.map((job, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">{job.role}</h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
                    {job.company} • {job.location}
                  </p>
                  <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md mt-1 border border-emerald-200/50 dark:border-emerald-900/50">
                    {job.matchScore} Match
                  </span>
                </div>

                <a
                  href="#"
                  className="p-2 text-slate-400 hover:text-[#3b28cc] dark:hover:text-purple-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
