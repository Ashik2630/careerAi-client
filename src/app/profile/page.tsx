"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Sparkles, User, GraduationCap, Briefcase, Target, Save, CheckCircle2, Copy, FileText, ArrowLeft, Loader2, Mail } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
    experience: "",
    goal: "",
    isPro: false,
    plan: "Free"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [aiGenerated, setAiGenerated] = useState<{
    professionalSummary?: string;
    experienceDescription?: string;
    linkedinBio?: string;
    coverLetter?: string;
  } | null>(null);

  useEffect(() => {
    if (!sessionPending && !session?.user) {
      router.push("/login");
    }
  }, [sessionPending, session, router]);

  useEffect(() => {
    fetchProfile();

    // Check if user returned from successful Stripe Checkout
    if (typeof window !== "undefined" && window.location.search.includes("upgraded=true")) {
      handleStripeReturnSuccess();
    }
  }, []);

  const handleStripeReturnSuccess = async () => {
    try {
      const res = await fetch("/api/subscription/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: "Pro Career" }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setProfile((prev) => ({
          ...prev,
          isPro: true,
          plan: "Pro Career"
        }));
        window.dispatchEvent(new CustomEvent("profileUpdated", { detail: data.data }));
        window.dispatchEvent(new CustomEvent("profile-updated", { detail: data.data }));
        setSaveSuccess(true);
        // Clean URL query parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      console.error("Stripe Return Activation Error:", e);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success && data.data) {
        setProfile({
          name: data.data.name || "",
          email: data.data.email || "",
          skills: Array.isArray(data.data.skills) ? data.data.skills.join(", ") : data.data.skills || "",
          education: data.data.education || "",
          experience: data.data.experience || "",
          goal: data.data.goal || "",
          isPro: data.data.isPro || false,
          plan: data.data.plan || "Free"
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess(true);
        // Instantly notify Navbar, UserDropdown, and Dashboard
        window.dispatchEvent(new CustomEvent("profile-updated", { detail: data.data }));
        window.dispatchEvent(new CustomEvent("profileUpdated", { detail: data.data }));
        router.refresh();
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          education: profile.education,
          skills: profile.skills.split(",").map(s => s.trim()),
          experience: profile.experience,
          targetJob: profile.goal
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiGenerated(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#2563EB] mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-serif font-bold tracking-tight">Career Profile &amp; AI Builder</h1>
              {profile.isPro ? (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white shadow-md uppercase tracking-wider">
                  PRO User
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Free Member
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Set up your skills and experience to power your multi-agent AI career tools.
            </p>
          </div>

          <button
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#2563EB] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all cursor-pointer"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 fill-white" />}
            Generate AI Content
          </button>
        </div>

        {/* Subscription Tier Banner */}
        {profile.isPro ? (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-300 dark:border-amber-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-sm shrink-0">
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <span>PRO Career Member Active</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">Active</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Unlimited ATS Resumes • 24/7 AI Career Coach • Priority Job Matcher
                </p>
              </div>
            </div>
            <Link href="/pricing" className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all shrink-0">
              Manage Plan
            </Link>
          </div>
        ) : (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 border border-blue-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white font-bold flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Upgrade to CareerAI PRO</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Unlock unlimited ATS scans, mock interviews, and automated job matching.
                </p>
              </div>
            </div>
            <Link href="/pricing" className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all shrink-0">
              Upgrade to PRO
            </Link>
          </div>
        )}

        {/* Success Alert */}
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Profile successfully saved to MongoDB!
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#2563EB]" /> Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Alex Candidate"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#2563EB]" /> Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#2563EB]" /> Target Career Goal
                </label>
                <input
                  type="text"
                  value={profile.goal}
                  onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                  placeholder="e.g. Full Stack Engineer / Frontend Specialist"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2563EB]" /> Skills (comma separated)
              </label>
              <input
                type="text"
                value={profile.skills}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                placeholder="e.g. React, Next.js, Node.js, TypeScript, MongoDB, Tailwind"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#2563EB]" /> Education
              </label>
              <input
                type="text"
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                placeholder="e.g. B.Sc in Computer Science, University of Technology"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#2563EB]" /> Work Experience Summary
              </label>
              <textarea
                rows={3}
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                placeholder="Briefly describe your past roles, projects, or accomplishments..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* AI Generated Resume Content Section */}
        {aiGenerated && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-[#2563EB]/30 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-[#2563EB] font-serif font-bold text-xl pb-4 border-b border-slate-100 dark:border-slate-800">
              <Sparkles className="w-6 h-6" /> AI Resume Content Generator Output
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-500" /> Professional Summary
                </h3>
                <p className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-800">
                  {aiGenerated.professionalSummary}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-500" /> Optimized Experience Bullet Points
                </h3>
                <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed border border-slate-200 dark:border-slate-800">
                  {aiGenerated.experienceDescription}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> LinkedIn Bio Tagline
                </h3>
                <p className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
                  {aiGenerated.linkedinBio}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-500" /> Generated Cover Letter Draft
                </h3>
                <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed border border-slate-200 dark:border-slate-800">
                  {aiGenerated.coverLetter}
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
