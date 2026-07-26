"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageSquare, Send, Sparkles, ArrowLeft, Bot, User, Loader2, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How can I transition from Junior to Senior React Developer?",
    "What are the top 5 questions asked in a Next.js 15 technical interview?",
    "How do I highlight system design experience on my resume?",
    "What project should I build to learn Docker and microservices?"
  ];

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/ai/chat");
      const data = await res.json();
      if (data.success && data.messages) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMsg;
    if (!query.trim() || isSending) return;

    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInputMsg("");
    setIsSending(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      if (data.success && data.messages) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  // Format inline bold and code tags
  const formatInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-mono border border-purple-200 dark:border-purple-800">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // Render Markdown Content with Headers, Lists & Code Blocks
  const renderFormattedContent = (content: string, isUser: boolean) => {
    if (isUser) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }

    const lines = content.split("\n");
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${idx}`} className="my-3 rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-100 border border-slate-800 shadow-md overflow-x-auto">
              <pre><code>{codeBuffer.join("\n")}</code></pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={idx} className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white mt-3 mb-1.5 border-b pb-1 border-slate-200 dark:border-slate-700">
            {line.replace("### ", "")}
          </h3>
        );
        return;
      }

      if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={idx} className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mt-2 mb-1">
            {line.replace("#### ", "")}
          </h4>
        );
        return;
      }

      if (line.startsWith("- ") || line.startsWith("* ")) {
        elements.push(
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm my-1 text-slate-700 dark:text-slate-200">
            {formatInline(line.slice(2))}
          </li>
        );
        return;
      }

      if (line.trim() === "") {
        elements.push(<div key={idx} className="h-1.5" />);
        return;
      }

      elements.push(
        <p key={idx} className="text-xs sm:text-sm my-1 leading-relaxed text-slate-800 dark:text-slate-200">
          {formatInline(line)}
        </p>
      );
    });

    return <div className="space-y-1">{elements}</div>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3b28cc] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#3b28cc] mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-serif font-bold tracking-tight">AI Career Assistant & Interview Coach</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interactive AI agent with persistent MongoDB chat history.
            </p>
          </div>

          <button
            onClick={fetchHistory}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title="Refresh Chat History"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Window Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[680px]">
          
          {/* Top Bar */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3b28cc] text-white flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">CareerAI Orchestrator Agent</h2>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online & Persistence Sync Active
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.role === "user" ? "bg-slate-800 text-white" : "bg-[#3b28cc] text-white"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#3b28cc] text-white font-sans rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none font-sans"
                }`}>
                  {renderFormattedContent(msg.content, msg.role === "user")}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#3b28cc] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3b28cc] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#3b28cc] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#3b28cc] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-6 py-2.5 bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Suggested:</span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#3b28cc] hover:text-[#3b28cc] transition-all whitespace-nowrap cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask your Career AI Assistant a programming or interview question..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b28cc]"
            />
            <button
              type="submit"
              disabled={isSending || !inputMsg.trim()}
              className="px-5 py-3 rounded-xl bg-[#3b28cc] hover:bg-[#2b1b99] disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
