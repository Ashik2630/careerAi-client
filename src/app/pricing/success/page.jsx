import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, ArrowRight, Mail, Sparkles, ShieldCheck, Receipt, LayoutDashboard } from 'lucide-react'
import { stripe } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const userSession = await getUserSession()

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const {
    status,
    customer_details,
    amount_total,
    currency,
    line_items
  } = session

  if (status === 'open') {
    return redirect('/')
  }

  const customerEmail = customer_details?.email || userSession?.email || 'your email'
  const customerName = userSession?.name || customer_details?.name
  const planName = line_items?.data?.[0]?.description || 'Pro Career Plan'

  const formattedAmount = amount_total
    ? (amount_total / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: currency ? currency.toUpperCase() : 'USD'
      })
    : null

  if (status === 'complete') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8 text-center">
          
          {/* Animated Glow & Check Icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-emerald-500/30 blur-xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
          </div>

          {/* Header text */}
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" /> Payment Successful
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              {customerName ? `Welcome aboard, ${customerName}!` : 'Thank You for Your Subscription!'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans max-w-lg mx-auto leading-relaxed">
              Your subscription to <span className="font-semibold text-slate-900 dark:text-white">{planName}</span> is now active. We&apos;ve sent a confirmation email & receipt to:
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200">
              <Mail className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              {customerEmail}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-left shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-500" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-bold text-lg">
                <Receipt className="w-5 h-5 text-[#3b28cc] dark:text-purple-400" />
                Receipt Details
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase tracking-wider">
                Paid
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <p className="text-slate-500 dark:text-slate-400">Plan Subscribed</p>
                <p className="font-semibold text-slate-900 dark:text-white">{planName}</p>
              </div>
              {formattedAmount && (
                <div className="space-y-1 sm:text-right">
                  <p className="text-slate-500 dark:text-slate-400">Amount Charged</p>
                  <p className="font-bold text-slate-900 dark:text-white text-base">{formattedAmount}</p>
                </div>
              )}
              <div className="space-y-1 col-span-1 sm:col-span-2 pt-2">
                <p className="text-slate-500 dark:text-slate-400">Session Reference ID</p>
                <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400 truncate bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  {session_id}
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Unlocked Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Unlimited AI Resume ATS Scans
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Automated Career Roadmap
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Unlimited Mock Interviews
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Priority 24/7 Support
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-[#3b28cc] hover:bg-[#2d1eb3] text-white shadow-lg shadow-[#3b28cc]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              View Plan Details
            </Link>
          </div>

        </div>
      </div>
    )
  }

  return redirect('/')
}