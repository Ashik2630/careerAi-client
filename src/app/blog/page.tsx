"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Search, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blogData";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "AI Resume Tips", "Career Advancement", "Interview Prep", "Salary Negotiation"];

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 text-center transition-colors">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-[#3b28cc] dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5" /> CareerAI Publication
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Insights &amp; Guides for Modern Professionals
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Data-backed strategies on AI resume optimization, technical interview prep, and career trajectory acceleration.
          </p>

          {/* Search Input */}
          <div className="max-w-md mx-auto pt-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3b28cc] dark:focus:ring-purple-400 shadow-sm"
            />
          </div>
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
                  ? "bg-[#3b28cc] dark:bg-purple-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article Card */}
      {selectedCategory === "All" && !searchQuery && (
        <section className="pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1c212c] via-[#262d3d] to-[#161c28] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 relative group overflow-hidden">
            <div className="space-y-4 max-w-2xl">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold px-3.5 py-1 rounded-full inline-block">
                Featured Article
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight group-hover:text-blue-300 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {featuredPost.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
                <span>By {featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>
            </div>

            <Link
              href={`/blog/${featuredPost.id}`}
              className="bg-white text-[#3b28cc] hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shrink-0 transition-all cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold">No articles found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter((p) => !p.featured || selectedCategory !== "All" || searchQuery)
              .map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#3b28cc]/40 dark:hover:border-purple-400/40 transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[#3b28cc] dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-100 dark:border-purple-900 inline-block">
                      {post.category}
                    </span>

                    <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#3b28cc] dark:group-hover:text-purple-400 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                    <div className="flex items-center gap-1.5 font-bold text-[#3b28cc] dark:text-purple-400">
                      <span>{post.readTime}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </section>

    </div>
  );
}
