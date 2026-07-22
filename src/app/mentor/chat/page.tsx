"use client";

import { useState } from "react";
import { Send, Sparkles, Bot, User, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello Alex! I'm your AI Career Coach. How can I help you accelerate your tech career today?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Can you help me prepare for a System Design interview at Google for a Senior Engineer role?",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "ai",
      text: "Absolutely! For Google Senior Engineer System Design interviews, key focus areas include high-availability caching (Redis/Memcached), data partitioning (sharding), rate limiting algorithms (Token Bucket), and distributed queueing (Kafka). Would you like to do a 15-minute simulated mock interview?",
      time: "10:31 AM",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate AI Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "That's a great approach! To optimize latency further, consider adding an edge CDN layer with Cloudflare Workers to serve static assets and cache GraphQL responses close to the user.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  };

  const samplePrompts = [
    "Review my resume bullet points for Google",
    "How to negotiate Senior Developer salary offer?",
    "Mock interview prep for System Design",
  ];

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
      
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200/80 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3b28cc] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">AI Career Coach</h2>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Online & Active
            </span>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === "user"
                  ? "bg-gradient-to-tr from-purple-500 to-indigo-600 text-white"
                  : "bg-[#3b28cc] text-white"
              }`}
            >
              {msg.sender === "user" ? "AC" : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-lg p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#3b28cc] text-white rounded-tr-none"
                  : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60"
              }`}
            >
              <p>{msg.text}</p>
              <span
                className={`text-[10px] block mt-1.5 ${
                  msg.sender === "user" ? "text-blue-200 text-right" : "text-slate-400"
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt Suggestions */}
      <div className="px-4 py-2 bg-slate-50 border-t border-gray-100 flex flex-wrap gap-2">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => setInput(prompt)}
            className="bg-white border border-gray-200 hover:border-[#3b28cc] hover:text-[#3b28cc] text-slate-600 text-xs px-3 py-1.5 rounded-full transition-all text-left"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200/80 bg-white flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask your AI Career Coach anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:border-[#3b28cc] focus:bg-white transition-all"
        />
        <button
          type="submit"
          className="bg-[#3b28cc] hover:bg-[#2d1eb3] text-white p-3 rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
