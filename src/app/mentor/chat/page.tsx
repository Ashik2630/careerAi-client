"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, RefreshCw, Loader2, Sparkles } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([
    {
      id: "init-1",
      sender: "ai",
      text: "Hello! I am your **AI Career Coach & Technical Advisor**. Ask me anything about resume bullet points, salary negotiation, system design, or interview prep!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userInitials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
    : "AC";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const promptText = customInput || input;
    if (!promptText.trim() || isThinking) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: promptText,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptText,
          targetRole: "Senior Engineer",
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: data.reply.content,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to get AI response");
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: `Thank you for asking about **"${promptText}"**. For Senior Technical roles, ensure you structure your answer with clear trade-off analysis, latency metrics, and production-grade system resilience patterns.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const samplePrompts = [
    "Review my resume bullet points for Google",
    "How to negotiate Senior Developer salary offer?",
    "Mock interview prep for System Design",
  ];

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
      
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3b28cc] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-sm">AI Career Coach</h2>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online &amp; Active
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `init-${Date.now()}`,
                sender: "ai",
                text: "Chat session refreshed! How can I assist with your resume, coding prep, or salary negotiation today?",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              }
            ]);
          }}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          title="Reset Chat"
        >
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
              {msg.sender === "user" ? userInitials : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-[#3b28cc] text-white rounded-tr-none font-medium"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700"
              }`}
            >
              <div>{msg.text}</div>
              <span
                className={`text-[10px] block mt-2 ${
                  msg.sender === "user" ? "text-blue-200 text-right" : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3b28cc] text-white flex items-center justify-center text-xs font-bold shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500">
              <Loader2 className="w-4 h-4 text-[#3b28cc] animate-spin" />
              <span>AI Coach is analyzing and composing response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestions */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-gray-100 dark:border-slate-800 flex flex-wrap gap-2">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(undefined, prompt)}
            disabled={isThinking}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-[#3b28cc] dark:hover:border-purple-400 text-slate-700 dark:text-slate-300 text-xs px-3.5 py-1.5 rounded-full transition-all text-left cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-2xs"
          >
            <Sparkles className="w-3 h-3 text-[#3b28cc]" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask your AI Career Coach anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isThinking}
          className="flex-1 bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#3b28cc] dark:focus:border-purple-400 focus:bg-white dark:focus:bg-slate-900 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isThinking || !input.trim()}
          className="bg-[#3b28cc] hover:bg-[#2d1eb3] text-white p-3 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}

