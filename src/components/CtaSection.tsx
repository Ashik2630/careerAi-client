"use client";

import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Purple Banner Container */}
        <div className="bg-[#3b28cc] rounded-3xl p-10 sm:p-16 text-center text-white shadow-xl relative overflow-hidden">
          
          {/* Subtle background glow decorative elements */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
              Ready to Level Up?
            </h2>

            <p className="text-sm sm:text-base text-blue-100 font-sans leading-relaxed max-w-xl mx-auto">
              Join thousands of professionals who have accelerated their career trajectories with CareerAI.
            </p>

            <div className="pt-4">
              <Link
                href="/register"
                className="inline-block bg-white hover:bg-slate-100 text-[#3b28cc] font-bold px-8 py-3.5 sm:py-4 rounded-xl text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Start Your Free Trial
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
