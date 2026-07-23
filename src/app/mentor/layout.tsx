"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserDropdown from "@/components/auth/UserDropdown";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  TrendingUp,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Sparkles,
  Zap,
  Menu,
  X,
  ArrowRight
} from "lucide-react";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { name: "Dashboard", href: "/mentor", icon: LayoutDashboard },
    { name: "Resume", href: "/mentor/resume", icon: FileText },
    { name: "Jobs", href: "/mentor/jobs", icon: Briefcase },
    { name: "Roadmap", href: "/mentor/roadmap", icon: TrendingUp },
    { name: "AI Chat", href: "/mentor/chat", icon: MessageSquare },
    { name: "Profile", href: "/mentor/profile", icon: User },
  ];

  const bottomNavItems = [
    { name: "Settings", href: "/mentor/settings", icon: Settings },
    { name: "Help", href: "/mentor/help", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row text-slate-800">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#3b28cc] flex items-center justify-center text-white font-bold text-sm">
            CM
          </div>
          <div>
            <span className="font-serif font-bold text-slate-900 text-base block leading-tight">Career Mentor</span>
            <span className="text-[10px] text-gray-400 font-sans block">AI-Powered Progress</span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-[#3b28cc]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white border-r border-gray-200/80 shrink-0 sticky top-0 h-auto md:h-screen flex flex-col justify-between p-4 z-30`}
      >
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="hidden md:flex items-center gap-3 px-2 pt-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3b28cc] to-[#4f46e5] flex items-center justify-center text-white font-bold text-base shadow-sm">
              CM
            </div>
            <div>
              <h1 className="font-serif font-bold text-[#3b28cc] text-lg leading-snug">Career Mentor</h1>
              <p className="text-[11px] text-gray-400 font-sans font-medium">AI-Powered Progress</p>
            </div>
          </div>

          {/* Top Main Navigation */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[#3b28cc] text-white shadow-sm font-semibold"
                      : "text-gray-600 hover:text-[#3b28cc] hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Area */}
        <div className="space-y-4 pt-6 border-t border-gray-100 mt-6 md:mt-0">
          
          {/* Upgrade to Pro Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#3b28cc] via-[#4338ca] to-[#312e81] text-white shadow-md space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-200">
              <Zap className="w-3.5 h-3.5 fill-blue-200 text-blue-200" />
              Pro Plan
            </div>
            <p className="text-[11px] text-blue-100 leading-tight">
              Unlock unlimited AI resume optimization & mock interview coach.
            </p>
            <button className="w-full bg-white text-[#3b28cc] hover:bg-slate-100 font-semibold text-xs py-2 rounded-xl transition-all shadow-xs cursor-pointer">
              Upgrade to Pro
            </button>
          </div>

          {/* Bottom Settings & Help */}
          <nav className="space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-sm transition-colors ${
                    isActive
                      ? "bg-slate-100 text-[#3b28cc]"
                      : "text-gray-500 hover:text-[#3b28cc] hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Workspace Header Bar */}
        <header className="bg-white border-b border-gray-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-20 flex items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills, jobs, or mentors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:border-[#3b28cc] focus:bg-white transition-all"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            
            {/* System Switcher Pill */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#3b28cc] font-medium bg-slate-100 px-3 py-1.5 rounded-full border border-gray-200 transition-colors"
            >
              <span>Main Site</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            {/* Notification Bell */}
            <button className="relative p-2 text-gray-500 hover:text-[#3b28cc] rounded-full hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2.5 border-l border-gray-200 pl-4">
              <UserDropdown />
            </div>

          </div>

        </header>

        {/* Page Content View */}
        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}
