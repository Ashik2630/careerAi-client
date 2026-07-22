"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Clock, ArrowRight, User, BookOpen } from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI Resume Tips", "Career Advancement", "Interview Prep", "Salary Negotiation"];

  const posts = [
    {
      id: 1,
      title: "How Agentic AI is Revolutionizing Job Applications in 2026",
      summary: "Discover how autonomous AI career agents can scan job markets, match skill profiles, and tailor cover letters with unprecedented precision.",
      category: "AI Resume Tips",
      author: "Dr. Elena Rostova",
      readTime: "5 min read",
      date: "July 20, 2026",
      featured: true,
    },
    {
      id: 2,
      title: "5 ATS Hacks to Pass Initial Screenings at Tech Giants",
      summary: "Beat automated resume filter algorithms with data-backed formatting rules and strategic keyword placement.",
      category: "AI Resume Tips",
      author: "Marcus Vance",
      readTime: "4 min read",
      date: "July 18, 2026",
      featured: false,
    },
    {
      id: 3,
      title: "Negotiating Your Senior Developer Offer: Data-Backed Strategies",
      summary: "Learn how to leverage real-time market salary benchmarks to negotiate equity, signing bonuses, and remote flex options.",
      category: "Salary Negotiation",
      author: "Sarah Lin",
      readTime: "7 min read",
      date: "July 14, 2026",
      featured: false,
    },
    {
      id: 4,
      title: "Building a Scalable Design System Portfolio for 2026",
      summary: "Step-by-step guide to documenting design tokens, component governance, and cross-functional impact in your case studies.",
      category: "Career Advancement",
      author: "Alex Chen",
      readTime: "6 min read",
      date: "July 10, 2026",
      featured: false,
    },
    {
      id: 5,
      title: "Mastering System Design Mock Interviews with AI Coach",
      summary: "How to structure your response during high-pressure architecture interviews for Big Tech roles.",
      category: "Interview Prep",
      author: "Dr. Elena Rostova",
      readTime: "8 min read",
      date: "July 05, 2026",
      featured: false,
    },
  ];

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/40 via-white to-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#3b28cc] bg-purple-50 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" /> CareerAI Publication
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Insights & Guides for Modern Professionals
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Data-backed strategies on AI resume optimization, technical interview prep, and career trajectory acceleration.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#3b28cc] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article Card */}
      {selectedCategory === "All" && (
        <section className="pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1c212c] via-[#262d3d] to-[#161c28] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold px-3 py-1 rounded-full inline-block">
                Featured Article
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                How Agentic AI is Revolutionizing Job Applications in 2026
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Discover how autonomous AI career agents can scan job markets, match skill profiles, and tailor cover letters with unprecedented precision.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
                <span>By Dr. Elena Rostova</span>
                <span>•</span>
                <span>5 min read</span>
                <span>•</span>
                <span>July 20, 2026</span>
              </div>
            </div>
            <button className="bg-white text-[#3b28cc] hover:bg-slate-100 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shrink-0 transition-all cursor-pointer">
              Read Article →
            </button>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(p => !p.featured || selectedCategory !== "All").map((post) => (
            <article
              key={post.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-[#3b28cc]/30 transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#3b28cc] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 inline-block">
                  {post.category}
                </span>

                <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#3b28cc] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-gray-400">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
