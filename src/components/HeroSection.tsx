"use client";

import Link from "next/link";
import { Play, Search, Bell, Sparkles, User, Briefcase, Award, TrendingUp, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white pt-10 sm:pt-16 pb-16 lg:pb-24">
      {/* Background Soft Glow */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-5 text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] tracking-tight leading-[1.15]">
              Bridge the Gap Between Your{" "}
              <span className="text-[#3b28cc]">Potential</span> and Your Dream Career.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-sans leading-relaxed max-w-xl">
              AI-powered resume analysis, skill gap tracking, and automated roadmapping.
              Let Empathetic Intelligence guide your next professional leap.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/register"
                className="bg-[#3b28cc] hover:bg-[#2d1eb3] text-white font-medium px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center cursor-pointer"
              >
                Analyze Resume
              </Link>

              <button
                type="button"
                className="bg-white hover:bg-gray-50 text-[#3b28cc] border border-gray-200/90 font-medium px-6 py-3.5 rounded-xl transition-all duration-200 text-sm sm:text-base flex items-center gap-2.5 justify-center shadow-xs cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full border border-[#3b28cc] flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 text-[#3b28cc] fill-[#3b28cc] ml-0.5" />
                </span>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Preview Window Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-white p-2.5 sm:p-3 border border-gray-200/90 shadow-[0_20px_60px_-15px_rgba(59,40,204,0.15)] transition-all hover:shadow-[0_25px_70px_-15px_rgba(59,40,204,0.2)]">
              
              {/* Window Header Dots */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 bg-gray-50/70 rounded-t-xl">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
              </div>

              {/* Inner Dashboard UI Container */}
              <div className="bg-[#f8fafc] rounded-b-xl overflow-hidden text-xs flex flex-col md:flex-row min-h-[460px] sm:min-h-[500px]">
                
                {/* Mockup Left Sidebar */}
                <div className="bg-[#0b1329] text-gray-300 w-full md:w-44 shrink-0 p-3 flex md:flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
                  <div className="space-y-4 w-full">
                    {/* Brand */}
                    <div className="flex items-center gap-2 px-2 py-1">
                      <div className="w-6 h-6 rounded-lg bg-[#3b28cc] flex items-center justify-center text-white font-bold text-xs">
                        C
                      </div>
                      <span className="font-bold text-white tracking-wide text-sm font-serif">CareerAI</span>
                    </div>

                    {/* Sidebar Nav Items */}
                    <nav className="space-y-1 hidden md:block">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#3b28cc]/20 text-white font-medium text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b28cc]"></span>
                        Dashboard
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 text-[11px]">
                        <User className="w-3.5 h-3.5" /> Profile
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 text-[11px]">
                        <FileText className="w-3.5 h-3.5" /> Resume Builder
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 text-[11px]">
                        <Briefcase className="w-3.5 h-3.5" /> Job Match
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 text-[11px]">
                        <TrendingUp className="w-3.5 h-3.5" /> Career Path
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" /> Analytics
                      </div>
                    </nav>
                  </div>

                  <div className="hidden md:block pt-4 border-t border-slate-800/80">
                    <div className="text-[10px] text-gray-400 px-2 flex items-center gap-1">
                      <span>⚙ Settings</span>
                    </div>
                  </div>
                </div>

                {/* Mockup Main Workspace */}
                <div className="flex-1 p-3 sm:p-4 space-y-3.5 bg-slate-50/80">
                  
                  {/* Top Search Bar */}
                  <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center gap-2 px-2 text-gray-400 w-full max-w-xs">
                      <Search className="w-3.5 h-3.5" />
                      <span className="text-gray-400 text-[11px]">Search insights, jobs, skills...</span>
                    </div>
                    <div className="flex items-center gap-2.5 pr-1">
                      <Bell className="w-3.5 h-3.5 text-gray-400" />
                      <div className="w-6 h-6 rounded-full bg-[#3b28cc]/10 text-[#3b28cc] font-semibold flex items-center justify-center text-[10px]">
                        AC
                      </div>
                    </div>
                  </div>

                  {/* Header Welcome Banner */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-xs sm:text-sm">Welcome back, Alex!</h3>
                      <p className="text-[10px] text-gray-500">Software Developer • 85% Career Readiness</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200/60">
                        85% Career Readiness
                      </span>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    
                    {/* Left Column - Career Progression Chart & Activities */}
                    <div className="lg:col-span-7 space-y-3">
                      
                      {/* Line Chart Card */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 text-[11px]">Career Progression Overview</span>
                          <span className="text-[#3b28cc] text-[10px] font-medium hover:underline cursor-pointer">View all</span>
                        </div>

                        {/* Stats Metrics Row */}
                        <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1.5 rounded-lg text-[9px] text-center border border-slate-100">
                          <div>
                            <div className="text-gray-400">Current Role</div>
                            <div className="font-semibold text-slate-700">Senior Dev</div>
                            <div className="text-gray-400">4.5 yrs</div>
                          </div>
                          <div className="border-x border-slate-200/60">
                            <div className="text-gray-400">Next Milestone</div>
                            <div className="font-semibold text-slate-700">Lead Architect</div>
                            <div className="text-gray-400">1.2 yrs</div>
                          </div>
                          <div>
                            <div className="text-gray-400">24-Mo Gap Analysis</div>
                            <div className="font-semibold text-emerald-600">Gap: 3 Skills</div>
                            <div className="text-gray-400">2.5 months</div>
                          </div>
                        </div>

                        {/* Curve SVG Chart */}
                        <div className="relative pt-3 pb-1">
                          <svg viewBox="0 0 300 90" className="w-full h-20 text-[#3b28cc]" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b28cc" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#3b28cc" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M 10,75 C 60,70 100,55 150,45 C 200,35 240,20 290,10 L 290,90 L 10,90 Z"
                              fill="url(#chartGradient)"
                            />
                            <path
                              d="M 10,75 C 60,70 100,55 150,45 C 200,35 240,20 290,10"
                              stroke="#3b28cc"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                            {/* Chart Dots */}
                            <circle cx="10" cy="75" r="3" fill="#3b28cc" />
                            <circle cx="90" cy="58" r="3" fill="#3b28cc" />
                            <circle cx="170" cy="40" r="4" fill="#ffffff" stroke="#3b28cc" strokeWidth="2" />
                            <circle cx="250" cy="20" r="4" fill="#3b28cc" />
                            <circle cx="290" cy="10" r="3" fill="#10b981" />
                          </svg>

                          {/* Chart Labels */}
                          <div className="flex justify-between text-[8px] text-gray-400 pt-1">
                            <span>Junior Dev</span>
                            <span>Mid Dev</span>
                            <span>Senior Dev</span>
                            <span>Lead Architect</span>
                            <span className="text-emerald-600 font-semibold">• Impact</span>
                          </div>
                        </div>
                      </div>

                      {/* Mini Cards Row */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                          <div className="flex items-center gap-1 text-[10px] font-medium text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Recent Activity
                          </div>
                          <div className="text-[9px] text-gray-500 space-y-0.5">
                            <div className="font-medium text-slate-700">Alex Chen</div>
                            <div>Skill Endorsement • 45m ago</div>
                          </div>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                          <div className="flex items-center gap-1 text-[10px] font-medium text-slate-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            Upcoming Interviews
                          </div>
                          <div className="text-[9px] text-gray-500 space-y-0.5">
                            <div className="font-medium text-slate-700">Lead Architect</div>
                            <div>User Interview • 1.2 yrs</div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column - AI Insights Card & Resume Preview */}
                    <div className="lg:col-span-5 space-y-3">
                      
                      {/* AI Career Insights Dark Gradient Card */}
                      <div className="bg-gradient-to-br from-[#0c1222] via-[#161e36] to-[#0d1428] text-white p-3.5 rounded-xl shadow-md border border-slate-700/60 relative overflow-hidden space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-[11px] text-blue-200 tracking-wide">
                            AI Career Insights
                          </span>
                          <span className="text-[9px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-blue-400" /> Active
                          </span>
                        </div>

                        <div className="space-y-1.5 text-[10px]">
                          <div className="p-2 rounded-lg bg-white/5 border border-white/10 space-y-1">
                            <div className="font-medium text-blue-300 flex items-center gap-1">
                              <span>⚡ AI Coach Insights</span>
                            </div>
                            <p className="text-gray-300 text-[9px] leading-tight">
                              • Focus on Cloud Architecture certification. High demand observed.
                            </p>
                            <p className="text-gray-300 text-[9px] leading-tight">
                              • Skill Match Score: 88%.
                            </p>
                            <p className="text-gray-300 text-[9px] leading-tight">
                              • Recommended role: Lead Platform Engineer.
                            </p>
                            <p className="text-gray-300 text-[9px] leading-tight">
                              • Networking event in SF on Nov 15th.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Polished Resume Preview Card */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-semibold text-slate-800">Polished Resume Preview</span>
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[9px] space-y-1">
                          <div className="text-gray-400 text-[8px]">My Resume: Alex_Chen_Resume_Fit.pdf</div>
                          <div className="font-bold text-slate-800">Alex Chen</div>
                          <div className="text-gray-500 text-[8px]">Senior Software Engineer • San Francisco, CA</div>
                          <div className="w-full h-1 bg-slate-200 rounded-full">
                            <div className="w-4/5 h-full bg-[#3b28cc] rounded-full"></div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Stats Bar - Bottom Section */}
      <div className="w-full border-t border-gray-100 bg-slate-50/40 py-10 sm:py-12 mt-12 sm:mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/80 text-center gap-6 md:gap-0">
            
            {/* Stat Item 1 */}
            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-4xl sm:text-5xl font-bold font-serif text-[#3b28cc] tracking-tight">
                10k+
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 font-sans tracking-wide">
                Resumes Analyzed
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="pt-6 md:pt-0 md:px-6 space-y-1">
              <div className="text-4xl sm:text-5xl font-bold font-serif text-[#3b28cc] tracking-tight">
                85%
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 font-sans tracking-wide">
                Success Rate
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="pt-6 md:pt-0 md:px-6 space-y-1">
              <div className="text-4xl sm:text-5xl font-bold font-serif text-[#3b28cc] tracking-tight">
                4.9/5
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 font-sans tracking-wide">
                User Rating
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
