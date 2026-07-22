"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-[28px] font-bold text-[#3b28cc] tracking-tight font-serif">
              CareerAI
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              // Setting "Features" as active by default if on home page just to match the design
              const isActive = pathname === link.href || (pathname === "/" && link.name === "Features");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-semibold transition-colors relative py-1 ${
                    isActive ? "text-[#3b28cc]" : "text-gray-500 hover:text-[#3b28cc]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#3b28cc] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/login" className="text-[14px] font-bold text-[#3b28cc] hover:text-[#2b1b99] transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-[#3b28cc] hover:bg-[#2b1b99] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-[#3b28cc] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === "/" && link.name === "Features");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "text-[#3b28cc] bg-blue-50"
                      : "text-gray-600 hover:text-[#3b28cc] hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col space-y-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center text-[#3b28cc] font-bold py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-[#3b28cc] text-white px-4 py-2.5 rounded-lg font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
