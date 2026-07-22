"use client";

import { HelpCircle, Mail, MessageSquare, BookOpen } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      q: "How does the Career Health Score calculate?",
      a: "Your Career Health Score (0-100) measures your resume ATS fit, verified skills matrix, roadmap milestone progress, and job market demand alignment.",
    },
    {
      q: "How often are job matches updated?",
      a: "Our AI agents crawl top tech job boards every 2 hours and match new postings against your skill profile.",
    },
    {
      q: "Can I export my optimized resume?",
      a: "Yes! You can export tailored versions of your resume in PDF or Word formats directly from the Resume section.",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900">Help & Support Center</h1>
        <p className="text-slate-500 text-sm mt-1">
          Everything you need to get the most out of Career Mentor.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{faq.q}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
