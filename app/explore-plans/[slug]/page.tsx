"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { plans } from "@/app/explore-plans/data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ExplorePlanPage() {
  const { slug } = useParams();
  const plan = plans.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!plan) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-900">Plan Not Found</h1>
        <Link
          href="/services"
          className="mt-3 text-[#318a63] hover:underline font-medium"
        >
          ← Back to Services
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {plan.name}
          </h1>
          <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
            {plan.longDescription.trim()}
          </p>
        </motion.div>

        {/* If plan has multiple packages */}
        {plan.packages && plan.packages.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {plan.packages.map((pkg) => (
              <motion.div
                key={pkg.slug}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 border border-[#dfe7dd] rounded-3xl shadow-(--shadow-soft) hover:shadow-xl p-6 flex flex-col justify-between backdrop-blur-sm transition-shadow"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                    {pkg.name}
                  </h2>
                  {pkg.duration && (
                    <p className="text-sm text-slate-500 mb-3">
                      {pkg.duration}
                    </p>
                  )}
                  <p className="text-[#318a63] text-xl font-bold mb-4">
                    {pkg.price}
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 mb-5 marker:text-[#7fb77e]">
                    {pkg.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/book-appointment?plan=${pkg.slug}`}
                  className="rounded-full bg-linear-to-r from-[#7fb77e] via-[#6fbb9c] to-[#64a0c8] text-white py-2.5 text-sm font-medium text-center shadow-lg hover:shadow-xl hover:brightness-105 transition mt-auto"
                >
                  Buy Plan
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          // Single plan (no packages)
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 border border-[#dfe7dd] rounded-3xl shadow-(--shadow-soft) p-8 text-center backdrop-blur-sm"
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              {plan.name}
            </h2>
            {plan.price && (
              <p className="text-[#318a63] text-2xl font-bold mb-6">
                {plan.price}
              </p>
            )}
            {plan.features && (
              <ul className="list-disc list-inside text-slate-600 text-sm mb-8 max-w-md mx-auto text-left marker:text-[#7fb77e]">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
            <Link
              href={`/book-appointment?plan=${plan.slug}`}
              className="inline-block rounded-full bg-linear-to-r from-[#7fb77e] via-[#6fbb9c] to-[#64a0c8] text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl hover:brightness-105 transition"
            >
              Buy Plan
            </Link>
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="text-[#318a63] hover:underline font-medium"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    </main>
  );
}
