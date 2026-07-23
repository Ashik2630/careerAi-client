"use client";

import Link from "next/link";
import { Sparkles, CheckCircle2, TrendingUp, Award, ShieldCheck, Star } from "lucide-react";

interface AuthSidebarProps {
  mode: "login" | "register";
}

export default function AuthSidebar({ mode }: AuthSidebarProps) {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-[#2a1d99] to-[#1a1060] p-12 text-white flex-col justify-between overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header / Logo */}
      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>
          <span className="text-2xl font-bold font-serif tracking-tight text-white">
            Career<span className="text-cyan-300">AI</span>
          </span>
        </Link>
      </div>

      {/* Hero Content Showcase */}
      <div className="relative z-10 space-y-8 my-auto py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-cyan-200">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span>Empathetic Intelligence for your Career</span>
        </div>

        <h2 className="text-3xl xl:text-4xl font-bold font-serif leading-tight text-white">
          {mode === "login" ? (
            <>
              Welcome back to your <br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent">
                personalized career hub.
              </span>
            </>
          ) : (
            <>
              Unlock your dream job with <br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent">
                AI-driven career intelligence.
              </span>
            </>
          )}
        </h2>

        <p className="text-indigo-100/80 text-sm xl:text-base leading-relaxed max-w-md">
          {mode === "login"
            ? "Track your resume match scores, get real-time interview suggestions, and follow custom skill roadmaps tailored to market demand."
            : "Join thousands of professionals using AI resume analysis, skill gap tracking, and automated career guidance to land top-tier positions."}
        </p>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 transition-all hover:bg-white/15">
            <div className="flex items-center gap-2 text-cyan-300 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">ATS Score Boost</span>
            </div>
            <div className="text-2xl font-bold text-white">+38% Average</div>
            <p className="text-xs text-indigo-200/70 mt-1">Based on 10k+ analyzed resumes</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 transition-all hover:bg-white/15">
            <div className="flex items-center gap-2 text-amber-300 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Placement Rate</span>
            </div>
            <div className="text-2xl font-bold text-white">94.2%</div>
            <p className="text-xs text-indigo-200/70 mt-1">Faster interview invitations</p>
          </div>
        </div>

        {/* Real Candidate Testimonial Pill */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-400 flex items-center justify-center text-slate-900 font-bold text-sm shrink-0 shadow-md">
            AK
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-white/90 italic truncate">
              &quot;CareerAI mapped my skill gaps and helped me land a Senior Tech Lead role in 3 weeks!&quot;
            </p>
            <span className="text-[11px] text-cyan-200 font-semibold block mt-0.5">
              — Alex K., Senior Systems Architect
            </span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 flex items-center justify-between text-xs text-indigo-200/60 border-t border-white/10 pt-4">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>SOC-2 Compliant & Encrypted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>AI Engine v2.4 Active</span>
        </div>
      </div>
    </div>
  );
}
