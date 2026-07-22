"use client";

import { HelpCircle, Mail, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900">CareerAI Support & Guidance</h1>
        <p className="text-slate-500 text-sm mt-1">Get assistance with your AI career roadmaps and insights.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Contact AI Support Team</h2>
        <p className="text-xs text-slate-500">Need help customizing your roadmap or configuring your skill matrix?</p>
        <button className="bg-[#3b28cc] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
          Open Support Ticket
        </button>
      </div>
    </div>
  );
}
