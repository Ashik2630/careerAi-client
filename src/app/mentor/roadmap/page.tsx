"use client";

import { CheckCircle2, Lock, Sparkles, BookOpen, PlayCircle, ArrowRight, Clock } from "lucide-react";

export default function RoadmapPage() {
  const milestones = [
    {
      step: 1,
      status: "Completed",
      title: "Portfolio & Foundations",
      description: "Curate 3 high-impact case studies demonstrating end-to-end architecture process.",
    },
    {
      step: 2,
      status: "Completed",
      title: "Advanced System Design",
      description: "Master microservices, caching strategies, and high-concurrency database design.",
    },
    {
      step: 3,
      status: "In Progress",
      title: "Design Systems & Architecture",
      description: "Learn to build scalable token systems and governance models across platforms.",
      resource: {
        title: "Design Systems Masterclass on Coursera",
        link: "#",
      },
    },
    {
      step: 4,
      status: "Locked",
      title: "Leadership & Strategy",
      description: "Bridging technical design with business outcomes and stakeholder management.",
    },
    {
      step: 5,
      status: "Locked",
      title: "Final Interview Prep",
      description: "Mock interviews and architecture presentations with the AI Coach Agent.",
    },
  ];

  const curatedResources = [
    {
      title: "The Anatomy of a Token System",
      type: "Medium • 8 min read",
      icon: BookOpen,
    },
    {
      title: "Scaling Figma Variables & Design System",
      type: "Video • 45 mins",
      icon: PlayCircle,
    },
    {
      title: "Design Systems Handbook 2026",
      type: "InVision • Free eBook",
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header Title */}
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900 tracking-tight">
          Your Career Roadmap: Senior Product Engineer
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Based on your current skill set and target role requirements. Keep up the momentum.
        </p>
      </div>

      {/* Progress Metric Bar & AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Metric Bar (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Overall Progress</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">62% Completed</div>
          </div>
          <div className="sm:border-x sm:border-slate-100 sm:px-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Steps Remaining</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#3b28cc] mt-1">2 Steps</div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Date</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Sept 2026</div>
          </div>
        </div>

        {/* AI Insight Card (4 cols) */}
        <div className="lg:col-span-4 bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/60 shadow-2xs space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            AI Insight
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            Based on recent market trends, highlighting <span className="font-bold">Design Token Architecture</span> in your portfolio increases interview callbacks for Senior roles by <span className="font-bold">34%</span>.
          </p>
        </div>

      </div>

      {/* Milestones Timeline & Curated Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Milestones Container (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs space-y-8">
          <h2 className="text-xl font-bold text-slate-900">Milestones</h2>

          <div className="space-y-8 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {milestones.map((item) => {
              const isCompleted = item.status === "Completed";
              const isInProgress = item.status === "In Progress";

              return (
                <div key={item.step} className="relative pl-10 space-y-2 group">
                  {/* Status Node Circle */}
                  <div
                    className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isInProgress
                        ? "bg-[#3b28cc] text-white ring-4 ring-purple-100"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isInProgress ? (
                      item.step
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Header Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Step {item.step} • {item.status}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-base font-bold ${isInProgress ? "text-[#3b28cc]" : "text-slate-900"}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                    {item.description}
                  </p>

                  {/* Embedded Resource Card for In Progress step */}
                  {item.resource && (
                    <div className="mt-3 p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/60 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider block">
                          Recommended Resource
                        </span>
                        <h4 className="font-bold text-slate-800 text-xs mt-0.5">{item.resource.title}</h4>
                      </div>
                      <a
                        href={item.resource.link}
                        className="text-xs font-semibold text-[#3b28cc] hover:underline shrink-0 flex items-center gap-1"
                      >
                        Start Learning <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Curated for You (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Curated for You</h2>
            <p className="text-xs text-slate-400 mt-1">
              Resources aligned with your current focus: <span className="font-semibold text-slate-700">Design Systems Architecture</span>.
            </p>
          </div>

          <div className="space-y-3">
            {curatedResources.map((res, idx) => {
              const Icon = res.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-gray-200 hover:bg-slate-50/80 transition-all flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#3b28cc] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{res.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{res.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
