"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#dfe7dd] bg-white/80 text-slate-600 py-12 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Brand / Intro */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-slate-900">
            Dr. Priya Sharma
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Certified Nutritionist dedicated to helping you heal through
            personalized nutrition, mindful balance, and sustainable wellness.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-900">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-emerald-700 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="hover:text-emerald-700 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-emerald-700 transition-colors duration-200"
              >
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-900">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Mumbai, India</li>
            <li>📞 +91 9876543210</li>
            <li>
              <a
                href="mailto:contact@nutriwell.com"
                className="hover:text-emerald-700 transition-colors duration-200"
              >
                📧 contact@nutriwell.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto mt-10 border-t border-[#dfe7dd] pt-6">
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} NutriWell — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
