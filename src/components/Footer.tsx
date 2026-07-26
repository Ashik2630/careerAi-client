"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/about#careers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Help Center", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-[#eaedf1] dark:bg-slate-950 text-gray-700 dark:text-slate-300 pt-16 pb-12 border-t border-gray-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Brand Logo Header */}
        <div>
          <Link href="/" className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] dark:text-white tracking-tight">
            CareerAI
          </Link>
        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-2">
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-serif font-bold text-[#111827] dark:text-white text-base sm:text-lg tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-slate-400 hover:text-[#3b28cc] dark:hover:text-purple-400 transition-colors duration-150 font-sans"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Horizontal Divider & Copyright */}
        <div className="pt-8 border-t border-gray-300/60 dark:border-slate-800">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans">
            © {currentYear} CareerAI. Empathetic Intelligence for your career.
          </p>
        </div>

      </div>
    </footer>
  );
}
