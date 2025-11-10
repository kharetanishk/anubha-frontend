"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About", scroll: true },
  { href: "/services", label: "Services" },
  { href: "#faq", label: "FAQ", scroll: true },
];

const navLinkVariant: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring" as const, stiffness: 300 },
  }),
  hover: {
    scale: 1.03,
    color: "#166534",
    transition: { type: "spring" as const, stiffness: 400, damping: 30 },
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  if (!mounted) return null;

  const handleScrollOrRedirect = (sectionId: string) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/#${sectionId}`;
      }
    }
  };

  return (
    <>
      {/* NAVBAR: keep it highest so menu icon stays tappable above overlay */}
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="fixed top-0 left-0 w-full z-100 backdrop-blur-xl border-b border-[#dfe7dd] bg-white/80"
      >
        <div className="flex items-center justify-between px-4 py-3 md:py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/anubha_logo.png"
              alt="logo"
              className="w-15 h-15 rounded-md bg-white shadow-sm"
              draggable={false}
            />
            <span className="font-semibold text-lg text-emerald-800">
              Dr. Anubha's Nutrition
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navLinkVariant}
                whileHover="hover"
              >
                {["About", "FAQ"].includes(link.label) ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollOrRedirect(link.label.toLowerCase());
                    }}
                    className="text-slate-600 hover:text-emerald-700 transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-emerald-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden rounded-md p-2 bg-white/70 border border-[#dfe7dd] hover:bg-white transition"
          >
            {menuOpen ? (
              <X size={24} className="text-emerald-700" />
            ) : (
              <Menu size={24} className="text-emerald-700" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* OVERLAY: should sit above page content (hero etc) but below navbar */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-emerald-900/20 z-80"
              onClick={() => setMenuOpen(false)}
            />

            {/* MOBILE MENU: sits above overlay but below navbar (so navbar controls still visible) */}
            <motion.div
              key="mobileMenu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[64px] left-0 right-0 md:hidden flex flex-col items-center gap-4 py-6 border-t border-[#dfe7dd] bg-white/95 backdrop-blur-md z-90 rounded-b-2xl shadow-lg"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navLinkVariant}
                >
                  {["About", "FAQ"].includes(link.label) ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleScrollOrRedirect(link.label.toLowerCase());
                        setMenuOpen(false);
                      }}
                      className="block text-slate-600 hover:text-emerald-700 text-lg"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-slate-600 hover:text-emerald-700 text-lg"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
