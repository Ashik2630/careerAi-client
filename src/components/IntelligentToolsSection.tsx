"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IntelligentToolsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111827] tracking-tight">
            Intelligent Tools for Modern Professionals
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-sans max-w-2xl mx-auto">
            Everything you need to navigate today&apos;s competitive job market.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="space-y-6">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 1: Agentic Orchestration */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Purple Network Icon */}
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#3b28cc] mb-6">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="2.5" />
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <line x1="7.5" y1="7.5" x2="10.5" y2="10.5" />
                    <line x1="16.5" y1="7.5" x2="13.5" y2="10.5" />
                    <line x1="7.5" y1="16.5" x2="10.5" y2="13.5" />
                    <line x1="16.5" y1="16.5" x2="13.5" y2="13.5" />
                  </svg>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] tracking-tight">
                  Agentic Orchestration
                </h3>

                <p className="text-gray-500 font-sans text-base sm:text-lg leading-relaxed mt-4 max-w-xl">
                  Your own AI career team working in the background. From finding leads to drafting outreach, consider it handled.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  href="/features"
                  className="text-[#3b28cc] font-semibold text-sm sm:text-base inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: ATS Optimization */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Teal Checklist Icon */}
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0f766e] mb-6">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="m9 12 2 2 4-4" />
                    <path d="M9 7h6" />
                  </svg>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] tracking-tight">
                  ATS Optimization
                </h3>

                <p className="text-gray-500 font-sans text-base sm:text-lg leading-relaxed mt-4">
                  Beat the filters with precision formatting and keyword matching.
                </p>
              </div>
            </div>

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 3: Live Interview Coaching */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Green User Video Icon */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-6">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <rect x="17" y="8" width="5" height="8" rx="1" />
                  </svg>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] tracking-tight">
                  Live Interview Coaching
                </h3>

                <p className="text-gray-500 font-sans text-base sm:text-lg leading-relaxed mt-4">
                  Real-time feedback during mock interviews to refine your pitch.
                </p>
              </div>
            </div>

            {/* Card 4: Continuous Upskilling (Dark Card) */}
            <div className="lg:col-span-7 bg-[#1c212c] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {/* Subtle background glow */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 max-w-md relative z-10">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Continuous Upskilling
                </h3>

                <p className="text-gray-300 font-sans text-base leading-relaxed">
                  Targeted course recommendations based on your identified skill gaps.
                </p>
              </div>

              {/* Graphic Thumbnail */}
              <div className="relative shrink-0 w-full sm:w-48 h-32 rounded-xl overflow-hidden border border-slate-700/80 shadow-lg bg-slate-900">
                <Image
                  src="/images/ai_upskilling_graphic.png"
                  alt="Continuous Upskilling AI Network"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
