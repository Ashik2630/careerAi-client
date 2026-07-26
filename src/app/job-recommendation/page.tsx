"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Compass, Briefcase, Target, Sparkles, MapPin, DollarSign, ArrowLeft, Loader2, Filter, CheckCircle2, Plus, Trash2, X, Building2 } from "lucide-react";

export default function JobRecommendationPage() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  // Add Job Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    skills: "",
    salary: "$120,000 - $150,000",
    location: "Remote",
    type: "Full-time",
    description: ""
  });

  useEffect(() => {
    if (!sessionPending && !session?.user) {
      router.push("/login");
    }
  }, [sessionPending, session, router]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch("/api/ai/recommendations");
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob)
      });
      const result = await res.json();
      if (result.success) {
        setShowAddModal(false);
        setNewJob({
          title: "",
          company: "",
          skills: "",
          salary: "$120,000 - $150,000",
          location: "Remote",
          type: "Full-time",
          description: ""
        });
        // Re-fetch dynamically from MongoDB database
        await fetchRecommendations();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!jobId) return;
    try {
      const res = await fetch(`/api/items?id=${jobId}`, { method: "DELETE" });
      if (res.ok) {
        await fetchRecommendations();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  const jobs = data?.matchedJobs || [];
  const skillGap = data?.skillGapAnalysis || {};

  const filteredJobs = jobs.filter((job: any) => {
    if (selectedFilter === "high-match") return (job.matchScore || 0) >= 80;
    if (selectedFilter === "remote") return (job.location || "").toLowerCase().includes("remote");
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#2563EB] mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-serif font-bold tracking-tight">AI Smart Job Recommendation Engine</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Context-aware AI matching algorithm based on your active skills and target career goals.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Job Opportunity
          </button>
        </div>

        {/* Skill Gap Banner */}
        <div className="bg-gradient-to-r from-[#2563EB] to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
          <div className="flex items-center gap-2 font-serif font-bold text-xl">
            <Sparkles className="w-6 h-6 fill-white" /> AI Skill Radar Insights
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-blue-200">Recommended Roles for You</span>
              <div className="flex flex-wrap gap-2">
                {skillGap.recommendedRoles?.map((role: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-blue-200">High-Priority Skills to Master Next</span>
              <div className="flex flex-wrap gap-2">
                {skillGap.learningPriority?.map((skill: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 backdrop-blur-md">
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filtering Tabs */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif">Matched Opportunities ({filteredJobs.length})</h2>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFilter === "all" ? "bg-[#2563EB] text-white" : "text-slate-600 dark:text-slate-400"}`}
              >
                All Jobs
              </button>
              <button
                onClick={() => setSelectedFilter("high-match")}
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFilter === "high-match" ? "bg-[#2563EB] text-white" : "text-slate-600 dark:text-slate-400"}`}
              >
                High Match (80%+)
              </button>
              <button
                onClick={() => setSelectedFilter("remote")}
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFilter === "remote" ? "bg-[#2563EB] text-white" : "text-slate-600 dark:text-slate-400"}`}
              >
                Remote Only
              </button>
            </div>
          </div>
        </div>

        {/* Job Cards List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-500">No jobs matched your current filter.</p>
            </div>
          ) : (
            filteredJobs.map((job: any, idx: number) => (
              <div key={job._id || idx} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative group">
                
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">{job.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      {job.type || "Full-time"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{job.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-slate-400" /> {job.salary}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.skills?.map((s: string, sIdx: number) => (
                      <span key={sIdx} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match Score & Action Buttons */}
                <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 gap-4 shrink-0">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[#2563EB] dark:text-blue-400 font-serif block">
                      {job.matchScore || 85}%
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">AI Match Score</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {job._id && (
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm">
                      Apply Now
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Add Job Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#2563EB]" /> Add Job Opportunity to MongoDB
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddJob} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Job Title</label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company Name</label>
                    <input
                      type="text"
                      value={newJob.company}
                      onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                      placeholder="e.g. TechCorp AI"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Job Type</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Salary Range</label>
                    <input
                      type="text"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      placeholder="e.g. $120,000 - $150,000"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Location</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      placeholder="e.g. Remote / New York"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Required Skills (comma separated)</label>
                  <input
                    type="text"
                    value={newJob.skills}
                    onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                    placeholder="e.g. React, Next.js, Node.js, TypeScript"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</label>
                  <textarea
                    rows={3}
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    placeholder="Describe role responsibilities and requirements..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Save to MongoDB
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

