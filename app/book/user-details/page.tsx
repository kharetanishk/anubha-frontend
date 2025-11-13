"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { plans } from "@/app/services/plan";

import StepPersonal from "../components/StepPersonal";
import StepMeasurements from "../components/StepMeasurements";
import StepMedical from "../components/StepMedical";
import StepLifestyle from "../components/StepLifestyle";
import ReviewStep from "../components/ReviewStep";

import FloatingMiniStepper from "../components/FloatingMiniStepper";

export default function UserDetailsPage() {
  const [internalStep, setInternalStep] = useState(1);
  const router = useRouter();
  const total = 5;

  // Read selected plan from URL
  const searchParams = useSearchParams();
  const planSlug = searchParams.get("plan");
  const selectedPlan = plans.find((p) => p.slug === planSlug);

  function next() {
    if (internalStep < total) setInternalStep((s) => s + 1);
    else router.push(`/book/recall?plan=${planSlug}`);
  }

  function prev() {
    if (internalStep > 1) setInternalStep((s) => s - 1);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f9fcfa] to-[#f1f7f3] py-13 px-4 sm:px-6">
      {/* Container */}
      <div className="max-w-3xl mx-auto w-full bg-white rounded-2xl p-5 sm:p-7 shadow-[0_3px_20px_rgba(0,0,0,0.08)] relative">
        {/* Floating Stepper */}
        <FloatingMiniStepper step={internalStep} total={total} />

        {/* Selected Plan Banner */}
        {selectedPlan && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center sm:text-left">
            <p className="font-semibold text-emerald-900 text-base sm:text-lg">
              Booking: {selectedPlan.title}
            </p>
            <p className="text-emerald-700 text-sm sm:text-base">
              Price: {selectedPlan.packages[0]?.price}
            </p>
          </div>
        )}

        {/* Steps */}
        <div className="mb-6">
          {internalStep === 1 && <StepPersonal />}
          {internalStep === 2 && <StepMeasurements />}
          {internalStep === 3 && <StepMedical />}
          {internalStep === 4 && <StepLifestyle />}
          {internalStep === 5 && <ReviewStep selectedPlan={selectedPlan} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prev}
            disabled={internalStep === 1}
            className="px-4 py-2 rounded-lg border text-sm sm:text-base disabled:opacity-40"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 text-sm sm:text-base text-gray-600"
            >
              Cancel
            </button>

            <button
              onClick={next}
              className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm sm:text-base"
            >
              {internalStep === total ? "Proceed to Recall" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
