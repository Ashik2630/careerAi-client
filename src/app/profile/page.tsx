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
    goal: ""
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
  }, []);

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
          goal: data.data.goal || ""
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
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#2563EB] mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-serif font-bold tracking-tight">Career Profile & AI Builder</h1>
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
