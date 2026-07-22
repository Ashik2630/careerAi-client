"use client";

import Link from "next/link";
import { Sparkles, Bot, FileText, TrendingUp, Briefcase, Zap, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function FeaturesPage() {
  const featureList = [
    {
      icon: FileText,
      color: "text-purple-600 bg-purple-50",
      title: "Empathetic AI Resume Analysis",
      description: "Get real-time ATS compatibility scoring, keyword density breakdown, and instant line-by-line recommendations tailored to target job descriptions.",
    },
    {
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50",
      title: "Automated Career Roadmapping",
      description: "Custom step-by-step milestone plans mapping out exact skill requirements, course recommendations, and timelines to reach your next promotion.",
    },
    {
      icon: Bot,
      color: "text-indigo-600 bg-[#3b28cc]/10",
      title: "Agentic Outreach & Job Matching",
      description: "AI agents work continuously in the background to scan top tech job boards, match your skill matrix, and draft personalized outreach emails.",
    },
    {
      icon: Zap,
      color: "text-emerald-600 bg-emerald-50",
      title: "Live Mock Interview Coaching",
      description: "Practice technical system design and behavioral interviews with real-time feedback on response clarity, pacing, and keyword usage.",
    },
    {
      icon: Briefcase,
      color: "text-cyan-600 bg-cyan-50",
      title: "Real-Time Market Salary Intelligence",
      description: "Access up-to-date salary benchmarks, compensation distributions, and equity trends across major tech hubs and remote roles.",
    },
    {
      icon: ShieldCheck,
      color: "text-amber-600 bg-amber-50",
      title: "Verified Skill Matrix & Gap Tracking",
      description: "Visualize your strengths and pinpoint high-leverage skill gaps so you know exactly what to learn next to increase your market value.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/40 via-white to-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#3b28cc] bg-purple-50 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Features
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] tracking-tight">
            Intelligent Tools Built for Professional Acceleration
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Everything you need to analyze your resume, optimize skill gaps, and land your dream career with confidence.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-[#3b28cc]/30 transition-all duration-300 space-y-4 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111827] group-hover:text-[#3b28cc] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pb-24 max-w-6xl mx-auto px-4">
        <div className="bg-[#3b28cc] text-white p-10 sm:p-14 rounded-3xl text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">Experience the Power of CareerAI</h2>
          <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
            Start your free trial today and discover how empathetic AI can transform your career trajectory.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-[#3b28cc] font-bold px-8 py-3.5 rounded-xl text-base hover:bg-slate-100 transition-all shadow-md"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
