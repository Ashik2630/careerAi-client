"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Share2,
  Bookmark,
  Send,
  Loader2,
  Clock,
  ShieldCheck,
  Award,
  Zap,
  Globe
} from "lucide-react";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();

  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    if (!sessionPending && !session?.user) {
      router.push("/login");
    }
  }, [sessionPending, session, router]);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const res = await fetch(`/api/items?id=${jobId}`);
      const result = await res.json();
      if (result.success && result.data) {
        setJob(result.data);
      } else {
        // Fallback fetch all recommendations to find matching job
        const recRes = await fetch("/api/ai/recommendations");
        const recData = await recRes.json();
        if (recData.success && Array.isArray(recData.data?.matchedJobs)) {
          const found = recData.data.matchedJobs.find((j: any) => j._id === jobId || j.id === jobId);
          if (found) setJob(found);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    setHasApplied(true);
    setShowApplyModal(false);
  };

  if (isLoading || sessionPending) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold font-serif">Job Opportunity Not Found</h2>
          <p className="text-slate-500 text-sm">The job listing you are looking for might have been moved or updated.</p>
          <Link href="/job-recommendation" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs">
            <ArrowLeft className="w-4 h-4" /> Back to Recommendation Engine
          </Link>
        </div>
      </div>
    );
  }

  const skillsList = Array.isArray(job.skills) ? job.skills : (job.skills || "").split(",").map((s: string) => s.trim()).filter(Boolean);
  const matchScore = job.matchScore || 88;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Top Header */}
        <div className="flex items-center justify-between">
          <Link href="/job-recommendation" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#2563EB] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Matched Opportunities
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isSaved
                  ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-emerald-600" : ""}`} />
              <span>{isSaved ? "Saved" : "Save Job"}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Opportunity URL copied to clipboard!");
                }
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Hero Job Title Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#2563EB] to-indigo-700 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shrink-0 shadow-md font-serif">
                {(job.company || "C").charAt(0).toUpperCase()}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-slate-900 dark:text-white">
                    {job.title || job.role}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    {job.type || "Full-time"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <Building2 className="w-4 h-4 text-[#2563EB]" /> {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" /> {job.location || "Remote"}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {job.salary || "$140,000 - $180,000"}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Match Badge & Apply Button */}
            <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 gap-4 shrink-0">
              <div className="text-left md:text-center">
                <span className="text-3xl font-bold text-[#2563EB] dark:text-blue-400 font-serif block leading-none">
                  {matchScore}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">AI Skill Match</span>
              </div>

              <button
                onClick={() => setShowApplyModal(true)}
                disabled={hasApplied}
                className={`w-full md:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  hasApplied
                    ? "bg-emerald-600 text-white cursor-default"
                    : "bg-[#2563EB] hover:bg-blue-700 text-white"
                }`}
              >
                {hasApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Application Submitted
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Apply Now
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Job Specifications */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Overview */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#2563EB]" /> Role Overview &amp; Impact
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {job.description || "As a key engineer on this team, you will design, build, and deploy production-grade software applications. You will collaborate closely with product managers, UX designers, and senior engineers to deliver resilient, scalable, and high-performance digital experiences."}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> Key Responsibilities
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Architect and maintain clean, scalable web interfaces and backend microservices.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Collaborate with cross-functional teams to translate complex product specifications into elegant code.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Optimize database queries, indexing pipelines, and API endpoints for minimal latency.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Write comprehensive unit, integration, and end-to-end tests to preserve code quality.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Participate in peer code reviews, architectural design syncs, and DevOps deployment releases.</span>
                </li>
              </ul>
            </div>

            {/* Required Technical Stack & Qualifications */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2563EB]" /> Required Tech Stack &amp; Skills
              </h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {skillsList.map((skill: string, idx: number) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/70 text-[#2563EB] dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /> {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Compensation & Benefits */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Perks &amp; Compensation Package
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Competitive Salary &amp; Equity</span>
                  <span className="text-xs text-slate-500">{job.salary || "$140,000 - $180,000"} + Generous Stock Options</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Remote &amp; Flexible Schedule</span>
                  <span className="text-xs text-slate-500">Choice of Remote Work, Flexible Hours, Work Anywhere</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Comprehensive Health Insurance</span>
                  <span className="text-xs text-slate-500">100% Medical, Dental, Vision &amp; Wellness Coverage</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Learning &amp; Tech Budget</span>
                  <span className="text-xs text-slate-500">$2,500 Annual Stipend for Courses, Conferences &amp; Hardware</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: AI Skill Insights & Company Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* AI Radar Card */}
            <div className="bg-gradient-to-br from-[#2563EB] to-indigo-700 rounded-3xl p-6 text-white shadow-lg space-y-4">
              <div className="flex items-center gap-2 font-serif font-bold text-lg border-b border-white/20 pb-3">
                <Sparkles className="w-5 h-5 fill-white" /> AI Skill Alignment
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-blue-200">Overall Match Score</span>
                  <span className="text-lg font-bold">{matchScore}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-white h-full transition-all duration-500" style={{ width: `${matchScore}%` }} />
                </div>
                <p className="text-[11px] text-blue-100 leading-relaxed pt-1">
                  Your active skills and career goals closely align with this role requirements. You have strong match signals in key tech stacks.
                </p>
              </div>
            </div>

            {/* Company Info Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2563EB]" /> About {job.company}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {job.company} is an industry-leading technology provider focused on building high-performance modern web platforms and artificial intelligence integrations.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Location</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.location || "Remote"}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Industry</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Software &amp; AI</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Posted</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Recently</span>
                </div>
              </div>
            </div>

            {/* Recruiter Contact Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 text-[#2563EB] dark:text-blue-400 font-bold text-sm flex items-center justify-center mx-auto">
                HR
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Talent Acquisition Team</h4>
                <p className="text-[11px] text-slate-400">Recruiting Lead @ {job.company}</p>
              </div>
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
              >
                Send Message / Apply
              </button>
            </div>

          </div>

        </div>

        {/* Application Modal */}
        {showApplyModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 font-bold flex items-center justify-center mx-auto">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Submit Application</h3>
                <p className="text-xs text-slate-500">
                  Applying for <span className="font-bold text-slate-800 dark:text-slate-200">{job.title || job.role}</span> at {job.company}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{session?.user?.name || "Job Seeker"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{session?.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Attached Profile:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">CareerAI Verified Resume</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Submit Application
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
