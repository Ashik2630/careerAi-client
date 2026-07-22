"use client";

import { Upload, BarChart3, Route, PartyPopper } from "lucide-react";

export default function CareerEngineSection() {
  const steps = [
    {
      number: "1.",
      title: "Upload",
      description: "Provide your current resume and target roles.",
      icon: Upload,
      badgeBg: "bg-[#4f46e5]", // Purple / Indigo
    },
    {
      number: "2.",
      title: "Analyze",
      description: "AI identifies gaps and optimization opportunities.",
      icon: BarChart3,
      badgeBg: "bg-[#38bdf8]", // Bright Cyan Blue
    },
    {
      number: "3.",
      title: "Roadmap",
      description: "Receive a step-by-step action plan.",
      icon: Route,
      badgeBg: "bg-[#4338ca]", // Deep Indigo
    },
    {
      number: "4.",
      title: "Land Job",
      description: "Execute the plan with AI coaching.",
      icon: PartyPopper,
      badgeBg: "bg-[#047857]", // Emerald Green
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111827] tracking-tight">
            The Career Progression Engine
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-sans">
            Four steps to your next role.
          </p>
        </div>

        {/* Steps Grid / Process Flow */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-gray-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center group">
                  
                  {/* Icon Circle */}
                  <div className={`w-20 h-20 rounded-full ${step.badgeBg} text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                    <IconComponent className="w-9 h-9 stroke-[2.2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-[#111827] mt-6 tracking-tight">
                    {step.number} {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 font-sans mt-2.5 max-w-[220px] leading-relaxed">
                    {step.description}
                  </p>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
