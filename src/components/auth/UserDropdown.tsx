"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  ChevronDown,
  Loader2,
  Sparkles
} from "lucide-react";

export default function UserDropdown() {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [liveProfile, setLiveProfile] = useState<{ name?: string; email?: string; role?: string; isPro?: boolean; plan?: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync profile data and listen for real-time updates
  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.success && data.data) {
          setLiveProfile({
            name: data.data.name,
            email: data.data.email,
            role: data.data.role,
            isPro: data.data.isPro,
            plan: data.data.plan,
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchLatestProfile();

    const handleProfileUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setLiveProfile({
          name: customEvent.detail.name,
          email: customEvent.detail.email,
          role: customEvent.detail.role,
          isPro: customEvent.detail.isPro,
          plan: customEvent.detail.plan,
        });
      } else {
        fetchLatestProfile();
      }
    };

    window.addEventListener("profile-updated", handleProfileUpdated);
    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdated);
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, []);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsOpen(false);
            setIsLoggingOut(false);
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch {
      setIsLoggingOut(false);
      setIsOpen(false);
      router.push("/login");
    }
  };

  if (isPending) {
    return (
      <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse flex items-center justify-center">
        <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
      </div>
    );
  }

  // If user is not logged in, render null or Login buttons (caller handles guest state)
  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const userImage = user.image;
  const userName = liveProfile?.name || user.name || "User";
  const userEmail = liveProfile?.email || user.email || "";

  // Helper to extract 1-2 initials
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .substring(0, 2)
    .toUpperCase() || "U";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-all duration-150 group cursor-pointer"
        aria-expanded={isOpen}
      >
        {userImage ? (
          <img
            src={userImage}
            alt={userName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#3b28cc]/20 group-hover:ring-[#3b28cc]/50 dark:ring-purple-400/30 transition-all"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3b28cc] to-[#4338ca] text-white font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-[#3b28cc]/20 group-hover:ring-[#3b28cc]/50 transition-all">
            {initials}
          </div>
        )}

        <div className="hidden sm:flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-[#3b28cc] dark:group-hover:text-purple-400 transition-colors">
              {userName}
            </span>
            {liveProfile?.isPro && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white shadow-xs tracking-wider uppercase">
                PRO
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate max-w-[120px]">
            {userEmail}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#3b28cc] dark:text-purple-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-fadeIn">
          {/* Header User Info */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-900"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#3b28cc] text-white font-bold text-sm flex items-center justify-center relative">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{userName}</p>
                {liveProfile?.isPro && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white shadow-xs tracking-wider uppercase">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-400 truncate">{userEmail}</p>
              <div className="flex items-center gap-1 mt-1">
                {(user as any).role && (
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-purple-50 dark:bg-purple-950/50 text-[#3b28cc] dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                    {(user as any).role}
                  </span>
                )}
                {liveProfile?.isPro && (
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    PRO Plan
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#3b28cc] dark:hover:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-slate-800/60 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#3b28cc] dark:text-purple-400" />
              Unified Dashboard
            </Link>

            <Link
              href="/careerai"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#3b28cc] dark:hover:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-slate-800/60 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#3b28cc] dark:text-purple-400" />
              CareerAI Intelligence
            </Link>

            {(liveProfile?.role === "mentor" || (user as any).role === "mentor") && (
              <Link
                href="/mentor"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/60 dark:hover:bg-slate-800/60 transition-colors"
              >
                <User className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Career Mentor Portal
              </Link>
            )}

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#3b28cc] dark:hover:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-slate-800/60 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400 dark:text-slate-400" />
              Profile &amp; Account Settings
            </Link>
          </div>

          {/* Sign Out Action */}
          <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin text-rose-600 dark:text-rose-400" />
              ) : (
                <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              )}
              <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
