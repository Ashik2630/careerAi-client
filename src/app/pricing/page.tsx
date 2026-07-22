"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, ArrowRight, HelpCircle } from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for job seekers getting started with basic resume analysis.",
      monthlyPrice: "$0",
      annualPrice: "$0",
      period: "forever",
      popular: false,
      ctaText: "Get Started Free",
      ctaHref: "/register",
      features: [
        "1 AI Resume ATS scan / month",
        "Basic career roadmap preview",
        "5 AI Career Coach chat prompts / day",
        "Standard Job Match alerts",
        "Community support",
      ],
    },
    {
      name: "Pro Career",
      description: "For professionals serious about accelerating their career trajectory.",
      monthlyPrice: "$29",
      annualPrice: "$24",
      period: "per month",
      popular: true,
      ctaText: "Start 14-Day Free Trial",
      ctaHref: "/register?plan=pro",
      features: [
        "Unlimited AI Resume scans & ATS optimization",
        "Complete automated Career Roadmap",
        "Unlimited AI Career Coach Chat & Mock Interviews",
        "Real-Time Market Salary Intelligence",
        "Agentic Job Matching & Automated Cover Letters",
        "Verified Skill Matrix & Gap Tracking",
        "Priority 24/7 Support",
      ],
    },
    {
      name: "Executive & Mentor",
      description: "For senior leaders seeking 1-on-1 human mentorship & custom AI agentic outreach.",
      monthlyPrice: "$89",
      annualPrice: "$79",
      period: "per month",
      popular: false,
      ctaText: "Contact Executive Team",
      ctaHref: "/contact",
      features: [
        "Everything in Pro Career",
        "1-on-1 monthly session with Senior Tech Leader",
        "Custom AI Agentic job outreach script drafting",
        "Executive resume & LinkedIn profile overhaul",
        "Direct Slack line to AI Research Team",
        "Dedicated Account Success Manager",
      ],
    },
  ];

  const faqs = [
    {
      q: "Can I cancel or change my plan anytime?",
      a: "Yes! You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings with one click.",
    },
    {
      q: "Is there a free trial for the Pro plan?",
      a: "Yes, we offer a 14-day free trial on the Pro Career plan with full access to all features so you can experience the value first.",
    },
    {
      q: "How does the annual billing discount work?",
      a: "When you choose annual billing, you save over 20% compared to monthly billing and are billed once per year.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/40 via-white to-white text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#3b28cc] bg-purple-50 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" /> Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] tracking-tight">
            Invest in Your Career Acceleration
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-sans max-w-2xl mx-auto">
            Choose the plan that fits your professional goals. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? "text-slate-900 font-bold" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-[#3b28cc] rounded-full p-1 transition-colors relative cursor-pointer"
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform shadow-xs ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isAnnual ? "text-slate-900 font-bold" : "text-gray-500"}`}>
              Annual
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? "bg-[#1c212c] text-white shadow-2xl border-2 border-[#3b28cc] ring-4 ring-[#3b28cc]/10"
                  : "bg-white text-slate-800 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3b28cc] text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-white" /> Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold">{plan.name}</h3>
                  <p className={`text-xs mt-2 leading-relaxed ${plan.popular ? "text-gray-300" : "text-gray-500"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-serif font-bold">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-xs ${plan.popular ? "text-gray-300" : "text-gray-500"}`}>
                    /{plan.period}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100/20">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-blue-400" : "text-[#3b28cc]"}`} />
                      <span className={plan.popular ? "text-gray-200" : "text-gray-600"}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={plan.ctaHref}
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm block transition-all shadow-sm ${
                    plan.popular
                      ? "bg-[#3b28cc] hover:bg-[#2d1eb3] text-white"
                      : "bg-[#3b28cc] hover:bg-[#2d1eb3] text-white"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50/60 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm">Got questions about our plans? We&apos;ve got answers.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/80 space-y-2">
                <h3 className="font-bold text-slate-900 text-base">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
