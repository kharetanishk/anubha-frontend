"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Video, HeartPulse } from "lucide-react";

const steps = [
  {
    id: "step1",
    title: "Step 01 — The Pre-Consultation Stage",
    icon: ClipboardCheck,
    points: [
      "Fill the ‘Client Assessment Form’ to help us understand your eating habits and fitness routine.",
      "We learn about your expectations and important health parameters.",
      "Appointment schedule is created as per your preferred days and times.",
      "All appointments are pre-booked with two days’ notice from our end.",
    ],
  },
  {
    id: "step2",
    title: "Step 02 — The Consultation Stage",
    icon: Video,
    points: [
      "During the consultation, we co-create a sustainable and culturally suitable eating pattern.",
      "Your plan and exercise routine are reviewed and adjusted as needed.",
      "Special meal plans provided for occasions like travel, holidays, or festivals.",
    ],
  },
  {
    id: "step3",
    title: "Step 03 — The Post-Consultation Stage",
    icon: HeartPulse,
    points: [
      "After completing your 3 or 6-month program, you receive a maintenance diet plan.",
      "We provide guidelines and learnings to sustain your progress in real life.",
      "You’ll know exactly how to manage your daily routine going forward.",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-20 px-6 md:px-10 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-14"
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white/90 border border-[#dfe7dd] rounded-3xl shadow-(--shadow-soft) hover:shadow-xl transition-shadow p-8 flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <step.icon className="w-8 h-8 text-[#7fb77e]" />
                <h3 className="text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm leading-relaxed marker:text-[#84c0a0]">
                {step.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
