"use client";

import { useState } from "react";

export default function CareerAiSettingsPage() {
  const [marketUpdates, setMarketUpdates] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sans text-slate-900">CareerAI Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Configure your Empathetic Intelligence agent preferences.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3">Agent Preferences</h2>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div>
            <span className="font-bold text-slate-800 block">Weekly Career Insights Digest</span>
            <span className="text-slate-400">Receive weekly AI summary of market trends and skill recommendations.</span>
          </div>
          <input
            type="checkbox"
            checked={marketUpdates}
            onChange={() => setMarketUpdates(!marketUpdates)}
            className="w-4 h-4 accent-[#3b28cc] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
