"use client";

import React from "react";
import { useBookingForm } from "../context/BookingFormContext";
import FormNavButtons from "../components/FormNavButtons";
import { useRouter } from "next/navigation";

export default function RecallPage() {
  const { form } = useBookingForm();
  const router = useRouter();

  // You can display a compact summary and a longer recall form (or reuse StepMedical/StepLifestyle)
  return (
    <main className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Recall / Additional Questions
      </h2>

      <p className="text-sm text-slate-600 mb-6">
        Review your submitted details and add any extra information required for
        this consultation.
      </p>

      {/* For brevity reuse review + lifestyle fields or add more */}
      <div className="mb-4">
        <pre className="text-sm text-slate-700 bg-gray-50 p-3 rounded">
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>

      <FormNavButtons
        backHref="/book/user-details"
        nextHref="/book/slot"
        nextLabel="Choose Slot"
      />
    </main>
  );
}
