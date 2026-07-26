"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 text-center transition-colors">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            We&apos;re Here to Help
          </h1>
          <p className="text-base text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
            Have questions about our AI career tools, enterprise plans, or press inquiries? Send us a message and our team will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Form & Info Grid */}
      <section className="pb-24 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Information (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1c212c] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-slate-800">
              <h2 className="text-2xl font-serif font-bold">Contact Details</h2>

              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Email Us</span>
                    <span>support@careerai.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Headquarters</span>
                    <span>500 Howard Street, Suite 400<br />San Francisco, CA 94105</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Phone</span>
                    <span>+1 (800) 555-0199</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 text-xs text-gray-400">
                <span>Support Hours: Monday - Friday, 8:00 AM - 6:00 PM PST</span>
              </div>
            </div>
          </div>

          {/* Contact Form (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-gray-200/80 dark:border-slate-800 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Send Us a Message</h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 space-y-2 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold">Thank you for reaching out!</h3>
                <p className="text-xs sm:text-sm">We have received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#3b28cc] dark:focus:border-purple-400 focus:bg-white dark:focus:bg-slate-900 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex.chen@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#3b28cc] dark:focus:border-purple-400 focus:bg-white dark:focus:bg-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#3b28cc] dark:focus:border-purple-400 focus:bg-white dark:focus:bg-slate-900 transition-all cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Pro Subscription & Billing</option>
                    <option>Executive / Enterprise Team Inquiry</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-4 text-xs sm:text-sm focus:outline-none focus:border-[#3b28cc] dark:focus:border-purple-400 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#3b28cc] hover:bg-[#2d1eb3] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
