"use client";

import { useState } from "react";
import { Bell, Shield, Cpu, User } from "lucide-react";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900">Account & AI Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your notification preferences and AI orchestration models.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3">Notification Preferences</h2>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">AI Job Match Alerts</span>
              <span className="text-slate-400">Receive instant notifications when high-match tech roles open up.</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={() => setEmailAlerts(!emailAlerts)}
              className="w-4 h-4 accent-[#3b28cc] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="font-bold text-slate-800 block">Proactive AI Resume Tips</span>
              <span className="text-slate-400">Allow AI Coach to suggest resume edits based on market shifts.</span>
            </div>
            <input
              type="checkbox"
              checked={aiSuggestions}
              onChange={() => setAiSuggestions(!aiSuggestions)}
              className="w-4 h-4 accent-[#3b28cc] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
