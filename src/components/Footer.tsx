"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  ArrowUp,
  ChevronRight,
  Globe,
  Heart,
} from "lucide-react";

// Custom SVG Social Icons (Lucide React v1+ deprecated brand icons)
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" strokeWidth="2" />
    <circle cx="4" cy="4" r="2" strokeWidth="2" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Dynamic Year
  const currentYear = new Date().getFullYear();

  // Scroll position listener for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic Live System Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Dynamic Navigation Sections
  const footerSections = [
    {
      title: "AI Tools Suite",
      links: [
        { name: "Resume Analyzer", href: "/resume-analyzer", badge: "HOT" },
        { name: "Job Recommendation", href: "/job-recommendation", badge: "NEW" },
        { name: "Career Roadmap Generator", href: "/roadmap", badge: "POPULAR" },
        { name: "AI Mentor Chat", href: "/ai-chat", badge: "BETA" },
      ],
    },
    {
      title: "Product",
      links: [
        { name: "Core Features", href: "/features" },
        { name: "Pricing Plans", href: "/pricing" },
        { name: "Interactive Demo", href: "/#demo" },
        { name: "Skill Gap Engine", href: "/features#skill-gap", badge: "PRO" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Career Insights Blog", href: "/blog" },
        { name: "AI Prompt Templates", href: "/blog#prompts" },
        { name: "Contact & Support", href: "/contact" },
        { name: "System Status", href: "#status" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About CareerAI", href: "/about" },
        { name: "Careers", href: "/about#careers", badge: "HIRING" },
        { name: "Privacy Policy", href: "/about#privacy" },
        { name: "Terms of Service", href: "/about#terms" },
      ],
    },
    ...(session?.user
      ? [
          {
            title: "My Account",
            links: [
              { name: "Dashboard Workspace", href: "/dashboard" },
              { name: "Career AI Copilot", href: "/careerai" },
              { name: "Mentor Dashboard", href: "/mentor" },
              { name: "User Profile", href: "/profile" },
            ],
          },
        ]
      : []),
  ];

  // Dynamic Social Links with Tooltips
  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com", tooltip: "Star on GitHub · 4.8k" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", tooltip: "Follow @CareerAI" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", tooltip: "Connect on LinkedIn" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com", tooltip: "Watch AI Career Tutorials" },
  ];

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-200 border-t border-slate-200/90 dark:border-slate-800/80 transition-colors overflow-hidden font-sans">
      {/* Subtle Glowing Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-16">

        {/* Brand Column & Multi-Column Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Brand Info & Live System Health */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                Career<span className="text-[#3b28cc] dark:text-purple-400">AI</span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Empathetic Intelligence for your career growth. Real-time AI resume analysis, automated roadmap generation, and personalized mentor advice.
            </p>

            {/* Dynamic System Status Banner */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-3 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">Systems Operational</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono">{currentTime || "AI v2.4 Online"}</span>
              </div>
            </div>

            {/* Interactive Social Media Buttons with Dynamic Tooltip */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Connect & Community
              </div>
              <div className="flex items-center space-x-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <div key={social.name} className="relative group">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        onMouseEnter={() => setHoveredSocial(social.name)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-[#3b28cc] dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-200 block shadow-xs"
                      >
                        <Icon className="w-4 h-4" />
                      </a>

                      {/* Dynamic Hover Tooltip */}
                      {hoveredSocial === social.name && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900 dark:bg-slate-950 border border-slate-700 text-slate-100 text-[11px] font-medium rounded-md shadow-xl whitespace-nowrap z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                          {social.tooltip}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-950" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Links Column Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerSections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="font-serif font-bold text-slate-900 dark:text-white text-base tracking-wide flex items-center gap-1.5">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, lIdx) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={lIdx}>
                        <Link
                          href={link.href}
                          className={`group inline-flex items-center text-sm transition-all duration-150 ${
                            isActive
                              ? "text-[#3b28cc] dark:text-purple-400 font-semibold"
                              : "text-slate-600 dark:text-slate-400 hover:text-[#3b28cc] dark:hover:text-white"
                          }`}
                        >
                          <ChevronRight className={`w-3.5 h-3.5 mr-1 text-slate-400 dark:text-slate-600 group-hover:text-[#3b28cc] dark:group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all ${isActive ? "text-[#3b28cc] dark:text-purple-400" : ""}`} />
                          <span>{link.name}</span>

                          {/* Dynamic Link Badge */}
                          {link.badge && (
                            <span
                              className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold font-mono rounded uppercase tracking-wider ${
                                link.badge === "HOT"
                                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                                  : link.badge === "NEW"
                                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                                  : link.badge === "PRO"
                                  ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                                  : link.badge === "HIRING"
                                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"
                                  : "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30"
                              }`}
                            >
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM BAR: Copyright, Region & Dynamic Back-To-Top Button */}
        <div className="pt-8 border-t border-slate-200/90 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-center sm:text-left">
            <p>© {currentYear} CareerAI Inc. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
              <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
              <span>Global Region (US-East)</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center space-x-1">
              <span>Crafted with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
              <span>for career builders</span>
            </span>
          </div>

          {/* Dynamic Scroll To Top Button */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#3b28cc] dark:hover:bg-purple-600 text-slate-700 dark:text-slate-300 hover:text-white border border-slate-200 dark:border-slate-700 hover:border-[#3b28cc] dark:hover:border-purple-500 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

      </div>
    </footer>
  );
}
