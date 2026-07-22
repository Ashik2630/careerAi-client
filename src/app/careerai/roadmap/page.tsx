"use client";

import { CheckCircle2, Lock, Sparkles, BookOpen, PlayCircle, ArrowRight } from "lucide-react";

export default function CareerAiRoadmapPage() {
  const milestones = [
    {
      step: 1,
      status: "Completed",
      title: "Portfolio Foundations",
      description: "Curate 3 high-impact case studies demonstrating end-to-end design process.",
    },
    {
      step: 2,
      status: "Completed",
      title: "Advanced Prototyping",
      description: "Master Framer and high-fidelity interactions for complex web apps.",
    },
    {
      step: 3,
      status: "In Progress",
      title: "Design Systems Architecture",
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
      description: "Bridging design with business outcomes and stakeholder management.",
    },
    {
      step: 5,
      status: "Locked",
      title: "Final Interview Prep",
      description: "Mock interviews and portfolio presentations with the CareerAI Coach Agent.",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900 tracking-tight">
          Your Career Roadmap: Senior Product Designer
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Based on your current skill set and target role requirements. Keep up the momentum.
        </p>
      </div>

      {/* Milestones Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs space-y-8">
        <h2 className="text-xl font-bold text-slate-900">Roadmap Milestones</h2>

        <div className="space-y-8 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {milestones.map((item) => {
            const isCompleted = item.status === "Completed";
            const isInProgress = item.status === "In Progress";

            return (
              <div key={item.step} className="relative pl-10 space-y-2 group">
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

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Step {item.step} • {item.status}</span>
                </div>

                <h3 className={`text-base font-bold ${isInProgress ? "text-[#3b28cc]" : "text-slate-900"}`}>
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                  {item.description}
                </p>

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

    </div>
  );
}
