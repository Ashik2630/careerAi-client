"use client";

import { useState } from "react";
import Link from "next/link";
import { FileSearch, UploadCloud, CheckCircle2, AlertTriangle, ArrowLeft, Sparkles, Loader2, Award, Target, BookOpen } from "lucide-react";

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai/resume-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          targetRole,
          fileName: "Resume_Analysis.txt"
        })
      });
      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sampleResume = `John Doe
Full Stack Developer | john.doe@example.com | GitHub: github.com/johndoe

SUMMARY:
Passionate Software Engineer with 2+ years of experience building modern web applications. Skilled in React, JavaScript, HTML, CSS, Node.js, and MongoDB.

EXPERIENCE:
Frontend Developer at WebCorp (2022 - Present)
- Built interactive dashboards using React and Redux.
- Collaborated with backend engineers to integrate REST APIs.
- Improved site performance and SEO score by 25%.

PROJECTS:
Career Analytics Dashboard
- Built full stack app using Node.js, Express, MongoDB.

EDUCATION:
B.Sc in Computer Science, State University (2022)`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#2563EB] mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold tracking-tight">AI Document Intelligence: Resume Analyzer</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Paste or upload your resume text to scan ATS score, extract skills, and detect critical gaps.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <form onSubmit={handleAnalyze} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-[#2563EB]" /> Target Role for ATS Matching</span>
                <button
                  type="button"
                  onClick={() => setResumeText(sampleResume)}
                  className="text-[11px] font-semibold text-[#2563EB] hover:underline"
                >
                  Load Sample Resume
                </button>
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Developer / Full Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileSearch className="w-4 h-4 text-[#2563EB]" /> Resume Content / Text
              </label>
              <textarea
                rows={8}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Run AI Resume Scan
              </button>
            </div>
          </form>
        </div>

        {/* Results View */}
        {analysisResult && (
          <div className="space-y-6">
            
            {/* Score & Summary Banner */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  <Award className="w-3.5 h-3.5" /> ATS Score Analysis Complete
                </span>
                <h2 className="text-2xl font-bold font-serif">Resume Health Report</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Gauge Score Circle */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shrink-0">
                <span className="text-4xl sm:text-5xl font-bold text-emerald-400 font-serif">
                  {analysisResult.score}%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-300 mt-1 font-semibold">
                  Match Score
                </span>
              </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Extracted Skills */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Extracted Skills ({analysisResult.extractedSkills?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.extractedSkills?.map((skill: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> Missing Critical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.missingSkills?.map((skill: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Actionable Recommendations */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2563EB]" /> AI Optimization Recommendations
              </h3>
              <ul className="space-y-3">
                {analysisResult.recommendations?.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
