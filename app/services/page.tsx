"use client";

import { motion } from "framer-motion";
import { services } from "./data";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen py-24 px-6 md:px-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute -top-24 -right-10 h-64 w-64 rounded-full bg-[#dff3e6]/70 blur-3xl" />
        <div className="absolute top-1/3 -left-16 h-72 w-72 rounded-full bg-[#e2efff]/70 blur-3xl" />
        <div className="absolute bottom-16 right-1/4 h-56 w-56 rounded-full bg-[#fef3e6]/70 blur-3xl" />
      </motion.div>
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-slate-900 mb-4"
        >
          Services
        </motion.h1>

        <p className="text-slate-600 mb-10 text-lg max-w-3xl">
          Explore our core consultation services designed to guide your journey
          towards balanced nutrition and wellness.
        </p>

        {/* Consultation Base Fee Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 border border-[#dfe7dd] rounded-3xl p-6 mb-12 shadow-(--shadow-soft) backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-slate-900">
            Consultation
          </h2>
          <p className="text-slate-600 mt-1">
            Standard base fee for a personalized nutrition consultation.
          </p>
          <p className="text-[#318a63] text-xl font-bold mt-3">₹1000</p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </div>
    </main>
  );
}
