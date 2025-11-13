"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useBookingForm } from "../context/BookingFormContext";
import confetti from "canvas-confetti";

export default function PaymentPage() {
  const { form } = useBookingForm();
  const router = useRouter();

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  function onPay() {
    setProcessing(true);

    // Simulate processing animation for 1.8s
    setTimeout(async () => {
      setProcessing(false);
      setSuccess(true);

      // Play success sound
      const audio = new Audio("/success.mp3");
      audio.play();

      // Dynamic confetti import
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 150,
        spread: 75,
        origin: { y: 0.6 },
      });

      setTimeout(() => router.push("/"), 1500);
    }, 1800);
  }

  return (
    <main className="relative bg-white rounded-2xl p-6 shadow-md min-h-[350px] flex flex-col justify-center">
      {/* ======================== PROCESSING OVERLAY ======================== */}
      <AnimatePresence>
        {processing && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/85 backdrop-blur-md rounded-2xl z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></motion.div>

            <p className="mt-4 text-slate-700 font-medium text-lg">
              Processing Payment…
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================== SUCCESS ANIMATION ======================== */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Glow Ripple */}
            <motion.div
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-40 h-40 bg-emerald-300 rounded-full blur-3xl"
            ></motion.div>

            {/* Check Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-emerald-600 flex items-center justify-center shadow-2xl"
            >
              <Check size={110} className="text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================== PAYMENT UI ======================== */}
      <h2 className="text-xl font-semibold mb-4">Payment</h2>

      <div className="mb-4">
        <p className="text-sm">Plan: {form.planName || "Selected plan"}</p>
        <p className="text-lg font-bold text-emerald-700">
          Price: {form.planPrice || "₹0"}
        </p>
      </div>

      <button
        onClick={onPay}
        className="px-6 py-3 bg-emerald-600 text-white rounded-lg active:scale-95 transition"
      >
        Pay Now
      </button>

      <div className="mt-4">
        <button
          onClick={() => router.push("/book/slot")}
          className="text-sm text-slate-600"
        >
          ← Back to Slot
        </button>
      </div>
    </main>
  );
}
