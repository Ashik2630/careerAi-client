"use client";

import Link from "next/link";
import { Sparkles, Users, Award, Shield, Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Resumes Analyzed", value: "10,000+" },
    { label: "Career Advancement Rate", value: "85%" },
    { label: "Average Salary Boost", value: "$32,000" },
    { label: "User Satisfaction Score", value: "4.9/5" },
  ];

  const team = [
    {
      name: "Dr. Elena Rostova",
      role: "Co-Founder & Chief AI Officer",
      bio: "Former Principal AI Researcher at Google Brain with 10+ years in NLP and agentic systems.",
    },
    {
      name: "Marcus Vance",
      role: "Co-Founder & CEO",
      bio: "Former VP of Talent at Stripe. Passionate about democratizing career growth with technology.",
    },
    {
      name: "Sarah Lin",
      role: "Head of Product",
      bio: "Product strategist with deep expertise in human-computer interaction and empathetic design.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/40 via-white to-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#3b28cc] bg-purple-50 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" /> Our Mission & Vision
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] tracking-tight">
            Empowering Professionals to Unlock Their Highest Potential
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
            At CareerAI, we combine cutting-edge agentic artificial intelligence with empathetic human guidance to level the professional playing field for everyone.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#3b28cc]">{stat.value}</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Driven by Core Principles</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            We build software with empathy, transparency, and a relentless focus on user success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border border-gray-200/80 bg-white space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b28cc] flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Empathetic Intelligence</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              We design AI agents that understand the human emotional journey of career transitions, offering encouragement alongside data-driven advice.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-200/80 bg-white space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Precision Growth</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              No generic advice. Every recommendation is tailored to real-time hiring trends, ATS keyword matrices, and company benchmarks.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-200/80 bg-white space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Privacy & Ownership</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Your data is yours alone. We enforce bank-grade encryption and never sell your resume or personal data to recruiters.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-slate-50/60 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Leadership Team</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Built by veterans in AI research, executive career coaching, and product engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200/80 text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#3b28cc]">{member.role}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
