"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, CheckCircle2, Circle, ArrowLeft, Loader2, Sparkles, BookOpen, Clock } from "lucide-react";

export default function RoadmapPage() {
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const res = await fetch("/api/ai/roadmap");
      const data = await res.json();
      if (data.success && data.data) {
        setPlan(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStep = async (stepId: string, currentCompleted: boolean) => {
    setUpdatingId(stepId);
    try {
      const res = await fetch("/api/ai/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId, completed: !currentCompleted })
      });
      const data = await res.json();
      if (data.success) {
        setPlan((prev: any) => ({
          ...prev,
          roadmap: data.roadmap,
          overallProgress: data.overallProgress
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  const roadmapItems = plan?.roadmap || [];
  const progress = plan?.overallProgress || 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#2563EB] mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold tracking-tight">AI Generated 90-Day Learning Roadmap</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Personalized milestone track for your goal: <span className="font-semibold text-slate-900 dark:text-white">{plan?.targetGoal || "Full Stack Developer"}</span>.
          </p>
        </div>

        {/* Overall Progress Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400">Roadmap Completion</span>
              <h2 className="text-2xl font-bold font-serif">{progress}% Completed</h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#2563EB] flex items-center justify-center font-bold font-serif text-lg">
              {progress}%
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#2563EB] h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-6 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {roadmapItems.map((item: any, idx: number) => (
            <div key={idx} className="relative pl-14 group">
              
              {/* Checkbox Icon Marker */}
              <button
                onClick={() => toggleStep(item.id, item.completed)}
                disabled={updatingId === item.id}
                className={`absolute left-3 top-6 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-10 ${
                  item.completed
                    ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                    : "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-400 hover:border-[#2563EB]"
                }`}
              >
                {updatingId === item.id ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
                ) : item.completed ? (
                  <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </button>

              {/* Milestone Content Card */}
              <div className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all ${
                item.completed
                  ? "border-emerald-200 dark:border-emerald-900/60 shadow-xs"
                  : "border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-[#2563EB] dark:text-blue-400 uppercase tracking-wider">
                    {item.phase}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.duration}
                  </span>
                </div>

                <div className="pt-3 space-y-2">
                  <h3 className={`text-base font-bold font-serif ${item.completed ? "line-through text-slate-400" : "text-slate-900 dark:text-white"}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Recommended Resources */}
                {item.resources && item.resources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#2563EB]" /> Recommended Learning Resources:
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.resources.map((res: string, rIdx: number) => (
                        <span key={rIdx} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
