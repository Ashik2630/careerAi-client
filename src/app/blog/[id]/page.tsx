"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Clock,
  User,
  Share2,
  ThumbsUp,
  Bookmark,
  MessageSquare,
  CheckCircle2,
  Tag,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/data/blogData";

export default function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const articleId = String(resolvedParams.id);

  const post = BLOG_POSTS.find((p) => String(p.id) === articleId) || BLOG_POSTS[0];

  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Comment section state
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alex Morgan",
      role: "Full Stack Engineer",
      text: "This article provided tremendous clarity on ATS vector matching! Implemented the Google XYZ formula on my resume and already got two callback interview requests.",
      time: "2 days ago",
    },
    {
      id: 2,
      author: "Samantha Vance",
      role: "Engineering Manager",
      text: "Great insights on agentic AI workflows. The shift from keyword parsing to semantic skill matching is definitely how we evaluate candidates at our company.",
      time: "1 day ago",
    }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You (Active User)",
        role: "Software Developer",
        text: newComment.trim(),
        time: "Just now",
      }
    ]);
    setNewComment("");
  };

  const relatedPosts = BLOG_POSTS.filter((p) => String(p.id) !== articleId).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#3b28cc] dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Publication &amp; Articles
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSaved
                  ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-emerald-600" : ""}`} />
              <span>{isSaved ? "Saved" : "Save Article"}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* Hero Article Header Card */}
        <div className="bg-gradient-to-br from-[#1c212c] via-[#262d3d] to-[#161c28] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {post.category}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span className="text-xs text-gray-400">• {post.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight text-white">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl">
            {post.summary}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3b28cc] to-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                {post.author}
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              </h4>
              <p className="text-xs text-gray-400">{post.authorRole}</p>
            </div>
          </div>
        </div>

        {/* Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-3xl p-6 sm:p-8 space-y-3">
            <h3 className="text-sm font-bold font-serif text-[#3b28cc] dark:text-purple-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 fill-[#3b28cc]" /> Key Takeaways
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 space-y-4 leading-relaxed font-sans text-sm sm:text-base">
            <div className="whitespace-pre-line leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            {post.tags?.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                #{tag}
              </span>
            ))}
          </div>

          {/* Like & Share Footer Action Bar */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handleLike}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                hasLiked
                  ? "border-blue-300 bg-blue-50 dark:bg-blue-950 text-[#3b28cc] dark:text-blue-400 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${hasLiked ? "fill-[#3b28cc]" : ""}`} />
              <span>{likes} Recommended</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-[#3b28cc] hover:bg-[#2d1eb3] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Article</span>
            </button>
          </div>
        </div>

        {/* Discussion / Comments Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#3b28cc]" /> Discussion ({comments.length})
          </h3>

          <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
              rows={3}
              placeholder="Add your thoughts or questions about this article..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3b28cc]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#3b28cc] hover:bg-[#2d1eb3] text-white font-bold text-xs shadow-sm cursor-pointer transition-all"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{comment.author}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({comment.role})</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{comment.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#3b28cc]" /> Related Publication Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.id}
                href={`/blog/${rPost.id}`}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#3b28cc]/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#3b28cc] dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full inline-block">
                    {rPost.category}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#3b28cc] dark:group-hover:text-purple-400 transition-colors leading-snug">
                    {rPost.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{rPost.summary}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>{rPost.author}</span>
                  <span className="text-[#3b28cc] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
