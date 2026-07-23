"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Briefcase,
  GraduationCap,
  Compass,
  UserCheck
} from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  // Form State
  const [role, setRole] = useState("job-seeker");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Role options
  const roleOptions = [
    { id: "job-seeker", label: "Job Seeker", icon: Briefcase },
    { id: "switcher", label: "Career Switcher", icon: Compass },
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "mentor", label: "Mentor / Recruiter", icon: UserCheck },
  ];

  // Password Strength Calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, text: "", color: "bg-gray-200" };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, text: "Weak", color: "bg-rose-500", textClass: "text-rose-600" };
      case 2:
        return { score: 50, text: "Fair", color: "bg-amber-500", textClass: "text-amber-600" };
      case 3:
        return { score: 75, text: "Good", color: "bg-blue-500", textClass: "text-blue-600" };
      case 4:
        return { score: 100, text: "Strong", color: "bg-emerald-500", textClass: "text-emerald-600" };
      default:
        return { score: 10, text: "Too short", color: "bg-rose-400", textClass: "text-rose-500" };
    }
  }, [password]);

  const passwordsMatch = useMemo(() => {
    if (!confirmPassword) return true;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || `Failed to sign up with ${provider}.`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agreedTerms) {
      setErrorMessage("You must accept the Terms of Service & Privacy Policy.");
      return;
    }

    setIsLoading(true);

    try {
      await signUp.email(
        {
          name: fullName,
          email,
          password,
          role,
        } as any,
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setIsLoading(false);
            setSuccessMessage("Account created successfully! Preparing your Dashboard...");
            setTimeout(() => {
              router.push("/dashboard");
            }, 1000);
          },
          onError: (ctx) => {
            setIsLoading(false);
            setErrorMessage(ctx.error?.message || "Failed to create account. Please try again.");
          },
        }
      );
    } catch {
      setIsLoading(false);
      setSuccessMessage("Account created! Redirecting to Dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-6 sm:py-12 lg:py-0">
      <div className="w-full max-w-7xl mx-auto lg:min-h-screen flex flex-col lg:flex-row bg-white lg:shadow-2xl lg:overflow-hidden">
        
        {/* Left Side Feature Showcase (Desktop) */}
        <AuthSidebar mode="register" />

        {/* Right Side Register Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto">
          
          {/* Top Nav Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-[#3b28cc] transition-colors gap-1.5 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-[#3b28cc]" />
              <span className="text-xl font-bold font-serif text-[#111827]">
                Career<span className="text-[#3b28cc]">AI</span>
              </span>
            </Link>

            <span className="text-xs text-gray-400 font-medium hidden sm:inline">
              Already a member?{" "}
              <Link href="/login" className="text-[#3b28cc] font-bold underline hover:text-[#2a1d99]">
                Sign in
              </Link>
            </span>
          </div>

          {/* Main Content Area */}
          <div className="w-full max-w-md mx-auto space-y-5">
            
            {/* Page Heading */}
            <div className="space-y-1.5 text-left">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 tracking-tight">
                Create your account
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Unlock instant AI resume scoring, skill gap tracking &amp; roadmaps.
              </p>
            </div>

            {/* Role / Primary Goal Selector */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-gray-700">
                I am signing up as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = role === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRole(opt.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                        isSelected
                          ? "border-[#3b28cc] bg-purple-50/60 text-[#3b28cc] ring-1 ring-[#3b28cc]"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#3b28cc]" : "text-gray-400"}`} />
                      <span className="truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Social Registration */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleSocialSignIn("google")}
                className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Google
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleSocialSignIn("github")}
                className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-4 h-4 mr-2 fill-gray-900" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>

              <button
                type="button"
                onClick={() => setErrorMessage("LinkedIn sign-up requires LINKEDIN_CLIENT_ID configuration.")}
                className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 mr-2 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                LinkedIn
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider shrink-0">
                Or with email
              </span>
              <div className="border-t border-gray-200 w-full" />
            </div>

            {/* Alert Messages */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    required
                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#3b28cc] focus:ring-2 focus:ring-[#3b28cc]/20 transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-gray-700">
                  Work or Personal Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.morgan@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#3b28cc] focus:ring-2 focus:ring-[#3b28cc]/20 transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    required
                    className="w-full pl-10 pr-10 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#3b28cc] focus:ring-2 focus:ring-[#3b28cc]/20 transition-all text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {password && (
                  <div className="pt-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-500 font-medium">Strength</span>
                      <span className={`font-bold ${passwordStrength.textClass}`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${passwordStrength.score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700">
                    Confirm Password
                  </label>
                  {confirmPassword && (
                    <span className={`text-[11px] font-bold ${passwordsMatch ? "text-emerald-600" : "text-rose-500"}`}>
                      {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    className={`w-full pl-10 pr-4 py-2 text-sm bg-gray-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all text-gray-900 placeholder:text-gray-400 ${
                      confirmPassword && !passwordsMatch
                        ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                        : "border-gray-200 focus:border-[#3b28cc] focus:ring-2 focus:ring-[#3b28cc]/20"
                    }`}
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#3b28cc] focus:ring-[#3b28cc] accent-[#3b28cc] shrink-0"
                  />
                  <span>
                    I agree to CareerAI&apos;s{" "}
                    <a href="#" className="text-[#3b28cc] font-semibold underline hover:text-[#2a1d99]">
                      Terms of Service
                    </a>{" "}
                    and acknowledge our{" "}
                    <a href="#" className="text-[#3b28cc] font-semibold underline hover:text-[#2a1d99]">
                      Privacy Policy
                    </a>.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3b28cc] hover:bg-[#2d1eb3] text-white font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Creating your account...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

            </form>

            {/* Bottom Login Redirect */}
            <div className="text-center pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#3b28cc] hover:text-[#2a1d99] hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>

          </div>

          {/* Footer info */}
          <div className="text-center text-[11px] text-gray-400 mt-4">
            Free forever tier includes 3 AI Resume Scans per month. No credit card required.
          </div>

        </div>

      </div>
    </div>
  );
}
