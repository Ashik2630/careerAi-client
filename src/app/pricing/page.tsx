"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Check, Sparkles, Zap, X, CreditCard, CheckCircle2, Loader2 } from "lucide-react";

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isAnnual, setIsAnnual] = useState(true);

  // Upgrade & Stripe Checkout states
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [loadingPlanName, setLoadingPlanName] = useState<string | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  const handleSelectPlan = async (plan: any) => {
    if (plan.monthlyPrice === "$0") {
      router.push(session?.user ? "/dashboard" : "/register");
      return;
    }

    if (!session?.user) {
      router.push("/login?redirect=/pricing");
      return;
    }

    setLoadingPlanName(plan.name);

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: plan.name,
          isAnnual,
          priceId: isAnnual ? plan.id_annual : plan.id_monthly,
        }),
      });

      const data = await res.json();
      if (data.url) {
        // Redirect directly to official Stripe Payment Gateway
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to initiate Stripe Checkout session.");
        setLoadingPlanName(null);
      }
    } catch (e: any) {
      console.error("Stripe Redirect Error:", e);
      alert("Error connecting to Stripe Payment Gateway.");
      setLoadingPlanName(null);
    }
  };

  const handleStripeCheckout = async () => {
    if (!selectedPlan) return;
    setIsUpgrading(true);

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: selectedPlan.name,
          isAnnual,
          priceId: isAnnual ? selectedPlan.id_annual : selectedPlan.id_monthly,
        }),
      });

      const data = await res.json();
      if (data.url) {
        // Redirect directly to official Stripe Checkout page
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to initiate Stripe Checkout session.");
      }
    } catch (e: any) {
      console.error("Stripe Redirect Error:", e);
      alert("Error connecting to Stripe Payment Gateway.");
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPlan) return;
    setIsUpgrading(true);

    try {
      const res = await fetch("/api/subscription/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: selectedPlan.name }),
      });

      const data = await res.json();
      if (data.success) {
        setUpgradeSuccess(true);
        // Dispatch real-time events to sync navbar and profile status
        window.dispatchEvent(new CustomEvent("profileUpdated", { detail: data.data }));
        window.dispatchEvent(new CustomEvent("profile-updated", { detail: data.data }));
      } else {
        alert(data.error || "Upgrade failed. Please try again.");
      }
    } catch (e: any) {
      console.error(e);
      alert("Error processing subscription upgrade.");
    } finally {
      setIsUpgrading(false);
    }
  };

  const plans = [
    {
      name: "Starter",
      id_monthly:"seeker_free_monthly",
      id_annual:"seeker_free_annual",
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
      id_monthly:"seeker_pro_monthly",
      id_annual:"seeker_pro_annual",
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
      id_monthly:"seeker_Executive_monthly",
      id_annual:"seeker_Executive_annual",
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
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">

      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 text-center relative transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#3b28cc] dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5" /> Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] dark:text-white tracking-tight">
            Invest in Your Career Acceleration
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-slate-300 font-sans max-w-2xl mx-auto">
            Choose the plan that fits your professional goals. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? "text-slate-900 dark:text-white font-bold" : "text-gray-500 dark:text-slate-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-[#3b28cc] dark:bg-purple-600 rounded-full p-1 transition-colors relative cursor-pointer"
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform shadow-xs ${isAnnual ? "translate-x-6" : "translate-x-0"
                  }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isAnnual ? "text-slate-900 dark:text-white font-bold" : "text-gray-500 dark:text-slate-400"}`}>
              Annual
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 px-2 py-0.5 rounded-full">
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
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${plan.popular
                  ? "bg-[#1c212c] text-white shadow-2xl border-2 border-[#3b28cc] ring-4 ring-[#3b28cc]/10"
                  : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-gray-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3b28cc] text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-white" /> Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold dark:text-white">{plan.name}</h3>
                  <p className={`text-xs mt-2 leading-relaxed ${plan.popular ? "text-gray-300" : "text-gray-500 dark:text-slate-400"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-serif font-bold dark:text-white">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-xs ${plan.popular ? "text-gray-300" : "text-gray-500 dark:text-slate-400"}`}>
                    /{plan.period}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100/20 dark:border-slate-800">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-blue-400" : "text-[#3b28cc] dark:text-purple-400"}`} />
                      <span className={plan.popular ? "text-gray-200" : "text-gray-600 dark:text-slate-300"}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={loadingPlanName === plan.name}
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm block transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#3b28cc] to-purple-600 hover:from-[#2d1eb3] hover:to-purple-700 text-white shadow-md"
                      : "bg-[#3b28cc] hover:bg-[#2d1eb3] text-white"
                  }`}
                >
                  {loadingPlanName === plan.name ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...
                    </>
                  ) : (
                    plan.ctaText
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
            
            {!upgradeSuccess ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">Upgrade to {selectedPlan.name}</h3>
                      <span className="text-xs text-slate-400">Unlock full AI Career features</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Selected Plan:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{selectedPlan.name} ({isAnnual ? "Annual" : "Monthly"})</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Amount Due:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                      {isAnnual ? selectedPlan.annualPrice : selectedPlan.monthlyPrice} / month
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Includes:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Unlimited ATS Scans &amp; AI Coach</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Payment Method</span>
                  <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                      <CreditCard className="w-4 h-4 text-[#3b28cc]" />
                      <span>Instant CareerAI Pro Checkout</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">Secure</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleStripeCheckout}
                    disabled={isUpgrading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#3b28cc] to-purple-600 hover:from-[#2d1eb3] hover:to-purple-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isUpgrading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe Gateway...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" /> Proceed to Stripe Checkout Payment
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleConfirmUpgrade}
                    disabled={isUpgrading}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all cursor-pointer"
                  >
                    Instant PRO Profile Activation (Test Mode)
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">🎉 Welcome to PRO!</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your profile has been upgraded to <span className="font-bold text-[#3b28cc] dark:text-purple-400">PRO User</span> status in the database.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPlan(null);
                    setUpgradeSuccess(false);
                    router.push("/profile");
                  }}
                  className="w-full py-3 rounded-xl bg-[#3b28cc] text-white font-bold text-xs shadow-md"
                >
                  View My PRO Profile
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50/60 dark:bg-slate-900/60 border-t border-gray-100 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm">Got questions about our plans? We&apos;ve got answers.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{faq.q}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
